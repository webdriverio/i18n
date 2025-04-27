---
id: custommatchers
title: Пользовательские Матчеры
---

WebdriverIO использует библиотеку утверждений в стиле Jest [`expect`](https://webdriver.io/docs/api/expect-webdriverio), которая поставляется со специальными функциями и пользовательскими матчерами, предназначенными для запуска веб и мобильных тестов. Хотя библиотека матчеров большая, она определенно не подходит для всех возможных ситуаций. Поэтому возможно расширить существующие матчеры собственными, определенными вами.

:::warning

Хотя в настоящее время нет различий в определении матчеров, специфичных для объекта [`browser`](/docs/api/browser) или экземпляра [element](/docs/api/element), это, безусловно, может измениться в будущем. Следите за [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) для получения дополнительной информации об этой разработке.

:::

## Пользовательские Матчеры для Браузера

Чтобы зарегистрировать пользовательский матчер для браузера, вызовите `extend` на объекте `expect` либо непосредственно в вашем spec-файле, либо как часть, например, хука `before` в вашем `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Как показано в примере, функция матчера принимает ожидаемый объект, например, объект браузера или элемента, в качестве первого параметра и ожидаемое значение в качестве второго. Затем вы можете использовать матчер следующим образом:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Пользовательские Матчеры для Элементов

Аналогично пользовательским матчерам для браузера, матчеры для элементов не отличаются. Вот пример того, как создать пользовательский матчер для проверки атрибута aria-label элемента:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Это позволяет вам вызывать утверждение следующим образом:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Поддержка TypeScript

Если вы используете TypeScript, требуется еще один шаг для обеспечения типобезопасности ваших пользовательских матчеров. Расширяя интерфейс `Matcher` своими пользовательскими матчерами, все проблемы с типами исчезают:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Если вы создали пользовательский [асимметричный матчер](https://jestjs.io/docs/expect#expectextendmatchers), вы можете аналогичным образом расширить типы `expect` следующим образом:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```