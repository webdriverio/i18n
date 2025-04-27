---
id: assertion
title: Твердження
---

[Тестовий запускник WDIO](https://webdriver.io/docs/clioptions) поставляється з вбудованою бібліотекою тверджень, яка дозволяє робити потужні твердження про різні аспекти браузера або елементи вашого (веб) додатку. Він розширює функціональність [Jests Matchers](https://jestjs.io/docs/en/using-matchers) з додатковими матчерами, оптимізованими для e2e тестування, наприклад:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

або

```js
const selectOptions = await $$('form select>option')

// переконайтеся, що у селекті є принаймні один варіант
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Повний список можна знайти в [документації API expect](/docs/api/expect-webdriverio).

## Міграція з Chai

[Chai](https://www.chaijs.com/) та [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) можуть співіснувати, і з деякими незначними коригуваннями можна досягти плавного переходу на expect-webdriverio. Якщо ви оновилися до WebdriverIO v6, то за замовчуванням ви матимете доступ до всіх тверджень з `expect-webdriverio` з коробки. Це означає, що глобально, де б ви не використовували `expect`, ви викликатимете твердження `expect-webdriverio`. Це якщо ви не встановили [`injectGlobals`](/docs/configuration#injectglobals) як `false` або явно не перевизначили глобальний `expect` для використання Chai. У цьому випадку ви не матимете доступу до жодних тверджень expect-webdriverio без явного імпорту пакету expect-webdriverio туди, де він вам потрібен.

Цей посібник покаже приклади того, як мігрувати з Chai, якщо він був перевизначений локально, і як мігрувати з Chai, якщо він був перевизначений глобально.

### Локально

Припустимо, Chai був явно імпортований у файл, наприклад:

```js
// myfile.js - оригінальний код
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Щоб мігрувати цей код, видаліть імпорт Chai та використовуйте новий метод твердження expect-webdriverio `toHaveUrl`:

```js
// myfile.js - мігрований код
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // новий метод API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Якщо ви хочете використовувати і Chai, і expect-webdriverio в одному файлі, ви збережете імпорт Chai, а `expect` буде за замовчуванням твердженням expect-webdriverio, наприклад:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // твердження Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // твердження expect-webdriverio
    })
})
```

### Глобально

Припустимо, `expect` був глобально перевизначений для використання Chai. Щоб використовувати твердження expect-webdriverio, нам потрібно глобально встановити змінну в хуку "before", наприклад:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Тепер Chai та expect-webdriverio можуть використовуватися разом. У вашому коді ви б використовували твердження Chai та expect-webdriverio наступним чином, наприклад:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // твердження Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // твердження expect-webdriverio
    });
});
```

Для міграції ви б поступово переводили кожне твердження Chai на expect-webdriverio. Після того, як всі твердження Chai були замінені у всій кодовій базі, хук "before" можна видалити. Глобальний пошук і заміна всіх екземплярів `wdioExpect` на `expect` завершить міграцію.