import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto.js";
import { ValidadorCorreo } from "../src/ValidadorCorreo.js";
import { RedactorCorreos } from "../src/RedactorCorreos.js";

const gabriel = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");

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
});