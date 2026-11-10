import { describe, expect, it } from "vitest";
import { Contacto } from "../src/Contacto.js";
import { Correo } from "../src/Correo.js";
import { ValidadorCorreo } from "../src/ValidadorCorreo.js";

//Contactos de prueba para los tests.
const gabriel = new Contacto("Gabriel", "gabriel@ucp.edu.ar");
const tiago = new Contacto("Tiago", "tiago@ucp.edu.ar");

const correoPrueba = new Correo(gabriel, [tiago], "Validador de correo", "probando nuevo funcionamiento del gestor de correo");
const correoSinAsunto = new Correo(gabriel, [tiago], "  ", "correo sin asunto");
const correoSinDestinatario = new Correo(gabriel, [], "Sprint 02", "correo sin destinatario");

const validadorCorreo = new ValidadorCorreo();

//Decide si un correo esta listo para enviarse.
describe("Validador de correo", () => {
    it("Un correo con asunto y destinatarios es valido para enviar", () => {
        expect(validadorCorreo.esValidoParaEnviar(correoPrueba)).toBe(true);
    });
    
    it("Un correo con asunto de solo espacios no es valido para enviar", () => {
        const correoSinAsunto = new Correo(gabriel, [tiago], "", "correo sin asunto");
        expect(validadorCorreo.esValidoParaEnviar(correoSinAsunto)).toBe(false);
    });

    it("Un correo sin destinatarios no es valido para enviar", () => {
        const correoSinDestinatario = new Correo(gabriel, [], "Sprint 02", "correo sin destinatario");
        expect(validadorCorreo.esValidoParaEnviar(correoSinDestinatario)).toBe(false);
    });
});