---
id: githubactions
title: Github Actions
---

Se o seu repositório estiver hospedado no Github, você pode usar o [Github Actions](https://docs.github.com/en/actions) para executar seus testes na infraestrutura do Github.

1. toda vez que você enviar alterações
2. em cada criação de pull request
3. em horários programados
4. por acionamento manual

Na raiz do seu repositório, crie um diretório `.github/workflows`. Adicione um arquivo Yaml, por exemplo `.github/workflows/ci.yaml`. Nele você configurará como executar seus testes.

Veja [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) para implementação de referência e [exemplos de execuções de teste](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Descubra mais informações sobre como criar arquivos de workflow nos [Documentos do Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli).