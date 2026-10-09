---
id: trace-player
title: Reproductor de trazas
description: "Abre los artefactos del modo de traza en el reproductor show-trace para reproducirlos y revisarlos sin conexión, o cárgalos en otros visores de trazas."
---

El reproductor `show-trace` abre cualquier traza generada en [Trace Mode](/docs/devtools/wdio/trace-mode) en la propia interfaz de WebdriverIO DevTools: un modo **reproductor** dedicado y de solo lectura para la reproducción sin conexión, la revisión y la comparación de diferencias por parte de agentes de IA.

## Demo

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace`: el reproductor oficial

Abre una traza en la interfaz de DevTools:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

El bin `show-trace` se incluye con cada adaptador (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`), por lo que está disponible en cualquier proyecto que instale uno de ellos, sin dependencias adicionales. Inicia la misma interfaz de DevTools en un modo **reproductor** dedicado y la abre en tu navegador:

- **Lista de acciones** (izquierda): los comandos capturados, con una pestaña **Metadata** al lado.
- **Panel del navegador** (centro): la página reconstruida para la acción seleccionada (consulta [viaje en el tiempo del DOM](#trace-player-features) más abajo). Cuando la traza incluye un filmstrip/vídeo, un conmutador **Snapshot / Screencast** cambia al vídeo grabado.
- **Franja de línea de tiempo** (arriba): un filmstrip de miniaturas en sus posiciones de tiempo real, además de una barra de desplazamiento con un cabezal de reproducción arrastrable. Haz clic en una miniatura o arrastra en cualquier punto para buscar.
- **Barra de controles**: reproducir/pausar, avanzar paso a paso y velocidad.
- **Pestañas del panel** (abajo): **Source**, **Log**, **Console**, **Network**, **Errors** (cada una con una insignia de su recuento), además de las pestañas **A11y** y **Transcript**, exclusivas del reproductor. Haz clic en una fila de **Network** para ver el detalle de la solicitud (cabeceras, tiempos, estado).
- **Atajos de teclado**: `Space` reproducir/pausar, `←`/`→` moverse entre acciones, `Home`/`End` saltar a la primera/última, `,`/`.` cambiar la velocidad, `/` enfocar el filtro, `?` mostrar todos los atajos.

> Solo acepta un `.zip`. Los mismos atajos funcionan en el panel en vivo (`←`/`→` recorren la lista de comandos, `?` muestra la ayuda).

### Funciones del reproductor de trazas

Más allá de avanzar fotograma a fotograma, el reproductor reconstruye y relaciona la ejecución:

- **Viaje en el tiempo del DOM**: el panel del navegador reproduce el flujo capturado de mutaciones del DOM (y el estado de los campos de formulario: `value` de los inputs, `checked` de las casillas, incluidos los campos que se vuelven a dejar vacíos) para reconstruir el DOM *real* en el momento de la acción seleccionada, no solo una captura de pantalla. Los puntos que no tienen un fotograma capturado (aserciones, esperas estáticas) siguen mostrando el estado real de la página.
- **Pestaña A11y + superposición de elementos ("pick locator")**: la pestaña **A11y** muestra el árbol de accesibilidad (roles + nombres accesibles) capturado para el comando seleccionado. Activa la superposición de elementos en la interfaz del navegador para resaltar el contorno de cada elemento con el que interactuó la prueba; **pasa el cursor** sobre un recuadro para resaltar su fila en el árbol A11y y **haz clic** para copiar un localizador robusto. El vínculo es bidireccional: al pasar el cursor sobre una fila del árbol se resalta el elemento en la instantánea.
- **Pestaña Transcript + Copy-for-LLM**: la pestaña **Transcript** muestra el `transcript.md` de la ejecución (un resumen legible por personas y LLM en orden de ejecución). Un botón **Copy** de un solo clic agrupa la transcripción con los errores de los comandos fallidos como contexto listo para pegar en un LLM.
- **Marcadores de entrada en la línea de tiempo**: cada acción se marca en la barra de desplazamiento según su tipo: las acciones de teclado como una barra verde, las acciones de puntero (que incluyen un punto de impacto) como un punto azul y las demás como una marca simple, para que puedas leer el ritmo de interacción de un vistazo.
- **Anidamiento de Cucumber**: las ejecuciones de Cucumber se anidan como Feature → Scenario → Step en el árbol de acciones, de modo que los pasos quedan bajo su escenario y su feature.
- **Desplazamiento con filmstrip denso**: con [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) activado, la línea de tiempo agrupa los fotogramas densos para un desplazamiento fluido en lugar de saltos de un fotograma por acción.

## Otros visores de trazas

Como el artefacto utiliza un formato en disco portátil y estándar para visores de trazas, el mismo `.zip` (o directorio) también se abre en **visores de trazas independientes** compatibles y, al compartir ese formato, dentro del **visor de trazas integrado de un informe de Allure** (Allure ≥ 2.35). Estos muestran:
- Línea de tiempo de las acciones con sus tiempos
- Capturas de pantalla por acción
- Instantáneas de elementos
- Cascada de red
- Eventos de consola

Para su consumo por LLM o agentes, lee `transcript.md` directamente: es una representación compacta en Markdown de las acciones con sus selectores y valores.

El pipeline de trazas (mapeo de acciones, serializadores de instantáneas, escritor NDJSON, escritor de zip / directorio) se comparte entre adaptadores mediante [`@wdio/devtools-core`](https://github.com/webdriverio/devtools/tree/main/packages/core), por lo que la estructura del artefacto es idéntica sin importar qué adaptador lo haya generado. Consulta [Cross-Framework Support](/docs/devtools/cross-framework).