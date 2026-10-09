---
id: arm64-chromedriver
title: Chromedriver na ARM64
description: Jak WebdriverIO konfiguruje Chromedriver na ARM64 w systemach macOS, Windows i Linux oraz co zrobić, gdy nie istnieje pasujący sterownik dla Linux ARM64.
---

WebdriverIO automatycznie konfiguruje Chromedriver na ARM64. W systemie **macOS** (Apple silicon) Chrome for Testing publikuje natywny Chromedriver `mac-arm64` dla każdej wersji, więc nie trzeba niczego konfigurować. W systemie **Windows 11 on Arm** również działa to bez żadnej konfiguracji: Chrome for Testing nie publikuje Chromedrivera `win-arm64`, ale jego Chromedriver `win64` (x64) działa w ramach przezroczystej [emulacji x64](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) systemu Windows i steruje zarówno zainstalowanym Chrome ARM64, jak i przeglądarką Chrome for Testing x64, którą WebdriverIO pobiera w przeciwnym razie. W systemie **Linux ARM64** wersje Chrome starsze niż `153.0.8001.0` wymagają bliższego przyjrzenia się, co opisano poniżej.

## Linux ARM64

Chrome for Testing buduje Chromedriver `linux-arm64` od wersji Chrome **`153.0.8001.0`** wzwyż, a WebdriverIO używa go bezpośrednio. W przypadku starszej wersji Chrome lub Chromium, np. ustawionej jako `goog:chromeOptions.binary`, pobiera Chromedriver dołączony do [wydania Electron](https://github.com/electron/electron/releases), które odpowiada wymaganej głównej wersji Chromium. To pobieranie odbywa się z GitHuba nawet wtedy, gdy ustawiono `CHROMEDRIVER_CDNURL`, ponieważ Chrome for Testing nie ma Chromedrivera `linux-arm64` poniżej `153.0.8001.0`, który mógłby być udostępniany przez serwer lustrzany; w trybie offline użyj Chromium i sterownika z Twojej dystrybucji, jak pokazano [poniżej](#no-electron-release-ships-a-matching-chromedriver).

Chrome for Testing nie ma również kompilacji przeglądarki `linux-arm64` przed `153.0.8001.0`, więc przypinaj `browserVersion` poniżej tej wersji tylko razem z `goog:chromeOptions.binary` wskazującym na przeglądarkę ARM64.

## Aplikacje Electron

`wdio:electronVersion` pobiera Chromedriver dołączony do danego wydania Electron na każdej platformie ARM64. W przypadku aplikacji Electron usługa Electron ustawia tę wartość na podstawie wersji Electron używanej przez aplikację. Szczegóły znajdziesz w sekcji [Capabilities](capabilities#wdioelectronversion).

## Rozwiązywanie problemów

### Żadne wydanie Electron nie zawiera pasującego Chromedrivera

Kilka głównych wersji Chromium, takich jak 145, nigdy nie pojawiło się w żadnym wydaniu Electron. WebdriverIO zgłasza wtedy błąd zamiast instalować niepasujący sterownik:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

Aby rozwiązać ten problem:

- **Użyj Chrome/Chromium w wersji `153.0.8001.0` lub nowszej**, aby Chrome for Testing udostępniał sterownik bezpośrednio.
- **W systemie Debian użyj jego Chromium i sterownika**, czyli dopasowanej pary arm64:
  ```bash
  sudo apt-get install -y chromium chromium-driver
  ```
  ```ts title="wdio.conf.ts"
  export const config: WebdriverIO.Config = {
      // ...
      capabilities: [{
          browserName: 'chrome',
          'goog:chromeOptions': { binary: '/usr/bin/chromium' },
          'wdio:chromedriverOptions': { binary: '/usr/bin/chromedriver' }
      }]
  }
  ```
- **Użyj własnego Chromedrivera** za pomocą `wdio:chromedriverOptions.binary`, co całkowicie wyłącza pobieranie.

## Powiązane

- [Driver Binaries](driverbinaries): jak WebdriverIO pobiera i przechowuje w pamięci podręcznej sterowniki przeglądarek, w tym mechanizm zastępczy, gdy Chrome for Testing zawiedzie.
- [Capabilities](capabilities#wdioelectronversion): opcja `wdio:electronVersion`.