---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

Метод браузера `overwriteCommand` помогает переопределить встроенные команды браузера и элемента, такие как `pause` и `click`.

:::info

Вы можете узнать больше об этом в разделе [пользовательских команд](/docs/customcommands#overwriting-native-commands).

:::

##### Использование

```js
browser.overwriteCommand(name, callback, elementScope)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>имя оригинальной команды</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>передача оригинальной функции</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Boolean`</td>
      <td>расширить объект Element вместо объекта Browser</td>
    </tr>
  </tbody>
</table>

##### Пример

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