---
id: preact
title: Preact
---

[Preact](https://preactjs.com/) to szybka, ważąca 3kB alternatywa dla React z tą samą nowoczesną API. Możesz testować komponenty Preact bezpośrednio w prawdziwej przeglądarce używając WebdriverIO i jego [przeglądarką runner](/docs/runner#browser-runner).

## Konfiguracja

Aby skonfigurować WebdriverIO w ramach twojego projektu Preact, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji testowania komponentów. Upewnij się, że wybierzesz `preact` jako preset w opcjach runnera, np.:

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

Jeśli już używasz [Vite](https://vitejs.dev/) jako serwera deweloperskiego, możesz również ponownie wykorzystać swoją konfigurację z `vite.config.ts` w konfiguracji WebdriverIO. Aby uzyskać więcej informacji, zobacz `viteConfig` w [opcjach runnera](/docs/runner#runner-options).

:::

Preset Preact wymaga zainstalowania `@preact/preset-vite`. Zalecamy również korzystanie z [Testing Library](https://testing-library.com/) do renderowania komponentu na stronie testowej. W związku z tym musisz zainstalować następujące dodatkowe zależności:

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

W swoim teście użyj metody `render` z `@testing-library/preact` do dołączenia komponentu do strony testowej. Do interakcji z komponentem zalecamy korzystanie z poleceń WebdriverIO, ponieważ zachowują się one bliżej rzeczywistych interakcji użytkownika, np.:

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

Pełny przykład zestawu testów komponentów WebdriverIO dla Preact znajdziesz w naszym [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite).