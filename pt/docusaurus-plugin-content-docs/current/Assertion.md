---
id: assertion
title: Asserção
---

O [WDIO testrunner](https://webdriver.io/docs/clioptions) vem com uma biblioteca de asserção integrada que permite fazer asserções poderosas em vários aspectos do navegador ou elementos dentro da sua aplicação (web). Ele estende a funcionalidade dos [Matchers do Jest](https://jestjs.io/docs/en/using-matchers) com matchers adicionais, otimizados para testes e2e, por exemplo:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

ou

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Para a lista completa, consulte a [documentação da API expect](/docs/api/expect-webdriverio).

## Migrando do Chai

[Chai](https://www.chaijs.com/) e [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) podem coexistir, e com alguns pequenos ajustes, uma transição suave para o expect-webdriverio pode ser alcançada. Se você atualizou para o WebdriverIO v6, então por padrão você terá acesso a todas as asserções do `expect-webdriverio` prontas para uso. Isso significa que globalmente, onde quer que você use `expect`, você estará chamando uma asserção do `expect-webdriverio`. Isso é, a menos que você defina [`injectGlobals`](/docs/configuration#injectglobals) como `false` ou tenha explicitamente substituído o `expect` global para usar o Chai. Neste caso, você não teria acesso a nenhuma das asserções do expect-webdriverio sem importar explicitamente o pacote expect-webdriverio onde você precisa.

Este guia mostrará exemplos de como migrar do Chai se ele tiver sido substituído localmente e como migrar do Chai se ele tiver sido substituído globalmente.

### Local

Suponha que o Chai foi importado explicitamente em um arquivo, por exemplo:

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Para migrar este código, remova a importação do Chai e use o novo método de asserção expect-webdriverio `toHaveUrl`:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Se você quiser usar tanto o Chai quanto o expect-webdriverio no mesmo arquivo, você manteria a importação do Chai e `expect` seria o padrão para a asserção do expect-webdriverio, por exemplo:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### Global

Suponha que `expect` foi globalmente substituído para usar o Chai. Para usar as asserções do expect-webdriverio, precisamos definir globalmente uma variável no hook "before", por exemplo:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Agora o Chai e o expect-webdriverio podem ser usados juntos. Em seu código, você usaria as asserções do Chai e do expect-webdriverio da seguinte forma:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

Para migrar, você moveria gradualmente cada asserção do Chai para o expect-webdriverio. Depois que todas as asserções do Chai forem substituídas em toda a base de código, o hook "before" pode ser excluído. Uma busca e substituição global para substituir todas as instâncias de `wdioExpect` por `expect` finalizará a migração.