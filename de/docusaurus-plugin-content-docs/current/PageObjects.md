---
id: pageobjects
title: Page Object Pattern
---

Version 5 von WebdriverIO wurde mit Unterstützung für das Page Object Pattern im Hinterkopf entwickelt. Durch die Einführung des Prinzips "Elemente als Bürger erster Klasse" ist es jetzt möglich, umfangreiche Testsuiten mit diesem Muster aufzubauen.

Es sind keine zusätzlichen Pakete erforderlich, um Page Objects zu erstellen. Es stellt sich heraus, dass saubere, moderne Klassen alle notwendigen Funktionen bieten, die wir benötigen:

- Vererbung zwischen Page Objects
- Lazy Loading von Elementen
- Kapselung von Methoden und Aktionen

Das Ziel der Verwendung von Page Objects ist es, jegliche Seiteninformationen von den eigentlichen Tests zu abstrahieren. Idealerweise sollten Sie alle Selektoren oder spezifischen Anweisungen, die für eine bestimmte Seite einzigartig sind, in einem Page Object speichern, sodass Sie Ihren Test auch nach einer vollständigen Neugestaltung Ihrer Seite ausführen können.

## Erstellen eines Page Objects

Zunächst benötigen wir ein Haupt-Page-Object, das wir `Page.js` nennen. Es enthält allgemeine Selektoren oder Methoden, von denen alle Page Objects erben werden.

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

Wir werden immer eine Instanz eines Page Objects `exportieren` und diese Instanz niemals im Test erstellen. Da wir End-to-End-Tests schreiben, betrachten wir die Seite immer als ein zustandsloses Konstrukt&mdash;genau wie jede HTTP-Anfrage ein zustandsloses Konstrukt ist.

Natürlich kann der Browser Sitzungsinformationen speichern und daher je nach Sitzung unterschiedliche Seiten anzeigen, aber dies sollte nicht in einem Page Object abgebildet werden. Diese Art von Zustandsänderungen sollte in Ihren eigentlichen Tests leben.

Beginnen wir mit dem Testen der ersten Seite. Zu Demonstrationszwecken verwenden wir die Website [The Internet](http://the-internet.herokuapp.com) von [Elemental Selenium](http://elementalselenium.com) als Versuchskaninchen. Versuchen wir, ein Page-Object-Beispiel für die [Login-Seite](http://the-internet.herokuapp.com/login) zu erstellen.

## `Get` -ting Ihrer Selektoren

Der erste Schritt besteht darin, alle wichtigen Selektoren, die in unserem `login.page`-Objekt benötigt werden, als Getter-Funktionen zu schreiben:

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

Die Definition von Selektoren in Getter-Funktionen mag ein wenig seltsam aussehen, ist aber wirklich nützlich. Diese Funktionen werden ausgewertet, _wenn Sie auf die Eigenschaft zugreifen_, nicht wenn Sie das Objekt generieren. Damit fordern Sie immer das Element an, bevor Sie eine Aktion darauf ausführen.

## Verketten von Befehlen

WebdriverIO merkt sich intern das letzte Ergebnis eines Befehls. Wenn Sie einen Elementbefehl mit einem Aktionsbefehl verketten, findet es das Element aus dem vorherigen Befehl und verwendet das Ergebnis, um die Aktion auszuführen. Damit können Sie den Selektor (ersten Parameter) entfernen und der Befehl sieht so einfach aus wie:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Was im Grunde das Gleiche ist wie:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

oder

```js
await $('#username').setValue('Max Mustermann')
```

## Verwendung von Page Objects in Ihren Tests

Nachdem Sie die notwendigen Elemente und Methoden für die Seite definiert haben, können Sie mit dem Schreiben des Tests dafür beginnen. Alles, was Sie tun müssen, um das Page Object zu verwenden, ist, es zu `importieren` (oder `require`). Das ist alles!

Da Sie eine bereits erstellte Instanz des Page Objects exportiert haben, können Sie es nach dem Import sofort verwenden.

Wenn Sie ein Assertion-Framework verwenden, können Ihre Tests noch aussagekräftiger sein:

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

Von der strukturellen Seite her ist es sinnvoll, Spec-Dateien und Page Objects in verschiedene Verzeichnisse zu trennen. Zusätzlich können Sie jedem Page Object die Endung `.page.js` geben. Dies macht deutlicher, dass Sie ein Page Object importieren.

## Weiterführende Informationen

Dies ist das Grundprinzip, wie man Page Objects mit WebdriverIO schreibt. Aber Sie können viel komplexere Page-Object-Strukturen aufbauen als diese! Zum Beispiel könnten Sie spezifische Page Objects für Modals haben oder ein riesiges Page Object in verschiedene Klassen aufteilen (jede repräsentiert einen anderen Teil der gesamten Webseite), die vom Haupt-Page-Object erben. Das Muster bietet wirklich viele Möglichkeiten, Seiteninformationen von Ihren Tests zu trennen, was wichtig ist, um Ihre Testsuite strukturiert und übersichtlich zu halten, wenn das Projekt und die Anzahl der Tests wachsen.

Sie finden dieses Beispiel (und noch mehr Page-Object-Beispiele) im [`example`-Ordner](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) auf GitHub.