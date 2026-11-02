import { describe, expect, it } from "vitest";
import { Contacto } from "../src/Contacto.js";

describe("Contacto", () => {
    //Esperamos que el contacto guarde el nombre y el email tal como se los pasamos.
    it("guarda el nombre y el email", () => {
        const contacto = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");

        expect(contacto.getNombre()).toBe("Gabriel Medina");
        expect(contacto.getEmail()).toBe("gabmedina@ucp.edu.ar")
    });

    // Esperamos que crear un contacto con un email sin @ tire un error.
    it("email inválido (falta el @)", () => {
        expect(() => new Contacto("Gabriel", "gabrielmeducp.edu.ar")).toThrow();

    });
    // Esperamos que el email se guarde sin espacios y en minúsculas.
    it("Guarda el email en minúsculas y sin espacios", () => {
        const contacto = new Contacto("Gabriel Medina", " GABMEDINA@UCP.EDU.AR ");

        expect(contacto.getEmail()).toBe("gabmedina@ucp.edu.ar");
    });
});  
