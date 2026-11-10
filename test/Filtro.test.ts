import { describe, it, expect } from 'vitest';
import { Correo } from "../src/Correo.js";
import { Contacto } from "../src/Contacto.js";
import { Filtro } from "../src/Filtro.js";
import { RemitenteDelDominio } from "../src/RemitenteDelDominio.js";

const gabriel = new Contacto("Gabriel", "gabriel@ucp.edu.ar")
const tiago = new Contacto("Tiago", "tiago00@yopmail.com")

const correo1 = new Correo(gabriel, [tiago], "Dominio UCP", "Probando filtro de dominio UCP");
const correo2 = new Correo(tiago, [gabriel], "Dominio Yopmail", "Dominio de correo diferente al de UCP");

describe("Filtro", () => {
    it("Filtra correo por remitente segun su dominio", () => {
        const filtroUCP = new Filtro("Correo de dominio UCP", RemitenteDelDominio("@ucp.edu.ar"));
     
        expect(filtroUCP.filtrar(correo1)).toEqual(true);
        expect(filtroUCP.filtrar(correo2)).toEqual(false);
    });
});