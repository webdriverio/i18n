---
id: protocols
title: أوامر البروتوكول
---

WebdriverIO هو إطار أتمتة يعتمد على بروتوكولات أتمتة متنوعة للتحكم في وكيل بعيد، مثل المتصفح أو الأجهزة المحمولة أو التلفزيون. بناءً على الجهاز البعيد، تأتي بروتوكولات مختلفة في اللعب. يتم تعيين هذه الأوامر إلى كائن [Browser](/docs/api/browser) أو [Element](/docs/api/element) اعتمادًا على معلومات الجلسة بواسطة الخادم البعيد (مثل برنامج تشغيل المتصفح).

داخليًا، يستخدم WebdriverIO أوامر البروتوكول لجميع التفاعلات تقريبًا مع الوكيل البعيد. ومع ذلك، توفر الأوامر الإضافية المعينة لكائن [Browser](/docs/api/browser) أو [Element](/docs/api/element) استخدامًا مبسطًا لـ WebdriverIO، على سبيل المثال، الحصول على نص عنصر باستخدام أوامر البروتوكول سيبدو هكذا:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

باستخدام الأوامر المناسبة لكائن [Browser](/docs/api/browser) أو [Element](/docs/api/element) يمكن تقليص هذا إلى:

```js
$('#lst-ib').getText()
```

يشرح القسم التالي كل بروتوكول بشكل فردي.

## بروتوكول WebDriver

بروتوكول [WebDriver](https://w3c.github.io/webdriver/#elements) هو معيار ويب لأتمتة المتصفح. على عكس بعض أدوات E2E الأخرى، فإنه يضمن إمكانية تنفيذ الأتمتة على المتصفحات الفعلية التي يستخدمها المستخدمون، مثل Firefox وSafari وChrome والمتصفحات القائمة على Chromium مثل Edge، وليس فقط على محركات المتصفح، مثل WebKit، والتي تختلف كثيرًا.

ميزة استخدام بروتوكول WebDriver على عكس بروتوكولات التصحيح مثل [Chrome DevTools](https://w3c.github.io/webdriver/#elements) هي أن لديك مجموعة محددة من الأوامر التي تسمح بالتفاعل مع المتصفح بنفس الطريقة عبر جميع المتصفحات مما يقلل من احتمالية عدم الاستقرار. علاوة على ذلك، يوفر هذا البروتوكول قدرات للتوسع الهائل باستخدام مزودي الخدمات السحابية مثل [Sauce Labs](https://saucelabs.com/) و[BrowserStack](https://www.browserstack.com/) و[غيرها](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## بروتوكول WebDriver Bidi

بروتوكول [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) هو الجيل الثاني من البروتوكول ويجري العمل عليه حاليًا من قبل معظم مصنعي المتصفحات. مقارنة بسلفه، يدعم البروتوكول اتصالًا ثنائي الاتجاه (ومن هنا جاء "Bidi") بين الإطار والجهاز البعيد. كما أنه يقدم عناصر أولية إضافية لفحص المتصفح بشكل أفضل لتحسين أتمتة تطبيقات الويب الحديثة في المتصفح.

نظرًا لأن هذا البروتوكول قيد التطوير حاليًا، سيتم إضافة المزيد من الميزات بمرور الوقت ودعمها من قبل المتصفح. إذا كنت تستخدم أوامر WebdriverIO المناسبة، فلن يتغير شيء بالنسبة لك. سيستفيد WebdriverIO من هذه القدرات الجديدة للبروتوكول بمجرد توفرها ودعمها في المتصفح.

## Appium

يوفر مشروع [Appium](https://appium.io/) قدرات لأتمتة الأجهزة المحمولة وأجهزة سطح المكتب وجميع أنواع أجهزة إنترنت الأشياء الأخرى. بينما يركز WebDriver على المتصفح والويب، فإن رؤية Appium هي استخدام نفس النهج ولكن لأي جهاز اعتباطي. بالإضافة إلى الأوامر التي يحددها WebDriver، فإنه يحتوي على أوامر خاصة غالبًا ما تكون محددة للجهاز البعيد الذي يتم أتمتته. بالنسبة لسيناريوهات اختبار الأجهزة المحمولة، هذا مثالي عندما تريد كتابة وتشغيل نفس الاختبارات لكل من تطبيقات Android وiOS.

وفقًا لوثائق Appium [documentation](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en)، تم تصميمه لتلبية احتياجات أتمتة الأجهزة المحمولة وفقًا لفلسفة محددة بأربعة مبادئ:

- لا ينبغي أن تضطر إلى إعادة تجميع تطبيقك أو تعديله بأي شكل من الأشكال من أجل أتمتته.
- لا ينبغي أن تكون مقيدًا بلغة أو إطار معين لكتابة وتشغيل اختباراتك.
- لا ينبغي أن يعيد إطار أتمتة الأجهزة المحمولة اختراع العجلة عندما يتعلق الأمر بواجهات برمجة تطبيقات الأتمتة.
- يجب أن يكون إطار أتمتة الأجهزة المحمولة مفتوح المصدر، في الروح والممارسة وكذلك في الاسم!

## Chromium

يقدم بروتوكول Chromium مجموعة فائقة من الأوامر فوق بروتوكول WebDriver والتي يتم دعمها فقط عند تشغيل جلسات أتمتة من خلال [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) أو [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

يقدم بروتوكول Firefox مجموعة فائقة من الأوامر فوق بروتوكول WebDriver والتي يتم دعمها فقط عند تشغيل جلسات أتمتة من خلال [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

يقدم بروتوكول [Sauce Labs](https://saucelabs.com/) مجموعة فائقة من الأوامر فوق بروتوكول WebDriver والتي يتم دعمها فقط عند تشغيل جلسات أتمتة باستخدام سحابة Sauce Labs.

## Selenium Standalone

يقدم بروتوكول [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) مجموعة فائقة من الأوامر فوق بروتوكول WebDriver والتي يتم دعمها فقط عند تشغيل جلسات أتمتة باستخدام Selenium Grid.

## JSON Wire Protocol

بروتوكول [JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) هو سلف بروتوكول WebDriver و__مهمل__ اليوم. بينما قد لا تزال بعض الأوامر مدعومة في بيئات معينة، فإنه غير موصى به استخدام أي من أوامره.

## Mobile JSON Wire Protocol

بروتوكول [Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) هو مجموعة فائقة من أوامر الأجهزة المحمولة فوق JSON Wire Protocol. نظرًا لأن هذا الأخير مهمل، فإن Mobile JSON Wire Protocol أصبح أيضًا __مهملًا__. قد لا يزال Appium يدعم بعض أوامره ولكن لا يُنصح باستخدامها.