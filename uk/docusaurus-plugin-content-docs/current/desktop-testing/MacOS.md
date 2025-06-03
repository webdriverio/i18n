---
id: macos
title: MacOS
---

WebdriverIO може автоматизувати будь-які додатки MacOS за допомогою [Appium](https://appium.io/). Все, що вам потрібно, це встановлений на вашій системі [XCode](https://developer.apple.com/xcode/), Appium та [Mac2 Driver](https://github.com/appium/appium-mac2-driver) як залежність, і правильно налаштовані можливості.

## Початок роботи

Щоб ініціювати новий проект WebdriverIO, виконайте:

```sh
npm create wdio@latest ./
```

Майстер встановлення проведе вас через процес. Переконайтеся, що ви вибрали _"Desktop Testing - of MacOS Applications"_, коли вас запитають, який тип тестування ви хотіли б виконати. Після цього просто залиште значення за замовчуванням або змініть їх відповідно до ваших уподобань.

Майстер налаштування встановить усі необхідні пакети Appium і створить `wdio.conf.js` або `wdio.conf.ts` з необхідною конфігурацією для тестування на MacOS. Якщо ви погодилися автоматично генерувати деякі тестові файли, ви можете запустити свій перший тест за допомогою `npm run wdio`.

<CreateMacOSProjectAnimation />

Це все 🎉

## Приклад

Ось як може виглядати простий тест, який відкриває додаток Калькулятор, виконує обчислення та перевіряє його результат:

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

__Примітка:__ додаток калькулятора було автоматично відкрито на початку сесії, оскільки `'appium:bundleId': 'com.apple.calculator'` було визначено як параметр можливостей. Ви можете перемикатися між додатками під час сесії в будь-який час.

## Додаткова інформація

Для отримання інформації про особливості тестування на MacOS ми рекомендуємо ознайомитися з проектом [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).