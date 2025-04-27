---
id: assertion
title: Утверждение
---

[Тестовый раннер WDIO](https://webdriver.io/docs/clioptions) поставляется со встроенной библиотекой утверждений, которая позволяет делать мощные утверждения о различных аспектах браузера или элементов в вашем (веб) приложении. Она расширяет функциональность [Jest Matchers](https://jestjs.io/docs/en/using-matchers) дополнительными матчерами, оптимизированными для e2e тестирования, например:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

или

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Полный список см. в [документации API expect](/docs/api/expect-webdriverio).

## Миграция с Chai

[Chai](https://www.chaijs.com/) и [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) могут сосуществовать, и с некоторыми незначительными корректировками можно осуществить плавный переход на expect-webdriverio. Если вы обновились до WebdriverIO v6, то по умолчанию у вас будет доступ ко всем утверждениям из `expect-webdriverio` из коробки. Это означает, что глобально везде, где вы используете `expect`, вы будете вызывать утверждение `expect-webdriverio`. Это так, если только вы не установили [`injectGlobals`](/docs/configuration#injectglobals) в значение `false` или явно не переопределили глобальный `expect` для использования Chai. В этом случае у вас не будет доступа к каким-либо утверждениям expect-webdriverio без явного импорта пакета expect-webdriverio там, где он вам нужен.

Это руководство покажет примеры миграции с Chai, если он был переопределен локально, и как выполнить миграцию с Chai, если он был переопределен глобально.

### Локально

Предположим, Chai был явно импортирован в файл, например:

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

Для миграции этого кода удалите импорт Chai и используйте новый метод утверждения expect-webdriverio `toHaveUrl` вместо него:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Если вы хотите использовать и Chai, и expect-webdriverio в одном файле, вы бы сохранили импорт Chai, а `expect` по умолчанию использовал бы утверждение expect-webdriverio, например:

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

### Глобально

Предположим, `expect` был глобально переопределен для использования Chai. Чтобы использовать утверждения expect-webdriverio, нам нужно глобально установить переменную в хуке "before", например:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Теперь Chai и expect-webdriverio могут использоваться вместе. В вашем коде вы бы использовали утверждения Chai и expect-webdriverio следующим образом, например:

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

Для миграции вы бы постепенно переносили каждое утверждение Chai на expect-webdriverio. После того как все утверждения Chai будут заменены по всей кодовой базе, хук "before" можно удалить. Глобальный поиск и замена всех экземпляров `wdioExpect` на `expect` завершит миграцию.