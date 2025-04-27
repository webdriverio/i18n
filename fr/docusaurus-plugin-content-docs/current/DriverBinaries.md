---
id: driverbinaries
title: Pilotes de Navigateurs
---

Pour exécuter l'automatisation basée sur le protocole WebDriver, vous devez configurer des pilotes de navigateur qui traduisent les commandes d'automatisation et peuvent les exécuter dans le navigateur.

## Configuration automatisée

Avec WebdriverIO `v8.14` et versions ultérieures, il n'est plus nécessaire de télécharger et configurer manuellement les pilotes de navigateur, car WebdriverIO s'en charge. Tout ce que vous avez à faire est de spécifier le navigateur que vous souhaitez tester et WebdriverIO fera le reste.

### Personnalisation du niveau d'automatisation

WebdriverIO propose trois niveaux d'automatisation :

**1. Téléchargement et installation du navigateur à l'aide de [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Si vous spécifiez une combinaison `browserName`/`browserVersion` dans la configuration des [capabilities](configuration#capabilities-1), WebdriverIO téléchargera et installera la combinaison demandée, qu'une installation existante soit présente sur la machine ou non. Si vous omettez `browserVersion`, WebdriverIO essaiera d'abord de localiser et d'utiliser une installation existante avec [locate-app](https://www.npmjs.com/package/locate-app), sinon il téléchargera et installera la version stable actuelle du navigateur. Pour plus de détails sur `browserVersion`, voir [ici](capabilities#automate-different-browser-channels).

:::caution

La configuration automatisée du navigateur ne prend pas en charge Microsoft Edge. Actuellement, seuls Chrome, Chromium et Firefox sont pris en charge.

:::

Si vous avez une installation de navigateur à un emplacement qui ne peut pas être détecté automatiquement par WebdriverIO, vous pouvez spécifier le binaire du navigateur, ce qui désactivera le téléchargement et l'installation automatisés.

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

**2. Téléchargement et installation du pilote à l'aide de [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) ou [Geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO le fera toujours, sauf si le [binary](capabilities#binary) du pilote est spécifié dans la configuration :

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

WebdriverIO ne téléchargera pas automatiquement le pilote Safari car il est déjà installé sur macOS.

:::

:::caution

Évitez de spécifier un `binary` pour le navigateur et d'omettre le `binary` du pilote correspondant ou vice-versa. Si une seule des valeurs `binary` est spécifiée, WebdriverIO essaiera d'utiliser ou de télécharger un navigateur/pilote compatible. Cependant, dans certains scénarios, cela peut entraîner une combinaison incompatible. Par conséquent, il est recommandé de toujours spécifier les deux pour éviter tout problème causé par des incompatibilités de version.

:::

**3. Démarrage/arrêt du pilote.**

Par défaut, WebdriverIO démarrera et arrêtera automatiquement le pilote en utilisant un port inutilisé arbitraire. Spécifier l'une des configurations suivantes désactivera cette fonctionnalité, ce qui signifie que vous devrez démarrer et arrêter manuellement le pilote :

- Toute valeur pour [port](configuration#port).
- Toute valeur différente de la valeur par défaut pour [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Toute valeur pour [user](configuration#user) et [key](configuration#key).

## Configuration manuelle

Ce qui suit décrit comment vous pouvez toujours configurer chaque pilote individuellement. Vous pouvez trouver une liste de tous les pilotes dans le README [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Si vous cherchez à configurer des plateformes mobiles et autres interfaces utilisateur, consultez notre guide [Configuration Appium](appium).

:::

### Chromedriver

Pour automatiser Chrome, vous pouvez télécharger Chromedriver directement sur le [site du projet](http://chromedriver.chromium.org/downloads) ou via le package NPM :

```bash npm2yarn
npm install -g chromedriver
```

Vous pouvez ensuite le démarrer via :

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Pour automatiser Firefox, téléchargez la dernière version de `geckodriver` pour votre environnement et décompressez-la dans votre répertoire de projet :

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

**Remarque :** D'autres versions de `geckodriver` sont disponibles [ici](https://github.com/mozilla/geckodriver/releases). Après le téléchargement, vous pouvez démarrer le pilote via :

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Vous pouvez télécharger le pilote pour Microsoft Edge sur le [site du projet](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) ou comme package NPM via :

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver est préinstallé sur votre MacOS et peut être démarré directement via :

```sh
safaridriver -p 4444
```