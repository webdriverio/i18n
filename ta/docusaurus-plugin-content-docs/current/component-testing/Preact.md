---
id: preact
title: Preact
---

[Preact](https://preactjs.com/) என்பது React-க்கு ஒரு வேகமான 3kB மாற்றாகும், அதே நவீன API-யுடன். WebdriverIO மற்றும் அதன் [பிரவுசர் ரன்னரைப்](/docs/runner#browser-runner) பயன்படுத்தி Preact கூறுகளை நேரடியாக உண்மையான உலாவியில் சோதிக்கலாம்.

## அமைப்பு

உங்கள் Preact திட்டத்தில் WebdriverIO-ஐ அமைக்க, எங்கள் கூறு சோதனை ஆவணங்களில் உள்ள [வழிமுறைகளைப்](/docs/component-testing#set-up) பின்பற்றவும். உங்கள் ரன்னர் விருப்பங்களில் முன்னமைவாக `preact`-ஐத் தேர்ந்தெடுக்க உறுதிசெய்யவும், எ.கா.:

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

ஏற்கனவே நீங்கள் [Vite](https://vitejs.dev/) -ஐ உருவாக்க சேவையகமாகப் பயன்படுத்திக் கொண்டிருந்தால், உங்கள் WebdriverIO கட்டமைப்பில் `vite.config.ts`-இல் உள்ள உங்கள் கட்டமைப்பை மீண்டும் பயன்படுத்தலாம். மேலும் தகவலுக்கு, [ரன்னர் விருப்பங்களில்](/docs/runner#runner-options) உள்ள `viteConfig`-ஐப் பார்க்கவும்.

:::

Preact முன்னமைவிற்கு `@preact/preset-vite` நிறுவப்பட வேண்டும். மேலும், கூறுகளை சோதனைப் பக்கத்தில் காட்டுவதற்கு [Testing Library](https://testing-library.com/) பயன்படுத்த பரிந்துரைக்கிறோம். எனவே, பின்வரும் கூடுதல் சார்புகளை நிறுவ வேண்டும்:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

பின்னர் சோதனைகளை இயக்குவதன் மூலம் தொடங்கலாம்:

```sh
npx wdio run ./wdio.conf.js
```

## சோதனைகளை எழுதுதல்

பின்வரும் Preact கூறு இருப்பதாக வைத்துக்கொள்வோம்:

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

உங்கள் சோதனையில், கூறுகளை சோதனைப் பக்கத்துடன் இணைக்க `@testing-library/preact`-இல் இருந்து `render` முறையைப் பயன்படுத்தவும். கூறுகளுடன் தொடர்புகொள்ள, உண்மையான பயனர் செயல்பாடுகளுக்கு நெருக்கமாக செயல்படும் WebdriverIO கட்டளைகளைப் பயன்படுத்த பரிந்துரைக்கிறோம், எ.கா:

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

எங்கள் [எடுத்துக்காட்டு களஞ்சியத்தில்](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite) Preact-க்கான WebdriverIO கூறு சோதனை தொகுப்பின் முழு எடுத்துக்காட்டையும் காணலாம்.