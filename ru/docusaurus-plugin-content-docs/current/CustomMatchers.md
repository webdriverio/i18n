---
id: custommatchers
title: Пользовательские матчеры
description: "Регистрируйте пользовательские матчеры для браузера и элементов с помощью expect.extend и добавляйте для них типы TypeScript."
---

WebdriverIO использует библиотеку утверждений [`expect`](https://webdriver.io/docs/api/expect-webdriverio) в стиле Jest, которая содержит специальные возможности и пользовательские матчеры, предназначенные для запуска веб- и мобильных тестов. Хотя библиотека матчеров обширна, она, безусловно, не подходит для всех возможных ситуаций. Поэтому существующие матчеры можно расширить собственными, определёнными вами.

:::warning

Хотя в настоящее время нет разницы в том, как определяются матчеры для объекта [`browser`](/docs/api/browser) или экземпляра [элемента](/docs/api/element), в будущем это, вероятно, может измениться. Следите за [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408), чтобы получать дополнительную информацию об этой разработке.

:::

:::info Jasmine

При использовании фреймворка Jasmine вызывайте `expect.extend` в файле спецификации или в хуке `before` до запуска тестов. Матчеры становятся асинхронными матчерами Jasmine, поэтому используйте для них `await`. Матчер с именем синхронного матчера Jasmine выполняется только для значений WebdriverIO, как и матчеры WebdriverIO. Пользовательские асимметричные матчеры (`expect.myMatcher()`) недоступны. Вы также можете использовать `jasmine.addMatchers` для синхронного матчера или `jasmine.addAsyncMatchers` для асинхронного матчера, см. [руководство Jasmine по пользовательским матчерам](https://jasmine.github.io/tutorials/custom_matchers).

:::

## Пользовательские матчеры для браузера

Чтобы зарегистрировать пользовательский матчер для браузера, вызовите `extend` у объекта `expect` либо непосредственно в файле спецификации, либо, например, в хуке `before` в вашем `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Как показано в примере, функция матчера принимает ожидаемый объект, например объект браузера или элемента, в качестве первого параметра, а ожидаемое значение — в качестве второго. Затем вы можете использовать матчер следующим образом:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Пользовательские матчеры для элементов

Матчеры для элементов ничем не отличаются от пользовательских матчеров для браузера. Вот пример создания пользовательского матчера для проверки aria-label элемента:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Это позволяет вызывать утверждение следующим образом:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Поддержка TypeScript

Если вы используете TypeScript, требуется ещё один шаг, чтобы обеспечить типобезопасность ваших пользовательских матчеров. Расширив интерфейс `Matcher` вашими пользовательскими матчерами, вы избавитесь от всех проблем с типами:

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