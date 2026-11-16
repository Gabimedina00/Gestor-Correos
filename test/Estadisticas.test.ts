import { describe, it, expect } from "vitest";
import { Correo } from "../src/Correo.js";
import { Contacto } from "../src/Contacto.js";
// Función de estadística: resume la lista en un solo resultado con reduce.
import { cantidadPorRemitente } from "../src/Estadisticas.js";

const gabriel = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");
const tiago = new Contacto("Tiago Meo Nielsen", "tiagoMN@ucp.edu.ar");

describe("Estadisticas", () => {
    // Esperamos un resumen: cuántos correos envió cada remitente.
    it("Cuenta los correos de cada remitente con reduce", () => {
        // Dos correos enviados por gabriel y uno por tiago.
        const c1 = new Correo(gabriel, [tiago], "TP", "terminar");
        const c2 = new Correo(gabriel, [tiago], "Examen", "repaso");
        const c3 = new Correo(tiago, [gabriel], "Reunion", "aviso");

        // Un solo resultado para toda la lista: el email de cada remitente con su cantidad.
        // Los emails van en minúscula porque Email los normaliza (tiagoMN → tiagomn).
        expect(cantidadPorRemitente([c1, c2, c3])).toEqual({
            "gabmedina@ucp.edu.ar": 2,
            "tiagomn@ucp.edu.ar": 1,
        });
    });
});

