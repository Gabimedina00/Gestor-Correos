import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto.js";
import { Correo } from "../src/Correo.js";
import { Filtro } from "../src/Filtro.js";
import { remitenteDelDominio, asuntoContiene, y, o, no } from "../src/Predicados.js";

const gabriel = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");
const externo = new Contacto("Juan Perez", "juanperez@gmail.com");

// 100 correos con un patrón conocido (Array.from llama a la función por cada posición i):
// pares de la UCP, impares externos; múltiplos de 5 con "Examen" en el asunto.
const correos = Array.from({ length: 100 }, (_, i) =>
    new Correo(i % 2 === 0 ? gabriel : externo, [gabriel], i % 5 === 0 ? `Examen ${i}` : `Aviso ${i}`, "Cuerpo")
);

describe("Filtros sobre 100 correos", () => {
    // Esperamos que cada filtro devuelva exactamente la cantidad que sale del patrón.
    it("Cada filtro devuelve la cantidad exacta sobre 100 correos", () => {
        const deUcp = remitenteDelDominio("@ucp.edu.ar");
        const conExamen = asuntoContiene("Examen");

        expect(new Filtro("UCP", deUcp).aplicarFiltro(correos)).toHaveLength(50);
        expect(new Filtro("Examen", conExamen).aplicarFiltro(correos)).toHaveLength(20);
        expect(new Filtro("UCP y Examen", y(deUcp, conExamen)).aplicarFiltro(correos)).toHaveLength(10);
        expect(new Filtro("UCP o Examen", o(deUcp, conExamen)).aplicarFiltro(correos)).toHaveLength(60);
        expect(new Filtro("Externos", no(deUcp)).aplicarFiltro(correos)).toHaveLength(50);
    });

    // Esperamos que filtrar 100 correos no modifique la lista original.
    it("Filtrar no modifica la lista de 100 correos", () => {
        new Filtro("UCP", remitenteDelDominio("@ucp.edu.ar")).aplicarFiltro(correos);

        expect(correos).toHaveLength(100);
    });
});