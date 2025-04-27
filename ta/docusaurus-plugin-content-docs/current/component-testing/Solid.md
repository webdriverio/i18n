---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) என்பது எளிமையான மற்றும் செயல்திறன் மிக்க வினைத்திறனுடன் பயனர் இடைமுகங்களை உருவாக்குவதற்கான ஒரு கட்டமைப்பாகும். WebdriverIO மற்றும் அதன் [பிரவுசர் ரன்னர்](/docs/runner#browser-runner) பயன்படுத்தி உண்மையான உலாவியில் நேரடியாக SolidJS கூறுகளை சோதிக்கலாம்.

## அமைப்பு

உங்கள் SolidJS திட்டத்தில் WebdriverIO-ஐ அமைக்க, எங்கள் கூறு சோதனை ஆவணங்களில் உள்ள [வழிமுறைகளைப்](/docs/component-testing#set-up) பின்பற்றவும். உங்கள் ரன்னர் விருப்பங்களில் `solid` என்பதை முன்னமைப்பாகத் தேர்ந்தெடுக்க உறுதிசெய்யவும், எ.கா.:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

நீங்கள் ஏற்கனவே [Vite](https://vitejs.dev/)-ஐ உருவாக்க சேவையகமாகப் பயன்படுத்திக் கொண்டிருந்தால், உங்கள் WebdriverIO கட்டமைப்பில் `vite.config.ts` இல் உள்ள உங்கள் கட்டமைப்பை மீண்டும் பயன்படுத்தலாம். மேலும் தகவலுக்கு, [ரன்னர் விருப்பங்களில்](/docs/runner#runner-options) உள்ள `viteConfig`-ஐப் பார்க்கவும்.

:::

SolidJS முன்னமைப்புக்கு `vite-plugin-solid` நிறுவப்பட்டிருக்க வேண்டும்:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

பின்னர் பின்வருமாறு சோதனைகளைத் தொடங்கலாம்:

```sh
npx wdio run ./wdio.conf.js
```

## சோதனைகளை எழுதுதல்

நீங்கள் பின்வரும் SolidJS கூறைக் கொண்டிருந்தால்:

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

உங்கள் சோதனையில் `solid-js/web`-இலிருந்து `render` முறையைப் பயன்படுத்தி கூறை சோதனைப் பக்கத்துடன் இணைக்கவும். கூறுடன் தொடர்புகொள்ள, WebdriverIO கட்டளைகளைப் பயன்படுத்த பரிந்துரைக்கிறோம், ஏனெனில் அவை உண்மையான பயனர் தொடர்புகளுக்கு மிக நெருக்கமாக செயல்படுகின்றன, எ.கா.:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * ensure we render the component for every test in a
     * new root container
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

எங்கள் [உதாரண களஞ்சியத்தில்](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite) SolidJS-க்கான WebdriverIO கூறு சோதனை தொகுப்பின் முழு உதாரணத்தையும் நீங்கள் காணலாம்.