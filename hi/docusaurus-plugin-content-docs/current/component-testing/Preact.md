---
id: preact
title: Preact
description: "preact प्रीसेट के साथ Preact प्रोजेक्ट के लिए WebdriverIO ब्राउज़र रनर सेट करें और Testing Library के साथ कंपोनेंट टेस्ट लिखें।"
---

[Preact](https://preactjs.com/) React का एक तेज़ 3kB विकल्प है जिसमें वही आधुनिक API है। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके Preact कंपोनेंट्स को सीधे एक वास्तविक ब्राउज़र में टेस्ट कर सकते हैं।

## सेटअप

अपने Preact प्रोजेक्ट में WebdriverIO सेटअप करने के लिए, हमारे कंपोनेंट टेस्टिंग डॉक्स में दिए गए [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों में प्रीसेट के रूप में `preact` चुनना सुनिश्चित करें, उदाहरण के लिए:

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

यदि आप पहले से ही डेवलपमेंट सर्वर के रूप में [Vite](https://vitejs.dev/) का उपयोग कर रहे हैं, तो आप अपने WebdriverIO कॉन्फ़िग में `vite.config.ts` के अपने कॉन्फ़िगरेशन का पुन: उपयोग भी कर सकते हैं। अधिक जानकारी के लिए, [रनर विकल्पों](/docs/runner#runner-options) में `viteConfig` देखें।

:::

Preact प्रीसेट के लिए `@preact/preset-vite` का इंस्टॉल होना आवश्यक है। साथ ही, हम कंपोनेंट को टेस्ट पेज में रेंडर करने के लिए [Testing Library](https://testing-library.com/) का उपयोग करने की सलाह देते हैं। इसलिए आपको निम्नलिखित अतिरिक्त डिपेंडेंसीज़ इंस्टॉल करनी होंगी:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

फिर आप निम्नलिखित कमांड चलाकर टेस्ट शुरू कर सकते हैं:

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

अपने टेस्ट में कंपोनेंट को टेस्ट पेज से जोड़ने के लिए `@testing-library/preact` की `render` मेथड का उपयोग करें। कंपोनेंट के साथ इंटरैक्ट करने के लिए हम WebdriverIO कमांड्स का उपयोग करने की सलाह देते हैं क्योंकि वे वास्तविक यूज़र इंटरैक्शन के अधिक करीब व्यवहार करती हैं, उदाहरण के लिए:

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

आप Preact के लिए WebdriverIO कंपोनेंट टेस्ट सूट का पूरा उदाहरण हमारी [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite) में देख सकते हैं।