import { describe, expect, it } from "vitest";
import { Contacto } from "../src/Contacto.js";

describe("Contacto", () => {
    it("guarda el nombre y el email", () => {
        const contacto = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");

        expect(contacto.getNombre()).toBe("Gabriel Medina");
        expect(contacto.getEmail()).toBe("gabmedina@ucp.edu.ar")
    });

    it("email inválido (falta el @)", () => {
        expect(() => new Contacto("Gabriel", "gabrielmeducp.edu.ar")).toThrow();

    });
});  