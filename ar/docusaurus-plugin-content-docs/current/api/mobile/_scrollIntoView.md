---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

قم بتمرير العنصر إلى نطاق العرض للويب على سطح المكتب/الجوال <strong>وأيضاً</strong> تطبيقات الجوال الأصلية.

:::info

يتم التمرير لتطبيقات الجوال الأصلية استنادًا إلى أمر `swipe` للجوال.

يعمل هذا الأمر فقط مع المكونات المحدثة التالية:
 - خادم Appium (الإصدار 2.0.0 أو أعلى)
 - `appium-uiautomator2-driver` (لأندرويد)
 - `appium-xcuitest-driver` (لـ iOS)

تأكد من تحديث بيئة Appium المحلية أو السحابية بانتظام لتجنب مشاكل التوافق.

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
      <td>`object, boolean`</td>
      <td>خيارات لـ `Element.scrollIntoView()`. الإعداد الافتراضي لسطح المكتب/الويب الجوال: <br/> `{ block: 'start', inline: 'nearest' }` <br /> الإعداد الافتراضي لتطبيق الجوال الأصلي <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>سطح المكتب/الويب الجوال فقط</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>انظر [مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>للويب فقط</strong> (سطح المكتب/الجوال)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>انظر [مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>للويب فقط</strong> (سطح المكتب/الجوال)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>انظر [مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>للويب فقط</strong> (سطح المكتب/الجوال)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>تطبيق الجوال الأصلي فقط</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>يمكن أن يكون أحد الخيارات `down`، `up`، `left` أو `right`، الافتراضي هو `up`. <br /><strong>لتطبيق-الجوال-الأصلي-فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الحد الأقصى لعدد مرات التمرير حتى يتوقف عن البحث عن العنصر، الافتراضي هو `10`. <br /><strong>لتطبيق-الجوال-الأصلي-فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>المدة بالميلي ثانية للسحب. الافتراضي هو `1500` ميلي ثانية. كلما انخفضت القيمة، كان السحب أسرع.<br /><strong>لتطبيق-الجوال-الأصلي-فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Element`</td>
      <td>العنصر المستخدم للتمرير داخله. إذا لم يتم توفير عنصر، فسيتم استخدام المحدد التالي لـ iOS `-ios predicate string:type == "XCUIElementTypeApplication"` والتالي لأندرويد `//android.widget.ScrollView'`. إذا تطابقت عناصر أكثر مع المحدد الافتراضي، فسيتم اختيار أول عنصر مطابق افتراضيًا. <br /> <strong>لتطبيق-الجوال-الأصلي-فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>النسبة المئوية للعنصر القابل للتمرير (الافتراضي) للسحب. هذه قيمة بين 0 و 1. الافتراضي هو `0.95`.<br /><strong>لا تقم أبدًا</strong> بالسحب من أعلى|أسفل|يسار|يمين الشاشة بالضبط، فقد تقوم بتنشيط على سبيل المثال شريط الإشعارات أو ميزات أخرى للنظام/التطبيق مما قد يؤدي إلى نتائج غير متوقعة.<br /> <strong>لتطبيق-الجوال-الأصلي-فقط</strong></td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```