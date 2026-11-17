# Gestor de Correos Electrónicos con Filtros Dinámicos

Biblioteca en TypeScript que modela un gestor de correos: contactos y agenda, redacción y envío, bandejas, borradores, favoritos, búsqueda, filtros dinámicos combinables y estadísticas. El dominio se modela con **Programación Orientada a Objetos** y los filtros y el procesamiento de colecciones con **Programación Funcional**. Desarrollado con **TDD** e integración continua en GitHub Actions.

AE4 · Paradigmas y Lenguajes de Programación II · Universidad de la Cuenca del Plata · 2026

**Integrantes:** Gabriel Medina y Tiago Meo Nielsen

## Tecnologías

- TypeScript en modo estricto (`strict`, `verbatimModuleSyntax`)
- Vitest para los tests y `@vitest/coverage-v8` para la cobertura
- Node.js 22 (la versión que usa el CI)
- GitHub Actions: typecheck, tests y cobertura en cada pull request y en cada push a `main`

## Instalación y uso

```bash
git clone https://github.com/Gabimedina00/Gestor-Correos.git
cd Gestor-Correos
npm ci
```

| Comando | Qué hace |
|---|---|
| `npm test` | Corre todos los tests |
| `npm run test:coverage` | Corre los tests y muestra la cobertura |
| `npm run typecheck` | Revisa los tipos sin generar archivos |

No tiene interfaz gráfica: el funcionamiento se verifica con los tests, como permite la consigna.

## Requerimientos

| RF | Qué resuelve | Dónde está | Responsable |
|---|---|---|---|
| RF-01 | Creación de correos | `Correo`, `ValidadorCorreo` | Gabriel |
| RF-02 | Envío de correos | `Envio` (`enviarCorreo`) | Tiago |
| RF-03 | Contactos y agenda | `Email`, `Contacto`, `Agenda` | Gabriel |
| RF-04 | Búsqueda por texto en asunto y cuerpo | `Bandeja.buscarCorreos` | Tiago |
| RF-05 | Filtros dinámicos combinables (máximo 5) | `Predicados`, `Filtro`, `GestorFiltro` | Gabriel |
| RF-06 | Bandejas: mover, eliminar y restaurar | `Bandeja` | Tiago |
| RF-07 | Borradores | `RedactorCorreos` | Gabriel |
| RF-08 | Marcar como leído | `Correo.marcarComoLeido` | Tiago |
| RF-09 | Favoritos | `Correo`, `Bandeja.obtenerFavoritos` | Tiago |
| RF-10 | Procesamiento y estadísticas con `map`, `filter` y `reduce` | `ProcesamientoCorreos`, `Estadisticas` | Gabriel |

## Estructura

```
src/
  Email.ts                  objeto de valor: valida y normaliza el email
  Contacto.ts               nombre + Email (composición)
  Agenda.ts                 alta, consulta, modificación y baja de contactos
  Correo.ts                 datos del correo, id único, leído y favorito
  ValidadorCorreo.ts        decide si un correo se puede enviar
  RedactorCorreos.ts        crea y edita borradores
  Bandeja.ts                guarda correos: mover, eliminar, restaurar, buscar
  Envio.ts                  envía un correo a la bandeja de Enviados
  Predicados.ts             tipo Predicado, fábricas de reglas y combinadores y, o, no
  Filtro.ts                 nombre + predicado; aplica la regla a una lista
  GestorFiltro.ts           registra hasta 5 filtros
  ProcesamientoCorreos.ts   map y filter sobre colecciones de correos
  Estadisticas.ts           resúmenes con reduce
test/                       un archivo de tests por clase o módulo
.github/workflows/ci.yml    integración continua
```

## Ejemplo

```ts
const gabriel = new Contacto("Gabriel Medina", "gabmedina@ucp.edu.ar");
const tiago = new Contacto("Tiago Meo Nielsen", "tiagomn@ucp.edu.ar");

// RF-07: el redactor crea el correo y el validador decide si se puede enviar
const redactor = new RedactorCorreos(new ValidadorCorreo());
const correo = redactor.iniciarBorrador(gabriel);
redactor.escribirAsunto(correo, "Examen final");
redactor.agregarDestinatario(correo, tiago);
redactor.puedeEnviarse(correo); // true

// RF-05: un filtro que combina dos predicados
const academicos = new Filtro(
    "Académicos importantes",
    y(remitenteDelDominio("@ucp.edu.ar"), asuntoContiene("Examen"))
);
academicos.aplicarFiltro([correo]); // [correo]

// RF-10: map y reduce sobre una colección
asuntosDe([correo]);            // ["Examen final"]
cantidadPorRemitente([correo]); // { "gabmedina@ucp.edu.ar": 1 }
```

## Diseño

- **POO:** encapsulamiento (atributos `private` y `readonly`, copias de la lista de destinatarios), composición (`Contacto` crea su `Email`), agregación (`Correo`, `Agenda`, `Bandeja` y `GestorFiltro` reciben objetos ya creados).
- **Polimorfismo por contrato:** `type Predicado = (correo: Correo) => boolean`. `Filtro` ejecuta `correos.filter(this.predicado)` sin saber qué regla recibió.
- **SOLID:** responsabilidad única (validación fuera de `Correo`, procesamiento separado de estadísticas), abierto/cerrado (un criterio nuevo es un predicado nuevo y `Filtro` no cambia) e inversión de dependencias (`Filtro` recibe su regla y `RedactorCorreos` su validador por el constructor).
- **Funcional:** funciones de orden superior, lambdas, composición con `y`, `o` y `no`, y `map`, `filter` y `reduce` sin modificar la lista original.

## Metodología

- **TDD:** cada criterio de aceptación empezó con un test en rojo, después el código mínimo para verde y, cuando hizo falta, un refactor. Cada paso es un commit.
- **Ramas:** una por tarea, con el formato `sprint-tarea-rf-descripcion` (por ejemplo `s2-01-rf05-filtros`). Cada rama entra a `main` con un pull request y un merge commit.
- **Planificación:** tres sprints de una semana, con tablero en Trello y bitácora diaria.

## Estado (17/11/2026)

48 tests en 12 archivos, todos en verde, typecheck sin errores, 96 % de cobertura de líneas y 88 % de ramas.

**Mejoras pendientes:**
- bandejas como clase abstracta con una subclase por tipo;
- búsqueda por remitente y destinatarios (RF-04);
- marcar como no leído y obtener los no leídos de una bandeja (RF-08);
- que el envío use `ValidadorCorreo` y tipos concretos en lugar de `any`.

El informe técnico con el diagrama de clases UML se entrega aparte.