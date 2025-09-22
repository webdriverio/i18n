---
id: customcommands
title: Niestandardowe Komendy
---

Jeśli chcesz rozszerzyć instancję `browser` o własny zestaw komend, metoda przeglądarki `addCommand` jest do Twojej dyspozycji. Możesz napisać swoją komendę w sposób asynchroniczny, tak jak w swoich specyfikacjach testowych.

## Parametry

### Nazwa komendy

Nazwa, która definiuje komendę i zostanie dołączona do przeglądarki lub zakresu elementu.

Typ: `String`

### Funkcja niestandardowa

Funkcja, która jest wykonywana, gdy komenda jest wywoływana. Zakres `this` to albo [`WebdriverIO.Browser`](/docs/api/browser) albo [`WebdriverIO.Element`](/docs/api/element) w zależności od tego, czy komenda jest dołączana do zakresu przeglądarki czy elementu.

Typ: `Function`

### Opcje

Obiekt z opcjami konfiguracji modyfikującymi zachowanie niestandardowej komendy

#### Zakres docelowy

Flaga decydująca, czy dołączyć komendę do zakresu przeglądarki, czy elementu. Jeśli ustawiona na `true`, komenda będzie komendą elementu.

Nazwa opcji: `attachToElement`
Typ: `Boolean`<br />
Domyślnie: `false`

#### Wyłączenie implicitWait

Flaga decydująca, czy automatycznie czekać na istnienie elementu przed wywołaniem niestandardowej komendy.

Nazwa opcji: `disableElementImplicitWait`
Typ: `Boolean`<br />
Domyślnie: `false`

## Przykłady

Ten przykład pokazuje, jak dodać nową komendę, która zwraca bieżący URL i tytuł jako jeden wynik. Zakres (`this`) to obiekt [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` odnosi się do zakresu `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Dodatkowo możesz rozszerzyć instancję elementu o własny zestaw komend, przekazując `true` jako ostatni argument. Zakres (`this`) w tym przypadku to obiekt [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` to wartość zwracana przez $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Domyślnie niestandardowe komendy elementów czekają na istnienie elementu przed wywołaniem niestandardowej komendy. Mimo że najczęściej jest to pożądane, można to wyłączyć za pomocą `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` to wartość zwracana przez $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Niestandardowe komendy dają możliwość połączenia konkretnej sekwencji komend, których często używasz, w jedno wywołanie. Możesz definiować niestandardowe komendy w dowolnym momencie zestawu testów; po prostu upewnij się, że komenda jest zdefiniowana *przed* jej pierwszym użyciem. (Hook `before` w pliku `wdio.conf.js` to dobre miejsce do ich tworzenia.)

Po zdefiniowaniu możesz używać ich w następujący sposób:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Uwaga:__ Jeśli zarejestrujesz niestandardową komendę w zakresie `browser`, komenda nie będzie dostępna dla elementów. Podobnie, jeśli zarejestrujesz komendę w zakresie elementu, nie będzie ona dostępna w zakresie `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // wyświetla "function"
console.log(typeof elem.myCustomBrowserCommand()) // wyświetla "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // wyświetla "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // wyświetla "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // wyświetla "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // wyświetla "2"
```

__Uwaga:__ Jeśli potrzebujesz łączyć niestandardową komendę, komenda powinna kończyć się znakiem `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Uważaj, aby nie przeciążyć zakresu `browser` zbyt wieloma niestandardowymi komendami.

Zalecamy definiowanie niestandardowej logiki w [obiektach stron](pageobjects), dzięki czemu są one związane z określoną stroną.

### Multiremote

`addCommand` działa podobnie dla multiremote, z tą różnicą, że nowa komenda będzie propagowana do instancji potomnych. Musisz uważać przy używaniu obiektu `this`, ponieważ multiremote `browser` i jego instancje potomne mają różne `this`.

Ten przykład pokazuje, jak dodać nową komendę dla multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` odnosi się do:
    //      - zakresu MultiRemoteBrowser dla przeglądarki
    //      - zakresu Browser dla instancji
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Rozszerzanie definicji typów

Z TypeScript łatwo jest rozszerzać interfejsy WebdriverIO. Dodaj typy do swoich niestandardowych komend w następujący sposób:

1. Utwórz plik definicji typów (np. `./src/types/wdio.d.ts`)
2. a. Jeśli używasz pliku definicji typów w stylu modułowym (z import/export i `declare global WebdriverIO` w pliku definicji typów), upewnij się, że ścieżka do pliku jest uwzględniona we właściwości `include` pliku `tsconfig.json`.

   b. Jeśli używasz plików definicji typów w stylu ambient (brak import/export w plikach definicji typów i `declare namespace WebdriverIO` dla niestandardowych komend), upewnij się, że `tsconfig.json` *nie* zawiera żadnej sekcji `include`, ponieważ spowoduje to, że wszystkie pliki definicji typów niewymienione w sekcji `include` nie będą rozpoznawane przez TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. Dodaj definicje swoich komend zgodnie z trybem wykonania.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }
}
```

</TabItem>
</Tabs>

## Integracja bibliotek zewnętrznych

Jeśli używasz bibliotek zewnętrznych (np. do wykonywania zapytań do bazy danych), które obsługują obietnice (promises), dobrym podejściem do ich integracji jest opakowanie określonych metod API w niestandardową komendę.

Zwracając obietnicę, WebdriverIO zapewnia, że nie kontynuuje wykonywania następnej komendy, dopóki obietnica nie zostanie rozwiązana. Jeśli obietnica zostanie odrzucona, komenda zgłosi błąd.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Następnie wystarczy użyć jej w specyfikacjach testów WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // zwraca treść odpowiedzi
})
```

**Uwaga:** Wynikiem niestandardowej komendy jest wynik zwracanej przez ciebie obietnicy.

## Nadpisywanie komend

Możesz również nadpisywać natywne komendy za pomocą `overwriteCommand`.

Nie jest to zalecane, ponieważ może prowadzić do nieprzewidywalnego zachowania frameworka!

Ogólne podejście jest podobne do `addCommand`, jedyną różnicą jest to, że pierwszym argumentem w funkcji komendy jest oryginalna funkcja, którą zamierzasz nadpisać. Zobacz przykłady poniżej.

### Nadpisywanie komend przeglądarki

```js
/**
 * Wyświetl milisekundy przed pauzą i zwróć ich wartość.
 * 
 * @param pause - nazwa komendy do nadpisania
 * @param this of func - oryginalna instancja przeglądarki, na której wywołano funkcję
 * @param originalPauseFunction of func - oryginalna funkcja pauzy
 * @param ms of func - rzeczywiste przekazane parametry
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// następnie użyj jak poprzednio
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Nadpisywanie komend elementu

Nadpisywanie komend na poziomie elementu jest prawie takie samo. Po prostu przekaż `true` jako trzeci argument do `overwriteCommand`:

```js
/**
 * Próba przewinięcia do elementu, jeśli nie jest klikalny.
 * Przekaż { force: true }, aby kliknąć za pomocą JS, nawet jeśli element nie jest widoczny lub klikalny.
 * Pokazuje, że typ argumentu oryginalnej funkcji może być zachowany z `options?: ClickOptions`
 *
 * @param this of func - element, na którym wywołano oryginalną funkcję
 * @param originalClickFunction of func - oryginalna funkcja pauzy
 * @param options of func - rzeczywiste przekazane parametry
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // próba kliknięcia
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // przewiń do elementu i kliknij ponownie
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // kliknięcie za pomocą js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Nie zapomnij dołączyć tego do elementu
)

// następnie użyj jak poprzednio
const elem = await $('body')
await elem.click()

// lub przekaż parametry
await elem.click({ force: true })
```

## Dodawanie większej liczby komend WebDriver

Jeśli używasz protokołu WebDriver i uruchamiasz testy na platformie, która obsługuje dodatkowe komendy niezdefiniowane w definicjach protokołów w [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), możesz ręcznie dodać je za pomocą interfejsu `addCommand`. Pakiet `webdriver` oferuje wrapper komend, który pozwala zarejestrować te nowe endpointy w taki sam sposób jak inne komendy, zapewniając te same kontrole parametrów i obsługę błędów. Aby zarejestrować ten nowy endpoint, zaimportuj wrapper komend i zarejestruj nową komendę w następujący sposób:

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

Wywołanie tej komendy z nieprawidłowymi parametrami powoduje taką samą obsługę błędów jak predefiniowane komendy protokołu, np.:

```js
// wywołanie komendy bez wymaganego parametru URL i ładunku
await browser.myNewCommand()

/**
 * skutkuje następującym błędem:
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

Poprawne wywołanie komendy, np. `browser.myNewCommand('foo', 'bar')`, poprawnie wykonuje żądanie WebDriver do np. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` z ładunkiem typu `{ foo: 'bar' }`.

:::note
Parametr URL `:sessionId` zostanie automatycznie zastąpiony identyfikatorem sesji WebDriver. Inne parametry URL mogą być zastosowane, ale muszą być zdefiniowane w `variables`.
:::

Zobacz przykłady definicji komend protokołu w pakiecie [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).