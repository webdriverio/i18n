---
id: assertion
title: Asserção
description: "Escreva asserções sobre o estado do navegador e dos elementos com a biblioteca integrada expect-webdriverio, use asserções suaves e migre do Chai."
---

O [WDIO testrunner](https://webdriver.io/docs/clioptions) vem com uma biblioteca de asserções integrada que permite fazer asserções poderosas sobre vários aspectos do navegador ou de elementos dentro da sua aplicação (web). Ela estende a funcionalidade dos [Matchers do Jest](https://jestjs.io/docs/en/using-matchers) com matchers adicionais, otimizados para testes e2e, por exemplo:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

ou

```js
const selectOptions = await $$('form select>option')

// garante que há pelo menos uma opção no select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Para a lista completa, consulte a [documentação da API expect](/docs/api/expect-webdriverio).

:::info Jasmine

Com o framework Jasmine, o `expect` combina os matchers do Jasmine e os matchers do WebdriverIO. Os matchers síncronos do Jasmine não precisam de `await`, e as partes do Jest do `expect`, como `expect.soft()`, não estão disponíveis. Veja [Usando Jasmine](/docs/frameworks#assertions).

:::

## Asserções Suaves

O WebdriverIO inclui asserções suaves (soft assertions) por padrão a partir do `expect-webdriverio` (desde a versão 5.2.0). As asserções suaves permitem que seus testes continuem a execução mesmo quando uma asserção falha. Todas as falhas são coletadas e reportadas ao final do teste.

### Uso

```js
// Estas não lançarão erro imediatamente se falharem
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Asserções normais ainda lançam erro imediatamente
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migrando do Chai

O [Chai](https://www.chaijs.com/) e o [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) podem coexistir e, com alguns pequenos ajustes, é possível obter uma transição suave para o expect-webdriverio. Se você atualizou para o WebdriverIO v6, por padrão terá acesso a todas as asserções do `expect-webdriverio` imediatamente. Isso significa que, globalmente, onde quer que você use `expect`, estará chamando uma asserção do `expect-webdriverio`. Isto é, a menos que você tenha definido [`injectGlobals`](/docs/configuration#injectglobals) como `false` ou tenha sobrescrito explicitamente o `expect` global para usar o Chai. Nesse caso, você não teria acesso a nenhuma das asserções do expect-webdriverio sem importar explicitamente o pacote expect-webdriverio onde precisar dele.

Este guia mostrará exemplos de como migrar do Chai caso ele tenha sido sobrescrito localmente e de como migrar do Chai caso ele tenha sido sobrescrito globalmente.

### Local

Suponha que o Chai tenha sido importado explicitamente em um arquivo, por exemplo:

```js
// myfile.js - código original
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Para migrar este código, remova a importação do Chai e use o novo método de asserção do expect-webdriverio `toHaveUrl` em seu lugar:

```js
// myfile.js - código migrado
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // novo método da API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Se você quiser usar tanto o Chai quanto o expect-webdriverio no mesmo arquivo, mantenha a importação do Chai e o `expect` usará por padrão a asserção do expect-webdriverio, por exemplo:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // asserção do Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // asserção do expect-webdriverio
    })
})
```

### Global

Suponha que o `expect` tenha sido sobrescrito globalmente para usar o Chai. Para usar as asserções do expect-webdriverio, precisamos definir globalmente uma variável no hook "before", por exemplo:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Agora o Chai e o expect-webdriverio podem ser usados lado a lado. No seu código, você usaria as asserções do Chai e do expect-webdriverio da seguinte forma, por exemplo:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // asserção do Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // asserção do expect-webdriverio
    });
});
```

Para migrar, você moveria gradualmente cada asserção do Chai para o expect-webdriverio. Depois que todas as asserções do Chai forem substituídas em toda a base de código, o hook "before" pode ser excluído. Uma busca e substituição global de todas as ocorrências de `wdioExpect` por `expect` finalizará a migração.