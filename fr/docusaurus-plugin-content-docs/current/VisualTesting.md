---
id: visual-testing
title: Tests Visuels
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Que peut-il faire ?

WebdriverIO fournit des comparaisons d'images sur les écrans, les éléments ou une page complète pour

-   🖥️ Navigateurs de bureau (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Navigateurs mobiles / tablettes (Chrome sur émulateurs Android / Safari sur Simulateurs iOS / Simulateurs / appareils réels) via Appium
-   📱 Applications natives (émulateurs Android / Simulateurs iOS / appareils réels) via Appium (🌟 **NOUVEAU** 🌟)
-   📳 Applications hybrides via Appium

à travers le [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) qui est un service WebdriverIO léger.

Cela vous permet de :

-   sauvegarder ou comparer des **écrans/éléments/pages complètes** par rapport à une référence
-   **créer automatiquement une référence** lorsqu'aucune référence n'existe
-   **bloquer des régions personnalisées** et même **exclure automatiquement** une barre d'état et/ou des barres d'outils (uniquement mobile) pendant une comparaison
-   augmenter les dimensions des captures d'écran d'éléments
-   **masquer le texte** pendant la comparaison de sites web pour :
    -   **améliorer la stabilité** et éviter les problèmes de rendu de police
    -   se concentrer uniquement sur la **mise en page** d'un site web
-   utiliser **différentes méthodes de comparaison** et un ensemble de **matchers supplémentaires** pour des tests plus lisibles
-   vérifier comment votre site web **prendra en charge la navigation par tabulation avec votre clavier**, voir aussi [Navigation par tabulation sur un site web](#tabbing-through-a-website)
-   et bien plus encore, voir les options de [service](./visual-testing/service-options) et de [méthode](./visual-testing/method-options)

Le service est un module léger pour récupérer les données et captures d'écran nécessaires pour tous les navigateurs/appareils. La puissance de comparaison provient de [ResembleJS](https://github.com/Huddle/Resemble.js). Si vous souhaitez comparer des images en ligne, vous pouvez consulter l'[outil en ligne](http://rsmbl.github.io/Resemble.js/).

:::info REMARQUE pour les applications natives/hybrides
Les méthodes `saveScreen`, `saveElement`, `checkScreen`, `checkElement` et les matchers `toMatchScreenSnapshot` et `toMatchElementSnapshot` peuvent être utilisés pour les applications/contextes natifs.

Veuillez utiliser la propriété `isHybridApp:true` dans vos paramètres de service lorsque vous souhaitez l'utiliser pour des applications hybrides.
:::

## Installation

La façon la plus simple est de garder `@wdio/visual-service` comme dépendance de développement dans votre `package.json`, via :

```sh
npm install --save-dev @wdio/visual-service
```

## Utilisation

`@wdio/visual-service` peut être utilisé comme un service normal. Vous pouvez le configurer dans votre fichier de configuration comme suit :

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Configuration
    // =====
    services: [
        [
            "visual",
            {
                // Quelques options, voir la documentation pour plus d'informations
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... plus d'options
            },
        ],
    ],
    // ...
};
```

Plus d'options de service peuvent être trouvées [ici](/docs/visual-testing/service-options).

Une fois configuré dans votre configuration WebdriverIO, vous pouvez ajouter des assertions visuelles à [vos tests](/docs/visual-testing/writing-tests).

### Capabilities
Pour utiliser le module de tests visuels, **vous n'avez pas besoin d'ajouter d'options supplémentaires à vos capabilities**. Cependant, dans certains cas, vous pourriez vouloir ajouter des métadonnées supplémentaires à vos tests visuels, comme un `logName`.

Le `logName` vous permet d'attribuer un nom personnalisé à chaque capability, qui peut ensuite être inclus dans les noms de fichiers d'images. C'est particulièrement utile pour distinguer les captures d'écran prises sur différents navigateurs, appareils ou configurations.

Pour activer cela, vous pouvez définir `logName` dans la section `capabilities` et vous assurer que l'option `formatImageName` dans le service de tests visuels y fait référence. Voici comment vous pouvez le configurer :

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Configuration
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Nom de journal personnalisé pour Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Nom de journal personnalisé pour Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Quelques options, voir la documentation pour plus d'informations
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Le format ci-dessous utilisera le `logName` des capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... plus d'options
            },
        ],
    ],
    // ...
};
```

#### Comment ça fonctionne
1. Configuration du `logName` :

    - Dans la section `capabilities`, attribuez un `logName` unique à chaque navigateur ou appareil. Par exemple, `chrome-mac-15` identifie les tests exécutés sur Chrome sur macOS version 15.

2. Nommage d'image personnalisé :

    - L'option `formatImageName` intègre le `logName` dans les noms de fichiers de captures d'écran. Par exemple, si le `tag` est homepage et la résolution est `1920x1080`, le nom de fichier résultant pourrait ressembler à ceci :

        `homepage-chrome-mac-15-1920x1080.png`

3. Avantages du nommage personnalisé :

    - La distinction entre les captures d'écran de différents navigateurs ou appareils devient beaucoup plus facile, surtout lors de la gestion des références et du débogage des écarts.

4. Remarque sur les valeurs par défaut :

    -Si `logName` n'est pas défini dans les capabilities, l'option `formatImageName` l'affichera comme une chaîne vide dans les noms de fichiers (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Nous prenons également en charge [MultiRemote](https://webdriver.io/docs/multiremote/). Pour que cela fonctionne correctement, assurez-vous d'ajouter `wdio-ics:options` à vos
capabilities comme vous pouvez le voir ci-dessous. Cela garantira que chaque capture d'écran aura son propre nom unique.

[Écrire vos tests](/docs/visual-testing/writing-tests) ne sera pas différent par rapport à l'utilisation du [testrunner](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // CECI !!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // CECI !!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Exécution programmatique

Voici un exemple minimal de la façon d'utiliser `@wdio/visual-service` via les options `remote` :

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "Démarrer" le service pour ajouter les commandes personnalisées au `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// ou utilisez ceci pour SEULEMENT sauvegarder une capture d'écran
await browser.saveFullPageScreen("examplePaged", {});

// ou utilisez ceci pour valider. Les deux méthodes n'ont pas besoin d'être combinées, voir la FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Navigation par tabulation sur un site web

Vous pouvez vérifier si un site web est accessible en utilisant la touche <kbd>TAB</kbd> du clavier. Tester cette partie de l'accessibilité a toujours été une tâche (manuelle) chronophage et assez difficile à réaliser par l'automatisation.
Avec les méthodes `saveTabbablePage` et `checkTabbablePage`, vous pouvez maintenant dessiner des lignes et des points sur votre site web pour vérifier l'ordre de tabulation.

Soyez conscient du fait que cela n'est utile que pour les navigateurs de bureau et **PAS\*\*** pour les appareils mobiles. Tous les navigateurs de bureau prennent en charge cette fonctionnalité.

:::note

Le travail est inspiré par le billet de blog de [Viv Richards](https://github.com/vivrichards600) sur ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

La façon dont les éléments tabulables sont sélectionnés est basée sur le module [tabbable](https://github.com/davidtheclark/tabbable). S'il y a des problèmes concernant la tabulation, veuillez consulter le [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) et en particulier la section [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Comment ça fonctionne

Les deux méthodes créeront un élément `canvas` sur votre site web et dessineront des lignes et des points pour vous montrer où votre TAB irait si un utilisateur final l'utilisait. Après cela, il créera une capture d'écran de la page complète pour vous donner un bon aperçu du flux.

:::important

**Utilisez `saveTabbablePage` uniquement lorsque vous devez créer une capture d'écran et que vous ne voulez PAS la comparer **avec une image de **référence**.\*\*\*\*

:::

Lorsque vous voulez comparer le flux de tabulation avec une référence, vous pouvez utiliser la méthode `checkTabbablePage`. Vous **N'AVEZ PAS** besoin d'utiliser les deux méthodes ensemble. S'il existe déjà une image de référence créée, qui peut être automatiquement générée en fournissant `autoSaveBaseline: true` lors de l'instanciation du service,
`checkTabbablePage` créera d'abord l'image _actuelle_ puis la comparera à la référence.

##### Options

Les deux méthodes utilisent les mêmes options que `saveFullPageScreen` ou `compareFullPageScreen`.

#### Exemple

Voici un exemple de fonctionnement de la tabulation sur notre [site web guinea pig](https://guinea-pig.webdriver.io/image-compare.html) :

![Exemple de tabulation WDIO](/img/visual/tabbable-chrome-latest-1366x768.png)

### Mettre à jour automatiquement les instantanés visuels échoués

Mettez à jour les images de référence via la ligne de commande en ajoutant l'argument `--update-visual-baseline`. Cela va

-   copier automatiquement la capture d'écran réelle et la placer dans le dossier de référence
-   s'il y a des différences, il fera passer le test car la référence a été mise à jour

**Utilisation :**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Lors de l'exécution des journaux en mode info/debug, vous verrez les journaux suivants ajoutés

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Support TypeScript

Ce module inclut la prise en charge de TypeScript, vous permettant de bénéficier de l'auto-complétion, de la sécurité de type et d'une meilleure expérience de développement lors de l'utilisation du service de tests visuels.

### Étape 1 : Ajouter les définitions de type
Pour vous assurer que TypeScript reconnaît les types du module, ajoutez l'entrée suivante au champ types dans votre tsconfig.json :

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Étape 2 : Activer la sécurité de type pour les options de service
Pour appliquer la vérification de type sur les options de service, mettez à jour votre configuration WebdriverIO :

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importer la définition de type
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Configuration
    // =====
    services: [
        [
            "visual",
            {
                // Options de service
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Assure la sécurité de type
        ],
    ],
    // ...
};
```

## Exigences système

### Version 5 et supérieure

Pour la version 5 et supérieure, ce module est un module purement basé sur JavaScript sans dépendances système supplémentaires au-delà des [exigences générales du projet](/docs/gettingstarted#system-requirements). Il utilise [Jimp](https://github.com/jimp-dev/jimp), une bibliothèque de traitement d'images pour Node écrite entièrement en JavaScript, sans aucune dépendance native.

### Version 4 et inférieure

Pour la version 4 et inférieure, ce module s'appuie sur [Canvas](https://github.com/Automattic/node-canvas), une implémentation de canvas pour Node.js. Canvas dépend de [Cairo](https://cairographics.org/).

#### Détails d'installation

Par défaut, les binaires pour macOS, Linux et Windows seront téléchargés pendant l'installation `npm install` de votre projet. Si vous n'avez pas un système d'exploitation ou une architecture de processeur pris en charge, le module sera compilé sur votre système. Cela nécessite plusieurs dépendances, notamment Cairo et Pango.

Pour des informations d'installation détaillées, consultez le [wiki node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Voici des instructions d'installation en une ligne pour les systèmes d'exploitation courants. Notez que `libgif/giflib`, `librsvg` et `libjpeg` sont optionnels et ne sont nécessaires que pour la prise en charge de GIF, SVG et JPEG, respectivement. Cairo v1.10.0 ou ultérieur est requis.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     En utilisant [Homebrew](https://brew.sh/) :

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Si vous avez récemment mis à jour vers Mac OS X v10.11+ et rencontrez des problèmes lors de la compilation, exécutez la commande suivante : `xcode-select --install`. En savoir plus sur le problème [sur Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Si vous avez Xcode 10.0 ou supérieur installé, pour compiler à partir des sources, vous avez besoin de NPM 6.4.1 ou supérieur.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    Voir le [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Voir le [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>