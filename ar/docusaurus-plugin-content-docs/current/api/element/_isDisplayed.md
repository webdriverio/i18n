---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

تُرجع القيمة true إذا كان عنصر DOM المحدد معروضًا (حتى عندما يكون العنصر خارج نطاق الرؤية). تستخدم هذه الدالة 
طريقة [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
التي يوفرها المتصفح لتحديد ما إذا كان العنصر معروضًا أم لا. نظرًا لأن WebdriverIO يتصرف كمستخدم حقيقي، فإن القيم الافتراضية للعلامات `contentVisibilityAuto` و`opacityProperty` و`visibilityProperty` 
محددة على `true` للتمكين من سلوك أكثر صرامة افتراضيًا. هذا يعني أن الأمر سيتحقق مما إذا كان العنصر مرئيًا بسبب قيمة خصائصه `content-visibility` و`opacity` و`visibility`.

إذا كنت ترغب في التحقق من أن العنصر موجود أيضًا داخل نطاق الرؤية، قم بتوفير العلامة `withinViewport` للأمر.

:::info

على عكس أوامر العناصر الأخرى، فإن WebdriverIO لن ينتظر وجود العنصر
لتنفيذ هذا الأمر.

:::

عند إجراء اختبارات المتصفح، يستخدم WebdriverIO [نصًا برمجيًا مخصصًا](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)
مصمم خصيصًا لتقييم رؤية العناصر. هذا النص البرمجي أساسي في تحديد ما إذا كان
العنصر معروضًا على الصفحة. على العكس من ذلك، بالنسبة لسيناريوهات اختبار الجوال الأصلية باستخدام Appium، يعتمد WebdriverIO
على أمر [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)
الذي يوفره Appium. يقوم هذا الأمر بتقييم رؤية العناصر باستخدام معايير محددة من قبل
مشغل Appium الأساسي، مما يضمن تقييمات دقيقة ومخصصة للمشغل للتطبيقات المحمولة.

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
      <td>`true` للتحقق مما إذا كان العنصر داخل نطاق الرؤية. `false` بشكل افتراضي.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>`true` للتحقق مما إذا كانت خاصية content-visibility للعنصر لها (أو ترث) القيمة auto، وأنها تتخطى حاليًا العرض. `true` بشكل افتراضي.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>`true` للتحقق مما إذا كانت خاصية opacity للعنصر لها (أو ترث) قيمة 0. `true` بشكل افتراضي.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>`true` للتحقق مما إذا كان العنصر غير مرئي بسبب قيمة خاصية visibility الخاصة به. `true` بشكل افتراضي.</td>
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
            **<code><var>return</var></code>:**  true إذا كان العنصر معروضًا