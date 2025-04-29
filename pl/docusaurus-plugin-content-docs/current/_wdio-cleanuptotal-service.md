---
id: wdio-cleanuptotal-service
title: Usługa CleanupTotal
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cleanuptotal-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

Dzięki usłudze `cleanup-total` dla [webdriver.io](https://webdriver.io/), możesz łatwo zapewnić odpowiednie czyszczenie po każdym teście. Usługa dostarcza systematyczny sposób oznaczania encji do usunięcia natychmiast po ich utworzeniu. Jest to szczególnie przydatne, gdy testy obejmują tworzenie złożonych struktur, takich jak konto bankowe z planem inwestycyjnym i depozytem. Bez odpowiedniego czyszczenia, próba usunięcia konta może skutkować błędami, takimi jak odmowa ze względu na to, że konto nie jest puste. Jednak dzięki __cleanup-total__, encje są usuwane we właściwej kolejności, zapewniając, że testy czyszczą po sobie i nie kolidują ze sobą.

## Instalacja
Najłatwiejszym sposobem instalacji tego modułu jako (dev-)zależności jest użycie następującego polecenia:

```
npm install wdio-cleanuptotal-service --save-dev
```

## Użycie

Dodaj wdio-cleanuptotal-service do swojego `wdio.conf.ts`:

```typescript
export const config: WebdriverIO.Config = {
  // ... inne opcje

  services: ['cleanuptotal']

  // ... inne opcje
};
```

lub z opcjami usługi:

```typescript
export const config: WebdriverIO.Config = {
  // ... inne opcje

  services: [
    [
      'cleanuptotal',
      {
        // Użyj niestandardowej funkcji loggera do zapisywania wiadomości w raporcie testu
        customLoggerMethod: console.log(), // TODO: zastąp własną funkcją loggera, jeśli to konieczne

        // Zapisuj w logu tylko gdy wystąpi błąd, aby zmniejszyć bałagan
        logErrorsOnly: false, // TODO: rozważ zmianę na 'true', jeśli masz zbyt wiele wiadomości w raporcie
      }
    ]
  ]

  // ... inne opcje
};
```

## Użycie w teście

Możesz zaimportować usługę __cleanuptotal__ wszędzie tam, gdzie jest potrzebna, czy to w pliku testowym, czy w dowolnej innej klasie.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Utwórz konto i dodaj je do listy czyszczenia do usunięcia po teście
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Dodaj plan inwestycyjny do konta i dodaj go do listy czyszczenia
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Wpłać środki na konto i dodaj je do listy czyszczenia
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Zauważ, że kod czyszczenia zostanie wykonany po zakończeniu testu
```

## Wsparcie dla Typescript

Ten plugin obsługuje Typescript.

## Wsparcie

W celu uzyskania wsparcia i sugestii, skontaktuj się ze mną pod adresem [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com).