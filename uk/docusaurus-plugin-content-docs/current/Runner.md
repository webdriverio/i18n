---
id: runner
title: Раннер
---

import CodeBlock from '@theme/CodeBlock';

Раннер у WebdriverIO оркеструє як і де запускаються тести при використанні тестраннера. WebdriverIO наразі підтримує два різні типи раннерів: локальний та браузерний.

## Local Runner

[Local Runner](https://www.npmjs.com/package/@wdio/local-runner) ініціює ваш фреймворк (наприклад, Mocha, Jasmine або Cucumber) у процесі-воркері та запускає всі ваші тестові файли у вашому середовищі Node.js. Кожен тестовий файл запускається в окремому процесі-воркері для кожної можливості, що дозволяє максимальну паралельність. Кожен процес-воркер використовує один екземпляр браузера і тому запускає власну сесію браузера, що забезпечує максимальну ізоляцію.

Оскільки кожен тест запускається у своєму ізольованому процесі, неможливо обмінюватися даними між тестовими файлами. Є два способи обійти це:

- використовувати [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) для обміну даними між усіма воркерами
- групувати файли специфікацій (детальніше в [Організація тестового набору](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Якщо ніщо інше не визначено в `wdio.conf.js`, Local Runner є раннером за замовчуванням у WebdriverIO.

### Встановлення

Щоб використовувати Local Runner, ви можете встановити його через:

```sh
npm install --save-dev @wdio/local-runner
```

### Налаштування

Local Runner є раннером за замовчуванням у WebdriverIO, тому немає потреби визначати його у вашому `wdio.conf.js`. Якщо ви хочете явно його встановити, ви можете визначити його наступним чином:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

На відміну від [Local Runner](https://www.npmjs.com/package/@wdio/local-runner), [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) ініціює та виконує фреймворк всередині браузера. Це дозволяє вам запускати модульні тести чи компонентні тести в реальному браузері, а не в JSDOM, як у багатьох інших тестових фреймворках.

Хоча [JSDOM](https://www.npmjs.com/package/jsdom) широко використовується для тестування, він у підсумку не є справжнім браузером, і ви не можете емулювати мобільні середовища з його допомогою. З цим раннером WebdriverIO дозволяє легко запускати ваші тести в браузері та використовувати команди WebDriver для взаємодії з елементами, відтвореними на сторінці.

Ось огляд запуску тестів у JSDOM у порівнянні з Browser Runner від WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Запускає ваші тести в Node.js, використовуючи реалізацію веб-стандартів, зокрема стандартів WHATWG DOM та HTML | Виконує ваш тест у реальному браузері та запускає код у середовищі, яке використовують ваші користувачі |
|2.| Взаємодії з компонентами можуть бути імітовані лише через JavaScript | Ви можете використовувати [WebdriverIO API](api) для взаємодії з елементами через протокол WebDriver |
|3.| Підтримка Canvas вимагає [додаткових залежностей](https://www.npmjs.com/package/canvas) і [має обмеження](https://github.com/Automattic/node-canvas/issues) | У вас є доступ до справжнього [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM має деякі [застереження](https://github.com/jsdom/jsdom#caveats) та непідтримувані Web API | Усі Web API підтримуються, оскільки тест запускається в реальному браузері |
|5.| Неможливо виявити помилки крос-браузерно | Підтримка всіх браузерів, включаючи мобільні браузери |
|6.| __Не може__ тестувати елементи в псевдо-станах | Підтримка псевдо-станів, таких як `:hover` або `:active` |

Цей раннер використовує [Vite](https://vitejs.dev/) для компіляції вашого тестового коду та завантаження його в браузер. Він поставляється з пресетами для наступних компонентних фреймворків:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Кожен тестовий файл/група тестових файлів запускається в межах однієї сторінки, що означає, що між кожним тестом сторінка перезавантажується для гарантування ізоляції між тестами.

### Встановлення

Щоб використовувати Browser Runner, ви можете встановити його через:

```sh
npm install --save-dev @wdio/browser-runner
```

### Налаштування

Щоб використовувати Browser Runner, ви повинні визначити властивість `runner` у вашому файлі `wdio.conf.js`, наприклад:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Опції раннера

Browser Runner дозволяє наступні конфігурації:

#### `preset`

Якщо ви тестуєте компоненти, використовуючи один із згаданих вище фреймворків, ви можете визначити пресет, який забезпечує готову конфігурацію з коробки. Цю опцію не можна використовувати разом з `viteConfig`.

__Тип:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Приклад:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Визначте власну [конфігурацію Vite](https://vitejs.dev/config/). Ви можете або передати власний об'єкт, або імпортувати існуючий файл `vite.conf.ts`, якщо ви використовуєте Vite.js для розробки. Зауважте, що WebdriverIO зберігає власні конфігурації Vite для налаштування тестового середовища.

__Тип:__ `string` або [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) або `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Приклад:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // або просто:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // або використовуйте функцію, якщо ваша конфігурація vite містить багато плагінів,
    // які ви хочете розв'язати тільки при читанні значення
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Якщо встановлено `true`, раннер оновить можливості для запуску тестів у режимі без графічного інтерфейсу. За замовчуванням це включено в середовищах CI, де змінна середовища `CI` встановлена на `'1'` або `'true'`.

__Тип:__ `boolean`<br />
__За замовчуванням:__ `false`, встановлено `true`, якщо змінна середовища `CI` встановлена

#### `rootDir`

Кореневий каталог проекту.

__Тип:__ `string`<br />
__За замовчуванням:__ `process.cwd()`

#### `coverage`

WebdriverIO підтримує звітування про покриття тестами через [`istanbul`](https://istanbul.js.org/). Дивіться [Опції покриття](#coverage-options) для отримання більш детальної інформації.

__Тип:__ `object`<br />
__За замовчуванням:__ `undefined`

### Опції покриття

Наступні опції дозволяють налаштувати звітування про покриття.

#### `enabled`

Включає збір даних про покриття.

__Тип:__ `boolean`<br />
__За замовчуванням:__ `false`

#### `include`

Список файлів, включених у покриття, як шаблони glob.

__Тип:__ `string[]`<br />
__За замовчуванням:__ `[**]`

#### `exclude`

Список файлів, виключених з покриття, як шаблони glob.

__Тип:__ `string[]`<br />
__За замовчуванням:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Список розширень файлів, які повинен включати звіт.

__Тип:__ `string | string[]`<br />
__За замовчуванням:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Каталог для запису звіту про покриття.

__Тип:__ `string`<br />
__За замовчуванням:__ `./coverage`

#### `reporter`

Репортери покриття для використання. Дивіться [документацію istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) для детального списку всіх репортерів.

__Тип:__ `string[]`<br />
__За замовчуванням:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Перевіряє пороги для кожного файлу. Дивіться `lines`, `functions`, `branches` та `statements` для фактичних порогів.

__Тип:__ `boolean`<br />
__За замовчуванням:__ `false`

#### `clean`

Очищає результати покриття перед запуском тестів.

__Тип:__ `boolean`<br />
__За замовчуванням:__ `true`

#### `lines`

Поріг для рядків.

__Тип:__ `number`<br />
__За замовчуванням:__ `undefined`

#### `functions`

Поріг для функцій.

__Тип:__ `number`<br />
__За замовчуванням:__ `undefined`

#### `branches`

Поріг для гілок.

__Тип:__ `number`<br />
__За замовчуванням:__ `undefined`

#### `statements`

Поріг для операторів.

__Тип:__ `number`<br />
__За замовчуванням:__ `undefined`

### Обмеження

При використанні браузерного раннера WebdriverIO важливо зауважити, що діалоги, які блокують потік, такі як `alert` або `confirm`, не можуть бути використані нативно. Це тому, що вони блокують веб-сторінку, що означає, що WebdriverIO не може продовжувати комунікацію зі сторінкою, що призводить до зависання виконання.

В таких ситуаціях WebdriverIO надає мокі за замовчуванням з стандартними поверненими значеннями для цих API. Це гарантує, що якщо користувач випадково використовує синхронні спливаючі веб-API, виконання не зависне. Однак, все ж рекомендується користувачеві моктити ці веб-API для кращого досвіду. Детальніше в [Мокінг](/docs/component-testing/mocking).

### Приклади

Обов'язково перегляньте документацію щодо [компонентного тестування](https://webdriver.io/docs/component-testing) і подивіться на [приклади репозиторію](https://github.com/webdriverio/component-testing-examples) для прикладів використання цих та різних інших фреймворків.