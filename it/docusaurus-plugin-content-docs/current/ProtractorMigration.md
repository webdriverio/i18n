---
id: protractor-migration
title: Da Protractor
description: "Migra passo dopo passo una suite di test Protractor a WebdriverIO, incluse dipendenze, file di configurazione e file di test, con l'aiuto di un codemod."
---

Questo tutorial è rivolto a chi utilizza Protractor e desidera migrare il proprio framework a WebdriverIO. È nato dopo che il team di Angular [ha annunciato](https://github.com/angular/protractor/issues/5502) che Protractor non sarà più supportato. WebdriverIO è stato influenzato da molte delle scelte progettuali di Protractor, motivo per cui è probabilmente il framework più vicino verso cui migrare. Il team di WebdriverIO apprezza il lavoro di ogni singolo contributore di Protractor e spera che questo tutorial renda la transizione a WebdriverIO facile e diretta.

Anche se ci piacerebbe avere un processo completamente automatizzato, la realtà è diversa. Ognuno ha una configurazione differente e utilizza Protractor in modi diversi. Ogni passaggio va considerato come una linea guida più che come un'istruzione passo dopo passo. In caso di problemi con la migrazione, non esitare a [contattarci](https://github.com/webdriverio/codemod/discussions/new).

## Setup

Le API di Protractor e WebdriverIO sono in realtà molto simili, al punto che la maggior parte dei comandi può essere riscritta in modo automatizzato tramite un [codemod](https://github.com/webdriverio/codemod).

Per installare il codemod, esegui:

```sh
npm install jscodeshift @wdio/codemod
```

## Strategia

Esistono molte strategie di migrazione. A seconda delle dimensioni del tuo team, del numero di file di test e dell'urgenza della migrazione, puoi provare a trasformare tutti i test in una volta sola oppure file per file. Considerando che Protractor continuerà a essere mantenuto fino alla versione 15 di Angular (fine 2022), hai ancora tempo a sufficienza. Puoi far girare contemporaneamente test Protractor e WebdriverIO e iniziare a scrivere i nuovi test in WebdriverIO. In base al tempo a disposizione, puoi poi iniziare a migrare prima i casi di test più importanti e procedere fino ai test che potresti persino eliminare.

## Prima il file di configurazione

Dopo aver installato il codemod possiamo iniziare a trasformare il primo file. Dai prima un'occhiata alle [opzioni di configurazione di WebdriverIO](configuration). I file di configurazione possono diventare molto complessi e potrebbe avere senso portare solo le parti essenziali, valutando come aggiungere il resto man mano che vengono migrati i test che richiedono determinate opzioni.

Per la prima migrazione trasformiamo solo il file di configurazione ed eseguiamo:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Il tuo file di configurazione potrebbe avere un nome diverso, ma il principio dovrebbe essere lo stesso: inizia migrando prima la configurazione.

:::

## Installare le dipendenze di WebdriverIO

Il passo successivo è configurare un setup minimo di WebdriverIO che andremo ad ampliare man mano che migriamo da un framework all'altro. Per prima cosa installiamo la CLI di WebdriverIO con:

```sh
npm install --save-dev @wdio/cli
```

Poi eseguiamo la procedura guidata di configurazione:

```sh
npx wdio config
```

Questa ti guiderà attraverso alcune domande. Per questo scenario di migrazione:
- scegli le opzioni predefinite
- ti consigliamo di non generare automaticamente i file di esempio
- scegli una cartella diversa per i file di WebdriverIO
- e di preferire Mocha a Jasmine.

:::info Perché Mocha?
Anche se in precedenza potresti aver usato Protractor con Jasmine, Mocha offre migliori meccanismi di retry. La scelta è tua!
:::

Dopo il breve questionario, la procedura guidata installerà tutti i pacchetti necessari e li salverà nel tuo `package.json`.

## Migrare il file di configurazione

Ora che abbiamo un `conf.ts` trasformato e un nuovo `wdio.conf.ts`, è il momento di migrare la configurazione dall'uno all'altro. Assicurati di portare solo il codice essenziale affinché tutti i test possano essere eseguiti. Nel nostro caso portiamo la funzione hook e il timeout del framework.

D'ora in poi lavoreremo solo con il file `wdio.conf.ts` e quindi non avremo più bisogno di modificare la configurazione originale di Protractor. Possiamo annullare quelle modifiche in modo che entrambi i framework possano funzionare in parallelo e si possa migrare un file alla volta.

## Migrare un file di test

Ora siamo pronti a migrare il primo file di test. Per iniziare in modo semplice, partiamo da uno che non abbia molte dipendenze da pacchetti di terze parti o da altri file come i PageObject. Nel nostro esempio il primo file da migrare è `first-test.spec.ts`. Per prima cosa crea la directory in cui la nuova configurazione di WebdriverIO si aspetta i suoi file e poi spostalo lì:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Ora trasformiamo questo file:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

Ecco fatto! Questo file è così semplice che non servono ulteriori modifiche e possiamo provare direttamente a eseguire WebdriverIO con:

```sh
npx wdio run wdio.conf.ts
```

Congratulazioni 🥳 hai appena migrato il primo file!

## Prossimi passi

Da questo punto continua a trasformare un test alla volta e un page object alla volta. È possibile che il codemod fallisca per alcuni file con un errore come:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Per alcuni comandi di Protractor semplicemente non esiste un equivalente in WebdriverIO. In questo caso il codemod ti darà qualche suggerimento su come effettuare il refactoring. Se ti imbatti troppo spesso in messaggi di errore di questo tipo, sentiti libero di [aprire una issue](https://github.com/webdriverio/codemod/issues/new) e richiedere l'aggiunta di una determinata trasformazione. Sebbene il codemod trasformi già la maggior parte delle API di Protractor, c'è ancora molto margine di miglioramento.

## Conclusione

Speriamo che questo tutorial ti guidi almeno un po' nel processo di migrazione a WebdriverIO. La community continua a migliorare il codemod testandolo con diversi team in diverse organizzazioni. Non esitare ad [aprire una issue](https://github.com/webdriverio/codemod/issues/new) se hai un feedback o ad [avviare una discussione](https://github.com/webdriverio/codemod/discussions/new) se incontri difficoltà durante il processo di migrazione.