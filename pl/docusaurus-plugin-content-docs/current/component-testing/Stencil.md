---
id: stencil
title: Stencil
description: "Skonfiguruj browser runner WebdriverIO dla komponentów Stencil, renderuj je za pomocą funkcji pomocniczej render i czekaj na aktualizacje elementów."
---

[Stencil](https://stenciljs.com/) to biblioteka do tworzenia wielokrotnego użytku, skalowalnych bibliotek komponentów. Możesz testować komponenty Stencil bezpośrednio w prawdziwej przeglądarce, korzystając z WebdriverIO i jego [browser runnera](/docs/runner#browser-runner).

## Konfiguracja

Aby skonfigurować WebdriverIO w swoim projekcie Stencil, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji dotyczącej testowania komponentów. Upewnij się, że w opcjach runnera wybrałeś `stencil` jako preset, np.:

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

Jeśli używasz Stencil z frameworkiem takim jak React lub Vue, powinieneś zachować preset dla tych frameworków.

:::

Następnie możesz uruchomić testy, wykonując:

```sh
npx wdio run ./wdio.conf.ts
```

## Pisanie testów

Załóżmy, że masz następujące komponenty Stencil:

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

W swoim teście użyj metody `render` z `@wdio/browser-runner/stencil`, aby dołączyć komponent do strony testowej. Do interakcji z komponentem zalecamy używanie poleceń WebdriverIO, ponieważ zachowują się one bardziej podobnie do rzeczywistych interakcji użytkownika, np.:

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

#### Opcje renderowania

Metoda `render` udostępnia następujące opcje:

##### `components`

Tablica komponentów do przetestowania. Klasy komponentów można zaimportować do pliku spec, a następnie dodać ich referencje do tablicy `component`, aby mogły być używane w całym teście.

__Typ:__ `CustomElementConstructor[]`<br />
__Domyślnie:__ `[]`

##### `flushQueue`

Jeśli ustawione na `false`, kolejka renderowania nie jest opróżniana podczas początkowej konfiguracji testu.

__Typ:__ `boolean`<br />
__Domyślnie:__ `true`

##### `template`

Początkowy JSX używany do wygenerowania testu. Użyj `template`, gdy chcesz zainicjalizować komponent za pomocą jego właściwości zamiast atrybutów HTML. Renderuje on określony szablon (JSX) do `document.body`.

__Typ:__ `JSX.Template`

##### `html`

Początkowy HTML używany do wygenerowania testu. Może to być przydatne do zbudowania kolekcji współpracujących ze sobą komponentów i przypisania atrybutów HTML.

__Typ:__ `string`

##### `language`

Ustawia zamockowany atrybut `lang` na elemencie `<html>`.

__Typ:__ `string`

##### `autoApplyChanges`

Domyślnie wszelkie zmiany właściwości i atrybutów komponentu wymagają wywołania `env.waitForChanges()`, aby przetestować aktualizacje. Opcjonalnie `autoApplyChanges` stale opróżnia kolejkę w tle.

__Typ:__ `boolean`<br />
__Domyślnie:__ `false`

##### `attachStyles`

Domyślnie style nie są dołączane do DOM i nie są odzwierciedlane w serializowanym HTML. Ustawienie tej opcji na `true` spowoduje uwzględnienie stylów komponentu w serializowanym wyniku.

__Typ:__ `boolean`<br />
__Domyślnie:__ `false`

#### Środowisko renderowania

Metoda `render` zwraca obiekt środowiska, który udostępnia pewne funkcje pomocnicze do zarządzania środowiskiem komponentu.

##### `flushAll`

Po wprowadzeniu zmian w komponencie, takich jak aktualizacja właściwości lub atrybutu, strona testowa nie stosuje zmian automatycznie. Aby poczekać na aktualizację i ją zastosować, wywołaj `await flushAll()`

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

Metoda pomocnicza do oczekiwania, aż komponent będzie gotowy.

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

Jeśli definiujesz właściwości lub stany w swoim komponencie Stencil, musisz zarządzać tym, kiedy te zmiany mają zostać zastosowane, aby komponent został ponownie wyrenderowany.


## Przykłady

Pełny przykład zestawu testów komponentów WebdriverIO dla Stencil znajdziesz w naszym [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).