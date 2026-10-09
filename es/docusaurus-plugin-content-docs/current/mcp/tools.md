---
id: tools
title: Herramientas
description: "Consulta las herramientas expuestas por el servidor MCP de WebdriverIO para sesiones, navegación, interacción con elementos, capturas de pantalla, gestos y ciclo de vida de aplicaciones."
---

El servidor MCP de WebdriverIO expone 29 herramientas organizadas por función. Las herramientas marcadas como **solo navegador** requieren una sesión con `platform: "browser"`. Las herramientas marcadas como **solo móvil** requieren `platform: "ios"` o `platform: "android"`.

## Gestión de sesiones

### `start_session`

Inicia una nueva sesión de automatización de navegador o móvil. Solo puede haber una sesión activa a la vez; iniciar una nueva cierra la existente.

| Parámetro              | Tipo                                                                   | Obligatorio     | Valor predeterminado | Descripción                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------- | ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `platform`             | `"browser" \| "ios" \| "android"`                                      | ✓            | —                | Plataforma de la sesión                                                                                                                  |
| `provider`             | `"local" \| "browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | —            | `"local"`        | Proveedor de la sesión                                                                                                                  |
| `browser`              | `"chrome" \| "firefox" \| "edge" \| "safari"`                          | solo navegador | —                | Navegador a iniciar                                                                                                                 |
| `browserVersion`       | string                                                                 | —            | latest           | Versión del navegador (solo proveedores en la nube, predeterminado: latest)                                                                           |
| `os`                   | string                                                                 | —            | —                | Sistema operativo (solo proveedores en la nube, p. ej. `"Windows"`, `"OS X"`)                                                               |
| `osVersion`            | string                                                                 | —            | —                | Versión del SO (solo proveedores en la nube, p. ej. `"11"`, `"Sequoia"`)                                                                       |
| `headless`             | boolean                                                                | —            | `true`           | Ejecutar el navegador en modo headless                                                                                                            |
| `windowWidth`          | number                                                                 | —            | `1920`           | Ancho de la ventana del navegador (400–3840)                                                                                                   |
| `windowHeight`         | number                                                                 | —            | `1080`           | Alto de la ventana del navegador (400–2160)                                                                                                  |
| `navigationUrl`        | string                                                                 | —            | —                | URL a la que navegar después de iniciar                                                                                                 |
| `deviceName`           | string                                                                 | solo móvil  | —                | Nombre del dispositivo/emulador/simulador                                                                                                    |
| `platformVersion`      | string                                                                 | —            | —                | Versión del SO (p. ej. `"17.0"`, `"14"`)                                                                                                |
| `appPath`              | string                                                                 | —            | —                | Ruta a `.app` / `.apk` / `.ipa`                                                                                                  |
| `app`                  | string                                                                 | —            | —                | URL de la app (`bs://...` para BrowserStack, `storage:filename=` para Sauce Labs, `lt://...` para TestMu, app_url de TestingBot) o custom_id |
| `automationName`       | `"XCUITest" \| "UiAutomator2"`                                         | —            | auto             | Driver de automatización                                                                                                                 |
| `autoGrantPermissions` | boolean                                                                | —            | `true`           | Conceder automáticamente los permisos de la app                                                                                                        |
| `autoAcceptAlerts`     | boolean                                                                | —            | `true`           | Aceptar automáticamente las alertas                                                                                                                |
| `autoDismissAlerts`    | boolean                                                                | —            | `false`          | Descartar automáticamente las alertas                                                                                                               |
| `appWaitActivity`      | string                                                                 | —            | —                | Actividad de Android a esperar al iniciar                                                                                            |
| `udid`                 | string                                                                 | —            | —                | UDID de dispositivo iOS real                                                                                                              |
| `noReset`              | boolean                                                                | —            | —                | Conservar los datos de la app entre sesiones                                                                                                |
| `fullReset`            | boolean                                                                | —            | —                | Desinstalar la app antes/después de la sesión                                                                                                |
| `newCommandTimeout`    | number                                                                 | —            | `300`            | Tiempo de espera de comandos de Appium (segundos)                                                                                                  |
| `attach`               | boolean                                                                | —            | `false`          | Conectarse a un Chrome existente mediante CDP                                                                                                 |
| `attachConfig`         | object                                                                 | —            | —                | Conexión CDP: `{ port: 9222, host: "localhost" }`                                                                               |
| `appiumConfig`         | object                                                                 | —            | —                | Servidor Appium: `{ host, port, path }`                                                                                             |
| `tunnel`               | `boolean \| "external"`                                                | —            | `false`          | Enrutamiento por túnel local (proveedores en la nube). `true` = inicio automático, `"external"` = túnel ya en ejecución externamente                     |
| `reporting`            | object                                                                 | —            | —                | Etiquetas de informes del proveedor en la nube: `{ project, build, session }`                                                                    |
| `trace`                | boolean                                                                | —            | `false`          | Habilitar la grabación de trazas: genera un zip `.trace` compatible con Playwright                                                            |
| `region`               | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`                  | —            | `"eu-central-1"` | Región del centro de datos de Sauce Labs                                                                                                     |
| `tunnelName`           | string                                                                 | —            | —                | Nombre identificador del túnel (obligatorio para `tunnel: "external"`)                                                                        |
| `capabilities`         | object                                                                 | —            | —                | Capabilities sin procesar adicionales para combinar                                                                                              |

```js
// Navegador Chrome local
start_session({ platform: "browser", browser: "chrome" })

// Simulador de iOS
start_session({ platform: "ios", deviceName: "iPhone 16", platformVersion: "18.0", appPath: "/path/to/app.app" })

// BrowserStack Android
start_session({ platform: "android", provider: "browserstack", deviceName: "Samsung Galaxy S24", app: "bs://abc123" })

// Sauce Labs iOS
start_session({ platform: "ios", provider: "saucelabs", deviceName: "iPhone 15", platformVersion: "17.0", app: "storage:filename=MyApp.ipa" })

// Navegador en TestMu
start_session({ platform: "browser", provider: "testmu", browser: "chrome", os: "Windows", osVersion: "11" })

// Navegador en TestingBot
start_session({ platform: "browser", provider: "testingbot", browser: "chrome", os: "Windows", osVersion: "11" })

// Proveedor en la nube con túnel
start_session({ platform: "browser", provider: "browserstack", browser: "chrome", tunnel: true })

// Conectarse a un Chrome existente (después de launch_chrome)
start_session({ platform: "browser", browser: "chrome", attach: true })
```

---

### `close_session`

Cierra la sesión actual o se desconecta de ella.

| Parámetro | Tipo    | Obligatorio | Valor predeterminado | Descripción                                                    |
| --------- | ------- | -------- | ------- | -------------------------------------------------------------- |
| `detach`  | boolean | —        | `false` | Desconectar sin terminar (conserva el estado de la app en Appium) |

Las sesiones iniciadas con `noReset: true` se desconectan automáticamente de forma predeterminada.

---

### `launch_chrome`

Prepara una instancia de Chrome con la depuración remota habilitada para que `start_session({ attach: true })` pueda conectarse. Dos modos:

- `newInstance` (predeterminado): abre Chrome junto a tu instancia existente usando un directorio de perfil independiente; tu sesión actual no se ve afectada.
- `freshSession`: inicia Chrome con un perfil vacío (sin cookies ni inicios de sesión). Usa `copyProfileFiles: true` para trasladar las cookies y los inicios de sesión.

| Parámetro          | Tipo                              | Obligatorio | Valor predeterminado         | Descripción                                                      |
| ------------------ | --------------------------------- | -------- | --------------- | ---------------------------------------------------------------- |
| `port`             | number                            | —        | `9222`          | Puerto de depuración remota                                            |
| `mode`             | `"newInstance" \| "freshSession"` | —        | `"newInstance"` | Modo de inicio                                                      |
| `copyProfileFiles` | boolean                           | —        | `false`         | Copiar el perfil Default de Chrome (cookies, inicios de sesión) en la sesión de depuración |

Una vez que esta herramienta se ejecute correctamente, llama a `start_session({ platform: "browser", browser: "chrome", attach: true })`.

## Navegación y pestañas

### `navigate`

Carga una URL en la pestaña actual y espera al evento de carga de la página. Restablece el estado de la página (DOM, entorno de ejecución de JS). **Solo navegador.**

| Parámetro | Tipo   | Obligatorio | Descripción        |
| --------- | ------ | -------- | ------------------ |
| `url`     | string | ✓        | URL a la que navegar |

---

### `get_tabs`

Enumera todas las pestañas del navegador con su handle, título, URL y cuál está activa. Úsala antes de `switch_tab` para encontrar el handle de destino. **Solo navegador.**

Sin parámetros.

---

### `switch_tab`

Enfoca una pestaña del navegador por window handle o por índice basado en 0. Todas las llamadas posteriores a herramientas operan sobre la pestaña recién activada. **Solo navegador.**

| Parámetro | Tipo   | Obligatorio | Descripción                |
| --------- | ------ | -------- | -------------------------- |
| `handle`  | string | —        | Window handle al que cambiar |
| `index`   | number | —        | Índice de pestaña basado en 0 (≥ 0)    |

Proporciona `handle` o `index`. Obtén los handles desde `get_tabs` o `wdio://session/current/tabs`.

---

### `switch_frame`

Cambia el contexto de frame de WebDriver a un iframe mediante un selector CSS/XPath, o vuelve al nivel superior si se omite el selector. Los cambios persisten; todas las llamadas posteriores a `click_element`, `set_value` y `get_elements` operan dentro del frame seleccionado hasta que vuelvas a cambiar. Espera hasta 5 s a que aparezca el iframe. **Solo navegador.**

| Parámetro  | Tipo   | Obligatorio | Descripción                                                                            |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| `selector` | string | —        | Selector CSS/XPath del elemento iframe. Omítelo para volver al frame de nivel superior. |

```js
// Cambiar a un iframe
switch_frame({ selector: "#my-iframe" })

// Interactuar con elementos dentro del iframe
click_element({ selector: "button.submit" })

// Volver al nivel superior
switch_frame()
```

## Interacción con elementos

### `click_element`

Espera a que exista un elemento, lo desplaza hasta hacerlo visible y hace clic en él. Funciona en navegador y en móvil. En iOS, es preferible usar `tap_element`; la capa nativa a veces ignora `click_element`.

| Parámetro      | Tipo    | Obligatorio | Valor predeterminado | Descripción                              |
| -------------- | ------- | -------- | ------- | ---------------------------------------- |
| `selector`     | string  | ✓        | —       | Selector CSS, XPath o de texto             |
| `scrollToView` | boolean | —        | `true`  | Desplazar el elemento hasta hacerlo visible antes de hacer clic |
| `timeout`      | number  | —        | —       | Tiempo máximo de espera (ms)                       |

---

### `set_value`

Borra un input o textarea y escribe el texto indicado. Siempre reemplaza el contenido existente.

| Parámetro      | Tipo    | Obligatorio | Valor predeterminado | Descripción                            |
| -------------- | ------- | -------- | ------- | -------------------------------------- |
| `selector`     | string  | ✓        | —       | Selector CSS, XPath o de texto           |
| `value`        | string  | ✓        | —       | Texto a escribir                           |
| `scrollToView` | boolean | —        | `true`  | Desplazar el elemento hasta hacerlo visible antes de escribir |
| `timeout`      | number  | —        | —       | Tiempo máximo de espera (ms)                     |

---

### `scroll`

Desplaza la página un número de píxeles. **Solo navegador.** En móvil, usa `swipe`.

| Parámetro   | Tipo             | Obligatorio | Valor predeterminado | Descripción      |
| ----------- | ---------------- | -------- | ------- | ---------------- |
| `direction` | `"up" \| "down"` | ✓        | —       | Dirección del desplazamiento |
| `pixels`    | number           | —        | `500`   | Píxeles a desplazar |

## Análisis de elementos

### `get_elements`

Devuelve los elementos interactuables de la página actual con selectores listos para usar. Es preferible el recurso `wdio://session/current/elements` para el conocimiento contextual; usa esta herramienta cuando necesites filtrado o paginación.

| Parámetro           | Tipo    | Obligatorio | Valor predeterminado | Descripción                                 |
| ------------------- | ------- | -------- | ------- | ------------------------------------------- |
| `inViewportOnly`    | boolean | —        | `false` | Devolver solo los elementos visibles en el viewport       |
| `includeContainers` | boolean | —        | `false` | Incluir elementos contenedores (divs, sections) |
| `includeBounds`     | boolean | —        | `false` | Incluir las coordenadas del bounding box            |
| `limit`             | number  | —        | `0`     | Número máximo de elementos a devolver (0 = ilimitado)      |
| `offset`            | number  | —        | `0`     | Elementos a omitir (paginación)               |

---

### `get_accessibility_tree`

Devuelve el árbol de accesibilidad de la página con roles, nombres y selectores. Admite filtrado y paginación. **Solo navegador.**

| Parámetro | Tipo     | Obligatorio | Valor predeterminado | Descripción                                                |
| --------- | -------- | -------- | ------- | ---------------------------------------------------------- |
| `limit`   | number   | —        | `0`     | Número máximo de nodos a devolver (0 = ilimitado)                        |
| `offset`  | number   | —        | `0`     | Nodos a omitir (paginación)                                 |
| `roles`   | string[] | —        | —       | Filtrar por roles ARIA, p. ej. `["button", "link", "heading"]` |

## Capturas de pantalla

### `get_screenshot`

Toma una captura de pantalla de la página o pantalla actual. Devuelve una imagen codificada en base64, redimensionada y comprimida automáticamente para no superar los límites de contexto del modelo (máx. 1 MB, máx. 2000 px).

Sin parámetros. Es preferible usar `wdio://session/current/elements` en lugar de capturas de pantalla para descubrir elementos; es más rápido y usa muchos menos tokens. Usa las capturas de pantalla para la verificación visual o para depurar el diseño.

## Gestión de cookies

### `get_cookies`

Devuelve todas las cookies de la sesión actual, o una sola cookie por nombre. **Solo navegador.**

| Parámetro | Tipo   | Obligatorio | Descripción                              |
| --------- | ------ | -------- | ---------------------------------------- |
| `name`    | string | —        | Nombre de la cookie. Omítelo para devolver todas las cookies. |

---

### `set_cookie`

Establece una cookie del navegador. El navegador ya debe estar en el dominio de destino: no se pueden establecer cookies entre dominios. Úsala para inyectar tokens de sesión o feature flags sin pasar por los flujos de inicio de sesión. **Solo navegador.**

| Parámetro  | Tipo                          | Obligatorio | Descripción                                |
| ---------- | ----------------------------- | -------- | ------------------------------------------ |
| `name`     | string                        | ✓        | Nombre de la cookie                                |
| `value`    | string                        | ✓        | Valor de la cookie                               |
| `domain`   | string                        | —        | Dominio de la cookie (por defecto, el dominio actual) |
| `path`     | string                        | —        | Ruta de la cookie (por defecto, `/`)              |
| `expiry`   | number                        | —        | Caducidad como marca de tiempo Unix (segundos)         |
| `httpOnly` | boolean                       | —        | Indicador HttpOnly                              |
| `secure`   | boolean                       | —        | Indicador Secure                                |
| `sameSite` | `"strict" \| "lax" \| "none"` | —        | Atributo SameSite                         |

---

### `delete_cookies`

Elimina todas las cookies o una cookie específica por nombre. **Solo navegador.**

| Parámetro | Tipo   | Obligatorio | Descripción                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| `name`    | string | —        | Nombre de la cookie a eliminar. Omítelo para eliminar todas las cookies. |

## Gestos táctiles (móvil)

### `tap_element`

Llama a `element.tap()` sobre un elemento coincidente o toca en coordenadas absolutas de la pantalla. Úsala en iOS cuando se ignore `click_element`; el toque es el gesto nativo al que responde iOS. **Solo móvil.**

| Parámetro  | Tipo   | Obligatorio | Descripción                                  |
| ---------- | ------ | -------- | -------------------------------------------- |
| `selector` | string | —        | Selector del elemento                             |
| `x`        | number | —        | Coordenada X para tocar la pantalla (si no hay selector) |
| `y`        | number | —        | Coordenada Y para tocar la pantalla (si no hay selector) |

Proporciona `selector` o las coordenadas `x`/`y`.

---

### `swipe`

Realiza un gesto de deslizamiento a pantalla completa. La dirección es la dirección de movimiento del contenido (p. ej., `"up"` desplaza una lista hacia arriba). Úsala para desplazarte más allá de los límites visibles. Para mover un elemento específico, usa `drag_and_drop`. **Solo móvil.** En navegadores, usa `scroll`.

| Parámetro   | Tipo                                  | Obligatorio | Valor predeterminado        | Descripción                       |
| ----------- | ------------------------------------- | -------- | -------------- | --------------------------------- |
| `direction` | `"up" \| "down" \| "left" \| "right"` | ✓        | —              | Dirección del deslizamiento                   |
| `duration`  | number                                | —        | `500`          | Duración del deslizamiento (ms, 100–5000)     |
| `percent`   | number                                | —        | `0.5` / `0.95` | Fracción de la pantalla a deslizar (0–1) |

---

### `drag_and_drop`

Arrastra un elemento hasta otro elemento o hasta unas coordenadas. **Solo móvil.**

| Parámetro        | Tipo   | Obligatorio | Valor predeterminado | Descripción                            |
| ---------------- | ------ | -------- | ------- | -------------------------------------- |
| `sourceSelector` | string | ✓        | —       | Elemento de origen a arrastrar                 |
| `targetSelector` | string | —        | —       | Elemento de destino sobre el que soltar            |
| `x`              | number | —        | —       | Desplazamiento X de destino (si no hay targetSelector) |
| `y`              | number | —        | —       | Desplazamiento Y de destino (si no hay targetSelector) |
| `duration`       | number | —        | —       | Duración del arrastre (ms, 100–5000)           |

## Cambio de contexto (móvil)

### `get_contexts`

Devuelve los contextos de automatización disponibles y el que está activo actualmente. Úsala antes de `switch_context` para descubrir los destinos `NATIVE_APP` y `WEBVIEW_*`. **Solo móvil.**

Sin parámetros.

---

### `switch_context`

Cambia entre los contextos de automatización nativo y webview en una app móvil híbrida. Es necesario antes de usar selectores CSS/XPath dentro de un webview incrustado. **Solo móvil.**

| Parámetro | Tipo   | Obligatorio | Descripción                                                    |
| --------- | ------ | -------- | -------------------------------------------------------------- |
| `context` | string | ✓        | Nombre del contexto, p. ej. `"NATIVE_APP"`, `"WEBVIEW_com.example.app"` |

Obtén los nombres de contexto disponibles desde `get_contexts` o `wdio://session/current/contexts`.

```js
// 1. Comprobar qué está disponible
get_contexts()
// → { contexts: ["NATIVE_APP", "WEBVIEW_com.example.app"], currentContext: "NATIVE_APP" }

// 2. Cambiar al webview para usar CSS/XPath
switch_context({ context: "WEBVIEW_com.example.app" })

// 3. Interactuar con elementos del webview usando selectores CSS
click_element({ selector: "#login-button" })

// 4. Volver al contexto nativo para la UI nativa
switch_context({ context: "NATIVE_APP" })
```

## Control del dispositivo (móvil)

### `rotate_device`

Gira el dispositivo a vertical u horizontal y espera a que el SO complete la rotación. Úsala para probar diseños que dependen de la orientación. **Solo móvil.**

| Parámetro     | Tipo                        | Obligatorio | Descripción        |
| ------------- | --------------------------- | -------- | ------------------ |
| `orientation` | `"PORTRAIT" \| "LANDSCAPE"` | ✓        | Orientación de destino |

---

### `hide_keyboard`

Oculta el teclado en pantalla. Llámala después de introducir texto cuando el teclado tape elementos que necesites a continuación. No hace nada si ya está oculto. **Solo móvil.**

Sin parámetros.

---

### `set_geolocation`

Sobrescribe las coordenadas GPS del dispositivo para la sesión. Afecta a `navigator.geolocation` en la web y a los servicios de ubicación en móvil. Los permisos de ubicación deben haberse concedido a la app previamente.

| Parámetro   | Tipo   | Obligatorio | Descripción             |
| ----------- | ------ | -------- | ----------------------- |
| `latitude`  | number | ✓        | Latitud (−90 a 90)    |
| `longitude` | number | ✓        | Longitud (−180 a 180) |
| `altitude`  | number | —        | Altitud en metros      |

## Ciclo de vida de la app (móvil)

### `get_app_state`

Devuelve el estado actual del ciclo de vida de una app móvil. **Solo móvil.**

| Parámetro  | Tipo   | Obligatorio | Descripción                                                     |
| ---------- | ------ | -------- | --------------------------------------------------------------- |
| `bundleId` | string | ✓        | Bundle ID de iOS o nombre de paquete de Android, p. ej. `"com.example.app"` |

Devuelve uno de los siguientes valores: `not installed`, `not running`, `background (suspended)`, `background`, `foreground`.

## Utilidades del navegador

### `emulate_device`

Emula un dispositivo móvil o tableta en la sesión de navegador actual (establece el viewport, el DPR, el user-agent y los eventos táctiles). Requiere una sesión con BiDi habilitado: `start_session({ capabilities: { webSocketUrl: true } })`. **Solo navegador.**

| Parámetro | Tipo   | Obligatorio | Descripción                                                                                                             |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `device`  | string | —        | Nombre del preset de dispositivo (p. ej. `"iPhone 15"`, `"Pixel 7"`). Omítelo para listar los presets. Pasa `"reset"` para restaurar los valores predeterminados de escritorio. |

---

### `execute_script`

Ejecuta JavaScript en el navegador o comandos móviles a través de Appium.

| Parámetro | Tipo   | Obligatorio | Descripción                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------- |
| `script`  | string | ✓        | Código JS (navegador) o comando de Appium como `"mobile: pressKey"` |
| `args`    | any[]  | —        | Argumentos que se pasan al script o comando                     |

**Navegador:** usa `return` para obtener valores de vuelta.

```javascript
// Obtener el título de la página
execute_script({ script: "return document.title" })

// Desplazar el elemento hasta hacerlo visible
execute_script({ script: "arguments[0].scrollIntoView()", args: ["#my-element"] })
```

**Móvil (Appium):** usa la sintaxis `mobile: <command>`.

```javascript
// Pulsar la tecla atrás de Android
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activar la app (iOS/Android)
execute_script({ script: "mobile: activateApp", args: [{ bundleId: "com.example.app" }] })

// Deep link (iOS)
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://route", bundleId: "com.example.app" }] })
```

## Proveedores en la nube

### `list_apps`

Enumera las apps subidas a un proveedor en la nube (BrowserStack App Automate, Sauce Labs App Storage, TestMu o TestingBot Storage). Lee las credenciales específicas del proveedor desde el entorno.

| Parámetro          | Tipo                                                        | Obligatorio | Valor predeterminado          | Descripción                              |
| ------------------ | ----------------------------------------------------------- | -------- | ---------------- | ---------------------------------------- |
| `provider`         | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓        | —                | Proveedor en la nube                           |
| `sortBy`           | `"app_name" \| "uploaded_at"`                               | —        | `"uploaded_at"`  | Orden de clasificación                               |
| `organizationWide` | boolean                                                     | —        | `false`          | (Solo BrowserStack) Listar todas las subidas de la organización |
| `limit`            | number                                                      | —        | `20`             | Número máximo de resultados                              |
| `region`           | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —        | `"eu-central-1"` | Región de Sauce Labs                        |

```js
// Listar en los cuatro proveedores
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs", region: "us-west-1" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

---

### `upload_app`

Sube un archivo `.apk` o `.ipa` local a un proveedor en la nube (BrowserStack, Sauce Labs, TestMu o TestingBot). Devuelve la URL de la app para usarla en `start_session`.

| Parámetro  | Tipo                                                        | Obligatorio | Valor predeterminado          | Descripción                                      |
| ---------- | ----------------------------------------------------------- | -------- | ---------------- | ------------------------------------------------ |
| `provider` | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓        | —                | Proveedor en la nube                                   |
| `path`     | string                                                      | ✓        | —                | Ruta absoluta al archivo `.apk` o `.ipa`       |
| `customId` | string                                                      | —        | —                | ID personalizado opcional para referenciar la app más adelante |
| `region`   | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —        | `"eu-central-1"` | Región de Sauce Labs                                |

```js
// Subir a cada proveedor
upload_app({ provider: "browserstack", path: "/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", region: "us-west-1" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```