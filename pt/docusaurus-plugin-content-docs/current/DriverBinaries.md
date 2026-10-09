---
id: driverbinaries
title: Binários de Drivers
description: "Deixe o WebdriverIO baixar e gerenciar os drivers de navegador automaticamente, ou configure o Chromedriver, Geckodriver, Edgedriver e Safaridriver manualmente."
---

Para executar automação baseada no protocolo WebDriver, você precisa ter drivers de navegador configurados que traduzam os comandos de automação e sejam capazes de executá-los no navegador.

## Configuração automatizada

Com o WebdriverIO `v8.14` e superior, não há mais necessidade de baixar e configurar manualmente nenhum driver de navegador, pois isso é feito pelo WebdriverIO. Tudo o que você precisa fazer é especificar o navegador que deseja testar e o WebdriverIO fará o resto.

Em ARM64, consulte [Chromedriver em ARM64](arm64-chromedriver) para saber como funciona a configuração do driver no macOS, Windows e Linux, e o que fazer quando ele não puder ser configurado automaticamente.

### Personalizando o nível de automação

O WebdriverIO possui três níveis de automação:

**1. Baixar e instalar o navegador usando [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Se você especificar uma combinação de `browserName`/`browserVersion` na configuração de [capabilities](configuration#capabilities-1), o WebdriverIO irá baixar e instalar a combinação solicitada, independentemente de existir uma instalação na máquina. Se você omitir `browserVersion`, o WebdriverIO tentará primeiro localizar e usar uma instalação existente com [locate-app](https://www.npmjs.com/package/locate-app); caso contrário, irá baixar e instalar a versão estável atual do navegador. Para mais detalhes sobre `browserVersion`, veja [aqui](capabilities#automate-different-browser-channels).

:::caution

A configuração automatizada de navegador não suporta o Microsoft Edge. Atualmente, apenas Chrome, Chromium e Firefox são suportados.

:::

Se você tiver uma instalação de navegador em um local que não pode ser detectado automaticamente pelo WebdriverIO, você pode especificar o binário do navegador, o que desativará o download e a instalação automatizados.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // ou 'firefox' ou 'chromium'
            'goog:chromeOptions': { // ou 'moz:firefoxOptions' ou 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Baixar e instalar o driver: Chromedriver a partir do [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/), Edgedriver e Geckodriver com os pacotes [edgedriver](https://www.npmjs.com/package/edgedriver) e [geckodriver](https://www.npmjs.com/package/geckodriver).**

O WebdriverIO sempre fará isso, a menos que o [binary](capabilities#binary) do driver seja especificado na configuração:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // ou 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // ou 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // ou 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

O WebdriverIO baixa o Chromedriver do Chrome for Testing por padrão, mas em certos casos ele usará uma [versão do Electron](https://github.com/electron/electron/releases):

- [`wdio:electronVersion`](capabilities#wdioelectronversion) está definido, para um aplicativo Electron. Ele usa essa versão, a menos que `browserVersion` e `CHROMEDRIVER_CDNURL` estejam ambos definidos.
- O Chrome é mais antigo que `153.0.8001.0` no Linux ARM64, onde o Chrome for Testing não possui builds do Chromedriver (veja [Chromedriver em ARM64](arm64-chromedriver)). Ele usa a última versão com a mesma versão principal do Chromium.
- O download do Chrome for Testing falha, por exemplo durante uma interrupção do serviço, e `CHROMEDRIVER_CDNURL` não está definido. Ele usa a última versão com a mesma versão principal do Chromium.

:::info

O WebdriverIO não baixará automaticamente o driver do Safari, pois ele já vem instalado no macOS.

:::

:::info Firefox / Geckodriver

O Firefox usa um esquema de versionamento diferente para o navegador (por exemplo, `stable_151.0.1`) do que o [Geckodriver](https://github.com/mozilla/geckodriver/releases) (por exemplo, `0.36.0`), portanto `browserVersion` **não** é usado para escolher a versão do driver. Por padrão, o WebdriverIO baixa o Geckodriver mais recente. Para fixar uma versão específica do driver, defina `geckoDriverVersion` em `wdio:geckodriverOptions`:

```ts
{
    capabilities: [
        {
            browserName: 'firefox',
            browserVersion: 'stable_151.0.1',
            'wdio:geckodriverOptions': {
                geckoDriverVersion: '0.36.0'
            }
        }
    ]
}
```

:::

:::caution

Evite especificar um `binary` para o navegador e omitir o `binary` do driver correspondente, ou vice-versa. Se apenas um dos valores de `binary` for especificado, o WebdriverIO tentará usar ou baixar um navegador/driver compatível com ele. No entanto, em alguns cenários, isso pode resultar em uma combinação incompatível. Portanto, é recomendado que você sempre especifique ambos para evitar quaisquer problemas causados por incompatibilidades de versão.

:::

**3. Iniciar/parar o driver.**

Por padrão, o WebdriverIO iniciará e parará automaticamente o driver usando uma porta arbitrária não utilizada. Especificar qualquer uma das seguintes configurações desativará esse recurso, o que significa que você precisará iniciar e parar o driver manualmente:

- Qualquer valor para [port](configuration#port).
- Qualquer valor diferente do padrão para [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Qualquer valor para ambos [user](configuration#user) e [key](configuration#key).

## Configuração manual

A seguir, descrevemos como você ainda pode configurar cada driver individualmente. Você pode encontrar uma lista com todos os drivers no README do [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Se você deseja configurar plataformas móveis e outras plataformas de UI, dê uma olhada no nosso guia de [Configuração do Appium](appium).

:::

### Chromedriver

Para automatizar o Chrome, você pode baixar o Chromedriver diretamente no [site do projeto](http://chromedriver.chromium.org/downloads) ou através do pacote NPM:

```bash npm2yarn
npm install -g chromedriver
```

Você pode então iniciá-lo via:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Para automatizar o Firefox, baixe a versão mais recente do `geckodriver` para o seu ambiente e descompacte-o no diretório do seu projeto:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Curl', value: 'curl'},
    {label: 'Brew', value: 'brew'},
    {label: 'Windows (64 bit / Chocolatey)', value: 'chocolatey'},
    {label: 'Windows (64 bit / Powershell) DevTools', value: 'powershell'},
  ]
}>
<TabItem value="npm">

```bash npm2yarn
npm install geckodriver
```

</TabItem>
<TabItem value="curl">

Linux:

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | tar xz
```

MacOS (64 bit):

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-macos.tar.gz | tar xz
```

</TabItem>
<TabItem value="brew">

```sh
brew install geckodriver
```

</TabItem>
<TabItem value="chocolatey">

```sh
choco install selenium-gecko-driver
```

</TabItem>
<TabItem value="powershell">

```sh
# Execute como sessão privilegiada. Clique com o botão direito e selecione 'Executar como Administrador'
# Use geckodriver-v0.24.0-win32.zip para Windows 32 bit
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # será salvo no diretório atual, a menos que definido de outra forma
$unzipped_file = "geckodriver" # será descompactado nesta pasta

# Por padrão, o Powershell usa TLS 1.0, mas a segurança do site exige TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Baixa o Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Descompacta o Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Adiciona o Geckodriver globalmente ao PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Observação:** Outras versões do `geckodriver` estão disponíveis [aqui](https://github.com/mozilla/geckodriver/releases). Após o download, você pode iniciar o driver via:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Você pode baixar o driver para o Microsoft Edge no [site do projeto](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) ou como pacote NPM via:

```sh
npm install -g edgedriver
edgedriver --version # exibe: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

O Safaridriver vem pré-instalado no seu MacOS e pode ser iniciado diretamente via:

```sh
safaridriver -p 4444
```