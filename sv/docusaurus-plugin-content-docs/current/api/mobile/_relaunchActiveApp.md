---
id: relaunchActiveApp
title: relaunchActiveApp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

Utför en omstart av den aktiva appen genom att:

- avsluta den aktiva appen
- starta den tidigare aktiva appen

:::important
Detta kommando kommer att starta om (avsluta/stänga och lansera/starta) den aktuella aktiva appen och kommer INTE att återställa appens tillstånd. Appium kan inte utföra en hård återställning av
appen såvida inte:

- du startar en ny session och sessionshanteraren tar bort appens tillstånd/rensar enheten
- du har en bakdörr i din app för att återställa appens tillstånd och Appium kan anropa denna bakdörr

Om du vill återställa appens tillstånd för Android eller iOS behöver du skapa din egen återställningsmekanism/kommando i ditt skript. Alternativ kan vara:

- Android: Använd `adb`-kommandot för att rensa appdata: `adb shell pm clear <appPackage>`
- iOS: installera om appen med kommandot `mobile: installApp`
- ....
- använd inte detta kommando

Alternativen du har beror på plattformen, appen och platsen (lokalt med oftast full åtkomst till enheten, eller i molnet med mindre åtkomst) du testar på.

:::

##### Example

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```