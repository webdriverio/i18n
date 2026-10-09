---
id: cli-wizard
title: CLI-guide
description: "Kontrollera vilken text OCR-tjänsten kan hitta i en bild utan att köra ett test genom att använda OCR CLI-guiden."
---

Du kan validera vilken text som kan hittas i en bild utan att köra ett test genom att använda OCR CLI-guiden. Det enda som behövs är:

-   att du har installerat `@wdio/ocr-service` som ett beroende, se [Kom igång](./getting-started)
-   en bild som du vill bearbeta

Kör sedan följande kommando för att starta guiden

```sh
npx ocr-service
```

Detta startar en guide som leder dig genom stegen för att välja en bild och använda en haystack samt avancerat läge. Följande frågor ställs

## Hur vill du ange filen?

Följande alternativ kan väljas

-   Använd en "filutforskare"
-   Ange sökvägen till filen manuellt

### Använd en "filutforskare"

CLI-guiden erbjuder ett alternativ att använda en "filutforskare" för att söka efter filer på ditt system. Den startar från mappen där du kör kommandot. När du har valt en bild (använd piltangenterna och ENTER-tangenten) går du vidare till nästa fråga

### Ange sökvägen till filen manuellt

Detta är en direkt sökväg till en fil någonstans på din lokala dator

### Vill du använda en haystack?

Här har du möjlighet att välja ett område som ska bearbetas. Detta kan påskynda processen eller minska/begränsa mängden text som OCR-motorn kan hitta. Du behöver ange `x`, `y`, `width`, `height` baserat på följande frågor:

-   Ange x-koordinaten:
-   Ange y-koordinaten:
-   Ange bredden:
-   Ange höjden:

## Vill du använda det avancerade läget?

Det avancerade läget innehåller extra funktioner som:

-   att ställa in kontrasten
-   fler kommer i framtiden

## Demo

Här är en demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>