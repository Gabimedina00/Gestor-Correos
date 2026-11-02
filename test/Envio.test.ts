import { describe, it, expect } from "vitest";
import { Bandeja } from "../src/Bandeja.js";
// Importamos la función que vamos a crear en el siguiente paso
import { enviarCorreo } from "../src/Envio.js";

describe("S1-06: Envío de Correos", () => {
  it("debe procesar el envío de un correo y guardarlo en la bandeja", () => {
    const bandejaEnviados = new Bandeja("Enviados");
    const correoMock = { asunto: "Hola", cuerpo: "Prueba de envío" } as any;
    
    // Ejecutamos la función de envío que vamos a programar
    enviarCorreo(correoMock, bandejaEnviados);
    
    // Verificamos que el correo se haya guardado en la bandeja
    const correos = bandejaEnviados.getCorreos();
    expect(correos).toHaveLength(1);
    expect(correos[0]).toBe(correoMock);
  });
});