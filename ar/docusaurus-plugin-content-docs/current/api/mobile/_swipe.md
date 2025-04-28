---
id: swipe
title: التمرير السريع
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

تمرير سريع في اتجاه محدد داخل العرض أو العنصر لتطبيقات سطح المكتب/الويب للجوال <strong>و</strong> تطبيقات الجوال الأصلية.

:::info

التمرير السريع لتطبيقات الجوال الأصلية يعتمد على بروتوكول إجراءات W3C، ويحاكي ضغط الإصبع والحركة.
هذا يختلف عن الأمر [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) لنظام Android
أو [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) لنظام iOS الذي يعتمد على بروتوكول Appium Driver ومتاح
فقط لمنصات الجوال في سياق NATIVE.

هذا الأمر يعمل فقط مع المكونات المحدثة التالية:
 - خادم Appium (الإصدار 2.0.0 أو أعلى)
 - `appium-uiautomator2-driver` (لنظام Android)
 - `appium-xcuitest-driver` (لنظام iOS)

تأكد من تحديث بيئة Appium المحلية أو القائمة على السحابة بانتظام لتجنب مشاكل التوافق.

:::

:::caution التمرير السريع بناءً على الإحداثيات

تجنب استخدام خيارات `from` و`to` ما لم تكن ضرورية للغاية. هذه خاصة بالجهاز وقد لا تعمل بشكل متسق عبر الأجهزة.
استخدم خيار `scrollableElement` للتمرير السريع الموثوق داخل عنصر.

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
      <td>خيارات لـ `browser.swipe()`. الإعداد الافتراضي لسطح المكتب/ويب الجوال: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>يمكن أن يكون أحد `down` أو `up` أو `left` أو `right`، الافتراضي هو `up`. <br /><strong>للتطبيقات الأصلية للجوال فقط</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>للأسفل</strong><br /><strong>نقطة البداية:</strong><br/>تضع إصبعك باتجاه أعلى الشاشة.<br/><strong>الحركة:</strong><br/>تنزلق بإصبعك للأسفل نحو أسفل الشاشة.<br/><strong>الإجراء:</strong><br/>يختلف هذا حسب السياق:<br />- على الشاشة الرئيسية أو في التطبيقات، عادة ما يؤدي إلى تمرير المحتوى للأعلى.<br />- من الحافة العلوية، غالبًا ما يفتح لوحة الإشعارات أو الإعدادات السريعة.<br />- في المتصفحات أو تطبيقات القراءة، يمكن استخدامه للتمرير عبر المحتوى.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>لليسار</strong><br /><strong>نقطة البداية:</strong><br/>تضع إصبعك على الجانب الأيمن من الشاشة.<br/><strong>الحركة:</strong><br/>تنزلق بإصبعك أفقيًا إلى اليسار.<br/><strong>الإجراء:</strong><br/>تعتمد الاستجابة لهذه الإيماءة على التطبيق:<br />- يمكن أن تنتقل إلى العنصر التالي في شريط التمرير أو مجموعة من الصور.<br />- في سياق التنقل، قد يعود إلى الصفحة السابقة أو يغلق العرض الحالي.<br />- على الشاشة الرئيسية، عادة ما ينتقل إلى سطح المكتب الافتراضي أو الشاشة التالية.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>لليمين</strong><br /><strong>نقطة البداية:</strong><br/>تضع إصبعك على الجانب الأيسر من الشاشة.<br/><strong>الحركة:</strong><br/>تنزلق بإصبعك أفقيًا إلى اليمين.<br/><strong>الإجراء:</strong><br/>مشابه للتمرير لليسار، لكن في الاتجاه المعاكس:<br />-- غالبًا ما ينتقل إلى العنصر السابق في شريط التمرير أو المعرض.<br />- يمكن استخدامه لفتح القوائم الجانبية أو أدراج التنقل في التطبيقات.<br />- على الشاشة الرئيسية، ينتقل عادة إلى سطح المكتب الافتراضي السابق.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>للأعلى</strong><br /><strong>نقطة البداية:</strong><br/>تضع إصبعك باتجاه أسفل الشاشة.<br/><strong>الحركة:</strong><br/>تنزلق بإصبعك للأعلى نحو أعلى الشاشة.<br/><strong>الإجراء:</strong><br/>اعتمادًا على السياق، يمكن أن تحدث إجراءات مختلفة:<br />- على الشاشة الرئيسية أو في قائمة، هذا عادة ما يمرر المحتوى للأسفل.<br />- في تطبيق ملء الشاشة، قد يفتح خيارات إضافية أو درج التطبيق.<br />- في واجهات معينة، يمكن أن يؤدي إلى إجراء "تحديث" أو يفتح شريط البحث.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>المدة بالميلي ثانية للتمرير السريع. الافتراضي هو `1500` مللي ثانية. كلما انخفضت القيمة، كان التمرير أسرع.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Element`</td>
      <td>العنصر الذي يستخدم للتمرير السريع داخله. إذا لم يتم توفير عنصر، فسيستخدم محدد iOS التالي `-ios predicate string:type == "XCUIElementTypeApplication"` والمحدد التالي لنظام Android `//android.widget.ScrollView'`. إذا كان هناك المزيد من العناصر المطابقة للمحدد الافتراضي، فسيتم اختيار أول عنصر مطابق افتراضيًا. <br /> <strong>للتطبيقات الأصلية للجوال فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>النسبة المئوية للعنصر القابل للتمرير (الافتراضي) للتمرير السريع. هذه قيمة بين 0 و 1. الافتراضي هو `0.95`.<br /><strong>لا تقم أبدًا</strong> بالتمرير من الأعلى|الأسفل|اليسار|اليمين بالضبط للشاشة، فقد تقوم بتشغيل شريط الإشعارات على سبيل المثال أو ميزات أخرى لنظام التشغيل/التطبيق مما قد يؤدي إلى نتائج غير متوقعة.<br />ليس لهذا أي تأثير إذا تم توفير `from` و`to`.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>القيم أدناه لها تأثير <strong>فقط</strong> إذا لم يتم توفير `scrollableElement`، وإلا سيتم تجاهلها.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`object`</td>
      <td>إحداثيات x و y لبداية التمرير السريع. إذا تم توفير `scrollableElement`، فلن يكون لهذه الإحداثيات أي تأثير.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الإحداثي x لبداية التمرير السريع.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الإحداثي y لبداية التمرير السريع.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`object`</td>
      <td>إحداثيات x و y لنهاية التمرير السريع. إذا تم توفير `scrollableElement`، فلن يكون لهذه الإحداثيات أي تأثير.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الإحداثي x لنهاية التمرير السريع.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الإحداثي y لنهاية التمرير السريع.</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```