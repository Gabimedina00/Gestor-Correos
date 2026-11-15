import { Filtro } from "../src/Filtro.js";

//maximo filtros que pide el RF05
const MAXIMO_FILTROS = 5

//RF05 Guarda los filtros registrados y no deja pasar de 5 (responsabilidad única).
export class GestorFiltro {
    private filtros: Filtro[] = [];

    registrar(filtro: Filtro): void {
        // Guarda: si ya hay 5, se rechaza con un error antes de agregar.
        if (this.filtros.length >= MAXIMO_FILTROS) {
            throw new Error("No se pueden registrar más de 5 filtros");
        }
        //agrega al final de la lista si pasa guarda
        this.filtros.push(filtro);
    }

    getFiltros(): Filtro[] {
        return this.filtros
    }
}