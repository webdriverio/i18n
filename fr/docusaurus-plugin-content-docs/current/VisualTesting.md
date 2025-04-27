---
id: visual-testing
title: Tests Visuels
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Que peut-il faire ?

WebdriverIO fournit des comparaisons d'images sur les écrans, les éléments ou une page complète pour

-   🖥️ Navigateurs de bureau (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Navigateurs mobiles / tablettes (Chrome sur émulateurs Android / Safari sur simulateurs iOS / Simulateurs / appareils réels) via Appium
-   📱 Applications natives (émulateurs Android / simulateurs iOS / appareils réels) via Appium (🌟 **NOUVEAU** 🌟)
-   📳 Applications hybrides via Appium

grâce au [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) qui est un service WebdriverIO léger.

Cela vous permet de :

-   sauvegarder ou comparer des **écrans/éléments/pages complètes** par rapport à une référence
-   automatiquement **créer une référence** lorsqu'aucune référence n'existe
-   **bloquer des régions personnalisées** et même **exclure automatiquement** une barre d'état et/ou des barres d'outils (mobile uniquement) pendant une comparaison
-   augmenter les dimensions des captures d'écran d'éléments
-   **masquer le texte** pendant la comparaison de sites web pour :
    -   **améliorer la stabilité** et éviter les problèmes de rendu de police
    -   se concentrer uniquement sur la **mise en page** d'un site web
-   utiliser **différentes méthodes de comparaison** et un ensemble de **matchers supplémentaires** pour des tests plus lisibles
-   vérifier comment votre site web **prendra en charge la navigation au clavier avec la touche Tab**, voir aussi [Navigation au clavier sur un site web](#tabbing-through-a-website)
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
    // Setup
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

### Capacités
Pour utiliser le module de tests visuels, **vous n'avez pas besoin d'ajouter d'options supplémentaires à vos capacités**. Cependant, dans certains cas, vous pourriez vouloir ajouter des métadonnées supplémentaires à vos tests visuels, comme un `logName`.

Le `logName` vous permet d'attribuer un nom personnalisé à chaque capacité, qui peut ensuite être inclus dans les noms de fichiers d'images. C'est particulièrement utile pour distinguer les captures d'écran prises sur différents navigateurs, appareils ou configurations.

Pour activer cela, vous pouvez définir `logName` dans la section `capabilities` et vous assurer que l'option `formatImageName` dans le service de tests visuels y fait référence. Voici comment vous pouvez le configurer :

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
                // Le format ci-dessous utilisera le `logName` des capacités
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

2. Nommage personnalisé des images :

    - L'option `formatImageName` intègre le `logName` dans les noms de fichiers des captures d'écran. Par exemple, si le `tag` est homepage et la résolution est `1920x1080`, le nom de fichier résultant pourrait ressembler à ceci :

        `homepage-chrome-mac-15-1920x1080.png`

3. Avantages du nommage personnalisé :

    - Distinguer les captures d'écran de différents navigateurs ou appareils devient beaucoup plus facile, surtout lors de la gestion des références et du débogage des différences.

4. Note sur les valeurs par défaut :

    - Si `logName` n'est pas défini dans les capacités, l'option `formatImageName` l'affichera comme une chaîne vide dans les noms de fichiers (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Nous prenons également en charge [MultiRemote](https://webdriver.io/docs/multiremote/). Pour que cela fonctionne correctement, assurez-vous d'ajouter `wdio-ics:options` à vos
capacités comme vous pouvez le voir ci-dessous. Cela garantira que chaque capture d'écran aura son propre nom unique.

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
                // CECI!!!
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
                // CECI!!!
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

// ou utilisez ceci pour SEULEMENT sauvegarder une capture d'écran
await browser.saveFullPageScreen("examplePaged", {});

// ou utilisez ceci pour la validation. Les deux méthodes n'ont pas besoin d'être combinées, voir la FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Navigation au clavier sur un site web

Vous pouvez vérifier si un site web est accessible en utilisant la touche <kbd>TAB</kbd> du clavier. Tester cette partie de l'accessibilité a toujours été un travail (manuel) chronophage et assez difficile à faire par l'automatisation.
Avec les méthodes `saveTabbablePage` et `checkTabbablePage`, vous pouvez maintenant dessiner des lignes et des points sur votre site web pour vérifier l'ordre de tabulation.

Sachez que cela n'est utile que pour les navigateurs de bureau et **PAS** pour les appareils mobiles. Tous les navigateurs de bureau prennent en charge cette fonctionnalité.

:::note

Ce travail est inspiré du billet de blog de [Viv Richards](https://github.com/vivrichards600) sur ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

La façon dont les éléments tabulables sont sélectionnés est basée sur le module [tabbable](https://github.com/davidtheclark/tabbable). S'il y a des problèmes concernant la tabulation, veuillez consulter le [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) et en particulier la section [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Comment ça fonctionne

Les deux méthodes créeront un élément `canvas` sur votre site web et dessineront des lignes et des points pour vous montrer où votre TAB irait si un utilisateur final l'utilisait. Après cela, elles créeront une capture d'écran de la page complète pour vous donner un bon aperçu du flux.

:::important

**Utilisez `saveTabbablePage` uniquement lorsque vous devez créer une capture d'écran et que vous NE voulez PAS la comparer avec une image de référence.**

:::

Lorsque vous souhaitez comparer le flux de tabulation avec une référence, vous pouvez utiliser la méthode `checkTabbablePage`. Vous **N'avez PAS** besoin d'utiliser les deux méthodes ensemble. S'il existe déjà une image de référence créée, ce qui peut être fait automatiquement en fournissant `autoSaveBaseline: true` lors de l'instanciation du service,
`checkTabbablePage` créera d'abord l'image _actuelle_ puis la comparera à la référence.

##### Options

Les deux méthodes utilisent les mêmes options que [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) ou
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage).

#### Exemple

Voici un exemple de fonctionnement de la tabulation sur notre [site web guinea pig](https://guinea-pig.webdriver.io/image-compare.html) :

![Exemple de tabulation WDIO](/img/visual/tabbable-chrome-latest-1366x768.png)

### Mettre à jour automatiquement les instantanés visuels échoués

Mettez à jour les images de référence via la ligne de commande en ajoutant l'argument `--update-visual-baseline`. Cela va

-   automatiquement copier la capture d'écran réelle et la placer dans le dossier de référence
-   s'il y a des différences, il fera passer le test car la référence a été mise à jour

**Utilisation :**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Lors de l'exécution en mode info/debug, vous verrez les journaux suivants ajoutés

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

Ce module inclut la prise en charge de TypeScript, vous permettant de bénéficier de l'auto-complétion, de la sécurité des types et d'une meilleure expérience de développement lors de l'utilisation du service de tests visuels.

### Étape 1 : Ajouter les définitions de types
Pour vous assurer que TypeScript reconnaît les types du module, ajoutez l'entrée suivante au champ types dans votre tsconfig.json :

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Étape 2 : Activer la sécurité des types pour les options de service
Pour appliquer la vérification des types sur les options de service, mettez à jour votre configuration WebdriverIO :

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
                // Options de service
                baselineFolder: join(