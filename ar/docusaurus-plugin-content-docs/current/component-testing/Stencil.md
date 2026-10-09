---
id: stencil
title: Stencil
description: "إعداد مشغّل المتصفح في WebdriverIO لمكونات Stencil، وعرضها باستخدام الدالة المساعدة render وانتظار تحديثات العناصر."
---

[Stencil](https://stenciljs.com/) هي مكتبة لبناء مكتبات مكونات قابلة لإعادة الاستخدام وقابلة للتوسع. يمكنك اختبار مكونات Stencil مباشرةً في متصفح حقيقي باستخدام WebdriverIO و[مشغّل المتصفح](/docs/runner#browser-runner) الخاص به.

## الإعداد

لإعداد WebdriverIO داخل مشروع Stencil الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) الموجودة في وثائق اختبار المكونات لدينا. تأكد من اختيار `stencil` كإعداد مسبق (preset) ضمن خيارات المشغّل، على سبيل المثال:

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

في حال كنت تستخدم Stencil مع إطار عمل مثل React أو Vue، فيجب عليك الإبقاء على الإعداد المسبق الخاص بهذه الأطر.

:::

يمكنك بعد ذلك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run ./wdio.conf.ts
```

## كتابة الاختبارات

بافتراض أن لديك مكونات Stencil التالية:

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

في اختبارك، استخدم الدالة `render` من `@wdio/browser-runner/stencil` لإرفاق المكون بصفحة الاختبار. للتفاعل مع المكون، نوصي باستخدام أوامر WebdriverIO لأنها تتصرف بشكل أقرب إلى تفاعلات المستخدم الفعلية، على سبيل المثال:

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

#### خيارات العرض

توفر الدالة `render` الخيارات التالية:

##### `components`

مصفوفة من المكونات المراد اختبارها. يمكن استيراد أصناف المكونات إلى ملف الاختبار، ثم يجب إضافة مرجعها إلى المصفوفة `component` لاستخدامها طوال الاختبار.

__النوع:__ `CustomElementConstructor[]`<br />
__القيمة الافتراضية:__ `[]`

##### `flushQueue`

إذا كانت القيمة `false`، فلن يتم تفريغ قائمة انتظار العرض عند الإعداد الأولي للاختبار.

__النوع:__ `boolean`<br />
__القيمة الافتراضية:__ `true`

##### `template`

كود JSX الأولي المستخدم لإنشاء الاختبار. استخدم `template` عندما تريد تهيئة مكون باستخدام خصائصه بدلاً من سمات HTML الخاصة به. سيقوم بعرض القالب المحدد (JSX) داخل `document.body`.

__النوع:__ `JSX.Template`

##### `html`

كود HTML الأولي المستخدم لإنشاء الاختبار. يمكن أن يكون ذلك مفيدًا لبناء مجموعة من المكونات التي تعمل معًا، وتعيين سمات HTML.

__النوع:__ `string`

##### `language`

يعيّن السمة `lang` المحاكاة على العنصر `<html>`.

__النوع:__ `string`

##### `autoApplyChanges`

افتراضيًا، يجب استدعاء `env.waitForChanges()` عند إجراء أي تغييرات على خصائص المكون وسماته لاختبار التحديثات. كخيار بديل، يقوم `autoApplyChanges` بتفريغ قائمة الانتظار باستمرار في الخلفية.

__النوع:__ `boolean`<br />
__القيمة الافتراضية:__ `false`

##### `attachStyles`

افتراضيًا، لا يتم إرفاق الأنماط بـ DOM ولا تنعكس في HTML المُسلسَل. سيؤدي تعيين هذا الخيار إلى `true` إلى تضمين أنماط المكون في المخرجات القابلة للتسلسل.

__النوع:__ `boolean`<br />
__القيمة الافتراضية:__ `false`

#### بيئة العرض

تُرجع الدالة `render` كائن بيئة يوفر بعض الأدوات المساعدة لإدارة بيئة المكون.

##### `flushAll`

بعد إجراء تغييرات على مكون ما، مثل تحديث خاصية أو سمة، لا تطبّق صفحة الاختبار التغييرات تلقائيًا. لانتظار التحديث وتطبيقه، استدعِ `await flushAll()`

__النوع:__ `() => void`

##### `unmount`

يزيل عنصر الحاوية من DOM.

__النوع:__ `() => void`

##### `styles`

جميع الأنماط المعرّفة بواسطة المكونات.

__النوع:__ `Record<string, string>`

##### `container`

عنصر الحاوية الذي يتم عرض القالب بداخله.

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

دالة مساعدة لانتظار جاهزية المكون.

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

إذا قمت بتعريف خصائص أو حالات في مكون Stencil الخاص بك، فعليك إدارة توقيت تطبيق هذه التغييرات على المكون لإعادة عرضه.


## أمثلة

يمكنك العثور على مثال كامل لمجموعة اختبارات مكونات WebdriverIO لـ Stencil في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) الخاص بنا.