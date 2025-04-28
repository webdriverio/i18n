---
id: protocols
title: أوامر البروتوكول
---

يعتمد WebdriverIO على إطار أتمتة يعتمد على مجموعة متنوعة من بروتوكولات الأتمتة للتحكم في وكيل بعيد، مثل المتصفح أو الجهاز المحمول أو التلفزيون. بناءً على الجهاز البعيد، تدخل بروتوكولات مختلفة في اللعبة. يتم تعيين هذه الأوامر إلى كائن [Browser](/docs/api/browser) أو [Element](/docs/api/element) اعتمادًا على معلومات الجلسة من الخادم البعيد (مثل محرك المتصفح).

داخليًا، يستخدم WebdriverIO أوامر البروتوكول لجميع التفاعلات تقريبًا مع الوكيل البعيد. ومع ذلك، تبسط الأوامر الإضافية المعينة إلى كائن [Browser](/docs/api/browser) أو [Element](/docs/api/element) استخدام WebdriverIO، مثلاً الحصول على نص عنصر باستخدام أوامر البروتوكول سيبدو كما يلي:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

باستخدام الأوامر المريحة لكائن [Browser](/docs/api/browser) أو [Element](/docs/api/element) يمكن اختصار هذا إلى:

```js
$('#lst-ib').getText()
```

يشرح القسم التالي كل بروتوكول على حدة.

## بروتوكول WebDriver

[WebDriver](https://w3c.github.io/webdriver/#elements) هو معيار ويب لأتمتة المتصفح. على عكس بعض أدوات E2E الأخرى، فهو يضمن أن الأتمتة يمكن أن تتم على المتصفحات الفعلية التي يستخدمها مستخدموك، مثل Firefox وSafari وChrome والمتصفحات المعتمدة على Chromium مثل Edge، وليس فقط على محركات المتصفح، مثل WebKit، التي تختلف بشكل كبير.

ميزة استخدام بروتوكول WebDriver مقابل بروتوكولات التصحيح مثل [Chrome DevTools](https://w3c.github.io/webdriver/#elements) هي أن لديك مجموعة محددة من الأوامر التي تسمح بالتفاعل مع المتصفح بنفس الطريقة عبر جميع المتصفحات مما يقلل من احتمالية التقلب. علاوة على ذلك، يوفر هذا البروتوكول قدرات للتوسع الهائل باستخدام مزودي الخدمات السحابية مثل [Sauce Labs](https://saucelabs.com/) و[BrowserStack](https://www.browserstack.com/) و[غيرهم](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## بروتوكول WebDriver Bidi

بروتوكول [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) هو الجيل الثاني من البروتوكول ويعمل عليه حاليًا معظم مصنعي المتصفحات. مقارنةً بسلفه، يدعم البروتوكول اتصالًا ثنائي الاتجاه (ومن هنا جاء مصطلح "Bidi") بين الإطار والجهاز البعيد. كما يقدم أيضًا أساسيات إضافية لفحص المتصفح بشكل أفضل لأتمتة تطبيقات الويب الحديثة في المتصفح بشكل أفضل.

نظرًا لأن هذا البروتوكول قيد التطوير حاليًا، سيتم إضافة المزيد من الميزات بمرور الوقت ودعمها من قبل المتصفح. إذا كنت تستخدم أوامر WebdriverIO المريحة، فلن يتغير شيء بالنسبة لك. سيستفيد WebdriverIO من قدرات البروتوكول الجديدة هذه بمجرد توفرها ودعمها في المتصفح.

## Appium

يوفر مشروع [Appium](https://appium.io/) إمكانيات لأتمتة الأجهزة المحمولة وأجهزة سطح المكتب وجميع أنواع أجهزة إنترنت الأشياء الأخرى. بينما يركز WebDriver على المتصفح والويب، فإن رؤية Appium هي استخدام نفس النهج ولكن لأي جهاز عشوائي. بالإضافة إلى الأوامر التي يحددها WebDriver، يحتوي على أوامر خاصة غالبًا ما تكون محددة للجهاز البعيد الذي تتم أتمتته. بالنسبة لسيناريوهات اختبار الأجهزة المحمولة، هذا مثالي عندما تريد كتابة وتشغيل نفس الاختبارات لكل من تطبيقات Android وiOS.

وفقًا لوثائق [Appium](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en)، تم تصميمه لتلبية احتياجات أتمتة الأجهزة المحمولة وفقًا لفلسفة تحددها المبادئ الأربعة التالية:

- لا ينبغي أن تضطر إلى إعادة تجميع تطبيقك أو تعديله بأي شكل من الأشكال من أجل أتمتته.
- لا ينبغي أن تكون مقيدًا بلغة أو إطار عمل معين لكتابة اختباراتك وتشغيلها.
- لا ينبغي أن يعيد إطار أتمتة الأجهزة المحمولة اختراع العجلة عندما يتعلق الأمر بواجهات برمجة التطبيقات للأتمتة.
- يجب أن يكون إطار أتمتة الأجهزة المحمولة مفتوح المصدر، في الروح والممارسة وكذلك في الاسم!

## Chromium

يقدم بروتوكول Chromium مجموعة فائقة من الأوامر فوق بروتوكول WebDriver التي يتم دعمها فقط عند تشغيل جلسات مؤتمتة من خلال [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) أو [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

يقدم بروتوكول Firefox مجموعة فائقة من الأوامر فوق بروتوكول WebDriver التي يتم دعمها فقط عند تشغيل جلسات مؤتمتة من خلال [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

يقدم بروتوكول [Sauce Labs](https://saucelabs.com/) مجموعة فائقة من الأوامر فوق بروتوكول WebDriver التي يتم دعمها فقط عند تشغيل جلسات مؤتمتة باستخدام سحابة Sauce Labs.

## Selenium Standalone

يقدم بروتوكول [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) مجموعة فائقة من الأوامر فوق بروتوكول WebDriver التي يتم دعمها فقط عند تشغيل جلسات مؤتمتة باستخدام Selenium Grid.

## بروتوكول JSON Wire

بروتوكول [JSON Wire](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) هو سلف بروتوكول WebDriver وهو __مهمل__ اليوم. بينما قد يتم دعم بعض الأوامر في بيئات معينة، لا يُنصح باستخدام أي من أوامره.

## بروتوكول Mobile JSON Wire

بروتوكول [Mobile JSON Wire](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) هو مجموعة فائقة من أوامر الجوال فوق بروتوكول JSON Wire. نظرًا لأن هذا الأخير مهمل، فإن بروتوكول Mobile JSON Wire أصبح أيضًا __مهملًا__. قد يدعم Appium بعضًا من أوامره ولكن لا يُنصح باستخدامها.