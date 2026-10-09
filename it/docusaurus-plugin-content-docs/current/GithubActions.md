---
id: githubactions
title: Github Actions
description: "Esegui i tuoi test WebdriverIO su GitHub Actions aggiungendo un file di workflow al tuo repository."
---

Se il tuo repository è ospitato su Github, puoi utilizzare [Github Actions](https://docs.github.com/en/actions) per eseguire i tuoi test sull'infrastruttura di Github.

1. ogni volta che effettui il push di modifiche
2. alla creazione di ogni pull request
3. in orari programmati
4. tramite attivazione manuale

Nella root del tuo repository, crea una directory `.github/workflows`. Aggiungi un file Yaml, ad esempio `.github/workflows/ci.yaml`. Al suo interno configurerai come eseguire i tuoi test.

Consulta [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) per un'implementazione di riferimento, e le [esecuzioni di test di esempio](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Scopri di più nella [documentazione di Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) per ulteriori informazioni sulla creazione dei file di workflow.