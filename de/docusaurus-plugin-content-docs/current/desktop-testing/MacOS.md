---
id: macos
title: MacOS
description: "Automatisieren Sie native macOS-Anwendungen mit WebdriverIO unter Verwendung von Appium und dem Mac2-Treiber, beginnend mit dem Projekt-Setup-Assistenten."
---

WebdriverIO kann beliebige MacOS-Anwendungen mithilfe von [Appium](https://appium.io/) automatisieren. Alles, was Sie benötigen, ist eine Installation von [XCode](https://developer.apple.com/xcode/) auf Ihrem System, Appium und den [Mac2 Driver](https://github.com/appium/appium-mac2-driver) als installierte Abhängigkeiten sowie die korrekt gesetzten Capabilities.

## Erste Schritte

Um ein neues WebdriverIO-Projekt zu initiieren, führen Sie Folgendes aus:

```sh
npm create wdio@latest ./
```

Ein Installationsassistent führt Sie durch den Prozess. Stellen Sie sicher, dass Sie _"Desktop Testing - of MacOS Applications"_ auswählen, wenn Sie gefragt werden, welche Art von Tests Sie durchführen möchten. Behalten Sie anschließend einfach die Standardeinstellungen bei oder passen Sie sie nach Ihren Wünschen an.

Der Konfigurationsassistent installiert alle erforderlichen Appium-Pakete und erstellt eine `wdio.conf.js` oder `wdio.conf.ts` mit der notwendigen Konfiguration, um auf MacOS zu testen. Wenn Sie zugestimmt haben, einige Testdateien automatisch generieren zu lassen, können Sie Ihren ersten Test über `npm run wdio` ausführen.

<CreateMacOSProjectAnimation />

Das war's 🎉

## Beispiel

So kann ein einfacher Test aussehen, der die Rechner-Anwendung öffnet, eine Berechnung durchführt und das Ergebnis überprüft:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__Hinweis:__ Die Rechner-App wurde zu Beginn der Session automatisch geöffnet, da `'appium:bundleId': 'com.apple.calculator'` als Capability-Option definiert wurde. Sie können während der Session jederzeit zwischen Apps wechseln.

## Weitere Informationen

Für Informationen zu den Besonderheiten beim Testen auf MacOS empfehlen wir, sich das Projekt [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) anzusehen.