---
id: stencil
title: ستينسل
---

[Stencil](https://stenciljs.com/) هي مكتبة لبناء مكتبات مكونات قابلة لإعادة الاستخدام وقابلة للتوسع. يمكنك اختبار مكونات Stencil مباشرة في متصفح حقيقي باستخدام WebdriverIO و[مشغل المتصفح](/docs/runner#browser-runner) الخاص به.

## الإعداد

لإعداد WebdriverIO داخل مشروع Stencil الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) في وثائق اختبار المكونات لدينا. تأكد من اختيار `stencil` كإعداد مسبق ضمن خيارات المشغل الخاص بك، على سبيل المثال:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

في حالة استخدام Stencil مع إطار عمل مثل React أو Vue، يجب عليك الاحتفاظ بالإعداد المسبق لهذه الأطر.

:::

يمكنك بعد ذلك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run ./wdio.conf.ts
```

## كتابة الاختبارات

بالنظر إلى أن لديك مكونات Stencil التالية:

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

في اختبارك استخدم طريقة `render` من `@wdio/browser-runner/stencil` لإرفاق المكون بصفحة الاختبار. للتفاعل مع المكون، نوصي باستخدام أوامر WebdriverIO لأنها تتصرف بطريقة أقرب إلى تفاعلات المستخدم الفعلية، على سبيل المثال:

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### خيارات Render

توفر طريقة `render` الخيارات التالية:

##### `components`

مصفوفة من المكونات للاختبار. يمكن استيراد فئات المكونات إلى ملف الاختبار، ثم يجب إضافة مرجعها إلى مصفوفة `component` لاستخدامها طوال الاختبار.

__النوع:__ `CustomElementConstructor[]`<br />
__القيمة الافتراضية:__ `[]`

##### `flushQueue`

إذا كانت `false`، لا تقم بتنظيف قائمة انتظار العرض عند الإعداد الأولي للاختبار.

__النوع:__ `boolean`<br />
__القيمة الافتراضية:__ `true`

##### `template`

JSX الأولي المستخدم لإنشاء الاختبار. استخدم `template` عندما تريد تهيئة مكون باستخدام خصائصه، بدلاً من سمات HTML الخاصة به. سيقوم بعرض القالب المحدد (JSX) في `document.body`.

__النوع:__ `JSX.Template`

##### `html`

HTML الأولي المستخدم لإنشاء الاختبار. يمكن أن يكون هذا مفيدًا لبناء مجموعة من المكونات التي تعمل معًا وتعيين سمات HTML.

__النوع:__ `string`

##### `language`

يعين سمة `lang` المحاكاة على `<html>`.

__النوع:__ `string`

##### `autoApplyChanges`

بشكل افتراضي، يجب أن تنتظر أي تغييرات على خصائص المكونات وسماتها `env.waitForChanges()` لاختبار التحديثات. كخيار، يقوم `autoApplyChanges` بتنظيف قائمة الانتظار باستمرار في الخلفية.

__النوع:__ `boolean`<br />
__القيمة الافتراضية:__ `false`

##### `attachStyles`

بشكل افتراضي، لا يتم إرفاق الأنماط بـ DOM ولا تنعكس في HTML المسلسل. سيؤدي تعيين هذا الخيار إلى `true` إلى تضمين أنماط المكون في الإخراج القابل للتسلسل.

__النوع:__ `boolean`<br />
__القيمة الافتراضية:__ `false`

#### بيئة Render

تعيد طريقة `render` كائن بيئة يوفر مساعدات معينة لإدارة بيئة المكون.

##### `flushAll`

بعد إجراء تغييرات على مكون، مثل تحديث خاصية أو سمة، لا تطبق صفحة الاختبار التغييرات تلقائيًا. للانتظار وتطبيق التحديث، قم باستدعاء `await flushAll()`

__النوع:__ `() => void`

##### `unmount`

يزيل عنصر الحاوية من DOM.

__النوع:__ `() => void`

##### `styles`

جميع الأنماط المحددة بواسطة المكونات.

__النوع:__ `Record<string, string>`

##### `container`

عنصر الحاوية الذي يتم فيه عرض القالب.

__النوع:__ `HTMLElement`

##### `$container`

عنصر الحاوية كعنصر WebdriverIO.

__النوع:__ `WebdriverIO.Element`

##### `root`

المكون الجذر للقالب.

__النوع:__ `HTMLElement`

##### `$root`

المكون الجذر كعنصر WebdriverIO.

__النوع:__ `WebdriverIO.Element`

### `waitForChanges`

طريقة مساعدة للانتظار حتى يكون المكون جاهزًا.

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## تحديثات العناصر

إذا قمت بتحديد خصائص أو حالات في مكون Stencil الخاص بك، فيجب عليك إدارة وقت تطبيق هذه التغييرات على المكون ليتم إعادة عرضه.

## أمثلة

يمكنك العثور على مثال كامل لمجموعة اختبار المكونات WebdriverIO لـ Stencil في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) الخاص بنا.