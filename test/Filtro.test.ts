import { describe, it, expect } from 'vitest';
import { Correo } from "../src/Correo.js";
import { Contacto } from "../src/Contacto.js";
import { Filtro } from "../src/Filtro.js";
//funcion que fabrica la regla (predicado) del filtro, es un valor por eso va sin "type"
import { remitenteDelDominio, asuntoContiene, y } from "../src/Predicados.js";

const gabriel = new Contacto("Gabriel", "gabriel@ucp.edu.ar")
const tiago = new Contacto("Tiago", "tiago00@yopmail.com")

const correo1 = new Correo(gabriel, [tiago], "Examen UCP", "Probando filtros UCP");
const correo2 = new Correo(tiago, [gabriel], "Dominio Yopmail", "Dominio de correo diferente al de UCP");


describe("Filtro", () => {
    it("Filtra correo por remitente segun su dominio", () => {
        const filtroUCP = new Filtro("Correo de dominio UCP", remitenteDelDominio("@ucp.edu.ar"));

        // Esperamos que el filtro deje pasar solo los correos cuyo remitente es de la UCP.
        expect(filtroUCP.aplicarFiltro([correo1, correo2])).toEqual([correo1]);

    });
    // Esperamos que el AND deje pasar solo los correos que cumplen las dos condiciones
    it("Correos academicos importantes: de la UCP y con examen en el asunto", () => {
        // Cumple las dos: es de la UCP y el asunto tiene "Examen".
        const examenUcp = new Correo(gabriel, [tiago], "Examen final", "Fecha del examen");
        // Falla una: es de la UCP pero el asunto no tiene "Examen".
        const otroUcp = new Correo(gabriel, [tiago], "Reunion", "Nos vemos el martes");
        // Falla la otra: el asunto tiene "Examen" pero no es de la UCP.
        const examenExterno = new Correo(tiago, [gabriel], "Examen", "Correo de afuera");

        const filtroImportancia = new Filtro("Académico importante", y(remitenteDelDominio("@ucp.edu.ar"), asuntoContiene("Examen")))

        expect(filtroImportancia.aplicarFiltro([examenUcp, otroUcp, examenExterno])).toEqual([correo1]);
    });
});