import { Correo } from "./Correo.js";
import { Bandeja } from "./Bandeja.js";

// Función que procesa el envío y guarda el correo en la bandeja indicada
export function enviarCorreo(correo: Correo, bandejaEnviados: Bandeja): void {
  bandejaEnviados.agregarCorreo(correo);
}