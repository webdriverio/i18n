---
id: githubactions
title: Github Actions
---

Wenn Ihr Repository auf Github gehostet wird, können Sie [Github Actions](https://docs.github.com/en/actions) verwenden, um Ihre Tests auf der Infrastruktur von Github auszuführen.

1. jedes Mal, wenn Sie Änderungen pushen
2. bei jeder Erstellung eines Pull Requests
3. zu geplanten Zeiten
4. durch manuelle Auslösung

Erstellen Sie im Stammverzeichnis Ihres Repositories ein Verzeichnis `.github/workflows`. Fügen Sie eine Yaml-Datei hinzu, zum Beispiel `.github/workflows/ci.yaml`. Darin konfigurieren Sie, wie Ihre Tests ausgeführt werden sollen.

Sehen Sie sich [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) für eine Referenzimplementierung und [Beispiel-Testläufe](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI) an.

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Erfahren Sie in der [Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) mehr über die Erstellung von Workflow-Dateien.