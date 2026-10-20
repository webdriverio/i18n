---
id: arm64-chromedriver
title: Chromedriver en ARM64
description: Cómo WebdriverIO configura Chromedriver en ARM64 para macOS, Windows y Linux, y qué hacer cuando no existe un driver de Linux ARM64 compatible.
---

WebdriverIO configura Chromedriver automáticamente en ARM64. En **macOS** (Apple silicon), Chrome for Testing publica un Chromedriver nativo `mac-arm64` para cada versión, por lo que no hay nada que configurar. En **Windows 11 on Arm** también funciona sin ninguna configuración: Chrome for Testing no publica ningún Chromedriver `win-arm64`, pero su Chromedriver `win64` (x64) se ejecuta bajo la [emulación x64](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) transparente de Windows y controla tanto un Chrome ARM64 instalado como el navegador x64 de Chrome for Testing que WebdriverIO descarga en caso contrario. En **Linux ARM64**, las versiones de Chrome anteriores a `153.0.8001.0` requieren un análisis más detallado, que se describe a continuación.

## Linux ARM64

Chrome for Testing compila Chromedriver para `linux-arm64` a partir de Chrome **`153.0.8001.0`**, y WebdriverIO lo utiliza directamente. Para un Chrome o Chromium más antiguo, como uno establecido en `goog:chromeOptions.binary`, descarga el Chromedriver incluido en una [versión de Electron](https://github.com/electron/electron/releases) que coincida con la versión mayor de Chromium requerida. Esta descarga proviene de GitHub incluso cuando `CHROMEDRIVER_CDNURL` está configurado, ya que Chrome for Testing no tiene ningún Chromedriver `linux-arm64` anterior a `153.0.8001.0` que un mirror pueda servir; sin conexión, utiliza el Chromium y el driver de tu distribución como se muestra [más abajo](#no-electron-release-ships-a-matching-chromedriver).

Chrome for Testing tampoco tiene compilaciones del navegador para `linux-arm64` anteriores a `153.0.8001.0`, por lo que solo debes fijar `browserVersion` por debajo de esa versión junto con `goog:chromeOptions.binary` apuntando a un navegador ARM64.

## Aplicaciones Electron

`wdio:electronVersion` descarga el Chromedriver incluido en una versión determinada de Electron, en todas las plataformas ARM64. Para una aplicación Electron, el servicio de Electron lo establece a partir de la versión de Electron de la aplicación. Consulta [Capabilities](capabilities#wdioelectronversion) para más detalles.

## Solución de problemas

### Ninguna versión de Electron incluye un Chromedriver compatible

Algunas versiones mayores de Chromium, como la 145, nunca se incluyeron en una versión de Electron. En ese caso, WebdriverIO falla en lugar de instalar un driver no compatible:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

Para resolverlo:

- **Usa Chrome/Chromium `153.0.8001.0` o posterior** para que Chrome for Testing sirva el driver directamente.
- **En Debian, usa su Chromium y su driver**, un par arm64 compatible:
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
- **Usa tu propio Chromedriver** con `wdio:chromedriverOptions.binary`, lo que desactiva la descarga por completo.

## Relacionado

- [Driver Binaries](driverbinaries): cómo WebdriverIO descarga y almacena en caché los drivers de navegador, incluido el mecanismo alternativo cuando Chrome for Testing falla.
- [Capabilities](capabilities#wdioelectronversion): la opción `wdio:electronVersion`.