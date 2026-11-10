import { Correo } from "./Correo.js";
import type { Predicado } from "./Predicados.js";

//RF-05: un filtro es un nombre + una regla (predicado). No guarda correos.
export class Filtro {
    private readonly nombre: string;
    //regla: una funcion que recibe un correo y devuelve un booleano
    private readonly predicado: Predicado;

    constructor(nombre: string, predicado: Predicado) {
        this.nombre = nombre;
        this.predicado = predicado;
    }

    getNombre(): string {
        return this.nombre;
    }

    //Filter le aplica el predicado a cada correo y devuelve una lista nueva con los que dan true (no se toca la original)
    aplicarFiltro(correos: Correo[]): Correo[] {
        return correos.filter(this.predicado);
    }
}