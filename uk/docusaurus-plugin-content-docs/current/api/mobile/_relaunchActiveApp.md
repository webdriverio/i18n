---
id: relaunchActiveApp
title: relaunchActiveApp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

Виконує перезапуск активного нативного додатка шляхом:

- завершення роботи активного додатка
- запуску попередньо активного додатка

:::important
Ця команда перезапустить (завершить/закриє та запустить/відкриє) поточний активний додаток і НЕ скине стан додатка. Appium не може виконати повне скидання
додатка, якщо:

- ви не почнете нову сесію, і обробник сесії не видалить стан додатка/очистить пристрій
- у вас немає бекдору у вашому додатку для скидання стану додатка, який Appium може викликати

Якщо ви хочете скинути стан додатка для Android або iOS, вам потрібно створити власний механізм/команду скидання у вашому скрипті. Варіанти можуть бути:

- Android: Використовуйте команду `adb` для очищення даних додатка: `adb shell pm clear <appPackage>`
- iOS: перевстановіть додаток за допомогою команди `mobile: installApp`
- ....
- не використовувати цю команду

Варіанти, які у вас є, залежать від платформи, додатка та місця (локально, найчастіше з повним доступом до пристрою, або в хмарі з меншим доступом), де ви тестуєте.

:::

##### Example

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```