import { Contacto } from "./Contacto.js";

export class Agenda {
    private contactos: Contacto[] = [];

    //Agrega un contacto, salvo que ya exista otro con el mismo email
    Agregar(contacto: Contacto): void {
        if (this.buscarPorEmail(contacto.getEmail())) {
            throw new Error("Ya existe un contacto con ese email");
        }
        this.contactos.push(contacto);
    }

    buscarPorEmail(email: string): Contacto | undefined {
        return this.contactos.find(contacto => contacto.getEmail() === email);
    }
}
