---
id: frameworks
title: Фреймворки
---

WebdriverIO Runner має вбудовану підтримку [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) і [Cucumber.js](https://cucumber.io/). Ви також можете інтегрувати його зі сторонніми фреймворками з відкритим кодом, такими як [Serenity/JS](#using-serenityjs).

:::tip Інтеграція WebdriverIO з тестовими фреймворками
Для інтеграції WebdriverIO з тестовим фреймворком вам потрібен пакет адаптера, доступний в NPM.
Зауважте, що пакет адаптера повинен бути встановлений в тому ж місці, де встановлений WebdriverIO.
Тому, якщо ви встановили WebdriverIO глобально, переконайтеся, що пакет адаптера також встановлено глобально.
:::

Інтеграція WebdriverIO з тестовим фреймворком дозволяє вам отримати доступ до екземпляра WebDriver, використовуючи глобальну змінну `browser`
у ваших файлах специфікацій або визначеннях кроків.
Зверніть увагу, що WebdriverIO також потурбується про створення та завершення сеансу Selenium, тому вам не потрібно робити це
самостійно.

## Використання Mocha

Спочатку встановіть пакет адаптера з NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

За замовчуванням WebdriverIO надає [бібліотеку тверджень](assertion), яка вбудована і з якою ви можете почати працювати відразу:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO підтримує `BDD` (за замовчуванням), `TDD` та `QUnit` [інтерфейси](https://mochajs.org/#interfaces) Mocha.

Якщо ви хочете писати свої тести в стилі TDD, встановіть властивість `ui` у вашій конфігурації `mochaOpts` на `tdd`. Тепер ваші тестові файли повинні бути написані так:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Якщо ви хочете визначити інші специфічні для Mocha налаштування, ви можете зробити це за допомогою ключа `mochaOpts` у вашому конфігураційному файлі. Список усіх опцій можна знайти на [веб-сайті проекту Mocha](https://mochajs.org/api/mocha).

__Примітка:__ WebdriverIO не підтримує застаріле використання зворотних викликів `done` в Mocha:

```js
it('should test something', (done) => {
    done() // виникає помилка "done is not a function"
})
```

### Опції Mocha

Наступні опції можна застосувати у вашому `wdio.conf.js` для налаштування вашого середовища Mocha. __Примітка:__ не всі опції підтримуються, наприклад, застосування опції `parallel` призведе до помилки, оскільки WDIO тестовий запускач має власний спосіб запуску тестів паралельно. Ви можете передавати ці опції фреймворку як аргументи, наприклад:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Це передасть наступні опції Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Підтримуються наступні опції Mocha:

#### require
Опція `require` корисна, коли ви хочете додати або розширити деяку базову функціональність (опція фреймворку WebdriverIO).

Тип: `string|string[]`<br />
За замовчуванням: `[]`

#### compilers
Використовуйте дані модулі для компіляції файлів. Компілятори будуть включені перед вимогами (опція фреймворку WebdriverIO).

Тип: `string[]`<br />
За замовчуванням: `[]`

#### allowUncaught
Поширювати неперехоплені помилки.

Тип: `boolean`<br />
За замовчуванням: `false`

#### bail
Припинити виконання після першого невдалого тесту.

Тип: `boolean`<br />
За замовчуванням: `false`

#### checkLeaks
Перевіряти наявність витоків глобальних змінних.

Тип: `boolean`<br />
За замовчуванням: `false`

#### delay
Затримка виконання кореневого набору.

Тип: `boolean`<br />
За замовчуванням: `false`

#### fgrep
Фільтр тестів за заданим рядком.

Тип: `string`<br />
За замовчуванням: `null`

#### forbidOnly
Тести з позначкою `only` призводять до невдачі набору.

Тип: `boolean`<br />
За замовчуванням: `false`

#### forbidPending
Відкладені тести призводять до невдачі набору.

Тип: `boolean`<br />
За замовчуванням: `false`

#### fullTrace
Повний стек викликів при невдачі.

Тип: `boolean`<br />
За замовчуванням: `false`

#### global
Змінні, які очікуються в глобальній області.

Тип: `string[]`<br />
За замовчуванням: `[]`

#### grep
Фільтр тестів за заданим регулярним виразом.

Тип: `RegExp|string`<br />
За замовчуванням: `null`

#### invert
Інвертувати відповідності фільтра тестів.

Тип: `boolean`<br />
За замовчуванням: `false`

#### retries
Кількість спроб повторного запуску невдалих тестів.

Тип: `number`<br />
За замовчуванням: `0`

#### timeout
Значення порогу таймауту (в мс).

Тип: `number`<br />
За замовчуванням: `30000`

## Використання Jasmine

Спочатку встановіть пакет адаптера з NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Потім ви можете налаштувати своє середовище Jasmine, встановивши властивість `jasmineOpts` у вашій конфігурації. Список усіх опцій можна знайти на [веб-сайті проекту Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Опції Jasmine

Наступні опції можна застосувати у вашому `wdio.conf.js` для налаштування вашого середовища Jasmine за допомогою властивості `jasmineOpts`. Для отримання додаткової інформації про ці опції конфігурації, перегляньте [документацію Jasmine](https://jasmine.github.io/api/edge/Configuration). Ви можете передавати ці опції фреймворку як аргументи, наприклад:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Це передасть наступні опції Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Підтримуються наступні опції Jasmine:

#### defaultTimeoutInterval
Інтервал таймауту за замовчуванням для операцій Jasmine.

Тип: `number`<br />
За замовчуванням: `60000`

#### helpers
Масив шляхів до файлів (і шаблонів glob) відносно spec_dir для включення перед специфікаціями Jasmine.

Тип: `string[]`<br />
За замовчуванням: `[]`

#### requires
Опція `requires` корисна, коли ви хочете додати або розширити деяку базову функціональність.

Тип: `string[]`<br />
За замовчуванням: `[]`

#### random
Чи рандомізувати порядок виконання тестів.

Тип: `boolean`<br />
За замовчуванням: `true`

#### seed
Початкове значення для рандомізації. Null призводить до того, що початкове значення визначається випадковим чином на початку виконання.

Тип: `Function`<br />
За замовчуванням: `null`

#### failSpecWithNoExpectations
Чи позначати тест як невдалий, якщо в ньому не було очікувань. За замовчуванням тест, в якому не було очікувань, позначається як успішний. Встановлення цього значення в true призведе до того, що такий тест буде позначено як невдалий.

Тип: `boolean`<br />
За замовчуванням: `false`

#### oneFailurePerSpec
Чи має тест лише одне очікування невдачі.

Тип: `boolean`<br />
За замовчуванням: `false`

#### specFilter
Функція для фільтрації тестів.

Тип: `Function`<br />
За замовчуванням: `(spec) => true`

#### grep
Запускати лише тести, що відповідають цьому рядку або регулярному виразу. (Застосовується лише якщо не встановлена користувацька функція `specFilter`)

Тип: `string|Regexp`<br />
За замовчуванням: `null`

#### invertGrep
Якщо true, інвертує відповідність тестів і запускає лише тести, які не відповідають виразу в `grep`. (Застосовується лише якщо не встановлена користувацька функція `specFilter`)

Тип: `boolean`<br />
За замовчуванням: `false`

## Використання Cucumber

Спочатку встановіть пакет адаптера з NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Якщо ви хочете використовувати Cucumber, встановіть властивість `framework` на `cucumber`, додавши `framework: 'cucumber'` до [конфігураційного файлу](configurationfile).

Опції для Cucumber можна вказати в конфігураційному файлі за допомогою `cucumberOpts`. Ознайомтеся з повним списком опцій [тут](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Щоб швидко почати роботу з Cucumber, подивіться наш проект [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate), який містить усі визначення кроків, необхідні для початку, і ви зможете відразу писати файли features.

### Опції Cucumber

Наступні опції можна застосувати у вашому `wdio.conf.js` для налаштування вашого середовища Cucumber за допомогою властивості `cucumberOpts`:

:::tip Налаштування опцій через командний рядок
Опції `cucumberOpts`, такі як користувацькі `tags` для фільтрації тестів, можна вказати через командний рядок. Це здійснюється за допомогою формату `cucumberOpts.{optionName}="value"`.

Наприклад, якщо ви хочете запустити лише тести, позначені тегом `@smoke`, ви можете використати наступну команду:

```sh
# Якщо ви хочете запустити лише тести з тегом "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Ця команда встановлює опцію `tags` в `cucumberOpts` на `@smoke`, забезпечуючи виконання лише тестів з цим тегом.

:::

#### backtrace
Показати повний трасування для помилок.

Тип: `Boolean`<br />
За замовчуванням: `true`

#### requireModule
Вимагати модулі перед завантаженням будь-яких файлів підтримки.

Тип: `string[]`<br />
За замовчуванням: `[]`<br />
Приклад:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // або
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast
Перервати виконання при першій невдачі.

Тип: `boolean`<br />
За замовчуванням: `false`

#### name
Виконувати лише сценарії з іменами, що відповідають виразу (повторюване).

Тип: `RegExp[]`<br />
За замовчуванням: `[]`

#### require
Вимагати файли, що містять ваші визначення кроків, перед виконанням функцій. Ви також можете вказати шаблон glob для ваших визначень кроків.

Тип: `string[]`<br />
За замовчуванням: `[]`
Приклад:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Шляхи до вашого коду підтримки, для ESM.

Тип: `String[]`<br />
За замовчуванням: `[]`
Приклад:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Невдача, якщо є невизначені або відкладені кроки.

Тип: `boolean`<br />
За замовчуванням: `false`

#### tags
Виконувати лише функції або сценарії з тегами, що відповідають виразу.
Будь ласка, дивіться [документацію Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) для більш детальної інформації.

Тип: `String`<br />
За замовчуванням: ``

#### timeout
Таймаут у мілісекундах для визначень кроків.

Тип: `Number`<br />
За замовчуванням: `30000`

#### retry
Вказати кількість спроб повторення невдалих тестових випадків.

Тип: `Number`<br />
За замовчуванням: `0`

#### retryTagFilter
Повторювати лише функції або сценарії з тегами, що відповідають виразу (повторюване). Ця опція вимагає вказати '--retry'.

Тип: `RegExp`

#### language
Мова за замовчуванням для ваших файлів функцій

Тип: `String`<br />
За замовчуванням: `en`

#### order
Запускати тести у визначеному / випадковому порядку

Тип: `String`<br />
За замовчуванням: `defined`

#### format
Ім'я та шлях виходу форматувача для використання.
WebdriverIO в основному підтримує лише [Форматувачі](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md), які записують вихід у файл.

Тип: `string[]`<br />

#### formatOptions
Опції, які надаються форматувачам

Тип: `object`<br />

#### tagsInTitle
Додавати теги cucumber до назви функції або сценарію

Тип: `Boolean`<br />
За замовчуванням: `false`

***Зверніть увагу, що це специфічна опція @wdio/cucumber-framework і не розпізнається самим cucumber-js***<br/>

#### ignoreUndefinedDefinitions
Розглядати невизначені визначення як попередження.

Тип: `Boolean`<br />
За замовчуванням: `false`

***Зверніть увагу, що це специфічна опція @wdio/cucumber-framework і не розпізнається самим cucumber-js***<br/>

#### failAmbiguousDefinitions
Розглядати неоднозначні визначення як помилки.

Тип: `Boolean`<br />
За замовчуванням: `false`

***Зверніть увагу, що це специфічна опція @wdio/cucumber-framework і не розпізнається самим cucumber-js***<br/>

#### tagExpression
Виконувати лише функції або сценарії з тегами, що відповідають виразу.
Будь ласка, дивіться [документацію Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) для більш детальної інформації.

Тип: `String`<br />
За замовчуванням: ``

***Зверніть увагу, що ця опція буде застаріла в майбутньому. Замість цього використовуйте властивість конфігурації [`tags`](#tags)***

#### profile
Вказати профіль для використання.

Тип: `string[]`<br />
За замовчуванням: `[]`

***Будь ласка, зверніть увагу, що в профілях підтримуються лише певні значення (worldParameters, name, retryTagFilter), оскільки `cucumberOpts` має пріоритет. Крім того, при використанні профілю переконайтеся, що згадані значення не оголошені в `cucumberOpts`.***

### Пропуск тестів в cucumber

Зверніть увагу, що якщо ви хочете пропустити тест, використовуючи звичайні можливості фільтрації тестів cucumber, доступні в `cucumberOpts`, ви зробите це для всіх браузерів і пристроїв, налаштованих в можливостях. Щоб мати можливість пропускати сценарії лише для певних комбінацій можливостей без необхідності запуску сесії, якщо це не потрібно, webdriverio надає наступний спеціальний синтаксис тегів для cucumber:

`@skip([condition])`

де condition - це необов'язкова комбінація властивостей можливостей з їх значеннями, які, коли **всі** вони збігаються, призведуть до пропуску позначеного сценарію або функції. Звичайно, ви можете додати кілька тегів до сценаріїв і функцій, щоб пропускати тести за різних умов.

Ви також можете використовувати анотацію '@skip' для пропуску тестів без зміни `tagExpression'. У цьому випадку пропущені тести будуть відображені в тестовому звіті.

Ось кілька прикладів цього синтаксису:
- `@skip` або `@skip()`: завжди пропускати позначений елемент
- `@skip(browserName="chrome")`: тест не буде виконуватися в браузерах chrome.
- `@skip(browserName="firefox";platformName="linux")`: пропустити тест при виконанні в firefox на linux.
- `@skip(browserName=["chrome","firefox"])`: позначені елементи будуть пропущені для браузерів chrome і firefox.
- `@skip(browserName=/i.*explorer/)`: можливості з браузерами, що відповідають регулярному виразу, будуть пропущені (як-от `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Імпорт хелпера визначення кроків

Щоб використовувати хелпер визначення кроків, такі як `Given`, `When` або `Then` або хуки, вам потрібно імпортувати їх з `@cucumber/cucumber`, наприклад, так:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Тепер, якщо ви вже використовуєте Cucumber для інших типів тестів, не пов'язаних з WebdriverIO, для яких ви використовуєте певну версію, вам потрібно імпортувати ці хелпери у ваших e2e тестах з пакету WebdriverIO Cucumber, наприклад:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Це забезпечує використання правильних хелперів у фреймворку WebdriverIO і дозволяє використовувати незалежну версію Cucumber для інших типів тестування.

### Публікація звіту

Cucumber надає функцію для публікації звітів про виконання тестів на `https://reports.cucumber.io/`, якою можна керувати, встановивши прапорець `publish` в `cucumberOpts` або налаштувавши змінну середовища `CUCUMBER_PUBLISH_TOKEN`. Однак, коли ви використовуєте `WebdriverIO` для виконання тестів, існує обмеження з цим підходом. Він оновлює звіти окремо для кожного файлу функцій, ускладнюючи перегляд консолідованого звіту.

Щоб подолати це обмеження, ми представили метод на основі промісів під назвою `publishCucumberReport` в `@wdio/cucumber-framework`. Цей метод слід викликати в хуку `onComplete`, який є оптимальним місцем для його виклику. `publishCucumberReport` вимагає вхідних даних про каталог звітів, де зберігаються повідомлення cucumber.

Ви можете генерувати звіти `cucumber message`, налаштувавши опцію `format` у ваших `cucumberOpts`. Настійно рекомендується надавати динамічне ім'я файлу в опції формату `cucumber message`, щоб запобігти перезапису звітів і забезпечити точне запис кожного тестового запуску.

Перед використанням цієї функції переконайтеся, що встановлено наступні змінні середовища:
- CUCUMBER_PUBLISH_REPORT_URL: URL, куди ви хочете опублікувати звіт Cucumber. Якщо він не вказаний, буде використовуватися URL за замовчуванням 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Токен авторизації, необхідний для публікації звіту. Якщо цей токен не встановлено, функція вийде без публікації звіту.

Ось приклад необхідних конфігурацій та зразків коду для реалізації:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Інші опції конфігурації
    cucumberOpts: {
        // ... Конфігурація опцій Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Зверніть увагу, що `./reports/` - це каталог, де будуть зберігатися звіти `cucumber message`.

## Використання Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) - це фреймворк з відкритим кодом, розроблений для того, щоб зробити приймальне та регресійне тестування складних програмних систем швидшим, більш спільним та простішим для масштабування.

Для тестових наборів WebdriverIO, Serenity/JS пропонує:
- [Розширена звітність](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Ви можете використовувати Serenity/JS
  як заміну будь-якого вбудованого фреймворку WebdriverIO для створення глибоких звітів про виконання тестів та живої документації вашого проекту.
- [API шаблону Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Щоб зробити ваш тестовий код портативним та повторно використовуваним у проектах та командах,
  Serenity/JS надає вам опціональний [абстрактний шар](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) на основі нативних API WebdriverIO.
- [Інтеграційні бібліотеки](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Для тестових наборів, що використовують шаблон Screenplay,
  Serenity/JS також надає опціональні інтеграційні бібліотеки, щоб допомогти вам писати [API-тести](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [керувати локальними серверами](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [виконувати твердження](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) та багато іншого!

![Приклад звіту Serenity BDD](/img/serenity-bdd-reporter.png)

### Встановлення Serenity/JS

Щоб додати Serenity/JS до [існуючого проекту WebdriverIO](https://webdriver.io/docs/gettingstarted), встановіть наступні модулі Serenity/JS з NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Дізнайтеся більше про модулі Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Налаштування Serenity/JS

Щоб увімкнути інтеграцію з Serenity/JS, налаштуйте WebdriverIO наступним чином:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Вказати WebdriverIO використовувати фреймворк Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Налаштування Serenity/JS
    serenity: {
        // Налаштувати Serenity/JS для використання відповідного адаптера для вашого тестового запускача
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Зареєструвати сервіси звітності Serenity/JS, так звану "stage crew"
        crew: [
            // Опціонально, виводити результати виконання тестів у стандартний вивід
            '@serenity-js/console-reporter',

            // Опціонально, створювати звіти Serenity BDD та живу документацію (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Опціонально, автоматично робити знімки екрану при невдачі взаємодії
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Налаштувати ваш запускач Cucumber
    cucumberOpts: {
        // див. опції налаштування Cucumber нижче
    },


    // ... або запускач Jasmine
    jasmineOpts: {
        // див. опції налаштування Jasmine нижче
    },

    // ... або запускач Mocha
    mochaOpts: {
        // див. опції налаштування Mocha нижче
    },

    runner: 'local',

    // Будь-які інші налаштування WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Вказати WebdriverIO використовувати фреймворк Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Налаштування Serenity/JS
    serenity: {
        // Налаштувати Serenity/JS для використання відповідного адаптера для вашого тестового запускача
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Зареєструвати сервіси звітності Serenity/JS, так звану "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Налаштувати ваш запускач Cucumber
    cucumberOpts: {
        // див. опції налаштування Cucumber нижче
    },


    // ... або запускач Jasmine
    jasmineOpts: {
        // див. опції налаштування Jasmine нижче
    },

    // ... або запускач Mocha
    mochaOpts: {
        // див. опції налаштування Mocha нижче
    },

    runner: 'local',

    // Будь-які інші налаштування WebdriverIO
};
```

</TabItem>
</Tabs>

Дізнайтеся більше про:
- [Опції налаштування Cucumber для Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Опції налаштування Jasmine для Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Опції налаштування Mocha для Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Конфігураційний файл WebdriverIO](configurationfile)

### Створення звітів Serenity BDD та живої документації

[Звіти Serenity BDD та жива документація](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) генеруються за допомогою [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
Java-програми, яка завантажується та керується модулем [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Щоб створити звіти Serenity BDD, ваш тестовий набір повинен:
- завантажити Serenity BDD CLI, викликавши `serenity-bdd update`, що кешує CLI `jar` локально
- створити проміжні звіти Serenity BDD `.json`, зареєструвавши [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) відповідно до [інструкцій з налаштування](#configuring-serenityjs)
- викликати Serenity BDD CLI, коли ви хочете створити звіт, викликавши `serenity-bdd run`

Шаблон, який використовується всіма [шаблонами проектів Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio), базується на використанні:
- скрипту NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) для завантаження Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) для запуску процесу звітування, навіть якщо сам тестовий набір завершився невдачею (саме тоді, коли вам найбільше потрібні тестові звіти...)
- [`rimraf`](https://www.npmjs.com/package/rimraf) як зручний метод для видалення будь-яких тестових звітів, що залишилися від попереднього запуску

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Щоб дізнатися більше про `SerenityBDDReporter`, будь ласка, зверніться до:
- інструкцій з встановлення у [документації `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- прикладів налаштування у [документації API `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- [прикладів Serenity/JS на GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Використання API шаблону Screenplay у Serenity/JS

[Шаблон Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - це інноваційний, орієнтований на користувача підхід до написання високоякісних автоматизованих приймальних тестів. Він спрямовує вас на ефективне використання шарів абстракції, допомагає вашим тестовим сценаріям відображати бізнес-словник вашого домену та заохочує хороші практики тестування та розробки програмного забезпечення у вашій команді.

За замовчуванням, коли ви реєструєте `@serenity-js/webdriverio` як ваш `framework` у WebdriverIO,
Serenity/JS налаштовує акторський [каст](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) за замовчуванням [акторів](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
де кожен актор може:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Цього має бути достатньо, щоб допомогти вам почати вводити тестові сценарії, які відповідають шаблону Screenplay, навіть у наявний тестовий набір, наприклад:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Щоб дізнатися більше про шаблон Screenplay, перегляньте:
- [Шаблон Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Веб-тестування з Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)