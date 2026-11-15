import { Correo } from "../src/Correo.js";

// RF10: devuelve el asunto de cada correo, en el mismo orden
export function asuntosDe(correos: Correo): String[] {
    //map no filtra ni cambia la lista original: arma una lista nueva del mismo largo, con cada elemento transformado
    // map transforma cada correo en su asunto: entran N correos, salen N textos
    return correos.map(correo => correo.getAsunto());
}