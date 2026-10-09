---
id: configuration
title: Configuración
description: "Configura el servidor MCP de WebdriverIO, incluidas las opciones de sesión, navegador, dispositivos móviles, proveedores en la nube, detección de elementos y Appium."
---

Esta página documenta todas las opciones de configuración del servidor MCP de WebdriverIO.

## Configuración del servidor MCP

El servidor MCP se configura mediante archivos de configuración o comandos.

### Configuración básica

Edita tu archivo de configuración de MCP (p. ej., `./.mcp.json`) y añade lo siguiente:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

## Opciones de sesión

Todas las opciones de sesión se pasan a la herramienta `start_session`. Existe una única herramienta unificada para sesiones de navegador y móviles; el parámetro `platform` determina el tipo de sesión.

### Opciones comunes

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

La plataforma que se va a automatizar.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

Dónde se ejecuta la sesión. Usa el nombre de un proveedor en la nube para dispositivos remotos; cada uno requiere sus propias variables de entorno. Consulta [Proveedores en la nube](./cloud-providers) para más detalles.

</Option>
## Opciones de sesión de navegador

Opciones para sesiones con `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

Navegador que se va a iniciar.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

Versión del navegador. Solo para proveedores en la nube (predeterminado: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

Sistema operativo para sesiones de navegador en proveedores en la nube. Ejemplos: `os: "Windows"`, `osVersion: "11"` o `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

Ejecuta el navegador en modo headless (sin ventana visible). Establécelo en `false` para ver el navegador.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **Rango:** `400` - `3840`

Ancho inicial de la ventana del navegador en píxeles.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **Rango:** `400` - `2160`

Alto inicial de la ventana del navegador en píxeles.

</Option>
### `navigationUrl`

<Option type="string" required="No">

URL a la que navegar inmediatamente después de iniciar el navegador. Es más eficiente que llamar a `start_session` y luego a `navigate` por separado.

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

Se conecta a una instancia existente de Chrome en lugar de iniciar una nueva. Úsalo después de `launch_chrome` para conectarte mediante CDP.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

Configuración de conexión de depuración remota de Chrome. Solo se aplica cuando `attach: true`.

</Option>
## Opciones de sesión móvil

Opciones para sesiones con `platform: "ios"` o `platform: "android"`.

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

Nombre del dispositivo, simulador o emulador.

**Ejemplos:**
-   Simulador de iOS: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Emulador de Android: `"Pixel 7"`, `"Nexus 5X"`
-   Dispositivo real: el nombre del dispositivo tal como aparece en tu sistema

</Option>
### `platformVersion`

<Option type="string" required="No">

Versión del sistema operativo del dispositivo/simulador/emulador (p. ej., `"18.0"` para iOS, `"14"` para Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

Driver de automatización. De forma predeterminada es `XCUITest` para iOS y `UiAutomator2` para Android.

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

Identificador único del dispositivo (Unique Device Identifier). Obligatorio para dispositivos iOS reales (identificador de 40 caracteres).

**Cómo encontrar el UDID:**
-   **iOS:** Conecta el dispositivo, abre Finder, haz clic en el dispositivo → Número de serie (haz clic para mostrar el UDID)
-   **Android:** Ejecuta `adb devices` en la terminal

</Option>
### `appPath`

<Option type="string" required="No">

Ruta al archivo de la aplicación que se va a instalar e iniciar.

**Formatos compatibles:**
-   Simulador de iOS: directorio `.app`
-   Dispositivo iOS real: archivo `.ipa`
-   Android: archivo `.apk`

Se debe proporcionar `appPath`, o bien `noReset: true` para conectarse a una aplicación que ya se esté ejecutando.

</Option>
### `app`

<Option type="string" required="No">

URL de la aplicación en el proveedor en la nube (`bs://...` para BrowserStack, `storage:filename=` para Sauce Labs, `lt://...` para TestMu, app_url de TestingBot) o `customId`. Se usa en lugar de `appPath` para sesiones móviles en la nube.

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

Activity que se debe esperar al iniciar la aplicación. Si no se especifica, se usa la activity principal/launcher de la aplicación.

**Ejemplo:** `"com.example.app.MainActivity"`

</Option>
### Opciones de estado de la sesión

#### `noReset`

<Option type="boolean" required="No">

Conserva el estado de la aplicación entre sesiones. Cuando es `true`:
-   Se conservan los datos de la aplicación (estado de inicio de sesión, preferencias, etc.)
-   La sesión se **desconectará (detach)** en lugar de cerrarse (mantiene la aplicación en ejecución)
-   Se puede usar sin `appPath` para conectarse a una aplicación que ya se esté ejecutando

</Option>
#### `fullReset`

<Option type="boolean" required="No">

Restablece completamente la aplicación antes de la sesión:
-   iOS: desinstala y vuelve a instalar la aplicación
-   Android: borra los datos y la caché de la aplicación

Establece `fullReset: false` junto con `noReset: true` para conservar por completo el estado de la aplicación.

</Option>
### Tiempo de espera de la sesión

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

Cuánto tiempo (en segundos) esperará Appium un nuevo comando antes de finalizar la sesión. Auméntalo para sesiones de depuración más largas.

</Option>
### Gestión automática

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

Concede automáticamente los permisos de la aplicación al instalarla/iniciarla (cámara, micrófono, ubicación, etc.).

:::note Solo Android
Esta opción afecta principalmente a Android. Los permisos de iOS deben gestionarse de otra manera debido a restricciones del sistema.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

Acepta automáticamente las alertas del sistema (diálogos) durante la automatización ("¿Permitir notificaciones?", etc.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

Descarta las alertas del sistema en lugar de aceptarlas. Tiene prioridad sobre `autoAcceptAlerts` cuando es `true`.

</Option>
### Conexión al servidor Appium

Sobrescribe la conexión al servidor Appium para cada sesión usando `appiumConfig`:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

Conexión al servidor Appium. De forma predeterminada es `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Opciones de proveedores en la nube

### Credenciales

Cada proveedor en la nube requiere sus propias variables de entorno:

| Proveedor    | Variable de usuario     | Variable de clave de acceso |
| ------------ | ----------------------- | --------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY`   |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`          |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`         |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`         |

Configúralas antes de iniciar el servidor MCP.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

Región del centro de datos de Sauce Labs. Se ignora para otros proveedores.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

Habilita el enrutamiento mediante túnel local para sesiones en proveedores en la nube (acceso a localhost, entornos de staging, servicios internos).

-   `true` — Inicia automáticamente el túnel antes de la sesión y lo detiene al cerrarla
-   `"external"` — El túnel ya se está ejecutando externamente; solo establece los flags apropiados para el proveedor

Antes de usar `true`, lee el recurso local-binary del proveedor (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` o `wdio://testingbot/local-binary`) para obtener instrucciones de configuración específicas para tu sistema operativo y arquitectura.

</Option>
### `tunnelName`

<Option type="string" required="No">

Nombre identificador del túnel. Obligatorio cuando `tunnel: "external"` para que coincida con el túnel en ejecución. Cuando `tunnel: true`, se genera automáticamente un nombre único si no se proporciona.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

Etiquetas de sesión del proveedor en la nube visibles en el panel del proveedor. Funciona de forma idéntica en BrowserStack, Sauce Labs, TestMu y TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

Habilita la grabación de trazas. Genera un archivo zip `.trace` compatible con Playwright que se guarda en `.trace/` al ejecutar `close_session`. Visualiza las trazas en [player.vibium.dev](https://player.vibium.dev).

</Option>
## Opciones de detección de elementos

Opciones para la herramienta `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

Devuelve solo los elementos visibles en el viewport actual. Establécelo en `true` para reducir los resultados en páginas largas.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

Incluye elementos contenedores/de diseño en los resultados:

**Contenedores de Android:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**Contenedores de iOS:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

Incluye las coordenadas del cuadro delimitador del elemento (x, y, ancho, alto) en la respuesta.

</Option>
### Paginación

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Número máximo de elementos que se devolverán.

</Option>
#### `offset`

<Option type="number" default="0" required="No">

Número de elementos que se omitirán antes de devolver resultados.

**Ejemplo:** Obtener los elementos 21–40:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Opciones del árbol de accesibilidad

Opciones para la herramienta `get_accessibility_tree` (solo navegador).

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Número máximo de nodos que se devolverán.

</Option>
### `offset`

<Option type="number" default="0" required="No">

Número de nodos que se omitirán para la paginación.

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

Filtra por roles de accesibilidad específicos.

**Roles comunes:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Ejemplo:** Obtener solo botones y enlaces:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Captura de pantalla

La herramienta `get_screenshot` no recibe parámetros. Las capturas de pantalla se procesan automáticamente:

| Optimización         | Valor    | Descripción                                                      |
| -------------------- | -------- | ---------------------------------------------------------------- |
| Dimensión máxima     | 2000px   | Las imágenes de más de 2000px se reducen                         |
| Tamaño máximo        | 1MB      | Las imágenes se comprimen para mantenerse por debajo de 1MB      |
| Formato              | PNG/JPEG | PNG con compresión máxima; JPEG si es necesario por el tamaño    |

## Comportamiento de la sesión

### Tipos de sesión

| Tipo      | Descripción                  | Desconexión automática                    |
| --------- | ---------------------------- | ----------------------------------------- |
| `browser` | Sesión de navegador          | No                                        |
| `ios`     | Sesión de aplicación iOS     | Sí (si `noReset: true` o no hay `appPath`) |
| `android` | Sesión de aplicación Android | Sí (si `noReset: true` o no hay `appPath`) |

### Modelo de sesión única

El servidor MCP funciona con un **modelo de sesión única**:

-   Solo puede haber una sesión de navegador O de aplicación activa a la vez
-   Iniciar una nueva sesión cerrará/desconectará la sesión actual
-   El estado de la sesión se mantiene de forma global entre llamadas a herramientas

### Desconectar vs. cerrar

| Acción          | `detach: false` (Cerrar)               | `detach: true` (Desconectar)                         |
| --------------- | -------------------------------------- | ---------------------------------------------------- |
| Navegador       | Cierra el navegador por completo       | Mantiene el navegador en ejecución, desconecta WebDriver |
| App móvil       | Finaliza la aplicación                 | Mantiene la aplicación en ejecución en su estado actual |
| Caso de uso     | Empezar de cero en la siguiente sesión | Conservar el estado, inspección manual               |

## Consideraciones de rendimiento

### Automatización de navegador

-   El **modo headless** es más rápido, pero no renderiza los elementos visuales
-   Los **tamaños de ventana más pequeños** reducen el tiempo de captura de pantalla
-   La **detección de elementos** está optimizada con una única ejecución de script
-   La **optimización de capturas de pantalla** mantiene las imágenes por debajo de 1MB para un procesamiento eficiente

### Automatización móvil

-   El **análisis del código fuente XML de la página** usa solo 2 llamadas HTTP (frente a más de 600 de las consultas de elementos tradicionales)
-   Los **selectores de Accessibility ID** son los más rápidos y fiables
-   Los **selectores XPath** son los más lentos; úsalos solo como último recurso
-   La **paginación** (`limit` y `offset`) reduce el uso de tokens en pantallas con muchos elementos

### Consejos sobre el uso de tokens

| Ajuste                     | Impacto                                                        |
| -------------------------- | -------------------------------------------------------------- |
| `inViewportOnly: true`     | Filtra los elementos fuera de pantalla, reduciendo el tamaño de la respuesta |
| `includeContainers: false` | Excluye los elementos de diseño (ViewGroup, etc.)              |
| `includeBounds: false`     | Omite los datos de x/y/ancho/alto                              |
| `limit` con paginación     | Procesa los elementos por lotes en lugar de todos a la vez     |

## Configuración del servidor Appium

Antes de usar la automatización móvil, asegúrate de que Appium esté configurado correctamente.

### Configuración básica

```sh
# Instalar Appium globalmente
npm install -g appium

# Instalar drivers
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Iniciar el servidor
appium
```

### Configuración personalizada del servidor

```sh
# Iniciar con host y puerto personalizados
appium --address 0.0.0.0 --port 4724

# Iniciar con registro de logs
appium --log-level debug

# Iniciar con una ruta base específica
appium --base-path /wd/hub
```

### Verificar la instalación

```sh
# Comprobar los drivers instalados
appium driver list --installed

# Comprobar la versión de Appium
appium --version

# Probar la conexión
curl http://localhost:4723/status
```

## Solución de problemas de configuración

### El servidor MCP no se inicia

1. Verifica que npm/npx esté instalado: `npm --version`
2. Intenta ejecutarlo manualmente: `npx @wdio/mcp`
3. Revisa los logs de tu harness en busca de errores

### Problemas de conexión con Appium

1. Verifica que Appium se esté ejecutando: `curl http://localhost:4723/status`
2. Comprueba que `appiumConfig` en `start_session` coincida con la configuración del servidor Appium
3. Asegúrate de que el firewall permita conexiones en el puerto de Appium

### La sesión no se inicia

1. **Navegador:** Asegúrate de que el navegador de destino esté instalado
2. **iOS:** Verifica que Xcode y los simuladores estén disponibles
3. **Android:** Comprueba `ANDROID_HOME` y que el emulador se esté ejecutando
4. Revisa los logs del servidor Appium para ver mensajes de error detallados

### Tiempos de espera de la sesión

Si las sesiones agotan el tiempo de espera durante la depuración:
1. Aumenta `newCommandTimeout` al iniciar la sesión
2. Usa `noReset: true` para conservar el estado entre sesiones
3. Usa `detach: true` al cerrar para mantener la aplicación en ejecución