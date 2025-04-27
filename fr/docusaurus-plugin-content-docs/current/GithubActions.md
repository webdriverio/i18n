---
id: githubactions
title: Github Actions
---

Si votre dépôt est hébergé sur Github, vous pouvez utiliser [Github Actions](https://docs.github.com/en/actions) pour exécuter vos tests sur l'infrastructure de Github.

1. à chaque fois que vous poussez des modifications
2. à chaque création de pull request
3. selon un calendrier programmé
4. par déclenchement manuel

À la racine de votre dépôt, créez un répertoire `.github/workflows`. Ajoutez un fichier Yaml, par exemple `.github/workflows/ci.yaml`. Vous y configurerez comment exécuter vos tests.

Consultez [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) pour une implémentation de référence, et [des exemples d'exécutions de tests](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Découvrez dans la [Documentation Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) plus d'informations sur la création de fichiers de workflow.