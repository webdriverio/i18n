---
id: preserve-and-rerun
title: Preservar y volver a ejecutar (Comparar)
description: "Captura una instantánea de una ejecución fallida y vuelve a ejecutar la prueba con un solo clic mediante Preservar y volver a ejecutar; luego compara ambas ejecuciones para descubrir qué cambió."
---

Cuando una prueba falla, el ciclo de depuración habitual es: volver a ejecutarla y luego comparar dos enormes bloques de logs para averiguar qué cambió. Preservar y volver a ejecutar reduce todo eso a un solo clic. **Captura una instantánea de la ejecución fallida y vuelve a ejecutar la prueba en una sola acción**, y después muestra ambas ejecuciones lado a lado en una vista **Comparar**, alineadas comando por comando, para que puedas ver exactamente dónde divergieron sin tener que volver a leer nada.

Esta es la forma más rápida de diagnosticar una prueba inestable (flaky): el comando que se comportó de manera diferente entre la ejecución exitosa y la fallida aparece resaltado, junto con la aserción que falló.

Disponible en los tres adaptadores: **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** y **[Nightwatch.js](/docs/devtools/nightwatch)**.

## Demostración

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## Cómo funciona

1. Ejecuta tus pruebas como de costumbre. Cuando una prueba termine en estado **fallido**, pasa el cursor sobre su fila en la barra lateral.
2. Aparece un icono de bicho con reproducción (🐞▶) junto al botón ▶ habitual de volver a ejecutar. Solo se muestra en las filas de pruebas/suites fallidas, allí donde ya se admite una reejecución normal (p. ej., escenarios de Cucumber en la fila del escenario, pruebas de Mocha/Jasmine en la fila de la prueba o de la suite).
3. Haz clic en él. DevTools captura una instantánea de la ejecución fallida y luego vuelve a lanzar solo esa prueba.
4. Se abre la pestaña **Comparar** con las dos ejecuciones alineadas por comando. Se señalan el punto de divergencia y el error de aserción (**Expected vs Received**).

## Características principales

- **Instantánea y reejecución con un clic**: preserva la ejecución fallida y vuelve a ejecutarla en una sola acción, sin cambios en el código ni reinicio de toda la suite.
- **Alineación comando por comando**: ambas ejecuciones se muestran lado a lado y alineadas por comando, por lo que las diferencias destacan al instante.
- **Punto de fallo resaltado**: te lleva directamente al comando donde las dos ejecuciones divergieron.
- **Diferencia de aserciones**: muestra la aserción que falló con Expected vs Received lado a lado.
- **Ventana emergente**: abre la comparación en una ventana independiente y con tema para disponer de una vista más amplia.
- **Clasificación de pruebas inestables**: comprueba qué comando difirió entre una ejecución exitosa y una fallida sin volver a leer los logs.

## Limitaciones

- **Cucumber**: la reejecución por paso está deshabilitada porque el filtro `--name` de Cucumber se dirige a escenarios, no a pasos individuales de Gherkin. Preservar y volver a ejecutar a nivel de escenario sigue funcionando.