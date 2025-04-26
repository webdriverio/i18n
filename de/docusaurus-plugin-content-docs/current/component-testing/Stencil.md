---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) ist eine Bibliothek zum Erstellen wiederverwendbarer, skalierbarer Komponentenbibliotheken. Sie können Stencil-Komponenten direkt in einem echten Browser mit WebdriverIO und seinem [Browser-Runner](/docs/runner#browser-runner) testen.

## Einrichtung

Um WebdriverIO in Ihrem Stencil-Projekt einzurichten, folgen Sie den [Anweisungen](/docs/component-testing#set-up) in unserer Komponententest-Dokumentation. Stellen Sie sicher, dass Sie `stencil` als Preset in Ihren Runner-Optionen auswählen, z.B.:

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

Falls Sie Stencil mit einem Framework wie React oder Vue verwenden, sollten Sie das Preset für diese Frameworks beibehalten.

:::

Sie können dann die Tests starten, indem Sie Folgendes ausführen:

```sh
npx wdio run ./wdio.conf.ts
```

## Tests schreiben

Angenommen, Sie haben die folgende Stencil-Komponente:

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

Verwenden Sie in Ihrem Test die `render`-Methode aus `@wdio/browser-runner/stencil`, um die Komponente an die Testseite anzuhängen. Um mit der Komponente zu interagieren, empfehlen wir die Verwendung von WebdriverIO-Befehlen, da diese sich näher an tatsächlichen Benutzerinteraktionen orientieren, z.B.:

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

#### Render-Optionen

Die `render`-Methode bietet folgende Optionen:

##### `components`

Ein Array von zu testenden Komponenten. Komponentenklassen können in die Spec-Datei importiert werden, dann sollte ihre Referenz zum `component`-Array hinzugefügt werden, um im gesamten Test verwendet zu werden.

__Typ:__ `CustomElementConstructor[]`<br />
__Standard:__ `[]`

##### `flushQueue`

Wenn `false`, wird die Render-Warteschlange bei der initialen Testeinrichtung nicht geleert.

__Typ:__ `boolean`<br />
__Standard:__ `true`

##### `template`

Das anfängliche JSX, das zur Generierung des Tests verwendet wird. Verwenden Sie `template`, wenn Sie eine Komponente mit ihren Eigenschaften initialisieren möchten, anstatt mit ihren HTML-Attributen. Es rendert das angegebene Template (JSX) in `document.body`.

__Typ:__ `JSX.Template`

##### `html`

Das anfängliche HTML, das zur Generierung des Tests verwendet wird. Dies kann nützlich sein, um eine Sammlung von zusammenarbeitenden Komponenten zu erstellen und HTML-Attribute zuzuweisen.

__Typ:__ `string`

##### `language`

Setzt das simulierte `lang`-Attribut auf `<html>`.

__Typ:__ `string`

##### `autoApplyChanges`

Standardmäßig müssen alle Änderungen an Komponenteneigenschaften und -attributen `env.waitForChanges()` abwarten, um die Aktualisierungen zu testen. Optional leert `autoApplyChanges` kontinuierlich die Warteschlange im Hintergrund.

__Typ:__ `boolean`<br />
__Standard:__ `false`

##### `attachStyles`

Standardmäßig werden Stile nicht an das DOM angehängt und sie werden nicht in der serialisierten HTML-Ausgabe angezeigt. Wenn Sie diese Option auf `true` setzen, werden die Stile der Komponente in die serialisierbare Ausgabe aufgenommen.

__Typ:__ `boolean`<br />
__Standard:__ `false`

#### Render-Umgebung

Die `render`-Methode gibt ein Umgebungsobjekt zurück, das bestimmte Hilfsfunktionen zur Verwaltung der Komponentenumgebung bereitstellt.

##### `flushAll`

Nachdem Änderungen an einer Komponente vorgenommen wurden, wie z.B. eine Aktualisierung einer Eigenschaft oder eines Attributs, wendet die Testseite die Änderungen nicht automatisch an. Um auf die Aktualisierung zu warten und sie anzuwenden, rufen Sie `await flushAll()` auf.

__Typ:__ `() => void`

##### `unmount`

Entfernt das Container-Element aus dem DOM.

__Typ:__ `() => void`

##### `styles`

Alle von Komponenten definierten Stile.

__Typ:__ `Record<string, string>`

##### `container`

Container-Element, in dem das Template gerendert wird.

__Typ:__ `HTMLElement`

##### `$container`

Das Container-Element als WebdriverIO-Element.

__Typ:__ `WebdriverIO.Element`

##### `root`

Die Wurzelkomponente des Templates.

__Typ:__ `HTMLElement`

##### `$root`

Die Wurzelkomponente als WebdriverIO-Element.

__Typ:__ `WebdriverIO.Element`

### `waitForChanges`

Hilfsmethode, um zu warten, bis die Komponente bereit ist.

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

## Element-Aktualisierungen

Wenn Sie Eigenschaften oder Zustände in Ihrer Stencil-Komponente definieren, müssen Sie verwalten, wann diese Änderungen auf die Komponente angewendet werden sollen, damit sie neu gerendert wird.


## Beispiele

Ein vollständiges Beispiel einer WebdriverIO-Komponententestsuite für Stencil finden Sie in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).