/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, storage, PersistentUnorderedMap, context, PersistentVector } from 'near-sdk-as'
import { Ganado, Estado, ganados } from './model';



const DEFAULT_MESSAGE = 'Hello'



 
export function setGanado(id: u32, fecha_nacimiento: string, ubicacion: string, propietario: u16, e: string){

  const cuenta = context.sender;
  let estado = new Estado(e);
  //si existe el animal recuperar los estados para agregar este nuevo
  //sino agregar este
  let crette = new Ganado(id, fecha_nacimiento, ubicacion, propietario, estado)

  ganados.set(cuenta, crette)

}



// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGanado(idGanado: string) {

  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  
  return ganados.get(idGanado);
}

export function getGanadosPorCuenta(cuenta: String){}

export function setGreeting(message: string): void {
  const accountId = Context.sender
  // Use logging.log to record logs permanently to the blockchain!
  logging.log(`Saving greeting "${message}" for account "${accountId}"`)
  storage.set(accountId, message)
}
