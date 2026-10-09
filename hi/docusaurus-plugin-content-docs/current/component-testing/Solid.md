---
id: solid
title: SolidJS
description: "solid प्रीसेट के साथ SolidJS प्रोजेक्ट के लिए WebdriverIO ब्राउज़र रनर सेट अप करें और ऐसे कंपोनेंट टेस्ट लिखें जो पेज में रेंडर होते हैं।"
---

[SolidJS](https://www.solidjs.com/) सरल और प्रदर्शनकारी रिएक्टिविटी के साथ यूज़र इंटरफ़ेस बनाने के लिए एक फ्रेमवर्क है। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके SolidJS कंपोनेंट्स को सीधे एक वास्तविक ब्राउज़र में टेस्ट कर सकते हैं।

## सेटअप

अपने SolidJS प्रोजेक्ट में WebdriverIO सेट अप करने के लिए, हमारे कंपोनेंट टेस्टिंग डॉक्स में दिए गए [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों में प्रीसेट के रूप में `solid` चुनना सुनिश्चित करें, उदाहरण के लिए:

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

यदि आप पहले से ही डेवलपमेंट सर्वर के रूप में [Vite](https://vitejs.dev/) का उपयोग कर रहे हैं, तो आप अपने WebdriverIO कॉन्फ़िग में `vite.config.ts` के अपने कॉन्फ़िगरेशन का पुन: उपयोग भी कर सकते हैं। अधिक जानकारी के लिए, [रनर विकल्पों](/docs/runner#runner-options) में `viteConfig` देखें।

:::

SolidJS प्रीसेट के लिए `vite-plugin-solid` का इंस्टॉल होना आवश्यक है:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

फिर आप निम्नलिखित कमांड चलाकर टेस्ट शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

## टेस्ट लिखना

मान लीजिए आपके पास निम्नलिखित SolidJS कंपोनेंट है:

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

अपने टेस्ट में कंपोनेंट को टेस्ट पेज से जोड़ने के लिए `solid-js/web` के `render` मेथड का उपयोग करें। कंपोनेंट के साथ इंटरैक्ट करने के लिए हम WebdriverIO कमांड्स का उपयोग करने की सलाह देते हैं क्योंकि वे वास्तविक यूज़र इंटरैक्शन के अधिक करीब व्यवहार करते हैं, उदाहरण के लिए:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * सुनिश्चित करें कि हम हर टेस्ट के लिए कंपोनेंट को एक
     * नए रूट कंटेनर में रेंडर करें
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

आप SolidJS के लिए WebdriverIO कंपोनेंट टेस्ट सूट का पूरा उदाहरण हमारी [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite) में पा सकते हैं।