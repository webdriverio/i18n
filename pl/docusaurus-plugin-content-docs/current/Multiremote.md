---
id: multiremote
title: Multi-remote
description: "Steruj wieloma sesjami przeglądarek lub urządzeń z poziomu jednego testu dzięki multi-remote, w trybie standalone lub z testrunnerem WDIO."
---

WebdriverIO pozwala na uruchamianie wielu zautomatyzowanych sesji w jednym teście. Przydaje się to, gdy testujesz funkcje wymagające wielu użytkowników (na przykład aplikacje czatu lub WebRTC).

Zamiast tworzyć kilka zdalnych instancji, na których musisz wykonywać wspólne polecenia, takie jak [`newSession`](/docs/api/webdriver#newsession) czy [`url`](/docs/api/browser/url), dla każdej instancji osobno, możesz po prostu utworzyć instancję **multi-remote** i sterować wszystkimi przeglądarkami jednocześnie.

Aby to zrobić, użyj funkcji `multiRemote()` i przekaż obiekt, w którym kluczami są nazwy, a wartościami `capabilities`. Nadając każdemu zestawowi capabilities nazwę, możesz łatwo wybrać i uzyskać dostęp do tej pojedynczej instancji podczas wykonywania poleceń na jednej instancji.

:::info

MultiRemote _nie_ służy do równoległego wykonywania wszystkich testów.
Jego celem jest pomoc w koordynowaniu wielu przeglądarek i/lub urządzeń mobilnych w specjalnych testach integracyjnych (np. aplikacji czatu).

:::

Większość poleceń multi-remote zwraca tablicę wyników. Pierwszy wynik odpowiada capability zdefiniowanemu jako pierwsze w obiekcie capabilities, drugi wynik drugiemu i tak dalej. `mock()` zwraca `MultiRemoteMock` zamiast tablicy. Zobacz [Co zwraca mock()](#what-mock-returns).

## Korzystanie z trybu standalone

Oto przykład tworzenia instancji multi-remote w __trybie standalone__:

```js
import { multiRemote } from 'webdriverio'

(async () => {
    const browser = await multiRemote({
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    })

    // otwórz url w obu przeglądarkach jednocześnie
    await browser.url('http://json.org')

    // wywołuj polecenia jednocześnie
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // kliknij element jednocześnie
    const elem = await browser.$('#someElem')
    await elem.click()

    // kliknij tylko w jednej przeglądarce (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Korzystanie z testrunnera WDIO

Aby używać multi-remote w testrunnerze WDIO, po prostu zdefiniuj obiekt `capabilities` w pliku `wdio.conf.js` jako obiekt, w którym kluczami są nazwy przeglądarek (zamiast listy capabilities):

```js
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
    // ...
}
```

Spowoduje to utworzenie dwóch sesji WebDriver z Chrome i Firefoxem. Zamiast samych Chrome i Firefoxa możesz również uruchomić dwa urządzenia mobilne za pomocą [Appium](http://appium.io) lub jedno urządzenie mobilne i jedną przeglądarkę.

Możesz także uruchamiać multi-remote równolegle, umieszczając obiekt capabilities przeglądarek w tablicy. Upewnij się, że pole `capabilities` jest zawarte w każdej przeglądarce, ponieważ w ten sposób rozróżniamy oba tryby.

```js
export const config = {
    // ...
    capabilities: [{
        myChromeBrowser0: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser0: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }, {
        myChromeBrowser1: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser1: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }]
    // ...
}
```

Możesz nawet uruchomić jeden z [backendów usług chmurowych](https://webdriver.io/docs/cloudservices.html) razem z lokalnymi instancjami Webdriver/Appium lub Selenium Standalone. WebdriverIO automatycznie wykrywa capabilities backendu chmurowego, jeśli w capabilities przeglądarki określisz `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) lub `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)).

```js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myBrowserStackFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox',
                'bstack:options': {
                    // ...
                }
            }
        }
    },
    services: [
        ['browserstack', 'selenium-standalone']
    ],
    // ...
}
```

Możliwa jest tu dowolna kombinacja systemu operacyjnego i przeglądarki (w tym przeglądarki mobilne i desktopowe). Wszystkie polecenia, które Twoje testy wywołują poprzez zmienną `browser`, są wykonywane równolegle na każdej instancji. Pomaga to usprawnić testy integracyjne i przyspieszyć ich wykonywanie.

Na przykład, jeśli otworzysz adres URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Wynikiem każdego polecenia będzie obiekt, w którym kluczem jest nazwa przeglądarki, a wartością wynik polecenia, w ten sposób:

```js
// przykład z testrunnerem wdio
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // zwraca: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // zwraca: 'Firefox 35 on Mac OS X (Yosemite)'
```

Zauważ, że każde polecenie jest wykonywane jedno po drugim. Oznacza to, że polecenie kończy się, gdy wszystkie przeglądarki je wykonają. Jest to pomocne, ponieważ utrzymuje synchronizację działań przeglądarek, co ułatwia zrozumienie, co aktualnie się dzieje.

Czasami, aby coś przetestować, konieczne jest wykonanie różnych czynności w każdej przeglądarce. Na przykład, jeśli chcemy przetestować aplikację czatu, musi istnieć jedna przeglądarka, która wysyła wiadomość tekstową, podczas gdy inna czeka na jej odebranie, a następnie wykonuje na niej asercję.

Podczas korzystania z testrunnera WDIO nazwy przeglądarek wraz z ich instancjami są rejestrowane w zasięgu globalnym:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// poczekaj, aż wiadomości dotrą
await $('.messages').waitForExist()
// sprawdź, czy jedna z wiadomości zawiera wiadomość z Chrome
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

W tym przykładzie instancja `myFirefoxBrowser` zacznie czekać na wiadomość, gdy instancja `myChromeBrowser` kliknie przycisk `#send`.

MultiRemote sprawia, że sterowanie wieloma przeglądarkami jest łatwe i wygodne, niezależnie od tego, czy chcesz, aby robiły to samo równolegle, czy różne rzeczy w skoordynowany sposób.

### Co zwraca `$`

W przeglądarce multi-remote `$`, `custom$` i `react$` zwracają jeden `MultiRemoteElement`. W elemencie multi-remote `shadow$`, `nextElement`, `previousElement` i `parentElement` również zwracają jeden taki element. Jego polecenia są wykonywane na każdej instancji, a `getInstance` zwraca element jednej przeglądarki.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // klika w każdej przeglądarce
await button.getInstance('myChromeBrowser').click()  // klika tylko w Chrome
```

### Co zwraca `$$`

W przeglądarce multi-remote `$$` zwraca `MultiRemoteElementArray`. Każdy wpis jest elementem `MultiRemoteElement`, który odnosi się jednocześnie do wszystkich instancji, a sama tablica zawiera te same informacje co zwykła `ElementArray`. `custom$$`, `react$$` oraz, w elemencie multi-remote, `shadow$$` zwracają ten sam rodzaj listy.

```js
const messages = await $$('.messages')

messages.length      // największa liczba elementów znaleziona przez jedną instancję
messages[0]          // MultiRemoteElement, odnoszący się do wszystkich instancji
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // przeglądarka lub element multi-remote, z którego zostały pobrane
messages.isMultiRemote // true, dzięki czemu można ją odróżnić od zwykłej ElementArray

// asynchroniczne metody pomocnicze tablicy są dostępne, jak w przypadku pojedynczej przeglądarki
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

Gdy instancje znajdą różną liczbę elementów, wpis nie ma elementu dla instancji, która znalazła ich mniej. Dla tej instancji `getInstance()` zgłasza błąd, a polecenie wykonane na wpisie kończy się niepowodzeniem. Użyj `select()` z instancjami, które mają dany element. Matcher `expect` użyty na całej liście sprawdza każdą instancję z jej własnymi elementami:

```js
// myChromeBrowser znajduje 3 wiadomości, myFirefoxBrowser znajduje 2
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // tylko Chrome ma trzecią wiadomość
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

Przed wersją v10 zwracana była zwykła tablica, chyba że ustawiono `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true`. Ta tablica jest teraz domyślna, a zmienna środowiskowa została usunięta. Dostęp przez indeks pozostał bez zmian, więc kod, który jedynie odczytywał `elements[0]`, nadal działa.

:::

### Co zwraca mock() {#what-mock-returns}

W przeglądarce multi-remote `mock()` zwraca `MultiRemoteMock`. Nie jest to tablica. `respond()`, `restore()` i pozostałe metody mocka są wykonywane na każdej instancji. Przechwycone żądania pozostają w mocku dla danej przeglądarki, więc odczytuj je za pomocą `getInstance`:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js` uruchamia ten przykład na dwóch sesjach headless Chrome.

`instances` zachowuje kolejność, w jakiej mocki zostały utworzone. Po użyciu `select()` ta kolejność może różnić się od `browser.instances`:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // mock Chrome, niezależnie od kolejności
```

`getInstance` zgłasza błąd `Multi-remote object has no instance named "<name>"`, gdy `name` nie występuje w `instances`.

Aby zamockować tylko jedną przeglądarkę, wywołaj `mock()` na tej instancji:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## Dostęp do instancji przeglądarek za pomocą ciągów znaków przez obiekt browser
Oprócz dostępu do instancji przeglądarki poprzez ich zmienne globalne (np. `myChromeBrowser`, `myFirefoxBrowser`), możesz również uzyskać do nich dostęp poprzez obiekt `browser`, np. `browser["myChromeBrowser"]` lub `browser["myFirefoxBrowser"]`. Listę wszystkich instancji możesz uzyskać poprzez `browser.instances`. Jest to szczególnie przydatne podczas pisania kroków testowych wielokrotnego użytku, które mogą być wykonywane w dowolnej przeglądarce, np.:

wdio.conf.js:
```js
    capabilities: {
        userA: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        userB: {
            capabilities: {
                browserName: 'chrome'
            }
        }
    }
```

Plik Cucumber:
    ```feature
    When User A types a message into the chat
    ```

Plik z definicjami kroków:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Asercje

Matchery `expect` obsługują przeglądarki, elementy i mocki multi-remote. Domyślnie każda instancja musi pasować do oczekiwanej wartości:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

Aby oczekiwać innej wartości dla każdej instancji, użyj `expect.multiRemote()` z jedną wartością na nazwę instancji:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

Wszystkie obsługiwane matchery oraz wymaganą konfigurację znajdziesz w [przewodniku multi-remote expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## Dostęp do jednej instancji

Nazwy instancji nie są właściwościami przeglądarki multi-remote ani elementu multi-remote. `browser.myChromeBrowser` i `elem.myChromeDriver` nie są ustawione. Pobierz sesję za pomocą `getInstance` lub zawęź obiekt multi-remote za pomocą `select`:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

Testrunner nadal przypisuje każdą nazwę instancji jako osobną zmienną globalną, gdy opcja `injectGlobals` pozostaje włączona, więc test może wywołać `myChromeBrowser.$('button')` bez odwoływania się do `browser`. Ta zmienna globalna jest pojedynczą sesją zwracaną przez `getInstance`, a nie polem obiektu multi-remote.