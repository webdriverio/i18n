---
id: ocr-testing
title: OCR-Tests
---

Automatisierte Tests auf mobilen nativen Apps und Desktop-Websites können besonders herausfordernd sein, wenn es um Elemente geht, die keine eindeutigen Identifikatoren haben. Standard [WebdriverIO-Selektoren](https://webdriver.io/docs/selectors) können Ihnen nicht immer helfen. Hier kommt der `@wdio/ocr-service` ins Spiel, ein leistungsstarker Service, der OCR ([Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition)) nutzt, um Elemente auf dem Bildschirm anhand ihres **sichtbaren Textes** zu suchen, auf sie zu warten und mit ihnen zu interagieren.

Die folgenden benutzerdefinierten Befehle werden bereitgestellt und dem `browser/driver`-Objekt hinzugefügt, damit Sie die richtigen Werkzeuge für Ihre Aufgabe erhalten.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Wie funktioniert es

Dieser Service wird

1. einen Screenshot Ihres Bildschirms/Geräts erstellen. (Bei Bedarf können Sie einen Haystack angeben, der ein Element oder ein Rechteckobjekt sein kann, um einen bestimmten Bereich zu lokalisieren. Siehe die Dokumentation für jeden Befehl.)
1. das Ergebnis für OCR optimieren, indem der Screenshot in ein schwarz/weißes Bild mit hohem Kontrast umgewandelt wird (der hohe Kontrast ist notwendig, um viel Bildhintergrundrauschen zu vermeiden. Dies kann pro Befehl angepasst werden.)
1. verwendet [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) von [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract), um den gesamten Text vom Bildschirm zu erfassen und allen gefundenen Text auf einem Bild hervorzuheben. Es unterstützt mehrere Sprachen, die [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html) gefunden werden können.
1. verwendet Fuzzy Logic von [Fuse.js](https://fusejs.io/), um Zeichenketten zu finden, die einem gegebenen Muster _ungefähr gleich_ sind (anstatt exakt). Das bedeutet zum Beispiel, dass der Suchwert `Username` auch den Text `Usename` finden kann oder umgekehrt.
1. Stellt einen CLI-Assistenten (`npx ocr-service`) bereit, um Ihre Bilder zu validieren und Text über Ihr Terminal abzurufen

Ein Beispiel für die Schritte 1, 2 und 3 finden Sie in diesem Bild

![Prozessschritte](/img/ocr/processing-steps.jpg)

Es funktioniert mit **NULL** Systemabhängigkeiten (abgesehen von dem, was WebdriverIO verwendet), aber bei Bedarf kann es auch mit einer lokalen Installation von [Tesseract](https://tesseract-ocr.github.io/tessdoc/) arbeiten, was die Ausführungszeit drastisch reduziert! (Siehe auch die [Test-Ausführungsoptimierung](#test-execution-optimization), wie Sie Ihre Tests beschleunigen können.)

Begeistert? Beginnen Sie noch heute mit der Nutzung, indem Sie der [Erste Schritte](./getting-started) Anleitung folgen.

:::caution Wichtig
Es gibt verschiedene Gründe, warum Sie möglicherweise keine gute Qualität der Ausgabe von Tesseract erhalten. Einer der größten Gründe, der mit Ihrer App und diesem Modul zusammenhängen könnte, ist die Tatsache, dass es keinen angemessenen Farbunterschied zwischen dem zu findenden Text und dem Hintergrund gibt. Zum Beispiel kann weißer Text auf dunklem Hintergrund _leicht_ gefunden werden, aber heller Text auf weißem Hintergrund oder dunkler Text auf dunklem Hintergrund kann kaum gefunden werden.

Weitere Informationen von Tesseract finden Sie auch auf [dieser Seite](https://tesseract-ocr.github.io/tessdoc/ImproveQuality).

Vergessen Sie auch nicht, die [FAQ](./ocr-faq) zu lesen.
:::