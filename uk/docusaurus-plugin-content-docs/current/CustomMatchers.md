---
id: custommatchers
title: Власні Матчери
---

WebdriverIO використовує бібліотеку тверджень [`expect`](https://webdriver.io/docs/api/expect-webdriverio) у стилі Jest, яка має спеціальні функції та власні матчери, специфічні для запуску веб- та мобільних тестів. Хоча бібліотека матчерів велика, вона точно не підходить для всіх можливих ситуацій. Тому можна розширити існуючі матчери власними, визначеними вами.

:::warning

Хоча наразі немає різниці в тому, як визначаються матчери, специфічні для об'єкта [`browser`](/docs/api/browser) або екземпляра [element](/docs/api/element), це може змінитися в майбутньому. Слідкуйте за [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) для отримання додаткової інформації про цей розвиток.

:::

## Власні Матчери для Браузера

Щоб зареєструвати власний матчер для браузера, викличте `extend` на об'єкті `expect` безпосередньо у вашому spec-файлі або як частину, наприклад, хука `before` у вашому `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Як показано в прикладі, функція матчера приймає очікуваний об'єкт, наприклад, браузер або елемент, як перший параметр і очікуване значення як другий. Потім ви можете використовувати матчер таким чином:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Власні Матчери для Елементів

Подібно до власних матчерів для браузера, матчери елементів не відрізняються. Ось приклад того, як створити власний матчер для перевірки aria-label елемента:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Це дозволяє вам викликати твердження таким чином:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Підтримка TypeScript

Якщо ви використовуєте TypeScript, потрібен ще один крок для забезпечення типової безпеки ваших власних матчерів. Розширивши інтерфейс `Matcher` вашими власними матчерами, всі проблеми з типами зникнуть:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Якщо ви створили власний [асиметричний матчер](https://jestjs.io/docs/expect#expectextendmatchers), ви можете таким чином розширити типи `expect`:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```