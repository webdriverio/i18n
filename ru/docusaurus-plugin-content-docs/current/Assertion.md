---
id: assertion
title: Утверждения
---

[Тестраннер WDIO](https://webdriver.io/docs/clioptions) поставляется со встроенной библиотекой утверждений, которая позволяет делать мощные утверждения о различных аспектах браузера или элементов в вашем (веб) приложении. Она расширяет функциональность [Матчеров Jest](https://jestjs.io/docs/en/using-matchers) дополнительными матчерами, оптимизированными для e2e тестирования, например:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

или

```js
const selectOptions = await $$('form select>option')

// убедитесь, что в селекте есть хотя бы одна опция
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Полный список смотрите в [документации API expect](/docs/api/expect-webdriverio).

## Мягкие утверждения

WebdriverIO включает мягкие утверждения по умолчанию из expect-webdriver(5.2.0). Мягкие утверждения позволяют вашим тестам продолжать выполнение даже при неудачном утверждении. Все ошибки собираются и сообщаются в конце теста.

### Использование

```js
// Эти утверждения не вызовут ошибку немедленно, если они не пройдут
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Обычные утверждения по-прежнему вызывают ошибку немедленно
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Миграция с Chai

[Chai](https://www.chaijs.com/) и [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) могут сосуществовать, и с некоторыми незначительными настройками можно достичь плавного перехода на expect-webdriverio. Если вы обновились до WebdriverIO v6, то по умолчанию у вас будет доступ ко всем утверждениям из `expect-webdriverio` прямо из коробки. Это означает, что глобально везде, где вы используете `expect`, вы будете вызывать утверждение `expect-webdriverio`. Это так, если только вы не установили [`injectGlobals`](/docs/configuration#injectglobals) в значение `false` или явно не переопределили глобальный `expect` для использования Chai. В этом случае у вас не будет доступа ни к одному из утверждений expect-webdriverio без явного импорта пакета expect-webdriverio там, где он вам нужен.

Это руководство покажет примеры того, как мигрировать с Chai, если он был переопределен локально, и как мигрировать с Chai, если он был переопределен глобально.

### Локальный подход

Предположим, Chai был явно импортирован в файле, например:

```js
// myfile.js - исходный код
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Чтобы мигрировать этот код, удалите импорт Chai и используйте новый метод утверждения expect-webdriverio `toHaveUrl` вместо этого:

```js
// myfile.js - мигрированный код
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // новый метод API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Если вы хотите использовать и Chai, и expect-webdriverio в одном файле, вы сохраните импорт Chai, и `expect` будет по умолчанию использовать утверждение expect-webdriverio, например:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Утверждение Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // Утверждение expect-webdriverio
    })
})
```

### Глобальный подход

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

Теперь Chai и expect-webdriverio могут использоваться вместе. В вашем коде вы будете использовать утверждения Chai и expect-webdriverio следующим образом, например:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Утверждение Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // Утверждение expect-webdriverio
    });
});
```

Для миграции вы постепенно перенесете каждое утверждение Chai на expect-webdriverio. После того, как все утверждения Chai будут заменены во всей кодовой базе, хук "before" можно удалить. Глобальный поиск и замена всех экземпляров `wdioExpect` на `expect` завершит миграцию.