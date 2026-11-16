import { Contacto } from "./Contacto.js";

export class Agenda {
    private contactos: Contacto[] = [];


    Agregar(contacto: Contacto): void {
        this.contactos.push(contacto);
    }

    buscarPorEmail(email: string): Contacto | undefined {
        return this.contactos.find(contacto => contacto.getEmail() === email);
    }
}
