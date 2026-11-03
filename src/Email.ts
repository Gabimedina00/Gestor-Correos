//El mail debe cumplir un patron, usuario, @, dominio, punto y terminación de 2 letras o más.
const FORMATO_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//Email es un objeto de valor, valida y normaliza la dirección una sola vez, cuando se crea.
export class Email {
    private readonly valor: string;

    constructor(valor: string) {
        const normalizado = valor.trim().toLowerCase();

        //Guarda. Si el mail normalizado no cumple el formato, el objeto no se crea
        if (!FORMATO_EMAIL.test(normalizado)) {
            throw new Error("Email inválido");
        }
        this.valor = normalizado;
    }
    //unica forma de leer el mail desde afuera. 
    getValor(): string {
        return this.valor;
    }
}