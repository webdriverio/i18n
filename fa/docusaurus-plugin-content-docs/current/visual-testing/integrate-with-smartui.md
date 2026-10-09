---
id: integrate-with-smartui
title: SmartUI
description: "افزودن تست رگرسیون بصری مبتنی بر هوش مصنوعی به تست‌های WebdriverIO با SmartUI از TestMu AI (که قبلاً LambdaTest نام داشت)، شامل راه‌اندازی و گزینه‌ها."
---

[SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) از TestMu AI (که قبلاً LambdaTest نام داشت) تست رگرسیون بصری مبتنی بر هوش مصنوعی را برای تست‌های WebdriverIO شما فراهم می‌کند. این ابزار اسکرین‌شات‌ها را ثبت می‌کند، آن‌ها را با خطوط پایه (baselines) مقایسه می‌کند و تفاوت‌های بصری را با الگوریتم‌های مقایسه هوشمند برجسته می‌سازد.

## راه‌اندازی

**ایجاد یک پروژه SmartUI**

به TestMu AI (که قبلاً LambdaTest نام داشت) [وارد شوید](https://accounts.lambdatest.com/register) و برای ایجاد یک پروژه جدید به [SmartUI Projects](https://smartui.lambdatest.com/) بروید. **Web** را به‌عنوان پلتفرم انتخاب کنید و نام پروژه، تأییدکنندگان و برچسب‌های آن را پیکربندی کنید.

**تنظیم اطلاعات احراز هویت**

`LT_USERNAME` و `LT_ACCESS_KEY` خود را از داشبورد TestMu AI (که قبلاً LambdaTest نام داشت) دریافت کرده و آن‌ها را به‌عنوان متغیرهای محیطی تنظیم کنید:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**نصب SmartUI SDK**

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

برای ثبت اسکرین‌شات‌ها از `browser.execute('smartui.takeScreenshot')` استفاده کنید:

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

**انتخاب نواحی مشخص**

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
| [داشبورد SmartUI](https://smartui.lambdatest.com/)                                              | دسترسی به پروژه‌ها و بیلدهای SmartUI شما  |
| [تنظیمات پیشرفته](https://www.testmuai.com/support/docs/test-settings-options/)              | پیکربندی حساسیت مقایسه         |
| [گزینه‌های بیلد](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | پیکربندی پیشرفته بیلد             |