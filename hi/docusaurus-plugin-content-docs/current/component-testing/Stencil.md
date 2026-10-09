---
id: stencil
title: Stencil
description: "Stencil कंपोनेंट्स के लिए WebdriverIO ब्राउज़र रनर सेट अप करें, render हेल्पर से उन्हें रेंडर करें और एलिमेंट अपडेट्स की प्रतीक्षा करें।"
---

[Stencil](https://stenciljs.com/) पुन: उपयोग योग्य, स्केलेबल कंपोनेंट लाइब्रेरी बनाने के लिए एक लाइब्रेरी है। आप WebdriverIO और इसके [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके Stencil कंपोनेंट्स को सीधे एक वास्तविक ब्राउज़र में टेस्ट कर सकते हैं।

## सेटअप

अपने Stencil प्रोजेक्ट में WebdriverIO सेट अप करने के लिए, हमारे कंपोनेंट टेस्टिंग डॉक्स में दिए गए [निर्देशों](/docs/component-testing#set-up) का पालन करें। अपने रनर विकल्पों में प्रीसेट के रूप में `stencil` का चयन करना सुनिश्चित करें, उदाहरण के लिए:

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

यदि आप Stencil का उपयोग React या Vue जैसे किसी फ्रेमवर्क के साथ करते हैं, तो आपको इन फ्रेमवर्क के लिए प्रीसेट को बनाए रखना चाहिए।

:::

फिर आप निम्नलिखित चलाकर टेस्ट शुरू कर सकते हैं:

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

अपने टेस्ट में कंपोनेंट को टेस्ट पेज से जोड़ने के लिए `@wdio/browser-runner/stencil` से `render` मेथड का उपयोग करें। कंपोनेंट के साथ इंटरैक्ट करने के लिए हम WebdriverIO कमांड्स का उपयोग करने की सलाह देते हैं क्योंकि वे वास्तविक यूज़र इंटरैक्शन के अधिक करीब व्यवहार करती हैं, उदाहरण के लिए:

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

टेस्ट किए जाने वाले कंपोनेंट्स का एक ऐरे। कंपोनेंट क्लासेस को स्पेक फ़ाइल में इम्पोर्ट किया जा सकता है, फिर पूरे टेस्ट में उपयोग के लिए उनके रेफरेंस को `component` ऐरे में जोड़ा जाना चाहिए।

__प्रकार:__ `CustomElementConstructor[]`<br />
__डिफ़ॉल्ट:__ `[]`

##### `flushQueue`

यदि `false` है, तो प्रारंभिक टेस्ट सेटअप पर रेंडर क्यू को फ्लश न करें।

__प्रकार:__ `boolean`<br />
__डिफ़ॉल्ट:__ `true`

##### `template`

टेस्ट जनरेट करने के लिए उपयोग किया जाने वाला प्रारंभिक JSX। जब आप किसी कंपोनेंट को उसके HTML एट्रिब्यूट्स के बजाय उसकी प्रॉपर्टीज़ का उपयोग करके इनिशियलाइज़ करना चाहते हैं, तब `template` का उपयोग करें। यह निर्दिष्ट टेम्पलेट (JSX) को `document.body` में रेंडर करेगा।

__प्रकार:__ `JSX.Template`

##### `html`

टेस्ट जनरेट करने के लिए उपयोग किया जाने वाला प्रारंभिक HTML। यह एक साथ काम करने वाले कंपोनेंट्स का संग्रह बनाने और HTML एट्रिब्यूट्स असाइन करने के लिए उपयोगी हो सकता है।

__प्रकार:__ `string`

##### `language`

`<html>` पर मॉक किया गया `lang` एट्रिब्यूट सेट करता है।

__प्रकार:__ `string`

##### `autoApplyChanges`

डिफ़ॉल्ट रूप से, कंपोनेंट प्रॉपर्टीज़ और एट्रिब्यूट्स में किए गए किसी भी बदलाव के अपडेट्स को टेस्ट करने के लिए `env.waitForChanges()` करना आवश्यक है। एक विकल्प के रूप में, `autoApplyChanges` बैकग्राउंड में लगातार क्यू को फ्लश करता रहता है।

__प्रकार:__ `boolean`<br />
__डिफ़ॉल्ट:__ `false`

##### `attachStyles`

डिफ़ॉल्ट रूप से, स्टाइल्स DOM से अटैच नहीं होते हैं और वे सीरियलाइज़्ड HTML में प्रतिबिंबित नहीं होते हैं। इस विकल्प को `true` पर सेट करने से कंपोनेंट के स्टाइल्स सीरियलाइज़ेबल आउटपुट में शामिल हो जाएंगे।

__प्रकार:__ `boolean`<br />
__डिफ़ॉल्ट:__ `false`

#### रेंडर एनवायरनमेंट

`render` मेथड एक एनवायरनमेंट ऑब्जेक्ट लौटाता है जो कंपोनेंट के एनवायरनमेंट को प्रबंधित करने के लिए कुछ यूटिलिटी हेल्पर्स प्रदान करता है।

##### `flushAll`

किसी कंपोनेंट में बदलाव किए जाने के बाद, जैसे किसी प्रॉपर्टी या एट्रिब्यूट में अपडेट, टेस्ट पेज स्वचालित रूप से बदलावों को लागू नहीं करता है। अपडेट की प्रतीक्षा करने और उसे लागू करने के लिए, `await flushAll()` कॉल करें

__प्रकार:__ `() => void`

##### `unmount`

कंटेनर एलिमेंट को DOM से हटाता है।

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

कंपोनेंट के तैयार होने की प्रतीक्षा करने के लिए हेल्पर मेथड।

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

यदि आप अपने Stencil कंपोनेंट में प्रॉपर्टीज़ या स्टेट्स परिभाषित करते हैं, तो आपको यह प्रबंधित करना होगा कि कंपोनेंट को फिर से रेंडर करने के लिए ये बदलाव कब लागू किए जाने चाहिए।


## उदाहरण

आप Stencil के लिए WebdriverIO कंपोनेंट टेस्ट सूट का एक पूरा उदाहरण हमारी [उदाहरण रिपॉज़िटरी](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) में पा सकते हैं।