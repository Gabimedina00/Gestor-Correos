import { Contacto } from "./Contacto.js";
import { Correo } from "./Correo.js";
import { ValidadorCorreo } from "./ValidadorCorreo.js";

// RF-07 + feedback del profe: los correos se crean acá, no dentro de Correo.
export class RedactorCorreos {
    
    // El validador llega por el constructor (D de SOLID: inyección de dependencias).
    private readonly validador: ValidadorCorreo;

    constructor(validador: ValidadorCorreo) {
        this.validador = validador;
    }

    // Al empezar a redactar: un correo con remitente y el resto vacío (un borrador).
    iniciarBorrador(remitente: Contacto): Correo {
        return new Correo(remitente, [], "", "");
    }

    // Un borrador se puede enviar solo si el validador lo aprueba.
    puedeEnviarse(borrador: Correo): boolean {
        return this.validador.esValidoParaEnviar(borrador);
    }

    // Edición del borrador: el redactor le pide al correo que se cambie (encapsulamiento).
    escribirAsunto(borrador: Correo, asunto: string): void {
        borrador.cambiarAsunto(asunto);
    }

    escribirCuerpo(borrador: Correo, cuerpo: string): void {
        borrador.cambiarCuerpo(cuerpo);
    }

    agregarDestinatario(borrador: Correo, destinatario: Contacto): void {
        borrador.agregarDestinatario(destinatario);
    }
}