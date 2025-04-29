---
id: qajonatasmartins-wdio-google-chat-service
title: سرویس گوگل چت
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---


> @qajonatasmartins/wdio-google-chat-service یک بسته شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service) مراجعه کنید

کتابخانه Webdriverio برای ارسال نتایج تست به عنوان اعلان/پیام به فضاهای گوگل چت.

## نصب

`npm install wdio-google-chat-service --save-dev`

یا

`yarn add wdio-google-chat-service`

## تنظیمات

ابتدا، سرویس را در فایل پیکربندی wdio وارد کنید `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

برای استفاده از سرویس شما نیاز به URL وب‌هوک گوگل چت دارید تا اعلان را ارسال کنید و آن URL را در 'webhook' اضافه کنید

مثال:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Send notification only in case of test failure
        }]
],
```

## دریافت وب‌هوک گوگل چت

توجه: گوگل چت فقط برای حساب‌های تجاری وب‌هوک دارد. اگر از حساب شخصی استفاده می‌کنید، احتمالاً گزینه وب‌هوک را نخواهید داشت.

1. یک فضا در گوگل چت ایجاد کنید
2. روی فلش کنار نام فضای چت کلیک کنید
3. روی [Manage Webhooks] کلیک کنید
4. یک وب‌هوک اضافه کنید یا URL وب‌هوک نمایش داده شده را کپی کنید.
5. URL وب‌هوک را در سرویس داخل گزینه 'webhookUrl' همانطور که در مثال بالا نشان داده شده است قرار دهید.

## ویژگی‌ها

- پشتیبانی از اجراکننده mocha
- جزئیات خطا
- ارسال اعلان فقط در صورت شکست تست

## نتایج

![Test pass and fail](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)