---
id: react
title: ரியாக்ட்
---

[React](https://reactjs.org/) இதைப் பயன்படுத்தி ஊடாடும் UI-களை உருவாக்குவது எளிது. உங்கள் பயன்பாட்டில் உள்ள ஒவ்வொரு நிலைக்கும் எளிய காட்சிகளை வடிவமைக்கவும், உங்கள் தரவு மாறும்போது React திறமையாக சரியான கூறுகளை மட்டும் புதுப்பித்து காட்டும். WebdriverIO மற்றும் அதன் [browser runner](/docs/runner#browser-runner) பயன்படுத்தி நிஜ உலாவியில் நேரடியாக ரியாக்ட் கூறுகளை சோதிக்கலாம்.

## அமைப்பு

உங்கள் React திட்டத்தில் WebdriverIO-வை அமைக்க, எங்கள் கூறு சோதனை ஆவணங்களில் உள்ள [வழிமுறைகளைப்](/docs/component-testing#set-up) பின்பற்றவும். உங்கள் ரன்னர் விருப்பங்களில் `react`-ஐ முன்னமைவாகத் தேர்ந்தெடுக்க உறுதிப்படுத்தவும், எ.கா.:

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

நீங்கள் ஏற்கனவே [Vite](https://vitejs.dev/) ஐ உருவாக்க சேவையகமாகப் பயன்படுத்திக் கொண்டிருந்தால், உங்கள் `vite.config.ts` உள்ள கட்டமைப்பை உங்கள் WebdriverIO கட்டமைப்பில் மீண்டும் பயன்படுத்தலாம். மேலும் தகவலுக்கு, [ரன்னர் விருப்பங்கள்](/docs/runner#runner-options) இல் `viteConfig` ஐப் பார்க்கவும்.

:::

React முன்னமைவுக்கு `@vitejs/plugin-react` நிறுவப்பட வேண்டும். மேலும், கூறுகளை சோதனைப் பக்கத்தில் காட்சிப்படுத்த [Testing Library](https://testing-library.com/) ஐப் பயன்படுத்த பரிந்துரைக்கிறோம். அதற்காக பின்வரும் கூடுதல் சார்புகளை நிறுவ வேண்டும்:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

பின்னர் பின்வருமாறு சோதனைகளைத் தொடங்கலாம்:

```sh
npx wdio run ./wdio.conf.js
```

## சோதனைகளை எழுதுதல்

பின்வரும் React கூறு உங்களிடம் இருந்தால்:

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

உங்கள் சோதனையில் கூறுகளை சோதனைப் பக்கத்துடன் இணைக்க `@testing-library/react` இலிருந்து `render` முறையைப் பயன்படுத்தவும். கூறுகளுடன் தொடர்புகொள்ள WebdriverIO கட்டளைகளைப் பயன்படுத்த பரிந்துரைக்கிறோம், ஏனெனில் அவை உண்மையான பயனர் தொடர்புகளை நெருக்கமாக பின்பற்றும், எ.கா.:

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

எங்கள் [உதாரண களஞ்சியத்தில்](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite) React க்கான WebdriverIO கூறு சோதனை தொகுப்பின் முழு உதாரணத்தைக் காணலாம்.