---
id: ocr-testing
title: OCR-testning
description: "Hitta och interagera med element utifrån deras synliga text i webb- och mobilappar med OCR-tjänsten när vanliga selektorer inte räcker till."
---

Automatiserad testning av native-mobilappar och desktopwebbplatser kan vara särskilt utmanande när man hanterar element som saknar unika identifierare. Vanliga [WebdriverIO-selektorer](https://webdriver.io/docs/selectors) kanske inte alltid hjälper dig. Välkommen till `@wdio/ocr-service`, en kraftfull tjänst som använder OCR ([optisk teckenigenkänning](https://en.wikipedia.org/wiki/Optical_character_recognition)) för att söka efter, vänta på och interagera med element på skärmen baserat på deras **synliga text**.

Följande anpassade kommandon tillhandahålls och läggs till i `browser/driver`-objektet så att du får rätt verktyg för att utföra ditt jobb.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Hur fungerar det

Den här tjänsten kommer att

1. ta en skärmdump av din skärm/enhet. (Om det behövs kan du ange en haystack, som kan vara ett element eller ett rektangelobjekt, för att peka ut ett specifikt område. Se dokumentationen för respektive kommando.)
1. optimera resultatet för OCR genom att omvandla skärmdumpen till svartvitt med hög kontrast (den höga kontrasten behövs för att förhindra mycket bakgrundsbrus i bilden. Detta kan anpassas per kommando.)
1. använda [optisk teckenigenkänning](https://en.wikipedia.org/wiki/Optical_character_recognition) från [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) för att hämta all text från skärmen och markera all hittad text i en bild. Den har stöd för flera språk, som du hittar [här.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. använda fuzzy logic från [Fuse.js](https://fusejs.io/) för att hitta strängar som är _ungefär lika_ med ett givet mönster (snarare än exakt lika). Det betyder till exempel att sökvärdet `Username` även kan hitta texten `Usename` eller vice versa.
1. tillhandahålla en CLI-guide (`npx ocr-service`) för att validera dina bilder och hämta text via din terminal

Ett exempel på steg 1, 2 och 3 finns i den här bilden

![Process steps](/img/ocr/processing-steps.jpg)

Den fungerar med **NOLL** systemberoenden (utöver det som WebdriverIO använder), men vid behov kan den även fungera med en lokal installation av [Tesseract](https://tesseract-ocr.github.io/tessdoc/), vilket minskar exekveringstiden drastiskt! (Se även [Optimering av testexekvering](#test-execution-optimization) för hur du kan snabba upp dina tester.)

Entusiastisk? Börja använda den redan idag genom att följa guiden [Kom igång](./getting-started).

:::caution Viktigt
Det finns en rad olika anledningar till att du kanske inte får utdata av god kvalitet från Tesseract. En av de största anledningarna som kan vara relaterad till din app och den här modulen är att det inte finns någon tydlig färgskillnad mellan texten som ska hittas och bakgrunden. Till exempel kan vit text på mörk bakgrund _enkelt_ hittas, men ljus text på vit bakgrund eller mörk text på mörk bakgrund kan knappast hittas.

Se även [den här sidan](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) för mer information från Tesseract.

Glöm inte heller att läsa [FAQ](./ocr-faq).
:::