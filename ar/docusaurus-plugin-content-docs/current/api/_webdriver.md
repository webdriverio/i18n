---
id: webdriver
title: بروتوكول WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
أمر New Session ينشئ جلسة WebDriver جديدة مع عقدة نهاية الطرف. إذا فشل الإنشاء، يتم إرجاع خطأ session not created.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-new-sessions).

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


##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** كائن يحتوي على sessionId وقدرات جلسة WebDriver التي تم إنشاؤها.


---

## deleteSession
أمر Delete Session يغلق أي سياقات تصفح على المستوى الأعلى مرتبطة بالجلسة الحالية، وينهي الاتصال، وأخيرًا يغلق الجلسة الحالية.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-delete-session).

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
أمر Status يعيد معلومات حول ما إذا كان الطرف البعيد في حالة يمكنه فيها إنشاء جلسات جديدة ويمكن أن يتضمن أيضًا معلومات تعريف اعتباطية خاصة بالتنفيذ.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-status).

##### الاستخدام

```js
browser.status()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** كائن يحتوي على حالة السائق.


---

## getTimeouts
أمر Get Timeouts يحصل على مدد المهلة المرتبطة بالجلسة الحالية.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-timeouts).

##### الاستخدام

```js
browser.getTimeouts()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** كائن يحتوي على مدد المهلة لـ `script`، و `pageLoad`، و `implicit`.


---

## setTimeouts
أمر Set Timeouts يضبط مدد المهلة المرتبطة بالجلسة الحالية. المهل التي يمكن التحكم بها مدرجة في جدول مهل الجلسة أدناه.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-set-timeouts).

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
      <td>عدد صحيح بالمللي ثانية لمهلة الانتظار الضمني للجلسة</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عدد صحيح بالمللي ثانية لمهلة تحميل الصفحة للجلسة</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عدد صحيح بالمللي ثانية لمهلة النص البرمجي للجلسة</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
أمر Get Current URL يُرجع عنوان URL لسياق التصفح الحالي على المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-current-url).

##### الاستخدام

```js
browser.getUrl()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>url</var></code>:** عنوان URL للوثيقة النشطة في سياق التصفح الحالي على المستوى الأعلى


---

## navigateTo
أمر navigateTo (go) يُستخدم لجعل وكيل المستخدم ينتقل بسياق التصفح الحالي على المستوى الأعلى إلى موقع جديد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [url](/docs/api/browser/url). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>سلسلة تمثل عنوان URL مطلق (يبدأ بـ http(s))، وقد يتضمن جزء (#...)، كما يمكن أن يكون مخططًا محليًا (about: إلخ)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
أمر Back يجعل المتصفح ينتقل خطوة واحدة للخلف في تاريخ الجلسة المشترك لسياق التصفح الحالي على المستوى الأعلى. هذا مكافئ للضغط على زر الرجوع في واجهة المتصفح أو استدعاء `window.history.back`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-back).

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
أمر Forward يجعل المتصفح ينتقل خطوة واحدة للأمام في تاريخ الجلسة المشترك لسياق التصفح الحالي على المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-forward).

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
أمر Refresh يجعل المتصفح يعيد تحميل الصفحة في سياق التصفح الحالي على المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-refresh).

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
أمر Get Title يعيد عنوان المستند لسياق التصفح الحالي على المستوى الأعلى، ما يعادل استدعاء `document.title`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-title).

##### الاستخدام

```js
browser.getTitle()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>title</var></code>:** يعيد سلسلة نصية مماثلة لـ `document.title` لسياق التصفح الحالي على المستوى الأعلى.


---

## getWindowHandle
أمر Get Window Handle يعيد مقبض النافذة لسياق التصفح الحالي على المستوى الأعلى. يمكن استخدامه كمعامل لـ Switch To Window.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-window-handle).

##### الاستخدام

```js
browser.getWindowHandle()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** يعيد سلسلة نصية وهي مقبض النافذة لسياق التصفح الحالي على المستوى الأعلى.


---

## closeWindow
أمر Close Window يغلق سياق التصفح الحالي على المستوى الأعلى. بمجرد الانتهاء، إذا لم تكن هناك سياقات تصفح أخرى على المستوى الأعلى مفتوحة، يتم إغلاق جلسة WebDriver نفسها.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-close-window).

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
أمر Switch To Window يُستخدم لتحديد سياق التصفح الحالي على المستوى الأعلى للجلسة الحالية، أي الذي سيتم استخدامه لمعالجة الأوامر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [switchWindow](/docs/api/browser/switchWindow). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>سلسلة نصية تمثل مقبض نافذة، يجب أن تكون إحدى السلاسل التي تم إرجاعها في استدعاء getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
إنشاء سياق تصفح جديد على المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#new-window).

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
      <td>تعيين إلى 'tab' إذا كانت النافذة المنشأة حديثًا تشارك نافذة على مستوى نظام التشغيل مع سياق التصفح الحالي، أو 'window' بخلاف ذلك.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** كائن النافذة الجديد يحتوي على 'handle' بقيمة المقبض و 'type' بقيمة نوع النافذة المنشأة


---

## getWindowHandles
أمر Get Window Handles يعيد قائمة بمقابض النوافذ لكل سياق تصفح مفتوح على المستوى الأعلى. الترتيب الذي يتم به إرجاع مقابض النوافذ هو اعتباطي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-window-handles).

##### الاستخدام

```js
browser.getWindowHandles()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### القيمة المرجعة

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** مصفوفة تحتوي على قائمة بمقابض النوافذ.


---

## printPage
أمر Print Page يعرض المستند في مستند PDF مقسم إلى صفحات. __ملاحظة:__ يدعم Chrome حاليًا هذا فقط في [وضع headless](https://webdriver.io/docs/capabilities/#run-browser-headless)، انظر [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#print-page).

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
      <td>تقليص ملف PDF ليناسب الصفحة. الافتراضي: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object[]</td>
      <td>نطاقات الصفحات. الافتراضي `[]`</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** تمثيل PDF المشفر بالـ base64 للمستند المقسم إلى صفحات.


---

## switchToFrame
أمر Switch To Frame يُستخدم لتحديد سياق التصفح الحالي على المستوى الأعلى أو سياق تصفح فرعي لسياق التصفح الحالي لاستخدامه كسياق تصفح حالي للأوامر اللاحقة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

هذا الأمر البروتوكولي مهمل<br />هذا الأمر مهمل ونشجع الجميع على استخدام `switchFrame` بدلاً منه للتبديل إلى الإطارات. اقرأ المزيد عن هذا الأمر على https://webdriver.io/docs/api/browser/switchFrame.
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
      <td>واحد من ثلاثة أنواع ممكنة: null: يمثل هذا سياق التصفح على المستوى الأعلى (أي ليس إطار iframe)، عدد، يمثل فهرس كائن النافذة المقابل للإطار، كائن Element تم استلامه باستخدام `findElement`.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
أمر Switch to Parent Frame يعين سياق التصفح الحالي للأوامر المستقبلية إلى الأصل لسياق التصفح الحالي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).

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
أمر Get Window Rect يعيد حجم وموضع نافذة نظام التشغيل المقابلة لسياق التصفح الحالي على المستوى الأعلى على الشاشة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [getWindowSize](/docs/api/browser/getWindowSize). يوصى باستخدام هذا الأمر بدلاً من ذلك.

:::


##### الاستخدام

```js
browser.getWindowRect()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect". يحتوي هذا على 4 خصائص: `x`، `y`، `width` و `height`.


---

## setWindowRect
أمر Set Window Rect يغير حجم وموضع نافذة نظام التشغيل المقابلة لسياق التصفح الحالي على المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [setWindowSize](/docs/api/browser/setWindowSize). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>سمة screenX لكائن النافذة</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>سمة screenY لكائن النافذة</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>عرض الأبعاد الخارجية لسياق التصفح على المستوى الأعلى، بما في ذلك واجهة المتصفح وما إلى ذلك...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>ارتفاع الأبعاد الخارجية لسياق التصفح على المستوى الأعلى، بما في ذلك واجهة المتصفح وما إلى ذلك...</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect" استنادًا إلى حالة النافذة الجديدة.


---

## maximizeWindow
أمر Maximize Window يستدعي عملية "تكبير" المحددة لمدير النوافذ، إن وجدت، على النافذة التي تحتوي على سياق التصفح الحالي على المستوى الأعلى. عادة ما يزيد هذا من حجم النافذة إلى الحد الأقصى المتاح دون الدخول في وضع ملء الشاشة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-maximize-window).

##### الاستخدام

```js
browser.maximizeWindow()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect" استنادًا إلى حالة النافذة الجديدة.


---

## minimizeWindow
أمر Minimize Window يستدعي عملية "تصغير" المحددة لمدير النوافذ، إن وجدت، على النافذة التي تحتوي على سياق التصفح الحالي على المستوى الأعلى. عادة ما يخفي هذا النافذة في شريط النظام.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-minimize-window).

##### الاستخدام

```js
browser.minimizeWindow()
```


##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect" لسياق التصفح الحالي (الجديد) على المستوى الأعلى.


---

## fullscreenWindow
أمر Fullscreen Window يستدعي عملية "ملء الشاشة" المحددة لمدير النوافذ، إن وجدت، على النافذة التي تحتوي على سياق التصفح الحالي على المستوى الأعلى. عادة ما يزيد هذا من حجم النافذة إلى حجم العرض المادي ويمكن أن يخفي عناصر واجهة المتصفح مثل شريط الأدوات.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-fullscreen-window).

##### الاستخدام

```js
browser.fullscreenWindow()
```


##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect" لسياق التصفح الحالي (الجديد) على المستوى الأعلى.


---

## findElement
يُستخدم أمر Find Element للعثور على عنصر في سياق التصفح الحالي الذي يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO ممتد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [$](/docs/api/browser/$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>استراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيستخدم للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### القيمة المرجعة

- **&lt;object&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromShadowRoot
يُستخدم أمر Find Element From Shadow Root للعثور على عنصر داخل جذر الظل لعنصر يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO ممتد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [shadow$](/docs/api/element/shadow$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>استراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيستخدم للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### القيمة المرجعة

- **&lt;object&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر ظل، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElements
يُستخدم أمر Find Elements للعثور على عناصر في سياق التصفح الحالي التي يمكن استخدامها للأوامر المستقبلية. يعيد هذا الأمر مصفوفة من تمثيل JSON للعناصر التي يمكن تمريرها إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO ممتد (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [$$](/docs/api/browser/$$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>استراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيستخدم للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### القيمة المرجعة

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** قائمة JSON (قد تكون فارغة) من تمثيلات كائن عنصر، على سبيل المثال `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## findElementsFromShadowRoot
يُستخدم أمر Find Elements للعثور على عناصر داخل جذر الظل لعنصر يمكن استخدامها للأوامر المستقبلية. يعيد هذا الأمر مصفوفة من تمثيل JSON للعناصر التي يمكن تمريرها إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO ممتد (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [shadow$$](/docs/api/element/shadow$$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>استراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيستخدم للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### القيمة المرجعة

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** قائمة JSON (قد تكون فارغة) من تمثيلات كائن عنصر، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromElement
يُستخدم أمر Find Element From Element للعثور على عنصر من عنصر ويب في سياق التصفح الحالي يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO ممتد (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [$](/docs/api/element/$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>استراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيستخدم للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### القيمة المرجعة

- **&lt;object&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementsFromElement
يُستخدم أمر Find Elements From Element للعثور على عناصر من عنصر ويب في سياق التصفح الحالي يمكن استخدامها للأوامر المستقبلية. يعيد هذا الأمر مصفوفة من تمثيل JSON للعناصر التي يمكن تمريرها إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO ممتد (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [$$](/docs/api/element/$$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>استراتيجية تحديد موقع عنصر صالحة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>المحدد الفعلي الذي سيستخدم للعثور على عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### القيمة المرجعة

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** قائمة JSON (قد تكون فارغة) من تمثيلات كائن عنصر، على سبيل المثال `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## getElementShadowRoot
الحصول على كائن جذر الظل لعنصر. يمكن استخدام كائن النتيجة لجلب العناصر داخل جذر الظل هذا باستخدام على سبيل المثال findElementFromShadowRoots أو findElementsFromShadowRoots.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [shadow$](/docs/api/element/shadow$). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** تمثيل JSON لجذر ظل عنصر، على سبيل المثال `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## getActiveElement
أمر Get Active Element يعيد العنصر النشط لعنصر المستند في سياق التصفح الحالي. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO ممتد (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-active-element).

##### الاستخدام

```js
browser.getActiveElement()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## isElementSelected
أمر Is Element Selected يحدد ما إذا كان العنصر المرجعي محددًا أم لا. هذه العملية لها معنى فقط على عناصر الإدخال من حالات خانة الاختيار وزر الراديو، أو عناصر الخيار.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [isSelected](/docs/api/element/isSelected). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### القيمة المرجعة

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` أو `false` بناءً على حالة التحديد.


---

## isElementDisplayed
أمر Is Element Displayed يحدد رؤية عنصر ما والتي يتم توجيهها بما هو مرئي بصريًا للعين البشرية. في هذا السياق، لا تتعلق رؤية العنصر بخصائص نمط `visibility` أو `display`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#element-displayedness).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [isDisplayed](/docs/api/element/isDisplayed). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### القيمة المرجعة

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` أو `false` بناءً على حالة الرؤية.


---

## getElementAttribute
أمر Get Element Attribute سيعيد سمة عنصر ويب.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [getAttribute](/docs/api/element/getAttribute). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>اسم قيمة السمة المراد استرجاعها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** السمة المسماة للعنصر.


---

## getElementProperty
أمر Get Element Property سيعيد نتيجة الحصول على خاصية من عنصر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [getProperty](/docs/api/element/getProperty). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>اسم خاصية السمة المراد استرجاعها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>property</var></code>:** الخاصية المسماة للعنصر، تم الوصول إليها عن طريق استدعاء GetOwnProperty على كائن العنصر.


---

## getElementCSSValue
أمر Get Element CSS Value يسترجع القيمة المحسوبة لخاصية CSS المعطاة للعنصر الويب المعطى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [getCSSProperty](/docs/api/element/getCSSProperty). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>اسم خاصية CSS المراد استرجاعها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** القيمة المحسوبة للمعلمة المقابلة لاسم الخاصية من إعلانات نمط العنصر (ما لم يكن نوع المستند xml، وفي هذه الحالة تكون القيمة المرجعة ببساطة سلسلة فارغة).


---

## getElementText
أمر Get Element Text يهدف إلى إرجاع نص العنصر "كما هو معروض". يُستخدم أيضًا نص العنصر المعروض لتحديد موقع العناصر من خلال نص الرابط ونص الرابط الجزئي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-text).

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>text</var></code>:** النص المرئي للعنصر (بما في ذلك العناصر الفرعية)، باتباع الخوارزمية المحددة في Selenium Atoms لـ [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).


---

## getElementTagName
أمر Get Element Tag Name يعيد اسم العنصر المؤهل للعنصر الويب المعطى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [getTagName](/docs/api/element/getTagName). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>text</var></code>:** سمة tagName للعنصر.


---

## getElementRect
أمر Get Element Rect يعيد أبعاد وإحداثيات عنصر الويب المعطى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

هذا الأمر البروتوكولي مدمج في الطرق المناسبة التالية: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). يوصى باستخدام هذه الأوامر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** كائن JSON يمثل موضع ومستطيل محيط للعنصر.


---

## isElementEnabled
أمر Is Element Enabled يحدد ما إذا كان العنصر المرجعي ممكّنًا أم لا. هذه العملية لها معنى فقط على عناصر النموذج.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [isEnabled](/docs/api/element/isEnabled). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### القيمة المرجعة

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** إذا كان العنصر في مستند xml، أو كان عنصر تحكم نموذج معطل: `false`، وإلا، `true`.


---

## elementClick
أمر Element Click يمرر إلى عرض العنصر إذا لم يكن قابلاً للتفاعل بالمؤشر بالفعل، وينقر على نقطة المركز المرئية. إذا كانت نقطة مركز العنصر محجوبة بعنصر آخر، يتم إرجاع خطأ اعتراض النقر على العنصر. إذا كان العنصر خارج منطقة العرض، يتم إرجاع خطأ العنصر غير قابل للتفاعل.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [click](/docs/api/element/click). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
أمر Element Clear يمرر إلى عرض عنصر قابل للتحرير أو قابل لإعادة التعيين ثم يحاول مسح الملفات المحددة أو محتوى النص الخاص به.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [clearValue](/docs/api/element/clearValue). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
أمر Element Send Keys يمرر إلى عرض عنصر التحكم في النموذج ثم يرسل المفاتيح المقدمة إلى العنصر. في حالة عدم قابلية العنصر للتفاعل عبر لوحة المفاتيح، يتم إرجاع خطأ العنصر غير قابل للتفاعل.<br /><br />يمكن مسح حالة إدخال المفتاح المستخدمة للإدخال في منتصف "الكتابة" عن طريق إرسال المفتاح الفارغ، وهو U+E000 (NULL).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

هذا الأمر البروتوكولي مدمج في الطرق المناسبة التالية: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). يوصى باستخدام هذه الأوامر بدلاً من ذلك.

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>سلسلة نصية ترسل كضغطات مفاتيح إلى العنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
أمر Get Page Source يعيد تسلسل سلسلة من DOM للوثيقة النشطة في سياق التصفح الحالي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-page-source).

##### الاستخدام

```js
browser.getPageSource()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** DOM للوثيقة النشطة في سياق التصفح الحالي


---

## executeScript
أمر Execute Script ينفذ دالة JavaScript في سياق سياق التصفح الحالي ويعيد قيمة الإرجاع للدالة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [execute](/docs/api/browser/execute). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>سلسلة نصية، جسم وظيفة Javascript التي تريد تنفيذها</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>مصفوفة من قيم JSON التي سيتم إلغاء تسلسلها وتمريرها كوسائط لوظيفتك</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### القيمة المرجعة

- **&lt;*&gt;**
            **<code><var>result</var></code>:** إما قيمة إرجاع النص البرمجي الخاص بك، أو إتمام الوعد الذي أعاده النص البرمجي الخاص بك، أو الخطأ الذي كان سبب رفض الوعد الذي أعاده النص البرمجي الخاص بك.


---

## executeAsyncScript
أمر Execute Async Script يتسبب في تنفيذ JavaScript كدالة مجهولة. على عكس أمر Execute Script، يتم تجاهل نتيجة الدالة. بدلاً من ذلك، يتم توفير معامل إضافي كمعامل نهائي للدالة. هذه هي دالة، عند استدعائها، تعيد معاملها الأول كاستجابة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

هذا الأمر البروتوكولي مدمج في الطريقة المناسبة التالية: [executeAsync](/docs/api/browser/executeAsync). يوصى باستخدام هذا الأمر بدلاً من ذلك.

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
      <td>سلسلة نصية، جسم وظيفة Javascript التي تريد تنفيذها</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>مصفوفة من قيم JSON التي سيتم إلغاء تسلسلها وتمريرها كوسائط لوظيفتك</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### القيمة المرجعة

- **&lt;*&gt;**
            **<code><var>result</var></code>:** إما قيمة إرجاع النص البرمجي الخاص بك، أو إتمام الوعد الذي أعاده النص البرمجي الخاص بك، أو الخطأ الذي كان سبب رفض الوعد الذي أعاده النص البرمجي الخاص بك.


---

## getAllCookies
أمر Get All Cookies يعيد جميع ملفات تعريف الارتباط المرتبطة بعنوان الوثيقة النشطة لسياق التصفح الحالي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-all-cookies).

##### الاستخدام

```js
browser.getAllCookies()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### القيمة المرجعة

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** قائمة ملفات تعريف الارتباط المتسلسلة. كل ملف تعريف ارتباط متسلسل له عدد من الحقول الاختيارية التي قد يتم إرجاعها أو لا يتم إرجاعها بالإضافة إلى `name` و `value`.


---

## addCookie
أمر Add Cookie يضيف ملف تعريف ارتباط واحد إلى مخزن ملفات تعريف الارتباط المرتبط بعنوان المستند النشط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).

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
      <td>كائن JSON يمثل ملف تعريف ارتباط. يجب أن يحتوي على الأقل على حقول الاسم والقيمة ويمكن أن يحتوي على المزيد، بما في ذلك وقت انتهاء الصلاحية وما إلى ذلك</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
أمر Delete All Cookies يسمح بحذف جميع ملفات تعريف الارتباط المرتبطة بعنوان المستند النشط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).

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
أمر Get Named Cookie يعيد ملف تعريف الارتباط بالاسم المطلوب من ملفات تعريف الارتباط المرتبطة في مخزن ملفات تعريف الارتباط للوثيقة النشطة في سياق التصفح الحالي. إذا لم يتم العثور على ملف تعريف ارتباط، يتم إرجاع خطأ عدم وجود ملف تعريف ارتباط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-named-cookie).

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
      <td>اسم ملف تعريف الارتباط المراد استرجاعه</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### القيمة المرجعة

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** ملف تعريف ارتباط متسلسل، مع حقول الاسم والقيمة. هناك عدد من الحقول الاختيارية مثل `path`، و `domain`، و `expiry-time` التي قد تكون موجودة أيضًا.


---

## deleteCookie
أمر Delete Cookie يسمح لك بحذف إما ملف تعريف ارتباط واحد بواسطة اسم المعلمة، أو جميع ملفات تعريف الارتباط المرتبطة بعنوان المستند النشط إذا كان الاسم غير محدد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-delete-cookie).

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
أمر Perform Actions يُستخدم لتنفيذ إجراءات المستخدم المعقدة. انظر [المواصفات](https://github.com/jlipps/simple-wd-spec#perform-actions) لمزيد من التفاصيل.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-perform-actions).

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
أمر Release Actions يُستخدم لتحرير جميع المفاتيح وأزرار المؤشر المضغوطة حاليًا. هذا يتسبب في إطلاق أحداث كما لو أن الحالة تم تحريرها بواسطة سلسلة صريحة من الإجراءات. كما أنه يمسح جميع الحالات الداخلية للأجهزة الافتراضية.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-release-actions).

##### الاستخدام

```js
browser.releaseActions()
```



---

## dismissAlert
أمر Dismiss Alert يرفض مربع حوار بسيط إذا كان موجودًا، وإلا فإنه يعطي خطأ. طلب رفض مطالبة مستخدم التنبيه، والتي قد لا يكون لديها بالضرورة زر رفض، له نفس تأثير قبولها.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-dismiss-alert).

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
أمر Accept Alert يقبل مربع حوار بسيط إذا كان موجودًا، وإلا فإنه يعطي خطأ.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-accept-alert).

##### الاستخدام

```js
browser.acceptAlert()
```



---

## getAlertText
أمر Get Alert Text يعيد رسالة مطالبة المستخدم الحالية. إذا لم تكن هناك مطالبة مستخدم حالية، فإنه يعيد خطأ.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-alert-text).

##### الاستخدام

```js
browser.getAlertText()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** رسالة مطالبة المستخدم.


---

## sendAlertText
أمر Send Alert Text يضبط حقل النص لنافذة مطالبة المستخدم window.prompt إلى القيمة المعطاة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-send-alert-text).

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
      <td>سلسلة نصية لتعيين المطالبة إليها</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
أمر Take Screenshot يأخذ لقطة شاشة لمنطقة العرض لسياق التصفح على المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-take-screenshot).

##### الاستخدام

```js
browser.takeScreenshot()
```


##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** بيانات صورة PNG المشفرة بالـ base64 التي تشكل لقطة شاشة لمنطقة العرض الأولية.


---

## takeElementScreenshot
أمر Take Element Screenshot يأخذ لقطة شاشة للمنطقة المرئية التي يشملها المستطيل المحيط بعنصر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>التمرير لرؤية العنصر. الافتراضي: true</td>
    </tr>
  </tbody>
</table>


##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** بيانات صورة PNG المشفرة بالـ base64 التي تشكل لقطة شاشة للمنطقة المرئية من المستطيل المحيط بعنصر بعد تمريره إلى العرض.


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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### القيمة المرجعة

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
      <td>معرف العنصر الذي تم إرجاعه في استدعاء سابق إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>label</var></code>:** نتيجة حساب الاسم والوصف المتاح للاسم المتاح للعنصر.


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
      <td>تمتلك كل ميزة قوية جانبًا واحدًا أو أكثر يمكن لمواقع الويب طلب الإذن للوصول إليها. لوصف هذه الجوانب، تحدد كل ميزة نوعًا فرعيًا من PermissionDescriptor ليكون نوع واصف الإذن الخاص بها. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.</td>
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
ينشئ مستشعرًا وهميًا لمحاكاة المستشعرات مثل مستشعر الضوء المحيط. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#create-mock-sensor-command).

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
      <td>رقم مزدوج يمثل التردد بالهرتز الذي يُستخدم لتعيين الحد الأقصى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>رقم مزدوج يمثل التردد بالهرتز الذي يُستخدم لتعيين الحد الأدنى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
استرجاع معلومات حول نوع معين من المستشعر الوهمي. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#get-mock-sensor-command).

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


##### القيمة المرجعة

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** قيم قراءة المستشعر الوهمي.


---

## updateMockSensor
تحديث نوع المستشعر الوهمي. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).

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
      <td>رقم مزدوج يمثل التردد بالهرتز الذي يُستخدم لتعيين الحد الأقصى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>رقم مزدوج يمثل التردد بالهرتز الذي يُستخدم لتعيين الحد الأدنى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
أمر Delete Session يغلق أي سياقات تصفح على المستوى الأعلى مرتبطة بالجلسة الحالية، وينهي الاتصال، وأخيرًا يغلق الجلسة الحالية. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#delete-mock-sensor-command).

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
      <td>القيم الصالحة: مصفوفة تحتوي على معرفات الامتدادات.</td>
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


##### القيمة المرجعة

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** يعيد معرف سلسلة نصية للمصادق.


---

## removeVirtualAuthenticator
يزيل مصادق افتراضي تم إنشاؤه مسبقًا.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).

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
يحقن مصدر بيانات اعتماد مفتاح عام في مصادق افتراضي موجود.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).

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
      <td>معرف بيانات الاعتماد المشفر باستخدام ترميز Base64url.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>إذا تم تعيينه إلى true، يتم إنشاء بيانات اعتماد قابلة للاكتشاف من جانب العميل. إذا تم تعيينه إلى false، يتم إنشاء بيانات اعتماد من جانب الخادم بدلاً من ذلك.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>معرف الطرف المعتمد الذي تم تحديد نطاق بيانات الاعتماد له.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>حزمة مفتاح غير متماثل تحتوي على مفتاح خاص واحد لكل [RFC5958]، مشفرة باستخدام ترميز Base64url.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>الـ userHandle المرتبط ببيانات الاعتماد المشفرة باستخدام ترميز Base64url. قد لا تكون هذه الخاصية محددة.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>القيمة الأولية لعداد التوقيع المرتبط بمصدر مفتاح بيانات الاعتماد العام.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>الكتلة الكبيرة المرتبطة ببيانات اعتماد المفتاح العام، المشفرة باستخدام ترميز Base64url. قد لا تكون هذه الخاصية محددة.</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
يعيد كائن معلمات بيانات الاعتماد واحد لكل مصدر بيانات اعتماد للمفتاح العام المخزن في مصادق افتراضي، بغض النظر عما إذا كانت مخزنة باستخدام Add Credential أو `navigator.credentials.create()`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).

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


##### القيمة المرجعة

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
أمر امتداد Set User Verified يضبط خاصية isUserVerified على المصادق الافتراضي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).

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


