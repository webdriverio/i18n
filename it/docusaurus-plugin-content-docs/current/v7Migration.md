---
id: v7-migration
title: Da v6 a v7
---

Questo tutorial è per le persone che stanno ancora utilizzando `v6` di WebdriverIO e vogliono migrare alla `v7`. Come menzionato nel nostro [post sul blog di rilascio](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), i cambiamenti sono principalmente sotto il cofano e l'aggiornamento dovrebbe essere un processo semplice.

:::info

Se stai utilizzando WebdriverIO `v5` o versioni precedenti, prima aggiorna alla `v6`. Consulta la nostra [guida alla migrazione v6](v6-migration).

:::

Anche se vorremmo avere un processo completamente automatizzato per questo, la realtà è diversa. Ognuno ha una configurazione differente. Ogni passaggio dovrebbe essere visto come una guida e meno come un'istruzione passo dopo passo. Se hai problemi con la migrazione, non esitare a [contattarci](https://github.com/webdriverio/codemod/discussions/new).

## Setup

Simile ad altre migrazioni, possiamo usare il [codemod](https://github.com/webdriverio/codemod) di WebdriverIO. Per questo tutorial utilizziamo un [progetto boilerplate](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) fornito da un membro della community e lo migriamo completamente da `v6` a `v7`.

Per installare il codemod, esegui:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commit:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Aggiornare le Dipendenze di WebdriverIO

Dato che tutte le versioni di WebdriverIO sono legate tra loro, è meglio aggiornare sempre a un tag specifico, ad esempio `latest`. Per farlo, copiamo tutte le dipendenze relative a WebdriverIO dal nostro `package.json` e le reinstalliamo tramite:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Solitamente le dipendenze di WebdriverIO fanno parte delle dipendenze di sviluppo, ma questo può variare a seconda del tuo progetto. Dopo questo passaggio, i tuoi file `package.json` e `package-lock.json` dovrebbero essere aggiornati. __Nota:__ queste sono le dipendenze utilizzate dal [progetto di esempio](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), le tue potrebbero essere diverse.

#### Commit:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Trasformare il File di Configurazione

Un buon primo passo è iniziare con il file di configurazione. In WebdriverIO `v7` non è più necessario registrare manualmente nessuno dei compilatori. In effetti, devono essere rimossi. Questo può essere fatto con il codemod in modo completamente automatico:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Il codemod non supporta ancora progetti TypeScript. Vedi [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Stiamo lavorando per implementare il supporto al più presto. Se stai utilizzando TypeScript, coinvolgiti!

:::

#### Commit:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Aggiornare le Definizioni dei Passi

Se stai utilizzando Jasmine o Mocha, hai finito qui. L'ultimo passaggio è aggiornare gli import di Cucumber.js da `cucumber` a `@cucumber/cucumber`. Anche questo può essere fatto automaticamente tramite il codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

È tutto! Non sono necessarie altre modifiche 🎉

#### Commit:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Conclusione

Speriamo che questo tutorial ti guidi un po' attraverso il processo di migrazione a WebdriverIO `v7`. La community continua a migliorare il codemod testandolo con vari team in diverse organizzazioni. Non esitare a [segnalare un problema](https://github.com/webdriverio/codemod/issues/new) se hai feedback o [avviare una discussione](https://github.com/webdriverio/codemod/discussions/new) se incontri difficoltà durante il processo di migrazione.