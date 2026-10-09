---
id: session-commands
title: Comandos de wdio session
description: Todas las acciones y flags de wdio session, desde open hasta doctor y skill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

Todas las acciones de `wdio session`. Los flags globales se aplican a todas ellas. `npx wdio session <action> --help` imprime el mismo texto. El resto de la sección [WebdriverIO Session](/docs/session) trata los [targets](/docs/session/targets), los [snapshots](/docs/session/snapshots), [`exec`](/docs/session/exec), la [exportación](/docs/session/export) y la [depuración](/docs/session/debug).

```sh
npx wdio session <action> [arguments] [flags]
```

## Flags globales

| Flag | Descripción |
| --- | --- |
| `-s, --session` | Nombre de la sesión (env WDIO_SESSION, por defecto "default") |
| `--json` | Imprime un objeto JSON (env WDIO_SESSION_JSON=1) |
| `--timeout` | Tiempo de espera de la petición en ms (limitado a 60000 excepto para wait) |
| `-q, --quiet` | No imprime nada si tiene éxito, salvo los datos solicitados |
| `--color` | Usa --no-color para desactivar los colores |

Códigos de salida: 0 éxito, 1 la acción o tu código falló, 2 error de uso, 3 falta una dependencia o credenciales, 4 no hay ninguna sesión con ese nombre.

## `open`

Inicia una sesión: browser, android, ios, macos, windows, electron, tauri, dioxus o un archivo de configuración de wdio.

Inicia un daemon en segundo plano que mantiene viva la sesión hasta `close`, o hasta que haya estado inactiva durante --idle-timeout (por defecto 30m). Los navegadores se ejecutan en modo headless a menos que pases --headed. Imprime el nombre de la sesión, el target, el directorio de artefactos donde se guardan los snapshots, las capturas de pantalla y las exportaciones y, para un navegador abierto en una URL, el snapshot interactivo de esa página.

Una sesión por nombre. Abrir un nombre que ya está en ejecución falla; úsala, ciérrala o pasa --replace. Pasa `-s <name>` solo cuando necesites dos sesiones a la vez.

```sh
npx wdio session open <target> [url]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | no | URL a abrir (navegadores), ruta de la app (apps de escritorio) o capability (config) |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--replace` | Cierra primero una sesión en ejecución con el mismo nombre |
| `--launch-timeout <n>` | Milisegundos a esperar a que la sesión esté lista |
| `--idle-timeout <value>` | Se apaga tras este tiempo sin peticiones (p. ej. 30m, 0 lo desactiva) |
| `--capabilities <value>` | Capabilities adicionales como JSON o la ruta a un archivo JSON |
| `--hostname <value>` | Host remoto de WebDriver |
| `--port <n>` | Puerto remoto de WebDriver |
| `--path <value>` | Ruta remota de WebDriver |
| `--protocol <value>` | Protocolo remoto de WebDriver |
| `--log-level <value>` | Nivel de log de WebdriverIO escrito en daemon.log |
| `--bidi` | Solicita WebDriver BiDi (usa --no-bidi para desactivarlo) |
| `--headed` | Muestra la ventana del navegador |
| `--headless` | Se ejecuta sin ventana (por defecto para navegadores; anula --headed) |
| `--snapshot` | Imprime el snapshot interactivo de la página abierta (usa --no-snapshot para omitirlo) |
| `--viewport <value>` | Viewport inicial, p. ej. 1280x720 |
| `--browser-version <value>` | Versión del navegador |
| `--binary <value>` | Binario del navegador |
| `--arg <value>` | Argumento adicional del navegador. Un valor que empieza por `-` necesita `=`, p. ej. `--arg=--disable-gpu` (repetible) |
| `--profile <value>` | Directorio de perfil persistente |
| `--attach <value>` | Se conecta a un Chrome/Edge en ejecución (puerto de depuración o URL) |
| `--app <value>` | Archivo de la app o URL de la app en la nube |
| `--package <value>` | Paquete de la app Android |
| `--activity <value>` | Activity de la app Android |
| `--bundle-id <value>` | Bundle id de iOS/macOS |
| `--browser <value>` | Navegador web móvil (chrome, safari) |
| `--device <value>` | Nombre del dispositivo |
| `--platform-version <value>` | Versión de la plataforma |
| `--udid <value>` | UDID del dispositivo |
| `--reset` | Usa --no-reset para mantener el estado de la app (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | Orientación inicial |
| `--appium-url <value>` | Usa un servidor Appium en ejecución |
| `--app-arg <value>` | Argumento pasado a una app de escritorio. Un valor que empieza por `-` necesita `=`, p. ej. `--app-arg=--no-sandbox` (repetible) |
| `--chromedriver <value>` | Electron: binario de Chromedriver |
| `--electron-version <value>` | Electron: anula la detección de versión |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | Proveedor en la nube |
| `--os <value>` | Nube: SO de escritorio |
| `--os-version <value>` | Nube: versión del SO de escritorio |
| `--region <value>` | Nube: región de Sauce Labs |
| `--tunnel <value>` | Nube: inicia el túnel del proveedor (o "external") |
| `--tunnel-name <value>` | Nube: identificador del túnel |
| `--project <value>` | Nube: etiqueta del proyecto |
| `--build <value>` | Nube: etiqueta del build |
| `--name <value>` | Nube: etiqueta del nombre de la sesión |

**Ejemplos**

```sh
# Abrir Chrome headless en una app local
npx wdio session open chrome http://localhost:3000

# Abrir Firefox con una ventana visible
npx wdio session open firefox http://localhost:3000 --headed

# Abrir una app Android a través de Appium
npx wdio session open android --app ./app.apk

# Abrir una app iOS instalada
npx wdio session open ios --bundle-id com.example.shop

# Abrir una app Electron
npx wdio session open electron ./main.js

# Abrir la primera capability de una configuración
npx wdio session open ./wdio.conf.ts 0

# Abrir Chrome en un grid en la nube
npx wdio session open chrome https://example.com --provider browserstack
```

Ver también: [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor).

## `close`

Finaliza la sesión y detiene su daemon.

En una sesión abierta por `wdio run --debug=agent`, esto hace fallar el test pausado; usa `resume` para dejar que continúe.

```sh
npx wdio session close
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--all` | Cierra todas las sesiones |
| `--clean` | Elimina también el directorio de artefactos |

**Ejemplos**

```sh
# Cerrar la sesión por defecto
npx wdio session close

# Cerrar todas las sesiones y eliminar sus artefactos
npx wdio session close --all --clean
```

Ver también: [`open`](#open), [`list`](#list).

## `list`

Lista las sesiones en ejecución.

Imprime una línea por sesión: nombre, target, URL y antigüedad. Elimina el estado que dejaron las sesiones que murieron.

```sh
npx wdio session list
```

**Ejemplos**

```sh
# Mostrar todas las sesiones en ejecución
npx wdio session list
```

Ver también: [`info`](#info), [`status`](#status).

## `info`

Muestra los detalles de la sesión.

Imprime el target, el navegador y su versión, el soporte de BiDi, el directorio de artefactos y la URL actual, el título, el tamaño de la ventana y el frame (web) o el contexto y la activity (móvil).

```sh
npx wdio session info
```

**Ejemplos**

```sh
# Mostrar dónde está la sesión y qué ejecuta
npx wdio session info
```

Ver también: [`list`](#list), [`get`](#get).

## `restart`

Cierra y vuelve a abrir con el mismo target y los mismos flags.

Mantiene el historial grabado, de modo que `export` sigue cubriendo los pasos de antes del reinicio.

```sh
npx wdio session restart
```

**Ejemplos**

```sh
# Empezar de nuevo con un navegador nuevo
npx wdio session restart
```

Ver también: [`open`](#open), [`close`](#close).

## `status`

Sale con 0 si la sesión está en ejecución, con 4 si no.

```sh
npx wdio session status
```

**Ejemplos**

```sh
# Abrir una sesión solo cuando no haya ninguna en ejecución
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

Ver también: [`list`](#list), [`open`](#open).

## `exec`

Ejecuta código de WebdriverIO desde stdin, -e o un archivo.

Se ejecuta como una función async con `browser`, `$`, `$$`, `expect` y `ref('e3')` en el ámbito. Las variables de nivel superior persisten entre llamadas. `wdio session` sin una acción ejecuta `exec` cuando se le pasa código por stdin.

Usa siempre `await` con los comandos. `$` devuelve exactamente un elemento y lanza StrictSelectorError cuando coincide más de uno. Prefiere una única acción (click, fill, …) cuando basta con una; usa `exec` para bucles, condiciones y aserciones.

```sh
npx wdio session exec [file]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `file` | no | Archivo de script (.js, .ts, .mjs) |

**Flags**

| Flag | Descripción |
| --- | --- |
| `-e, --eval <value>` | Código a ejecutar |
| `--history` | Graba el código en el historial (usa --no-history para omitirlo) |

**Ejemplos**

```sh
# Ejecutar una sola línea
npx wdio session exec -e "await browser.getTitle()"

# Hacer una aserción sobre la página (las comillas simples evitan que el shell interprete $)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# Pasar varios pasos por stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# Ejecutar un archivo de script
npx wdio session exec ./scripts/login.ts
```

Ver también: [`helpers`](#helpers), [`history`](#history), [`export`](#export).

## `helpers`

Lista los helpers del proyecto en .wdio/helpers.

Cada archivo en .wdio/helpers exporta por defecto una función que recibe el browser y registra comandos personalizados con addCommand. Los helpers se cargan cuando se abre la sesión y se convierten en comandos personalizados en el test exportado.

```sh
npx wdio session helpers
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--reload` | Vuelve a importar los helpers |

**Ejemplos**

```sh
# Listar los helpers y los comandos que añaden
npx wdio session helpers

# Cargar los cambios hechos en un helper
npx wdio session helpers --reload
```

Ver también: [`exec`](#exec), [`export`](#export).

## `snapshot`

Snapshot de accesibilidad con refs. Se aplica a web, móvil nativo, escritorio nativo.

Imprime el árbol de accesibilidad, un nodo por línea, p. ej. `button "Add to cart" [ref=e3]`. Pasa una ref a click, fill, get y las demás acciones. Las refs siguen siendo válidas mientras exista el elemento; una acción sobre un elemento eliminado falla con REF_STALE.

Cada snapshot se escribe en el directorio de artefactos. La salida más larga que --max-chars se imprime por partes: la primera parte y luego `--offset <line>` para la siguiente. `find` busca en todo el contenido.

El formato del texto y la estructura de --json son experimentales y pueden cambiar en una versión menor. La sintaxis de las refs y las acciones que reciben una ref se mantienen estables.

```sh
npx wdio session snapshot
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--depth <n>` | Profundidad máxima |
| `--scope <value>` | Solo hace el snapshot por debajo de esta ref o selector |
| `-i, --interactive` | Solo elementos interactivos |
| `--all` | Incluye los elementos ocultos |
| `--boxes` | Añade los bounding boxes |
| `--viewport` | Solo lo que está en el viewport (web: no actualiza la línea base del diff) |
| `--selectors` | Termina cada línea con ref con su mejor selector |
| `--compact` | Descarta los nodos sin nombre que no tienen contenido |
| `-u, --urls` | Incluye los href de los enlaces |
| `--file-only` | Solo escribe el archivo |
| `--max-chars <n>` | Imprime hasta este número de caracteres cada vez (por defecto 8000) |
| `--offset <n>` | Imprime a partir de esta línea, para la siguiente parte de un snapshot largo |

**Ejemplos**

```sh
# Solo elementos interactivos, el primer vistazo habitual
npx wdio session snapshot -i

# Página completa con los destinos de los enlaces
npx wdio session snapshot --compact --urls

# Solo una parte de la página
npx wdio session snapshot --scope "#checkout" --depth 4

# Lo que hay ahora en pantalla
npx wdio session snapshot --viewport -i

# Cada ref con un selector para usar en un test
npx wdio session snapshot --selectors -i

# Actuar y volver a mirar
npx wdio session click e3 && npx wdio session snapshot -i
```

Ver también: [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot).

## `read`

Lee el texto de la página como Markdown. Se aplica a web.

Encabezados, párrafos, elementos de lista, filas de tabla y enlaces con su URL, del contenido principal cuando la página lo marca (main, article), o de toda la página en caso contrario; se omiten la navegación, los pies de página y el texto oculto. Se corta en --max-chars (por defecto 6000); el corte indica qué --offset lee la siguiente parte. Con --scope, la sección se desplaza hasta quedar visible. Úsalo para responder "qué dice la página"; usa snapshot o find para obtener refs sobre las que actuar.

```sh
npx wdio session read
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--scope <value>` | Solo lee por debajo de esta ref o selector |
| `--max-chars <n>` | Imprime hasta este número de caracteres (por defecto 6000) |
| `--offset <n>` | Empieza en este carácter del texto, para la siguiente parte de una página larga |

**Ejemplos**

```sh
# Leer el contenido principal
npx wdio session read

# Leer una sección
npx wdio session read --scope e12
```

Ver también: [`find`](#find), [`snapshot`](#snapshot), [`get`](#get).

## `find`

Busca texto en un snapshot nuevo. Se aplica a web, móvil nativo, escritorio nativo.

Toma un nuevo snapshot e imprime cada coincidencia con el nodo que la rodea (p. ej. el elemento de lista completo, de modo que se incluye un valor junto a la coincidencia), con números de línea y refs, y desplaza la primera coincidencia hasta que sea visible. La búsqueda ignora mayúsculas y minúsculas, luego los espacios ("SO2" encuentra "SO 2"), y luego busca todas las palabras y palabras similares. El texto que solo está en partes ocultas de la página (menús cerrados, pestañas, "Mostrar más") se indica como tal. Es más barato que leer un snapshot completo de una página grande. -A/-B/-C imprimen en su lugar contexto de líneas simple, como grep.

```sh
npx wdio session find <text>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `text` | sí | Texto a buscar |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--regex` | Trata el texto como una expresión regular |
| `--scope <value>` | Solo busca por debajo de esta ref o selector |
| `-C, --context <n>` | Líneas de contexto antes y después en lugar del nodo que la rodea |
| `-A, --after-context <n>` | Líneas de contexto después de cada coincidencia |
| `-B, --before-context <n>` | Líneas de contexto antes de cada coincidencia |
| `--offset <n>` | Omite este número de coincidencias, para ver las siguientes cuando la salida se corta |

**Ejemplos**

```sh
# Encontrar la ref de un botón
npx wdio session find "Add to cart"

# Listar todos los enlaces
npx wdio session find "^\s*link" --regex --context 0
```

Ver también: [`snapshot`](#snapshot), [`wait`](#wait).

## `diff`

Compara un snapshot nuevo con el anterior. Se aplica a web, móvil nativo, escritorio nativo.

Imprime un diff unificado de lo que ha cambiado desde el último snapshot, o "No changes". La primera llamada guarda una línea base. Úsalo después de una acción para ver qué hizo la acción sin volver a leer toda la página. En la web, la línea base es el último snapshot tomado sin `--viewport`.

```sh
npx wdio session diff
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--baseline <value>` | Archivo de snapshot con el que comparar |
| `--scope <value>` | Solo hace el snapshot dentro de esta ref o selector, como `snapshot --scope` |
| `--interactive` | Solo elementos interactivos, como `snapshot -i` |

**Ejemplos**

```sh
# Ver qué cambió un clic
npx wdio session click e7 && npx wdio session diff

# Comparar con un snapshot guardado
npx wdio session diff --baseline before.yml
```

Ver también: [`snapshot`](#snapshot), [`find`](#find).

## `screenshot`

Guarda un PNG del viewport, de un elemento o de la página completa. Se aplica a web, móvil nativo, escritorio nativo.

Imprime la ruta del archivo y el tamaño de la imagen. Haz una captura de pantalla cuando la pregunta sea sobre el diseño o el aspecto; lee el texto y el estado con `snapshot` y `get`.

```sh
npx wdio session screenshot [target]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | no | Ref o selector del elemento a capturar |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--full` | Página completa (web) |
| `--path <value>` | Archivo de salida |

**Ejemplos**

```sh
# Capturar el viewport
npx wdio session screenshot

# Capturar un elemento
npx wdio session screenshot e5 --path card.png

# Capturar la página completa
npx wdio session screenshot --full
```

Ver también: [`visual`](#visual), [`pdf`](#pdf), [`snapshot`](#snapshot).

## `pdf`

Guarda la página actual como PDF. Se aplica a web.

Llama a `browser.savePDF`. Una sesión BiDi imprime con `browsingContext.print`, en modo headed o headless, en Chrome, Edge y Firefox. Una sesión Classic usa `printPage`, que las versiones antiguas de Chrome solo admiten en modo headless.

```sh
npx wdio session pdf [file]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `file` | no | Archivo de salida (debe terminar en .pdf) |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--path <value>` | Archivo de salida (debe terminar en .pdf) |

**Ejemplos**

```sh
# Escribir report.pdf en el directorio actual
npx wdio session pdf report.pdf
```

Ver también: [`screenshot`](#screenshot).

## `source`

Guarda el HTML de la página o el XML de la app. Se aplica a web, móvil nativo, escritorio nativo.

Escribe el archivo e imprime su ruta y tamaño. Úsalo cuando un snapshot oculte lo que necesitas, como los atributos para un selector.

```sh
npx wdio session source
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--path <value>` | Archivo de salida |

**Ejemplos**

```sh
# Guardar el HTML en el directorio actual
npx wdio session source --path page.html
```

Ver también: [`snapshot`](#snapshot), [`get`](#get).

## `get`

Lee el texto, el html, el valor, un atributo, el título, la URL, un recuento o un box. Se aplica a web.

Imprime el valor y luego el código de WebdriverIO que ejecutó (`→ …`). Pasa -q para imprimir solo el valor, p. ej. para capturarlo en una variable del shell. Lee un valor antes de escribir una aserción para él.

```sh
npx wdio session get <sub> [target] [name]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | no | Ref o selector (no se usa para title y url) |
| `name` | no | Nombre del atributo (solo attr) |

**Ejemplos**

```sh
# Texto de una ref
npx wdio session get text e1

# URL actual
npx wdio session get url

# Solo el valor, para una variable del shell
url=$(npx wdio session get url -q)

# href de un enlace
npx wdio session get attr e3 href

# Cuántos elementos coinciden
npx wdio session get count "aria/Remove"
```

Ver también: [`is`](#is), [`wait`](#wait), [`exec`](#exec).

## `is`

Comprueba si un elemento es visible, está habilitado o marcado. Se aplica a web.

Imprime true o false y luego el código de WebdriverIO que ejecutó; pasa -q para imprimir solo el valor. El código de salida es 0 en ambos casos.

```sh
npx wdio session is <sub> <target>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | visible \| enabled \| checked |
| `target` | sí | Ref o selector |

**Ejemplos**

```sh
# Imprimir true o false
npx wdio session is visible e1

# Comprobar un botón por su etiqueta
npx wdio session is enabled "aria/Place order"
```

Ver también: [`get`](#get), [`wait`](#wait).

## `logs`

Imprime los logs de consola, errores de página, red y dispositivo desde la última llamada. Se aplica a web, móvil nativo.

Cada llamada avanza un cursor de lectura, de modo que la siguiente llamada solo muestra las entradas nuevas. Ejecútalo después de una acción para ver los errores que causó esa acción.

```sh
npx wdio session logs
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--errors` | Solo errores |
| `--network` | Solo entradas de red |
| `--since <value>` | Solo entradas más recientes que esta duración (p. ej. 30s) |
| `--peek` | No avanza el cursor de lectura |
| `--source <browser\|driver\|logcat\|syslog\|main>` | Origen de los logs |

**Ejemplos**

```sh
# Errores causados por un clic
npx wdio session click e4 && npx wdio session logs --errors

# Entradas recientes, conservándolas para la siguiente llamada
npx wdio session logs --since 30s --peek
```

Ver también: [`requests`](#requests).

## `navigate`

Abre una URL. Se aplica a web.

Acepta `example.com`, URLs completas y rutas relativas a baseUrl. Sale primero de cualquier frame. Imprime la nueva URL y el título.

```sh
npx wdio session navigate <url>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `url` | sí | URL (las URLs relativas usan baseUrl) |

**Ejemplos**

```sh
# Ir a una página y mirarla
npx wdio session navigate /cart && npx wdio session snapshot -i

# Abrir otro sitio
npx wdio session navigate example.com
```

Ver también: [`back`](#back), [`reload`](#reload), [`wait`](#wait).

## `back`

Vuelve atrás. Se aplica a web.

```sh
npx wdio session back
```

**Ejemplos**

```sh
# Volver una página atrás
npx wdio session back
```

Ver también: [`forward`](#forward), [`navigate`](#navigate).

## `forward`

Avanza. Se aplica a web.

```sh
npx wdio session forward
```

**Ejemplos**

```sh
# Avanzar una página
npx wdio session forward
```

Ver también: [`back`](#back), [`navigate`](#navigate).

## `reload`

Recarga la página. Se aplica a web.

```sh
npx wdio session reload
```

**Ejemplos**

```sh
# Recargar y esperar hasta que la red esté inactiva
npx wdio session reload && npx wdio session wait --load networkidle
```

Ver también: [`navigate`](#navigate), [`wait`](#wait).

## `wait`

Espera a un elemento, un texto, una URL, un estado de carga, una condición o unos milisegundos. Se aplica a web.

Pasa exactamente uno de: una ref o selector, --text, --url, --load, --fn o milisegundos. Falla con el código de salida 1 tras --limit.

Prefiere una condición a una pausa, tanto aquí como en lugar de `sleep` en una cadena de comandos. Se rechaza una pausa de más de 30 segundos.

```sh
npx wdio session wait [target]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | no | Ref, selector o milisegundos |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--text <value>` | Espera hasta que la página contenga este texto |
| `--url <value>` | Espera hasta que la URL coincida (subcadena, o globs * y **) |
| `--load <value>` | domcontentloaded, load o networkidle |
| `--fn <value>` | Espera hasta que esta expresión de JavaScript sea verdadera |
| `--state <value>` | Con un target: visible (por defecto), hidden, enabled o disabled |
| `--limit <n>` | Milisegundos a esperar (por defecto 10000) |

**Ejemplos**

```sh
# Esperar hasta que una ref sea visible
npx wdio session wait e1

# Esperar hasta que desaparezca un spinner
npx wdio session wait "aria/Loading" --state hidden

# Actuar, esperar el resultado, volver a mirar
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# Esperar a una URL
npx wdio session wait --url "**/dashboard"

# Esperar hasta que no haya ninguna petición en curso
npx wdio session wait --load networkidle

# Pausar 500ms
npx wdio session wait 500
```

Ver también: [`find`](#find), [`is`](#is), [`get`](#get).

## `click`

Hace clic en un elemento. Se aplica a web, móvil nativo, escritorio nativo.

Imprime en qué se hizo clic y, cuando el clic provocó una navegación, la nueva URL. Toma un nuevo snapshot antes de usar refs en la página siguiente. Un elemento oculto o cubierto falla inmediatamente indicando qué hay en medio. `x,y` hace clic en un punto del viewport (píxeles desde la esquina superior izquierda, como en una captura de pantalla) para lo que no tiene ref, como un canvas o un mapa.

```sh
npx wdio session click <target>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12), selector de WebdriverIO o coordenadas x,y del viewport |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--double` | Doble clic |
| `--right` | Clic derecho |
| `--new-tab` | Abre el enlace en una nueva pestaña y cambia a ella |

**Ejemplos**

```sh
# Hacer clic en una ref del último snapshot
npx wdio session click e3

# Hacer clic por nombre accesible
npx wdio session click "aria/Add to cart"

# Hacer clic, esperar, volver a mirar
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# Abrir un enlace en una nueva pestaña
npx wdio session click e8 --new-tab

# Hacer clic en un punto del viewport, p. ej. en un mapa
npx wdio session click 320,480
```

Ver también: [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot).

## `tap`

Toca un elemento (móvil). Se aplica a móvil nativo.

```sh
npx wdio session tap <target>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12) o selector de WebdriverIO |

**Ejemplos**

```sh
# Tocar una ref del último snapshot
npx wdio session tap e2
```

Ver también: [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe).

## `fill`

Reemplaza el valor de un input. Se aplica a web, móvil nativo, escritorio nativo.

Primero vacía el campo. Para escribir en el elemento que tenga el foco, usa `type`; para enviar teclas como Enter, usa `press`.

```sh
npx wdio session fill <target> <text..>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12) o selector de WebdriverIO |
| `text` | sí | Texto (las palabras después del target se unen con espacios) |

**Ejemplos**

```sh
# Rellenar un campo
npx wdio session fill e2 ada@example.com

# Rellenar un formulario y enviarlo
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

Ver también: [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check).

## `type`

Escribe en un elemento o en el elemento con el foco. Se aplica a web, móvil nativo, escritorio nativo.

Envía el texto como pulsaciones de teclas sin vaciar nada: `type e2 Ada` escribe en e2, `type Ada` en el elemento que tenga el foco. Para reemplazar un valor, usa `fill`.

```sh
npx wdio session type <text..>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `text` | sí | Texto (las palabras se unen con espacios). Empieza con una ref, p. ej. `type e2 Ada`, para escribir en ese elemento en lugar del que tiene el foco |

**Ejemplos**

```sh
# Escribir en un campo
npx wdio session type e5 hello

# Escribir en el elemento que tenga el foco
npx wdio session focus e5 && npx wdio session type "hello"
```

Ver también: [`fill`](#fill), [`press`](#press), [`focus`](#focus).

## `press`

Pulsa teclas, p. ej. Enter, Control+a. Se aplica a web, escritorio nativo.

Combina teclas con +. Los nombres no distinguen mayúsculas y minúsculas; se aceptan ctrl, cmd, esc, up, down, left y right como formas abreviadas.

```sh
npx wdio session press <keys>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `keys` | sí | Combinación de teclas |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--times <n>` | Pulsa este número de veces (hasta 100), p. ej. para mover un slider |

**Ejemplos**

```sh
# Enviar un formulario
npx wdio session press Enter

# Mover cinco pasos un slider con el foco
npx wdio session press ArrowRight --times 5

# Seleccionar todo
npx wdio session press Control+a

# Mover el foco hacia atrás
npx wdio session press Shift+Tab
```

Ver también: [`type`](#type), [`fill`](#fill).

## `select`

Selecciona una opción de un `<select>`. Se aplica a web.

```sh
npx wdio session select <target> <value>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12) o selector de WebdriverIO |
| `value` | sí | Texto, valor o índice de la opción |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--by <text\|value\|index>` | Cómo identificar la opción (por defecto text) |

**Ejemplos**

```sh
# Seleccionar por texto visible
npx wdio session select e6 Germany

# Seleccionar por valor
npx wdio session select e6 de --by value
```

Ver también: [`fill`](#fill), [`check`](#check).

## `upload`

Establece un input de archivo. Se aplica a web.

La ruta es relativa a tu directorio de trabajo. Apunta al propio `<input type="file">`, no al botón que abre el selector.

```sh
npx wdio session upload <target> <file>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12) o selector de WebdriverIO |
| `file` | sí | Archivo a subir |

**Ejemplos**

```sh
# Adjuntar un archivo
npx wdio session upload e9 ./fixtures/avatar.png
```

Ver también: [`fill`](#fill).

## `hover`

Mueve el puntero sobre un elemento. Se aplica a web, escritorio nativo.

```sh
npx wdio session hover <target>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12) o selector de WebdriverIO |

**Ejemplos**

```sh
# Abrir un menú hover y mirarlo
npx wdio session hover e4 && npx wdio session snapshot -i
```

Ver también: [`click`](#click).

## `focus`

Pone el foco en un elemento. Se aplica a web.

```sh
npx wdio session focus <target>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12) o selector de WebdriverIO |

**Ejemplos**

```sh
# Poner el foco en un campo antes de `type`
npx wdio session focus e5
```

Ver también: [`type`](#type), [`press`](#press).

## `check`

Marca un checkbox o un radio. Se aplica a web.

No hace nada si ya está marcado, y falla si no acaba marcado.

```sh
npx wdio session check <target>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12) o selector de WebdriverIO |

**Ejemplos**

```sh
# Aceptar los términos
npx wdio session check e7
```

Ver también: [`uncheck`](#uncheck), [`is`](#is).

## `uncheck`

Desmarca un checkbox. Se aplica a web.

No hace nada si ya está desmarcado. Un botón de radio seleccionado no se puede desmarcar.

```sh
npx wdio session uncheck <target>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12) o selector de WebdriverIO |

**Ejemplos**

```sh
# Darse de baja de la newsletter
npx wdio session uncheck e7
```

Ver también: [`check`](#check), [`is`](#is).

## `drag`

Arrastra un elemento sobre otro. Se aplica a web, móvil nativo, escritorio nativo.

```sh
npx wdio session drag <from> <to>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `from` | sí | Ref o selector a arrastrar |
| `to` | sí | Ref o selector sobre el que soltar |

**Ejemplos**

```sh
# Mover una tarjeta a otra columna
npx wdio session drag e3 e9
```

Ver también: [`scroll`](#scroll).

## `scroll`

Desplaza un elemento hasta que sea visible o desplaza la página. Se aplica a web.

Sin un target, desplaza 600px hacia abajo. El contenido con carga diferida aparece en el siguiente snapshot.

```sh
npx wdio session scroll [target]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | no | Ref, selector, up, down, top o bottom |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--px <n>` | Píxeles para up/down (por defecto 600) |

**Ejemplos**

```sh
# Hacer visible un elemento
npx wdio session scroll e40

# Cargar más resultados y mirarlos
npx wdio session scroll bottom && npx wdio session snapshot -i

# Desplazar dos pantallas
npx wdio session scroll down --px 1200
```

Ver también: [`swipe`](#swipe), [`snapshot`](#snapshot).

## `swipe`

Desliza la pantalla (móvil). Se aplica a móvil nativo.

```sh
npx wdio session swipe <direction>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `direction` | sí | up \| down \| left \| right |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--percent <n>` | Longitud del deslizamiento 0..1 |

**Ejemplos**

```sh
# Desplazar una lista y mirarla
npx wdio session swipe up && npx wdio session snapshot
```

Ver también: [`scroll`](#scroll), [`tap`](#tap).

## `long-press`

Mantiene pulsado un elemento (móvil). Se aplica a móvil nativo.

```sh
npx wdio session long-press <target>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref (e12) o selector de WebdriverIO |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--duration <n>` | Milisegundos |

**Ejemplos**

```sh
# Abrir un menú contextual
npx wdio session long-press e4 --duration 1500
```

Ver también: [`tap`](#tap).

## `tabs`

Lista, abre, cambia o cierra pestañas. Se aplica a web.

Sin un subcomando, lista las pestañas con su índice; la actual aparece marcada. `new` abre una pestaña y cambia a ella. `switch` y `close` reciben un índice o un handle.

```sh
npx wdio session tabs [sub] [arg]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | no | switch \| new \| close |
| `arg` | no | Índice, handle o URL |

**Ejemplos**

```sh
# Listar pestañas
npx wdio session tabs

# Abrir una pestaña
npx wdio session tabs new http://localhost:3000/help

# Volver a la primera pestaña
npx wdio session tabs switch 0

# Cerrar la segunda pestaña
npx wdio session tabs close 1
```

Ver también: [`windows`](#windows), [`frame`](#frame).

## `windows`

Lista o cambia de ventana. Se aplica a web, escritorio nativo.

```sh
npx wdio session windows [sub] [arg]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | no | switch |
| `arg` | no | Índice o handle |

**Ejemplos**

```sh
# Listar ventanas
npx wdio session windows

# Cambiar a la segunda ventana
npx wdio session windows switch 1
```

Ver también: [`tabs`](#tabs).

## `frame`

Entra en un iframe, o cambia al padre o al nivel superior. Se aplica a web.

El snapshot de la página ya muestra el contenido de sus iframes, con refs que las acciones usan directamente, así que `frame` solo es necesario para trabajar dentro de un frame durante un tiempo o para ver un frame que el snapshot recortó. Los snapshots y las acciones se aplican al frame actual hasta que vuelvas a cambiar. `navigate` vuelve al documento de nivel superior.

```sh
npx wdio session frame <target>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | sí | Ref, selector, parent o top |

**Ejemplos**

```sh
# Entrar en un iframe y mirar dentro
npx wdio session frame e12 && npx wdio session snapshot -i

# Volver a la página
npx wdio session frame top
```

Ver también: [`tabs`](#tabs), [`snapshot`](#snapshot).

## `contexts`

Lista o cambia los contextos nativo/webview. Se aplica a móvil nativo.

```sh
npx wdio session contexts [sub] [name]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | no | switch |
| `name` | no | Nombre del contexto |

**Ejemplos**

```sh
# Listar los contextos NATIVE_APP y WEBVIEW
npx wdio session contexts

# Controlar el webview
npx wdio session contexts switch WEBVIEW_com.example.shop
```

Ver también: [`snapshot`](#snapshot).

## `dialog`

Acepta, descarta o informa sobre un diálogo abierto. Se aplica a web, móvil nativo.

Un alert, confirm o prompt abierto bloquea otras acciones, que fallan con una indicación para ejecutar este comando.

```sh
npx wdio session dialog <sub>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | accept \| dismiss \| status |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--text <value>` | Texto del prompt (solo accept) |

**Ejemplos**

```sh
# Mostrar el diálogo abierto
npx wdio session dialog status

# Confirmar
npx wdio session dialog accept

# Responder a un prompt
npx wdio session dialog accept --text "Ada"
```

Ver también: [`click`](#click).

## `app`

Lanza, termina, instala o consulta una app. Se aplica a móvil nativo, escritorio nativo.

```sh
npx wdio session app <sub> <id>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | launch \| terminate \| install \| state |
| `id` | sí | Id de la app, bundle id o archivo |

**Ejemplos**

```sh
# Reiniciar la app
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# ¿Está en ejecución?
npx wdio session app state com.example.shop
```

Ver también: [`deeplink`](#deeplink), [`background`](#background).

## `deeplink`

Abre un deep link. Se aplica a móvil nativo.

```sh
npx wdio session deeplink <url>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `url` | sí | URL |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--package <value>` | Paquete de Android o bundle id de iOS |

**Ejemplos**

```sh
# Abrir la pantalla de un producto
npx wdio session deeplink shop://product/42 --package com.example.shop
```

Ver también: [`app`](#app).

## `rotate`

Rota el dispositivo. Se aplica a móvil nativo.

```sh
npx wdio session rotate <orientation>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `orientation` | sí | portrait \| landscape |

**Ejemplos**

```sh
# Girar el dispositivo de lado
npx wdio session rotate landscape
```

## `keyboard`

Oculta el teclado en pantalla. Se aplica a móvil nativo.

```sh
npx wdio session keyboard <sub>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | hide |

**Ejemplos**

```sh
# Descubrir los elementos que hay bajo el teclado
npx wdio session keyboard hide
```

## `background`

Envía la app a segundo plano. Se aplica a móvil nativo.

```sh
npx wdio session background <seconds>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `seconds` | sí | Segundos (-1 la mantiene ahí) |

**Ejemplos**

```sh
# Enviar la app a segundo plano durante 3 segundos
npx wdio session background 3
```

Ver también: [`app`](#app).

## `lock`

Bloquea el dispositivo. Se aplica a móvil nativo.

```sh
npx wdio session lock
```

**Ejemplos**

```sh
# Bloquear la pantalla
npx wdio session lock
```

Ver también: [`unlock`](#unlock).

## `unlock`

Desbloquea el dispositivo. Se aplica a móvil nativo.

```sh
npx wdio session unlock
```

**Ejemplos**

```sh
# Desbloquear la pantalla
npx wdio session unlock
```

Ver también: [`lock`](#lock).

## `geolocation`

Establece la geolocalización. Se aplica a web, móvil nativo.

```sh
npx wdio session geolocation <lat> <lon>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `lat` | sí | Latitud |
| `lon` | sí | Longitud |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--accuracy <n>` | Precisión en metros |

**Ejemplos**

```sh
# Simular que estamos en Berlín
npx wdio session geolocation 52.52 13.405
```

Ver también: [`emulate`](#emulate).

## `emulate`

Emula un dispositivo, viewport, red, cpu, reloj o un ámbito de emulación BiDi. Se aplica a web.

Una emulación se mantiene hasta `emulate reset` o hasta que termina la sesión; volver a establecer el mismo tipo la reemplaza. `emulate device` sin un valor lista los nombres de los dispositivos. Los presets de red y la limitación de cpu requieren un navegador Chromium.

```sh
npx wdio session emulate <sub> [value]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | no | Valor para la emulación |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--dpr <n>` | Device pixel ratio (viewport) |
| `--tick <n>` | Avanza el reloj emulado en ms (clock) |

**Ejemplos**

```sh
# Emular un teléfono
npx wdio session emulate device "iPhone 15"

# Establecer un viewport
npx wdio session emulate viewport 375x812 --dpr 3

# Quedarse sin conexión
npx wdio session emulate network offline

# Modo oscuro
npx wdio session emulate color-scheme dark

# Congelar la fecha
npx wdio session emulate clock 2030-01-01T00:00:00Z

# Reducir el movimiento
npx wdio session emulate media prefersReducedMotion=reduce

# Deshacer todas las emulaciones
npx wdio session emulate reset
```

Ver también: [`geolocation`](#geolocation), [`screenshot`](#screenshot).

## `requests`

Lista las peticiones de red capturadas (BiDi). Se aplica a web.

```sh
npx wdio session requests
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--filter <value>` | Subcadena o glob |
| `--failed` | Solo las peticiones fallidas |
| `--since <value>` | Solo las peticiones más recientes que esta duración |
| `--limit <n>` | Número máximo de líneas (por defecto 50) |

**Ejemplos**

```sh
# Solo llamadas a la API
npx wdio session requests --filter "**/api/**"

# Peticiones que rompió un clic
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

Ver también: [`mock`](#mock), [`logs`](#logs).

## `mock`

Simula respuestas para un patrón de URL (BiDi). Se aplica a web.

Imprime el id del mock (m1, m2, …). Volver a simular el mismo patrón reemplaza el mock anterior.

```sh
npx wdio session mock <pattern>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `pattern` | sí | Patrón de URL |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--status <n>` | Código de estado |
| `--body <value>` | Cuerpo como JSON/texto o la ruta a un archivo |
| `--header <value>` | Cabecera k:v (repetible) |
| `--abort` | Aborta las peticiones que coinciden |
| `--method <value>` | Solo este método |
| `--once` | Solo la siguiente petición |

**Ejemplos**

```sh
# Devolver un JSON fijo
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# Hacer fallar la siguiente petición
npx wdio session mock "**/api/cart" --status 500 --once

# Bloquear las imágenes
npx wdio session mock "**/*.png" --abort
```

Ver también: [`unmock`](#unmock), [`requests`](#requests).

## `unmock`

Elimina mocks. Se aplica a web.

```sh
npx wdio session unmock [pattern]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `pattern` | no | Patrón o id del mock |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--all` | Elimina todos los mocks |

**Ejemplos**

```sh
# Eliminar un mock
npx wdio session unmock m1

# Eliminar todos los mocks
npx wdio session unmock --all
```

Ver también: [`mock`](#mock).

## `cookies`

Obtiene, establece o borra cookies. Se aplica a web.

Sin un subcomando, imprime todas las cookies como name=value. `clear` sin un nombre elimina todas las cookies.

```sh
npx wdio session cookies [sub] [name] [value]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | no | get \| set \| clear |
| `name` | no | Nombre de la cookie |
| `value` | no | Valor de la cookie |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--domain <value>` | Dominio de la cookie (set) |
| `--path <value>` | Ruta de la cookie (set) |
| `--http-only` | Cookie HttpOnly (set) |
| `--secure` | Cookie Secure (set) |
| `--same-site <value>` | lax, strict, none o default (set) |
| `--expiry <n>` | Caducidad como timestamp Unix en segundos (set) |

**Ejemplos**

```sh
# Listar cookies
npx wdio session cookies

# Valor de una cookie
npx wdio session cookies get session

# Establecer una cookie y recargar
npx wdio session cookies set session abc && npx wdio session reload

# Eliminar todas las cookies
npx wdio session cookies clear
```

Ver también: [`storage`](#storage), [`state`](#state).

## `storage`

Obtiene, establece o borra localStorage (o sessionStorage). Se aplica a web.

Sin un subcomando, imprime todas las entradas. `clear` sin una clave vacía el almacenamiento.

```sh
npx wdio session storage [sub] [key] [value]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | no | get \| set \| clear |
| `key` | no | Clave |
| `value` | no | Valor |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--session-storage` | Usa sessionStorage |

**Ejemplos**

```sh
# Listar localStorage
npx wdio session storage

# Establecer una clave
npx wdio session storage set token abc

# Vaciar sessionStorage
npx wdio session storage clear --session-storage
```

Ver también: [`cookies`](#cookies), [`state`](#state).

## `state`

Guarda o carga cookies y almacenamiento. Se aplica a web.

`save` escribe las cookies, localStorage y sessionStorage del origen actual en un archivo JSON. `load` abre ese origen y los restaura, p. ej. para saltarse un inicio de sesión.

```sh
npx wdio session state <sub> <file>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | save \| load |
| `file` | sí | Archivo de estado |

**Ejemplos**

```sh
# Guardar un estado con sesión iniciada
npx wdio session state save .wdio/logged-in.json

# Empezar con la sesión iniciada
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

Ver también: [`cookies`](#cookies), [`storage`](#storage).

## `visual`

Snapshots visuales mediante @wdio/visual-service. Se aplica a web, móvil nativo, escritorio nativo.

`save` guarda una línea base en .wdio/visual/baseline, `check` compara con ella e imprime la diferencia, `accept` convierte la última imagen real en la línea base, `list` muestra las etiquetas. Requiere @wdio/visual-service en el proyecto.

```sh
npx wdio session visual <sub> [tag]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | save \| check \| accept \| list |
| `tag` | no | Etiqueta de la imagen |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--element <value>` | Solo este elemento |
| `--full` | Página completa |
| `--tabbable` | Página tabbable |
| `--threshold <n>` | Diferencia permitida en porcentaje (por defecto 0) |
| `--all` | accept: todas las etiquetas |

**Ejemplos**

```sh
# Guardar una línea base
npx wdio session visual save cart

# Comparar con ella
npx wdio session visual check cart --threshold 0.5

# Aceptar un cambio intencionado
npx wdio session visual accept cart
```

Ver también: [`screenshot`](#screenshot).

## `trace`

Graba cada paso con capturas de pantalla y snapshots.

`stop` imprime el directorio de la traza y una transcripción de los pasos.

```sh
npx wdio session trace <sub>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | start \| stop |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--screenshots` | Captura de pantalla después de cada paso (usa --no-screenshots para omitirla) |
| `--snapshots` | Snapshot después de cada paso (usa --no-snapshots para omitirlo) |

**Ejemplos**

```sh
# Iniciar la traza
npx wdio session trace start

# Detener e imprimir la transcripción
npx wdio session trace stop
```

Ver también: [`record`](#record), [`history`](#history).

## `record`

Graba un vídeo. Se aplica a web, móvil nativo.

```sh
npx wdio session record <sub>
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `sub` | sí | start \| stop |

**Flags**

| Flag | Descripción |
| --- | --- |
| `--fps <n>` | Fotogramas por segundo (por defecto 5) |
| `--path <value>` | Archivo de salida |

**Ejemplos**

```sh
# Iniciar la grabación
npx wdio session record start

# Detener y guardar el vídeo
npx wdio session record stop --path checkout.mp4
```

Ver también: [`trace`](#trace), [`screenshot`](#screenshot).

## `history`

Imprime los pasos grabados.

Cada acción que cambia la página graba el código de WebdriverIO que ejecutó. `export` convierte este historial en un spec.

```sh
npx wdio session history
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--clear` | Borra el historial |

**Ejemplos**

```sh
# Mostrar los pasos hasta ahora
npx wdio session history

# Reiniciar la grabación antes de los pasos que quieres conservar
npx wdio session history --clear
```

Ver también: [`export`](#export), [`exec`](#exec).

## `export`

Genera un spec a partir del historial.

Escribe un spec describe/it con los pasos grabados. Las refs se convierten en selectores estables y los helpers en comandos personalizados. Sin --out, el archivo va al directorio de artefactos. Ejecútalo con `wdio run` para confirmar que pasa.

```sh
npx wdio session export
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--out <value>` | Archivo de salida |
| `--title <value>` | Título de la suite |
| `--page-objects` | Genera page objects |
| `--framework <mocha\|jasmine>` | Framework (por defecto mocha) |

**Ejemplos**

```sh
# Escribir el spec
npx wdio session export --out test/specs/cart.e2e.ts

# Escribir el spec y ejecutarlo
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Ver también: [`history`](#history), [`helpers`](#helpers).

## `resume`

Continúa un test pausado por wdio run --debug=agent.

`wdio run --debug=agent` pausa un test que falla y lo expone como la sesión debug-`<worker>`. Inspecciónalo con cualquier acción y luego reanúdalo. En cambio, `close` en esa sesión hace fallar el test.

```sh
npx wdio session resume
```

**Ejemplos**

```sh
# Mirar el test pausado y luego dejar que continúe
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

Ver también: [`close`](#close), [`list`](#list).

## `doctor`

Comprueba tu entorno.

Imprime una línea por comprobación con una solución para cada fallo. Sale con 1 cuando falla una comprobación.

```sh
npx wdio session doctor [target]
```

**Argumentos**

| Nombre | Obligatorio | Descripción |
| --- | --- | --- |
| `target` | no | Solo comprueba lo que necesita este target |

**Ejemplos**

```sh
# Comprobarlo todo
npx wdio session doctor

# Comprobar lo que necesita una sesión de Android
npx wdio session doctor android
```

Ver también: [`open`](#open).

## `skill`

Imprime la skill del agente.

```sh
npx wdio session skill
```

**Flags**

| Flag | Descripción |
| --- | --- |
| `--install <value>` | La escribe en .agents/skills/wdio-session/SKILL.md (o en este directorio) |

**Ejemplos**

```sh
# Imprimir la skill
npx wdio session skill

# Añadirla a este proyecto
npx wdio session skill --install .
```