---
id: organizingsuites
title: Organizzazione della Suite di Test
---

Con la crescita dei progetti, inevitabilmente vengono aggiunti sempre più test di integrazione. Questo aumenta il tempo di compilazione e rallenta la produttività.

Per evitare ciò, dovresti eseguire i tuoi test in parallelo. WebdriverIO già testa ogni spec (o _file di funzionalità_ in Cucumber) in parallelo all'interno di una singola sessione. In generale, cerca di testare solo una singola funzionalità per file spec. Cerca di non avere troppi o troppo pochi test in un file. (Tuttavia, non esiste una regola d'oro qui.)

Una volta che i tuoi test hanno diversi file spec, dovresti iniziare a eseguire i test in modo concorrente. Per farlo, regola la proprietà `maxInstances` nel tuo file di configurazione. WebdriverIO ti consente di eseguire i tuoi test con la massima concorrenza, il che significa che indipendentemente da quanti file e test hai, possono essere tutti eseguiti in parallelo. (Questo è comunque soggetto a determinati limiti, come la CPU del tuo computer, restrizioni di concorrenza, ecc.)

> Supponiamo che tu abbia 3 diverse capacità (Chrome, Firefox e Safari) e hai impostato `maxInstances` a `1`. Il test runner WDIO genererà 3 processi. Pertanto, se hai 10 file spec e imposti `maxInstances` a `10`, _tutti_ i file spec saranno testati contemporaneamente e verranno generati 30 processi.

Puoi definire la proprietà `maxInstances` globalmente per impostare l'attributo per tutti i browser.

Se esegui la tua griglia WebDriver, potresti (ad esempio) avere più capacità per un browser rispetto a un altro. In tal caso, puoi _limitare_ il `maxInstances` nel tuo oggetto capacità:

```js
// wdio.conf.js
export const config = {
    // ...
    // imposta maxInstance per tutti i browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances può essere sovrascritto per capacità. Quindi se hai una griglia WebDriver interna
        // con solo 5 istanze firefox disponibili puoi assicurarti che non più di
        // 5 istanze vengano avviate contemporaneamente.
        browserName: 'chrome'
    }],
    // ...
}
```

## Ereditare dal File di Configurazione Principale

Se esegui la tua suite di test in più ambienti (ad esempio, sviluppo e integrazione), potrebbe essere utile utilizzare più file di configurazione per mantenere le cose gestibili.

Simile al [concetto di page object](pageobjects), la prima cosa di cui avrai bisogno è un file di configurazione principale. Contiene tutte le configurazioni che condividi tra gli ambienti.

Quindi crea un altro file di configurazione per ogni ambiente e integra la configurazione principale con quelle specifiche dell'ambiente:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// avere il file di configurazione principale come predefinito ma sovrascrivere le informazioni specifiche dell'ambiente
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // più capacità definite qui
        // ...
    ],

    // esegui i test su sauce invece che localmente
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// aggiungi un reporter aggiuntivo
config.reporters.push('allure')
```

## Raggruppamento delle Specifiche di Test in Suite

Puoi raggruppare le specifiche di test in suite ed eseguire singole suite specifiche invece di tutte.

Prima, definisci le tue suite nella tua configurazione WDIO:

```js
// wdio.conf.js
export const config = {
    // definisci tutti i test
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // definisci suite specifiche
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

## Raggruppamento delle Specifiche di Test per Eseguirle Sequenzialmente

Come descritto sopra, ci sono vantaggi nell'eseguire i test in modo concorrente. Tuttavia, ci sono casi in cui sarebbe vantaggioso raggruppare i test insieme per eseguirli sequenzialmente in una singola istanza. Esempi di questo sono principalmente dove c'è un grande costo di configurazione, ad esempio la trasformazione del codice o il provisioning di istanze cloud, ma ci sono anche modelli di utilizzo avanzati che beneficiano di questa capacità.

Per raggruppare i test da eseguire in una singola istanza, definiscili come un array all'interno della definizione di specs.

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
Nell'esempio sopra, i test 'test_login.js', 'test_product_order.js' e 'test_checkout.js' verranno eseguiti sequenzialmente in una singola istanza e ciascuno dei test "test_b*" verrà eseguito contemporaneamente in istanze individuali.

È anche possibile raggruppare le specs definite nelle suite, quindi ora puoi anche definire suite come questa:
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

Quando si eseguono test sequenzialmente utilizzando un pattern, verranno eseguiti i file spec in ordine alfabetico

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

## Esecuzione di Test Selezionati

In alcuni casi, potresti voler eseguire solo un singolo test (o un sottoinsieme di test) delle tue suite.

Con il parametro `--spec`, puoi specificare quale _suite_ (Mocha, Jasmine) o _feature_ (Cucumber) dovrebbe essere eseguita. Il percorso viene risolto relativamente dalla tua directory di lavoro corrente.

Ad esempio, per eseguire solo il tuo test di login:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

O esegui più specs contemporaneamente:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Se il valore `--spec` non punta a un particolare file spec, viene invece utilizzato per filtrare i nomi dei file spec definiti nella tua configurazione.

Per eseguire tutte le specs con la parola "dialog" nei nomi dei file spec, potresti usare:

```sh
wdio wdio.conf.js --spec dialog
```

Nota che ogni file di test viene eseguito in un singolo processo di test runner. Poiché non analizziamo i file in anticipo (vedi la sezione successiva per informazioni sull'invio di nomi di file a `wdio`), _non puoi_ utilizzare (ad esempio) `describe.only` all'inizio del tuo file spec per indicare a Mocha di eseguire solo quella suite.

Questa funzionalità ti aiuterà a raggiungere lo stesso obiettivo.

Quando viene fornita l'opzione `--spec`, sovrascriverà tutti i pattern definiti dal parametro `specs` a livello di configurazione o capacità.

## Esclusione di Test Selezionati

Quando necessario, se hai bisogno di escludere particolari file spec da un'esecuzione, puoi utilizzare il parametro `--exclude` (Mocha, Jasmine) o feature (Cucumber).

Ad esempio, per escludere il tuo test di login dall'esecuzione del test:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Oppure, escludi più file spec:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Oppure, escludi un file spec quando filtri utilizzando una suite:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Se il valore `--exclude` non punta a un particolare file spec, viene invece utilizzato per filtrare i nomi dei file spec definiti nella tua configurazione.

Per escludere tutte le specs con la parola "dialog" nei nomi dei file spec, potresti usare:

```sh
wdio wdio.conf.js --exclude dialog
```

Quando viene fornita l'opzione `--exclude`, sovrascriverà tutti i pattern definiti dal parametro `exclude` a livello di configurazione o capacità.

## Esecuzione di Suite e Specifiche di Test

Esegui un'intera suite insieme a singole specifiche.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Esecuzione di Più Specifiche di Test Specifiche

È talvolta necessario, nel contesto dell'integrazione continua e altrimenti, specificare più set di specifiche da eseguire. L'utilità da riga di comando `wdio` di WebdriverIO accetta nomi di file passati attraverso pipe (da `find`, `grep`, o altri).

I nomi di file passati attraverso pipe sovrascrivono l'elenco di glob o nomi di file specificati nell'elenco `spec` della configurazione.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Nota:** Questo_ non _sovrascriverà il flag `--spec` per l'esecuzione di una singola specifica._

## Esecuzione di Test Specifici con MochaOpts

Puoi anche filtrare quali specifici `suite|describe` e/o `it|test` vuoi eseguire passando un argomento specifico di mocha: `--mochaOpts.grep` al CLI di wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Nota:** Mocha filtrerà i test dopo che il test runner WDIO crea le istanze, quindi potresti vedere diverse istanze che vengono generate ma non effettivamente eseguite._

## Esclusione di Test Specifici con MochaOpts

Puoi anche filtrare quali specifici `suite|describe` e/o `it|test` vuoi escludere passando un argomento specifico di mocha: `--mochaOpts.invert` al CLI di wdio. `--mochaOpts.invert` esegue l'opposto di `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Nota:** Mocha filtrerà i test dopo che il test runner WDIO crea le istanze, quindi potresti vedere diverse istanze che vengono generate ma non effettivamente eseguite._

## Interruzione dei test dopo un fallimento

Con l'opzione `bail`, puoi dire a WebdriverIO di interrompere i test dopo qualsiasi fallimento.

Questo è utile con suite di test grandi quando già sai che la tua build fallirà, ma vuoi evitare la lunga attesa di un'esecuzione completa dei test.

L'opzione `bail` si aspetta un numero, che specifica quanti fallimenti di test possono verificarsi prima che WebDriver interrompa l'intera esecuzione dei test. Il valore predefinito è `0`, il che significa che esegue sempre tutti i test che può trovare.

Si prega di consultare la [Pagina delle Opzioni](configuration) per ulteriori informazioni sulla configurazione di bail.
## Gerarchia delle opzioni di esecuzione

Quando si dichiara quali specifiche eseguire, esiste una certa gerarchia che definisce quale pattern avrà la precedenza. Attualmente, ecco come funziona, dalla priorità più alta alla più bassa:

> Argomento CLI `--spec` > pattern `specs` delle capacità > pattern `specs` della configurazione
> Argomento CLI `--exclude` > pattern `exclude` della configurazione > pattern `exclude` delle capacità

Se viene fornito solo il parametro di configurazione, verrà utilizzato per tutte le capacità. Tuttavia, se si definisce il pattern a livello di capacità, verrà utilizzato invece del pattern di configurazione. Infine, qualsiasi pattern di spec definito sulla riga di comando sovrascriverà tutti gli altri pattern forniti.

### Utilizzo di pattern di spec definiti dalla capacità

Quando definisci un pattern di spec a livello di capacità, questo sovrascriverà tutti i pattern definiti a livello di configurazione. Ciò è utile quando è necessario separare i test in base a capacità differenzianti del dispositivo. In casi come questo, è più utile utilizzare un pattern di spec generico a livello di configurazione e pattern più specifici a livello di capacità.

Ad esempio, diciamo che hai due directory, una per i test Android e una per i test iOS.

Il tuo file di configurazione potrebbe definire il pattern come tale, per test di dispositivo non specifici:

```js
{
    specs: ['tests/general/**/*.js']
}
```

ma poi, avrai diverse capacità per i tuoi dispositivi Android e iOS, dove i pattern potrebbero apparire così:

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

Se richiedi entrambe queste capacità nel tuo file di configurazione, allora il dispositivo Android eseguirà solo i test sotto il namespace "android", e i test iOS eseguiranno solo i test sotto il namespace "ios"!

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
            //verranno utilizzate le specs a livello di configurazione
        }
    ]
}
```