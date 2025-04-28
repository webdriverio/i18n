---
id: lit
title: إضاءة (Lit)
---

إضاءة (Lit) هي مكتبة بسيطة لبناء مكونات ويب سريعة وخفيفة الوزن. اختبار مكونات الويب من Lit مع WebdriverIO سهل جدًا بفضل [محددات Shadow DOM](/docs/selectors#deep-selectors) في WebdriverIO، يمكنك الاستعلام عن العناصر المتداخلة في جذور الظل باستخدام أمر واحد فقط.

## الإعداد

لإعداد WebdriverIO ضمن مشروع Lit الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) في مستندات اختبار المكونات الخاصة بنا. بالنسبة لـ Lit، لا تحتاج إلى إعداد مسبق لأن مكونات ويب Lit لا تحتاج إلى المرور عبر مُترجم، فهي تحسينات لمكونات الويب النقية.

بمجرد الإعداد، يمكنك بدء الاختبارات عن طريق تشغيل:

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

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

لاختبار المكون، يجب عليك عرضه في صفحة الاختبار قبل بدء الاختبار والتأكد من تنظيفه بعد ذلك:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// import Lit component
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
```