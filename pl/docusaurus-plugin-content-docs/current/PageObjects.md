---
id: pageobjects
title: Wzorzec Obiektów Stron
---

Wersja 5 WebdriverIO została zaprojektowana z myślą o obsłudze wzorca Obiektów Stron (Page Object Pattern). Dzięki wprowadzeniu zasady "elementy jako obywatele pierwszej kategorii", możliwe jest teraz budowanie dużych zestawów testów przy użyciu tego wzorca.

Do tworzenia obiektów stron nie są wymagane żadne dodatkowe pakiety. Okazuje się, że czyste, nowoczesne klasy zapewniają wszystkie niezbędne funkcje, których potrzebujemy:

- dziedziczenie między obiektami stron
- leniwe ładowanie elementów
- enkapsulacja metod i akcji

Celem używania obiektów stron jest oddzielenie informacji o stronie od faktycznych testów. Idealnie byłoby przechowywać wszystkie selektory lub specyficzne instrukcje, które są unikalne dla danej strony, w obiekcie strony, abyś nadal mógł uruchamiać swoje testy po całkowitym przeprojektowaniu strony.

## Tworzenie Obiektu Strony

Na początek potrzebujemy głównego obiektu strony, który nazywamy `Page.js`. Będzie on zawierał ogólne selektory lub metody, które odziedziczą wszystkie obiekty stron.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

Zawsze będziemy `export`-ować instancję obiektu strony i nigdy nie tworzyć tej instancji w teście. Ponieważ piszemy testy end-to-end, zawsze traktujemy stronę jako bezstanową konstrukcję&mdash;tak samo jak każde żądanie HTTP jest bezstanową konstrukcją.

Oczywiście przeglądarka może przechowywać informacje o sesji i dlatego może wyświetlać różne strony na podstawie różnych sesji, ale nie powinno to mieć odzwierciedlenia w obiekcie strony. Tego rodzaju zmiany stanu powinny znajdować się w rzeczywistych testach.

Zacznijmy testować pierwszą stronę. Do celów demonstracyjnych używamy strony [The Internet](http://the-internet.herokuapp.com) stworzonej przez [Elemental Selenium](http://elementalselenium.com) jako „królika doświadczalnego". Spróbujmy zbudować przykład obiektu strony dla [strony logowania](http://the-internet.herokuapp.com/login).

## Pobieranie selektorów za pomocą `get`

Pierwszym krokiem jest napisanie wszystkich ważnych selektorów, które są wymagane w naszym obiekcie `login.page`, jako funkcji getter:

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

Definiowanie selektorów w funkcjach getter może wyglądać trochę dziwnie, ale jest naprawdę użyteczne. Te funkcje są oceniane _gdy uzyskujesz dostęp do właściwości_, a nie gdy generujesz obiekt. Dzięki temu zawsze żądasz elementu przed wykonaniem na nim akcji.

## Łączenie poleceń

WebdriverIO wewnętrznie zapamiętuje ostatni wynik polecenia. Jeśli połączysz polecenie elementu z poleceniem akcji, znajdzie element z poprzedniego polecenia i użyje wyniku do wykonania akcji. Dzięki temu możesz usunąć selektor (pierwszy parametr), a polecenie wygląda tak prosto jak:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Co jest zasadniczo tym samym co:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

lub

```js
await $('#username').setValue('Max Mustermann')
```

## Używanie obiektów stron w testach

Po zdefiniowaniu niezbędnych elementów i metod dla strony, możesz zacząć pisać dla niej test. Wszystko, co musisz zrobić, aby użyć obiektu strony, to go `import`-ować (lub użyć `require`). To wszystko!

Ponieważ wyeksportowałeś już utworzoną instancję obiektu strony, importując ją, możesz od razu zacząć jej używać.

Jeśli używasz frameworka asercji, twoje testy mogą być jeszcze bardziej wyraziste:

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

Ze strukturalnego punktu widzenia sensowne jest oddzielenie plików spec i obiektów stron do różnych katalogów. Dodatkowo możesz nadać każdemu obiektowi strony końcówkę: `.page.js`. To sprawia, że jest bardziej jasne, że importujesz obiekt strony.

## Idąc dalej

To jest podstawowa zasada pisania obiektów stron z WebdriverIO. Ale możesz budować znacznie bardziej złożone struktury obiektów stron niż ta! Na przykład, możesz mieć określone obiekty stron dla modali, lub podzielić ogromny obiekt strony na różne klasy (z których każda reprezentuje inną część ogólnej strony internetowej), które dziedziczą z głównego obiektu strony. Ten wzorzec naprawdę daje wiele możliwości oddzielenia informacji o stronie od testów, co jest ważne, aby utrzymać zestaw testów uporządkowany i przejrzysty w czasach, gdy projekt i liczba testów rośnie.

Możesz znaleźć ten przykład (i jeszcze więcej przykładów obiektów stron) w [`folderze example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) na GitHubie.