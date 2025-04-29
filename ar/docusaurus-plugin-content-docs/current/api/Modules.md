---
id: modules
title: الوحدات
---

يقوم WebdriverIO بنشر وحدات مختلفة على NPM وسجلات أخرى يمكنك استخدامها لبناء إطار الأتمتة الخاص بك. شاهد المزيد من الوثائق حول أنواع إعداد WebdriverIO [هنا](/docs/setuptypes).

## `webdriver` و `devtools`

حزم البروتوكول ([`webdriver`](https://www.npmjs.com/package/webdriver) و [`devtools`](https://www.npmjs.com/package/devtools)) تكشف عن فئة بها الوظائف الثابتة التالية المرفقة التي تسمح لك ببدء الجلسات:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

يبدأ جلسة جديدة بقدرات محددة. بناءً على استجابة الجلسة، سيتم توفير أوامر من بروتوكولات مختلفة.

##### المعلمات

- `options`: [خيارات WebDriver](/docs/configuration#webdriver-options)
- `modifier`: دالة تسمح بتعديل نسخة العميل قبل إرجاعها
- `userPrototype`: كائن الخصائص الذي يسمح بتوسيع نموذج النسخة
- `customCommandWrapper`: دالة تسمح بوضع وظائف حول استدعاءات الدالة

##### القيمة المرجعة

- كائن [Browser](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

يرتبط بجلسة WebDriver أو DevTools قيد التشغيل.

##### المعلمات

- `attachInstance`: النسخة المراد الارتباط بها أو على الأقل كائن بخاصية `sessionId` (مثل `{ sessionId: 'xxx' }`)
- `modifier`: دالة تسمح بتعديل نسخة العميل قبل إرجاعها
- `userPrototype`: كائن الخصائص الذي يسمح بتوسيع نموذج النسخة
- `customCommandWrapper`: دالة تسمح بوضع وظائف حول استدعاءات الدالة

##### القيمة المرجعة

- كائن [Browser](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

يعيد تحميل جلسة معطاة لنسخة موفرة.

##### المعلمات

- `instance`: نسخة الحزمة لإعادة تحميلها

##### مثال

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

بشكل مشابه لحزم البروتوكول (`webdriver` و `devtools`)، يمكنك أيضًا استخدام واجهات برمجة تطبيقات حزمة WebdriverIO لإدارة الجلسات. يمكن استيراد واجهات برمجة التطبيقات باستخدام `import { remote, attach, multiremote } from 'webdriverio` وتحتوي على الوظائف التالية:

#### `remote(options, modifier)`

يبدأ جلسة WebdriverIO. تحتوي النسخة على جميع الأوامر مثل حزمة البروتوكول ولكن مع وظائف إضافية من مرتبة أعلى، انظر [وثائق API](/docs/api).

##### المعلمات

- `options`: [خيارات WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: دالة تسمح بتعديل نسخة العميل قبل إرجاعها

##### القيمة المرجعة

- كائن [Browser](/docs/api/browser)

##### مثال

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

يرتبط بجلسة WebdriverIO قيد التشغيل.

##### المعلمات

- `attachOptions`: النسخة المراد الارتباط بها أو على الأقل كائن بخاصية `sessionId` (مثل `{ sessionId: 'xxx' }`)

##### القيمة المرجعة

- كائن [Browser](/docs/api/browser)

##### مثال

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

يبدأ نسخة multiremote والتي تسمح لك بالتحكم في جلسات متعددة ضمن نسخة واحدة. راجع [أمثلة multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) لحالات استخدام ملموسة.

##### المعلمات

- `multiremoteOptions`: كائن بمفاتيح تمثل اسم المتصفح و[خيارات WebdriverIO](/docs/configuration#webdriverio) الخاصة بهم.

##### القيمة المرجعة

- كائن [Browser](/docs/api/browser)

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

بدلاً من استدعاء الأمر `wdio`، يمكنك أيضًا تضمين مشغل الاختبار كوحدة وتشغيله في أي بيئة. لذلك، ستحتاج إلى استيراد حزمة `@wdio/cli` كوحدة، مثل هذا:

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

يتوقع منشئ فئة `Launcher` عنوان URL لملف التكوين وكائن `opts` مع إعدادات ستتجاوز تلك الموجودة في التكوين.

##### المعلمات

- `configPath`: المسار إلى `wdio.conf.js` المراد تشغيله
- `opts`: الوسائط ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) لتجاوز القيم من ملف التكوين

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

يعيد الأمر `run` [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). يتم حله إذا تم تشغيل الاختبارات بنجاح أو فشلت، ويتم رفضه إذا لم يتمكن المشغل من بدء تشغيل الاختبارات.

## `@wdio/browser-runner`

عند تشغيل اختبارات الوحدة أو المكونات باستخدام [مشغل المتصفح](/docs/runner#browser-runner) الخاص بـ WebdriverIO، يمكنك استيراد أدوات المحاكاة للاختبارات الخاصة بك، على سبيل المثال:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

الصادرات المسماة التالية متاحة:

#### `fn`

دالة المحاكاة، انظر المزيد في [وثائق Vitest](https://vitest.dev/api/mock.html#mock-functions) الرسمية.

#### `spyOn`

دالة التجسس، انظر المزيد في [وثائق Vitest](https://vitest.dev/api/mock.html#mock-functions) الرسمية.

#### `mock`

طريقة لمحاكاة ملف أو وحدة تبعية.

##### المعلمات

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

إلغاء محاكاة التبعية المعرفة داخل دليل المحاكاة اليدوي (`__mocks__`).

##### المعلمات

- `moduleName`: اسم الوحدة المراد إلغاء محاكاتها.

##### مثال

```js
unmock('lodash')
```