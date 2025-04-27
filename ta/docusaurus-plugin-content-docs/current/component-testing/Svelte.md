---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/) என்பது பயனர் இடைமுகங்களை உருவாக்குவதற்கான ஒரு புரட்சிகரமான புதிய அணுகுமுறையாகும். React மற்றும் Vue போன்ற பாரம்பரிய கட்டமைப்புகள் பெரும்பாலான வேலைகளை உலாவியில் செய்யும் போது, Svelte அந்த வேலையை நீங்கள் உங்கள் பயன்பாட்டை உருவாக்கும்போது நடக்கும் தொகுப்பு படிக்கு மாற்றுகிறது. WebdriverIO மற்றும் அதன் [browser runner](/docs/runner#browser-runner) ஐப் பயன்படுத்தி Svelte கூறுகளை நேரடியாக உண்மையான உலாவியில் சோதிக்கலாம்.

## அமைப்பு

உங்கள் Svelte திட்டத்தில் WebdriverIO ஐ அமைக்க, எங்கள் கூறு சோதனை ஆவணங்களில் [வழிமுறைகளை](/docs/component-testing#set-up) பின்பற்றவும். உங்கள் ரன்னர் விருப்பங்களில் `svelte` ஐ முன்னமைவாகத் தேர்ந்தெடுக்க உறுதிப்படுத்தவும், எ.கா:

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

நீங்கள் ஏற்கனவே [Vite](https://vitejs.dev/) ஐ மேம்பாட்டு சேவையகமாகப் பயன்படுத்திக் கொண்டிருந்தால், உங்கள் `vite.config.ts` இல் உள்ள உள்ளமைவை உங்கள் WebdriverIO உள்ளமைவில் மறுபயன்படுத்தலாம். மேலும் தகவலுக்கு, [ரன்னர் விருப்பங்களில்](/docs/runner#runner-options) உள்ள `viteConfig` ஐப் பார்க்கவும்.

:::

Svelte முன்னமைவு `@sveltejs/vite-plugin-svelte` நிறுவப்பட வேண்டும். மேலும் கூறுகளை சோதனை பக்கத்தில் காட்சிப்படுத்த [Testing Library](https://testing-library.com/) ஐப் பயன்படுத்த பரிந்துரைக்கிறோம். எனவே பின்வரும் கூடுதல் சார்புகளை நிறுவ வேண்டும்:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

பின்னர் பின்வருமாறு சோதனைகளைத் தொடங்கலாம்:

```sh
npx wdio run ./wdio.conf.js
```

## சோதனைகளை எழுதுதல்

பின்வரும் Svelte கூறு உங்களிடம் இருப்பதாகக் கொள்வோம்:

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

உங்கள் சோதனையில், கூறுகளை சோதனை பக்கத்துடன் இணைக்க `@testing-library/svelte` இலிருந்து `render` முறையைப் பயன்படுத்தவும். கூறுகளுடன் தொடர்புகொள்ள, WebdriverIO கட்டளைகளைப் பயன்படுத்த பரிந்துரைக்கிறோம், ஏனெனில் அவை உண்மையான பயனர் தொடர்புகளுக்கு நெருக்கமாக செயல்படுகின்றன, எ.கா:

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

எங்கள் [எடுத்துக்காட்டு களஞ்சியத்தில்](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite) Svelte க்கான WebdriverIO கூறு சோதனை தொகுப்பின் முழுமையான எடுத்துக்காட்டைக் காணலாம்.