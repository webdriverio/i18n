---
id: wdio-vscode-service
title: خدمة اختبار امتدادات VSCode
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---


> wdio-vscode-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

تم اختباره على:

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> خدمة WebdriverIO لاختبار امتدادات VSCode.

تتيح لك خدمة WebdriverIO هذه اختبار امتدادات VSCode من البداية إلى النهاية بسلاسة في واجهة VSCode المكتبية أو كامتداد ويب. كل ما تحتاجه هو توفير مسار إلى امتدادك وستقوم الخدمة بباقي المهام عن طريق:

- 🏗️ تثبيت VSCode (إما `stable` أو `insiders` أو إصدار محدد)
- ⬇️ تنزيل Chromedriver المحدد لإصدار VSCode المعين
- 🚀 تمكينك من الوصول إلى واجهة برمجة تطبيقات VSCode من اختباراتك
- 🖥️ بدء تشغيل VSCode بإعدادات مستخدم مخصصة (بما في ذلك دعم VSCode على Ubuntu و MacOS و Windows)
- 🌐 أو استضافة VSCode من خادم ليتم الوصول إليه من أي متصفح لاختبار [امتدادات الويب](https://code.visualstudio.com/api/extension-guides/web-extensions)
- 📔 إعداد كائنات الصفحة باستخدام محددات مواقع تتوافق مع إصدار VSCode الخاص بك

استُلهم هذا المشروع بشكل كبير من مشروع [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester) الذي يعتمد على Selenium. تأخذ هذه الحزمة الفكرة وتكيفها مع WebdriverIO.

بدءًا من إصدار VSCode v1.86، من الضروري استخدام `webdriverio` الإصدار v8.14 أو أحدث لتثبيت Chromedriver دون الحاجة إلى أي تكوين. إذا كنت بحاجة إلى اختبار إصدارات سابقة من VSCode، راجع قسم [تكوين Chromedriver](#chromedriver) أدناه.

## التثبيت

لبدء مشروع WebdriverIO جديد، قم بتشغيل:

```bash
npm create wdio ./
```

سيرشدك معالج التثبيت خلال العملية. تأكد من اختيار TypeScript كمترجم وعدم توليد كائنات صفحة لك نظرًا لأن هذا المشروع يأتي مع جميع كائنات الصفحة اللازمة. ثم تأكد من اختيار `vscode` ضمن قائمة الخدمات:

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

لمزيد من المعلومات حول كيفية تثبيت `WebdriverIO`، يرجى مراجعة [وثائق المشروع](https://webdriver.io/docs/gettingstarted).

## مثال التكوين

لاستخدام الخدمة، تحتاج إلى إضافة `vscode` إلى قائمة الخدمات الخاصة بك، متبوعًا بشكل اختياري بكائن تكوين. سيجعل هذا WebdriverIO يقوم بتنزيل ملفات VSCode الثنائية المحددة وإصدار Chromedriver المناسب:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" or "stable" for latest VSCode version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Optionally define the path WebdriverIO stores all VSCode binaries, e.g.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

إذا قمت بتحديد `wdio:vscodeOptions` مع أي `browserName` آخر غير `vscode`، مثل `chrome`، ستقوم الخدمة بخدمة الامتداد كامتداد ويب. إذا كنت تختبر على Chrome، لا تحتاج إلى خدمة سائق إضافية، مثل:

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

_ملاحظة:_ عند اختبار امتدادات الويب، يمكنك فقط الاختيار بين `stable` أو `insiders` كـ `browserVersion`.

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
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## الاستخدام

يمكنك بعد ذلك استخدام طريقة `getWorkbench` للوصول إلى كائنات الصفحة لمحددات المواقع التي تتطابق مع إصدار VSCode المطلوب:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### الوصول إلى واجهات برمجة تطبيقات VSCode

إذا كنت ترغب في تنفيذ أتمتة معينة من خلال [واجهة برمجة تطبيقات VSCode](https://code.visualstudio.com/api/references/vscode-api)، يمكنك القيام بذلك عن طريق تشغيل أوامر عن بُعد عبر الأمر المخصص `executeWorkbench`. يتيح لك هذا الأمر تنفيذ التعليمات البرمجية عن بُعد من اختبارك داخل بيئة VSCode ويمكّنك من الوصول إلى واجهة برمجة تطبيقات VSCode. يمكنك تمرير معلمات اختيارية إلى الدالة والتي سيتم نشرها بعد ذلك في الدالة. سيتم دائمًا تمرير كائن `vscode` كوسيطة أولى يتبعها معلمات الدالة الخارجية. لاحظ أنه لا يمكنك الوصول إلى المتغيرات خارج نطاق الدالة لأن رد الاتصال يتم تنفيذه عن بُعد. إليك مثال:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // outputs: "I am an API call!"
```

للحصول على وثائق كاملة لكائن الصفحة، راجع [الوثائق](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). يمكنك العثور على أمثلة استخدام مختلفة في [مجموعة اختبارات هذا المشروع](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## التكوين

من خلال تكوين الخدمة، يمكنك إدارة إصدار VSCode بالإضافة إلى إعدادات المستخدم لـ VSCode:

### خيارات الخدمة

خيارات الخدمة هي الخيارات اللازمة للخدمة لإعداد بيئة الاختبار.

#### `cachePath`

حدد مسار التخزين المؤقت لتجنب إعادة تنزيل حزم VS Code. هذا مفيد لـ CI/CD لتجنب إعادة تنزيل VSCode لكل عملية اختبار.

النوع: `string`<br />
الافتراضي: `process.cwd()`

### قدرات VSCode (`wdio:vscodeOptions`)

لتشغيل الاختبارات من خلال VSCode، يجب عليك تحديد `vscode` كـ `browserName`. يمكنك تحديد إصدار VSCode عن طريق توفير قدرة `browserVersion`. يتم بعد ذلك تحديد خيارات VSCode المخصصة ضمن قدرة `wdio:vscodeOptions` المخصصة. الخيارات هي كما يلي:

#### `binary`

مسار إلى تثبيت VSCode محلي. إذا لم يتم توفير الخيار، ستقوم الخدمة بتنزيل VSCode بناءً على `browserVersion` المعطى (أو `stable` إذا لم يتم تقديمه).

النوع: `string`

#### `extensionPath`

حدد الدليل إلى الامتداد الذي تريد اختباره.

النوع: `string`

#### `storagePath`

حدد موقعًا مخصصًا لـ VS Code لتخزين جميع بياناته. هذا هو الجذر للدلائل الداخلية لـ VS Code مثل (قائمة جزئية)
* **user-data-dir**: الدليل الذي يتم فيه تخزين جميع إعدادات المستخدم (الإعدادات العالمية)، وسجلات الامتداد وما إلى ذلك.
* **extension-install-dir**: الدليل الذي يتم فيه تثبيت امتدادات VS Code.

إذا لم يتم توفيره، يتم استخدام دليل مؤقت.

النوع: `string`

#### `userSettings`

تحديد إعدادات مستخدم مخصصة ليتم تطبيقها على VSCode.

النوع: `Record<string, number | string | object | boolean>`<br />
الافتراضي: `{}`

#### `workspacePath`

يفتح VSCode لمساحة عمل محددة. إذا لم يتم توفيره، يبدأ VSCode بدون فتح مساحة عمل.

النوع: `string`

#### `filePath`

يفتح VSCode مع فتح ملف محدد.

النوع: `string`

#### `vscodeArgs`

وسائط بدء تشغيل إضافية ككائن، على سبيل المثال:

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

سيتم تمريرها كـ:

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

النوع: `Record<string, string | boolean>`<br />
الافتراضي: انظر [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

إذا تم تعيينه على true، تسجل الخدمة مخرجات VSCode من مضيف الامتداد وواجهة برمجة تطبيقات وحدة التحكم.

النوع: `boolean`<br />
الافتراضي: `false`

#### `vscodeProxyOptions`

تحدد تكوينات وكيل واجهة برمجة تطبيقات VSCode كيفية اتصال WebdriverIO بـ VSCode workbench لمنحك الوصول إلى واجهة برمجة تطبيقات VSCode.

النوع: `VSCodeProxyOptions`<br />
الافتراضي:

```ts
{
    /**
     * If set to true, the service tries to establish a connection with the
     * VSCode workbench to enable access to the VSCode API
     */
    enable: true,
    /**
     * Port of the WebSocket connection used to connect to the workbench.
     * By default set to an available port in your operating system.
     */
    // port?: number
    /**
     * Timeout for connecting to WebSocket inside of VSCode
     */
    connectionTimeout: 5000,
    /**
     * Timeout for command to be executed within VSCode
     */
    commandTimeout: 5000
}
```

### Chromedriver

بدءًا من إصدار VSCode v1.86، من الضروري استخدام `webdriverio` الإصدار v8.14 أو أحدث لتثبيت Chromedriver دون الحاجة إلى أي تكوين. [إعداد أتمتة المتصفح المبسط](https://webdriver.io/blog/2023/07/31/driver-management) يتعامل مع كل شيء نيابة عنك.

لاختبار إصدارات أقدم من VS Code، ابحث عن إصدار Chromedriver المتوقع من السجلات، قم بتنزيل [Chromedriver](https://chromedriver.chromium.org/downloads)، وقم بتكوين المسار. على سبيل المثال:

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## إنشاء كائنات الصفحة الخاصة بك

يمكنك إعادة استخدام المكونات المستخدمة في هذه الخدمة لكائنات صفحة المراجعة الخاصة بك. لذلك، قم أولاً بإنشاء ملف يحدد جميع المحددات الخاصة بك، مثل:

```ts
// e.g. in /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // component container element
    submit: 'button[type="submit"]', // submit button
    username: 'input.username', // username input
    password: 'input.password' // password input
}
```

الآن يمكنك إنشاء كائن صفحة على النحو التالي:

```ts
// e.g. in /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private locator key to identify locator map (see locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

الآن في اختبارك، يمكنك استخدام كائن الصفحة على النحو التالي:

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// e.g. in /test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // you can also use page object elements directly via `[selector]$`
        // or `[selector]$$`, e.g.:
        await loginForm.submit$.click()

        // or access locators directly
        console.log(loginForm.locators.username)
        // outputs: "input.username"
    })
})
```

## دعم TypeScript

إذا كنت تستخدم WebdriverIO مع TypeScript، تأكد من إضافة `wdio-vscode-service` إلى `types` في ملف `tsconfig.json` الخاص بك، مثل:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // add this service to your types
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## دعم الوكيل

أثناء تهيئة هذه الخدمة، يتم تنزيل توزيعة ChromeDriver و VSCode. يمكنك توجيه هذه الطلبات عبر وكيل عن طريق تعيين متغير البيئة `HTTPS_PROXY` أو `https_proxy`. على سبيل المثال:

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## المراجع

تستخدم امتدادات VS Code التالية `wdio-vscode-service`:

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27 ألف تنزيل)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8 مليون تنزيل)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2 ألف تنزيل)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2 مليون تنزيل)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3 آلاف تنزيل)

## المساهمة

قبل نشر طلب سحب، يرجى تنفيذ ما يلي:

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (أو `npm run ci`)

## تعلم المزيد

إذا كنت ترغب في معرفة المزيد حول اختبار امتدادات VSCode، تحقق من محادثة [Christian Bromann](https://twitter.com/bromann) في [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU):

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

للحصول على مزيد من المعلومات حول WebdriverIO، تحقق من [الصفحة الرئيسية](https://webdriver.io) للمشروع.