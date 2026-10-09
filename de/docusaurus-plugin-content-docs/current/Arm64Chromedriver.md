---
id: arm64-chromedriver
title: Chromedriver auf ARM64
description: Wie WebdriverIO Chromedriver auf ARM64 unter macOS, Windows und Linux einrichtet und was zu tun ist, wenn kein passender Linux-ARM64-Treiber existiert.
---

WebdriverIO richtet Chromedriver auf ARM64 automatisch ein. Unter **macOS** (Apple Silicon) veröffentlicht Chrome for Testing für jede Version einen nativen `mac-arm64`-Chromedriver, sodass nichts eingerichtet werden muss. Unter **Windows 11 on Arm** funktioniert es ebenfalls ohne Konfiguration: Chrome for Testing veröffentlicht zwar keinen `win-arm64`-Chromedriver, aber dessen `win64`-Chromedriver (x64) läuft unter der transparenten [x64-Emulation](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) von Windows und steuert sowohl ein installiertes ARM64-Chrome als auch den x64-Chrome-for-Testing-Browser, den WebdriverIO andernfalls herunterlädt. Unter **Linux ARM64** erfordern Chrome-Versionen älter als `153.0.8001.0` einen genaueren Blick, wie unten beschrieben.

## Linux ARM64

Chrome for Testing erstellt ab Chrome **`153.0.8001.0`** einen `linux-arm64`-Chromedriver, den WebdriverIO direkt verwendet. Für ein älteres Chrome oder Chromium, etwa eines, das als `goog:chromeOptions.binary` festgelegt ist, lädt es den Chromedriver herunter, der in einem [Electron-Release](https://github.com/electron/electron/releases) enthalten ist, das der benötigten Chromium-Hauptversion entspricht. Dieser Download erfolgt von GitHub, selbst wenn `CHROMEDRIVER_CDNURL` gesetzt ist, da Chrome for Testing unterhalb von `153.0.8001.0` keinen `linux-arm64`-Chromedriver hat, den ein Mirror bereitstellen könnte; offline verwenden Sie das Chromium und den Treiber Ihrer Distribution, wie [unten](#no-electron-release-ships-a-matching-chromedriver) gezeigt.

Chrome for Testing hat vor `153.0.8001.0` auch keine `linux-arm64`-Browser-Builds, legen Sie `browserVersion` daher nur dann auf eine niedrigere Version fest, wenn gleichzeitig `goog:chromeOptions.binary` auf einen ARM64-Browser verweist.

## Electron-Apps

`wdio:electronVersion` lädt auf jeder ARM64-Plattform den Chromedriver herunter, der mit einem bestimmten Electron-Release ausgeliefert wird. Bei einer Electron-App setzt der Electron-Service diesen Wert anhand der Electron-Version der App. Weitere Details finden Sie unter [Capabilities](capabilities#wdioelectronversion).

## Fehlerbehebung

### Kein Electron-Release liefert einen passenden Chromedriver

Einige Chromium-Hauptversionen, wie etwa 145, wurden nie in einem Electron-Release ausgeliefert. WebdriverIO schlägt dann fehl, anstatt einen nicht passenden Treiber zu installieren:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

So beheben Sie das Problem:

- **Verwenden Sie Chrome/Chromium `153.0.8001.0` oder neuer**, damit Chrome for Testing den Treiber direkt bereitstellt.
- **Verwenden Sie unter Debian dessen Chromium und Treiber**, ein aufeinander abgestimmtes arm64-Paar:
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
- **Verwenden Sie Ihren eigenen Chromedriver** mit `wdio:chromedriverOptions.binary`, wodurch der Download vollständig deaktiviert wird.

## Verwandte Themen

- [Treiber-Binärdateien](driverbinaries): wie WebdriverIO Browser-Treiber herunterlädt und zwischenspeichert, einschließlich des Fallbacks, wenn Chrome for Testing fehlschlägt.
- [Capabilities](capabilities#wdioelectronversion): die Option `wdio:electronVersion`.