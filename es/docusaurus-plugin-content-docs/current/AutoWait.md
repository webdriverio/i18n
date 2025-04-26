---
id: autowait
title: Espera automática
---

Cuando se utiliza un comando que interactúa directamente con un elemento, WebdriverIO esperará automáticamente a que el elemento sea visible e interactuable, no se necesitan esperas manuales cuando se utilizan los comandos (como click, setValue, etc.).
Un elemento se considera interactuable cuando se cumplen las condiciones para [isClickable](https://webdriver.io/docs/api/element/isClickable).

Aunque WebdriverIO espera automáticamente a que los elementos sean interactuables, hay casos raros en los que podría necesitar esperar manualmente. Para estos casos poco frecuentes, ofrecemos comandos como [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Tiempos de espera implícitos (no recomendado)

Aunque no recomendamos usar esto, el protocolo WebDriver ofrece [tiempos de espera implícitos](https://w3c.github.io/webdriver/#timeouts) que permiten especificar cuánto tiempo debe esperar el controlador para que aparezca un elemento. Por defecto, este tiempo de espera está establecido en `0` y, por lo tanto, hace que el controlador devuelva un error `no such element` inmediatamente si no se pudo encontrar un elemento en la página. Aumentar este tiempo de espera usando [`setTimeout`](/docs/api/browser/setTimeout) haría que el controlador espere y aumenta las posibilidades de que el elemento aparezca eventualmente.

:::note

Lea más sobre WebDriver y los tiempos de espera relacionados con el framework en la [guía de tiempos de espera](/docs/timeouts)

:::