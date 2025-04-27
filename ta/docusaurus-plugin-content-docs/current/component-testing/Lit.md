---
id: lit
title: லிட்
---

லிட் என்பது வேகமான, லேசான வலை கூறுகளை உருவாக்க உதவும் ஒரு எளிய நூலகமாகும். WebdriverIO இன் [நிழல் DOM தேர்வுக்குறிகள்](/docs/selectors#deep-selectors) மூலம் லிட் வலை கூறுகளை சோதிப்பது மிகவும் எளிது, ஒரே ஒரு கட்டளையுடன் நிழல் roots இல் உள்ள நெஸ்டட் உறுப்புகளை நீங்கள் வினவலாம்.

## அமைப்பு

உங்கள் லிட் திட்டத்தில் WebdriverIO ஐ அமைக்க, எங்கள் கூறு சோதனை ஆவணங்களில் [வழிமுறைகளை](/docs/component-testing#set-up) பின்பற்றவும். லிட் வலை கூறுகள் தொகுப்பான் வழியாக இயங்க வேண்டிய அவசியம் இல்லை, அவை தூய வலை கூறு மேம்பாடுகள் என்பதால் லிட்டிற்கு ஒரு முன்அமைவு தேவையில்லை.

அமைப்பு முடிந்ததும், பின்வரும் கட்டளையை இயக்குவதன் மூலம் சோதனைகளைத் தொடங்கலாம்:

```sh
npx wdio run ./wdio.conf.js
```

## சோதனைகளை எழுதுதல்

நீங்கள் பின்வரும் லிட் கூறைக் கொண்டிருந்தால்:

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

கூறை சோதிக்க, சோதனை தொடங்குவதற்கு முன் அதை சோதனைப் பக்கத்தில் ரெண்டர் செய்து, பின்னர் அது சுத்தம் செய்யப்படுவதை உறுதிசெய்ய வேண்டும்:

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

WebdriverIO கூறு சோதனை தொகுப்பின் முழு எடுத்துக்காட்டை எங்கள் [எடுத்துக்காட்டு களஞ்சியத்தில்](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite) காணலாம்.