---
id: relaunchActiveApp
title: relaunchActiveApp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

Führt einen Neustart der aktiven nativen App durch, indem:

- die aktive App beendet wird
- die zuvor aktive App gestartet wird

:::important
Dieser Befehl wird die aktuelle aktive App neu starten (beenden/schließen und starten/öffnen) und wird NICHT den App-Zustand zurücksetzen. Appium kann keinen harten Reset der App durchführen, es sei denn:

- Sie starten eine neue Sitzung und der Sitzungshandler entfernt den App-Zustand/bereinigt das Gerät
- Sie haben eine Hintertür in Ihrer App, um den App-Zustand zurückzusetzen, und Appium kann diese Hintertür aufrufen

Wenn Sie den App-Zustand für Android oder iOS zurücksetzen möchten, müssen Sie Ihren eigenen Reset-Mechanismus/Befehl in Ihrem Skript erstellen. Optionen könnten sein:

- Android: Verwenden Sie den `adb`-Befehl, um die App-Daten zu löschen: `adb shell pm clear <appPackage>`
- iOS: Installieren Sie die App mit dem Befehl `mobile: installApp` neu
- ....
- Diesen Befehl nicht verwenden

Die Optionen, die Sie haben, hängen von der Plattform, der App und dem Standort (lokal mit meist vollem Zugriff auf das Gerät oder in der Cloud mit weniger Zugriff) ab, den Sie testen.

:::

##### Example

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```
