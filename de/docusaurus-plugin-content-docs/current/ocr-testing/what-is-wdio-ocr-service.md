---
id: ocr-testing
title: OCR-Tests
description: "Lokalisieren Sie Elemente in Web- und mobilen Apps anhand ihres sichtbaren Textes und interagieren Sie mit ihnen über den OCR-Service, wenn reguläre Selektoren nicht ausreichen."
---

Automatisiertes Testen von nativen mobilen Apps und Desktop-Websites kann besonders herausfordernd sein, wenn man es mit Elementen zu tun hat, die keine eindeutigen Bezeichner haben. Standardmäßige [WebdriverIO-Selektoren](https://webdriver.io/docs/selectors) helfen Ihnen dabei möglicherweise nicht immer weiter. Willkommen in der Welt des `@wdio/ocr-service`, eines leistungsstarken Services, der OCR ([Optische Zeichenerkennung](https://en.wikipedia.org/wiki/Optical_character_recognition)) nutzt, um Elemente auf dem Bildschirm anhand ihres **sichtbaren Textes** zu suchen, auf sie zu warten und mit ihnen zu interagieren.

Die folgenden benutzerdefinierten Befehle werden bereitgestellt und dem `browser/driver`-Objekt hinzugefügt, sodass Sie das richtige Werkzeug für Ihre Arbeit erhalten.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Wie funktioniert es

Dieser Service wird

1. einen Screenshot Ihres Bildschirms/Geräts erstellen. (Bei Bedarf können Sie einen Haystack angeben, der ein Element oder ein Rechteck-Objekt sein kann, um einen bestimmten Bereich festzulegen. Siehe die Dokumentation zu jedem Befehl.)
1. das Ergebnis für OCR optimieren, indem der Screenshot in einen kontrastreichen Schwarz-Weiß-Screenshot umgewandelt wird (der hohe Kontrast ist notwendig, um starkes Bildhintergrundrauschen zu vermeiden. Dies kann pro Befehl angepasst werden.)
1. [Optische Zeichenerkennung](https://en.wikipedia.org/wiki/Optical_character_recognition) von [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) verwenden, um den gesamten Text vom Bildschirm zu erhalten und den gesamten gefundenen Text auf einem Bild hervorzuheben. Es werden mehrere Sprachen unterstützt, die [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html) zu finden sind.
1. Fuzzy-Logik von [Fuse.js](https://fusejs.io/) verwenden, um Zeichenketten zu finden, die einem gegebenen Muster _annähernd gleich_ sind (statt exakt). Das bedeutet zum Beispiel, dass der Suchwert `Username` auch den Text `Usename` finden kann oder umgekehrt.
1. einen CLI-Assistenten (`npx ocr-service`) bereitstellen, um Ihre Bilder zu validieren und Text über Ihr Terminal abzurufen

Ein Beispiel für die Schritte 1, 2 und 3 finden Sie in diesem Bild

![Process steps](/img/ocr/processing-steps.jpg)

Es funktioniert mit **NULL** Systemabhängigkeiten (abgesehen von dem, was WebdriverIO verwendet), kann aber bei Bedarf auch mit einer lokalen Installation von [Tesseract](https://tesseract-ocr.github.io/tessdoc/) arbeiten, was die Ausführungszeit drastisch reduziert! (Siehe auch die [Optimierung der Testausführung](#test-execution-optimization), um zu erfahren, wie Sie Ihre Tests beschleunigen können.)

Begeistert? Beginnen Sie noch heute damit, indem Sie der Anleitung [Erste Schritte](./getting-started) folgen.

:::caution Wichtig
Es gibt eine Vielzahl von Gründen, warum Sie von Tesseract möglicherweise keine Ausgabe in guter Qualität erhalten. Einer der wichtigsten Gründe, der mit Ihrer App und diesem Modul zusammenhängen könnte, ist die Tatsache, dass es keine ausreichende farbliche Unterscheidung zwischen dem zu findenden Text und dem Hintergrund gibt. Zum Beispiel kann weißer Text auf dunklem Hintergrund _leicht_ gefunden werden, während heller Text auf weißem Hintergrund oder dunkler Text auf dunklem Hintergrund kaum gefunden werden kann.

Siehe auch [diese Seite](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) für weitere Informationen von Tesseract.

Vergessen Sie auch nicht, die [FAQ](./ocr-faq) zu lesen.
:::