---
id: automationProtocols
title: بروتوكولات الأتمتة
---

مع WebdriverIO، يمكنك الاختيار بين تقنيات أتمتة متعددة عند تشغيل اختبارات E2E محليًا أو في السحابة. بشكل افتراضي، سيحاول WebdriverIO بدء جلسة أتمتة محلية باستخدام بروتوكول [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/).

## بروتوكول WebDriver Bidi

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) هو بروتوكول أتمتة لأتمتة المتصفحات باستخدام الاتصال ثنائي الاتجاه. إنه خليفة بروتوكول [WebDriver](https://w3c.github.io/webdriver/) ويتيح قدرات استكشافية أكثر لحالات الاستخدام المختلفة للاختبار.

هذا البروتوكول قيد التطوير حاليًا وقد تتم إضافة عناصر أساسية جديدة في المستقبل. التزم جميع مزودي المتصفحات بتنفيذ هذا المعيار العالمي وقد تم بالفعل تضمين الكثير من [العناصر الأساسية](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned) في المتصفحات.

## بروتوكول WebDriver

> [WebDriver](https://w3c.github.io/webdriver/) هو واجهة تحكم عن بعد تتيح استكشاف والتحكم في وكلاء المستخدم. يوفر بروتوكول سلكي محايد للمنصة واللغة كوسيلة للبرامج خارج العملية لتوجيه سلوك متصفحات الويب عن بعد.

تم تصميم بروتوكول WebDriver لأتمتة المتصفح من منظور المستخدم، مما يعني أن كل ما يمكن للمستخدم القيام به، يمكنك القيام به مع المتصفح. يوفر مجموعة من الأوامر التي تجرد التفاعلات الشائعة مع التطبيق (مثل التنقل والنقر أو قراءة حالة عنصر). نظرًا لأنه معيار ويب، فهو مدعوم بشكل جيد عبر جميع مزودي المتصفحات الرئيسيين ويتم استخدامه أيضًا كبروتوكول أساسي لأتمتة الهاتف المحمول باستخدام [Appium](http://appium.io).

لاستخدام بروتوكول الأتمتة هذا، تحتاج إلى خادم وكيل يترجم جميع الأوامر وينفذها في البيئة المستهدفة (أي المتصفح أو تطبيق الجوال).

بالنسبة لأتمتة المتصفح، يكون خادم الوكيل عادةً هو برنامج تشغيل المتصفح. هناك برامج تشغيل متاحة لجميع المتصفحات:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

لأي نوع من أتمتة الأجهزة المحمولة، ستحتاج إلى تثبيت وإعداد [Appium](http://appium.io). سيسمح لك بأتمتة تطبيقات الجوال (iOS/Android) أو حتى تطبيقات سطح المكتب (macOS/Windows) باستخدام نفس إعداد WebdriverIO.

هناك أيضًا الكثير من الخدمات التي تسمح لك بتشغيل اختبار الأتمتة في السحابة بنطاق كبير. بدلاً من إعداد جميع برامج التشغيل هذه محليًا، يمكنك التحدث مع هذه الخدمات (مثل [Sauce Labs](https://saucelabs.com)) في السحابة وفحص النتائج على منصتهم. سيبدو الاتصال بين برنامج الاختبار وبيئة الأتمتة كما يلي:

![WebDriver Setup](/img/webdriver.png)