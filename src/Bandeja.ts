import { Correo } from "./Correo.js";

export class Bandeja {
  private nombre: string;
  // Almacena los correos de la bandeja
  private correos: Correo[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.correos = [];
  }

  // Devuelve la lista de correos actuales
  public getCorreos(): Correo[] {
    return this.correos;
  }

  // Agrega un nuevo correo a la bandeja
  public agregarCorreo(correo: Correo): void {
    this.correos.push(correo);
  }
}