---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) è una libreria per la creazione di librerie di componenti riutilizzabili e scalabili. Puoi testare i componenti Stencil direttamente in un browser reale utilizzando WebdriverIO e il suo [browser runner](/docs/runner#browser-runner).

## Setup

Per configurare WebdriverIO all'interno del tuo progetto Stencil, segui le [istruzioni](/docs/component-testing#set-up) nei nostri documenti di testing dei componenti. Assicurati di selezionare `stencil` come preset all'interno delle tue opzioni runner, ad esempio:

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

Nel caso in cui utilizzi Stencil con un framework come React o Vue, dovresti mantenere il preset per questi framework.

:::

Puoi quindi avviare i test eseguendo:

```sh
npx wdio run ./wdio.conf.ts
```

## Scrittura dei Test

Dato che hai i seguenti componenti Stencil:

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

Nel tuo test utilizza il metodo `render` da `@wdio/browser-runner/stencil` per collegare il componente alla pagina di test. Per interagire con il componente consigliamo di utilizzare i comandi WebdriverIO in quanto si comportano in modo più simile alle interazioni reali degli utenti, ad esempio:

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

#### Opzioni di Render

Il metodo `render` fornisce le seguenti opzioni:

##### `components`

Un array di componenti da testare. Le classi dei componenti possono essere importate nel file di specifica, quindi il loro riferimento dovrebbe essere aggiunto all'array `component` per essere utilizzato durante il test.

__Tipo:__ `CustomElementConstructor[]`<br />
__Default:__ `[]`

##### `flushQueue`

Se `false`, non svuota la coda di rendering durante la configurazione iniziale del test.

__Tipo:__ `boolean`<br />
__Default:__ `true`

##### `template`

Il JSX iniziale che viene utilizzato per generare il test. Usa `template` quando vuoi inizializzare un componente utilizzando le loro proprietà, anziché i loro attributi HTML. Renderizzerà il template specificato (JSX) in `document.body`.

__Tipo:__ `JSX.Template`

##### `html`

L'HTML iniziale utilizzato per generare il test. Questo può essere utile per costruire una collezione di componenti che lavorano insieme e assegnare attributi HTML.

__Tipo:__ `string`

##### `language`

Imposta l'attributo `lang` simulato su `<html>`.

__Tipo:__ `string`

##### `autoApplyChanges`

Per impostazione predefinita, qualsiasi modifica alle proprietà e agli attributi del componente deve chiamare `env.waitForChanges()` per testare gli aggiornamenti. Come opzione, `autoApplyChanges` svuota continuamente la coda in background.

__Tipo:__ `boolean`<br />
__Default:__ `false`

##### `attachStyles`

Per impostazione predefinita, gli stili non sono collegati al DOM e non si riflettono nell'HTML serializzato. Impostando questa opzione su `true` includerà gli stili del componente nell'output serializzabile.

__Tipo:__ `boolean`<br />
__Default:__ `false`

#### Ambiente di Render

Il metodo `render` restituisce un oggetto ambiente che fornisce determinati helper di utilità per gestire l'ambiente del componente.

##### `flushAll`

Dopo che sono state apportate modifiche a un componente, come un aggiornamento a una proprietà o attributo, la pagina di test non applica automaticamente le modifiche. Per attendere e applicare l'aggiornamento, chiama `await flushAll()`

__Tipo:__ `() => void`

##### `unmount`

Rimuove l'elemento container dal DOM.

__Tipo:__ `() => void`

##### `styles`

Tutti gli stili definiti dai componenti.

__Tipo:__ `Record<string, string>`

##### `container`

Elemento container in cui viene renderizzato il template.

__Tipo:__ `HTMLElement`

##### `$container`

L'elemento container come elemento WebdriverIO.

__Tipo:__ `WebdriverIO.Element`

##### `root`

Il componente root del template.

__Tipo:__ `HTMLElement`

##### `$root`

Il componente root come elemento WebdriverIO.

__Tipo:__ `WebdriverIO.Element`

### `waitForChanges`

Metodo di supporto per attendere che il componente sia pronto.

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

## Aggiornamenti degli Elementi

Se definisci proprietà o stati nel tuo componente Stencil, devi gestire quando queste modifiche devono essere applicate al componente per essere nuovamente renderizzate.


## Esempi

Puoi trovare un esempio completo di una suite di test di componenti WebdriverIO per Stencil nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).