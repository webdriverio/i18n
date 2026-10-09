---
id: sharding
title: Fragmentação
description: "Divida seu conjunto de testes entre várias máquinas com a opção --shard para executar os testes mais rapidamente, por exemplo, no GitHub Actions."
---

Por padrão, o WebdriverIO executa testes em paralelo e busca a utilização ideal dos núcleos de CPU da sua máquina. Para alcançar uma paralelização ainda maior, você pode escalar ainda mais a execução de testes do WebdriverIO executando testes em várias máquinas simultaneamente. Chamamos esse modo de operação de "sharding" (fragmentação).

## Fragmentando testes entre várias máquinas

Para fragmentar o conjunto de testes, passe `--shard=x/y` na linha de comando. Por exemplo, para dividir o conjunto em quatro fragmentos, cada um executando um quarto dos testes:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Agora, se você executar esses fragmentos em paralelo em computadores diferentes, seu conjunto de testes será concluído quatro vezes mais rápido.

## Exemplo com GitHub Actions

O GitHub Actions suporta [fragmentação de testes entre vários jobs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) usando a opção [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). A opção matrix executará um job separado para cada combinação possível das opções fornecidas.

O exemplo a seguir mostra como configurar um job para executar seus testes em quatro máquinas em paralelo. Você pode encontrar a configuração completa do pipeline no projeto [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Primeiro, adicionamos uma opção matrix à configuração do nosso job com a opção shard contendo o número de fragmentos que queremos criar. `shard: [1, 2, 3, 4]` criará quatro fragmentos, cada um com um número de fragmento diferente.
-   Em seguida, executamos nossos testes WebdriverIO com a opção `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Este será nosso comando de teste para cada fragmento.
-   Por fim, enviamos nosso relatório de logs do wdio para os Artifacts do GitHub Actions. Isso tornará os logs disponíveis caso o fragmento falhe.

O pipeline de testes é definido da seguinte forma:

```yaml title=.github/workflows/test.yaml
name: Test

on: [push, pull_request]

jobs:
    lint:
        # ...
    unit:
        # ...
    e2e:
        name: 🧪 Test (${{ matrix.shard }}/${{ strategy.job-total }})
        runs-on: ubuntu-latest
        needs: [lint, unit]
        strategy:
            matrix:
                shard: [1, 2, 3, 4]
        steps:
            - uses: actions/checkout@v4
            - uses: ./.github/workflows/actions/setup
            - name: E2E Test
              run: npm run test:features -- --shard ${{ matrix.shard }}/${{ strategy.job-total }}
            - uses: actions/upload-artifact@v1
              if: failure()
              with:
                  name: logs-${{ matrix.shard }}
                  path: logs
```

Isso executará todos os fragmentos em paralelo, reduzindo o tempo de execução dos testes em 4 vezes:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Veja o commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) do projeto [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), que introduziu a fragmentação em seu pipeline de testes, o que ajudou a reduzir o tempo total de execução de `2:23 min` para `1:30 min`, uma redução de __37%__ 🎉.