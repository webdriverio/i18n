---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

Метод браузера `overwriteCommand` допомагає вам перевизначити нативні команди браузера та елемента, такі як `pause` та `click`.

:::info

Ви можете переглянути більше інформації про це в розділі [користувацькі команди](/docs/customcommands#overwriting-native-commands).

:::

##### Використання

```js
browser.overwriteCommand(name, callback, elementScope)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>назва оригінальної команди</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>передача оригінальної функції</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Boolean`</td>
      <td>розширити об'єкт Element замість об'єкта Browser</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="execute.js"
// print milliseconds before pause and return its value.
await browser.overwriteCommand('pause', function (origPauseFunction, ms) {
    console.log(`Sleeping for ${ms}`)
    origPauseFunction(ms)
    return ms
})

// usage
it('should use my overwrite command', async () => {
    await browser.url('https://webdriver.io')
    await browser.pause(1000) // outputs "Sleeping for 1000"
})
```