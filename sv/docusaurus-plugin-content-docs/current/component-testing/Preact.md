---
id: preact
title: Preact
description: "Konfigurera WebdriverIO:s webbläsarkörare för ett Preact-projekt med preact-förinställningen och skriv komponenttester med Testing Library."
---

[Preact](https://preactjs.com/) är ett snabbt alternativ till React på 3 kB med samma moderna API. Du kan testa Preact-komponenter direkt i en riktig webbläsare med WebdriverIO och dess [webbläsarkörare](/docs/runner#browser-runner).

## Konfiguration

För att konfigurera WebdriverIO i ditt Preact-projekt, följ [instruktionerna](/docs/component-testing#set-up) i vår dokumentation om komponenttestning. Se till att välja `preact` som förinställning (preset) i dina runner-alternativ, t.ex.:

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

Om du redan använder [Vite](https://vitejs.dev/) som utvecklingsserver kan du också helt enkelt återanvända din konfiguration i `vite.config.ts` i din WebdriverIO-konfiguration. För mer information, se `viteConfig` i [runner-alternativ](/docs/runner#runner-options).

:::

Preact-förinställningen kräver att `@preact/preset-vite` är installerat. Vi rekommenderar också att du använder [Testing Library](https://testing-library.com/) för att rendera komponenten på testsidan. Därför behöver du installera följande ytterligare beroenden:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Du kan sedan starta testerna genom att köra:

```sh
npx wdio run ./wdio.conf.js
```

## Skriva tester

Anta att du har följande Preact-komponent:

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

I ditt test använder du metoden `render` från `@testing-library/preact` för att fästa komponenten på testsidan. För att interagera med komponenten rekommenderar vi att du använder WebdriverIO-kommandon eftersom de beter sig mer likt faktiska användarinteraktioner, t.ex.:

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

Du hittar ett komplett exempel på en WebdriverIO-testsvit för komponenttestning av Preact i vårt [exempelarkiv](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite).