---
id: keys
title: کلیدها
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

ارسال یک توالی از فشارهای کلید به عنصر "فعال". شما می‌توانید یک عنصر ورودی را با کلیک کردن روی آن فعال کنید. برای استفاده از کاراکترهایی مانند "فلش چپ" یا "Backspace"، شی `Key` را از بسته WebdriverIO وارد کنید.

کلیدهای تغییر دهنده مانند `Control`، `Shift`، `Alt` و `Command` فشرده باقی می‌مانند پس شما نیاز دارید آن‌ها را دوباره فعال کنید تا رها شوند. تغییر یک کلیک نیاز به استفاده از API اقدامات WebDriver از طریق متد [performActions](https://webdriver.io/docs/api/webdriver#performactions) دارد.

:::info

کلیدهای کنترل بسته به سیستم عامل مرورگر متفاوت هستند، مثلاً در MacOS: `Command` و در ویندوز: `Control`.
WebdriverIO یک کلید کنترل تغییر دهنده چند مرورگری به نام `Ctrl` ارائه می‌دهد (به مثال زیر مراجعه کنید).

:::

##### استفاده

```js
browser.keys(value)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>توالی کلیدهایی که باید تایپ شوند. باید یک آرایه یا رشته ارائه شود.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```