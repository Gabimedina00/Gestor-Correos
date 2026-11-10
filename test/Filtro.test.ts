import { describe, it, expect } from 'vitest';
import { Correo } from "../src/Correo.js";
import { Contacto } from "../src/Contacto.js";
import { Filtro } from "../src/Filtro.js";
//funcion que fabrica la regla (predicado) del filtro, es un valor por eso va sin "type"
import { remitenteDelDominio } from "../src/Predicados.js";

const gabriel = new Contacto("Gabriel", "gabriel@ucp.edu.ar")
const tiago = new Contacto("Tiago", "tiago00@yopmail.com")

const correo1 = new Correo(gabriel, [tiago], "Dominio UCP", "Probando filtro de dominio UCP");
const correo2 = new Correo(tiago, [gabriel], "Dominio Yopmail", "Dominio de correo diferente al de UCP");

describe("Filtro", () => {
    it("Filtra correo por remitente segun su dominio", () => {
        const filtroUCP = new Filtro("Correo de dominio UCP", RemitenteDelDominio("@ucp.edu.ar"));

        // Esperamos que el filtro deje pasar solo los correos cuyo remitente es de la UCP.
        expect(filtroUCP.aplicarFiltro([correo1, correo2])).toEqual([correo1]);
       
    });
});