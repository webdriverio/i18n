---
id: assertion
title: Твердження
---

[Тестовий запускач WDIO](https://webdriver.io/docs/clioptions) містить вбудовану бібліотеку тверджень, яка дозволяє вам робити потужні твердження щодо різних аспектів браузера або елементів у вашому (веб) додатку. Вона розширює функціональність [Засобів зіставлення Jest](https://jestjs.io/docs/en/using-matchers) додатковими, оптимізованими для е2е тестування матчерами, наприклад:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

або

```js
const selectOptions = await $$('form select>option')

// переконайтесь, що в селекторі є принаймні один варіант
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Повний список дивіться у [документації API expect](/docs/api/expect-webdriverio).

## М'які твердження

WebdriverIO за замовчуванням включає м'які твердження з expect-webdriver(5.2.0). М'які твердження дозволяють вашим тестам продовжувати виконання навіть коли твердження не виконується. Всі помилки збираються та повідомляються в кінці тесту.

### Використання

```js
// Ці твердження не викликатимуть помилку одразу при невдачі
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Звичайні твердження все одно викликають помилку одразу
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Міграція з Chai

[Chai](https://www.chaijs.com/) та [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) можуть співіснувати, і з деякими незначними налаштуваннями можна досягти плавного переходу на expect-webdriverio. Якщо ви оновилися до WebdriverIO v6, тоді за замовчуванням ви матимете доступ до всіх тверджень з `expect-webdriverio` одразу. Це означає, що глобально, де б ви не використовували `expect`, ви викликатимете твердження `expect-webdriverio`. Це відбувається, якщо ви не встановили [`injectGlobals`](/docs/configuration#injectglobals) як `false` або явно не перевизначили глобальний `expect` для використання Chai. У такому випадку ви не матимете доступу до жодних тверджень expect-webdriverio без явного імпорту пакету expect-webdriverio там, де він вам потрібен.

Цей посібник покаже приклади того, як мігрувати з Chai, якщо його було перевизначено локально, і як мігрувати з Chai, якщо його було перевизначено глобально.

### Локально

Припустимо, Chai було явно імпортовано в файл, наприклад:

```js
// myfile.js - початковий код
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Щоб мігрувати цей код, видаліть імпорт Chai і використовуйте новий метод твердження expect-webdriverio `toHaveUrl` замість нього:

```js
// myfile.js - мігрований код
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // новий метод API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Якщо ви хочете використовувати і Chai, і expect-webdriverio в одному файлі, ви зберігаєте імпорт Chai, а `expect` за замовчуванням буде твердженням expect-webdriverio, наприклад:

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

Припустимо, `expect` був глобально перевизначений для використання Chai. Щоб використовувати твердження expect-webdriverio, нам потрібно глобально встановити змінну у хуку "before", наприклад:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Тепер Chai та expect-webdriverio можуть використовуватися разом. У вашому коді ви використовуватимете твердження Chai та expect-webdriverio таким чином:

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

Для міграції ви поступово переходите від кожного твердження Chai до expect-webdriverio. Після того, як всі твердження Chai буде замінено по всій кодовій базі, хук "before" можна видалити. Глобальний пошук і заміна всіх екземплярів `wdioExpect` на `expect` завершить міграцію.