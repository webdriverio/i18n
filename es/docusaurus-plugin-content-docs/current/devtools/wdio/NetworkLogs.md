---
id: network-logs
title: Registros de red
description: "Inspecciona cada solicitud y respuesta HTTP capturada por DevTools durante una prueba para depurar llamadas a la API, payloads y solicitudes lentas."
---

Supervisa e inspecciona toda la actividad de red durante tus pruebas. DevTools captura cada solicitud y respuesta HTTP, brindándote visibilidad completa de las llamadas a la API, la carga de recursos y los tiempos de red, igual que las DevTools del navegador.

**Qué se captura:**
- **Detalles de la solicitud**: URL, método, encabezados, parámetros de consulta, cuerpo de la solicitud
- **Datos de la respuesta**: código de estado, encabezados de respuesta, cuerpo de la respuesta, tiempos
- **Tipos de recursos**: solicitudes XHR/Fetch, scripts, hojas de estilo, imágenes y más
- **Métricas de rendimiento**: tiempos de las solicitudes, duración y cascada de red

Esto resulta invaluable para depurar problemas de API, identificar solicitudes lentas, validar payloads de datos y comprender el comportamiento de red de tu aplicación durante las pruebas.

## Sin WebDriver BiDi

Safari y todas las sesiones que sirve Appium (Safari en iOS, Chrome en Android) no exponen WebDriver BiDi, por lo que allí la pestaña Network la rellena la propia página, mediante el mismo recolector inyectado que registra el DOM. Utiliza dos fuentes propias de la página:

- **Parche de `fetch` / `XMLHttpRequest`**: cada llamada que realiza la página incluye su método, encabezados, estado y cuerpo.
- **Búfer de Resource Timing**: cada carga que realizó el navegador (el documento, scripts, estilos, imágenes, fuentes) con sus fases de tiempo y tamaño, además de un estado en Chromium. El búfer se lee cuando se instala el recolector, por lo que se incluyen las cargas realizadas antes de que existiera.

Resource Timing no puede ver encabezados ni cuerpos, y en Safari no informa ningún estado. Cada una de esas filas lo indica en su tarjeta de detalle, una fila sin estado se colorea como desconocida en lugar de como fallida o aún en curso, y la columna de método muestra un guion cuando el navegador no indica ninguno. En una traza, la entrada `trace.network` de la fila incluye `_source: "resource-timing"` y el `_resourceType` capturado, de modo que una traza reabierta muestra la misma fila. Una solicitud que ambas fuentes detectaron se lista una sola vez.

Cuando BiDi está sirviendo la sesión, es decir, cuando ha entregado un evento de red y no simplemente aceptado una suscripción, las filas de Resource Timing se descartan para que cada solicitud se liste una sola vez. En Nightwatch, el registro de rendimiento de Chrome actualiza esas filas en el mismo lugar con los encabezados y el estado de los que dispone.

Una sesión de app nativa no tiene documento, por lo que ninguna de las dos fuentes se aplica. En su lugar, su red puede leerse desde el plugin appium-interceptor cuando la sesión establece `appium:intercept: true`; consulta [Red de apps nativas](/docs/devtools/mobile#native-app-network).

## Demo

### 🌐 Registros de red
![Network Logs](/img/devtools/network-logs.gif)