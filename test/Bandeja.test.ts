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

  // Se espera que un correo pueda moverse de una bandeja de origen a una de destino.
  it("debe permitir mover un correo de una bandeja a otra", () => {
    const bandejaOrigen = new Bandeja("Entrada");
    const bandejaDestino = new Bandeja("Eliminados");
    const correoMock = { asunto: "Factura", cuerpo: "Mes de Octubre" } as any;

    // Preparamos el estado inicial agregando el correo al origen
    bandejaOrigen.agregarCorreo(correoMock);

    // Ejecutamos el método que vamos a crear para mover el correo
    bandejaOrigen.moverCorreo(correoMock, bandejaDestino);

    // Verificamos que se haya quitado del origen y agregado al destino
    expect(bandejaOrigen.getCorreos()).toHaveLength(0);
    expect(bandejaDestino.getCorreos()).toHaveLength(1);
    expect(bandejaDestino.getCorreos()[0]).toBe(correoMock);
  });
});