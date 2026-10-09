---
id: autowait
title: Automatisches Warten
description: "Erfahren Sie, wie WebdriverIO automatisch darauf wartet, dass Elemente interagierbar werden, wann Sie manuell warten sollten und warum von impliziten Timeouts abgeraten wird."
---

Wenn Sie einen Befehl verwenden, der direkt mit einem Element interagiert, wartet WebdriverIO automatisch darauf, dass das Element sichtbar und interagierbar ist. Bei der Verwendung dieser Befehle (z. B. click, setValue usw.) sind keine manuellen Wartezeiten erforderlich.
Ein Element gilt als interagierbar, wenn die Bedingungen für [isClickable](https://webdriver.io/docs/api/element/isClickable) erfüllt sind.

Obwohl WebdriverIO automatisch darauf wartet, dass Elemente interagierbar werden, gibt es seltene Fälle, in denen Sie möglicherweise manuell warten müssen. Für diese seltenen Fälle bieten wir Befehle wie [`waitForDisplayed`](/docs/api/element/waitForDisplayed) an.


## Implizite Timeouts (nicht empfohlen)

Auch wenn wir die Verwendung nicht empfehlen, bietet das WebDriver-Protokoll [implizite Timeouts](https://w3c.github.io/webdriver/#timeouts), mit denen festgelegt werden kann, wie lange der Treiber darauf warten soll, dass ein Element erscheint. Standardmäßig ist dieses Timeout auf `0` gesetzt, wodurch der Treiber sofort mit einem `no such element`-Fehler zurückkehrt, wenn ein Element auf der Seite nicht gefunden werden konnte. Wird dieses Timeout mit [`setTimeout`](/docs/api/browser/setTimeout) erhöht, wartet der Treiber, und die Wahrscheinlichkeit steigt, dass das Element schließlich erscheint.

:::note

Weitere Informationen zu WebDriver- und Framework-bezogenen Timeouts finden Sie im [Timeouts-Leitfaden](/docs/timeouts)

:::