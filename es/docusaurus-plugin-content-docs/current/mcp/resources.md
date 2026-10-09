---
id: resources
title: Recursos
description: "Lee el estado de la sesión en vivo, el historial de sesiones y los detalles de configuración de proveedores en la nube a través de los recursos de solo lectura wdio:// del servidor MCP de WebdriverIO."
---

Los recursos MCP proporcionan acceso de solo lectura al estado de la sesión en vivo. A diferencia de las herramientas, el modelo de IA consulta los recursos a voluntad; no ejecutan acciones. Todos los recursos utilizan el esquema de URI `wdio://`.

## Cuándo usar recursos frente a herramientas

- **Recursos**: estado ambiental que cambia a medida que interactúas: elementos actuales, captura de pantalla, cookies, árbol de accesibilidad. Léelos antes de actuar para entender lo que hay en pantalla.
- **Herramientas**: acciones que cambian el estado: hacer clic, navegar, establecer un valor.

Prefiere `wdio://session/current/elements` en lugar de `get_screenshot` para descubrir elementos; devuelve selectores listos para usar y consume muchos menos tokens.

## Historial de sesiones

### `wdio://sessions`

Índice de todas las sesiones de navegador y de aplicación con metadatos y número de pasos.

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

Registro de pasos en JSON de la sesión activa actual. Contiene todos los pasos de automatización registrados con nombres de herramientas, parámetros y marcas de tiempo.

---

### `wdio://session/current/code`

JavaScript de WebdriverIO generado para la sesión activa actual. Se genera automáticamente a partir de los pasos registrados. Pégalo en un archivo de prueba de WebdriverIO para reproducir la sesión.

---

### `wdio://session/{sessionId}/steps`

Registro de pasos de una sesión específica por ID. Plantilla de URI: reemplaza `{sessionId}` con el ID de `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

JavaScript de WebdriverIO generado para una sesión específica por ID. Plantilla de URI: reemplaza `{sessionId}` con el ID de `wdio://sessions`.

## Estado de la página en vivo (sesión actual)

### `wdio://session/current/elements`

Elementos interactuables en la página actual. Devuelve selectores listos para usar, el texto de los elementos e información de visibilidad.

**Este es el recurso principal para entender lo que hay en pantalla.** Léelo antes de hacer clic o escribir. Es mucho más rápido y económico que una captura de pantalla.

Para un filtrado avanzado (solo viewport, contenedores, cuadros delimitadores, paginación), usa en su lugar la herramienta `get_elements`.

---

### `wdio://session/current/accessibility`

Árbol de accesibilidad de la página actual. Devuelve todos los nodos de forma predeterminada con los atributos de rol, nombre, selector y estado. Solo para navegador. En móvil, usa `wdio://session/current/elements`.

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

Para resultados filtrados (por rol, paginados), usa la herramienta `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

Captura de pantalla de la página o pantalla actual como imagen codificada en base64. Se redimensiona automáticamente (máx. 2000px) y se comprime (máx. 1 MB).

Úsala para verificación visual o para depurar el diseño. Para descubrir elementos, prefiere `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

Todas las cookies de la sesión actual del navegador.

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

Todas las pestañas del navegador abiertas en la sesión actual. Solo para navegador.

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

Úsalo antes de `switch_tab` para encontrar el handle o índice de destino.

---

### `wdio://session/current/contexts`

Contextos de automatización disponibles (NATIVE_APP, WEBVIEW). Solo para móvil.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

Contexto de automatización activo actualmente. Solo para móvil.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

Estado del ciclo de vida de la aplicación para un bundle ID dado. Solo para móvil. Plantilla de URI: reemplaza `{bundleId}` con un bundle ID de iOS o un nombre de paquete de Android.

Devuelve uno de los siguientes valores:
- `0`: no instalada
- `1`: no está en ejecución
- `2`: en ejecución en segundo plano (suspendida)
- `3`: en ejecución en segundo plano
- `4`: en ejecución en primer plano

Para obtener una salida con nombres, usa en su lugar la herramienta `get_app_state`.

---

### `wdio://session/current/geolocation`

Geolocalización actual del dispositivo sobrescrita mediante `set_geolocation`.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

Registros de la sesión actual. Devuelve mensajes de la consola del navegador y excepciones de JavaScript (sesiones de Chromium), salida de logcat (Android) o registros de fallos/syslog (iOS).

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

Capabilities sin procesar devueltas por el servidor WebDriver o Appium para la sesión actual. Úsalo para depuración; muestra los valores reales que aceptó el driver, incluidos los valores predeterminados aplicados por el proveedor en la nube o Appium.

## Proveedores en la nube

### `wdio://browserstack/local-binary`

URL de descarga específica de la plataforma e instrucciones de configuración del daemon para el binario de BrowserStack Local. Léelo antes de usar `tunnel: true` o `tunnel: "external"` con `provider: "browserstack"`; contiene los comandos exactos para tu sistema operativo y arquitectura.

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

URL de descarga específica de la plataforma e instrucciones de configuración del daemon para Sauce Connect Proxy. Léelo antes de usar `tunnel: "external"` con `provider: "saucelabs"`; con `tunnel: true`, el SDK gestiona Sauce Connect automáticamente.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

URL de descarga específica de la plataforma e instrucciones de configuración del daemon para TestMu Tunnel. Solo es necesario para `tunnel: "external"` con `provider: "testmu"`; con `tunnel: true`, el SDK gestiona el túnel automáticamente mediante `@lambdatest/node-tunnel`.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

URL de descarga e instrucciones de configuración del daemon para TestingBot Tunnel. El túnel es un JAR de Java multiplataforma (requiere Java 11+). Solo es necesario para `tunnel: "external"` con `provider: "testingbot"`; con `tunnel: true`, el SDK gestiona el túnel automáticamente mediante `testingbot-tunnel-launcher`.

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```