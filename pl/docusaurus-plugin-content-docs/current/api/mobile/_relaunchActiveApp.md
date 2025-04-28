---
id: relaunchActiveApp
title: relaunchActiveApp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

Wykonuje ponowne uruchomienie aktywnej aplikacji natywnej poprzez:

- zakończenie działania aktywnej aplikacji
- uruchomienie wcześniej aktywnej aplikacji

:::important
Ta komenda zrestartuje (zakończy/zamknie i uruchomi/rozpocznie) aktualnie aktywną aplikację i NIE zresetuje stanu aplikacji. Appium nie może wykonać twardego resetu 
aplikacji, chyba że:

- rozpoczniesz nową sesję, a handler sesji usunie stan aplikacji/wyczyści urządzenie
- masz w aplikacji backdoor do resetowania stanu aplikacji i Appium może wywołać ten backdoor

Jeśli chcesz zresetować stan aplikacji dla Androida lub iOS, musisz stworzyć własny mechanizm/komendę resetującą w swoim skrypcie. Opcje mogą obejmować:

- Android: Użyj komendy `adb` do wyczyszczenia danych aplikacji: `adb shell pm clear <appPackage>`
- iOS: przeinstaluj aplikację używając komendy `mobile: installApp`
- ....
- nie używaj tej komendy

Dostępne opcje zależą od platformy, aplikacji i lokalizacji (lokalnie, zazwyczaj z pełnym dostępem do urządzenia, lub w chmurze z ograniczonym dostępem), na której testujesz.

:::

##### Przykład

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```