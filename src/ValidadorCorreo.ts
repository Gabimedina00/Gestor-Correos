import { Correo } from "../src/Correo.js"

export class ValidadorCorreo {
    esValidoParaEnviar(correo: Correo): boolean {
        return correo.getAsunto().trim().length > 0 && correo.getDestinatarios().length > 0;
    }
}