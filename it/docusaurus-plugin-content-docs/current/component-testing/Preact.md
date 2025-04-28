---
id: preact
title: Preact
---

[Preact](https://preactjs.com/) è un'alternativa veloce a React di soli 3kB con la stessa API moderna. Puoi testare i componenti Preact direttamente in un browser reale utilizzando WebdriverIO e il suo [browser runner](/docs/runner#browser-runner).

## Configurazione

Per configurare WebdriverIO all'interno del tuo progetto Preact, segui le [istruzioni](/docs/component-testing#set-up) nei nostri documenti sui test dei componenti. Assicurati di selezionare `preact` come preset nelle opzioni del runner, ad esempio:

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

Se stai già utilizzando [Vite](https://vitejs.dev/) come server di sviluppo, puoi anche riutilizzare la tua configurazione in `vite.config.ts` all'interno della tua configurazione WebdriverIO. Per maggiori informazioni, vedi `viteConfig` nelle [opzioni del runner](/docs/runner#runner-options).

:::

Il preset Preact richiede che `@preact/preset-vite` sia installato. Inoltre, consigliamo di utilizzare [Testing Library](https://testing-library.com/) per renderizzare il componente nella pagina di test. Pertanto, dovrai installare le seguenti dipendenze aggiuntive:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Puoi quindi avviare i test eseguendo:

```sh
npx wdio run ./wdio.conf.js
```

## Scrittura dei Test

Dato il seguente componente Preact:

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

Nel tuo test, utilizza il metodo `render` da `@testing-library/preact` per allegare il componente alla pagina di test. Per interagire con il componente, consigliamo di utilizzare i comandi WebdriverIO poiché si comportano in modo più simile alle interazioni reali dell'utente, ad esempio:

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

Puoi trovare un esempio completo di una suite di test di componenti WebdriverIO per Preact nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite).