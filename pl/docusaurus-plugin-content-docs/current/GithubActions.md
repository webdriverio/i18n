---
id: githubactions
title: Github Actions
---

Jeśli Twoje repozytorium jest hostowane na Github, możesz użyć [Github Actions](https://docs.github.com/en/actions) do uruchamiania testów na infrastrukturze Github.

1. za każdym razem, gdy wysyłasz zmiany
2. przy każdym utworzeniu pull requesta
3. według zaplanowanego harmonogramu
4. poprzez ręczne uruchomienie

W głównym katalogu swojego repozytorium, utwórz katalog `.github/workflows`. Dodaj plik Yaml, na przykład `.github/workflows/ci.yaml`. W nim skonfigurujesz sposób uruchamiania testów.

Zobacz [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) dla przykładowej implementacji oraz [przykładowe uruchomienia testów](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Dowiedz się więcej w [dokumentacji Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) na temat tworzenia plików workflow.