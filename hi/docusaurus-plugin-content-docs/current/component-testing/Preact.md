---
id: preact
title: Preact
---

[Preact](https://preactjs.com/) React का एक तेज़ 3kB विकल्प है जिसमें समान आधुनिक API है। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके वास्तविक ब्राउज़र में सीधे Preact कंपोनेंट्स का परीक्षण कर सकते हैं।

## सेटअप

अपने Preact प्रोजेक्ट में WebdriverIO सेटअप करने के लिए, हमारे कंपोनेंट टेस्टिंग दस्तावेज़ में [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों में `preact` को प्रीसेट के रूप में चुनना सुनिश्चित करें, उदाहरण के लिए:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'preact'
    }],
    // ...
}
```

:::info

यदि आप पहले से ही [Vite](https://vitejs.dev/) का उपयोग डेवलपमेंट सर्वर के रूप में कर रहे हैं, तो आप अपने WebdriverIO कॉन्फ़िगरेशन में `vite.config.ts` में अपने कॉन्फ़िगरेशन का पुन: उपयोग भी कर सकते हैं। अधिक जानकारी के लिए, [रनर विकल्प](/docs/runner#runner-options) में `viteConfig` देखें।

:::

Preact प्रीसेट के लिए `@preact/preset-vite` इंस्टॉल किया जाना आवश्यक है। साथ ही हम कंपोनेंट को टेस्ट पेज में रेंडर करने के लिए [Testing Library](https://testing-library.com/) का उपयोग करने की सलाह देते हैं। इसलिए आपको निम्नलिखित अतिरिक्त निर्भरताओं को इंस्टॉल करने की आवश्यकता होगी:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

फिर आप निम्न कमांड चलाकर टेस्ट शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

## टेस्ट लिखना

मान लीजिए आपके पास निम्नलिखित Preact कंपोनेंट है:

```tsx title="./components/Component.jsx"
import { h } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
    initialCount: number
}

export function Counter({ initialCount }: Props) {
    const [count, setCount] = useState(initialCount)
    const increment = () => setCount(count + 1)

    return (
        <div>
            Current value: {count}
            <button onClick={increment}>Increment</button>
        </div>
    )
}

```

अपने टेस्ट में कंपोनेंट को टेस्ट पेज से जोड़ने के लिए `@testing-library/preact` से `render` मेथड का उपयोग करें। कंपोनेंट के साथ इंटरैक्ट करने के लिए हम WebdriverIO कमांड्स का उपयोग करने की सलाह देते हैं क्योंकि वे वास्तविक उपयोगकर्ता इंटरैक्शन के अधिक करीब व्यवहार करते हैं, उदाहरण के लिए:

```ts title="app.test.tsx"
import { expect } from 'expect'
import { render, screen } from '@testing-library/preact'

import { Counter } from './components/PreactComponent.js'

describe('Preact Component Testing', () => {
    it('should increment after "Increment" button is clicked', async () => {
        const component = await $(render(<Counter initialCount={5} />))
        await expect(component).toHaveText(expect.stringContaining('Current value: 5'))

        const incrElem = await $(screen.getByText('Increment'))
        await incrElem.click()
        await expect(component).toHaveText(expect.stringContaining('Current value: 6'))
    })
})
```

आप हमारे [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite) में Preact के लिए WebdriverIO कंपोनेंट टेस्ट सूट का पूर्ण उदाहरण पा सकते हैं।