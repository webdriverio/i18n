---
id: spec-reporter
title: مراسل المواصفات
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---


> إضافة WebdriverIO للإبلاغ بأسلوب المواصفات.

![Spec Reporter](/img/spec.png "Spec Reporter")

## التثبيت

أسهل طريقة هي الاحتفاظ بـ `@wdio/spec-reporter` كاعتماد تطوير في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/spec-reporter --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](https://webdriver.io/docs/gettingstarted).

## التكوين

يوضح الكود التالي تكوين مشغل اختبار wdio الافتراضي. ما عليك سوى إضافة `'spec'` كمراسل إلى المصفوفة.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## خيارات مراسل المواصفات
### symbols
توفير رموز مخصصة لاختبارات `passed` و`failed` و/أو `skipped`

النوع: `object`
الافتراضي: `{passed: '✓', skipped: '-', failed: '✖'}`

#### مثال
```js
[
  "spec",
  {
    symbols: {
      passed: '[PASS]',
      failed: '[FAIL]',
    },
  },
]
```

### sauceLabsSharableLinks
بشكل افتراضي، يمكن مشاهدة نتائج الاختبار في Sauce Labs فقط من قبل عضو من نفس الفريق، وليس من قبل عضو من فريق مختلف. سيُمكّن هذا الخيار [الروابط القابلة للمشاركة](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links)
بشكل افتراضي، مما يعني أنه يمكن لأي شخص مشاهدة جميع الاختبارات التي يتم تنفيذها في Sauce Labs.
ما عليك سوى إضافة `sauceLabsSharableLinks: false`، كما هو موضح أدناه، في خيارات المراسل لتعطيل هذه الميزة.

النوع: `boolean`
الافتراضي: `true`

#### مثال
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
طباعة نتائج المواصفات الفاشلة فقط.

النوع: `boolean`
الافتراضي: `false`

#### مثال
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
قم بتعيينه إلى `true` لعرض سجلات وحدة التحكم من الخطوات في التقرير النهائي

النوع: `boolean`
الافتراضي: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
قم بتعيينه إلى `true` لعرض حالة الاختبار في الوقت الفعلي بدلاً من مجرد عرضها في نهاية التشغيل

النوع: `boolean`
الافتراضي: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
قم بتعيينه إلى `false` لتعطيل مقدمة `[ MutliRemoteBrowser ... ]` في التقارير.

النوع: `boolean`
الافتراضي: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

مع تعيينه إلى `false` سترى الناتج كما يلي:
```
Running: loremipsum (v50) on Windows 10
Session ID: foobar

» /foo/bar/loo.e2e.js
Foo test
   green ✓ foo
   green ✓ bar

» /bar/foo/loo.e2e.js
Bar test
   green ✓ some test
   red ✖ a failed test
   red ✖ a failed test with no stack
```

ومع `true` (الافتراضي) سيتم إلحاق كل سطر بالمقدمة:
```
[loremipsum 50 Windows 10 #0-0] Running: loremipsum (v50) on Windows 10
[loremipsum 50 Windows 10 #0-0] Session ID: foobar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /foo/bar/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Foo test
[loremipsum 50 Windows 10 #0-0]    green ✓ foo
[loremipsum 50 Windows 10 #0-0]    green ✓ bar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /bar/foo/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Bar test
[loremipsum 50 Windows 10 #0-0]    green ✓ some test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test with no stack
[loremipsum 50 Windows 10 #0-0]
```

### color
قم بتعيينه إلى `true` لعرض ناتج ملون في الطرفية

النوع: `boolean`
الافتراضي: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## خيارات البيئة

هناك بعض الخيارات التي يمكنك تعيينها من خلال متغيرات البيئة:

### `FORCE_COLOR`

إذا تم تعيينه إلى true، على سبيل المثال عبر `FORCE_COLOR=0 npx wdio run wdio.conf.js`، سيتم تعطيل جميع ألوان الطرفية.