---
id: driverbinaries
title: Binarios de Controladores
---

Para ejecutar la automatización basada en el protocolo WebDriver, necesitas configurar controladores de navegador que traduzcan los comandos de automatización y puedan ejecutarlos en el navegador.

## Configuración automatizada

Con WebdriverIO `v8.14` y versiones posteriores, ya no es necesario descargar y configurar manualmente los controladores de navegador, ya que WebdriverIO se encarga de esto. Todo lo que tienes que hacer es especificar el navegador que deseas probar y WebdriverIO hará el resto.

### Personalización del nivel de automatización

WebdriverIO tiene tres niveles de automatización:

**1. Descargar e instalar el navegador usando [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Si especificas una combinación de `browserName`/`browserVersion` en la configuración de [capabilities](configuration#capabilities-1), WebdriverIO descargará e instalará la combinación solicitada, independientemente de si ya existe una instalación en la máquina. Si omites `browserVersion`, WebdriverIO primero intentará localizar y usar una instalación existente con [locate-app](https://www.npmjs.com/package/locate-app), de lo contrario descargará e instalará la versión estable actual del navegador. Para más detalles sobre `browserVersion`, consulta [aquí](capabilities#automate-different-browser-channels).

:::caution

La configuración automatizada de navegadores no es compatible con Microsoft Edge. Actualmente, solo Chrome, Chromium y Firefox son compatibles.

:::

Si tienes una instalación de navegador en una ubicación que no puede ser detectada automáticamente por WebdriverIO, puedes especificar el binario del navegador, lo que desactivará la descarga e instalación automatizada.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // o 'firefox' o 'chromium'
            'goog:chromeOptions': { // o 'moz:firefoxOptions' o 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Descargar e instalar el controlador usando [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) o [Geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO siempre hará esto, a menos que se especifique el [binary](capabilities#binary) del controlador en la configuración:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // o 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // o 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // o 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

:::info

WebdriverIO no descargará automáticamente el controlador de Safari, ya que viene preinstalado en macOS.

:::

:::caution

Evita especificar un `binary` para el navegador y omitir el `binary` del controlador correspondiente o viceversa. Si solo se especifica uno de los valores `binary`, WebdriverIO intentará usar o descargar un navegador/controlador compatible con él. Sin embargo, en algunos escenarios puede resultar en una combinación incompatible. Por lo tanto, se recomienda especificar siempre ambos para evitar problemas causados por incompatibilidades de versiones.

:::

**3. Iniciar/detener el controlador.**

Por defecto, WebdriverIO iniciará y detendrá automáticamente el controlador utilizando un puerto no utilizado arbitrario. Especificar cualquiera de las siguientes configuraciones desactivará esta función, lo que significa que tendrás que iniciar y detener manualmente el controlador:

- Cualquier valor para [port](configuration#port).
- Cualquier valor diferente del predeterminado para [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Cualquier valor para [user](configuration#user) y [key](configuration#key).

## Configuración manual

A continuación se describe cómo puedes configurar cada controlador individualmente. Puedes encontrar una lista con todos los controladores en el README de [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Si estás buscando configurar plataformas móviles y otras interfaces de usuario, consulta nuestra guía de [Configuración de Appium](appium).

:::

### Chromedriver

Para automatizar Chrome, puedes descargar Chromedriver directamente en el [sitio web del proyecto](http://chromedriver.chromium.org/downloads) o a través del paquete NPM:

```bash npm2yarn
npm install -g chromedriver
```

Luego puedes iniciarlo mediante:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Para automatizar Firefox, descarga la última versión de `geckodriver` para tu entorno y descomprímela en el directorio de tu proyecto:

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

**Nota:** Otras versiones de `geckodriver` están disponibles [aquí](https://github.com/mozilla/geckodriver/releases). Después de la descarga, puedes iniciar el controlador mediante:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Puedes descargar el controlador para Microsoft Edge en el [sitio web del proyecto](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) o como paquete NPM mediante:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver viene preinstalado en tu MacOS y puede iniciarse directamente mediante:

```sh
safaridriver -p 4444
```