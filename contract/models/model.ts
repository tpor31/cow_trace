import { Context, logging, storage, PersistentVector, context, PersistentUnorderedMap, u128, datetime } from 'near-sdk-as'

const ONE_NEAR = u128.from('1000000000000000000000000');

@nearBindgen
export class Ganado {

    id: string;
    fecha_nacimiento: string;
    ubicacion: string;
    criador: string;
    estados: PersistentVector<Estado>;
    genero: string;
    raza: string;
    tamano: string;
    precio: u64;  
  
    constructor(ubicacion: string, criador: string, genero: string, raza: string, tamano: string, precio: u64){
  
      this.id = context.blockIndex.toString();
      this.fecha_nacimiento = datetime.block_datetime().toString().split('T')[0];
      this.ubicacion = ubicacion;
      this.criador = criador;
      this.estados = new PersistentVector<Estado>(`${context.blockIndex}`);
      this.genero = genero;
      this.raza = raza;
      this.tamano = tamano;
      this.precio = precio;
    }
    agregarEstado(estado: Estado): void{
            this.estados.push(estado);
            logging.log(`Estado nuevo ${estado.descripcion} agregado exitosamente`);
    }
    
    consultarEstados(): PersistentVector<Estado>{
        return this.estados;
    }
}

@nearBindgen
export class Usuario {
    public accountId: string;
    public ganadoRegistrado: Array<string>;

    constructor(accountId: string){
        this.accountId =accountId;
        this.ganadoRegistrado = new Array;
    }
}

@nearBindgen
export class Estado {
  fecha: string;
  descripcion:string;
  ubicacion:string;
  responsable:string

  constructor(descripcion: string, responsable: string, ubicacion: string){
    this.fecha = datetime.block_datetime().toString().split('T')[0];   
    this.descripcion = descripcion;
    this.ubicacion = ubicacion;
    this.responsable = responsable;
  }
}

export const ganados = new PersistentUnorderedMap<String,Ganado>("g");

//Almacenamiento para usuarios
export const usuarios = new PersistentUnorderedMap<string, Usuario>("u");

// Almancenamiento de los identificadores del ganado registrado
export const keys = new PersistentVector<string>("k");