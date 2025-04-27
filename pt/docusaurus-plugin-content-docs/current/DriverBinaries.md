---
id: driverbinaries
title: Binários de Driver
---

Para executar automação baseada no protocolo WebDriver, você precisa configurar drivers de navegador que traduzam os comandos de automação e sejam capazes de executá-los no navegador.

## Configuração automatizada

Com WebdriverIO `v8.14` e versões posteriores, não é mais necessário baixar e configurar manualmente nenhum driver de navegador, pois isso é tratado pelo WebdriverIO. Tudo o que você precisa fazer é especificar o navegador que deseja testar e o WebdriverIO fará o resto.

### Personalizando o nível de automação

O WebdriverIO tem três níveis de automação:

**1. Baixar e instalar o navegador usando [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Se você especificar uma combinação de `browserName`/`browserVersion` na configuração [capabilities](configuration#capabilities-1), o WebdriverIO baixará e instalará a combinação solicitada, independentemente de haver uma instalação existente na máquina. Se você omitir `browserVersion`, o WebdriverIO primeiro tentará localizar e usar uma instalação existente com [locate-app](https://www.npmjs.com/package/locate-app), caso contrário, ele baixará e instalará a versão estável atual do navegador. Para mais detalhes sobre `browserVersion`, consulte [aqui](capabilities#automate-different-browser-channels).

:::caution

A configuração automatizada de navegador não suporta Microsoft Edge. Atualmente, apenas Chrome, Chromium e Firefox são suportados.

:::

Se você tem uma instalação de navegador em um local que não pode ser detectado automaticamente pelo WebdriverIO, você pode especificar o binário do navegador, o que desativará o download e instalação automatizados.

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

**2. Baixar e instalar o driver usando [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) ou [Geckodriver](https://www.npmjs.com/package/geckodriver).**

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

:::info

O WebdriverIO não baixará automaticamente o driver do Safari, pois ele já vem instalado no macOS.

:::

:::caution

Evite especificar um `binary` para o navegador e omitir o `binary` do driver correspondente ou vice-versa. Se apenas um dos valores `binary` for especificado, o WebdriverIO tentará usar ou baixar um navegador/driver compatível com ele. No entanto, em alguns cenários, isso pode resultar em uma combinação incompatível. Portanto, é recomendável que você sempre especifique ambos para evitar problemas causados por incompatibilidades de versão.

:::

**3. Iniciar/parar o driver.**

Por padrão, o WebdriverIO iniciará e parará automaticamente o driver usando uma porta não utilizada arbitrária. Especificar qualquer uma das seguintes configurações desativará esse recurso, o que significa que você precisará iniciar e parar o driver manualmente:

- Qualquer valor para [port](configuration#port).
- Qualquer valor diferente do padrão para [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Qualquer valor para [user](configuration#user) e [key](configuration#key).

## Configuração manual

A seguir está descrito como você ainda pode configurar cada driver individualmente. Você pode encontrar uma lista com todos os drivers no README do [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Se você está procurando configurar plataformas móveis e outras plataformas de UI, dê uma olhada no nosso guia de [Configuração do Appium](appium).

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
# Run as privileged session. Right-click and set 'Run as Administrator'
# Use geckodriver-v0.24.0-win32.zip for 32 bit Windows
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # will drop into current directory unless defined otherwise
$unzipped_file = "geckodriver" # will unzip to this folder name

# By default, Powershell uses TLS 1.0 the site security requires TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Downloads Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Unzip Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Globally Set Geckodriver to PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Observação:** Outras versões do `geckodriver` estão disponíveis [aqui](https://github.com/mozilla/geckodriver/releases). Após o download, você pode iniciar o driver via:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Você pode baixar o driver para Microsoft Edge no [site do projeto](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) ou como pacote NPM via:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

O Safaridriver vem pré-instalado no seu MacOS e pode ser iniciado diretamente via:

```sh
safaridriver -p 4444
```