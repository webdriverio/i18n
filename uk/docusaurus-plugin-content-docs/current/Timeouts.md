---
id: timeouts
title: Часові обмеження
---

Кожна команда у WebdriverIO є асинхронною операцією. Запит надсилається на сервер Selenium (або до хмарного сервісу, як-от [Sauce Labs](https://saucelabs.com)), і його відповідь містить результат після того, як дія завершилася або не вдалася.

Тому час є важливим компонентом усього процесу тестування. Коли певна дія залежить від стану іншої дії, вам потрібно переконатися, що вони виконуються у правильному порядку. Часові обмеження відіграють важливу роль при роботі з цими питаннями.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Часові обмеження WebDriver

### Час очікування скрипту сесії

Сесія має пов'язаний час очікування скрипту сесії, який визначає час очікування виконання асинхронних скриптів. Якщо не вказано інше, це 30 секунд. Ви можете встановити це часове обмеження таким чином:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Час очікування завантаження сторінки сесії

Сесія має пов'язаний час очікування завантаження сторінки сесії, який визначає час очікування завершення завантаження сторінки. Якщо не вказано інше, це 300 000 мілісекунд.

Ви можете встановити це часове обмеження таким чином:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> Ключове слово `pageLoad` є частиною офіційної [специфікації](https://www.w3.org/TR/webdriver/#set-timeouts) WebDriver, але може не [підтримуватися](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) для вашого браузера (попередня назва - `page load`).

### Неявний час очікування сесії

Сесія має пов'язаний неявний час очікування сесії. Це визначає час очікування для неявної стратегії пошуку елементів при пошуку елементів за допомогою команд [`findElement`](/docs/api/webdriver#findelement) або [`findElements`](/docs/api/webdriver#findelements) (відповідно [`$`](/docs/api/browser/$) або [`$$`](/docs/api/browser/$$), при запуску WebdriverIO з або без тестового раннера WDIO). Якщо не вказано інше, це 0 мілісекунд.

Ви можете встановити це часове обмеження через:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Часові обмеження, пов'язані з WebdriverIO

### Час очікування `WaitFor*`

WebdriverIO надає кілька команд для очікування, поки елементи досягнуть певного стану (наприклад, активовані, видимі, існуючі). Ці команди приймають аргумент селектора та число часового обмеження, яке визначає, як довго екземпляр повинен чекати, поки цей елемент досягне стану. Опція `waitforTimeout` дозволяє встановити глобальне часове обмеження для всіх команд `waitFor*`, щоб вам не потрібно було встановлювати одне і те ж часове обмеження знову і знову. _(Зверніть увагу на малу літеру `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

У ваших тестах тепер ви можете робити це:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// ви також можете перевизначити стандартний таймаут при необхідності
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Часові обмеження, пов'язані з фреймворком

Тестовий фреймворк, який ви використовуєте з WebdriverIO, повинен працювати з часовими обмеженнями, особливо оскільки все є асинхронним. Він гарантує, що процес тестування не зависне, якщо щось піде не так.

За замовчуванням час очікування становить 10 секунд, що означає, що окремий тест не повинен тривати довше.

Окремий тест у Mocha виглядає так:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

У Cucumber часове обмеження застосовується до окремого визначення кроку. Однак, якщо ви хочете збільшити час очікування, тому що ваш тест займає більше часу, ніж значення за замовчуванням, вам потрібно встановити його в опціях фреймворку.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>