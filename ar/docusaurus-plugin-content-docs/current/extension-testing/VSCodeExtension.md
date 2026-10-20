---
id: vscode-extensions
title: اختبار إضافات VS Code
description: "اختبر إضافات VS Code من البداية إلى النهاية في بيئة التطوير المتكاملة لسطح المكتب أو كإضافات ويب باستخدام WebdriverIO وخدمة VS Code."
---

يتيح لك WebdriverIO اختبار إضافات [VS Code](https://code.visualstudio.com/) الخاصة بك بسلاسة من البداية إلى النهاية في بيئة التطوير المتكاملة VS Code لسطح المكتب أو كإضافة ويب. كل ما عليك هو توفير مسار إضافتك، وسيتولى إطار العمل الباقي. مع [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) يتم الاهتمام بكل شيء وأكثر من ذلك بكثير:

- 🏗️ تثبيت VSCode (إما الإصدار المستقر أو إصدار insiders أو إصدار محدد)
- ⬇️ تنزيل Chromedriver الخاص بإصدار VSCode المحدد
- 🚀 يمكّنك من الوصول إلى واجهة برمجة تطبيقات VSCode من اختباراتك
- 🖥️ تشغيل VSCode بإعدادات مستخدم مخصصة (بما في ذلك دعم VSCode على Ubuntu وMacOS وWindows)
- 🌐 أو تقديم VSCode من خادم ليتم الوصول إليه من أي متصفح لاختبار إضافات الويب
- 📔 تهيئة كائنات الصفحة (page objects) بمحددات تتوافق مع إصدار VSCode الخاص بك

## البدء

لإنشاء مشروع WebdriverIO جديد، نفّذ:

```sh
npm create wdio@latest ./
```

سيرشدك معالج التثبيت خلال العملية. تأكد من اختيار _"VS Code Extension Testing"_ عندما يسألك عن نوع الاختبار الذي ترغب في إجرائه، وبعد ذلك احتفظ بالإعدادات الافتراضية أو عدّلها حسب تفضيلاتك.

## مثال على الإعدادات

لاستخدام الخدمة، تحتاج إلى إضافة `vscode` إلى قائمة الخدمات الخاصة بك، متبوعة اختياريًا بكائن إعدادات. سيؤدي هذا إلى جعل WebdriverIO يقوم بتنزيل ملفات VSCode التنفيذية المحددة وإصدار Chromedriver المناسب:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" or "stable" for latest VSCode version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * يمكنك اختياريًا تحديد المسار الذي يخزن فيه WebdriverIO جميع
     * ملفات VSCode وChromedriver التنفيذية، على سبيل المثال:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

إذا قمت بتعريف `wdio:vscodeOptions` مع أي `browserName` آخر غير `vscode`، مثل `chrome`، فستقوم الخدمة بتقديم الإضافة كإضافة ويب. إذا كنت تختبر على Chrome فلا حاجة إلى خدمة تشغيل (driver) إضافية، على سبيل المثال:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_ملاحظة:_ عند اختبار إضافات الويب، يمكنك فقط الاختيار بين `stable` أو `insiders` كقيمة لـ `browserVersion`.

### إعداد TypeScript

في ملف `tsconfig.json` الخاص بك، تأكد من إضافة `wdio-vscode-service` إلى قائمة الأنواع:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## الاستخدام

يمكنك بعد ذلك استخدام التابع `getWorkbench` للوصول إلى كائنات الصفحة الخاصة بالمحددات المتوافقة مع إصدار VSCode الذي تريده:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

من هناك يمكنك الوصول إلى جميع كائنات الصفحة باستخدام توابع كائنات الصفحة المناسبة. تعرّف على المزيد حول جميع كائنات الصفحة المتاحة وتوابعها في [توثيق كائنات الصفحة](https://webdriverio-community.github.io/wdio-vscode-service/).

### الوصول إلى واجهات برمجة تطبيقات VSCode

إذا كنت ترغب في تنفيذ أتمتة معينة من خلال [واجهة برمجة تطبيقات VSCode](https://code.visualstudio.com/api/references/vscode-api)، يمكنك القيام بذلك عن طريق تشغيل أوامر عن بُعد عبر الأمر المخصص `executeWorkbench`. يتيح هذا الأمر تنفيذ التعليمات البرمجية عن بُعد من اختبارك داخل بيئة VSCode ويمكّنك من الوصول إلى واجهة برمجة تطبيقات VSCode. يمكنك تمرير معاملات عشوائية إلى الدالة والتي سيتم تمريرها بعد ذلك إلى داخل الدالة. سيتم دائمًا تمرير الكائن `vscode` كوسيط أول تليه معاملات الدالة الخارجية. لاحظ أنه لا يمكنك الوصول إلى المتغيرات خارج نطاق الدالة لأن دالة الاستدعاء (callback) يتم تنفيذها عن بُعد. إليك مثال:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // المخرجات: "I am an API call!"
```

للاطلاع على التوثيق الكامل لكائنات الصفحة، راجع [التوثيق](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). يمكنك العثور على أمثلة استخدام متنوعة في [مجموعة اختبارات هذا المشروع](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## مزيد من المعلومات

يمكنك معرفة المزيد حول كيفية إعداد [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) وكيفية إنشاء كائنات صفحة مخصصة في [توثيق الخدمة](/docs/wdio-vscode-service). يمكنك أيضًا مشاهدة المحاضرة التالية لـ [Christian Bromann](https://twitter.com/bromann) بعنوان [_اختبار إضافات VSCode المعقدة بقوة معايير الويب_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>