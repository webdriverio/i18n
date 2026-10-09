---
id: dashboard
title: El panel de control
description: "Observa las ejecuciones de pruebas en vivo en el panel de control de DevTools, vuelve a ejecutar pruebas o suites individuales y configura la ventana del panel y el backend."
---

El modo en vivo abre la interfaz de DevTools en una ventana externa del navegador y transmite la ejecución de tus pruebas en tiempo real. Es la contraparte interactiva del [Modo de rastreo](/docs/devtools/wdio/trace-mode), que omite la interfaz y, en su lugar, genera un artefacto portátil para uso sin conexión. El modo en vivo está habilitado por defecto (`mode: 'live'`), por lo que basta con ejecutar tus pruebas de WebdriverIO para iniciar el panel de control.

Cuando ejecutas tus pruebas, la interfaz de DevTools se abre automáticamente en una ventana externa del navegador y las pruebas comienzan a ejecutarse de inmediato con visualización en tiempo real. Una vez finalizada la ejecución inicial, usa los botones de reproducción para volver a ejecutar pruebas o suites individuales, y el botón de detener para finalizar las pruebas en curso en cualquier momento.

## Qué muestra el panel de control

- **Vista previa del navegador en vivo**: observa el navegador bajo prueba mientras se ejecutan los comandos.
- **Progreso de las pruebas**: las suites y las pruebas se actualizan a medida que se ejecutan.
- **Ejecución de comandos**: cada acción se transmite en el momento en que ocurre.
- **Pestañas del área de trabajo**: explora Actions, Console, Network, Metadata y Source para la prueba seleccionada.

## Funciones del modo en vivo

- **[Reejecución y visualización interactiva de pruebas](/docs/devtools/wdio/interactive-test-rerunning)**: vistas previas del navegador en tiempo real con reejecución de pruebas
- **[Conservar y reejecutar (Comparar)](/docs/devtools/wdio/preserve-and-rerun)**: captura una instantánea de una prueba fallida, vuelve a ejecutarla y compara ambas ejecuciones lado a lado
- **[Registros de consola](/docs/devtools/wdio/console-logs)**: captura e inspecciona la salida de la consola del navegador
- **[Registros de red](/docs/devtools/wdio/network-logs)**: supervisa las llamadas a la API y la actividad de red
- **[Metadatos](/docs/devtools/wdio/metadata)**: capacidades de la sesión, entorno y tiempos por cada sesión del navegador
- **[TestLens](/docs/devtools/wdio/testlens)**: navega al código fuente con navegación de código inteligente
- **[Compatibilidad con múltiples frameworks](/docs/devtools/wdio/multi-framework-support)**: funciona con Mocha, Jasmine y Cucumber
- **[Screencast de la sesión](/docs/devtools/wdio/screencast)**: grabación automática de video de las sesiones del navegador

## Configuración de la ventana del panel de control

Las opciones `port`, `hostname` y `devtoolsCapabilities` controlan el servidor de la interfaz de DevTools y la ventana en la que se abre. Consulta la [Referencia de configuración](/docs/devtools/reference) para más detalles.

## Ejecutar el backend por separado

Los adaptadores inician el servidor del panel de control dentro del mismo proceso, por lo que normalmente nunca tendrás que interactuar con él. También se distribuye como un binario independiente, que es lo que necesitas cuando el panel de control debe sobrevivir a una sola ejecución, o cuando las pruebas no están escritas en JavaScript, como ocurre con el adaptador de Python (consulta la página de [Selenium](/docs/devtools/selenium)).

```bash
npx @wdio/devtools-backend
```

```
Usage: devtools-backend [options]

Options:
  --port <number>     Preferred port; a free one is chosen if it is taken
  --hostname <host>   Host to bind (default: localhost)
  -h, --help          Show this message
```

`--port` es una *preferencia*, no una garantía: si ese puerto está ocupado, el servidor se vincula a uno libre en lugar de fallar. Imprime el puerto al que realmente se vinculó, que es la línea que debes leer en lugar del puerto que solicitaste:

```
devtools-backend listening at http://localhost:3000
```

Dirige una ejecución a un servidor que ya esté escuchando mediante `DEVTOOLS_PORT` (todos los adaptadores lo respetan), y la ejecución se conectará a él en lugar de iniciar uno nuevo.

Un segundo binario, `show-trace`, abre un archivo de rastreo en el reproductor sin conexión; consulta [Reproductor de rastreos](/docs/devtools/trace-player).