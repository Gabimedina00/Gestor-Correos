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

    //saca de la agenda el contacto con ese email. Los correos no se tocan.
    //Es agregación la agenda no es dueña del contacto. Al eliminarlo, la agenda deja de apuntarlo, pero el correo lo sigue apuntando.
    //Asi el historial no se pierde
    eliminar(email: string): void {
        //filter arma una lista nueva sin ese contacto
        this.contactos = this.contactos.filter(contacto => contacto.getEmail() !== email);
    }
}
