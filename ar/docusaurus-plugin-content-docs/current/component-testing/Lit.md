---
id: lit
title: لت
---

Lit هي مكتبة بسيطة لبناء مكونات ويب سريعة وخفيفة الوزن. يُعد اختبار مكونات ويب Lit باستخدام WebdriverIO سهلاً للغاية بفضل [محددات Shadow DOM](/docs/selectors#deep-selectors) الخاصة بـ WebdriverIO التي تمكنك من الاستعلام عن العناصر المتداخلة في جذور الظل بأمر واحد فقط.

## الإعداد

لإعداد WebdriverIO ضمن مشروع Lit الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) الموجودة في وثائق اختبار المكونات لدينا. بالنسبة لـ Lit، لا تحتاج إلى إعداد مسبق حيث لا تحتاج مكونات ويب Lit إلى المرور عبر مترجم، فهي عبارة عن تحسينات لمكونات الويب النقية.

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

لاختبار المكون، عليك عرضه في صفحة الاختبار قبل بدء الاختبار والتأكد من تنظيفه بعد ذلك:

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