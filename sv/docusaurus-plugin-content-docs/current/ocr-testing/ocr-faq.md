---
id: ocr-faq
title: Vanliga frågor
description: "Hitta svar på vanliga frågor om långsamma OCR-tester, text som inte hittas och hur man kombinerar OCR-kommandon med vanliga selektorer."
---

## Mina tester är väldigt långsamma

När du använder `@wdio/ocr-service` gör du det inte för att snabba upp dina tester, utan för att du har svårt att lokalisera element i din webb-/mobilapp och vill ha ett enklare sätt att hitta dem. Och vi vet förhoppningsvis alla att när man vill ha något, så förlorar man något annat. **Men....**, det finns ett sätt att få `@wdio/ocr-service` att köras snabbare än normalt. Mer information om det finns [här](./more-test-optimization).

## Kan jag använda kommandona från den här tjänsten tillsammans med standardkommandona/-selektorerna i WebdriverIO?

Ja, du kan kombinera kommandona för att göra ditt skript ännu kraftfullare! Rådet är att använda standardkommandona/-selektorerna i WebdriverIO så mycket som möjligt och endast använda den här tjänsten när du inte kan hitta en unik selektor, eller när din selektor skulle bli för bräcklig.

## Min text hittas inte, hur är det möjligt?

Först är det viktigt att förstå hur OCR-processen i den här modulen fungerar, så läs gärna [den här](./ocr-testing) sidan. Om du fortfarande inte hittar din text kan du prova följande saker.

### Bildområdet är för stort

När modulen behöver bearbeta ett stort område av skärmdumpen kan det hända att den inte hittar texten. Du kan ange ett mindre område genom att ange en haystack när du använder ett kommando. Se [kommandona](./ocr-click-on-text) för att se vilka kommandon som stöder att man anger en haystack.

### Kontrasten mellan texten och bakgrunden är inte korrekt

Det betyder att du kanske har ljus text på en vit bakgrund eller mörk text på en mörk bakgrund. Detta kan leda till att texten inte hittas. I exemplen nedan kan du se att texten `Why WebdriverIO?` är vit och omges av en grå knapp. I det här fallet leder det till att texten `Why WebdriverIO?` inte hittas. Genom att öka kontrasten för det specifika kommandot hittas texten och den kan klickas på, se den andra bilden.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Med standardkontrasten 0.25 hittas inte texten
    contrast: 1,
});
```

![Contrast issues](/img/ocr/increased-contrast.jpg)

## Varför klickas mitt element men tangentbordet på mina mobila enheter dyker aldrig upp?

Detta kan hända på vissa textfält där klicket bedöms vara för långt och betraktas som ett långt tryck. Du kan använda alternativet `clickDuration` på [`ocrClickOnText`](./ocr-click-on-text) och [`ocrSetValue`](./ocr-set-value) för att åtgärda detta. Se [här](./ocr-click-on-text#options).

## Kan den här modulen returnera flera element som WebdriverIO normalt kan?

Nej, det är för närvarande inte möjligt. Om modulen hittar flera element som matchar den angivna selektorn kommer den automatiskt att välja det element som har högst matchningspoäng.

## Kan jag helt automatisera min app med OCR-kommandona som den här tjänsten tillhandahåller?

Jag har aldrig gjort det, men i teorin borde det vara möjligt. Låt oss gärna veta om du lyckas med det ☺️.

## Jag ser att en extra fil som heter `{languageCode}.traineddata` läggs till, vad är det?

`{languageCode}.traineddata` är en språkdatafil som används av Tesseract. Den innehåller träningsdata för det valda språket, vilket inkluderar den information som Tesseract behöver för att effektivt känna igen engelska tecken och ord.

### Innehållet i `{languageCode}.traineddata`

Filen innehåller i allmänhet:

1. **Teckenuppsättningsdata:** Information om tecknen i det engelska språket.
1. **Språkmodell:** En statistisk modell över hur tecken bildar ord och ord bildar meningar.
1. **Särdragsextraktorer:** Data om hur särdrag extraheras från bilder för igenkänning av tecken.
1. **Träningsdata:** Data som härrör från träning av Tesseract på en stor mängd bilder med engelsk text.

### Varför är `{languageCode}.traineddata` viktig?

1. **Språkigenkänning:** Tesseract förlitar sig på dessa tränade datafiler för att korrekt känna igen och bearbeta text på ett specifikt språk. Utan `{languageCode}.traineddata` skulle Tesseract inte kunna känna igen engelsk text.
1. **Prestanda:** Kvaliteten och noggrannheten i OCR hänger direkt ihop med kvaliteten på träningsdatan. Att använda rätt tränad datafil säkerställer att OCR-processen blir så noggrann som möjligt.
1. **Kompatibilitet:** Att se till att filen `{languageCode}.traineddata` ingår i ditt projekt gör det enklare att återskapa OCR-miljön på olika system eller teammedlemmars datorer.

### Versionshantering av `{languageCode}.traineddata`

Att inkludera `{languageCode}.traineddata` i ditt versionshanteringssystem rekommenderas av följande skäl:

1. **Konsekvens:** Det säkerställer att alla teammedlemmar eller driftsmiljöer använder exakt samma version av träningsdatan, vilket leder till konsekventa OCR-resultat i olika miljöer.
1. **Reproducerbarhet:** Att lagra den här filen i versionshanteringen gör det enklare att återskapa resultat när OCR-processen körs vid ett senare tillfälle eller på en annan dator.
1. **Beroendehantering:** Att inkludera den i versionshanteringssystemet hjälper till att hantera beroenden och säkerställer att all installation eller miljökonfiguration innehåller de filer som krävs för att projektet ska fungera korrekt.

## Finns det ett enkelt sätt att se vilken text som hittas på min skärm utan att köra ett test?

Ja, du kan använda vår CLI-guide för det. Dokumentationen finns [här](./cli-wizard)