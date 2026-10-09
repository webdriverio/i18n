---
id: arm64-chromedriver
title: Chromedriver su ARM64
description: Come WebdriverIO configura Chromedriver su ARM64 per macOS, Windows e Linux, e cosa fare quando non esiste un driver Linux ARM64 corrispondente.
---

WebdriverIO configura Chromedriver automaticamente su ARM64. Su **macOS** (Apple silicon), Chrome for Testing pubblica un Chromedriver nativo `mac-arm64` per ogni versione, quindi non c'è nulla da configurare. Anche su **Windows 11 on Arm** funziona senza alcuna configurazione: Chrome for Testing non pubblica alcun Chromedriver `win-arm64`, ma il suo Chromedriver `win64` (x64) viene eseguito tramite l'[emulazione x64](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) trasparente di Windows e controlla sia un Chrome ARM64 installato sia il browser x64 Chrome for Testing che WebdriverIO scarica in alternativa. Su **Linux ARM64**, le versioni di Chrome precedenti alla `153.0.8001.0` richiedono maggiore attenzione, come descritto di seguito.

## Linux ARM64

Chrome for Testing compila Chromedriver `linux-arm64` a partire da Chrome **`153.0.8001.0`**, e WebdriverIO lo utilizza direttamente. Per un Chrome o Chromium più vecchio, ad esempio uno impostato come `goog:chromeOptions.binary`, scarica il Chromedriver incluso in una [release di Electron](https://github.com/electron/electron/releases) che corrisponde alla versione major di Chromium richiesta. Questo download proviene da GitHub anche quando `CHROMEDRIVER_CDNURL` è impostato, perché Chrome for Testing non dispone di alcun Chromedriver `linux-arm64` precedente alla `153.0.8001.0` che un mirror possa fornire; in modalità offline, utilizza il Chromium e il driver della tua distribuzione come mostrato [di seguito](#no-electron-release-ships-a-matching-chromedriver).

Chrome for Testing non dispone nemmeno di build del browser `linux-arm64` precedenti alla `153.0.8001.0`, quindi fissa `browserVersion` a una versione inferiore solo insieme a `goog:chromeOptions.binary` che punta a un browser ARM64.

## App Electron

`wdio:electronVersion` scarica il Chromedriver incluso in una determinata release di Electron, su ogni piattaforma ARM64. Per un'app Electron, il servizio Electron lo imposta in base alla versione di Electron dell'app. Consulta [Capabilities](capabilities#wdioelectronversion) per i dettagli.

## Risoluzione dei problemi

### Nessuna release di Electron include un Chromedriver corrispondente

Alcune versioni major di Chromium, come la 145, non sono mai state incluse in una release di Electron. In questo caso WebdriverIO genera un errore anziché installare un driver non corrispondente:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

Per risolvere il problema:

- **Usa Chrome/Chromium `153.0.8001.0` o successivo** in modo che Chrome for Testing fornisca direttamente il driver.
- **Su Debian, usa il suo Chromium e il relativo driver**, una coppia arm64 corrispondente:
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
- **Usa il tuo Chromedriver** con `wdio:chromedriverOptions.binary`, che disabilita completamente il download.

## Correlati

- [Driver Binaries](driverbinaries): come WebdriverIO scarica e memorizza nella cache i driver dei browser, incluso il fallback quando Chrome for Testing non funziona.
- [Capabilities](capabilities#wdioelectronversion): l'opzione `wdio:electronVersion`.