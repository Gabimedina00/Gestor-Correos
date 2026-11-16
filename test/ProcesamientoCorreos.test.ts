import { describe, it, expect } from "vitest";
import { Correo } from "../src/Correo.js";
import { Contacto } from "../src/Contacto.js";
import { asuntosDe, correosQueCumplen } from "../src/ProcesamientoCorreos.js";
import { asuntoContiene } from "../src/Predicados.js";

const gabriel = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");
const tiago = new Contacto("Tiago Meo Nielsen", "tiagoMN@ucp.edu.ar");

describe("Procesamiento Correos", () => {
    // Esperamos una lista con el asunto de cada correo, en el mismo orden
    it("Obtiene la lista de los asuntos con map", () => {
        //3 correos con asuntos distintos
        const correo1 = new Correo(gabriel, [tiago], "TP", "terminar");
        const correo2 = new Correo(gabriel, [tiago], "Examen", "repaso");
        const correo3 = new Correo(gabriel, [tiago], "Reunion", "aviso");

        expect(asuntosDe([correo1, correo2, correo3])).toEqual(["TP", "Examen", "Reunion"]);

    })

    // Esperamos solo los correos que cumplen la condición que le pasamos
    //Reutilizamos los predicados del RF-05: la condición es cualquier Predicado, así que sirve cualquiera
    it("Obtiene los correos que cumplen una condicion con filter", () => {
       const c1 = new Correo(gabriel, [tiago], "TP", "terminar");
       const c2 = new Correo(gabriel, [tiago], "Examen", "repaso");
       const c3 = new Correo(gabriel, [tiago], "Examen", "aviso");

       expect(correosQueCumplen([c1, c2, c3], asuntoContiene("Examen"))).toEqual([c2,c3]);
    })
})