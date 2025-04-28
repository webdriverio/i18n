---
id: modules
title: الوحدات
---

ينشر WebdriverIO العديد من الوحدات على NPM وسجلات أخرى يمكنك استخدامها لبناء إطار عمل الأتمتة الخاص بك. شاهد المزيد من الوثائق حول أنواع إعداد WebdriverIO [هنا](/docs/setuptypes).

## `webdriver` و `devtools`

حزم البروتوكول ([`webdriver`](https://www.npmjs.com/package/webdriver) و [`devtools`](https://www.npmjs.com/package/devtools)) تعرض فئة مع الدوال الثابتة التالية المرفقة التي تسمح لك ببدء الجلسات:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

يبدأ جلسة جديدة بقدرات محددة. بناءً على استجابة الجلسة، سيتم توفير أوامر من بروتوكولات مختلفة.

##### البارامترات

- `options`: [خيارات WebDriver](/docs/configuration#webdriver-options)
- `modifier`: دالة تسمح بتعديل نسخة العميل قبل إرجاعها
- `userPrototype`: كائن خصائص يسمح بتوسيع نموذج النسخة
- `customCommandWrapper`: دالة تسمح بتغليف الوظائف حول مكالمات الدوال

##### القيمة المرجعة

- كائن [المتصفح](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

يرتبط بجلسة WebDriver أو DevTools قيد التشغيل.

##### البارامترات

- `attachInstance`: نسخة للارتباط بجلسة أو على الأقل كائن به خاصية `sessionId` (مثل `{ sessionId: 'xxx' }`)
- `modifier`: دالة تسمح بتعديل نسخة العميل قبل إرجاعها
- `userPrototype`: كائن خصائص يسمح بتوسيع نموذج النسخة
- `customCommandWrapper`: دالة تسمح بتغليف الوظائف حول مكالمات الدوال

##### القيمة المرجعة

- كائن [المتصفح](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

يعيد تحميل جلسة بناءً على النسخة المقدمة.

##### البارامترات

- `instance`: نسخة الحزمة لإعادة التحميل

##### مثال

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

مثل حزم البروتوكول (`webdriver` و `devtools`)، يمكنك أيضًا استخدام واجهة برمجة تطبيقات حزمة WebdriverIO لإدارة الجلسات. يمكن استيراد واجهات برمجة التطبيقات باستخدام `import { remote, attach, multiremote } from 'webdriverio` وتحتوي على الوظائف التالية:

#### `remote(options, modifier)`

يبدأ جلسة WebdriverIO. تحتوي النسخة على جميع الأوامر كحزمة البروتوكول ولكن مع وظائف إضافية من رتبة أعلى، انظر [وثائق API](/docs/api).

##### البارامترات

- `options`: [خيارات WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: دالة تسمح بتعديل نسخة العميل قبل إرجاعها

##### القيمة المرجعة

- كائن [المتصفح](/docs/api/browser)

##### مثال

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

يرتبط بجلسة WebdriverIO قيد التشغيل.

##### البارامترات

- `attachOptions`: نسخة للارتباط بجلسة أو على الأقل كائن به خاصية `sessionId` (مثل `{ sessionId: 'xxx' }`)

##### القيمة المرجعة

- كائن [المتصفح](/docs/api/browser)

##### مثال

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

يبدأ نسخة multiremote والتي تسمح لك بالتحكم في جلسات متعددة داخل نسخة واحدة. راجع [أمثلة multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) للحالات العملية.

##### البارامترات

- `multiremoteOptions`: كائن بمفاتيح تمثل اسم المتصفح و [خيارات WebdriverIO](/docs/configuration#webdriverio) الخاصة بهم.

##### القيمة المرجعة

- كائن [المتصفح](/docs/api/browser)

##### مثال

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

بدلاً من استدعاء أمر `wdio`، يمكنك أيضًا تضمين مشغل الاختبار كوحدة وتشغيله في بيئة اعتباطية. لذلك، ستحتاج إلى استيراد حزمة `@wdio/cli` كوحدة، مثل هذا:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

بعد ذلك، قم بإنشاء نسخة من المشغل، وتشغيل الاختبار.

#### `Launcher(configPath, opts)`

يتوقع منشئ فئة `Launcher` عنوان URL لملف التكوين، وكائن `opts` مع إعدادات ستستبدل تلك الموجودة في التكوين.

##### البارامترات

- `configPath`: المسار إلى ملف `wdio.conf.js` للتشغيل
- `opts`: المعاملات ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) لاستبدال القيم من ملف التكوين

##### مثال

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

يعيد الأمر `run` [وعداً (Promise)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). يتم حله إذا تم تشغيل الاختبارات بنجاح أو فشلت، ويتم رفضه إذا لم يتمكن المشغل من بدء تشغيل الاختبارات.

## `@wdio/browser-runner`

عند تشغيل اختبارات الوحدة أو المكون باستخدام [مشغل المتصفح](/docs/runner#browser-runner) الخاص بـ WebdriverIO، يمكنك استيراد أدوات المحاكاة لاختباراتك، على سبيل المثال:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

الصادرات المسماة التالية متاحة:

#### `fn`

دالة وهمية، انظر المزيد في [وثائق Vitest الرسمية](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

دالة تجسس، انظر المزيد في [وثائق Vitest الرسمية](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

طريقة لمحاكاة ملف أو وحدة التبعية.

##### البارامترات

- `moduleName`: إما مسار نسبي للملف المراد محاكاته أو اسم وحدة.
- `factory`: دالة لإرجاع القيمة المحاكاة (اختياري)

##### مثال

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

إلغاء محاكاة التبعية المحددة في دليل المحاكاة اليدوية (`__mocks__`).

##### البارامترات

- `moduleName`: اسم الوحدة المراد إلغاء محاكاتها.

##### مثال

```js
unmock('lodash')
```