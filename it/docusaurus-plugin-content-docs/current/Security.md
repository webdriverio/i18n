---
id: security
title: Sicurezza
---

WebdriverIO tiene in considerazione l'aspetto della sicurezza quando fornisce soluzioni. Di seguito sono riportati alcuni modi per proteggere meglio i tuoi test.

# Mascheramento di Dati Sensibili

Se utilizzi dati sensibili durante i tuoi test, è essenziale assicurarsi che non siano visibili a tutti, ad esempio nei log. Inoltre, quando utilizzi un provider cloud, sono spesso coinvolte chiavi private. Queste informazioni devono essere mascherate dai log, dai reporter e da altri punti di contatto. Di seguito sono fornite alcune soluzioni di mascheramento per eseguire test senza esporre tali valori.

## WebDriverIO

### Mascherare il Valore di Testo dei Comandi

I comandi `addValue` e `setValue` supportano un valore booleano mask per mascherare nei log WDIO e Appium, così come nei reporter. Inoltre, anche altri strumenti, come strumenti di performance e strumenti di terze parti, riceveranno la versione mascherata, migliorando la sicurezza.

Per esempio, se stai utilizzando un utente di produzione reale e devi inserire una password che vuoi mascherare, ora è possibile con il seguente codice:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Questo nasconderà il valore di testo dai log WDIO e anche dai log Appium.

Esempio di log:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

Limitazioni:
  - In Appium, plugin aggiuntivi potrebbero far trapelare informazioni anche se chiediamo di mascherarle.
  - I provider cloud potrebbero utilizzare un proxy per la registrazione HTTP, che aggira il meccanismo di mascheramento messo in atto.

:::info

Versione minima richiesta:
 - WDIO v9.15.0
 - Appium v2.19.0

### Mascheramento nei Log WDIO

Utilizzando la configurazione `maskingPatterns`, possiamo mascherare informazioni sensibili dai log WDIO. Tuttavia, i log Appium non sono coperti.

Per esempio, se stai utilizzando un provider Cloud e utilizzi il livello info, molto probabilmente "trapelerai" la chiave dell'utente come mostrato di seguito:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Per contrastare ciò, possiamo passare l'espressione regolare `'--key=([^ ]*)'` e ora nei log vedrai:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Puoi ottenere quanto sopra fornendo l'espressione regolare al campo `maskingPatterns` della configurazione.
  - Per più espressioni regolari, usa una singola stringa ma con valori separati da virgola.
  - Per maggiori dettagli sui pattern di mascheramento, vedi la [sezione Masking Patterns nel README del Logger WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

Versione minima richiesta:
 - WDIO v9.15.0

### Disabilitare i Logger WDIO

Un altro modo per bloccare la registrazione di dati sensibili è abbassare o silenziare il livello di log o disabilitare il logger.
Può essere ottenuto come segue:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

## Soluzioni di Terze Parti

### Appium
Appium offre la sua soluzione di mascheramento; vedi [Log filter](https://appium.io/docs/en/2.0/guides/log-filters/)
 - Può essere complicato utilizzare la loro soluzione. Un modo, se possibile, è passare un token nella tua stringa come `@mask@` e utilizzarlo come espressione regolare
 - In alcune versioni di Appium, i valori vengono anche registrati con ogni carattere separato da virgola, quindi dobbiamo fare attenzione.
 - Sfortunatamente, BrowserStack non supporta questa soluzione, ma è comunque utile localmente
 
Utilizzando l'esempio `@mask@` menzionato in precedenza, possiamo utilizzare il seguente file JSON denominato `appiumMaskLogFilters.json`
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

Quindi passa il nome del file JSON al campo `logFilters` nella configurazione del servizio appium:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

### BrowserStack

BrowserStack offre anche un certo livello di mascheramento per nascondere alcuni dati; vedi [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Sfortunatamente, la soluzione è tutto o niente, quindi tutti i valori di testo dei comandi forniti saranno mascherati.