---
id: lit
title: Lit
description: "Lit वेब कंपोनेंट्स के लिए WebdriverIO ब्राउज़र रनर सेट अप करें और ऐसे टेस्ट लिखें जो नेस्टेड शैडो रूट्स के अंदर एलिमेंट्स को क्वेरी करते हैं।"
---

Lit तेज़ और हल्के वेब कंपोनेंट्स बनाने के लिए एक सरल लाइब्रेरी है। WebdriverIO के साथ Lit वेब कंपोनेंट्स का परीक्षण करना बहुत आसान है, क्योंकि WebdriverIO के [शैडो DOM सेलेक्टर्स](/docs/selectors#deep-selectors) की मदद से आप केवल एक ही कमांड से शैडो रूट्स में नेस्टेड एलिमेंट्स को क्वेरी कर सकते हैं।

## सेटअप

अपने Lit प्रोजेक्ट में WebdriverIO सेट अप करने के लिए, हमारे कंपोनेंट टेस्टिंग डॉक्स में दिए गए [निर्देशों](/docs/component-testing#set-up) का पालन करें। Lit के लिए आपको किसी प्रीसेट की आवश्यकता नहीं है, क्योंकि Lit वेब कंपोनेंट्स को किसी कंपाइलर से गुज़रने की ज़रूरत नहीं होती, वे शुद्ध वेब कंपोनेंट एन्हांसमेंट्स हैं।

सेटअप हो जाने के बाद, आप निम्नलिखित कमांड चलाकर टेस्ट शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

## टेस्ट लिखना

मान लीजिए आपके पास निम्नलिखित Lit कंपोनेंट है:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // कंपोनेंट स्टेट के फ़ंक्शन के रूप में UI रेंडर करें
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

कंपोनेंट का परीक्षण करने के लिए, आपको टेस्ट शुरू होने से पहले इसे टेस्ट पेज में रेंडर करना होगा और यह सुनिश्चित करना होगा कि बाद में इसे साफ़ कर दिया जाए:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// Lit कंपोनेंट इम्पोर्ट करें
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

Lit के लिए WebdriverIO कंपोनेंट टेस्ट सूट का पूरा उदाहरण आप हमारी [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite) में पा सकते हैं।