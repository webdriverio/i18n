---
id: desktop
title: تطبيقات سطح المكتب
description: اختر إعداد WebdriverIO المناسب لتطبيقات macOS الأصلية ولتطبيقات Electron وTauri وDioxus على macOS وWindows وLinux، وشغّل اختبارك الأول.
---

تعتمد طريقة أتمتة WebdriverIO لتطبيق سطح المكتب على كيفية بناء التطبيق. تتم أتمتة تطبيقات macOS الأصلية من خلال [Appium](/docs/appium) باستخدام برنامج التشغيل Mac2 (`'appium:automationName': 'Mac2'`)، الذي يتطلب Xcode. أما التطبيقات المبنية بإطار عمل قائم على الويب، فيتم التحكم بها عبر محرك المتصفح المضمَّن فيها بواسطة خدمة WebdriverIO مخصصة. تستخدم [خدمة Electron](/docs/desktop-testing/electron) متصفح Chromium عبر Chromedriver يُثبَّت تلقائيًا، ويمكنها أيضًا استدعاء واجهات برمجة التطبيقات الخاصة بالعملية الرئيسية في Electron. أما [خدمة Tauri](/docs/desktop-testing/tauri) و[خدمة Dioxus](/docs/desktop-testing/dioxus) فتتحكمان بمكوّن عرض الويب (webview) الخاص بنظام التشغيل: WebView2 على Windows، وWKWebView على macOS، وWebKitGTK على Linux. تشغّل هذه الخدمات الثلاث مجموعة الاختبارات نفسها على Windows وmacOS وLinux. لا يوجد حاليًا برنامج تشغيل موصى به لتطبيقات Windows الأصلية: فبرنامج Windows Driver الخاص بـ Appium مبني على WinAppDriver من Microsoft، الذي لم تعد صيانته مستمرة. ولا يوجد دعم موثَّق لأتمتة تطبيقات Linux الأصلية بشكل عام.

| نوع التطبيق | macOS | Windows | Linux | الطريقة |
|----------|-------|---------|-------|-----|
| تطبيق أصلي | نعم | غير موصى به | غير موثَّق | برنامج التشغيل Appium Mac2 |
| Electron | نعم | نعم | نعم | `@wdio/electron-service` (Chromedriver) |
| Tauri | نعم | نعم | نعم | `@wdio/tauri-service` (إضافة مضمَّنة، أو `tauri-driver` أو CrabNebula) |
| Dioxus | نعم | نعم | نعم | `@wdio/dioxus-service` (برنامج تشغيل مضمَّن؛ برنامج تشغيل خارجي على Windows فقط) |

## البدء السريع

يقوم الأمر `npm create wdio@latest ./` بإنشاء الهيكل الأساسي لكل هذه الإعدادات. اختر "Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications" ثم اختر إطار العمل الخاص بك. يحتاج كل إعداد أدناه أيضًا إلى `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` وإلى ملف `tsconfig.json` يحتوي على `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

### Electron (macOS وWindows وLinux)

```sh
npm install --save-dev @wdio/electron-service
```

```ts title="wdio.conf.ts"
/// <reference types="@wdio/electron-service" />
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'electron',
        'wdio:electronServiceOptions': {
            // مطلوب فقط إذا فشل الاكتشاف التلقائي لمخرجات Electron Forge / electron-builder
            // appBinaryPath: './dist-electron/linux-unpacked/myApp',
            appArgs: []
        }
    }],
    services: ['electron'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { browser } from '@wdio/globals'

describe('Electron Testing', () => {
    it('should print application title', async () => {
        console.log('Hello', await browser.getTitle(), 'application!')
    })
})
```

استخدم `browser.electron.execute((electron, ...args) => { ... })` لتشغيل التعليمات البرمجية في العملية الرئيسية، و`browser.electron.mock()` لمحاكاة واجهات برمجة تطبيقات Electron.

### تطبيق macOS أصلي (Appium Mac2)

```sh
npm install --save-dev @wdio/appium-service appium appium-mac2-driver
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Mac',
        'appium:automationName': 'Mac2',
        'appium:bundleId': 'com.apple.calculator'
    }],
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/calculator.e2e.ts"
import { expect, $ } from '@wdio/globals'

describe('MacOS Testing', () => {
    it('should calculate the meaning of life', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    })
})
```

تحدد `appium:bundleId` التطبيق الذي سيتم تشغيله عند بدء الجلسة.

### Tauri وDioxus

يتطلب كلاهما إضافة من جانب Rust إلى تطبيقك، لذا اتبع أدلة البدء السريع الخاصة بهما:

- Tauri: أضف الحزمة `tauri-plugin-wdio-webdriver` (المزوّد المضمَّن)، ثم استخدم `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. راجع [دليل البدء السريع لـ Tauri](/docs/desktop-testing/tauri/quick-start).
- Dioxus: أضف الحزمة `wdio-dioxus-bridge` وأنشئ إصدار تصحيح (`cargo build`). ثم استخدم `services: [['dioxus', { driverProvider: 'embedded' }]]` مع `browserName: 'dioxus'` و`'dioxus:options': { application: './target/debug/my-app' }`. راجع [دليل البدء السريع لـ Dioxus](/docs/desktop-testing/dioxus/quick-start).

## اختر مسارك

- [macOS](/docs/desktop-testing/macos): تطبيقات macOS الأصلية باستخدام Appium وبرنامج التشغيل Mac2.
- [Windows](/docs/desktop-testing/windows): الوضع الحالي لأتمتة تطبيقات Windows الأصلية.
- [Electron](/docs/desktop-testing/electron): الإعداد، ثم [التكوين](/docs/desktop-testing/electron/configuration) (بما في ذلك مسارات الملفات التنفيذية لكل نظام تشغيل)، و[الوصول إلى واجهات برمجة تطبيقات Electron](/docs/desktop-testing/electron/api)، و[مرجع واجهة برمجة التطبيقات والمحاكاة](/docs/desktop-testing/electron/api-reference)، و[إدارة النوافذ](/docs/desktop-testing/electron/window-management)، و[الروابط العميقة](/docs/desktop-testing/electron/deeplink-testing)، و[الوضع المستقل](/docs/desktop-testing/electron/standalone)، و[تصحيح الأخطاء](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [دعم المنصات](/docs/desktop-testing/tauri/platform-support)، و[التكوين](/docs/desktop-testing/tauri/configuration)، و[إعداد الإضافة](/docs/desktop-testing/tauri/plugin-setup)، و[CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup)، و[Edge WebDriver على Windows](/docs/desktop-testing/tauri/edge-webdriver-windows)، و[أمثلة الاستخدام](/docs/desktop-testing/tauri/usage-examples)، و[مرجع واجهة برمجة التطبيقات](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [دعم المنصات](/docs/desktop-testing/dioxus/platform-support)، و[التكوين](/docs/desktop-testing/dioxus/configuration)، و[إعداد الجسر](/docs/desktop-testing/dioxus/plugin-setup)، و[وضع المتصفح](/docs/desktop-testing/dioxus/browser-mode) (اختبارات للواجهة الأمامية فقط في Chrome مع أوامر محاكاة)، و[أمثلة الاستخدام](/docs/desktop-testing/dioxus/usage-examples)، و[مرجع واجهة برمجة التطبيقات](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): تدعم خدمات Electron وTauri وDioxus جلسات multi-remote، على سبيل المثال تشغيل نسختين من التطبيق في اختبار واحد.

## Linux

على Linux، يتحكم WebdriverIO بتطبيقات Electron وTauri وDioxus. أمور ينبغي معرفتها:

- التكامل المستمر (CI) بدون واجهة رسومية: تحتاج هذه التطبيقات إلى خادم عرض. عند عدم وجود شاشة عرض، يبدأ مشغّل الاختبارات Weston، أو Xvfb كبديل. اضبط `displayServerAutoInstall: true` لتثبيت أحدهما إذا لم يكن أيٌّ منهما مثبتًا. بدلًا من ذلك، يمكنك تغليف مشغّل الاختبارات باستخدام xvfb-run، على سبيل المثال `xvfb-run -a npx wdio run wdio.conf.ts`. راجع [Headless وخوادم العرض](/docs/headless-and-display-servers).
- يحتاج Tauri مع المزوّد `official` إلى WebKitWebDriver (الحزمة `webkit2gtk-driver`). أما المزوّد `embedded` فلا يحتاج إلى أي برنامج تشغيل خارجي.
- يدعم Dioxus المزوّد `embedded` فقط على Linux، ويتطلب بناء تطبيقات Dioxus مكتبات التطوير الخاصة بـ WebKitGTK.
- Electron على Ubuntu 24.04+ والتوزيعات الأخرى التي تفعّل AppArmor: اضبط خيار الخدمة `apparmorAutoInstall` إذا فشل Electron في البدء.

## استكشاف الأخطاء وإصلاحها

- Electron: [المشكلات الشائعة](/docs/desktop-testing/electron/common-issues)، على سبيل المثال "DevToolsActivePort file doesn't exist" في بيئة CI.
- Tauri: [استكشاف الأخطاء وإصلاحها](/docs/desktop-testing/tauri/troubleshooting)، بما في ذلك عدم تطابق إصدارات Edge WebDriver وWebView2.
- Dioxus: [استكشاف الأخطاء وإصلاحها](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: راجع مشروع [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) للاطلاع على الإعدادات الخاصة ببرنامج التشغيل مثل Xcode.

## الخطوات التالية

- مرجع [التكوين](/docs/configuration) لكل خيار من خيارات `wdio.conf.ts`.
- خيارات [خدمة Appium](/docs/appium-service) لإعداد Mac2.
- منصات أخرى: [متصفحات الويب](/docs/platforms/web)، و[تطبيقات الهاتف المحمول](/docs/platforms/mobile)، و[الإضافات والمحررات](/docs/platforms/apps-and-extensions).