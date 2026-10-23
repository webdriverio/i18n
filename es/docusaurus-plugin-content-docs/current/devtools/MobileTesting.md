---
id: mobile
title: Pruebas móviles
description: "Captura sesiones de Appium (navegador móvil, aplicaciones nativas e híbridas) en los modos en vivo y de traza de DevTools, y ejecuta los ejemplos móviles de cada adaptador."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

DevTools captura sesiones de Appium tanto en modo en vivo como en [Modo de traza](/docs/devtools/wdio/trace-mode). Lo que captura depende de una pregunta: **¿tiene esta sesión un documento web en este momento?**, porque cada volcado del DOM, script de página y lectura del viewport es un viaje de ida y vuelta que, sin documento, solo puede fallar.

## Tres tipos de sesión

| Sesión | Tiene un documento | Qué se captura |
|---|---|---|
| **Navegador móvil** (Chrome en Android, Safari en iOS) | siempre | Viaje en el tiempo del DOM, consola y reproducción como en escritorio; la red se obtiene del propio registro de la página, ya que Appium no ofrece BiDi (consulta [Registros de red](/docs/devtools/wdio/network-logs#without-webdriver-bidi)) |
| **Aplicación nativa** | nunca | comandos, capturas de pantalla y datos de elementos a partir del árbol XML de la plataforma; sin DOM |
| **Aplicación híbrida** | solo mientras está en un contexto webview | las partes nativas como una aplicación, las partes webview como una página |

El discriminador es el **nombre del navegador en las capabilities**, no el dispositivo: un navegador móvil declara uno, una aplicación nativa no declara ninguno. Tampoco se requiere un dispositivo: una sesión de Mac2, WinAppDriver o tvOS no tiene documento y se trata de la misma manera.

## Aplicaciones híbridas y el contexto activo

Una aplicación híbrida es el caso que las capabilities por sí solas no pueden resolver, porque la respuesta cambia durante la ejecución. Appium informa `NATIVE_APP` o un contexto webview, y **todo lo que no sea `NATIVE_APP` cuenta como webview**: el prefijo `WEBVIEW_` es una convención, y de lo contrario a un driver que nombrara su webview de otra forma se le omitiría la captura del DOM.

Seguir el contexto no cuesta ningún viaje de ida y vuelta adicional: el comando de cambio de contexto lleva su destino en sus propios argumentos, y un cambio fallido se ignora.

## Compatibilidad de los adaptadores

Los cuatro adaptadores detectan una sesión nativa y omiten en ella la captura del lado de la página. Se diferencian en las aplicaciones híbridas:

| Capacidad | WebdriverIO | Selenium | Nightwatch | Python |
|---|---|---|---|---|
| Sesión nativa detectada, captura del lado de la página omitida | ✅ | ✅ | ✅ | ✅ |
| Sigue a una aplicación híbrida hasta su webview | ✅ | ⚠️ ¹ | ⚠️ ¹ | ⚠️ ¹ |
| Red de aplicaciones nativas mediante appium-interceptor (`appium:intercept`) | ✅ | ✅ | ✅ | ✅ |

¹ Responde únicamente a partir de las capabilities de inicio, por lo que la parte webview de una sesión híbrida se captura como si siguiera siendo nativa: sin DOM para esas acciones.

El **dispositivo en sí** no necesita soporte del adaptador: se deriva de las capabilities de la sesión mediante el exportador de trazas compartido al escribir el archivo, y mediante el dashboard en una sesión en vivo cuyo adaptador no lo haya enviado. Por tanto, todos los adaptadores obtienen el marco del dispositivo.

## En el dashboard

Una captura de teléfono se enmarca como el dispositivo: una columna de dispositivo a altura completa con la lista de acciones y el panel al lado, **tanto** en modo en vivo como en el [reproductor de trazas](/docs/devtools/trace-player). El `context-options` de la traza registra la plataforma, el modelo y la versión del sistema operativo, que se vuelven a leer al abrirla para que el reproductor etiquete los fotogramas sin adivinar.

En una sesión nativa, la pestaña A11y y los datos de elementos provienen del árbol XML de la plataforma en lugar del DOM, por lo que los localizadores aparecen como `android=new UiSelector()…` o `-ios predicate string:…` en lugar de CSS o XPath sobre HTML.

## Red de aplicaciones nativas

Una aplicación nativa no tiene documento y Appium no ofrece eventos de red BiDi, por lo que, de forma predeterminada, la pestaña Network de una sesión nativa está vacía. En su lugar, todos los adaptadores pueden leer el tráfico de la aplicación desde el plugin [appium-interceptor](https://github.com/AppiumTestDistribution/appium-interceptor-plugin), que enruta el dispositivo a través de un proxy propio. Instala el plugin e inicia Appium con él:

```sh
appium plugin install --source=npm appium-interceptor
appium --use-plugins=appium-interceptor
```

Después, solicita el proxy con `appium:intercept: true` en las capabilities de la sesión (también se lee desde dentro de `appium:options`):

<Tabs groupId="devtools-mobile-network">
<TabItem value="wdio" label="WebdriverIO" default>

```ts
capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': '/path/to/app.apk',
    'appium:intercept': true
}]
```

</TabItem>
<TabItem value="selenium" label="Selenium (Node.js)">

```js
const driver = await new Builder()
  .usingServer('http://127.0.0.1:4723')
  .withCapabilities({
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': '/path/to/app.apk',
    'appium:intercept': true
  })
  .build()
```

</TabItem>
<TabItem value="nightwatch" label="Nightwatch">

```js
desiredCapabilities: {
  browserName: null,
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:app': '/path/to/app.apk',
  'appium:intercept': true
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from appium.options.android import UiAutomator2Options

options = UiAutomator2Options()
options.app = "/path/to/app.apk"
options.set_capability("appium:intercept", True)
```

</TabItem>
</Tabs>

El adaptador inicia un listener para cada sesión, incluida una que la reemplace a mitad de la ejecución, tanto en modo en vivo como en modo de traza. Lee lo que ha registrado el proxy como máximo cada 2 segundos entre comandos, porque cada lectura devuelve todo el historial, y siempre al final de cada prueba (antes de escribir el fragmento de traza de esa prueba) y al final de la sesión. Cada petición muestra su método, URL, estado, cabeceras y cuerpos. El plugin no registra tiempos, por lo que una petición se sitúa en el momento en que se leyó por primera vez y no muestra duración, y las peticiones que la aplicación realiza antes de que se inicie el listener (su tráfico de arranque) no se listan. Sin el plugin, el adaptador registra una advertencia y la sesión se ejecuta con normalidad.

Esto se aplica solo a sesiones nativas; una sesión de navegador móvil ya captura su red a través de la página. El plugin es compatible con Android. Para el tráfico HTTPS, la aplicación debe confiar en el certificado que el plugin instala en el dispositivo, algo que una compilación de release normalmente no hace (consulta la configuración de seguridad de red de Android).

## Qué no contiene una traza móvil

Las instantáneas por acción se emiten desde dentro del hook del comando, y Appium serializa una sonda detrás del comando que está observando. Por eso, cuando una sesión tiene un documento que sondear, esa instantánea se omite.

En la práctica: **las acciones en el webview de una aplicación híbrida no incluyen datos de elementos por acción, árbol de accesibilidad ni captura de pantalla de estabilización.** Las sesiones nativas, los navegadores móviles y todas las sesiones de escritorio no se ven afectadas. Las filas de comandos y sus capturas de pantalla, la consola y el propio archivo siempre se capturan. La red de un navegador móvil proviene del búfer de Resource Timing de la página y de su parche de `fetch` / `XMLHttpRequest` en lugar de BiDi, y una sesión nativa no tiene captura de red a menos que opte por el plugin appium-interceptor (consulta [Red de aplicaciones nativas](#native-app-network)), porque el driver no expone ninguna.

Estas ausencias son intencionadas. No son un fallo de captura, y son lo principal que hay que saber antes de depurar una traza híbrida.

## Ejecutar un ejemplo

El repositorio incluye un ejemplo móvil por adaptador, y los cuatro recorren el mismo
flujo, de modo que una diferencia entre dos dashboards es una diferencia en el adaptador
y no en la prueba.

Los ejemplos se encuentran en el [repositorio de devtools](https://github.com/webdriverio/devtools),
no en los paquetes de los adaptadores, así que instalar un adaptador en tu propio proyecto
no te proporciona estos scripts. Clona y compila ese repositorio una vez:

```sh
git clone https://github.com/webdriverio/devtools.git
cd devtools
pnpm install
pnpm build
```

El ejemplo de Python ejecuta el `python3` de tu `PATH`, así que instala primero en él el adaptador y
el cliente de Appium (un entorno virtual los mantiene fuera del
Python de tu sistema):

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -e packages/selenium-devtools-py
pip install -r examples/selenium-py/requirements-mobile.txt
```

Luego, con Appium y un dispositivo listos (consulta [Requisitos previos](#prerequisites)), ejecuta
cualquiera de ellos desde la raíz de ese checkout:

```sh
pnpm demo:wdio:mobile
pnpm demo:selenium:mobile
pnpm demo:nightwatch:mobile
pnpm demo:python:mobile
```

Controlan la **aplicación Reloj**, que viene incluida en todas las imágenes de sistema de Android, así que
no hay que proporcionar ningún `.apk`, nada que subir ni credenciales. El flujo
se mantiene en la pantalla de configuración del temporizador: abre la pestaña Temporizadores, borra la entrada hasta
cero, introduce una duración en el teclado, la vuelve a leer y la corrige con la tecla de borrar.

Deliberadamente, nunca **inician** un temporizador. Un temporizador en marcha sobrevive a la sesión
y reemplaza la pantalla de configuración por su tarjeta, por lo que una spec que inicia uno solo
se puede volver a ejecutar si también lo termina: una ejecución interrumpida rompería todas las
ejecuciones posteriores. No iniciarlo elimina ese tipo de fallo, y el teclado sigue
ejercitando aquello para lo que sirve un ejemplo: entrada real, cambio de estado real, capturado.

También evitan los chips de preajustes de Reloj, que parecen controles fijos y no lo
son: son sugerencias de duraciones usadas recientemente, por lo que un Reloj recién restablecido
ofrece solo el teclado, y un flujo basado en preajustes falla en cualquier dispositivo sin
historial de temporizadores, incluido el CI. Existen dos diseños de Reloj en una misma versión de la aplicación, y
el teclado es común a ambos.

`DEVTOOLS_MODE=trace` cambia cualquiera de ellos al modo de traza, `DEVTOOLS_MOBILE=web`
controla el navegador propio del dispositivo en lugar de una aplicación (Chrome en Android, Safari en
iOS) y `APPIUM_APP` apunta uno a una aplicación real. [`examples/MOBILE.md`](https://github.com/webdriverio/devtools/blob/main/examples/MOBILE.md)
en el repositorio es la guía de configuración completa.

## iOS

```sh
DEVTOOLS_MOBILE_PLATFORM=ios pnpm demo:wdio:mobile
```

**Los cuatro adaptadores.** Cada uno incluye un directorio de specs `android/` y otro `ios/`
y el runner elige entre ellos, por lo que el comando anterior funciona también con
`demo:selenium:mobile`, `demo:nightwatch:mobile` y `demo:python:mobile`.
La captura en sí nunca fue específica de una plataforma: lo que cada adaptador necesitaba era una
spec, no trabajo en el adaptador.

iOS controla **Ajustes**, no Reloj, porque Reloj no está instalado en el
simulador en absoluto: `xcrun simctl listapps` lista Ajustes, Calendario, Recordatorios,
Mapas y Safari, y ningún Reloj. Ajustes está en todos los simuladores y dispositivos,
que es la misma propiedad que convierte a Reloj en la elección para Android. El flujo
navega a General y vuelve, comprobando el título de la barra de navegación en cada sentido:
la misma forma que el flujo de Android, con la aplicación que la plataforma realmente incluye.

Android e iOS son **specs separadas**, no una sola spec con una bifurcación, porque no
comparten selectores: los localizadores de iOS son accessibility ids y etiquetas en lugar de
resource-ids.

`DEVTOOLS_MOBILE=web` también funciona aquí, y necesita menos que en Android:
abre **Safari**, que el driver XCUITest controla por sí mismo: no hay Chromedriver que
emparejar ni nada que añadir al comando `appium`.

**El simulador que se controla se resuelve a un udid, nunca a un nombre simple.** Nombrar
uno que no existe no falla: el driver XCUITest lo *crea* y
lo arranca, en cada ejecución, junto al simulador que ya está en marcha, dejando un nuevo
simulador cada vez. Por eso los ejemplos usan de forma predeterminada el simulador que
ya esté arrancado, y un `IOS_DEVICE_NAME` que no coincida con ninguno se rechaza mostrando
la lista de los arrancados, en lugar de pasarse tal cual.

Esa es una política **local**. `xcrun simctl` enumera simuladores locales y nada
más, así que `IOS_UDID` nombra un dispositivo directamente y no se comprueba contra nada (un
dispositivo real no tiene ninguna entrada con la que coincidir), y frente a un Appium remoto o en la nube
(`APPIUM_HOST` con cualquier valor distinto de localhost) el nombre de dispositivo se pasa directamente,
ya que nombrarlo es la forma en que ese servicio lo selecciona.

Además de los requisitos previos de Android, ninguno de los cuales usa iOS, necesitas Xcode (las
Command Line Tools no incluyen simuladores), un runtime de simulador
(`xcodebuild -downloadPlatform iOS`, una descarga aparte de ~8 GB), un simulador
arrancado y `appium driver install xcuitest`, cuya primera ejecución también compila
WebDriverAgent. Appium carga los drivers al **iniciarse**, por lo que un servidor que
ya estaba en marcha cuando instalaste el driver indicará que no encuentra
XCUITest hasta que lo reinicies.

## Requisitos previos

Ejecutar contra un emulador de Android local requiere, además de lo indicado en [Primeros pasos](/docs/devtools/getting-started):

1. **Java JDK** y el **Android SDK**, con `ANDROID_HOME` apuntando al SDK en el que realmente instala el `sdkmanager` de tu `PATH`, que no siempre es `~/Library/Android/sdk`.
2. **Un AVD y un emulador en ejecución**, o un dispositivo físico con la depuración USB activada.
3. **Appium con el driver UiAutomator2** (`appium driver install uiautomator2`), o el driver XCUITest para iOS; consulta [iOS](#ios) más arriba.
4. **Un Chromedriver compatible**, para un navegador móvil o una aplicación híbrida. Un webview se controla con Chromedriver, y la descarga automática de Appium con frecuencia no tiene una compilación que coincida con el Chrome de la imagen del sistema, en cualquiera de los dos sentidos. Se manifiesta como `No Chromedriver found that can automate Chrome '<version>'` al entrar en un webview, lo que parece un fallo de captura pero es una carencia del entorno. Inicia Appium con `--default-capabilities '{"appium:chromedriverExecutableDir": "<path>"}'` junto con `--allow-insecure=uiautomator2:chromedriver_autodownload`. **Una ejecución de aplicación nativa no necesita nada de esto.**
5. **Protocolo WebDriver clásico** para WebdriverIO: la capa BiDi de Appium para UiAutomator2 no implementa todos los comandos BiDi, así que establece `'wdio:enforceWebDriverClassic': true` en el bloque de capabilities.