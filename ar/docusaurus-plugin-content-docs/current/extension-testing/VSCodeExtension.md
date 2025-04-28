---
id: vscode-extensions
title: اختبار ملحقات VS Code
---

يسمح لك WebdriverIO باختبار [ملحقات VS Code](https://code.visualstudio.com/) بسلاسة من البداية إلى النهاية في بيئة VS Code Desktop IDE أو كملحق ويب. ما عليك سوى توفير مسار لملحقك وسيتولى الإطار البرمجي الباقي. مع [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) يتم توفير كل شيء والمزيد:

- 🏗️ تثبيت VSCode (إما الإصدار المستقر أو التجريبي أو إصدار محدد)
- ⬇️ تنزيل Chromedriver المحدد لإصدار VSCode المعطى
- 🚀 يمكنك من الوصول إلى واجهة برمجة تطبيقات VSCode من اختباراتك
- 🖥️ بدء تشغيل VSCode بإعدادات مستخدم مخصصة (بما في ذلك دعم VSCode على Ubuntu و MacOS و Windows)
- 🌐 أو تقديم VSCode من خادم ليتم الوصول إليه من أي متصفح لاختبار ملحقات الويب
- 📔 إعداد كائنات الصفحة مع محددات المواقع المطابقة لإصدار VSCode الخاص بك

## البدء

لبدء مشروع WebdriverIO جديد، قم بتشغيل:

```sh
npm create wdio@latest ./
```

سيرشدك معالج التثبيت خلال العملية. تأكد من اختيار _"VS Code Extension Testing"_ عندما يسألك عن نوع الاختبار الذي ترغب في إجرائه، وبعد ذلك فقط احتفظ بالإعدادات الافتراضية أو قم بتعديلها حسب تفضيلاتك.

## مثال على التكوين

لاستخدام الخدمة يجب عليك إضافة `vscode` إلى قائمة الخدمات الخاصة بك، وبشكل اختياري متبوعًا بكائن تكوين. هذا سيجعل WebdriverIO يقوم بتنزيل ملفات VSCode الثنائية المحددة وإصدار Chromedriver المناسب:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" أو "stable" لأحدث إصدار من VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * اختياريًا يمكنك تحديد المسار الذي يخزن فيه WebdriverIO جميع
     * ملفات VSCode و Chromedriver الثنائية، على سبيل المثال:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

إذا قمت بتعريف `wdio:vscodeOptions` مع أي `browserName` آخر غير `vscode`، مثل `chrome`، فإن الخدمة ستقدم الملحق كملحق ويب. إذا كنت تختبر على Chrome، فلا تكون هناك حاجة إلى خدمة مشغل إضافية، على سبيل المثال:

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

_ملاحظة:_ عند اختبار ملحقات الويب يمكنك فقط الاختيار بين `stable` أو `insiders` كـ `browserVersion`.

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

يمكنك بعد ذلك استخدام طريقة `getWorkbench` للوصول إلى كائنات الصفحة للمحددات التي تطابق إصدار VSCode المطلوب:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

من هناك يمكنك الوصول إلى جميع كائنات الصفحة باستخدام طرق كائن الصفحة المناسبة. اكتشف المزيد حول جميع كائنات الصفحة المتاحة وطرقها في [وثائق كائن الصفحة](https://webdriverio-community.github.io/wdio-vscode-service/).

### الوصول إلى واجهات برمجة تطبيقات VSCode

إذا كنت ترغب في تنفيذ أتمتة معينة من خلال [واجهة برمجة تطبيقات VSCode](https://code.visualstudio.com/api/references/vscode-api)، يمكنك القيام بذلك عن طريق تشغيل أوامر عن بُعد عبر الأمر المخصص `executeWorkbench`. يتيح لك هذا الأمر تنفيذ التعليمات البرمجية عن بُعد من اختبارك داخل بيئة VSCode ويمكنك من الوصول إلى واجهة برمجة تطبيقات VSCode. يمكنك تمرير معلمات عشوائية إلى الدالة التي سيتم نقلها بعد ذلك إلى الدالة. سيتم دائمًا تمرير كائن `vscode` كوسيطة أولى تليها معلمات الدالة الخارجية. لاحظ أنه لا يمكنك الوصول إلى المتغيرات خارج نطاق الدالة لأن رد الاتصال يتم تنفيذه عن بُعد. إليك مثال:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // المخرجات: "I am an API call!"
```

للحصول على وثائق كاملة لكائن الصفحة، راجع [الوثائق](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). يمكنك العثور على أمثلة استخدام متنوعة في [مجموعة اختبارات هذا المشروع](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## مزيد من المعلومات

يمكنك معرفة المزيد حول كيفية تكوين [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) وكيفية إنشاء كائنات صفحة مخصصة في [وثائق الخدمة](/docs/wdio-vscode-service). يمكنك أيضًا مشاهدة المحادثة التالية بواسطة [Christian Bromann](https://twitter.com/bromann) حول [_اختبار ملحقات VSCode المعقدة بقوة معايير الويب_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>