---
id: setting-up-webdriverio
title: Konfiguracja WebdriverIO w Twoim środowisku
description: "Skonfiguruj wdio.conf.ts i capabilities Appium, aby uruchomić aplikację Flutter za pomocą Appium Flutter Driver na Androidzie i iOS."
---

Plik `wdio.conf.ts` to główny plik konfiguracyjny każdego projektu WebdriverIO. To w nim definiujesz, gdzie uruchamiane są testy, jakich frameworków testowych użyć oraz niezbędne `capabilities`, dzięki którym Appium poprawnie zainicjalizuje aplikację Flutter.

:::warning
`appium-flutter-driver` działa inaczej niż tradycyjne natywne sterowniki (takie jak `UiAutomator2` czy `XCUITest`). Komunikuje się z rozszerzeniem testowym Fluttera (`flutter_driver`) za pomocą niestandardowego protokołu. Z tego powodu standardowe natywne polecenia automatyzacji mogą nie działać w ten sam sposób lub mogą bezwzględnie wymagać użycia `appium-flutter-finder`.

Aby w pełni zrozumieć ograniczenia, obsługiwane polecenia i rozszerzenia protokołu, zapoznaj się z oficjalnym repozytorium narzędzia: [Appium Flutter Driver na GitHubie](https://github.com/appium/appium-flutter-driver).
:::

### Konfiguracja capabilities (Android i iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... pozostałe konfiguracje wdio.conf.ts (runner, specs itp.)
    

    services: [
        ['appium', {
            // WebdriverIO zarządza cyklem życia serwera Appium
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // KONFIGURACJA ANDROID
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // Wymusza użycie sterownika Flutter
            'appium:deviceName': 'Android_Emulator', // Nazwa skonfigurowanego emulatora lub fizycznego urządzenia
            // UWAGA DOTYCZĄCA ŚCIEŻKI (Zobacz poniższą notatkę o systemach operacyjnych)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // KONFIGURACJA IOS (Wymaga macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Wymusza użycie sterownika Flutter
            'appium:deviceName': 'iPhone Simulator', // Nazwa symulatora iOS lub fizycznego urządzenia
            'appium:platformVersion': '17.2', // Zmień na docelową wersję systemu
            // UWAGA DOTYCZĄCA ŚCIEŻKI (Zobacz poniższą notatkę o systemach operacyjnych)
            // Użyj .app dla symulatora iOS lub .ipa dla fizycznych urządzeń iOS
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... reszta konfiguracji
};
```

### Ważne uwagi dotyczące ścieżek plików (appium:app)

Definiowanie ścieżki do pliku binarnego aplikacji (`.apk` dla Androida, `.app` lub `.ipa` dla iOS) we właściwości `appium:app` wymaga szczególnej uwagi w zależności od systemu operacyjnego i środowiska docelowego:

- **W systemie Windows**: System operacyjny używa ukośników wstecznych (`\`) w ścieżkach katalogów. Podając ścieżkę do pliku `.apk` w systemie Windows, pamiętaj o zastosowaniu sekwencji ucieczki dla ukośników wstecznych w pliku konfiguracyjnym (np. `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) lub konsekwentnie używaj ukośników (`/`), które są poprawnie interpretowane przez Node.js.
- **W systemach macOS / Linux**: Używane są standardowe ścieżki z ukośnikami (`/`). Pamiętaj, że buildy iOS (`.app` dla symulatora lub `.ipa` dla fizycznych urządzeń) można kompilować wyłącznie w środowisku macOS.
- **Symulator iOS a fizyczne urządzenia**: Używaj pakietów `.app` podczas uruchamiania testów na symulatorze iOS oraz podpisanych pakietów `.ipa` podczas uruchamiania ich na fizycznych urządzeniach iOS.
- **Ścieżki bezwzględne a względne**: Zdecydowanie zaleca się używanie ścieżek względnych, zaczynających się od katalogu głównego projektu (z użyciem `./`), aby zagwarantować przenośność między różnymi maszynami deweloperskimi oraz środowiskami ciągłej integracji (CI).