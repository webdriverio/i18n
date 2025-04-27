---
id: gecko
title: Firefox浏览器
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
捕获整个页面的截图。<br /><br />Firefox命令。更多详情可以在[官方协议文档](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46)中找到。

##### 用法

```js
browser.fullPageScreenshot()
```


##### 返回值

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** 包含整个页面截图的base64编码PNG图像数据。


---

## getMozContext
获取当前生效的上下文，例如`CHROME`或`CONTENT`。<br /><br />Firefox命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622)中找到。

##### 用法

```js
browser.getMozContext()
```

##### 示例


```js
console.log(await browser.getMozContext()); // 输出: 'CHROME'
```


##### 返回值

- **&lt;String&gt;**
            **<code><var>Context</var></code>:** 浏览器上下文，值为`CHROME`或`CONTENT`


---

## setMozContext
在chrome和content之间更改命令的目标上下文。<br /><br />更改当前上下文会对所有后续命令产生状态影响。`CONTENT`上下文具有正常的Web平台文档权限，就像你会评估任意JavaScript一样。`CHROME`上下文获得提升权限，使你可以操作浏览器chrome本身，并完全访问XUL工具包。<br /><br />Firefox命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645)中找到。

##### 用法

```js
browser.setMozContext(context)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>context</var></code></td>
      <td>string</td>
      <td>浏览器上下文，值为`CHROME`或`CONTENT`</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
console.log(await browser.getMozContext()); // 输出: 'CHROME'
browser.setMozContext('CONTENT');
console.log(await browser.getMozContext()); // 输出: 'CONTENT'
```



---

## installAddOn
在当前会话中安装新的插件。此函数将返回一个ID，以后可以使用`uninstallAddon`卸载该插件。<br /><br />Firefox命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668)中找到。

##### 用法

```js
browser.installAddOn(addon, temporary)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>addon</var></code></td>
      <td>string</td>
      <td>插件文件的base64字符串</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>指示扩展是否应临时安装的标志 - 重启时会被移除</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
```


##### 返回值

- **&lt;String&gt;**
            **<code><var>id</var></code>:** 一个将解析为新安装插件ID的promise。


---

## uninstallAddOn
从当前浏览器会话的配置文件中卸载插件。<br /><br />Firefox命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687)中找到。

##### 用法

```js
browser.uninstallAddOn(id)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>要卸载的插件的ID。</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
// ...
await browser.uninstallAddOn(id)
```