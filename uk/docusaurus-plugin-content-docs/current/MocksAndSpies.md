---
id: mocksandspies
title: Моки та шпигуни запитів
---

WebdriverIO має вбудовану підтримку для модифікації мережевих відповідей, що дозволяє зосередитися на тестуванні вашого frontend-додатку без необхідності налаштовувати бекенд або мок-сервер. Ви можете визначати власні відповіді для веб-ресурсів, таких як запити REST API у вашому тесті та динамічно змінювати їх.

:::info

Зауважте, що використання команди `mock` потребує підтримки протоколу Chrome DevTools. Ця підтримка надається, якщо ви запускаєте тести локально в браузері на основі Chromium, через Selenium Grid v4 або вище, або через хмарного постачальника з підтримкою протоколу Chrome DevTools (наприклад, SauceLabs, BrowserStack, LambdaTest). Повна кросбраузерна підтримка буде доступна, коли необхідні примітиви з'являться у [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) і будуть впроваджені у відповідних браузерах.

:::

## Створення моку

Перш ніж ви зможете модифікувати будь-які відповіді, ви повинні спочатку визначити мок. Цей мок описується URL-адресою ресурсу та може фільтруватися за [методом запиту](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) або [заголовками](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Ресурс підтримує глобальні вирази за допомогою [minimatch](https://www.npmjs.com/package/minimatch):

```js
// мокувати всі ресурси, що закінчуються на "/users/list"
const userListMock = await browser.mock('**/users/list')

// або ви можете вказати мок, фільтруючи ресурси за заголовками або
// кодом статусу, мокувати тільки успішні запити до json ресурсів
const strictMock = await browser.mock('**', {
    // мокувати всі відповіді json
    requestHeaders: { 'Content-Type': 'application/json' },
    // які були успішними
    statusCode: 200
})
```

## Визначення власних відповідей

Після того, як ви визначили мок, ви можете визначити для нього власні відповіді. Ці власні відповіді можуть бути об'єктом для відповіді JSON, локальним файлом для відповіді з власним фікстурами або веб-ресурсом для заміни відповіді ресурсом з інтернету.

### Мокування API запитів

Щоб мокувати API запити, де ви очікуєте відповідь JSON, вам потрібно лише викликати `respond` на об'єкті моку з довільним об'єктом, який ви хочете повернути, наприклад:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// виводить: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Ви також можете змінювати заголовки відповіді, а також код статусу, передаючи деякі параметри мок-відповіді наступним чином:

```js
mock.respond({ ... }, {
    // відповідати з кодом статусу 404
    statusCode: 404,
    // об'єднати заголовки відповіді з наступними заголовками
    headers: { 'x-custom-header': 'foobar' }
})
```

Якщо ви хочете, щоб мок взагалі не викликав бекенд, ви можете передати `false` для прапорця `fetchResponse`.

```js
mock.respond({ ... }, {
    // не викликати справжній бекенд
    fetchResponse: false
})
```

Рекомендується зберігати власні відповіді у фікстурах, щоб ви могли просто імпортувати їх у вашому тесті наступним чином:

```js
// потребує Node.js v16.14.0 або вище для підтримки імпорту JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Мокування текстових ресурсів

Якщо ви хочете модифікувати текстові ресурси, такі як JavaScript, CSS файли або інші текстові ресурси, ви можете просто передати шлях до файлу, і WebdriverIO замінить оригінальний ресурс ним, наприклад:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// або відповісти власним JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Перенаправлення веб-ресурсів

Ви також можете просто замінити веб-ресурс іншим веб-ресурсом, якщо ваша бажана відповідь вже розміщена в інтернеті. Це працює як з окремими ресурсами сторінки, так і з самою веб-сторінкою, наприклад:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // повертає "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Динамічні відповіді

Якщо ваша мок-відповідь залежить від відповіді оригінального ресурсу, ви також можете динамічно модифікувати ресурс, передаючи функцію, яка отримує оригінальну відповідь як параметр і встановлює мок на основі повернутого значення, наприклад:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // замінити вміст todo їх номером у списку
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// повертає
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Скасування моків

Замість повернення власної відповіді ви також можете просто перервати запит з однією з наступних HTTP помилок:

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

Це дуже корисно, якщо ви хочете заблокувати сторонні скрипти зі своєї сторінки, які негативно впливають на ваш функціональний тест. Ви можете перервати мок, просто викликавши `abort` або `abortOnce`, наприклад:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Шпигуни

Кожен мок автоматично є шпигуном, який підраховує кількість запитів, які браузер зробив до цього ресурсу. Якщо ви не застосовуєте власну відповідь або причину скасування до моку, він продовжує працювати з відповіддю за замовчуванням, яку ви отримали б зазвичай. Це дозволяє перевірити, скільки разів браузер зробив запит, наприклад, до певної кінцевої точки API.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // повертає 0

// зареєструвати користувача
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// перевірити, чи був зроблений API запит
expect(mock.calls.length).toBe(1)

// перевірити відповідь
expect(mock.calls[0].body).toEqual({ success: true })
```