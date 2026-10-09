---
id: assertion
title: Утверждения
description: "Пишите утверждения о состоянии браузера и элементов с помощью встроенной библиотеки expect-webdriverio, используйте мягкие утверждения и переходите с Chai."
---

[Тестраннер WDIO](https://webdriver.io/docs/clioptions) поставляется со встроенной библиотекой утверждений, которая позволяет делать мощные проверки различных аспектов браузера или элементов вашего (веб-)приложения. Она расширяет функциональность [матчеров Jest](https://jestjs.io/docs/en/using-matchers) дополнительными матчерами, оптимизированными для e2e-тестирования, например:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

или

```js
const selectOptions = await $$('form select>option')

// убедиться, что в select есть хотя бы один option
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Полный список смотрите в [документации API expect](/docs/api/expect-webdriverio).

:::info Jasmine

При использовании фреймворка Jasmine `expect` объединяет матчеры Jasmine и матчеры WebdriverIO. Синхронным матчерам Jasmine не нужен `await`, а части `expect` из Jest, такие как `expect.soft()`, недоступны. Смотрите [Использование Jasmine](/docs/frameworks#assertions).

:::

## Мягкие утверждения

WebdriverIO по умолчанию включает мягкие утверждения из `expect-webdriverio` (начиная с версии 5.2.0). Мягкие утверждения позволяют тестам продолжать выполнение, даже если утверждение не прошло. Все ошибки собираются и выводятся в отчёте в конце теста.

### Использование

```js
// Эти утверждения не выбросят исключение сразу, если не пройдут
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Обычные утверждения по-прежнему выбрасывают исключение сразу
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Переход с Chai

[Chai](https://www.chaijs.com/) и [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) могут сосуществовать, и с помощью небольших изменений можно добиться плавного перехода на expect-webdriverio. Если вы обновились до WebdriverIO v6, то по умолчанию вам сразу доступны все утверждения из `expect-webdriverio`. Это означает, что везде, где вы глобально используете `expect`, будет вызываться утверждение `expect-webdriverio`. Исключение составляют случаи, когда вы установили [`injectGlobals`](/docs/configuration#injectglobals) в `false` или явно переопределили глобальный `expect` для использования Chai. В этом случае у вас не будет доступа ни к одному из утверждений expect-webdriverio без явного импорта пакета expect-webdriverio там, где он нужен.

В этом руководстве приведены примеры того, как перейти с Chai, если он был переопределён локально, и как перейти с Chai, если он был переопределён глобально.

### Локально

Предположим, что Chai был явно импортирован в файле, например:

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

Чтобы перевести этот код, удалите импорт Chai и используйте вместо него новый метод утверждения expect-webdriverio `toHaveUrl`:

```js
// myfile.js - перенесённый код
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // новый метод API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Если вы хотите использовать и Chai, и expect-webdriverio в одном файле, оставьте импорт Chai, а `expect` по умолчанию будет утверждением expect-webdriverio, например:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // утверждение Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // утверждение expect-webdriverio
    })
})
```

### Глобально

Предположим, что `expect` был глобально переопределён для использования Chai. Чтобы использовать утверждения expect-webdriverio, нужно глобально задать переменную в хуке "before", например:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Теперь Chai и expect-webdriverio можно использовать вместе. В коде утверждения Chai и expect-webdriverio используются следующим образом, например:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // утверждение Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // утверждение expect-webdriverio
    });
});
```

Для перехода вы постепенно заменяете каждое утверждение Chai на expect-webdriverio. Когда все утверждения Chai во всей кодовой базе будут заменены, хук "before" можно удалить. Глобальный поиск и замена всех вхождений `wdioExpect` на `expect` завершит переход.