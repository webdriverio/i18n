---
id: emulate
title: شبیه‌سازی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO به شما اجازه می‌دهد تا API‌های وب را با استفاده از دستور `emulate` شبیه‌سازی کنید. این API‌های وب می‌توانند دقیقاً همانطور که شما مشخص می‌کنید رفتار کنند. حوزه‌های زیر پشتیبانی می‌شوند:

- `geolocation`: شبیه‌سازی API موقعیت جغرافیایی
- `userAgent`: شبیه‌سازی عامل کاربر
- `colorScheme`: شبیه‌سازی طرح رنگ
- `onLine`: شبیه‌سازی وضعیت آنلاین
- `device`: شبیه‌سازی یک دستگاه تلفن همراه یا دسکتاپ خاص
- `clock`: شبیه‌سازی ساعت سیستم

دستور `emulate` یک تابع را برمی‌گرداند که می‌تواند برای بازنشانی شبیه‌سازی فراخوانی شود. این زمانی مفید است که می‌خواهید شبیه‌سازی را پس از یک تست یا مجموعه‌ای از تست‌ها بازنشانی کنید.

اطلاعات بیشتر در مورد این موضوع را در راهنمای [شبیه‌سازی](/docs/emulation) بخوانید.

:::info

به استثنای حوزه `clock`، تغییر مقدار شبیه‌سازی شده بدون بارگذاری مجدد صفحه امکان‌پذیر نیست.

:::

:::info

این ویژگی نیازمند پشتیبانی WebDriver Bidi برای مرورگر است. در حالی که نسخه‌های اخیر Chrome، Edge و Firefox از این پشتیبانی برخوردارند، Safari __پشتیبانی نمی‌کند__. برای به‌روزرسانی‌ها، [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned) را دنبال کنید.
علاوه بر این، اگر از یک فروشنده ابری برای راه‌اندازی مرورگرها استفاده می‌کنید، مطمئن شوید که فروشنده شما نیز از WebDriver Bidi پشتیبانی می‌کند.

:::

شیء `EmulationOptions` می‌تواند بر اساس حوزه دارای خصوصیات زیر باشد:

| حوزه          | گزینه‌ها                                          |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### استفاده

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>ویژگی مرورگر که می‌خواهید شبیه‌سازی کنید، می‌تواند یکی از موارد `clock`، `geolocation`، `userAgent`، `colorScheme` یا `onLine` باشد</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>گزینه شبیه‌سازی برای حوزه خاص</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### مقادیر بازگشتی

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:** یک تابع برای بازنشانی شبیه‌سازی