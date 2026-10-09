---
id: lit
title: Lit
description: "قم بإعداد مشغل المتصفح الخاص بـ WebdriverIO لمكونات الويب المبنية باستخدام Lit، واكتب اختبارات تستعلم عن العناصر داخل جذور الظل (shadow roots) المتداخلة."
---

Lit هي مكتبة بسيطة لبناء مكونات ويب سريعة وخفيفة. يعد اختبار مكونات الويب المبنية باستخدام Lit مع WebdriverIO أمرًا سهلاً للغاية بفضل [محددات shadow DOM](/docs/selectors#deep-selectors) الخاصة بـ WebdriverIO، حيث يمكنك الاستعلام عن العناصر المتداخلة داخل جذور الظل (shadow roots) باستخدام أمر واحد فقط.

## الإعداد

لإعداد WebdriverIO داخل مشروع Lit الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) الموجودة في وثائق اختبار المكونات لدينا. بالنسبة لـ Lit، لا تحتاج إلى إعداد مسبق (preset) لأن مكونات الويب المبنية باستخدام Lit لا تحتاج إلى المرور عبر مترجم (compiler)، فهي مجرد تحسينات خالصة لمكونات الويب.

بمجرد الانتهاء من الإعداد، يمكنك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run ./wdio.conf.js
```

## كتابة الاختبارات

بافتراض أن لديك مكون Lit التالي:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // عرض واجهة المستخدم كدالة لحالة المكون
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

لاختبار المكون، يجب عليك عرضه في صفحة الاختبار قبل بدء الاختبار والتأكد من تنظيفه بعد ذلك:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// استيراد مكون Lit
import './components/Component.ts'

describe('Lit Component testing', () => {
    let elem: HTMLElement

    beforeEach(() => {
        elem = document.createElement('simple-greeting')
    })

    it('should render component', async () => {
        elem.setAttribute('name', 'WebdriverIO')
        document.body.appendChild(elem)

        await waitFor(() => {
            expect(elem.shadowRoot.textContent).toBe('Hello, WebdriverIO!')
        })
    })

    afterEach(() => {
        elem.remove()
    })
})
```

يمكنك العثور على مثال كامل لمجموعة اختبارات مكونات WebdriverIO لـ Lit في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite) الخاص بنا.