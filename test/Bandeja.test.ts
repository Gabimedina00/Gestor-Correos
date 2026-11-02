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
});