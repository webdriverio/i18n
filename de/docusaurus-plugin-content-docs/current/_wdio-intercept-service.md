---
id: wdio-intercept-service
title: Intercept Service
custom_edit_url: https://github.com/webdriverio-community/wdio-intercept-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-intercept-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/webdriverio-community/wdio-intercept-service) | [npm](https://www.npmjs.com/package/wdio-intercept-service)

🕸 HTTP-Ajax-Aufrufe in [webdriver.io](http://webdriver.io/) erfassen und überprüfen

[![Tests](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml) [![Join the chat on Discord](https://img.shields.io/discord/1097401827202445382?logo=discord&logoColor=FFFFFF&color=5865F2)](https://discord.webdriver.io/)

Dies ist ein Plugin für [webdriver.io](http://webdriver.io/). Wenn Sie es noch nicht kennen, schauen Sie es sich an, es ist ziemlich cool.

Obwohl Selenium und Webdriver für E2E und insbesondere UI-Tests verwendet werden, möchten Sie möglicherweise HTTP-Anfragen bewerten, die von Ihrem Client-Code durchgeführt werden (z. B. wenn Sie kein unmittelbares UI-Feedback haben, wie bei Metriken oder Tracking-Aufrufen). Mit wdio-intercept-service können Sie Ajax-HTTP-Aufrufe abfangen, die durch eine Benutzeraktion (z. B. einen Knopfdruck usw.) ausgelöst werden, und später Aussagen über die Anfrage und die entsprechenden Antworten machen.

Es gibt jedoch einen Haken: Sie können keine HTTP-Aufrufe abfangen, die beim Laden der Seite initiiert werden (wie in den meisten SPAs), da einige Einrichtungsarbeiten erforderlich sind, die erst nach dem Laden der Seite durchgeführt werden können (aufgrund von Einschränkungen in Selenium). **Das bedeutet, dass Sie nur Anfragen erfassen können, die innerhalb eines Tests initiiert wurden.** Wenn Sie damit einverstanden sind, könnte dieses Plugin für Sie geeignet sein, also lesen Sie weiter.

## Voraussetzungen

* webdriver.io **v5.x** oder neuer.

**Achtung! Wenn Sie noch webdriver.io v4 verwenden, verwenden Sie bitte den v2.x-Branch dieses Plugins!**

## Installation

```shell
npm install wdio-intercept-service -D
```

## Verwendung

### Verwendung mit WebDriver CLI

Es sollte so einfach sein, wie wdio-intercept-service zu Ihrer `wdio.conf.js` hinzuzufügen:

```javascript
exports.config = {
  // ...
  services: ['intercept']
  // ...
};
```

und alles ist eingerichtet.

### Verwendung mit WebDriver Standalone

Bei der Verwendung von WebdriverIO Standalone müssen die Funktionen `before` und `beforeTest` / `beforeScenario` manuell aufgerufen werden.

```javascript
import { remote } from 'webdriverio';
import WebdriverAjax from 'wdio-intercept-service'

const WDIO_OPTIONS = {
  port: 9515,
  path: '/',
  capabilities: {
    browserName: 'chrome'
  },
}

let browser;
const interceptServiceLauncher = WebdriverAjax();

beforeAll(async () => {
  browser = await remote(WDIO_OPTIONS)
  interceptServiceLauncher.before(null, null, browser)
})

beforeEach(async () => {
  interceptServiceLauncher.beforeTest()
})

afterAll(async () => {
  await client.deleteSession()
});

describe('', async () => {
  ... // See example usage
});
```

Nach der Initialisierung werden einige zugehörige Funktionen zu Ihrer Browser-Befehlskette hinzugefügt (siehe [API](#api)).

## Schnellstart

Beispiel für die Verwendung:

```javascript
browser.url('http://foo.bar');
browser.setupInterceptor(); // capture ajax calls
browser.expectRequest('GET', '/api/foo', 200); // expect GET request to /api/foo with 200 statusCode
browser.expectRequest('POST', '/api/foo', 400); // expect POST request to /api/foo with 400 statusCode
browser.expectRequest('GET', /\/api\/foo/, 200); // can validate a URL with regex, too
browser.click('#button'); // button that initiates ajax request
browser.pause(1000); // maybe wait a bit until request is finished
browser.assertRequests(); // validate the requests
```

Details zu Anfragen erhalten:

```javascript
browser.url('http://foo.bar')
browser.setupInterceptor();
browser.click('#button')
browser.pause(1000);

var request = browser.getRequest(0);
assert.equal(request.method, 'GET');
assert.equal(request.response.headers['content-length'], '42');
```

## Unterstützte Browser

Es sollte mit etwas neueren Versionen aller Browser funktionieren. Bitte melden Sie ein Problem, wenn es mit Ihrem Browser nicht zu funktionieren scheint.

## API

Lesen Sie die TypeScript-Deklarationsdatei für die vollständige Syntax der benutzerdefinierten Befehle, die dem WebdriverIO-Browserobjekt hinzugefügt wurden. Im Allgemeinen kann jede Methode, die ein "options"-Objekt als Parameter verwendet, ohne diesen Parameter aufgerufen werden, um das Standardverhalten zu erhalten. Diese "optionalen Options"-Objekte werden mit `?: = {}` gekennzeichnet, und die Standardwerte sind für jede Methode beschrieben.

### Optionsbeschreibungen

Diese Bibliothek bietet eine geringe Konfigurationsmöglichkeit bei der Ausgabe von Befehlen. Konfigurationsoptionen, die von mehreren Methoden verwendet werden, werden hier beschrieben (siehe jede Methodendefinition, um die spezifische Unterstützung zu bestimmen).

* `orderBy` (`'START' | 'END'`): Diese Option steuert die Reihenfolge der vom Interceptor erfassten Anfragen, wenn sie an Ihren Test zurückgegeben werden. Um die Kompatibilität mit bestehenden Versionen dieser Bibliothek zu gewährleisten, ist die Standardsortierung `'END'`, was dem Zeitpunkt entspricht, zu dem die Anfrage abgeschlossen wurde. Wenn Sie die Option `orderBy` auf `'START'` setzen, werden die Anfragen nach dem Zeitpunkt geordnet, zu dem sie gestartet wurden.
* `includePending` (`boolean`): Diese Option steuert, ob noch nicht abgeschlossene Anfragen zurückgegeben werden. Um die Kompatibilität mit bestehenden Versionen dieser Bibliothek zu gewährleisten, ist der Standardwert `false`, und es werden nur abgeschlossene Anfragen zurückgegeben.

### browser.setupInterceptor()

Erfasst Ajax-Aufrufe im Browser. Sie müssen immer die Setup-Funktion aufrufen, um später Anfragen auswerten zu können.

### browser.disableInterceptor()

Verhindert die weitere Erfassung von Ajax-Aufrufen im Browser. Alle erfassten Anfrageinformationen werden entfernt. Die meisten Benutzer müssen den Interceptor nicht deaktivieren, aber wenn ein Test besonders lang läuft oder die Kapazität des Sitzungsspeichers überschreitet, kann das Deaktivieren des Interceptors hilfreich sein.

### `browser.excludeUrls(urlRegexes: (string | RegExp)[])`

Schließt Anfragen von bestimmten URLs von der Aufzeichnung aus. Es akzeptiert ein Array von Strings oder regulären Ausdrücken. Vor dem Schreiben in den Speicher wird die URL der Anfrage gegen jeden String oder regulären Ausdruck getestet. Wenn sie übereinstimmt, wird die Anfrage nicht in den Speicher geschrieben. Wie disableInterceptor kann dies hilfreich sein, wenn Probleme mit der Überschreitung der Kapazität des Sitzungsspeichers auftreten.

### browser.expectRequest(method: string, url: string, statusCode: number)

Erstellen Sie Erwartungen zu den Ajax-Anfragen, die während des Tests initiiert werden. Kann (und sollte) verkettet werden. Die Reihenfolge der Erwartungen sollte der Reihenfolge der durchgeführten Anfragen entsprechen.

* `method` (`String`): HTTP-Methode, die erwartet wird. Kann alles sein, was `xhr.open()` als erstes Argument akzeptiert.
* `url` (`String`|`RegExp`): exakte URL, die in der Anfrage aufgerufen wird, als String oder RegExp zum Abgleich
* `statusCode` (`Number`): erwarteter Statuscode der Antwort

### browser.getExpectations()

Hilfsmethode. Gibt alle Erwartungen zurück, die Sie bis zu diesem Zeitpunkt erstellt haben

### browser.resetExpectations()

Hilfsmethode. Setzt alle Erwartungen zurück, die Sie bis zu diesem Zeitpunkt erstellt haben

### `browser.assertRequests({ orderBy?: 'START' | 'END' }?: = {})`

Rufen Sie diese Methode auf, wenn alle erwarteten Ajax-Anfragen abgeschlossen sind. Sie vergleicht die Erwartungen mit den tatsächlich gestellten Anfragen und überprüft Folgendes:

- Anzahl der gestellten Anfragen
- Die Reihenfolge der Anfragen
- Die Methode, die URL und der Statuscode sollten für jede gestellte Anfrage übereinstimmen
- Das Options-Objekt hat standardmäßig den Wert `{ orderBy: 'END' }`, d.h. wann die Anfragen abgeschlossen wurden, um konsistent mit dem Verhalten von v4.1.10 und früher zu sein. Wenn die Option `orderBy` auf `'START'` gesetzt ist, werden die Anfragen danach geordnet, wann sie von der Seite initiiert wurden.

### `browser.assertExpectedRequestsOnly({ inOrder?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Ähnlich wie `browser.assertRequests`, überprüft aber nur die Anfragen, die Sie in Ihren `expectRequest`-Anweisungen angeben, ohne alle Netzwerkanfragen abbilden zu müssen, die möglicherweise um diese herum stattfinden. Wenn die Option `inOrder` `true` ist (Standard), wird erwartet, dass die Anfragen in derselben Reihenfolge gefunden werden, wie sie mit `expectRequest` eingerichtet wurden.

### `browser.getRequest(index: number, { includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Um anspruchsvollere Behauptungen über eine bestimmte Anfrage aufzustellen, können Sie Details für eine bestimmte Anfrage abrufen. Sie müssen den 0-basierten Index der Anfrage angeben, auf die Sie zugreifen möchten, in der Reihenfolge, in der die Anfragen abgeschlossen wurden (Standard) oder initiiert wurden (durch Übergabe der Option `orderBy: 'START'`).

* `index` (`number`): Nummer der Anfrage, auf die Sie zugreifen möchten
* `options` (`object`): Konfigurationsoptionen
* `options.includePending` (`boolean`): Ob noch nicht abgeschlossene Anfragen zurückgegeben werden sollen. Standardmäßig ist dies false, um dem Verhalten der Bibliothek in v4.1.10 und früher zu entsprechen.
* `options.orderBy` (`'START' | 'END'`): Wie die Anfragen geordnet werden sollen. Standardmäßig ist dies `'END'`, um dem Verhalten der Bibliothek in v4.1.10 und früher zu entsprechen. Bei `'START'` werden die Anfragen nach dem Zeitpunkt der Initiierung und nicht nach dem Zeitpunkt des Abschlusses der Anfrage geordnet. (Da eine ausstehende Anfrage noch nicht abgeschlossen ist, kommen bei der Sortierung nach `'END'` alle ausstehenden Anfragen nach allen abgeschlossenen Anfragen.)

**Gibt** `request`-Objekt zurück:

* `request.url`: angeforderte URL
* `request.method`: verwendete HTTP-Methode
* `request.body`: Nutzlast/Body-Daten, die in der Anfrage verwendet wurden
* `request.headers`: HTTP-Header der Anfrage als JS-Objekt
* `request.pending`: boolesches Flag, ob diese Anfrage abgeschlossen ist (d.h. eine `response`-Eigenschaft hat) oder in Bearbeitung ist.
* `request.response`: ein JS-Objekt, das nur vorhanden ist, wenn die Anfrage abgeschlossen ist (d.h. `request.pending === false`), das Daten über die Antwort enthält.
* `request.response?.headers`: HTTP-Header der Antwort als JS-Objekt
* `request.response?.body`: Antworttext (wird wenn möglich als JSON geparst)
* `request.response?.statusCode`: Statuscode der Antwort

**Ein Hinweis zu `request.body`:** wdio-intercept-service versucht, den Anforderungstext wie folgt zu parsen:

* String: Gibt einfach den String zurück (`'value'`)
* JSON: Parst das JSON-Objekt mit `JSON.parse()` (`({ key: value })`)
* FormData: Gibt die FormData im Format `{ key: [value1, value2, ...] }` aus
* ArrayBuffer: Versucht, den Puffer in einen String zu konvertieren (experimentell)
* Alles andere: Verwendet ein brutales `JSON.stringify()` auf Ihren Daten. Viel Glück!

**Für die `fetch`-API unterstützen wir nur String- und JSON-Daten!**

### `browser.getRequests({ includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Ruft alle erfassten Anfragen als Array ab und unterstützt dieselben optionalen Optionen wie `getRequest`.

**Gibt** ein Array von `request`-Objekten zurück.

### browser.hasPendingRequests()

Eine Hilfsmethode, die prüft, ob noch HTTP-Anfragen ausstehen. Kann von Tests verwendet werden, um sicherzustellen, dass alle Anfragen innerhalb einer angemessenen Zeit abgeschlossen sind, oder um zu überprüfen, ob ein Aufruf von `getRequests()` oder `assertRequests()` alle gewünschten HTTP-Anfragen enthält.

**Gibt** einen booleschen Wert zurück

## TypeScript-Unterstützung

Dieses Plugin stellt seine eigenen TS-Typen bereit. Verweisen Sie einfach in Ihrer tsconfig auf die Typerweiterungen, wie [hier](https://webdriver.io/docs/typescript.html#framework-types) erwähnt:

```
"compilerOptions": {
    // ..
    "types": ["node", "webdriverio", "wdio-intercept-service"]
},
```

## Ausführen der Tests

Aktuelle Versionen von Chrome und Firefox sind erforderlich, um die Tests lokal auszuführen. Möglicherweise müssen Sie die Abhängigkeiten `chromedriver` und `geckodriver` aktualisieren, damit sie mit der auf Ihrem System installierten Version übereinstimmen.

```shell
npm test
```

## Mitwirken

Ich freue mich über jeden Beitrag. Öffnen Sie einfach ein Issue oder reichen Sie direkt einen PR ein.  
Bitte beachten Sie, dass diese Interceptor-Bibliothek für die Arbeit mit Legacy-Browsern wie Internet Explorer geschrieben wurde. Daher muss jeder Code, der in `lib/interceptor.js` verwendet wird, mindestens von der JavaScript-Laufzeitumgebung des Internet Explorer geparst werden können.

## Lizenz

MIT