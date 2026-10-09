---
id: emulation
title: المحاكاة
description: "حاكِ الموقع الجغرافي وميزات الوسائط ووكيل المستخدم والشبكة والإعدادات المحلية والمنطقة الزمنية والشاشة والأجهزة باستخدام الأمر emulate."
---

باستخدام WebdriverIO يمكنك محاكاة سلوك المتصفح باستخدام الأمر [`emulate`](/docs/api/browser/emulate). يقود هذا الأمر [وحدة المحاكاة في WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-emulation) لسياق التصفح ذي المستوى الأعلى الحالي. يُطبَّق التجاوز فورًا، ولا حاجة إلى إعادة تحميل الصفحة. يُستثنى من ذلك `clock`: إذ لا يحتوي BiDi على أمر للساعة، لذلك لا يزال هذا النطاق يثبّت مؤقتات وهمية.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

تتطلب هذه الميزة دعم WebDriver Bidi في المتصفح. في حين أن الإصدارات الحديثة من Chrome وEdge وFirefox تتضمن هذا الدعم، فإن Safari __لا يدعمه__. لمتابعة التحديثات راجع [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). علاوة على ذلك، إذا كنت تستخدم مزوّدًا سحابيًا لتشغيل المتصفحات، فتأكد من أن مزوّدك يدعم WebDriver Bidi أيضًا.

لتفعيل WebDriver Bidi في اختبارك، تأكد من تعيين `webSocketUrl: true` في الإمكانيات (capabilities) الخاصة بك.

المتصفح الذي لا يطبّق أمرًا ما يرفض الاستدعاء بخطأ خاص به، `unknown command` أو `unsupported operation`. تُعيد WebdriverIO ذلك الخطأ، ولا تلجأ إلى سكربت تحميل مسبق (preload script) أو إلى CDP كبديل.

:::

يُعيد `emulate` دالة تمسح ذلك النطاق. يمسح [`browser.restore()`](/docs/api/browser/restore) جميع النطاقات النشطة، أو النطاقات التي تحددها.

## الموقع الجغرافي

غيّر الموقع الجغرافي للمتصفح إلى منطقة محددة، على سبيل المثال:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.setPermissions({ name: 'geolocation' }, 'granted')
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

يستخدم هذا مكدّس الموقع الجغرافي الخاص بالمتصفح، بما في ذلك `getCurrentPosition` و`watchPosition`. قد تظل الصفحة بحاجة إلى منح إذن الموقع الجغرافي، كما في المثال. الحقول الاختيارية هي `accuracy` و`altitude` و`altitudeAccuracy` و`heading` و`speed`.

لجعل الصفحة تفشل في قراءة الموقع:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## نظام الألوان وميزات الوسائط الأخرى

غيّر ميزة الوسائط `prefers-color-scheme`:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // outputs: "#000000"
```

يُحدّث هذا `@media (prefers-color-scheme)` في CSS بالإضافة إلى [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). لا يلزم إعادة التحميل.

يعيّن `media` بقية خريطة ميزات الوسائط، على سبيل المثال تقليل الحركة:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

يتشارك `colorScheme` و`media` خريطة واحدة. يستبدل أمر BiDi الخريطة بأكملها، لذا يسري الاستدعاء الأخير. استعادة أيٍّ من النطاقين تمسح الخريطة.

`forcedColors` أمر مختلف. فهو يعيّن سمة الألوان المفروضة (`'light'` أو `'dark'`)، وليس ميزة الوسائط `forced-colors`. تبقى ميزة الوسائط تلك ضمن `media` بالصيغة `forcedColors: 'none' | 'active'`.

## وكيل المستخدم

غيّر وكيل المستخدم للمتصفح عبر:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

هذا هو تجاوز وكيل المستخدم الخاص بالمتصفح، وليس تعديلًا لخاصية `navigator.userAgent`. يعمل مطوّرو المتصفحات على إيقاف استخدام وكيل المستخدم تدريجيًا.

## حالة الاتصال

اجعل سياق التصفح غير متصل:

```ts
await browser.emulate('onLine', false)
```

ترسل القيمة `false` الأمر `emulation.setNetworkConditions` مع `{ type: 'offline' }`. تفشل Fetch وWebSocket وWebTransport، وتتبعها [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). القيمة `true`، وكذلك استعادة النطاق، تمسح هذا الشرط. يبقى التحكم في سرعة النقل وزمن الاستجابة ضمن [`throttleNetwork`](/docs/api/browser/throttleNetwork). لا تدعم ظروف الشبكة في BiDi سوى وضع عدم الاتصال.

## الإعدادات المحلية والمنطقة الزمنية واللمس

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` هو وسم BCP 47. `timezone` هو اسم IANA أو إزاحة مثل `+02:00`. `touch` هو `maxTouchPoints` ويجب أن يكون عددًا صحيحًا `>= 1`. استعادة `touch` تمسح التجاوز، ولا يمكنه تعيين القيمة `0`.

## الشاشة والاتجاه والتخطيط

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` هي مساحة الشاشة المكشوفة للويب، وليست منفذ العرض (viewport). قيمة `orientation.natural` هي `'portrait'` أو `'landscape'`. وقيمة `orientation.type` هي `'portrait-primary'` أو `'portrait-secondary'` أو `'landscape-primary'` أو `'landscape-secondary'`.

لا يقبل `viewportMeta` إلا القيمة `true`. قيمة المواصفة هي `true | null`، لذا لا توجد القيمة `false`. الاستعادة تمسحه. لا يقبل `textLayout` إلا `'mobile'`. لا يمكن سوى تعطيل `scripting`، إذ لا تستطيع المواصفة فرض تفعيل البرمجة النصية. قيمة `scrollbar` هي `'classic'` أو `'overlay'`.

## الساعة

يمكنك تعديل ساعة نظام المتصفح باستخدام الأمر [`emulate`](/docs/emulation). فهو يتجاوز الدوال العامة الأصلية المتعلقة بالوقت مما يسمح بالتحكم فيها بشكل متزامن عبر `clock.tick()` أو كائن الساعة المُعاد. ويشمل ذلك التحكم في:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

تبدأ الساعة عند حقبة يونكس (الطابع الزمني 0). هذا يعني أنه عند إنشاء كائن Date جديد في تطبيقك، سيكون وقته هو 1 يناير 1970 إذا لم تمرّر أي خيارات أخرى إلى الأمر `emulate`.

##### مثال

عند استدعاء `browser.emulate('clock', { ... })` سيستبدل فورًا الدوال العامة للصفحة الحالية وكذلك جميع الصفحات التالية، على سبيل المثال:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

يمكنك تعديل وقت النظام عن طريق استدعاء [`setSystemTime`](/docs/api/clock/setSystemTime) أو [`tick`](/docs/api/clock/tick).

يمكن أن يحتوي الكائن `FakeTimerInstallOpts` على الخصائص التالية:

 ```ts
interface FakeTimerInstallOpts {
    // يثبّت مؤقتات وهمية بحقبة يونكس المحددة
    // @default: 0
    now?: number | Date | undefined;

    // مصفوفة بأسماء الدوال وواجهات البرمجة العامة المراد تزييفها. افتراضيًا، لا تستبدل WebdriverIO
    // الدالتين `nextTick()` و`queueMicrotask()`. على سبيل المثال،
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` سيزيّف فقط
    // `setTimeout()` و`nextTick()`
    toFake?: FakeMethod[] | undefined;

    // الحد الأقصى لعدد المؤقتات التي سيتم تشغيلها عند استدعاء runAll() (الافتراضي: 1000)
    loopLimit?: number | undefined;

    // يطلب من WebdriverIO زيادة الوقت المحاكى تلقائيًا بناءً على تغيّر وقت النظام الحقيقي
    // (على سبيل المثال، سيُزاد الوقت المحاكى بمقدار 20 مللي ثانية لكل تغيّر بمقدار 20 مللي ثانية
    // في وقت النظام الحقيقي)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // ذو صلة فقط عند الاستخدام مع shouldAdvanceTime: true. يزيد الوقت المحاكى بمقدار
    // advanceTimeDelta مللي ثانية لكل تغيّر بمقدار advanceTimeDelta مللي ثانية في وقت النظام الحقيقي
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // يطلب من FakeTimers مسح المؤقتات "الأصلية" (أي غير الوهمية) عن طريق تفويضها إلى
    // معالجاتها الخاصة. لا تُمسح هذه افتراضيًا، مما قد يؤدي إلى سلوك غير متوقع
    // إذا كانت المؤقتات موجودة قبل تثبيت FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## الجهاز

يدعم الأمر `emulate` أيضًا محاكاة جهاز محمول أو مكتبي معيّن. لا ينبغي بأي حال من الأحوال استخدام هذا لاختبار الأجهزة المحمولة، إذ تختلف محركات متصفحات سطح المكتب عن محركات الأجهزة المحمولة. يجب استخدام هذا فقط إذا كان تطبيقك يقدّم سلوكًا محددًا لأحجام منافذ العرض الأصغر.

بالنسبة للجهاز، تقوم WebdriverIO بما يلي:

- تعيين وكيل المستخدم من الواصف
- تعيين منفذ العرض ومعامل مقياس الجهاز
- تعيين `maxTouchPoints` إلى `1` عندما يدعم الواصف اللمس، ومسح اللمس خلاف ذلك
- تعيين تخطيط النص للأجهزة المحمولة ووسم viewport meta عندما يكون الواصف لجهاز محمول، ومسحهما خلاف ذلك

لا تختلق WebdriverIO حجم شاشة أو اتجاهًا من اسم الجهاز. منفذ العرض ليس `screen.width`. استخدم النطاقين `screen` و`orientation` لذلك.

يُرسَل تغيير منفذ العرض إلى سياق المستوى الأعلى الذي كان حاليًا عند استدعاء `emulate`. استعادة الجهاز تعيد تحجيم ذلك السياق، حتى بعد التبديل إلى نافذة أخرى.

إذا رفض المتصفح أحد تلك الأوامر، تُعاد القيم السابقة لوكيل المستخدم ومنفذ العرض واللمس وتخطيط النص وviewport meta ويُعاد الخطأ. لا يُستبدل وكيل المستخدم المخصص أو حجم `setViewport` بقيمة افتراضية.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// اختبر تطبيقك ...

// إعادة تعيين وكيل المستخدم ومنفذ العرض واللمس وتخطيط النص وviewport meta
await restore()
```

تحتفظ WebdriverIO بقائمة ثابتة من [جميع الأجهزة المعرّفة](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).