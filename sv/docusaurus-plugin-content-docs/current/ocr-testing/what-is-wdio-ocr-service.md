---
id: ocr-testing
title: OCR-testning
---

Automatiserad testning på mobila applikationer och skrivbordssajter kan vara särskilt utmanande när man hanterar element som saknar unika identifierare. Standardmässiga [WebdriverIO-selektorer](https://webdriver.io/docs/selectors) kanske inte alltid hjälper dig. Här kommer `@wdio/ocr-service` in i bilden, en kraftfull tjänst som utnyttjar OCR ([Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition)) för att söka, vänta på och interagera med element på skärmen baserat på deras **synliga text**.

Följande anpassade kommandon kommer att tillhandahållas och läggas till i `browser/driver`-objektet så att du får rätt verktygsuppsättning för att utföra ditt jobb.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Hur fungerar det

Denna tjänst kommer att

1. skapa en skärmdump av din skärm/enhet. (Vid behov kan du tillhandahålla en haystack, vilket kan vara ett element eller ett rektangelobjekt, för att precisera ett specifikt område. Se dokumentationen för varje kommando.)
1. optimera resultatet för OCR genom att omvandla skärmdumpen till svartvitt med hög kontrast (den höga kontrasten behövs för att förhindra mycket bakgrundsbrus i bilden. Detta kan anpassas per kommando.)
1. använder [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) från [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) för att hämta all text från skärmen och markera all hittad text på en bild. Den kan stödja flera språk som kan hittas [här.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. använder Fuzzy Logic från [Fuse.js](https://fusejs.io/) för att hitta strängar som är _ungefärligt lika_ med ett givet mönster (snarare än exakt). Detta betyder till exempel att sökvärdet `Username` också kan hitta texten `Usename` eller vice versa.
1. Tillhandahåller en cli-guide (`npx ocr-service`) för att validera dina bilder och hämta text genom din terminal

Ett exempel på steg 1, 2 och 3 finns i denna bild

![Process steps](/img/ocr/processing-steps.jpg)

Det fungerar med **NOLL** systemberoenden (förutom vad WebdriverIO använder), men vid behov kan det också fungera med en lokal installation av [Tesseract](https://tesseract-ocr.github.io/tessdoc/) vilket kommer att minska körningstiden drastiskt! (Se även [Test Execution Optimization](#test-execution-optimization) för hur du kan snabba upp dina tester.)

Entusiastisk? Börja använda det idag genom att följa [Kom igång](./getting-started)-guiden.

:::caution Viktigt
Det finns en mängd anledningar till att du kanske inte får bra kvalitet på utdata från Tesseract. En av de största anledningarna som kan vara relaterade till din app och denna modul kan vara att det inte finns tillräcklig färgskillnad mellan texten som behöver hittas och bakgrunden. Till exempel kan vit text på en mörk bakgrund _lätt_ hittas, men ljus text på en vit bakgrund eller mörk text på en mörk bakgrund kan knappt hittas.

Se även [denna sida](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) för mer information från Tesseract.

Glöm inte heller att läsa [FAQ](./ocr-faq).
:::