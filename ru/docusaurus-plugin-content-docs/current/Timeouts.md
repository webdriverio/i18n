---
id: timeouts
title: Таймауты
description: "Настройте таймауты сессии WebDriver, таймауты ожидания waitfor в WebdriverIO и таймауты тестового фреймворка, чтобы ваши тесты оставались надёжными."
---

Каждая команда в WebdriverIO — это асинхронная операция. Запрос отправляется на сервер Selenium (или в облачный сервис, например [Sauce Labs](https://saucelabs.com)), и его ответ содержит результат после того, как действие завершилось успешно или с ошибкой.

Поэтому время является ключевым компонентом всего процесса тестирования. Когда определённое действие зависит от состояния другого действия, необходимо убедиться, что они выполняются в правильном порядке. Таймауты играют важную роль в решении таких задач.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Таймауты WebDriver

### Таймаут выполнения скриптов сессии

С сессией связан таймаут выполнения скриптов, который задаёт время ожидания выполнения асинхронных скриптов. Если не указано иное, он составляет 30 секунд. Установить этот таймаут можно так:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Таймаут загрузки страницы сессии

С сессией связан таймаут загрузки страницы, который задаёт время ожидания завершения загрузки страницы. Если не указано иное, он составляет 300 000 миллисекунд.

Установить этот таймаут можно так:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` — это название [таймаута](https://www.w3.org/TR/webdriver/#set-timeouts) в WebDriver. WebdriverIO v10 принимает только этот ключ.

### Таймаут неявного ожидания сессии

С сессией связан таймаут неявного ожидания. Он задаёт время ожидания для стратегии неявного поиска элементов при использовании команд [`findElement`](/docs/api/webdriver#findelement) или [`findElements`](/docs/api/webdriver#findelements) (соответственно [`$`](/docs/api/browser/$) или [`$$`](/docs/api/browser/$$) при запуске WebdriverIO с тестраннером WDIO или без него). Если не указано иное, он составляет 0 миллисекунд.

Установить этот таймаут можно так:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Таймауты WebdriverIO

### Таймаут `WaitFor*`

WebdriverIO предоставляет несколько команд для ожидания перехода элементов в определённое состояние (например, доступен, видим, существует). Эти команды принимают аргумент-селектор и число таймаута, которое определяет, как долго экземпляр должен ждать, пока элемент достигнет нужного состояния. Опция `waitforTimeout` позволяет задать глобальный таймаут для всех команд `waitFor*`, чтобы не указывать один и тот же таймаут снова и снова. _(Обратите внимание на строчную букву `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

Теперь в своих тестах вы можете сделать так:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Таймауты фреймворка

Тестовый фреймворк, который вы используете с WebdriverIO, должен работать с таймаутами, особенно учитывая, что всё происходит асинхронно. Это гарантирует, что процесс тестирования не зависнет, если что-то пойдёт не так.

По умолчанию таймаут составляет 10 секунд, что означает, что отдельный тест не должен выполняться дольше.

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

В Cucumber таймаут применяется к отдельному определению шага. Однако если вы хотите увеличить таймаут, потому что ваш тест выполняется дольше значения по умолчанию, его нужно задать в опциях фреймворка.

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