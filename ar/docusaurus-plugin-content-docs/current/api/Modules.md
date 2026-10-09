---
id: modules
title: الوحدات
---

تنشر WebdriverIO وحدات مختلفة على NPM وسجلات أخرى يمكنك استخدامها لبناء إطار عمل الأتمتة الخاص بك. اطلع على المزيد من الوثائق حول أنواع إعداد WebdriverIO [هنا](/docs/setuptypes).

## `webdriver` و `devtools`

تكشف حزم البروتوكول ([`webdriver`](https://www.npmjs.com/package/webdriver) و [`devtools`](https://www.npmjs.com/package/devtools)) عن فئة (class) مرفق بها الدوال الثابتة التالية التي تتيح لك بدء الجلسات:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

يبدأ جلسة جديدة بقدرات محددة. بناءً على استجابة الجلسة، سيتم توفير أوامر من بروتوكولات مختلفة.

##### المعلمات

- `options`: [خيارات WebDriver](/docs/configuration#webdriver-options)
- `modifier`: دالة تسمح بتعديل نسخة العميل قبل إرجاعها
- `userPrototype`: كائن خصائص يسمح بتوسيع النموذج الأولي (prototype) للنسخة
- `customCommandWrapper`: دالة تسمح بتغليف وظائف حول استدعاءات الدوال

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

- `attachInstance`: النسخة المراد ربط جلسة بها أو على الأقل كائن يحتوي على خاصية `sessionId` (مثل `{ sessionId: 'xxx' }`)
- `modifier`: دالة تسمح بتعديل نسخة العميل قبل إرجاعها
- `userPrototype`: كائن خصائص يسمح بتوسيع النموذج الأولي (prototype) للنسخة
- `customCommandWrapper`: دالة تسمح بتغليف وظائف حول استدعاءات الدوال

##### القيمة المرجعة

- كائن [Browser](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

يعيد تحميل جلسة بناءً على النسخة المقدمة.

##### المعلمات

- `instance`: نسخة الحزمة المراد إعادة تحميلها

##### مثال

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

على غرار حزم البروتوكول (`webdriver` و `devtools`)، يمكنك أيضًا استخدام واجهات برمجة تطبيقات حزمة WebdriverIO لإدارة الجلسات. يمكن استيراد واجهات برمجة التطبيقات باستخدام `import { remote, attach, multiRemote } from 'webdriverio` وهي تحتوي على الوظائف التالية:

#### `remote(options, modifier)`

يبدأ جلسة WebdriverIO. تحتوي النسخة على جميع الأوامر الموجودة في حزمة البروتوكول ولكن مع دوال إضافية عالية المستوى، راجع [وثائق API](/docs/api).

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

- `attachOptions`: النسخة المراد ربط جلسة بها أو على الأقل كائن يحتوي على خاصية `sessionId` (مثل `{ sessionId: 'xxx' }`)

##### القيمة المرجعة

- كائن [Browser](/docs/api/browser)

##### مثال

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

يبدأ نسخة متعددة التحكم عن بعد (multi-remote) تتيح لك التحكم في جلسات متعددة داخل نسخة واحدة. اطلع على [أمثلة multi-remote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) الخاصة بنا لحالات استخدام ملموسة.

##### المعلمات

- `multiRemoteOptions`: كائن بمفاتيح تمثل اسم المتصفح و[خيارات WebdriverIO](/docs/configuration#webdriverio) الخاصة به.

##### القيمة المرجعة

- كائن [Browser](/docs/api/browser)

##### مثال

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
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

#### `Key`

كائن يحتوي على ثوابت الأحرف الخاصة لاستخدامها مع الأمر [`browser.keys`](/docs/api/browser/keys). تمثل هذه الثوابت مفاتيح خاصة يمكن إرسالها إلى المتصفح، مثل `Enter` و`Tab` و`Escape` ومفاتيح الأسهم ومفاتيح الوظائف والمزيد.

##### مثال

```js
import { Key } from 'webdriverio'

// اضغط على مفتاح Enter
await browser.keys(Key.Enter)

// استخدم Ctrl+A لتحديد الكل (يعمل عبر المنصات المختلفة)
await browser.keys([Key.Ctrl, 'a'])

// التنقل باستخدام مفاتيح الأسهم
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### المفاتيح المتاحة

المفاتيح الخاصة التالية متاحة عبر كائن `Key`:

**مفاتيح التعديل:**

| الثابت | الوصف |
|----------|-------------|
| `Key.Ctrl` | مفتاح التحكم عبر المنصات (Command على Mac، وControl على Windows/Linux) |
| `Key.Control` | مفتاح Control |
| `Key.Shift` | مفتاح Shift |
| `Key.Alt` | مفتاح Alt |
| `Key.Command` | مفتاح Command (Mac) |
| `Key.NULL` | مفتاح Null/التحرير — يحرر جميع مفاتيح التعديل المضغوطة حاليًا |

**مفاتيح التنقل:**

| الثابت | الوصف |
|----------|-------------|
| `Key.Cancel` | مفتاح Cancel |
| `Key.Help` | مفتاح Help |
| `Key.Backspace` | مفتاح Backspace |
| `Key.Tab` | مفتاح Tab |
| `Key.Clear` | مفتاح Clear |
| `Key.Return` | مفتاح Return |
| `Key.Enter` | مفتاح Enter |
| `Key.Pause` | مفتاح Pause |
| `Key.Escape` | مفتاح Escape |
| `Key.Space` | مفتاح المسافة |
| `Key.PageUp` | مفتاح Page Up |
| `Key.PageDown` | مفتاح Page Down |
| `Key.End` | مفتاح End |
| `Key.Home` | مفتاح Home |
| `Key.ArrowLeft` | مفتاح السهم الأيسر |
| `Key.ArrowUp` | مفتاح السهم العلوي |
| `Key.ArrowRight` | مفتاح السهم الأيمن |
| `Key.ArrowDown` | مفتاح السهم السفلي |
| `Key.Insert` | مفتاح Insert |
| `Key.Delete` | مفتاح Delete |

**مفاتيح الأحرف:**

| الثابت | الوصف |
|----------|-------------|
| `Key.Semicolon` | مفتاح الفاصلة المنقوطة |
| `Key.Equals` | مفتاح علامة التساوي |

**مفاتيح لوحة الأرقام:**

| الثابت | الوصف |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | أرقام 0-9 في لوحة الأرقام |
| `Key.Multiply` | مفتاح الضرب في لوحة الأرقام |
| `Key.Add` | مفتاح الجمع في لوحة الأرقام |
| `Key.Separator` | مفتاح الفاصل في لوحة الأرقام |
| `Key.Subtract` | مفتاح الطرح في لوحة الأرقام |
| `Key.Decimal` | مفتاح الفاصلة العشرية في لوحة الأرقام |
| `Key.Divide` | مفتاح القسمة في لوحة الأرقام |

**مفاتيح الوظائف:**

| الثابت | الوصف |
|----------|-------------|
| `Key.F1` - `Key.F12` | مفاتيح الوظائف من F1 إلى F12 |

**مفاتيح أخرى:**

| الثابت | الوصف |
|----------|-------------|
| `Key.ZenkakuHankaku` | مفتاح Zenkaku/Hankaku (اليابانية) |

:::info مفاتيح التعديل عبر المنصات

يوفر الثابت `Key.Ctrl` طريقة ملائمة لاستخدام مفتاح التعديل "control" عبر أنظمة التشغيل المختلفة. على macOS، يُربط بمفتاح `Command`، بينما على Windows وLinux يُربط بمفتاح `Control`. هذا مفيد عند كتابة اختبارات تحتاج إلى العمل عبر منصات متعددة، على سبيل المثال، لعمليات تحديد الكل (`Ctrl+A`) أو النسخ (`Ctrl+C`) أو اللصق (`Ctrl+V`).

:::

## `@wdio/cli`

بدلاً من استدعاء الأمر `wdio`، يمكنك أيضًا تضمين مشغل الاختبار كوحدة وتشغيله في بيئة عشوائية. لذلك، ستحتاج إلى استيراد حزمة `@wdio/cli` كوحدة، بهذا الشكل:

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

بعد ذلك، قم بإنشاء نسخة من المشغل (launcher)، وقم بتشغيل الاختبار.

#### `Launcher(configPath, opts)`

يتوقع مُنشئ فئة `Launcher` عنوان URL لملف التكوين، وكائن `opts` بإعدادات ستحل محل تلك الموجودة في ملف التكوين.

##### المعلمات

- `configPath`: المسار إلى ملف `wdio.conf.js` المراد تشغيله
- `opts`: الوسائط ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) لاستبدال القيم من ملف التكوين

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

يُرجع الأمر `run` كائن [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). يتم حله (resolved) إذا تم تشغيل الاختبارات بنجاح أو فشلت، ويتم رفضه (rejected) إذا لم يتمكن المشغل من بدء تشغيل الاختبارات.

## `@wdio/browser-runner`

عند تشغيل اختبارات الوحدة أو المكونات باستخدام [مشغل المتصفح](/docs/runner#browser-runner) الخاص بـ WebdriverIO، يمكنك استيراد أدوات المحاكاة (mocking) لاختباراتك، على سبيل المثال:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

الصادرات المسماة التالية متاحة:

#### `fn`

دالة محاكاة، اطلع على المزيد في [وثائق Vitest](https://vitest.dev/api/mock.html#mock-functions) الرسمية.

#### `spyOn`

دالة تجسس، اطلع على المزيد في [وثائق Vitest](https://vitest.dev/api/mock.html#mock-functions) الرسمية.

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

إلغاء محاكاة التبعية المعرفة داخل دليل المحاكاة اليدوية (`__mocks__`).

##### المعلمات

- `moduleName`: اسم الوحدة المراد إلغاء محاكاتها.

##### مثال

```js
unmock('lodash')
```