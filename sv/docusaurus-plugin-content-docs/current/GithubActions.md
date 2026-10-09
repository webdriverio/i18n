---
id: githubactions
title: Github Actions
description: "Kör dina WebdriverIO-tester på GitHub Actions genom att lägga till en arbetsflödesfil i ditt repository."
---

Om ditt repository finns på Github kan du använda [Github Actions](https://docs.github.com/en/actions) för att köra dina tester på Githubs infrastruktur.

1. varje gång du pushar ändringar
2. vid varje skapande av en pull request
3. vid schemalagd tid
4. genom manuell utlösning

Skapa en `.github/workflows`-katalog i roten av ditt repository. Lägg till en Yaml-fil, till exempel `.github/workflows/ci.yaml`. Där konfigurerar du hur dina tester ska köras.

Se [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) för en referensimplementation och [exempel på testkörningar](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Läs mer om hur du skapar arbetsflödesfiler i [Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli).