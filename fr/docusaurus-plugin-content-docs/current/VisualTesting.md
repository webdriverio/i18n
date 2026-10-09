---
id: visual-testing
title: Tests visuels
description: "Comparez des captures d'écran d'écrans, d'éléments ou de pages complètes avec des références grâce au @wdio/visual-service, y compris l'installation et l'utilisation."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Que peut-il faire ?

WebdriverIO fournit des comparaisons d'images sur des écrans, des éléments ou une page complète pour

-   🖥️ Les navigateurs de bureau (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Les navigateurs mobiles / tablettes (Chrome sur émulateurs Android / Safari sur simulateurs iOS / simulateurs / appareils réels) via Appium
-   📱 Les applications natives (émulateurs Android / simulateurs iOS / appareils réels) via Appium (🌟 **NOUVEAU** 🌟)
-   📳 Les applications hybrides via Appium

grâce au [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), un service WebdriverIO léger.

Cela vous permet de :

-   enregistrer ou comparer des captures d'**écrans/éléments/pages complètes** par rapport à une référence (baseline)
-   **créer automatiquement une référence** lorsqu'aucune n'existe
-   **masquer des zones personnalisées** et même **exclure automatiquement** une barre d'état et/ou des barres d'outils (mobile uniquement) lors d'une comparaison
-   augmenter les dimensions des captures d'écran d'éléments
-   **masquer le texte** lors de la comparaison de sites web pour :
    -   **améliorer la stabilité** et éviter l'instabilité liée au rendu des polices
    -   se concentrer uniquement sur la **mise en page** d'un site web
-   utiliser **différentes méthodes de comparaison** et un ensemble de **matchers supplémentaires** pour des tests plus lisibles
-   vérifier comment votre site web **prend en charge la navigation avec la touche Tab du clavier)**, voir aussi [Naviguer avec la touche Tab sur un site web](#tabbing-through-a-website)
-   et bien plus encore, consultez les options du [service](./visual-testing/service-options) et des [méthodes](./visual-testing/method-options)

Le service est un module léger permettant de récupérer les données et les captures d'écran nécessaires pour tous les navigateurs/appareils. La puissance de comparaison provient de [Pixelmatch](https://github.com/mapbox/pixelmatch), une bibliothèque de comparaison d'images perceptuelle rapide et précise utilisant l'espace colorimétrique YIQ. Les images sont traitées avec [fast-png](https://github.com/image-js/fast-png), un codec PNG sans aucune dépendance native.

:::info REMARQUE Pour les applications natives/hybrides
Les méthodes `saveScreen`, `saveElement`, `checkScreen`, `checkElement` et les matchers `toMatchScreenSnapshot` et `toMatchElementSnapshot` peuvent être utilisés pour les applications/contextes natifs.

Veuillez utiliser la propriété `isHybridApp:true` dans les paramètres de votre service lorsque vous souhaitez l'utiliser pour des applications hybrides.
:::

:::caution Mise à niveau depuis la v9 (ou inférieure) ?

`@wdio/visual-service` **v10** a remplacé le moteur de comparaison **ResembleJS** par **[Pixelmatch](https://github.com/mapbox/pixelmatch)**. Pixelmatch utilise un modèle de couleur perceptuel (YIQ) au lieu du RGB brut, les pourcentages de différence seront donc différents de ceux de la v9. Cela signifie que :

-   **Votre code de test n'a pas besoin de changer.** Tous les noms de méthodes, noms d'options et matchers sont identiques.
-   **Vos images de référence devront peut-être être mises à jour.** Après la mise à niveau, exécutez votre suite de tests et examinez les éventuelles différences visuelles. Vous pouvez mettre à jour individuellement les références en échec avec `--update-visual-baseline`, ou supprimer l'intégralité de votre dossier de références et laisser `autoSaveBaseline` le recréer de zéro. Consultez la [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) pour plus de détails.

:::

## Installation

Le moyen le plus simple est de conserver `@wdio/visual-service` comme dépendance de développement dans votre `package.json`, via :

```sh
npm install --save-dev @wdio/visual-service
```

## Utilisation

`@wdio/visual-service` peut être utilisé comme un service normal. Vous pouvez le configurer dans votre fichier de configuration de la manière suivante :

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Quelques options, consultez la documentation pour en savoir plus
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

D'autres options du service sont disponibles [ici](/docs/visual-testing/service-options).

Une fois configuré dans votre configuration WebdriverIO, vous pouvez ajouter des assertions visuelles à [vos tests](/docs/visual-testing/writing-tests).

### Capabilities
Pour utiliser le module de tests visuels, **vous n'avez pas besoin d'ajouter d'options supplémentaires à vos capabilities**. Cependant, dans certains cas, vous pouvez souhaiter ajouter des métadonnées supplémentaires à vos tests visuels, comme un `logName`.

Le `logName` vous permet d'attribuer un nom personnalisé à chaque capability, qui peut ensuite être inclus dans les noms de fichiers des images. C'est particulièrement utile pour distinguer les captures d'écran prises sur différents navigateurs, appareils ou configurations.

Pour l'activer, vous pouvez définir `logName` dans la section `capabilities` et vous assurer que l'option `formatImageName` du service de tests visuels y fait référence. Voici comment le configurer :

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Nom de log personnalisé pour Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Nom de log personnalisé pour Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Quelques options, consultez la documentation pour en savoir plus
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

    - Dans la section `capabilities`, attribuez un `logName` unique à chaque navigateur ou appareil. Par exemple, `chrome-mac-15` identifie les tests exécutés sur Chrome sous macOS version 15.

2. Nommage personnalisé des images :

    - L'option `formatImageName` intègre le `logName` dans les noms de fichiers des captures d'écran. Par exemple, si le `tag` est homepage et la résolution est `1920x1080`, le nom de fichier résultant pourrait ressembler à ceci :

        `homepage-chrome-mac-15-1920x1080.png`

3. Avantages du nommage personnalisé :

    - Il devient beaucoup plus facile de distinguer les captures d'écran provenant de différents navigateurs ou appareils, notamment lors de la gestion des références et du débogage des divergences.

4. Remarque sur les valeurs par défaut :

    -Si `logName` n'est pas défini dans les capabilities, l'option `formatImageName` l'affichera comme une chaîne vide dans les noms de fichiers (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

Nous prenons également en charge le [multi-remote](https://webdriver.io/docs/multiremote/). Pour que cela fonctionne correctement, assurez-vous d'ajouter `wdio-ics:options` à vos
capabilities comme vous pouvez le voir ci-dessous. Cela garantira que chaque capture d'écran aura son propre nom unique.

[L'écriture de vos tests](/docs/visual-testing/writing-tests) ne sera pas différente par rapport à l'utilisation du [testrunner](https://webdriver.io/docs/testrunner)

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

### Exécution par programmation

Voici un exemple minimal d'utilisation de `@wdio/visual-service` via les options `remote` :

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

// ou utilisez ceci UNIQUEMENT pour enregistrer une capture d'écran
await browser.saveFullPageScreen("examplePaged", {});

// ou utilisez ceci pour valider. Les deux méthodes n'ont pas besoin d'être combinées, voir la FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Naviguer avec la touche Tab sur un site web

Vous pouvez vérifier si un site web est accessible à l'aide de la touche <kbd>TAB</kbd> du clavier. Tester cet aspect de l'accessibilité a toujours été une tâche (manuelle) chronophage et assez difficile à automatiser.
Avec les méthodes `saveTabbablePage` et `checkTabbablePage`, vous pouvez désormais dessiner des lignes et des points sur votre site web pour vérifier l'ordre de tabulation.

Sachez que cela n'est utile que pour les navigateurs de bureau et **PAS\*\*** pour les appareils mobiles. Tous les navigateurs de bureau prennent en charge cette fonctionnalité.

:::note

Ce travail est inspiré de l'article de blog de [Viv Richards](https://github.com/vivrichards600) intitulé ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

La façon dont les éléments tabulables sont sélectionnés est basée sur le module [tabbable](https://github.com/davidtheclark/tabbable). En cas de problème concernant la tabulation, veuillez consulter le [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) et en particulier la section [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details.

:::

#### Comment ça fonctionne

Les deux méthodes créeront un élément `canvas` sur votre site web et dessineront des lignes et des points pour vous montrer où irait votre TAB si un utilisateur final l'utilisait. Ensuite, elles créeront une capture d'écran de la page complète pour vous donner une bonne vue d'ensemble du parcours.

:::important

**Utilisez `saveTabbablePage` uniquement lorsque vous devez créer une capture d'écran et que vous NE voulez PAS la comparer **avec une image de **référence**.\*\*\*\*

:::

Lorsque vous souhaitez comparer le parcours de tabulation avec une référence, vous pouvez utiliser la méthode `checkTabbablePage`. Vous n'avez **PAS** besoin d'utiliser les deux méthodes ensemble. Si une image de référence a déjà été créée, ce qui peut être fait automatiquement en fournissant `autoSaveBaseline: true` lors de l'instanciation du service,
`checkTabbablePage` créera d'abord l'image _actuelle_ puis la comparera à la référence.

##### Options

Les deux méthodes utilisent les mêmes options que `saveFullPageScreen` ou `compareFullPageScreen`.

#### Exemple

Voici un exemple du fonctionnement de la tabulation sur notre [site web cobaye](https://guinea-pig.webdriver.io/image-compare.html) :

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Mettre à jour automatiquement les instantanés visuels en échec

Mettez à jour les images de référence via la ligne de commande en ajoutant l'argument `--update-visual-baseline`. Cela va

-   copier automatiquement la capture d'écran actuelle et la placer dans le dossier de référence
-   en cas de différences, laisser le test réussir car la référence a été mise à jour

**Utilisation :**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Lors de l'exécution en mode de log info/debug, vous verrez les logs suivants ajoutés

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Prise en charge de TypeScript

Ce module inclut la prise en charge de TypeScript, vous permettant de bénéficier de l'autocomplétion, de la sécurité des types et d'une meilleure expérience de développement lors de l'utilisation du service de tests visuels.

### Étape 1 : Ajouter les définitions de types
Pour que TypeScript reconnaisse les types du module, ajoutez l'entrée suivante au champ types de votre tsconfig.json :

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Étape 2 : Activer la sécurité des types pour les options du service
Pour appliquer la vérification des types sur les options du service, mettez à jour votre configuration WebdriverIO :

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importer la définition de type
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Options du service
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Garantit la sécurité des types
        ],
    ],
    // ...
};
```

## Configuration système requise

### Version 10 et supérieure (actuelle)

Pour la version 10 et supérieure, ce module n'a aucune dépendance système supplémentaire au-delà des [exigences générales du projet](/docs/gettingstarted#system-requirements). Il utilise [Pixelmatch](https://github.com/mapbox/pixelmatch) pour la comparaison d'images perceptuelle et [fast-png](https://github.com/image-js/fast-png) pour l'encodage/décodage des images. Les deux sont écrits en JavaScript pur, sans aucune dépendance native.

### Versions 5 à 9 (anciennes)

Les versions 5 à 9 utilisaient [Jimp](https://github.com/jimp-dev/jimp), une bibliothèque de traitement d'images pour Node entièrement écrite en JavaScript, sans aucune dépendance native. Aucune dépendance système supplémentaire n'était requise.

### Version 4 et inférieure

Pour la version 4 et inférieure, ce module s'appuie sur [Canvas](https://github.com/Automattic/node-canvas), une implémentation de canvas pour Node.js. Canvas dépend de [Cairo](https://cairographics.org/).

#### Détails d'installation

Par défaut, les binaires pour macOS, Linux et Windows seront téléchargés lors du `npm install` de votre projet. Si vous ne disposez pas d'un système d'exploitation ou d'une architecture de processeur pris en charge, le module sera compilé sur votre système. Cela nécessite plusieurs dépendances, dont Cairo et Pango.

Pour des informations d'installation détaillées, consultez le [wiki node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Vous trouverez ci-dessous des instructions d'installation en une ligne pour les systèmes d'exploitation courants. Notez que `libgif/giflib`, `librsvg` et `libjpeg` sont facultatifs et ne sont nécessaires que pour la prise en charge respectivement des formats GIF, SVG et JPEG. Cairo v1.10.0 ou ultérieur est requis.

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

    **Mac OS X v10.11+ :** Si vous avez récemment effectué une mise à jour vers Mac OS X v10.11+ et rencontrez des problèmes lors de la compilation, exécutez la commande suivante : `xcode-select --install`. Pour en savoir plus sur ce problème, consultez [Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Si vous avez installé Xcode 10.0 ou supérieur, vous avez besoin de NPM 6.4.1 ou supérieur pour compiler depuis les sources.

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

    Consultez le [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Consultez le [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>