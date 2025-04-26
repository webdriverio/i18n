---
id: autowait
title: Automatisches Warten
---

Bei der Verwendung eines Befehls, der direkt mit einem Element interagiert, wartet WebdriverIO automatisch darauf, dass das Element sichtbar und interagierbar ist. Es sind keine manuellen Wartezeiten erforderlich, wenn Sie die Befehle verwenden (wie z.B. click, setValue usw.).
Ein Element gilt als interagierbar, wenn die Bedingungen für [isClickable](https://webdriver.io/docs/api/element/isClickable) erfüllt sind.

Während WebdriverIO automatisch darauf wartet, dass Elemente interagierbar werden, gibt es seltene Fälle, in denen Sie möglicherweise manuell warten müssen. Für diese seltenen Fälle bieten wir Befehle wie [`waitForDisplayed`](/docs/api/element/waitForDisplayed) an.


## Implizite Timeouts (nicht empfohlen)

Obwohl wir dies nicht empfehlen, bietet das WebDriver-Protokoll [implizite Timeouts](https://w3c.github.io/webdriver/#timeouts), mit denen Sie festlegen können, wie lange der Treiber auf das Erscheinen eines Elements warten soll. Standardmäßig ist dieser Timeout auf `0` gesetzt und veranlasst den Treiber daher, sofort mit einem `no such element`-Fehler zurückzukehren, wenn ein Element nicht auf der Seite gefunden werden konnte. Die Erhöhung dieses Timeouts mit [`setTimeout`](/docs/api/browser/setTimeout) würde den Treiber zum Warten veranlassen und erhöht die Chancen, dass das Element schließlich erscheint.

:::note

Lesen Sie mehr über WebDriver- und Framework-bezogene Timeouts im [Timeouts-Leitfaden](/docs/timeouts)

:::