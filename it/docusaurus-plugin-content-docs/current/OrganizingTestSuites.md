---
id: organizingsuites
title: Organizzare la Suite di Test
---

Con la crescita dei progetti, vengono inevitabilmente aggiunti sempre più test di integrazione. Questo aumenta il tempo di build e rallenta la produttività.

Per evitare questo, dovresti eseguire i tuoi test in parallelo. WebdriverIO già testa ogni spec (o _feature file_ in Cucumber) in parallelo all'interno di una singola sessione. In generale, cerca di testare solo una singola funzionalità per file spec. Cerca di non avere troppi o troppo pochi test in un file. (Tuttavia, non esiste una regola d'oro in questo caso.)

Una volta che i tuoi test hanno diversi file spec, dovresti iniziare a eseguire i test in contemporanea. Per farlo, modifica la proprietà `maxInstances` nel tuo file di configurazione. WebdriverIO ti consente di eseguire i test con la massima concorrenza, il che significa che indipendentemente da quanti file e test hai, possono essere tutti eseguiti in parallelo. (Questo è ancora soggetto a determinati limiti, come la CPU del computer, le restrizioni di concorrenza, ecc.)

> Supponiamo che tu abbia 3 diverse capacità (Chrome, Firefox e Safari) e che tu abbia impostato `maxInstances` a `1`. Il test runner WDIO genererà 3 processi. Pertanto, se hai 10 file spec e imposti `maxInstances` a `10`, _tutti_ i file spec verranno testati simultaneamente e verranno generati 30 processi.

Puoi definire la proprietà `maxInstances` a livello globale per impostare l'attributo per tutti i browser.

Se esegui la tua griglia WebDriver, potresti (ad esempio) avere più capacità per un browser rispetto a un altro. In tal caso, puoi _limitare_ il `maxInstances` nel tuo oggetto capability:

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

## Ereditare dal File di Configurazione Principale

Se esegui la tua suite di test in più ambienti (ad esempio, sviluppo e integrazione) potrebbe essere utile utilizzare più file di configurazione per mantenere le cose gestibili.

Simile al [concetto di page object](pageobjects), la prima cosa di cui avrai bisogno è un file di configurazione principale. Contiene tutte le configurazioni che condividi tra gli ambienti.

Quindi crea un altro file di configurazione per ogni ambiente e integra la configurazione principale con quelle specifiche per l'ambiente:

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

## Raggruppare le Specifiche di Test in Suite

Puoi raggruppare le specifiche di test in suite ed eseguire singole suite specifiche invece di tutte.

Prima, definisci le tue suite nella tua configurazione WDIO:

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

Ora, se vuoi eseguire solo una singola suite, puoi passare il nome della suite come argomento CLI:

```sh
wdio wdio.conf.js --suite login
```

Oppure, esegui più suite contemporaneamente:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Raggruppare le Specifiche di Test per Eseguirle in Sequenza

Come descritto sopra, ci sono vantaggi nell'eseguire i test in parallelo. Tuttavia, ci sono casi in cui sarebbe vantaggioso raggruppare i test per eseguirli in sequenza in una singola istanza. Esempi di questo sono principalmente dove c'è un grande costo di configurazione, ad esempio la trascompilazione del codice o il provisioning di istanze cloud, ma ci sono anche modelli di utilizzo avanzati che beneficiano di questa capacità.

Per raggruppare i test da eseguire in una singola istanza, definiscili come un array all'interno della definizione delle specifiche.

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
Nell'esempio sopra, i test 'test_login.js', 'test_product_order.js' e 'test_checkout.js' verranno eseguiti in sequenza in una singola istanza e ciascuno dei test "test_b*" verrà eseguito contemporaneamente in istanze individuali.

È anche possibile raggruppare le specifiche definite nelle suite, quindi ora puoi anche definire le suite in questo modo:
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
e in questo caso tutti i test della suite "end2end" sarebbero eseguiti in una singola istanza.

Quando si eseguono test in sequenza utilizzando un pattern, eseguirà i file spec in ordine alfabetico

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Questo eseguirà i file che corrispondono al pattern sopra nel seguente ordine:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Eseguire Test Selezionati

In alcuni casi, potresti voler eseguire solo un singolo test (o un sottoinsieme di test) delle tue suite.

Con il parametro `--spec`, puoi specificare quale _suite_ (Mocha, Jasmine) o _feature_ (Cucumber) dovrebbe essere eseguita. Il percorso viene risolto relativamente dalla tua directory di lavoro corrente.

Ad esempio, per eseguire solo il tuo test di login:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Oppure esegui più specifiche contemporaneamente:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Se il valore `--spec` non punta a un file spec specifico, viene invece utilizzato per filtrare i nomi dei file spec definiti nella tua configurazione.

Per eseguire tutte le specifiche con la parola "dialog" nei nomi dei file spec, potresti usare:

```sh
wdio wdio.conf.js --spec dialog
```

Nota che ogni file di test viene eseguito in un singolo processo di test runner. Poiché non scansionamo i file in anticipo (vedi la sezione successiva per informazioni sul piping dei nomi dei file a `wdio`), _non puoi_ usare (ad esempio) `describe.only` all'inizio del tuo file spec per istruire Mocha a eseguire solo quella suite.

Questa funzionalità ti aiuterà a raggiungere lo stesso obiettivo.

Quando viene fornita l'opzione `--spec`, questa sovrascriverà qualsiasi pattern definito dal parametro `specs` a livello di configurazione o capability.

## Escludere Test Selezionati

Quando necessario, se devi escludere particolari file spec dalla esecuzione, puoi utilizzare il parametro `--exclude` (Mocha, Jasmine) o feature (Cucumber).

Ad esempio, per escludere il tuo test di login dall'esecuzione del test:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Oppure, escludere più file spec:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Oppure, escludere un file spec quando si filtra utilizzando una suite:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Se il valore `--exclude` non punta a un file spec particolare, viene invece utilizzato per filtrare i nomi dei file spec definiti nella tua configurazione.

Per escludere tutte le specifiche con la parola "dialog" nei nomi dei file spec, potresti usare:

```sh
wdio wdio.conf.js --exclude dialog
```

Quando viene fornita l'opzione `--exclude`, questa sovrascriverà qualsiasi pattern definito dal parametro `exclude` a livello di configurazione o capability.

## Eseguire Suite e Specifiche di Test

Esegui un'intera suite insieme a singole specifiche.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Eseguire Multiple Specifiche di Test Specifiche

A volte è necessario&mdash;nel contesto dell'integrazione continua e in altre situazioni&mdash;specificare più set di specifiche da eseguire. L'utilità a riga di comando `wdio` di WebdriverIO accetta nomi di file in piping (da `find`, `grep` o altri).

I nomi di file in piping sovrascrivono l'elenco di glob o i nomi di file specificati nella lista `spec` della configurazione.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Nota:** Questo_ non _sovrascriverà il flag `--spec` per l'esecuzione di una singola spec._

## Eseguire Test Specifici con MochaOpts

Puoi anche filtrare quali specifici `suite|describe` e/o `it|test` vuoi eseguire passando un argomento specifico di mocha: `--mochaOpts.grep` al CLI di wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Nota:** Mocha filtrerà i test dopo che il test runner WDIO crea le istanze, quindi potresti vedere diverse istanze generate ma non effettivamente eseguite._

## Escludere Test Specifici con MochaOpts

Puoi anche filtrare quali specifici `suite|describe` e/o `it|test` vuoi escludere passando un argomento specifico di mocha: `--mochaOpts.invert` al CLI di wdio. `--mochaOpts.invert` esegue l'opposto di `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Nota:** Mocha filtrerà i test dopo che il test runner WDIO crea le istanze, quindi potresti vedere diverse istanze generate ma non effettivamente eseguite._

## Interrompere i test dopo un fallimento

Con l'opzione `bail`, puoi dire a WebdriverIO di interrompere il test dopo qualsiasi fallimento.

Questo è utile con grandi suite di test quando sai già che la tua build si romperà, ma vuoi evitare la lunga attesa di un'esecuzione completa dei test.

L'opzione `bail` si aspetta un numero, che specifica quanti fallimenti di test possono verificarsi prima che WebDriver interrompa l'intera esecuzione dei test. Il valore predefinito è `0`, il che significa che eseguirà sempre tutti gli spec di test che può trovare.

Si prega di consultare la [Pagina delle Opzioni](configuration) per ulteriori informazioni sulla configurazione bail.
## Gerarchia delle opzioni di esecuzione

Quando si dichiara quali spec eseguire, esiste una certa gerarchia che definisce quale pattern avrà la precedenza. Attualmente, funziona così, dalla priorità più alta alla più bassa:

> Argomento CLI `--spec` > pattern `specs` della capability > pattern `specs` della configurazione
> Argomento CLI `--exclude` > pattern `exclude` della configurazione > pattern `exclude` della capability

Se viene fornito solo il parametro di configurazione, verrà utilizzato per tutte le capability. Tuttavia, se si definisce il pattern a livello di capability, verrà utilizzato invece del pattern di configurazione. Infine, qualsiasi pattern di spec definito sulla riga di comando sovrascriverà tutti gli altri pattern forniti.

### Utilizzo di pattern di spec definiti dalla capability

Quando definisci un pattern di spec a livello di capability, questo sovrascriverà qualsiasi pattern definito a livello di configurazione. Questo è utile quando è necessario separare i test in base a capacità differenzianti dei dispositivi. In casi come questo, è più utile utilizzare un pattern di spec generico a livello di configurazione e pattern più specifici a livello di capability.

Ad esempio, supponiamo che tu abbia due directory, una per i test Android e una per i test iOS.

Il tuo file di configurazione potrebbe definire il pattern come tale, per test di dispositivi non specifici:

```js
{
    specs: ['tests/general/**/*.js']
}
```

ma poi, avrai diverse capability per i tuoi dispositivi Android e iOS, dove i pattern potrebbero apparire come tali:

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

Se richiedi entrambe queste capability nel tuo file di configurazione, allora il dispositivo Android eseguirà solo i test sotto il namespace "android", e i test iOS eseguiranno solo i test sotto il namespace "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```