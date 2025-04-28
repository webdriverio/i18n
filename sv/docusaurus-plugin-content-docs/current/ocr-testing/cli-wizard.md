---
id: cli-wizard
title: CLI-guide
---

Du kan validera vilken text som kan hittas i en bild utan att köra ett test genom att använda OCR CLI-guiden. Det enda som behövs är:

-   att du har installerat `@wdio/ocr-service` som en beroende, se [Kom igång](./getting-started)
-   en bild som du vill bearbeta

Kör sedan följande kommando för att starta guiden

```sh
npx ocr-service
```

Detta startar en guide som hjälper dig genom stegen för att välja en bild och använda en haystack plus avancerat läge. Följande frågor ställs

## Hur vill du ange filen?

Följande alternativ kan väljas

-   Använd en "filutforskare"
-   Skriv in filsökvägen manuellt

### Använd en "filutforskare"

CLI-guiden erbjuder ett alternativ att använda en "filutforskare" för att söka efter filer på ditt system. Den börjar från mappen där du anropar kommandot. Efter att ha valt en bild (använd piltangenterna och ENTER-tangenten) går du vidare till nästa fråga

### Skriv in filsökvägen manuellt

Detta är en direkt sökväg till en fil någonstans på din lokala maskin

### Vill du använda en haystack?

Här har du möjlighet att välja ett område som behöver bearbetas. Detta kan påskynda processen eller minska/begränsa mängden text som OCR-motorn kan hitta. Du behöver ange data för `x`, `y`, `width`, `height` baserat på följande frågor:

-   Ange x-koordinaten:
-   Ange y-koordinaten:
-   Ange bredden:
-   Ange höjden:

## Vill du använda det avancerade läget?

Avancerat läge innehåller extra funktioner som:

-   inställning av kontrast
-   mer kommer i framtiden

## Demo

Här är en demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>