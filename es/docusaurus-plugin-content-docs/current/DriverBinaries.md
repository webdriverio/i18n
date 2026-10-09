---
id: driverbinaries
title: Binarios de controladores
description: "Deja que WebdriverIO descargue y gestione los controladores del navegador automáticamente, o configura Chromedriver, Geckodriver, Edgedriver y Safaridriver manualmente."
---

Para ejecutar automatización basada en el protocolo WebDriver necesitas tener configurados controladores de navegador que traduzcan los comandos de automatización y puedan ejecutarlos en el navegador.

## Configuración automatizada

Con WebdriverIO `v8.14` y versiones superiores ya no es necesario descargar y configurar manualmente ningún controlador de navegador, ya que WebdriverIO se encarga de ello. Todo lo que tienes que hacer es especificar el navegador que quieres probar y WebdriverIO hará el resto.

En ARM64, consulta [Chromedriver en ARM64](arm64-chromedriver) para saber cómo funciona la configuración del controlador en macOS, Windows y Linux, y qué hacer cuando no se puede configurar automáticamente.

### Personalizar el nivel de automatización

WebdriverIO tiene tres niveles de automatización:

**1. Descargar e instalar el navegador usando [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Si especificas una combinación de `browserName`/`browserVersion` en la configuración de [capabilities](configuration#capabilities-1), WebdriverIO descargará e instalará la combinación solicitada, independientemente de si existe una instalación en la máquina. Si omites `browserVersion`, WebdriverIO primero intentará localizar y usar una instalación existente con [locate-app](https://www.npmjs.com/package/locate-app); de lo contrario, descargará e instalará la versión estable actual del navegador. Para más detalles sobre `browserVersion`, consulta [aquí](capabilities#automate-different-browser-channels).

:::caution

La configuración automatizada del navegador no es compatible con Microsoft Edge. Actualmente, solo se admiten Chrome, Chromium y Firefox.

:::

Si tienes una instalación del navegador en una ubicación que WebdriverIO no puede detectar automáticamente, puedes especificar el binario del navegador, lo que desactivará la descarga e instalación automatizadas.

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

**2. Descargar e instalar el controlador: Chromedriver desde [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/), Edgedriver y Geckodriver con los paquetes [edgedriver](https://www.npmjs.com/package/edgedriver) y [geckodriver](https://www.npmjs.com/package/geckodriver).**

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

WebdriverIO descarga Chromedriver desde Chrome for Testing de forma predeterminada, pero en ciertos casos usará una [versión de Electron](https://github.com/electron/electron/releases):

- [`wdio:electronVersion`](capabilities#wdioelectronversion) está configurado, para una aplicación Electron. Usa esa versión, a menos que `browserVersion` y `CHROMEDRIVER_CDNURL` estén ambos configurados.
- Chrome es anterior a `153.0.8001.0` en Linux ARM64, donde Chrome for Testing no tiene compilaciones de Chromedriver (consulta [Chromedriver en ARM64](arm64-chromedriver)). Usa la última versión con la misma versión mayor de Chromium.
- La descarga desde Chrome for Testing falla, por ejemplo durante una interrupción del servicio, y `CHROMEDRIVER_CDNURL` no está configurado. Usa la última versión con la misma versión mayor de Chromium.

:::info

WebdriverIO no descargará automáticamente el controlador de Safari, ya que ya viene instalado en macOS.

:::

:::info Firefox / Geckodriver

Firefox usa un esquema de versiones diferente para el navegador (p. ej. `stable_151.0.1`) que [Geckodriver](https://github.com/mozilla/geckodriver/releases) (p. ej. `0.36.0`), por lo que `browserVersion` **no** se usa para elegir la versión del controlador. De forma predeterminada, WebdriverIO descarga la última versión de Geckodriver. Para fijar una versión específica del controlador, configura `geckoDriverVersion` en `wdio:geckodriverOptions`:

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

Evita especificar un `binary` para el navegador y omitir el `binary` del controlador correspondiente, o viceversa. Si solo se especifica uno de los valores de `binary`, WebdriverIO intentará usar o descargar un navegador/controlador compatible con él. Sin embargo, en algunos escenarios puede dar lugar a una combinación incompatible. Por lo tanto, se recomienda que siempre especifiques ambos para evitar problemas causados por incompatibilidades de versiones.

:::

**3. Iniciar/detener el controlador.**

De forma predeterminada, WebdriverIO iniciará y detendrá automáticamente el controlador usando un puerto arbitrario no utilizado. Especificar cualquiera de las siguientes configuraciones desactivará esta función, lo que significa que tendrás que iniciar y detener el controlador manualmente:

- Cualquier valor para [port](configuration#port).
- Cualquier valor distinto del predeterminado para [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Cualquier valor tanto para [user](configuration#user) como para [key](configuration#key).

## Configuración manual

A continuación se describe cómo puedes seguir configurando cada controlador de forma individual. Puedes encontrar una lista con todos los controladores en el README de [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Si buscas configurar plataformas móviles y otras plataformas de UI, consulta nuestra guía de [Configuración de Appium](appium).

:::

### Chromedriver

Para automatizar Chrome puedes descargar Chromedriver directamente desde el [sitio web del proyecto](http://chromedriver.chromium.org/downloads) o a través del paquete NPM:

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
# Ejecutar como sesión con privilegios. Haz clic derecho y selecciona 'Ejecutar como administrador'
# Usa geckodriver-v0.24.0-win32.zip para Windows de 32 bits
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # se guardará en el directorio actual a menos que se defina lo contrario
$unzipped_file = "geckodriver" # se descomprimirá en una carpeta con este nombre

# De forma predeterminada, Powershell usa TLS 1.0, pero la seguridad del sitio requiere TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Descarga Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Descomprime Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Añade Geckodriver al PATH de forma global
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
edgedriver --version # imprime: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver viene preinstalado en tu MacOS y se puede iniciar directamente mediante:

```sh
safaridriver -p 4444
```