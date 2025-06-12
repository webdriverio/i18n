---
id: assertion
title: Asserção
---

O [testrunner WDIO](https://webdriver.io/docs/clioptions) vem com uma biblioteca de asserção integrada que permite fazer asserções poderosas em vários aspectos do navegador ou elementos dentro da sua aplicação (web). Ele estende a funcionalidade dos [Matchers do Jest](https://jestjs.io/docs/en/using-matchers) com matchers adicionais, otimizados para testes e2e, por exemplo:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

ou

```js
const selectOptions = await $$('form select>option')

// certifique-se de que há pelo menos uma opção no select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Para a lista completa, veja a [documentação da API expect](/docs/api/expect-webdriverio).

## Asserções Suaves

WebdriverIO inclui asserções suaves por padrão a partir do expect-webdriver(5.2.0). Asserções suaves permitem que seus testes continuem a execução mesmo quando uma asserção falha. Todas as falhas são coletadas e relatadas no final do teste.

### Uso

```js
// Estas não lançarão exceção imediatamente se falharem
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Asserções regulares ainda lançam exceção imediatamente
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migrando do Chai

[Chai](https://www.chaijs.com/) e [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) podem coexistir, e com alguns ajustes menores, uma transição tranquila para o expect-webdriverio pode ser alcançada. Se você atualizou para o WebdriverIO v6, então por padrão você terá acesso a todas as asserções do `expect-webdriverio` prontas para uso. Isso significa que globalmente, onde quer que você use `expect`, você estará chamando uma asserção do `expect-webdriverio`. Isso é, a menos que você tenha definido [`injectGlobals`](/docs/configuration#injectglobals) como `false` ou tenha explicitamente sobrescrito o `expect` global para usar o Chai. Neste caso, você não teria acesso a nenhuma das asserções do expect-webdriverio sem importar explicitamente o pacote expect-webdriverio onde você precisar.

Este guia mostrará exemplos de como migrar do Chai se ele tiver sido sobrescrito localmente e como migrar do Chai se ele tiver sido sobrescrito globalmente.

### Local

Suponha que o Chai foi importado explicitamente em um arquivo, por exemplo:

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

Para migrar este código, remova a importação do Chai e use o novo método de asserção expect-webdriverio `toHaveUrl` em vez disso:

```js
// myfile.js - código migrado
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // novo método da API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Se você quiser usar tanto o Chai quanto o expect-webdriverio no mesmo arquivo, você manteria a importação do Chai e `expect` seria por padrão a asserção do expect-webdriverio, por exemplo:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Asserção do Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // asserção do expect-webdriverio
    })
})
```

### Global

Suponha que `expect` foi globalmente sobrescrito para usar o Chai. Para usar as asserções do expect-webdriverio, precisamos definir globalmente uma variável no hook "before", por exemplo:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Agora o Chai e o expect-webdriverio podem ser usados lado a lado. Em seu código, você usaria as asserções do Chai e do expect-webdriverio da seguinte forma, por exemplo:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Asserção do Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // asserção do expect-webdriverio
    });
});
```

Para migrar, você moveria gradualmente cada asserção do Chai para o expect-webdriverio. Quando todas as asserções do Chai tiverem sido substituídas em toda a base de código, o hook "before" pode ser excluído. Uma busca global e substituição para substituir todas as instâncias de `wdioExpect` por `expect` então finalizará a migração.