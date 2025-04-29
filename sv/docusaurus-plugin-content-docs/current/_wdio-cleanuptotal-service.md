---
id: wdio-cleanuptotal-service
title: CleanupTotal Service
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cleanuptotal-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

Med `cleanup-total`-tjänsten för [webdriver.io](https://webdriver.io/) kan du enkelt säkerställa ordentlig upprensning efter varje test. Tjänsten ger ett systematiskt sätt att markera enheter för borttagning direkt efter skapande. Detta är särskilt användbart när tester involverar skapande av komplexa strukturer, som ett bankkonto med en investeringsplan och en insättning. Utan ordentlig upprensning kan försök att ta bort kontot resultera i fel, såsom vägran på grund av att kontot inte är tomt. Men med __cleanup-total__ raderas enheter i rätt ordning, vilket säkerställer att tester rensar upp efter sig själva och inte stör varandra.

## Installation
Det enklaste sättet att installera denna modul som en (dev-)beroende är genom att använda följande kommando:

```
npm install wdio-cleanuptotal-service --save-dev
```

## Användning

Lägg till wdio-cleanuptotal-service i din `wdio.conf.ts`:

```typescript
export const config: WebdriverIO.Config = {
  // ... andra alternativ

  services: ['cleanuptotal']

  // ... andra alternativ
};
```

eller med tjänstalternativ:

```typescript
export const config: WebdriverIO.Config = {
  // ... andra alternativ

  services: [
    [
      'cleanuptotal',
      {
        // Använd en anpassad loggarfunktion för att skriva meddelanden till testrapporten
        customLoggerMethod: console.log(), // TODO: ersätt med din egen loggarfunktion om det behövs

        // Skriv endast till loggen när ett fel inträffar för att minska röran
        logErrorsOnly: false, // TODO: överväg att ändra till 'true' om du har för många meddelanden i rapporten
      }
    ]
  ]

  // ... andra alternativ
};
```

## Användning i test

Du kan importera __cleanuptotal__-tjänsten var den än behövs, vare sig det är i din testfil eller någon annan klass.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Skapa ett konto och lägg till det i upprensningslistan för borttagning efter testet
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Lägg till en investeringsplan till kontot och lägg till den i upprensningslistan
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Sätt in pengar på kontot och lägg till det i upprensningslistan
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Observera att den faktiska upprensningskoden kommer att köras efter att testet är slutfört
```

## Typescript-stöd

Typescript stöds för detta plugin.

## Support

För support och förslag, kontakta gärna mig på [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com).