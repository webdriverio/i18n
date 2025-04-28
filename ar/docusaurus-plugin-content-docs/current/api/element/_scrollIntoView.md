---
id: scrollIntoView
title: التمرير إلى العرض
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

قم بتمرير العنصر إلى منطقة العرض لسطح المكتب/الويب للجوال <strong>و</strong> تطبيقات الجوال الأصلية.

:::info

يتم التمرير لتطبيقات الجوال الأصلية بناءً على أمر `swipe` للجوال.

:::

##### الاستخدام

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`object, boolean`</td>
      <td>خيارات لـ `Element.scrollIntoView()`. الإعداد الافتراضي لسطح المكتب/الويب للجوال: <br/> `{ block: 'start', inline: 'nearest' }` <br /> الإعداد الافتراضي لتطبيق الجوال الأصلي <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>سطح المكتب/الويب للجوال فقط</strong></td>
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
              <td colspan="3"><strong>تطبيقات الجوال الأصلية فقط</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>يمكن أن تكون واحدة من `down` أو `up` أو `left` أو `right`، الإعداد الافتراضي هو `up`. <br /><strong>لتطبيقات الجوال الأصلية فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الحد الأقصى لعدد مرات التمرير حتى يتوقف عن البحث عن العنصر، الإعداد الافتراضي هو `10`. <br /><strong>لتطبيقات الجوال الأصلية فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>مدة السحب بالمللي ثانية. الإعداد الافتراضي هو `1500` مللي ثانية. كلما انخفضت القيمة، كان السحب أسرع.<br /><strong>لتطبيقات الجوال الأصلية فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Element`</td>
      <td>العنصر المستخدم للتمرير داخله. إذا لم يتم توفير عنصر، فسيتم استخدام المحدد التالي لنظام iOS `-ios predicate string:type == "XCUIElementTypeApplication"` والتالي لنظام Android `//android.widget.ScrollView'`. إذا تطابقت عناصر متعددة مع المحدد الافتراضي، فسيتم اختيار أول عنصر متطابق افتراضيًا. <br /> <strong>لتطبيقات الجوال الأصلية فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>نسبة العنصر القابل للتمرير (الافتراضي) للسحب. هذه قيمة بين 0 و 1. الإعداد الافتراضي هو `0.95`.<br /><strong>لا تقم أبدًا</strong> بالسحب من أعلى|أسفل|يسار|يمين الشاشة بالضبط، فقد تؤدي إلى تشغيل شريط الإشعارات أو ميزات أخرى للنظام/التطبيق مما يؤدي إلى نتائج غير متوقعة.<br /> <strong>لتطبيقات الجوال الأصلية فقط</strong></td>
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