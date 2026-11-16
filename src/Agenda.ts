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

    // Busca el contacto por email y le cambia el nombre.
    modificarNombre(email: string, nuevoNombre: string): void {
        const contacto = this.buscarPorEmail(email);
        // Guarda: no se puede modificar un contacto que no está en la agenda.
        if (!contacto) {
            throw new Error("No existe un contacto con ese email");
        }
        contacto.cambiarNombre(nuevoNombre);
    }
}
