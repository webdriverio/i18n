---
id: githubactions
title: Github Actions
---

Om ditt kodarkiv finns på Github kan du använda [Github Actions](https://docs.github.com/en/actions) för att köra dina tester på Githubs infrastruktur.

1. varje gång du skickar ändringar 
2. vid varje skapande av pull request
3. på schemalagd tid
4. genom manuell trigger

I roten av ditt kodarkiv, skapa en `.github/workflows` katalog. Lägg till en Yaml-fil, till exempel `.github/workflows/ci.yaml`. Där kommer du att konfigurera hur dina tester ska köras.

Se [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) för referensimplementering, och [exempelkörningar av tester](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Läs mer i [Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) för mer information om att skapa workflow-filer.