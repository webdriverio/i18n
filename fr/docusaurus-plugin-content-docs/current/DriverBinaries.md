---
id: driverbinaries
title: Binaires des pilotes
description: "Laissez WebdriverIO télécharger et gérer automatiquement les pilotes de navigateur, ou configurez manuellement Chromedriver, Geckodriver, Edgedriver et Safaridriver."
---

Pour exécuter une automatisation basée sur le protocole WebDriver, vous devez disposer de pilotes de navigateur configurés qui traduisent les commandes d'automatisation et sont capables de les exécuter dans le navigateur.

## Configuration automatisée

Avec WebdriverIO `v8.14` et versions ultérieures, il n'est plus nécessaire de télécharger et de configurer manuellement des pilotes de navigateur, car cela est géré par WebdriverIO. Il vous suffit de spécifier le navigateur que vous souhaitez tester et WebdriverIO s'occupera du reste.

Sur ARM64, consultez [Chromedriver sur ARM64](arm64-chromedriver) pour savoir comment fonctionne la configuration du pilote sur macOS, Windows et Linux, et que faire lorsqu'il ne peut pas être configuré automatiquement.

### Personnaliser le niveau d'automatisation

WebdriverIO dispose de trois niveaux d'automatisation :

**1. Télécharger et installer le navigateur à l'aide de [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Si vous spécifiez une combinaison `browserName`/`browserVersion` dans la configuration des [capabilities](configuration#capabilities-1), WebdriverIO téléchargera et installera la combinaison demandée, qu'une installation existe déjà ou non sur la machine. Si vous omettez `browserVersion`, WebdriverIO essaiera d'abord de localiser et d'utiliser une installation existante avec [locate-app](https://www.npmjs.com/package/locate-app), sinon il téléchargera et installera la version stable actuelle du navigateur. Pour plus de détails sur `browserVersion`, consultez [cette page](capabilities#automate-different-browser-channels).

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

**2. Télécharger et installer le pilote : Chromedriver depuis [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/), Edgedriver et Geckodriver avec les paquets [edgedriver](https://www.npmjs.com/package/edgedriver) et [geckodriver](https://www.npmjs.com/package/geckodriver).**

WebdriverIO le fera toujours, sauf si le [binaire](capabilities#binary) du pilote est spécifié dans la configuration :

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

WebdriverIO télécharge Chromedriver depuis Chrome for Testing par défaut, mais dans certains cas, il utilisera une [version d'Electron](https://github.com/electron/electron/releases) :

- [`wdio:electronVersion`](capabilities#wdioelectronversion) est défini, pour une application Electron. Il utilise cette version, sauf si `browserVersion` et `CHROMEDRIVER_CDNURL` sont tous deux définis.
- Chrome est antérieur à `153.0.8001.0` sur Linux ARM64, où Chrome for Testing ne propose aucune version de Chromedriver (voir [Chromedriver sur ARM64](arm64-chromedriver)). Il utilise la dernière version ayant la même version majeure de Chromium.
- Le téléchargement depuis Chrome for Testing échoue, par exemple lors d'une panne, et `CHROMEDRIVER_CDNURL` n'est pas défini. Il utilise la dernière version ayant la même version majeure de Chromium.

:::info

WebdriverIO ne téléchargera pas automatiquement le pilote Safari, car il est déjà installé sur macOS.

:::

:::info Firefox / Geckodriver

Firefox utilise un schéma de versionnage différent pour le navigateur (par ex. `stable_151.0.1`) de celui de [Geckodriver](https://github.com/mozilla/geckodriver/releases) (par ex. `0.36.0`), donc `browserVersion` n'est **pas** utilisé pour choisir la version du pilote. Par défaut, WebdriverIO télécharge la dernière version de Geckodriver. Pour fixer une version spécifique du pilote, définissez `geckoDriverVersion` dans `wdio:geckodriverOptions` :

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

Évitez de spécifier un `binary` pour le navigateur en omettant le `binary` du pilote correspondant, ou inversement. Si une seule des valeurs `binary` est spécifiée, WebdriverIO essaiera d'utiliser ou de télécharger un navigateur/pilote compatible avec celle-ci. Cependant, dans certains scénarios, cela peut aboutir à une combinaison incompatible. Par conséquent, il est recommandé de toujours spécifier les deux afin d'éviter tout problème causé par des incompatibilités de versions.

:::

**3. Démarrer/arrêter le pilote.**

Par défaut, WebdriverIO démarrera et arrêtera automatiquement le pilote en utilisant un port arbitraire inutilisé. Spécifier l'une des configurations suivantes désactivera cette fonctionnalité, ce qui signifie que vous devrez démarrer et arrêter le pilote manuellement :

- Toute valeur pour [port](configuration#port).
- Toute valeur différente de la valeur par défaut pour [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Toute valeur à la fois pour [user](configuration#user) et [key](configuration#key).

## Configuration manuelle

Ce qui suit décrit comment vous pouvez toujours configurer chaque pilote individuellement. Vous trouverez une liste de tous les pilotes dans le README [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Si vous souhaitez configurer des plateformes mobiles et d'autres plateformes d'interface utilisateur, consultez notre guide [Configuration d'Appium](appium).

:::

### Chromedriver

Pour automatiser Chrome, vous pouvez télécharger Chromedriver directement sur le [site web du projet](http://chromedriver.chromium.org/downloads) ou via le paquet NPM :

```bash npm2yarn
npm install -g chromedriver
```

Vous pouvez ensuite le démarrer via :

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Pour automatiser Firefox, téléchargez la dernière version de `geckodriver` pour votre environnement et décompressez-la dans le répertoire de votre projet :

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

Linux :

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | tar xz
```

MacOS (64 bits) :

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
# Exécuter en tant que session privilégiée. Faites un clic droit et choisissez 'Exécuter en tant qu'administrateur'
# Utilisez geckodriver-v0.24.0-win32.zip pour Windows 32 bits
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # sera placé dans le répertoire courant sauf indication contraire
$unzipped_file = "geckodriver" # sera décompressé dans un dossier portant ce nom

# Par défaut, Powershell utilise TLS 1.0, mais la sécurité du site exige TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Télécharge Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Décompresse Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Ajoute globalement Geckodriver au PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Remarque :** D'autres versions de `geckodriver` sont disponibles [ici](https://github.com/mozilla/geckodriver/releases). Après le téléchargement, vous pouvez démarrer le pilote via :

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Vous pouvez télécharger le pilote pour Microsoft Edge sur le [site web du projet](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) ou en tant que paquet NPM via :

```sh
npm install -g edgedriver
edgedriver --version # affiche : Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver est préinstallé sur votre MacOS et peut être démarré directement via :

```sh
safaridriver -p 4444
```