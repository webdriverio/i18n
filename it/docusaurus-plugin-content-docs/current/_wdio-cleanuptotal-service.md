---
id: wdio-cleanuptotal-service
title: Servizio CleanupTotal
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---


> wdio-cleanuptotal-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

Con il servizio `cleanup-total` per [webdriver.io](https://webdriver.io/), puoi facilmente garantire una corretta pulizia dopo ogni test. Il servizio fornisce un modo sistematico per contrassegnare le entità per l'eliminazione immediatamente dopo la creazione. Questo è particolarmente utile quando i test coinvolgono la creazione di strutture complesse, come un conto bancario con un piano di investimento e un deposito. Senza una corretta pulizia, il tentativo di eliminare il conto può risultare in errori, come un rifiuto dovuto al fatto che il conto non è vuoto. Tuttavia, con __cleanup-total__, le entità vengono eliminate nell'ordine corretto, assicurando che i test puliscano dopo se stessi e non interferiscano tra loro.

## Installazione
Il modo più semplice per installare questo modulo come (dev-)dipendenza è utilizzare il seguente comando:

```
npm install wdio-cleanuptotal-service --save-dev
```

## Utilizzo

Aggiungi wdio-cleanuptotal-service al tuo `wdio.conf.ts`:

```typescript
export const config: WebdriverIO.Config = {
  // ... altre opzioni

  services: ['cleanuptotal']

  // ... altre opzioni
};
```

o con le opzioni del servizio:

```typescript
export const config: WebdriverIO.Config = {
  // ... altre opzioni

  services: [
    [
      'cleanuptotal',
      {
        // Utilizza una funzione di logger personalizzata per scrivere messaggi nel report del test
        customLoggerMethod: console.log(), // TODO: sostituisci con la tua funzione di logger se necessario

        // Scrivi nel log solo quando si verifica un errore per ridurre il disordine
        logErrorsOnly: false, // TODO: considera di cambiare a 'true' se hai troppi messaggi nel report
      }
    ]
  ]

  // ... altre opzioni
};
```

## Utilizzo nei test

Puoi importare il servizio __cleanuptotal__ ovunque sia necessario, sia nel tuo file di test che in qualsiasi altra classe.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Crea un account e aggiungilo alla lista di pulizia per l'eliminazione dopo il test
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Aggiungi un piano di investimento all'account e aggiungilo alla lista di pulizia
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Deposita fondi nell'account e aggiungi alla lista di pulizia
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Nota che il codice di pulizia effettivo verrà eseguito dopo il completamento del test
```

## Supporto Typescript

Questo plugin supporta Typescript.

## Supporto

Per supporto e suggerimenti, sentiti libero di contattarmi a [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com).