---
id: targets
title: Destinos de sesión
description: Abre un navegador, una aplicación móvil, una aplicación de escritorio, una aplicación Electron o un dispositivo en la nube con wdio session.
---

`wdio session open` inicia la sesión. El primer argumento es el destino. Reutiliza la sesión `default`. Pasa `-s <name>` solo cuando necesites dos sesiones a la vez. Ejecuta primero `npx wdio session doctor <target>` cuando el destino necesite Appium, un driver de escritorio o credenciales de la nube.

Los reproductores de Chrome, Android y Electron controlan la misma [aplicación de demostración de WebdriverIO](https://github.com/webdriverio/native-demo-app) (el conejillo de indias de Expo, etiqueta `v2.2.0`). Chrome y Electron usan un servidor web local de Expo en una ventana de escritorio normal. Android instala el [apk de la versión v2.2.0](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). iOS instala la aplicación de simulador v2.2.0 (`org.wdiodemoapp`) y usa `touchId`. Cada reproductor escribe el comando y luego la ventana muestra el resultado. Pausa, o avanza al comando anterior o siguiente, para leer la línea que cambió la ventana.

El recorrido común es: abrir la aplicación, iniciar sesión como `alice@webdriver.io` / `supersecret`, llegar al logotipo del robot ("You found me!!!") y luego completar el rompecabezas de 9 piezas. Chrome y Electron además establecen una ubicación y un reloj nocturno en la vista Weather, abren el WebView integrado en la aplicación con la página principal de WebdriverIO y arrastran el carrusel. El reproductor de Android desplaza la pantalla nativa de deslizamiento hasta ese robot. `export` escribe una especificación de Mocha de la sesión que acabas de controlar.

<a id="postcard"></a>

## Navegadores

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome se abre en modo headless. Añade `--headed` para mostrar la ventana. Chrome, Firefox y Edge se descargan en el primer uso cuando no están instalados. Safari requiere macOS.

### User agent en modo headless

Chrome y Edge en modo headless se identifican como `HeadlessChrome/<version>` en el user agent. Una ventana visible del mismo navegador envía `Chrome/<version>`. Muchos sitios rechazan las solicitudes con el token headless: Akamai responde "Access Denied" y Cloudflare muestra "Just a moment...". Deciden a partir de la solicitud, antes de que se ejecute cualquier script de la página. Un agente vería entonces una página de bloqueo que una persona que abre el mismo sitio nunca recibe.

Por lo tanto, una sesión headless de Chrome o Edge envía el user agent que enviaría una ventana visible del mismo navegador. Esto solo cambia el token. No oculta la automatización:

- `navigator.webdriver` sigue siendo `true`.
- Los marcadores propios de chromedriver siguen en la página.
- Los sitios que comprueban la automatización la siguen viendo.

Mientras el user agent está sobrescrito, Chrome no envía user agent client hints, por lo que `navigator.userAgentData.brands` está vacío. La sobrescritura necesita WebDriver BiDi, así que una sesión abierta con `--no-bidi` mantiene el user agent headless.

Para enviar un user agent específico, pásalo como argumento del navegador. La sesión entonces no modifica el user agent:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

Si un sitio sigue mostrando una comprobación anti-bots, prueba con una ventana visible usando `--headed`. Si eso también se bloquea, el sitio no permite la entrada de navegadores automatizados. Infórmalo en lugar de intentar sortear la comprobación.

Una ventana de Chrome visible conserva su barra de pestañas y su barra de direcciones, que es como se distingue de una ventana de Electron. `--viewport 1280x800` es una página de navegador normal. En la web, la aplicación usa una barra lateral izquierda. El logotipo de WebdriverIO está en la parte superior de esa barra lateral. Los elementos son Home, Weather, Web, Login, Forms, Swipe, Drag, Perms y Data. La pantalla de inicio enumera navegador y escritorio junto a iOS y Android.

Weather lee `navigator.geolocation` y `Date`. `geolocation 35.6762 139.6503` es Tokio. Se aplica en la siguiente carga, así que ejecuta `reload` antes de `click "aria/Weather"`. El widget muestra entonces Tokio, 21° y lluvia. `emulate clock 2026-06-21T23:30:00Z` cambia la misma tarjeta de un cielo diurno a uno nocturno y pone el reloj a las 11:30 PM. Un segundo `emulate clock` reemplaza al primero.

La pestaña WebView carga `https://webdriver.io/` dentro de la aplicación. Login espera unos 1,5 segundos y luego abre un diálogo cuyo texto es `Success` y `You are logged in!`. El botón LOGIN sigue siendo un control naranja de 200×50 mientras esa espera está en pantalla. `dialog accept` cierra el diálogo. `swipe` es solo para móviles. Arrastra `[data-testid=Carousel]` sobre `aria/Next card` dos veces para pasar las páginas del carrusel. La compilación web grabada escucha `pointerup` en `document`, por lo que el arrastre puede comenzar en el carrusel y el puntero puede soltarse en `Next card`, que está fuera del carrusel. `scroll down --px 560` hace visible el robot de WebdriverIO. El texto debajo es "You found me!!!". Las piezas del rompecabezas van de `aria/drag-l2` a `aria/drag-l3`, y se sueltan en el destino `aria/drop-…` correspondiente. El orden de la bandeja es `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3`.

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

Repite `drag` para `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` y `l3`.

<SessionTarget id="browser" />

`--viewport 1280x720` establece el tamaño inicial. `--arg` añade un argumento del navegador y puede repetirse. `--profile <dir>` conserva un perfil entre aperturas.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android e iOS

Android e iOS se ejecutan a través de Appium 3. `doctor android` informa de un servidor o driver ausente junto con el comando de instalación.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Un paquete de Android instalado usa `--package` y `--activity`. La web móvil usa `--browser chrome` o `--browser safari` en lugar de una aplicación. `--appium-url http://127.0.0.1:4723/` se conecta a un servidor que ya está en ejecución. Una URL de aplicación en la nube como `bs://…` se pasa tal cual como `--app` y no se trata como un archivo local.

<a id="native-boarding-pass"></a>

### Aplicación de demostración nativa

En un emulador o un dispositivo, el mismo conejillo de indias es el apk v2.2.0:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` espera hasta ocho minutos. UiAutomator2 instala un servidor e inicia la instrumentación antes de que la aplicación se pueda usar, y eso es más lento que lanzar un navegador. La primera solicitud no se reintenta: un reintento iniciaría una segunda sesión de Appium en el mismo dispositivo mientras la primera aún se está instalando. `tap "~Login"`, `fill` y luego `tap "~button-LOGIN"` inicia sesión con el mismo correo y contraseña. En una pantalla corta, el botón LOGIN queda por debajo del área visible, así que desplaza `~Login-screen` antes de ese toque. `dialog accept` cierra la alerta de éxito, y debe ejecutarse después de que esa alerta esté en pantalla. El texto de la alerta es `Success` / `You are logged in!`.

El botón de huella dactilar es `~button-biometric`. Solo aparece en el formulario de inicio de sesión después de registrar una huella, por lo que este reproductor no lo toca. `exec -e "await browser.fingerPrint(1)"` responde al aviso del sistema (`fingerPrint` es solo para Android; no hay un subcomando de `wdio session` para ello).

`tap "~Webview"` es el WebView integrado en la aplicación de `https://webdriver.io/`. En un emulador por software de una sola CPU, el renderizador del WebView muere con `SIGTRAP` en `libmonochrome` después de la etiqueta LOADING, y la página nunca se pinta. El reproductor no toca esa pestaña.

`tap "~Swipe"` abre el carrusel. `swipe left` no pasa de página: el carrusel es `react-native-reanimated-carousel`, y un deslizamiento de UIAutomator rebota a la primera tarjeta. Un `exec` de `mobile: swipeGesture` sobre la vista de desplazamiento, repetido, es lo que hace aparecer el robot y el texto "You found me!!!". Un `swipe up` a pantalla completa desde el borde inferior abre en su lugar la interfaz de capturas de pantalla de Android. `drag "~drag-l2" "~drop-l2"` (y los otros ocho pares, en el orden de la bandeja) completa el rompecabezas. El último fotograma es el robot ensamblado y el control para reintentar.

`-s android` mantiene esta sesión junto a la del navegador. Omite `-s android` cuando sea la única sesión. `open` usa el paquete y la actividad ya instalados por el apk, con `--no-reset` para que se conserve una huella registrada. `"~Login"` es la etiqueta de accesibilidad de la pestaña. `wait` no se aplica a una sesión nativa.

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

Repite `drag` para `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` y `l3`.

<SessionTarget id="android" />

### Simulador de iOS

Las mismas pantallas están en la compilación para simulador v2.2.0, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). Descomprímela e instala `wdiodemoapp.app` en un simulador arrancado (`xcrun simctl install booted`). El bundle id es `org.wdiodemoapp`. Ese binario es una aplicación de iPhone Simulator (arm64, iOS 15.1 o posterior). Necesita macOS y Xcode. No hay reproductor de iOS en esta página.

El inicio de sesión, el deslizamiento y el arrastre usan las mismas etiquetas de accesibilidad que Android. `swipe left` no se ejecutó en el simulador. En el apk de Android no pasa las páginas de este carrusel. La llamada biométrica es `browser.touchId(true)`, no `fingerPrint`. `touchId` necesita la capability `appium:allowTouchIdEnroll` establecida en `true` (pásala con `--capabilities`). Registra Touch ID en el simulador antes de abrir el formulario de inicio de sesión, o el botón biométrico permanecerá oculto.

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

Repite `drag` para las otras ocho piezas, en el mismo orden de bandeja que en Android.

## Aplicaciones de escritorio

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` requiere macOS. `windows` requiere Windows. `--app Root` se conecta al escritorio. Una aplicación de Windows instalada se nombra por su id de aplicación, por ejemplo `--app Microsoft.WindowsCalculator`. Una ruta o un `.exe` se resuelve como un archivo.

<a id="launch-console"></a>

## Electron, Tauri y Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` y `open dioxus ./my-app` necesitan su driver en el `PATH`, a menos que el paquete del servicio inicie la sesión por sí mismo. En Linux sin `DISPLAY` ni `WAYLAND_DISPLAY`, instala Xvfb o weston. Electron permanece en el protocolo WebDriver clásico. Pasa `--app-arg` para reenviar un flag a la aplicación, incluido `--app-arg=--no-sandbox` cuando el entorno lo requiera. Un valor que empieza por `-` tiene que usar `=`, porque de lo contrario el parser estricto lo trata como una opción independiente.

Instala `electron` y `@wdio/electron-service` en el directorio que abras. `main.js` usa `import`, así que el `package.json` de ese directorio necesita `"type": "module"` (o nombra el archivo `main.mjs`). Ajusta el tamaño de la ventana al área de trabajo para que una pantalla más pequeña no coloque la barra de título fuera de la pantalla:

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

El comando open de abajo no desactiva el sandbox del renderizador. Añade `--app-arg=--no-sandbox` solo cuando el entorno no pueda iniciar Electron con el sandbox, como en algunos contenedores de Linux. El reproductor de Electron carga la misma URL de Expo en una ventana de 1280×800 sin barra de direcciones. El logotipo, la barra lateral, la tarjeta del tiempo, la tarjeta de inicio de sesión, el carrusel y el rompecabezas coinciden con los del navegador. `-s electron` es el nombre de sesión usado junto a la demo del navegador. Electron permanece en el protocolo clásico, así que `geolocation` y `emulate clock` pasan por Chromedriver en lugar de BiDi. Los comandos coinciden con los de Chrome, incluido `reload` antes de Weather, excepto el diálogo de éxito. En Linux, `dialog accept` acepta la alerta nativa y la burbuja sigue pintada. Esa burbuja no forma parte de la página, por lo que un clic posterior no puede alcanzarla. La grabación reemplaza `window.alert` por un diálogo dentro de la página y ejecuta `click "aria/OK"`. El botón LOGIN sigue siendo un control naranja de 200×50 mientras espera. El carrusel, el desplazamiento y el rompecabezas usan los mismos comandos que Chrome.

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

Repite `drag` para `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` y `l3`.

<SessionTarget id="electron" />

## Dispositivos en la nube

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` es `browserstack`, `saucelabs`, `testingbot` o `testmu`. Exporta el nombre de usuario y la clave de acceso del proveedor. `doctor <provider>` comprueba que estén definidos y no imprime los valores. `--tunnel` inicia el túnel del proveedor cuando la aplicación bajo prueba está en tu máquina.

## Una configuración de WebdriverIO

`open` puede recibir un archivo de configuración y un índice de capability en lugar de un nombre de destino:

```sh
npx wdio session open ./wdio.conf.ts 0
```

Una configuración en TypeScript se carga con `tsx` cuando tu proyecto lo tiene. `tsx` es opcional: sin él, la configuración se carga mediante el type stripping de Node o jiti, y una configuración que no se puede cargar informa de `MISSING_DEPENDENCY` con una línea de instalación.

`--hostname`, `--port`, `--path` y `--protocol` dirigen la sesión a un endpoint de WebDriver que ya está en ejecución. Cerrar la sesión no detiene ese endpoint.

## Solución de problemas

| Mensaje | Qué hacer |
| --- | --- |
| `MISSING_DEPENDENCY` | Instala el paquete indicado en el error. `doctor <target>` imprime la misma línea de instalación. Electron necesita `@wdio/electron-service` y `electron` en el directorio que abras. |
| `MISSING_APPIUM_DRIVER` | Ejecuta la línea `npx appium driver install …` del error. |
| `MISSING_BINARY` | Coloca el driver indicado (`tauri-driver` o `wdio-dioxus-driver`) en el `PATH`. |
| `MISSING_CREDENTIALS` | Exporta las variables indicadas en el error. |
| `NOT_SUPPORTED` | `macos` es solo para macOS y `windows` es solo para Windows. `swipe` es solo para móviles. En Chrome y Electron, arrastra `[data-testid=Carousel]` sobre `aria/Next card`. |
| `No dialog open.` | La alerta no está abierta. En Android, espera hasta que la alerta de éxito sea visible antes de `dialog accept`. En Electron sobre Linux, la burbuja nativa puede seguir pintada después de `acceptAlert` y aun así informar de que no hay diálogo. El reproductor usa en su lugar un diálogo dentro de la página y `click "aria/OK"`. |
| `The instrumentation process cannot be initialized` | UiAutomator2 no empezó a escuchar a tiempo. La sesión permite 240 s para ese lanzamiento, tras un máximo de 180 s para instalar el servidor. En un emulador por software, una CPU y un skin de 720×1280 llevan el apk v2.2.0 hasta la pantalla de inicio. Una imagen de 1080×2400 con dos CPU provoca un ANR en `system_server` y el servidor nunca escucha. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | El cliente se rindió mientras Appium todavía estaba creando la sesión. Android e iOS esperan 480 s para esa primera solicitud y no la vuelven a enviar. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` es para sesiones de navegador. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` es la llamada de Android. iOS usa `browser.touchId`. |
| `App not found:` | Pasa una ruta de apk que exista, o usa `--package` y `--activity` para una aplicación que ya esté instalada. |
| `Pass --package <id>.` | `deeplink` necesita `--package` en Android. |

## Próximos pasos

- [Snapshots y refs](/docs/session/snapshots): lee la pantalla después de `open`
- [Comandos](/docs/session-commands): todos los flags de `open`
- [wdio session](/docs/session): el ciclo predeterminado