---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) एक फ्रेमवर्क है जो सरल और प्रभावशाली प्रतिक्रियाशीलता के साथ यूजर इंटरफेस बनाने के लिए है। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके सीधे वास्तविक ब्राउज़र में SolidJS कंपोनेंट्स का परीक्षण कर सकते हैं।

## सेटअप

अपने SolidJS प्रोजेक्ट में WebdriverIO को सेटअप करने के लिए, हमारे कंपोनेंट टेस्टिंग दस्तावेज़ में [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों में प्रीसेट के रूप में `solid` का चयन करना सुनिश्चित करें, उदाहरण के लिए:

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

यदि आप पहले से ही [Vite](https://vitejs.dev/) को डेवलपमेंट सर्वर के रूप में उपयोग कर रहे हैं, तो आप अपने WebdriverIO कॉन्फिगरेशन में `vite.config.ts` की अपनी कॉन्फिगरेशन को पुन: उपयोग कर सकते हैं। अधिक जानकारी के लिए, [रनर विकल्प](/docs/runner#runner-options) में `viteConfig` देखें।

:::

SolidJS प्रीसेट के लिए `vite-plugin-solid` का इंस्टॉल होना आवश्यक है:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

फिर आप टेस्ट को निम्न कमांड से शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

## टेस्ट लिखना

मान लीजिए आपके पास निम्न SolidJS कंपोनेंट है:

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

अपने टेस्ट में कंपोनेंट को टेस्ट पेज से जोड़ने के लिए `solid-js/web` से `render` मेथड का उपयोग करें। कंपोनेंट के साथ इंटरैक्ट करने के लिए हम WebdriverIO कमांड्स का उपयोग करने की सलाह देते हैं क्योंकि वे वास्तविक उपयोगकर्ता इंटरैक्शन के अधिक करीब व्यवहार करते हैं, उदाहरण के लिए:

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

आप हमारे [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite) में SolidJS के लिए WebdriverIO कंपोनेंट टेस्ट सूट का पूर्ण उदाहरण पा सकते हैं।