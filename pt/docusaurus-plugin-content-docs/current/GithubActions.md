---
id: githubactions
title: Github Actions
description: "Execute seus testes WebdriverIO no GitHub Actions adicionando um arquivo de workflow ao seu repositório."
---

Se o seu repositório está hospedado no Github, você pode usar o [Github Actions](https://docs.github.com/en/actions) para executar seus testes na infraestrutura do Github.

1. toda vez que você enviar alterações
2. a cada criação de pull request
3. em horários agendados
4. por acionamento manual

Na raiz do seu repositório, crie um diretório `.github/workflows`. Adicione um arquivo Yaml, por exemplo `.github/workflows/ci.yaml`. Nele você vai configurar como executar seus testes.

Veja o [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) para uma implementação de referência e [exemplos de execuções de testes](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Consulte a [documentação do Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) para mais informações sobre a criação de arquivos de workflow.