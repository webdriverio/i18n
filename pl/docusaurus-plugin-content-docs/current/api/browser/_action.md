---
id: action
title: action
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

Komenda action jest interfejsem niskiego poziomu do dostarczania wirtualizowanych działań urządzenia wejściowego do przeglądarki internetowej.

Oprócz poleceń wysokopoziomowych takich jak `scrollIntoView`, `doubleClick`, API Akcji zapewnia szczegółową kontrolę nad tym, co mogą robić wyznaczone urządzenia wejściowe. WebdriverIO udostępnia interfejs dla 3 rodzajów źródeł wejściowych:

- wejście klawiszowe dla urządzeń klawiatury
- wejście wskaźnikowe dla myszy, pióra lub urządzeń dotykowych
- oraz wejścia kółka dla urządzeń z kółkiem przewijania

Każdy łańcuch poleceń akcji musi zostać zakończony wywołaniem `perform`, aby uruchomić zestaw akcji. Powoduje to [zwolnienie akcji](https://w3c.github.io/webdriver/#release-actions) i wyzwolenie zdarzeń. Możesz to pominąć, przekazując `true` (np. `browser.actions(...).perform(true)`).

:::info

Wsparcie dla tego polecenia i konkretnych akcji może się różnić w zależności od środowiska. Postęp prac można śledzić na [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned).
Dla urządzeń mobilnych możesz skorzystać z poleceń gestów specyficznych dla Appium na [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch) i [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands).

:::

### Źródło wejściowe klawiatury

Źródło wejściowe klawiatury jest źródłem wejściowym, które jest powiązane z urządzeniem typu klawiatura. Można je uruchomić używając parametru typu `key`, np.:

```ts
browser.action('key')
```

Zwraca obiekt `KeyAction`, który obsługuje następujące akcje:

- `down(value: string)`: generuje akcję wciśnięcia klawisza
- `up(value: string)`: generuje akcję zwolnienia klawisza
- `pause(ms: number)`: wskazuje, że źródło wejściowe nic nie robi podczas konkretnego cyklu

#### Znaki specjalne

Jeśli chcesz używać znaków specjalnych, takich jak np. `Control`, `Page Up` lub `Shift`, upewnij się, że importujesz obiekt [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417) z pakietu `webdriverio` w następujący sposób:

```ts
import { Key } from 'webdriverio'
```

Obiekt ten pozwala na dostęp do reprezentacji unicode żądanego znaku specjalnego.

### Źródło wejściowe wskaźnika

Źródło wejściowe wskaźnika jest źródłem wejściowym, które jest powiązane z urządzeniem typu wskaźnik. Typ można określić podczas wywoływania polecenia `action`, np.:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" jest wartością domyślną, możliwe również: "pen" lub "touch"
})
```

Zwraca obiekt `PointerAction`, który obsługuje następujące akcje:

- `down (button: 'left' | 'middle' | 'right')`: tworzy akcję naciśnięcia pojedynczego klawisza
- `down (params: PointerActionParams)`: tworzy akcję naciśnięcia pojedynczego klawisza z szczegółowymi parametrami
- `move (x: number, y: number)`: Tworzy akcję przesunięcia wskaźnika o `x` i `y` pikseli od widoku
- `move (params: PointerActionMoveParams)`: Tworzy akcję przesunięcia wskaźnika o `x` i `y` pikseli od określonego `origin`. `origin` może być zdefiniowane jako aktualna pozycja wskaźnika (np. "pointer"), widok (np. "viewport") lub środek określonego elementu.
- `up (button: 'left' | 'middle' | 'right')`: tworzy akcję zwolnienia pojedynczego klawisza
- `up (params: PointerActionUpParams)`: tworzy akcję zwolnienia pojedynczego klawisza z szczegółowymi parametrami
- `cancel()`: Akcja, która anuluje bieżące wejście tego wskaźnika.
- `pause(ms: number)`: wskazuje, że źródło wejściowe nic nie robi podczas konkretnego cyklu

Szczegółowe informacje na temat typów parametrów [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) i [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19) można znaleźć w definicji typów projektu.

### Źródło wejściowe kółka

Źródło wejściowe kółka jest źródłem wejściowym, które jest powiązane z urządzeniem typu kółko.

```ts
browser.action('wheel')
```

Zwraca obiekt `WheelAction`, który obsługuje następujące akcje:

- `scroll (params: ScrollParams)`: przewija stronę do podanych współrzędnych lub początku
- `pause(ms: number)`: wskazuje, że źródło wejściowe nic nie robi podczas konkretnego cyklu

Szczegółowe informacje na temat typu parametru [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) można znaleźć w definicji typów projektu.

##### Użycie

```js
browser.action()
```

##### Przykłady

```js title="pointer-action.js"
it('drag and drop using pointer action command', async () => {
    const origin = await $('#source')
    const targetOrigin = await $('#target')

    return browser.action('pointer')
        .move({ duration: 0, origin, x: 0, y: 0 })
        .down({ button: 0 }) // left button
        .pause(10)
        .move({ duration: 0, origin: targetOrigin })
        .up({ button: 0 })
        .perform()
});
```

```js title="key-action.js"
import { Key } from 'webdriverio'

it('should emit key events using key action commands', async () => {
    const elem = await $('input')
    await elem.click() // make element active

    await browser.action('key')
        .down('f')
        .down('o')
        .down('o')
        .up('f')
        .up('o')
        .up('o')
        .perform()

    console.log(await elem.getValue()) // returns "foo"

    // copy value out of input element
    await browser.action('key')
        .down(Key.Ctrl).down('c')
        .pause(10)
        .up(Key.Ctrl).up('c')
        .perform()
})
```

```js title="wheel-action.js"
it('should scroll using wheel action commands', async () => {
    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform()
    console.log(await browser.execute(() => window.scrollY)) // returns 500
})
```