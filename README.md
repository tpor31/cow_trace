cow_trace
==================

Descripcion
==================

Cow trace trata de solucionar el problema de la trazabilidad en la cadena carnica donde los clientes cada dia exigen mas informacion. 
Es este caso se quiere registrar todos los eventos por los que pasa un animal desde su nacimiento hasta su entrada al matadero.
Esto ademas de permitirnos saber la trazabilidad del animal nos ayudaria en posibles enfermedades que haya tenido el animal o alguno que se haya 
criado con este.
Para solucionar este problema utilizaremos la blockchain de near la cual es ideal para este problema ya que es barata y escalable.
Las funciones que permitira hacer el smart contract son las siguientes


1. registrarGanado
2. registrarUsuario
3. actualizarEstado
4. consultarEstados
5. consultarGanado
6. buscarGanado
7. comprarGanado


1 Instalacion
===========

Para ejecutar el proyecto local, se deben seguir los siguientes pasos:

Prerequisitos

1. [Node,js] >= 12
2. instalar dependencias: npm install o yarn install
3. Tener una cuenta de prueba near
4. Tener instalado el near cli global
   yarn install --global near-cli


### 2 Compilando y desplegando

Lo primero que debemos hacer es instalar las dependencias necesarias para que el proyecto funcione.

```sh
npm install
```

ó

```sh
yarn install
```

Una vez hecho esto, podemos compilar el código.

```sh
npm run build
```

ó

```sh
yarn build
```

El contrato compilado en WebAssembly se guarda en la carpeta `AssemblyScript/build/release/`. Ahora solo es necesario desplegarlo en una cuenta de desarrollo.

```sh
near dev-deploy build/release/contrato.wasm
```

### 2.1 Usando variables de entorno

Una vez compilado y desplegado tu proyecto, vamos a requerir identificar la cuenta neardev. Esta la puedes encontrar en el archivo `AssemblyScript/neardev/neardev`. Podemos almacenar este contrato en una variable de entorno ejecutando lo siguiente en la consola, y sustituyendo por tu cuenta de desarrollo:

```sh
export CONTRATO=dev-0000000000000-000000000
```

Haciendo esto, podemos comprobar que la variable `CONTRATO` tiene almacenada nuestra cuenta dev.

```sh
echo $CONTRATO
```


Paso 3: Metodos
---------------

Los siguientes comandos le permiten interactuar con el contrato inteligente.

1. Registrar un ganado en la blockchain

```sh
near call $CONTRATO registrarGanado '{"ubicacion":"ubicacion", "genero":"genero", "raza":"raza","tamano":"tamano", "precio":"1"}' --accountId <su cuenta test>
```

2. Consultar el ganado que registro

```sh
near view $CONTRATO consultarGanadoRegistrado '{"idCuenta": "su_cuenta_test"}' --accountId <su cuenta test>
```

3. Consultar el estado de un ganado. 
   Se debe tener el id del ganado registrado previamente

```sh
near view $CONTRATO consultarEstados '{"idGanado":"id"}' --accountId <su cuenta test>
```

4. Actualizar estado.
   Este metodo agrega un nuevo estado en la trazabilidad del animal
   
```sh
near call $CONTRATO actualizarEstado '{"idGanado":"id", "descripcion":"descripcion", "responsable":"responsable","ubicacion":"ubicacion"}' --accountId <su cuenta test>
```


### 4 Mockup interfaz grafica
===============

Poner aca el mockup de la interfaz grafica
