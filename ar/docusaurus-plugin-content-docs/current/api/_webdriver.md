---
id: webdriver
title: بروتوكول WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
أمر New Session يقوم بإنشاء جلسة WebDriver جديدة مع نقطة النهاية. إذا فشل الإنشاء، يتم إرجاع خطأ عدم إنشاء الجلسة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-new-sessions).

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
      <td>كائن JSON، مجموعة القدرات التي تم دمجها ومطابقتها في نهاية المطاف في خوارزمية معالجة القدرات</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** كائن يحتوي على sessionId والقدرات الخاصة بجلسة WebDriver المنشأة.


---

## deleteSession
أمر Delete Session يغلق أي سياقات تصفح من المستوى الأعلى مرتبطة بالجلسة الحالية، وينهي الاتصال، وأخيراً يغلق الجلسة الحالية.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-delete-session).

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
أمر Status يعيد معلومات حول ما إذا كان الطرف البعيد في حالة يمكنه إنشاء جلسات جديدة ويمكن أن يتضمن أيضًا معلومات تعريف اعتباطية خاصة بالتنفيذ.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-status).

##### الاستخدام

```js
browser.status()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### النتائج

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** كائن يحتوي على حالة برنامج التشغيل.


---

## getTimeouts
أمر Get Timeouts يحصل على مدد التوقف المرتبطة بالجلسة الحالية.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-timeouts).

##### الاستخدام

```js
browser.getTimeouts()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### النتائج

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** كائن يحتوي على مدد التوقف لـ `script` و `pageLoad` و `implicit`.


---

## setTimeouts
أمر Set Timeouts يضبط مدد التوقف المرتبطة بالجلسة الحالية. المهل التي يمكن التحكم فيها مدرجة في جدول مهل الجلسة أدناه.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-set-timeouts).

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
      <td>عدد صحيح بالمللي ثانية للانتظار الضمني للجلسة</td>
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
أمر Get Current URL يعيد عنوان URL للسياق الحالي للتصفح من المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-current-url).

##### الاستخدام

```js
browser.getUrl()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### النتائج

- **&lt;string&gt;**
            **<code><var>url</var></code>:** عنوان URL للمستند النشط في سياق التصفح الحالي من المستوى الأعلى


---

## navigateTo
أمر navigateTo (go) يستخدم لتوجيه وكيل المستخدم لسياق التصفح الحالي من المستوى الأعلى إلى موقع جديد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-navigate-to).

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
      <td>سلسلة تمثل عنوان URL مطلق (يبدأ بـ http(s))، وقد يتضمن شظية (#...)، ويمكن أن يكون أيضًا مخططًا محليًا (about: إلخ)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
أمر Back يتسبب في رجوع المتصفح خطوة واحدة للخلف في تاريخ الجلسة المشترك لسياق التصفح الحالي من المستوى الأعلى. هذا يعادل الضغط على زر الرجوع في شريط أدوات المتصفح أو استدعاء `window.history.back`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-back).

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
أمر Forward يتسبب في تقدم المتصفح خطوة واحدة للأمام في تاريخ الجلسة المشترك لسياق التصفح الحالي من المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-forward).

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
أمر Refresh يتسبب في إعادة تحميل المتصفح للصفحة في سياق التصفح الحالي من المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-refresh).

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
أمر Get Title يعيد عنوان المستند لسياق التصفح الحالي من المستوى الأعلى، ما يعادل استدعاء `document.title`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-title).

##### الاستخدام

```js
browser.getTitle()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### النتائج

- **&lt;string&gt;**
            **<code><var>title</var></code>:** يعيد سلسلة نصية تساوي `document.title` لسياق التصفح الحالي من المستوى الأعلى.


---

## getWindowHandle
أمر Get Window Handle يعيد مقبض النافذة لسياق التصفح الحالي من المستوى الأعلى. يمكن استخدامه كوسيط لـ Switch To Window.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-window-handle).

##### الاستخدام

```js
browser.getWindowHandle()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### النتائج

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** يعيد سلسلة نصية هي مقبض النافذة لسياق التصفح الحالي من المستوى الأعلى.


---

## closeWindow
أمر Close Window يغلق سياق التصفح الحالي من المستوى الأعلى. بمجرد الانتهاء، إذا لم تكن هناك سياقات تصفح أخرى من المستوى الأعلى مفتوحة، يتم إغلاق جلسة WebDriver نفسها.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-close-window).

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
أمر Switch To Window يستخدم لتحديد سياق التصفح الحالي من المستوى الأعلى للجلسة الحالية، أي الذي سيتم استخدامه لمعالجة الأوامر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-switch-to-window).

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
      <td>سلسلة تمثل مقبض نافذة، يجب أن تكون واحدة من السلاسل التي تم إرجاعها في مكالمة إلى getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
إنشاء سياق تصفح جديد من المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#new-window).

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
      <td>يتم ضبطه على 'tab' إذا كانت النافذة المنشأة حديثًا تشارك نافذة على مستوى نظام التشغيل مع سياق التصفح الحالي، أو 'window' خلاف ذلك.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### النتائج

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** كائن النافذة الجديدة الذي يحتوي على 'handle' بقيمة المقبض و 'type' بقيمة نوع النافذة المنشأة


---

## getWindowHandles
أمر Get Window Handles يعيد قائمة مقابض النوافذ لكل سياق تصفح مفتوح من المستوى الأعلى. ترتيب إرجاع مقابض النوافذ عشوائي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-window-handles).

##### الاستخدام

```js
browser.getWindowHandles()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### النتائج

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** مصفوفة تحتوي على قائمة مقابض النوافذ.


---

## printPage
أمر Print Page يقوم بتحويل المستند إلى مستند PDF مقسم إلى صفحات. __ملاحظة:__ حاليًا، يدعم Chrome هذا فقط في [وضع headless](https://webdriver.io/docs/capabilities/#run-browser-headless)، انظر [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#print-page).

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
      <td>حجم الصفحة. الافتراضي: `1`</td>
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
      <td>نطاقات الصفحات. الافتراضي `[]`</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### النتائج

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** تمثيل PDF المشفر بـ base64 للمستند المقسم إلى صفحات.


---

## switchToFrame
أمر Switch To Frame يستخدم لتحديد سياق التصفح الحالي من المستوى الأعلى أو سياق تصفح فرعي لسياق التصفح الحالي لاستخدامه كسياق التصفح الحالي للأوامر اللاحقة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

هذا الأمر البروتوكولي مهمل<br />هذا الأمر مهمل ونحن نشجع الجميع على استخدام `switchFrame` بدلاً من ذلك للتبديل إلى الإطارات. اقرأ المزيد عن هذا الأمر على https://webdriver.io/docs/api/browser/switchFrame.
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
      <td>واحد من ثلاثة أنواع ممكنة: null: يمثل سياق التصفح من المستوى الأعلى (أي ليس iframe)، رقم يمثل فهرس كائن النافذة المقابل للإطار، كائن عنصر تم استلامه باستخدام `findElement`.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
أمر Switch to Parent Frame يضبط سياق التصفح الحالي للأوامر المستقبلية على الأصل لسياق التصفح الحالي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).

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
أمر Get Window Rect يعيد حجم وموضع نافذة نظام التشغيل المقابلة لسياق التصفح الحالي من المستوى الأعلى على الشاشة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-window-rect).

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

##### النتائج

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect". يحتوي على 4 خصائص: `x`، `y`، `width` و `height`.


---

## setWindowRect
أمر Set Window Rect يغير حجم وموضع نافذة نظام التشغيل المقابلة لسياق التصفح الحالي من المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-set-window-rect).

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
      <td>عرض الأبعاد الخارجية لسياق التصفح من المستوى الأعلى، بما في ذلك واجهة المتصفح الفولاذية وما إلى ذلك...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>ارتفاع الأبعاد الخارجية لسياق التصفح من المستوى الأعلى، بما في ذلك واجهة المتصفح الفولاذية وما إلى ذلك...</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### النتائج

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect" استنادًا إلى حالة النافذة الجديدة.


---

## maximizeWindow
أمر Maximize Window يستدعي عملية "تكبير" المحددة لمدير النوافذ، إن وجدت، على النافذة التي تحتوي على سياق التصفح الحالي من المستوى الأعلى. هذا عادة ما يزيد النافذة إلى الحجم الأقصى المتاح دون الذهاب إلى وضع ملء الشاشة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-maximize-window).

##### الاستخدام

```js
browser.maximizeWindow()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### النتائج

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect" استنادًا إلى حالة النافذة الجديدة.


---

## minimizeWindow
أمر Minimize Window يستدعي عملية "تصغير" المحددة لمدير النوافذ، إن وجدت، على النافذة التي تحتوي على سياق التصفح الحالي من المستوى الأعلى. هذا عادة ما يخفي النافذة في علبة النظام.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-minimize-window).

##### الاستخدام

```js
browser.minimizeWindow()
```


##### النتائج

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect" لسياق التصفح الحالي (الجديد) من المستوى الأعلى.


---

## fullscreenWindow
أمر Fullscreen Window يستدعي عملية "ملء الشاشة" المحددة لمدير النوافذ، إن وجدت، على النافذة التي تحتوي على سياق التصفح الحالي من المستوى الأعلى. هذا عادة ما يزيد النافذة إلى حجم العرض المادي ويمكن أن يخفي عناصر واجهة المتصفح مثل أشرطة الأدوات.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-fullscreen-window).

##### الاستخدام

```js
browser.fullscreenWindow()
```


##### النتائج

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** تمثيل JSON لكائن "window rect" لسياق التصفح الحالي (الجديد) من المستوى الأعلى.


---

## findElement
يستخدم أمر Find Element للعثور على عنصر في سياق التصفح الحالي يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO الموسع.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-element).

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
      <td>استراتيجية موقع عنصر صالحة</td>
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

##### النتائج

- **&lt;object&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromShadowRoot
يستخدم أمر Find Element From Shadow Root للعثور على عنصر داخل جذر ظل عنصر يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO الموسع.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

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
      <td>استراتيجية موقع عنصر صالحة</td>
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

##### النتائج

- **&lt;object&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن ظل عنصر، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElements
يستخدم أمر Find Elements للعثور على عناصر في سياق التصفح الحالي يمكن استخدامها للأوامر المستقبلية. يعيد هذا الأمر مصفوفة تمثيل JSON للعناصر التي يمكن تمريرها إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO الموسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-elements).

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
      <td>استراتيجية موقع عنصر صالحة</td>
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

##### النتائج

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** قائمة JSON (ربما فارغة) لتمثيلات كائن عنصر، على سبيل المثال `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## findElementsFromShadowRoot
يستخدم أمر Find Elements للعثور على عناصر داخل جذر ظل عنصر يمكن استخدامها للأوامر المستقبلية. يعيد هذا الأمر مصفوفة تمثيل JSON للعناصر التي يمكن تمريرها إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO الموسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

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
      <td>استراتيجية موقع عنصر صالحة</td>
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

##### النتائج

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** قائمة JSON (ربما فارغة) لتمثيلات كائن عنصر، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromElement
يستخدم أمر Find Element From Element للعثور على عنصر من عنصر ويب في سياق التصفح الحالي يمكن استخدامه للأوامر المستقبلية. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO الموسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>استراتيجية موقع عنصر صالحة</td>
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

##### النتائج

- **&lt;object&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementsFromElement
يستخدم أمر Find Elements From Element للعثور على عناصر من عنصر ويب في سياق التصفح الحالي يمكن استخدامها للأوامر المستقبلية. يعيد هذا الأمر مصفوفة تمثيل JSON للعناصر التي يمكن تمريرها إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO الموسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>استراتيجية موقع عنصر صالحة</td>
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

##### النتائج

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** قائمة JSON (ربما فارغة) لتمثيلات كائن عنصر، على سبيل المثال `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## getElementShadowRoot
الحصول على كائن جذر الظل لعنصر. يمكن استخدام كائن النتيجة لجلب عناصر داخل جذر الظل هذا باستخدام على سبيل المثال findElementFromShadowRoots أو findElementsFromShadowRoots.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-active-element).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### النتائج

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** تمثيل JSON لجذر ظل عنصر، على سبيل المثال `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## getActiveElement
يعيد أمر Get Active Element العنصر النشط لعنصر المستند لسياق التصفح الحالي. يعيد هذا الأمر تمثيل JSON للعنصر الذي يمكن تمريره إلى أمر $ لتحويل المرجع إلى عنصر WebdriverIO الموسع (انظر findElement).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-active-element).

##### الاستخدام

```js
browser.getActiveElement()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### النتائج

- **&lt;string&gt;**
            **<code><var>element</var></code>:** تمثيل JSON لكائن عنصر، على سبيل المثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## isElementSelected
يحدد أمر Is Element Selected ما إذا كان العنصر المشار إليه محددًا أم لا. هذه العملية لها معنى فقط على عناصر الإدخال من حالات Checkbox و Radio Button، أو عناصر الخيار.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-is-element-selected).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### النتائج

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` أو `false` بناءً على حالة التحديد.


---

## isElementDisplayed
يحدد أمر Is Element Displayed مرئية عنصر استنادًا إلى ما هو مرئي إدراكيًا للعين البشرية. في هذا السياق، لا ترتبط رؤية العنصر بخصائص النمط `visibility` أو `display`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#element-displayedness).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### النتائج

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
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

##### النتائج

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** السمة المسماة للعنصر.


---

## getElementProperty
سيعيد أمر Get Element Property نتيجة الحصول على خاصية عنصر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-property).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
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

##### النتائج

- **&lt;string&gt;**
            **<code><var>property</var></code>:** الخاصية المسماة للعنصر، تم الوصول إليها عن طريق استدعاء GetOwnProperty على كائن العنصر.


---

## getElementCSSValue
يسترد أمر Get Element CSS Value القيمة المحسوبة لخاصية CSS المعطاة لعنصر الويب المعطى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
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

##### النتائج

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** القيمة المحسوبة للمعلمة المقابلة لاسم الخاصية من إعلانات نمط العنصر (ما لم يكن نوع المستند هو xml، وفي هذه الحالة تكون قيمة الإرجاع ببساطة سلسلة فارغة).


---

## getElementText
يهدف أمر Get Element Text إلى إرجاع نص العنصر "كما تم عرضه". يتم استخدام النص المعروض للعنصر أيضًا لتحديد موقع العناصر من خلال نص الرابط ونص الرابط الجزئي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-element-text).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### النتائج

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### النتائج

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### النتائج

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** كائن JSON يمثل موضع ومستطيل حدود العنصر.


---

## isElementEnabled
يحدد أمر Is Element Enabled ما إذا كان العنصر المشار إليه ممكّنًا أم لا. هذه العملية لها معنى فقط على عناصر التحكم في النموذج.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### النتائج

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** إذا كان العنصر في مستند xml، أو كان عنصر تحكم في نموذج معطّل: `false`، وإلا `true`.


---

## elementClick
يقوم أمر Element Click بالتمرير إلى العرض للعنصر إذا لم يكن قابلاً للتفاعل مع المؤشر بالفعل، ويقوم بالنقر على نقطة مركزه المرئية. إذا كانت نقطة مركز العنصر محجوبة بواسطة عنصر آخر، يتم إرجاع خطأ اعتراض عنصر النقر. إذا كان العنصر خارج إطار العرض، يتم إرجاع خطأ عنصر غير قابل للتفاعل.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-element-click).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
يقوم أمر Element Clear بالتمرير إلى عرض عنصر قابل للتحرير أو قابل لإعادة الضبط ثم يحاول مسح الملفات المحددة أو محتوى النص الخاص به.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-element-clear).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
يقوم أمر Element Send Keys بالتمرير إلى عرض عنصر التحكم في النموذج ثم يرسل المفاتيح المقدمة إلى العنصر. في حالة عدم قابلية العنصر للتفاعل مع لوحة المفاتيح، يتم إرجاع خطأ عنصر غير قابل للتفاعل.<br /><br />يمكن مسح حالة إدخال المفتاح المستخدمة للإدخال في منتصف الطريق أثناء "الكتابة" عن طريق إرسال المفتاح الفارغ، وهو U+E000 (NULL).<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-element-send-keys).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>سلسلة لإرسالها كضغطات مفاتيح إلى العنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
يعيد أمر Get Page Source سلسلة تسلسل DOM لمستند سياق التصفح الحالي النشط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-page-source).

##### الاستخدام

```js
browser.getPageSource()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### النتائج

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** DOM للمستند النشط لسياق التصفح الحالي


---

## executeScript
ينفذ أمر Execute Script وظيفة JavaScript في سياق سياق التصفح الحالي ويعيد قيمة الإرجاع للوظيفة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-execute-script).

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
      <td>سلسلة، جسم وظيفة Javascript الذي تريد تنفيذه</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>مصفوفة من قيم JSON التي سيتم فك ترميزها وتمريرها كوسائط لوظيفتك</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### النتائج

- **&lt;*&gt;**
            **<code><var>result</var></code>:** إما قيمة الإرجاع لنصك البرمجي، أو تحقيق الوعد الذي تم إرجاعه بواسطة نصك البرمجي، أو الخطأ الذي كان سبب رفض الوعد الذي أرجعه نصك البرمجي.


---

## executeAsyncScript
يتسبب أمر Execute Async Script في تنفيذ JavaScript كوظيفة مجهولة. على عكس أمر Execute Script، يتم تجاهل نتيجة الوظيفة. بدلاً من ذلك، يتم توفير وسيطة إضافية كالوسيطة النهائية للدالة. وهذه هي وظيفة، عندما تستدعى، تعيد وسيطتها الأولى كاستجابة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-execute-async-script).

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
      <td>سلسلة، جسم وظيفة Javascript الذي تريد تنفيذه</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>مصفوفة من قيم JSON التي سيتم فك ترميزها وتمريرها كوسائط لوظيفتك</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### النتائج

- **&lt;*&gt;**
            **<code><var>result</var></code>:** إما قيمة الإرجاع لنصك البرمجي، أو تحقيق الوعد الذي تم إرجاعه بواسطة نصك البرمجي، أو الخطأ الذي كان سبب رفض الوعد الذي أرجعه نصك البرمجي.


---

## getAllCookies
يعيد أمر Get All Cookies جميع ملفات تعريف الارتباط المرتبطة بعنوان المستند النشط لسياق التصفح الحالي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-all-cookies).

##### الاستخدام

```js
browser.getAllCookies()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### النتائج

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** قائمة ملفات تعريف الارتباط المسلسلة. كل ملف تعريف ارتباط مسلسل له عدد من الحقول الاختيارية التي قد تُعاد أو لا تُعاد بالإضافة إلى `name` و `value`.


---

## addCookie
يضيف أمر Add Cookie ملف تعريف ارتباط واحد إلى مخزن ملفات تعريف الارتباط المرتبط بعنوان المستند النشط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).

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
يعيد أمر Get Named Cookie ملف تعريف الارتباط بالاسم المطلوب من ملفات تعريف الارتباط المرتبطة في مخزن ملفات تعريف الارتباط للمستند النشط لسياق التصفح الحالي. إذا لم يتم العثور على ملف تعريف ارتباط، يتم إرجاع خطأ عدم وجود ملف تعريف ارتباط.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-get-named-cookie).

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

##### النتائج

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** ملف تعريف ارتباط مسلسل، به حقول الاسم والقيمة. هناك عدد من الحقول الاختيارية مثل `path` و `domain` و `expiry-time` والتي قد تكون موجودة أيضًا.


---

## deleteCookie
يسمح لك أمر Delete Cookie بحذف إما ملف تعريف ارتباط واحد بواسطة معلمة الاسم، أو جميع ملفات تعريف الارتباط المرتبطة بعنوان المستند النشط إذا كان الاسم غير محدد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-delete-cookie).

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
يستخدم أمر Perform Actions لتنفيذ إجراءات المستخدم المعقدة. انظر [المواصفات](https://github.com/jlipps/simple-wd-spec#perform-actions) لمزيد من التفاصيل.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-perform-actions).

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
يستخدم أمر Release Actions لتحرير جميع المفاتيح وأزرار المؤشر المضغوطة حاليًا. يتسبب هذا في إطلاق أحداث كما لو تم تحرير الحالة بواسطة سلسلة واضحة من الإجراءات. كما أنه يمسح كل الحالة الداخلية للأجهزة الافتراضية.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-release-actions).

##### الاستخدام

```js
browser.releaseActions()
```



---

## dismissAlert
أمر Dismiss Alert يقوم برفض مربع حوار بسيط إذا كان موجودًا، وإلا خطأ. طلب رفض مطالبة مستخدم التنبيه، والتي قد لا يكون لها بالضرورة زر رفض، له نفس تأثير قبولها.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-dismiss-alert).

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
أمر Accept Alert يقبل مربع حوار بسيط إذا كان موجودًا، وإلا خطأ.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-accept-alert).

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

##### النتائج

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** رسالة مطالبة المستخدم.


---

## sendAlertText
يضبط أمر Send Alert Text حقل النص لمطالبة المستخدم window.prompt إلى القيمة المعطاة.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-send-alert-text).

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
      <td>سلسلة لضبط المطالبة عليها</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
يلتقط أمر Take Screenshot لقطة شاشة لعرض سياق التصفح من المستوى الأعلى.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-take-screenshot).

##### الاستخدام

```js
browser.takeScreenshot()
```


##### النتائج

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** بيانات صورة PNG المشفرة بـ base64 التي تشكل لقطة شاشة لعرض البداية.


---

## takeElementScreenshot
يلتقط أمر Take Element Screenshot لقطة شاشة للمنطقة المرئية التي يشملها المستطيل المحيط بعنصر.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>التمرير لعرض العنصر. الافتراضي: true</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** بيانات صورة PNG المشفرة بـ base64 التي تشكل لقطة شاشة للمنطقة المرئية من المستطيل المحيط بعنصر بعد التمرير لعرضه.


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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### النتائج

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
      <td>معرف عنصر تم إرجاعه في مكالمة سابقة إلى Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;string&gt;**
            **<code><var>label</var></code>:** نتيجة حساب الاسم الذي يمكن الوصول إليه والوصف للاسم الذي يمكن الوصول إليه للعنصر.


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
      <td>لكل ميزة قوية جانب واحد أو أكثر يمكن لمواقع الويب طلب إذن للوصول إليها. لوصف هذه الجوانب، تعرّف كل ميزة نوعًا فرعيًا من PermissionDescriptor ليكون نوع واصف الإذن الخاص بها. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.</td>
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
// ضبط أذونات midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // يمكن أن تكون أيضًا "denied" أو "prompt"
);
```


```js
// ضبط أذونات الحافظة
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
      <td>رقم مزدوج يمثل التردد بالهرتز والذي يستخدم لتعيين الحد الأقصى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>رقم مزدوج يمثل التردد بالهرتز والذي يستخدم لتعيين الحد الأدنى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
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


##### النتائج

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** قيم قراءة المستشعر الوهمي.


---

## updateMockSensor
يحدّث نوع المستشعر الوهمي. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).

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
      <td>رقم مزدوج يمثل التردد بالهرتز والذي يستخدم لتعيين الحد الأقصى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>رقم مزدوج يمثل التردد بالهرتز والذي يستخدم لتعيين الحد الأدنى لتردد أخذ العينات المدعوم للمستشعر الوهمي المرتبط.</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
يغلق أمر Delete Session أي سياقات تصفح من المستوى الأعلى مرتبطة بالجلسة الحالية، وينهي الاتصال، وأخيراً يغلق الجلسة الحالية. __ملاحظة:__ لم تصل هذه الميزة إلى جميع المتصفحات بعد.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/sensors/#delete-mock-sensor-command).

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
      <td>نوع المستشعر الوهمي لحذفه.</td>
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
      <td>القيم الصالحة: ما يصل إلى 3 إدخالات طريقة التحقق من المستخدم.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** يعيد معرف المصادق كسلسلة.


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
يحقن مصدرًا للمفتاح العام في مصادق افتراضي موجود.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).

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
      <td>إذا تم تعيينه على true، يتم إنشاء بيانات اعتماد قابلة للاكتشاف من جانب العميل. إذا تم تعيينه على false، يتم إنشاء بيانات اعتماد من جانب الخادم بدلاً من ذلك.</td>
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
      <td>المقبض المستخدم المرتبط ببيانات الاعتماد المشفرة باستخدام ترميز Base64url. قد لا تكون هذه الخاصية محددة.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>القيمة الأولية لعداد التوقيع المرتبط بمصدر المفتاح العام.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>الكتلة الكبيرة المرتبطة ببيانات اعتماد المفتاح العام، مشفرة باستخدام ترميز Base64url. قد لا تكون هذه الخاصية محددة.</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
يعيد كائن معلمات بيانات الاعتماد واحدًا لكل مصدر مفتاح عام مخزن في مصادق افتراضي، بغض النظر عما إذا كانت مخزنة باستخدام Add Credential أو `navigator.credentials.create()`.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).

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


##### النتائج

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** يعيد مصفوفة من بيانات الاعتماد.


---

## removeAllCredentials
يزيل جميع مصادر مفتاح عام مخزنة على مصادق افتراضي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).

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
يزيل مصدر مفتاح عام مخزن على مصادق افتراضي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).

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
يضبط أمر امتداد Set User Verified خاصية isUserVerified على المصادق الافتراضي.<br /><br />أمر بروتوكول WebDriver. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).

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


