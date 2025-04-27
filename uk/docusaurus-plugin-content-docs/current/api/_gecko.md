---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
Робить знімок екрана всієї сторінки.<br /><br />Команда Firefox. Більше деталей можна знайти в [офіційній документації протоколу](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).

##### Usage

```js
browser.fullPageScreenshot()
```


##### Returns

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Зображення PNG у форматі base64, що містить знімок екрана всієї сторінки.


---

## getMozContext
Отримує контекст, який наразі діє, наприклад `CHROME` або `CONTENT`.<br /><br />Команда Firefox. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).

##### Usage

```js
browser.getMozContext()
```

##### Example


```js
console.log(await browser.getMozContext()); // outputs: 'CHROME'
```


##### Returns

- **&lt;String&gt;**
            **<code><var>Context</var></code>:** Контекст браузера, або `CHROME`, або `CONTENT`


---

## setMozContext
Змінює цільовий контекст для команд між chrome та content.<br /><br />Зміна поточного контексту має статичний вплив на всі наступні команди. Контекст `CONTENT` має звичайні дозволи документа веб-платформи, ніби ви оцінюєте довільний JavaScript. Контекст `CHROME` отримує підвищені дозволи, які дозволяють маніпулювати самим інтерфейсом браузера, з повним доступом до інструментарію XUL.<br /><br />Команда Firefox. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).

##### Usage

```js
browser.setMozContext(context)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>context</var></code></td>
      <td>string</td>
      <td>Контекст браузера, або `CHROME`, або `CONTENT`</td>
    </tr>
  </tbody>
</table>

##### Example


```js
console.log(await browser.getMozContext()); // outputs: 'CHROME'
browser.setMozContext('CONTENT');
console.log(await browser.getMozContext()); // outputs: 'CONTENT'
```



---

## installAddOn
Встановлює нове доповнення у поточній сесії. Ця функція поверне ID, який пізніше можна використати для видалення доповнення за допомогою `uninstallAddon`.<br /><br />Команда Firefox. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).

##### Usage

```js
browser.installAddOn(addon, temporary)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>addon</var></code></td>
      <td>string</td>
      <td>рядок base64 файлу доповнення</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>Прапорець temporary, що вказує, чи повинно розширення встановлюватися тимчасово - видаляється при перезапуску</td>
    </tr>
  </tbody>
</table>

##### Example


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
```


##### Returns

- **&lt;String&gt;**
            **<code><var>id</var></code>:** Обіцянка, яка розв'язується до ID для новоствореного доповнення.


---

## uninstallAddOn
Видаляє доповнення з профілю поточної сесії браузера.<br /><br />Команда Firefox. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).

##### Usage

```js
browser.uninstallAddOn(id)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>ID доповнення, яке потрібно видалити.</td>
    </tr>
  </tbody>
</table>

##### Example


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
// ...
await browser.uninstallAddOn(id)
```


