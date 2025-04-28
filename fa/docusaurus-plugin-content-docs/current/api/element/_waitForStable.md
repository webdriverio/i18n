---
id: waitForStable
title: منتظر برای پایداری
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

منتظر ماندن برای پایداری یک عنصر (عدم انیمیشن) به مدت میلی‌ثانیه‌های مشخص شده. اگر سلکتور حداقل با یک عنصر پایدار در DOM مطابقت داشته باشد، مقدار true را برمی‌گرداند، در غیر این صورت خطا می‌دهد. اگر پرچم معکوس فعال باشد، این دستور به جای آن در صورتی که سلکتور با هیچ عنصر پایداری مطابقت نداشته باشد، مقدار true را برمی‌گرداند.

__نکته:__ بهتر است به جای استفاده از این دستور، انیمیشن‌ها را غیرفعال کنید

##### استفاده

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`WaitForOptions`</td>
      <td>گزینه‌های waitForStable (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>زمان به میلی‌ثانیه (مقدار پیش‌فرض براساس پیکربندی [`waitforTimeout`](/docs/configuration#waitfortimeout) تنظیم می‌شود)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>اگر true باشد، برای حالت مخالف منتظر می‌ماند (پیش‌فرض: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>در صورت وجود، پیام خطای پیش‌فرض را جایگزین می‌کند</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>فاصله بین بررسی‌ها (پیش‌فرض: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```html title="index.html"
<head>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: red;
        }
        #has-animation {
            animation: 3s 0s alternate slidein;
        }
        @keyframes slidein {
            from {
                margin-left: 100%;
                width: 300%;
            }

            to {
                margin-left: 0%;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div #has-animation></div>
    <div #has-no-animation></div>
</body>

```

```js title="waitForStable.js"
it('should detect that element is instable and will wait for the element to become stable', async () => {
    const elem = await $('#has-animation')
    await elem.waitForStable({ timeout: 3000 });
});
it('should detect that element is stable and will not wait', async () => {
    const elem = await $('#has-no-animation')
    await elem.waitForStable();
});
```

##### برمی‌گرداند

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** true اگر عنصر پایدار باشد