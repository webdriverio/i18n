---
id: solid
title: SolidJS
description: "Configura il browser runner di WebdriverIO per un progetto SolidJS con il preset solid e scrivi test dei componenti che vengono renderizzati nella pagina."
---

[SolidJS](https://www.solidjs.com/) è un framework per costruire interfacce utente con una reattività semplice e performante. Puoi testare i componenti SolidJS direttamente in un browser reale utilizzando WebdriverIO e il suo [browser runner](/docs/runner#browser-runner).

## Configurazione

Per configurare WebdriverIO all'interno del tuo progetto SolidJS, segui le [istruzioni](/docs/component-testing#set-up) nella nostra documentazione sul component testing. Assicurati di selezionare `solid` come preset nelle opzioni del runner, ad esempio:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

Se stai già utilizzando [Vite](https://vitejs.dev/) come server di sviluppo, puoi anche semplicemente riutilizzare la tua configurazione presente in `vite.config.ts` all'interno della configurazione di WebdriverIO. Per maggiori informazioni, consulta `viteConfig` nelle [opzioni del runner](/docs/runner#runner-options).

:::

Il preset SolidJS richiede che `vite-plugin-solid` sia installato:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Puoi quindi avviare i test eseguendo:

```sh
npx wdio run ./wdio.conf.js
```

## Scrivere i test

Supponendo di avere il seguente componente SolidJS:

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

Nel tuo test usa il metodo `render` di `solid-js/web` per collegare il componente alla pagina di test. Per interagire con il componente consigliamo di utilizzare i comandi di WebdriverIO, poiché si comportano in modo più simile alle reali interazioni dell'utente, ad esempio:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * assicura che il componente venga renderizzato per ogni test in un
     * nuovo container radice
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Puoi trovare un esempio completo di una suite di test dei componenti WebdriverIO per SolidJS nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).