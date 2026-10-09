---
id: record
title: تسجيل الاختبارات
description: "سجّل تدفقات المستخدم باستخدام مسجّل Chrome DevTools وصدّرها كاختبارات WebdriverIO."
---

تحتوي أدوات Chrome DevTools على لوحة _المسجّل_ (Recorder) التي تتيح للمستخدمين تسجيل الخطوات المؤتمتة وإعادة تشغيلها داخل Chrome. يمكن [تصدير هذه الخطوات إلى اختبارات WebdriverIO باستخدام إضافة](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) مما يجعل كتابة الاختبارات سهلة للغاية.

## ما هو مسجّل Chrome DevTools

[مسجّل Chrome DevTools](https://developer.chrome.com/docs/devtools/recorder/) هو أداة تتيح لك تسجيل إجراءات الاختبار وإعادة تشغيلها مباشرةً في المتصفح، وكذلك تصديرها بتنسيق JSON (أو تصديرها كاختبار e2e)، بالإضافة إلى قياس أداء الاختبار.

الأداة بسيطة وواضحة، ولأنها مدمجة في المتصفح، فإننا نحظى بميزة عدم الحاجة إلى تبديل السياق أو التعامل مع أي أداة خارجية.

## كيفية تسجيل اختبار باستخدام مسجّل Chrome DevTools

إذا كان لديك أحدث إصدار من Chrome فسيكون المسجّل مثبتًا ومتاحًا لك بالفعل. ما عليك سوى فتح أي موقع ويب، والنقر بزر الفأرة الأيمن واختيار _"Inspect"_. داخل DevTools يمكنك فتح المسجّل بالضغط على `CMD/Control` + `Shift` + `p` وإدخال _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

لبدء تسجيل رحلة مستخدم، انقر على _"Start new recording"_، وأعطِ اختبارك اسمًا ثم استخدم المتصفح لتسجيل اختبارك:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

في الخطوة التالية، انقر على _"Replay"_ للتحقق مما إذا كان التسجيل ناجحًا ويؤدي ما أردت القيام به. إذا كان كل شيء على ما يرام، انقر على أيقونة [التصدير](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) واختر _"Export as a WebdriverIO Test Script"_:

خيار _"Export as a WebdriverIO Test Script"_ متاح فقط إذا قمت بتثبيت إضافة [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).


![Chrome DevTools Recorder](/img/recorder/export.gif)

هذا كل شيء!

## تصدير التسجيل

إذا قمت بتصدير التدفق كسكربت اختبار WebdriverIO، فسيتم تنزيل سكربت يمكنك نسخه ولصقه في مجموعة اختباراتك. على سبيل المثال، يبدو التسجيل أعلاه كما يلي:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

تأكد من مراجعة بعض محددات المواقع واستبدالها بـ[أنواع محددات](/docs/selectors) أكثر مرونة إذا لزم الأمر. يمكنك أيضًا تصدير التدفق كملف JSON واستخدام حزمة [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) لتحويله إلى سكربت اختبار فعلي.

## الخطوات التالية

يمكنك استخدام هذا التدفق لإنشاء اختبارات لتطبيقاتك بسهولة. يتمتع مسجّل Chrome DevTools بميزات إضافية متنوعة، على سبيل المثال:

- [محاكاة شبكة بطيئة](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) أو
- [قياس أداء اختباراتك](https://developer.chrome.com/docs/devtools/recorder/#measure)

احرص على الاطلاع على [وثائقهم](https://developer.chrome.com/docs/devtools/recorder).