import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto.js";
import { Agenda } from "../src/Agenda.js"

describe("Agenda",() =>{
    it("Agrega un contacto y lo encuentra por email",() =>{
        //Esperamos que un contacto agregado se pueda encontrar por su email
        const agenda = new Agenda();
        const gabriel = new Contacto("gabriel", "gabmedina@ucp.edu.ar");

        agenda.agregar(gabriel);

        expect(agenda.buscarPorEmail("gabmedina@ucp.edu.ar")).toBe(gabriel);
    });
});