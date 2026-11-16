import { Correo } from "./Correo.js";

// RF-10 (estadística): cuenta cuántos correos envió cada remitente.
// Devuelve un objeto: cada email es una clave y su cantidad es el valor.
export function cantidadPorRemitente(correos: Correo[]): Record<string, number> {
    // Valor inicial del reduce: un objeto vacío, sin ningún remitente contado.
    const inicial: Record<string, number> = {};

    // reduce resume toda la lista en un solo resultado.
    // conteo = lo acumulado hasta ahora, correo = el que se está procesando.
    return correos.reduce((conteo, correo) => {
        // El email del remitente (ya viene en minúscula por la clase Email).
        const email = correo.getRemitente().getEmail();
        // Lo que ya tenía ese email (o 0 si es la primera vez) más 1.
        conteo[email] = (conteo[email] ?? 0) + 1;
        // Se devuelve el conteo actualizado para el siguiente correo.
        return conteo;
    }, inicial);
}