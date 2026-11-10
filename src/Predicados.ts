import { Correo } from "./Correo.js";

//Funcion que recibe correo y devuelve un valor booleano
export type Predicado = (correo: Correo) => boolean;

//Funcion de orden superior, recibe un dominio y devuelve un predicado
export function remitenteDelDominio(dominio: string): Predicado {
    //endWith pregunta si termina con el dominio.
    return (correo: Correo) => correo.getRemitente().getEmail().endsWith(dominio);
}