---
id: macos
title: MacOS
description: "Автоматизируйте нативные приложения macOS с помощью WebdriverIO, используя Appium и драйвер Mac2, начиная с мастера настройки проекта."
---

WebdriverIO может автоматизировать любое приложение MacOS с помощью [Appium](https://appium.io/). Всё, что вам нужно, — это установленный в системе [XCode](https://developer.apple.com/xcode/), Appium и [Mac2 Driver](https://github.com/appium/appium-mac2-driver), установленные как зависимости, а также правильно заданные capabilities.

## Начало работы

Чтобы создать новый проект WebdriverIO, выполните:

```sh
npm create wdio@latest ./
```

Мастер установки проведёт вас через весь процесс. Обязательно выберите _"Desktop Testing - of MacOS Applications"_, когда он спросит, какой тип тестирования вы хотите выполнять. После этого просто оставьте значения по умолчанию или измените их по своему усмотрению.

Мастер настройки установит все необходимые пакеты Appium и создаст файл `wdio.conf.js` или `wdio.conf.ts` с конфигурацией, необходимой для тестирования на MacOS. Если вы согласились на автоматическую генерацию тестовых файлов, вы можете запустить свой первый тест с помощью `npm run wdio`.

<CreateMacOSProjectAnimation />

Вот и всё 🎉

## Пример

Вот как может выглядеть простой тест, который открывает приложение «Калькулятор», выполняет вычисление и проверяет его результат:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__Примечание:__ приложение «Калькулятор» было открыто автоматически в начале сессии, поскольку в качестве опции capability было задано `'appium:bundleId': 'com.apple.calculator'`. Вы можете переключаться между приложениями в любой момент во время сессии.

## Дополнительная информация

Для получения информации об особенностях тестирования на MacOS рекомендуем ознакомиться с проектом [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).