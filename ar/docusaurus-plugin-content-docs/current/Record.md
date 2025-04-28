---
id: record
title: تسجيل الاختبارات
---

تحتوي أدوات مطوري Chrome على لوحة _Recorder_ تسمح للمستخدمين بتسجيل وإعادة تشغيل الخطوات الآلية داخل Chrome. يمكن [تصدير هذه الخطوات إلى اختبارات WebdriverIO باستخدام امتداد](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) مما يجعل كتابة الاختبارات سهلة للغاية.

## ما هو مسجل أدوات مطوري Chrome

[مسجل أدوات مطوري Chrome](https://developer.chrome.com/docs/devtools/recorder/) هو أداة تسمح لك بتسجيل وإعادة تشغيل إجراءات الاختبار مباشرة في المتصفح وأيضًا تصديرها بتنسيق JSON (أو تصديرها في اختبار e2e)، بالإضافة إلى قياس أداء الاختبار.

الأداة بسيطة، وبما أنها متصلة بالمتصفح، فلدينا ميزة عدم تغيير السياق أو التعامل مع أي أداة خارجية.

## كيفية تسجيل اختبار باستخدام مسجل أدوات مطوري Chrome

إذا كان لديك أحدث إصدار من Chrome، فسيكون المسجل مثبتًا بالفعل ومتاحًا لك. ما عليك سوى فتح أي موقع ويب، والنقر بزر الماوس الأيمن وتحديد _"Inspect"_. داخل أدوات المطور، يمكنك فتح المسجل بالضغط على `CMD/Control` + `Shift` + `p` وإدخال _"Show Recorder"_.

![مسجل أدوات مطوري Chrome](/img/recorder/recorder.png)

لبدء تسجيل رحلة المستخدم، انقر على _"Start new recording"_، أعط اختبارك اسمًا ثم استخدم المتصفح لتسجيل اختبارك:

![مسجل أدوات مطوري Chrome](/img/recorder/demo.gif)

الخطوة التالية، انقر على _"Replay"_ للتحقق مما إذا كان التسجيل ناجحًا ويؤدي ما أردت القيام به. إذا كان كل شيء على ما يرام، انقر على أيقونة [التصدير](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) وحدد _"Export as a WebdriverIO Test Script"_:

خيار _"Export as a WebdriverIO Test Script"_ متاح فقط إذا قمت بتثبيت امتداد [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).

![مسجل أدوات مطوري Chrome](/img/recorder/export.gif)

هذا كل شيء!

## تصدير التسجيل

إذا قمت بتصدير التدفق كنص اختبار WebdriverIO، فيجب أن يتم تنزيل نص برمجي يمكنك نسخه ولصقه في مجموعة الاختبار الخاصة بك. على سبيل المثال، يبدو التسجيل المذكور أعلاه كما يلي:

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

تأكد من مراجعة بعض المحددات واستبدالها بأنواع [محددات](/docs/selectors) أكثر مرونة إذا لزم الأمر. يمكنك أيضًا تصدير التدفق كملف JSON واستخدام حزمة [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) لتحويله إلى نص اختبار فعلي.

## الخطوات التالية

يمكنك استخدام هذا التدفق لإنشاء اختبارات بسهولة لتطبيقاتك. يحتوي مسجل أدوات مطوري Chrome على ميزات إضافية متنوعة، على سبيل المثال:

- [محاكاة شبكة بطيئة](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) أو
- [قياس أداء اختباراتك](https://developer.chrome.com/docs/devtools/recorder/#measure)

تأكد من الاطلاع على [وثائقهم](https://developer.chrome.com/docs/devtools/recorder).