import { describe, it, expect } from "vitest";
import { Correo, AsuntoDe, Contacto } from "../src/Estadisticas.js";

const gabriel = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");
const tiago = new Contacto("Tiago Meo Nielsen", "tiagoMN@ucp.edu.ar");

describe("Estadisticas", () =>{
    // Esperamos una lista con el asunto de cada correo, en el mismo orden
    it("Obtiene la lista de los asuntos con map",() =>{
    //3 correos con asuntos distintos
    const correo1 = new Correo(gabriel, [tiago], "TP","terminar");
    const correo2 = new Correo(gabriel, [tiago], "Examen","repaso");
    const correo3 = new Correo(gabriel, [tiago], "Reunion","aviso");

    expect(asuntosDe([correo1, correo2, correo3])).toEqual(["TP", "Examen", "Reunion"]);

    })
})