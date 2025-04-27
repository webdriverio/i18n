---
id: stencil
title: स्टेंसिल
---

[Stencil](https://stenciljs.com/) पुन: प्रयोज्य, स्केलेबल कंपोनेंट लाइब्रेरी बनाने के लिए एक लाइब्रेरी है। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके वास्तविक ब्राउज़र में सीधे Stencil कंपोनेंट्स का परीक्षण कर सकते हैं।

## सेटअप

अपने Stencil प्रोजेक्ट के भीतर WebdriverIO सेटअप करने के लिए, हमारे कंपोनेंट टेस्टिंग डॉक्स में [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों के भीतर `stencil` को प्रीसेट के रूप में चुनना सुनिश्चित करें, उदाहरण के लिए:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

यदि आप Stencil को React या Vue जैसे फ्रेमवर्क के साथ उपयोग करते हैं, तो आपको इन फ्रेमवर्क के लिए प्रीसेट रखना चाहिए।

:::

आप निम्न कमांड चलाकर टेस्ट शुरू कर सकते हैं:

```sh
npx wdio run ./wdio.conf.ts
```

## टेस्ट लिखना

मान लीजिए आपके पास निम्नलिखित Stencil कंपोनेंट्स हैं:

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

अपने टेस्ट में `@wdio/browser-runner/stencil` से `render` मेथड का उपयोग करके कंपोनेंट को टेस्ट पेज से जोड़ें। कंपोनेंट के साथ इंटरैक्ट करने के लिए हम WebdriverIO कमांड्स का उपयोग करने की सलाह देते हैं क्योंकि वे वास्तविक उपयोगकर्ता इंटरैक्शन के करीब व्यवहार करते हैं, उदाहरण के लिए:

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### रेंडर विकल्प

`render` मेथड निम्नलिखित विकल्प प्रदान करता है:

##### `components`

टेस्ट करने के लिए कंपोनेंट्स की एक सरणी। कंपोनेंट क्लासेज को स्पेक फ़ाइल में इम्पोर्ट किया जा सकता है, फिर उनके रेफरेन्स को `component` सरणी में जोड़ा जाना चाहिए ताकि पूरे टेस्ट में उपयोग किया जा सके।

__प्रकार:__ `CustomElementConstructor[]`<br />
__डिफ़ॉल्ट:__ `[]`

##### `flushQueue`

यदि `false`, प्रारंभिक टेस्ट सेटअप पर रेंडर कतार को फ्लश न करें।

__प्रकार:__ `boolean`<br />
__डिफ़ॉल्ट:__ `true`

##### `template`

प्रारंभिक JSX जो टेस्ट जनरेट करने के लिए उपयोग किया जाता है। `template` का उपयोग करें जब आप HTML एट्रिब्यूट्स के बजाय उनके प्रॉपर्टीज का उपयोग करके कंपोनेंट को इनिशियलाइज़ करना चाहते हैं। यह निर्दिष्ट टेम्पलेट (JSX) को `document.body` में रेंडर करेगा।

__प्रकार:__ `JSX.Template`

##### `html`

टेस्ट जनरेट करने के लिए उपयोग किया गया प्रारंभिक HTML। यह कंपोनेंट्स के एक संग्रह को एक साथ काम करने और HTML एट्रिब्यूट्स असाइन करने के लिए उपयोगी हो सकता है।

__प्रकार:__ `string`

##### `language`

`<html>` पर मॉक किए गए `lang` एट्रिब्यूट सेट करता है।

__प्रकार:__ `string`

##### `autoApplyChanges`

डिफ़ॉल्ट रूप से, कंपोनेंट प्रॉपर्टीज और एट्रिब्यूट्स में किसी भी परिवर्तन के लिए अपडेट का परीक्षण करने के लिए `env.waitForChanges()` आवश्यक है। एक विकल्प के रूप में, `autoApplyChanges` लगातार पृष्ठभूमि में कतार को फ्लश करता है।

__प्रकार:__ `boolean`<br />
__डिफ़ॉल्ट:__ `false`

##### `attachStyles`

डिफ़ॉल्ट रूप से, स्टाइल्स DOM से जुड़े नहीं होते हैं और वे सीरियलाइज्ड HTML में प्रतिबिंबित नहीं होते हैं। इस विकल्प को `true` पर सेट करने से कंपोनेंट के स्टाइल्स को सीरियलाइज़ेबल आउटपुट में शामिल किया जाएगा।

__प्रकार:__ `boolean`<br />
__डिफ़ॉल्ट:__ `false`

#### रेंडर एनवायरनमेंट

`render` मेथड एक एनवायरनमेंट ऑब्जेक्ट लौटाता है जो कंपोनेंट के एनवायरनमेंट को प्रबंधित करने के लिए कुछ उपयोगिता हेल्पर प्रदान करता है।

##### `flushAll`

कंपोनेंट में परिवर्तन करने के बाद, जैसे प्रॉपर्टी या एट्रिब्यूट का अपडेट, टेस्ट पेज स्वचालित रूप से परिवर्तनों को लागू नहीं करता है। अपडेट के लिए प्रतीक्षा करने और उसे लागू करने के लिए, `await flushAll()` कॉल करें।

__प्रकार:__ `() => void`

##### `unmount`

DOM से कंटेनर एलिमेंट हटाता है।

__प्रकार:__ `() => void`

##### `styles`

कंपोनेंट्स द्वारा परिभाषित सभी स्टाइल्स।

__प्रकार:__ `Record<string, string>`

##### `container`

कंटेनर एलिमेंट जिसमें टेम्पलेट रेंडर किया जा रहा है।

__प्रकार:__ `HTMLElement`

##### `$container`

WebdriverIO एलिमेंट के रूप में कंटेनर एलिमेंट।

__प्रकार:__ `WebdriverIO.Element`

##### `root`

टेम्पलेट का रूट कंपोनेंट।

__प्रकार:__ `HTMLElement`

##### `$root`

WebdriverIO एलिमेंट के रूप में रूट कंपोनेंट।

__प्रकार:__ `WebdriverIO.Element`

### `waitForChanges`

कंपोनेंट के तैयार होने का इंतजार करने के लिए हेल्पर मेथड।

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## एलिमेंट अपडेट्स

यदि आप अपने Stencil कंपोनेंट में प्रॉपर्टीज या स्टेट्स परिभाषित करते हैं, तो आपको यह प्रबंधित करना होगा कि ये परिवर्तन कंपोनेंट पर कब लागू किए जाने चाहिए ताकि इसे फिर से रेंडर किया जा सके।

## उदाहरण

आप Stencil के लिए WebdriverIO कंपोनेंट टेस्ट सूट का पूर्ण उदाहरण हमारे [उदाहरण रिपॉजिटरी](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) में पा सकते हैं।