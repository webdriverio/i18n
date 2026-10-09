---
id: arm64-chromedriver
title: Chromedriver на ARM64
description: Как WebdriverIO настраивает Chromedriver на ARM64 в macOS, Windows и Linux, и что делать, если подходящего драйвера для Linux ARM64 не существует.
---

WebdriverIO автоматически настраивает Chromedriver на ARM64. В **macOS** (Apple silicon) Chrome for Testing публикует нативный `mac-arm64` Chromedriver для каждой версии, поэтому ничего настраивать не нужно. В **Windows 11 on Arm** всё также работает без какой-либо конфигурации: Chrome for Testing не публикует `win-arm64` Chromedriver, но его `win64` (x64) Chromedriver работает через прозрачную [эмуляцию x64](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) в Windows и управляет как установленным ARM64 Chrome, так и x64-браузером Chrome for Testing, который WebdriverIO загружает в остальных случаях. В **Linux ARM64** версии Chrome старше `153.0.8001.0` требуют более внимательного рассмотрения, о чём рассказано ниже.

## Linux ARM64

Chrome for Testing собирает `linux-arm64` Chromedriver начиная с Chrome **`153.0.8001.0`**, и WebdriverIO использует его напрямую. Для более старых Chrome или Chromium, например указанных в `goog:chromeOptions.binary`, он загружает Chromedriver, входящий в состав [релиза Electron](https://github.com/electron/electron/releases), который соответствует требуемой мажорной версии Chromium. Эта загрузка выполняется с GitHub даже при заданной переменной `CHROMEDRIVER_CDNURL`, поскольку у Chrome for Testing нет `linux-arm64` Chromedriver ниже `153.0.8001.0`, который могло бы раздавать зеркало; в офлайн-режиме используйте Chromium и драйвер из вашего дистрибутива, как показано [ниже](#no-electron-release-ships-a-matching-chromedriver).

У Chrome for Testing также нет сборок браузера `linux-arm64` до `153.0.8001.0`, поэтому фиксируйте `browserVersion` ниже этой версии только вместе с `goog:chromeOptions.binary`, указывающим на ARM64-браузер.

## Приложения Electron

`wdio:electronVersion` загружает Chromedriver, входящий в состав указанного релиза Electron, на любой платформе ARM64. Для приложения Electron сервис Electron задаёт это значение на основе версии Electron, используемой приложением. Подробнее см. в разделе [Capabilities](capabilities#wdioelectronversion).

## Устранение неполадок

### Ни один релиз Electron не содержит подходящего Chromedriver

Некоторые мажорные версии Chromium, например 145, никогда не входили ни в один релиз Electron. В этом случае WebdriverIO завершается с ошибкой, а не устанавливает несоответствующий драйвер:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

Чтобы решить эту проблему:

- **Используйте Chrome/Chromium `153.0.8001.0` или новее**, чтобы Chrome for Testing предоставлял драйвер напрямую.
- **В Debian используйте его Chromium и драйвер** — согласованную пару для arm64:
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
- **Используйте собственный Chromedriver** с помощью `wdio:chromedriverOptions.binary`, что полностью отключает загрузку.

## Связанные материалы

- [Driver Binaries](driverbinaries): как WebdriverIO загружает и кэширует драйверы браузеров, включая резервный механизм на случай сбоя Chrome for Testing.
- [Capabilities](capabilities#wdioelectronversion): опция `wdio:electronVersion`.