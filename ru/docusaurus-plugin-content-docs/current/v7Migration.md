---
id: v7-migration
title: С v6 на v7
description: "Обновление проекта WebdriverIO с v6 до v7: обновление зависимостей, преобразование конфигурационного файла и обновление определений шагов Cucumber."
---

Это руководство предназначено для тех, кто всё ещё использует `v6` WebdriverIO и хочет перейти на `v7`. Как упоминалось в нашем [посте в блоге о релизе](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), изменения в основном внутренние, и обновление должно быть простым процессом.

:::info

Если вы используете WebdriverIO `v5` или ниже, сначала обновитесь до `v6`. Ознакомьтесь с нашим [руководством по миграции на v6](v6-migration).

:::

Хотя нам бы очень хотелось полностью автоматизировать этот процесс, реальность выглядит иначе. У каждого своя конфигурация. Каждый шаг следует рассматривать скорее как рекомендацию, а не как пошаговую инструкцию. Если у вас возникнут проблемы с миграцией, не стесняйтесь [связаться с нами](https://github.com/webdriverio/codemod/discussions/new).

## Настройка

Как и в случае других миграций, мы можем использовать WebdriverIO [codemod](https://github.com/webdriverio/codemod). В этом руководстве мы используем [шаблонный проект](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), предоставленный участником сообщества, и полностью переводим его с `v6` на `v7`.

Чтобы установить codemod, выполните:

```sh
npm install jscodeshift @wdio/codemod
```

#### Коммиты:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Обновление зависимостей WebdriverIO

Поскольку все версии WebdriverIO тесно связаны друг с другом, лучше всего всегда обновляться до определённого тега, например `latest`. Для этого мы копируем все зависимости, связанные с WebdriverIO, из нашего `package.json` и переустанавливаем их с помощью:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Обычно зависимости WebdriverIO входят в число dev-зависимостей, хотя в зависимости от вашего проекта это может отличаться. После этого ваши `package.json` и `package-lock.json` должны обновиться. __Примечание:__ это зависимости, используемые в [примере проекта](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), ваши могут отличаться.

#### Коммиты:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Преобразование конфигурационного файла

Хорошим первым шагом будет начать с конфигурационного файла. В WebdriverIO `v7` больше не требуется вручную регистрировать какие-либо компиляторы. Более того, их необходимо удалить. Это можно сделать с помощью codemod полностью автоматически:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Codemod пока не поддерживает проекты на TypeScript. См. [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Мы работаем над тем, чтобы вскоре добавить её поддержку. Если вы используете TypeScript, присоединяйтесь к работе!

:::

#### Коммиты:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Обновление определений шагов

Если вы используете Jasmine или Mocha, на этом всё. Последний шаг — обновить импорты Cucumber.js с `cucumber` на `@cucumber/cucumber`. Это также можно сделать автоматически с помощью codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

Вот и всё! Больше никаких изменений не требуется 🎉

#### Коммиты:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Заключение

Надеемся, что это руководство немного помогло вам в процессе миграции на WebdriverIO `v7`. Сообщество продолжает улучшать codemod, тестируя его с различными командами в разных организациях. Не стесняйтесь [создать issue](https://github.com/webdriverio/codemod/issues/new), если у вас есть отзыв, или [начать обсуждение](https://github.com/webdriverio/codemod/discussions/new), если у вас возникли трудности в процессе миграции.