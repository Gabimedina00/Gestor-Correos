import { describe, it, expect } from "vitest";
// Importamos la clase que vamos a crear en el siguiente paso
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
});