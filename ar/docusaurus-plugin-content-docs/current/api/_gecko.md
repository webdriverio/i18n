---
id: gecko
title: فايرفوكس
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---
## fullPageScreenshot
يلتقط لقطة شاشة للصفحة بأكملها.<br /><br />أمر فايرفوكس. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).



##### الاستخدام

```js
browser.fullPageScreenshot()
```




##### القيم المرجعة

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** بيانات صورة PNG المشفرة بـ base64 التي تشمل لقطة الشاشة للصفحة الكاملة.    


---
## getMozContext
الحصول على السياق الذي هو حاليًا قيد التأثير، مثل `CHROME` أو `CONTENT`.<br /><br />أمر فايرفوكس. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).



##### الاستخدام

```js
browser.getMozContext()
```



##### مثال


```js
console.log(await browser.getMozContext()); // outputs: 'CHROME'
```


##### القيم المرجعة

- **&lt;String&gt;**
            **<code><var>Context</var></code>:** سياق المتصفح، إما `CHROME` أو `CONTENT`    


---
## setMozContext
يغير سياق الهدف للأوامر بين chrome و content.<br /><br />تغيير السياق الحالي له تأثير حالي على جميع الأوامر اللاحقة. سياق `CONTENT` لديه أذونات المستند العادية لمنصة الويب، كما لو كنت تقيّم JavaScript عشوائيًا. سياق `CHROME` يحصل على أذونات مرتفعة تتيح لك التلاعب بواجهة المتصفح نفسها، مع الوصول الكامل إلى مجموعة أدوات XUL.<br /><br />أمر فايرفوكس. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).



##### الاستخدام

```js
browser.setMozContext(context)
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
      <td><code><var>context</var></code></td>
      <td>string</td>
      <td>سياق المتصفح، إما `CHROME` أو `CONTENT`</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
console.log(await browser.getMozContext()); // outputs: 'CHROME'
browser.setMozContext('CONTENT');
console.log(await browser.getMozContext()); // outputs: 'CONTENT'
```





---
## installAddOn
يقوم بتثبيت إضافة جديدة مع الجلسة الحالية. ستقوم هذه الوظيفة بإرجاع معرف قد يتم استخدامه لاحقًا لإلغاء تثبيت الإضافة باستخدام `uninstallAddon`.<br /><br />أمر فايرفوكس. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).



##### الاستخدام

```js
browser.installAddOn(addon, temporary)
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
      <td><code><var>addon</var></code></td>
      <td>string</td>
      <td>سلسلة base64 لملف الإضافة</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>علامة مؤقتة تشير إلى ما إذا كان ينبغي تثبيت الامتداد مؤقتًا - يتم إزالته عند إعادة التشغيل</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
```


##### القيم المرجعة

- **&lt;String&gt;**
            **<code><var>id</var></code>:** وعد سيتحول إلى معرف للإضافة المثبتة حديثًا.    


---
## uninstallAddOn
يقوم بإلغاء تثبيت إضافة من ملف تعريف جلسة المتصفح الحالية.<br /><br />أمر فايرفوكس. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).



##### الاستخدام

```js
browser.uninstallAddOn(id)
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
      <td>معرف الإضافة المراد إلغاء تثبيتها.</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
// ...
await browser.uninstallAddOn(id)
```