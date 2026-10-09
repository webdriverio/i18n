---
id: autowait
title: Espera automática
description: "Comprende cómo WebdriverIO espera automáticamente a que los elementos sean interactuables, cuándo esperar manualmente y por qué se desaconsejan los timeouts implícitos."
---

Al usar un comando que interactúa directamente con un elemento, WebdriverIO esperará automáticamente a que el elemento sea visible e interactuable, por lo que no se necesitan esperas manuales al usar estos comandos (piensa en click, setValue, etc.).
Un elemento se considera interactuable cuando se cumplen las condiciones de [isClickable](https://webdriver.io/docs/api/element/isClickable).

Aunque WebdriverIO espera automáticamente a que los elementos sean interactuables, hay casos poco frecuentes en los que podrías necesitar esperar manualmente. Para estos casos poco frecuentes ofrecemos comandos como [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Timeouts implícitos (no recomendado)

Aunque no recomendamos su uso, el protocolo WebDriver ofrece [timeouts implícitos](https://w3c.github.io/webdriver/#timeouts) que permiten especificar cuánto tiempo debe esperar el driver a que aparezca un elemento. Por defecto, este timeout está establecido en `0` y, por lo tanto, hace que el driver devuelva inmediatamente un error `no such element` si no se pudo encontrar un elemento en la página. Aumentar este timeout mediante [`setTimeout`](/docs/api/browser/setTimeout) haría que el driver esperara y aumentaría las probabilidades de que el elemento termine apareciendo.

:::note

Lee más sobre los timeouts relacionados con WebDriver y el framework en la [guía de timeouts](/docs/timeouts)

:::