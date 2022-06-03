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


Instalacion
===========

Para ejecutar el proyecto local, se deben seguir los siguientes pasos:

Paso 1. Prerequisitos

1. [Node,js] >= 12
2. instalar dependencias: npm install o yarn install
3. Tener una cuenta de prueba near
4. Tener instalado el near cli global
   yarn install --global near-cli

Paso 2: Crear cuenta para el contrato
-------------------------------------



Desplegar el contrato
======

Every smart contract in NEAR has its [own associated account][NEAR accounts]. When you run `yarn dev`, your smart contract gets deployed to the live NEAR TestNet with a throwaway account. When you're ready to make it permanent, here's how.




Step 1: Create an account for the contract
------------------------------------------

Each account on NEAR can have at most one contract deployed to it. If you've already created an account such as `your-name.testnet`, you can deploy your contract to `cow_trace.your-name.testnet`. Assuming you've already created an account on [NEAR Wallet], here's how to create `cow_trace.your-name.testnet`:

1. Authorize NEAR CLI, following the commands it gives you:

      near login

2. Create a subaccount (replace `YOUR-NAME` below with your actual account name):

      near create-account cow_trace.YOUR-NAME.testnet --masterAccount YOUR-NAME.testnet


Step 2: set contract name in code
---------------------------------

Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'cow_trace.YOUR-NAME.testnet'


Paso 3: Metodos
---------------

Los siguientes comandos le permiten interactuar con el contrato inteligente.

1. Registrar un ganado en la blockchain

`near call $CONTRATO registrarGanado '{"ubicacion":"ubicacion", "genero":"genero", "raza":"raza","tamano":"tamano", "precio":"1"}' --accountId <su cuenta test>`

2. Consultar el ganado que registro

`near view $CONTRATO consultarGanadoRegistrado '{"idCuenta": "su_cuenta_test"}' --accountId <su cuenta test>`




Mockup interfaz grafica
===============

Poner aca el mockup de la interfaz grafica
