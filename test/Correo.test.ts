import {describe, expect, it} from "vitest";
import {Correo} from "../src/Correo.js";
import {Contacto} from "../src/Contacto.js";

//Contactos de prueba para los tests.
const gabriel = new Contacto("Gabriel", "gabriel@ucp.edu.ar");
const tiago = new Contacto("Tiago", "tiago@ucp.edu.ar");

describe ("Correo", () => {
    //Esperamos que el correo guarde sus datos y arranque sin leer y sin marcar como favorito.
    it("Crea correo con sus datos", () => {
        const correo = new Correo(gabriel, [tiago], "AE4","El AE4 es el martes");

        //toBe: es el mismo objeto, toEqual: Tiene el mismo contenido.
        expect(correo.getRemitente()).toBe(gabriel);
        expect(correo.getDestinatarios()).toEqual([tiago]);
        expect(correo.getAsunto()).toBe("AE4");
        expect(correo.getCuerpo()).toBe("El AE4 es el martes");
        expect(correo.esLeido()).toBe(false);
        expect(correo.esFavorito()).toBe(false);
    });
});