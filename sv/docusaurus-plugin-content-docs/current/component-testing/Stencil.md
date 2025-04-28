---
id: stencil
title: Stencil
description: 
---

[Stencil](https://stenciljs.com/) är ett bibliotek för att bygga återanvändbara, skalbara komponentbibliotek. Du kan testa Stencil-komponenter direkt i en riktig webbläsare med hjälp av WebdriverIO och dess [webbläsarkörning](/docs/runner#browser-runner).

## Installation

För att konfigurera WebdriverIO inom ditt Stencil-projekt, följ [instruktionerna](/docs/component-testing#set-up) i våra komponenttestningsdokument. Se till att välja `stencil` som förinställning inom dina köralternativ, t.ex.:

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

Antag att du har följande Stencil-komponenter:

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

I ditt test, använd `render`-metoden från `@wdio/browser-runner/stencil` för att fästa komponenten på testsidan. För att interagera med komponenten rekommenderar vi att använda WebdriverIO-kommandon eftersom de beter sig närmare faktiska användarinteraktioner, t.ex.:

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

#### Render-alternativ

`render`-metoden erbjuder följande alternativ:

##### `components`

En array av komponenter att testa. Komponentklasser kan importeras till spec-filen, sedan bör deras referens läggas till i `component`-arrayen för att användas genom hela testet.

__Type:__ `CustomElementConstructor[]`<br />
__Default:__ `[]`

##### `flushQueue`

Om `false`, spola inte renderingskön vid den initiala testuppsättningen.

__Type:__ `boolean`<br />
__Default:__ `true`

##### `template`

Den initiala JSX som används för att generera testet. Använd `template` när du vill initiera en komponent med dess egenskaper, istället för dess HTML-attribut. Den kommer att rendera den angivna mallen (JSX) i `document.body`.

__Type:__ `JSX.Template`

##### `html`

Den initiala HTML som används för att generera testet. Detta kan vara användbart för att konstruera en samling komponenter som arbetar tillsammans och tilldela HTML-attribut.

__Type:__ `string`

##### `language`

Ställer in det simulerade `lang`-attributet på `<html>`.

__Type:__ `string`

##### `autoApplyChanges`

Som standard måste alla ändringar i komponentegenskaper och attribut använda `env.waitForChanges()` för att testa uppdateringarna. Som ett alternativ spolar `autoApplyChanges` kontinuerligt kön i bakgrunden.

__Type:__ `boolean`<br />
__Default:__ `false`

##### `attachStyles`

Som standard kopplas inte stilar till DOM och de återspeglas inte i den serialiserade HTML:en. Genom att ställa in detta alternativ till `true` inkluderas komponentens stilar i den serialiserbara utdata.

__Type:__ `boolean`<br />
__Default:__ `false`

#### Render-miljö

`render`-metoden returnerar ett miljöobjekt som tillhandahåller vissa hjälpverktyg för att hantera komponentens miljö.

##### `flushAll`

Efter att ändringar har gjorts i en komponent, som en uppdatering av en egenskap eller attribut, tillämpar testsidan inte automatiskt ändringarna. För att vänta på och tillämpa uppdateringen, anropa `await flushAll()`

__Type:__ `() => void`

##### `unmount`

Tar bort behållarelementet från DOM.

__Type:__ `() => void`

##### `styles`

Alla stilar definierade av komponenter.

__Type:__ `Record<string, string>`

##### `container`

Behållarelement där mallen renderas.

__Type:__ `HTMLElement`

##### `$container`

Behållarelementet som ett WebdriverIO-element.

__Type:__ `WebdriverIO.Element`

##### `root`

Rotkomponenten för mallen.

__Type:__ `HTMLElement`

##### `$root`

Rotkomponenten som ett WebdriverIO-element.

__Type:__ `WebdriverIO.Element`

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

Om du definierar egenskaper eller tillstånd i din Stencil-komponent måste du hantera när dessa ändringar ska tillämpas på komponenten för att renderas om.

## Exempel

Du kan hitta ett komplett exempel på en WebdriverIO-komponenttestsvit för Stencil i vårt [exempelförvar](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).