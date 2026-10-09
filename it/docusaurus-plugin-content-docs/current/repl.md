---
id: repl
title: Interfaccia REPL
description: "Usa il REPL di WebdriverIO per provare i comandi ed eseguire il debug dei test in modo interattivo dalla riga di comando o dall'interno di un test in esecuzione."
---

Con la `v4.5.0`, WebdriverIO ha introdotto un'interfaccia [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) che ti aiuta non solo a imparare l'API del framework, ma anche a eseguire il debug e ispezionare i tuoi test. Può essere utilizzata in diversi modi.

Innanzitutto puoi usarla come comando CLI installando `npm install -g @wdio/cli` e avviare una sessione WebDriver dalla riga di comando, ad es.

```sh
wdio repl chrome
```

Questo aprirebbe un browser Chrome che puoi controllare con l'interfaccia REPL. Assicurati di avere un driver del browser in esecuzione sulla porta `4444` per avviare la sessione. Se hai un account [Sauce Labs](https://saucelabs.com) (o di un altro fornitore cloud), puoi anche eseguire direttamente il browser nel cloud dalla tua riga di comando tramite:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Se il driver è in esecuzione su una porta diversa, ad es. 9515, questa può essere passata con l'argomento da riga di comando --port o con l'alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Il REPL può anche essere eseguito utilizzando le capabilities dal file di configurazione di webdriverIO. Wdio supporta un oggetto capabilities, oppure una lista o un oggetto di capabilities multi-remote.

Se il file di configurazione utilizza un oggetto capabilities, basta passare il percorso del file di configurazione; altrimenti, se si tratta di una capability multi-remote, specifica quale capability utilizzare dalla lista o dal multi-remote usando l'argomento posizionale. Nota: per la lista consideriamo un indice a base zero.

### Esempio

WebdriverIO con array di capability:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO con oggetto di capability [multi-remote](https://webdriver.io/docs/multiremote/):

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

Oppure, se vuoi eseguire test mobile in locale utilizzando Appium:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

Questo aprirebbe una sessione Chrome/Safari sul dispositivo/emulatore/simulatore connesso. Assicurati che Appium sia in esecuzione sulla porta `4444` per avviare la sessione.

```sh
wdio repl './path/to/your_app.apk'
```

Questo aprirebbe una sessione dell'app sul dispositivo/emulatore/simulatore connesso. Assicurati che Appium sia in esecuzione sulla porta `4444` per avviare la sessione.

Le capabilities per il dispositivo iOS possono essere passate con degli argomenti:

* `-v`      - `platformVersion`: versione della piattaforma Android/iOS
* `-d`      - `deviceName`: nome del dispositivo mobile
* `-u`      - `udid`: udid per i dispositivi reali

Utilizzo:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Nomi lunghi dei parametri', value: 'long'},
    {label: 'Nomi brevi dei parametri', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

Puoi applicare qualsiasi opzione (vedi `wdio repl --help`) disponibile per la tua sessione REPL.

### Collegarsi a una `wdio session`

`wdio repl --session <name>` (alias `-s`) non avvia un browser. Collega il REPL a una sessione già aperta da [`wdio session`](/docs/session), e scollegandosi la sessione rimane in esecuzione. La messa in pausa di un'esecuzione di test è trattata in [Eseguire il debug di un test con una sessione](/docs/session/debug):

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Nel REPL, ogni riga viene eseguita come `wdio session exec`. `.exit` stampa `Detached from "default" (still running)`.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Un altro modo per usare il REPL è all'interno dei tuoi test tramite il comando [`debug`](/docs/api/browser/debug). Questo fermerà il browser quando viene chiamato e ti permetterà di entrare nell'applicazione (ad es. negli strumenti di sviluppo) o di controllare il browser dalla riga di comando. Ciò è utile quando alcuni comandi non attivano una determinata azione come previsto. Con il REPL, puoi quindi provare i comandi per vedere quali funzionano in modo più affidabile.