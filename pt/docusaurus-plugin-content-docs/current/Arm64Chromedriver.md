---
id: arm64-chromedriver
title: Chromedriver em ARM64
description: Como o WebdriverIO configura o Chromedriver em ARM64 no macOS, Windows e Linux, e o que fazer quando não existe um driver Linux ARM64 correspondente.
---

O WebdriverIO configura o Chromedriver automaticamente em ARM64. No **macOS** (Apple silicon), o Chrome for Testing publica um Chromedriver nativo `mac-arm64` para todas as versões, então não há nada a configurar. No **Windows 11 on Arm** também funciona sem nenhuma configuração: o Chrome for Testing não publica um Chromedriver `win-arm64`, mas seu Chromedriver `win64` (x64) é executado sob a [emulação x64](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) transparente do Windows e controla tanto um Chrome ARM64 instalado quanto o navegador x64 do Chrome for Testing que o WebdriverIO baixa caso contrário. No **Linux ARM64**, versões do Chrome anteriores a `153.0.8001.0` precisam de uma análise mais detalhada, abordada abaixo.

## Linux ARM64

O Chrome for Testing gera o Chromedriver `linux-arm64` a partir do Chrome **`153.0.8001.0`**, e o WebdriverIO o utiliza diretamente. Para um Chrome ou Chromium mais antigo, como um definido em `goog:chromeOptions.binary`, ele baixa o Chromedriver incluído em uma [versão do Electron](https://github.com/electron/electron/releases) que corresponda à versão principal do Chromium necessária. Esse download vem do GitHub mesmo quando `CHROMEDRIVER_CDNURL` está definido, porque o Chrome for Testing não possui Chromedriver `linux-arm64` abaixo de `153.0.8001.0` para um espelho disponibilizar; offline, use o Chromium e o driver da sua distribuição, conforme mostrado [abaixo](#no-electron-release-ships-a-matching-chromedriver).

O Chrome for Testing também não possui builds do navegador `linux-arm64` antes de `153.0.8001.0`, portanto fixe `browserVersion` abaixo disso somente em conjunto com `goog:chromeOptions.binary` apontando para um navegador ARM64.

## Aplicativos Electron

`wdio:electronVersion` baixa o Chromedriver incluído em uma determinada versão do Electron, em todas as plataformas ARM64. Para um aplicativo Electron, o serviço Electron o define a partir da versão do Electron do aplicativo. Consulte [Capabilities](capabilities#wdioelectronversion) para mais detalhes.

## Solução de problemas

### Nenhuma versão do Electron inclui um Chromedriver correspondente

Algumas versões principais do Chromium, como a 145, nunca foram incluídas em uma versão do Electron. Nesse caso, o WebdriverIO falha em vez de instalar um driver incompatível:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

Para resolver:

- **Use Chrome/Chromium `153.0.8001.0` ou posterior** para que o Chrome for Testing forneça o driver diretamente.
- **No Debian, use o Chromium e o driver da distribuição**, um par arm64 compatível:
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
- **Use seu próprio Chromedriver** com `wdio:chromedriverOptions.binary`, o que desativa o download completamente.

## Relacionados

- [Driver Binaries](driverbinaries): como o WebdriverIO baixa e armazena em cache os drivers de navegador, incluindo o fallback quando o Chrome for Testing falha.
- [Capabilities](capabilities#wdioelectronversion): a opção `wdio:electronVersion`.