import { Correo } from "./Correo.js";
import { Bandeja } from "./Bandeja.js";

// Función que procesa el envío y guarda el correo en la bandeja indicada
export function enviarCorreo(correo: any, bandejaEnviados: any, bandejaOrigen?: any): void {
  // 1. Verificamos que el correo sea válido
  if (!correo.esValidoParaEnviar()) {
    throw new Error("El correo no es válido para ser enviado");
  }

  // 2. Si viene de una bandeja (ej. Borradores), usamos el método que ya lo saca de ahí
  if (bandejaOrigen) {
    bandejaOrigen.moverCorreo(correo, bandejaEnviados);
  } else {
    // 3. Si es un correo nuevo, simplemente lo agregamos a Enviados
    bandejaEnviados.agregarCorreo(correo);
  }

}