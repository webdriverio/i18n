---
id: retry
title: Повторне запускання нестабільних тестів
---

Ви можете повторно запускати певні тести з WebdriverIO testrunner, які виявляються нестабільними через такі фактори як нестабільна мережа або умови гонки (race conditions). (Однак, не рекомендується просто збільшувати кількість повторних запусків, якщо тести стають нестабільними!)

## Повторний запуск сюїтів у Mocha

Починаючи з версії 3 Mocha, ви можете повторно запускати цілі тестові сюїти (все в межах блоку `describe`). Якщо ви використовуєте Mocha, вам слід віддати перевагу цьому механізму повторних запусків, а не реалізації WebdriverIO, яка дозволяє повторно запускати лише певні тестові блоки (все в межах блоку `it`). Щоб використовувати метод `this.retries()`, блок сюїту `describe` має використовувати незв'язану функцію `function(){}` замість стрілкової функції `() => {}`, як описано в [документації Mocha](https://mochajs.org/#arrow-functions). Використовуючи Mocha, ви також можете встановити кількість повторних запусків для всіх специфікацій за допомогою `mochaOpts.retries` у вашому `wdio.conf.js`.

Ось приклад:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Повторний запуск окремих тестів у Jasmine або Mocha

Щоб повторно запустити певний тестовий блок, ви можете просто вказати кількість повторних запусків як останній параметр після функції тестового блоку:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

Те саме працює і для хуків:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Те саме працює і для хуків:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Якщо ви використовуєте Jasmine, другий параметр зарезервований для таймауту. Щоб застосувати параметр повторного запуску, потрібно встановити таймаут на його типове значення `jasmine.DEFAULT_TIMEOUT_INTERVAL`, а потім вказати кількість повторних запусків.

</TabItem>
</Tabs>

Цей механізм повторних запусків дозволяє повторно запускати лише окремі хуки або тестові блоки. Якщо ваш тест супроводжується хуком для налаштування вашого додатка, цей хук не запускається повторно. [Mocha пропонує](https://mochajs.org/#retry-tests) нативні повторні запуски тестів, які забезпечують таку поведінку, тоді як Jasmine — ні. Ви можете отримати доступ до кількості виконаних повторних запусків у хуку `afterTest`.

## Повторні запуски у Cucumber

### Повторний запуск повних сюїтів у Cucumber

Для cucumber >=6 ви можете надати параметр конфігурації [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) разом з опціональним параметром `retryTagFilter`, щоб усі або деякі ваші сценарії, що зазнали невдачі, отримали додаткові спроби до успіху. Для роботи цієї функції вам потрібно встановити `scenarioLevelReporter` на `true`.

### Повторний запуск Step Definitions у Cucumber

Щоб визначити рівень повторного запуску для певних визначень кроків, просто застосуйте до них опцію retry, наприклад:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Повторні запуски можна визначити лише у файлі визначень кроків, але ніколи у файлі з функціями.

## Додавання повторних запусків для окремих файлів специфікацій

Раніше були доступні лише повторні запуски на рівні тестів і сюїтів, що в більшості випадків є достатнім.

Але в будь-яких тестах, які включають стан (наприклад, на сервері або в базі даних), стан може залишитися недійсним після першого невдалого тесту. Будь-які подальші спроби можуть не мати шансів на успіх через недійсний стан, з якого вони почнуться.

Новий екземпляр `browser` створюється для кожного файлу специфікацій, що робить це ідеальним місцем для підключення та налаштування будь-яких інших станів (сервер, бази даних). Повторні запуски на цьому рівні означають, що весь процес налаштування буде просто повторено, так само, як і для нового файлу специфікацій.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## Запуск конкретного тесту кілька разів

Це допомагає запобігти появі нестабільних тестів у кодовій базі. Додавши параметр командного рядка `--repeat`, ви запустите вказані специфікації або сюїти N разів. При використанні цього прапорця також необхідно вказати прапорець `--spec` або `--suite`.

При додаванні нових тестів до кодової бази, особливо через процес CI/CD, тести можуть пройти і бути об'єднаними, але пізніше стати нестабільними. Ця нестабільність може бути спричинена багатьма факторами, такими як проблеми з мережею, навантаження на сервер, розмір бази даних тощо. Використання прапорця `--repeat` у вашому процесі CD/CD може допомогти виявити ці нестабільні тести до того, як вони потраплять до основної кодової бази.

Одна зі стратегій — виконувати тести як зазвичай у вашому процесі CI/CD, але якщо ви впроваджуєте новий тест, ви можете запустити ще один набір тестів з новою специфікацією, вказаною в `--spec`, разом з `--repeat`, щоб він запустив новий тест x кількість разів. Якщо тест не проходить будь-яку з цих спроб, тест не буде об'єднано, і потрібно буде розібратися, чому він не працює.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```