---
id: webdriver
title: پروتکل WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
فرمان New Session یک نشست WebDriver جدید با نود انتهایی ایجاد می‌کند. اگر ایجاد نشست با شکست مواجه شود، یک خطای "session not created" برگردانده می‌شود.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-new-sessions) قابل مشاهده است.

##### استفاده

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>یک شیء JSON، مجموعه قابلیت‌هایی که در نهایت در الگوریتم پردازش قابلیت ادغام و منطبق شده است</td>
    </tr>
  </tbody>
</table>


##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** شیء حاوی sessionId و قابلیت‌های نشست WebDriver ایجاد شده.


---

## deleteSession
فرمان Delete Session هر گونه متن مرور سطح بالا مرتبط با نشست فعلی را می‌بندد، اتصال را قطع می‌کند و در نهایت نشست فعلی را می‌بندد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-delete-session) قابل مشاهده است.

##### استفاده

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>object</td>
      <td>شیء حاوی گزینه‌های دستور deleteSession، به عنوان مثال `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>



---

## status
فرمان Status اطلاعاتی در مورد اینکه آیا یک انتهای راه دور در وضعیتی است که می‌تواند نشست‌های جدید ایجاد کند را برمی‌گرداند و می‌تواند به طور اختیاری شامل اطلاعات متا دلخواهی باشد که مخصوص پیاده‌سازی است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-status) قابل مشاهده است.

##### استفاده

```js
browser.status()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** شیء حاوی وضعیت درایور.


---

## getTimeouts
فرمان Get Timeouts مدت زمان‌های مهلت مرتبط با نشست فعلی را دریافت می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-timeouts) قابل مشاهده است.

##### استفاده

```js
browser.getTimeouts()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** شیء حاوی مدت زمان‌های مهلت برای `script`، `pageLoad` و مهلت‌های `implicit`.


---

## setTimeouts
فرمان Set Timeouts مدت زمان‌های مهلت مرتبط با نشست فعلی را تنظیم می‌کند. مهلت‌هایی که می‌توان کنترل کرد در جدول مهلت‌های نشست در زیر فهرست شده‌اند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-set-timeouts) قابل مشاهده است.

##### استفاده

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>عدد صحیح به میلی‌ثانیه برای مهلت انتظار ضمنی نشست</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>عدد صحیح به میلی‌ثانیه برای مهلت بارگذاری صفحه نشست</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>عدد صحیح به میلی‌ثانیه برای مهلت اسکریپت نشست</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
فرمان Get Current URL آدرس URL متن مرور سطح بالای فعلی را برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-current-url) قابل مشاهده است.

##### استفاده

```js
browser.getUrl()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>url</var></code>:** URL سند فعال در متن مرور سطح بالای فعلی


---

## navigateTo
فرمان navigateTo (go) برای هدایت عامل کاربر در متن مرور سطح بالای فعلی به یک مکان جدید استفاده می‌شود.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-navigate-to) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [url](/docs/api/browser/url). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>رشته‌ای که یک URL مطلق را نشان می‌دهد (با http(s) شروع می‌شود)، احتمالاً شامل یک قطعه (#...)، می‌تواند یک طرح محلی نیز باشد (about: و غیره)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
فرمان Back باعث می‌شود مرورگر یک گام به عقب در تاریخچه نشست مشترک متن مرور سطح بالای فعلی حرکت کند. این معادل فشار دادن دکمه بازگشت در رابط کاربری مرورگر یا فراخوانی `window.history.back` است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-back) قابل مشاهده است.

##### استفاده

```js
browser.back()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```




---

## forward
فرمان Forward باعث می‌شود مرورگر یک گام به جلو در تاریخچه نشست مشترک متن مرور سطح بالای فعلی حرکت کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-forward) قابل مشاهده است.

##### استفاده

```js
browser.forward()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```




---

## refresh
فرمان Refresh باعث می‌شود مرورگر صفحه را در متن مرور سطح بالای فعلی مجدداً بارگذاری کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-refresh) قابل مشاهده است.

##### استفاده

```js
browser.refresh()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```




---

## getTitle
فرمان Get Title عنوان سند متن مرور سطح بالای فعلی را برمی‌گرداند، معادل فراخوانی `document.title`.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-title) قابل مشاهده است.

##### استفاده

```js
browser.getTitle()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>title</var></code>:** رشته‌ای را برمی‌گرداند که همان `document.title` متن مرور سطح بالای فعلی است.


---

## getWindowHandle
فرمان Get Window Handle دسته پنجره را برای متن مرور سطح بالای فعلی برمی‌گرداند. می‌توان از آن به عنوان آرگومان برای Switch To Window استفاده کرد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-window-handle) قابل مشاهده است.

##### استفاده

```js
browser.getWindowHandle()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** رشته‌ای را برمی‌گرداند که دسته پنجره برای متن مرور سطح بالای فعلی است.


---

## closeWindow
فرمان Close Window متن مرور سطح بالای فعلی را می‌بندد. پس از انجام، اگر دیگر متن مرور سطح بالایی باز نباشد، خود نشست WebDriver بسته می‌شود.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-close-window) قابل مشاهده است.

##### استفاده

```js
browser.closeWindow()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```




---

## switchToWindow
فرمان Switch To Window برای انتخاب متن مرور سطح بالای فعلی برای نشست فعلی استفاده می‌شود، یعنی آنچه برای پردازش دستورات استفاده خواهد شد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-switch-to-window) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [switchWindow](/docs/api/browser/switchWindow). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>رشته‌ای که یک دسته پنجره را نشان می‌دهد، باید یکی از رشته‌هایی باشد که در فراخوانی getWindowHandles برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
یک متن مرور سطح بالای جدید ایجاد می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#new-window) قابل مشاهده است.

##### استفاده

```js
browser.createWindow(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>اگر پنجره تازه ایجاد شده یک پنجره سطح سیستم عامل را با متن مرور فعلی به اشتراک می‌گذارد، به 'tab' تنظیم شود، در غیر این صورت 'window'.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** شیء پنجره جدید حاوی 'handle' با مقدار دسته و 'type' با مقدار نوع پنجره ایجاد شده


---

## getWindowHandles
فرمان Get Window Handles یک لیست از دسته‌های پنجره برای هر متن مرور سطح بالای باز برمی‌گرداند. ترتیبی که در آن دسته‌های پنجره برگردانده می‌شوند اختیاری است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-window-handles) قابل مشاهده است.

##### استفاده

```js
browser.getWindowHandles()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### مقدار بازگشتی

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** آرایه‌ای که لیستی از دسته‌های پنجره است.


---

## printPage
فرمان Print Page سند را به یک سند PDF صفحه‌بندی شده تبدیل می‌کند. __توجه:__ Chrome در حال حاضر فقط از این ویژگی در [حالت headless](https://webdriver.io/docs/capabilities/#run-browser-headless) پشتیبانی می‌کند، به [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)) مراجعه کنید.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#print-page) قابل مشاهده است.

##### استفاده

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>جهت صفحه. پیش‌فرض: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>مقیاس صفحه. پیش‌فرض: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>پس‌زمینه صفحه. پیش‌فرض: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>عرض صفحه به سانتی‌متر. پیش‌فرض: `21.59` از صفحه</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>ارتفاع صفحه به سانتی‌متر. پیش‌فرض: `27.94` از صفحه</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>حاشیه صفحه به سانتی‌متر از حاشیه بالا. پیش‌فرض: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>حاشیه صفحه به سانتی‌متر از حاشیه پایین. پیش‌فرض: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>حاشیه صفحه به سانتی‌متر از حاشیه چپ. پیش‌فرض: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>حاشیه صفحه به سانتی‌متر از حاشیه راست. پیش‌فرض: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>کوچک کردن PDF برای تناسب با صفحه. پیش‌فرض: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>object[]</td>
      <td>محدوده صفحات. پیش‌فرض `[]`</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** نمایش PDF کدگذاری شده با base64 از سند صفحه‌بندی شده.


---

## switchToFrame
فرمان Switch To Frame برای انتخاب متن مرور سطح بالای فعلی یا یک متن مرور فرزند متن مرور فعلی به عنوان متن مرور فعلی برای دستورات بعدی استفاده می‌شود.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-switch-to-frame) قابل مشاهده است.
:::caution

این دستور پروتکل منسوخ شده است<br />این دستور منسوخ شده است و ما همه را تشویق می‌کنیم که به جای آن از `switchFrame` برای تغییر به داخل فریم‌ها استفاده کنند. اطلاعات بیشتر در مورد این دستور را در https://webdriver.io/docs/api/browser/switchFrame بخوانید.
:::

##### استفاده

```js
browser.switchToFrame(id)
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
      <td><code><var>id</var></code></td>
      <td>number, object, null</td>
      <td>یکی از سه نوع ممکن: null: این نشان‌دهنده متن مرور سطح بالا است (یعنی iframe نیست)، یک عدد، نشان‌دهنده شاخص شیء پنجره مربوط به یک فریم، یک شیء Element که با استفاده از `findElement` دریافت شده است.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
فرمان Switch to Parent Frame متن مرور فعلی را برای دستورات آینده به والد متن مرور فعلی تنظیم می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame) قابل مشاهده است.

##### استفاده

```js
browser.switchToParentFrame()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```




---

## getWindowRect
فرمان Get Window Rect اندازه و موقعیت پنجره سیستم عامل مربوط به متن مرور سطح بالای فعلی را روی صفحه نمایش برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-window-rect) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [getWindowSize](/docs/api/browser/getWindowSize). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.getWindowRect()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** یک نمایش JSON از یک شیء "window rect". این دارای 4 خاصیت است: `x`، `y`، `width` و `height`.


---

## setWindowRect
فرمان Set Window Rect اندازه و موقعیت پنجره سیستم عامل مربوط به متن مرور سطح بالای فعلی را تغییر می‌دهد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-set-window-rect) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [setWindowSize](/docs/api/browser/setWindowSize). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.setWindowRect(x, y, width, height)
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
      <td><code><var>x</var></code></td>
      <td>number, null</td>
      <td>ویژگی screenX شیء پنجره</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>ویژگی screenY شیء پنجره</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>عرض ابعاد خارجی متن مرور سطح بالا، شامل کروم مرورگر و غیره...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>ارتفاع ابعاد خارجی متن مرور سطح بالا، شامل کروم مرورگر و غیره...</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** یک نمایش JSON از یک شیء "window rect" بر اساس وضعیت جدید پنجره.


---

## maximizeWindow
فرمان Maximize Window عملیات "maximize" مختص مدیر پنجره، در صورت وجود، را روی پنجره حاوی متن مرور سطح بالای فعلی فراخوانی می‌کند. این معمولاً پنجره را به حداکثر اندازه موجود بدون رفتن به حالت تمام‌صفحه افزایش می‌دهد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-maximize-window) قابل مشاهده است.

##### استفاده

```js
browser.maximizeWindow()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** یک نمایش JSON از یک شیء "window rect" بر اساس وضعیت جدید پنجره.


---

## minimizeWindow
فرمان Minimize Window عملیات "minimize" مختص مدیر پنجره، در صورت وجود، را روی پنجره حاوی متن مرور سطح بالای فعلی فراخوانی می‌کند. این معمولاً پنجره را در سینی سیستم پنهان می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-minimize-window) قابل مشاهده است.

##### استفاده

```js
browser.minimizeWindow()
```


##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** یک نمایش JSON از یک شیء "window rect" از متن مرور سطح بالای (جدید) فعلی.


---

## fullscreenWindow
فرمان Fullscreen Window عملیات "full screen" مختص مدیر پنجره، در صورت وجود، را روی پنجره حاوی متن مرور سطح بالای فعلی فراخوانی می‌کند. این معمولاً پنجره را به اندازه نمایشگر فیزیکی افزایش می‌دهد و می‌تواند عناصر کروم مرورگر مانند نوارابزارها را پنهان کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-fullscreen-window) قابل مشاهده است.

##### استفاده

```js
browser.fullscreenWindow()
```


##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** یک نمایش JSON از یک شیء "window rect" از متن مرور سطح بالای (جدید) فعلی.


---

## findElement
فرمان Find Element برای یافتن یک عنصر در متن مرور فعلی استفاده می‌شود که می‌تواند برای دستورات آینده استفاده شود. این دستور نمایش JSON عنصر را برمی‌گرداند که می‌تواند به دستور $ منتقل شود تا مرجع را به یک عنصر گسترش یافته WebdriverIO تبدیل کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-find-element) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [$](/docs/api/browser/$). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>یک استراتژی مکان‌یابی عنصر معتبر</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>انتخابگر واقعی که برای یافتن یک عنصر استفاده خواهد شد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### مقدار بازگشتی

- **&lt;object&gt;**
            **<code><var>element</var></code>:** یک نمایش JSON از یک شیء عنصر، به عنوان مثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromShadowRoot
فرمان Find Element From Shadow Root برای یافتن یک عنصر در ریشه سایه یک عنصر استفاده می‌شود که می‌تواند برای دستورات آینده استفاده شود. این دستور نمایش JSON عنصر را برمی‌گرداند که می‌تواند به دستور $ منتقل شود تا مرجع را به یک عنصر گسترش یافته WebdriverIO تبدیل کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#find-element-from-shadow-root) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [shadow$](/docs/api/element/shadow$). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>شناسه عنصر از یک عنصر ریشه سایه</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>یک استراتژی مکان‌یابی عنصر معتبر</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>انتخابگر واقعی که برای یافتن یک عنصر استفاده خواهد شد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### مقدار بازگشتی

- **&lt;object&gt;**
            **<code><var>element</var></code>:** یک نمایش JSON از یک شیء سایه عنصر، به عنوان مثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElements
فرمان Find Elements برای یافتن عناصر در متن مرور فعلی استفاده می‌شود که می‌توانند برای دستورات آینده استفاده شوند. این دستور آرایه‌ای از نمایش JSON عناصر را برمی‌گرداند که می‌تواند به دستور $ منتقل شود تا مرجع را به یک عنصر گسترش یافته WebdriverIO تبدیل کند (به findElement مراجعه کنید).<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-find-elements) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [$$](/docs/api/browser/$$). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>یک استراتژی مکان‌یابی عنصر معتبر</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>انتخابگر واقعی که برای یافتن یک عنصر استفاده خواهد شد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### مقدار بازگشتی

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** یک لیست JSON (احتمالاً خالی) از نمایش‌های یک شیء عنصر، به عنوان مثال `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## findElementsFromShadowRoot
فرمان Find Elements برای یافتن عناصر درون ریشه سایه یک عنصر استفاده می‌شود که می‌توانند برای دستورات آینده استفاده شوند. این دستور آرایه‌ای از نمایش JSON عناصر را برمی‌گرداند که می‌تواند به دستور $ منتقل شود تا مرجع را به یک عنصر گسترش یافته WebdriverIO تبدیل کند (به findElement مراجعه کنید).<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#find-elements-from-shadow-root) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [shadow$$](/docs/api/element/shadow$$). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>شناسه عنصر از یک عنصر ریشه سایه</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>یک استراتژی مکان‌یابی عنصر معتبر</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>انتخابگر واقعی که برای یافتن یک عنصر استفاده خواهد شد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### مقدار بازگشتی

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** یک لیست JSON (احتمالاً خالی) از نمایش‌های یک شیء عنصر، به عنوان مثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromElement
فرمان Find Element From Element برای یافتن یک عنصر از یک عنصر وب در متن مرور فعلی استفاده می‌شود که می‌تواند برای دستورات آینده استفاده شود. این دستور نمایش JSON عنصر را برمی‌گرداند که می‌تواند به دستور $ منتقل شود تا مرجع را به یک عنصر گسترش یافته WebdriverIO تبدیل کند (به findElement مراجعه کنید).<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-find-element-from-element) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [$](/docs/api/element/$). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>یک استراتژی مکان‌یابی عنصر معتبر</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>انتخابگر واقعی که برای یافتن یک عنصر استفاده خواهد شد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### مقدار بازگشتی

- **&lt;object&gt;**
            **<code><var>element</var></code>:** یک نمایش JSON از یک شیء عنصر، به عنوان مثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementsFromElement
فرمان Find Elements From Element برای یافتن عناصر از یک عنصر وب در متن مرور فعلی استفاده می‌شود که می‌توانند برای دستورات آینده استفاده شوند. این دستور آرایه‌ای از نمایش JSON عناصر را برمی‌گرداند که می‌تواند به دستور $ منتقل شود تا مرجع را به یک عنصر گسترش یافته WebdriverIO تبدیل کند (به findElement مراجعه کنید).<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-find-elements-from-element) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [$$](/docs/api/element/$$). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>یک استراتژی مکان‌یابی عنصر معتبر</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>انتخابگر واقعی که برای یافتن یک عنصر استفاده خواهد شد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### مقدار بازگشتی

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** یک لیست JSON (احتمالاً خالی) از نمایش‌های یک شیء عنصر، به عنوان مثال `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## getElementShadowRoot
شیء ریشه سایه یک عنصر را دریافت می‌کند. شیء نتیجه می‌تواند برای بازیابی عناصر درون این ریشه سایه مثلاً با استفاده از findElementFromShadowRoots یا findElementsFromShadowRoots استفاده شود.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-active-element) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [shadow$](/docs/api/element/shadow$). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.getElementShadowRoot(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** یک نمایش JSON از یک ریشه سایه عنصر، به عنوان مثال `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## getActiveElement
Get Active Element عنصر فعال سند عنصر متن مرور فعلی را برمی‌گرداند. این دستور نمایش JSON عنصر را برمی‌گرداند که می‌تواند به دستور $ منتقل شود تا مرجع را به یک عنصر گسترش یافته WebdriverIO تبدیل کند (به findElement مراجعه کنید).<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-active-element) قابل مشاهده است.

##### استفاده

```js
browser.getActiveElement()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>element</var></code>:** یک نمایش JSON از یک شیء عنصر، به عنوان مثال `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## isElementSelected
Is Element Selected تعیین می‌کند که آیا عنصر ارجاع شده انتخاب شده است یا خیر. این عملیات فقط در عناصر ورودی با حالت‌های دکمه رادیویی و چک باکس، یا عناصر گزینه‌ای معنی دارد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-is-element-selected) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [isSelected](/docs/api/element/isSelected). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.isElementSelected(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### مقدار بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` یا `false` بر اساس وضعیت انتخاب.


---

## isElementDisplayed
Is Element Displayed قابلیت مشاهده یک عنصر را تعیین می‌کند که توسط آنچه از نظر چشم انسان قابل مشاهده است هدایت می‌شود. در این زمینه، قابلیت نمایش یک عنصر به خصوصیات سبک `visibility` یا `display` مربوط نیست.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#element-displayedness) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [isDisplayed](/docs/api/element/isDisplayed). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.isElementDisplayed(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### مقدار بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` یا `false` بر اساس وضعیت قابل مشاهده.


---

## getElementAttribute
فرمان Get Element Attribute صفت یک عنصر وب را برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-element-attribute) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [getAttribute](/docs/api/element/getAttribute). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>نام مقدار صفت برای بازیابی</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** صفت نامیده شده عنصر.


---

## getElementProperty
فرمان Get Element Property نتیجه دریافت یک خاصیت از یک عنصر را برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-element-property) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [getProperty](/docs/api/element/getProperty). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>نام خاصیت صفت برای بازیابی</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>property</var></code>:** خاصیت نامیده شده عنصر، که با فراخوانی GetOwnProperty روی شیء عنصر دسترسی پیدا می‌کند.


---

## getElementCSSValue
فرمان Get Element CSS Value مقدار محاسبه شده خاصیت CSS داده شده از عنصر وب داده شده را بازیابی می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-element-css-value) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [getCSSProperty](/docs/api/element/getCSSProperty). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>نام خاصیت CSS برای بازیابی</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** مقدار محاسبه شده پارامتر مربوط به نام خاصیت از اعلامیه‌های سبک عنصر (مگر اینکه نوع سند xml باشد، در این صورت مقدار برگشتی به سادگی رشته خالی است).


---

## getElementText
فرمان Get Element Text قصد دارد متن یک عنصر را "به صورت ارائه شده" برگرداند. متن ارائه شده یک عنصر همچنین برای پیدا کردن عناصر با متن پیوند و متن پیوند جزئی استفاده می‌شود.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-element-text) قابل مشاهده است.

##### استفاده

```js
browser.getElementText(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>text</var></code>:** متن قابل مشاهده عنصر (شامل عناصر فرزند)، با دنبال کردن الگوریتم تعریف شده در Selenium Atoms برای [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).


---

## getElementTagName
فرمان Get Element Tag Name نام عنصر واجد شرایط از عنصر وب داده شده را برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-element-tag-name) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [getTagName](/docs/api/element/getTagName). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.getElementTagName(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>text</var></code>:** صفت tagName عنصر.


---

## getElementRect
فرمان Get Element Rect ابعاد و مختصات عنصر وب داده شده را برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-element-rect) قابل مشاهده است.

:::info

این دستور پروتکل در متدهای مناسب زیر جاسازی شده است: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). توصیه می‌شود به جای آن از این دستورات استفاده کنید.

:::


##### استفاده

```js
browser.getElementRect(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** یک شیء JSON که موقعیت و مستطیل محیطی عنصر را نشان می‌دهد.


---

## isElementEnabled
Is Element Enabled تعیین می‌کند که آیا عنصر ارجاع شده فعال است یا خیر. این عملیات فقط در کنترل‌های فرم معنی دارد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-is-element-enabled) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [isEnabled](/docs/api/element/isEnabled). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.isElementEnabled(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### مقدار بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** اگر عنصر در یک سند xml است، یا کنترل فرم غیرفعال است: `false`، در غیر این صورت، `true`.


---

## elementClick
فرمان Element Click عنصر را به دید می‌آورد اگر هنوز قابل تعامل با اشاره‌گر نیست، و روی نقطه مرکزی قابل مشاهده آن کلیک می‌کند. اگر نقطه مرکزی عنصر توسط عنصر دیگری مسدود شده باشد، یک خطای تداخل کلیک عنصر برگردانده می‌شود. اگر عنصر خارج از دید باشد، یک خطای عنصر غیرقابل تعامل برگردانده می‌شود.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-element-click) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [click](/docs/api/element/click). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.elementClick(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
فرمان Element Clear یک عنصر قابل ویرایش یا قابل بازنشانی را به دید می‌آورد و سپس تلاش می‌کند فایل‌های انتخاب شده یا محتوای متنی آن را پاک کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-element-clear) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [clearValue](/docs/api/element/clearValue). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.elementClear(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
فرمان Element Send Keys عنصر کنترل فرم را به دید می‌آورد و سپس کلیدهای ارائه شده را به عنصر ارسال می‌کند. در صورتی که عنصر قابل تعامل با صفحه کلید نباشد، یک خطای عنصر غیرقابل تعامل برگردانده می‌شود.<br /><br />وضعیت ورودی کلید مورد استفاده برای ورودی ممکن است در میانه "تایپ" با ارسال کلید null که U+E000 (NULL) است، پاک شود.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-element-send-keys) قابل مشاهده است.

:::info

این دستور پروتکل در متدهای مناسب زیر جاسازی شده است: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). توصیه می‌شود به جای آن از این دستورات استفاده کنید.

:::


##### استفاده

```js
browser.elementSendKeys(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>رشته‌ای برای ارسال به عنوان ضربات کلید به عنصر</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
فرمان Get Page Source یک رشته سریالی‌سازی شده از DOM سند فعال متن مرور فعلی را برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-page-source) قابل مشاهده است.

##### استفاده

```js
browser.getPageSource()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** DOM سند فعال متن مرور فعلی


---

## executeScript
فرمان Execute Script یک تابع JavaScript را در متن مرور فعلی اجرا می‌کند و مقدار بازگشتی تابع را برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-execute-script) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [execute](/docs/api/browser/execute). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>یک رشته، بدنه تابع Javascript که می‌خواهید اجرا شود</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>آرایه‌ای از مقادیر JSON که از سریالی‌سازی خارج می‌شوند و به عنوان آرگومان به تابع شما منتقل می‌شوند</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### مقدار بازگشتی

- **&lt;*&gt;**
            **<code><var>result</var></code>:** یا مقدار برگشتی اسکریپت شما، یا تحقق Promise برگردانده شده توسط اسکریپت شما، یا خطایی که دلیل رد Promise برگردانده شده توسط اسکریپت شما بود.


---

## executeAsyncScript
فرمان Execute Async Script باعث می‌شود JavaScript به عنوان یک تابع بی‌نام اجرا شود. برخلاف فرمان Execute Script، نتیجه تابع نادیده گرفته می‌شود. در عوض، یک آرگومان اضافی به عنوان آرگومان نهایی به تابع ارائه می‌شود. این یک تابع است که، هنگام فراخوانی، اولین آرگومان خود را به عنوان پاسخ برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-execute-async-script) قابل مشاهده است.

:::info

این دستور پروتکل در متد مناسب زیر جاسازی شده است: [executeAsync](/docs/api/browser/executeAsync). توصیه می‌شود به جای آن از این دستور استفاده کنید.

:::


##### استفاده

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>یک رشته، بدنه تابع Javascript که می‌خواهید اجرا شود</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>آرایه‌ای از مقادیر JSON که از سریالی‌سازی خارج می‌شوند و به عنوان آرگومان به تابع شما منتقل می‌شوند</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### مقدار بازگشتی

- **&lt;*&gt;**
            **<code><var>result</var></code>:** یا مقدار برگشتی اسکریپت شما، یا تحقق Promise برگردانده شده توسط اسکریپت شما، یا خطایی که دلیل رد Promise برگردانده شده توسط اسکریپت شما بود.


---

## getAllCookies
فرمان Get All Cookies تمام کوکی‌های مرتبط با آدرس سند فعال متن مرور فعلی را برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-all-cookies) قابل مشاهده است.

##### استفاده

```js
browser.getAllCookies()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### مقدار بازگشتی

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** یک لیست از کوکی‌های سریالی‌سازی شده. هر کوکی سریالی‌سازی شده تعدادی فیلد اختیاری دارد که ممکن است علاوه بر `name` و `value` برگردانده شوند یا نشوند.


---

## addCookie
فرمان Add Cookie یک کوکی واحد را به انبار کوکی مرتبط با آدرس سند فعال اضافه می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-adding-a-cookie) قابل مشاهده است.

##### استفاده

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>یک شیء JSON که یک کوکی را نشان می‌دهد. باید حداقل فیلدهای name و value را داشته باشد و می‌تواند بیشتر، از جمله زمان انقضا و غیره داشته باشد</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
فرمان Delete All Cookies امکان حذف تمام کوکی‌های مرتبط با آدرس سند فعال را فراهم می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-delete-all-cookies) قابل مشاهده است.

##### استفاده

```js
browser.deleteAllCookies()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```




---

## getNamedCookie
فرمان Get Named Cookie کوکی با نام درخواست شده را از کوکی‌های مرتبط در انبار کوکی سند فعال متن مرور فعلی برمی‌گرداند. اگر هیچ کوکی پیدا نشود، یک خطای "no such cookie" برگردانده می‌شود.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-named-cookie) قابل مشاهده است.

##### استفاده

```js
browser.getNamedCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>نام کوکی برای بازیابی</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### مقدار بازگشتی

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** یک کوکی سریالی‌سازی شده، با فیلدهای name و value. تعدادی فیلد اختیاری مانند `path`، `domain` و `expiry-time` نیز ممکن است وجود داشته باشند.


---

## deleteCookie
فرمان Delete Cookie به شما امکان می‌دهد یا یک کوکی واحد را با پارامتر name حذف کنید، یا تمام کوکی‌های مرتبط با آدرس سند فعال را اگر name نامشخص باشد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-delete-cookie) قابل مشاهده است.

##### استفاده

```js
browser.deleteCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>نام کوکی برای حذف</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```




---

## performActions
فرمان Perform Actions برای اجرای اقدامات پیچیده کاربر استفاده می‌شود. برای جزئیات بیشتر به [مشخصات](https://github.com/jlipps/simple-wd-spec#perform-actions) مراجعه کنید.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-perform-actions) قابل مشاهده است.

##### استفاده

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>لیستی از اشیاء که هر کدام یک منبع ورودی و اقدامات مرتبط با آن را نشان می‌دهد</td>
    </tr>
  </tbody>
</table>



---

## releaseActions
فرمان Release Actions برای آزاد کردن تمام کلیدها و دکمه‌های اشاره‌گر که در حال حاضر فشرده هستند استفاده می‌شود. این باعث می‌شود رویدادها به گونه‌ای ارسال شوند که انگار وضعیت با یک سری اقدامات صریح آزاد شده است. همچنین تمام وضعیت داخلی دستگاه‌های مجازی را پاک می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-release-actions) قابل مشاهده است.

##### استفاده

```js
browser.releaseActions()
```



---

## dismissAlert
فرمان Dismiss Alert یک گفتگوی ساده را در صورت وجود رد می‌کند، در غیر این صورت خطا می‌دهد. یک درخواست برای رد یک پیام اخطار کاربر، که ممکن است الزاماً دکمه رد نداشته باشد، همان تأثیر پذیرش آن را دارد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-dismiss-alert) قابل مشاهده است.

##### استفاده

```js
browser.dismissAlert()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```




---

## acceptAlert
فرمان Accept Alert یک گفتگوی ساده را در صورت وجود می‌پذیرد، در غیر این صورت خطا می‌دهد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-accept-alert) قابل مشاهده است.

##### استفاده

```js
browser.acceptAlert()
```



---

## getAlertText
فرمان Get Alert Text پیام پیام اخطار کاربر فعلی را برمی‌گرداند. اگر هیچ پیام اخطار کاربر فعلی وجود نداشته باشد، یک خطا برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-get-alert-text) قابل مشاهده است.

##### استفاده

```js
browser.getAlertText()
```

##### مثال

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** پیام پیام اخطار کاربر.


---

## sendAlertText
فرمان Send Alert Text فیلد متن یک پیام اخطار کاربر window.prompt را به مقدار داده شده تنظیم می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-send-alert-text) قابل مشاهده است.

##### استفاده

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>رشته‌ای برای تنظیم پیام به آن</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
فرمان Take Screenshot یک عکس از منظره متن مرور سطح بالای فعلی می‌گیرد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-take-screenshot) قابل مشاهده است.

##### استفاده

```js
browser.takeScreenshot()
```


##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** داده تصویر PNG کدگذاری شده با base64 که شامل عکس از منظره اولیه است.


---

## takeElementScreenshot
فرمان Take Element Screenshot یک عکس از ناحیه قابل مشاهده محصور شده توسط مستطیل محیطی یک عنصر می‌گیرد.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#dfn-take-element-screenshot) قابل مشاهده است.

##### استفاده

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>اسکرول به نمای عنصر. پیش‌فرض: true</td>
    </tr>
  </tbody>
</table>


##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** داده تصویر PNG کدگذاری شده با base64 که شامل عکس از ناحیه قابل مشاهده مستطیل محیطی یک عنصر پس از اسکرول آن به نما است.


---

## getElementComputedRole
نقش WAI-ARIA محاسبه شده یک عنصر را دریافت می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#get-computed-role) قابل مشاهده است.

##### استفاده

```js
browser.getElementComputedRole(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>


##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>role</var></code>:** نتیجه محاسبه نقش WAI-ARIA عنصر.


---

## getElementComputedLabel
نام قابل دسترسی عنصر را دریافت می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver/#get-computed-label) قابل مشاهده است.

##### استفاده

```js
browser.getElementComputedLabel(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>


##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>label</var></code>:** نتیجه محاسبه نام و توضیح دسترسی برای نام دسترسی عنصر.


---

## setPermissions
تغییر وضعیت مجوز یک PermissionDescriptor توسط کاربر را شبیه‌سازی می‌کند. __توجه:__ این ویژگی هنوز در همه مرورگرها قرار نگرفته است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/permissions/#set-permission-command) قابل مشاهده است.

##### استفاده

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>هر ویژگی قدرتمند یک یا چند جنبه دارد که وب‌سایت‌ها می‌توانند برای دسترسی به آن درخواست مجوز کنند. برای توصیف این جنبه‌ها، هر ویژگی یک زیرنوع از PermissionDescriptor را به عنوان نوع توصیف‌کننده مجوز خود تعریف می‌کند. __توجه:__ این ویژگی هنوز در همه مرورگرها قرار نگرفته است.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>تعیین می‌کند آیا مجوز اعطا، رد یا درخواست می‌شود.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>آیا مجوزها به تمام محیط‌های اجرایی اعمال شوند یا خیر.</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها


```js
// تنظیم مجوزهای midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // می‌تواند "denied" یا "prompt" نیز باشد
);
```


```js
// تنظیم مجوزهای کلیپ‌بورد
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// اکنون می‌توانید کلیپ‌بورد را بخوانید، مثلاً
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```



---

## generateTestReport
یک گزارش برای آزمایش تولید می‌کند. افزونه برای [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __توجه:__ این ویژگی هنوز در همه مرورگرها قرار نگرفته است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/reporting/#automation) قابل مشاهده است.

##### استفاده

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>پیامی که در گزارش نمایش داده خواهد شد.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>گروه نقطه پایانی را برای تحویل گزارش مشخص می‌کند.</td>
    </tr>
  </tbody>
</table>



---

## createMockSensor
یک سنسور ساختگی برای شبیه‌سازی سنسورهایی مانند سنسور نور محیطی ایجاد می‌کند. __توجه:__ این ویژگی هنوز در همه مرورگرها قرار نگرفته است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/sensors/#create-mock-sensor-command) قابل مشاهده است.

##### استفاده

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>نوع API سنسور برای شبیه‌سازی، مثلاً 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>یک عدد اعشاری که فرکانس را به هرتز نشان می‌دهد و برای تنظیم حداکثر فرکانس نمونه‌برداری پشتیبانی شده برای سنسور ساختگی مربوطه استفاده می‌شود.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>یک عدد اعشاری که فرکانس را به هرتز نشان می‌دهد و برای تنظیم حداقل فرکانس نمونه‌برداری پشتیبانی شده برای سنسور ساختگی مربوطه استفاده می‌شود.</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
اطلاعاتی در مورد نوع خاصی از سنسور ساختگی بازیابی می‌کند. __توجه:__ این ویژگی هنوز در همه مرورگرها قرار نگرفته است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/sensors/#get-mock-sensor-command) قابل مشاهده است.

##### استفاده

```js
browser.getMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>نوع سنسور ساختگی برای بازیابی اطلاعات.</td>
    </tr>
  </tbody>
</table>


##### مقدار بازگشتی

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** مقادیر خواندن سنسور ساختگی.


---

## updateMockSensor
نوع سنسور ساختگی را به‌روزرسانی می‌کند. __توجه:__ این ویژگی هنوز در همه مرورگرها قرار نگرفته است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/sensors/#update-mock-sensor-reading-command) قابل مشاهده است.

##### استفاده

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>نوع سنسور ساختگی برای به‌روزرسانی اطلاعات.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>نوع API سنسور برای شبیه‌سازی، مثلاً 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>یک عدد اعشاری که فرکانس را به هرتز نشان می‌دهد و برای تنظیم حداکثر فرکانس نمونه‌برداری پشتیبانی شده برای سنسور ساختگی مربوطه استفاده می‌شود.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>یک عدد اعشاری که فرکانس را به هرتز نشان می‌دهد و برای تنظیم حداقل فرکانس نمونه‌برداری پشتیبانی شده برای سنسور ساختگی مربوطه استفاده می‌شود.</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
فرمان Delete Session هر متن مرور سطح بالا مرتبط با نشست فعلی را می‌بندد، اتصال را قطع می‌کند و در نهایت نشست فعلی را می‌بندد. __توجه:__ این ویژگی هنوز در همه مرورگرها قرار نگرفته است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/sensors/#delete-mock-sensor-command) قابل مشاهده است.

##### استفاده

```js
browser.deleteMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>نوع سنسور ساختگی برای حذف.</td>
    </tr>
  </tbody>
</table>



---

## setTimeZone
تغییر منطقه زمانی را برای اهداف آزمایش شبیه‌سازی می‌کند. __توجه:__ این ویژگی هنوز در همه مرورگرها قرار نگرفته است.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://w3c.github.io/sensors/#create-mock-sensor-command) قابل مشاهده است.

##### استفاده

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>نام منطقه زمانی، مثلاً Asia/Tokyo</td>
    </tr>
  </tbody>
</table>



---

## addVirtualAuthenticator
یک [احراز هویت مجازی](https://www.w3.org/TR/webauthn-2/#virtual-authenticators) نرم‌افزاری ایجاد می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator) قابل مشاهده است.

##### استفاده

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>مقادیر معتبر: 'ctap1/u2f'، 'ctap2'، 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>مقادیر معتبر: 'usb'، 'nfc'، 'ble' یا 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>مقادیر معتبر: true، false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>مقادیر معتبر: true، false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>مقادیر معتبر: true، false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>مقادیر معتبر: یک آرایه حاوی شناسه‌های افزونه.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string[]</td>
      <td>مقادیر معتبر: تا 3 ورودی روش تأیید کاربر.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### مقدار بازگشتی

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** شناسه رشته‌ای احراز هویت‌کننده را برمی‌گرداند.


---

## removeVirtualAuthenticator
یک احراز هویت‌کننده مجازی که قبلاً ایجاد شده است را حذف می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator) قابل مشاهده است.

##### استفاده

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>شناسه احراز هویت‌کننده</td>
    </tr>
  </tbody>
</table>



---

## addCredential
یک منبع اعتبار کلید عمومی را به یک احراز هویت‌کننده مجازی موجود تزریق می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential) قابل مشاهده است.

##### استفاده

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>شناسه احراز هویت‌کننده</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>شناسه اعتبار کدگذاری شده با استفاده از کدگذاری Base64url.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>اگر به true تنظیم شود، یک اعتبار قابل کشف در سمت مشتری ایجاد می‌شود. اگر به false تنظیم شود، در عوض یک اعتبار سمت سرور ایجاد می‌شود.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>شناسه طرف متکی که اعتبار به آن محدود شده است.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>یک بسته کلید نامتقارن حاوی یک کلید خصوصی واحد مطابق با [RFC5958]، کدگذاری شده با استفاده از کدگذاری Base64url.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>userHandle مرتبط با اعتبار کدگذاری شده با استفاده از کدگذاری Base64url. این خاصیت ممکن است تعریف نشده باشد.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>مقدار اولیه برای یک شمارنده امضا مرتبط با منبع اعتبار کلید عمومی.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>بلاب بزرگ و مرتبط با اعتبار برای منبع اعتبار کلید عمومی، کدگذاری شده با استفاده از کدگذاری Base64url. این خاصیت ممکن است تعریف نشده باشد.</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
یک شیء پارامترهای اعتبار برای هر منبع اعتبار کلید عمومی ذخیره شده در یک احراز هویت‌کننده مجازی، صرف نظر از اینکه آیا با استفاده از Add Credential یا `navigator.credentials.create()` ذخیره شده‌اند، برمی‌گرداند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials) قابل مشاهده است.

##### استفاده

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>شناسه احراز هویت‌کننده</td>
    </tr>
  </tbody>
</table>


##### مقدار بازگشتی

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** آرایه‌ای از اعتبارها را برمی‌گرداند.


---

## removeAllCredentials
تمام منابع اعتبار کلید عمومی ذخیره شده در یک احراز هویت‌کننده مجازی را حذف می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials) قابل مشاهده است.

##### استفاده

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>شناسه احراز هویت‌کننده</td>
    </tr>
  </tbody>
</table>



---

## removeCredential
یک منبع اعتبار کلید عمومی ذخیره شده در یک احراز هویت‌کننده مجازی را حذف می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential) قابل مشاهده است.

##### استفاده

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>شناسه احراز هویت‌کننده</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>شناسه اعتبار</td>
    </tr>
  </tbody>
</table>



---

## setUserVerified
فرمان افزونه Set User Verified ویژگی isUserVerified را روی احراز هویت‌کننده مجازی تنظیم می‌کند.<br /><br />دستور پروتکل WebDriver است. جزئیات بیشتر در [مستندات رسمی پروتکل](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified) قابل مشاهده است.

##### استفاده

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>شناسه احراز هویت‌کننده</td>
    </tr>
  </tbody>
</table>


