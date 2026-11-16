import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto.js";
import { Agenda } from "../src/Agenda.js"

describe("Agenda", () => {
    //Esperamos que un contacto agregado se pueda encontrar por su email
    it("Agrega un contacto y lo encuentra por email", () => {
        const agenda = new Agenda();
        const gabriel = new Contacto("gabriel", "gabmedina@ucp.edu.ar");

        agenda.Agregar(gabriel);

        expect(agenda.buscarPorEmail("gabmedina@ucp.edu.ar")).toBe(gabriel);
    });
    it("No permite dos contactos con el mismo email", () => {
        const agenda = new Agenda();
        const GabrielMedina = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");
        const repetido = new Contacto("Gabi", "GABMEDINA@UCP.EDU.AR");

        agenda.Agregar(GabrielMedina);

        expect(() => agenda.Agregar(repetido)).toThrow();
    })
});