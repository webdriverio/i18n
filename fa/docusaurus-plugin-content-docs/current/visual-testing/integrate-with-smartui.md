---
id: integrate-with-smartui
title: اسمارت یو آی
---

TestMu AI (سابقاً LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) آزمون رگرسیون بصری مبتنی بر هوش مصنوعی را برای تست‌های WebdriverIO شما فراهم می‌کند. این سرویس از صفحات نمایش عکس می‌گیرد، آنها را با خط پایه مقایسه می‌کند و تفاوت‌های بصری را با الگوریتم‌های هوشمند مقایسه‌ای برجسته می‌کند.

## راه‌اندازی

**ایجاد یک پروژه SmartUI**

[ثبت نام کنید](https://accounts.lambdatest.com/register) در TestMu AI (سابقاً LambdaTest) و به بخش [پروژه‌های SmartUI](https://smartui.lambdatest.com/) بروید تا یک پروژه جدید ایجاد کنید. پلتفرم **Web** را انتخاب کنید و نام پروژه، تأییدکنندگان و برچسب‌های خود را پیکربندی کنید.

**تنظیم اعتبارنامه‌ها**

`LT_USERNAME` و `LT_ACCESS_KEY` خود را از داشبورد TestMu AI (سابقاً LambdaTest) دریافت کنید و آنها را به عنوان متغیرهای محیطی تنظیم کنید:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**نصب SDK اسمارت یو آی**

```sh
npm install @lambdatest/wdio-driver
```

**پیکربندی WebdriverIO**

فایل `wdio.conf.js` خود را به‌روزرسانی کنید:

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## استفاده

از `browser.execute('smartui.takeScreenshot')` برای گرفتن تصاویر استفاده کنید:

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**اجرای تست‌ها**

```sh
npx wdio wdio.conf.js
```

نتایج را در [داشبورد SmartUI](https://smartui.lambdatest.com/) مشاهده کنید.

## گزینه‌های پیشرفته

**نادیده گرفتن عناصر**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**انتخاب مناطق خاص**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## منابع

| منبع                                                                                          | توضیحات                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [مستندات رسمی](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | مستندات SmartUI                    |
| [داشبورد SmartUI](https://smartui.lambdatest.com/)                                              | دسترسی به پروژه‌ها و ساخت‌های SmartUI  |
| [تنظیمات پیشرفته](https://www.testmuai.com/support/docs/test-settings-options/)              | پیکربندی حساسیت مقایسه         |
| [گزینه‌های ساخت](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | پیکربندی پیشرفته ساخت             |