---
id: wdio-gmail-service
title: سرویس جیمیل
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---


> wdio-gmail-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service) مراجعه کنید

یک پلاگین WebdriverIO برای دریافت ایمیل‌ها از جیمیل با استفاده از [Gmail Tester](https://github.com/levz0r/gmail-tester).

## نصب

ساده‌ترین راه این است که `wdio-gmail-service` را به‌عنوان یک `devDependency` در فایل package.json خود نگه دارید.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

به راحتی می‌توانید آن را با دستور زیر نصب کنید:

```sh
npm install wdio-gmail-service --save-dev
```

## استفاده

### احراز هویت جیمیل

شما باید دستورالعمل‌های [Gmail Tester](https://github.com/levz0r/gmail-tester) را برای ایجاد `credentials.json` (فایل احراز هویت OAuth2) و `token.json` (توکن OAuth2) دنبال کنید.

### پیکربندی

سرویس را با اضافه کردن `gmail` به لیست سرویس‌ها اضافه کنید، به عنوان مثال:

```js
// wdio.conf.js
import path from 'path'

export const config = {
    // ...
    services: [['gmail', {
        credentialsJsonPath: path.join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10,
        timeoutSec: 60
    }]]
    // ...
};
```

## گزینه‌های سرویس

### credentialsJsonPath
مسیر مطلق به فایل JSON اعتبارنامه.

نوع: `string`

الزامی: `true`

### tokenJsonPath
مسیر مطلق به فایل JSON توکن.

نوع: `string`

الزامی: `true`

### intervalSec
فاصله زمانی بین بررسی‌های صندوق ورودی جیمیل.

نوع: `number`

پیش‌فرض: `10`

الزامی: `false`

### timeoutSec
حداکثر زمان انتظار برای یافتن ایمیل برای فیلترهای داده شده.

نوع: `number`

پیش‌فرض: `60`

الزامی: `false`


## نوشتن تست‌ها

در تست WebdriverIO خود، اکنون می‌توانید بررسی کنید که آیا ایمیلی دریافت شده است یا خیر.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## پارامترهای `checkInbox`

پارامترهای دستور حداقل به یکی از `from`، `to` یا `subject` نیاز دارند:

### `from`
فیلتر کردن بر اساس آدرس ایمیل فرستنده.

نوع: `String`

### `to`
فیلتر کردن بر اساس آدرس ایمیل گیرنده.

نوع: `String`

### `subject`
فیلتر کردن بر اساس موضوع ایمیل.

نوع: `String`

### `includeBody`
برای دریافت متن رمزگشایی شده ایمیل‌ها روی true تنظیم کنید.

نوع: `boolean`

### `includeAttachments`
برای دریافت پیوست‌های ایمیل با کدگذاری base64 روی true تنظیم کنید.

نوع: `boolean`

### `before`
فیلتر پیام‌های دریافت شده قبل از تاریخ مشخص شده.

نوع: `Date`

### `after`
فیلتر پیام‌های دریافت شده بعد از تاریخ مشخص شده.

نوع: `Date`

### `label`
برچسب پیش‌فرض 'INBOX' است، اما می‌تواند به 'SPAM'، 'TRASH' یا یک برچسب سفارشی تغییر کند. برای فهرست کامل برچسب‌های داخلی، به https://developers.google.com/gmail/api/guides/labels?hl=en مراجعه کنید

نوع: `String`

---

برای اطلاعات بیشتر درباره WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.