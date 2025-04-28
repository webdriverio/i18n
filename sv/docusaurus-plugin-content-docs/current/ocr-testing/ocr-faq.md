---
id: ocr-faq
title: Vanliga frågor
---

## Mina tester är mycket långsamma

När du använder denna `@wdio/ocr-service` använder du den inte för att snabba upp dina tester, du använder den för att du har svårt att hitta element i din webb/mobilapp och du vill ha ett enklare sätt att hitta dem. Och vi vet förhoppningsvis alla att när du vill ha något, förlorar du något annat. **Men...**, det finns ett sätt att göra `@wdio/ocr-service` snabbare än normalt. Mer information om det finns [här](./more-test-optimization).

## Kan jag använda kommandona från denna tjänst med standardkommandona/väljarna i WebdriverIO?

Ja, du kan kombinera kommandona för att göra ditt skript ännu kraftfullare! Rådet är att använda WebdriverIOs standardkommandon/väljare så mycket som möjligt och endast använda denna tjänst när du inte kan hitta en unik väljare, eller när din väljare blir för skör.

## Min text hittas inte, hur är det möjligt?

Först är det viktigt att förstå hur OCR-processen i denna modul fungerar, så läs gärna [denna](./ocr-testing) sida. Om du fortfarande inte kan hitta din text kan du prova följande saker.

### Bildområdet är för stort

När modulen behöver bearbeta ett stort område av skärmbilden kanske den inte hittar texten. Du kan ange ett mindre område genom att tillhandahålla en höstack när du använder ett kommando. Vänligen kontrollera [kommandona](./ocr-click-on-text) för att se vilka kommandon som stöder höstack.

### Kontrasten mellan texten och bakgrunden är inte korrekt

Detta innebär att du kan ha ljus text på en vit bakgrund eller mörk text på en mörk bakgrund. Detta kan resultera i att texten inte hittas. I exemplen nedan kan du se att texten `Why WebdriverIO?` är vit och omgiven av en grå knapp. I detta fall kommer det att resultera i att texten `Why WebdriverIO?` inte hittas. Genom att öka kontrasten för det specifika kommandot hittar det texten och kan klicka på den, se den andra bilden.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Med standardkontrasten på 0,25 hittas inte texten
    contrast: 1,
});
```

![Kontrastproblem](/img/ocr/increased-contrast.jpg)

## Varför klickas mitt element men tangentbordet på mina mobila enheter visas aldrig?

Detta kan hända på vissa textfält där klicket uppfattas som för långt och anses vara ett långt tryck. Du kan använda alternativet `clickDuration` på [`ocrClickOnText`](./ocr-click-on-text) och [`ocrSetValue`](./ocr-set-value) för att lindra detta. Se [här](./ocr-click-on-text#options).

## Kan denna modul ge tillbaka flera element som WebdriverIO normalt kan göra?

Nej, detta är för närvarande inte möjligt. Om modulen hittar flera element som matchar den angivna väljaren kommer den automatiskt att hitta det element som har högst matchningspoäng.

## Kan jag helt automatisera min app med OCR-kommandona som tillhandahålls av denna tjänst?

Jag har aldrig gjort det, men teoretiskt sett borde det vara möjligt. Meddela oss gärna om du lyckas med det ☺️.

## Jag ser en extra fil som heter `{languageCode}.traineddata` som läggs till, vad är detta?

`{languageCode}.traineddata` är en språkdatafil som används av Tesseract. Den innehåller träningsdata för det valda språket, vilket inkluderar den nödvändiga informationen för att Tesseract effektivt ska känna igen engelska tecken och ord.

### Innehållet i `{languageCode}.traineddata`

Filen innehåller generellt:

1. **Teckensättningsdata:** Information om tecknen i det engelska språket.
1. **Språkmodell:** En statistisk modell för hur tecken bildar ord och ord bildar meningar.
1. **Funktionsextraktorer:** Data om hur man extraherar funktioner från bilder för igenkänning av tecken.
1. **Träningsdata:** Data som härrör från träning av Tesseract på en stor uppsättning av engelska textbilder.

### Varför är `{languageCode}.traineddata` viktig?

1. **Språkigenkänning:** Tesseract förlitar sig på dessa träningsdatafiler för att korrekt känna igen och bearbeta text på ett specifikt språk. Utan `{languageCode}.traineddata` skulle Tesseract inte kunna känna igen engelsk text.
1. **Prestanda:** Kvaliteten och noggrannheten hos OCR är direkt relaterad till kvaliteten på träningsdata. Att använda rätt träningsdatafil säkerställer att OCR-processen är så exakt som möjligt.
1. **Kompatibilitet:** Att säkerställa att filen `{languageCode}.traineddata` inkluderas i ditt projekt gör det enklare att replikera OCR-miljön över olika system eller teammedlemmars datorer.

### Versionshantering av `{languageCode}.traineddata`

Att inkludera `{languageCode}.traineddata` i ditt versionskontrollsystem rekommenderas av följande skäl:

1. **Konsekvens:** Det säkerställer att alla teammedlemmar eller driftsättningmiljöer använder exakt samma version av träningsdata, vilket leder till konsekventa OCR-resultat i olika miljöer.
1. **Reproducerbarhet:** Att lagra denna fil i versionskontroll gör det lättare att reproducera resultat när OCR-processen körs vid ett senare tillfälle eller på en annan maskin.
1. **Beroendehantering:** Att inkludera den i versionskontrollsystemet hjälper till att hantera beroenden och säkerställer att all installation eller miljökonfiguration inkluderar de nödvändiga filerna för att projektet ska fungera korrekt.

## Finns det ett enkelt sätt att se vilken text som hittas på min skärm utan att köra ett test?

Ja, du kan använda vår CLI-guide för det. Dokumentation finns [här](./cli-wizard)