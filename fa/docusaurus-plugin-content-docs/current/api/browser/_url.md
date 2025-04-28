---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

دستور `url` یک نشانی اینترنتی را در مرورگر بارگذاری می‌کند. اگر یک baseUrl در پیکربندی مشخص شده باشد،
این آدرس به پارامتر url با استفاده از متد url.resolve() نود اضافه می‌شود. فراخوانی
`browser.url('...')` با همان نشانی اینترنتی قبلی، باعث بارگذاری مجدد صفحه می‌شود. با این حال،
اگر نشانی اینترنتی شامل یک هش باشد، مرورگر ناوبری جدیدی را آغاز نمی‌کند و کاربر
باید صفحه را [رفرش](/docs/api/webdriver#refresh) کند تا ناوبری جدیدی آغاز شود.

این دستور یک شیء `WebdriverIO.Request` را برمی‌گرداند که حاوی اطلاعاتی درباره
داده‌های درخواست و پاسخ بارگذاری صفحه است:

```ts
interface WebdriverIO.Request {
  id?: string
  url: string
  timestamp: number
  navigation?: string
  redirectChain?: string[],
  headers: Record<string, string>
  cookies?: NetworkCookie[]
  \/**
   * Error message if request failed
   *\/
  error?: string
  response?: {
      fromCache: boolean
      headers: Record<string, string>
      mimeType: string
      status: number
  },
  /**
   * List of all requests that were made due to the main request.
   * Note: the list may be incomplete and does not contain request that were
   * made after the command has finished.
   *
   * The property will be undefined if the request is not a document request
   * that was initiated by the browser.
   *\/
  children?: Request[]
}
```

این دستور گزینه‌های زیر را پشتیبانی می‌کند:

### wait
وضعیت مطلوبی که منبع درخواست شده باید قبل از اتمام دستور در آن قرار داشته باشد.
این گزینه از وضعیت‌های زیر پشتیبانی می‌کند:

 - `none`: بعد از ارسال درخواست صفحه و دریافت پاسخ، منتظر نمی‌ماند
 - `interactive`: منتظر می‌ماند تا صفحه تعاملی شود
 - `complete`: منتظر می‌ماند تا درخت DOM صفحه به طور کامل بارگذاری شود
 - `networkIdle`: منتظر می‌ماند تا هیچ درخواست شبکه در حال انتظاری وجود نداشته باشد

### headers

سرآیندهایی که با درخواست ارسال می‌شوند.

__پیش‌فرض:__ `{}`

### auth

اطلاعات احراز هویت پایه.
توجه: این مقدار سرآیند موجود `Authorization` را در صورت ارائه در گزینه `headers` بازنویسی می‌کند.

### timeout

اگر به یک عدد تنظیم شود، دستور قبل از بازگشت، برای مدت زمان مشخص شده به میلی‌ثانیه منتظر بارگذاری تمام پاسخ‌های صفحه می‌ماند.

توجه: برای تأثیرگذاری این گزینه، نیاز است که گزینه `wait` روی `networkIdle` تنظیم شده باشد.

__پیش‌فرض:__ `5000`

##### استفاده

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
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
      <td><code><var>url</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string`</td>
      <td>نشانی اینترنتی برای ناوبری</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`UrlOptions`</td>
      <td>گزینه‌های ناوبری</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>وضعیت مطلوبی که منبع درخواست شده باید قبل از اتمام دستور در آن قرار داشته باشد. پیش‌فرض: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>اگر به یک عدد تنظیم شود، دستور قبل از بازگشت، برای مدت زمان مشخص شده به میلی‌ثانیه منتظر بارگذاری تمام پاسخ‌های صفحه می‌ماند. پیش‌فرض: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Function`</td>
      <td>تابعی که قبل از بارگذاری تمام منابع صفحه فراخوانی می‌شود. این به شما امکان می‌دهد به راحتی
محیط را شبیه‌سازی کنید، مثلاً API‌های وبی که برنامه شما استفاده می‌کند را بازنویسی کنید.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>اطلاعات احراز هویت پایه</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Record<string, string>`</td>
      <td>سرآیندهایی که با درخواست ارسال می‌شوند</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js title="url.js"
// navigate to a new URL
const request = await browser.url('https://webdriver.io');
// log url
console.log(request.url); // outputs: "https://webdriver.io"
console.log(request.response?.status); // outputs: 200
console.log(request.response?.headers); // outputs: { 'content-type': 'text/html; charset=UTF-8' }

```

```js title="baseUrlResolutions.js"
// With a base URL of http://example.com/site, the following url parameters resolve as such:
// When providing a scheme:
// https://webdriver.io
await browser.url('https://webdriver.io');

// When not starting with a slash, the URL resolves relative to the baseUrl
// http://example.com/site/relative
await browser.url('relative');

// When starting with a slash, the URL resolves relative to the root path of the baseUrl
// http://example.com/rootRelative
await browser.url('/rootRelative');

```

```js title="basicAuth.js"
// navigate to a URL with basic authentication
await browser.url('https://the-internet.herokuapp.com/basic_auth', {
    auth: {
        user
        pass
    }
});
await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

```

```js title="onBeforeLoad.js"
// navigate to a URL and mock the battery API
await browser.url('https://pazguille.github.io/demo-battery-api/', {
    onBeforeLoad (win) {
        // mock "navigator.battery" property
        // returning mock charge object
        win.navigator.getBattery = () => Promise.resolve({
            level: 0.5,
            charging: false,
            chargingTime: Infinity,
            dischargingTime: 3600, // seconds
        })
    }
})
// now we can assert actual text - we are charged at 50%
await expect($('.battery-percentage')).toHaveText('50%')
// and has enough juice for 1 hour
await expect($('.battery-remaining')).toHaveText('01:00)
```

##### مقادیر بازگشتی

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  یک شیء درخواست از بارگذاری صفحه با اطلاعاتی درباره داده‌های درخواست و پاسخ