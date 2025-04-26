---
id: selectors
title: Selektoren
---

Das [WebDriver Protocol](https://w3c.github.io/webdriver/) bietet mehrere Selektorstrategien, um ein Element abzufragen. WebdriverIO vereinfacht diese, um die Auswahl von Elementen einfach zu halten. Bitte beachten Sie, dass obwohl der Befehl zum Abfragen von Elementen `$` und `$$` heißt, sie nichts mit jQuery oder der [Sizzle Selector Engine](https://github.com/jquery/sizzle) zu tun haben.

Obwohl es so viele verschiedene Selektoren gibt, bieten nur wenige von ihnen eine robuste Möglichkeit, das richtige Element zu finden. Zum Beispiel, gegeben den folgenden Button:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

Wir __empfehlen__ und __empfehlen nicht__ die folgenden Selektoren:

| Selektor | Empfohlen | Hinweise |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Niemals | Am schlechtesten - zu generisch, kein Kontext. |
| `$('.btn.btn-large')` | 🚨 Niemals | Schlecht. An Styling gekoppelt. Stark änderungsanfällig. |
| `$('#main')` | ⚠️ Sparsam | Besser. Aber immer noch an Styling oder JS-Event-Listener gekoppelt. |
| `$(() => document.queryElement('button'))` | ⚠️ Sparsam | Effektive Abfrage, komplex zu schreiben. |
| `$('button[name="submission"]')` | ⚠️ Sparsam | An das `name`-Attribut gekoppelt, das HTML-Semantik hat. |
| `$('button[data-testid="submit"]')` | ✅ Gut | Erfordert zusätzliches Attribut, nicht mit a11y verbunden. |
| `$('aria/Submit')` oder `$('button=Submit')` | ✅ Immer | Am besten. Entspricht der Art und Weise, wie der Benutzer mit der Seite interagiert. Es wird empfohlen, die Übersetzungsdateien Ihres Frontends zu verwenden, damit Ihre Tests nie fehlschlagen, wenn die Übersetzungen aktualisiert werden |

## CSS Query Selector

Wenn nicht anders angegeben, wird WebdriverIO Elemente mit dem [CSS-Selektor](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)-Muster abfragen, z.B.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Link Text

Um ein Ankerelement mit einem bestimmten Text zu erhalten, fragen Sie den Text ab, der mit einem Gleichheitszeichen (`=`) beginnt.

Zum Beispiel:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Sie können dieses Element abfragen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Partieller Link Text

Um ein Ankerelement zu finden, dessen sichtbarer Text teilweise mit Ihrem Suchwert übereinstimmt,
fragen Sie es ab, indem Sie `*=` vor die Abfragezeichenfolge setzen (z.B. `*=driver`).

Sie können das Element aus dem obigen Beispiel auch abfragen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Hinweis:__ Sie können nicht mehrere Selektorstrategien in einem Selektor mischen. Verwenden Sie mehrere verkettete Elementabfragen, um das gleiche Ziel zu erreichen, z.B.:

```js
const elem = await $('header h1*=Welcome') // funktioniert nicht!!!
// verwenden Sie stattdessen
const elem = await $('header').$('*=driver')
```

## Element mit bestimmtem Text

Die gleiche Technik kann auch auf Elemente angewendet werden. Zusätzlich ist es auch möglich, eine Abfrage ohne Berücksichtigung der Groß- und Kleinschreibung mit `.=` oder `.*=` durchzuführen.

Hier ist zum Beispiel eine Abfrage für eine Überschrift der Ebene 1 mit dem Text "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Sie können dieses Element abfragen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Oder mit partieller Textabfrage:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Das Gleiche funktioniert für `id` und `class` Namen:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Sie können dieses Element abfragen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Hinweis:__ Sie können nicht mehrere Selektorstrategien in einem Selektor mischen. Verwenden Sie mehrere verkettete Elementabfragen, um das gleiche Ziel zu erreichen, z.B.:

```js
const elem = await $('header h1*=Welcome') // funktioniert nicht!!!
// verwenden Sie stattdessen
const elem = await $('header').$('h1*=Welcome')
```

## Tag Name

Um ein Element mit einem bestimmten Tag-Namen abzufragen, verwenden Sie `<tag>` oder `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Sie können dieses Element abfragen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name-Attribut

Zum Abfragen von Elementen mit einem bestimmten Name-Attribut können Sie entweder einen normalen CSS3-Selektor oder die bereitgestellte Name-Strategie aus dem [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) verwenden, indem Sie etwas wie [name="some-name"] als Selektorparameter übergeben:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Hinweis:__ Diese Selektorstrategie ist veraltet und funktioniert nur in alten Browsern, die mit dem JSONWireProtocol-Protokoll ausgeführt werden, oder bei Verwendung von Appium.

## xPath

Es ist auch möglich, Elemente über einen bestimmten [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) abzufragen.

Ein xPath-Selektor hat ein Format wie `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Sie können den zweiten Absatz abfragen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Sie können xPath auch verwenden, um im DOM-Baum auf- und abzusteigen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Accessibility Name Selector

Abfrage von Elementen nach ihrem zugänglichen Namen. Der zugängliche Name ist das, was von einem Screenreader angekündigt wird, wenn dieses Element den Fokus erhält. Der Wert des zugänglichen Namens kann sowohl visueller Inhalt als auch versteckte Textalternativen sein.

:::info

Mehr über diesen Selektor können Sie in unserem [Release-Blogbeitrag](/blog/2022/09/05/accessibility-selector) lesen

:::

### Abrufen über `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Abrufen über `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Abrufen über Inhalt

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Abrufen über Titel

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Abrufen über `alt`-Eigenschaft

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Role-Attribut

Zum Abfragen von Elementen basierend auf [ARIA-Rollen](https://www.w3.org/TR/html-aria/#docconformance) können Sie direkt die Rolle des Elements wie `[role=button]` als Selektorparameter angeben:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID-Attribut

Die Lokalisierungsstrategie "id" wird im WebDriver-Protokoll nicht unterstützt. Man sollte stattdessen entweder CSS- oder xPath-Selektorstrategien verwenden, um Elemente anhand der ID zu finden.

Allerdings könnten einige Treiber (z.B. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) diesen Selektor immer noch [unterstützen](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies).

Aktuell unterstützte Selektorsyntaxen für ID sind:

```js
//css locator
const button = await $('#someid')
//xpath locator
const button = await $('//*[@id="someid"]')
//id strategy
// Hinweis: funktioniert nur in Appium oder ähnlichen Frameworks, die die Lokalisierungsstrategie "ID" unterstützen
const button = await $('id=resource-id/iosname')
```

## JS-Funktion

Sie können auch JavaScript-Funktionen verwenden, um Elemente mit nativen Web-APIs abzurufen. Natürlich können Sie dies nur innerhalb eines Web-Kontexts tun (z.B. `browser` oder Web-Kontext in Mobile).

Gegeben die folgende HTML-Struktur:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918