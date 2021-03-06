import { context, logging, storage , PersistentUnorderedMap, datetime, u128, ContractPromiseBatch, Context} from 'near-sdk-as'
import { ganados ,Ganado, Estado, keys, usuarios, Usuario} from "../models/model"

const ONE_NEAR = u128.from('1000000000000000000000000');



/**
 * It creates a new Ganado object, adds it to the Ganado map, adds the key to the Ganado array, and
 * then calls the registrarUsuario function to add the Ganado to the Usuario collection
 * @param {string} ubicacion - string, genero: string, raza: string, tamano : string, precio: u64 = 0
 * @param {string} genero - string, raza: string, tamano : string, precio: u64 = 0
 * @param {string} raza - The breed of the animal
 * @param {string} tamano - string, precio: u64 = 0
 * @param {u64} [precio=0] - u64 = 0
 * @returns the object ganado.
 */
export function registrarGanado(ubicacion: string, genero: string, raza: string, tamano : string, precio: u64 = 0): Ganado{

  //Validamos que los parámetros enviados sean correctos
  assert(ubicacion != "", "La ubicacion no puede estar vacío.");
  
  assert(genero != "", "El genero puede estar vacío.");

  assert(raza != "", "La raza no puede estar vacío.");

  assert(tamano != "", "El tamaño no puede estar vacío.");

  assert(precio > 0, "El precio no puede ser 0.");

  //Creamos un objeto de tipo Ganado. Puedes validar el modelo en /models/model.ts
  let ganado = new Ganado(ubicacion, context.sender, genero, raza, tamano, precio);

  //Este mensaje va a regresarlo la consola si todo es exitoso.
  //También se mostrará en la blockchain.
  logging.log(
    'Creando registro de ganado "' 
      + raza
      + '" en la cuenta "' 
      + context.sender
      + '" genero "'
      + genero
      + '", tamaño "'
      + tamano
      + '" con ubicacion en "'
      + ubicacion
      + '" con un precio de "'
      + precio.toString()
      + '"'
  )

  //Envíamos el objeto creado al mapa de Ganado.
  ganados.set(ganado.id, ganado);
  //Y la clave al arreglo de Ganado.
  keys.push(ganado.id);
  
  //Llamamos a la función encargada de registrar añadir el registro del nuevo usuario en la colección de usuarios 
  registrarUsuario(context.sender, ganado.id);

  actualizarEstado(ganado.id, "recien nacido", context.sender, ubicacion);

  //Regresamos el ganado
  return ganado

}

/**
 * It takes an idCuenta and an idGanado, and if the idCuenta is not already in the usuarios Map, it
 * creates a new Usuario object with the idCuenta, and then adds the idGanado to the ganadoRegistrado
 * array of the Usuario object
 * @param {string} idCuenta - string
 * @param {string} idGanado - string
 */
export function registrarUsuario(idCuenta: string, idGanado: string): void{

  let usuario = usuarios.get(idCuenta);
  if (!usuario){
    usuario = new Usuario(idCuenta);
  }
  usuario.ganadoRegistrado.push(idGanado);
  usuarios.set(idCuenta, usuario);
}

/**
 * The function takes in a string, a string, a string, and a string, and returns an Estado or null
 * @param {string} idGanado - The ID of the animal.
 * @param {string} descripcion - string
 * @param {string} responsable - string
 * @param {string} ubicacion - string
 * @returns the new state of the animal.
 */
export function actualizarEstado(idGanado: string, descripcion: string, responsable: string, ubicacion: string): Estado | null{

  //Validando inputs
  assert(idGanado != "", "El id no debe estar vacío.");

  //Y consultamos la tanda para poder invocar sus métodos
  const ganado = ganados.get(idGanado);

  assert(ganado, `El ganado ${idGanado} no existe`);

  //El id de la cuenta será quien invoca el método
  const accountId = context.sender

  if(ganado){

  assert(accountId == ganado.criador, "No eres el dueño de este ganado.");
  
  //Creamos un nuevo objeto de tipo estado.
  const estado = new Estado(descripcion,responsable,ubicacion);

  ganado.agregarEstado(estado);

  return estado;

  }
  return null;

}

/**
 * We're going to create a new array of type Estado, and then we're going to loop through the list of
 * Estados, and push each one into the new array.
 * @param {string} idGanado - string
 * @returns An array of Estado objects.
 */
export function consultarEstados(idGanado: string): Array<Estado> | null {

  //Validamos inputs
  assert(idGanado != "", "El campo de clave no debe estar vacío.");

  //Obtenemos el Ganado y validamos su existencia
  const ganado = ganados.get(idGanado);
  assert(ganado, `El ganado ${idGanado} no existe`);

  if (ganado){
    //Guardamos la lista de tipo Estado en una variable
    const estados = ganado.consultarEstados();
  
    //Y creamos el objeto que vamos a regresar, un arreglo dinámico.
    const result = new Array<Estado>();

    //Ahora, ciclaremos por la lista de Estados
    for(let i = 0; i < estados.length; i++) {
      //Y vamos a regresar todo el objeto, por lo que lo guardamos en el resultado
      result.push(estados[i]);
    }
    //Regresamos dicho resultado
    return result;
  }
  //Si no existe el ganado solicitado
  return null;
}

export function consultarGanado(idGanado: string): Ganado | null {
  //Simplemente invocamos el error si el id está vacío
  assert(idGanado != "","El campo de clave no debe estar vacío.");
  return ganados.get(idGanado);
}

/**
 * It returns an array of Ganado objects or null if the user doesn't have any registered cattle
 * @param {string} idCuenta - string = context.sender
 * @returns An array of Ganado objects or null.
 */
export function consultarGanadoRegistrado(idCuenta: string = context.sender): Array<Ganado | null> | null{
  const usuario = usuarios.get(idCuenta);
  assert(usuario,"No tienes ganado registrado.");
  return usuario ? buscarGanado(usuario.ganadoRegistrado) : null
}

/**
 * It takes an array of strings, and returns an array of Ganado objects or nulls.
 * @param listaGanado - Array<string>
 * @returns An array of Ganado or null.
 */
export function buscarGanado(listaGanado: Array<string>): Array<Ganado | null> | null{
  let result = new Array<Ganado | null>();
  
  for (let i = 0; i < listaGanado.length; i++) {
    result.push(ganados.get(listaGanado[i]));
  }
  return result;
}

/**
 * The function comprarGanado() is used to buy a cow.
 * @param {string} idGanado - The ID of the animal you want to buy.
 */
export function comprarGanado(idGanado:string): void {

  assert(idGanado != "", "El id no debe estar vacío.");

  const cuenta = context.sender;
  const deposito = context.attachedDeposit;

  let ganado = ganados.get(idGanado);

  if(ganado){
  assert(cuenta != ganado.criador, "Ya eres el dueño de este ganado.");

  assert(deposito == u128.mul(ONE_NEAR, u128.from(ganado.precio)),
  `Debes de pagar el valor completo de ${ganado.precio} NEAR.`);

  ContractPromiseBatch.create(ganado.criador).transfer(deposito);

  let vendedor = usuarios.get(ganado.criador);

    if(vendedor){

      const index = vendedor.ganadoRegistrado.indexOf(idGanado);

      const registroActualizado = vendedor.ganadoRegistrado.splice(index,1);

      vendedor.ganadoRegistrado = registroActualizado;

      ganado.criador = cuenta;

      usuarios.set(vendedor.accountId,vendedor);

      ganados.set(idGanado,ganado);

      registrarUsuario(cuenta, idGanado);

      logging.log(`Compra relizada con exito. El vendedor ha recibido su pago de ${ganado.precio} NEAR.`);

   }

  }

}

