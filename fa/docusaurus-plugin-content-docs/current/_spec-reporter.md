---
id: spec-reporter
title: گزارشگر Spec
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---


> یک افزونه WebdriverIO برای گزارش دهی به سبک spec.

![Spec Reporter](/img/spec.png "Spec Reporter")

## نصب

ساده‌ترین راه نگه داشتن `@wdio/spec-reporter` به عنوان یک devDependency در `package.json` شما، از طریق:

```sh
npm install @wdio/spec-reporter --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی

کد زیر پیکربندی پیش‌فرض اجراکننده تست wdio را نشان می‌دهد. فقط `'spec'` را به عنوان یک گزارشگر به آرایه اضافه کنید.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## گزینه‌های گزارشگر Spec
### symbols
نمادهای سفارشی برای تست‌های `passed`، `failed` و یا `skipped` ارائه دهید

نوع: `object`
پیش‌فرض: `{passed: '✓', skipped: '-', failed: '✖'}`

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
به طور پیش‌فرض، نتایج تست در Sauce Labs فقط توسط یک عضو تیم از همان تیم قابل مشاهده است، نه توسط عضوی از تیم دیگر. این گزینه [لینک‌های قابل اشتراک](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links) را به طور پیش‌فرض فعال می‌کند، به این معنی که همه تست‌هایی که در Sauce Labs اجرا می‌شوند، توسط همه قابل مشاهده هستند.
فقط `sauceLabsSharableLinks: false` را، همانطور که در زیر نشان داده شده است، در گزینه‌های گزارشگر اضافه کنید تا این ویژگی غیرفعال شود.

نوع: `boolean`
پیش‌فرض: `true`

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
فقط نتایج مشخصات ناموفق را چاپ کنید.

نوع: `boolean`
پیش‌فرض: `false`

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
برای نمایش لاگ‌های کنسول از مراحل در گزارش نهایی، روی `true` تنظیم کنید

نوع: `boolean`
پیش‌فرض: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
برای نمایش وضعیت تست در زمان واقعی به جای فقط در پایان اجرا، روی `true` تنظیم کنید

نوع: `boolean`
پیش‌فرض: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
برای غیرفعال کردن پیشگفتار `[ MutliRemoteBrowser ... ]` در گزارش‌ها، روی `false` تنظیم کنید.

نوع: `boolean`
پیش‌فرض: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

با تنظیم آن روی `false` خروجی را به این صورت مشاهده خواهید کرد:
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

و با `true` (پیش‌فرض) هر خط با پیشگفتار شروع می‌شود:
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
برای نمایش خروجی رنگی در ترمینال، روی `true` تنظیم کنید

نوع: `boolean`
پیش‌فرض: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## گزینه‌های محیطی

گزینه‌های خاصی وجود دارد که می‌توانید از طریق متغیرهای محیطی تنظیم کنید:

### `FORCE_COLOR`

اگر به true تنظیم شود، مثلاً از طریق `FORCE_COLOR=0 npx wdio run wdio.conf.js`، تمام رنگ‌آمیزی ترمینال غیرفعال خواهد شد.