---
id: selenium
title: سيلينيوم المستقل
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---

## file
تحميل ملف إلى الجهاز البعيد الذي يشغل المتصفح.<br /><br />أمر سيلينيوم المستقل. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.seleniumhq.org/).

##### الاستخدام

```js
browser.file(file)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>أرشيف zip مشفر بنظام Base64 يحتوي على ملف __واحد__ للتحميل. في حالة أن البيانات المشفرة بنظام base64 لا تمثل أرشيف zip أو أن الأرشيف يحتوي على أكثر من ملف واحد، سيتم إلقاء خطأ غير معروف.</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;String&gt;**
            **<code><var>path</var></code>:** المسار المطلق للملف المحمل على الجهاز البعيد.


---

## getDownloadableFiles
سرد الملفات من الجهاز البعيد المتاحة للتنزيل.<br /><br />أمر سيلينيوم المستقل. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.seleniumhq.org/).

##### الاستخدام

```js
browser.getDownloadableFiles()
```


##### العائد

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** كائن يحتوي على قائمة الملفات القابلة للتنزيل على الجهاز البعيد.


---

## download
تنزيل ملف من الجهاز البعيد الذي يشغل المتصفح.<br /><br />أمر سيلينيوم المستقل. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.seleniumhq.org/).

##### الاستخدام

```js
browser.download(name)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** كائن يحتوي على اسم الملف الذي تم تنزيله ومحتواه


---

## deleteDownloadableFiles
إزالة جميع الملفات القابلة للتنزيل من الجهاز البعيد الذي يشغل المتصفح.<br /><br />أمر سيلينيوم المستقل. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.seleniumhq.org/).

##### الاستخدام

```js
browser.deleteDownloadableFiles()
```



---

## getHubConfig
استلام تكوين المحور عن بُعد.<br /><br />أمر سيلينيوم المستقل. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/nicegraham/selenium-grid2-api#gridapihub).

##### الاستخدام

```js
browser.getHubConfig()
```


##### العائد

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** يعيد تكوين المحور مع عدد الفتحات والمهلات ومعلومات أخرى.


---

## gridTestSession
الحصول على تفاصيل عقدة شبكة سيلينيوم التي تشغل جلسة.<br /><br />أمر سيلينيوم المستقل. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).

##### الاستخدام

```js
browser.gridTestSession(session)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>معرّف الجلسة للحصول على تفاصيل المحور لها.</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** كائن يحتوي على معلومات حول تفاصيل الجلسة.


---

## gridProxyDetails
الحصول على تفاصيل الوكيل.<br /><br />أمر سيلينيوم المستقل. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).

##### الاستخدام

```js
browser.gridProxyDetails(id)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>معرّف الوكيل (يمكن استلامه باستخدام أمر gridTestSession).</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** كائن يحتوي على معلومات حول الوكيل.


---

## manageSeleniumHubLifecycle
إدارة دورة حياة عقدة المحور.<br /><br />أمر سيلينيوم المستقل. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).

##### الاستخدام

```js
browser.manageSeleniumHubLifecycle(action)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>الأمر المراد تنفيذه على مركز سيلينيوم. الإجراء الوحيد المنفذ هو 'shutdown' (إيقاف) المحور.</td>
    </tr>
  </tbody>
</table>



---

## queryGrid
إرسال استعلامات GraphQL إلى خادم سيلينيوم (المحور أو العقدة) لجلب البيانات. (مدعوم فقط مع خادم سيلينيوم الإصدار 4)<br /><br />أمر سيلينيوم المستقل. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).

##### الاستخدام

```js
browser.queryGrid(query)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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

##### مثال


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


##### العائد

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** نتيجة استعلام GraphQL.