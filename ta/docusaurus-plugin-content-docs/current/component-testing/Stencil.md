---
id: stencil
title: ஸ்டென்சில்
---

[Stencil](https://stenciljs.com/) என்பது மீண்டும் பயன்படுத்தக்கூடிய, அளவிடக்கூடிய கூறு நூலகங்களை உருவாக்குவதற்கான நூலகமாகும். WebdriverIO மற்றும் அதன் [பிரவுசர் ரன்னர்](/docs/runner#browser-runner) பயன்படுத்தி நீங்கள் Stencil கூறுகளை நேரடியாக உண்மையான உலாவியில் சோதிக்கலாம்.

## அமைப்பு

உங்கள் Stencil திட்டத்தில் WebdriverIO அமைக்க, எங்கள் கூறு சோதனை ஆவணங்களில் உள்ள [வழிமுறைகளைப்](/docs/component-testing#set-up) பின்பற்றவும். உங்கள் ரன்னர் விருப்பங்களில் `stencil` என்பதை முன்னமைவாகத் தேர்ந்தெடுக்க உறுதிப்படுத்தவும், எ.கா.:

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

நீங்கள் React அல்லது Vue போன்ற ஒரு கட்டமைப்புடன் Stencil ஐப் பயன்படுத்தும் சூழலில், இந்த கட்டமைப்புகளுக்கான முன்னமைவை வைத்திருக்க வேண்டும்.

:::

பின்னர் பின்வரும் கட்டளையை இயக்குவதன் மூலம் சோதனைகளைத் தொடங்கலாம்:

```sh
npx wdio run ./wdio.conf.ts
```

## சோதனைகளை எழுதுதல்

பின்வரும் Stencil கூறுகள் உள்ளன என்று வைத்துக்கொள்வோம்:

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

உங்கள் சோதனையில் `@wdio/browser-runner/stencil` இல் இருந்து `render` முறையைப் பயன்படுத்தி சோதனைப் பக்கத்தில் கூறுகளை இணைக்கவும். கூறுகளுடன் தொடர்புகொள்ள, உண்மையான பயனர் தொடர்புகளுக்கு நெருக்கமாக செயல்படும் WebdriverIO கட்டளைகளைப் பயன்படுத்த பரிந்துரைக்கிறோம், எ.கா.:

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

#### ரெண்டர் விருப்பங்கள்

`render` முறை பின்வரும் விருப்பங்களை வழங்குகிறது:

##### `components`

சோதிக்க வேண்டிய கூறுகளின் வரிசை. கூறு வகுப்புகளை spec கோப்பிற்குள் இறக்குமதி செய்யலாம், பின்னர் அவற்றின் குறிப்பு சோதனை முழுவதும் பயன்படுத்த `component` வரிசைக்கு சேர்க்கப்பட வேண்டும்.

__வகை:__ `CustomElementConstructor[]`<br />
__இயல்புநிலை:__ `[]`

##### `flushQueue`

`false` என்றால், ஆரம்ப சோதனை அமைப்பில் ரெண்டர் வரிசையை அகற்ற வேண்டாம்.

__வகை:__ `boolean`<br />
__இயல்புநிலை:__ `true`

##### `template`

சோதனையை உருவாக்கப் பயன்படுத்தப்படும் ஆரம்ப JSX. HTML பண்புகளுக்குப் பதிலாக அவற்றின் பண்புகளைப் பயன்படுத்தி ஒரு கூறை துவக்க விரும்பும்போது `template` ஐப் பயன்படுத்தவும். இது குறிப்பிட்ட டெம்ப்ளேட்டை (JSX) `document.body` இல் ரெண்டர் செய்யும்.

__வகை:__ `JSX.Template`

##### `html`

சோதனையை உருவாக்கப் பயன்படுத்தப்படும் ஆரம்ப HTML. இது ஒன்றாக செயல்படும் கூறுகளின் தொகுப்பை உருவாக்கவும், HTML பண்புகளை ஒதுக்கவும் பயனுள்ளதாக இருக்கும்.

__வகை:__ `string`

##### `language`

`<html>` இல் போலியான `lang` பண்புக்கூறை அமைக்கிறது.

__வகை:__ `string`

##### `autoApplyChanges`

இயல்பாக, கூறு பண்புகள் மற்றும் பண்புக்கூறுகளில் ஏற்படும் எந்த மாற்றங்களும் புதுப்பிப்புகளை சோதிக்க `env.waitForChanges()` செய்ய வேண்டும். ஒரு விருப்பமாக, `autoApplyChanges` தொடர்ந்து பின்னணியில் வரிசையை சுத்தம் செய்கிறது.

__வகை:__ `boolean`<br />
__இயல்புநிலை:__ `false`

##### `attachStyles`

இயல்பாக, பாணிகள் DOM-க்கு இணைக்கப்படவில்லை மற்றும் அவை தொடர்வரிசைப்படுத்தப்பட்ட HTML-இல் பிரதிபலிக்கப்படவில்லை. இந்த விருப்பத்தை `true` என அமைப்பது தொடர்வரிசைப்படுத்தக்கூடிய வெளியீட்டில் கூறுகளின் பாணிகளைச் சேர்க்கும்.

__வகை:__ `boolean`<br />
__இயல்புநிலை:__ `false`

#### ரெண்டர் சூழல்

`render` முறை கூறுகளின் சூழலை நிர்வகிப்பதற்கான சில பயன்பாட்டு உதவிகளை வழங்கும் ஒரு சூழல் பொருளைத் திருப்பித் தருகிறது.

##### `flushAll`

ஒரு பண்பு அல்லது பண்புக்கூறிற்கான புதுப்பிப்பு போன்ற மாற்றங்கள் கூறுக்கு செய்யப்பட்ட பிறகு, சோதனைப் பக்கம் தானாகவே மாற்றங்களைப் பயன்படுத்தாது. புதுப்பிப்புக்காகக் காத்திருந்து, பயன்படுத்த, `await flushAll()`-ஐ அழைக்கவும்

__வகை:__ `() => void`

##### `unmount`

DOM இலிருந்து கொள்கலன் உறுப்பை அகற்றுகிறது.

__வகை:__ `() => void`

##### `styles`

கூறுகளால் வரையறுக்கப்பட்ட அனைத்து பாணிகளும்.

__வகை:__ `Record<string, string>`

##### `container`

டெம்ப்ளேட் ரெண்டர் செய்யப்படும் கொள்கலன் உறுப்பு.

__வகை:__ `HTMLElement`

##### `$container`

WebdriverIO உறுப்பாக உள்ள கொள்கலன் உறுப்பு.

__வகை:__ `WebdriverIO.Element`

##### `root`

டெம்ப்ளேட்டின் மூல கூறு.

__வகை:__ `HTMLElement`

##### `$root`

WebdriverIO உறுப்பாக உள்ள மூல கூறு.

__வகை:__ `WebdriverIO.Element`

### `waitForChanges`

கூறு தயாராக இருக்க காத்திருக்க உதவும் முறை.

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

## உறுப்பு புதுப்பிப்புகள்

உங்கள் Stencil கூறில் பண்புகள் அல்லது நிலைகளை வரையறுத்தால், கூறுகள் மீண்டும் ரெண்டர் செய்யப்பட இந்த மாற்றங்கள் எப்போது பயன்படுத்தப்பட வேண்டும் என்பதை நீங்கள் நிர்வகிக்க வேண்டும்.


## எடுத்துக்காட்டுகள்

எங்கள் [எடுத்துக்காட்டு களஞ்சியத்தில்](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) Stencil க்கான WebdriverIO கூறு சோதனை தொகுப்பின் முழுமையான எடுத்துக்காட்டைக் காணலாம்.