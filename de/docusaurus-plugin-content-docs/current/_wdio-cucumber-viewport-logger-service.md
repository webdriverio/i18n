---
id: wdio-cucumber-viewport-logger-service
title: Cucumber Viewport Logger Service
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---


> wdio-cucumber-viewport-logger-service ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Cucumber Viewport Logger Service für WebdriverIO

Dieser Service bietet die Möglichkeit, Ihre Cucumber-Schritte und andere Debug-Informationen direkt im Browserfenster Ihrer WebdriverIO-basierten Lösung anzuzeigen. Besonders nützlich kann dies in Fällen sein, in denen Geräte oder virtuelle Maschinen ohne direkten *physischen* Zugriff verwendet werden und keine Möglichkeit besteht, eine interaktive Sitzung für tiefgehendes Debugging Ihrer E2E-Tests einzurichten.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Schnellstart

Installieren Sie das Paket:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

Fügen Sie den Service zu Ihrem `services`-Konfigurationsabschnitt hinzu, z.B.:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Service-Optionen

| Option  | Beschreibung | Typ |Standardwert |
| --- | --- | --- | --- |
| `numberOfSteps`  | die Anzahl der Schritte, die im Viewport angezeigt werden  | number |3 |
| `enabled`  | Service aktivieren/deaktivieren | boolean |true |
| `styles`  | CSS-Stile für Logger-Wrapper, *Schrittschlüsselwort* und *Schritttext*, siehe Beispiel unten  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // Der Service wird nur aktiviert, wenn Sie die Umgebungsvariable `VP_LOGGER` auf `1` setzen
            // Legen Sie benutzerdefinierte CSS-Stile für bestimmte Elemente fest
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - zeigt eine benutzerdefinierte Nachricht mit benutzerdefiniertem CSS-Stil (nicht obligatorisch) an. Sie können dies in Ihren Step-Definitionen verwenden
z.B.:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - entfernt den Viewport-Nachrichtenbereich, kann zum Beispiel für visuelle Überprüfungen nützlich sein

### pointerEvents: 'none'

Standardmäßig gehen alle Mausereignisse (Klicken, Hover usw.) durch den Nachrichtenbereich. Zum Beispiel: Anstatt auf den Nachrichtenbereich zu klicken, "passiert" Ihr Klick zum Element neben der Nachricht (Ihr App-Element). Wenn Sie dieses Verhalten ändern möchten, setzen Sie die Wrapper-Style-Option 'pointerEvents' auf 'auto', z.B.:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```