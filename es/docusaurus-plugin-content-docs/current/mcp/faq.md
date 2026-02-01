---
id: faq
title: Preguntas frecuentes
---

Preguntas frecuentes sobre WebdriverIO MCP.

## General

### ¿Qué es MCP?

MCP (Model Context Protocol) es un protocolo abierto que permite a los asistentes de IA como Claude interactuar con herramientas y servicios externos. WebdriverIO MCP implementa este protocolo para proporcionar capacidades de automatización de navegador y móvil a Claude Desktop y Claude Code.

### ¿Qué puedo automatizar con WebdriverIO MCP?

Puedes automatizar:
-   **Navegadores de escritorio** (Chrome) - navegación, clics, escritura, capturas de pantalla
-   **Aplicaciones iOS** - en simuladores o dispositivos reales
-   **Aplicaciones Android** - en emuladores o dispositivos reales
-   **Aplicaciones híbridas** - alternando entre contextos nativos y web

### ¿Necesito escribir código?

¡No! Ese es el principal beneficio de MCP. Puedes describir lo que quieres hacer en lenguaje natural, y Claude utilizará las herramientas apropiadas para realizar la tarea.

**Ejemplos de instrucciones:**
-   "Abre Chrome y navega a webdriver.io"
-   "Haz clic en el botón Comenzar"
-   "Toma una captura de pantalla de la página actual"
-   "Inicia mi aplicación iOS e inicia sesión como usuario de prueba"

---

## Instalación y Configuración

### ¿Cómo instalo WebdriverIO MCP?

No necesitas instalarlo por separado. El servidor MCP se ejecuta automáticamente a través de npx cuando lo configuras en Claude Desktop o Claude Code.

Agrega esto a tu configuración de Claude Desktop:

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

### ¿Necesito Appium para la automatización del navegador?

No. La automatización del navegador solo requiere que Chrome esté instalado. WebdriverIO maneja el ChromeDriver automáticamente.

### ¿Necesito Appium para la automatización móvil?

Sí. La automatización móvil requiere:
1. Servidor Appium en ejecución (`npm install -g appium && appium`)
2. Controladores de plataforma instalados (`appium driver install xcuitest` para iOS, `appium driver install uiautomator2` para Android)
3. Herramientas de desarrollo apropiadas (Xcode para iOS, Android SDK para Android)

---

## Automatización de Navegador

### ¿Qué navegadores son compatibles?

Actualmente, solo se admite **Chrome**. El soporte para otros navegadores puede añadirse en futuras versiones.

### ¿Puedo ejecutar Chrome en modo headless?

¡Sí! Pídele a Claude que inicie el navegador en modo headless:

"Inicia Chrome en modo headless"

O Claude usará esta opción cuando sea apropiado (por ejemplo, en contextos CI/CD).

### ¿Puedo establecer el tamaño de la ventana del navegador?

Sí. Puedes especificar dimensiones al iniciar el navegador:

"Inicia Chrome con un tamaño de ventana de 1920x1080"

Dimensiones admitidas: 400-3840 píxeles de ancho, 400-2160 píxeles de alto. El valor predeterminado es 1920x1080.

### ¿Puedo iniciar el navegador y navegar en un solo paso?

¡Sí! Usa el parámetro `navigationUrl`:

"Inicia Chrome y navega a https://webdriver.io"

Esto es más eficiente que iniciar el navegador y luego navegar por separado.

### ¿Cómo tomo capturas de pantalla?

Simplemente pídele a Claude:

"Toma una captura de pantalla de la página actual"

Las capturas de pantalla se optimizan automáticamente:
- Escaladas a una dimensión máxima de 2000px
- Comprimidas a un tamaño máximo de archivo de 1MB
- Formato: PNG o JPEG (seleccionado automáticamente para una calidad óptima)

### ¿Puedo interactuar con iframes?

Actualmente, el servidor MCP opera en el documento principal. La interacción con iframes puede añadirse en futuras versiones.

### ¿Puedo ejecutar JavaScript personalizado?

¡Sí! Usa la herramienta `execute_script`:

"Ejecuta script para obtener el título de la página"
"Ejecuta script: return document.querySelectorAll('button').length"

---

## Automatización Móvil

### ¿Cómo inicio una aplicación iOS?

Pídele a Claude con los detalles necesarios:

"Inicia mi aplicación iOS ubicada en /path/to/MyApp.app en el simulador iPhone 15"

O para una aplicación instalada:

"Inicia la aplicación con noReset habilitado en el simulador iPhone 15"

### ¿Cómo inicio una aplicación Android?

"Inicia mi aplicación Android en /path/to/app.apk en el emulador Pixel 7"

O para una aplicación instalada:

"Inicia la aplicación con noReset habilitado en el emulador Pixel 7"

### ¿Puedo probar en dispositivos reales?

¡Sí! Para dispositivos reales, necesitarás el UDID del dispositivo:

-   **iOS:** Conecta el dispositivo, abre Finder, haz clic en el dispositivo, haz clic en el número de serie para revelar el UDID
-   **Android:** Ejecuta `adb devices` en la terminal

Luego pídele a Claude:

"Inicia mi aplicación iOS en el dispositivo real con UDID abc123..."

### ¿Cómo manejo los diálogos de permisos?

Por defecto, los permisos se otorgan automáticamente (`autoGrantPermissions: true`). Si necesitas probar flujos de permisos, puedes desactivar esto:

"Inicia mi aplicación sin otorgar permisos automáticamente"

### ¿Qué gestos son compatibles?

-   **Tap:** Tocar elementos o coordenadas
-   **Swipe:** Deslizar hacia arriba, abajo, izquierda o derecha
-   **Drag and Drop:** Arrastrar de un elemento a otro o a coordenadas

Nota: `long_press` está disponible a través de `execute_script` con comandos móviles de Appium.

### ¿Cómo hago scroll en aplicaciones móviles?

Usa gestos de deslizamiento:

"Desliza hacia arriba para desplazarte hacia abajo"
"Desliza hacia abajo para desplazarte hacia arriba"

### ¿Puedo rotar el dispositivo?

Sí:

"Rota el dispositivo a horizontal"
"Rota el dispositivo a vertical"

### ¿Cómo manejo aplicaciones híbridas?

Para aplicaciones con webviews, puedes cambiar contextos:

"Obtén los contextos disponibles"
"Cambia al contexto webview"
"Vuelve al contexto nativo"

### ¿Puedo ejecutar comandos móviles de Appium?

¡Sí! Usa la herramienta `execute_script`:

```
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Press BACK on Android
Execute script "mobile: activateApp" with args [{ appId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

---

## Selección de Elementos

### ¿Cómo sabe Claude con qué elemento interactuar?

Claude usa la herramienta `get_visible_elements` para identificar elementos interactivos en la página/pantalla. Cada elemento viene con múltiples estrategias de selector.

### ¿Qué pasa si hay demasiados elementos en la página?

Usa paginación para gestionar listas grandes de elementos:

"Obtén los primeros 20 elementos visibles"
"Obtén elementos visibles con desplazamiento 20 y límite 20"

La respuesta incluye `total`, `showing`, y `hasMore` para ayudar a navegar por los elementos.

### ¿Puedo obtener solo tipos específicos de elementos?

¡Sí! Usa el parámetro `elementType`:

-   `interactable` (predeterminado): Botones, enlaces, entradas
-   `visual`: Imágenes, SVGs
-   `all`: Ambos tipos

"Obtén elementos visuales visibles en la página"

### ¿Qué pasa si Claude hace clic en el elemento equivocado?

Puedes ser más específico:

-   Proporciona el texto exacto: "Haz clic en el botón que dice 'Enviar Pedido'"
-   Proporciona selector: "Haz clic en el elemento con selector #submit-btn"
-   Proporciona ID de accesibilidad: "Haz clic en el elemento con ID de accesibilidad loginButton"

### ¿Cuál es la mejor estrategia de selector para móviles?

1. **ID de accesibilidad** (mejor) - `~loginButton`
2. **ID de recurso** (Android) - `id=login_button`
3. **Cadena predicada** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (último recurso) - más lento pero funciona en todas partes

### ¿Qué es el árbol de accesibilidad y cuándo debería usarlo?

El árbol de accesibilidad proporciona información semántica sobre los elementos de la página (roles, nombres, estados). Usa `get_accessibility` cuando:
- `get_visible_elements` no devuelve los elementos esperados
- Necesitas encontrar elementos por rol de accesibilidad (botón, enlace, cuadro de texto, etc.)
- Necesitas información semántica detallada sobre los elementos

"Obtén el árbol de accesibilidad filtrado por roles de botón y enlace"

---

## Gestión de Sesiones

### ¿Puedo tener múltiples sesiones a la vez?

No. El servidor MCP utiliza un modelo de sesión única. Solo puede estar activa una sesión de navegador o aplicación a la vez.

### ¿Qué sucede cuando cierro una sesión?

Depende del tipo de sesión y la configuración:

-   **Navegador:** Chrome se cierra completamente
-   **Móvil con `noReset: false`:** La aplicación termina
-   **Móvil con `noReset: true` o sin `appPath`:** La aplicación permanece abierta (la sesión se desconecta automáticamente)

### ¿Puedo preservar el estado de la aplicación entre sesiones?

¡Sí! Usa la opción `noReset`:

"Inicia mi aplicación con noReset habilitado"

Esto preserva el estado de inicio de sesión, preferencias y otros datos de la aplicación.

### ¿Cuál es la diferencia entre cerrar y desconectar?

-   **Cerrar:** Termina el navegador/aplicación completamente
-   **Desconectar:** Desconecta la automatización pero mantiene el navegador/aplicación en ejecución

Desconectar es útil cuando quieres inspeccionar manualmente el estado después de la automatización.

### Mi sesión sigue agotando el tiempo durante la depuración

Aumenta el tiempo de espera del comando:

"Inicia mi aplicación con newCommandTimeout de 300 segundos"

El valor predeterminado es 60 segundos. Para sesiones largas de depuración, prueba con 300-600 segundos.

---

## Solución de Problemas

### Error "Session not found"

Esto significa que no existe una sesión activa. Inicia primero una sesión de navegador o aplicación:

"Inicia Chrome y navega a google.com"

### Error "Element not found"

Es posible que el elemento no sea visible o tenga un selector diferente. Intenta:

1. Pedir a Claude que obtenga primero todos los elementos visibles
2. Proporcionar un selector más específico
3. Esperar a que la página/aplicación cargue completamente
4. Usar `inViewportOnly: false` para encontrar elementos fuera de la pantalla

### El navegador no se inicia

1. Asegúrate de que Chrome esté instalado
2. Comprueba si otro proceso está usando el puerto de depuración (9222)
3. Prueba el modo headless

### Falló la conexión con Appium

Este es el problema más común al iniciar la automatización móvil.

1. **Verifica que Appium esté ejecutándose**: `curl http://localhost:4723/status`
2. Inicia Appium si es necesario: `appium`
3. Comprueba que tu configuración de URL de Appium coincida con el servidor
4. Asegúrate de que los controladores estén instalados: `appium driver list --installed`

:::tip
El servidor MCP requiere que Appium se esté ejecutando antes de iniciar sesiones móviles. Asegúrate de iniciar Appium primero:
```sh
appium
```
Las versiones futuras pueden incluir gestión automática del servicio Appium.
:::

### El Simulador de iOS no se inicia

1. Asegúrate de que Xcode esté instalado: `xcode-select --install`
2. Lista los simuladores disponibles: `xcrun simctl list devices`
3. Busca errores específicos del simulador en Console.app

### El Emulador de Android no se inicia

1. Configura `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Verifica los emuladores: `emulator -list-avds`
3. Inicia el emulador manualmente: `emulator -avd <avd-name>`
4. Verifica que el dispositivo esté conectado: `adb devices`

### Las capturas de pantalla no funcionan

1. Para móvil, asegúrate de que la sesión esté activa
2. Para navegador, prueba una página diferente (algunas páginas bloquean las capturas de pantalla)
3. Verifica los registros de Claude Desktop para ver errores

Las capturas de pantalla se comprimen automáticamente a un máximo de 1MB, por lo que las capturas de pantalla grandes funcionarán pero pueden tener menor calidad.

---

## Rendimiento

### ¿Por qué la automatización móvil es lenta?

La automatización móvil implica:
1. Comunicación de red con el servidor Appium
2. Appium comunicándose con el dispositivo/simulador
3. Renderizado y respuesta del dispositivo

Consejos para una automatización más rápida:
-   Usa emuladores/simuladores en lugar de dispositivos reales para desarrollo
-   Usa IDs de accesibilidad en lugar de XPath
-   Habilita `inViewportOnly: true` para la detección de elementos
-   Usa paginación (`limit`) para reducir el uso de tokens

### ¿Cómo puedo acelerar la detección de elementos?

El servidor MCP ya optimiza la detección de elementos usando análisis XML de la fuente de la página (2 llamadas HTTP vs 600+ para consultas de elementos tradicionales). Consejos adicionales:

-   Mantén `inViewportOnly: true` (predeterminado)
-   Configura `includeContainers: false` (predeterminado)
-   Usa `limit` y `offset` para paginación en pantallas grandes
-   Usa selectores específicos en lugar de encontrar todos los elementos

### Las capturas de pantalla son lentas o fallan

Las capturas de pantalla se optimizan automáticamente:
- Redimensionadas si son mayores de 2000px
- Comprimidas para estar por debajo de 1MB
- Convertidas a JPEG si PNG es demasiado grande

Esta optimización reduce el tiempo de procesamiento y asegura que Claude pueda manejar la imagen.

---

## Limitaciones

### ¿Cuáles son las limitaciones actuales?

-   **Sesión única:** Solo un navegador/aplicación a la vez
-   **Soporte de navegador:** Solo Chrome (por ahora)
-   **Soporte de iframe:** Soporte limitado para iframes
-   **Subida de archivos:** No es compatible directamente a través de herramientas
-   **Audio/Video:** No puede interactuar con reproducción de medios
-   **Extensiones de navegador:** No son compatibles

### ¿Puedo usar esto para pruebas de producción?

WebdriverIO MCP está diseñado para automatización interactiva asistida por IA. Para pruebas de CI/CD en producción, considera usar el ejecutor de pruebas tradicional de WebdriverIO con control programático completo.

---

## Seguridad

### ¿Están seguros mis datos?

El servidor MCP se ejecuta localmente en tu máquina. Toda la automatización ocurre a través de conexiones locales de navegador/Appium. No se envían datos a servidores externos más allá de aquello a lo que navegues explícitamente.

### ¿Puede Claude acceder a mis contraseñas?

Claude puede ver el contenido de la página e interactuar con elementos, pero:
-   Las contraseñas en campos `<input type="password">` están enmascaradas
-   Debes evitar automatizar credenciales sensibles
-   Usa cuentas de prueba para automatización

---

## Contribuciones

### ¿Cómo puedo contribuir?

Visita el [repositorio de GitHub](https://github.com/webdriverio/mcp) para:
-   Reportar errores
-   Solicitar funcionalidades
-   Enviar pull requests

### ¿Dónde puedo obtener ayuda?

-   [Discord de WebdriverIO](https://discord.webdriver.io/)
-   [Issues de GitHub](https://github.com/webdriverio/mcp/issues)
-   [Documentación de WebdriverIO](https://webdriver.io/)