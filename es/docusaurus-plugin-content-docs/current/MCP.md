---
id: mcp
title: MCP (Model Context Protocol)
description: "Permite que los asistentes de IA automaticen navegadores y aplicaciones móviles a través del servidor MCP de WebdriverIO, incluyendo instalación, uso con Claude y herramientas disponibles."
---

## ¿Qué puede hacer?

WebdriverIO MCP es un **servidor de Model Context Protocol (MCP)** que permite a los asistentes de IA automatizar e interactuar con navegadores web y aplicaciones móviles.

### ¿Por qué WebdriverIO MCP?

-   **Mobile-First**: A diferencia de los servidores MCP que solo admiten navegadores, WebdriverIO MCP admite la automatización de aplicaciones nativas de iOS y Android a través de Appium
-   **Selectores multiplataforma**: La detección inteligente de elementos genera automáticamente múltiples estrategias de localización (accessibility ID, XPath, UiAutomator, iOS predicates)
-   **Ecosistema de WebdriverIO**: Construido sobre el probado framework WebdriverIO con su amplio ecosistema de servicios y reporters

Proporciona una interfaz unificada para:

-   🖥️ **Navegadores de escritorio** (Chrome, Firefox, Edge, Safari, con interfaz gráfica o en modo headless)
-   📱 **Aplicaciones móviles nativas** (simuladores de iOS / emuladores de Android / dispositivos reales a través de Appium)
-   📳 **Aplicaciones móviles híbridas** (cambio de contexto entre nativo y WebView a través de Appium)
-   ☁️ **Dispositivos en la nube** (nubes de dispositivos reales y navegadores de BrowserStack, Sauce Labs, TestMu)

a través del paquete [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Esto permite a los asistentes de IA:

-   **Iniciar y controlar navegadores** con dimensiones configurables, modo headless y navegación inicial opcional
-   **Navegar por sitios web** e interactuar con elementos (hacer clic, escribir, desplazarse)
-   **Analizar el contenido de la página** mediante el árbol de accesibilidad y la detección de elementos visibles con soporte de paginación
-   **Tomar capturas de pantalla** optimizadas automáticamente (redimensionadas, comprimidas a un máximo de 1MB)
-   **Gestionar cookies** para el manejo de sesiones
-   **Controlar dispositivos móviles**, incluidos gestos (tocar, deslizar, arrastrar y soltar)
-   **Cambiar de contexto** en aplicaciones híbridas entre nativo y webview
-   **Ejecutar scripts**: JavaScript en navegadores, comandos móviles de Appium en dispositivos
-   **Manejar funciones del dispositivo** como rotación, teclado, geolocalización
-   y mucho más, consulta las opciones de [Herramientas](./mcp/tools) y [Configuración](./mcp/configuration)

:::info

NOTA para aplicaciones móviles
La automatización móvil requiere un servidor de Appium en ejecución con los drivers correspondientes instalados. Consulta [Requisitos previos](#prerequisites) para obtener instrucciones de configuración.

:::

## Instalación

La forma más sencilla de usar `@wdio/mcp` es mediante npx sin ninguna instalación local:

```sh
npx @wdio/mcp
```

O instálalo globalmente:

```sh
npm install -g @wdio/mcp
```

## Uso con Claude

Para usar WebdriverIO MCP con Claude, modifica el archivo de configuración:

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

Después de añadir la configuración, reinicia tu harness. Las herramientas de WebdriverIO MCP estarán disponibles para tareas de automatización de navegadores y dispositivos móviles.

### Uso con Claude Code

Claude Code detecta automáticamente los servidores MCP. Puedes configurarlo en el archivo `.claude/settings.json` o `.mcp.json` de tu proyecto.

O añádelo globalmente a .claude.json ejecutando:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Valídalo ejecutando el comando `/mcp` dentro de Claude Code.

## Ejemplos de inicio rápido

### Automatización de navegadores

Pide a Claude que automatice tareas del navegador:

```
"Open Chrome and navigate to https://webdriver.io"
"Click the 'Get Started' button"
"Take a screenshot of the page"
"Find all visible links on the page"
```

### Automatización de aplicaciones móviles

Pide a Claude que automatice aplicaciones móviles:

```
"Start my iOS app on the iPhone 15 simulator"
"Tap the login button"
"Swipe up to scroll down"
"Take a screenshot of the current screen"
```

## Capacidades

### Automatización de navegadores

| Funcionalidad | Descripción |
|---------|-------------|
| **Gestión de sesiones** | Inicia Chrome, Firefox, Edge o Safari en modo con interfaz gráfica/headless con dimensiones personalizadas; conéctate a una instancia existente de Chrome mediante CDP |
| **Navegación** | Navega a URLs; gestiona múltiples pestañas |
| **Interacción con elementos** | Haz clic en elementos, escribe texto, encuentra elementos mediante varios selectores |
| **Análisis de página** | Obtén elementos interactuables (con paginación) y el árbol de accesibilidad (con filtrado por rol) |
| **Capturas de pantalla** | Captura pantallas (optimizadas automáticamente a un máximo de 1MB) |
| **Desplazamiento** | Desplázate hacia arriba/abajo en cantidades de píxeles configurables |
| **Gestión de cookies** | Obtén, establece y elimina cookies |
| **Emulación de dispositivos** | Emula viewports de móvil/tableta en el navegador (requiere BiDi) |
| **Ejecución de scripts** | Ejecuta JavaScript personalizado en el contexto del navegador |

### Automatización de aplicaciones móviles (iOS/Android)

| Funcionalidad | Descripción |
|---------|-------------|
| **Gestión de sesiones** | Inicia aplicaciones en simuladores, emuladores o dispositivos reales |
| **Gestos táctiles** | Tocar (elemento o coordenadas), deslizar, arrastrar y soltar |
| **Detección de elementos** | Detección inteligente de elementos con múltiples estrategias de localización y paginación |
| **Ciclo de vida de la aplicación** | Obtén el estado de la aplicación (primer plano, segundo plano, no en ejecución, no instalada) |
| **Cambio de contexto** | Cambia entre contextos nativos y webview en aplicaciones híbridas |
| **Control del dispositivo** | Rota el dispositivo, controla el teclado, sobrescribe el GPS |
| **Permisos** | Manejo automático de permisos y alertas |
| **Ejecución de scripts** | Ejecuta comandos móviles de Appium (pressKey, deepLink, shell, etc.) |

### Proveedores en la nube

| Funcionalidad | Descripción |
|---------|-------------|
| **Sesiones de navegador** | Ejecuta sesiones de navegador en BrowserStack, Sauce Labs, TestMu o TestingBot (Windows, macOS, Linux) |
| **Sesiones móviles** | Ejecuta sesiones de aplicaciones en dispositivos reales a través de BrowserStack, Sauce Labs, TestMu o TestingBot |
| **Gestión de aplicaciones** | Sube archivos `.apk`/`.ipa`; lista las aplicaciones subidas previamente en los cuatro proveedores |
| **Túnel local** | Gestiona automáticamente los binarios de túnel específicos de cada proveedor para acceder a localhost |
| **Informes** | Etiqueta sesiones con etiquetas de proyecto/build/sesión (funciona de forma idéntica en todos los proveedores) |

## Requisitos previos

### Automatización de navegadores

-   **Chrome, Firefox, Edge o Safari** deben estar instalados
-   WebdriverIO se encarga de la gestión automatizada de drivers

### Automatización móvil

#### iOS

1. **Instala Xcode** desde la Mac App Store
2. **Instala las Xcode Command Line Tools**:
   ```sh
   xcode-select --install
   ```
3. **Instala Appium**:
   ```sh
   npm install -g appium
   ```
4. **Instala el driver XCUITest**:
   ```sh
   appium driver install xcuitest
   ```
5. **Inicia el servidor de Appium**:
   ```sh
   appium
   ```
6. **Para simuladores**: Abre Xcode → Window → Devices and Simulators para crear/gestionar simuladores
7. **Para dispositivos reales**: Necesitarás el UDID del dispositivo (identificador único de 40 caracteres)

#### Android

1. **Instala Android Studio** y configura el Android SDK
2. **Establece las variables de entorno**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Instala Appium**:
   ```sh
   npm install -g appium
   ```
4. **Instala el driver UiAutomator2**:
   ```sh
   appium driver install uiautomator2
   ```
5. **Inicia el servidor de Appium**:
   ```sh
   appium
   ```
6. **Crea un emulador** mediante Android Studio → Virtual Device Manager
7. **Inicia el emulador** antes de ejecutar las pruebas

## Arquitectura

### Cómo funciona

WebdriverIO MCP actúa como puente entre los asistentes de IA y la automatización de navegadores/dispositivos móviles:

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │   (stdio or HTTP)     │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Browser    │             │    Appium     │             │   Cloud        │
            │ (local/CDP)   │             │  (iOS/Android)│             │   Providers    │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Gestión de sesiones

-   **Modelo de sesión única**: Solo puede haber una sesión de navegador O de aplicación activa a la vez
-   **El estado de la sesión** se mantiene globalmente entre llamadas a herramientas
-   **Desconexión automática**: Las sesiones con estado preservado (`noReset: true`) se desconectan automáticamente al cerrarse

### Detección de elementos

#### Navegador (Web)

-   Utiliza un script de navegador optimizado para encontrar todos los elementos visibles e interactuables
-   Devuelve elementos con selectores CSS, IDs, clases e información ARIA
-   Admite filtrado por viewport y paginación

#### Móvil (aplicaciones nativas)

-   Utiliza un análisis eficiente del código fuente XML de la página (2 llamadas HTTP frente a más de 600 con consultas tradicionales)
-   Clasificación de elementos específica de cada plataforma para Android e iOS
-   Genera múltiples estrategias de localización por elemento:
    -   Accessibility ID (multiplataforma, el más estable)
    -   Resource ID / atributo Name
    -   Coincidencia por Text / Label
    -   XPath (completo y simplificado)
    -   UiAutomator (Android) / Predicates (iOS)

## Sintaxis de selectores

El servidor MCP admite múltiples estrategias de selectores. Consulta [Selectores](./mcp/selectors) para obtener documentación detallada.

### Web (CSS/XPath)

```
# Selectores CSS
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Selectores de texto (específicos de WebdriverIO)
button=Exact Button Text
a*=Partial Link Text
```

### Móvil (multiplataforma)

```
# Accessibility ID (recomendado - funciona en iOS y Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (funciona en ambas plataformas)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## Herramientas disponibles

El servidor MCP proporciona 29 herramientas para la automatización de navegadores y dispositivos móviles. Consulta [Herramientas](./mcp/tools) para ver la referencia completa.

| Herramienta | Plataforma | Descripción |
|------|----------|-------------|
| `start_session` | all | Inicia una sesión de navegador o móvil (local o en un proveedor en la nube) |
| `close_session` | all | Cierra o se desconecta de la sesión actual |
| `launch_chrome` | browser | Abre Chrome con depuración remota para conectarse mediante CDP |
| `navigate` | browser | Carga una URL en la pestaña actual |
| `get_tabs` | browser | Lista todas las pestañas abiertas |
| `switch_tab` | browser | Enfoca una pestaña por handle o índice |
| `switch_frame` | browser | Cambia a un iframe por selector, o vuelve al nivel superior |
| `click_element` | browser | Hace clic en un elemento |
| `set_value` | all | Escribe texto en un campo de entrada |
| `scroll` | browser | Desplaza la página hacia arriba o hacia abajo |
| `get_elements` | all | Obtiene elementos interactuables (con filtrado + paginación) |
| `get_accessibility_tree` | browser | Obtiene el árbol de accesibilidad (con filtrado por rol) |
| `get_screenshot` | all | Captura una pantalla (optimizada automáticamente) |
| `get_cookies` | browser | Obtiene todas las cookies o una cookie específica |
| `set_cookie` | browser | Establece una cookie del navegador |
| `delete_cookies` | browser | Elimina todas las cookies o una sola |
| `emulate_device` | browser | Emula el viewport de un dispositivo móvil/tableta |
| `execute_script` | all | Ejecuta JavaScript (navegador) o comandos de Appium (móvil) |
| `tap_element` | mobile | Toca un elemento o unas coordenadas de la pantalla |
| `swipe` | mobile | Gesto de deslizamiento en una dirección |
| `drag_and_drop` | mobile | Arrastra entre elementos o coordenadas |
| `get_contexts` | mobile | Lista los contextos nativos/webview disponibles |
| `switch_context` | mobile | Cambia entre contextos nativos y webview |
| `rotate_device` | mobile | Rota a vertical u horizontal |
| `hide_keyboard` | mobile | Oculta el teclado en pantalla |
| `set_geolocation` | all | Sobrescribe las coordenadas GPS del dispositivo |
| `get_app_state` | mobile | Obtiene el estado del ciclo de vida de la aplicación |
| `list_apps` | cloud | Lista las aplicaciones subidas (BrowserStack, Sauce Labs, TestMu, TestingBot) |
| `upload_app` | cloud | Sube un `.apk`/`.ipa` a un proveedor en la nube |

## Recursos MCP

Además de las herramientas, el servidor expone el estado de la sesión en vivo como recursos MCP. Consulta [Recursos](./mcp/resources) para ver la referencia completa.

| URI del recurso | Descripción |
|-------------|-------------|
| `wdio://sessions` | Índice de todas las sesiones |
| `wdio://session/current/elements` | Elementos interactuables (preferible a la captura de pantalla) |
| `wdio://session/current/screenshot` | Captura de pantalla en base64 |
| `wdio://session/current/accessibility` | Árbol de accesibilidad |
| `wdio://session/current/cookies` | Cookies del navegador |
| `wdio://session/current/tabs` | Pestañas abiertas del navegador |
| `wdio://session/current/contexts` | Contextos móviles disponibles |
| `wdio://session/current/context` | Contexto móvil activo |
| `wdio://session/current/app-state/{bundleId}` | Estado del ciclo de vida de la aplicación móvil |
| `wdio://session/current/geolocation` | Sobrescritura de GPS actual |
| `wdio://session/current/logs` | Logs de la sesión (consola del navegador, logcat, crashlog) |
| `wdio://session/current/capabilities` | Capabilities de WebDriver sin procesar |
| `wdio://session/current/code` | JS de WebdriverIO generado |
| `wdio://session/current/steps` | Registro de pasos de la sesión |
| `wdio://session/{sessionId}/code` | JS generado para una sesión anterior |
| `wdio://session/{sessionId}/steps` | Pasos de una sesión anterior |
| `wdio://browserstack/local-binary` | Instrucciones de configuración de BrowserStack Local |
| `wdio://saucelabs/local-binary` | Instrucciones de configuración de Sauce Connect Proxy |
| `wdio://testmu/local-binary` | Instrucciones de configuración de TestMu Tunnel |
| `wdio://testingbot/local-binary` | Instrucciones de configuración de TestingBot Tunnel |

## Manejo automático

### Permisos

Por defecto, el servidor MCP concede automáticamente los permisos de la aplicación (`autoGrantPermissions: true`), eliminando la necesidad de manejar manualmente los diálogos de permisos durante la automatización.

### Alertas del sistema

Las alertas del sistema (como "¿Permitir notificaciones?") se aceptan automáticamente por defecto (`autoAcceptAlerts: true`). Esto se puede configurar para que se descarten en su lugar con `autoDismissAlerts: true`.

## Transporte

Por defecto, el servidor se ejecuta sobre **stdio** (iniciado como un subproceso por el cliente de IA). Para clientes que no admiten MCP basado en subprocesos (llama.cpp, modo seguro de Codex), usa el **transporte HTTP**:

```bash
npx @wdio/mcp --http --port 3000
```

Consulta [Transporte](./mcp/transport) para ver todas las opciones, incluidas `--allowedHosts` y `--allowedOrigins`.

## Optimización del rendimiento

El servidor MCP está optimizado para una comunicación eficiente con asistentes de IA:

-   **Formato TOON**: Utiliza Token-Oriented Object Notation para un uso mínimo de tokens
-   **Análisis XML**: La detección de elementos móviles utiliza 2 llamadas HTTP (frente a más de 600 tradicionalmente)
-   **Compresión de capturas de pantalla**: Las imágenes se comprimen automáticamente a un máximo de 1MB
-   **Filtrado por viewport**: Por defecto solo se devuelven los elementos visibles
-   **Paginación**: Las listas grandes de elementos se pueden paginar para reducir el tamaño de la respuesta

## Manejo de errores

Todas las herramientas están diseñadas con un manejo de errores robusto:

-   Los errores se devuelven como contenido de texto (nunca se lanzan), manteniendo la estabilidad del protocolo MCP
-   Los mensajes de error descriptivos ayudan a diagnosticar problemas
-   El estado de la sesión se conserva incluso cuando fallan operaciones individuales

## Casos de uso

### Control de calidad

-   Ejecución de casos de prueba impulsada por IA
-   Pruebas de regresión visual con capturas de pantalla
-   Auditoría de accesibilidad mediante el análisis del árbol de accesibilidad

### Web scraping y extracción de datos

-   Navegar por flujos complejos de varias páginas
-   Extraer datos estructurados de contenido dinámico
-   Manejar la autenticación y la gestión de sesiones

### Pruebas de aplicaciones móviles

-   Automatización de pruebas multiplataforma (iOS + Android)
-   Validación de flujos de onboarding
-   Pruebas de deep linking y navegación

### Pruebas de integración

-   Pruebas de flujos de trabajo de extremo a extremo
-   Verificación de la integración entre API y UI
-   Comprobaciones de consistencia multiplataforma

## Solución de problemas

### El navegador no se inicia

-   Asegúrate de que el navegador de destino esté instalado
-   Comprueba que ningún otro proceso esté usando el puerto de depuración predeterminado (9222)
-   Prueba el modo headless si se producen problemas de visualización

### Falló la conexión con Appium

-   Verifica que el servidor de Appium esté en ejecución (`appium`)
-   Comprueba el host y el puerto de Appium en `appiumConfig`
-   Asegúrate de que el driver correspondiente esté instalado (`appium driver list`)

### Problemas con el simulador de iOS

-   Asegúrate de que Xcode esté instalado y actualizado
-   Comprueba que haya simuladores disponibles (`xcrun simctl list devices`)
-   Para dispositivos reales, verifica que el UDID sea correcto

### Problemas con el emulador de Android

-   Asegúrate de que el Android SDK esté configurado correctamente
-   Verifica que el emulador esté en ejecución (`adb devices`)
-   Comprueba que la variable de entorno `ANDROID_HOME` esté establecida

## Recursos

-   [Referencia de herramientas](./mcp/tools) - Lista completa de herramientas disponibles
-   [Referencia de recursos](./mcp/resources) - Recursos MCP para el estado de la sesión en vivo
-   [Guía de selectores](./mcp/selectors) - Documentación de la sintaxis de selectores
-   [Configuración](./mcp/configuration) - Opciones de configuración
-   [Transporte](./mcp/transport) - Configuración del transporte HTTP
-   [Proveedores en la nube](./mcp/cloud-providers) - Integración en la nube con BrowserStack, Sauce Labs, TestMu y TestingBot
-   [Preguntas frecuentes](./mcp/faq) - Preguntas frecuentes
-   [Repositorio de GitHub](https://github.com/webdriverio/mcp) - Código fuente e issues
-   [Paquete de NPM](https://www.npmjs.com/package/@wdio/mcp) - Paquete en npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - Especificación de MCP