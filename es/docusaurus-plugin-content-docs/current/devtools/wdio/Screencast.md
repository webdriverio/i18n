---
id: screencast
title: Grabación de pantalla de la sesión
description: "Graba sesiones del navegador como vídeos .webm con la grabación de pantalla de DevTools, configura las opciones de captura y encuentra los archivos de salida."
---

Graba las sesiones del navegador como vídeos `.webm`. Los vídeos se muestran en la interfaz de DevTools junto con las vistas de instantáneas y de mutaciones del DOM.

Disponible en los tres adaptadores: **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** y **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. El modo de captura varía según el framework (CDP push cuando es posible, polling en caso contrario; consulta [Compatibilidad con navegadores](#browser-support) más abajo).

## Demo

![Screencast Demo](/img/devtools/screencast.gif)

## Configuración inicial

La codificación de la grabación de pantalla requiere **ffmpeg** en el `PATH` y el paquete `fluent-ffmpeg`:

```sh
# Instalar ffmpeg - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian

# Instalar fluent-ffmpeg
npm install fluent-ffmpeg
```

## Configuración

```ts
services: [
  [
    'devtools',
    {
      screencast: {
        enabled: true,
        captureFormat: 'jpeg',
        quality: 70,
        maxWidth: 1280,
        maxHeight: 720,
      }
    }
  ]
]
```

## Opciones

| Opción | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `enabled` | `boolean` | `false` | Habilita la grabación de la sesión |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Formato de imagen de los fotogramas. **Solo Chrome/Chromium**: controla el formato que Chrome envía a través de CDP. Se ignora en el modo polling (Firefox, Safari), donde las capturas de pantalla son siempre PNG. No afecta al contenedor del vídeo de salida, que siempre es `.webm` |
| `quality` | `number` | `70` | Calidad de compresión JPEG de 0 a 100. Solo se aplica en el modo CDP de Chrome/Chromium con `captureFormat: 'jpeg'` |
| `maxWidth` | `number` | `1280` | Ancho máximo del fotograma en píxeles. **Solo Chrome/Chromium**: Chrome escala los fotogramas antes de enviarlos a través de CDP. Se ignora en el modo polling |
| `maxHeight` | `number` | `720` | Alto máximo del fotograma en píxeles. **Solo Chrome/Chromium**: igual que el anterior |
| `pollIntervalMs` | `number` | `200` | Intervalo entre capturas de pantalla en milisegundos para navegadores distintos de Chrome (modo polling). Un valor menor produce un vídeo más fluido, pero más viajes de ida y vuelta de WebDriver durante la ejecución de las pruebas |

## Compatibilidad con navegadores

La grabación funciona en todos los navegadores principales mediante la selección automática del modo:

| Navegador | Modo | Notas |
|---|---|---|
| Chrome / Chromium / Edge | **CDP push** | Chrome envía los fotogramas a través del DevTools Protocol. Eficiente: no afecta a la duración de los comandos de prueba |
| Firefox / Safari / otros | **BiDi polling** | Recurre a llamar a `browser.takeScreenshot()` a intervalos de `pollIntervalMs`. Funciona en cualquier entorno donde se admitan las capturas de pantalla de WebDriver; añade una pequeña sobrecarga proporcional al intervalo |

No es necesario cambiar la configuración para cambiar de modo: el servicio detecta automáticamente las capacidades del navegador y registra qué modo está activo.

## Comportamiento

- La grabación comienza cuando se abre la sesión del navegador y se detiene cuando se cierra.
- Los fotogramas en blanco iniciales (capturados antes de la primera navegación a una URL) se recortan automáticamente para que los vídeos comiencen en la primera acción significativa en la página.
- Si se llama a `browser.reloadSession()` a mitad de la ejecución, el servicio finaliza la grabación actual e inicia una nueva para la nueva sesión. Cada sesión genera su propio archivo `.webm`.
- Cuando existen varias grabaciones, la interfaz de DevTools muestra un desplegable **Recording N** para cambiar entre ellas.

### Dónde se guardan los archivos de salida

El directorio que elige cada adaptador es ligeramente diferente: todos comparten el mismo resolvedor en `@wdio/devtools-core`, pero le proporcionan entradas distintas:

| Adaptador | Ubicación de salida |
|---|---|
| **WebdriverIO** | `outputDir` si se establece explícitamente en `wdio.conf.ts`; de lo contrario, `rootDir` (el directorio que contiene la configuración). Evita establecer `outputDir` solo para controlar las rutas de los vídeos: WDIO también redirige allí los registros de los workers. |
| **Selenium** | Directorio del archivo de prueba que se acaba de ejecutar; en su defecto, `process.cwd()`. |
| **Nightwatch** | Directorio del archivo de prueba; en su defecto, el directorio que contiene `nightwatch.conf.*` y, después, `process.cwd()`. |

Los directorios dentro de `node_modules/` se omiten en Selenium/Nightwatch para que los espacios de trabajo enlazados simbólicamente no vuelquen vídeos en una carpeta de dependencias.

## Archivos de salida

El modo en vivo transmite los datos capturados al panel a través de WebSocket y **no escribe ningún archivo de traza en el disco**; para obtener un artefacto portátil, utiliza el [modo de traza](/docs/devtools/wdio/trace-mode) (`trace.zip`). El único archivo que escribe el modo en vivo es el vídeo de la grabación de pantalla, y solo cuando `screencast.enabled: true`. Los nombres de archivo dependen del adaptador (el nombre del framework aparece en el prefijo):

| Adaptador | Vídeo de la grabación de pantalla |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |