---
id: stencil
title: Stencil
description: "Configura il browser runner di WebdriverIO per i componenti Stencil, esegui il rendering con l'helper render e attendi gli aggiornamenti degli elementi."
---

[Stencil](https://stenciljs.com/) è una libreria per costruire librerie di componenti riutilizzabili e scalabili. Puoi testare i componenti Stencil direttamente in un browser reale utilizzando WebdriverIO e il suo [browser runner](/docs/runner#browser-runner).

## Configurazione

Per configurare WebdriverIO all'interno del tuo progetto Stencil, segui le [istruzioni](/docs/component-testing#set-up) nella nostra documentazione sul component testing. Assicurati di selezionare `stencil` come preset nelle opzioni del runner, ad esempio:

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

## Scrivere i test

Supponendo di avere i seguenti componenti Stencil:

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

Nel tuo test usa il metodo `render` di `@wdio/browser-runner/stencil` per collegare il componente alla pagina di test. Per interagire con il componente consigliamo di utilizzare i comandi WebdriverIO, poiché si comportano in modo più simile alle interazioni reali dell'utente, ad esempio:

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

#### Opzioni di render

Il metodo `render` fornisce le seguenti opzioni:

##### `components`

Un array di componenti da testare. Le classi dei componenti possono essere importate nel file di spec, quindi il loro riferimento deve essere aggiunto all'array `component` per essere utilizzato durante il test.

__Tipo:__ `CustomElementConstructor[]`<br />
__Predefinito:__ `[]`

##### `flushQueue`

Se `false`, non svuota la coda di rendering durante la configurazione iniziale del test.

__Tipo:__ `boolean`<br />
__Predefinito:__ `true`

##### `template`

Il JSX iniziale utilizzato per generare il test. Usa `template` quando vuoi inizializzare un componente utilizzando le sue proprietà, invece dei suoi attributi HTML. Eseguirà il rendering del template specificato (JSX) in `document.body`.

__Tipo:__ `JSX.Template`

##### `html`

L'HTML iniziale utilizzato per generare il test. Può essere utile per costruire una raccolta di componenti che lavorano insieme e assegnare attributi HTML.

__Tipo:__ `string`

##### `language`

Imposta l'attributo `lang` simulato su `<html>`.

__Tipo:__ `string`

##### `autoApplyChanges`

Per impostazione predefinita, qualsiasi modifica alle proprietà e agli attributi del componente richiede `env.waitForChanges()` per testare gli aggiornamenti. In alternativa, `autoApplyChanges` svuota continuamente la coda in background.

__Tipo:__ `boolean`<br />
__Predefinito:__ `false`

##### `attachStyles`

Per impostazione predefinita, gli stili non vengono collegati al DOM e non si riflettono nell'HTML serializzato. Impostando questa opzione su `true`, gli stili del componente verranno inclusi nell'output serializzabile.

__Tipo:__ `boolean`<br />
__Predefinito:__ `false`

#### Ambiente di render

Il metodo `render` restituisce un oggetto ambiente che fornisce alcuni helper di utilità per gestire l'ambiente del componente.

##### `flushAll`

Dopo che sono state apportate modifiche a un componente, come l'aggiornamento di una proprietà o di un attributo, la pagina di test non applica automaticamente le modifiche. Per attendere e applicare l'aggiornamento, chiama `await flushAll()`

__Tipo:__ `() => void`

##### `unmount`

Rimuove l'elemento contenitore dal DOM.

__Tipo:__ `() => void`

##### `styles`

Tutti gli stili definiti dai componenti.

__Tipo:__ `Record<string, string>`

##### `container`

Elemento contenitore in cui viene eseguito il rendering del template.

__Tipo:__ `HTMLElement`

##### `$container`

L'elemento contenitore come elemento WebdriverIO.

__Tipo:__ `WebdriverIO.Element`

##### `root`

Il componente radice del template.

__Tipo:__ `HTMLElement`

##### `$root`

Il componente radice come elemento WebdriverIO.

__Tipo:__ `WebdriverIO.Element`

### `waitForChanges`

Metodo helper per attendere che il componente sia pronto.

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

## Aggiornamenti degli elementi

Se definisci proprietà o stati nel tuo componente Stencil, devi gestire quando queste modifiche devono essere applicate al componente affinché venga eseguito nuovamente il rendering.


## Esempi

Puoi trovare un esempio completo di una suite di test dei componenti WebdriverIO per Stencil nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).