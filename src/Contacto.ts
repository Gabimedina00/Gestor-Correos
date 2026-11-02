import { Email } from "./Email.js"

//Contacto de la agenda. La validación del email la hace la clase Email.
export class Contacto {
    private nombre: string;
    //Composición un contacto tiene un mail
    private email: Email;

    constructor(nombre: string, email: string) {
        this.nombre = nombre;
        //Si el email es inválido, Email tira el error y el contacto no se crea
        this.email = new Email(email);
    }

    getNombre(): string {
        return this.nombre;
    }
    //Devuelve el email ya normalizado.
    getEmail(): string {
        return this.email.getValor();
    }
}