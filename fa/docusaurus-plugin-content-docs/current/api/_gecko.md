---
id: gecko
title: فایرفاکس
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
عکس از تمام صفحه می‌گیرد.<br /><br />دستور فایرفاکس. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46) پیدا کنید.

##### استفاده

```js
browser.fullPageScreenshot()
```


##### مقادیر بازگشتی

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** داده‌های تصویر PNG با کدگذاری base64 که شامل عکس از تمام صفحه است.


---

## getMozContext
دریافت زمینه‌ای که در حال حاضر فعال است، مانند `CHROME` یا `CONTENT`.<br /><br />دستور فایرفاکس. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622) پیدا کنید.

##### استفاده

```js
browser.getMozContext()
```

##### مثال


```js
console.log(await browser.getMozContext()); // خروجی: 'CHROME'
```


##### مقادیر بازگشتی

- **&lt;String&gt;**
            **<code><var>Context</var></code>:** زمینه مرورگر، یا `CHROME` یا `CONTENT`


---

## setMozContext
زمینه هدف را برای دستورات بین chrome و content تغییر می‌دهد.<br /><br />تغییر زمینه فعلی تأثیر حالتی بر تمام دستورات بعدی خواهد داشت. زمینه `CONTENT` دارای مجوزهای سند عادی پلتفرم وب است، مانند اینکه شما JavaScript دلخواه را ارزیابی کنید. زمینه `CHROME` مجوزهای بالاتری می‌گیرد که به شما اجازه می‌دهد خود رابط کاربری مرورگر را دستکاری کنید، با دسترسی کامل به ابزار XUL.<br /><br />دستور فایرفاکس. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645) پیدا کنید.

##### استفاده

```js
browser.setMozContext(context)
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
      <td><code><var>context</var></code></td>
      <td>string</td>
      <td>زمینه مرورگر، یا `CHROME` یا `CONTENT`</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
console.log(await browser.getMozContext()); // خروجی: 'CHROME'
browser.setMozContext('CONTENT');
console.log(await browser.getMozContext()); // خروجی: 'CONTENT'
```



---

## installAddOn
یک افزونه جدید را در جلسه فعلی نصب می‌کند. این تابع یک شناسه را برمی‌گرداند که بعداً می‌تواند برای حذف نصب افزونه با استفاده از `uninstallAddon` استفاده شود.<br /><br />دستور فایرفاکس. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668) پیدا کنید.

##### استفاده

```js
browser.installAddOn(addon, temporary)
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
      <td><code><var>addon</var></code></td>
      <td>string</td>
      <td>رشته base64 از فایل افزونه</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>پرچم موقت نشان می‌دهد که آیا افزونه باید به طور موقت نصب شود - با راه‌اندازی مجدد حذف می‌شود</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
// ایجاد یک بافر از فایل .zip افزونه
const extension = await fs.promises.readFile('/path/to/extension.zip')
// بارگذاری افزونه در فایرفاکس
const id = await browser.installAddOn(extension.toString('base64'), false);
```


##### مقادیر بازگشتی

- **&lt;String&gt;**
            **<code><var>id</var></code>:** یک وعده که به یک شناسه برای افزونه تازه نصب شده تبدیل می‌شود.


---

## uninstallAddOn
یک افزونه را از پروفایل جلسه فعلی مرورگر حذف می‌کند.<br /><br />دستور فایرفاکس. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687) پیدا کنید.

##### استفاده

```js
browser.uninstallAddOn(id)
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
      <td>string</td>
      <td>شناسه افزونه‌ای که باید حذف شود</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
// ایجاد یک بافر از فایل .zip افزونه
const extension = await fs.promises.readFile('/path/to/extension.zip')
// بارگذاری افزونه در فایرفاکس
const id = await browser.installAddOn(extension.toString('base64'), false);
// ...
await browser.uninstallAddOn(id)
```