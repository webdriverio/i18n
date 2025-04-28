---
id: repl
title: Interfaccia REPL
---

Con `v4.5.0`, WebdriverIO ha introdotto un'interfaccia [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) che ti aiuta non solo a imparare l'API del framework, ma anche a eseguire il debug e ispezionare i tuoi test. Può essere utilizzata in diversi modi.

Innanzitutto puoi usarla come comando CLI installando `npm install -g @wdio/cli` e avviare una sessione WebDriver dalla riga di comando, ad esempio:

```sh
wdio repl chrome
```

Questo aprirebbe un browser Chrome che puoi controllare con l'interfaccia REPL. Assicurati di avere un driver del browser in esecuzione sulla porta `4444` per poter iniziare la sessione. Se hai un account [Sauce Labs](https://saucelabs.com) (o altro fornitore cloud), puoi anche eseguire direttamente il browser dalla tua riga di comando nel cloud tramite:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Se il driver è in esecuzione su una porta diversa, ad esempio: 9515, può essere passato con l'argomento della riga di comando --port o alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl potrebbe anche essere eseguito utilizzando le capabilities dal file di configurazione di webdriverIO. Wdio supporta l'oggetto capabilities; o; lista di capability multiremote o oggetto.

Se il file di configurazione utilizza l'oggetto capabilities, basta passare il percorso al file di configurazione, altrimenti se si tratta di una capability multiremote, specificare quale capability utilizzare dalla lista o multiremote utilizzando l'argomento posizionale. Nota: per l'elenco consideriamo l'indice basato su zero.

### Esempio

WebdriverIO con array di capabilities:

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

WebdriverIO con oggetto capability [multiremote](https://webdriver.io/docs/multiremote/):

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

Oppure se vuoi eseguire test locali su dispositivi mobili utilizzando Appium:

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

Questo aprirebbe una sessione Chrome/Safari sul dispositivo/emulatore/simulatore connesso. Assicurati che Appium sia in esecuzione sulla porta `4444` per poter iniziare la sessione.

```sh
wdio repl './path/to/your_app.apk'
```

Questo aprirebbe una sessione App sul dispositivo/emulatore/simulatore connesso. Assicurati che Appium sia in esecuzione sulla porta `4444` per poter iniziare la sessione.

Le capabilities per il dispositivo iOS possono essere passate con argomenti:

* `-v`      - `platformVersion`: versione della piattaforma Android/iOS
* `-d`      - `deviceName`: nome del dispositivo mobile
* `-u`      - `udid`: udid per dispositivi reali

Utilizzo:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
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

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Un altro modo per utilizzare il REPL è all'interno dei tuoi test tramite il comando [`debug`](/docs/api/browser/debug). Questo fermerà il browser quando chiamato e ti permetterà di entrare nell'applicazione (ad esempio negli strumenti di sviluppo) o controllare il browser dalla riga di comando. Questo è utile quando alcuni comandi non attivano una certa azione come previsto. Con il REPL, puoi quindi provare i comandi per vedere quali funzionano in modo più affidabile.