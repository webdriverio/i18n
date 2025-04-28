---
id: swipe
title: التمرير السريع
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

التمرير السريع في اتجاه محدد داخل إطار العرض أو العنصر لكل من تطبيقات سطح المكتب/الويب المحمول <strong>و</strong> تطبيقات الهاتف المحمول الأصلية.

:::info

التمرير السريع لتطبيقات الهاتف المحمول الأصلية يعتمد على بروتوكول W3C-actions، محاكياً ضغط الإصبع والحركة.
هذا يختلف عن [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) لنظام Android
أو [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) لنظام iOS وهو الأمر المستند إلى بروتوكول Appium Driver والمتاح
فقط لمنصات الهاتف المحمول في سياق NATIVE.

هذا الأمر يعمل فقط مع المكونات التالية المحدثة:
 - خادم Appium (الإصدار 2.0.0 أو أعلى)
 - `appium-uiautomator2-driver` (لنظام Android)
 - `appium-xcuitest-driver` (لنظام iOS)

تأكد من تحديث بيئة Appium المحلية أو السحابية بانتظام لتجنب مشاكل التوافق.

:::

:::caution التمرير السريع بناءً على الإحداثيات

تجنب استخدام خيارات `from` و `to` إلا إذا كان ذلك ضرورياً للغاية. هذه خاصة بالجهاز وقد لا تعمل بشكل متسق عبر الأجهزة.
استخدم خيار `scrollableElement` للحصول على تمريرات سريعة موثوقة داخل العنصر.

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
      <td>خيارات لـ `browser.swipe()`. الإعداد الافتراضي لسطح المكتب/الويب المحمول: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>يمكن أن يكون `down` أو `up` أو `left` أو `right`، الافتراضي هو `up`. <br /><strong>للتطبيقات الأصلية للهاتف المحمول فقط</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>للأسفل</strong><br /><strong>نقطة البداية:</strong><br/>تضع إصبعك نحو أعلى الشاشة.<br/><strong>الحركة:</strong><br/>تحرك إصبعك لأسفل نحو أسفل الشاشة.<br/><strong>الإجراء:</strong><br/>يختلف هذا حسب السياق:<br />- على الشاشة الرئيسية أو في التطبيقات، عادة ما يؤدي إلى تمرير المحتوى لأعلى.<br />- من الحافة العلوية، غالبًا ما يفتح لوحة الإشعارات أو الإعدادات السريعة.<br />- في المتصفحات أو تطبيقات القراءة، يمكن استخدامه للتمرير عبر المحتوى.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>لليسار</strong><br /><strong>نقطة البداية:</strong><br/>تضع إصبعك على الجانب الأيمن من الشاشة.<br/><strong>الحركة:</strong><br/>تحرك إصبعك أفقيًا إلى اليسار.><br/><strong>الإجراء:</strong><br/>يعتمد الرد على هذه الإيماءة على التطبيق:<br />- يمكن أن ينتقل إلى العنصر التالي في شريط التمرير أو مجموعة من الصور.<br />- في سياق التنقل، قد يعود إلى الصفحة السابقة أو يغلق العرض الحالي.<br />- على الشاشة الرئيسية، عادة ما يتبدل إلى سطح المكتب الافتراضي أو الشاشة التالية.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>لليمين</strong><br /><strong>نقطة البداية:</strong><br/>تضع إصبعك على الجانب الأيسر من الشاشة.<br/><strong>الحركة:</strong><br/>تحرك إصبعك أفقيًا إلى اليمين.<br/><strong>الإجراء:</strong><br/>مشابه للتمرير لليسار، ولكن في الاتجاه المعاكس:<br />-- غالبًا ما ينتقل إلى العنصر السابق في شريط التمرير أو المعرض.<br />- يمكن استخدامه لفتح القوائم الجانبية أو أدراج التنقل في التطبيقات.<br />- على الشاشة الرئيسية، عادة ما ينتقل إلى سطح المكتب الافتراضي السابق.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>للأعلى</strong><br /><strong>نقطة البداية:</strong><br/>تضع إصبعك نحو أسفل الشاشة.<br/><strong>الحركة:</strong><br/>تحرك إصبعك للأعلى نحو أعلى الشاشة.><br/><strong>الإجراء:</strong><br/>اعتمادًا على السياق، يمكن أن تحدث إجراءات مختلفة:<br />- على الشاشة الرئيسية أو في قائمة، هذا عادة ما يمرر المحتوى للأسفل.<br />- في تطبيق ملء الشاشة، قد يفتح خيارات إضافية أو درج التطبيق.<br />- في واجهات معينة، يمكن أن يؤدي إلى إجراء "تحديث" أو فتح شريط البحث.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>مدة التمرير السريع بالمللي ثانية. الافتراضي هو `1500` مللي ثانية. كلما انخفضت القيمة، كلما كان التمرير أسرع.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Element`</td>
      <td>العنصر الذي يُستخدم للتمرير داخله. إذا لم يتم توفير عنصر، فسيستخدم المحدد التالي لنظام iOS `-ios predicate string:type == "XCUIElementTypeApplication"` والتالي لنظام Android `//android.widget.ScrollView'`. إذا كانت هناك عناصر متعددة تتطابق مع المحدد الافتراضي، فسيتم اختيار العنصر الأول المطابق بشكل افتراضي. <br /> <strong>للتطبيقات الأصلية للهاتف المحمول فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>النسبة المئوية للعنصر القابل للتمرير (الافتراضي) للتمرير السريع. هذه قيمة بين 0 و 1. الافتراضي هو `0.95`.<br /><strong>لا تقم أبدًا</strong> بالتمرير من الأعلى|الأسفل|اليسار|اليمين بالضبط للشاشة، فقد تؤدي على سبيل المثال إلى ظهور شريط الإشعارات أو ميزات نظام التشغيل/التطبيق الأخرى مما قد يؤدي إلى نتائج غير متوقعة.<br />هذا ليس له تأثير إذا تم توفير `from` و `to`.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>القيم أدناه <strong>فقط</strong> لها تأثير إذا كان `scrollableElement` <strong>غير</strong> متوفر، وإلا فسيتم تجاهلها.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`object`</td>
      <td>إحداثيات x و y لبداية التمرير السريع. إذا تم توفير `scrollableElement`، فلن يكون لهذه الإحداثيات أي تأثير.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>إحداثي x لبداية التمرير السريع.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>إحداثي y لبداية التمرير السريع.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`object`</td>
      <td>إحداثيات x و y لنهاية التمرير السريع. إذا تم توفير `scrollableElement`، فلن يكون لهذه الإحداثيات أي تأثير.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>إحداثي x لنهاية التمرير السريع.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>إحداثي y لنهاية التمرير السريع.</td>
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