import { Correo } from "./Correo.js";

export class Bandeja {
  private nombre: string;
  private correos: Correo[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.correos = [];
  }

  public getCorreos(): Correo[] {
    return [...this.correos];
  }

 public agregarCorreo(correo: Correo): void {
    if (!this.correos.includes(correo)) {
      this.correos.push(correo);
    }
  }

  // Mueve el correo de esta bandeja a la bandeja de destino
  public moverCorreo(correo: Correo, destino: Bandeja): void {
    const index = this.correos.indexOf(correo);
    if (index !== -1) {
      this.correos.splice(index, 1); // Lo saca del origen
      destino.agregarCorreo(correo); // Lo agrega al destino
    }
  }
}