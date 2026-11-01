import {describe, expect, it} from "Vitest";
import {Contacto} from "../src/Contacto";

describe("Contacto", ()=>{
    it("guarda el nombre y el email", ()=>{
    const contacto = new Contacto("Gabriel Medina","gabmedina@ucp.edu.ar");

    expect(contacto.getNombre()).toBe("Gabriel Medina");
    expect(contacto.getEmail()).toBe("gabmedina@ucp.edu.ar")
 });
});