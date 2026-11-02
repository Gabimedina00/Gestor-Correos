const FORMATO_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class Email {
    private readonly valor: string;

    constructor(valor: string) {
        //Si no cumple con el formato de email, lanza un error
        if (!FORMATO_EMAIL.test(valor)) {
            throw new Error("Email inválido");
        }
        this.valor = valor;
    }

    getValor(): string {
        return this.valor;
    }
}