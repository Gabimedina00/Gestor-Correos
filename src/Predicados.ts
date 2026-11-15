import { Correo } from "./Correo.js";

//Funcion que recibe correo y devuelve un valor booleano
export type Predicado = (correo: Correo) => boolean;

//Funcion de orden superior, recibe un dominio y devuelve un predicado
export function remitenteDelDominio(dominio: string): Predicado {
    //endWith pregunta si termina con el dominio.
    return (correo: Correo) => correo.getRemitente().getEmail().endsWith(dominio.toLowerCase());
}

//Fabrica un predicado: ¿el asunto del correo incluye texto?
export function asuntoContiene(texto: string): Predicado {
    //lee el asunto del correo y se fija si contiene el texto buscado.toLower en ambos para que no importe como este escrito el asunto ni lo que se busca
    return (correo: Correo) => correo.getAsunto().toLowerCase().includes(texto.toLowerCase());
}

//fabrica el predicado: ¿el cuerpo tiene alguna de estas palabras? (sin importar mayusculas)
export function cuerpoContieneAlguna(palabras: string[]): Predicado {
    // some recorre las palabras y da true apenas una aparece en el cuerpo.
    // toLowerCase en los dos lados: "examen", "Examen" y "EXAMEN" cuentan igual.
    return (correo: Correo) => palabras.some(palabra => correo.getCuerpo().toLowerCase().includes(palabra.toLowerCase()));
}

//combinador and: recibe dos predicados y devuelve uno nuevo que exige que se cumplan los dos
export function y(a: Predicado, b: Predicado): Predicado {
    return (correo: Correo) => a(correo) && b(correo);
}

//combinador or: si es cualquiera verdadera o ambas, devuelve valida (tienen que fallar ambas para que devuelva false)
export function o(a: Predicado, b: Predicado): Predicado {
    return (correo: Correo) => a(correo) || b(correo);
}

//devuelve valor contrario al que se le pasa
export function no(a: Predicado): Predicado {
    return (correo: Correo) => !a(correo);
}