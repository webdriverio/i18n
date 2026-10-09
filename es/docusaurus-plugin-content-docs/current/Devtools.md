---
id: devtools
title: DevTools
description: "Visualiza, controla e inspecciona ejecuciones de pruebas en una interfaz de depuración basada en navegador que funciona con WebdriverIO, Nightwatch.js y Selenium WebDriver."
---

DevTools es una potente interfaz de depuración basada en navegador para visualizar, controlar e inspeccionar las ejecuciones de tus pruebas en tiempo real. Funciona con **WebdriverIO**, **Nightwatch.js** y **Selenium WebDriver** (cualquier runner): mismo backend, misma interfaz y misma infraestructura de captura.

## Qué ofrece

- **Volver a ejecutar pruebas de forma selectiva** - Haz clic en cualquier caso de prueba o suite para volver a ejecutarlo al instante ([detalles](/docs/devtools/wdio/interactive-test-rerunning))
- **Preservar y volver a ejecutar (Comparar)** - Toma una instantánea de una prueba fallida, vuelve a ejecutarla y compara las dos ejecuciones lado a lado, alineadas por comando ([detalles](/docs/devtools/wdio/preserve-and-rerun))
- **Depurar visualmente** - Ve vistas previas del navegador en vivo con capturas de pantalla automáticas después de cada comando
- **Seguir la ejecución** - Consulta registros detallados de comandos con marcas de tiempo y resultados
- **Monitorizar red y consola** - Inspecciona llamadas a la API y registros de JavaScript ([red](/docs/devtools/wdio/network-logs) · [consola](/docs/devtools/wdio/console-logs))
- **Navegar al código** - Salta directamente a los archivos fuente de las pruebas con TestLens ([detalles](/docs/devtools/wdio/testlens))
- **Grabar sesiones** - Video `.webm` continuo del navegador, por sesión ([detalles](/docs/devtools/wdio/screencast))
- **Modo trace** - Ruta de captura headless que genera un artefacto portátil `trace.zip` para su reproducción sin conexión o su consumo por agentes ([detalles](/docs/devtools/wdio/trace-mode))

## Cómo funciona

1. Inicia tus pruebas como de costumbre
2. DevTools abre automáticamente una ventana del navegador en `http://localhost:3000`
3. La interfaz muestra la jerarquía de pruebas, la vista previa del navegador, la línea de tiempo de comandos y los registros en tiempo real
4. Una vez finalizadas las pruebas, haz clic en cualquier prueba para volver a ejecutarla individualmente en la misma sesión del navegador

## Elige tu framework

- **[WebDriverIO](/docs/devtools/wdio)** - Usa `@wdio/devtools-service` con Mocha, Jasmine o Cucumber
- **[Nightwatch](/docs/devtools/nightwatch)** - Usa `@wdio/nightwatch-devtools` sin ningún cambio en el código de las pruebas
- **[Selenium](/docs/devtools/selenium)** - Usa `@wdio/selenium-devtools` con Mocha, Jest, Cucumber o scripts simples de Node