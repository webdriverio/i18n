---
id: testingbot-service
title: خدمة تيستنج بوت
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> خدمة WebdriverIO التي توفر تكاملًا أفضل مع TestingBot. تقوم بتحديث بيانات الوظيفة (الاسم 'name'، النجاح 'passed'، العلامات 'tags'، العام 'public'، البناء 'build'، إضافات 'extra') وتشغيل نفق TestingBot إذا كان مطلوبًا.

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@wdio/testingbot-service` كـ devDependency في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/testingbot-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted)

## التكوين

لاستخدام الخدمة تحتاج إلى تعيين `user` و `key` في ملف `wdio.conf.js` الخاص بك، وتعيين خيار `hostname` إلى `hub.testingbot.com`. إذا كنت ترغب في استخدام [نفق TestingBot](https://testingbot.com/support/other/tunnel) فأنت بحاجة إلى تعيين `tbTunnel: true`.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## الخيارات

لتفويض خدمة TestingBot، يجب أن يحتوي ملف التكوين الخاص بك على خيارات [`user`](https://webdriver.io/docs/options#user) و [`key`](https://webdriver.io/docs/options#key).

### tbTunnel
إذا كانت القيمة صحيحة، فإنها تقوم بتشغيل نفق TestingBot وتفتح اتصالًا آمنًا بين الجهاز الافتراضي TestingBot الذي يقوم بتشغيل اختبارات المتصفح الخاصة بك.

النوع: `Boolean`<br />
الافتراضي: `false`

### tbTunnelOpts
تطبيق خيارات نفق TestingBot (مثل تغيير إعدادات رقم المنفذ أو ملف السجل). انظر [هذه القائمة](https://github.com/testingbot/testingbot-tunnel-launcher) لمزيد من المعلومات.

النوع: `Object`<br />
الافتراضي: `{}`