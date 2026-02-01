---
id: tools
title: Herramientas
---

Las siguientes herramientas están disponibles a través del servidor WebdriverIO MCP. Estas herramientas permiten a los asistentes de IA automatizar navegadores y aplicaciones móviles.

## Gestión de Sesiones

### `start_browser`

Inicia una sesión de navegador Chrome.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `headless` | boolean | No | `false` | Ejecutar Chrome en modo sin interfaz gráfica |
| `windowWidth` | number | No | `1920` | Ancho de la ventana del navegador (400-3840) |
| `windowHeight` | number | No | `1080` | Altura de la ventana del navegador (400-2160) |
| `navigationUrl` | string | No | - | URL a la que navegar después de iniciar el navegador |

#### Ejemplo

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### Compatibilidad

- Navegadores de escritorio

---

### `start_app_session`

Inicia una sesión de aplicación móvil en iOS o Android a través de Appium.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `platform` | string | Sí | - | Plataforma a automatizar: `iOS` o `Android` |
| `deviceName` | string | Sí | - | Nombre del dispositivo o simulador/emulador |
| `appPath` | string | No* | - | Ruta al archivo de la aplicación (.app, .ipa, o .apk) |
| `platformVersion` | string | No | - | Versión del SO (ej., `17.0`, `14`) |
| `automationName` | string | No | Auto | `XCUITest` (iOS), `UiAutomator2` o `Espresso` (Android) |
| `udid` | string | No | - | Identificador único del dispositivo (necesario para dispositivos iOS reales) |
| `noReset` | boolean | No | `false` | Preservar estado de la aplicación entre sesiones |
| `fullReset` | boolean | No | `true` | Desinstalar y reinstalar la aplicación antes de la sesión |
| `autoGrantPermissions` | boolean | No | `true` | Conceder automáticamente permisos a la aplicación |
| `autoAcceptAlerts` | boolean | No | `true` | Aceptar automáticamente alertas del sistema |
| `autoDismissAlerts` | boolean | No | `false` | Descartar (en lugar de aceptar) alertas |
| `appWaitActivity` | string | No | - | Actividad a esperar en el inicio (solo Android) |
| `newCommandTimeout` | number | No | `60` | Segundos antes de que la sesión termine por inactividad |
| `appiumHost` | string | No | `127.0.0.1` | Nombre de host del servidor Appium |
| `appiumPort` | number | No | `4723` | Puerto del servidor Appium |
| `appiumPath` | string | No | `/` | Ruta del servidor Appium |

*Se debe proporcionar `appPath` o establecer `noReset: true` para conectarse a una aplicación que ya está en ejecución.

#### Ejemplo

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### Compatibilidad

- Simuladores iOS
- Dispositivos reales iOS
- Emuladores Android
- Dispositivos reales Android

---

### `close_session`

Cierra la sesión actual del navegador o aplicación.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `detach` | boolean | No | `false` | Separarse de la sesión en lugar de cerrarla (mantiene el navegador/aplicación en ejecución) |

#### Notas

Las sesiones con `noReset: true` o sin `appPath` se separan automáticamente al cerrarse para preservar el estado.

#### Compatibilidad

- Navegadores de escritorio
- Aplicaciones móviles

---

## Navegación

### `navigate`

Navega a una URL.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `url` | string | Sí | La URL a la que navegar |

#### Ejemplo

```
Navigate to https://webdriver.io
```

#### Compatibilidad

- Navegadores de escritorio

---

## Interacción con Elementos

### `click_element`

Hace clic en un elemento identificado por un selector.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `selector` | string | Sí | - | Selector CSS, XPath, o selector móvil |
| `scrollToView` | boolean | No | `true` | Desplazar el elemento a la vista antes de hacer clic |
| `timeout` | number | No | `3000` | Tiempo máximo de espera para el elemento (ms) |

#### Notas

- Soporta selectores de texto de WebdriverIO: `button=Texto exacto` o `a*=Contiene texto`
- Utiliza alineación central para posicionamiento del desplazamiento

#### Ejemplo

```
Click the element with selector "#submit-button"
```

#### Compatibilidad

- Navegadores de escritorio
- Aplicaciones nativas móviles

---

### `set_value`

Escribe texto en un campo de entrada.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `selector` | string | Sí | - | Selector para el elemento de entrada |
| `value` | string | Sí | - | Texto a escribir |
| `scrollToView` | boolean | No | `true` | Desplazar elemento a la vista antes de escribir |
| `timeout` | number | No | `3000` | Tiempo máximo de espera para el elemento (ms) |

#### Notas

Limpia el valor existente antes de escribir el nuevo texto.

#### Ejemplo

```
Set the value "john@example.com" in the element with selector "#email"
```

#### Compatibilidad

- Navegadores de escritorio
- Aplicaciones nativas móviles

---

## Análisis de Página

### `get_visible_elements`

Obtiene elementos visibles e interactuables en la página o pantalla actual. Esta es la herramienta principal para descubrir qué elementos están disponibles para interacción.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `elementType` | string | No | `interactable` | Tipo de elementos: `interactable` (botones/enlaces/entradas), `visual` (imágenes/SVGs), o `all` |
| `inViewportOnly` | boolean | No | `true` | Solo devuelve elementos visibles en el viewport |
| `includeContainers` | boolean | No | `false` | Incluir contenedores de diseño (ViewGroup, ScrollView, etc.) |
| `includeBounds` | boolean | No | `false` | Incluir coordenadas del elemento (x, y, ancho, alto) |
| `limit` | number | No | `0` | Máximo de elementos a devolver (0 = ilimitado) |
| `offset` | number | No | `0` | Número de elementos a omitir (para paginación) |

#### Devuelve

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Los elementos web incluyen:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**Los elementos móviles incluyen:** Múltiples estrategias de localización (ID de accesibilidad, ID de recurso, XPath, UiAutomator/predicados), tipo de elemento, texto y, opcionalmente, límites

#### Notas

- **Web**: Usa un script de navegador optimizado para detección rápida de elementos
- **Móvil**: Utiliza un análisis eficiente de origen de página XML (2 llamadas HTTP vs 600+ para consultas de elementos)
- Use paginación (`limit` y `offset`) para páginas grandes para reducir el uso de tokens

#### Ejemplo

```
Get all visible elements on the page with their coordinates
```

#### Compatibilidad

- Navegadores de escritorio
- Aplicaciones móviles

---

### `get_accessibility`

Obtiene el árbol de accesibilidad de la página actual con información semántica sobre roles, nombres y estados.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `limit` | number | No | `100` | Número máximo de nodos a devolver (0 = ilimitado) |
| `offset` | number | No | `0` | Número de nodos a omitir (para paginación) |
| `roles` | string[] | No | Todos | Filtrar a roles específicos (ej., `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | No | `true` | Solo devolver nodos con un nombre/etiqueta |

#### Devuelve

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### Notas

- Solo para navegador. Para aplicaciones móviles, use `get_visible_elements` en su lugar
- Útil cuando `get_visible_elements` no devuelve los elementos esperados
- `namedOnly: true` filtra contenedores anónimos y reduce el ruido

#### Compatibilidad

- Navegadores de escritorio

---

## Capturas de pantalla

### `take_screenshot`

Captura una imagen de la vista actual.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `outputPath` | string | No | Ruta para guardar el archivo de captura. Si se omite, devuelve datos base64 |

#### Devuelve

Datos de imagen codificados en base64 (PNG o JPEG) con información de tamaño.

#### Notas

Las capturas se optimizan automáticamente:
- Dimensión máxima: 2000px (se reduce la escala si es mayor)
- Tamaño máximo de archivo: 1MB
- Formato: PNG con compresión máxima, o JPEG si es necesario para cumplir con el límite de tamaño

#### Compatibilidad

- Navegadores de escritorio
- Aplicaciones móviles

---

## Desplazamiento

### `scroll`

Desplaza la página hacia arriba o hacia abajo por un número específico de píxeles.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `direction` | string | Sí | - | Dirección de desplazamiento: `up` o `down` |
| `pixels` | number | No | `500` | Número de píxeles a desplazar |

#### Notas

Solo para navegador. Para desplazamiento móvil, use la herramienta `swipe` en su lugar.

#### Compatibilidad

- Navegadores de escritorio

---

## Gestión de Cookies

### `get_cookies`

Obtiene cookies de la sesión actual.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `name` | string | No | Nombre específico de cookie para recuperar (omitir para todas las cookies) |

#### Devuelve

Objetos de cookie con propiedades name, value, domain, path, expiry, secure y httpOnly.

#### Compatibilidad

- Navegadores de escritorio

---

### `set_cookie`

Establece una cookie en la sesión actual.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `name` | string | Sí | - | Nombre de la cookie |
| `value` | string | Sí | - | Valor de la cookie |
| `domain` | string | No | Actual | Dominio de la cookie |
| `path` | string | No | `/` | Ruta de la cookie |
| `expiry` | number | No | - | Expiración como marca de tiempo Unix (segundos) |
| `secure` | boolean | No | - | Flag seguro |
| `httpOnly` | boolean | No | - | Flag HttpOnly |
| `sameSite` | string | No | - | Atributo SameSite: `strict`, `lax`, o `none` |

#### Compatibilidad

- Navegadores de escritorio

---

### `delete_cookies`

Elimina cookies de la sesión actual.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `name` | string | No | Nombre específico de cookie para eliminar (omitir para eliminar todas) |

#### Compatibilidad

- Navegadores de escritorio

---

## Gestos Táctiles (Móvil)

### `tap_element`

Toca un elemento o coordenadas de pantalla.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `selector` | string | No* | Selector para el elemento a tocar |
| `x` | number | No* | Coordenada X para tocar |
| `y` | number | No* | Coordenada Y para tocar |

*Se requiere `selector` o ambos `x` e `y`.

#### Compatibilidad

- Aplicaciones móviles

---

### `swipe`

Realiza un gesto de deslizamiento en la dirección especificada.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Predeterminado | Descripción |
|-----------|------|-------------|---------|-------------|
| `direction` | string | Sí | - | Dirección del deslizamiento: `up`, `down`, `left`, `right` |
| `duration` | number | No | `500` | Duración del deslizamiento en milisegundos (100-5000) |
| `percent` | number | No | 0.5/0.95 | Porcentaje de pantalla a deslizar (0-1) |

#### Notas

- Porcentaje predeterminado: 0.5 para deslizamientos verticales, 0.95 para horizontales
- La dirección indica el movimiento del contenido: "deslizar hacia arriba" desplaza el contenido hacia arriba

#### Ejemplo

```
Swipe up to scroll down the screen
```

#### Compatibilidad

- Aplicaciones móviles

---

### `drag_and_drop`

Arrastra un elemento a otro elemento o coordenadas.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | Sí | Selector del elemento origen a arrastrar |
| `targetSelector` | string | No* | Selector del elemento destino donde soltar |
| `x` | number | No* | Desplazamiento X de destino (si no hay targetSelector) |
| `y` | number | No* | Desplazamiento Y de destino (si no hay targetSelector) |
| `duration` | number | No | Predeterminado | Duración del arrastre en milisegundos (100-5000) |

*Se requiere `targetSelector` o ambos `x` e `y`.

#### Compatibilidad

- Aplicaciones móviles

---

## Ciclo de vida de la aplicación (Móvil)

### `get_app_state`

Obtiene el estado actual de una aplicación.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `bundleId` | string | Sí | Identificador de la aplicación (bundle ID para iOS, nombre del paquete para Android) |

#### Devuelve

Estado de la aplicación: `not installed`, `not running`, `running in background (suspended)`, `running in background`, o `running in foreground`.

#### Compatibilidad

- Aplicaciones móviles

---

## Cambio de contexto (Aplicaciones híbridas)

### `get_contexts`

Lista todos los contextos disponibles (nativos y webviews).

#### Parámetros

Ninguno

#### Devuelve

Array de nombres de contexto (ej., `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### Compatibilidad

- Aplicaciones híbridas móviles

---

### `get_current_context`

Obtiene el contexto actualmente activo.

#### Parámetros

Ninguno

#### Devuelve

Nombre del contexto actual (ej., `NATIVE_APP` o `WEBVIEW_*`).

#### Compatibilidad

- Aplicaciones híbridas móviles

---

### `switch_context`

Cambia entre contextos nativos y webview.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `context` | string | Sí | Nombre del contexto o índice (base 1) de `get_contexts` |

#### Ejemplo

```
Switch to the WEBVIEW_com.example.app context
```

#### Compatibilidad

- Aplicaciones híbridas móviles

---

## Control de dispositivo (Móvil)

### `rotate_device`

Rota el dispositivo a una orientación específica.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `orientation` | string | Sí | `PORTRAIT` o `LANDSCAPE` |

#### Compatibilidad

- Aplicaciones móviles

---

### `hide_keyboard`

Oculta el teclado en pantalla.

#### Parámetros

Ninguno

#### Compatibilidad

- Aplicaciones móviles

---

### `get_geolocation`

Obtiene las coordenadas GPS actuales.

#### Parámetros

Ninguno

#### Devuelve

Objeto con `latitude`, `longitude`, y `altitude`.

#### Compatibilidad

- Aplicaciones móviles

---

### `set_geolocation`

Establece las coordenadas GPS del dispositivo.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `latitude` | number | Sí | Coordenada de latitud (-90 a 90) |
| `longitude` | number | Sí | Coordenada de longitud (-180 a 180) |
| `altitude` | number | No | Altitud en metros |

#### Ejemplo

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### Compatibilidad

- Aplicaciones móviles

---

## Ejecución de scripts

### `execute_script`

Ejecuta JavaScript en el navegador o comandos móviles a través de Appium.

#### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-----------|-------------|
| `script` | string | Sí | Código JavaScript (navegador) o comando móvil (ej., `mobile: pressKey`) |
| `args` | array | No | Argumentos para el script |

#### Ejemplos de navegador

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### Ejemplos móviles (Appium)

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### Códigos de teclas comunes para Android

| Tecla | Código |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### Más comandos móviles

Para una lista completa de comandos móviles disponibles en Appium, consulte:
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### Compatibilidad

- Navegadores de escritorio
- Aplicaciones móviles (a través de comandos móviles de Appium)