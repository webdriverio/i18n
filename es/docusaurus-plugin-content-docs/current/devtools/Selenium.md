---
id: selenium
title: Selenium DevTools
description: "Añade la interfaz de depuración de DevTools a los tests de Selenium WebDriver en Node.js o Python con cualquier test runner, y activa el modo trace."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adaptador de Selenium WebDriver para [WebdriverIO DevTools](https://github.com/webdriverio/devtools): ofrece la misma interfaz visual de depuración para cualquier test de Selenium, en **Node.js** o **Python**, sin importar el test runner.

Node.js funciona con **Mocha**, **Jest**, **Cucumber** o un script simple: el plugin detecta automáticamente el runner y conecta los límites de los tests en consecuencia. Python funciona con **pytest** o un script simple, y con pytest no necesita ningún cambio en tus archivos de test.

Elige tu lenguaje en las pestañas de abajo; la elección se mantiene a lo largo de toda la página.

## Instalación

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Requiere Python 3.10+ y `selenium>=4.44`.** Ambos están declarados en los metadatos del paquete, así que pip los impone en lugar de dejar que te encuentres una pestaña Network vacía en tiempo de ejecución. La captura de red se suscribe mediante la API pública de eventos BiDi que selenium regeneró en la 4.44; la conexión privada a la que sustituyó se eliminó en esa misma versión, y la 4.44 es la que fija el mínimo de Python.

</TabItem>
</Tabs>

## Configuración inicial

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Cada bloque a continuación es un **ejemplo completo, listo para copiar y pegar**, que incluye la llamada a `DevTools.configure(...)`. Elige el runner que uses, coloca el fragmento en tu proyecto y ejecútalo.

### Mocha

```js
// tests/example.test.js
import { strict as assert } from 'node:assert'
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com and reads the heading', async function () {
    await driver.get('https://example.com')
    const heading = await driver.wait(until.elementLocated(By.css('h1')), 10000)
    assert.equal(await heading.getText(), 'Example Domain')
  })
})
```

Ejecútalo:

```bash
mocha --timeout 60000 tests/example.test.js
```

> Alternativa: omite el import en cada archivo y usa `mocha --require @wdio/selenium-devtools` para cargar el plugin una sola vez para toda la ejecución.

### Jest

```js
// test/example.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('login flow', () => {
  let driver

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  }, 60000)

  afterEach(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  test('logs in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login')
    await driver.findElement(By.id('username')).sendKeys('tomsmith')
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!')
    await driver.findElement(By.css('button[type="submit"]')).click()

    await driver.wait(until.urlContains('/secure'), 10000)
    const flash = await driver.findElement(By.id('flash'))
    expect(await flash.getText()).toMatch(/You logged into a secure area/i)
  }, 60000)
})
```

`jest.config.json`:

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

Ejecútalo (ESM necesita el flag experimental):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

La estructura dividida de Cucumber implica tres archivos pequeños: uno para cargar el plugin, otro para World/hooks y otro para las definiciones de pasos.

`features/support/setup.js` - carga el plugin y configúralo una vez:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - ciclo de vida del driver:

```js
import {
  setWorldConstructor,
  World,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'

setDefaultTimeout(60000)

class CustomWorld extends World {
  constructor (options) {
    super(options)
    this.driver = null
  }
}

setWorldConstructor(CustomWorld)

Before(async function () {
  this.driver = await new Builder().forBrowser('chrome').build()
})

After(async function () {
  if (this.driver) {
    await this.driver.quit()
    this.driver = null
  }
})
```

`cucumber.json` - conecta el archivo de setup **primero** para que el plugin parchee Selenium antes de que se ejecute cualquier paso:

```json
{
  "default": {
    "import": [
      "features/support/setup.js",
      "features/support/world.js",
      "features/support/steps.js"
    ],
    "paths": ["features/*.feature"],
    "format": ["progress"]
  }
}
```

Ejecútalo:

```bash
cucumber-js --config cucumber.json
```

### Script simple de Node (sin test runner)

Si ejecutas `node tests/google.test.js` directamente, no hay ningún runner al que el plugin pueda engancharse automáticamente. Por defecto obtienes una única fila "Selenium Session" en el dashboard. Para obtener un límite de test con nombre, llama a `DevTools.startTest` / `endTest` alrededor de tu código:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // opcional - da nombre a la fila del test

  const driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.google.com')
    const searchBox = await driver.findElement(By.name('q'))
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.ENTER)
    await driver.wait(until.titleContains('Selenium'), 10000)
    DevTools.endTest('passed')
  } catch (err) {
    DevTools.endTest('failed')
    throw err
  } finally {
    await driver.quit()
  }
}

run()
```

```bash
node tests/google.test.js
```

> Usa `startTest` / `endTest` solo en scripts simples de Node. Con Mocha / Jest / Cucumber el plugin ya sabe cuándo empieza y termina cada test; llamarlos manualmente crearía filas duplicadas.

</TabItem>
<TabItem value="python" label="Python">

### pytest

No hay que poner nada en tus archivos de test: el plugin se descubre automáticamente y un flag lo activa para la ejecución:

```bash
pytest --devtools tests/              # dashboard en vivo
pytest --devtools-trace tests/        # escribe un archivo de trace en su lugar (implica --devtools)
```

O deja la elección fijada en el proyecto, para que nadie tenga que acordarse del flag:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # archivo de trace en lugar de un dashboard
# devtools_trace_granularity = "test"            # ... un archivo por test
# devtools_trace_policy = "retain-on-failure"    # ... conservando solo lo que falló
```

Un `pytest.ini` con una sección `[pytest]` acepta las mismas claves. Las dos opciones de trace se explican en [Cuántos archivos y cuáles conservar](#how-many-archives-and-which-ones-to-keep).

La captura siempre es opcional (opt-in): instalar el paquete nunca debe cambiar el comportamiento de una suite existente. Lo único que cambia es *cómo* dices que sí:

| Cómo la activas | Alcance |
|---|---|
| `--devtools` / `--devtools-trace` | esta ejecución |
| `devtools` / `devtools_trace` en `[tool.pytest.ini_options]` | este proyecto |
| `DEVTOOLS_ENABLE=1` (o `DEVTOOLS_PORT=<n>`, que además se conecta a un dashboard que ya esté en ejecución) | esta shell - para CI |

Gana el de mayor prioridad: CLI, luego ini y luego el entorno. `pytest -o devtools=false` desactiva un valor por defecto del proyecto para una sola ejecución, y por eso no existe `--no-devtools`. `DEVTOOLS_TRACE=1` elige el modo trace pero **no** activa la captura por sí solo, así que exportarlo para tus propios scripts nunca captura una ejecución de pytest que no hayas pedido.

En modo live, el dashboard se abre en una ventana de navegador dedicada y **permanece abierto tras la ejecución** para que puedas inspeccionar lo ocurrido; ciérralo (o pulsa `Ctrl-C`) para terminar. Hay dos tipos de ejecución que no se capturan aunque lo actives: `--collect-only`, donde no se ejecuta nada, y una ejecución que no recolectó ningún test; de lo contrario, una ruta mal escrita dejaría tu terminal esperando en un dashboard vacío.

### Script simple de Python (sin test runner)

Dos líneas alrededor de tu código de Selenium existente:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # abre el dashboard y captura cada comando
# devtools.enable(trace=True)         # o: escribe un trace.zip y no abre ninguna ventana

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # mantiene la UI abierta para inspeccionar (no hace nada si no hay ventana abierta)
devtools.disable()
```

Si el backend no puede iniciarse o no es accesible, `enable()` registra una advertencia y devuelve `None`. La captura se omite y tus tests siguen ejecutándose: la ausencia del dashboard nunca hace fallar una suite.

### Ejecuciones en paralelo (`pytest -n`)

**pytest-xdist funciona sin configuración adicional.** Todos los procesos que informan a una misma ejecución tienen que coincidir en un run id; si no, el backend trata cada conexión como una ejecución nueva y borra lo que capturó la anterior. Con xdist sí coinciden: el plugin también se carga en el **controlador**, y al activar la captura allí se resuelve el id antes de que xdist lance ningún worker; los workers son procesos hijos, así que lo heredan.

Lo que realmente aparece como ejecuciones separadas: dos invocaciones independientes de `pytest`, o un worker iniciado sin ese entorno. Exporta tú mismo `DEVTOOLS_RUN_ID` para unir esos procesos en una sola ejecución.

</TabItem>
</Tabs>

## Opciones de configuración {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Opción | Tipo | Por defecto | Descripción |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Puerto del servidor backend de DevTools. Se incrementa automáticamente si ya está en uso. |
| `hostname` | `string` | `'localhost'` | Hostname al que se vincula el servidor backend. |
| `openUi` | `boolean` | `true` | Abre automáticamente la UI de DevTools en una nueva ventana de Chrome. Establécelo en `false` para CI. |
| `captureScreenshots` | `boolean` | `true` | Captura una captura de pantalla después de cada comando de WebDriver. |
| `headless` | `boolean` | `false` | Ejecuta el navegador del **test** en modo headless (inyecta `--headless=old`). La ventana de la UI de DevTools no se ve afectada. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Grabación de vídeo `.webm` por sesión. Las opciones coinciden con las de la página [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Plantilla de comando para volver a ejecutar cada test. Se sustituye `{{testName}}`. Si se omite, se deriva automáticamente del argv del runner. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` abre la UI de DevTools; `trace` la omite y escribe en su lugar un artefacto portable. Consulta [Trace Mode](/docs/devtools/wdio/trace-mode). Tiene prioridad sobre `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Formato del artefacto de trace. Solo aplica cuando `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Un trace por sesión / archivo spec / test. `'test'` escribe cada uno en `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Solo aplica cuando `mode: 'trace'`. Consulta [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Qué traces conservar. Se combina con `traceGranularity: 'test'`. Solo aplica cuando `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Graba un screencast denso y continuo dentro del trace para recorrerlo fotograma a fotograma en el reproductor. Solo aplica cuando `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Modo trace + `traceGranularity: 'test'`. Captura de pantalla por test, adjuntada en línea a Allure (`image/png`) mediante `allure-js-commons` cuando hay un adaptador de runner de Allure activo. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Modo trace + `traceGranularity: 'test'`. Vídeo de screencast por test, conservado según la política indicada y adjuntado en línea a Allure (`video/webm`) mediante `allure-js-commons` cuando hay un adaptador de runner de Allure activo. |
| `emitArtifactsManifest` | `boolean` | auto | Escribe el manifiesto `devtools-artifacts-<sessionId>.json` —el índice genérico que consumen los reporters/CI para descubrir los artefactos generados— junto al trace. Desactivado por defecto; **se activa automáticamente** cuando hay un runtime de `allure-js-commons` activo. Solo en modo trace. |
| `captureAssertions` | `boolean` | `true` | Captura las aserciones de `node:assert` (tanto las que pasan como las que fallan) como filas de acción del trace. Establécelo en `false` para desactivarlo. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **Para CI**, establece tanto `headless: true` (oculta el navegador del test) como `openUi: false` (no intenta abrir la ventana del dashboard; los entornos de CI no tienen pantalla). El backend sigue ejecutándose en el puerto configurado, así que puedes abrir la UI más tarde si lo necesitas.

</TabItem>
<TabItem value="python" label="Python">

No hay ningún objeto de opciones: no tiene que aparecer nada específico de devtools en tu código de test. Con pytest configuras el adaptador del mismo modo que configuras pytest; un script pasa argumentos con nombre a `enable()`; y todo lo que no tiene flag es una variable de entorno.

| Flag de pytest | `[tool.pytest.ini_options]` | Efecto |
|---|---|---|
| `--devtools` | `devtools = true` | Captura esta ejecución y abre el dashboard. |
| `--devtools-trace` | `devtools_trace = true` | Captura esta ejecución y escribe un archivo de trace en lugar de abrir un dashboard. Implica `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Un archivo para toda la ejecución (`session`, el valor por defecto) o uno por test. Implica `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Qué archivos merece la pena conservar. Implica `--devtools-trace`. Consulta [Cuántos archivos y cuáles conservar](#how-many-archives-and-which-ones-to-keep). |

Gana el de mayor prioridad: CLI, luego ini y luego el entorno que se muestra a continuación. `pytest -o devtools=false` desactiva un valor por defecto del proyecto para una ejecución, y `pytest -o devtools_trace_policy=on` hace lo mismo con cualquiera de los demás.

| Variable | Efecto |
|---|---|
| `DEVTOOLS_ENABLE=1` | Activa la captura, cuando ningún flag u opción ini lo ha hecho ya. |
| `DEVTOOLS_PORT=<n>` | Se conecta a un dashboard que ya esté escuchando en este puerto; también activa la captura. |
| `DEVTOOLS_HOST=<host>` | Host en el que se accede al dashboard (por defecto `localhost`). |
| `DEVTOOLS_TRACE=1` | Escribe un archivo de trace en lugar de abrir un dashboard. Selecciona el modo para un script simple; con pytest no activa la captura de la ejecución por sí solo. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Modo trace: un archivo para toda la ejecución, o uno por test. Es ambiental, así que nunca selecciona el modo trace por sí sola; combínala con `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Modo trace: qué archivos merece la pena conservar. Es ambiental, así que nunca selecciona el modo trace por sí sola; combínala con `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Modo trace: deja el filmstrip denso fuera del archivo. |
| `DEVTOOLS_A11Y=0` | Modo trace: omite el árbol A11y y los rectángulos de elementos por acción. |
| `DEVTOOLS_OPEN=0` | No abre la ventana del dashboard (CI). |
| `DEVTOOLS_BIDI=0` | Desactiva BiDi y, con ello, la captura de consola y red. |
| `DEVTOOLS_RUN_ID=<id>` | Une varios procesos en una sola ejecución. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Inicia el backend con un comando explícito en lugar del resuelto automáticamente. |

El backend es una aplicación Node, así que **Node.js 22.19 o posterior debe estar disponible en todos los modos**, incluso en modo trace, donde nunca se abre una ventana del dashboard. No se trata solo de la UI: el backend sirve el colector de la página, todo el flujo de eventos viaja por su WebSocket y, en modo trace, también es lo que construye el archivo. `enable()` comprueba Node de antemano e indica qué falta, en lugar de fallar más tarde con un timeout al lanzar el proceso. El adaptador encuentra o inicia el backend por ti; consulta [ejecutar el backend por separado](/docs/devtools/dashboard#running-the-backend-on-its-own) si prefieres gestionarlo tú mismo, o apunta `DEVTOOLS_PORT` a uno que ya tengas en ejecución, en cuyo caso no se necesita Node local.

### Aserciones

Las sentencias `assert` que pasan y las que fallan aparecen como filas con los valores **expected** y **actual**, y los fallos llegan a la pestaña Errors. En Python, `assert` es una sentencia y no una llamada, así que, a diferencia del parcheo de `node:assert` del adaptador de Node, no hay nada que envolver: el resultado viene del runner.

**Con pytest**, los valores provienen del reescritor de aserciones, así que cada fila contiene operandos reales. Capturar las aserciones *que pasan* requiere el `enable_assertion_pass_hook` de pytest, que el plugin activa por sí mismo. Una salvedad: pytest decide por módulo, *mientras lo reescribe*, si emite ese hook, así que un módulo cuyo bytecode reescrito se cacheó antes de instalar el plugin seguirá informando solo de fallos. El adaptador lo avisa una vez durante la recolección e indica la caché que hay que borrar, que **no** siempre es el `__pycache__` junto a tus tests, ya que `sys.pycache_prefix` (establecido por defecto en el Python del sistema de macOS) envía todos los módulos reescritos a un único árbol central.

**En un script simple** no hay reescritor, así que los resultados provienen de los eventos de línea del intérprete y los valores se leen del frame que está a punto de ejecutar el assert. Solo se resuelven las lecturas que no pueden ejecutar tu código: un literal o una variable local se resuelven, un atributo o una llamada no, porque evaluar `driver.current_url` una segunda vez emitiría otro comando de WebDriver.

</TabItem>
</Tabs>

## Modo trace {#trace-mode}

Ruta de captura headless, en **ambos lenguajes**: no se abre ninguna ventana de la UI de DevTools, y la ejecución escribe un archivo de trace portable en una carpeta `test-results/`, con la misma estructura que el artefacto de trace de WebdriverIO. Los dos solo se diferencian en cuánto del artefacto puedes ajustar y en quién lo construye.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Al final de la sesión, el propio adaptador escribe `trace-<sessionId>.zip` (o un directorio) en `test-results/`, junto al directorio de test / configuración resuelto.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opcional; por defecto 'zip'
})
```

En modo trace se omiten la vinculación del puerto del backend, la ventana de la UI y la opción `screencast`. Para la referencia completa de funcionalidades (contenido del artefacto, visor, testing móvil, cuándo elegir `zip` o `ndjson-directory`), consulta la [página de Trace Mode](/docs/devtools/wdio/trace-mode).

### Artefactos por test y retención

Con `traceGranularity: 'test'`, cada test obtiene su propia carpeta de artefactos, y `tracePolicy` decide cuáles se conservan (p. ej. `retain-on-failure`). En ese modo también puedes capturar un `screenshot` (PNG) y un `video` (`.webm`) por test, y activar un `filmstrip` denso grabado en el trace para recorrerlo fotograma a fotograma. Cuando hay un adaptador de runner de `allure-js-commons` activo, los traces / capturas / vídeos por test se adjuntan en línea al informe de Allure (y `emitArtifactsManifest` se activa automáticamente); en caso contrario, se escriben en `test-results/` y se registran en el manifiesto.

```js
DevTools.configure({
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure',
  filmstrip: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
})
```

</TabItem>
<TabItem value="python" label="Python">

No hay objeto de opciones que configurar: un flag con pytest, un argumento con nombre en un script:

```bash
pytest --devtools-trace tests/        # implica --devtools
DEVTOOLS_TRACE=1 python3 login.py     # script simple; equivale a devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # escribe un trace.zip en lugar de abrir un dashboard
```

El archivo se guarda en `test-results/` junto al archivo de test del que provino el primer comando capturado —el mismo directorio en el que ya se escriben los vídeos de screencast—, con el nombre `trace-<sessionId>.zip`, o con el nombre de cada test cuando pides [un archivo por test](#how-many-archives-and-which-ones-to-keep). Si ningún comando llevaba una ubicación de código fuente tuya, se usa `test-results/` en el directorio actual.

**No se abre ninguna ventana del dashboard.** El artefacto es el resultado, y una ejecución live se bloquea en la ventana hasta que la cierras; una ventana convertiría la escritura de un archivo en una sesión interactiva. El backend sigue iniciándose, porque es lo que *construye* el archivo: las transformaciones del trace están en TypeScript, así que una ejecución de Python se las pide al backend en lugar de incluir una segunda copia. Esa es la única diferencia con el modo trace sin backend del adaptador de Node.js, y la razón por la que [se requiere Node.js 22.19 o posterior en todos los modos](#configuration-options).

Además de las filas de comandos, las capturas y selectores por comando, y la consola y la red que capturan ambos modos, el archivo contiene:

| En el archivo | Por defecto | Desactivar |
|---|---|---|
| Viaje en el tiempo del DOM: el flujo de mutaciones que el reproductor reproduce paso a paso | activado | - |
| Filmstrip denso: los fotogramas del screencast, incluidos en el trace en lugar de un `.webm` | activado | `DEVTOOLS_FILMSTRIP=0` |
| Árbol A11y y superposición de elementos: leídos junto a cada acción, con dos idas y vueltas extra por comando | activado | `DEVTOOLS_A11Y=0` |

El modo trace no codifica ningún `.webm`, así que no necesita `ffmpeg`: los fotogramas *son* el filmstrip.

**La exportación se solicita cuando termina la ejecución, no cuando sale el proceso**: pytest la pide en `sessionfinish` y el `disable()` de un script exporta antes de cerrar el transporte, así que CI obtiene el artefacto tanto si hubo una ventana como si no.

### Cuántos archivos y cuáles conservar {#how-many-archives-and-which-ones-to-keep}

Dos opciones lo deciden, y ninguna significa nada fuera del modo trace.

**Granularidad**: cuántos archivos escribe la ejecución:

| `--devtools-trace-granularity` | Resultado |
|---|---|
| `session` (por defecto) | Un archivo para toda la ejecución. |
| `test` | Un archivo por test, cada uno con solo los comandos, consola, red, mutaciones del DOM, árboles a11y y fotogramas de screencast de ese test. |

Aquí no existe a propósito el valor `spec`. En este adaptador el spec *es* su archivo de test, así que un tercer nombre solo podría significar, sin avisar, uno de los dos anteriores.

**Política**: cuáles de esos archivos se conservan:

| `--devtools-trace-policy` | Resultado |
|---|---|
| `on` (por defecto) | Conserva todo. |
| `retain-on-failure` | Conserva solo lo que falló. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Se aceptan, pero hoy se comportan **exactamente igual que `retain-on-failure`**. |

Esos cuatro últimos todavía no tienen en cuenta los reintentos, y conviene decirlo claramente en lugar de descubrirlo por un archivo que esperabas encontrar: nada de lo que este adaptador envía lleva un número de intento, así que un test reintentado sobrescribe su propio resultado anterior y la pregunta sobre reintentos ni siquiera puede plantearse. El backend registra esta degradación en lugar de fingir lo contrario. Elige uno solo si quieres `retain-on-failure` bajo un nombre que significará más en el futuro.

Las dos se combinan:

| Granularidad | Política | Lo que obtienes |
|---|---|---|
| `test` | `retain-on-failure` | Solo los tests que fallaron. |
| `session` | `retain-on-failure` | El archivo de toda la ejecución, si algo en ella falló. |
| cualquiera | `on` | Todo. |

Cada archivo conservado con granularidad `test` recibe el nombre de su test (`trace-<test>-<hash>.zip`, con el hash tomado del nodeid del test para que dos casos parametrizados que comparten título no se sobrescriban). Una ejecución que no conserva nada no escribe nada, y esa es la idea: los archivos que te quedan son los que merece la pena abrir, y una exportación rechazada es la política funcionando, no un fallo.

Configúralas para una ejecución:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

O déjalas fijadas en el proyecto, para que quien clone el proyecto capture de la misma forma sin que nadie se lo diga:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` en `pyproject.toml` acepta las mismas claves, y `pytest -o devtools_trace_policy=on tests/` sobrescribe una de ellas para una sola ejecución sin editar el archivo. Hay una versión totalmente comentada —con cada opción y cada variable de entorno, y para qué sirve cada una— en el repositorio, en [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

Un script simple pasa las mismas dos como argumentos con nombre:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Indicar cualquiera de ellas explícitamente selecciona el modo trace.** El flag de CLI, la opción ini y el argumento de `enable()` lo implican, ya que una política o una granularidad no significan nada en modo live y aplicarlas sin el modo descartaría en silencio lo que pediste. `DEVTOOLS_TRACE_POLICY` y `DEVTOOLS_TRACE_GRANULARITY` **no** lo hacen a propósito: una variable exportada es ambiental y puede haberse establecido para otro script en la misma shell, así que cambiar una ejecución live a modo trace por ese motivo te quitaría un dashboard que nadie pidió perder; combínalas con `DEVTOOLS_TRACE=1`. Una ejecución que acaba ignorando una opción de trace exportada registra una advertencia, en lugar de dejar que notes la falta de un archivo que nunca apareció.

</TabItem>
</Tabs>

### Ver el trace

Abre cualquier `.zip` de trace en el reproductor oficial: la misma UI de DevTools en un modo **player** dedicado:

```bash
npx show-trace path/to/trace.zip      # en un proyecto que instala el adaptador
pnpm show-trace path/to/trace.zip     # desde el monorepo de devtools
```

El bin `show-trace` se incluye con `@wdio/selenium-devtools`, así que está disponible en cualquier proyecto que lo instale, sin dependencias adicionales. Un proyecto de Python no instala ningún adaptador de Node.js, pero el mismo reproductor se incluye con el backend que el adaptador ya descarga por ti: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Como el adaptador de Selenium captura el **flujo de mutaciones del DOM** de la página y una instantánea de elementos / accesibilidad por comando junto a cada captura de pantalla, un trace de Selenium aprovecha todas las funcionalidades del reproductor: viaje en el tiempo del DOM, la pestaña A11y y la superposición para elegir localizadores, la pestaña Transcript con Copy-for-LLM, el anidamiento Feature → Scenario → Step de Cucumber y la línea de tiempo navegable. Un trace de Python contiene el mismo flujo de mutaciones y la instantánea por acción (allí la lectura de elementos / a11y es solo del modo trace, y está activada por defecto); el anidamiento Gherkin es lo único que no tiene equivalente en pytest.

El trace usa un esquema NDJSON portable, así que el mismo `.zip` (o directorio) también se abre en otros visores de trace compatibles. Consulta la página **[Trace Player](/docs/devtools/trace-player)** para ver la guía completa.

## API pública

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // establece las opciones de runtime (ver arriba)
DevTools.startTest(name, meta?)      // marca un límite de test con nombre (solo scripts simples de Node)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Con Mocha / Jest / Cucumber, el plugin se engancha automáticamente al ciclo de vida del runner, así que no necesitas `startTest` / `endTest` manualmente; llamarlos crearía filas duplicadas.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # conecta e instrumenta; idempotente
devtools.disable()                    # desmonta; seguro llamarlo dos veces
devtools.wait_for_dashboard_close()   # bloquea hasta que se cierra la ventana
devtools.get_capturer()               # el SessionCapturer activo, o None
devtools.dashboard_url()              # la URL en la que se sirve el dashboard
```

`enable()` acepta opcionalmente `host` y `port`, además de argumentos con nombre:

```python
devtools.enable(trace=True)                            # escribe un trace.zip; no abre ninguna ventana
devtools.enable(trace=True, filmstrip=False)           # ... sin el filmstrip denso
devtools.enable(trace=True, a11y=False)                # ... sin la lectura de elementos / a11y por acción
devtools.enable(trace_granularity='test')              # ... un archivo por test (implica trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... conserva solo lo que falló (implica trace=True)
```

`filmstrip` y `a11y` solo aplican al modo trace, y ambos están activados por defecto (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` configuran lo mismo desde el entorno). `trace` recurre a `DEVTOOLS_TRACE`. `trace_granularity` y `trace_policy` recurren a `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`, y pasar cualquiera de ellos activa el modo trace por sí solo; consulta [Cuántos archivos y cuáles conservar](#how-many-archives-and-which-ones-to-keep). Un valor fuera del conjunto aceptado genera una advertencia y vuelve al valor por defecto, en lugar de descubrirse más tarde como un archivo que falta.

Con pytest, el plugin controla todo esto a partir de `--devtools` / `--devtools-trace` (o la opción ini correspondiente, o `DEVTOOLS_ENABLE=1`), y los límites de los tests provienen de los propios hooks de pytest; no hay equivalente a `startTest` / `endTest` que llamar.

</TabItem>
</Tabs>

## Ejemplos

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Hay ejemplos funcionales en el directorio `examples/` de nivel superior del repositorio. Compila el workspace una vez (`pnpm install && pnpm build`) y luego ejecuta desde la raíz del repositorio. `pnpm demo:selenium` ejecuta el ejemplo por defecto (Cucumber); las variantes por runner son:

| Directorio | Runner | Comando |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Los ejemplos de Python están en [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Instala el adaptador y compila el workspace una vez (`pnpm install && pnpm build`, para que exista el backend), y luego ejecuta desde la raíz del repositorio:

| Ejemplo | Qué muestra | Comando |
|---|---|---|
| `web_form.py` | La configuración de tres líneas para un script simple | `pnpm demo:python` |
| `login.py` | Un script más largo: navegación, rellenado de formularios, aserciones | `pnpm demo:python:login` |
| `trace-py-test/` | pytest con una clase y un test a nivel de módulo, más un `pytest.ini` que fija el modo trace, la granularidad y la retención; cada opción está comentada con lo que hace | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Funcionalidades

El adaptador de Selenium ofrece la misma experiencia de UI de DevTools que WebdriverIO, en ambos lenguajes. Todas las funcionalidades siguientes se capturan automáticamente sin configuración específica: basta con el `DevTools.configure({})` básico en Node.js, o `pytest --devtools` en Python. La consola y la red se transmiten mediante los handlers BiDi de Selenium, con un colector inyectado como alternativa en Node.js. Los enlaces llevan a la referencia completa de cada funcionalidad.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Vistas previas del navegador en vivo, capturas de pantalla por comando y reejecución de tests/suites con un clic
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Guarda una instantánea de un test fallido, vuelve a ejecutarlo y compara ambas ejecuciones lado a lado
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Detecta automáticamente Mocha, Jest, Cucumber o un script simple en Node.js; pytest o un script simple en Python
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Captura e inspecciona la salida de la consola del navegador
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Supervisa las llamadas a APIs y la actividad de red
- **[Metadata](/docs/devtools/wdio/metadata)** - Capabilities de la sesión, entorno y tiempos por sesión de navegador
- **[TestLens](/docs/devtools/wdio/testlens)** - Salta desde cualquier comando a la línea de código fuente que lo originó
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Grabación automática en vídeo de las sesiones del navegador
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Captura headless que produce un `trace.zip` portable (sin ventana de UI), en ambos lenguajes, con división por test y retención en ambos (`traceGranularity` / `tracePolicy` en Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` en Python). El `screenshot` / `video` por test y el adjunto en línea a Allure siguen siendo exclusivos de Node.js; consulta [Modo trace](#trace-mode)

En Node.js, el screencast es la única funcionalidad con opciones propias (consulta [Opciones de configuración](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

En Python no necesita configuración: Chrome transmite los fotogramas por CDP, otros navegadores recurren a una captura de pantalla por comando, y codificar el `.webm` requiere `ffmpeg` en el `PATH`. En modo trace, esos mismos fotogramas se convierten en el filmstrip denso del archivo en lugar de un `.webm`, así que no se codifica nada y no se necesita `ffmpeg`.

## Cómo funciona

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

El plugin parchea los prototipos `Builder`, `WebDriver` y `WebElement` de `selenium-webdriver` en el momento de la importación:

- **`Builder.build()`** - tras la construcción, el driver se registra en el capturador de sesión y el backend de DevTools se inicia en un proceso hijo independiente.
- **Cada método público de `WebDriver` / `WebElement`** - se envuelve con captura de comandos (argumentos + resultado + captura de pantalla + origen de la llamada).
- **`WebDriver.quit()`** - un hook de limpieza con await vacía la codificación del screencast, el búfer del WebSocket y los metadatos finales antes de que se ejecute el quit original.

Cuando BiDi está disponible (Chrome ≥114), los logs de consola, las excepciones de JavaScript y los eventos de red se transmiten directamente mediante los handlers BiDi de Selenium. En caso contrario, el plugin recurre a un script colector inyectado en el navegador.

El mismo colector inyectado también registra el **flujo de mutaciones del DOM** de la página y una instantánea de elementos / accesibilidad por comando, de modo que un trace contiene lo suficiente para reconstruir el DOM en vivo en cada paso (mapeo por navegación); esto es lo que hace posible el viaje en el tiempo del DOM y la pestaña A11y del reproductor, en lugar de una reproducción basada solo en capturas de pantalla.

</TabItem>
<TabItem value="python" label="Python">

No hay prototipos que parchear, así que el adaptador de Python envuelve un solo método:

- **`WebDriver.execute()`** - el único punto de paso por el que fluye cada comando. Los métodos de elementos también delegan en él (`self._parent.execute`), así que `click`, `send_keys` y `text` se capturan con el mismo wrapper sin tocar las clases de elementos.
- **Configuración de la sesión** - con el primer comando real se registra el driver, se envían los metadatos y se preparan BiDi, el colector y el screencast.
- **`quit()`** - se intercepta antes de que se destruya la sesión, de modo que el screencast se codifica y los últimos fotogramas se vacían mientras el driver aún existe.

La consola, las excepciones de JavaScript y la red se transmiten mediante la capa BiDi de selenium (4.44+), que el adaptador activa por ti inyectando la capability `webSocketUrl` en la petición `newSession`.

El **flujo de mutaciones del DOM** proviene del mismo colector del lado del navegador que en Node.js, registrado al inicio del documento mediante BiDi para que una página se instrumente antes de que se ejecute cualquiera de sus propios scripts. En Chrome, el navegador envía el screencast a través de un websocket CDP propio, separado del canal de comandos de la sesión, lo que hace que un flujo real de fotogramas sea seguro aunque una sesión de Selenium no sea thread-safe.

</TabItem>
</Tabs>

## Limitaciones

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Limitación | Detalle |
|-----------|--------|
| Reejecución de pasos individuales en Cucumber | El filtro `--name` de Cucumber apunta a escenarios, no a pasos Gherkin individuales. La reejecución por paso del dashboard está desactivada con Cucumber. |
| Salvedad del modo headless | `headless: true` inyecta `--headless=old`; `--headless=new` produce fotogramas CDP completamente negros en el screencast. |
| Viewport inicial | El iframe de instantáneas del dashboard usa 1280×800 hasta que se completa la primera navegación y el colector del lado del navegador informa del viewport real. |

</TabItem>
<TabItem value="python" label="Python">

| Limitación | Detalle |
|-----------|--------|
| Sin captura de pantalla, vídeo ni adjunto de Allure por test | Se admiten **archivos de trace** por test (`--devtools-trace-granularity test`), pero las opciones `screenshot` y `video` por test del adaptador de Node.js y su adjunto en línea con `allure-js-commons` no tienen equivalente en Python: los archivos son los artefactos. |
| La retención basada en reintentos se degrada | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` y `retain-on-failure-and-retries` se aceptan pero se comportan exactamente igual que `retain-on-failure`: nada de lo enviado lleva un número de intento, así que un test reintentado sobrescribe su propio resultado anterior. El backend registra esta degradación. |
| Node es necesario en todos los modos | El backend es una aplicación Node —sirve el colector de la página, transporta el flujo de eventos y construye el archivo de trace—, así que Node.js 22.19 o posterior debe estar presente incluso en modo trace, donde no se abre ninguna ventana. El adaptador lo encuentra o lo inicia por ti. |
| Las opciones del navegador son cosa tuya | No hay opción `headless`; configura Chrome mediante el propio objeto `Options` de selenium, como harías normalmente. |
| El vídeo en modo live necesita ffmpeg | Sin `ffmpeg` en el `PATH`, la codificación del `.webm` se omite con una advertencia en lugar de un error. El modo trace no codifica nada —sus fotogramas van al filmstrip—, así que nunca necesita ffmpeg. |

</TabItem>
</Tabs>