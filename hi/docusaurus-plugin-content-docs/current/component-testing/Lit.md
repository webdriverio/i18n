---
id: lit
title: लिट
---

लिट एक सरल लाइब्रेरी है जो तेज़, हल्के वेब कंपोनेंट्स बनाने के लिए है। WebdriverIO के [शैडो DOM सेलेक्टर्स](/docs/selectors#deep-selectors) के कारण WebdriverIO के साथ लिट वेब कंपोनेंट्स का परीक्षण करना बहुत आसान है, आप एक ही कमांड से शैडो रूट्स के अंदर के तत्वों को क्वेरी कर सकते हैं।

## सेटअप

अपने लिट प्रोजेक्ट में WebdriverIO को सेटअप करने के लिए, हमारे कंपोनेंट टेस्टिंग दस्तावेज़ों में [निर्देशों](/docs/component-testing#set-up) का पालन करें। लिट के लिए आपको प्रीसेट की आवश्यकता नहीं है क्योंकि लिट वेब कंपोनेंट्स को कंपाइलर के माध्यम से चलाने की आवश्यकता नहीं है, वे शुद्ध वेब कंपोनेंट एन्हांसमेंट हैं।

सेटअप होने के बाद, आप इसे चलाकर परीक्षण शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

## परीक्षण लिखना

मान लीजिए आपके पास निम्नलिखित लिट कंपोनेंट है:

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

कंपोनेंट का परीक्षण करने के लिए आपको परीक्षण शुरू होने से पहले इसे टेस्ट पेज में रेंडर करना होगा और सुनिश्चित करना होगा कि इसे बाद में साफ कर दिया जाए:

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

आप हमारे [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite) में लिट के लिए WebdriverIO कंपोनेंट टेस्ट सूट का एक पूर्ण उदाहरण पा सकते हैं।