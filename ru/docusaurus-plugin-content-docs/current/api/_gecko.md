---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
Делает скриншот всей страницы.<br /><br />Команда Firefox. Более подробную информацию можно найти в [официальной документации протокола](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).

##### Usage

```js
browser.fullPageScreenshot()
```


##### Returns

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Данные изображения PNG в кодировке base64, содержащие скриншот всей страницы.


---

## getMozContext
Получает контекст, который в настоящее время действует, например, `CHROME` или `CONTENT`.<br /><br />Команда Firefox. Более подробную информацию можно найти в [официальной документации протокола](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).

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
            **<code><var>Context</var></code>:** Контекст браузера, либо `CHROME`, либо `CONTENT`


---

## setMozContext
Меняет целевой контекст для команд между chrome и content.<br /><br />Изменение текущего контекста оказывает влияние на состояние всех последующих команд. Контекст `CONTENT` имеет обычные права доступа документа веб-платформы, как если бы вы выполняли произвольный JavaScript. Контекст `CHROME` получает повышенные права, которые позволяют манипулировать самим интерфейсом браузера с полным доступом к инструментарию XUL.<br /><br />Команда Firefox. Более подробную информацию можно найти в [официальной документации протокола](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).

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
      <td>Контекст браузера, либо `CHROME`, либо `CONTENT`</td>
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
Устанавливает новое дополнение в текущей сессии. Эта функция вернет идентификатор, который позже может быть использован для удаления дополнения с помощью `uninstallAddon`.<br /><br />Команда Firefox. Более подробную информацию можно найти в [официальной документации протокола](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).

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
      <td>строка base64 файла дополнения</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>temporary Флаг, указывающий, должно ли расширение быть установлено временно - удаляется при перезапуске</td>
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
            **<code><var>id</var></code>:** Промис, который разрешится идентификатором для вновь установленного дополнения.


---

## uninstallAddOn
Удаляет дополнение из профиля текущей сессии браузера.<br /><br />Команда Firefox. Более подробную информацию можно найти в [официальной документации протокола](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).

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
      <td>id ID дополнения для удаления.</td>
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