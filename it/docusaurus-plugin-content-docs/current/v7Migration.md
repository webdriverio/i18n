---
id: v7-migration
title: Dalla v6 alla v7
description: "Aggiorna un progetto WebdriverIO dalla v6 alla v7 aggiornando le dipendenze, trasformando il file di configurazione e aggiornando le step definition di Cucumber."
---

Questo tutorial è rivolto a chi sta ancora utilizzando la `v6` di WebdriverIO e desidera migrare alla `v7`. Come menzionato nel nostro [post del blog di rilascio](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), le modifiche riguardano principalmente il funzionamento interno e l'aggiornamento dovrebbe essere un processo semplice.

:::info

Se stai utilizzando WebdriverIO `v5` o versioni precedenti, aggiorna prima alla `v6`. Consulta la nostra [guida alla migrazione v6](v6-migration).

:::

Anche se ci piacerebbe avere un processo completamente automatizzato, la realtà è diversa. Ognuno ha una configurazione differente. Ogni passaggio dovrebbe essere considerato come una linea guida piuttosto che come un'istruzione passo dopo passo. Se riscontri problemi con la migrazione, non esitare a [contattarci](https://github.com/webdriverio/codemod/discussions/new).

## Configurazione

Come per altre migrazioni, possiamo utilizzare il [codemod](https://github.com/webdriverio/codemod) di WebdriverIO. Per questo tutorial utilizziamo un [progetto boilerplate](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) inviato da un membro della community e lo migriamo completamente dalla `v6` alla `v7`.

Per installare il codemod, esegui:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commit:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Aggiornare le dipendenze di WebdriverIO

Dato che tutte le versioni di WebdriverIO sono strettamente legate tra loro, è meglio aggiornare sempre a un tag specifico, ad esempio `latest`. Per farlo, copiamo tutte le dipendenze relative a WebdriverIO dal nostro `package.json` e le reinstalliamo tramite:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Di solito le dipendenze di WebdriverIO fanno parte delle dev dependencies, anche se questo può variare a seconda del progetto. Dopo questo passaggio, il tuo `package.json` e il tuo `package-lock.json` dovrebbero essere aggiornati. __Nota:__ queste sono le dipendenze utilizzate dal [progetto di esempio](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), le tue potrebbero essere diverse.

#### Commit:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Trasformare il file di configurazione

Un buon primo passo è iniziare dal file di configurazione. In WebdriverIO `v7` non è più necessario registrare manualmente alcun compilatore. Anzi, devono essere rimossi. Questo può essere fatto in modo completamente automatico con il codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Il codemod non supporta ancora i progetti TypeScript. Vedi [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Stiamo lavorando per implementarne presto il supporto. Se utilizzi TypeScript, partecipa anche tu!

:::

#### Commit:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Aggiornare le step definition

Se utilizzi Jasmine o Mocha, hai finito. L'ultimo passaggio consiste nell'aggiornare gli import di Cucumber.js da `cucumber` a `@cucumber/cucumber`. Anche questo può essere fatto automaticamente tramite il codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

Ecco fatto! Non sono necessarie altre modifiche 🎉

#### Commit:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Conclusione

Speriamo che questo tutorial ti abbia guidato un po' nel processo di migrazione a WebdriverIO `v7`. La community continua a migliorare il codemod testandolo con diversi team in varie organizzazioni. Non esitare ad [aprire una issue](https://github.com/webdriverio/codemod/issues/new) se hai un feedback o ad [avviare una discussione](https://github.com/webdriverio/codemod/discussions/new) se incontri difficoltà durante il processo di migrazione.