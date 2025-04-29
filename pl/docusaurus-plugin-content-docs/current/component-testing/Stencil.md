---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) to biblioteka do budowania wielokrotnego użytku, skalowalnych bibliotek komponentów. Możesz testować komponenty Stencil bezpośrednio w prawdziwej przeglądarce przy użyciu WebdriverIO i jego [przeglądarki](/docs/runner#browser-runner).

## Konfiguracja

Aby skonfigurować WebdriverIO w projekcie Stencil, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji testowania komponentów. Upewnij się, że wybierzesz `stencil` jako preset w opcjach runnera, np.:

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

W przypadku korzystania z Stencil z frameworkiem takim jak React lub Vue, powinieneś zachować preset dla tych frameworków.

:::

Następnie możesz uruchomić testy, wykonując:

```sh
npx wdio run ./wdio.conf.ts
```

## Pisanie testów

Załóżmy, że masz następujący komponent Stencil:

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

W swoim teście użyj metody `render` z `@wdio/browser-runner/stencil`, aby dołączyć komponent do strony testowej. Do interakcji z komponentem zalecamy używanie poleceń WebdriverIO, ponieważ zachowują się one bardziej jak rzeczywiste interakcje użytkownika, np.:

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

#### Opcje Render

Metoda `render` zapewnia następujące opcje:

##### `components`

Tablica komponentów do testowania. Klasy komponentów można importować do pliku specyfikacji, a następnie dodać ich referencje do tablicy `component`, aby używać ich w teście.

__Typ:__ `CustomElementConstructor[]`<br />
__Wartość domyślna:__ `[]`

##### `flushQueue`

Jeśli `false`, nie opróżniaj kolejki renderowania podczas początkowej konfiguracji testu.

__Typ:__ `boolean`<br />
__Wartość domyślna:__ `true`

##### `template`

Początkowy JSX używany do generowania testu. Użyj `template`, gdy chcesz zainicjować komponent za pomocą jego właściwości, zamiast atrybutów HTML. Renderuje określony szablon (JSX) w `document.body`.

__Typ:__ `JSX.Template`

##### `html`

Początkowy HTML używany do generowania testu. Może to być przydatne do tworzenia kolekcji współpracujących ze sobą komponentów i przypisywania atrybutów HTML.

__Typ:__ `string`

##### `language`

Ustawia symulowany atrybut `lang` na `<html>`.

__Typ:__ `string`

##### `autoApplyChanges`

Domyślnie wszelkie zmiany we właściwościach komponentów i atrybutach muszą używać `env.waitForChanges()` do testowania aktualizacji. Opcjonalnie, `autoApplyChanges` ciągle opróżnia kolejkę w tle.

__Typ:__ `boolean`<br />
__Wartość domyślna:__ `false`

##### `attachStyles`

Domyślnie style nie są dołączane do DOM i nie są odzwierciedlone w serializowanym HTML. Ustawienie tej opcji na `true` spowoduje uwzględnienie stylów komponentu w serializowanym wyjściu.

__Typ:__ `boolean`<br />
__Wartość domyślna:__ `false`

#### Środowisko Render

Metoda `render` zwraca obiekt środowiska, który zapewnia pewne narzędzia pomocnicze do zarządzania środowiskiem komponentu.

##### `flushAll`

Po wprowadzeniu zmian w komponencie, takich jak aktualizacja właściwości lub atrybutu, strona testowa nie stosuje automatycznie zmian. Aby poczekać na zmiany i je zastosować, wywołaj `await flushAll()`

__Typ:__ `() => void`

##### `unmount`

Usuwa element kontenera z DOM.

__Typ:__ `() => void`

##### `styles`

Wszystkie style zdefiniowane przez komponenty.

__Typ:__ `Record<string, string>`

##### `container`

Element kontenera, w którym renderowany jest szablon.

__Typ:__ `HTMLElement`

##### `$container`

Element kontenera jako element WebdriverIO.

__Typ:__ `WebdriverIO.Element`

##### `root`

Główny komponent szablonu.

__Typ:__ `HTMLElement`

##### `$root`

Główny komponent jako element WebdriverIO.

__Typ:__ `WebdriverIO.Element`

### `waitForChanges`

Metoda pomocnicza, która czeka, aż komponent będzie gotowy.

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

## Aktualizacje elementów

Jeśli definiujesz właściwości lub stany w swoim komponencie Stencil, musisz zarządzać, kiedy te zmiany powinny być zastosowane do komponentu, aby został on ponownie renderowany.

## Przykłady

Pełny przykład zestawu testów komponentów WebdriverIO dla Stencil można znaleźć w naszym [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).