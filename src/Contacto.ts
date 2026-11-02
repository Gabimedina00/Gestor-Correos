const FORMATO_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class Contacto {
    private nombre: string;
    private email: string;

    constructor(nombre: string, email: string) {
        //Si no cumple con el formato de email, lanza un error
        if (!FORMATO_EMAIL.test(email)) {
            throw new Error("Email inválido");
        }

        this.nombre = nombre;
        this.email = email;
    }

    getNombre(): string {
        return this.nombre;
    }
    getEmail(): string {
        return this.email;
    }
}