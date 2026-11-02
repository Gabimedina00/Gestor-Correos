import { Contacto } from "./Contacto.js";

// Correo electrónico. Se puede crear incompleto (por ejemplo, como borrador):
// los datos obligatorios se revisan recién al enviar.
export class Correo {
    private readonly remitente: Contacto;
    private destinatarios: Contacto[];
    private asunto: string;
    private cuerpo: string;
    //Los correos nuevos arrancan sin leer y sin marcar como favoritos.
    private leido = false;
    private favorito = false;

    constructor(remitente: Contacto, destinatarios: Contacto[], asunto: string, cuerpo: string) {
        this.remitente = remitente;
        this.destinatarios = destinatarios;
        this.asunto = asunto;
        this.cuerpo = cuerpo;
    }

    getRemitente(): Contacto { return this.remitente; }
    getDestinatarios(): Contacto[] { return this.destinatarios; }
    getAsunto(): string { return this.asunto; }
    getCuerpo(): string { return this.cuerpo; }
    esLeido(): boolean { return this.leido; }
    esFavorito(): boolean { return this.favorito; }
}