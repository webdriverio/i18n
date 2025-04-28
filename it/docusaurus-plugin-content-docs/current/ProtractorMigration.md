---
id: protractor-migration
title: Da Protractor
---

Questo tutorial è rivolto a coloro che utilizzano Protractor e desiderano migrare il loro framework a WebdriverIO. È stato avviato dopo che il team di Angular [ha annunciato](https://github.com/angular/protractor/issues/5502) che Protractor non sarà più supportato. WebdriverIO è stato influenzato da molte decisioni di design di Protractor, motivo per cui è probabilmente il framework più simile verso cui migrare. Il team di WebdriverIO apprezza il lavoro di ogni singolo contributore di Protractor e spera che questo tutorial renda la transizione a WebdriverIO facile e diretta.

Sebbene vorremmo avere un processo completamente automatizzato per questo, la realtà è diversa. Ognuno ha una configurazione diversa e utilizza Protractor in modi diversi. Ogni passaggio dovrebbe essere visto come una guida e meno come un'istruzione passo passo. Se hai problemi con la migrazione, non esitare a [contattarci](https://github.com/webdriverio/codemod/discussions/new).

## Setup

L'API di Protractor e WebdriverIO è in realtà molto simile, al punto che la maggior parte dei comandi può essere riscritta in modo automatizzato attraverso un [codemod](https://github.com/webdriverio/codemod).

Per installare il codemod, esegui:

```sh
npm install jscodeshift @wdio/codemod
```

## Strategia

Ci sono molte strategie di migrazione. A seconda delle dimensioni del tuo team, della quantità di file di test e dell'urgenza di migrare, puoi provare a trasformare tutti i test in una volta o file per file. Dato che Protractor continuerà ad essere mantenuto fino alla versione 15 di Angular (fine 2022), hai ancora abbastanza tempo. Puoi avere test Protractor e WebdriverIO in esecuzione contemporaneamente e iniziare a scrivere nuovi test in WebdriverIO. In base al tuo budget di tempo, puoi quindi iniziare a migrare prima i casi di test più importanti e procedere fino ai test che potresti anche eliminare.

## Prima il file di configurazione

Dopo aver installato il codemod, possiamo iniziare a trasformare il primo file. Dai prima un'occhiata alle [opzioni di configurazione di WebdriverIO](configuration). I file di configurazione possono diventare molto complessi e potrebbe avere senso portare solo le parti essenziali e vedere come il resto può essere aggiunto una volta che i test corrispondenti che necessitano di determinate opzioni vengono migrati.

Per la prima migrazione trasformiamo solo il file di configurazione ed eseguiamo:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

Il tuo file di configurazione potrebbe avere un nome diverso, tuttavia il principio dovrebbe essere lo stesso: inizia con la migrazione della configurazione.

:::

## Installa le dipendenze di WebdriverIO

Il prossimo passo è configurare un setup minimo di WebdriverIO che inizieremo a costruire mentre migriamo da un framework all'altro. Per prima cosa installiamo la CLI di WebdriverIO tramite:

```sh
npm install --save-dev @wdio/cli
```

Successivamente eseguiamo la procedura guidata di configurazione:

```sh
npx wdio config
```

Questo ti guiderà attraverso una serie di domande. Per questo scenario di migrazione:
- scegli le opzioni predefinite
- raccomandiamo di non generare automaticamente file di esempio
- scegli una cartella diversa per i file WebdriverIO
- e di scegliere Mocha al posto di Jasmine.

:::info Perché Mocha?
Anche se potresti aver utilizzato Protractor con Jasmine prima, Mocha però offre meccanismi di ripetizione migliori. La scelta è tua!
:::

Dopo il piccolo questionario, la procedura guidata installerà tutti i pacchetti necessari e li memorizzerà nel tuo `package.json`.

## Migra il file di configurazione

Dopo aver trasformato `conf.ts` e creato un nuovo `wdio.conf.ts`, è ora il momento di migrare la configurazione da un file all'altro. Assicurati di portare solo il codice essenziale per tutti i test per poter essere eseguiti. Nel nostro caso portiamo la funzione hook e il timeout del framework.

Ora continueremo solo con il nostro file `wdio.conf.ts` e quindi non avremo più bisogno di modifiche alla configurazione originale di Protractor. Possiamo ripristinarle in modo che entrambi i framework possano funzionare uno accanto all'altro e possiamo portare un file alla volta.

## Migra il file di test

Ora siamo pronti per trasferire il primo file di test. Per iniziare in modo semplice, iniziamo con uno che non ha molte dipendenze da pacchetti di terze parti o altri file come PageObjects. Nel nostro esempio, il primo file da migrare è `first-test.spec.ts`. Prima crea la directory in cui la nuova configurazione di WebdriverIO si aspetta i suoi file e poi spostala:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Ora trasformiamo questo file:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

Tutto qui! Questo file è così semplice che non abbiamo bisogno di ulteriori modifiche e possiamo direttamente provare a eseguire WebdriverIO tramite:

```sh
npx wdio run wdio.conf.ts
```

Congratulazioni 🥳 hai appena migrato il primo file!

## Prossimi passi

Da questo punto continui a trasformare test per test e page object per page object. Ci sono possibilità che il codemod fallisca per determinati file con un errore come:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Per alcuni comandi di Protractor non esiste semplicemente una sostituzione in WebdriverIO. In questo caso il codemod ti darà alcuni consigli su come rifattorizzarlo. Se ti imbatti in tali messaggi di errore troppo spesso, sentiti libero di [segnalare un problema](https://github.com/webdriverio/codemod/issues/new) e richiedere di aggiungere una determinata trasformazione. Mentre il codemod già trasforma la maggior parte dell'API di Protractor, c'è ancora molto spazio per miglioramenti.

## Conclusione

Speriamo che questo tutorial ti guidi un po' attraverso il processo di migrazione a WebdriverIO. La community continua a migliorare il codemod mentre lo testa con vari team in varie organizzazioni. Non esitare a [segnalare un problema](https://github.com/webdriverio/codemod/issues/new) se hai feedback o [avviare una discussione](https://github.com/webdriverio/codemod/discussions/new) se hai difficoltà durante il processo di migrazione.