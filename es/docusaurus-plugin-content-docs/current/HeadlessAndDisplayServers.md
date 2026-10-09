---
id: headless-and-display-servers
title: Modo headless y servidores de pantalla
description: Ejecuta navegadores con interfaz gráfica y aplicaciones de escritorio en CI de Linux y en contenedores con la pantalla virtual Weston o Xvfb que inicia el testrunner, incluidas sus opciones, recetas para CI y solución de problemas.
---

En Linux, cuando no hay ninguna pantalla disponible, el testrunner inicia un servidor de pantalla virtual para la ejecución: [Weston](https://gitlab.freedesktop.org/wayland/weston) en modo headless o, como alternativa, [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer). Esta página explica cuándo ocurre esto, cómo configurarlo y cómo se comporta en CI y Docker. En la mayoría de los casos, basta con tener Weston o Xvfb instalado en tu imagen, o con `displayServerAutoInstall: true` en tu configuración.

## Cuándo usar una pantalla virtual frente al modo headless nativo

La pantalla virtual proporciona a los navegadores y aplicaciones una pantalla donde no la hay, como en los runners de CI y en los contenedores. Mantenla cuando:

- Pruebes aplicaciones de escritorio, que necesitan una ventana real.
- Tus pruebas necesiten un navegador con interfaz gráfica, por ejemplo para coincidir con capturas de referencia tomadas con un navegador visible.
- Chrome no se inicie con `DevToolsActivePort file doesn't exist` o `user data directory is already in use`, como se describe en [Solución de problemas](#troubleshooting).

Para pruebas de navegador que no necesitan una ventana visible, el modo headless nativo, como `--headless=new` de Chrome, tiene menos sobrecarga. Usa `displayServerEnabled: false` junto con él, o el testrunner seguirá iniciando un servidor de pantalla. Haz lo mismo cuando todos tus navegadores se ejecuten en un servicio en la nube o en un grid remoto, ya que nada local necesita una pantalla.

## Cómo funciona

El testrunner inicia un servidor de pantalla antes del hook `onPrepare` de cualquier servicio y establece su entorno en `process.env`:

| Variable | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | no se establece |
| `DISPLAY` | no se establece | la primera pantalla libre, como `:0` |
| `XDG_RUNTIME_DIR` | un directorio privado bajo `/tmp` para la ejecución | sin cambios |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

Los workers heredan estas variables, al igual que los drivers y las aplicaciones que los servicios inician en `onPrepare`. Los navegadores y los toolkits de interfaz gráfica eligen Wayland o X11 a partir de ellas. Con Weston, el `XDG_RUNTIME_DIR` privado reemplaza cualquier valor que tuvieras durante la ejecución.

El servidor de pantalla sigue en ejecución hasta que terminan los hooks `onComplete`, de modo que los servicios aún pueden usarlo mientras se cierran. Después, el testrunner lo detiene y restaura los valores anteriores. Si el proceso termina antes, incluso con Ctrl+C, el servidor de pantalla se cierra con él.

El testrunner solo inicia un servidor de pantalla cuando se cumplen todas estas condiciones:

- Se ejecuta en Linux.
- No están definidas ni `DISPLAY` ni `WAYLAND_DISPLAY`.
- `displayServerEnabled` no es `false`.

Si ya existe una pantalla, el testrunner la usa y no inicia nada. Si solo está definida `WAYLAND_DISPLAY`, por ejemplo por un Weston que inicia tu CI, el testrunner aun así establece `XDG_SESSION_TYPE`, `GDK_BACKEND` y `ELECTRON_OZONE_PLATFORM_HINT` en `wayland` para la ejecución. Esto garantiza que los navegadores usen la pantalla correcta al sobrescribir valores heredados, como `XDG_SESSION_TYPE=tty` de un inicio de sesión SSH, que los enviarían a X11, donde no hay servidor. Lo hace incluso con `displayServerEnabled: false`, que solo controla si se inicia un servidor de pantalla.

### Qué servidor de pantalla se usa

Con el valor predeterminado `displayServer: 'auto'`, el testrunner prueba primero Weston y después Xvfb. Los servidores instalados se prueban antes de instalar nada, por lo que se usa un Xvfb existente en lugar de instalar Weston. Si Weston no se inicia, el testrunner recurre a Xvfb. Si no se inicia ningún servidor de pantalla, el testrunner registra una advertencia y la ejecución continúa sin él. Con `displayServer: 'wayland'` o `displayServer: 'xvfb'`, el testrunner solo prueba ese servidor.

Se admite Weston 10 y versiones posteriores. Ubuntu 22.04 y Debian 11 incluyen Weston 9, y Enterprise Linux 9 con EPEL habilitado obtiene Weston 8, así que usa `displayServer: 'xvfb'` en ellos. Weston se inicia sin Xwayland, por lo que no proporciona `DISPLAY`. Si tus pruebas o herramientas necesitan X11, por ejemplo `xdotool`, `xclip` o una aplicación Java, usa `displayServer: 'xvfb'`.

### Foco de ventana

Todos los workers usan la misma pantalla. En WebdriverIO v9, cada worker se envolvía en `xvfb-run` y obtenía su propia pantalla, por lo que su navegador siempre tenía el foco. Ahora los navegadores basados en Chromium, como Chrome y Edge, pueden carecer de foco: con Weston ninguna ventana obtiene el foco, y con Xvfb solo lo tiene la ventana abierta más recientemente. La entrada de WebDriver sigue llegando a la página, pero `document.hasFocus()` devuelve `false`, los eventos `focus` no se disparan y los estilos `:focus` no se aplican. Si tus pruebas dependen del foco, activa la emulación de foco, un comando experimental del Chrome DevTools Protocol (CDP) que persiste entre cargas de página:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

Firefox no se ve afectado, ya que bajo WebDriver trata sus páginas como si tuvieran el foco.

### Scripts independientes

El testrunner inicia el servidor de pantalla por sí mismo. Un script independiente que llama a `remote()` puede iniciar uno con `startDisplayDaemonFromConfig` de `@wdio/display-server`. Acepta las mismas opciones `displayServer*`, establece las variables de la pantalla en `process.env` para que el navegador las herede y las restaura al llamar a `stop()`:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// null fuera de Linux, cuando ya existe una pantalla X11 o cuando no se inicia ninguna. Con una pantalla
// Wayland existente, devuelve un handle cuyo stop() restaura las variables de sesión que estableció.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

También puedes ejecutar el script con `xvfb-run`, como en [Usar una pantalla existente](#using-an-existing-display).

## Configuración del navegador

### Navegadores que inicia WebdriverIO

Estos navegadores no necesitan configuración:

- Chrome y Edge 140 y posteriores, y Chrome for Testing 135 y posteriores, siguen el `XDG_SESSION_TYPE=wayland` que establece el servidor de pantalla.
- Las versiones anteriores de Chrome y Edge ignoran `XDG_SESSION_TYPE`. Para ellas, WebdriverIO añade `--ozone-platform=wayland` a los argumentos de cada Chrome y Edge que inicia mientras Wayland está activo sin un servidor X, a menos que los argumentos ya establezcan `--ozone-platform` o `--headless`.
- Aplicaciones Electron: Electron 38 y posteriores siguen `XDG_SESSION_TYPE`, y Electron 28 a 37 siguen `ELECTRON_OZONE_PLATFORM_HINT`, que el servidor de pantalla también establece. Electron 27 y anteriores dependen del flag `--ozone-platform=wayland`, que WebdriverIO añade cuando inicia la aplicación a través de Chromedriver.
- Firefox y las aplicaciones GTK, como las aplicaciones Tauri, eligen Wayland a partir de `WAYLAND_DISPLAY` y `GDK_BACKEND`. Firefox anterior a la versión 120 no está probado.

### Navegadores que WebdriverIO no inicia

Los navegadores en un grid o en un servicio en la nube no necesitan configuración, ya que se ejecutan en la pantalla del host remoto.

Los navegadores locales que inicia otro componente, como un driver que iniciaste tú, un servidor Appium o el propio lanzador de un servicio, no reciben el flag `--ozone-platform=wayland` de WebdriverIO. Chrome y Edge 140 y posteriores, y Electron 28 y posteriores, no lo necesitan, ya que siguen las variables de sesión, pero las versiones anteriores de Chrome y Edge sí. Qué hacer depende de cuándo se inicia el navegador:

- **Durante la ejecución**, por ejemplo desde el `onPrepare` de un servicio, los navegadores más recientes no necesitan nada, ya que heredan la pantalla y las variables de sesión. Para las versiones anteriores de Chrome y Edge, puedes:
  - establecer `displayServer: 'xvfb'` para usar Xvfb, o
  - establecer `displayServer: 'wayland'` y añadir `--ozone-platform=wayland` a sus argumentos para usar Weston.
- **Antes de WebdriverIO**, por ejemplo desde un paso anterior de CI u otra shell, no pueden usar un servidor de pantalla que inicie WebdriverIO, ya que no heredan sus variables. Inicia la pantalla tú mismo, como en [Usar una pantalla existente](#using-an-existing-display), y:
  - usa Xvfb, que no necesita nada más, o
  - usa Weston, luego exporta `XDG_SESSION_TYPE=wayland` (Chrome y Edge 140 y posteriores, Electron 38 y posteriores) o `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron 28 a 37), y añade `--ozone-platform=wayland` a los argumentos de las versiones anteriores de Chrome y Edge.

## Configuración

Todas las opciones se enumeran en la [referencia de configuración](/docs/configuration#displayserverenabled). Por ejemplo:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Instala un servidor de pantalla si no hay ninguno instalado
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Usa siempre Xvfb con un tamaño menor, instalado mediante un comando personalizado que asume un contenedor root
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

El comando personalizado es compartido por ambos servidores. Con `displayServer: 'auto'`, se ejecuta primero para Weston, y de nuevo para Xvfb solo si Weston sigue sin estar disponible o no se inicia y Xvfb sigue sin estar instalado. Establece `displayServer` en el servidor que instala tu comando, como hace este ejemplo.

Las opciones de v9 `autoXvfb` y `xvfb*` están obsoletas y se eliminarán en v11. Consulta la [guía de migración a v10](/docs/v10-migration#virtual-displays-on-linux) para ver sus reemplazos.

## CI y Docker

Preinstala un servidor de pantalla en tu imagen, o establece `displayServerAutoInstall: true` para instalar uno cuando comience la ejecución.

### Preinstalar un servidor de pantalla

#### Weston

En Ubuntu 24.04 o Debian 12 y posteriores:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

En RHEL 10 y Oracle Linux 10, habilita EPEL y CodeReady Builder tú mismo, siguiendo la [documentación de EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/), y después instala `weston`.

Para envolver el testrunner en un Weston propio, como en [Usar una pantalla existente](#using-an-existing-display), instala también `xwayland-run`. Está empaquetado para Debian 13, Ubuntu 24.04, Fedora y openSUSE Tumbleweed. Sin él, tendrás que iniciar Weston en segundo plano con su propio `XDG_RUNTIME_DIR` y `WAYLAND_DISPLAY`, y esperar a su socket antes de iniciar WebdriverIO. Como alternativa, usa Xvfb.

#### Xvfb

En Ubuntu o Debian:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04 y Debian 11 incluyen un Weston demasiado antiguo, así que usa Xvfb en ellos. Con solo Xvfb instalado, el testrunner lo usa sin configuración adicional.

Para otras distribuciones, usa los nombres de paquete de [Compatibilidad con la instalación automática](#automatic-installation-support).

### Usar una pantalla existente

Si tu CI ya proporciona una pantalla, el testrunner la usa y no inicia nada.

Para usar Weston, envuelve el testrunner con `wlheadless-run` del paquete `xwayland-run`. Proporciona a Weston un directorio de ejecución privado y espera a su socket, y los flags coinciden con el Weston que inicia el testrunner:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Para usar Xvfb, envuelve el testrunner con `xvfb-run`:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## Compatibilidad con la instalación automática

`displayServerAutoInstall` funciona con los gestores de paquetes siguientes. Las instalaciones son no interactivas y agotan el tiempo de espera tras 240 segundos. Con cualquier otro gestor de paquetes, instala el servidor de pantalla tú mismo.

| Gestor de paquetes | Distribuciones | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- En Arch Linux, la instalación ejecuta `pacman -Syu`, una actualización completa del sistema, ya que Arch no admite actualizaciones parciales. En una imagen desactualizada esto puede superar el límite de 240 segundos, así que preinstala allí el servidor de pantalla.
- Enterprise Linux 10 no tiene Xvfb e incluye Weston solo en EPEL, que necesita CRB. En CentOS Stream, AlmaLinux y Rocky Linux, la instalación habilita ambos y los deja habilitados. En RHEL y Oracle Linux, configúralos tú mismo, como en [Preinstalar un servidor de pantalla](#preinstalling-a-display-server).

## Logs

El servidor de pantalla se ejecuta en el proceso del launcher, por lo que sus mensajes están en el log del launcher: `wdio.log` en tu `outputDir`, o la terminal si `outputDir` no está definido. El log muestra qué servidor de pantalla se inició y las variables que estableció. Para obtener más detalle, aumenta su nivel de log:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## Solución de problemas

### Chrome falla con `DevToolsActivePort file doesn't exist`

El mensaje completo es `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. Una causa habitual es un Chrome con interfaz gráfica sin una pantalla en la que abrir su ventana. Revisa el [log del launcher](#logs) para ver qué servidor de pantalla se inició. Si no se inició ninguno, consulta [El log del launcher muestra `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). Si tus pruebas no necesitan una ventana visible, usa en su lugar el modo headless nativo, como en [Cuándo usar una pantalla virtual frente al modo headless nativo](#when-to-use-a-virtual-display-vs-native-headless).

### Chrome falla con `user data directory is already in use`

El mensaje completo empieza por `session not created: probably user data directory is already in use`. A menudo es engañoso: normalmente significa que el navegador falló y se reinició con el directorio de perfil de la instancia anterior. Una pantalla estable suele resolverlo. Si no, pasa un `--user-data-dir` único por worker.

### El log del launcher muestra `No display server could be started`

El mensaje completo es `No display server could be started; continuing without a virtual display`. No hay ningún servidor de pantalla instalado, o no se inició ninguno. Los mensajes anteriores indican el motivo:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` o `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: no hay nada instalado y la instalación automática está desactivada.
- `wayland failed to start: ...` o `xvfb failed to start: ...`: a continuación aparece la salida de error del servidor.
- `Failed to install Weston` o `Failed to install Xvfb`: la instalación falló.
- `wayland still not found after installing` o `xvfb still not found after installing`: la instalación se completó pero no proporcionó ese servidor, por ejemplo porque un `displayServerAutoInstallCommand` personalizado instala solo el otro. Establece `displayServer` en el servidor que instala tu comando.

Instala Weston o Xvfb en tu imagen, o establece `displayServerAutoInstall: true`.

### Xvfb termina con `Failed to find a socket to listen on`

Xvfb crea su socket en `/tmp/.X11-unix`. Si ese directorio existe, el usuario de las pruebas debe poder escribir en él, como ocurre con el modo `1777`.

### Chrome o Electron fallan con Weston con `Missing X server or $DISPLAY`

El navegador intentó usar X11 en lugar de Wayland. Si no lo inició WebdriverIO, consulta [Navegadores que WebdriverIO no inicia](#browsers-webdriverio-doesnt-launch). En caso contrario, elimina `--ozone-platform=x11` de sus argumentos.

### Las pruebas que dependen del foco fallan en Chrome o Edge

`document.hasFocus()` devuelve `false` porque las páginas en la pantalla compartida pueden carecer de foco. Activa la emulación de foco, como en [Foco de ventana](#window-focus).

### Una herramienta o aplicación X11 falla con Weston con `cannot open display` o `Can't open display`

Weston no proporciona `DISPLAY`. Establece `displayServer: 'xvfb'` para que el testrunner inicie Xvfb en su lugar. Si iniciaste Weston tú mismo, envuelve la ejecución con `xvfb-run`, ya que el testrunner usa una pantalla existente en lugar de iniciar una.

## Próximos pasos

- Referencia de [Configuración](/docs/configuration#displayserverenabled) para cada opción `displayServer*`.
- [Guía de migración a v10](/docs/v10-migration#virtual-displays-on-linux) para los reemplazos de las opciones de v9 `autoXvfb` y `xvfb*`.
- [Docker](/docs/docker) y [GitHub Actions](/docs/githubactions) para ejecutar tu suite en CI.
- [Aplicaciones de escritorio](/docs/platforms/desktop#linux) para Electron, Tauri y Dioxus en Linux.