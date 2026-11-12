import { describe, it, expect } from 'vitest';
import { Correo } from "../src/Correo.js";
import { Contacto } from "../src/Contacto.js";
import { Filtro } from "../src/Filtro.js";
//funcion que fabrica la regla (predicado) del filtro, es un valor por eso va sin "type"
import { remitenteDelDominio, asuntoContiene, y, o, no, cuerpoContieneAlguna } from "../src/Predicados.js";

const gabriel = new Contacto("Gabriel", "gabriel@ucp.edu.ar")
const tiago = new Contacto("Tiago", "tiago00@yopmail.com")

const correo1 = new Correo(gabriel, [tiago], "UCP", "Probando filtros UCP");
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

        expect(filtroImportancia.aplicarFiltro([examenUcp, otroUcp, examenExterno])).toEqual([examenUcp]);
    });

    // Esperamos que el OR acepte cualquiera de las dos palabras y el NOT excluya a los de la UCP.
    it("Seguimiento externo: Proyecto o Reunion, y que no sea de la UCP", () => {
        // Pasa: es de afuera y el asunto tiene "Proyecto".
        const proyectoExterno = new Correo(tiago, [gabriel], "Proyecto final", "Avances del proyecto");
        // Pasa: es de afuera y el asunto tiene "Reunion" (con una de las dos palabras alcanza).
        const reunionExterno = new Correo(tiago, [gabriel], "Reunion martes", "Nos juntamos a las 18");
        // No pasa: tiene "Proyecto" pero es de la UCP (lo excluye el NOT).
        const proyectoUcp = new Correo(gabriel, [tiago], "Proyecto", "Entrega del proyecto");
        // No pasa: es de afuera pero el asunto no tiene ninguna de las dos palabras.
        const otroExterno = new Correo(tiago, [gabriel], "Hola", "Saludos");

        // 'o' acepta cualquiera de las dos palabras; 'no' da vuelta la regla de la UCP; 'y' exige las dos cosas.
        const filtroSeguimiento = new Filtro("Seguimiento externo", y(o(asuntoContiene("Proyecto"), asuntoContiene("Reunion")), no(remitenteDelDominio("@ucp.edu.ar"))));

        expect(filtroSeguimiento.aplicarFiltro([proyectoExterno, reunionExterno, proyectoUcp, otroExterno])).toEqual([proyectoExterno, reunionExterno]);
    });

    // Esperamos que un mismo predicado se reutilice en filtros distintos
    it("Reutiliza el predicado de la UCP en dos filtros distintos", () => {
        //regla que debe cumplir el dominio del remitente
        const deUcp = remitenteDelDominio("@ucp.edu.ar");

        //4 correos para este filtro, usando combinadores para que controle entre varias palabras filtro
        const examenUcp = new Correo(gabriel, [tiago], "Filtro de palabras de importancia academica", "examen ucp en 7 días");
        const entregaUcp = new Correo(gabriel, [tiago], "Filtro Cuerpo", "Entrega en unos dias");
        const otroUcp = new Correo(gabriel, [tiago], "Sin Examen,Entrega o Parcial en el cuerpo", "test");
        const entregaExterna = new Correo(tiago, [gabriel], "Fail en dominio correo", "Entrega venció hace 24 hrs");

        //Mismo predicado deUcp utilizado en dos filtros distintos
        const filtroUcp = new Filtro("Correos de la UCP", deUcp);
        const filtroAcademicos = new Filtro("Académicos de la UCP", y(deUcp, cuerpoContieneAlguna(["Entrega", "Examen", "Parcial"])));
        const correos = [examenUcp, entregaUcp, otroUcp, entregaExterna];

        expect(filtroUcp.aplicarFiltro([examenUcp, entregaUcp, otroUcp, entregaExterna])).toEqual([examenUcp, entregaUcp, otroUcp]);
        expect(filtroAcademicos.aplicarFiltro(correos)).toEqual([examenUcp, entregaUcp]);
    });
});