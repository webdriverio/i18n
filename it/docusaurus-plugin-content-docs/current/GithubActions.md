---
id: githubactions
title: Github Actions
---

Se il tuo repository è ospitato su Github, puoi utilizzare [Github Actions](https://docs.github.com/en/actions) per eseguire i tuoi test sull'infrastruttura di Github.

1. ogni volta che invii modifiche
2. su ogni creazione di pull request
3. a orari programmati
4. tramite attivazione manuale

Nella root del tuo repository, crea una directory `.github/workflows`. Aggiungi un file Yaml, ad esempio `.github/workflows/ci.yaml`. Qui configurerai come eseguire i tuoi test.

Vedi [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) per un'implementazione di riferimento, e [esempi di esecuzione dei test](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Scopri di più nella [Documentazione di Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) su come creare file di workflow.