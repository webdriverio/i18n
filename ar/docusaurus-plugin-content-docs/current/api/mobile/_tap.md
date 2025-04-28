---
id: tap
title: النقر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

ينفذ إيماءة نقر على:
- العنصر المحدد. سيقوم **بالتمرير تلقائيًا** إذا لم يتمكن من العثور عليه.
- أو على الشاشة في جهاز محمول من خلال توفير إحداثيات `x` و `y`

داخلياً يستخدم:
- نقر العنصر:
     - أمر `click` لبيئات الويب (متصفحات Chrome/Safari، أو التطبيقات الهجينة)
     - أندرويد [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
أو iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) للتطبيقات الأصلية، بما في ذلك أمر `scrollIntoView`
للتمرير التلقائي
- نقر الشاشة:
     - أمر `action` لبيئات الويب (متصفحات Chrome/Safari، أو التطبيقات الهجينة)
     - أندرويد [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
أو iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) للتطبيقات الأصلية

هذا الاختلاف يجعل أمر `tap` بديلاً أكثر موثوقية لأمر `click` للتطبيقات المحمولة.

بالنسبة للتطبيقات الأصلية، يختلف هذا الأمر عن أمر `click` لأنه سيقوم <strong>تلقائيًا بالسحب</strong> إلى العنصر باستخدام أمر `scrollIntoView`،
والذي لا يدعم للتطبيقات الأصلية مع أمر `click`. في التطبيقات الهجينة أو بيئات الويب، يتم دعم التمرير التلقائي لكل من أوامر `click` و `tap`.

:::info

يعمل هذا الأمر فقط مع المكونات التالية المحدثة:
 - خادم Appium (الإصدار 2.0.0 أو أعلى)
 - `appium-uiautomator2-driver` (لأندرويد)
 - `appium-xcuitest-driver` (لـ iOS)

تأكد من تحديث بيئة Appium المحلية أو السحابية بانتظام لتجنب مشاكل التوافق.

:::

:::caution بالنسبة لنقرات الشاشة

إذا كنت ترغب في النقر على إحداثية محددة على الشاشة وتستخدم لقطة شاشة لتحديد الإحداثيات، تذكر أن
الإحداثيات لنظام iOS تعتمد على حجم شاشة الجهاز، وليس حجم لقطة الشاشة. حجم لقطة الشاشة أكبر بسبب نسبة بكسل الجهاز.
متوسط نسبة بكسل الجهاز حتى iPhone 8 وأجهزة iPad الحالية هو 2، وبالنسبة لأجهزة iPhone من iPhone X فصاعدًا، النسبة هي 3. هذا يعني أن حجم لقطة الشاشة
أكبر بمرتين أو 3 مرات من حجم شاشة الجهاز مما يعني أنه إذا وجدت الإحداثيات على لقطة الشاشة، قسمها على نسبة بكسل
الجهاز للحصول على إحداثيات الشاشة الصحيحة. على سبيل المثال:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // مثال لـ iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

:::

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`TapOptions`</td>
      <td>خيارات النقر (اختياري)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>خيارات نقر العنصر</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>رقم (اختياري، إلزامي إذا تم تعيين y) <br /><strong>فقط لنقر الشاشة، وليس لنقر العنصر</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>رقم (اختياري، إلزامي إذا تم تعيين x) <br /><strong>فقط لنقر الشاشة، وليس لنقر العنصر</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>خيارات نقر الشاشة</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>يمكن أن تكون واحدة من `down`، `up`، `left` أو `right`، الافتراضي هو `down`. <br /><strong>فقط لنقر العنصر، وليس لنقر الشاشة</strong><br /><strong>للتطبيقات المحمولة الأصلية فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الحد الأقصى لعدد التمريرات حتى يتوقف عن البحث عن العنصر، الافتراضي هو `10`. <br /><strong>فقط لنقر العنصر، وليس لنقر الشاشة</strong><br /><strong>للتطبيقات المحمولة الأصلية فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Element`</td>
      <td>العنصر المستخدم للتمرير داخله. إذا لم يتم توفير عنصر، فسيستخدم المحدد التالي لنظام iOS `-ios predicate string:type == "XCUIElementTypeApplication"` والتالي لنظام Android `//android.widget.ScrollView'`. إذا كان هناك أكثر من عنصر يطابق المحدد الافتراضي، فبشكل افتراضي سيختار أول عنصر مطابق. <br /><strong>فقط لنقر العنصر، وليس لنقر الشاشة</strong><br /><strong>للتطبيقات المحمولة الأصلية فقط</strong></td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```