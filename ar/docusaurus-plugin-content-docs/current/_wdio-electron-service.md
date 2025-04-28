---
id: wdio-electron-service
title: خدمة إلكترون
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**خدمة WebdriverIO لاختبار تطبيقات إلكترون**

تمكّن من اختبار تطبيقات إلكترون عبر المنصات المختلفة من خلال نظام WebdriverIO الشامل.

الخلف الروحي لـ [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### الميزات

يجعل اختبار تطبيقات إلكترون أسهل بكثير من خلال:

- 🚗 الإعداد التلقائي للـ Chromedriver المطلوب (لإلكترون الإصدار 26 وما فوق)
- 📦 الكشف التلقائي عن مسار تطبيق إلكترون الخاص بك
  - يدعم [Electron Forge](https://www.electronforge.io/) و [Electron Builder](https://www.electron.build/) والتطبيقات غير المحزمة
- 🧩 الوصول إلى واجهات برمجة تطبيقات إلكترون داخل اختباراتك
- 🕵️ محاكاة واجهات برمجة تطبيقات إلكترون عبر واجهة برمجة مشابهة لـ Vitest

## التثبيت

ستحتاج إلى تثبيت `WebdriverIO`، يمكن العثور على التعليمات [هنا](https://webdriver.io/docs/gettingstarted).

## البدء السريع

الطريقة الموصى بها للبدء بسرعة هي استخدام [معالج تكوين WDIO](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### البدء السريع اليدوي

للبدء بدون استخدام معالج التكوين، ستحتاج إلى تثبيت الخدمة و `@wdio/cli`:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

أو استخدم مدير الحزم المفضل لديك - pnpm، yarn، إلخ.

بعد ذلك، قم بإنشاء ملف تكوين WDIO الخاص بك. إذا كنت بحاجة إلى بعض الإلهام لهذا، فهناك تكوين يعمل في [دليل المثال](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) في هذا المستودع، بالإضافة إلى [صفحة مرجع تكوين WDIO](https://webdriver.io/docs/configuration).

ستحتاج إلى إضافة `electron` إلى مصفوفة الخدمات الخاصة بك وتعيين قدرة إلكترون، على سبيل المثال:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

أخيرًا، [قم بتشغيل بعض الاختبارات](https://webdriver.io/docs/gettingstarted#run-test) باستخدام ملف التكوين الخاص بك.

سيؤدي هذا إلى تشغيل نسخة من تطبيقك بنفس الطريقة التي يتعامل بها WDIO مع المتصفحات مثل Chrome أو Firefox. تعمل الخدمة مع [WDIO (متوازي) multiremote](https://webdriver.io/docs/multiremote) إذا كنت بحاجة إلى تشغيل نسخ إضافية في وقت واحد، مثل نسخ متعددة من تطبيقك أو مجموعات مختلفة من تطبيقك ومتصفح الويب.

إذا كنت تستخدم [Electron Forge](https://www.electronforge.io/) أو [Electron Builder](https://www.electron.build/) لحزم تطبيقك، فستحاول الخدمة تلقائيًا العثور على المسار إلى تطبيق إلكترون المحزم الخاص بك. يمكنك توفير مسار مخصص للملف الثنائي عبر قدرات الخدمة المخصصة، على سبيل المثال:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

راجع [وثيقة التكوين](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath) لمعرفة كيفية العثور على قيمة `appBinaryPath` لأنظمة التشغيل المختلفة التي يدعمها إلكترون.

بدلاً من ذلك، يمكنك توجيه الخدمة إلى تطبيق غير محزم عن طريق توفير المسار إلى نص `main.js`. يجب تثبيت إلكترون في `node_modules` الخاص بك. يوصى بتجميع التطبيقات غير المحزمة باستخدام أداة حزم مثل Rollup أو Parcel أو Webpack، إلخ.

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## تكوين Chromedriver

**إذا كان تطبيقك يستخدم إصدارًا من إلكترون أقل من الإصدار 26، فستحتاج إلى [تكوين Chromedriver يدويًا](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

هذا لأن WDIO يستخدم Chrome للاختبار لتنزيل Chromedriver، والذي يوفر فقط إصدارات Chromedriver 115 أو أحدث.

## التوثيق

**[تكوين الخدمة](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[تكوين Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[الوصول إلى واجهات برمجة تطبيقات إلكترون](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[محاكاة واجهات برمجة تطبيقات إلكترون](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[إدارة النوافذ](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[الوضع المستقل](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[التطوير](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[المشاكل الشائعة والتصحيح](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## التطوير

اقرأ [وثيقة التطوير](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md) إذا كنت مهتمًا بالمساهمة.

## أمثلة التكامل

ألق نظرة على مشروع [نموذج إلكترون](https://github.com/webdriverio/electron-boilerplate) الذي يوضح كيفية دمج WebdriverIO في تطبيق مثال. يمكنك أيضًا إلقاء نظرة على [تطبيقات المثال](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) و [اختبارات E2E](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) في هذا المستودع.

## الدعم

إذا كنت تواجه مشاكل في تشغيل WDIO مع الخدمة، يجب عليك التحقق من [المشاكل الشائعة](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md) في المقام الأول، ثم فتح مناقشة في [منتدى WDIO الرئيسي](https://github.com/webdriverio/webdriverio/discussions).

منتدى مناقشة خدمة إلكترون أقل نشاطًا بكثير من منتدى WDIO، ولكن إذا كانت المشكلة التي تواجهها خاصة بإلكترون أو باستخدام الخدمة، فيمكنك فتح مناقشة [هنا](https://github.com/webdriverio-community/wdio-electron-service/discussions).