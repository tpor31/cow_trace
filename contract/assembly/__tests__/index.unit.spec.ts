import { storage, Context, VMContext, context } from 'near-sdk-as'
import { registrarGanado } from '..'
import * as contrato from "../index";
import { ganados } from "../../models/model";
import { Ganado } from '../model';


const ID = "123";
const UBICACION = "Cardona";
const GENERO = "Macho";
const RAZA = "Herefor";
const TAMANO = "Normal";
const PRECIO = 1;

const setContext = (): void => {
    //Variables del contexto
    //VMContext.setAttached_deposit(ONE_NEAR);
    VMContext.setSigner_account_id("cuenta");
  };

describe("registrarGanado", () =>{
    it("Registra un ganado con sus respectivos datos.", () => {

        setContext();
    
        let ganado = contrato.registrarGanado(UBICACION, GENERO, RAZA, TAMANO, PRECIO);
        ganado.id=ID
        const p = ganados.get(ganado.id);
    
        if (p) {
          expect(p.id).toBe(ID)
          expect(p.ubicacion).toBe(UBICACION)
          expect(p.raza).toBe(RAZA)
          expect(p.tamano).toBe(TAMANO)
          expect(p.precio).toBe(PRECIO)
        }
    
      });
    
});

it("Requiere que la ubicacion no sea vacia.", () => {
    setContext();
    expect(() => {
      contrato.registrarGanado("", GENERO, RAZA, TAMANO, PRECIO);
    }).toThrow("La ubicacion no puede ser vacia.");
  })

  it("Requiere que la raza no sea vacia.", () => {
    setContext();
    expect(() => {
      contrato.registrarGanado(UBICACION, GENERO, "", TAMANO, PRECIO);
    }).toThrow("La raza no puede ser vacia.");
  })

  

describe("actualizar estado", () => {
    it("Requiere que exista un ganado con el id", () => {
        setContext();
      expect(() => {
        contrato.actualizarEstado("1", "desc","resp","ubi");
      }).toThrow("No existe un ganado con ese id ")
    });
  })
  