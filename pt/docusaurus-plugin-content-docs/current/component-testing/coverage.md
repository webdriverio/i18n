---
id: coverage
title: Cobertura
description: "Colete a cobertura de código para testes de componentes com o browser runner, que instrumenta seu código com istanbul através do Vite."
---

O browser runner do WebdriverIO suporta relatórios de cobertura de código usando [`istanbul`](https://istanbul.js.org/). O testrunner instrumentará automaticamente seu código usando o Vite e capturará a cobertura de código para você.

## Como Funciona

O `@wdio/browser-runner` usa o Vite para servir sua aplicação. Quando você habilita a cobertura, ele adiciona um plugin ao servidor Vite que tenta instrumentar seu código-fonte em tempo real à medida que ele é solicitado pelo navegador.

:::warning Importante
**Não navegue para fora do test runner!**

A cobertura de código depende de os arquivos serem servidos e instrumentados pelo servidor Vite local iniciado pelo WebdriverIO.
Se você usar `browser.url('http://...')` ou `browser.url('file://...')` para navegar para uma página diferente, estará saindo do ambiente instrumentado. Seu código será executado, mas **nenhuma cobertura será coletada**.

**Abordagem Correta (Teste de Componentes):**
Renderize seu componente ou importe seu módulo diretamente no arquivo de teste.

```js
import { myFunction } from '../src/utils.js'

it('should cover my function', () => {
    myFunction() // Isto é coberto
})
```

**Abordagem Incorreta (Estilo E2E):**
```js
it('will not have coverage', async () => {
    // ❌ navegar para outra página quebra a instrumentação
    await browser.url('http://localhost:3000')
})
```
:::

## Configuração

Para habilitar os relatórios de cobertura de código, habilite-os através da configuração do browser runner do WebdriverIO, por exemplo:

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

Confira todas as [opções de cobertura](/docs/runner#coverage-options) para aprender como configurá-la corretamente.

:::tip Dicas de Configuração
Se você estiver testando arquivos não padrão (como scripts inline em `.html`) ou se seus arquivos não estiverem sendo detectados, talvez seja necessário verificar explicitamente suas opções `include` e `extension`:

```js
coverage: {
    enabled: true,
    // Aponte explicitamente para seus arquivos-fonte se a resolução padrão falhar
    include: ['src/**/*.js', 'src/**/*.vue'],
    // Adicione .html se você tiver scripts inline
    extension: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.html']
}
```
:::

## Ignorando Código

Pode haver algumas seções da sua base de código que você deseja excluir propositalmente do rastreamento de cobertura. Para isso, você pode usar as seguintes dicas de análise:

- `/* istanbul ignore if */`: ignora a próxima instrução if.
- `/* istanbul ignore else */`: ignora a parte else de uma instrução if.
- `/* istanbul ignore next */`: ignora o próximo elemento no código-fonte (funções, instruções if, classes, o que for).
- `/* istanbul ignore file */`: ignora um arquivo-fonte inteiro (isso deve ser colocado no topo do arquivo).

:::info

É recomendado excluir seus arquivos de teste do relatório de cobertura, pois isso pode causar erros, por exemplo, ao chamar o comando `execute`. Se você quiser mantê-los em seu relatório, certifique-se de excluí-los da instrumentação via:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::