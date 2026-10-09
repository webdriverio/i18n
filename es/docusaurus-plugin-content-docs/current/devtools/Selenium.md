---
id: selenium
title: Selenium DevTools
description: "Añade la interfaz de depuración de DevTools a las pruebas de Selenium WebDriver en Node.js o Python con cualquier ejecutor de pruebas, y habilita el modo de traza."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adaptador de Selenium WebDriver para [WebdriverIO DevTools](https://github.com/webdriverio/devtools): ofrece la misma interfaz visual de depuración a cualquier prueba de Selenium, en **Node.js** o **Python**, independientemente del ejecutor de pruebas.

En Node.js funciona con **Mocha**, **Jest**, **Cucumber** o un script simple: el plugin detecta automáticamente el ejecutor y conecta los límites de las pruebas en consecuencia. En Python funciona con **pytest** o un script simple y, con pytest, no requiere ningún cambio en tus archivos de prueba.

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

**Requiere Python 3.10+ y `selenium>=4.44`.** Ambos están declarados en los metadatos del paquete, de modo que pip los exige en lugar de dejar que descubras una pestaña Network vacía en tiempo de ejecución. La captura de red se suscribe a través de la API pública de eventos BiDi que selenium regeneró en la versión 4.44; la conexión privada a la que reemplazó se eliminó en esa misma versión, y 4.44 es lo que fija el requisito mínimo de Python.

</TabItem>
</Tabs>

## Configuración inicial

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Cada bloque de abajo es un **ejemplo completo, listo para copiar y pegar**, que incluye la llamada a `DevTools.configure(...)`. Elige el ejecutor que utilizas, coloca el fragmento en tu proyecto y ejecútalo.

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

> Alternativa: omite la importación en cada archivo y usa `mocha --require @wdio/selenium-devtools` para cargar el plugin una sola vez para toda la ejecución.

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

Ejecútalo (ESM necesita la opción experimental):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

La estructura dividida de Cucumber implica tres archivos pequeños: uno para cargar el plugin, otro para World/hooks y otro para las definiciones de pasos.

`features/support/setup.js` - carga el plugin y configúralo una sola vez:

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

`cucumber.json` - conecta el archivo de configuración **en primer lugar** para que el plugin modifique Selenium antes de que se ejecute cualquier paso:

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

### Script simple de Node (sin ejecutor de pruebas)

Si ejecutas `node tests/google.test.js` directamente, no hay ningún ejecutor al que el plugin pueda engancharse automáticamente. De forma predeterminada obtienes una única fila "Selenium Session" en el panel. Para obtener un límite de prueba con nombre, llama a `DevTools.startTest` / `endTest` alrededor de tu código:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // opcional - asigna un nombre a la fila de la prueba

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

> Usa `startTest` / `endTest` solo en scripts simples de Node. Con Mocha / Jest / Cucumber el plugin ya sabe cuándo empieza y termina cada prueba; llamarlos manualmente crearía filas duplicadas.

</TabItem>
<TabItem value="python" label="Python">

### pytest

No hay que añadir nada a tus archivos de prueba: el plugin se descubre automáticamente y una opción lo activa para la ejecución:

```bash
pytest --devtools tests/              # panel en vivo
pytest --devtools-trace tests/        # escribe un archivo de traza en su lugar (implica --devtools)
```

O deja la elección fijada en el proyecto, para que nadie tenga que recordar la opción:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # archivo de traza en lugar de un panel
# devtools_trace_granularity = "test"            # ... un archivo por prueba
# devtools_trace_policy = "retain-on-failure"    # ... conservando solo lo que falló
```

Un `pytest.ini` con una sección `[pytest]` admite las mismas claves. Las dos opciones de traza se explican en [Cuántos archivos y cuáles conservar](#how-many-archives-and-which-ones-to-keep).

La captura siempre es opcional y debe activarse explícitamente: instalar el paquete nunca debe cambiar el comportamiento de una suite existente. Lo único que varía es *cómo* lo activas:

| Cómo lo activas | Alcance |
|---|---|
| `--devtools` / `--devtools-trace` | esta ejecución |
| `devtools` / `devtools_trace` en `[tool.pytest.ini_options]` | este proyecto |
| `DEVTOOLS_ENABLE=1` (o `DEVTOOLS_PORT=<n>`, que además se conecta a un panel que ya esté en ejecución) | esta shell - para CI |

Gana el de mayor prioridad: CLI, luego ini y luego el entorno. `pytest -o devtools=false` desactiva un valor predeterminado del proyecto para una sola ejecución, razón por la cual no existe `--no-devtools`. `DEVTOOLS_TRACE=1` selecciona el modo de traza, pero **no** activa la captura por sí solo, de modo que exportarlo para tus propios scripts nunca captura una ejecución de pytest que no hayas solicitado.

En modo en vivo, el panel se abre en una ventana de navegador dedicada y **permanece abierto después de la ejecución** para que puedas inspeccionar lo que ocurrió; ciérralo (o pulsa `Ctrl-C`) para terminar. Dos tipos de ejecución quedan sin capturar incluso cuando lo activas: `--collect-only`, en la que no se ejecuta nada, y una ejecución que no recopiló ninguna prueba; de lo contrario, una ruta mal escrita dejaría tu terminal detenida frente a un panel vacío.

### Script simple de Python (sin ejecutor de pruebas)

Dos líneas alrededor de tu código Selenium existente:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # abre el panel, captura cada comando
# devtools.enable(trace=True)         # o: escribe un trace.zip y no abre ninguna ventana

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # mantiene la interfaz abierta para inspeccionar (no hace nada si no hay ventana abierta)
devtools.disable()
```

Si no se puede iniciar o alcanzar el backend, `enable()` registra una advertencia y devuelve `None`. Se omite la captura y tus pruebas se siguen ejecutando: la ausencia del panel nunca hace fallar una suite.

### Ejecuciones en paralelo (`pytest -n`)

**pytest-xdist funciona sin configuración adicional.** Todos los procesos que informan a una misma ejecución deben coincidir en un identificador de ejecución; de lo contrario, el backend trata cada conexión como una ejecución nueva y borra lo que capturó la anterior. Con xdist sí coinciden: el plugin también se carga en el **controlador**, y al habilitar la captura allí se resuelve el identificador antes de que xdist lance ningún worker; los workers son procesos hijos, así que lo heredan.

Lo que realmente aparece como ejecuciones separadas: dos invocaciones independientes de `pytest`, o un worker iniciado sin el entorno. Exporta tú mismo `DEVTOOLS_RUN_ID` para unir esos procesos en una sola ejecución.

</TabItem>
</Tabs>

## Opciones de configuración {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Opción | Tipo | Valor predeterminado | Descripción |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Puerto del servidor backend de DevTools. Se incrementa automáticamente si ya está en uso. |
| `hostname` | `string` | `'localhost'` | Nombre de host al que se vincula el servidor backend. |
| `openUi` | `boolean` | `true` | Abre automáticamente la interfaz de DevTools en una nueva ventana de Chrome. Establécelo en `false` para CI. |
| `captureScreenshots` | `boolean` | `true` | Captura una captura de pantalla después de cada comando de WebDriver. |
| `headless` | `boolean` | `false` | Ejecuta el navegador de **pruebas** en modo headless (inyecta `--headless=old`). La ventana de la interfaz de DevTools no se ve afectada. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Grabación de vídeo `.webm` por sesión. Las opciones coinciden con las de la página [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Plantilla de comando para volver a ejecutar cada prueba. Se sustituye `{{testName}}`. Si se omite, se deriva automáticamente del argv del ejecutor. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` abre la interfaz de DevTools; `trace` la omite y escribe en su lugar un artefacto portátil. Consulta [Trace Mode](/docs/devtools/wdio/trace-mode). Anula `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Estructura del artefacto de traza. Solo se aplica cuando `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Una traza por sesión / archivo spec / prueba. `'test'` escribe cada una en `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Solo se aplica cuando `mode: 'trace'`. Consulta [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Qué trazas conservar. Se combina con `traceGranularity: 'test'`. Solo se aplica cuando `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Graba un screencast denso y continuo dentro de la traza para recorrerlo fotograma a fotograma en el reproductor. Solo se aplica cuando `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Modo de traza + `traceGranularity: 'test'`. Captura de pantalla por prueba, adjuntada en línea a Allure (`image/png`) mediante `allure-js-commons` cuando hay un adaptador de ejecutor de Allure activo. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Modo de traza + `traceGranularity: 'test'`. Vídeo de screencast por prueba, conservado según la política indicada y adjuntado en línea a Allure (`video/webm`) mediante `allure-js-commons` cuando hay un adaptador de ejecutor de Allure activo. |
| `emitArtifactsManifest` | `boolean` | auto | Escribe el manifiesto `devtools-artifacts-<sessionId>.json` —el índice genérico que los reporters/CI consumen para descubrir los artefactos generados— junto a la traza. Desactivado por defecto; **se activa automáticamente** cuando hay un runtime de `allure-js-commons` activo. Solo en modo de traza. |
| `captureAssertions` | `boolean` | `true` | Captura las aserciones de `node:assert` (tanto las que pasan como las que fallan) como filas de acción de la traza. Establécelo en `false` para desactivarlo. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **Para CI**, establece tanto `headless: true` (oculta el navegador de pruebas) como `openUi: false` (no intenta abrir la ventana del panel; los entornos de CI no tienen pantalla). El backend sigue ejecutándose en el puerto configurado, así que aún puedes abrir la interfaz más tarde si lo necesitas.

</TabItem>
<TabItem value="python" label="Python">

No hay un objeto de opciones: no es necesario que aparezca nada específico de devtools en tu código de prueba. Con pytest configuras el adaptador del mismo modo que configuras pytest; un script pasa argumentos con nombre a `enable()`; todo lo que no tiene una opción es una variable de entorno.

| Opción de pytest | `[tool.pytest.ini_options]` | Efecto |
|---|---|---|
| `--devtools` | `devtools = true` | Captura esta ejecución y abre el panel. |
| `--devtools-trace` | `devtools_trace = true` | Captura esta ejecución y escribe un archivo de traza en lugar de abrir un panel. Implica `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Un archivo para toda la ejecución (`session`, el valor predeterminado) o uno por prueba. Implica `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Qué archivos merece la pena conservar. Implica `--devtools-trace`. Consulta [Cuántos archivos y cuáles conservar](#how-many-archives-and-which-ones-to-keep). |

Gana el de mayor prioridad: CLI, luego ini y luego el entorno que se muestra a continuación. `pytest -o devtools=false` desactiva un valor predeterminado del proyecto para una ejecución, y `pytest -o devtools_trace_policy=on` hace lo mismo con cualquiera de los demás.

| Variable | Efecto |
|---|---|
| `DEVTOOLS_ENABLE=1` | Activa la captura, cuando ninguna opción de CLI o ini lo ha hecho ya. |
| `DEVTOOLS_PORT=<n>` | Se conecta a un panel que ya está escuchando en este puerto; también activa la captura. |
| `DEVTOOLS_HOST=<host>` | Host en el que se accede al panel (por defecto `localhost`). |
| `DEVTOOLS_TRACE=1` | Escribe un archivo de traza en lugar de abrir un panel. Selecciona el modo para un script simple; con pytest no activa la ejecución por sí solo. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Modo de traza: un archivo para toda la ejecución o uno por prueba. Es ambiental, así que nunca selecciona el modo de traza por sí solo; combínalo con `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Modo de traza: qué archivos merece la pena conservar. Es ambiental, así que nunca selecciona el modo de traza por sí solo; combínalo con `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Modo de traza: excluye del archivo la tira de fotogramas densa. |
| `DEVTOOLS_A11Y=0` | Modo de traza: omite el árbol de A11y y los rectángulos de elementos por acción. |
| `DEVTOOLS_OPEN=0` | No abre la ventana del panel (CI). |
| `DEVTOOLS_BIDI=0` | Desactiva BiDi y, con él, la captura de consola y de red. |
| `DEVTOOLS_RUN_ID=<id>` | Une varios procesos en una sola ejecución. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Inicia el backend con un comando explícito en lugar del resuelto. |

El backend es una aplicación de Node, por lo que **Node.js 22.19 o posterior debe estar disponible en todos los modos**, incluso en el modo de traza, en el que nunca se abre ninguna ventana del panel. No se trata solo de la interfaz: el colector de la página lo sirve el backend, todo el flujo de eventos viaja por su WebSocket y, en modo de traza, también es lo que construye el archivo. `enable()` comprueba la presencia de Node desde el principio e indica lo que falta en lugar de fallar más tarde con un tiempo de espera agotado al iniciar el proceso. El adaptador encuentra o inicia el backend por ti; consulta [ejecutar el backend por separado](/docs/devtools/dashboard#running-the-backend-on-its-own) si prefieres gestionarlo tú mismo, o apunta `DEVTOOLS_PORT` a uno que ya tengas en ejecución, en cuyo caso no se necesita Node local.

### Aserciones

Las sentencias `assert` que pasan y las que fallan aparecen como filas con los valores **expected** y **actual**, y los fallos llegan a la pestaña Errors. En Python, `assert` es una sentencia y no una llamada, así que, a diferencia de la modificación de `node:assert` del adaptador de Node, no hay nada que envolver: el resultado proviene del ejecutor.

**Con pytest**, los valores provienen del reescritor de aserciones, por lo que cada fila contiene los operandos reales. Capturar las aserciones *que pasan* requiere el `enable_assertion_pass_hook` de pytest, que el plugin activa por sí mismo. Una salvedad: pytest decide por módulo, *mientras lo reescribe*, si emite ese hook, de modo que un módulo cuyo bytecode reescrito se almacenó en caché antes de instalar el plugin seguirá informando solo de los fallos. El adaptador lo indica una vez durante la recopilación y nombra la caché que hay que eliminar, que **no** siempre es el `__pycache__` junto a tus pruebas, ya que `sys.pycache_prefix` (establecido por defecto en el Python del sistema de macOS) envía todos los módulos reescritos a un único árbol central.

**En un script simple** no hay reescritor, así que los resultados provienen de los eventos de línea del intérprete y los valores se leen del frame que está a punto de ejecutar el assert. Solo se resuelven las lecturas que no pueden ejecutar tu código: un literal o una variable local se resuelven, un atributo o una llamada no, porque evaluar `driver.current_url` una segunda vez emitiría otro comando de WebDriver.

</TabItem>
</Tabs>

## Modo de traza {#trace-mode}

Ruta de captura sin interfaz, en **ambos lenguajes**: no se abre ninguna ventana de la interfaz de DevTools y la ejecución escribe un archivo de traza portátil en una carpeta `test-results/`, con la misma estructura que el artefacto de traza de WebdriverIO. Ambos solo se diferencian en cuánto del artefacto puedes ajustar y en quién lo construye.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Al finalizar la sesión, el adaptador escribe por sí mismo `trace-<sessionId>.zip` (o un directorio) en `test-results/`, junto al directorio de pruebas / configuración resuelto.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opcional; por defecto 'zip'
})
```

La vinculación del puerto del backend, la ventana de la interfaz y la opción `screencast` se omiten en modo de traza. Para consultar la referencia completa de funciones (contenido del artefacto, visor, pruebas en móviles, cuándo elegir `zip` o `ndjson-directory`), consulta la [página de Trace Mode](/docs/devtools/wdio/trace-mode).

### Artefactos por prueba y retención

Con `traceGranularity: 'test'`, cada prueba obtiene su propia carpeta de artefactos y `tracePolicy` decide cuáles se conservan (p. ej., `retain-on-failure`). En ese modo también puedes capturar un `screenshot` (PNG) y un `video` (`.webm`) por prueba, y habilitar un `filmstrip` denso grabado en la traza para recorrerlo fotograma a fotograma. Cuando hay un adaptador de ejecutor de `allure-js-commons` activo, las trazas / capturas de pantalla / vídeos por prueba se adjuntan en línea al informe de Allure (y `emitArtifactsManifest` se activa automáticamente); de lo contrario, se escriben en `test-results/` y se registran en el manifiesto.

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

No hay ningún objeto de opciones que configurar: una opción con pytest, un argumento con nombre en un script:

```bash
pytest --devtools-trace tests/        # implica --devtools
DEVTOOLS_TRACE=1 python3 login.py     # script simple; igual que devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # escribe un trace.zip en lugar de abrir un panel
```

El archivo se guarda en `test-results/`, junto al archivo de prueba del que procede el primer comando capturado —el mismo directorio en el que ya se escriben los vídeos de screencast—, con el nombre `trace-<sessionId>.zip`, o con el nombre de cada prueba cuando solicitas [un archivo por prueba](#how-many-archives-and-which-ones-to-keep). Cuando ningún comando contiene una ubicación de código fuente tuya, se recurre a `test-results/` dentro del directorio actual.

**No se abre ninguna ventana del panel.** El artefacto es el resultado, y una ejecución en vivo se bloquea en la ventana hasta que la cierras: una ventana convertiría la escritura de un archivo en una sesión interactiva. El backend se sigue iniciando, porque es lo que *construye* el archivo: las transformaciones de la traza están escritas en TypeScript, así que una ejecución de Python se las solicita al backend en lugar de incluir una segunda copia. Esa es la única diferencia con el modo de traza sin backend del adaptador de Node.js, y la razón por la que [se requiere Node.js 22.19 o posterior en todos los modos](#configuration-options).

Además de las filas de comandos, las capturas de pantalla y selectores por comando, la consola y la red que capturan ambos modos, el archivo contiene:

| En el archivo | Predeterminado | Desactivar |
|---|---|---|
| Viaje en el tiempo del DOM: el flujo de mutaciones que el reproductor reproduce paso a paso | activado | - |
| Tira de fotogramas densa: los fotogramas del screencast, incluidos en la traza en lugar de un `.webm` | activado | `DEVTOOLS_FILMSTRIP=0` |
| Árbol de A11y y superposición de elementos: leídos junto a cada acción, con dos idas y vueltas adicionales por comando | activado | `DEVTOOLS_A11Y=0` |

El modo de traza no codifica ningún `.webm`, así que no necesita `ffmpeg`: los fotogramas *son* la tira de fotogramas.

**La exportación se solicita cuando termina la ejecución, no cuando sale el proceso**: pytest la solicita en `sessionfinish` y el `disable()` de un script exporta antes de cerrar el transporte, de modo que CI obtiene el artefacto tanto si alguna vez intervino una ventana como si no.

### Cuántos archivos y cuáles conservar {#how-many-archives-and-which-ones-to-keep}

Dos opciones lo deciden, y ninguna tiene sentido fuera del modo de traza.

**Granularidad**: cuántos archivos escribe la ejecución:

| `--devtools-trace-granularity` | Resultado |
|---|---|
| `session` (predeterminado) | Un archivo para toda la ejecución. |
| `test` | Un archivo por prueba, cada uno con solo los comandos, la consola, la red, las mutaciones del DOM, los árboles de a11y y los fotogramas del screencast de esa prueba. |

Aquí no existe deliberadamente el valor `spec`. El spec de este adaptador *es* su archivo de prueba, así que un tercer nombre solo podría significar discretamente uno de los dos anteriores.

**Política**: cuáles de esos archivos se conservan:

| `--devtools-trace-policy` | Resultado |
|---|---|
| `on` (predeterminado) | Conserva todo. |
| `retain-on-failure` | Conserva solo lo que falló. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Se aceptan, pero hoy se comportan **exactamente igual que `retain-on-failure`**. |

Esos cuatro últimos aún no tienen en cuenta los reintentos, y vale la pena decirlo claramente en lugar de que lo descubras por un archivo que esperabas: nada de lo que este adaptador envía contiene un número de intento, así que una prueba reintentada sobrescribe su propio resultado anterior y la pregunta sobre reintentos ni siquiera puede plantearse. El backend registra esta degradación en lugar de fingir lo contrario. Elige uno solo si quieres `retain-on-failure` bajo un nombre que tendrá más sentido en el futuro.

Ambas se combinan:

| Granularidad | Política | Qué obtienes |
|---|---|---|
| `test` | `retain-on-failure` | Solo las pruebas que fallaron. |
| `session` | `retain-on-failure` | El archivo de toda la ejecución, si algo en ella falló. |
| cualquiera | `on` | Todo. |

Cada archivo conservado con granularidad `test` recibe el nombre de su prueba (`trace-<test>-<hash>.zip`, con el hash tomado del nodeid de la prueba para que dos casos parametrizados que comparten título no se sobrescriban entre sí). Una ejecución que no conserva nada no escribe nada en absoluto, y de eso se trata: los archivos que te quedan son los que merece la pena abrir, y una exportación rechazada es la política funcionando, no un fallo.

Establécelas para una ejecución:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

O déjalas fijadas en el proyecto, para que un colaborador que clone el proyecto capture de la misma forma sin que nadie se lo diga:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` en `pyproject.toml` admite las mismas claves, y `pytest -o devtools_trace_policy=on tests/` anula una de ellas para una sola ejecución sin editar el archivo. En el repositorio, en [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test), hay una versión completamente comentada, con todas las opciones y variables de entorno y la finalidad de cada una.

Un script simple pasa las mismas dos como argumentos con nombre:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Indicar cualquiera de ellas explícitamente selecciona el modo de traza.** La opción de CLI, la opción de ini y el argumento de `enable()` lo implican, ya que una política o una granularidad no tienen sentido en modo en vivo, y respetar una sin el modo descartaría silenciosamente lo que pediste. `DEVTOOLS_TRACE_POLICY` y `DEVTOOLS_TRACE_GRANULARITY` deliberadamente **no** lo hacen: una variable exportada es ambiental y puede haberse establecido para otro script en la misma shell, así que cambiar una ejecución en vivo a modo de traza por ese motivo te quitaría el panel que nadie pidió perder; combínalas con `DEVTOOLS_TRACE=1`. Una ejecución que termina ignorando una opción de traza exportada registra una advertencia, en lugar de dejar que notes la ausencia de un archivo que nunca apareció.

</TabItem>
</Tabs>

### Visualizar la traza

Abre cualquier `.zip` de traza en el reproductor oficial: la misma interfaz de DevTools en un modo **player** dedicado:

```bash
npx show-trace path/to/trace.zip      # en un proyecto que instala el adaptador
pnpm show-trace path/to/trace.zip     # desde el monorepo de devtools
```

El binario `show-trace` se incluye con `@wdio/selenium-devtools`, así que está disponible en cualquier proyecto que lo instale, sin dependencias adicionales. Un proyecto de Python no instala ningún adaptador de Node.js, pero el mismo reproductor se incluye con el backend que el adaptador ya descarga por ti: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Como el adaptador de Selenium captura el **flujo de mutaciones del DOM** de la página y una instantánea de elementos / accesibilidad por comando junto con cada captura de pantalla, una traza de Selenium aprovecha todas las funciones del reproductor: viaje en el tiempo del DOM, la pestaña A11y y la superposición para seleccionar localizadores, la pestaña Transcript con Copy-for-LLM, el anidamiento Feature → Scenario → Step de Cucumber y la línea de tiempo desplazable. Una traza de Python contiene el mismo flujo de mutaciones y la instantánea por acción (allí la lectura de elementos / a11y es solo del modo de traza, y está activada por defecto); el anidamiento de Gherkin es lo único que no tiene equivalente en pytest.

La traza utiliza un esquema NDJSON portátil, por lo que el mismo `.zip` (o directorio) también se abre en otros visores de trazas compatibles. Consulta la página **[Trace Player](/docs/devtools/trace-player)** para ver la guía completa.

## API pública

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // establece las opciones de ejecución (ver arriba)
DevTools.startTest(name, meta?)      // marca un límite de prueba con nombre (solo scripts simples de Node)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Con Mocha / Jest / Cucumber el plugin se engancha automáticamente al ciclo de vida del ejecutor, así que no necesitas `startTest` / `endTest` manualmente; llamarlos crearía filas duplicadas.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # conecta e instrumenta; idempotente
devtools.disable()                    # desmonta; es seguro llamarlo dos veces
devtools.wait_for_dashboard_close()   # bloquea hasta que se cierra la ventana
devtools.get_capturer()               # el SessionCapturer activo, o None
devtools.dashboard_url()              # la URL en la que se sirve el panel
```

`enable()` acepta un `host` y un `port` opcionales, además de argumentos con nombre:

```python
devtools.enable(trace=True)                            # escribe un trace.zip; no abre ninguna ventana
devtools.enable(trace=True, filmstrip=False)           # ... sin la tira de fotogramas densa
devtools.enable(trace=True, a11y=False)                # ... sin la lectura de elementos / a11y por acción
devtools.enable(trace_granularity='test')              # ... un archivo por prueba (implica trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... conserva solo lo que falló (implica trace=True)
```

`filmstrip` y `a11y` solo se aplican al modo de traza y cada uno está activado por defecto (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` establecen lo mismo desde el entorno). `trace` recurre a `DEVTOOLS_TRACE`. `trace_granularity` y `trace_policy` recurren a `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`, y pasar cualquiera de ellos activa el modo de traza por sí solo; consulta [Cuántos archivos y cuáles conservar](#how-many-archives-and-which-ones-to-keep). Un valor fuera del conjunto aceptado genera una advertencia y recurre al valor predeterminado, en lugar de descubrirse más tarde como un archivo ausente.

Con pytest, el plugin gestiona todo esto a partir de `--devtools` / `--devtools-trace` (o la opción de ini correspondiente, o `DEVTOOLS_ENABLE=1`), y los límites de las pruebas provienen de los propios hooks de pytest; no hay ningún equivalente de `startTest` / `endTest` que llamar.

</TabItem>
</Tabs>

## Ejemplos

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Los ejemplos funcionales se encuentran en el directorio `examples/` de nivel superior del repositorio. Compila el workspace una vez (`pnpm install && pnpm build`) y luego ejecútalos desde la raíz del repositorio. `pnpm demo:selenium` ejecuta el ejemplo predeterminado (Cucumber); las variantes por ejecutor son:

| Directorio | Ejecutor | Comando |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Los ejemplos de Python se encuentran en [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Instala el adaptador y compila el workspace una vez (`pnpm install && pnpm build`, para que exista el backend) y luego ejecútalos desde la raíz del repositorio:

| Ejemplo | Qué muestra | Comando |
|---|---|---|
| `web_form.py` | La configuración de tres líneas para un script simple | `pnpm demo:python` |
| `login.py` | Un script más largo: navegación, rellenado de formularios, aserciones | `pnpm demo:python:login` |
| `trace-py-test/` | pytest con una clase y una prueba a nivel de módulo, además de un `pytest.ini` que fija el modo de traza, la granularidad y la retención; cada opción incluye un comentario que explica lo que hace | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Funciones

El adaptador de Selenium ofrece la misma experiencia de interfaz de DevTools que WebdriverIO, en ambos lenguajes. Todas las funciones siguientes se capturan automáticamente sin configuración específica para cada una: basta con el `DevTools.configure({})` básico en Node.js o con `pytest --devtools` en Python. La consola y la red se transmiten mediante los manejadores BiDi de Selenium, con un colector inyectado como alternativa en Node.js. Los enlaces llevan a la referencia completa de cada función.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Vistas previas del navegador en vivo, capturas de pantalla por comando y reejecución de pruebas/suites con un clic
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Toma una instantánea de una prueba que falla, vuelve a ejecutarla y compara ambas ejecuciones lado a lado
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Detecta automáticamente Mocha, Jest, Cucumber o un script simple en Node.js; pytest o un script simple en Python
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Captura e inspecciona la salida de la consola del navegador
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Supervisa las llamadas a la API y la actividad de red
- **[Metadata](/docs/devtools/wdio/metadata)** - Capacidades de la sesión, entorno y tiempos por sesión de navegador
- **[TestLens](/docs/devtools/wdio/testlens)** - Salta desde cualquier comando a la línea de código fuente que lo desencadenó
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Grabación automática de vídeo de las sesiones del navegador
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Captura sin interfaz que produce un `trace.zip` portátil (sin ventana de interfaz), en ambos lenguajes, con división por prueba y retención en ambos (`traceGranularity` / `tracePolicy` en Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` en Python). El `screenshot` / `video` por prueba y el adjunto en línea de Allure siguen siendo exclusivos de Node.js; consulta [Modo de traza](#trace-mode)

En Node.js, el screencast es la única función con opciones propias (consulta [Opciones de configuración](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

En Python no necesita configuración: Chrome transmite fotogramas por CDP, los demás navegadores recurren a una captura de pantalla por comando y la codificación del `.webm` necesita `ffmpeg` en el `PATH`. En modo de traza, esos mismos fotogramas se convierten en la tira de fotogramas densa del archivo en lugar de un `.webm`, así que no se codifica nada y no se necesita `ffmpeg`.

## Cómo funciona

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

El plugin modifica los prototipos `Builder`, `WebDriver` y `WebElement` de `selenium-webdriver` en el momento de la importación:

- **`Builder.build()`** - tras la construcción, el driver se registra en el capturador de sesión y el backend de DevTools se inicia en un proceso hijo independiente.
- **Cada método público de `WebDriver` / `WebElement`** - se envuelve con captura de comandos (argumentos + resultado + captura de pantalla + origen de la llamada).
- **`WebDriver.quit()`** - un hook de limpieza esperado vacía la codificación del screencast, el búfer del WebSocket y los metadatos finales antes de que se ejecute el quit original.

Cuando BiDi está disponible (Chrome ≥114), los registros de consola, las excepciones de JavaScript y los eventos de red se transmiten directamente mediante los manejadores BiDi de Selenium. De lo contrario, el plugin recurre a un script colector inyectado en el navegador.

El mismo colector inyectado también registra el **flujo de mutaciones del DOM** de la página y una instantánea de elementos / accesibilidad por comando, de modo que una traza contiene lo suficiente para reconstruir el DOM en vivo en cada paso (mapeo por navegación); esto es lo que hace posible el viaje en el tiempo del DOM y la pestaña A11y del reproductor, en lugar de una reproducción basada solo en capturas de pantalla.

</TabItem>
<TabItem value="python" label="Python">

No hay prototipos que modificar, así que el adaptador de Python envuelve un único método:

- **`WebDriver.execute()`** - el único punto de paso por el que fluyen todos los comandos. Los métodos de los elementos también delegan en él (`self._parent.execute`), de modo que `click`, `send_keys` y `text` se capturan con el mismo envoltorio sin tocar las clases de elementos.
- **Configuración de la sesión** - en el primer comando real se registra el driver, se envían los metadatos y se preparan BiDi, el colector y el screencast.
- **`quit()`** - se intercepta antes de que se desmonte la sesión, de modo que el screencast se codifica y los últimos fotogramas se vacían mientras el driver todavía existe.

La consola, las excepciones de JavaScript y la red se transmiten a través de la capa BiDi de selenium (4.44+), que el adaptador habilita por ti inyectando la capacidad `webSocketUrl` en la solicitud `newSession`.

El **flujo de mutaciones del DOM** proviene del mismo colector del lado del navegador que en Node.js, registrado al inicio del documento mediante BiDi para que la página se instrumente antes de que se ejecute cualquiera de sus propios scripts. En Chrome, el navegador envía el screencast por un websocket CDP propio, separado del canal de comandos de la sesión, lo que hace que un flujo real de fotogramas sea seguro cuando una sesión de Selenium no es thread-safe.

</TabItem>
</Tabs>

## Limitaciones

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Limitación | Detalle |
|-----------|--------|
| Reejecución de pasos individuales en Cucumber | El filtro `--name` de Cucumber se dirige a escenarios, no a pasos individuales de Gherkin. La reejecución por paso del panel está desactivada con Cucumber. |
| Advertencia sobre el modo headless | `headless: true` inyecta `--headless=old`; `--headless=new` produce fotogramas CDP completamente negros en el screencast. |
| Viewport inicial | El iframe de instantáneas del panel recurre a 1280×800 hasta que se completa la primera navegación y el colector del lado del navegador informa del viewport real. |

</TabItem>
<TabItem value="python" label="Python">

| Limitación | Detalle |
|-----------|--------|
| Sin captura de pantalla, vídeo ni adjunto de Allure por prueba | Se admiten **archivos de traza** por prueba (`--devtools-trace-granularity test`), pero las opciones `screenshot` y `video` por prueba del adaptador de Node.js y su adjunto en línea de `allure-js-commons` no tienen equivalente en Python: los archivos son los artefactos. |
| La retención basada en reintentos se degrada | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` y `retain-on-failure-and-retries` se aceptan, pero se comportan exactamente igual que `retain-on-failure`: nada de lo que se envía contiene un número de intento, así que una prueba reintentada sobrescribe su propio resultado anterior. El backend registra esta degradación. |
| Node es necesario en todos los modos | El backend es una aplicación de Node —sirve el colector de la página, transporta el flujo de eventos y construye el archivo de traza—, así que Node.js 22.19 o posterior debe estar presente incluso en modo de traza, en el que no se abre ninguna ventana. El adaptador lo encuentra o lo inicia por ti. |
| Las opciones del navegador son cosa tuya | No hay una opción `headless`; configura Chrome mediante el propio objeto `Options` de selenium como lo harías normalmente. |
| El vídeo en modo en vivo necesita ffmpeg | Sin `ffmpeg` en el `PATH`, la codificación del `.webm` se omite con una advertencia en lugar de un error. El modo de traza no codifica ninguno —sus fotogramas van a la tira de fotogramas—, así que nunca necesita ffmpeg. |

</TabItem>
</Tabs>