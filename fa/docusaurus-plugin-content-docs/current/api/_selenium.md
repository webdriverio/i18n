---
id: selenium
title: سلنیوم استندالون
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
آپلود یک فایل به ماشین از راه دور که مرورگر روی آن در حال اجراست.<br /><br />دستور سلنیوم استندالون. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://www.seleniumhq.org/) پیدا کنید.

##### Usage

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>آرشیو zip کدگذاری شده با Base64 که حاوی __یک__ فایل برای آپلود است. در صورتی که داده کدگذاری شده base64 نمایانگر یک آرشیو zip نباشد یا آرشیو حاوی بیش از یک فایل باشد، یک خطای ناشناخته رخ خواهد داد.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String&gt;**
            **<code><var>path</var></code>:** مسیر مطلق فایل آپلود شده در ماشین از راه دور.


---

## getDownloadableFiles
لیست فایل‌هایی از ماشین از راه دور که برای دانلود در دسترس هستند.<br /><br />دستور سلنیوم استندالون. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://www.seleniumhq.org/) پیدا کنید.

##### Usage

```js
browser.getDownloadableFiles()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** شیء حاوی لیستی از فایل‌های قابل دانلود در ماشین از راه دور.


---

## download
دانلود یک فایل از ماشین از راه دور که مرورگر روی آن در حال اجراست.<br /><br />دستور سلنیوم استندالون. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://www.seleniumhq.org/) پیدا کنید.

##### Usage

```js
browser.download(name)
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
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>نام فایلی که باید دانلود شود</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** شیء حاوی نام فایل دانلود شده و محتوای آن


---

## deleteDownloadableFiles
حذف تمام فایل‌های قابل دانلود از ماشین از راه دور که مرورگر روی آن در حال اجراست.<br /><br />دستور سلنیوم استندالون. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://www.seleniumhq.org/) پیدا کنید.

##### Usage

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
دریافت پیکربندی هاب از راه دور.<br /><br />دستور سلنیوم استندالون. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/nicegraham/selenium-grid2-api#gridapihub) پیدا کنید.

##### Usage

```js
browser.getHubConfig()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** پیکربندی هاب را با slotCount، timeouts و سایر اطلاعات برمی‌گرداند.


---

## gridTestSession
دریافت جزئیات نود سلنیوم گرید که یک نشست را اجرا می‌کند.<br /><br />دستور سلنیوم استندالون. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession) پیدا کنید.

##### Usage

```js
browser.gridTestSession(session)
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
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>شناسه نشستی که می‌خواهید جزئیات هاب آن را دریافت کنید.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** شیء حاوی اطلاعات درباره جزئیات نشست.


---

## gridProxyDetails
دریافت جزئیات پروکسی.<br /><br />دستور سلنیوم استندالون. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy) پیدا کنید.

##### Usage

```js
browser.gridProxyDetails(id)
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
      <td>شناسه پروکسی (می‌توان با استفاده از دستور gridTestSession دریافت کرد).</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** شیء حاوی اطلاعات درباره پروکسی.


---

## manageSeleniumHubLifecycle
مدیریت چرخه حیات نود هاب.<br /><br />دستور سلنیوم استندالون. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager) پیدا کنید.

##### Usage

```js
browser.manageSeleniumHubLifecycle(action)
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
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>دستوری که باید روی Selenium Hub فراخوانی شود. تنها عملیات پیاده‌سازی شده 'shutdown' هاب است.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
ارسال کوئری‌های GraphQL به سرور سلنیوم (هاب یا نود) برای دریافت داده. (فقط با سرور سلنیوم نسخه 4 پشتیبانی می‌شود)<br /><br />دستور سلنیوم استندالون. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/) پیدا کنید.

##### Usage

```js
browser.queryGrid(query)
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
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>یک کوئری GraphQL که باید به سرور ارسال شود.</td>
    </tr>
  </tbody>
</table>

##### Example


```js
const result = await browser.queryGrid('{ nodesInfo { nodes { status, uri } } }');
console.log(JSON.stringify(result, null, 4))
/**
 * outputs:
 * {
 *   "data": {
 *     "nodesInfo": {
 *       "nodes": [{
 *         "status": "UP",
 *         "uri": "http://192.168.0.39:4444"
 *       }]
 *     }
 *   }
 * }
 */
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** نتیجه کوئری GraphQL.