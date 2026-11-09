import { Correo } from "../src/Correo.js"

//responsabilidad única, correo guarda datos, validador decide si se puede enviar.
export class ValidadorCorreo {
    //recibe el correo de afuera
    esValidoParaEnviar(correo: Correo): boolean {
        //usa getters que no rompe el encapsulamiento
        return correo.getAsunto().trim().length > 0 && correo.getDestinatarios().length > 0;
    }
}