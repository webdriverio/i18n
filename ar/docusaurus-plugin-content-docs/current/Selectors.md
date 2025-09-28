---
id: selectors
title: المحددات
---

يوفر [بروتوكول WebDriver](https://w3c.github.io/webdriver/) عدة استراتيجيات للمحددات للاستعلام عن عنصر. يقوم WebdriverIO بتبسيطها للحفاظ على بساطة تحديد العناصر. يرجى ملاحظة أنه على الرغم من أن أمر الاستعلام عن العناصر يسمى `$` و `$$`، إلا أنها لا علاقة لها بـ jQuery أو [Sizzle Selector Engine](https://github.com/jquery/sizzle).

بينما هناك العديد من المحددات المختلفة المتاحة، فإن عددًا قليلًا منها فقط يوفر طريقة مرنة للعثور على العنصر المناسب. على سبيل المثال، بالنظر إلى الزر التالي:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

نحن __نوصي__ و __لا نوصي__ بالمحددات التالية:

| المحدد | موصى به | ملاحظات |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 أبدًا | الأسوأ - عام جدًا، بدون سياق. |
| `$('.btn.btn-large')` | 🚨 أبدًا | سيء. مرتبط بالتصميم. عرضة للتغيير بشكل كبير. |
| `$('#main')` | ⚠️ بشكل متقطع | أفضل. لكنه لا يزال مرتبطًا بالتصميم أو مستمعي أحداث JS. |
| `$(() => document.queryElement('button'))` | ⚠️ بشكل متقطع | استعلام فعال، معقد في الكتابة. |
| `$('button[name="submission"]')` | ⚠️ بشكل متقطع | مرتبط بسمة `name` التي لها دلالات HTML. |
| `$('button[data-testid="submit"]')` | ✅ جيد | يتطلب سمة إضافية، غير متصل بإمكانية الوصول. |
| `$('aria/Submit')` | ✅ جيد | جيد. يشبه كيفية تفاعل المستخدم مع الصفحة. يوصى باستخدام ملفات الترجمة حتى لا تنكسر اختباراتك عند تحديث الترجمات. ملاحظة: قد يكون هذا المحدد أبطأ من غيره على الصفحات الكبيرة. |
| `$('button=Submit')` | ✅ دائمًا | الأفضل. يشبه كيفية تفاعل المستخدم مع الصفحة وهو سريع. يوصى باستخدام ملفات الترجمة حتى لا تنكسر اختباراتك عند تحديث الترجمات. |

## محدد استعلام CSS

إذا لم يتم الإشارة إلى خلاف ذلك، سيقوم WebdriverIO بالاستعلام عن العناصر باستخدام نمط [محدد CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)، على سبيل المثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## نص الرابط

للحصول على عنصر الرابط بنص محدد، استعلم عن النص الذي يبدأ بعلامة يساوي (`=`).

على سبيل المثال:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

يمكنك الاستعلام عن هذا العنصر عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## نص الرابط الجزئي

للعثور على عنصر رابط يتطابق نصه المرئي جزئيًا مع قيمة البحث الخاصة بك،
استعلم عنه باستخدام `*=` في بداية سلسلة الاستعلام (مثل `*=driver`).

يمكنك الاستعلام عن العنصر من المثال أعلاه أيضًا عن طريق الاستدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__ملاحظة:__ لا يمكنك مزج استراتيجيات محدد متعددة في محدد واحد. استخدم استعلامات العناصر المتسلسلة المتعددة للوصول إلى نفس الهدف، على سبيل المثال:

```js
const elem = await $('header h1*=Welcome') // لا يعمل!!!
// استخدم بدلاً من ذلك
const elem = await $('header').$('*=driver')
```

## عنصر بنص معين

يمكن تطبيق نفس التقنية على العناصر أيضًا. بالإضافة إلى ذلك، من الممكن أيضًا إجراء مطابقة بدون مراعاة حالة الأحرف باستخدام `.=` أو `.*=` داخل الاستعلام.

على سبيل المثال، هنا استعلام لعنوان من المستوى 1 بنص "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

يمكنك الاستعلام عن هذا العنصر عن طريق الاستدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

أو استخدام استعلام النص الجزئي:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

نفس الأمر ينطبق على أسماء `id` و `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

يمكنك الاستعلام عن هذا العنصر عن طريق الاستدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__ملاحظة:__ لا يمكنك مزج استراتيجيات محدد متعددة في محدد واحد. استخدم استعلامات العناصر المتسلسلة المتعددة للوصول إلى نفس الهدف، على سبيل المثال:

```js
const elem = await $('header h1*=Welcome') // لا يعمل!!!
// استخدم بدلاً من ذلك
const elem = await $('header').$('h1*=Welcome')
```

## اسم العلامة

للاستعلام عن عنصر باسم علامة محدد، استخدم `<tag>` أو `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

يمكنك الاستعلام عن هذا العنصر عن طريق الاستدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## سمة الاسم

للاستعلام عن العناصر بسمة اسم محددة، يمكنك إما استخدام محدد CSS3 عادي أو استراتيجية الاسم المقدمة من [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) عن طريق تمرير شيء مثل [name="some-name"] كمعلمة محدد:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__ملاحظة:__ استراتيجية المحدد هذه مهملة وتعمل فقط في المتصفحات القديمة التي يتم تشغيلها بواسطة بروتوكول JSONWireProtocol أو باستخدام Appium.

## xPath

من الممكن أيضًا الاستعلام عن العناصر عبر [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) محدد.

محدد xPath له صيغة مثل `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

يمكنك الاستعلام عن الفقرة الثانية عن طريق الاستدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

يمكنك استخدام xPath أيضًا للتنقل لأعلى ولأسفل في شجرة DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## محدد اسم إمكانية الوصول

استعلم عن العناصر حسب أسمائها الوصولية. الاسم الوصولي هو ما يتم إعلانه بواسطة قارئ الشاشة عندما يتلقى هذا العنصر التركيز. يمكن أن تكون قيمة الاسم الوصولي محتوى مرئيًا أو بدائل نصية مخفية.

:::info

يمكنك قراءة المزيد حول هذا المحدد في [منشور مدونة الإصدار](/blog/2022/09/05/accessibility-selector)

:::

### البحث بواسطة `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### البحث بواسطة `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### البحث حسب المحتوى

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### البحث حسب العنوان

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### البحث بواسطة خاصية `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - سمة الدور

للاستعلام عن العناصر بناءً على [أدوار ARIA](https://www.w3.org/TR/html-aria/#docconformance)، يمكنك تحديد دور العنصر مباشرةً مثل `[role=button]` كمعلمة محدد:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## سمة ID

استراتيجية محدد "id" غير مدعومة في بروتوكول WebDriver، يجب على المرء استخدام استراتيجيات محدد CSS أو xPath بدلاً من ذلك للعثور على العناصر باستخدام ID.

ومع ذلك، قد تظل بعض برامج التشغيل (مثل [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) [تدعم](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) هذا المحدد.

صيغ المحدد المدعومة حاليًا لـ ID هي:

```js
//css locator
const button = await $('#someid')
//xpath locator
const button = await $('//*[@id="someid"]')
//id strategy
// Note: works only in Appium or similar frameworks which supports locator strategy "ID"
const button = await $('id=resource-id/iosname')
```

## دالة JS

يمكنك أيضًا استخدام دوال JavaScript لجلب العناصر باستخدام واجهات برمجة التطبيقات الأصلية للويب. بالطبع، يمكنك فقط القيام بذلك داخل سياق الويب (مثل `browser`، أو سياق الويب في الجوال).

بالنظر إلى بنية HTML التالية:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

يمكنك الاستعلام عن العنصر الشقيق لـ `#elem` على النحو التالي:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## المحددات العميقة

:::warning

بدءًا من الإصدار `v9` من WebdriverIO، لا حاجة إلى هذا المحدد الخاص حيث يخترق WebdriverIO تلقائيًا DOM الظلي من أجلك. يوصى بالتخلي عن هذا المحدد عن طريق إزالة `>>>` في مقدمته.

:::

تعتمد العديد من تطبيقات الواجهة الأمامية بشكل كبير على العناصر ذات [DOM الظلي](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). من المستحيل تقنيًا الاستعلام عن العناصر داخل DOM الظلي بدون حلول بديلة. كانت [`shadow$`](https://webdriver.io/docs/api/element/shadow$) و[`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) مثل هذه الحلول البديلة التي كانت لها [قيود](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). باستخدام المحدد العميق، يمكنك الآن الاستعلام عن جميع العناصر داخل أي DOM ظلي باستخدام أمر الاستعلام الشائع.

بفرض أن لدينا تطبيقًا بالهيكل التالي:

![مثال Chrome](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "مثال Chrome")

باستخدام هذا المحدد، يمكنك الاستعلام عن عنصر `<button />` المتداخل داخل DOM ظلي آخر، على سبيل المثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## محددات الجوال

بالنسبة لاختبار الجوال الهجين، من المهم أن يكون خادم الأتمتة في *السياق* الصحيح قبل تنفيذ الأوامر. لأتمتة الإيماءات، يجب أن يتم تعيين برنامج التشغيل على السياق الأصلي بشكل مثالي. ولكن لتحديد العناصر من DOM، سيحتاج برنامج التشغيل إلى التعيين إلى سياق عرض الويب للمنصة. فقط *بعد ذلك* يمكن استخدام الطرق المذكورة أعلاه.

بالنسبة لاختبار الجوال الأصلي، لا يوجد تبديل بين السياقات، حيث يجب عليك استخدام استراتيجيات الجوال واستخدام تقنية أتمتة الجهاز الأساسية مباشرةً. هذا مفيد بشكل خاص عندما يحتاج الاختبار إلى بعض التحكم الدقيق في العثور على العناصر.

### Android UiAutomator

يوفر إطار عمل UI Automator في Android عددًا من الطرق للعثور على العناصر. يمكنك استخدام [واجهة برمجة تطبيقات UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)، وخاصة [فئة UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) لتحديد مواقع العناصر. في Appium، ترسل كود Java، كسلسلة، إلى الخادم، الذي ينفذه في بيئة التطبيق، مع إعادة العنصر أو العناصر.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher و ViewMatcher (Espresso فقط)

توفر استراتيجية DataMatcher في Android طريقة للعثور على العناصر بواسطة [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

وبالمثل [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (Espresso فقط)

توفر استراتيجية علامة العرض طريقة مريحة للعثور على العناصر حسب [علامتها](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

عند أتمتة تطبيق iOS، يمكن استخدام [إطار عمل UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) من Apple للعثور على العناصر.

واجهة برمجة تطبيقات JavaScript هذه [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) لها طرق للوصول إلى العرض وكل شيء عليه.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

يمكنك أيضًا استخدام البحث عن المسند ضمن iOS UI Automation في Appium لتحسين تحديد العنصر بشكل أكبر. انظر [هنا](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) للحصول على التفاصيل.

### سلاسل المسند XCUITest لـ iOS وسلاسل الفئة

مع iOS 10 وما فوق (باستخدام برنامج التشغيل `XCUITest`)، يمكنك استخدام [سلاسل المسند](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

و[سلاسل الفئة](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### معرف إمكانية الوصول

تم تصميم استراتيجية محدد `accessibility id` لقراءة معرف فريد لعنصر واجهة المستخدم. هذا له فائدة عدم التغيير أثناء الترجمة أو أي عملية أخرى قد تغير النص. بالإضافة إلى ذلك، يمكن أن تكون مساعدة في إنشاء اختبارات عبر المنصات، إذا كان للعناصر التي هي وظيفيًا نفسها نفس معرف إمكانية الوصول.

- بالنسبة لـ iOS، هذا هو `accessibility identifier` الذي وضعته Apple [هنا](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- بالنسبة لـ Android، يتم تعيين `accessibility id` إلى `content-description` للعنصر، كما هو موضح [هنا](https://developer.android.com/training/accessibility/accessible-app.html).

بالنسبة لكلتا المنصتين، يعد الحصول على عنصر (أو عناصر متعددة) حسب `accessibility id` الخاص بها هو أفضل طريقة عادةً. وهي أيضًا الطريقة المفضلة على استراتيجية `name` المهملة.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### اسم الفئة

استراتيجية `class name` هي `string` تمثل عنصر واجهة المستخدم في العرض الحالي.

- بالنسبة لـ iOS، هو الاسم الكامل لفئة [UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)، وسيبدأ بـ `UIA-`، مثل `UIATextField` لحقل نص. يمكن العثور على مرجع كامل [هنا](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- بالنسبة لـ Android، هو الاسم المؤهل بالكامل لفئة [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [class](https://developer.android.com/reference/android/widget/package-summary.html)، مثل `android.widget.EditText` لحقل نص. يمكن العثور على مرجع كامل [هنا](https://developer.android.com/reference/android/widget/package-summary.html).
- بالنسبة لـ Youi.tv، هو الاسم الكامل لفئة Youi.tv، وسيبدأ بـ `CYI-`، مثل `CYIPushButtonView` لعنصر زر الدفع. يمكن العثور على مرجع كامل في [صفحة GitHub الخاصة بـ You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// مثال iOS
await $('UIATextField').click()
// مثال Android
await $('android.widget.DatePicker').click()
// مثال Youi.tv
await $('CYIPushButtonView').click()
```

## سلسلة المحددات

إذا كنت ترغب في أن تكون أكثر تحديدًا في استعلامك، يمكنك تسلسل المحددات حتى تجد العنصر المناسب. إذا استدعيت `element` قبل الأمر الفعلي، يبدأ WebdriverIO الاستعلام من ذلك العنصر.

على سبيل المثال، إذا كان لديك هيكل DOM مثل:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

وتريد إضافة المنتج B إلى العربة، سيكون من الصعب القيام بذلك باستخدام محدد CSS فقط.

باستخدام تسلسل المحددات، الأمر أسهل بكثير. ما عليك سوى تضييق نطاق العنصر المطلوب خطوة بخطوة:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### محدد صورة Appium

باستخدام استراتيجية محدد `-image`، من الممكن إرسال ملف صورة إلى Appium يمثل العنصر الذي تريد الوصول إليه.

تنسيقات الملفات المدعومة `jpg,png,gif,bmp,svg`

يمكن العثور على المرجع الكامل [هنا](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**ملاحظة**: الطريقة التي يعمل بها Appium مع هذا المحدد هي أنه سيقوم داخليًا بعمل لقطة شاشة (للتطبيق) واستخدام محدد الصورة المقدم للتحقق مما إذا كان يمكن العثور على العنصر في لقطة الشاشة (للتطبيق) تلك.

كن على دراية بحقيقة أن Appium قد يغير حجم لقطة الشاشة (للتطبيق) المأخوذة لجعلها تتطابق مع حجم CSS لشاشة (تطبيق)ك (سيحدث هذا على أجهزة iPhone ولكن أيضًا على أجهزة Mac مع شاشة Retina لأن DPR أكبر من 1). سيؤدي هذا إلى عدم العثور على تطابق لأن محدد الصورة المقدم ربما تم أخذه من لقطة الشاشة الأصلية.
يمكنك إصلاح ذلك عن طريق تحديث إعدادات خادم Appium، راجع [وثائق Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) للإعدادات و[هذا التعليق](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) للحصول على شرح مفصل.

## محددات React

يوفر WebdriverIO طريقة لتحديد مكونات React بناءً على اسم المكون. للقيام بذلك، لديك خيار من بين أمرين: `react$` و `react$$`.

تتيح لك هذه الأوامر تحديد المكونات من [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) وإرجاع إما عنصر WebdriverIO واحد أو مصفوفة من العناصر (اعتمادًا على الدالة المستخدمة).

**ملاحظة**: الأوامر `react$` و `react$$` متشابهة في الوظائف، باستثناء أن `react$$` ستعيد *جميع* الحالات المطابقة كمصفوفة من عناصر WebdriverIO، و`react$` ستعيد الحالة الأولى التي تم العثور عليها.

#### مثال أساسي

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

في الكود أعلاه، هناك نسخة بسيطة من `MyComponent` داخل التطبيق، والتي يقوم React بعرضها داخل عنصر HTML مع `id="root"`.

باستخدام أمر `browser.react$`، يمكنك تحديد نسخة من `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

الآن بعد أن أصبح لديك عنصر WebdriverIO المخزن في متغير `myCmp`، يمكنك تنفيذ أوامر العنصر ضده.

#### تصفية المكونات

تتيح المكتبة التي يستخدمها WebdriverIO داخليًا تصفية تحديدك حسب خصائص و/أو حالة المكون. للقيام بذلك، تحتاج إلى تمرير وسيطة ثانية للخصائص و/أو وسيطة ثالثة للحالة إلى أمر المتصفح.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

إذا كنت تريد تحديد نسخة من `MyComponent` التي لها خاصية `name` بقيمة `WebdriverIO`، يمكنك تنفيذ الأمر كالتالي:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

إذا كنت ترغب في تصفية تحديدك حسب الحالة، فإن أمر `browser` سيبدو شيئًا مثل:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### التعامل مع `React.Fragment`

عند استخدام أمر `react$` لتحديد [أجزاء](https://reactjs.org/docs/fragments.html) React، سيعيد WebdriverIO الطفل الأول لهذا المكون كعقدة المكون. إذا استخدمت `react$$`، فستتلقى مصفوفة تحتوي على جميع عقد HTML داخل الأجزاء التي تطابق المحدد.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

بالنظر إلى المثال أعلاه، هكذا ستعمل الأوامر:

```js
await browser.react$('MyComponent') // يعيد عنصر WebdriverIO للـ <div /> الأول
await browser.react$$('MyComponent') // يعيد عناصر WebdriverIO للمصفوفة [<div />, <div />]
```

**ملاحظة:** إذا كان لديك نسخ متعددة من `MyComponent` واستخدمت `react$$` لتحديد مكونات الأجزاء هذه، فسيتم إرجاع مصفوفة أحادية الأبعاد من جميع العقد. بعبارة أخرى، إذا كان لديك 3 نسخ من `<MyComponent />`، فسيتم إرجاع مصفوفة بستة عناصر WebdriverIO.

## استراتيجيات المحدد المخصصة


إذا كان تطبيقك يتطلب طريقة محددة لجلب العناصر، يمكنك تعريف استراتيجية محدد مخصصة يمكنك استخدامها مع `custom$` و `custom$$`. لذلك قم بتسجيل استراتيجيتك مرة واحدة في بداية الاختبار، على سبيل المثال في دالة `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

بالنظر إلى مقتطف HTML التالي:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

ثم استخدمه عن طريق الاستدعاء:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**ملاحظة:** هذا يعمل فقط في بيئة الويب التي يمكن فيها تشغيل أمر [`execute`](/docs/api/browser/execute).