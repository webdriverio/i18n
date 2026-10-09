---
id: browsingContext
title: كائن BrowsingContext
description: احتفظ بعلامة تبويب أو نافذة أو إطار ككائن، ونفّذ الأوامر فيه مباشرةً دون تبديل الجلسة إليه.
---

سياق التصفح (browsing context) هو علامة تبويب أو نافذة أو إطار تحتفظ به ككائن. تُنفَّذ الأوامر التي تستدعيها عليه داخل علامة التبويب أو الإطار ذاك، بينما تبقى الجلسة وجميع السياقات الأخرى على حالها. منذ الإصدار v10، أصبح هذا هو أسلوب WebdriverIO في التعامل مع علامات التبويب والنوافذ والإطارات في جلسات WebDriver BiDi، وهو يحل فيها محل `switchWindow()` و`switchFrame()`.

```ts title="test/specs/tabs.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('browsing contexts', () => {
    it('works with two tabs and a frame at the same time', async () => {
        const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
        const docs = await browser.newWindow('https://webdriver.io/docs/api', { type: 'tab' })

        const top = await page.frame({ selector: 'frame[name="frame-top"]' })
        const middle = await top.frame({ selector: 'frame[name="frame-middle"]' })

        await expect(middle.$('#content')).toHaveText('MIDDLE')
        await expect(docs.$('h1')).toBeDisplayed()
        console.log(await page.getTitle(), await docs.getTitle())
    })
})
```

## الحصول على سياق تصفح

| الاستدعاء | القيمة المُرجَعة |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | أول سياق رئيسي (top-level) في الجلسة، بعد الانتقال به إلى العنوان. يقوم `browser.url()` دائمًا بالانتقال في هذا السياق تحديدًا. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | علامة تبويب جديدة (`type: 'tab'`) أو نافذة جديدة، بعد اكتمال تحميل صفحتها. لا تنتقل الجلسة إليها. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | جميع السياقات الرئيسية المفتوحة (علامات التبويب والنوافذ، دون الإطارات)، مثل علامة تبويب فتحتها الصفحة بنفسها. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | إطار تابع لسياق ما، بما في ذلك الإطارات من أصول مختلفة (cross-origin) والإطارات المتداخلة. |

احتفظ بالكائن واستدعِ الأوامر عليه. لا توجد علامة تبويب أو إطار "حالي" للتبديل بينها، لذا يمكن أيضًا استخدام السياقات بالتوازي:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## جلسات WebDriver BiDi وClassic

تتطلب سياقات التصفح جلسة WebDriver BiDi، وهي الافتراضية منذ الإصدار v10 في Chrome وEdge وFirefox. أما في جلسة WebDriver Classic، كما في Appium أو Safari، فلا يوجد سوى السياق الحالي للجلسة. وفي هذه الحالة:

- يُرجع `browser.url()` بديلًا يمثّل المتصفح. تُنفَّذ أوامر مثل `$` و`execute` و`getTitle` على المتصفح، وتصف `url` و`isFrame` و`parent` الصفحة الحالية، وتكون قيمة `contextId` هي `undefined`.
- تُرفض الأوامر `frame()` و`navigate()` و`activate()` مع ذكر أمر Classic الذي ينبغي استخدامه بدلًا منها: [`browser.switchFrame()`](/docs/api/browser/switchFrame) أو [`browser.url()`](/docs/api/browser/url) أو [`browser.switchWindow()`](/docs/api/browser/switchWindow).

تحقّق من `browser.isBidi` عندما يُنفَّذ الكود نفسه في كلا النوعين من الجلسات.

## الخصائص

| الاسم | النوع | التفاصيل |
| ---- | ---- | ------- |
| `contextId` | `String` | معرّف سياق التصفح في WebDriver BiDi. تكون قيمته `undefined` في جلسة Classic. |
| `url` | `String` | آخر عنوان URL انتقل إليه السياق عبر `browser.url()` أو `navigate()` أو `newWindow()`. أما عمليات الانتقال التي تجريها الصفحة بنفسها (الروابط، `location`، `history.pushState`) فلا تظهر إلا بعد استدعاء [`getUrl()`](/docs/api/browsingContext/getUrl). |
| `isFrame` | `Boolean` | `true` للإطار، و`false` لعلامة التبويب أو النافذة. |
| `parent` | `BrowsingContext \| undefined` | بالنسبة للإطار، هو السياق الذي استُدعي عليه `frame()` (أو الإطار الوسيط، في حالة إطار متداخل بشكل أعمق). تكون قيمته `undefined` لعلامة التبويب أو النافذة. |
| `browser` | `Browser` | [كائن المتصفح](/docs/api/browser) الخاص بالجلسة. |
| `request` | `Request \| undefined` | معلومات تحميل آخر عملية انتقال عبر `browser.url()` أو `navigate()`: عنوان URL والترويسات والاستجابة وعمليات إعادة التوجيه والطلبات التي أجرتها الصفحة. |
| `sessionId` | `String` | معرّف الجلسة، وهو نفس `browser.sessionId`. |
| `capabilities` | `Object` | قدرات الجلسة، وهي نفس `browser.capabilities`. |
| `options` | `Object` | خيارات WebdriverIO، وهي نفس `browser.options`. |
| `isBidi` | `Boolean` | ما إذا كانت الجلسة تستخدم WebDriver BiDi. |
| `isMobile` | `Boolean` | ما إذا كانت الجلسة تقوم بأتمتة جهاز محمول. |

## الدوال

### أوامر سياق التصفح

تعمل هذه الأوامر على السياق الذي تُستدعى عليه. لكل منها صفحة مرجعية خاصة بها.

| الأمر | التفاصيل |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | الحصول على إطار من هذا السياق كسياق تصفح مستقل. |
| [`navigate`](/docs/api/browsingContext/navigate) | الانتقال في هذا السياق، بنفس خيارات `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | إعادة تحميل هذا السياق. يعيد الإطار تحميل مستنده الخاص فقط. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | التنقل عبر سجل علامة التبويب أو النافذة هذه. |
| [`activate`](/docs/api/browsingContext/activate) | إحضار علامة التبويب أو النافذة هذه إلى الواجهة. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | إغلاق علامة التبويب أو النافذة هذه. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | قراءة عنوان أو URL المستند المعروض في هذا السياق. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | الرد على مطالبة المستخدم المفتوحة في هذا السياق أو قراءتها. |

### أوامر المتصفح التي تُنفَّذ في سياق

هذه هي [أوامر المتصفح](/docs/api/browser) التي تحمل الاسم نفسه، ولكنها تُطبَّق على هذا السياق بدلًا من السياق الأول للجلسة. وهي تقبل الوسائط نفسها.

| الأمر | في سياق التصفح |
| --- | --- |
| [`$`](/docs/api/browser/$)، [`$$`](/docs/api/browser/$$)، [`custom$`](/docs/api/browser/custom$)، [`custom$$`](/docs/api/browser/custom$$)، [`react$`](/docs/api/browser/react$)، [`react$$`](/docs/api/browser/react$$) | البحث عن العناصر في مستند هذا السياق. |
| [`execute`](/docs/api/browser/execute) | تنفيذ سكربت في مستند هذا السياق. |
| [`action`](/docs/api/browser/action)، [`actions`](/docs/api/browser/actions)، [`keys`](/docs/api/browser/keys)، [`scroll`](/docs/api/browser/scroll) | إرسال الإدخال إلى هذا السياق، حتى عندما يكون علامة تبويب في الخلفية. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot)، [`savePDF`](/docs/api/browser/savePDF) | التقاط هذا السياق. |
| [`getCookies`](/docs/api/browser/getCookies)، [`setCookies`](/docs/api/browser/setCookies)، [`deleteCookies`](/docs/api/browser/deleteCookies) | قراءة ملفات تعريف الارتباط (cookies) الخاصة بقسم التخزين لهذا السياق وتعديلها. |
| [`setViewport`](/docs/api/browser/setViewport) | تغيير حجم منفذ العرض (viewport) لعلامة التبويب أو النافذة هذه. |
| [`addInitScript`](/docs/api/browser/addInitScript) | تنفيذ سكربت قبل سكربتات الصفحة، في علامة التبويب أو النافذة هذه فقط. |
| [`mock`](/docs/api/browser/mock)، [`mockClearAll`](/docs/api/browser/mockClearAll)، [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | محاكاة طلبات علامة التبويب أو النافذة هذه فقط. تنتهي المحاكاة عند إغلاق علامة التبويب الخاصة بها. |
| [`emulate`](/docs/api/browser/emulate) | محاكاة خاصية من خصائص الجهاز، مثل الموقع الجغرافي أو الساعة، في علامة التبويب أو النافذة هذه فقط. |
| [`restore`](/docs/api/browser/restore) | استعادة المحاكاة، تمامًا مثل `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil)، [`pause`](/docs/api/browser/pause) | مماثلة لما هي عليه في المتصفح. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // طلبات `tab` تحصل على الاستجابة المُحاكاة، بينما تصل طلبات `page` إلى الخادم
})
```

### السياق الرئيسي فقط {#top-level-only}

يتشارك الإطار مع علامة التبويب التابع لها السجلَّ ومنفذَ العرض والشبكةَ والمحاكاة، لذلك تُرفض هذه الأوامر عند استدعائها على إطار مع الرسالة `` `<command>` is only available on a top-level browsing context ``. استدعِها على علامة التبويب: عبر `frame.parent` إلى أن تصبح قيمة `parent` هي `undefined`، أو على السياق الذي استدعيت عليه `frame()`.

`back`، `forward`، `activate`، `closeWindow`، `setViewport`، `addInitScript`، `mock`، `mockClearAll`، `mockRestoreAll`، `emulate`، `restore`

### غير متاحة في سياق التصفح

أوامر الجلسة، مثل `deleteSession` أو `newWindow` أو `browsingContexts`، متاحة فقط على [كائن المتصفح](/docs/api/browser). وكذلك الأوامر المخصصة: إذ يُرفض [`addCommand`](/docs/customcommands) و`overwriteCommand` عند استدعائهما على سياق، لذا سجّلها على `browser`.

### الأحداث

تسجّل `on` و`once` و`off` و`emit` و`removeListener` و`removeAllListeners` المستمعين على المتصفح، لذا فإن الأحداث هي أحداث الجلسة بأكملها. على سبيل المثال، يُطلَق حدث [`dialog`](/docs/api/dialog) عند ظهور مطالبة في أي علامة تبويب أو إطار.

## عناصر سياق التصفح

العنصر الذي تحصل عليه عبر سياق ما ينتمي إلى ذلك السياق. تُنفَّذ أوامر العناصر مثل `click` أو `setValue` أو `getText` في مستند ذلك السياق، حتى عندما يكون علامة تبويب في الخلفية أو إطارًا. وهي تتبع مواصفات WebDriver كما تفعل برامج التشغيل (drivers)، لذا تُرجع النتائج نفسها والأخطاء نفسها (مثل `element click intercepted`) كما لو كان العنصر في الصفحة المعروضة في الواجهة. يُرفض `getComputedRole` و`getComputedLabel` بالنسبة لعنصر ينتمي إلى سياق غير السياق الأول للجلسة.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // المخرجات: "BOTTOM"
```

## استكشاف الأخطاء وإصلاحها

| الخطأ | السبب والحل |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | استدعِ [`frame()`](/docs/api/browsingContext/frame) على السياق الذي يُرجعه `browser.url()` أو `browser.newWindow()`. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | احتفظ بالسياق الذي يُرجعه `browser.url()` أو `browser.newWindow()`، أو ابحث عن سياق باستخدام `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | الجلسة من نوع Classic (مثل Appium أو Safari). استخدم أمر Classic المذكور في الرسالة. |
| `` `<command>` is only available on a top-level browsing context `` | استُدعي الأمر على إطار. استدعِه على علامة التبويب التابع لها الإطار، راجع [السياق الرئيسي فقط](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | سجّل الأوامر المخصصة على `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | انتقلت الصفحة التي كانت تحتوي على الإطار إلى عنوان آخر. احصل على الإطار مجددًا باستخدام `frame()` على الصفحة الجديدة. |

## ذو صلة

- [كائن المتصفح](/docs/api/browser)
- [الترحيل إلى v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [مربعات الحوار](/docs/api/dialog)