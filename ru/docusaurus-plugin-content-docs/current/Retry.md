---
id: retry
title: Повторный запуск нестабильных тестов
---

С помощью тестового раннера WebdriverIO вы можете повторно запускать определенные тесты, которые оказываются нестабильными из-за таких факторов, как ненадежная сеть или состояние гонки. (Однако не рекомендуется просто увеличивать частоту повторных запусков, если тесты становятся нестабильными!)

## Повторные запуски тестовых наборов в Mocha

Начиная с версии 3 Mocha, вы можете повторно запускать целые тестовые наборы (всё внутри блока `describe`). Если вы используете Mocha, вам следует использовать этот механизм повторного запуска вместо реализации WebdriverIO, которая позволяет повторно запускать только определенные тестовые блоки (всё внутри блока `it`). Чтобы использовать метод `this.retries()`, блок набора `describe` должен использовать несвязанную функцию `function(){}` вместо стрелочной функции `() => {}`, как описано в [документации Mocha](https://mochajs.org/#arrow-functions). Используя Mocha, вы также можете установить количество повторных попыток для всех спецификаций с помощью `mochaOpts.retries` в вашем `wdio.conf.js`.

Вот пример:

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

## Повторный запуск отдельных тестов в Jasmine или Mocha

Для повторного запуска определенного тестового блока можно просто указать количество повторных запусков в качестве последнего параметра после функции тестового блока:

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

То же самое работает и для хуков:

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

То же самое работает и для хуков:

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

Если вы используете Jasmine, второй параметр зарезервирован для тайм-аута. Чтобы применить параметр повторного запуска, вам нужно установить тайм-аут на его значение по умолчанию `jasmine.DEFAULT_TIMEOUT_INTERVAL`, а затем применить количество повторных запусков.

</TabItem>
</Tabs>

Этот механизм повторного запуска позволяет повторять только отдельные хуки или тестовые блоки. Если ваш тест сопровождается хуком для настройки приложения, этот хук не запускается повторно. [Mocha предлагает](https://mochajs.org/#retry-tests) встроенный механизм повторного запуска тестов, который предоставляет такое поведение, в то время как Jasmine этого не делает. Вы можете получить доступ к количеству выполненных повторных попыток в хуке `afterTest`.

## Повторные запуски в Cucumber

### Повторный запуск полных наборов в Cucumber

Для cucumber >=6 вы можете предоставить параметр конфигурации [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) вместе с опциональным параметром `retryTagFilter`, чтобы все или некоторые из ваших неудачных сценариев получали дополнительные попытки до успешного завершения. Для работы этой функции необходимо установить `scenarioLevelReporter` в значение `true`.

### Повторный запуск определений шагов в Cucumber

Чтобы определить частоту повторного запуска для определенных определений шагов, просто примените опцию retry к ним:

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

Повторные запуски можно определить только в файле определений шагов, но никогда в файле функций.

## Добавление повторных запусков на основе спецфайла

Ранее были доступны только повторные запуски на уровне теста и набора, что в большинстве случаев достаточно.

Но в любых тестах, включающих состояние (например, на сервере или в базе данных), состояние может остаться недействительным после первой неудачи теста. Любые последующие повторные попытки могут не иметь шансов на успех из-за недействительного состояния, с которого они начнутся.

Для каждого спецфайла создается новый экземпляр `browser`, что делает это идеальным местом для подключения и настройки любых других состояний (сервер, базы данных). Повторные запуски на этом уровне означают, что весь процесс настройки будет просто повторен, как если бы это было для нового спецфайла.

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

## Запуск определенного теста несколько раз

Это помогает предотвратить появление нестабильных тестов в кодовой базе. Добавляя опцию CLI `--repeat`, вы будете запускать указанные спеки или наборы N раз. При использовании этого флага CLI также должен быть указан флаг `--spec` или `--suite`.

При добавлении новых тестов в кодовую базу, особенно через процесс CI/CD, тесты могут пройти и быть объединены, но позже стать нестабильными. Эта нестабильность может возникать из-за различных факторов, таких как проблемы с сетью, нагрузка на сервер, размер базы данных и т. д. Использование флага `--repeat` в вашем процессе CD/CD может помочь обнаружить эти нестабильные тесты до того, как они будут объединены с основной кодовой базой.

Одна из стратегий использования — запускать тесты как обычно в вашем процессе CI/CD, но если вы добавляете новый тест, вы можете затем запустить еще один набор тестов с новым спеком, указанным в `--spec`, вместе с `--repeat`, чтобы он запускал новый тест x количество раз. Если тест не пройдет хотя бы один из этих запусков, он не будет объединен, и нужно будет разобраться, почему он не прошел.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```