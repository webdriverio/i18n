---
id: ocr-testing
title: اختبار OCR
description: "حدِّد موقع العناصر وتفاعل معها من خلال نصها المرئي على تطبيقات الويب والهاتف المحمول باستخدام خدمة OCR عندما لا تكفي المحددات العادية."
---

قد يكون الاختبار الآلي على تطبيقات الهاتف المحمول الأصلية ومواقع سطح المكتب صعبًا بشكل خاص عند التعامل مع عناصر تفتقر إلى معرّفات فريدة. وقد لا تساعدك [محددات WebdriverIO](https://webdriver.io/docs/selectors) القياسية دائمًا. ادخل إلى عالم `@wdio/ocr-service`، وهي خدمة قوية تستفيد من تقنية OCR ([التعرف الضوئي على الحروف](https://en.wikipedia.org/wiki/Optical_character_recognition)) للبحث عن العناصر الظاهرة على الشاشة وانتظارها والتفاعل معها بناءً على **نصها المرئي**.

سيتم توفير الأوامر المخصصة التالية وإضافتها إلى كائن `browser/driver` لتحصل على مجموعة الأدوات المناسبة لأداء عملك.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### كيف تعمل

ستقوم هذه الخدمة بما يلي:

1. إنشاء لقطة شاشة لشاشتك/جهازك. (يمكنك عند الحاجة توفير نطاق بحث (haystack)، والذي يمكن أن يكون عنصرًا أو كائن مستطيل، لتحديد منطقة معينة بدقة. راجع التوثيق الخاص بكل أمر.)
1. تحسين النتيجة لتقنية OCR عن طريق تحويل لقطة الشاشة إلى أبيض وأسود بتباين عالٍ (التباين العالي ضروري لمنع الكثير من الضوضاء في خلفية الصورة. ويمكن تخصيص ذلك لكل أمر.)
1. استخدام [التعرف الضوئي على الحروف](https://en.wikipedia.org/wiki/Optical_character_recognition) من [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) للحصول على كل النصوص من الشاشة وتمييز جميع النصوص التي تم العثور عليها على صورة. ويمكنها دعم عدة لغات يمكن العثور عليها [هنا.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. استخدام المنطق الضبابي (Fuzzy Logic) من [Fuse.js](https://fusejs.io/) للعثور على السلاسل النصية التي تكون _مساوية تقريبًا_ لنمط معين (بدلًا من المطابقة التامة). وهذا يعني على سبيل المثال أن قيمة البحث `Username` يمكنها أيضًا العثور على النص `Usename` أو العكس.
1. توفير معالج سطر أوامر (`npx ocr-service`) للتحقق من صورك واستخراج النصوص من خلال الطرفية

يمكن العثور على مثال للخطوات 1 و2 و3 في هذه الصورة

![Process steps](/img/ocr/processing-steps.jpg)

تعمل الخدمة **دون أي** اعتماديات نظام (باستثناء ما يستخدمه WebdriverIO)، ولكن يمكنها أيضًا عند الحاجة العمل مع تثبيت محلي لـ [Tesseract](https://tesseract-ocr.github.io/tessdoc/) مما سيقلل وقت التنفيذ بشكل كبير! (راجع أيضًا [تحسين تنفيذ الاختبارات](#test-execution-optimization) لمعرفة كيفية تسريع اختباراتك.)

متحمس؟ ابدأ باستخدامها اليوم باتباع دليل [البدء](./getting-started).

:::caution مهم
هناك أسباب متنوعة قد تمنعك من الحصول على مخرجات جيدة الجودة من Tesseract. ومن أكبر الأسباب التي قد تكون مرتبطة بتطبيقك وبهذه الوحدة عدم وجود تمييز لوني مناسب بين النص المراد العثور عليه والخلفية. على سبيل المثال، يمكن العثور _بسهولة_ على نص أبيض على خلفية داكنة، ولكن يصعب العثور على نص فاتح على خلفية بيضاء أو نص داكن على خلفية داكنة.

راجع أيضًا [هذه الصفحة](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) لمزيد من المعلومات من Tesseract.

ولا تنسَ أيضًا قراءة [الأسئلة الشائعة](./ocr-faq).
:::