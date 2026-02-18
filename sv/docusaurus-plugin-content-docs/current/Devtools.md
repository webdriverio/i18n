---
id: devtools
title: DevTools
---

DevTools-tjänsten tillhandahåller ett kraftfullt webbläsarbaserat felsökningsgränssnitt för WebdriverIO-testkörningar. Den gör det möjligt att visualisera, felsöka och kontrollera dina tester i realtid genom en interaktiv webbapplikation.

## Översikt

Denna tjänst gör det möjligt att:

- **Köra om tester selektivt** - Klicka på valfritt testfall eller test-suite för att köra om det omedelbart
- **Felsöka visuellt** - Se livförhandsvisningar av webbläsaren med automatiska skärmdumpar
- **Spåra körning** - Visa detaljerade kommandologgar med tidsstämplar och resultat
- **Övervaka nätverk & konsol** - Inspektera API-anrop och JavaScript-loggar
- **Navigera till kod** - Hoppa direkt till testkällfiler

## Installation

Installera tjänsten som ett utvecklingsberoende:

```sh
npm install --save-dev @wdio/devtools-service
```

## Konfiguration

Lägg till tjänsten i din WebDriverIO-konfiguration:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### Tjänstalternativ

Konfigurera DevTools-tjänsten med dessa alternativ:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // Port för devtools UI (standard: 3000)
        }]
    ],
    // ...
};
```

#### Alternativ

- **port** (nummer, standard: `3000`) - Portnummer för devtools UI-servern

## Hur det fungerar

När du kör dina WebdriverIO-tester med DevTools-tjänsten aktiverad:

1. Tjänsten öppnar ett webbläsarfönster på `http://localhost:3000` (konfigurerbart)
2. Dina tester körs normalt medan DevTools UI visar realtidsuppdateringar
3. Gränssnittet visar testhierarki, webbläsarförhandsvisning, kommandotidslinje och loggar
4. Efter att testerna slutförts kan du klicka på valfritt test för att köra om det individuellt
5. Tester körs om i samma webbläsarsession för snabbare felsökning

## Funktioner

Utforska DevTools-funktionerna i detalj:

- **[Interaktiv testkörning och visualisering](devtools/interactive-test-rerunning)** - Realtidsförhandsvisning av webbläsare med testkörning
- **[Multi-ramverksstöd](devtools/multi-framework-support)** - Fungerar med Mocha, Jasmine och Cucumber
- **[Konsolloggar](devtools/console-logs)** - Fånga och inspektera webbläsarens konsoloutput
- **[Nätverksloggar](devtools/network-logs)** - Övervaka API-anrop och nätverksaktivitet
- **[TestLens](devtools/testlens)** - Navigera till källkod med intelligent kodnavigering