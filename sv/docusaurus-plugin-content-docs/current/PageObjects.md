---
id: pageobjects
title: Page Object-mönstret
description: "Strukturera dina tester med page object-mönstret genom att flytta selektorer och sidspecifika åtgärder till återanvändbara sidklasser."
---

Version 5 av WebdriverIO designades med stöd för Page Object-mönstret i åtanke. Genom att införa principen "element som förstklassiga medborgare" är det nu möjligt att bygga upp stora testsviter med hjälp av detta mönster.

Det krävs inga ytterligare paket för att skapa page objects. Det visar sig att rena, moderna klasser tillhandahåller alla nödvändiga funktioner vi behöver:

- arv mellan page objects
- lat inläsning (lazy loading) av element
- inkapsling av metoder och åtgärder

Målet med att använda page objects är att abstrahera bort all sidinformation från själva testerna. Helst bör du lagra alla selektorer eller specifika instruktioner som är unika för en viss sida i ett page object, så att du fortfarande kan köra ditt test efter att du helt har gjort om designen av din sida.

## Skapa ett Page Object

Först och främst behöver vi ett huvudsakligt page object som vi kallar `Page.js`. Det kommer att innehålla allmänna selektorer eller metoder som alla page objects kommer att ärva från.

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

Vi kommer alltid att `export`:era en instans av ett page object, och aldrig skapa den instansen i testet. Eftersom vi skriver end-to-end-tester betraktar vi alltid sidan som en tillståndslös konstruktion&mdash;precis som varje HTTP-förfrågan är en tillståndslös konstruktion.

Visst, webbläsaren kan bära sessionsinformation och kan därför visa olika sidor baserat på olika sessioner, men detta bör inte återspeglas i ett page object. Den här typen av tillståndsförändringar bör finnas i dina faktiska tester.

Låt oss börja testa den första sidan. I demonstrationssyfte använder vi webbplatsen [The Internet](http://the-internet.herokuapp.com) av [Elemental Selenium](http://elementalselenium.com) som försökskanin. Låt oss försöka bygga ett page object-exempel för [inloggningssidan](http://the-internet.herokuapp.com/login).

## `Get`-a dina selektorer

Det första steget är att skriva alla viktiga selektorer som krävs i vårt `login.page`-objekt som getter-funktioner:

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

Att definiera selektorer i getter-funktioner kan se lite konstigt ut, men det är verkligen användbart. Dessa funktioner utvärderas _när du kommer åt egenskapen_, inte när du genererar objektet. På så sätt efterfrågar du alltid elementet innan du utför en åtgärd på det.

## Kedja kommandon

WebdriverIO kommer internt ihåg det senaste resultatet av ett kommando. Om du kedjar ett elementkommando med ett åtgärdskommando hittar det elementet från föregående kommando och använder resultatet för att utföra åtgärden. Därmed kan du ta bort selektorn (första parametern) och kommandot ser så enkelt ut som:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Vilket i princip är samma sak som:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

eller

```js
await $('#username').setValue('Max Mustermann')
```

## Använda Page Objects i dina tester

När du har definierat de nödvändiga elementen och metoderna för sidan kan du börja skriva testet för den. Allt du behöver göra för att använda page objectet är att `import`:era (eller `require`:a) det. Det är allt!

Eftersom du exporterade en redan skapad instans av page objectet kan du börja använda det direkt när du importerar det.

Om du använder ett assertion-ramverk kan dina tester bli ännu mer uttrycksfulla:

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

Ur ett strukturellt perspektiv är det vettigt att separera spec-filer och page objects i olika kataloger. Dessutom kan du ge varje page object ändelsen: `.page.js`. Detta gör det tydligare att du importerar ett page object.

## Gå vidare

Detta är grundprincipen för hur man skriver page objects med WebdriverIO. Men du kan bygga upp mycket mer komplexa page object-strukturer än så här! Du kan till exempel ha specifika page objects för modaler, eller dela upp ett enormt page object i olika klasser (där var och en representerar en annan del av hela webbsidan) som ärver från huvud-page objectet. Mönstret ger verkligen många möjligheter att separera sidinformation från dina tester, vilket är viktigt för att hålla din testsvit strukturerad och tydlig i takt med att projektet och antalet tester växer.

Du kan hitta detta exempel (och ännu fler page object-exempel) i [`example`-mappen](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) på GitHub.