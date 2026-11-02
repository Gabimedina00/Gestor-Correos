//El mail debe cumplir un patron, usuario, @, dominio, punto y terminación de 2 letras o más.
const FORMATO_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class Email {
    private readonly valor: string;

    constructor(valor: string) {
        const normalizado = valor.trim().toLowerCase();

        //Si no cumple con el formato de email, lanza un error
        if (!FORMATO_EMAIL.test(normalizado)) {
            throw new Error("Email inválido");
        }
        this.valor = normalizado;
    }

    getValor(): string {
        return this.valor;
    }
}