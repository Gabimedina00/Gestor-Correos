import { describe, it, expect } from "vitest";
// Importamos la clase que vamos a probar
import { Bandeja } from "../src/Bandeja.js";

describe("RF-06: Bandejas y clasificación", () => {
  // Se espera que al crear una bandeja, esta no tenga correos adentro.
  it("debe estar vacía al crearse y permitir consultar sus correos", () => {
    // Instanciamos una nueva bandeja de tipo Entrada
    const bandeja = new Bandeja("Entrada");
    
    // Consultamos los correos de la bandeja
    const correos = bandeja.getCorreos();
    
    // Verificamos que la colección de correos esté vacía
    expect(correos).toEqual([]);
    expect(correos).toHaveLength(0);
  });

  // Se espera que la bandeja pueda recibir correos y almacenarlos.
  it("debe permitir agregar un correo a la bandeja", () => {
    const bandeja = new Bandeja("Entrada");
    
    // Usamos un objeto simple (mock) simulando ser un Correo
    const correoMock = { asunto: "Hola", cuerpo: "Prueba" } as any;
    
    // Ejecutamos el método que vamos a probar
    bandeja.agregarCorreo(correoMock);
    
    // Verificamos que ahora la bandeja tenga 1 correo y sea exactamente el que agregamos
    const correos = bandeja.getCorreos();
    expect(correos).toHaveLength(1);
    expect(correos[0]).toBe(correoMock);
  });

  it("getCorreos debe devolver una copia de la lista original", () => {
    const bandeja = new Bandeja("Entrada");
    const correoMock = { asunto: "Test Copia" } as any;
    bandeja.agregarCorreo(correoMock);
    
    // Obtenemos los correos e intentamos modificar el arreglo desde afuera
    const copiaCorreos = bandeja.getCorreos();
    copiaCorreos.push({ asunto: "Correo Intruso" } as any);
    
    // La bandeja original no debería verse afectada por el push de arriba
    expect(bandeja.getCorreos()).toHaveLength(1);
  });

  it("no debe permitir agregar un correo que ya existe en la bandeja", () => {
    const bandeja = new Bandeja("Entrada");
    const correoMock = { asunto: "Prueba de duplicado" } as any;
    
    // Agregamos el mismo correo dos veces
    bandeja.agregarCorreo(correoMock);
    bandeja.agregarCorreo(correoMock);
    
    // Verificamos que la bandeja solo tenga 1 correo guardado, no 2
    expect(bandeja.getCorreos()).toHaveLength(1);
  });

  it("debe lanzar un error si se intenta crear una bandeja con un nombre no permitido", () => {
    // Envolvemos la creación en una función anónima para que expect pueda atrapar el error
    expect(() => {
      new Bandeja("Spam");
    }).toThrowError("Nombre de bandeja no permitido");
  });
  
  // Se espera que un correo pueda moverse de una bandeja de origen a una de destino.
 it("debe permitir eliminar un correo moviéndolo a la bandeja Eliminados", () => {
    const bandejaEntrada = new Bandeja("Entrada");
    const bandejaEliminados = new Bandeja("Eliminados");
    const correoMock = { asunto: "Promo de locos" } as any;

    // Estado inicial
    bandejaEntrada.agregarCorreo(correoMock);
    
    // Ejecutamos el método que vamos a crear
    bandejaEntrada.eliminarCorreo(correoMock, bandejaEliminados);

    // Verificamos que se movió correctamente
    expect(bandejaEntrada.getCorreos()).toHaveLength(0);
    expect(bandejaEliminados.getCorreos()).toHaveLength(1);
    expect(bandejaEliminados.getCorreos()[0]).toBe(correoMock);
  });
 it("debe permitir restaurar un correo desde Eliminados a otra bandeja", () => {
    const bandejaEliminados = new Bandeja("Eliminados");
    const bandejaEntrada = new Bandeja("Entrada");
    const correoMock = { asunto: "Factura recuperada" } as any;

    // Estado inicial: el correo está en la papelera
    bandejaEliminados.agregarCorreo(correoMock);
    
    // Ejecutamos el método que vamos a crear
    bandejaEliminados.restaurarCorreo(correoMock, bandejaEntrada);

    // Verificamos el movimiento
    expect(bandejaEliminados.getCorreos()).toHaveLength(0);
    expect(bandejaEntrada.getCorreos()).toHaveLength(1);
    expect(bandejaEntrada.getCorreos()[0]).toBe(correoMock);
  });
  it("debe buscar y devolver los correos que coincidan con el texto en el asunto o cuerpo", () => {
    const bandeja = new Bandeja("Entrada");
    
    const correo1 = { asunto: "Reunión de proyecto", cuerpo: "Nos vemos a las 10" } as any;
    const correo2 = { asunto: "Factura de luz", cuerpo: "Vence el viernes" } as any;
    const correo3 = { asunto: "Notas TDD", cuerpo: "Avanzar con el proyecto final" } as any;

    bandeja.agregarCorreo(correo1);
    bandeja.agregarCorreo(correo2);
    bandeja.agregarCorreo(correo3);

    // Buscamos la palabra "proyecto" (debería encontrar el 1 y el 3)
    const resultados = bandeja.buscarCorreos("proyecto");

    expect(resultados).toHaveLength(2);
    expect(resultados).toContain(correo1);
    expect(resultados).toContain(correo3);
  });
});