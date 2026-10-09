---
id: svelte
title: Svelte
description: "svelte प्रीसेट के साथ Svelte प्रोजेक्ट के लिए WebdriverIO ब्राउज़र रनर सेट अप करें और Testing Library के साथ कंपोनेंट टेस्ट लिखें।"
---

[Svelte](https://svelte.dev/) यूज़र इंटरफ़ेस बनाने का एक बिल्कुल नया तरीका है। जहाँ React और Vue जैसे पारंपरिक फ्रेमवर्क अपना अधिकांश काम ब्राउज़र में करते हैं, वहीं Svelte उस काम को एक कंपाइल चरण में ले जाता है जो आपके ऐप को बिल्ड करते समय होता है। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके Svelte कंपोनेंट्स को सीधे एक वास्तविक ब्राउज़र में टेस्ट कर सकते हैं।

## सेटअप

अपने Svelte प्रोजेक्ट में WebdriverIO सेट अप करने के लिए, हमारे कंपोनेंट टेस्टिंग डॉक्स में दिए गए [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों में प्रीसेट के रूप में `svelte` चुनना सुनिश्चित करें, उदाहरण के लिए:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

यदि आप पहले से ही डेवलपमेंट सर्वर के रूप में [Vite](https://vitejs.dev/) का उपयोग कर रहे हैं, तो आप अपने WebdriverIO कॉन्फ़िग में `vite.config.ts` के अपने कॉन्फ़िगरेशन का पुनः उपयोग भी कर सकते हैं। अधिक जानकारी के लिए, [रनर विकल्पों](/docs/runner#runner-options) में `viteConfig` देखें।

:::

Svelte प्रीसेट के लिए `@sveltejs/vite-plugin-svelte` का इंस्टॉल होना आवश्यक है। साथ ही, हम कंपोनेंट को टेस्ट पेज में रेंडर करने के लिए [Testing Library](https://testing-library.com/) का उपयोग करने की सलाह देते हैं। इसलिए आपको निम्नलिखित अतिरिक्त डिपेंडेंसीज़ इंस्टॉल करनी होंगी:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

फिर आप निम्नलिखित कमांड चलाकर टेस्ट शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.js
```

## टेस्ट लिखना

मान लीजिए आपके पास निम्नलिखित Svelte कंपोनेंट है:

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

अपने टेस्ट में कंपोनेंट को टेस्ट पेज से जोड़ने के लिए `@testing-library/svelte` के `render` मेथड का उपयोग करें। कंपोनेंट के साथ इंटरैक्ट करने के लिए हम WebdriverIO कमांड्स का उपयोग करने की सलाह देते हैं क्योंकि वे वास्तविक यूज़र इंटरैक्शन के अधिक करीब व्यवहार करते हैं, उदाहरण के लिए:

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

आप Svelte के लिए WebdriverIO कंपोनेंट टेस्ट सूट का पूरा उदाहरण हमारी [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite) में पा सकते हैं।