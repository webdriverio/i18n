---
id: stencil
title: Stencil
description: "Konfigurera WebdriverIO:s webbläsarkörare för Stencil-komponenter, rendera dem med render-hjälpfunktionen och vänta på elementuppdateringar."
---

[Stencil](https://stenciljs.com/) är ett bibliotek för att bygga återanvändbara, skalbara komponentbibliotek. Du kan testa Stencil-komponenter direkt i en riktig webbläsare med WebdriverIO och dess [webbläsarkörare](/docs/runner#browser-runner).

## Konfiguration

För att konfigurera WebdriverIO i ditt Stencil-projekt, följ [instruktionerna](/docs/component-testing#set-up) i vår dokumentation om komponenttestning. Se till att välja `stencil` som förinställning i dina runner-alternativ, t.ex.:

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

Om du använder Stencil med ett ramverk som React eller Vue bör du behålla förinställningen för dessa ramverk.

:::

Du kan sedan starta testerna genom att köra:

```sh
npx wdio run ./wdio.conf.ts
```

## Skriva tester

Anta att du har följande Stencil-komponenter:

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

Använd metoden `render` från `@wdio/browser-runner/stencil` i ditt test för att fästa komponenten på testsidan. För att interagera med komponenten rekommenderar vi att du använder WebdriverIO-kommandon eftersom de beter sig mer likt verkliga användarinteraktioner, t.ex.:

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

#### Renderingsalternativ

Metoden `render` erbjuder följande alternativ:

##### `components`

En array med komponenter att testa. Komponentklasser kan importeras till spec-filen, och deras referens ska sedan läggas till i `component`-arrayen för att användas genom hela testet.

__Typ:__ `CustomElementConstructor[]`<br />
__Standard:__ `[]`

##### `flushQueue`

Om `false`, töm inte renderingskön vid den initiala testkonfigurationen.

__Typ:__ `boolean`<br />
__Standard:__ `true`

##### `template`

Den initiala JSX som används för att generera testet. Använd `template` när du vill initiera en komponent med hjälp av dess egenskaper istället för dess HTML-attribut. Den renderar den angivna mallen (JSX) i `document.body`.

__Typ:__ `JSX.Template`

##### `html`

Den initiala HTML som används för att generera testet. Detta kan vara användbart för att konstruera en samling komponenter som samverkar och för att tilldela HTML-attribut.

__Typ:__ `string`

##### `language`

Ställer in det simulerade `lang`-attributet på `<html>`.

__Typ:__ `string`

##### `autoApplyChanges`

Som standard måste alla ändringar av komponentens egenskaper och attribut använda `env.waitForChanges()` för att testa uppdateringarna. Som ett alternativ tömmer `autoApplyChanges` kontinuerligt kön i bakgrunden.

__Typ:__ `boolean`<br />
__Standard:__ `false`

##### `attachStyles`

Som standard fästs inte stilar till DOM och de återspeglas inte i den serialiserade HTML-koden. Om du sätter detta alternativ till `true` inkluderas komponentens stilar i den serialiserbara utdatan.

__Typ:__ `boolean`<br />
__Standard:__ `false`

#### Renderingsmiljö

Metoden `render` returnerar ett miljöobjekt som tillhandahåller vissa hjälpfunktioner för att hantera komponentens miljö.

##### `flushAll`

När ändringar har gjorts i en komponent, till exempel en uppdatering av en egenskap eller ett attribut, tillämpar testsidan inte ändringarna automatiskt. För att vänta på och tillämpa uppdateringen, anropa `await flushAll()`

__Typ:__ `() => void`

##### `unmount`

Tar bort containerelementet från DOM.

__Typ:__ `() => void`

##### `styles`

Alla stilar som definierats av komponenter.

__Typ:__ `Record<string, string>`

##### `container`

Containerelement där mallen renderas.

__Typ:__ `HTMLElement`

##### `$container`

Containerelementet som ett WebdriverIO-element.

__Typ:__ `WebdriverIO.Element`

##### `root`

Mallens rotkomponent.

__Typ:__ `HTMLElement`

##### `$root`

Rotkomponenten som ett WebdriverIO-element.

__Typ:__ `WebdriverIO.Element`

### `waitForChanges`

Hjälpmetod för att vänta på att komponenten ska vara redo.

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

## Elementuppdateringar

Om du definierar egenskaper eller tillstånd i din Stencil-komponent måste du hantera när dessa ändringar ska tillämpas på komponenten för att den ska renderas om.


## Exempel

Du hittar ett fullständigt exempel på en WebdriverIO-testsvit för komponenttestning av Stencil i vårt [exempelrepository](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).