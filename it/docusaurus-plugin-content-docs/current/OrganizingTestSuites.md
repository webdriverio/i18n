---
id: organizingsuites
title: Organizzare la Test Suite
description: "Organizza una test suite in crescita condividendo i file di configurazione, raggruppando le spec in suite, eseguendo le spec in sequenza e includendo o escludendo i test."
---

Man mano che i progetti crescono, inevitabilmente vengono aggiunti sempre più test di integrazione. Questo aumenta il tempo di build e rallenta la produttività.

Per evitarlo, dovresti eseguire i tuoi test in parallelo. WebdriverIO testa già ogni spec (o _feature file_ in Cucumber) in parallelo all'interno di una singola sessione. In generale, cerca di testare una sola funzionalità per file spec. Cerca di non avere troppi o troppo pochi test in un unico file. (Tuttavia, non esiste una regola d'oro in questo caso.)

Una volta che i tuoi test hanno diversi file spec, dovresti iniziare a eseguirli in modo concorrente. Per farlo, regola la proprietà `maxInstances` nel tuo file di configurazione. WebdriverIO ti permette di eseguire i test con la massima concorrenza: ciò significa che, indipendentemente da quanti file e test hai, possono essere eseguiti tutti in parallelo.  (Questo è comunque soggetto a determinati limiti, come la CPU del tuo computer, le restrizioni sulla concorrenza, ecc.)

> Supponiamo che tu abbia 3 diverse capability (Chrome, Firefox e Safari) e che tu abbia impostato `maxInstances` a `1`. Il test runner WDIO avvierà 3 processi. Pertanto, se hai 10 file spec e imposti `maxInstances` a `10`, _tutti_ i file spec verranno testati simultaneamente e verranno avviati 30 processi.

Puoi definire la proprietà `maxInstances` a livello globale per impostare l'attributo per tutti i browser.

Se gestisci la tua griglia WebDriver, potresti (ad esempio) avere più capacità per un browser rispetto a un altro. In tal caso, puoi _limitare_ `maxInstances` nel tuo oggetto capability:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## Ereditare dal file di configurazione principale

Se esegui la tua test suite in più ambienti (ad es. dev e integrazione), può essere utile usare più file di configurazione per mantenere le cose gestibili.

Analogamente al [concetto di page object](pageobjects), la prima cosa di cui avrai bisogno è un file di configurazione principale. Esso contiene tutte le configurazioni che condividi tra gli ambienti.

Quindi crea un altro file di configurazione per ogni ambiente e integra la configurazione principale con quelle specifiche dell'ambiente:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## Raggruppare le spec di test in suite

Puoi raggruppare le spec di test in suite ed eseguire singole suite specifiche invece di tutte.

Per prima cosa, definisci le tue suite nella configurazione WDIO:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

Ora, se vuoi eseguire una sola suite, puoi passare il nome della suite come argomento CLI:

```sh
wdio wdio.conf.js --suite login
```

Oppure, esegui più suite contemporaneamente:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Raggruppare le spec di test da eseguire in sequenza

Come descritto sopra, ci sono vantaggi nell'eseguire i test in modo concorrente. Tuttavia, ci sono casi in cui sarebbe vantaggioso raggruppare i test per eseguirli in sequenza in una singola istanza. Esempi di ciò si hanno principalmente quando c'è un elevato costo di setup, ad es. la transpilazione del codice o il provisioning di istanze cloud, ma esistono anche modelli di utilizzo avanzati che traggono beneficio da questa funzionalità.

Per raggruppare i test da eseguire in una singola istanza, definiscili come un array all'interno della definizione delle specs.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
Nell'esempio sopra, i test 'test_login.js', 'test_product_order.js' e 'test_checkout.js' verranno eseguiti in sequenza in una singola istanza e ciascuno dei test "test_b*" verrà eseguito in modo concorrente in istanze individuali.

È anche possibile raggruppare le spec definite nelle suite, quindi ora puoi definire suite anche in questo modo:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
e in questo caso tutti i test della suite "end2end" verrebbero eseguiti in una singola istanza.

Quando si eseguono i test in sequenza usando un pattern, i file spec verranno eseguiti in ordine alfabetico

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Questo eseguirà i file corrispondenti al pattern sopra nel seguente ordine:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Eseguire test selezionati

In alcuni casi, potresti voler eseguire solo un singolo test (o un sottoinsieme di test) delle tue suite.

Con il parametro `--spec`, puoi specificare quale _suite_ (Mocha, Jasmine) o _feature_ (Cucumber) deve essere eseguita. Il percorso viene risolto in modo relativo rispetto alla tua directory di lavoro corrente.

Ad esempio, per eseguire solo il test di login:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Oppure esegui più spec contemporaneamente:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Se il valore di `--spec` non punta a un particolare file spec, viene invece usato per filtrare i nomi dei file spec definiti nella tua configurazione.

Per eseguire tutte le spec con la parola “dialog” nei nomi dei file spec, potresti usare:

```sh
wdio wdio.conf.js --spec dialog
```

Nota che ogni file di test viene eseguito in un singolo processo del test runner. Poiché non scansioniamo i file in anticipo (vedi la sezione successiva per informazioni sul piping dei nomi dei file verso `wdio`), _non puoi_ usare (ad esempio) `describe.only` all'inizio del tuo file spec per indicare a Mocha di eseguire solo quella suite.

Questa funzionalità ti aiuterà a raggiungere lo stesso obiettivo.

Quando viene fornita l'opzione `--spec`, questa sovrascriverà qualsiasi pattern definito dalla configurazione `specs` o da `wdio:specs` di una capability.

## Escludere test selezionati

Se necessario, se devi escludere particolari file spec da un'esecuzione, puoi usare il parametro `--exclude` (Mocha, Jasmine) o feature (Cucumber).

Ad esempio, per escludere il test di login dall'esecuzione dei test:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Oppure, escludi più file spec:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Oppure, escludi un file spec durante il filtraggio tramite una suite:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Se il valore di `--exclude` non punta a un particolare file spec, viene invece usato per filtrare i nomi dei file spec definiti nella tua configurazione.

Per escludere tutte le spec con la parola “dialog” nei nomi dei file spec, potresti usare:

```sh
wdio wdio.conf.js --exclude dialog
```

### Escludere un'intera suite

Puoi anche escludere un'intera suite per nome. Se il valore di esclusione corrisponde al nome di una suite definita nella tua configurazione e non ha l'aspetto di un percorso di file, l'intera suite verrà saltata:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Questo eseguirà solo la suite `checkout`, saltando completamente la suite `login`.

Le esclusioni miste (suite e pattern di spec) funzionano come previsto:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

In questo esempio, se `signup` è il nome di una suite definita, quella suite verrà esclusa. Il pattern `dialog` filtrerà tutti i file spec che contengono "dialog" nel nome del file.

:::note
Se specifichi sia `--suite X` sia `--exclude X`, l'esclusione ha la precedenza e la suite `X` non verrà eseguita.
:::

Quando viene fornita l'opzione `--exclude`, questa sovrascriverà qualsiasi pattern definito dalla configurazione `exclude` o da `wdio:exclude` di una capability.

## Eseguire suite e spec di test

Esegui un'intera suite insieme a spec individuali.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Eseguire più spec di test specifiche

A volte è necessario&mdash;nel contesto dell'integrazione continua e non solo&mdash;specificare più insiemi di spec da eseguire. L'utility da riga di comando `wdio` di WebdriverIO accetta nomi di file passati tramite pipe (da `find`, `grep` o altri).

I nomi di file passati tramite pipe sovrascrivono l'elenco di glob o nomi di file specificati nella lista `spec` della configurazione.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Nota:** Questo_ non _sovrascriverà il flag `--spec` per l'esecuzione di una singola spec._

## Eseguire test specifici con MochaOpts

Puoi anche filtrare quali `suite|describe` e/o `it|test` specifici vuoi eseguire passando un argomento specifico di mocha: `--mochaOpts.grep` alla CLI di wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Nota:** Mocha filtrerà i test dopo che il test runner WDIO avrà creato le istanze, quindi potresti vedere diverse istanze avviate ma non effettivamente eseguite._

## Escludere test specifici con MochaOpts

Puoi anche filtrare quali `suite|describe` e/o `it|test` specifici vuoi escludere passando un argomento specifico di mocha: `--mochaOpts.invert` alla CLI di wdio. `--mochaOpts.invert` esegue l'opposto di `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Nota:** Mocha filtrerà i test dopo che il test runner WDIO avrà creato le istanze, quindi potresti vedere diverse istanze avviate ma non effettivamente eseguite._

## Interrompere i test dopo un fallimento

Con l'opzione `bail`, puoi indicare a WebdriverIO di interrompere i test dopo il fallimento di un qualsiasi test.

Questo è utile con test suite di grandi dimensioni quando sai già che la tua build fallirà, ma vuoi evitare la lunga attesa di un'esecuzione completa dei test.

L'opzione `bail` si aspetta un numero, che specifica quanti fallimenti di test possono verificarsi prima che WebDriver interrompa l'intera esecuzione dei test. Il valore predefinito è `0`, il che significa che esegue sempre tutte le spec di test che riesce a trovare.

Consulta la [pagina delle opzioni](configuration) per ulteriori informazioni sulla configurazione di bail.
## Gerarchia delle opzioni di esecuzione

Quando si dichiarano le spec da eseguire, esiste una certa gerarchia che definisce quale pattern avrà la precedenza. Attualmente, funziona così, dalla priorità più alta alla più bassa:

> argomento CLI `--spec` > capability `wdio:specs` > config `specs`
> argomento CLI `--exclude` > config `exclude` > capability `wdio:exclude`

Se viene fornito solo il parametro di configurazione, esso verrà usato per tutte le capability. Tuttavia, se si definisce il pattern a livello di capability, verrà usato al posto del pattern di configurazione. Infine, qualsiasi pattern di spec definito dalla riga di comando sovrascriverà tutti gli altri pattern forniti.

### Usare pattern di spec definiti nelle capability

Quando definisci un pattern di spec a livello di capability, questo sovrascriverà qualsiasi pattern definito a livello di configurazione. Ciò è utile quando è necessario separare i test in base a capability dei dispositivi differenti. In casi come questo, è più utile usare un pattern di spec generico a livello di configurazione e pattern più specifici a livello di capability.

Ad esempio, supponiamo di avere due directory, una per i test Android e una per i test iOS.

Il tuo file di configurazione potrebbe definire il pattern in questo modo, per i test non specifici di un dispositivo:

```js
{
    specs: ['tests/general/**/*.js']
}
```

ma poi avrai capability diverse per i tuoi dispositivi Android e iOS, dove i pattern potrebbero apparire così:

```json
{
  "platformName": "Android",
  "wdio:specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "wdio:specs": [
    "tests/ios/**/*.js"
  ]
}
```

Se hai bisogno di entrambe queste capability nel tuo file di configurazione, il dispositivo Android eseguirà solo i test sotto il namespace "android" e i test iOS eseguiranno solo i test sotto il namespace "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            "wdio:specs": ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            "wdio:specs": ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```