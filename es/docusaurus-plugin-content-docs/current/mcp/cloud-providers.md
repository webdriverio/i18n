---
id: cloud-providers
title: Proveedores en la nube
description: "Ejecuta sesiones de navegador y móviles de WebdriverIO MCP en granjas de dispositivos en la nube, incluyendo credenciales, carga de aplicaciones, túneles e informes."
---

El servidor MCP de WebdriverIO tiene soporte nativo para ejecutar sesiones de automatización de navegador y móviles en granjas de dispositivos en la nube. No se requieren drivers, emuladores ni simuladores locales. Se admiten cuatro proveedores:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (navegadores) y [App Automate](https://www.browserstack.com/app-automate) (aplicaciones móviles)
- **Sauce Labs** — nube de dispositivos reales y navegadores virtuales de [Sauce Labs](https://saucelabs.com)
- **TestMu (anteriormente LambdaTest)** — nube de dispositivos reales y navegadores de [TestMu](https://www.lambdatest.com)
- **TestingBot** — nube de dispositivos reales y grid de navegadores de [TestingBot](https://testingbot.com)

Los cuatro proveedores comparten el mismo flujo de trabajo: configurar las credenciales, opcionalmente subir una aplicación móvil y luego llamar a `start_session` con el nombre del proveedor. Las etiquetas de informes, la configuración del túnel y el ciclo de vida de la aplicación móvil son idénticos en todos los proveedores.

## Requisitos previos

Configura tus credenciales como variables de entorno antes de iniciar el servidor MCP:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| Proveedor    | Variable de usuario     | Variable de clave de acceso | Dónde encontrarla                                                          |
| ------------ | ----------------------- | --------------------------- | -------------------------------------------------------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY`   | [Configuración de la cuenta](https://www.browserstack.com/accounts/settings) |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`          | [Configuración de usuario](https://app.saucelabs.com/user-settings)        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`         | [Configuración de la cuenta](https://accounts.lambdatest.com/detail/profile) |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`         | [Configuración de la cuenta](https://testingbot.com/membership)            |

## Automatización de navegadores

Ejecuta una sesión de navegador en cualquier proveedor en la nube configurando `provider` en `start_session`:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

Todos los proveedores admiten `browser`: `"chrome"`, `"firefox"`, `"edge"`, `"safari"`. Si omites `os` / `osVersion`, el proveedor utiliza valores predeterminados razonables (normalmente la última versión de Linux para sesiones de navegador).

### Regiones de Sauce Labs

Sauce Labs admite varias regiones de centros de datos. Configura el parámetro `region` en `start_session`:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

Valores admitidos: `"us-west-1"`, `"eu-central-1"` (predeterminado), `"apac-southeast-1"`.

## Automatización de aplicaciones móviles

El flujo de trabajo móvil tiene tres pasos, idénticos en todos los proveedores:

### Paso 1: Sube tu aplicación

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

Cada uno devuelve una referencia de la aplicación que usarás en `start_session`:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

Opcionalmente, puedes establecer un `customId` para tener referencias estables entre cargas:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

Para Sauce Labs, añade `region` para que coincida con tu región de almacenamiento (predeterminado `"eu-central-1"`).

### Paso 2: Lista las aplicaciones disponibles

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

Parámetros opcionales para todos los proveedores:
- `sortBy`: `"app_name"` o `"uploaded_at"` (predeterminado)
- `limit`: número máximo de resultados (predeterminado 20)

BrowserStack también admite `organizationWide: true` para listar todas las cargas de la organización. Sauce Labs acepta `region`.

### Paso 3: Inicia la sesión

Usa la referencia de la aplicación de `upload_app`, o un `customId`:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## Túnel local

Todos los proveedores admiten un túnel local para que las sesiones en la nube puedan acceder a servidores en tu máquina (localhost, entornos de staging, servicios internos).

El servidor MCP utiliza un **parámetro `tunnel` unificado** que funciona de forma idéntica en todos los proveedores:

### Túnel gestionado automáticamente (recomendado)

El servidor MCP inicia y detiene el túnel automáticamente:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

Antes de tu primera sesión con `tunnel: true`, el servidor MCP se encarga de descargar e iniciar el binario del túnel. Si quieres verificar la configuración manualmente, consulta el recurso del binario local del proveedor:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

El túnel se detiene automáticamente cuando cierras la sesión.

### Túnel externo

Si ya estás ejecutando el túnel en un proceso separado:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` indica al servidor MCP que ya hay un túnel en ejecución; establece los indicadores de capacidades apropiados, pero no inicia ni detiene ningún proceso. Configura `tunnelName` para que coincida con el túnel en ejecución.

### Configuración manual del túnel

Si prefieres ejecutar el túnel manualmente, consulta las instrucciones de configuración en el recurso MCP de tu proveedor y plataforma. Por ejemplo:

```text
// Read setup instructions (from your AI client)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

Cada recurso devuelve la URL de descarga, los comandos específicos de la plataforma y las instrucciones para ejecutarlo como daemon.

## Informes

Etiqueta las sesiones con etiquetas de proyecto, build y sesión para el panel del proveedor. Esto funciona de forma idéntica en todos los proveedores:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

Las sesiones aparecen en el panel del proveedor bajo el proyecto y el build especificados:
- BrowserStack: [Panel de Automate](https://automate.browserstack.com)
- Sauce Labs: [Resultados de pruebas](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Panel de automatización](https://automation.lambdatest.com)
- TestingBot: [Resultados de pruebas](https://testingbot.com/members)

## Notas específicas de cada proveedor

### BrowserStack

- Sesiones de navegador: `os` acepta `"Windows"` u `"OS X"`. Versiones de Windows: `"10"`, `"11"`. Versiones de macOS: `"Ventura"`, `"Sonoma"`, `"Sequoia"`.
- API de gestión de aplicaciones: `organizationWide: true` en `list_apps` lista todas las cargas del equipo.

### Sauce Labs

- **Las regiones importan.** La región predeterminada es `eu-central-1`. Si tu cuenta está en una región diferente, configura `region` en `start_session`, `list_apps` y `upload_app` para que coincida.
- Las sesiones móviles admiten `automationName` (`"XCUITest"` o `"UiAutomator2"`); los valores predeterminados son razonables para cada plataforma.
- El túnel Sauce Connect se gestiona automáticamente mediante el paquete npm `saucelabs`. No se necesita ningún binario externo para `tunnel: true`.

### TestMu

- El nombre del proveedor es `"testmu"` en `start_session`, `list_apps` y `upload_app`.
- Las sesiones de navegador se conectan a `hub.lambdatest.com`; las sesiones móviles se conectan a `mobile-hub.lambdatest.com`; esto se gestiona automáticamente.
- El túnel se gestiona automáticamente mediante el paquete npm `@lambdatest/node-tunnel`.
- La gestión de aplicaciones móviles obtiene las aplicaciones de Android e iOS mediante llamadas a la API separadas y luego combina los resultados.

### TestingBot

- El nombre del proveedor es `"testingbot"` en `start_session`, `list_apps` y `upload_app`.
- Tanto las sesiones de navegador como las móviles se conectan a `hub.testingbot.com` en el puerto 443 (se gestiona automáticamente).
- Las credenciales usan `TESTINGBOT_KEY` y `TESTINGBOT_SECRET` (no un par de usuario/clave de acceso como los demás proveedores).
- El túnel se gestiona automáticamente mediante el paquete npm `testingbot-tunnel-launcher` (requiere Java 11+).
- No hay parámetro de región: el hub de TestingBot es global.
- Se admite el modo de navegador/emulador móvil: configura `platform: "android"` o `"ios"` con un nombre de `browser` (p. ej., `"chrome"`) en lugar de `app`.