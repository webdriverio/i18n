---
id: apps-and-extensions
title: الإضافات والمحررات
description: حمّل إضافة متصفح أو إضافة VS Code في جلسة WebdriverIO واختبرها من البداية إلى النهاية.
---

يختبر WebdriverIO إضافات المتصفح وإضافات المحررات عن طريق تحميلها في التطبيق المضيف الحقيقي. تعمل إضافات المتصفح (الويب) داخل Chrome أو Firefox. يمكنك تحميلها من خلال إمكانيات المتصفح (capabilities): باستخدام `--load-extension` أو ملف `.crx` بترميز base64 عبر `goog:chromeOptions` في Chrome، أو باستخدام `browser.installAddOn()` لملف `.xpi` في Firefox. في جلسة WebDriver BiDi يمكنك أيضًا تثبيت إضافة وإزالتها أثناء الجلسة باستخدام `browser.installExtension()` و`browser.uninstallExtension()`. لا يدعم Safari جلسات BiDi، لذا لا يشمل هذا الأمر Safari. بعد ذلك، يمكنك اختبار سكربتات المحتوى (content scripts) وصفحات النوافذ المنبثقة (popup) باستخدام أوامر WebDriver المعتادة. تُختبر إضافات VS Code باستخدام الخدمة المجتمعية [`wdio-vscode-service`](/docs/wdio-vscode-service). تقوم هذه الخدمة بتنزيل VS Code (الإصدار المستقر أو insiders أو إصدار محدد) وإصدار Chromedriver المطابق له، ثم تشغّل VS Code مع إضافتك وإعدادات المستخدم المخصصة. تتوفر كائنات الصفحات (page objects) الخاصة بمساحة العمل (workbench) عبر `browser.getWorkbench()`، ويقوم `browser.executeWorkbench()` بتشغيل التعليمات البرمجية على واجهة برمجة تطبيقات VS Code. يمكن للخدمة نفسها أيضًا تقديم VS Code داخل المتصفح لاختبار إضافات الويب. كما تتوفر خدمة مجتمعية لإضافات Obsidian أيضًا.

## البدء السريع

ثبّت أداة تشغيل الاختبارات ودعم TypeScript أولًا:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

### إضافة Chrome

ابنِ إضافتك في مجلد (هنا `./dist`) وحمّلها باستخدام وسيط Chrome ‏`--load-extension`:

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // استبدله بعنصر يضيفه سكربت المحتوى الخاص بك إلى الصفحة
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

النقر على أيقونة الإضافة في شريط الأدوات لا يعمل. لاختبار `default_popup`، اعثر على معرّف الإضافة في `chrome://extensions/` وافتح `chrome-extension://<id>/<popup>.html` باستخدام `browser.url()`. يحتوي [دليل إضافات الويب](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) على أمر مخصص جاهز `openExtensionPopup` لهذا الغرض.

### إضافة VS Code

```sh
npm install --save-dev wdio-vscode-service
```

أضف `"wdio-vscode-service"` إلى مصفوفة `types` في `tsconfig.json`.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // ممكن أيضًا: "insiders" أو إصدار محدد مثل "1.80.0"
        'wdio:vscodeOptions': {
            // يشير إلى المجلد الذي يوجد فيه ملف package.json الخاص بالإضافة
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

لاختبار الإضافة كإضافة ويب لـ VS Code، اضبط `browserName: 'chrome'` واحتفظ بـ `wdio:vscodeOptions`. في هذا الوضع، يمكن أن تكون قيمة `browserVersion` إما `stable` أو `insiders` فقط. يُنشئ الأمر `npm create wdio@latest ./` مع خيار "VS Code Extension Testing" هذا الإعداد لك.

## اختر مسارك

- [اختبار إضافات الويب](/docs/extension-testing/web-extensions): حمّل الإضافات في Chrome (مجلد أو `.crx`) وFirefox (‏`.xpi` عبر [`installAddOn`](/docs/api/gecko#installaddon))، أو ثبّت إضافة وأزلها أثناء الجلسة باستخدام [`installExtension`](/docs/api/browser/installExtension). إضافات الويب لـ Safari غير مشمولة.
- [خدمة ملفات تعريف Firefox](/docs/firefox-profile-service): أنشئ ملف تعريف Firefox يتضمن الإضافات.
- [اختبار إضافات VS Code](/docs/extension-testing/vscode-extensions): الإعداد، وتهيئة TypeScript، وكائنات صفحات مساحة العمل، و`executeWorkbench`.
- [خدمة VS Code](/docs/wdio-vscode-service): جميع خيارات الخدمة، مثل `cachePath`، وكيفية كتابة كائنات صفحات مخصصة.
- [خدمة اختبار إضافات Obsidian](/docs/wdio-obsidian-service): خدمة مجتمعية تختبر إضافات Obsidian عبر إصدارات Obsidian المختلفة على Windows وmacOS وLinux وAndroid.
- [الأوامر المخصصة](/docs/customcommands): غلّف الدوال المساعدة مثل `openExtensionPopup` لإعادة استخدامها.

تعمل اختبارات إضافات الويب في جلسة Chrome أو Firefox عادية، لذا ينطبق كل ما ورد في [متصفحات الويب](/docs/platforms/web)، بما في ذلك المحددات (selectors) ومحاكاة الشبكة والاختبار المرئي.

## استكشاف الأخطاء وإصلاحها

- يرفض Firefox إضافة مبنية محليًا بسبب التوقيع: ثبّتها في خطّاف `before` باستخدام `browser.installAddOn(extension.toString('base64'), true)` بدلًا من تثبيتها عبر ملف تعريف. ابنِ ملف `.xpi` باستخدام `npx web-ext build`.
- استخدام Edge أو Brave أو Opera بدلًا من Chrome: عادةً ما تعمل الوسائط نفسها مع إمكانية الخيارات الخاصة بذلك المتصفح، مثل `ms:edgeOptions`.
- يتم تنزيل ملفات VS Code وChromedriver التنفيذية في مجلد ذاكرة تخزين مؤقت. للتحكم في مكان تخزينها، على سبيل المثال لتخزينها مؤقتًا في CI، اضبط `services: [['vscode', { cachePath: __dirname }]]`.
- لا يستطيع TypeScript العثور على `getWorkbench` أو `executeWorkbench`: أضف `wdio-vscode-service` إلى `compilerOptions.types`.

## الخطوات التالية

- مرجع [الإعدادات](/docs/configuration) لكل خيار من خيارات `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) لاختبار تطبيقات سطح المكتب الكاملة المبنية على Chromium.
- منصات أخرى: [متصفحات الويب](/docs/platforms/web)، [تطبيقات الجوال](/docs/platforms/mobile)، [تطبيقات سطح المكتب](/docs/platforms/desktop).