---
id: selenium
title: سيلينيوم ستاندالون
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---
## file
تحميل ملف إلى الجهاز البعيد الذي يعمل عليه المتصفح.<br /><br />أمر سيلينيوم ستاندالون. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.seleniumhq.org/).



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
      <td>أرشيف مضغوط مشفر بنظام Base64 يحتوي على ملف __واحد__ للتحميل. في حالة أن البيانات المشفرة بنظام Base64 لا تمثل أرشيفًا مضغوطًا أو أن الأرشيف يحتوي على أكثر من ملف واحد، سيتم إلقاء خطأ غير معروف.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String&gt;**
            **<code><var>path</var></code>:** المسار المطلق للملف المحمل على الجهاز البعيد.    


---
## getDownloadableFiles
سرد الملفات من الجهاز البعيد المتاحة للتنزيل.<br /><br />أمر سيلينيوم ستاندالون. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.seleniumhq.org/).



##### Usage

```js
browser.getDownloadableFiles()
```




##### Returns

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** كائن يحتوي على قائمة بالملفات القابلة للتنزيل على الجهاز البعيد.    


---
## download
تنزيل ملف من جهاز بعيد يعمل عليه المتصفح.<br /><br />أمر سيلينيوم ستاندالون. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.seleniumhq.org/).



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
      <td>اسم الملف المراد تنزيله</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** كائن يحتوي على اسم الملف الذي تم تنزيله ومحتواه    


---
## deleteDownloadableFiles
إزالة جميع الملفات القابلة للتنزيل من الجهاز البعيد الذي يعمل عليه المتصفح.<br /><br />أمر سيلينيوم ستاندالون. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.seleniumhq.org/).



##### Usage

```js
browser.deleteDownloadableFiles()
```







---
## getHubConfig
استلام تكوين الهاب عن بُعد.<br /><br />أمر سيلينيوم ستاندالون. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/nicegraham/selenium-grid2-api#gridapihub).



##### Usage

```js
browser.getHubConfig()
```




##### Returns

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** يعيد تكوين الهاب مع عدد الفتحات والمهل الزمنية ومعلومات أخرى.    


---
## gridTestSession
الحصول على تفاصيل عن عقدة شبكة سيلينيوم التي تقوم بتشغيل جلسة.<br /><br />أمر سيلينيوم ستاندالون. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).



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
      <td>معرف الجلسة المراد استلام تفاصيل الهاب لها.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** كائن يحتوي على معلومات حول تفاصيل الجلسة.    


---
## gridProxyDetails
الحصول على تفاصيل البروكسي.<br /><br />أمر سيلينيوم ستاندالون. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).



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
      <td>معرف البروكسي (يمكن الحصول عليه باستخدام أمر gridTestSession).</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** كائن يحتوي على معلومات حول البروكسي.    


---
## manageSeleniumHubLifecycle
إدارة دورة حياة عقدة الهاب.<br /><br />أمر سيلينيوم ستاندالون. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).



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
      <td>الأمر المراد استدعاؤه على Selenium Hub. الإجراء الوحيد المنفذ هو 'shutdown' لإيقاف تشغيل الهاب.</td>
    </tr>
  </tbody>
</table>





---
## queryGrid
إرسال استعلامات GraphQL إلى خادم سيلينيوم (الهاب أو العقدة) لجلب البيانات. (مدعوم فقط مع خادم سيلينيوم الإصدار 4)<br /><br />أمر سيلينيوم ستاندالون. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).



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
      <td>استعلام GraphQL ليتم إرساله إلى الخادم.</td>
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
            **<code><var>data</var></code>:** نتيجة استعلام GraphQL.