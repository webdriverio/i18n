---
id: arm64-chromedriver
title: Chromedriver على ARM64
description: كيف يقوم WebdriverIO بإعداد Chromedriver على أنظمة macOS وWindows وLinux بمعمارية ARM64، وما الذي يجب فعله عند عدم وجود برنامج تشغيل Linux ARM64 مطابق.
---

يقوم WebdriverIO بإعداد Chromedriver تلقائيًا على ARM64. على **macOS** (معالجات Apple silicon)، تنشر Chrome for Testing نسخة أصلية من Chromedriver لمعمارية `mac-arm64` لكل إصدار، لذا لا يوجد ما يلزم إعداده. وعلى **Windows 11 on Arm** يعمل أيضًا دون أي تهيئة: لا تنشر Chrome for Testing نسخة Chromedriver لمعمارية `win-arm64`، لكن نسخة Chromedriver الخاصة بها لمعمارية `win64` (x64) تعمل ضمن [محاكاة x64](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) الشفافة في Windows، وتتحكم في كلٍّ من متصفح Chrome المثبت بمعمارية ARM64 ومتصفح Chrome for Testing بمعمارية x64 الذي يقوم WebdriverIO بتنزيله في غير ذلك من الحالات. أما على **Linux ARM64**، فتحتاج إصدارات Chrome الأقدم من `153.0.8001.0` إلى نظرة أدق، وهو ما يتناوله القسم التالي.

## Linux ARM64

تبني Chrome for Testing نسخة Chromedriver لمعمارية `linux-arm64` بدءًا من Chrome **`153.0.8001.0`** فصاعدًا، ويستخدمها WebdriverIO مباشرةً. أما بالنسبة لإصدار أقدم من Chrome أو Chromium، مثل الإصدار المحدد في `goog:chromeOptions.binary`، فإنه يقوم بتنزيل Chromedriver المضمّن في [أحد إصدارات Electron](https://github.com/electron/electron/releases) الذي يطابق الإصدار الرئيسي المطلوب من Chromium. يأتي هذا التنزيل من GitHub حتى عند تعيين `CHROMEDRIVER_CDNURL`، لأن Chrome for Testing لا تملك نسخة Chromedriver لمعمارية `linux-arm64` أقدم من `153.0.8001.0` يمكن لأي خادم مرآة أن يقدّمها؛ وفي حالة العمل دون اتصال، استخدم Chromium وبرنامج التشغيل الخاصين بتوزيعتك كما هو موضح [أدناه](#no-electron-release-ships-a-matching-chromedriver).

كذلك لا تملك Chrome for Testing إصدارات متصفح لمعمارية `linux-arm64` قبل `153.0.8001.0`، لذا لا تثبّت قيمة `browserVersion` على إصدار أقدم من ذلك إلا مع تعيين `goog:chromeOptions.binary` ليشير إلى متصفح بمعمارية ARM64.

## تطبيقات Electron

يقوم `wdio:electronVersion` بتنزيل Chromedriver المضمّن في إصدار معيّن من Electron، على جميع منصات ARM64. وبالنسبة لتطبيقات Electron، تقوم خدمة Electron بتعيينه بناءً على إصدار Electron الخاص بالتطبيق. راجع [الإمكانات (Capabilities)](capabilities#wdioelectronversion) لمزيد من التفاصيل.

## استكشاف الأخطاء وإصلاحها

### لا يوجد إصدار من Electron يتضمن Chromedriver مطابقًا

بعض الإصدارات الرئيسية من Chromium، مثل 145، لم تُضمَّن قط في أي إصدار من Electron. وفي هذه الحالة يفشل WebdriverIO بدلًا من تثبيت برنامج تشغيل غير مطابق:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

لحل هذه المشكلة:

- **استخدم Chrome/Chromium بالإصدار `153.0.8001.0` أو أحدث** حتى تقدّم Chrome for Testing برنامج التشغيل مباشرةً.
- **على Debian، استخدم Chromium وبرنامج التشغيل الخاصين بها**، وهما زوج متطابق لمعمارية arm64:
  ```bash
  sudo apt-get install -y chromium chromium-driver
  ```
  ```ts title="wdio.conf.ts"
  export const config: WebdriverIO.Config = {
      // ...
      capabilities: [{
          browserName: 'chrome',
          'goog:chromeOptions': { binary: '/usr/bin/chromium' },
          'wdio:chromedriverOptions': { binary: '/usr/bin/chromedriver' }
      }]
  }
  ```
- **استخدم Chromedriver الخاص بك** عبر `wdio:chromedriverOptions.binary`، مما يعطّل التنزيل كليًا.

## مواضيع ذات صلة

- [الملفات التنفيذية لبرامج التشغيل](driverbinaries): كيف يقوم WebdriverIO بتنزيل برامج تشغيل المتصفحات وتخزينها مؤقتًا، بما في ذلك الحل البديل عند فشل Chrome for Testing.
- [الإمكانات (Capabilities)](capabilities#wdioelectronversion): خيار `wdio:electronVersion`.