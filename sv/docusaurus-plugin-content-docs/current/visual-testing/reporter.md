---
id: visual-reporter
title: Visuell rapportör
description: "Generera och bläddra i Visual Reporter för att granska visuella testskillnader från JSON-utdata från @wdio/visual-service, lokalt eller i CI."
---

Visual Reporter är en ny funktion som introducerats i `@wdio/visual-service`, från och med version [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Denna rapportör låter användare visualisera de JSON-diffrapporter som genereras av Visual Testing-tjänsten och omvandla dem till ett läsbart format. Den hjälper team att bättre analysera och hantera resultaten från visuella tester genom att tillhandahålla ett grafiskt gränssnitt för att granska utdata.

För att använda denna funktion, se till att du har den konfiguration som krävs för att generera den nödvändiga `output.json`-filen. Detta dokument guidar dig genom att konfigurera, köra och förstå Visual Reporter.

# Förutsättningar

Innan du använder Visual Reporter, se till att du har konfigurerat Visual Testing-tjänsten för att generera JSON-rapportfiler:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Genererar filen output.json
            },
        ],
    ],
};
```

För mer detaljerade installationsinstruktioner, se WebdriverIO:s [dokumentation för visuell testning](./) eller [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Installation

För att installera Visual Reporter, lägg till den som ett utvecklingsberoende i ditt projekt med npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

Detta säkerställer att de nödvändiga filerna finns tillgängliga för att generera rapporter från dina visuella tester.

# Användning

## Bygga den visuella rapporten

När du har kört dina visuella tester och de har genererat filen `output.json` kan du bygga den visuella rapporten med antingen CLI:t eller interaktiva frågor.

### Användning via CLI

Du kan använda CLI-kommandot för att generera rapporten genom att köra:

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### Obligatoriska alternativ:

-   `--jsonOutput`: Den relativa sökvägen till filen `output.json` som genereras av Visual Testing-tjänsten. Denna sökväg är relativ till katalogen från vilken du kör kommandot.
-   `--reportFolder`: Den relativa katalogen där den genererade rapporten kommer att lagras. Även denna sökväg är relativ till katalogen från vilken du kör kommandot.

#### Valfria alternativ:

-   `--logLevel`: Sätt till `debug` för att få detaljerad loggning, särskilt användbart vid felsökning.

#### Exempel

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Detta genererar rapporten i den angivna mappen och ger återkoppling i konsolen. Till exempel:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Visa rapporten

:::warning
Att öppna `path/to/report/index.html` direkt i en webbläsare **utan att servera den från en lokal server** kommer **INTE** att fungera.
:::

För att visa rapporten behöver du använda en enkel server som [sirv-cli](https://www.npmjs.com/package/sirv-cli). Du kan starta servern med följande kommando:

```bash
npx sirv-cli /path/to/report --single
```

Detta ger loggar som liknar exemplet nedan. Observera att portnumret kan variera:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Du kan nu visa rapporten genom att öppna den angivna URL:en i din webbläsare.

### Använda interaktiva frågor

Alternativt kan du köra följande kommando och besvara frågorna för att generera rapporten:

```bash
npx @wdio/visual-reporter
```

Frågorna guidar dig genom att ange de nödvändiga sökvägarna och alternativen. I slutet frågar den interaktiva prompten även om du vill starta en server för att visa rapporten. Om du väljer att starta servern kommer verktyget att starta en enkel server och visa en URL i loggarna. Du kan öppna denna URL i din webbläsare för att visa rapporten.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Visa rapporten

:::warning
Att öppna `path/to/report/index.html` direkt i en webbläsare **utan att servera den från en lokal server** kommer **INTE** att fungera.
:::

Om du valde att **inte** starta servern via den interaktiva prompten kan du fortfarande visa rapporten genom att köra följande kommando manuellt:

```bash
npx sirv-cli /path/to/report --single
```

Detta ger loggar som liknar exemplet nedan. Observera att portnumret kan variera:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Du kan nu visa rapporten genom att öppna den angivna URL:en i din webbläsare.

# Rapportdemo

För att se ett exempel på hur rapporten ser ut, besök vår [demo på GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Förstå den visuella rapporten

Visual Reporter ger en organiserad vy över dina visuella testresultat. För varje testkörning kommer du att kunna:

-   Enkelt navigera mellan testfall och se sammanställda resultat.
-   Granska metadata såsom testnamn, använda webbläsare och jämförelseresultat.
-   Visa diffbilder som visar var visuella skillnader har upptäckts.

Denna visuella representation förenklar analysen av dina testresultat och gör det lättare att identifiera och åtgärda visuella regressioner.

# CI-integrationer

Vi arbetar på att stödja olika CI-verktyg som Jenkins, GitHub Actions och så vidare. Om du vill hjälpa oss, kontakta oss gärna på [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).