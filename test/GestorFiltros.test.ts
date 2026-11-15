import { GestorFiltros } from "../src/GestorFiltros.js";
import { Filtro } from "../src/Filtro.js";
import { remitenteDelDominio } from "../src/Predicados.js";
import { it, describe, expect} from "vitest";

it("Registra hasta 5 filtros y rechaza el sexto", () => {
   const hasta6Filtros = new GestorFiltros();
   const deUcp = remitenteDelDominio("@ucp.edu.ar");

   hasta6Filtros.registrar(new Filtro("Filtro 1", deUcp));
   hasta6Filtros.registrar(new Filtro("Filtro 2", deUcp));
   hasta6Filtros.registrar(new Filtro("Filtro 3", deUcp));
   hasta6Filtros.registrar(new Filtro("Filtro 4", deUcp));
   hasta6Filtros.registrar(new Filtro("Filtro 5", deUcp));

   expect(GestorFiltros.getFiltros()).toHaveLength(5);
   expect(() => hasta6Filtros.registrar(new Filtro("Filtro 6", deUcp))).toThrow();
})
