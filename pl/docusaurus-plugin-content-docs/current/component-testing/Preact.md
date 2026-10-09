---
id: preact
title: Preact
description: "Skonfiguruj browser runner WebdriverIO dla projektu Preact z presetem preact i pisz testy komponentów z użyciem Testing Library."
---

[Preact](https://preactjs.com/) to szybka, ważąca zaledwie 3kB alternatywa dla React z tym samym nowoczesnym API. Możesz testować komponenty Preact bezpośrednio w prawdziwej przeglądarce, korzystając z WebdriverIO i jego [browser runnera](/docs/runner#browser-runner).

## Konfiguracja

Aby skonfigurować WebdriverIO w swoim projekcie Preact, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji dotyczącej testowania komponentów. Upewnij się, że wybrałeś `preact` jako preset w opcjach runnera, np.:

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

Jeśli już używasz [Vite](https://vitejs.dev/) jako serwera deweloperskiego, możesz po prostu ponownie wykorzystać swoją konfigurację z `vite.config.ts` w konfiguracji WebdriverIO. Więcej informacji znajdziesz w opisie `viteConfig` w [opcjach runnera](/docs/runner#runner-options).

:::

Preset Preact wymaga zainstalowania `@preact/preset-vite`. Zalecamy również używanie [Testing Library](https://testing-library.com/) do renderowania komponentu na stronie testowej. Dlatego musisz zainstalować następujące dodatkowe zależności:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Następnie możesz uruchomić testy za pomocą:

```sh
npx wdio run ./wdio.conf.js
```

## Pisanie testów

Załóżmy, że masz następujący komponent Preact:

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

W swoim teście użyj metody `render` z `@testing-library/preact`, aby dołączyć komponent do strony testowej. Do interakcji z komponentem zalecamy używanie poleceń WebdriverIO, ponieważ zachowują się one bardziej podobnie do rzeczywistych interakcji użytkownika, np.:

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

Pełny przykład zestawu testów komponentów WebdriverIO dla Preact znajdziesz w naszym [repozytorium z przykładami](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite).