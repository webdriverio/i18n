---
id: githubactions
title: Github Actions
description: "Uruchamiaj swoje testy WebdriverIO w GitHub Actions, dodając plik workflow do swojego repozytorium."
---

Jeśli Twoje repozytorium jest hostowane na Githubie, możesz użyć [Github Actions](https://docs.github.com/en/actions), aby uruchamiać swoje testy na infrastrukturze Githuba:

1. przy każdym wypchnięciu zmian
2. przy każdym utworzeniu pull requesta
3. o zaplanowanym czasie
4. przez ręczne wyzwolenie

W katalogu głównym swojego repozytorium utwórz katalog `.github/workflows`. Dodaj plik Yaml, na przykład `.github/workflows/ci.yaml`. W nim skonfigurujesz sposób uruchamiania testów.

Zobacz [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml), aby zapoznać się z przykładową implementacją, oraz [przykładowe uruchomienia testów](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Więcej informacji na temat tworzenia plików workflow znajdziesz w [dokumentacji Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli).