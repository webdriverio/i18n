---
id: trace-mode
title: Modo de traza
description: "Captura artefactos de traza en modo headless con el modo de traza de DevTools y configura el formato, la granularidad, la retención, las capturas de pantalla, el video y las aserciones."
---

Ruta de captura headless: no se abre ninguna ventana de la interfaz de DevTools. Al finalizar la sesión, el adaptador escribe los artefactos de traza en una carpeta `test-results/` junto a tu directorio de specs / configuración. Para la granularidad `session` / `spec` se trata de un `trace-<sessionId>.zip` (o un directorio `trace-<sessionId>/`); para la granularidad `test` cada test obtiene su propia subcarpeta (consulta [Granularidad de la traza](#trace-granularity--tracegranularity)). El artefacto es portátil e incluye todo lo necesario para la reproducción sin conexión, la comparación por parte de agentes de IA o cualquier consumidor que prefiera un archivo en lugar de una interfaz en vivo.

El modo de traza es **mutuamente excluyente con el modo en vivo**. Elige uno por sesión: las personas que depuran de forma interactiva quieren el modo en vivo; los agentes que comparan ejecuciones o los bots de CI que recopilan artefactos quieren el modo de traza.

## Habilitar

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // opcional; 'zip' (predeterminado) | 'ndjson-directory'
    }
  ]
]
```

Una configuración de referencia completa, lista para copiar y pegar, se incluye en [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts).

Selenium y Nightwatch incluyen el mismo pipeline de trazas; consulta las páginas de sus adaptadores para ver la sintaxis de habilitación específica de cada framework: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Qué contiene el artefacto

| Archivo | Contenido |
|---|---|
| `trace.trace` | `context-options` en NDJSON + eventos de acción `before` / `after`; una línea por registro |
| `trace.network` | Entradas de red estilo HAR, una por línea |
| `transcript.md` | Resumen en Markdown legible por humanos/LLM con tiempos, selectores y anotaciones de valores |
| `resources/page@<id>-<ts>.jpeg` | Captura de pantalla tomada en cada acción visible para el usuario |
| `resources/page@<id>-<ts>-elements.json` | Lista plana de elementos interactuables en esa acción |
| `resources/page@<id>-<ts>-snapshot.txt` | Instantánea del árbol de accesibilidad con sangría por profundidad (apta para IA) |

### Qué cuenta como una "acción"

Los comandos se filtran mediante una lista de permitidos antes de producir entradas de traza. Ejemplos que llegan a la traza:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

Los comandos internos como `findElement`, `waitUntil` o `executeScript` se excluyen deliberadamente: no representan una intención visible para el usuario y llenarían de ruido la línea de tiempo. La lista de permitidos completa se encuentra en [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts).

## Formato de salida — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // predeterminado: 'zip'
}
```

- **`zip`** (predeterminado): un único archivo comprimido en `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`**: los mismos archivos descomprimidos en `test-results/trace-<sessionId>/`. Un paso de descompresión menos para consumidores basados en scripts o agentes que quieren hacer grep / streaming del NDJSON directamente.

Ambos formatos se abren en el [reproductor `show-trace`](/docs/devtools/trace-player) oficial y en otros visores de trazas compatibles.

## Granularidad de la traza — `traceGranularity`

Cuántos artefactos de traza produce una ejecución:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // predeterminado: 'session'
}
```

| Valor | Salida |
|---|---|
| `session` (predeterminado) | Una traza por worker/sesión: `test-results/trace-<sessionId>.zip`. |
| `spec` | Una traza por archivo de spec. Más pequeña y fácil de navegar. |
| `test` | Una traza **por test**, cada una en su propia carpeta: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Para la granularidad `test`, el nombre de la carpeta se construye a partir del nombre base del spec, un slug del título del test, el navegador y un sufijo `-retry<N>` en los intentos reintentados; p. ej., `test-results/login_e2e-logs-in-chrome/trace.zip`, con un primer reintento en `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Las trazas por test son las más navegables y combinan mejor con una política de retención, de modo que solo se escriban las trazas que te interesan.

## Retención — `tracePolicy`

De forma predeterminada se conservan todas las trazas (`'on'`). Para conservar solo las interesantes, ideal con `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // predeterminado: 'on'
}
```

| Política | Conserva la traza cuando… |
|---|---|
| `'on'` (predeterminado) | Siempre: se escribe cada traza. |
| `'retain-on-failure'` | El intento **final** del test falló. Una secuencia de reintentos de fallo-luego-éxito termina en `passed`, así que *no* se conserva: no se retiene en exceso un test inestable que finalmente pasó. |
| `'retain-on-first-failure'` | El **intento 0** falló, independientemente de si un reintento posterior pasó. |
| `'on-first-retry'` | El test se reintentó al menos una vez (existe un intento 1). |
| `'on-all-retries'` | Existe algún intento reintentado (intento ≥ 1). |
| `'retain-on-failure-and-retries'` | El intento final falló **o** el test se reintentó. |

Un fragmento no retenido se descarta y nunca se escribe en disco. Las políticas sensibles a reintentos se basan en un **registro de resultados** por intento que el adaptador mantiene por cada id de test estable entre reintentos, de modo que `retain-on-failure` y `retain-on-first-failure` evalúan el intento correcto. Cuando un runner no expone información de reintentos por intento, todas las políticas excepto `retain-on-failure` se degradan a `retain-on-failure`; una ejecución sin resultados observados (p. ej., un script independiente simple) falla de forma **abierta** y conserva la traza en lugar de arriesgarse a descartar una que necesites.

> La retención sensible a reintentos está verificada de extremo a extremo para **WebdriverIO** (mocha / cucumber) y **Selenium** (mocha). Para **Nightwatch**, `retain-on-failure` funciona, pero las demás políticas sensibles a reintentos se degradan a ella porque `--retries` de Nightwatch vuelve a ejecutar un testcase internamente sin volver a disparar los hooks por test. El `specFileRetries` entre procesos de WDIO también queda fuera del registro (por worker). Consulta la [página del adaptador de Nightwatch](/docs/devtools/nightwatch#trace-mode) para los detalles.

## Filmstrip denso — `filmstrip`

**De forma predeterminada**, la traza graba un screencast **denso y continuo** para que el reproductor ofrezca una reproducción fluida en lugar de saltar de fotograma en fotograma. Los fotogramas densos se ubican junto a los fotogramas por acción (que contienen las instantáneas del DOM). Establece `filmstrip: false` para grabar solo un fotograma por acción: una traza más pequeña sin grabador continuo:

```ts
{
  mode: 'trace',
  filmstrip: false // desactivar: un fotograma por acción (el valor predeterminado es true)
}
```

- Los fotogramas densos se añaden **junto a** los fotogramas por acción (que contienen las instantáneas del DOM), así que no se pierden datos del DOM; cuando hay fotogramas densos, estos reemplazan al filmstrip disperso por acción para la navegación.
- Los fotogramas se reducen al exportar (con ≥100 ms de separación) y se direccionan por contenido, por lo que los fotogramas idénticos (una espera estática) se colapsan en un solo recurso. El búfer de la sesión en vivo está limitado por `screencast.maxBufferFrames` (2000 por defecto).
- La grabación usa el grabador de screencast: push de CDP en Chrome/Chromium y sondeo de capturas de pantalla en el resto. En navegadores que no son Chrome, el sondeo emite muchos comandos `takeScreenshot`; combínalo con la opción de silenciado de pasos de tu reporter (consulta [Integración con Allure](/docs/devtools/allure)).

`filmstrip` está disponible en los tres adaptadores (WebdriverIO / Selenium / Nightwatch).

## Captura de pantalla y video por test — `screenshot` / `video`

Con `traceGranularity: 'test'`, cada test también puede producir una captura de pantalla independiente y/o un fragmento de video por test, replicando la conocida ergonomía de captura/video en caso de fallo:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (predeterminado) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (predeterminado) | cualquier valor de tracePolicy
}
```

| Opción | Valores | Comportamiento |
|---|---|---|
| `screenshot` | `'off'` (predeterminado) · `'on'` · `'only-on-failure'` | `'on'` captura después de cada test; `'only-on-failure'` solo después de un test fallido. PNG. |
| `video` | `'off'` (predeterminado) · cualquier valor de `tracePolicy` | Graba el screencast de forma continua y conserva el fragmento de cada test según la misma semántica de retención que `tracePolicy`. WebM. Establecer un valor distinto de `off` inicia el grabador por sí solo: no necesitas también `filmstrip` ni `screencast.enabled`. |

Ambas están restringidas al modo de traza + `traceGranularity: 'test'` (el ámbito por test al que se asocian). Con granularidades más gruesas no tienen efecto.

- **WebdriverIO**: `screenshot` / `video` son opciones del servicio; se adjuntan en línea a Allure cuando `@wdio/allure-reporter` está presente.
- **Selenium**: las mismas opciones en su `DevToolsOptions`; se adjuntan en línea a Allure mediante `allure-js-commons` cuando hay un adaptador de runner de Allure activo.
- **Nightwatch**: **solo producción**: los archivos se escriben en el directorio de salida de la traza (y se listan en el manifiesto), pero no se adjuntan en línea a Allure, ya que Nightwatch no tiene una API de adjuntos de Allure en vivo. Consulta [Limitaciones del modo de traza](/docs/devtools/limitations).

> `screencast.enabled` es la grabación `.webm` continua independiente del **modo en vivo** y se ignora en el modo de traza. En el modo de traza usa `filmstrip` (fotogramas densos dentro de la traza) o `video` por test; los campos de ajuste del screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) siguen aplicándose a cualquier grabador que se ejecute.

## Manifiesto de artefactos — `emitArtifactsManifest`

Escribe un `devtools-artifacts-<sessionId>.json` junto a la traza: un índice genérico que los reporters y la CI consumen para descubrir los artefactos producidos (cada traza / captura de pantalla / video, además del estado de cada test):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // predeterminado: desactivado; se activa automáticamente cuando se detecta Allure
}
```

- **Desactivado por defecto.** Se **activa automáticamente** cuando se detecta un reporter de Allure: `@wdio/allure-reporter` de WebdriverIO en la configuración, o un runtime activo de `allure-js-commons` en Selenium.
- **Nightwatch requiere activación explícita**: no tiene una señal de Allure en vivo con la que detectarlo automáticamente (`nightwatch-allure` es posterior a la ejecución), por lo que nunca se activa automáticamente; establécelo explícitamente si quieres el manifiesto.

## Aserciones — `captureAssertions`

Las aserciones aparecen como filas de acción de primera clase en la traza (activado por defecto; establece `captureAssertions: false` para desactivarlo):

- **`node:assert`**: se captura en los tres adaptadores como filas `assert.<method>`.
- **`expect` de WebdriverIO**: los matchers `expect(...)` tanto exitosos *como* fallidos (`expect($el).toHaveText(...)`, `toBeExisting()`, …) aparecen como filas `expect.<matcher>` que incluyen el valor esperado, la ubicación en el código fuente del elemento y una instantánea; los comandos de sondeo internos del matcher se suprimen para que solo se muestre la aserción.
- **`browser.assert.*` / `browser.verify.*` de Nightwatch**: las aserciones nativas aparecen como filas `assert.<m>` / `verify.<m>`.

Las aserciones exitosas se muestran en verde; las fallidas se muestran en rojo con el mensaje de error.

## Pruebas móviles

El modo de traza detecta sesiones móviles mediante `platformName: 'android' | 'ios'` (sin distinguir mayúsculas y minúsculas) y se ajusta:

- **Web móvil** (Chrome en Android, Safari en iOS): el mismo pipeline de instantáneas basado en el DOM que en escritorio.
- **Nativo móvil**: los scripts del DOM inyectados en la página se desactivan; se usa `getPageSource()` para obtener el árbol XML de Appium, que alimenta al serializador de instantáneas en su lugar.

Las `context-options` de la traza registran `title: 'android — <deviceName>'` / `'ios — <deviceName>'` para que el visor etiquete los fotogramas correctamente. Una configuración de referencia de WDIO para Chrome en Android mediante Appium se incluye en [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts).

## Visualizar el artefacto

Abre una traza en el **[Trace Player](/docs/devtools/trace-player)** oficial: la interfaz de WebdriverIO DevTools en un modo de reproductor dedicado de solo lectura:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

El reproductor te ofrece viaje en el tiempo por el DOM, la pestaña A11y y la superposición para seleccionar localizadores, la pestaña Transcript con Copy-for-LLM, las pestañas del panel Errors / Console / Network / Source y una línea de tiempo navegable. El mismo `.zip` portátil también se abre en otros visores de trazas independientes y dentro del visor integrado de un informe de Allure. Consulta la página del **[Trace Player](/docs/devtools/trace-player)** para ver la guía completa, las funciones y los atajos de teclado.

## Más información
El bin `show-trace` incluido en cada adaptador abre el mismo archivo en el reproductor de DevTools, que además expone una **pestaña A11y**: el árbol de accesibilidad capturado por acción, donde al hacer clic en una fila se copia el localizador de ese elemento.

Esos localizadores se escriben en el propio dialecto del runner que realizó la grabación, por lo que se pegan directamente en el framework que produjo la traza. Un elemento identificado solo por su texto es `a*=Logout` en WebdriverIO y `//a[contains(., "Logout")]` en Selenium, acompañado de la llamada que lo resuelve, `By.xpath()`. Nightwatch prefiere un localizador CSS nativo como `button[type="submit"]`, porque es el único runner que lee una cadena de selector simple bajo una estrategia CSS predeterminada, y recurre a XPath (acompañado de `useXpath()` / `locateStrategy: 'xpath'`) solo cuando no existe un localizador CSS único. Todos los demás localizadores son CSS portátil.

Para el consumo por parte de LLM / agentes, lee `transcript.md` directamente: es una representación compacta en Markdown de las acciones con selectores y valores.

- **[Trace Player](/docs/devtools/trace-player)**: la guía completa del reproductor `show-trace`, sus funciones y atajos de teclado.
- **[Integración con Allure](/docs/devtools/allure)**: cómo se adjuntan los artefactos de traza / captura de pantalla / video a un informe de Allure.
- **[Compatibilidad entre frameworks](/docs/devtools/cross-framework)**: la matriz de capacidades por adaptador (WebdriverIO / Selenium / Nightwatch).
- **[Limitaciones del modo de traza](/docs/devtools/limitations)**: lo que omite el modo de traza y las carencias conocidas por adaptador.
- **[Referencia de configuración](/docs/devtools/reference)**: todas las opciones de un vistazo.