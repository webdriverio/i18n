---
id: element
title: Das Element-Objekt
---

Ein Element-Objekt ist ein Objekt, das ein Element im Remote-User-Agent repräsentiert, z.B. ein [DOM-Knoten](https://developer.mozilla.org/en-US/docs/Web/API/Element) bei der Ausführung einer Sitzung in einem Browser oder [ein mobiles Element](https://developer.apple.com/documentation/swift/sequence/element) für Mobilgeräte. Es kann über einen der vielen Element-Abfragebefehle empfangen werden, z.B. [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) oder [`shadow$`](/docs/api/element/shadow$).

## Eigenschaften

Ein Element-Objekt hat folgende Eigenschaften:

| Name | Typ | Details |
| ---- | ---- | ------- |
| `sessionId` | `String` | Vom Remote-Server zugewiesene Sitzungs-ID. |
| `elementId` | `String` | Zugehörige [Web-Element-Referenz](https://w3c.github.io/webdriver/#elements), die verwendet werden kann, um mit dem Element auf Protokollebene zu interagieren |
| `selector` | `String` | [Selektor](/docs/selectors), der zur Abfrage des Elements verwendet wird. |
| `parent` | `Object` | Entweder das [Browser-Objekt](/docs/api/browser), wenn das Element vom Browser abgerufen wurde (z.B. `const elem = browser.$('selector')`) oder ein [Element-Objekt](/docs/api/element), wenn es aus einem Element-Bereich abgerufen wurde (z.B. `elem.$('selector')`) |
| `options` | `Object` | WebdriverIO [Optionen](/docs/configuration), abhängig davon, wie das Browser-Objekt erstellt wurde. Siehe weitere [Setup-Typen](/docs/setuptypes). |

## Methoden
Ein Element-Objekt stellt alle Methoden aus dem Protokollabschnitt bereit, z.B. [WebDriver](/docs/api/webdriver)-Protokoll sowie Befehle, die im Element-Abschnitt aufgeführt sind. Verfügbare Protokollbefehle hängen vom Sitzungstyp ab. Wenn Sie eine automatisierte Browser-Sitzung ausführen, sind keine der Appium-[Befehle](/docs/api/appium) verfügbar und umgekehrt.

Zusätzlich dazu sind folgende Befehle verfügbar:

| Name | Parameter | Details |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Ermöglicht die Definition benutzerdefinierter Befehle, die vom Browser-Objekt für Kompositionszwecke aufgerufen werden können. Lesen Sie mehr im Leitfaden [Benutzerdefinierte Befehle](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Ermöglicht das Überschreiben eines beliebigen Browser-Befehls mit benutzerdefinierter Funktionalität. Verwenden Sie dies mit Vorsicht, da es Framework-Benutzer verwirren kann. Lesen Sie mehr im Leitfaden [Benutzerdefinierte Befehle](/docs/customcommands#overwriting-native-commands). |

## Anmerkungen

### Element-Kette

Bei der Arbeit mit Elementen bietet WebdriverIO eine spezielle Syntax, um deren Abfrage zu vereinfachen und komplexe verschachtelte Element-Lookups zu erstellen. Da Element-Objekte es ermöglichen, Elemente innerhalb ihres Zweigs mit gängigen Abfragemethoden zu finden, können Benutzer verschachtelte Elemente wie folgt abrufen:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // gibt "I am a headline" aus
```

Bei tief verschachtelten Strukturen kann die Zuweisung verschachtelter Elemente zu einem Array, um es dann zu verwenden, ziemlich umständlich sein. Daher hat WebdriverIO das Konzept der verketteten Element-Abfragen, die das Abrufen verschachtelter Elemente wie folgt ermöglichen:

```js
console.log(await $('#header').$('#headline').getText())
```

Dies funktioniert auch beim Abrufen einer Reihe von Elementen, z.B.:

```js
// den Text der 3. Überschrift innerhalb des 2. Headers abrufen
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

Bei der Arbeit mit einer Reihe von Elementen kann dies besonders nützlich sein, wenn Sie mit ihnen interagieren möchten. Anstatt also:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

Können Sie Array-Methoden direkt in der Element-Kette aufrufen, z.B.:

```js
const location = await $$('div').map((el) => el.getLocation())
```

oder:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO verwendet eine benutzerdefinierte Implementierung, die asynchrone Iteratoren unter der Haube unterstützt, sodass alle Befehle aus ihrer API auch für diese Anwendungsfälle unterstützt werden.

__Hinweis:__ Alle asynchronen Iteratoren geben ein Promise zurück, auch wenn Ihr Callback keines zurückgibt, z.B.:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ gibt "Promise<string>[]" zurück
console.log(await divs.map((div) => div.selector)) // ✅ gibt "string[]" zurück
```

### Benutzerdefinierte Befehle

Sie können benutzerdefinierte Befehle im Browser-Bereich festlegen, um häufig verwendete Arbeitsabläufe zu abstrahieren. Schauen Sie sich unseren Leitfaden zu [Benutzerdefinierten Befehlen](/docs/customcommands#adding-custom-commands) für weitere Informationen an.