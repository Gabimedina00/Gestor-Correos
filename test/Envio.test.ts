import { describe, it, expect } from "vitest";
import { Bandeja } from "../src/Bandeja.js";
// Importamos la función que vamos a crear en el siguiente paso
import { enviarCorreo } from "../src/Envio.js";

describe("S1-06: Envío de Correos", () => {
  it("debe procesar el envío de un correo y guardarlo en la bandeja", () => {
    const bandejaEnviados = new Bandeja("Enviados");
    const correoMock = { 
      asunto: "Hola", 
      cuerpo: "Prueba de envío",
      esValidoParaEnviar: () => true 
    } as any;
    
    // Ejecutamos la función de envío que vamos a programar
    enviarCorreo(correoMock, bandejaEnviados);
    
    // Verificamos que el correo se haya guardado en la bandeja
    const correos = bandejaEnviados.getCorreos();
    expect(correos).toHaveLength(1);
    expect(correos[0]).toBe(correoMock);
  });
  it("debe lanzar un error si el correo no es válido para enviar", () => {
    const bandejaEnviados = new Bandeja("Enviados");
    
    // Simulamos un correo que devuelve false al validar
    const correoInvalidoMock = {
      esValidoParaEnviar: () => false
    } as any;

    // Verificamos que la función frene la ejecución y lance el error
    expect(() => {
      enviarCorreo(correoInvalidoMock, bandejaEnviados);
    }).toThrowError("El correo no es válido para ser enviado");
  });

  it("debe sacar el correo de la bandeja de Borradores al enviarlo", () => {
    const bandejaEnviados = new Bandeja("Enviados");
    const bandejaBorradores = new Bandeja("Borradores");
    
    const correoMock = { 
      asunto: "Terminé el borrador", 
      esValidoParaEnviar: () => true 
    } as any;

    // Metemos el correo en borradores primero
    bandejaBorradores.agregarCorreo(correoMock);

    // Ejecutamos el envío pasándole la bandeja de origen como tercer parámetro
    enviarCorreo(correoMock, bandejaEnviados, bandejaBorradores);

    // Verificamos que llegó a Enviados y que ya no está en Borradores
    expect(bandejaEnviados.getCorreos()).toHaveLength(1);
    expect(bandejaBorradores.getCorreos()).toHaveLength(0);
  });


  it("no debe duplicar el correo en Enviados si se intenta enviar dos veces", () => {
    const bandejaEnviados = new Bandeja("Enviados");
    const correoMock = { 
      asunto: "Doble click por error", 
      esValidoParaEnviar: () => true 
    } as any;

    // Intentamos enviar el mismo correo dos veces seguidas
    enviarCorreo(correoMock, bandejaEnviados);
    enviarCorreo(correoMock, bandejaEnviados);

    // Verificamos que en la bandeja solo esté guardado una vez
    expect(bandejaEnviados.getCorreos()).toHaveLength(1);
  })
  
  it("debe permitir el envío de un correo a múltiples destinatarios", () => {
    const bandejaEnviados = new Bandeja("Enviados");
    // Simulamos un arreglo con varios correos
    const destinatariosMultiples = ["gabi@ucp.edu.ar", "profe@ucp.edu.ar", "tiago@ucp.edu.ar"];
    
    const correoMock = { 
      asunto: "Entrega Trabajo Práctico TDD",
      destinatarios: destinatariosMultiples,
      esValidoParaEnviar: () => true 
    } as any;

    // Ejecutamos el envío
    enviarCorreo(correoMock, bandejaEnviados);

    // Verificamos que se guardó bien y que conservó a todos los destinatarios
    const correosGuardados = bandejaEnviados.getCorreos();
    expect(correosGuardados).toHaveLength(1);
    expect(correosGuardados[0].destinatarios).toHaveLength(3);
    expect(correosGuardados[0].destinatarios).toEqual(destinatariosMultiples);
  });
});

