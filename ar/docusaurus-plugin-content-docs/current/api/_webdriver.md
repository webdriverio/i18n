---
id: webdriver
title: بروتوكول WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---
## newSession
يقوم أمر New Session بإنشاء جلسة WebDriver جديدة مع نقطة النهاية. إذا فشل الإنشاء، يتم إرجاع خطأ بأنه لم يتم إنشاء الجلسة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-new-sessions).



##### الاستخدام

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>كائن JSON، مجموعة القدرات التي تم دمجها ومطابقتها في النهاية في خوارزمية معالجة القدرات</td>
    </tr>
  </tbody>
</table>


##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** كائن يحتوي على معرف الجلسة وقدرات جلسة WebDriver التي تم إنشاؤها.    


---
## deleteSession
يقوم أمر حذف الجلسة بإغلاق أي سياق تصفح عالي المستوى مرتبط بالجلسة الحالية، وينهي الاتصال، وأخيرًا يغلق الجلسة الحالية.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-delete-session).



##### الاستخدام

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object</td>
      <td>كائن يحتوي على خيارات لأمر deleteSession، مثل `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>





---
## status
يقوم أمر الحالة بإرجاع معلومات حول ما إذا كانت نقطة النهاية البعيدة في حالة يمكنها من إنشاء جلسات جديدة ويمكن أيضًا أن تتضمن معلومات تعريفية اعتباطية خاصة بالتنفيذ.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-status).



##### الاستخدام

```js
browser.status()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```



##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** كائن يحتوي على حالة برنامج التشغيل.    


---
## getTimeouts
يحصل أمر Get Timeouts على مدد المهلة المرتبطة بالجلسة الحالية.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-timeouts).



##### الاستخدام

```js
browser.getTimeouts()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```



##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** كائن يحتوي على مدد مهلة لمؤقتات `script`، و`pageLoad`، و`implicit`.    


---
## setTimeouts
يقوم أمر Set Timeouts بتعيين مدد المهلة المرتبطة بالجلسة الحالية. المؤقتات التي يمكن التحكم بها مدرجة في جدول مهل الجلسة أدناه.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-set-timeouts).



##### الاستخدام

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عدد صحيح بالميلي ثانية لمهلة الانتظار الضمني للجلسة</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عدد صحيح بالميلي ثانية لمهلة تحميل الصفحة للجلسة</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عدد صحيح بالميلي ثانية لمهلة النص البرمجي للجلسة</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```






---
## getUrl
يقوم أمر Get Current URL بإرجاع عنوان URL لسياق التصفح الحالي عالي المستوى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-current-url).



##### الاستخدام

```js
browser.getUrl()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>url</var></code>:** عنوان URL لمستند المستند النشط لسياق التصفح الحالي عالي المستوى    


---
## navigateTo
يُستخدم أمر navigateTo (go) لجعل وكيل المستخدم ينتقل بسياق التصفح الحالي عالي المستوى إلى موقع جديد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [url](/docs/api/browser/url). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>سلسلة تمثل عنوان URL مطلق (يبدأ بـ http(s))، قد يتضمن جزءًا (#...)، ويمكن أن يكون أيضًا مخططًا محليًا (about: إلخ)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```






---
## back
يتسبب أمر Back في أن يمر المتصفح خطوة واحدة إلى الوراء في سجل الجلسة المشترك لسياق التصفح الحالي عالي المستوى. وهذا يعادل الضغط على زر الرجوع في واجهة المتصفح أو استدعاء `window.history.back`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-back).



##### الاستخدام

```js
browser.back()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```






---
## forward
يتسبب أمر Forward في أن يمر المتصفح خطوة واحدة إلى الأمام في سجل الجلسة المشترك لسياق التصفح الحالي عالي المستوى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-forward).



##### الاستخدام

```js
browser.forward()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```






---
## refresh
يتسبب أمر Refresh في أن يقوم المتصفح بإعادة تحميل الصفحة في سياق التصفح الحالي عالي المستوى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-refresh).



##### الاستخدام

```js
browser.refresh()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```






---
## getTitle
يقوم أمر Get Title بإرجاع عنوان المستند لسياق التصفح الحالي عالي المستوى، وهو ما يعادل استدعاء `document.title`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-title).



##### الاستخدام

```js
browser.getTitle()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>title</var></code>:** يرجع سلسلة نصية مماثلة لـ `document.title` لسياق التصفح الحالي عالي المستوى.    


---
## getWindowHandle
يقوم أمر Get Window Handle بإرجاع معرف النافذة لسياق التصفح الحالي عالي المستوى. يمكن استخدامه كوسيطة لـ Switch To Window.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-window-handle).



##### الاستخدام

```js
browser.getWindowHandle()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** يرجع سلسلة نصية وهي معرف النافذة لسياق التصفح الحالي عالي المستوى.    


---
## closeWindow
يقوم أمر Close Window بإغلاق سياق التصفح الحالي عالي المستوى. بمجرد الانتهاء، إذا لم تعد هناك سياقات تصفح أخرى عالية المستوى مفتوحة، فإن جلسة WebDriver نفسها تغلق.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-close-window).



##### الاستخدام

```js
browser.closeWindow()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```






---
## switchToWindow
يُستخدم أمر Switch To Window لتحديد سياق التصفح الحالي عالي المستوى للجلسة الحالية، أي الذي سيتم استخدامه لمعالجة الأوامر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [switchWindow](/docs/api/browser/switchWindow). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>سلسلة تمثل معرف نافذة، يجب أن تكون واحدة من السلاسل التي تم إرجاعها في استدعاء getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```






---
## createWindow
إنشاء سياق تصفح جديد عالي المستوى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#new-window).



##### الاستخدام

```js
browser.createWindow(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>تعيين إلى 'tab' إذا كانت النافذة المنشأة حديثًا تشارك نافذة على مستوى نظام التشغيل مع سياق التصفح الحالي، أو 'window' خلاف ذلك.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```



##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** كائن النافذة الجديد الذي يحتوي على 'handle' بقيمة المعرف و'type' بقيمة نوع النافذة المنشأة    


---
## getWindowHandles
يرجع أمر Get Window Handles قائمة بمعرفات النوافذ لكل سياق تصفح عالي المستوى مفتوح. الترتيب الذي يتم فيه إرجاع معرفات النوافذ عشوائي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-window-handles).



##### الاستخدام

```js
browser.getWindowHandles()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```



##### الإرجاع

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** مصفوفة تحتوي على قائمة معرفات النوافذ.    


---
## printPage
يقوم أمر Print Page بتحويل المستند إلى مستند PDF مرقم. __ملاحظة:__ يدعم Chrome حاليًا هذه الميزة فقط في [وضع headless](https://webdriver.io/docs/capabilities/#run-browser-headless)، انظر [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#print-page).



##### الاستخدام

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اتجاه الصفحة. الافتراضي: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>مقياس الصفحة. الافتراضي: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>خلفية الصفحة. الافتراضي: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عرض الصفحة بالسنتيمتر. الافتراضي: `21.59` من الصفحة</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>ارتفاع الصفحة بالسنتيمتر. الافتراضي: `27.94` من الصفحة</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>هامش الصفحة بالسنتيمتر من الهامش العلوي. الافتراضي: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>هامش الصفحة بالسنتيمتر من الهامش السفلي. الافتراضي: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>هامش الصفحة بالسنتيمتر من الهامش الأيسر. الافتراضي: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>هامش الصفحة بالسنتيمتر من الهامش الأيمن. الافتراضي: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>تصغير ملف PDF ليناسب الصفحة. الافتراضي: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object[]</td>
      <td>نطاقات الصفحة. الافتراضي `[]`</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** تمثيل PDF المرمز بـ base64 للمستند المرقم.    


---
## switchToFrame
يُستخدم أمر Switch To Frame لتحديد سياق التصفح الحالي عالي المستوى أو سياق تصفح فرعي لسياق التصفح الحالي لاستخدامه كسياق تصفح حالي للأوامر اللاحقة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

هذا الأمر البروتوكولي مهمل<br />هذا الأمر مهمل ونشجع الجميع على استخدام `switchFrame` بدلاً من ذلك للتبديل بين الإطارات. اقرأ المزيد عن هذا الأمر على https://webdriver.io/docs/api/browser/switchFrame.
:::



##### الاستخدام

```js
browser.switchToFrame(id)
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
      <td>number, object, null</td>
      <td>واحد من ثلاثة أنواع محتملة: null: هذا يمثل سياق التصفح عالي المستوى (أي، ليس iframe)، رقم، يمثل فهرس كائن النافذة المقابل للإطار، كائن عنصر تم استلامه باستخدام `findElement`.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```






---
## switchToParentFrame
يقوم أمر Switch to Parent Frame بتعيين سياق التصفح الحالي للأوامر المستقبلية إلى الأصل لسياق التصفح الحالي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).



##### الاستخدام

```js
browser.switchToParentFrame()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```






---
## getWindowRect
يرجع أمر Get Window Rect حجم وموضع نافذة نظام التشغيل المقابلة لسياق التصفح الحالي عالي المستوى على الشاشة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [getWindowSize](/docs/api/browser/getWindowSize). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.getWindowRect()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```



##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "مستطيل النافذة". يحتوي هذا على 4 خصائص: `x`، `y`، `width`، و`height`.    


---
## setWindowRect
يقوم أمر Set Window Rect بتغيير حجم وموضع نافذة نظام التشغيل المقابلة لسياق التصفح الحالي عالي المستوى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [setWindowSize](/docs/api/browser/setWindowSize). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.setWindowRect(x, y, width, height)
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
      <td><code><var>x</var></code></td>
      <td>number, null</td>
      <td>خاصية screenX لكائن النافذة</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>خاصية screenY لكائن النافذة</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>عرض الأبعاد الخارجية لسياق التصفح عالي المستوى، بما في ذلك شريط المتصفح وما إلى ذلك...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>ارتفاع الأبعاد الخارجية لسياق التصفح عالي المستوى، بما في ذلك شريط المتصفح وما إلى ذلك...</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```



##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "مستطيل النافذة" استنادًا إلى حالة النافذة الجديدة.    


---
## maximizeWindow
يستدعي أمر Maximize Window عملية "تكبير" محددة لمدير النوافذ، إن وجدت، على النافذة التي تحتوي على سياق التصفح الحالي عالي المستوى. هذا عادة ما يزيد النافذة إلى الحجم الأقصى المتاح دون الدخول في وضع ملء الشاشة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-maximize-window).



##### الاستخدام

```js
browser.maximizeWindow()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```



##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "مستطيل النافذة" استنادًا إلى حالة النافذة الجديدة.    


---
## minimizeWindow
يستدعي أمر Minimize Window عملية "تصغير" محددة لمدير النوافذ، إن وجدت، على النافذة التي تحتوي على سياق التصفح الحالي عالي المستوى. هذا عادة ما يخفي النافذة في شريط النظام.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-minimize-window).



##### الاستخدام

```js
browser.minimizeWindow()
```




##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "مستطيل النافذة" لسياق التصفح (الجديد) الحالي عالي المستوى.    


---
## fullscreenWindow
يستدعي أمر Fullscreen Window عملية "ملء الشاشة" المحددة لمدير النوافذ، إن وجدت، على النافذة التي تحتوي على سياق التصفح الحالي عالي المستوى. هذا عادة ما يزيد النافذة إلى حجم العرض الفعلي ويمكن أن يخفي عناصر واجهة المتصفح مثل شريط الأدوات.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-fullscreen-window).



##### الاستخدام

```js
browser.fullscreenWindow()
```




##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "مستطيل النافذة" لسياق التصفح (الجديد) الحالي عالي المستوى.    


---
## findElement
يستخدم أمر Find Element للعثور على عنصر في سياق التصفح الحالي يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO موسع.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [$](/docs/api/browser/$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>إستراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيتم استخدامه للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```



##### الإرجاع

- **&lt;object&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر، مثل `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElementFromShadowRoot
يُستخدم أمر Find Element From Shadow Root للعثور على عنصر داخل جذر الظل لعنصر يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO موسع.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [shadow$](/docs/api/element/shadow$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>معرف عنصر لعنصر جذر الظل</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>إستراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيتم استخدامه للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```



##### الإرجاع

- **&lt;object&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن ظل عنصر، مثل `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElements
يستخدم أمر Find Elements للعثور على عناصر في سياق التصفح الحالي يمكن استخدامها للأوامر المستقبلية. يعيد هذا الأمر مصفوفة من تمثيل JSON للعناصر التي يمكن تمريرها إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO موسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [$$](/docs/api/browser/$$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>إستراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيتم استخدامه للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```



##### الإرجاع

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** قائمة JSON (قد تكون فارغة) من تمثيلات كائن العنصر، مثل `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.    


---
## findElementsFromShadowRoot
يُستخدم أمر Find Elements للعثور على عناصر داخل جذر الظل لعنصر يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر مصفوفة من تمثيل JSON للعناصر التي يمكن تمريرها إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO موسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [shadow$$](/docs/api/element/shadow$$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>معرف عنصر لعنصر جذر الظل</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>إستراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيتم استخدامه للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```



##### الإرجاع

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** قائمة JSON (قد تكون فارغة) من تمثيلات كائن العنصر، مثل `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElementFromElement
يُستخدم أمر Find Element From Element للعثور على عنصر من عنصر ويب في سياق التصفح الحالي يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO موسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [$](/docs/api/element/$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>إستراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيتم استخدامه للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```



##### الإرجاع

- **&lt;object&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر، مثل `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElementsFromElement
يُستخدم أمر Find Elements From Element للعثور على عناصر من عنصر ويب في سياق التصفح الحالي يمكن استخدامها للأوامر المستقبلية. يعيد هذا الأمر مصفوفة من تمثيل JSON للعناصر التي يمكن تمريرها إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO موسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [$$](/docs/api/element/$$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>إستراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيتم استخدامه للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```



##### الإرجاع

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** قائمة JSON (قد تكون فارغة) من تمثيلات كائن العنصر، مثل `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.    


---
## getElementShadowRoot
احصل على كائن جذر الظل لعنصر. يمكن استخدام كائن النتيجة لجلب العناصر داخل جذر الظل هذا باستخدام findElementFromShadowRoots أو findElementsFromShadowRoots على سبيل المثال.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [shadow$](/docs/api/element/shadow$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.getElementShadowRoot(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** تمثيل JSON لجذر ظل عنصر، مثل `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## getActiveElement
يعيد Get Active Element العنصر النشط لعنصر المستند الخاص بسياق التصفح الحالي. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO موسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-active-element).



##### الاستخدام

```js
browser.getActiveElement()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر، مثل `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## isElementSelected
يحدد Is Element Selected ما إذا كان العنصر المشار إليه محددًا أم لا. هذه العملية لها معنى فقط على عناصر الإدخال من حالة مربع الاختيار وزر الراديو، أو عناصر الخيار.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [isSelected](/docs/api/element/isSelected). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.isElementSelected(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```



##### الإرجاع

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` أو `false` بناءً على حالة التحديد.    


---
## isElementDisplayed
يحدد Is Element Displayed رؤية عنصر ما والتي يتم توجيهها بما هو مرئي إدراكيًا للعين البشرية. في هذا السياق، لا ترتبط رؤية العنصر بخصائص النمط `visibility` أو `display`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#element-displayedness).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [isDisplayed](/docs/api/element/isDisplayed). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.isElementDisplayed(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```



##### الإرجاع

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` أو `false` بناءً على حالة الرؤية.    


---
## getElementAttribute
سيعيد أمر Get Element Attribute سمة عنصر ويب.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [getAttribute](/docs/api/element/getAttribute). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>اسم قيمة السمة المراد استردادها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** السمة المسماة للعنصر.    


---
## getElementProperty
سيقوم أمر Get Element Property بإرجاع نتيجة الحصول على خاصية عنصر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [getProperty](/docs/api/element/getProperty). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>اسم خاصية السمة المراد استردادها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>property</var></code>:** الخاصية المسماة للعنصر، التي تم الوصول إليها عن طريق استدعاء GetOwnProperty على كائن العنصر.    


---
## getElementCSSValue
يسترجع أمر Get Element CSS Value القيمة المحسوبة لخاصية CSS المعطاة للعنصر الويب المعطى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [getCSSProperty](/docs/api/element/getCSSProperty). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>اسم خاصية CSS المراد استردادها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** القيمة المحسوبة للمعلمة المقابلة لاسم الخاصية من إعلانات نمط العنصر (ما لم يكن نوع المستند هو xml، وفي هذه الحالة تكون قيمة الإرجاع ببساطة سلسلة فارغة).    


---
## getElementText
يهدف أمر Get Element Text إلى إرجاع نص العنصر "كما يتم عرضه". يستخدم أيضًا نص العنصر المعروض لتحديد موقع العناصر بواسطة نص الرابط الخاص بهم ونص الرابط الجزئي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-text).



##### الاستخدام

```js
browser.getElementText(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>text</var></code>:** النص المرئي للعنصر (بما في ذلك العناصر الفرعية)، باتباع الخوارزمية المحددة في Selenium Atoms لـ [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).    


---
## getElementTagName
يعيد أمر Get Element Tag Name اسم العنصر المؤهل لعنصر الويب المعطى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [getTagName](/docs/api/element/getTagName). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.getElementTagName(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>text</var></code>:** سمة tagName للعنصر.    


---
## getElementRect
يعيد أمر Get Element Rect أبعاد وإحداثيات عنصر الويب المعطى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

هذا الأمر البروتوكولي مدمج في الطرق المريحة التالية: [getSize](/docs/api/element/getSize)، [getLocation](/docs/api/element/getLocation). يوصى باستخدام هذه الأوامر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.getElementRect(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```



##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** كائن JSON يمثل موضع ومستطيل الحدود للعنصر.    


---
## isElementEnabled
يحدد Is Element Enabled ما إذا كان العنصر المشار إليه ممكّنًا أم لا. هذه العملية لها معنى فقط في عناصر التحكم في النموذج.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [isEnabled](/docs/api/element/isEnabled). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.isElementEnabled(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```



##### الإرجاع

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** إذا كان العنصر في مستند xml، أو كان عنصر تحكم نموذج معطلًا: `false`، وإلا `true`.    


---
## elementClick
يقوم أمر Element Click بالتمرير إلى العرض للعنصر إذا لم يكن قابلاً للتفاعل بالمؤشر بالفعل، وينقر على نقطة المركز المرئية الخاصة به. إذا كانت نقطة مركز العنصر محجوبة بواسطة عنصر آخر، يتم إرجاع خطأ اعتراض نقرة العنصر. إذا كان العنصر خارج إطار العرض، يتم إرجاع خطأ عنصر غير قابل للتفاعل.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [click](/docs/api/element/click). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.elementClick(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```






---
## elementClear
يقوم أمر Element Clear بالتمرير إلى العرض لعنصر قابل للتحرير أو إعادة الضبط ثم يحاول مسح الملفات المحددة أو محتوى النص الخاص به.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [clearValue](/docs/api/element/clearValue). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.elementClear(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```






---
## elementSendKeys
يقوم أمر Element Send Keys بالتمرير إلى العرض لعنصر التحكم في النموذج ثم يرسل المفاتيح المقدمة إلى العنصر. في حالة عدم قابلية العنصر للتفاعل مع لوحة المفاتيح، يتم إرجاع خطأ عنصر غير قابل للتفاعل.<br /><br />يمكن مسح حالة إدخال المفتاح المستخدمة للإدخال في منتصف "الكتابة" عن طريق إرسال المفتاح الفارغ، وهو U+E000 (NULL).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

هذا الأمر البروتوكولي مدمج في الطرق المريحة التالية: [addValue](/docs/api/element/addValue)، [setValue](/docs/api/element/setValue). يوصى باستخدام هذه الأوامر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.elementSendKeys(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>سلسلة لإرسالها كضربات مفاتيح إلى العنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```






---
## getPageSource
يعيد أمر Get Page Source تسلسل سلسلة لـ DOM لمستند سياق التصفح الحالي النشط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-page-source).



##### الاستخدام

```js
browser.getPageSource()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** DOM لمستند سياق التصفح الحالي النشط    


---
## executeScript
ينفذ أمر Execute Script دالة JavaScript في سياق سياق التصفح الحالي ويعيد قيمة الإرجاع للدالة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [execute](/docs/api/browser/execute). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>سلسلة، جسم دالة JavaScript التي تريد تنفيذها</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>مصفوفة من قيم JSON التي سيتم فك تسلسلها وتمريرها كوسائط لدالتك</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```



##### الإرجاع

- **&lt;*&gt;**
            **<code><var>result</var></code>:** إما قيمة الإرجاع لنصك البرمجي، أو وفاء الوعد الذي أعاده نصك البرمجي، أو الخطأ الذي كان سبب رفض الوعد المرتجع من نصك البرمجي.    


---
## executeAsyncScript
يتسبب أمر Execute Async Script في تنفيذ JavaScript كدالة مجهولة. على عكس أمر Execute Script، يتم تجاهل نتيجة الدالة. بدلاً من ذلك، يتم توفير وسيطة إضافية كوسيطة نهائية للدالة. هذه دالة، عند استدعائها، تعيد الوسيطة الأولى كاستجابة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المريحة التالية: [executeAsync](/docs/api/browser/executeAsync). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>سلسلة، جسم دالة JavaScript التي تريد تنفيذها</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>مصفوفة من قيم JSON التي سيتم فك تسلسلها وتمريرها كوسائط لدالتك</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```



##### الإرجاع

- **&lt;*&gt;**
            **<code><var>result</var></code>:** إما قيمة الإرجاع لنصك البرمجي، أو وفاء الوعد الذي أعاده نصك البرمجي، أو الخطأ الذي كان سبب رفض الوعد المرتجع من نصك البرمجي.    


---
## getAllCookies
يُرجع أمر Get All Cookies جميع ملفات تعريف الارتباط المرتبطة بعنوان المستند النشط لسياق التصفح الحالي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-all-cookies).



##### الاستخدام

```js
browser.getAllCookies()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```



##### الإرجاع

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** قائمة من ملفات تعريف الارتباط المسلسلة. كل ملف تعريف ارتباط مسلسل له عدد من الحقول الاختيارية التي قد يتم إرجاعها أو لا يتم إرجاعها بالإضافة إلى `name` و`value`.    


---
## addCookie
يضيف أمر Add Cookie ملف تعريف ارتباط واحد إلى مخزن ملفات تعريف الارتباط المرتبطة بعنوان المستند النشط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).



##### الاستخدام

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>كائن JSON يمثل ملف تعريف ارتباط. يجب أن يكون لديه على الأقل حقول الاسم والقيمة ويمكن أن يكون لديه المزيد، بما في ذلك وقت انتهاء الصلاحية وما إلى ذلك</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```






---
## deleteAllCookies
يسمح أمر Delete All Cookies بحذف جميع ملفات تعريف الارتباط المرتبطة بعنوان المستند النشط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).



##### الاستخدام

```js
browser.deleteAllCookies()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```






---
## getNamedCookie
يعيد أمر Get Named Cookie ملف تعريف الارتباط بالاسم المطلوب من ملفات تعريف الارتباط المرتبطة في مخزن ملفات تعريف الارتباط للمستند النشط لسياق التصفح الحالي. إذا لم يتم العثور على ملف تعريف ارتباط، يتم إرجاع خطأ بأنه لا يوجد ملف تعريف ارتباط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-named-cookie).



##### الاستخدام

```js
browser.getNamedCookie(name)
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
      <td>String</td>
      <td>اسم ملف تعريف الارتباط المراد استرداده</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```



##### الإرجاع

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** ملف تعريف ارتباط مسلسل، مع حقول الاسم والقيمة. هناك عدد من الحقول الاختيارية مثل `path` و`domain` و`expiry-time` التي قد تكون موجودة أيضًا.    


---
## deleteCookie
يسمح لك أمر Delete Cookie بحذف إما ملف تعريف ارتباط واحد بواسطة اسم المعلمة، أو جميع ملفات تعريف الارتباط المرتبطة بعنوان المستند النشط إذا كان الاسم غير محدد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-delete-cookie).



##### الاستخدام

```js
browser.deleteCookie(name)
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
      <td>String</td>
      <td>اسم ملف تعريف الارتباط المراد حذفه</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```






---
## performActions
يستخدم أمر Perform Actions لتنفيذ إجراءات المستخدم المعقدة. راجع [المواصفات](https://github.com/jlipps/simple-wd-spec#perform-actions) لمزيد من التفاصيل.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-perform-actions).



##### الاستخدام

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>قائمة من الكائنات، كل منها يمثل مصدر إدخال والإجراءات المرتبطة به</td>
    </tr>
  </tbody>
</table>





---
## releaseActions
يستخدم أمر Release Actions لتحرير جميع المفاتيح وأزرار المؤشر المضغوطة حاليًا. يتسبب هذا في إطلاق أحداث كما لو تم تحرير الحالة بواسطة سلسلة صريحة من الإجراءات. كما أنه يمسح كل الحالة الداخلية للأجهزة الافتراضية.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-release-actions).



##### الاستخدام

```js
browser.releaseActions()
```







---
## dismissAlert
يقوم أمر Dismiss Alert برفض مربع حوار بسيط إذا كان موجودًا، وإلا فهو خطأ. يكون لطلب رفض مطالبة تنبيه المستخدم، والتي قد لا يكون لها بالضرورة زر رفض، نفس تأثير قبولها.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-dismiss-alert).



##### الاستخدام

```js
browser.dismissAlert()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```






---
## acceptAlert
يقبل أمر Accept Alert مربع حوار بسيط إذا كان موجودًا، وإلا فهو خطأ.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-accept-alert).



##### الاستخدام

```js
browser.acceptAlert()
```







---
## getAlertText
يعيد أمر Get Alert Text رسالة مطالبة المستخدم الحالية. إذا لم تكن هناك مطالبة مستخدم حالية، فإنه يعيد خطأ.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-alert-text).



##### الاستخدام

```js
browser.getAlertText()
```



##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```



##### الإرجاع

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** رسالة مطالبة المستخدم.    


---
## sendAlertText
يقوم أمر Send Alert Text بتعيين حقل النص لمطالبة مستخدم window.prompt إلى القيمة المعطاة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-send-alert-text).



##### الاستخدام

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>سلسلة لتعيين المطالبة عليها</td>
    </tr>
  </tbody>
</table>





---
## takeScreenshot
يأخذ أمر Take Screenshot لقطة شاشة لإطار عرض سياق التصفح العلوي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-take-screenshot).



##### الاستخدام

```js
browser.takeScreenshot()
```




##### الإرجاع

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** بيانات صورة PNG المرمزة بـ base64 التي تشكل لقطة شاشة لإطار العرض الأولي.    


---
## takeElementScreenshot
يأخذ أمر Take Element Screenshot لقطة شاشة للمنطقة المرئية التي يشملها المستطيل المحيط بعنصر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).



##### الاستخدام

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>التمرير لعرض العنصر. الافتراضي: true</td>
    </tr>
  </tbody>
</table>


##### الإرجاع

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** بيانات صورة PNG المرمزة بـ base64 التي تشكل لقطة شاشة للمنطقة المرئية من مستطيل العنصر المحيط بعد أن تم التمرير لعرضه.    


---
## getElementComputedRole
الحصول على دور WAI-ARIA المحسوب لعنصر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#get-computed-role).



##### الاستخدام

```js
browser.getElementComputedRole(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### الإرجاع

- **&lt;string&gt;**
            **<code><var>role</var></code>:** نتيجة حساب دور WAI-ARIA للعنصر.    


---
## getElementComputedLabel
الحصول على الاسم الذي يمكن الوصول إليه للعنصر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#get-computed-label).



##### الاستخدام

```js
browser.getElementComputedLabel(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### الإرجاع

- **&lt;string&gt;**
            **<code><var>label</var></code>:** نتيجة حساب الاسم والوصف الذي يمكن الوصول إليه للاسم الذي يمكن الوصول إليه للعنصر.    


---
## setPermissions
يحاكي تعديل المستخدم لحالة إذن PermissionDescriptor. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/permissions/#set-permission-command).



##### الاستخدام

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>لكل ميزة قوية جانب واحد أو أكثر يمكن للمواقع طلب الإذن للوصول إليها. لوصف هذه الجوانب، تحدد كل ميزة نوعًا فرعيًا من PermissionDescriptor ليكون نوع واصف الإذن الخاص بها. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>يحدد ما إذا كان الإذن ممنوحًا أو مرفوضًا أو مطالبًا به.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>ما إذا كان سيتم تطبيق الأذونات على جميع سياقات التنفيذ أم لا.</td>
    </tr>
  </tbody>
</table>

##### أمثلة


```js
// تعيين أذونات midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // يمكن أن تكون أيضًا "denied" أو "prompt"
);
```


```js
// تعيين أذونات الحافظة
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// الآن يمكنك قراءة الحافظة عبر، على سبيل المثال
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```





---
## generateTestReport
ينشئ تقريرًا للاختبار. امتداد لـ [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/reporting/#automation).



##### الاستخدام

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>الرسالة التي سيتم عرضها في التقرير.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>يحدد مجموعة نقطة النهاية لتسليم التقرير إليها.</td>
    </tr>
  </tbody>
</table>





---
## createMockSensor
ينشئ مستشعرًا وهميًا لمحاكاة أجهزة استشعار مثل مستشعر الضوء المحيط. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#create-mock-sensor-command).



##### الاستخدام

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>نوع واجهة برمجة تطبيقات المستشعر للمحاكاة، مثل 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>رقم مزدوج يمثل التردد بالهرتز ويستخدم لتعيين الحد الأقصى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>رقم مزدوج يمثل التردد بالهرتز ويستخدم لتعيين الحد الأدنى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
  </tbody>
</table>





---
## getMockSensor
يسترجع معلومات حول نوع معين من المستشعر الوهمي. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#get-mock-sensor-command).



##### الاستخدام

```js
browser.getMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>نوع المستشعر الوهمي لاسترجاع المعلومات منه.</td>
    </tr>
  </tbody>
</table>


##### الإرجاع

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** قيم قراءة المستشعر الوهمي.    


---
## updateMockSensor
يحدث نوع المستشعر الوهمي. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).



##### الاستخدام

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>نوع المستشعر الوهمي لتحديث المعلومات له.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>نوع واجهة برمجة تطبيقات المستشعر للمحاكاة، مثل 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>رقم مزدوج يمثل التردد بالهرتز ويستخدم لتعيين الحد الأقصى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>رقم مزدوج يمثل التردد بالهرتز ويستخدم لتعيين الحد الأدنى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
  </tbody>
</table>





---
## deleteMockSensor
يغلق أمر Delete Session أي سياق تصفح عالي المستوى مرتبط بالجلسة الحالية، وينهي الاتصال، وأخيرًا يغلق الجلسة الحالية. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#delete-mock-sensor-command).



##### الاستخدام

```js
browser.deleteMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>نوع المستشعر الوهمي المراد حذفه.</td>
    </tr>
  </tbody>
</table>





---
## setTimeZone
يحاكي تغيير المنطقة الزمنية لأغراض الاختبار. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#create-mock-sensor-command).



##### الاستخدام

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>اسم المنطقة الزمنية، مثل Asia/Tokyo</td>
    </tr>
  </tbody>
</table>





---
## addVirtualAuthenticator
ينشئ [مصادق افتراضي](https://www.w3.org/TR/webauthn-2/#virtual-authenticators) برمجي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator).



##### الاستخدام

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>القيم الصالحة: 'ctap1/u2f'، 'ctap2'، 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>القيم الصالحة: 'usb'، 'nfc'، 'ble' أو 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>القيم الصالحة: true، false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>القيم الصالحة: true، false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>القيم الصالحة: true، false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>القيم الصالحة: مصفوفة تحتوي على معرفات الامتداد.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string[]</td>
      <td>القيم الصالحة: ما يصل إلى 3 إدخالات لطريقة التحقق من المستخدم.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### الإرجاع

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** يعيد معرف سلسلة المصادق.    


---
## removeVirtualAuthenticator
يزيل مصادقًا افتراضيًا تم إنشاؤه مسبقًا.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).



##### الاستخدام

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>معرف المصادق</td>
    </tr>
  </tbody>
</table>





---
## addCredential
يحقن مصدر بيانات اعتماد المفتاح العام في مصادق افتراضي موجود.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).



##### الاستخدام

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>معرف المصادق</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>معرف بيانات الاعتماد المرمز باستخدام ترميز Base64url.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>إذا تم تعيينه إلى true، يتم إنشاء بيانات اعتماد قابلة للاكتشاف من جانب العميل. إذا تم تعيينه إلى false، يتم إنشاء بيانات اعتماد من جانب الخادم بدلاً من ذلك.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>معرف الطرف المعتمد الذي تقتصر عليه بيانات الاعتماد.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>حزمة مفتاح غير متماثل تحتوي على مفتاح خاص واحد لكل [RFC5958]، مرمزة باستخدام ترميز Base64url.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>معالج المستخدم المرتبط ببيانات الاعتماد المرمزة باستخدام ترميز Base64url. قد لا يتم تعريف هذه الخاصية.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>القيمة الأولية لعداد التوقيع المرتبط بمصدر بيانات اعتماد المفتاح العام.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>الكتلة الكبيرة، لكل بيانات اعتماد المرتبطة بمصدر بيانات اعتماد المفتاح العام، مرمزة باستخدام ترميز Base64url. قد لا يتم تعريف هذه الخاصية.</td>
    </tr>
  </tbody>
</table>





---
## getCredentials
يعيد كائن معلمات بيانات الاعتماد واحد لكل مصدر بيانات اعتماد المفتاح العام المخزن في مصادق افتراضي، بغض النظر عما إذا كانت مخزنة باستخدام Add Credential أو `navigator.credentials.create()`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).



##### الاستخدام

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>معرف المصادق</td>
    </tr>
  </tbody>
</table>


##### الإرجاع

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** يعيد مصفوفة من بيانات الاعتماد.    


---
## removeAllCredentials
يزيل جميع مصادر بيانات اعتماد المفتاح العام المخزنة على مصادق افتراضي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).



##### الاستخدام

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>معرف المصادق</td>
    </tr>
  </tbody>
</table>





---
## removeCredential
يزيل مصدر بيانات اعتماد المفتاح العام المخزن على مصادق افتراضي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).



##### الاستخدام

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>معرف المصادق</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>معرف بيانات الاعتماد</td>
    </tr>
  </tbody>
</table>





---
## setUserVerified
يقوم أمر امتداد Set User Verified بتعيين خاصية isUserVerified على المصادق الافتراضي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).



##### الاستخدام

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>معرف المصادق</td>
    </tr>
  </tbody>
</table>




