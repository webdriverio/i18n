---
id: react
title: रिएक्ट
---

[React](https://reactjs.org/) इंटरैक्टिव यूजर इंटरफेस बनाना आसान बनाता है। अपने एप्लिकेशन के प्रत्येक स्थिति के लिए सरल व्यू डिजाइन करें, और जब आपका डेटा बदलता है तो React कुशलतापूर्वक सही कंपोनेंट्स को अपडेट और रेंडर करेगा। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके React कंपोनेंट्स का सीधे वास्तविक ब्राउज़र में परीक्षण कर सकते हैं।

## सेटअप

अपने React प्रोजेक्ट में WebdriverIO को सेटअप करने के लिए, हमारे कंपोनेंट टेस्टिंग दस्तावेज़ में दिए गए [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों में प्रीसेट के रूप में `react` का चयन करना सुनिश्चित करें, उदाहरण के लिए:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'react'
    }],
    // ...
}
```

:::info

यदि आप पहले से ही [Vite](https://vitejs.dev/) को डेवलपमेंट सर्वर के रूप में उपयोग कर रहे हैं, तो आप अपने WebdriverIO कॉन्फिगरेशन में `vite.config.ts` में अपने कॉन्फिगरेशन का फिर से उपयोग कर सकते हैं। अधिक जानकारी के लिए, [रनर विकल्प](/docs/runner#runner-options) में `viteConfig` देखें।

:::

React प्रीसेट के लिए `@vitejs/plugin-react` इंस्टॉल होना आवश्यक है। साथ ही, हम कंपोनेंट को टेस्ट पेज में रेंडर करने के लिए [Testing Library](https://testing-library.com/) का उपयोग करने की अनुशंसा करते हैं। इसके लिए आपको निम्नलिखित अतिरिक्त निर्भरताओं को इंस्टॉल करने की आवश्यकता होगी:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

फिर आप इसे चलाकर परीक्षण शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

## टेस्ट लिखना

मान लीजिए आपके पास निम्नलिखित React कंपोनेंट है:

```tsx title="./components/Component.jsx"
import React, { useState } from 'react'

function App() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme}
    </button>
}

export default App
```

अपने टेस्ट में कंपोनेंट को टेस्ट पेज से जोड़ने के लिए `@testing-library/react` से `render` मेथड का उपयोग करें। कंपोनेंट के साथ इंटरैक्ट करने के लिए हम WebdriverIO कमांड्स का उपयोग करने की अनुशंसा करते हैं क्योंकि वे वास्तविक उपयोगकर्ता इंटरैक्शंस के अधिक करीब व्यवहार करते हैं, उदाहरण के लिए:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './components/Component.jsx'

describe('React Component Testing', () => {
    it('Test theme button toggle', async () => {
        render(<App />)
        const buttonEl = screen.getByText(/Current theme/i)

        await $(buttonEl).click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

आप हमारे [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite) में React के लिए WebdriverIO कंपोनेंट टेस्ट सूट का एक पूरा उदाहरण पा सकते हैं।