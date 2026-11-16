import { describe, it, expect } from "vitest";
// Importamos la clase que vamos a probar
import { Bandeja } from "../src/Bandeja.js";
import { Correo } from "../src/Correo.js";
import { Contacto } from "../src/Contacto.js";

const gabriel = new Contacto("Gabriel", "gabriel@ucp.edu.ar");
const tiago = new Contacto("Tiago", "tiago@ucp.edu.ar");

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

  // RF-09: Filtrar Favoritos
  it("debe devolver solo los correos marcados como favoritos", () => {
    // Reutilizamos los contactos que seguro ya tenés definidos arriba
    const correo1 = new Correo(gabriel, [tiago], "Importante", "Texto 1");
    const correo2 = new Correo(gabriel, [tiago], "Spam", "Texto 2");
    const correo3 = new Correo(gabriel, [tiago], "Aviso", "Texto 3");

    // Marcamos solo el 1 y el 3
    correo1.marcarComoFavorito();
    correo3.marcarComoFavorito();

    // Instanciamos la bandeja con un nombre PERMITIDO ("Entrada")
    const bandeja = new Bandeja("Entrada");
    bandeja.agregarCorreo(correo1);
    bandeja.agregarCorreo(correo2);
    bandeja.agregarCorreo(correo3);

    // Ejecutamos la acción que todavía no existe
    const favoritos = bandeja.obtenerFavoritos();

    // Verificamos que traiga exactamente los que marcamos
    expect(favoritos).toContain(correo1);
    expect(favoritos).toContain(correo3);
    expect(favoritos).not.toContain(correo2);
    expect(favoritos.length).toBe(2);
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

    // Reemplazamos las propiedades estáticas por funciones getter en los mocks
    const correo1 = { getAsunto: () => "Reunión de proyecto", getCuerpo: () => "Nos vemos a las 10" } as any;
    const correo2 = { getAsunto: () => "Factura de luz", getCuerpo: () => "Vence el viernes" } as any;
    const correo3 = { getAsunto: () => "Notas TDD", getCuerpo: () => "Avanzar con el proyecto final" } as any;

    bandeja.agregarCorreo(correo1);
    bandeja.agregarCorreo(correo2);
    bandeja.agregarCorreo(correo3);

    // Buscamos la palabra "proyecto" (debería encontrar el 1 y el 3)
    const resultados = bandeja.buscarCorreos("proyecto");

    expect(resultados).toHaveLength(2);
    expect(resultados).toContain(correo1);
    expect(resultados).toContain(correo3);
  });
  // Test Adicional Integrador: Envío múltiple e independencia de bandejas
  it("debe mantener los correos en las otras bandejas si un destinatario lo elimina", () => {
    // 1. Preparamos las bandejas del remitente y 3 destinatarios
    const remitenteEnviados = new Bandeja("Enviados");
    
    const dest1Entrada = new Bandeja("Entrada");
    const dest1Eliminados = new Bandeja("Eliminados"); // A donde va a ir a parar al borrarlo
    
    const dest2Entrada = new Bandeja("Entrada");
    const dest3Entrada = new Bandeja("Entrada");

    // 2. Creamos un correo de prueba simulando que va a 3 personas
    const correoSimulado = { asunto: "Entrega Final", cuerpo: "Adjunto ZIP" } as any;

    // 3. Simulamos la entrega del sistema (llega a Enviados y a la Entrada de los 3)
    remitenteEnviados.agregarCorreo(correoSimulado);
    dest1Entrada.agregarCorreo(correoSimulado);
    dest2Entrada.agregarCorreo(correoSimulado);
    dest3Entrada.agregarCorreo(correoSimulado);

    // Verificamos que todos lo recibieron (Feedback de "ambas bandejas")
    expect(remitenteEnviados.getCorreos()).toHaveLength(1);
    expect(dest1Entrada.getCorreos()).toHaveLength(1);
    expect(dest2Entrada.getCorreos()).toHaveLength(1);
    expect(dest3Entrada.getCorreos()).toHaveLength(1);

    // 4. El Destinatario 1 decide eliminar su copia del correo
    dest1Entrada.eliminarCorreo(correoSimulado, dest1Eliminados);

    // 5. Verificamos que el Destinatario 1 ya no lo tiene en Entrada, sino en Eliminados
    expect(dest1Entrada.getCorreos()).toHaveLength(0);
    expect(dest1Eliminados.getCorreos()).toHaveLength(1);

    // 6. LO MÁS IMPORTANTE: Verificamos que las acciones del Dest. 1 NO afectaron al resto
    expect(dest2Entrada.getCorreos()).toHaveLength(1);
    expect(dest3Entrada.getCorreos()).toHaveLength(1);
    expect(remitenteEnviados.getCorreos()).toHaveLength(1);
  });
});