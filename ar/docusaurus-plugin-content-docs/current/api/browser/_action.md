---
id: action
title: إجراء
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

أمر الإجراء (action) هو واجهة منخفضة المستوى لتوفير إجراءات إدخال الأجهزة الافتراضية إلى متصفح الويب.

بالإضافة إلى الأوامر عالية المستوى مثل `scrollIntoView` و `doubleClick`، توفر واجهة برمجة Actions API تحكمًا تفصيليًا في ما يمكن أن تفعله أجهزة الإدخال المحددة. يوفر WebdriverIO واجهة لـ 3 أنواع من مصادر الإدخال:

- إدخال المفاتيح لأجهزة لوحة المفاتيح
- إدخال المؤشر للماوس أو القلم أو أجهزة اللمس
- وإدخالات العجلة لأجهزة عجلة التمرير

يجب إكمال كل سلسلة من أوامر الإجراء باستدعاء `perform` لتشغيل مجموعة الإجراءات. هذا يؤدي إلى [تحرير الإجراءات](https://w3c.github.io/webdriver/#release-actions) وإطلاق الأحداث. يمكنك تخطي هذا عن طريق تمرير `true` (على سبيل المثال `browser.actions(...).perform(true)`).

:::info

قد يختلف الدعم لهذا الأمر والإجراءات المحددة بناءً على البيئة. يمكن متابعة التقدم في التطوير على [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned).
بالنسبة للأجهزة المحمولة، قد ترغب في استخدام أوامر الإيماءات الخاصة بـ Appium على [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch)
و [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands).

:::

### مصدر إدخال المفاتيح

مصدر إدخال المفاتيح هو مصدر إدخال مرتبط بجهاز من نوع لوحة المفاتيح. يمكن تشغيله باستخدام معلمات النوع `key`. على سبيل المثال:

```ts
browser.action('key')
```

يقوم بإرجاع كائن `KeyAction` يدعم الإجراءات التالية:

- `down(value: string)`: ينشئ إجراء ضغط المفتاح
- `up(value: string)`: ينشئ إجراء رفع المفتاح
- `pause(ms: number)`: يشير إلى أن مصدر الإدخال لا يفعل شيئًا خلال وقت معين

#### الأحرف الخاصة

إذا كنت ترغب في استخدام أحرف خاصة مثل `Control` أو `Page Up` أو `Shift`، تأكد من استيراد كائن [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417) من حزمة `webdriverio` كما يلي:

```ts
import { Key } from 'webdriverio'
```

يتيح لك الكائن الوصول إلى تمثيل يونيكود للحرف الخاص المطلوب.

### مصدر إدخال المؤشر

مصدر إدخال المؤشر هو مصدر إدخال مرتبط بجهاز إدخال من نوع المؤشر. يمكن تحديد النوع عند استدعاء أمر `action`، على سبيل المثال:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" هي القيمة الافتراضية، ويمكن أيضًا: "pen" أو "touch"
})
```

يقوم بإرجاع كائن `PointerAction` يدعم الإجراءات التالية:

- `down (button: 'left' | 'middle' | 'right')`: ينشئ إجراءً للضغط على مفتاح واحد
- `down (params: PointerActionParams)`: ينشئ إجراءً للضغط على مفتاح واحد مع معلمات مفصلة
- `move (x: number, y: number)`: ينشئ إجراءً لتحريك المؤشر بمقدار `x` و `y` بكسل من منفذ العرض
- `move (params: PointerActionMoveParams)`: ينشئ إجراءً لتحريك المؤشر بمقدار `x` و `y` بكسل من `origin` المحدد. يمكن تحديد `origin` كموضع المؤشر الحالي (مثل "pointer")، أو منفذ العرض (مثل "viewport") أو مركز عنصر محدد.
- `up (button: 'left' | 'middle' | 'right')`: ينشئ إجراءً لرفع مفتاح واحد
- `up (params: PointerActionUpParams)`: ينشئ إجراءً لرفع مفتاح واحد مع معلمات مفصلة
- `cancel()`: إجراء يلغي الإدخال الحالي لهذا المؤشر.
- `pause(ms: number)`: يشير إلى أن مصدر الإدخال لا يفعل شيئًا خلال وقت معين

يمكنك العثور على معلومات مفصلة حول أنواع المعلمات [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35) و [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) و [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19) في تعريف نوع المشروع.

### مصدر إدخال العجلة

مصدر إدخال العجلة هو مصدر إدخال مرتبط بجهاز إدخال من نوع العجلة.

```ts
browser.action('wheel')
```

يقوم بإرجاع كائن `WheelAction` يدعم الإجراءات التالية:

- `scroll (params: ScrollParams)`: يقوم بتمرير الصفحة إلى إحداثيات أو أصل معين
- `pause(ms: number)`: يشير إلى أن مصدر الإدخال لا يفعل شيئًا خلال وقت معين

يمكنك العثور على معلومات مفصلة حول نوع المعلمة [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) في تعريف نوع المشروع.

##### الاستخدام

```js
browser.action()
```

##### أمثلة

```js title="pointer-action.js"
it('drag and drop using pointer action command', async () => {
    const origin = await $('#source')
    const targetOrigin = await $('#target')

    return browser.action('pointer')
        .move({ duration: 0, origin, x: 0, y: 0 })
        .down({ button: 0 }) // left button
        .pause(10)
        .move({ duration: 0, origin: targetOrigin })
        .up({ button: 0 })
        .perform()
});
```

```js title="key-action.js"
import { Key } from 'webdriverio'

it('should emit key events using key action commands', async () => {
    const elem = await $('input')
    await elem.click() // make element active

    await browser.action('key')
        .down('f')
        .down('o')
        .down('o')
        .up('f')
        .up('o')
        .up('o')
        .perform()

    console.log(await elem.getValue()) // returns "foo"

    // copy value out of input element
    await browser.action('key')
        .down(Key.Ctrl).down('c')
        .pause(10)
        .up(Key.Ctrl).up('c')
        .perform()
})
```

```js title="wheel-action.js"
it('should scroll using wheel action commands', async () => {
    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform()
    console.log(await browser.execute(() => window.scrollY)) // returns 500
})
```