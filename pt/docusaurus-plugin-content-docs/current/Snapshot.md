---
id: snapshot
title: Snapshot
---

Testes de snapshot podem ser muito úteis para verificar uma ampla variedade de aspectos do seu componente ou lógica ao mesmo tempo. No WebdriverIO, você pode tirar snapshots de qualquer objeto arbitrário, bem como da estrutura DOM de um WebElement ou resultados de comandos do WebdriverIO.

Semelhante a outros frameworks de teste, o WebdriverIO irá tirar um snapshot do valor fornecido e, em seguida, compará-lo com um arquivo de snapshot de referência armazenado junto ao teste. O teste falhará se os dois snapshots não coincidirem: ou a alteração é inesperada, ou o snapshot de referência precisa ser atualizado para a nova versão do resultado.

:::info Suporte Multiplataforma

Essas capacidades de snapshot estão disponíveis para executar testes end-to-end no ambiente Node.js, bem como para executar [testes de unidade e componente](/docs/component-testing) no navegador ou em dispositivos móveis.

:::

## Usar Snapshots
Para tirar um snapshot de um valor, você pode usar o `toMatchSnapshot()` da API [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Na primeira vez que este teste é executado, o WebdriverIO cria um arquivo de snapshot que se parece com isto:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

O artefato de snapshot deve ser commitado junto com as mudanças de código e revisado como parte do seu processo de revisão de código. Nas execuções de teste subsequentes, o WebdriverIO comparará a saída renderizada com o snapshot anterior. Se eles coincidirem, o teste passará. Se não coincidirem, ou o executor de teste encontrou um bug em seu código que deve ser corrigido, ou a implementação mudou e o snapshot precisa ser atualizado.

Para atualizar o snapshot, passe a flag `-s` (ou `--updateSnapshot`) para o comando `wdio`, por exemplo:

```sh
npx wdio run wdio.conf.js -s
```

__Nota:__ se você executar testes com vários navegadores em paralelo, apenas um snapshot é criado e comparado. Se você quiser ter um snapshot separado por capacidade, por favor [abra uma issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) e nos informe sobre seu caso de uso.

## Snapshots Inline

Da mesma forma, você pode usar o `toMatchInlineSnapshot()` para armazenar o snapshot inline dentro do arquivo de teste.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Em vez de criar um arquivo de snapshot, o Vitest modificará o arquivo de teste diretamente para atualizar o snapshot como uma string:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Isso permite que você veja a saída esperada diretamente sem precisar alternar entre arquivos diferentes.

## Snapshots Visuais

Tirar um snapshot DOM de um elemento pode não ser a melhor ideia, especialmente se a estrutura DOM for muito grande e contiver propriedades dinâmicas de elementos. Nesses casos, é recomendável confiar em snapshots visuais para elementos.

Para habilitar snapshots visuais, adicione o `@wdio/visual-service` à sua configuração. Você pode seguir as instruções de configuração na [documentação](/docs/visual-testing#installation) para Testes Visuais.

Você pode então tirar um snapshot visual via `toMatchElementSnapshot()`, por exemplo:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Uma imagem é então armazenada no diretório de referência. Confira o [Teste Visual](/docs/visual-testing) para mais informações.