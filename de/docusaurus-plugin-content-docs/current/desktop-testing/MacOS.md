---
id: macos
title: MacOS
---

WebdriverIO kann beliebige MacOS-Anwendungen mit [Appium](https://appium.io/) automatisieren. Alles, was Sie benötigen, ist [XCode](https://developer.apple.com/xcode/) auf Ihrem System installiert, Appium und der [Mac2 Driver](https://github.com/appium/appium-mac2-driver) als Abhängigkeit installiert und die richtigen Capabilities eingestellt.

## Erste Schritte

Um ein neues WebdriverIO-Projekt zu starten, führen Sie aus:

```sh
npm create wdio@latest ./
```

Ein Installationsassistent führt Sie durch den Prozess. Stellen Sie sicher, dass Sie _"Desktop Testing - of MacOS Applications"_ auswählen, wenn gefragt wird, welche Art von Tests Sie durchführen möchten. Danach behalten Sie einfach die Standardeinstellungen bei oder passen Sie sie nach Ihren Wünschen an.

Der Konfigurationsassistent installiert alle erforderlichen Appium-Pakete und erstellt eine `wdio.conf.js` oder `wdio.conf.ts` mit der notwendigen Konfiguration für Tests auf MacOS. Wenn Sie der automatischen Generierung einiger Testdateien zugestimmt haben, können Sie Ihren ersten Test über `npm run wdio` ausführen.

<CreateMacOSProjectAnimation />

Das war's 🎉

## Beispiel

So kann ein einfacher Test aussehen, der die Taschenrechner-Anwendung öffnet, eine Berechnung durchführt und das Ergebnis überprüft:

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

__Hinweis:__ Die Taschenrechner-App wurde zu Beginn der Sitzung automatisch geöffnet, da `'appium:bundleId': 'com.apple.calculator'` als Capability-Option definiert wurde. Sie können während der Sitzung jederzeit zwischen Apps wechseln.

## Weitere Informationen

Für Informationen zu den Besonderheiten beim Testen auf MacOS empfehlen wir Ihnen, das Projekt [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) zu besuchen.