---
id: switchFrame
title: 切换框架
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

将活动上下文切换到一个框架，例如页面上的一个iframe。您可以通过多种方式查询页面上的框架：

  - 如果给定一个字符串，它会切换到具有匹配上下文ID、URL或包含该字符串的URL的框架
    ```ts
    // 切换到具有特定URL或URL中包含字符串的框架
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // 注意：此框架位于嵌套的iframe中，但您只需要提供
    // 您想要的框架的URL
    await browser.switchFrame('https://www.w3schools.com')
    // 检查页面标题
    console.log(await browser.execute(() => [document.title, document.URL]))
    // 输出: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - 如果您有框架的上下文ID，可以直接使用它
    ```ts
    // 切换到具有特定上下文ID的框架
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - 如果给定一个引用`iframe`元素的WebdriverIO元素，它将切换到该框架
    ```ts
    // 切换到从当前上下文查询的框架元素
    await browser.switchFrame($('iframe'))
    ```

  - 如果给定一个函数，它将循环遍历页面上的所有iframe，并在上下文对象中调用该函数。该函数应返回一个布尔值，指示是否应选择该框架。该函数
    将在浏览器中执行，并允许访问所有Web API，例如：
    ```ts
    // 切换到包含ID为"#frameContent"元素的第一个框架
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // 切换到URL中包含"webdriver"的第一个框架
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - 如果给定`null`，它将切换到顶层框架
    ```ts
    // 首先切换到一个框架
    await browser.switchFrame($('iframe'))
    // 在该框架内执行更多自动化操作，然后...

    // 切换到顶层框架
    await browser.switchFrame(null)
    ```

一旦您切换到一个框架，所有后续命令都将在该框架的上下文中执行，
包括导航到不同的页面。

##### 用法

```js
browser.switchFrame(context)
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
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### 返回值

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  当前活动的上下文ID