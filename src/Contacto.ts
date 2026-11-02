import { Email } from "./Email.js"

export class Contacto {
    private nombre: string;
    private email: Email;

    constructor(nombre: string, email: string) {
        this.nombre = nombre;
        this.email = new Email(email);
    }

    getNombre(): string {
        return this.nombre;
    }
    getEmail(): string {
        return this.email.getValor();
    }
}