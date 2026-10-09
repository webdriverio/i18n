---
id: arm64-chromedriver
title: Chromedriver sur ARM64
description: Comment WebdriverIO configure Chromedriver sur macOS, Windows et Linux ARM64, et que faire lorsqu'aucun pilote Linux ARM64 correspondant n'existe.
---

WebdriverIO configure Chromedriver automatiquement sur ARM64. Sur **macOS** (Apple silicon), Chrome for Testing publie un Chromedriver natif `mac-arm64` pour chaque version, il n'y a donc rien à configurer. Sur **Windows 11 on Arm**, cela fonctionne également sans aucune configuration : Chrome for Testing ne publie pas de Chromedriver `win-arm64`, mais son Chromedriver `win64` (x64) s'exécute via l'[émulation x64](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) transparente de Windows et pilote aussi bien un Chrome ARM64 installé que le navigateur Chrome for Testing x64 que WebdriverIO télécharge sinon. Sur **Linux ARM64**, les versions de Chrome antérieures à `153.0.8001.0` nécessitent une attention particulière, détaillée ci-dessous.

## Linux ARM64

Chrome for Testing compile le Chromedriver `linux-arm64` à partir de Chrome **`153.0.8001.0`**, et WebdriverIO l'utilise directement. Pour un Chrome ou Chromium plus ancien, comme celui défini via `goog:chromeOptions.binary`, il télécharge le Chromedriver inclus dans une [version d'Electron](https://github.com/electron/electron/releases) correspondant à la version majeure de Chromium requise. Ce téléchargement provient de GitHub même lorsque `CHROMEDRIVER_CDNURL` est défini, car Chrome for Testing ne propose aucun Chromedriver `linux-arm64` antérieur à `153.0.8001.0` qu'un miroir pourrait servir ; hors ligne, utilisez le Chromium et le pilote de votre distribution comme indiqué [ci-dessous](#no-electron-release-ships-a-matching-chromedriver).

Chrome for Testing ne propose pas non plus de navigateur `linux-arm64` avant `153.0.8001.0`, donc ne fixez `browserVersion` en dessous de cette version qu'en combinaison avec `goog:chromeOptions.binary` pointant vers un navigateur ARM64.

## Applications Electron

`wdio:electronVersion` télécharge le Chromedriver inclus dans une version donnée d'Electron, sur toutes les plateformes ARM64. Pour une application Electron, le service Electron le définit à partir de la version d'Electron de l'application. Consultez [Capabilities](capabilities#wdioelectronversion) pour plus de détails.

## Dépannage

### Aucune version d'Electron ne fournit de Chromedriver correspondant

Quelques versions majeures de Chromium, comme la 145, n'ont jamais été incluses dans une version d'Electron. WebdriverIO échoue alors plutôt que d'installer un pilote incompatible :

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

Pour résoudre ce problème :

- **Utilisez Chrome/Chromium `153.0.8001.0` ou une version ultérieure** afin que Chrome for Testing fournisse directement le pilote.
- **Sur Debian, utilisez son Chromium et son pilote**, une paire arm64 assortie :
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
- **Fournissez votre propre Chromedriver** avec `wdio:chromedriverOptions.binary`, ce qui désactive entièrement le téléchargement.

## Voir aussi

- [Driver Binaries](driverbinaries) : comment WebdriverIO télécharge et met en cache les pilotes de navigateur, y compris la solution de repli lorsque Chrome for Testing échoue.
- [Capabilities](capabilities#wdioelectronversion) : l'option `wdio:electronVersion`.