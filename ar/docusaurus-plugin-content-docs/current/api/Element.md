---
id: element
title: كائن العنصر
---

كائن العنصر هو كائن يمثل عنصرًا في وكيل المستخدم البعيد، مثل [DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element) عند تشغيل جلسة داخل متصفح أو [عنصر جوال](https://developer.apple.com/documentation/swift/sequence/element) للأجهزة المحمولة. يمكن استلامه باستخدام أحد أوامر استعلام العناصر المتعددة، مثل [`$`](/docs/api/element/$) و[`custom$`](/docs/api/element/custom$) و[`react$`](/docs/api/element/react$) أو [`shadow$`](/docs/api/element/shadow$).

## الخصائص

يحتوي كائن العنصر على الخصائص التالية:

| الاسم | النوع | التفاصيل |
| ---- | ---- | ------- |
| `sessionId` | `String` | معرف الجلسة المخصص من الخادم البعيد. |
| `elementId` | `String` | [مرجع عنصر الويب](https://w3c.github.io/webdriver/#elements) المرتبط الذي يمكن استخدامه للتفاعل مع العنصر على مستوى البروتوكول |
| `selector` | `String` | [المحدد](/docs/selectors) المستخدم للاستعلام عن العنصر. |
| `parent` | `Object` | إما [كائن المتصفح](/docs/api/browser) عندما تم جلب العنصر منه (مثل `const elem = browser.$('selector')`) أو [كائن العنصر](/docs/api/element) إذا تم جلبه من نطاق عنصر (مثل `elem.$('selector')`) |
| `options` | `Object` | [خيارات](/docs/configuration) WebdriverIO اعتمادًا على كيفية إنشاء كائن المتصفح. انظر المزيد في [أنواع الإعداد](/docs/setuptypes). |

## الطرق
يوفر كائن العنصر جميع الطرق من قسم البروتوكول، مثل بروتوكول [WebDriver](/docs/api/webdriver) بالإضافة إلى الأوامر المدرجة ضمن قسم العنصر. تعتمد أوامر البروتوكول المتاحة على نوع الجلسة. إذا كنت تقوم بتشغيل جلسة متصفح آلية، فلن تكون أي من أوامر Appium [المتاحة](/docs/api/appium) متوفرة والعكس صحيح.

بالإضافة إلى ذلك، تتوفر الأوامر التالية:

| الاسم | المعلمات | التفاصيل |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (النوع: `String`)<br />- `fn` (النوع: `Function`) | يسمح بتعريف أوامر مخصصة يمكن استدعاؤها من كائن المتصفح لأغراض التكوين. اقرأ المزيد في دليل [الأوامر المخصصة](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (النوع: `String`)<br />- `fn` (النوع: `Function`) | يسمح بإعادة كتابة أي أمر متصفح بوظائف مخصصة. استخدمه بحذر لأنه قد يربك مستخدمي الإطار. اقرأ المزيد في دليل [الأوامر المخصصة](/docs/customcommands#overwriting-native-commands). |

## ملاحظات

### سلسلة العناصر

عند العمل مع العناصر، يوفر WebdriverIO بناء جملة خاص لتبسيط الاستعلام عنها وتكوين عمليات بحث عن عناصر معقدة متداخلة. نظرًا لأن كائنات العناصر تتيح لك العثور على عناصر ضمن فرع الشجرة الخاص بها باستخدام طرق الاستعلام الشائعة، يمكن للمستخدمين جلب العناصر المتداخلة على النحو التالي:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // يخرج "I am a headline"
```

مع الهياكل المتداخلة العميقة، يمكن أن يكون تعيين أي عنصر متداخل إلى مصفوفة ثم استخدامه مطولاً جدًا. لذلك، يمتلك WebdriverIO مفهوم استعلامات العناصر المتسلسلة التي تسمح بجلب العناصر المتداخلة على هذا النحو:

```js
console.log(await $('#header').$('#headline').getText())
```

هذا يعمل أيضًا عند جلب مجموعة من العناصر، على سبيل المثال:

```js
// الحصول على نص العنوان الثالث داخل الرأس الثاني
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

عند العمل مع مجموعة من العناصر، يمكن أن يكون هذا مفيدًا بشكل خاص عند محاولة التفاعل معها، فبدلاً من القيام بـ:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

يمكنك استدعاء طرق المصفوفة مباشرة على سلسلة العناصر، مثل:

```js
const location = await $$('div').map((el) => el.getLocation())
```

نفس الشيء:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

يستخدم WebdriverIO تنفيذًا مخصصًا يدعم المكررات غير المتزامنة في الخلفية، لذا فإن جميع الأوامر من واجهة برمجة التطبيقات الخاصة بهم مدعومة أيضًا لهذه الحالات.

__ملاحظة:__ تعيد جميع المكررات غير المتزامنة وعداً حتى إذا لم تقم وظيفة رد الاتصال الخاصة بك بإرجاع واحد، على سبيل المثال:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ يعيد "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ يعيد "string[]"
```

### الأوامر المخصصة

يمكنك تعيين أوامر مخصصة على نطاق المتصفح لتجريد سير العمل المستخدم بشكل شائع. راجع دليلنا حول [الأوامر المخصصة](/docs/customcommands#adding-custom-commands) لمزيد من المعلومات.