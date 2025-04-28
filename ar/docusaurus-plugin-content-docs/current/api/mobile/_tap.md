---
id: tap
title: لمس
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

يؤدي إيماءة اللمس على:
- العنصر المحدد. سوف **يتمرر تلقائيًا** إذا لم يتمكن من العثور عليه.
- أو على الشاشة في جهاز محمول عن طريق توفير إحداثيات `x` و `y`

داخليًا يستخدم:
- لمس العنصر:
     - أمر `click` لبيئات الويب (متصفحات Chrome/Safari، أو التطبيقات الهجينة)
     - الأندرويد [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
أو iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) للتطبيقات الأصلية، بما في ذلك أمر `scrollIntoView`
للتمرير التلقائي
- لمس الشاشة:
     - أمر `action` لبيئات الويب (متصفحات Chrome/Safari، أو التطبيقات الهجينة)
     - الأندرويد [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
أو iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) للتطبيقات الأصلية

هذا الاختلاف يجعل أمر `tap` بديلاً أكثر موثوقية لأمر `click` للتطبيقات المحمولة.

بالنسبة للتطبيقات الأصلية، يختلف هذا الأمر عن أمر `click` حيث أنه <strong>سيتمرر تلقائيًا</strong> إلى العنصر باستخدام أمر `scrollIntoView`،
وهو غير مدعوم للتطبيقات الأصلية مع أمر `click`. في التطبيقات الهجينة أو بيئات الويب، التمرير التلقائي مدعوم لكل من أوامر `click` و `tap`.

:::info

يعمل هذا الأمر فقط مع المكونات التالية المحدثة:
 - خادم Appium (الإصدار 2.0.0 أو أعلى)
 - `appium-uiautomator2-driver` (للأندرويد)
 - `appium-xcuitest-driver` (للـ iOS)

تأكد من تحديث بيئة Appium المحلية أو السحابية بانتظام لتجنب مشاكل التوافق.

:::

:::caution بالنسبة للمس الشاشة

إذا كنت ترغب في لمس إحداثيات محددة على الشاشة وتستخدم لقطة شاشة لتحديد الإحداثيات، تذكر أن
الإحداثيات لنظام iOS تعتمد على حجم شاشة الجهاز، وليس حجم لقطة الشاشة. حجم لقطة الشاشة أكبر بسبب نسبة بكسل الجهاز.
متوسط نسبة بكسل الجهاز حتى iPhone 8 وأجهزة iPad الحالية هو 2، ولأجهزة iPhone من iPhone X فصاعدًا النسبة هي 3. هذا يعني أن حجم لقطة الشاشة
أكبر بمقدار 2 أو 3 مرات من حجم شاشة الجهاز مما يعني أنه إذا وجدت الإحداثيات على لقطة الشاشة، قسّمها على نسبة بكسل الجهاز
للحصول على إحداثيات الشاشة الصحيحة. على سبيل المثال:

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
      <td>خيارات اللمس (اختيارية)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>خيارات لمس العنصر</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>رقم (اختياري، إلزامي إذا تم تعيين y) <br /><strong>فقط للمس الشاشة، وليس للمس العنصر</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>رقم (اختياري، إلزامي إذا تم تعيين x) <br /><strong>فقط للمس الشاشة، وليس للمس العنصر</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>خيارات لمس الشاشة</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>يمكن أن يكون أحد `down`، `up`، `left` أو `right`، الافتراضي هو `down`. <br /><strong>فقط للمس العنصر، وليس للمس الشاشة</strong><br /><strong>للتطبيقات الأصلية للجوال فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الحد الأقصى لعدد مرات التمرير حتى يتوقف عن البحث عن العنصر، الافتراضي هو `10`. <br /><strong>فقط للمس العنصر، وليس للمس الشاشة</strong><br /><strong>للتطبيقات الأصلية للجوال فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Element`</td>
      <td>العنصر المستخدم للتمرير داخله. إذا لم يتم توفير عنصر، سيستخدم المحدد التالي لـ iOS `-ios predicate string:type == "XCUIElementTypeApplication"` والتالي للأندرويد `//android.widget.ScrollView'`. إذا تطابقت عناصر متعددة مع المحدد الافتراضي، فسيتم اختيار أول عنصر مطابق افتراضيًا. <br /><strong>فقط للمس العنصر، وليس للمس الشاشة</strong><br /><strong>للتطبيقات الأصلية للجوال فقط</strong></td>
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