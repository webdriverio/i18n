---
id: getting-started
title: البدء
description: "ثبّت WebdriverIO DevTools وشغّل اختبارك الأول في الوضع المباشر أو وضع التتبع لإعادة تشغيل DOM ولقطات الشاشة والشبكة ومخرجات وحدة التحكم."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

يمنح WebdriverIO DevTools اختبارات المتصفح الشاملة (end-to-end) الخاصة بك واجهة أدوات مطورين لتشغيل الأتمتة وتصحيح أخطائها وفحصها — إعادة تشغيل DOM، ولقطات شاشة لكل أمر، والتقاط الشبكة ووحدة التحكم، وتسجيلات الشاشة للجلسات. يعمل في وضعين. **الوضع المباشر** يفتح [لوحة تحكم](/docs/devtools/dashboard) تفاعلية في نافذة متصفح أثناء تنفيذ اختباراتك، بحيث يمكنك مشاهدتها وإعادة تشغيلها في الوقت الفعلي. **وضع التتبع** يتخطى الواجهة ويكتب [ملف تتبع](/docs/devtools/wdio/trace-mode) (`trace.zip`) محمولًا يعمل دون اتصال يمكنك فتحه لاحقًا في مشغل `show-trace` — وهو مثالي لبيئة CI. تساعدك هذه الصفحة على البدء بالوضع المباشر بسرعة؛ ووضع التتبع على بُعد خيار واحد فقط.

## التثبيت والتشغيل الأول

اختر المحوّل الخاص بك، وثبّته، وأضف الإعداد الأدنى أدناه. شغّل اختباراتك كالمعتاد — ستُفتح لوحة تحكم DevTools تلقائيًا في نافذة متصفح جديدة.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

ثبّت الخدمة:

```sh
npm install @wdio/devtools-service --save-dev
```

أضفها إلى ملف إعدادات مشغل الاختبارات:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

شغّل اختبارات WebdriverIO كالمعتاد — تُفتح واجهة DevTools تلقائيًا وتبدأ الاختبارات بالظهور مرئيًا على الفور.

</TabItem>
<TabItem value="selenium">

يعمل مع Mocha أو Jest أو Cucumber أو سكربت `node` عادي — إذ تكتشف الإضافة المشغل تلقائيًا. ثبّتها:

```bash
npm install @wdio/selenium-devtools
```

أضف استيرادًا واحدًا واستدعاءً واحدًا لـ `configure` في أعلى ملف الاختبار (المثال باستخدام Mocha):

```js
// tests/example.test.js
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

شغّله — تُفتح واجهة DevTools في نافذة Chrome جديدة:

```bash
mocha --timeout 60000 tests/example.test.js
```

راجع [صفحة Selenium](/docs/devtools/selenium) لإعدادات Jest وCucumber وNode العادي.

</TabItem>
<TabItem value="nightwatch">

ثبّت المحوّل:

```bash
npm install @wdio/nightwatch-devtools
```

اربطه بإعدادات Nightwatch عبر `globals` — دون الحاجة إلى أي تغييرات في ملفات الاختبار:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // مطلوب لالتقاط طلبات الشبكة
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

شغّل اختباراتك كالمعتاد — تُفتح واجهة DevTools تلقائيًا:

```bash
nightwatch
```

راجع [صفحة Nightwatch](/docs/devtools/nightwatch) لإعداد Cucumber/BDD.

</TabItem>
</Tabs>

## الخطوات التالية

- **[وضع التتبع](/docs/devtools/wdio/trace-mode)** — اضبط `mode: 'trace'` لتخطي الواجهة وإنتاج ملف تتبع محمول يعمل دون اتصال لبيئة CI.
- **[مرجع الإعدادات](/docs/devtools/reference)** — جميع الخيارات عبر المحوّلات الثلاثة.
- **أطر العمل** — أدلة كاملة لكل محوّل: [WebdriverIO](/docs/devtools/wdio)، [Selenium](/docs/devtools/selenium)، [Nightwatch](/docs/devtools/nightwatch).