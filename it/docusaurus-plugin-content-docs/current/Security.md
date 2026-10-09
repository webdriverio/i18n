---
id: security
title: Sicurezza
description: "Proteggi i dati di test sensibili seguendo le best practice di sicurezza e mascherando password e chiavi nei log e nei report."
---

WebdriverIO tiene conto dell'aspetto della sicurezza quando fornisce soluzioni. Di seguito sono riportati alcuni modi per rendere più sicuri i tuoi test.

## Best Practice

- Non inserire mai direttamente nel codice dati sensibili che potrebbero danneggiare la tua organizzazione se esposti in chiaro.
- Utilizza un meccanismo (come un vault) per archiviare in modo sicuro chiavi e password e recuperarle all'avvio dei tuoi test end-to-end.
- Verifica che nessun dato sensibile sia esposto nei Log e dal provider cloud, come i token di autenticazione nei Network Log.

:::info

Anche per i dati di test, è fondamentale chiedersi se, nelle mani sbagliate, una persona malintenzionata potrebbe recuperare informazioni o utilizzare tali risorse con intenti dannosi.

:::

## Mascheramento dei Dati Sensibili

Se utilizzi dati sensibili durante i tuoi test, è fondamentale assicurarsi che non siano visibili a tutti, ad esempio nei log. Inoltre, quando si utilizza un provider cloud, sono spesso coinvolte chiavi private. Queste informazioni devono essere mascherate da log, reporter e altri punti di contatto. Di seguito vengono fornite alcune soluzioni di mascheramento per eseguire i test senza esporre tali valori.

### WebDriverIO

#### Mascherare il Valore di Testo dei Comandi

I comandi `addValue` e `setValue` supportano un valore booleano mask per mascherare il testo nei log e nei reporter. Inoltre, anche altri strumenti, come gli strumenti di performance e gli strumenti di terze parti, riceveranno la versione mascherata, migliorando la sicurezza.

Ad esempio, se stai utilizzando un utente reale di produzione e devi inserire una password che vuoi mascherare, ora è possibile farlo con il seguente codice:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Ottieni il focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Quanto sopra nasconderà il valore del testo dai log di WDIO nel modo seguente:

Esempio di log:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Anche i reporter, come Allure, e gli strumenti di terze parti come Percy di BrowserStack gestiranno la versione mascherata.
In combinazione con la versione appropriata di Appium, anche i log di Appium saranno privi dei tuoi dati sensibili.

:::info

Limitazioni:
  - In Appium, plugin aggiuntivi potrebbero far trapelare le informazioni anche se chiediamo di mascherarle.
  - I provider cloud potrebbero utilizzare un proxy per il logging HTTP, che aggira il meccanismo di mascheramento implementato.
  - Il comando `getValue` non è supportato. Inoltre, se utilizzato sullo stesso elemento, può esporre il valore che si intendeva mascherare con `addValue` o `setValue`.

Versione minima richiesta:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Mascherare nei Log di WDIO

Utilizzando la configurazione `maskingPatterns`, possiamo mascherare le informazioni sensibili dai log di WDIO. Tuttavia, i log di Appium non sono coperti.

Ad esempio, se stai utilizzando un provider cloud e il livello info, quasi certamente farai "trapelare" la chiave dell'utente come mostrato di seguito:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Per evitarlo, possiamo passare l'espressione regolare `'--key=([^ ]*)'` e ora nei log vedrai

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Puoi ottenere quanto sopra fornendo l'espressione regolare al campo `maskingPatterns` della configurazione.
  - Per più espressioni regolari, utilizza una singola stringa ma con valori separati da virgola.
  - Per maggiori dettagli sui pattern di mascheramento, consulta la [sezione Masking Patterns nel README di WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * configurazioni dei test
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
:::

:::warning
Per i segreti passati tramite riga di comando, il mascheramento potrebbe non funzionare perché il file wdio.conf.ts viene analizzato più avanti nel ciclo di esecuzione. In questi casi è fortemente consigliato, e molto più sicuro, utilizzare le variabili d'ambiente.
:::

#### Disabilitare i Logger di WDIO

Un altro modo per bloccare il logging di dati sensibili è abbassare o silenziare il livello di log oppure disabilitare il logger.
Si può ottenere nel modo seguente:

```ts
import logger from '@wdio/logger';

/**
  * Imposta il livello del logger di WDIO su 'silent' prima di *eseguire una promise, il che aiuta a nascondere le informazioni sensibili nei log.
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

### Soluzioni di Terze Parti

#### Appium
Appium offre la propria soluzione di mascheramento; vedi [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Può essere complicato utilizzare la loro soluzione. Un modo, se possibile, è inserire un token nella tua stringa come `@mask@` e utilizzarlo come espressione regolare
 - In alcune versioni di Appium, i valori vengono registrati anche con ogni carattere separato da virgola, quindi bisogna fare attenzione.
 - Purtroppo, BrowserStack non supporta questa soluzione, ma è comunque utile in locale

Utilizzando l'esempio `@mask@` menzionato in precedenza, possiamo usare il seguente file JSON chiamato `appiumMaskLogFilters.json`
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

#### BrowserStack

Anche BrowserStack offre un certo livello di mascheramento per nascondere alcuni dati; vedi [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Purtroppo, la soluzione è "tutto o niente", quindi tutti i valori di testo dei comandi forniti verranno mascherati.