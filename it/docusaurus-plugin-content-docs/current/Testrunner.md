---
id: testrunner
title: Testrunner
---

WebdriverIO è dotato di un proprio test runner per aiutarti a iniziare a testare il più rapidamente possibile. È progettato per fare tutto il lavoro per te, consente di integrare servizi di terze parti e ti aiuta a eseguire i tuoi test nel modo più efficiente possibile.

Il testrunner di WebdriverIO è fornito separatamente nel pacchetto NPM `@wdio/cli`.

Installalo così:

```sh npm2yarn
npm install @wdio/cli
```

Per vedere l'aiuto dell'interfaccia a riga di comando, digita il seguente comando nel tuo terminale:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

Perfetto! Ora devi definire un file di configurazione dove vengono impostate tutte le informazioni sui tuoi test, capacità e impostazioni. Passa alla sezione [Configuration File](/docs/configuration) per vedere come dovrebbe essere quel file.

Con l'utility di configurazione `wdio`, è super facile generare il tuo file di configurazione. Basta eseguire:

```sh
$ npx wdio config
```

...e verrà avviata l'utility di supporto.

Ti farà alcune domande e genererà un file di configurazione per te in meno di un minuto.

![WDIO configuration utility](/img/config-utility.gif)

Una volta configurato il file di configurazione, puoi avviare i tuoi test eseguendo:

```sh
npx wdio run wdio.conf.js
```

Puoi anche inizializzare l'esecuzione del test senza il comando `run`:

```sh
npx wdio wdio.conf.js
```

Questo è tutto! Ora puoi accedere all'istanza di selenium tramite la variabile globale `browser`.

## Comandi

### `wdio config`

Il comando `config` esegue l'utility di configurazione WebdriverIO. Questa utility ti farà alcune domande sul tuo progetto WebdriverIO e creerà un file `wdio.conf.js` basato sulle tue risposte.

Esempio:

```sh
wdio config
```

Opzioni:

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> Questo è il comando predefinito per eseguire la tua configurazione.

Il comando `run` inizializza il tuo file di configurazione WebdriverIO ed esegue i tuoi test.

Esempio:

```sh
wdio run ./wdio.conf.js --watch
```

Opzioni:

```
--help                prints WebdriverIO help menu                   [boolean]
--version             prints WebdriverIO version                     [boolean]
--hostname, -h        automation driver host address                  [string]
--port, -p            automation driver port                          [number]
--user, -u            username if using a cloud service as automation backend
                                                                        [string]
--key, -k             corresponding access key to the user            [string]
--watch               watch specs for changes                        [boolean]
--logLevel, -l        level of logging verbosity
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                stop test runner after specific amount of tests have
                        failed                                          [number]
--baseUrl             shorten url command calls by setting a base url [string]
--waitforTimeout, -w  timeout for all waitForXXX commands             [number]
--framework, -f       defines the framework (Mocha, Jasmine or Cucumber) to
                        run the specs                                   [string]
--reporters, -r       reporters to print out the results on stdout      [array]
--suite               overwrites the specs attribute and runs the defined
                        suite                                            [array]
--spec                run a certain spec file or wildcards - overrides specs piped
                        from stdin                                       [array]
--exclude             exclude spec file(s) from a run - overrides specs piped
                        from stdin                                       [array]
--repeat              Repeat specific specs and/or suites N times        [number]
--mochaOpts           Mocha options
--jasmineOpts         Jasmine options
--cucumberOpts        Cucumber options
```

> Nota: L'autocompilazione può essere facilmente controllata con le variabili d'ambiente `tsx`. Vedi anche la [documentazione TypeScript](/docs/typescript).

### `wdio install`
Il comando `install` ti permette di aggiungere reporter e servizi ai tuoi progetti WebdriverIO tramite la CLI.

Esempio:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

Se vuoi installare i pacchetti usando `yarn` invece, puoi passare il flag `--yarn` al comando:

```sh
wdio install service sauce --yarn
```

Potresti anche passare un percorso di configurazione personalizzato se il tuo file di configurazione WDIO non si trova nella stessa cartella in cui stai lavorando:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Lista dei servizi supportati

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### Lista dei reporter supportati

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### Lista dei framework supportati

```
mocha
jasmine
cucumber
```

### `wdio repl`

Il comando repl consente di avviare un'interfaccia a riga di comando interattiva per eseguire comandi WebdriverIO. Può essere utilizzato per scopi di test o semplicemente per avviare rapidamente una sessione WebdriverIO.

Esegui test su chrome locale:

```sh
wdio repl chrome
```

o esegui test su Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Puoi applicare gli stessi argomenti che puoi usare nel [comando run](#wdio-run).