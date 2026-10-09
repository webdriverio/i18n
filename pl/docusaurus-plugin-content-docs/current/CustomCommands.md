---
id: customcommands
title: Własne komendy
description: "Dodawaj własne komendy przeglądarki i elementów za pomocą addCommand, nadpisuj istniejące komendy i rozszerzaj definicje typów TypeScript."
---

Jeśli chcesz rozszerzyć instancję `browser` o własny zestaw komend, możesz użyć metody przeglądarki `addCommand`. Komendę możesz napisać w sposób asynchroniczny, tak samo jak w swoich specyfikacjach.

## Parametry

### Nazwa komendy

<Option type="String">

Nazwa, która definiuje komendę i zostanie dołączona do zakresu przeglądarki lub elementu.

</Option>

### Własna funkcja

<Option type="Function">

Funkcja wykonywana po wywołaniu komendy. Zakres `this` to [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) lub `WebdriverIO.BrowsingContext`, w zależności od tego, czy komenda jest dołączana do przeglądarki, do elementów czy do kontekstów przeglądania.

</Option>

### Opcje

Obiekt z opcjami konfiguracyjnymi modyfikującymi zachowanie własnej komendy

#### Zakres docelowy

<Option type="Boolean" default="false" name="attachToElement">

Flaga określająca, czy komenda ma zostać dołączona do zakresu przeglądarki, czy elementu. Jeśli ustawiona na `true`, komenda będzie komendą elementu.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

Flaga dołączająca komendę do każdego kontekstu przeglądania: kart, okien i ramek, które zwracają `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` oraz `context.frame()` w sesji WebDriver BiDi. Nie można jej łączyć z `attachToElement`. Zobacz [Konteksty przeglądania](#browsing-contexts).

</Option>

#### Wyłączenie implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

Flaga określająca, czy przed wywołaniem własnej komendy należy niejawnie czekać, aż element zacznie istnieć.

</Option>

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

Dodatkowo możesz rozszerzyć instancję elementu o własny zestaw komend, ustawiając `attachToElement` na `true`. Zakres (`this`) w tym przypadku to obiekt [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` to wartość zwrócona przez $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Domyślnie własne komendy elementów czekają, aż element zacznie istnieć, zanim zostaną wywołane. Choć zazwyczaj jest to pożądane, w razie potrzeby można to wyłączyć za pomocą `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` to wartość zwrócona przez $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

Własne komendy pozwalają połączyć często używaną sekwencję komend w jedno wywołanie. Możesz definiować własne komendy w dowolnym miejscu zestawu testów; upewnij się tylko, że komenda zostanie zdefiniowana *przed* jej pierwszym użyciem. (Hook `before` w pliku `wdio.conf.js` to dobre miejsce do ich tworzenia.)

Po zdefiniowaniu możesz ich używać w następujący sposób:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Uwaga:__ Jeśli zarejestrujesz własną komendę w zakresie `browser`, nie będzie ona dostępna dla elementów. Podobnie, jeśli zarejestrujesz komendę w zakresie elementu, nie będzie ona dostępna w zakresie `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // wypisuje "function"
console.log(typeof elem.myCustomBrowserCommand()) // wypisuje "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // wypisuje "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // wypisuje "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // wypisuje "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // wypisuje "2"
```

__Uwaga:__ Jeśli potrzebujesz łączyć własną komendę w łańcuch, jej nazwa powinna kończyć się znakiem `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Uważaj, aby nie przeciążyć zakresu `browser` zbyt wieloma własnymi komendami.

Zalecamy definiowanie własnej logiki w [obiektach stron (page objects)](pageobjects), aby była powiązana z konkretną stroną.

### Konteksty przeglądania

W sesji WebDriver BiDi karta, okno i ramka są każde `WebdriverIO.BrowsingContext`. Ustaw `attachToBrowsingContext` na `true`, aby dodać komendę do nich wszystkich. Zakres (`this`) to kontekst, na którym wywołano komendę, a `this.browser` to przeglądarka, do której on należy:

```js
browser.addCommand('heading', async function () {
    // `this` to karta, okno lub ramka
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

Komenda jest dostępna w kontekstach, które już istnieją, oraz w każdym kontekście utworzonym później, w tym w ramkach z innego źródła (origin). Komenda, która ma sens tylko dla karty lub okna, może sprawdzić `this.isFrame`.

Wywołanie `addCommand` i `overwriteCommand` bezpośrednio na kontekście przeglądania rzuca błąd. Rejestruj komendę w przeglądarce.

### Multi-remote

`addCommand` działa w podobny sposób w trybie multi-remote, z tą różnicą, że nowa komenda zostanie przekazana do instancji podrzędnych. Musisz zachować ostrożność przy używaniu obiektu `this`, ponieważ `browser` w trybie multi-remote i jego instancje podrzędne mają różne `this`.

Ten przykład pokazuje, jak dodać nową komendę w trybie multi-remote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` odnosi się do:
    //      - zakresu MultiRemoteBrowser dla przeglądarki
    //      - zakresu Browser dla instancji
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
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

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Rozszerzanie definicji typów

Dzięki TypeScript łatwo jest rozszerzać interfejsy WebdriverIO. Dodaj typy do swoich własnych komend w następujący sposób:

1. Utwórz plik definicji typów (np. `./src/types/wdio.d.ts`)
2. a. Jeśli używasz pliku definicji typów w stylu modułowym (z import/export oraz `declare global WebdriverIO` w pliku definicji typów), upewnij się, że ścieżka do pliku jest uwzględniona we właściwości `include` w `tsconfig.json`.

   b. Jeśli używasz plików definicji typów w stylu ambient (bez import/export w plikach definicji typów oraz z `declare namespace WebdriverIO` dla własnych komend), upewnij się, że `tsconfig.json` *nie* zawiera sekcji `include`, ponieważ spowoduje to, że wszystkie pliki definicji typów niewymienione w sekcji `include` nie zostaną rozpoznane przez TypeScript.

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

3. Dodaj definicje swoich komend zgodnie z wybranym trybem.

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

        interface BrowsingContext {
            contextCustomCommand: (arg: any) => Promise<string>
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

    interface BrowsingContext {
        contextCustomCommand: (arg: any) => Promise<string>
    }
}
```

</TabItem>
</Tabs>

## Integracja bibliotek zewnętrznych

Jeśli korzystasz z zewnętrznych bibliotek (np. do wykonywania zapytań do bazy danych), które obsługują obietnice (promises), dobrym sposobem na ich integrację jest opakowanie wybranych metod API we własną komendę.

Gdy zwracasz obietnicę, WebdriverIO dba o to, aby nie przejść do kolejnej komendy, dopóki obietnica nie zostanie rozwiązana. Jeśli obietnica zostanie odrzucona, komenda rzuci błąd.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Następnie po prostu użyj jej w specyfikacjach testów WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // zwraca treść odpowiedzi
})
```

**Uwaga:** Wynikiem Twojej własnej komendy jest wynik zwracanej przez nią obietnicy.

## Nadpisywanie komend

Możesz także nadpisywać natywne komendy za pomocą `overwriteCommand`.

Nie jest to zalecane, ponieważ może prowadzić do nieprzewidywalnego zachowania frameworka!

Ogólne podejście jest podobne do `addCommand`, jedyną różnicą jest to, że pierwszym argumentem funkcji komendy jest oryginalna funkcja, którą zamierzasz nadpisać. Zobacz kilka przykładów poniżej.

### Nadpisywanie komend przeglądarki

```js
/**
 * Wypisz liczbę milisekund przed pauzą i zwróć jej wartość.
 *
 * @param pause - nazwa komendy do nadpisania
 * @param this of func - oryginalna instancja przeglądarki, na której wywołano funkcję
 * @param originalPauseFunction of func - oryginalna funkcja pause
 * @param ms of func - faktycznie przekazane parametry
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// następnie używaj jej jak wcześniej
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Nadpisywanie komend elementów

Nadpisywanie komend na poziomie elementu wygląda niemal tak samo. Ustaw `attachToElement` na `true`:

```js
/**
 * Spróbuj przewinąć do elementu, jeśli nie jest klikalny.
 * Przekaż { force: true }, aby kliknąć za pomocą JS, nawet jeśli element nie jest widoczny lub klikalny.
 * Pokazuje, że typ argumentu oryginalnej funkcji można zachować za pomocą `options?: ClickOptions`
 *
 * @param this of func - element, na którym wywołano oryginalną funkcję
 * @param originalClickFunction of func - oryginalna funkcja pause
 * @param options of func - faktycznie przekazane parametry
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
    { attachToElement: true }, // Nie zapomnij dołączyć jej do elementu
)

// następnie używaj jej jak wcześniej
const elem = await $('body')
await elem.click()

// lub przekaż parametry
await elem.click({ force: true })
```

### Nadpisywanie komend kontekstów przeglądania

Ustaw `attachToBrowsingContext` na `true`, aby nadpisać wbudowaną lub własną komendę każdej karty, okna i ramki. Oryginalna komenda jest powiązana z kontekstem, na którym została wywołana:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## Dodawanie kolejnych komend WebDriver

Jeśli korzystasz z protokołu WebDriver i uruchamiasz testy na platformie obsługującej dodatkowe komendy, które nie są zdefiniowane w żadnej z definicji protokołów w [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), możesz dodać je ręcznie za pomocą interfejsu `addCommand`. Pakiet `webdriver` udostępnia wrapper komend, który pozwala rejestrować te nowe endpointy w taki sam sposób jak inne komendy, zapewniając te same mechanizmy sprawdzania parametrów i obsługi błędów. Aby zarejestrować nowy endpoint, zaimportuj wrapper komend i zarejestruj za jego pomocą nową komendę w następujący sposób:

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

Wywołanie tej komendy z nieprawidłowymi parametrami skutkuje taką samą obsługą błędów jak w przypadku predefiniowanych komend protokołu, np.:

```js
// wywołanie komendy bez wymaganego parametru url i danych (payload)
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

Poprawne wywołanie komendy, np. `browser.myNewCommand('foo', 'bar')`, prawidłowo wysyła żądanie WebDriver na przykład do `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` z danymi (payload) w postaci `{ foo: 'bar' }`.

:::note
Parametr url `:sessionId` zostanie automatycznie zastąpiony identyfikatorem sesji WebDriver. Można stosować inne parametry url, ale muszą one zostać zdefiniowane w `variables`.
:::

Przykłady definiowania komend protokołu znajdziesz w pakiecie [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).