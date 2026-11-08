import { describe, expect, it } from "vitest";
import { Contacto } from "../src/Contacto.js";
import { Correo } from "../src/Correo.js";
import { ValidadorCorreo } from "../src/ValidadorCorreo.js";

//Contactos de prueba para los tests.
const gabriel = new Contacto("Gabriel", "gabriel@ucp.edu.ar");
const tiago = new Contacto("Tiago", "tiago@ucp.edu.ar");

const correoPrueba = new Correo(gabriel, [tiago], "Validador de correo", "probando nuevo funcionamiento del gestor de correo");
const validadorCorreo = new ValidadorCorreo();

//Decide si un correo esta listo para enviarse.
describe("Validador de correo", () => {
    it("Un correo con asunto y destinatarios es valido para enviar", () => {
        expect(validadorCorreo.esValidoParaEnviar(correoPrueba)).toBe(true);
    });
});