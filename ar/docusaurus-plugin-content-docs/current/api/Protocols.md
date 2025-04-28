---
id: protocols
title: أوامر البروتوكول
---

WebdriverIO هو إطار عمل للأتمتة يعتمد على مجموعة متنوعة من بروتوكولات الأتمتة للتحكم في وكيل بعيد، على سبيل المثال للمتصفح أو الجهاز المحمول أو التلفزيون. بناءً على الجهاز البعيد، تدخل بروتوكولات مختلفة حيز التنفيذ. يتم تعيين هذه الأوامر إلى كائن [Browser](/docs/api/browser) أو [Element](/docs/api/element) اعتمادًا على معلومات الجلسة من الخادم البعيد (مثل متصفح السائق).

داخليًا، يستخدم WebdriverIO أوامر البروتوكول لتقريبًا جميع التفاعلات مع الوكيل البعيد. ومع ذلك، فإن الأوامر الإضافية المخصصة لكائن [Browser](/docs/api/browser) أو [Element](/docs/api/element) تبسط استخدام WebdriverIO، على سبيل المثال، الحصول على نص عنصر باستخدام أوامر البروتوكول سيبدو كما يلي:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

باستخدام الأوامر المريحة لكائن [Browser](/docs/api/browser) أو [Element](/docs/api/element) يمكن تقليل هذا إلى:

```js
$('#lst-ib').getText()
```

يشرح القسم التالي كل بروتوكول بشكل فردي.

## بروتوكول WebDriver

بروتوكول [WebDriver](https://w3c.github.io/webdriver/#elements) هو معيار ويب لأتمتة المتصفح. على عكس بعض أدوات اختبار E2E الأخرى، فإنه يضمن إمكانية تنفيذ الأتمتة على المتصفحات الفعلية التي يستخدمها المستخدمون، مثل Firefox و Safari و Chrome والمتصفحات المستندة إلى Chromium مثل Edge، وليس فقط على محركات المتصفح، مثل WebKit، والتي تختلف كثيرًا.

ميزة استخدام بروتوكول WebDriver على عكس بروتوكولات التصحيح مثل [Chrome DevTools](https://w3c.github.io/webdriver/#elements) هي أن لديك مجموعة محددة من الأوامر التي تسمح بالتفاعل مع المتصفح بنفس الطريقة عبر جميع المتصفحات مما يقلل من احتمالية عدم الاستقرار. علاوة على ذلك، يوفر هذا البروتوكول قدرات للتوسع الهائل باستخدام مزودي الخدمات السحابية مثل [Sauce Labs](https://saucelabs.com/) و [BrowserStack](https://www.browserstack.com/) و [غيرها](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## بروتوكول WebDriver Bidi

بروتوكول [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) هو الجيل الثاني من البروتوكول ويتم العمل عليه حاليًا من قبل معظم مطوري المتصفحات. مقارنة بسلفه، يدعم البروتوكول اتصالاً ثنائي الاتجاه (ومن هنا جاءت كلمة "Bidi") بين الإطار والجهاز البعيد. كما أنه يقدم أوليات إضافية لفحص أفضل للمتصفح لأتمتة تطبيقات الويب الحديثة في المتصفح بشكل أفضل.

نظرًا لأن هذا البروتوكول قيد التطوير حاليًا، سيتم إضافة المزيد من الميزات بمرور الوقت ودعمها من قبل المتصفح. إذا كنت تستخدم أوامر WebdriverIO المريحة، فلن يتغير شيء بالنسبة لك. سيستفيد WebdriverIO من قدرات البروتوكول الجديدة هذه بمجرد توفرها ودعمها في المتصفح.

## Appium

يوفر مشروع [Appium](https://appium.io/) إمكانيات لأتمتة الأجهزة المحمولة وأجهزة سطح المكتب وجميع أنواع أجهزة إنترنت الأشياء الأخرى. بينما يركز WebDriver على المتصفح والويب، فإن رؤية Appium هي استخدام نفس النهج ولكن لأي جهاز عشوائي. بالإضافة إلى الأوامر التي يحددها WebDriver، فإنه يحتوي على أوامر خاصة غالبًا ما تكون خاصة بالجهاز البعيد الذي تتم أتمتته. بالنسبة لسيناريوهات اختبار الأجهزة المحمولة، هذا مثالي عندما تريد كتابة وتشغيل نفس الاختبارات لتطبيقات Android و iOS.

وفقًا لـ [وثائق](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) Appium، تم تصميمه لتلبية احتياجات أتمتة الأجهزة المحمولة وفقًا لفلسفة موضحة من خلال المبادئ الأربعة التالية:

- لا ينبغي أن تضطر إلى إعادة تجميع تطبيقك أو تعديله بأي شكل من الأشكال من أجل أتمتته.
- لا ينبغي أن تكون مقيدًا بلغة أو إطار عمل معين لكتابة وتشغيل اختباراتك.
- لا ينبغي لإطار أتمتة الأجهزة المحمولة أن يعيد اختراع العجلة عندما يتعلق الأمر بواجهات برمجة تطبيقات الأتمتة.
- يجب أن يكون إطار أتمتة الأجهزة المحمولة مفتوح المصدر، في الروح والممارسة وكذلك في الاسم!

## Chromium

يقدم بروتوكول Chromium مجموعة فائقة من الأوامر فوق بروتوكول WebDriver والتي يتم دعمها فقط عند تشغيل جلسات مؤتمتة من خلال [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) أو [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

يقدم بروتوكول Firefox مجموعة فائقة من الأوامر فوق بروتوكول WebDriver والتي يتم دعمها فقط عند تشغيل جلسات مؤتمتة من خلال [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

يقدم بروتوكول [Sauce Labs](https://saucelabs.com/) مجموعة فائقة من الأوامر فوق بروتوكول WebDriver والتي يتم دعمها فقط عند تشغيل جلسات مؤتمتة باستخدام سحابة Sauce Labs.

## Selenium Standalone

يقدم بروتوكول [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) مجموعة فائقة من الأوامر فوق بروتوكول WebDriver والتي يتم دعمها فقط عند تشغيل جلسات مؤتمتة باستخدام Selenium Grid.

## JSON Wire Protocol

[JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) هو سلف سابق لبروتوكول WebDriver و __مهجور__ اليوم. في حين أن بعض الأوامر قد تظل مدعومة في بيئات معينة، إلا أنه لا يُنصح باستخدام أي من أوامرها.

## Mobile JSON Wire Protocol

[Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) هو مجموعة فائقة من أوامر الأجهزة المحمولة فوق JSON Wire Protocol. نظرًا لأن هذا الأخير مهجور، فإن Mobile JSON Wire Protocol أصبح أيضًا __مهجورًا__. قد يستمر Appium في دعم بعض أوامره ولكن لا يُنصح باستخدامها.