---
id: pageobjects
title: Page-Object-Muster
description: "Strukturieren Sie Ihre Tests mit dem Page-Object-Muster, indem Sie Selektoren und seitenspezifische Aktionen in wiederverwendbare Seitenklassen auslagern."
---

Version 5 von WebdriverIO wurde mit Blick auf die Unterstützung des Page-Object-Musters entwickelt. Durch die Einführung des Prinzips „Elemente als Bürger erster Klasse“ ist es nun möglich, große Testsuiten mit diesem Muster aufzubauen.

Zum Erstellen von Page Objects sind keine zusätzlichen Pakete erforderlich. Es zeigt sich, dass saubere, moderne Klassen alle notwendigen Funktionen bieten, die wir benötigen:

- Vererbung zwischen Page Objects
- Lazy Loading von Elementen
- Kapselung von Methoden und Aktionen

Das Ziel bei der Verwendung von Page Objects ist es, sämtliche Seiteninformationen von den eigentlichen Tests zu abstrahieren. Idealerweise sollten Sie alle Selektoren oder spezifischen Anweisungen, die für eine bestimmte Seite einzigartig sind, in einem Page Object speichern, sodass Sie Ihren Test auch dann noch ausführen können, nachdem Sie Ihre Seite komplett neu gestaltet haben.

## Ein Page Object erstellen

Zunächst benötigen wir ein Haupt-Page-Object, das wir `Page.js` nennen. Es enthält allgemeine Selektoren oder Methoden, von denen alle Page Objects erben.

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

Wir werden immer eine Instanz eines Page Objects `export`ieren und diese Instanz niemals im Test erstellen. Da wir End-to-End-Tests schreiben, betrachten wir die Seite immer als zustandsloses Konstrukt&mdash;so wie jede HTTP-Anfrage ein zustandsloses Konstrukt ist.

Sicher, der Browser kann Sitzungsinformationen enthalten und daher je nach Sitzung unterschiedliche Seiten anzeigen, aber dies sollte sich nicht in einem Page Object widerspiegeln. Diese Art von Zustandsänderungen sollte in Ihren eigentlichen Tests stattfinden.

Beginnen wir mit dem Testen der ersten Seite. Zu Demonstrationszwecken verwenden wir die Website [The Internet](http://the-internet.herokuapp.com) von [Elemental Selenium](http://elementalselenium.com) als Versuchskaninchen. Versuchen wir, ein Page-Object-Beispiel für die [Login-Seite](http://the-internet.herokuapp.com/login) zu erstellen.

## Ihre Selektoren per `Get`

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

Selektoren in Getter-Funktionen zu definieren, mag etwas seltsam aussehen, ist aber wirklich nützlich. Diese Funktionen werden ausgewertet, _wenn Sie auf die Eigenschaft zugreifen_, und nicht, wenn Sie das Objekt erzeugen. Dadurch fordern Sie das Element immer an, bevor Sie eine Aktion darauf ausführen.

## Befehle verketten

WebdriverIO merkt sich intern das letzte Ergebnis eines Befehls. Wenn Sie einen Element-Befehl mit einem Aktionsbefehl verketten, findet es das Element aus dem vorherigen Befehl und verwendet das Ergebnis, um die Aktion auszuführen. Dadurch können Sie den Selektor (ersten Parameter) weglassen, und der Befehl sieht so einfach aus wie:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Was im Grunde dasselbe ist wie:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

oder

```js
await $('#username').setValue('Max Mustermann')
```

## Page Objects in Ihren Tests verwenden

Nachdem Sie die notwendigen Elemente und Methoden für die Seite definiert haben, können Sie mit dem Schreiben des Tests dafür beginnen. Alles, was Sie tun müssen, um das Page Object zu verwenden, ist es zu `import`ieren (oder mit `require` einzubinden). Das ist alles!

Da Sie eine bereits erstellte Instanz des Page Objects exportiert haben, können Sie es nach dem Importieren sofort verwenden.

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

Aus struktureller Sicht ist es sinnvoll, Spec-Dateien und Page Objects in verschiedene Verzeichnisse zu trennen. Zusätzlich können Sie jedem Page Object die Endung `.page.js` geben. Dadurch wird deutlicher, dass Sie ein Page Object importieren.

## Weiterführende Konzepte

Dies ist das Grundprinzip, wie man Page Objects mit WebdriverIO schreibt. Sie können jedoch weitaus komplexere Page-Object-Strukturen aufbauen! Beispielsweise könnten Sie spezifische Page Objects für Modals haben oder ein riesiges Page Object in verschiedene Klassen aufteilen (die jeweils einen anderen Teil der gesamten Webseite darstellen), die vom Haupt-Page-Object erben. Das Muster bietet wirklich viele Möglichkeiten, Seiteninformationen von Ihren Tests zu trennen, was wichtig ist, um Ihre Testsuite strukturiert und übersichtlich zu halten, wenn das Projekt und die Anzahl der Tests wachsen.

Sie finden dieses Beispiel (und noch weitere Page-Object-Beispiele) im [`example`-Ordner](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) auf GitHub.