---
id: isDisplayed
title: هل العنصر معروض
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

تعيد هذه الأمر القيمة صحيح إذا كان عنصر DOM المحدد معروضًا (حتى عندما يكون العنصر خارج نطاق الرؤية). يستخدم
طريقة [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
التي يوفرها المتصفح لتحديد ما إذا كان العنصر معروضًا أم لا. نظرًا لأن WebdriverIO يتصرف كمستخدم
حقيقي، فإن القيم الافتراضية لعلامات `contentVisibilityAuto` و`opacityProperty` و`visibilityProperty`
تم تعيينها على `true` للإرجاع إلى سلوك أكثر صرامة. هذا يعني أن الأمر سيتحقق مما إذا كان العنصر
مرئيًا بسبب قيمة خصائص `content-visibility` و`opacity` و`visibility` الخاصة به.

إذا كنت تريد أيضًا التحقق من أن العنصر موجود أيضًا داخل نطاق الرؤية، قم بتوفير علامة `withinViewport` للأمر.

:::info

على عكس أوامر العناصر الأخرى، لن ينتظر WebdriverIO وجود العنصر
لتنفيذ هذا الأمر.

:::

عند إجراء اختبارات المتصفح، يستخدم WebdriverIO [نصًا مخصصًا](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)
مصمم خصيصًا لتقييم رؤية العناصر. هذا النص أساسي في تحديد ما إذا كان العنصر معروضًا على الصفحة. وعلى العكس من ذلك، بالنسبة لسيناريوهات اختبار الأجهزة المحمولة الأصلية مع Appium، يعتمد WebdriverIO
على أمر [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)
الذي يوفره Appium. يقيّم هذا الأمر رؤية العناصر باستخدام معايير وضعها
برنامج التشغيل الأساسي من Appium، مما يضمن تقييمات دقيقة ومحددة للبرنامج لتطبيقات الأجهزة المحمولة.

##### الاستخدام

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
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
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>`true` للتحقق مما إذا كان العنصر داخل نطاق الرؤية. `false` افتراضيًا.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>`true` للتحقق مما إذا كانت خاصية content-visibility للعنصر تحتوي (أو ترث) القيمة auto، وأنها تتخطى حاليًا عرضها. `true` افتراضيًا.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>`true` للتحقق مما إذا كانت خاصية opacity للعنصر تحتوي (أو ترث) قيمة 0. `true` افتراضيًا.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>`true` للتحقق مما إذا كان العنصر غير مرئي بسبب قيمة خاصية الرؤية الخاصة به. `true` افتراضيًا.</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### القيمة المرجعة

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  صحيح إذا كان العنصر معروضًا