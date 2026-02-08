---
id: mocksandspies
title: Імітації та шпигуни запитів
---

WebdriverIO має вбудовану підтримку для модифікації мережевих відповідей, що дозволяє зосередитися на тестуванні вашого фронтенд-додатку без необхідності налаштовувати бекенд або сервер-імітатор. Ви можете визначати власні відповіді для веб-ресурсів, таких як запити REST API у вашому тесті, та динамічно їх змінювати.

:::info

Зверніть увагу, що використання команди `mock` вимагає підтримки протоколу Chrome DevTools. Ця підтримка надається, якщо ви запускаєте тести локально в браузері на основі Chromium, через Selenium Grid v4 або вище, або через хмарного постачальника з підтримкою протоколу Chrome DevTools (наприклад, SauceLabs, BrowserStack, TestMu AI (Раніше LambdaTest)). Повна кросбраузерна підтримка буде доступна, коли необхідні примітиви будуть реалізовані в [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) та будуть впроваджені у відповідних браузерах.

:::

## Створення імітації

Перш ніж ви зможете модифікувати будь-які відповіді, вам потрібно спочатку визначити імітацію. Ця імітація описується URL-адресою ресурсу і може бути відфільтрована за [методом запиту](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) або [заголовками](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Ресурс підтримує глобальні вирази за допомогою [minimatch](https://www.npmjs.com/package/minimatch):

```js
// імітація всіх ресурсів, що закінчуються на "/users/list"
const userListMock = await browser.mock('**/users/list')

// або ви можете вказати імітацію, фільтруючи ресурси за заголовками або
// кодом статусу, імітувати тільки успішні запити до json ресурсів
const strictMock = await browser.mock('**', {
    // імітувати всі json відповіді
    requestHeaders: { 'Content-Type': 'application/json' },
    // які були успішними
    statusCode: 200
})
```

## Визначення користувацьких відповідей

Після того, як ви визначили імітацію, ви можете визначити для неї користувацькі відповіді. Ці користувацькі відповіді можуть бути об'єктом для відповіді у форматі JSON, локальним файлом для відповіді з користувацьким шаблоном або веб-ресурсом для заміни відповіді ресурсом з інтернету.

### Імітація API запитів

Щоб імітувати API запити, де ви очікуєте відповідь JSON, все, що вам потрібно зробити, це викликати `respond` на об'єкті імітації з довільним об'єктом, який ви хочете повернути, наприклад:

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

Ви також можете модифікувати заголовки відповіді, а також код статусу, передавши деякі параметри імітації відповіді наступним чином:

```js
mock.respond({ ... }, {
    // відповідати з кодом статусу 404
    statusCode: 404,
    // об'єднати заголовки відповіді з наступними заголовками
    headers: { 'x-custom-header': 'foobar' }
})
```

Якщо ви не хочете, щоб імітація взагалі викликала бекенд, ви можете передати `false` для прапора `fetchResponse`.

```js
mock.respond({ ... }, {
    // не викликати справжній бекенд
    fetchResponse: false
})
```

Рекомендується зберігати користувацькі відповіді у файлах шаблонів, щоб ви могли просто підключати їх у ваш тест наступним чином:

```js
// потрібен Node.js v16.14.0 або вище для підтримки JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Імітація текстових ресурсів

Якщо ви хочете модифікувати текстові ресурси, такі як файли JavaScript, CSS або інші текстові ресурси, ви можете просто передати шлях до файлу, і WebdriverIO замінить оригінальний ресурс ним, наприклад:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// або відповісти вашим власним JS
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

Якщо ваша імітаційна відповідь залежить від відповіді оригінального ресурсу, ви також можете динамічно модифікувати ресурс, передавши функцію, яка отримує оригінальну відповідь як параметр і встановлює імітацію на основі повернутого значення, наприклад:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // замінити вміст todo на їх номер у списку
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

## Переривання імітацій

Замість повернення користувацької відповіді ви також можете просто перервати запит з однією з наступних HTTP помилок:

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

Це дуже корисно, якщо ви хочете заблокувати сторонні скрипти з вашої сторінки, які мають негативний вплив на ваш функціональний тест. Ви можете перервати імітацію, просто викликавши `abort` або `abortOnce`, наприклад:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Шпигуни

Кожна імітація автоматично є шпигуном, який підраховує кількість запитів, які браузер зробив до цього ресурсу. Якщо ви не застосовуєте користувацьку відповідь або причину переривання до імітації, вона продовжується з стандартною відповіддю, яку ви зазвичай отримали б. Це дозволяє вам перевірити, скільки разів браузер зробив запит, наприклад, до певної кінцевої точки API.

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

Якщо вам потрібно дочекатися, поки на відповідний запит буде отримано відповідь, використовуйте `mock.waitForResponse(options)`. Дивіться API-довідник: [waitForResponse](/docs/api/mock/waitForResponse).