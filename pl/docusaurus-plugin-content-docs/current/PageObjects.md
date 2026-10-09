---
id: pageobjects
title: Wzorzec Page Object
description: "Uporządkuj swoje testy za pomocą wzorca Page Object, przenosząc selektory i akcje specyficzne dla danej strony do klas stron wielokrotnego użytku."
---

Wersja 5 WebdriverIO została zaprojektowana z myślą o obsłudze wzorca Page Object. Dzięki wprowadzeniu zasady „elementy jako obywatele pierwszej kategorii” możliwe jest teraz budowanie dużych zestawów testów z wykorzystaniem tego wzorca.

Do tworzenia obiektów stron (page objects) nie są wymagane żadne dodatkowe pakiety. Okazuje się, że przejrzyste, nowoczesne klasy zapewniają wszystkie potrzebne nam funkcje:

- dziedziczenie między obiektami stron
- leniwe ładowanie (lazy loading) elementów
- enkapsulację metod i akcji

Celem używania obiektów stron jest oddzielenie wszelkich informacji o stronie od właściwych testów. Najlepiej przechowywać wszystkie selektory lub konkretne instrukcje, które są unikalne dla danej strony, w obiekcie strony, tak aby nadal można było uruchamiać testy po całkowitym przeprojektowaniu strony.

## Tworzenie obiektu strony

Na początek potrzebujemy głównego obiektu strony, który nazwiemy `Page.js`. Będzie on zawierał ogólne selektory lub metody, które odziedziczą wszystkie obiekty stron.

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

Zawsze będziemy eksportować (`export`) instancję obiektu strony i nigdy nie będziemy tworzyć tej instancji w teście. Ponieważ piszemy testy end-to-end, zawsze traktujemy stronę jako konstrukcję bezstanową&mdash;tak jak każde żądanie HTTP jest konstrukcją bezstanową.

Oczywiście przeglądarka może przechowywać informacje o sesji i w związku z tym wyświetlać różne strony w zależności od sesji, ale nie powinno to być odzwierciedlone w obiekcie strony. Tego rodzaju zmiany stanu powinny znajdować się w waszych właściwych testach.

Zacznijmy testować pierwszą stronę. W celach demonstracyjnych używamy strony [The Internet](http://the-internet.herokuapp.com) autorstwa [Elemental Selenium](http://elementalselenium.com) jako królika doświadczalnego. Spróbujmy zbudować przykładowy obiekt strony dla [strony logowania](http://the-internet.herokuapp.com/login).

## Pobieranie selektorów za pomocą `get`

Pierwszym krokiem jest zapisanie wszystkich ważnych selektorów wymaganych w naszym obiekcie `login.page` jako funkcji getter:

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

Definiowanie selektorów w funkcjach getter może wyglądać nieco dziwnie, ale jest naprawdę przydatne. Te funkcje są wykonywane _w momencie dostępu do właściwości_, a nie podczas tworzenia obiektu. Dzięki temu zawsze pobierasz element przed wykonaniem na nim akcji.

## Łączenie poleceń w łańcuchy

WebdriverIO wewnętrznie zapamiętuje ostatni wynik polecenia. Jeśli połączysz polecenie elementu z poleceniem akcji, odnajdzie ono element z poprzedniego polecenia i użyje wyniku do wykonania akcji. Dzięki temu możesz pominąć selektor (pierwszy parametr), a polecenie wygląda tak prosto jak:

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

Po zdefiniowaniu niezbędnych elementów i metod dla strony możesz zacząć pisać dla niej test. Aby użyć obiektu strony, wystarczy go zaimportować (`import`, lub `require`). To wszystko!

Ponieważ wyeksportowałeś już utworzoną instancję obiektu strony, jej zaimportowanie pozwala od razu zacząć z niej korzystać.

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

Ze strukturalnego punktu widzenia sensowne jest rozdzielenie plików specyfikacji i obiektów stron do różnych katalogów. Dodatkowo możesz nadać każdemu obiektowi strony końcówkę: `.page.js`. Dzięki temu jest jaśniejsze, że importujesz obiekt strony.

## Idąc dalej

To jest podstawowa zasada pisania obiektów stron w WebdriverIO. Ale możesz budować znacznie bardziej złożone struktury obiektów stron! Na przykład możesz mieć osobne obiekty stron dla okien modalnych lub podzielić ogromny obiekt strony na różne klasy (każda reprezentująca inną część całej strony internetowej), które dziedziczą po głównym obiekcie strony. Ten wzorzec naprawdę daje wiele możliwości oddzielenia informacji o stronie od testów, co jest ważne, aby zachować uporządkowany i przejrzysty zestaw testów w miarę rozwoju projektu i wzrostu liczby testów.

Ten przykład (i jeszcze więcej przykładów obiektów stron) znajdziesz w [folderze `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) na GitHubie.