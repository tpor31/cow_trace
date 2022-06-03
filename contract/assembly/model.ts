
import { Context, logging, storage, PersistentVector, context, PersistentUnorderedMap } from 'near-sdk-as'


@nearBindgen
export class Ganado {
  id: u32;
  fecha_nacimiento: string;
  ubicacion: string;
  propietario: u16;
  estados: PersistentVector<Estado>;

  constructor(id: u32, fecha_nacimiento: string, ubicacion: string, propietario: u16, estado: u16){
    this.id=id;
    this.fecha_nacimiento=fecha_nacimiento;
    this.ubicacion=ubicacion;
    this.propietario=propietario;
    this.estados=new PersistentVector<Estado>("e");
  }
}

@nearBindgen
export class Estado {
  tipo: string;

  constructor(tipo: string){
    this.tipo=tipo;
  }
}

export const ganados = new PersistentUnorderedMap<String,PersistentVector<Ganado>>("g");

