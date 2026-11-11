import { Correo } from "./Correo.js";

export class Bandeja {
  private nombre: string;
  private correos: Correo[];

  constructor(nombre: string) {
    const nombresPermitidos = ["Entrada", "Enviados", "Borradores", "Eliminados"];
    
    if (!nombresPermitidos.includes(nombre)) {
      throw new Error("Nombre de bandeja no permitido");
    }
    
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
 public eliminarCorreo(correo: Correo, bandejaEliminados: Bandeja): void {
    if (bandejaEliminados.nombre !== "Eliminados") {
      throw new Error("El destino debe ser la bandeja de Eliminados");
    }
    
    this.moverCorreo(correo, bandejaEliminados);
  }
 public restaurarCorreo(correo: Correo, destino: Bandeja): void {
    if (this.nombre !== "Eliminados") {
      throw new Error("Solo se pueden restaurar correos desde la bandeja de Eliminados");
    }
    
    this.moverCorreo(correo, destino);
  } // <-- ¡Esta es la llave que faltaba para cerrar restaurarCorreo!

  public buscarCorreos(termino: string): Correo[] {
    const terminoMinuscula = termino.toLowerCase();
    
    return this.correos.filter(correo => 
      correo.asunto.toLowerCase().includes(terminoMinuscula) || 
      correo.cuerpo.toLowerCase().includes(terminoMinuscula)
    );
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