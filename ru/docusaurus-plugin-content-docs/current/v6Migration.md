---
id: v6-migration
title: С v5 на v6
description: "Обновление проекта WebdriverIO с v5 на v6: обновление зависимостей, преобразование файла конфигурации и обновление спецификаций и объектов страниц."
---

Это руководство предназначено для тех, кто всё ещё использует `v5` WebdriverIO и хочет перейти на `v6` или на последнюю версию WebdriverIO. Как упоминалось в нашем [посте о релизе](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), изменения при обновлении до этой версии можно кратко описать следующим образом:

- мы объединили параметры некоторых команд (например, `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) и перенесли все необязательные параметры в один объект, например:

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- конфигурации сервисов перенесены в список сервисов, например:

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- некоторые опции сервисов были переименованы для упрощения
- мы переименовали команду `launchApp` в `launchChromeApp` для сессий Chrome WebDriver

:::info

Если вы используете WebdriverIO `v4` или ниже, сначала обновитесь до `v5`.

:::

Хотя мы бы очень хотели иметь полностью автоматизированный процесс, реальность выглядит иначе. У каждого своя конфигурация. Каждый шаг следует рассматривать скорее как рекомендацию, а не как пошаговую инструкцию. Если у вас возникнут проблемы с миграцией, не стесняйтесь [связаться с нами](https://github.com/webdriverio/codemod/discussions/new).

## Подготовка

Как и при других миграциях, мы можем использовать [codemod](https://github.com/webdriverio/codemod) WebdriverIO. Чтобы установить codemod, выполните:

```sh
npm install jscodeshift @wdio/codemod
```

## Обновление зависимостей WebdriverIO

Поскольку все версии WebdriverIO тесно связаны друг с другом, лучше всегда обновляться до конкретного тега, например `6.12.0`. Если вы решите обновиться с `v5` сразу до `v7`, можно не указывать тег и установить последние версии всех пакетов. Для этого скопируем все зависимости, связанные с WebdriverIO, из нашего `package.json` и переустановим их с помощью:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Обычно зависимости WebdriverIO входят в dev-зависимости, хотя в зависимости от проекта это может отличаться. После этого ваши `package.json` и `package-lock.json` должны обновиться. __Примечание:__ это примерные зависимости, ваши могут отличаться. Обязательно найдите последнюю версию v6, выполнив, например:

```sh
npm show webdriverio versions
```

Постарайтесь установить последнюю доступную версию 6 для всех основных пакетов WebdriverIO. Для пакетов сообщества это может отличаться от пакета к пакету. Здесь мы рекомендуем проверить changelog, чтобы узнать, какая версия всё ещё совместима с v6.

## Преобразование файла конфигурации

Хорошим первым шагом будет начать с файла конфигурации. Все несовместимые изменения можно исправить с помощью codemod полностью автоматически:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Codemod пока не поддерживает проекты на TypeScript. См. [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Мы работаем над тем, чтобы вскоре добавить его поддержку. Если вы используете TypeScript, присоединяйтесь!

:::

## Обновление файлов спецификаций и объектов страниц

Чтобы обновить все изменения команд, запустите codemod для всех ваших e2e-файлов, содержащих команды WebdriverIO, например:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

Вот и всё! Больше никаких изменений не требуется 🎉

## Заключение

Мы надеемся, что это руководство немного поможет вам в процессе миграции на WebdriverIO `v6`. Мы настоятельно рекомендуем продолжить обновление до последней версии, поскольку переход на `v7` тривиален благодаря почти полному отсутствию несовместимых изменений. Ознакомьтесь с руководством по миграции [для обновления до v7](v7-migration).

Сообщество продолжает улучшать codemod, тестируя его с различными командами в разных организациях. Не стесняйтесь [создать issue](https://github.com/webdriverio/codemod/issues/new), если у вас есть отзыв, или [начать обсуждение](https://github.com/webdriverio/codemod/discussions/new), если у вас возникли трудности в процессе миграции.