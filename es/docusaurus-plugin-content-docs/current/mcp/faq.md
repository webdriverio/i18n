---
id: faq
title: Preguntas frecuentes
description: "Encuentra respuestas a preguntas comunes sobre la instalación, el uso y la solución de problemas del servidor MCP de WebdriverIO para la automatización de navegadores y dispositivos móviles."
---

Preguntas frecuentes sobre WebdriverIO MCP.

## General

### ¿Qué es MCP?

MCP (Model Context Protocol) es un protocolo abierto que permite a asistentes de IA como Claude interactuar con herramientas y servicios externos. WebdriverIO MCP implementa este protocolo para proporcionar capacidades de automatización de navegadores y dispositivos móviles a Claude Desktop y Claude Code.

### ¿Qué puedo automatizar con WebdriverIO MCP?

Puedes automatizar:
-   **Navegadores de escritorio** (Chrome, Firefox, Edge, Safari): navegación, clics, escritura, capturas de pantalla
-   **Aplicaciones iOS**: en simuladores o dispositivos reales
-   **Aplicaciones Android**: en emuladores o dispositivos reales
-   **Aplicaciones híbridas**: cambiando entre contextos nativos y web
-   **Dispositivos en la nube**: a través de las nubes de dispositivos de BrowserStack, Sauce Labs, TestMu y TestingBot

### ¿Necesito escribir código?

¡No! Esa es la principal ventaja de MCP. Puedes describir lo que quieres hacer en lenguaje natural, y Claude utilizará las herramientas adecuadas para realizar la tarea.

**Ejemplos de prompts:**
-   "Abre Chrome y navega a webdriver.io"
-   "Haz clic en el botón Get Started"
-   "Toma una captura de pantalla de la página actual"
-   "Inicia mi aplicación iOS e inicia sesión como usuario de prueba"

## Instalación y configuración

### ¿Cómo instalo WebdriverIO MCP?

No necesitas instalarlo por separado. El servidor MCP se ejecuta automáticamente mediante npx cuando lo configuras en tu entorno. Añade esto a tu configuración:

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

### ¿Dónde está el archivo de configuración de Claude Desktop?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### ¿Necesito Appium para la automatización de navegadores?

No. La automatización de navegadores solo requiere que el navegador de destino esté instalado. WebdriverIO gestiona los drivers automáticamente.

### ¿Necesito Appium para la automatización móvil?

Sí. La automatización móvil requiere:
1. Servidor de Appium en ejecución (`npm install -g appium && appium`)
2. Drivers de plataforma instalados (`appium driver install xcuitest` para iOS, `appium driver install uiautomator2` para Android)
3. Herramientas de desarrollo adecuadas (Xcode para iOS, Android SDK para Android)

## Automatización de navegadores

### ¿Qué navegadores son compatibles?

Chrome, Firefox, Edge y Safari son compatibles. Usa el parámetro `browser` en `start_session`:

```text
"Start a Firefox session"
"Start Chrome in headless mode"
```

### ¿Puedo ejecutar el navegador en modo headless?

Sí. El modo headless es el predeterminado (`headless: true`). Pídele a Claude que lo ejecute en modo con interfaz si quieres ver el navegador:

"Inicia Chrome en modo con interfaz (no headless)"

### ¿Puedo establecer el tamaño de la ventana del navegador?

Sí. Puedes especificar las dimensiones al iniciar el navegador:

"Inicia Chrome con un tamaño de ventana de 1920x1080"

Dimensiones admitidas: de 400 a 3840 píxeles de ancho y de 400 a 2160 píxeles de alto. El valor predeterminado es 1920×1080.

### ¿Puedo iniciar el navegador y navegar en un solo paso?

¡Sí! Usa el parámetro `navigationUrl`:

"Inicia Chrome y navega a https://webdriver.io"

Esto es más eficiente que iniciar el navegador y luego navegar por separado.

### ¿Cómo tomo capturas de pantalla?

Simplemente pídelo:

"Toma una captura de pantalla de la página actual"

Las capturas de pantalla se optimizan automáticamente:
- Escaladas a una dimensión máxima de 2000px
- Comprimidas a un tamaño máximo de archivo de 1MB
- Formato: PNG o JPEG (seleccionado automáticamente para una calidad óptima)

### ¿Puedo interactuar con iframes?

Sí. Usa la herramienta `switch_frame` para cambiar a un iframe mediante un selector CSS o XPath. Todas las llamadas posteriores a `click_element`, `set_value` y `get_elements` operan dentro del frame seleccionado. Omite el selector para volver al frame de nivel superior. Los iframes deben ser del mismo origen que la página principal.

### ¿Puedo ejecutar JavaScript personalizado?

¡Sí! Usa la herramienta `execute_script`:

"Ejecuta un script para obtener el título de la página"
"Ejecuta el script: return document.querySelectorAll('button').length"

### ¿Puedo conectarme a una sesión de Chrome existente?

Sí. Usa primero `launch_chrome` (abre Chrome con depuración remota) y luego `start_session` con `attach: true`.

"Lanza Chrome con depuración remota y luego conéctate a él"

### ¿Puedo trabajar con varias pestañas?

Sí. Usa `get_tabs` para listar las pestañas abiertas y `switch_tab` para enfocar una específica:

"Obtén todas las pestañas abiertas"
"Cambia a la pestaña en el índice 1"

## Automatización móvil

### ¿Cómo inicio una sesión de iOS o Android?

Usa `start_session` con la plataforma adecuada:

"Inicia mi aplicación iOS ubicada en /path/to/MyApp.app en el simulador de iPhone 15"

"Inicia mi aplicación Android en /path/to/app.apk en el emulador de Pixel 7"

O para una aplicación ya instalada:

"Inicia la aplicación con noReset habilitado en el simulador de iPhone 15"

### ¿Puedo probar en dispositivos reales?

¡Sí! Para dispositivos reales, necesitarás el UDID del dispositivo:

-   **iOS:** Conecta el dispositivo, abre Finder, haz clic en el dispositivo y haz clic en el número de serie para mostrar el UDID
-   **Android:** Ejecuta `adb devices` en la terminal

Luego pide:

"Inicia mi aplicación iOS en el dispositivo real con UDID abc123..."

### ¿Cómo manejo los diálogos de permisos?

De forma predeterminada, los permisos se conceden automáticamente (`autoGrantPermissions: true`). Si necesitas probar flujos de permisos, puedes desactivarlo:

"Inicia mi aplicación sin conceder permisos automáticamente"

### ¿Qué gestos son compatibles?

-   **Tocar:** Toca elementos o coordenadas (`tap_element`)
-   **Deslizar:** Desliza hacia arriba, abajo, izquierda o derecha (`swipe`)
-   **Arrastrar y soltar:** Arrastra de un elemento a otro o a coordenadas (`drag_and_drop`)

Nota: `long_press` está disponible mediante `execute_script` con comandos móviles de Appium.

### ¿Cómo me desplazo en aplicaciones móviles?

Usa gestos de deslizamiento:

"Desliza hacia arriba para desplazarte hacia abajo"
"Desliza hacia abajo para desplazarte hacia arriba"

### ¿Puedo rotar el dispositivo?

Sí:

"Rota el dispositivo a horizontal"
"Rota el dispositivo a vertical"

### ¿Cómo manejo las aplicaciones híbridas?

Para aplicaciones con webviews, puedes cambiar de contexto:

"Obtén los contextos disponibles"
"Cambia al contexto webview"
"Vuelve al contexto nativo"

### ¿Puedo ejecutar comandos móviles de Appium?

¡Sí! Usa la herramienta `execute_script`:

```text
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Pulsar ATRÁS en Android
Execute script "mobile: activateApp" with args [{ bundleId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

## Selección de elementos

### ¿Cómo sabe el asistente de IA con qué elemento interactuar?

Utiliza el recurso `wdio://session/current/elements` o la herramienta `get_elements` para identificar los elementos interactivos en la página/pantalla. Cada elemento incluye selectores listos para usar.

### ¿Qué pasa si hay demasiados elementos en la página?

Usa la paginación para gestionar listas grandes de elementos:

"Obtén los primeros 20 elementos"
"Obtén elementos con offset 20 y limit 20"

La respuesta incluye `total`, `showing` y `hasMore` para ayudarte a navegar por los elementos.

### ¿Qué pasa si Claude hace clic en el elemento equivocado?

Puedes ser más específico:

-   Proporciona el texto exacto: "Haz clic en el botón que dice 'Submit Order'"
-   Proporciona un selector: "Haz clic en el elemento con el selector #submit-btn"
-   Proporciona el ID de accesibilidad: "Haz clic en el elemento con el ID de accesibilidad loginButton"

### ¿Cuál es la mejor estrategia de selectores para móviles?

1. **Accessibility ID** (la mejor) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (último recurso) - más lento pero funciona en todas partes

### ¿Qué es el árbol de accesibilidad y cuándo debo usarlo?

El árbol de accesibilidad proporciona información semántica sobre los elementos de la página (roles, nombres, estados). Usa `get_accessibility_tree` cuando:
- `get_elements` no devuelve los elementos esperados
- Necesitas encontrar elementos por rol de accesibilidad (button, link, textbox, etc.)
- Necesitas información semántica detallada sobre los elementos

"Obtén el árbol de accesibilidad filtrado por los roles button y link"

## Gestión de sesiones

### ¿Puedo tener varias sesiones a la vez?

No. El servidor MCP utiliza un modelo de sesión única. Solo puede haber una sesión de navegador o aplicación activa a la vez.

### ¿Qué sucede cuando cierro una sesión?

Depende del tipo de sesión y de la configuración:

-   **Navegador:** El navegador se cierra por completo
-   **Móvil con `noReset: false`:** La aplicación se termina
-   **Móvil con `noReset: true` o sin `appPath`:** La aplicación permanece abierta (la sesión se desconecta automáticamente)

### ¿Puedo conservar el estado de la aplicación entre sesiones?

¡Sí! Usa la opción `noReset`:

"Inicia mi aplicación con noReset habilitado"

Esto conserva el estado de inicio de sesión, las preferencias y otros datos de la aplicación.

### ¿Cuál es la diferencia entre cerrar y desconectar?

-   **Cerrar:** Termina el navegador/aplicación por completo
-   **Desconectar:** Desconecta la automatización pero mantiene el navegador/aplicación en ejecución

Desconectar es útil cuando quieres inspeccionar manualmente el estado después de la automatización.

### Mi sesión sigue agotando el tiempo de espera durante la depuración

Aumenta el tiempo de espera de comandos:

"Inicia mi aplicación con newCommandTimeout de 300 segundos"

El valor predeterminado es de 300 segundos. Para sesiones de depuración muy largas, prueba con 600 segundos.

## Solución de problemas

### Error "Session not found"

Esto significa que no existe ninguna sesión activa. Inicia primero una sesión de navegador o aplicación:

"Inicia Chrome y navega a google.com"

### Error "Element not found"

Es posible que el elemento no sea visible o que tenga un selector diferente. Prueba a:

1. Pedirle a Claude que obtenga primero todos los elementos visibles
2. Proporcionar un selector más específico
3. Esperar a que la página/aplicación se cargue por completo
4. Usar `inViewportOnly: false` para encontrar elementos fuera de la pantalla

### El navegador no se inicia

1. Asegúrate de que el navegador de destino esté instalado
2. Comprueba si otro proceso está usando el puerto de depuración (9222)
3. Prueba el modo headless

### Falló la conexión con Appium

Este es el problema más común al iniciar la automatización móvil.

1. **Verifica que Appium esté en ejecución**: `curl http://localhost:4723/status`
2. Inicia Appium si es necesario: `appium`
3. Comprueba que tu conexión de Appium coincida con el servidor (usa `appiumConfig` en `start_session`)
4. Asegúrate de que los drivers estén instalados: `appium driver list --installed`

:::tip
El servidor MCP requiere que Appium esté en ejecución antes de iniciar sesiones móviles. Asegúrate de iniciar Appium primero:
```sh
appium
```
Las versiones futuras podrían incluir la gestión automática del servicio de Appium.
:::

### El simulador de iOS no se inicia

1. Asegúrate de que Xcode esté instalado: `xcode-select --install`
2. Lista los simuladores disponibles: `xcrun simctl list devices`
3. Busca errores específicos del simulador en Console.app

### El emulador de Android no se inicia

1. Establece `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Comprueba los emuladores: `emulator -list-avds`
3. Inicia el emulador manualmente: `emulator -avd <avd-name>`
4. Verifica que el dispositivo esté conectado: `adb devices`

### Las capturas de pantalla no funcionan

1. En móviles, asegúrate de que la sesión esté activa
2. En el navegador, prueba con una página diferente (algunas páginas bloquean las capturas de pantalla)
3. Revisa los registros de Claude Desktop en busca de errores

Las capturas de pantalla se comprimen automáticamente a un máximo de 1MB, por lo que las capturas grandes funcionarán, aunque pueden tener menor calidad.

## Rendimiento

### ¿Por qué es lenta la automatización móvil?

La automatización móvil implica:
1. Comunicación de red con el servidor de Appium
2. Comunicación de Appium con el dispositivo/simulador
3. Renderizado y respuesta del dispositivo

Consejos para una automatización más rápida:
-   Usa emuladores/simuladores en lugar de dispositivos reales durante el desarrollo
-   Usa IDs de accesibilidad en lugar de XPath
-   Habilita `inViewportOnly: true` para la detección de elementos
-   Usa paginación (`limit`) para reducir el uso de tokens

### ¿Cómo puedo acelerar la detección de elementos?

El servidor MCP ya optimiza la detección de elementos mediante el análisis del código fuente XML de la página (2 llamadas HTTP frente a más de 600 con las consultas de elementos tradicionales). Consejos adicionales:

-   Establece `inViewportOnly: true` para filtrar los elementos fuera de la pantalla
-   Establece `includeContainers: false` (predeterminado)
-   Usa `limit` y `offset` para paginar en pantallas grandes
-   Usa selectores específicos en lugar de buscar todos los elementos

### Las capturas de pantalla son lentas o fallan

Las capturas de pantalla se optimizan automáticamente:
- Se redimensionan si superan los 2000px
- Se comprimen para mantenerse por debajo de 1MB
- Se convierten a JPEG si el PNG es demasiado grande

Esta optimización reduce el tiempo de procesamiento y garantiza que Claude pueda manejar la imagen.

## Limitaciones

### ¿Cuáles son las limitaciones actuales?

-   **Sesión única:** Solo un navegador/aplicación a la vez
-   **Compatibilidad con iframes:** Los iframes del mismo origen son compatibles mediante `switch_frame`; los iframes de origen cruzado no son accesibles debido a las restricciones de seguridad del navegador
-   **Subida de archivos:** No es compatible directamente mediante herramientas
-   **Audio/Vídeo:** No se puede interactuar con la reproducción multimedia
-   **Extensiones del navegador:** No son compatibles

### ¿Puedo usar esto para pruebas en producción?

WebdriverIO MCP está diseñado para la automatización interactiva asistida por IA. Para pruebas de CI/CD en producción, considera usar el test runner tradicional de WebdriverIO con control programático completo.

## Seguridad

### ¿Están seguros mis datos?

El servidor MCP se ejecuta localmente en tu máquina. Toda la automatización se realiza a través de conexiones locales del navegador/Appium. No se envían datos a servidores externos más allá de los sitios a los que navegues explícitamente.

Al usar el modo de transporte HTTP (`--http`), el servidor acepta de forma predeterminada solo conexiones desde `localhost`; usa `--allowedHosts` y `--allowedOrigins` para controlar el acceso. Consulta [Transport](./transport) para más detalles.

### ¿Puede Claude acceder a mis contraseñas?

Claude puede ver el contenido de la página e interactuar con los elementos, pero:
-   Las contraseñas en los campos `<input type="password">` están ocultas
-   Debes evitar automatizar credenciales sensibles
-   Usa cuentas de prueba para la automatización

## Contribuir

### ¿Cómo puedo contribuir?

Visita el [repositorio de GitHub](https://github.com/webdriverio/mcp) para:
-   Informar de errores
-   Solicitar funcionalidades
-   Enviar pull requests

### ¿Dónde puedo obtener ayuda?

-   [Discord de WebdriverIO](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [Documentación de WebdriverIO](https://webdriver.io/)