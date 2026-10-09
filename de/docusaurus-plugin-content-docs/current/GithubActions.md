---
id: githubactions
title: Github Actions
description: "Führen Sie Ihre WebdriverIO-Tests auf GitHub Actions aus, indem Sie eine Workflow-Datei zu Ihrem Repository hinzufügen."
---

Wenn Ihr Repository auf Github gehostet wird, können Sie [Github Actions](https://docs.github.com/en/actions) verwenden, um Ihre Tests auf der Infrastruktur von Github auszuführen:

1. jedes Mal, wenn Sie Änderungen pushen
2. bei jeder Erstellung eines Pull Requests
3. zu geplanten Zeitpunkten
4. durch manuelles Auslösen

Erstellen Sie im Stammverzeichnis Ihres Repositorys ein Verzeichnis `.github/workflows`. Fügen Sie eine Yaml-Datei hinzu, zum Beispiel `.github/workflows/ci.yaml`. Darin konfigurieren Sie, wie Ihre Tests ausgeführt werden sollen.

Siehe [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) für eine Referenzimplementierung sowie [Beispiel-Testläufe](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Weitere Informationen zum Erstellen von Workflow-Dateien finden Sie in den [Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli).