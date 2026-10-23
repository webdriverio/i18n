---
id: selenium
title: Selenium DevTools
description: "Añade la interfaz de depuración de DevTools a las pruebas de Selenium WebDriver en Node.js o Python con cualquier ejecutor de pruebas, y activa el modo trace."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adaptador de Selenium WebDriver para [WebdriverIO DevTools](https://github.com/webdriverio/devtools): lleva la misma interfaz de depuración visual a cualquier prueba de Selenium, en **Node.js** o **Python**, sin importar el ejecutor de pruebas.

Node.js funciona con **Mocha**, **Jest**, **Cucumber** o un script simple; el plugin detecta automáticamente el ejecutor y conecta los límites de las pruebas en consecuencia. Python funciona con **pytest** o un script simple, y con pytest no requiere ningún cambio en tus archivos de prueba.

Elige tu lenguaje en las pestañas de abajo; la elección se mantiene a lo largo de toda la página.

## Instalación

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

Requiere `selenium-webdriver` 4.8 o posterior. Codificar un screencast `.webm` requiere `ffmpeg` en el `PATH`.

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Requiere Python 3.10+ y `selenium>=4.44`.** Ambos están declarados en los metadatos del paquete, por lo que pip los exige en lugar de dejar que descubras una pestaña Network vacía en tiempo de ejecución. La captura de red se suscribe a través de la API pública de eventos BiDi que selenium regeneró en la 4.44; la conexión privada a la que reemplazó se eliminó en esa misma versión, y la 4.44 es lo que fija el mínimo de Python.

Después instala el backend, una sola vez:

```bash
selenium-devtools install-backend
```

pip no puede hacerlo por ti: un wheel no tiene hook de instalación y el backend es un paquete de Node. Si lo omites, las ejecuciones siguen funcionando, recurriendo a descargar `@wdio/devtools-backend` con `npx` en el primer uso. Esa alternativa cuesta una consulta al registro en cada ejecución y falla a mitad de sesión si un proxy rechaza el paquete. `selenium-devtools backend-path` indica si el backend está instalado, `install-backend --force` reinstala uno dañado y `uninstall-backend` lo elimina. La instalación se guarda en `$XDG_CACHE_HOME` (por defecto `~/.cache`).

Un `chromedriver` en el `PATH` que no coincida con tu Chrome rompe cualquier ejecución de Selenium; si no hay ninguno en el `PATH`, Selenium Manager resuelve uno compatible.

</TabItem>
</Tabs>

## Configuración inicial

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Lo mínimo es una importación, `import '@wdio/selenium-devtools'`, en tu archivo de prueba. Con Mocha, Jest y Cucumber no se necesita nada más; `DevTools.configure(...)` es opcional y solo cambia los valores predeterminados.

Cada bloque de abajo es un **ejemplo completo, listo para copiar y pegar**, que incluye la llamada a `DevTools.configure(...)`. Elige el ejecutor que uses, coloca el fragmento en tu proyecto y ejecútalo.

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

> Alternativa: omite la importación por archivo y usa `mocha --require @wdio/selenium-devtools` para cargar el plugin una sola vez para toda la ejecución. Aun así necesitas una llamada única a `DevTools.configure(...)` en algún lugar si quieres opciones no predeterminadas.

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

La estructura dividida de Cucumber implica tres archivos pequeños: uno para cargar el plugin, uno para World/hooks y otro para las definiciones de pasos.

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

`cucumber.json` - incluye el archivo de setup **primero** para que el plugin modifique Selenium antes de que se ejecute cualquier paso:

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

### Script de Node simple (sin ejecutor de pruebas)

Si ejecutas `node tests/google.test.js` directamente, no hay ningún ejecutor al que el plugin pueda engancharse automáticamente. Por defecto obtienes una única fila "Selenium Session" en el panel. Para obtener un límite de prueba con nombre, llama a `DevTools.startTest` / `endTest` alrededor de tu código:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // opcional - da nombre a la fila de la prueba

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

> Usa `startTest` / `endTest` solo en scripts de Node simples. Con Mocha / Jest / Cucumber el plugin ya sabe cuándo empieza y termina cada prueba; llamarlos manualmente crearía filas duplicadas.

</TabItem>
<TabItem value="python" label="Python">

### pytest

No hay que poner nada en tus archivos de prueba: el plugin se descubre automáticamente y un flag lo activa para la ejecución:

```bash
pytest --devtools tests/              # panel en vivo
pytest --devtools-trace tests/        # escribe un archivo de trace en su lugar (implica --devtools)
```

O deja la elección fijada en el proyecto, para que nadie tenga que recordar el flag:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # archivo de trace en lugar de un panel
# devtools_trace_granularity = "test"            # ... un archivo por prueba
# devtools_trace_policy = "retain-on-failure"    # ... conservando solo lo que falló
```

Un `pytest.ini` con una sección `[pytest]` admite las mismas claves. Los dos ajustes de trace se explican en [Cuántos archivos y cuáles conservar](#how-many-archives-and-which-ones-to-keep).

La captura siempre es opcional: instalar el paquete nunca debe cambiar el comportamiento de una suite existente. Lo único que cambia es *cómo* das tu consentimiento:

| Cómo activarlo | Alcance |
|---|---|
| `--devtools` / `--devtools-trace` | esta ejecución |
| `devtools` / `devtools_trace` en `[tool.pytest.ini_options]` | este proyecto |
| `DEVTOOLS_ENABLE=1` (o `DEVTOOLS_PORT=<n>`, que además se conecta a un panel que ya esté en ejecución) | esta shell - para CI |

Gana el de mayor prioridad: CLI, luego ini, luego entorno. `pytest -o devtools=false` desactiva un valor predeterminado del proyecto para una sola ejecución, por eso no existe `--no-devtools`. `DEVTOOLS_TRACE=1` elige el modo trace pero **no** activa la captura por sí solo, así que exportarlo para tus propios scripts nunca captura una ejecución de pytest que no pediste.

En modo en vivo el panel se abre en una ventana de navegador dedicada y **permanece abierto después de la ejecución** para que puedas inspeccionar lo ocurrido; ciérralo (o pulsa `Ctrl-C`) para terminar. Dos tipos de ejecución no se capturan aunque lo actives: `--collect-only`, donde no se ejecuta nada, y una ejecución que no recolectó ninguna prueba; de lo contrario, una ruta mal escrita dejaría tu terminal esperando ante un panel vacío.

### Script de Python simple (sin ejecutor de pruebas)

Dos líneas alrededor de tu código de Selenium existente:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # abre el panel, captura cada comando
# devtools.enable(trace=True)         # o: escribe un trace.zip y no abre ninguna ventana

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # mantiene la UI abierta para inspeccionar (no hace nada si no hay ventana abierta)
devtools.disable()
```

Si el backend no se puede iniciar ni alcanzar, `enable()` registra una advertencia y devuelve `None`. La captura se omite y tus pruebas siguen ejecutándose: la ausencia del panel nunca hace fallar una suite.

### Ejecuciones en paralelo (`pytest -n`)

**pytest-xdist funciona sin configuración adicional.** Todos los procesos que informan a una misma ejecución deben coincidir en un id de ejecución; de lo contrario, el backend trata cada conexión como una ejecución nueva y borra lo que capturó la anterior. Con xdist sí coinciden: el plugin también se carga en el **controlador**, y activar la captura ahí resuelve el id antes de que xdist lance cualquier worker; los workers son procesos hijos, así que lo heredan.

Lo que realmente aparece como ejecuciones separadas: dos invocaciones independientes de `pytest`, o un worker iniciado sin ese entorno. Exporta tú mismo `DEVTOOLS_RUN_ID` para unir esos procesos en una sola ejecución.

### Controles de ejecución (Run, Rerun, Run-all)

Los tres funcionan con pytest y con un script simple. Un rerun no es un mensaje al proceso en ejecución: el backend lanza uno nuevo a partir de un comando que el adaptador publica al arrancar, y un control que no puede atender permanece deshabilitado con un motivo.

- Con pytest, cada control selecciona su fila por **nodeid** (`file.py`, `file.py::Class`, `file.py::Class::test`), usando el intérprete que ejecutó tus pruebas. Para un script simple, los tres vuelven a lanzar el script.
- Las opciones que acotan una ejecución se descartan en un rerun dirigido: `-k`, `-m`, `--deselect`, `--lf`/`--ff`/`--sw` y `-n`/`--dist`. Un filtro que sobreviviera solo podría reducir la prueba indicada a nada, lo que pytest reporta como una salida limpia.
- El rerun se lanza en el **rootdir** de pytest, y las rutas posicionales del comando Run-all se convierten en absolutas. Una opción que lleve una ruta *relativa* (`-c`, `--junitxml`) se resuelve respecto al rootdir en un rerun.
- Un rerun informa al **panel en el que pulsaste el botón** y no abre una segunda ventana. Run-all conserva tu invocación original incluso después de un rerun dirigido.

Dos límites: un panel que ya estaba en ejecución cuando te conectaste mantiene el directorio en el que se inició, y con `pytest -n` el estado del panel pertenece al worker que se conectó en último lugar.

### Preserve & Rerun

Una fila fallida lleva un segundo botón junto a Rerun. Toma una instantánea del intento, vuelve a ejecutar la prueba, y la pestaña **Compare** muestra las diferencias entre ambos: comandos, consola y red lado a lado. La instantánea se toma antes de que empiece el rerun; preservar después de que una nueva ejecución se haya conectado se rechaza (HTTP 409). Un Rerun normal descarta todas las referencias, por lo que la pestaña Compare desaparece tras un rerun ordinario.

</TabItem>
</Tabs>

## Opciones de configuración {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Opción | Tipo | Valor predeterminado | Descripción |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Puerto del servidor backend de DevTools. Se incrementa automáticamente si ya está en uso. |
| `hostname` | `string` | `'localhost'` | Hostname al que se vincula el servidor backend. |
| `openUi` | `boolean` | `true` | Abre automáticamente la UI de DevTools en una nueva ventana de Chrome. Usa `false` en CI. |
| `captureScreenshots` | `boolean` | `true` | Captura una captura de pantalla después de cada comando WebDriver exitoso. |
| `headless` | `boolean` | `false` | Ejecuta el navegador **de prueba** en modo headless (inyecta `--headless=old`). La ventana de la UI de DevTools no se ve afectada. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Grabación de vídeo `.webm` por sesión. Las opciones coinciden con la página [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Plantilla de comando para el rerun por prueba. Se sustituye `{{testName}}`. Se deriva automáticamente del argv del ejecutor si se omite. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` abre la UI de DevTools; `trace` la omite y escribe un artefacto portable en su lugar. Consulta [Trace Mode](/docs/devtools/wdio/trace-mode). Anula `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Estructura del artefacto de trace. Solo se aplica con `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Un trace por sesión / archivo spec / prueba. `'test'` escribe cada uno en `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Solo se aplica con `mode: 'trace'`. Consulta [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Qué traces conservar. Se combina con `traceGranularity: 'test'`. Solo se aplica con `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Graba un screencast denso y continuo dentro del trace para recorrerlo fotograma a fotograma en el reproductor. Solo se aplica con `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Modo trace + `traceGranularity: 'test'`. Captura de pantalla por prueba, adjuntada en línea a Allure (`image/png`) mediante `allure-js-commons` cuando hay un adaptador de ejecutor de Allure activo. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Modo trace + `traceGranularity: 'test'`. Vídeo screencast por prueba, conservado según la política indicada, adjuntado en línea a Allure (`video/webm`) mediante `allure-js-commons` cuando hay un adaptador de ejecutor de Allure activo. |
| `emitArtifactsManifest` | `boolean` | auto | Escribe el manifiesto `devtools-artifacts-<sessionId>.json` —el índice genérico que reporters/CI consumen para descubrir los artefactos generados— junto al trace. Desactivado por defecto; **se activa automáticamente** cuando hay un runtime de `allure-js-commons` activo. Solo en modo trace. |
| `captureAssertions` | `boolean` | `true` | Captura las aserciones de `node:assert` (tanto las que pasan como las que fallan) como filas de acción del trace. Usa `false` para desactivarlo. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> `port` y `hostname` solo tienen efecto antes de que arranque el backend, lo cual ocurre cuando se construye el primer driver, así que llama a `DevTools.configure(...)` antes de eso; una llamada posterior los ignora con una advertencia. Un rerun conserva el backend de su proceso padre, digan lo que digan.

> **Para CI**, configura tanto `headless: true` (oculta el navegador de prueba) como `openUi: false` (no intenta abrir la ventana del panel; los entornos de CI no tienen pantalla). El backend sigue ejecutándose en el puerto configurado para que puedas abrir la UI más tarde si lo necesitas.

</TabItem>
<TabItem value="python" label="Python">

No hay objeto de opciones: no tiene que aparecer nada específico de devtools en tu código de prueba. Con pytest configuras el adaptador del mismo modo en que configuras pytest; un script pasa argumentos con nombre a `enable()`; todo lo que no tiene flag es una variable de entorno.

| Flag de pytest | `[tool.pytest.ini_options]` | Efecto |
|---|---|---|
| `--devtools` | `devtools = true` | Captura esta ejecución y abre el panel. |
| `--devtools-trace` | `devtools_trace = true` | Captura esta ejecución y escribe un archivo de trace en lugar de abrir un panel. Implica `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Un archivo para toda la ejecución (`session`, el predeterminado) o uno por prueba. Implica `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Qué archivos merece la pena conservar. Implica `--devtools-trace`. Consulta [Cuántos archivos y cuáles conservar](#how-many-archives-and-which-ones-to-keep). |

Gana el de mayor prioridad: CLI, luego ini, luego el entorno indicado abajo. `pytest -o devtools=false` desactiva un valor predeterminado del proyecto para una ejecución, y `pytest -o devtools_trace_policy=on` hace lo mismo con cualquiera de los demás.

| Variable | Efecto |
|---|---|
| `DEVTOOLS_ENABLE=1` | Activa la captura, cuando ningún flag u opción ini lo ha hecho ya. |
| `DEVTOOLS_PORT=<n>` | Se conecta a un panel que ya esté escuchando en este puerto; también activa la captura. |
| `DEVTOOLS_HOST=<host>` | Host en el que se accede al panel (por defecto `localhost`). |
| `DEVTOOLS_TRACE=1` | Escribe un archivo de trace en lugar de abrir un panel. Selecciona el modo para un script simple; con pytest no activa la ejecución por sí solo. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Modo trace: un archivo para toda la ejecución, o uno por prueba. Es ambiental, por lo que nunca selecciona el modo trace por sí solo; combínalo con `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Modo trace: qué archivos merece la pena conservar. Es ambiental, por lo que nunca selecciona el modo trace por sí solo; combínalo con `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Modo trace: deja fuera del archivo el filmstrip denso. |
| `DEVTOOLS_A11Y=0` | Modo trace: omite el árbol de A11y y los rectángulos de elementos por acción. |
| `DEVTOOLS_OPEN=0` | No abre la ventana del panel (CI). |
| `DEVTOOLS_BIDI=0` | Desactiva BiDi y, con él, la captura de consola y de red. |
| `DEVTOOLS_RUN_ID=<id>` | Une varios procesos en una sola ejecución. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Inicia el backend con un comando explícito en lugar del resuelto. |

Se configuran por ti, no las configuras tú (se listan para que un valor inesperado resulte reconocible): `DEVTOOLS_RUNNER_CWD`, `DEVTOOLS_APP_REUSE` / `DEVTOOLS_APP_HOST` / `DEVTOOLS_APP_PORT` y `DEVTOOLS_RERUN_LAUNCH_COMMAND`.

El backend es una aplicación de Node, así que **Node.js 22.19 o posterior debe estar disponible en todos los modos**, incluso en modo trace, donde nunca se abre ninguna ventana del panel. No se trata solo de la UI: el backend sirve el recolector de la página, todo el flujo de eventos viaja por su WebSocket y, en modo trace, también es lo que construye el archivo. `enable()` comprueba la presencia de Node de antemano e indica qué falta, en lugar de fallar más tarde con un timeout al lanzar el proceso. El adaptador encuentra o lanza el backend por ti, en este orden: un backend que lanzó esta ejecución como rerun, luego `DEVTOOLS_PORT` (conexión), luego `DEVTOOLS_BACKEND_CMD`, luego el backend instalado con `selenium-devtools install-backend` y, por último, `npx @wdio/devtools-backend@<pinned version>`. La versión fijada es la misma para cada versión del adaptador, de modo que el backend siempre habla el contrato de comunicación del adaptador. Consulta [ejecutar el backend por separado](/docs/devtools/dashboard#running-the-backend-on-its-own) si prefieres gestionarlo tú mismo, o apunta `DEVTOOLS_PORT` a uno que ya tengas en ejecución, en cuyo caso no se necesita Node local.

### Aserciones

Las sentencias `assert` que pasan y que fallan aparecen como filas con **expected** y **actual**, y los fallos llegan a la pestaña Errors. En Python, `assert` es una sentencia y no una llamada, así que, a diferencia de la modificación de `node:assert` del adaptador de Node, no hay nada que envolver: el resultado proviene del ejecutor.

**Con pytest**, los valores provienen del reescritor de aserciones, por lo que cada fila lleva los operandos reales. Capturar las aserciones *que pasan* requiere `enable_assertion_pass_hook` de pytest, que el plugin activa por sí mismo. Una salvedad: pytest decide por módulo, *mientras lo reescribe*, si emite ese hook, así que un módulo cuyo bytecode reescrito se almacenó en caché antes de instalar el plugin sigue reportando solo los fallos. El adaptador lo avisa una vez durante la recolección e indica la caché que hay que borrar, que **no** siempre es el `__pycache__` junto a tus pruebas, ya que `sys.pycache_prefix` (establecido por defecto en el Python del sistema de macOS) envía todos los módulos reescritos a un único árbol central.

**En un script simple** no hay reescritor, así que los resultados provienen de los eventos de línea del intérprete y los valores se leen del frame que está a punto de ejecutar el assert. Solo se resuelven las lecturas que no pueden ejecutar tu código: un literal o una variable local se resuelven, un atributo o una llamada no, porque evaluar `driver.current_url` una segunda vez emitiría otro comando WebDriver.

</TabItem>
</Tabs>

## Modo trace {#trace-mode}

Ruta de captura headless, en **ambos lenguajes**: no se abre ninguna ventana de la UI de DevTools y la ejecución escribe un archivo de trace portable en una carpeta `test-results/`, con la misma forma que el artefacto de trace de WebdriverIO. Ambos solo difieren en cuánto del artefacto puedes ajustar y en quién lo construye.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Al final de la sesión, el propio adaptador escribe `trace-<sessionId>.zip` (o un directorio) en `test-results/`, junto al directorio de pruebas / configuración resuelto.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opcional; por defecto 'zip'
})
```

En modo trace se omiten la vinculación del puerto del backend, la ventana de la UI y la opción `screencast`. Para la referencia completa de la funcionalidad (contenido del artefacto, visor, pruebas móviles, cuándo elegir `zip` frente a `ndjson-directory`), consulta la [página de Trace Mode](/docs/devtools/wdio/trace-mode).

### Artefactos por prueba y retención

Con `traceGranularity: 'test'` cada prueba obtiene su propia carpeta de artefactos, y `tracePolicy` decide cuáles se conservan (p. ej. `retain-on-failure`). En ese modo también puedes capturar un `screenshot` (PNG) y un `video` (`.webm`) por prueba, y activar un `filmstrip` denso grabado en el trace para recorrerlo fotograma a fotograma. Cuando hay un adaptador de ejecutor de `allure-js-commons` activo, los traces / capturas de pantalla / vídeos por prueba se adjuntan en línea al informe de Allure (y `emitArtifactsManifest` se activa automáticamente); de lo contrario, se escriben en `test-results/` y se registran en el manifiesto.

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
DEVTOOLS_TRACE=1 python3 login.py     # script simple; igual que devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # escribe un trace.zip en lugar de abrir un panel
```

El archivo se guarda en `test-results/` junto al archivo de prueba del que provino el primer comando capturado —el mismo directorio en el que ya se escriben los vídeos de screencast—, con el nombre `trace-<sessionId>.zip`, o con el nombre de cada prueba cuando pides [un archivo por prueba](#how-many-archives-and-which-ones-to-keep). Cuando ningún comando llevaba una ubicación de código fuente tuya, recurre a `test-results/` bajo el directorio actual.

**No se abre ninguna ventana del panel.** El artefacto es la salida, y una ejecución en vivo se bloquea en la ventana hasta que la cierras; una ventana convertiría la escritura de un archivo en una sesión interactiva. El backend sigue arrancando, porque es lo que *construye* el archivo: las transformaciones del trace están en TypeScript, así que una ejecución de Python se las pide al backend en lugar de incluir una segunda copia de ellas. Esa es la única diferencia respecto al modo trace sin backend del adaptador de Node.js, y el motivo por el que [se requiere Node.js 22.19 o posterior en todos los modos](#configuration-options).

Además de las filas de comandos, las capturas de pantalla y selectores por comando, la consola y la red que capturan ambos modos, el archivo contiene:

| En el archivo | Predeterminado | Desactivar |
|---|---|---|
| Viaje en el tiempo del DOM: el flujo de mutaciones que el reproductor reproduce paso a paso | activado | - |
| Filmstrip denso: los fotogramas del screencast, incluidos en el trace en lugar de un `.webm` | activado | `DEVTOOLS_FILMSTRIP=0` |
| Árbol de A11y y superposición de elementos: se leen junto a cada acción, con dos consultas extra por comando | activado | `DEVTOOLS_A11Y=0` |

El modo trace no codifica ningún `.webm`, así que no necesita `ffmpeg`: los fotogramas *son* el filmstrip.

**La exportación se solicita cuando termina la ejecución, no cuando sale el proceso**: pytest la pide en `sessionfinish` y el `disable()` de un script exporta antes de cerrar el transporte, de modo que CI obtiene el artefacto tanto si alguna vez hubo una ventana como si no.

### Cuántos archivos y cuáles conservar {#how-many-archives-and-which-ones-to-keep}

Dos ajustes lo deciden, y ninguno tiene significado fuera del modo trace.

**Granularidad**: cuántos archivos escribe la ejecución:

| `--devtools-trace-granularity` | Resultado |
|---|---|
| `session` (predeterminado) | Un archivo para toda la ejecución. |
| `test` | Un archivo por prueba, cada uno con solo los comandos, consola, red, mutaciones del DOM, árboles de a11y y fotogramas de screencast de esa prueba. |

Aquí no existe deliberadamente el valor `spec`. En este adaptador, el spec *es* su archivo de prueba, así que un tercer nombre solo podría significar discretamente uno de los dos anteriores.

**Política**: cuáles de esos archivos se conservan:

| `--devtools-trace-policy` | Resultado |
|---|---|
| `on` (predeterminado) | Conserva todo. |
| `retain-on-failure` | Conserva solo lo que falló. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Se aceptan, pero hoy se comportan **exactamente igual que `retain-on-failure`**. |

Esos cuatro últimos aún no tienen en cuenta los reintentos, y conviene decirlo claramente en lugar de que lo descubras por un archivo que esperabas: nada de lo que este adaptador envía lleva un número de intento, así que una prueba reintentada sobrescribe su propio resultado anterior y la pregunta sobre reintentos ni siquiera puede plantearse. El backend registra esta degradación en lugar de fingir lo contrario. Elige uno de ellos solo si quieres `retain-on-failure` bajo un nombre que significará más en el futuro.

Ambos se combinan:

| Granularidad | Política | Lo que obtienes |
|---|---|---|
| `test` | `retain-on-failure` | Solo las pruebas que fallaron. |
| `session` | `retain-on-failure` | El archivo de toda la ejecución, si algo en ella falló. |
| cualquiera | `on` | Todo. |

Cada archivo conservado con granularidad `test` lleva el nombre de su prueba (`trace-<test>-<hash>.zip`, con el hash tomado del nodeid de la prueba, para que dos casos parametrizados que comparten título no se sobrescriban entre sí). Una ejecución que no conserva nada no escribe nada en absoluto, y de eso se trata: los archivos que te quedan son los que merece la pena abrir, y una exportación rechazada es la política funcionando, no un fallo.

Configúralos para una ejecución:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

O fíjalos en el proyecto, para que un colaborador que clone el proyecto capture de la misma manera sin que nadie se lo diga:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` en `pyproject.toml` admite las mismas claves, y `pytest -o devtools_trace_policy=on tests/` anula una de ellas para una sola ejecución sin editar el archivo. Una versión completamente comentada —cada ajuste y cada variable de entorno, con su propósito— está en el repositorio en [`examples/selenium-py/pytest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py/pytest).

Un script simple pasa los mismos dos como argumentos con nombre:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Indicar cualquiera de los dos explícitamente selecciona el modo trace.** El flag de CLI, la opción ini y el argumento de `enable()` lo implican, ya que una política o una granularidad no significan nada en modo en vivo, y respetar una sin el modo descartaría silenciosamente lo que pediste. `DEVTOOLS_TRACE_POLICY` y `DEVTOOLS_TRACE_GRANULARITY` deliberadamente **no** lo hacen: una variable exportada es ambiental y puede haberse configurado para otro script en la misma shell, así que cambiar una ejecución en vivo a modo trace por ese motivo te quitaría el panel que nadie pidió perder; combínalas con `DEVTOOLS_TRACE=1`. Una ejecución que acaba ignorando un ajuste de trace exportado registra una advertencia, en lugar de dejar que notes un archivo que nunca apareció.

</TabItem>
</Tabs>

### Ver el trace

Abre cualquier `.zip` de trace en el reproductor oficial: la misma UI de DevTools en un modo **player** dedicado:

```bash
npx show-trace path/to/trace.zip      # en un proyecto que instala el adaptador
pnpm show-trace path/to/trace.zip     # desde el monorepo de devtools
```

El binario `show-trace` viene con `@wdio/selenium-devtools`, así que está disponible en cualquier proyecto que lo instale, sin dependencias adicionales. Un proyecto de Python no instala ningún adaptador de Node.js, pero el mismo reproductor viene con el backend que el adaptador ya descarga por ti: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Como el adaptador de Selenium captura el **flujo de mutaciones del DOM** de la página y una instantánea de elementos / accesibilidad por comando junto a cada captura de pantalla, un trace de Selenium aprovecha todas las funciones del reproductor: viaje en el tiempo del DOM, la pestaña A11y y la superposición para elegir localizadores, la pestaña Transcript con Copy-for-LLM, el anidamiento Feature → Scenario → Step de Cucumber y la línea de tiempo desplazable. Un trace de Python lleva el mismo flujo de mutaciones y la misma instantánea por acción (allí la lectura de elementos / a11y es exclusiva del modo trace y está activada por defecto); el anidamiento de Gherkin es lo único que no tiene equivalente en pytest.

El trace usa un esquema NDJSON portable, por lo que el mismo `.zip` (o directorio) también se abre en otros visores de trace compatibles. Consulta la página **[Trace Player](/docs/devtools/trace-player)** para el recorrido completo.

## API pública

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // establece opciones de ejecución (ver arriba)
DevTools.startTest(name, meta?)      // marca un límite de prueba con nombre (solo scripts de Node simples)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Con Mocha / Jest / Cucumber el plugin se engancha automáticamente al ciclo de vida del ejecutor, así que no necesitas `startTest` / `endTest` manualmente; llamarlos crearía filas duplicadas.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # conecta e instrumenta; idempotente
devtools.disable()                    # desmonta; seguro llamarlo dos veces
devtools.wait_for_dashboard_close()   # bloquea hasta que se cierre la ventana
devtools.get_capturer()               # el SessionCapturer activo, o None
devtools.dashboard_url()              # la URL en la que se sirve el panel
devtools.export_trace()               # escribe el archivo de trace ahora (solo modo trace)
```

`enable()` acepta `host` y `port` opcionales, además de argumentos con nombre:

```python
devtools.enable(trace=True)                            # escribe un trace.zip; no abre ninguna ventana
devtools.enable(trace=True, filmstrip=False)           # ... sin el filmstrip denso
devtools.enable(trace=True, a11y=False)                # ... sin la lectura de elementos / a11y por acción
devtools.enable(trace_granularity='test')              # ... un archivo por prueba (implica trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... conserva solo lo que falló (implica trace=True)
```

`filmstrip` y `a11y` solo se aplican al modo trace, y ambos están activados por defecto (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` configuran lo mismo desde el entorno). `trace` recurre a `DEVTOOLS_TRACE`. `trace_granularity` y `trace_policy` recurren a `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`, y pasar cualquiera de los dos activa el modo trace por sí solo; consulta [Cuántos archivos y cuáles conservar](#how-many-archives-and-which-ones-to-keep). Un valor fuera del conjunto aceptado genera una advertencia y recurre al valor predeterminado, en lugar de descubrirse más tarde como un archivo ausente.

Con pytest, el plugin controla todo esto a partir de `--devtools` / `--devtools-trace` (o la opción ini correspondiente, o `DEVTOOLS_ENABLE=1`), y los límites de las pruebas provienen de los propios hooks de pytest; no hay un equivalente de `startTest` / `endTest` que llamar.

</TabItem>
</Tabs>

## Ejemplos

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Los ejemplos funcionales están en el directorio `examples/` de nivel superior del repositorio. Compila el workspace una vez (`pnpm install && pnpm build`) y luego ejecuta desde la raíz del repositorio. `pnpm demo:selenium` ejecuta el ejemplo predeterminado (Cucumber); las variantes por ejecutor son:

| Directorio | Ejecutor | Comando |
|-----------|--------|---------|
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha + allure-mocha | `pnpm --filter @wdio/selenium-devtools example:mocha:allure` |
| [`examples/selenium-js/jest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/jest) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium-js/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/cucumber) | Cucumber | `pnpm demo:selenium` |
| [`examples/selenium-js/mobile/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mobile) | Mocha en Appium | `pnpm demo:selenium:mobile` |

</TabItem>
<TabItem value="python" label="Python">

Los ejemplos de Python están en [`examples/selenium-py/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py). Instala el adaptador y compila el workspace una vez (`pnpm install && pnpm build`, para que exista el backend) y luego ejecuta desde la raíz del repositorio. Las demos ejecutan `python3` directamente, así que el adaptador debe estar instalado en ese intérprete: `python3 -m venv .venv && source .venv/bin/activate && pip install -e packages/selenium-devtools-py`.

| Ejemplo | Qué muestra | Comando |
|---|---|---|
| `scripts/web_form.py` | La configuración de tres líneas para un script simple | `pnpm demo:python` |
| `scripts/login.py` | Un script más largo: navegación, rellenado de formularios, aserciones | `pnpm demo:python:login` |
| `mobile/android/`, `mobile/ios/` | Appium: la app Reloj de Android, o los Ajustes de iOS con `DEVTOOLS_MOBILE_PLATFORM=ios` (primero `pip install -r examples/selenium-py/requirements-mobile.txt`) | `pnpm demo:python:mobile` |
| `pytest/` | pytest con una clase y una prueba a nivel de módulo, más un `pytest.ini` que fija el modo trace, la granularidad y la retención; cada ajuste está comentado con lo que hace | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Funcionalidades

El adaptador de Selenium ofrece la misma experiencia de UI de DevTools que WebdriverIO, en ambos lenguajes. Cada funcionalidad de abajo se captura automáticamente sin configuración específica: basta con el `DevTools.configure({})` base en Node.js, o `pytest --devtools` en Python. La consola y la red se transmiten a través de los handlers BiDi de Selenium, con un recolector inyectado como alternativa en Node.js. Los enlaces llevan a la referencia completa de cada funcionalidad.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Vistas previas del navegador en vivo, capturas de pantalla por comando y reejecución de pruebas/suites con un clic
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Toma una instantánea de una prueba fallida, vuelve a ejecutarla y compara ambas ejecuciones lado a lado
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Detecta automáticamente Mocha, Jest, Cucumber o un script simple en Node.js; pytest o un script simple en Python
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Captura e inspecciona la salida de la consola del navegador
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Supervisa las llamadas a la API y la actividad de red
- **[Metadata](/docs/devtools/wdio/metadata)** - Capabilities de la sesión, entorno y tiempos por sesión de navegador
- **[TestLens](/docs/devtools/wdio/testlens)** - Salta desde cualquier comando a la línea de código que lo originó
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Grabación de vídeo automática de las sesiones del navegador
- **Tiempos de navegación** - Después de cada comando de navegación, los tiempos de carga / DOM listo / respuesta, el número de recursos, las cookies y la información del documento se adjuntan a la fila de ese comando
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Captura headless que genera un `trace.zip` portable (sin ventana de UI), en ambos lenguajes, con división por prueba y retención en ambos (`traceGranularity` / `tracePolicy` en Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` en Python). El `screenshot` / `video` por prueba y el adjunto en línea a Allure siguen siendo exclusivos de Node.js; consulta [Modo trace](#trace-mode)

En Node.js, el screencast es la única funcionalidad con opciones propias (consulta [Opciones de configuración](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

En Python, la propia salida de la ejecución también llega a la pestaña Console: los registros de `logging` de Python (los de selenium y los del adaptador) y la salida `print()` de la prueba, que se duplica para que tu terminal la siga mostrando.

En Python el screencast no necesita configuración: Chrome transmite fotogramas por CDP, otros navegadores recurren a una captura de pantalla por comando, y codificar el `.webm` requiere `ffmpeg` en el `PATH`. En modo trace, esos mismos fotogramas se convierten en el filmstrip denso del archivo en lugar de un `.webm`, así que no se codifica nada y no se necesita `ffmpeg`.

## Cómo funciona

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

El plugin modifica los prototipos `Builder`, `WebDriver` y `WebElement` de `selenium-webdriver` en el momento de la importación:

- **`Builder.build()`** - tras la construcción, el driver se registra con el capturador de sesión y el backend de DevTools se inicia en un proceso hijo independiente.
- **Cada método público de `WebDriver` / `WebElement`** - se envuelve con captura de comandos (argumentos + resultado + captura de pantalla + origen de la llamada).
- **`WebDriver.quit()`** - un hook de limpieza con await vacía la codificación del screencast, el búfer del WebSocket y los metadatos finales antes de que se ejecute el quit original.

Cuando BiDi está disponible (Chrome ≥114), los logs de consola, las excepciones de JavaScript y los eventos de red se transmiten directamente a través de los handlers BiDi de Selenium. En caso contrario, el plugin recurre a un script recolector inyectado en el navegador, de modo que una sesión de Safari o Appium sigue listando todas las peticiones, a partir de dos fuentes propias de la página. Una llamada `fetch` / `XMLHttpRequest` pasa por la modificación del recolector y lleva su método, cabeceras, estado y cuerpo. Cualquier otra carga (el documento, scripts, estilos, imágenes, fuentes) proviene del búfer de Resource Timing de la página con sus tiempos y tamaño, pero sin cabeceras ni cuerpo, y en Safari sin estado; la pestaña Network lo indica en cada una de esas filas.

Un `driver.wait()` aparece como el único comando que hizo la prueba, no como una fila por cada sondeo.

El recolector del lado de la página se registra al inicio del documento mediante BiDi (`script.addPreloadScript`), de modo que cada página se instrumenta antes de que se ejecute cualquiera de sus propios scripts; sin BiDi, recurre a inyectar un `<script>` después de cada navegación. Registra el **flujo de mutaciones del DOM** de la página y una instantánea de elementos / accesibilidad por comando, de modo que un trace contiene lo suficiente para reconstruir el DOM en vivo en cada paso (mapeo por navegación); esto es lo que impulsa el viaje en el tiempo del DOM y la pestaña A11y del reproductor, en lugar de una reproducción basada solo en capturas de pantalla.

</TabItem>
<TabItem value="python" label="Python">

No hay prototipos que modificar, así que el adaptador de Python envuelve un único método:

- **`WebDriver.execute()`** - el único punto por el que pasan todos los comandos. Los métodos de los elementos también delegan en él (`self._parent.execute`), así que `click`, `send_keys` y `text` se capturan con el mismo envoltorio sin tocar las clases de los elementos.
- **Configuración de la sesión** - en el primer comando real se registra el driver, se envían los metadatos y se preparan BiDi, el recolector y el screencast.
- **`quit()`** - se intercepta antes de que se destruya la sesión, de modo que el screencast se codifica y los fotogramas finales se vacían mientras el driver aún existe.

La consola, las excepciones de JavaScript y la red se transmiten a través de la capa BiDi de selenium (4.44+), que el adaptador activa por ti inyectando la capability `webSocketUrl` en la petición `newSession`. Cuando el driver no expone BiDi en absoluto (Safari y todas las sesiones que sirve Appium), el recolector inyectado en la página rellena la pestaña Network, a partir de dos fuentes propias de la página. Una llamada `fetch` / `XMLHttpRequest` pasa por su modificación y lleva método, cabeceras, estado y cuerpo. Cualquier otra carga proviene del búfer de Resource Timing del documento con sus tiempos y tamaño, pero sin cabeceras ni cuerpo, y en Safari sin estado.

El **flujo de mutaciones del DOM** proviene del mismo recolector del lado del navegador que en Node.js, registrado al inicio del documento mediante BiDi para que una página se instrumente antes de que se ejecute cualquiera de sus propios scripts. Con BiDi desactivado (`DEVTOOLS_BIDI=0`), el recolector se inyecta en cada documento con un `<script>`. En Chrome, el navegador envía el screencast a través de un websocket CDP propio, separado del canal de comandos de la sesión, lo que hace seguro un flujo real de fotogramas cuando una sesión de Selenium no es thread-safe.

</TabItem>
</Tabs>

## Móvil (Appium)

Las sesiones de Appium se capturan en modo en vivo y en modo trace, en ambos lenguajes. Una sesión de navegador móvil se captura igual que una de escritorio; una app nativa obtiene comandos, capturas de pantalla y datos de elementos a partir del árbol XML de la plataforma, sin DOM. Este adaptador decide a partir de las capabilities iniciales, así que la parte webview de una app híbrida se captura como si siguiera siendo nativa (solo el servicio de WebdriverIO sigue los cambios de contexto).

Pruébalo con `pnpm demo:selenium:mobile` (Node.js) o `pnpm demo:python:mobile` (Python), ejecutado desde la raíz de una copia compilada del repositorio de devtools (pasos de configuración en [Ejecutar un ejemplo](/docs/devtools/mobile#running-an-example)). `DEVTOOLS_MOBILE_PLATFORM=ios` ejecuta el spec de iOS, y `DEVTOOLS_MOBILE=web` controla el propio navegador del dispositivo. Los requisitos previos están en [`examples/MOBILE.md`](https://github.com/webdriverio/devtools/blob/main/examples/MOBILE.md); consulta la [página de Mobile Testing](/docs/devtools/mobile) para la referencia móvil completa. La red de una app nativa se captura cuando la sesión establece `appium:intercept: true` y Appium ejecuta el plugin appium-interceptor; consulta [Red de apps nativas](/docs/devtools/mobile#native-app-network).

## Limitaciones

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Limitación | Detalle |
|-----------|--------|
| Rerun de pasos individuales en Cucumber | El filtro `--name` de Cucumber apunta a escenarios, no a pasos Gherkin individuales. El rerun por paso del panel está deshabilitado con Cucumber. |
| Salvedad del modo headless | `headless: true` inyecta `--headless=old`; `--headless=new` produce fotogramas CDP totalmente negros en el screencast. |
| Viewport inicial | El iframe de instantánea del panel usa 1280×800 hasta que se completa la primera navegación y el recolector del lado del navegador informa del viewport real. |
| Workers en paralelo | Cada proceso worker de Jest/Vitest carga el plugin y se reporta como una ejecución separada, así que el panel solo conserva el estado del último worker. Ejecuta en serie (`--runInBand`) para tener una única ejecución en el panel. |
| Safari en modo en vivo | Safari solo entrega la entrada sintetizada a su ventana en primer plano y aun así informa de éxito, así que la entrada emitida mientras otra ventana está delante no llega a ninguna parte. En Safari, el plugin abre el panel detrás del navegador y trae al frente la ventana de la sesión antes de cada clic en un elemento, entrada de teclado, clear o submit. El modo trace no abre ninguna ventana y no se ve afectado. |

</TabItem>
<TabItem value="python" label="Python">

| Limitación | Detalle |
|-----------|--------|
| Sin captura de pantalla, vídeo ni adjunto de Allure por prueba | Se admiten **archivos de trace** por prueba (`--devtools-trace-granularity test`), pero las opciones `screenshot` y `video` por prueba del adaptador de Node.js y su adjunto en línea con `allure-js-commons` no tienen equivalente en Python: los archivos son los artefactos. |
| La retención basada en reintentos se degrada | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` y `retain-on-failure-and-retries` se aceptan, pero se comportan exactamente igual que `retain-on-failure`: nada de lo que se envía lleva un número de intento, así que una prueba reintentada sobrescribe su propio resultado anterior. El backend registra la degradación. |
| Node es necesario en todos los modos | El backend es una aplicación de Node —sirve el recolector de la página, transporta el flujo de eventos y construye el archivo de trace—, así que Node.js 22.19 o posterior debe estar presente incluso en modo trace, donde no se abre ninguna ventana. El adaptador lo encuentra o lo lanza por ti. |
| Las opciones del navegador son tuyas | No hay opción `headless`; configura Chrome mediante el propio objeto `Options` de selenium como harías normalmente. |
| El vídeo en modo en vivo necesita ffmpeg | Sin `ffmpeg` en el `PATH`, la codificación del `.webm` se omite con una advertencia en lugar de un error. El modo trace no codifica ninguno —sus fotogramas van al filmstrip—, así que nunca necesita ffmpeg. |

</TabItem>
</Tabs>