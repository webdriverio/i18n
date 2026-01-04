---
id: customcommands
title: Własne Komendy
---

Jeśli chcesz rozszerzyć instancję `browser` o własne zestaw komend, metoda przeglądarki `addCommand` jest dla Ciebie. Możesz napisać swoje komendy w sposób asynchroniczny, tak jak w specyfikacjach.

## Parametry

### Nazwa Komendy

Nazwa definiująca komendę, która zostanie dołączona do zakresu przeglądarki lub elementu.

Typ: `String`

### Funkcja Niestandardowa

Funkcja, która jest wykonywana, gdy komenda jest wywoływana. Zakres `this` to albo [`WebdriverIO.Browser`](/docs/api/browser) albo [`WebdriverIO.Element`](/docs/api/element), w zależności od tego, czy komenda zostanie dołączona do zakresu przeglądarki czy elementu.

Typ: `Function`

### Opcje

Obiekt z opcjami konfiguracyjnymi modyfikującymi zachowanie niestandardowej komendy

#### Zakres Docelowy

Flaga decydująca o tym, czy dołączyć komendę do zakresu przeglądarki czy elementu. Jeśli ustawiono na `true`, komenda będzie komendą elementu.

Nazwa opcji: `attachToElement`
Typ: `Boolean`<br />
Domyślnie: `false`

#### Wyłączenie implicitWait

Flaga decydująca o tym, czy implicite czekać na istnienie elementu przed wywołaniem niestandardowej komendy.

Nazwa opcji: `disableElementImplicitWait`
Typ: `Boolean`<br />
Domyślnie: `false`

## Przykłady

Ten przykład pokazuje, jak dodać nową komendę, która zwraca aktualny URL i tytuł jako jeden wynik. Zakres (`this`) to obiekt [`WebdriverIO.Browser`](/docs/api/browser).

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
    // `this` jest wartością zwracaną przez $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Domyślnie niestandardowe komendy elementu czekają na istnienie elementu przed wywołaniem niestandardowej komendy. Mimo że często jest to pożądane, można to wyłączyć za pomocą `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` jest wartością zwracaną przez $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Niestandardowe komendy dają Ci możliwość pakowania określonej sekwencji komend, których często używasz, jako jedno wywołanie. Możesz definiować niestandardowe komendy w dowolnym momencie w swojej zestawie testów; upewnij się tylko, że komenda jest zdefiniowana *przed* jej pierwszym użyciem. (Hook `before` w Twoim `wdio.conf.js` jest dobrym miejscem na ich utworzenie.)

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

Uważaj, aby nie przeciążać zakresu `browser` zbyt wieloma niestandardowymi komendami.

Zalecamy definiowanie niestandardowej logiki w [obiektach stron](pageobjects), aby były one powiązane z określoną stroną.

### Multiremote

`addCommand` działa podobnie dla multiremote, z tą różnicą, że nowa komenda będzie propagowana w dół do instancji podrzędnych. Musisz uważać przy używaniu obiektu `this`, ponieważ multiremote `browser` i jego instancje potomne mają różne `this`.

Ten przykład pokazuje, jak dodać nową komendę dla multiremote.

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

## Rozszerzanie Definicji Typów

Z TypeScript łatwo jest rozszerzyć interfejsy WebdriverIO. Dodaj typy do swoich niestandardowych komend w następujący sposób:

1. Utwórz plik definicji typu (np. `./src/types/wdio.d.ts`)
2. a. W przypadku korzystania z pliku definicji typu w stylu modułowym (używając import/export i `declare global WebdriverIO` w pliku definicji typu), upewnij się, że ścieżka do pliku jest zawarta we właściwości `include` pliku `tsconfig.json`.

   b. W przypadku korzystania z plików definicji typów w stylu otoczenia (bez import/export w plikach definicji typów i `declare namespace WebdriverIO` dla niestandardowych poleceń), upewnij się, że `tsconfig.json` *nie* zawiera żadnej sekcji `include`, ponieważ spowoduje to, że wszystkie pliki definicji typów niewymienione w sekcji `include` nie będą rozpoznawane przez TypeScript.

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

3. Dodaj definicje dla swoich poleceń zgodnie z trybem wykonania.

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

## Integracja Bibliotek Zewnętrznych

Jeśli korzystasz z zewnętrznych bibliotek (np. do wywołań bazy danych), które obsługują obietnice (promises), dobrym podejściem do integracji jest zawinięcie określonych metod API w niestandardową komendę.

Gdy zwracasz obietnicę, WebdriverIO upewnia się, że nie przejdzie do następnej komendy, dopóki obietnica nie zostanie rozwiązana. Jeśli obietnica zostanie odrzucona, komenda wyrzuci błąd.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Następnie po prostu użyj go w swoich specyfikacjach testowych WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // zwraca treść odpowiedzi
})
```

**Uwaga:** Rezultatem twojej niestandardowej komendy jest wynik obietnicy, którą zwracasz.

## Nadpisywanie Komend

Możesz również nadpisywać natywne komendy za pomocą `overwriteCommand`.

Nie zaleca się tego, ponieważ może to prowadzić do nieprzewidywalnego zachowania frameworka!

Ogólne podejście jest podobne do `addCommand`, jedyną różnicą jest to, że pierwszym argumentem w funkcji komendy jest oryginalna funkcja, którą zamierzasz nadpisać. Proszę zobaczyć kilka przykładów poniżej.

### Nadpisywanie Komend Przeglądarki

```js
/**
 * Wydrukuj milisekundy przed pauzą i zwróć jej wartość.
 *
 * @param pause - nazwa komendy do nadpisania
 * @param this of func - oryginalna instancja przeglądarki, na której funkcja została wywołana
 * @param originalPauseFunction of func - oryginalna funkcja pauzy
 * @param ms of func - rzeczywiste przekazane parametry
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// następnie użyj jej jak wcześniej
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Nadpisywanie Komend Elementu

Nadpisywanie komend na poziomie elementu jest prawie takie samo. Po prostu przekaż `true` jako trzeci argument do `overwriteCommand`:

```js
/**
 * Próbuj przewinąć do elementu, jeśli nie jest klikalny.
 * Przekaż { force: true }, aby kliknąć za pomocą JS, nawet jeśli element nie jest widoczny lub klikalny.
 * Pokaż, że oryginalny typ argumentu funkcji można zachować przy użyciu `options?: ClickOptions`
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

        // klikanie za pomocą js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Nie zapomnij dołączyć go do elementu
)

// następnie użyj go jak wcześniej
const elem = await $('body')
await elem.click()

// lub przekaż parametry
await elem.click({ force: true })
```

## Dodawanie Więcej Komend WebDriver

Jeśli używasz protokołu WebDriver i uruchamiasz testy na platformie, która obsługuje dodatkowe komendy niezdefiniowane przez żadną z definicji protokołu w [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), możesz ręcznie dodać je za pomocą interfejsu `addCommand`. Pakiet `webdriver` oferuje wrapper komendy, który pozwala na rejestrowanie tych nowych punktów końcowych w ten sam sposób co inne komendy, zapewniając te same kontrole parametrów i obsługę błędów. Aby zarejestrować ten nowy punkt końcowy, zaimportuj wrapper komendy i zarejestruj nową komendę za jego pomocą w następujący sposób:

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
// wywołaj komendę bez wymaganego parametru URL i ładunku
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

Prawidłowe wywołanie komendy, np. `browser.myNewCommand('foo', 'bar')`, prawidłowo wykonuje żądanie WebDriver do np. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` z ładunkiem typu `{ foo: 'bar' }`.

:::note
Parametr URL `:sessionId` zostanie automatycznie zastąpiony identyfikatorem sesji sesji WebDriver. Inne parametry URL mogą być stosowane, ale muszą być zdefiniowane w `variables`.
:::

Zobacz przykłady definiowania komend protokołu w pakiecie [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).