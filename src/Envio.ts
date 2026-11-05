import { Correo } from "./Correo.js";
import { Bandeja } from "./Bandeja.js";

// Función que procesa el envío y guarda el correo en la bandeja indicada
export function enviarCorreo(correo: any, bandejaEnviados: any): void {
  // 1. Verificamos que el correo sea válido
  if (!correo.esValidoParaEnviar()) {
    throw new Error("El correo no es válido para ser enviado");
  }

  // 2. Si pasa la validación, lo guardamos en la bandeja
  bandejaEnviados.agregarCorreo(correo);
}