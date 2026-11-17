import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto.js";
import { ValidadorCorreo } from "../src/ValidadorCorreo.js";
import { RedactorCorreos } from "../src/RedactorCorreos.js";
import { Bandeja } from "../src/Bandeja.js";
import { enviarCorreo } from "../src/Envio.js";

const gabriel = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");
const tiago = new Contacto("Tiago Meo Nielsen", "tiagomn@ucp.edu.ar");

describe("RedactorCorreos", () => {
    // Esperamos que al empezar a redactar se cree un borrador incompleto, que todavía no se puede enviar.
    it("Inicia un borrador incompleto con el remitente", () => {
        // El validador se le pasa al redactor (inyección de dependencias).
        const redactor = new RedactorCorreos(new ValidadorCorreo());

        const borrador = redactor.iniciarBorrador(gabriel);

        expect(borrador.getRemitente()).toBe(gabriel);
        expect(borrador.getAsunto()).toBe("");
        expect(borrador.getDestinatarios()).toEqual([]);
        // Un borrador puede estar incompleto, pero así no se puede enviar.
        expect(redactor.puedeEnviarse(borrador)).toBe(false);
    });

    // Esperamos que los cambios de la edición queden guardados en el mismo borrador.
    it("Edita un borrador y conserva los cambios", () => {
        const redactor = new RedactorCorreos(new ValidadorCorreo());
        const borrador = redactor.iniciarBorrador(gabriel);

        redactor.escribirAsunto(borrador, "TP final");
        redactor.escribirCuerpo(borrador, "Adjunto el avance");
        redactor.agregarDestinatario(borrador, tiago);

        expect(borrador.getAsunto()).toBe("TP final");
        expect(borrador.getCuerpo()).toBe("Adjunto el avance");
        expect(borrador.getDestinatarios()).toEqual([tiago]);
        // Ya completo, el validador lo aprueba.
        expect(redactor.puedeEnviarse(borrador)).toBe(true);
    });

        // Esperamos que el borrador quede en Borradores, se pueda recuperar y completar, y al enviarlo pase a Enviados.
    it("Guarda el borrador en Borradores y al enviarlo pasa a Enviados", () => {
        const redactor = new RedactorCorreos(new ValidadorCorreo());
        const borradores = new Bandeja("Borradores");
        const enviados = new Bandeja("Enviados");
        const borrador = redactor.iniciarBorrador(gabriel);

        borradores.agregarCorreo(borrador);
        // Se recupera desde Borradores y se termina de escribir.
        expect(borradores.getCorreos()).toContain(borrador);
        redactor.escribirAsunto(borrador, "TP final");
        redactor.agregarDestinatario(borrador, tiago);

        enviarCorreo(borrador, enviados, borradores);

        expect(enviados.getCorreos()).toContain(borrador);
        expect(borradores.getCorreos()).not.toContain(borrador);
    });

    // Esperamos que un borrador incompleto no se pueda enviar y siga en Borradores.
    it("Un borrador incompleto no se puede enviar", () => {
        const redactor = new RedactorCorreos(new ValidadorCorreo());
        const borradores = new Bandeja("Borradores");
        const enviados = new Bandeja("Enviados");
        const borrador = redactor.iniciarBorrador(gabriel);
        borradores.agregarCorreo(borrador);

        expect(() => enviarCorreo(borrador, enviados, borradores)).toThrow();
        expect(borradores.getCorreos()).toContain(borrador);
    });
});