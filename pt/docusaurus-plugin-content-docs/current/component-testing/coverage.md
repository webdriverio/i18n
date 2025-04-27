---
id: coverage
title: Cobertura
---

O runner de navegador do WebdriverIO suporta relatórios de cobertura de código usando [`istanbul`](https://istanbul.js.org/). O testrunner irá automaticamente instrumentar seu código e capturar a cobertura de código para você.

## Configuração

Para habilitar relatórios de cobertura de código, ative-o através da configuração do WebdriverIO browser runner, por exemplo:

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

Confira todas as [opções de cobertura](/docs/runner#coverage-options), para aprender como configurá-las adequadamente.

## Ignorando Código

Pode haver algumas seções do seu código-base que você deseja propositadamente excluir do rastreamento de cobertura. Para fazer isso, você pode usar as seguintes dicas de análise:

- `/* istanbul ignore if */`: ignore a próxima instrução if.
- `/* istanbul ignore else */`: ignore a parte else de uma instrução if.
- `/* istanbul ignore next */`: ignore a próxima coisa no código-fonte (funções, instruções if, classes, o que você quiser).
- `/* istanbul ignore file */`: ignore um arquivo de origem inteiro (isso deve ser colocado no topo do arquivo).

:::info

É recomendável excluir seus arquivos de teste dos relatórios de cobertura, pois isso pode causar erros, por exemplo, ao chamar comandos `execute` ou `executeAsync`. Se você quiser mantê-los em seu relatório, certifique-se de excluir a instrumentação deles via:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::