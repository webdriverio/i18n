---
id: arm64-chromedriver
title: Chromedriver på ARM64
description: Hur WebdriverIO konfigurerar Chromedriver på ARM64 för macOS, Windows och Linux, och vad du gör när ingen matchande Linux ARM64-drivrutin finns.
---

WebdriverIO konfigurerar Chromedriver automatiskt på ARM64. På **macOS** (Apple silicon) publicerar Chrome for Testing en inbyggd `mac-arm64`-Chromedriver för varje version, så det finns inget att konfigurera. På **Windows 11 on Arm** fungerar det också utan konfiguration: Chrome for Testing publicerar ingen `win-arm64`-Chromedriver, men dess `win64` (x64)-Chromedriver körs under Windows transparenta [x64-emulering](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) och styr både en installerad ARM64-Chrome och den x64-baserade Chrome for Testing-webbläsare som WebdriverIO annars laddar ner. På **Linux ARM64** kräver Chrome-versioner äldre än `153.0.8001.0` en närmare titt, vilket beskrivs nedan.

## Linux ARM64

Chrome for Testing bygger `linux-arm64`-Chromedriver från och med Chrome **`153.0.8001.0`**, och WebdriverIO använder den direkt. För en äldre Chrome eller Chromium, till exempel en som angetts som `goog:chromeOptions.binary`, laddar den ner den Chromedriver som medföljer en [Electron-release](https://github.com/electron/electron/releases) som matchar den nödvändiga Chromium-huvudversionen. Den här nedladdningen kommer från GitHub även när `CHROMEDRIVER_CDNURL` är angiven, eftersom Chrome for Testing inte har någon `linux-arm64`-Chromedriver under `153.0.8001.0` som en spegel skulle kunna tillhandahålla; offline använder du din distributions Chromium och drivrutin enligt [nedan](#no-electron-release-ships-a-matching-chromedriver).

Chrome for Testing har inte heller några `linux-arm64`-webbläsarbyggen före `153.0.8001.0`, så lås `browserVersion` under den versionen endast tillsammans med `goog:chromeOptions.binary` som pekar på en ARM64-webbläsare.

## Electron-appar

`wdio:electronVersion` laddar ner den Chromedriver som medföljer en given Electron-release, på alla ARM64-plattformar. För en Electron-app anger Electron-tjänsten den utifrån appens Electron-version. Se [Capabilities](capabilities#wdioelectronversion) för mer information.

## Felsökning

### Ingen Electron-release levereras med en matchande Chromedriver

Några Chromium-huvudversioner, till exempel 145, levererades aldrig i en Electron-release. WebdriverIO misslyckas då hellre än att installera en drivrutin som inte matchar:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

För att lösa det:

- **Använd Chrome/Chromium `153.0.8001.0` eller senare** så att Chrome for Testing tillhandahåller drivrutinen direkt.
- **På Debian, använd dess Chromium och drivrutin**, ett matchande arm64-par:
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
- **Använd din egen Chromedriver** med `wdio:chromedriverOptions.binary`, vilket inaktiverar nedladdningen helt.

## Relaterat

- [Driver Binaries](driverbinaries): hur WebdriverIO laddar ner och cachar webbläsardrivrutiner, inklusive reservlösningen när Chrome for Testing misslyckas.
- [Capabilities](capabilities#wdioelectronversion): alternativet `wdio:electronVersion`.