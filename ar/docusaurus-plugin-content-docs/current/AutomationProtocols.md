---
id: automationProtocols
title: بروتوكولات الأتمتة
---

مع WebdriverIO، يمكنك الاختيار بين تقنيات أتمتة متعددة عند تشغيل اختبارات E2E محليًا أو في السحابة. بشكل افتراضي، سيحاول WebdriverIO بدء جلسة أتمتة محلية باستخدام بروتوكول [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/).

## بروتوكول WebDriver Bidi

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) هو بروتوكول أتمتة لأتمتة المتصفحات باستخدام الاتصال ثنائي الاتجاه. إنه الخلف لبروتوكول [WebDriver](https://w3c.github.io/webdriver/) ويتيح قدرات فحص أكثر لحالات استخدام الاختبار المختلفة.

هذا البروتوكول قيد التطوير حاليًا وقد تتم إضافة عناصر أولية جديدة في المستقبل. التزم جميع مصنعي المتصفحات بتنفيذ معيار الويب هذا وقد تم بالفعل إضافة الكثير من [العناصر الأولية](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned) في المتصفحات.

## بروتوكول WebDriver

> [WebDriver](https://w3c.github.io/webdriver/) هو واجهة للتحكم عن بعد تمكّن من فحص والتحكم في وكلاء المستخدم. يوفر بروتوكول سلكي محايد من حيث المنصة واللغة كوسيلة للبرامج خارج العملية لتوجيه سلوك متصفحات الويب عن بعد.

تم تصميم بروتوكول WebDriver لأتمتة المتصفح من منظور المستخدم، مما يعني أن كل ما يستطيع المستخدم القيام به، يمكنك القيام به مع المتصفح. يوفر مجموعة من الأوامر التي تجرد التفاعلات الشائعة مع التطبيق (على سبيل المثال، التنقل، النقر، أو قراءة حالة عنصر). بما أنه معيار ويب، فهو مدعوم جيدًا عبر جميع مصنعي المتصفحات الرئيسيين ويتم استخدامه أيضًا كبروتوكول أساسي لأتمتة الجوال باستخدام [Appium](http://appium.io).

لاستخدام بروتوكول الأتمتة هذا، تحتاج إلى خادم وسيط يترجم جميع الأوامر وينفذها في البيئة المستهدفة (أي المتصفح أو تطبيق الجوال).

بالنسبة لأتمتة المتصفح، يكون الخادم الوسيط عادةً هو سائق المتصفح. تتوفر سائقين لجميع المتصفحات:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

لأي نوع من أتمتة الجوال، ستحتاج إلى تثبيت وإعداد [Appium](http://appium.io). سيسمح لك بأتمتة تطبيقات الجوال (iOS/Android) أو حتى تطبيقات سطح المكتب (macOS/Windows) باستخدام نفس إعداد WebdriverIO.

هناك أيضًا الكثير من الخدمات التي تسمح لك بتشغيل اختبار الأتمتة الخاص بك في السحابة بمقياس كبير. بدلاً من الاضطرار إلى إعداد جميع هذه السائقين محليًا، يمكنك التحدث إلى هذه الخدمات (مثل [Sauce Labs](https://saucelabs.com)) في السحابة وفحص النتائج على منصتهم. سيكون الاتصال بين نص الاختبار وبيئة الأتمتة كما يلي:

![WebDriver Setup](/img/webdriver.png)