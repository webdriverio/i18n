---
id: timeouts
title: Таймауты
---

Каждая команда в WebdriverIO - это асинхронная операция. Запрос отправляется на сервер Selenium (или облачный сервис, такой как [Sauce Labs](https://saucelabs.com)), и его ответ содержит результат после завершения или сбоя действия.

Поэтому время является решающим компонентом во всем процессе тестирования. Когда определенное действие зависит от состояния другого действия, вы должны убедиться, что они выполняются в правильном порядке. Таймауты играют важную роль при решении этих проблем.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Таймауты WebDriver

### Таймаут сессионного скрипта

Сессия имеет связанный с ней таймаут сессионного скрипта, который определяет время ожидания выполнения асинхронных скриптов. Если не указано иное, он составляет 30 секунд. Вы можете установить этот таймаут следующим образом:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Таймаут загрузки страницы сессии

Сессия имеет связанный с ней таймаут загрузки страницы, который определяет время ожидания завершения загрузки страницы. Если не указано иное, он составляет 300 000 миллисекунд.

Вы можете установить этот таймаут следующим образом:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> Ключевое слово `pageLoad` является частью официальной [спецификации](https://www.w3.org/TR/webdriver/#set-timeouts) WebDriver, но может не [поддерживаться](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) для вашего браузера (предыдущее название - `page load`).

### Таймаут неявного ожидания сессии

Сессия имеет связанный с ней таймаут неявного ожидания. Он определяет время ожидания для неявной стратегии поиска элементов при поиске элементов с помощью команд [`findElement`](/docs/api/webdriver#findelement) или [`findElements`](/docs/api/webdriver#findelements) (соответственно [`$`](/docs/api/browser/$) или [`$$`](/docs/api/browser/$$) при запуске WebdriverIO с или без тестраннера WDIO). Если не указано иное, он составляет 0 миллисекунд.

Вы можете установить этот таймаут следующим образом:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Таймауты, связанные с WebdriverIO

### Таймаут `WaitFor*`

WebdriverIO предоставляет несколько команд для ожидания достижения элементами определенного состояния (например, активировано, видимо, существует). Эти команды принимают аргумент селектора и число таймаута, которое определяет, как долго экземпляр должен ждать достижения элементом этого состояния. Опция `waitforTimeout` позволяет установить глобальный таймаут для всех команд `waitFor*`, чтобы вам не приходилось устанавливать один и тот же таймаут снова и снова. _(Обратите внимание на строчную букву `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

В ваших тестах теперь можно сделать следующее:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// вы также можете переопределить таймаут по умолчанию при необходимости
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Таймауты, связанные с фреймворком

Тестовый фреймворк, который вы используете с WebdriverIO, должен справляться с таймаутами, особенно учитывая, что всё асинхронно. Он гарантирует, что процесс тестирования не застрянет, если что-то пойдет не так.

По умолчанию таймаут составляет 10 секунд, что означает, что один тест не должен занимать больше времени.

Отдельный тест в Mocha выглядит так:

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

В Cucumber таймаут применяется к одному определению шага. Однако, если вы хотите увеличить таймаут, потому что ваш тест занимает больше времени, чем значение по умолчанию, вам нужно установить его в опциях фреймворка.

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