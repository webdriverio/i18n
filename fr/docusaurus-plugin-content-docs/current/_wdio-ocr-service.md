---
id: wdio-ocr-service
title: Service de Tests OCR
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---


> @wdio/ocr-service est un package tiers, pour plus d'informations, consultez [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/ocr-service)

Pour la documentation sur les tests visuels avec WebdriverIO, veuillez consulter la [documentation](https://webdriver.io/docs/visual-testing). Ce projet contient tous les modules pertinents pour exécuter des tests visuels avec WebdriverIO. Dans le répertoire `./packages`, vous trouverez :

-   `@wdio/visual-testing` : le service WebdriverIO pour l'intégration des tests visuels
-   `webdriver-image-comparison` : un module de comparaison d'images qui peut être utilisé pour différents frameworks de test d'automatisation NodeJS qui prennent en charge le protocole WebDriver

## Exécuteur Storybook (BETA)

<details>
  <summary>Cliquez pour découvrir plus de documentation sur l'Exécuteur Storybook BETA</summary>

> L'Exécuteur Storybook est toujours en BETA, la documentation sera plus tard déplacée vers les pages de documentation [WebdriverIO](https://webdriver.io/docs/visual-testing).

Ce module prend désormais en charge Storybook avec un nouveau Visual Runner. Cet exécuteur analyse automatiquement une instance locale/distante de Storybook et crée des captures d'écran d'éléments pour chaque composant. Cela peut être fait en ajoutant

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

à vos `services` et en exécutant `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` via la ligne de commande.
Il utilisera Chrome en mode headless comme navigateur par défaut.

> [!NOTE]
>
> -   La plupart des options de Visual Testing fonctionneront également pour l'Exécuteur Storybook, consultez la documentation [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   L'Exécuteur Storybook remplacera toutes vos capacités et ne peut fonctionner que sur les navigateurs qu'il prend en charge, voir [`--browsers`](#browsers).
> -   L'Exécuteur Storybook ne prend pas en charge une configuration existante qui utilise des capacités Multiremote et générera une erreur.
> -   L'Exécuteur Storybook ne prend en charge que le Web Desktop, pas le Web Mobile.

### Options du service d'Exécuteur Storybook

Les options de service peuvent être fournies comme ceci

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Quelques options par défaut
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Les options storybook, voir les options cli pour la description
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` peut être une chaîne ('example-button--secondary'),
                // un tableau (['example-button--secondary', 'example-button--small'])
                // ou une regex qui doit être fournie sous forme de chaîne ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Optionnel - Permet de remplacer le chemin des références. Par défaut, il regroupera les références par catégorie et composant (par exemple forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Options CLI de l'Exécuteur Storybook

#### `--additionalSearchParams`

-   **Type :** `string`
-   **Obligatoire :** Non
-   **Défaut :** ''
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Il ajoutera des paramètres de recherche supplémentaires à l'URL de Storybook.
Consultez la documentation [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) pour plus d'informations. La chaîne doit être une chaîne URLSearchParams valide.

> [!NOTE]
> Les guillemets doubles sont nécessaires pour éviter que le `&` ne soit interprété comme un séparateur de commande.
> Par exemple avec `--additionalSearchParams="foo=bar&abc=def"`, cela générera l'URL Storybook suivante pour les tests d'histoires : `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Type :** `string`
-   **Obligatoire :** Non
-   **Défaut :** `chrome`, vous pouvez choisir parmi `chrome|firefox|edge|safari`
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **REMARQUE :** Uniquement disponible via la CLI

Il utilisera les navigateurs fournis pour prendre des captures d'écran de composants

> [!NOTE]
> Assurez-vous d'avoir installé les navigateurs sur lesquels vous souhaitez exécuter sur votre machine locale

#### `--clip`

-   **Type :** `boolean`
-   **Obligatoire :** Non
-   **Défaut :** `true`
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Lorsqu'il est désactivé, il créera une capture d'écran de la fenêtre d'affichage. Lorsqu'il est activé, il créera des captures d'écran d'éléments basées sur le [`--clipSelector`](#clipselector) qui réduira la quantité d'espace blanc autour de la capture d'écran du composant et réduira la taille de la capture d'écran.

#### `--clipSelector`

-   **Type :** `string`
-   **Obligatoire :** Non
-   **Défaut :** `#storybook-root > :first-child` pour Storybook V7 et `#root > :first-child:not(script):not(style)` pour Storybook V6, voir aussi [`--version`](#version)
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Il s'agit du sélecteur qui sera utilisé :

-   pour sélectionner l'élément dont on prendra la capture d'écran
-   pour attendre que l'élément soit visible avant qu'une capture d'écran ne soit prise

#### `--devices`

-   **Type :** `string`
-   **Obligatoire :** Non
-   **Défaut :** Vous pouvez sélectionner parmi [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **REMARQUE :** Uniquement disponible via la CLI

Il utilisera les appareils fournis qui correspondent à [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) pour prendre des captures d'écran de composants

> [!NOTE]
>
> -   Si vous manquez une configuration d'appareil, n'hésitez pas à soumettre une [demande de fonctionnalité](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Cela ne fonctionnera qu'avec Chrome :
>     -   si vous fournissez `--devices`, toutes les instances Chrome fonctionneront en mode **Émulation Mobile**
>     -   si vous fournissez également d'autres navigateurs que Chrome, comme `--devices --browsers=firefox,safari,edge`, il ajoutera automatiquement Chrome en mode d'émulation mobile
> -   L'Exécuteur Storybook créera par défaut des instantanés d'éléments, si vous souhaitez voir la capture d'écran complète en Émulation Mobile, fournissez `--clip=false` via la ligne de commande
> -   Le nom de fichier ressemblera par exemple à `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[SRC:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Tester un site web mobile sur un ordinateur de bureau à l'aide de l'émulation mobile peut être utile, mais les testeurs doivent être conscients qu'il existe de nombreuses différences subtiles telles que :
>     -   un GPU entièrement différent, ce qui peut entraîner d'importants changements de performance ;
>     -   l'interface utilisateur mobile n'est pas émulée (en particulier, la barre d'URL masquée affecte la hauteur de la page) ;
>     -   la fenêtre contextuelle de désambiguïsation (où vous sélectionnez l'une des cibles tactiles) n'est pas prise en charge ;
>     -   de nombreuses API matérielles (par exemple, l'événement orientationchange) ne sont pas disponibles.

#### `--headless`

-   **Type :** `boolean`
-   **Obligatoire :** Non
-   **Défaut :** `true`
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **REMARQUE :** Uniquement disponible via la CLI

Cela exécutera les tests par défaut en mode headless (lorsque le navigateur le prend en charge) ou peut être désactivé

#### `--numShards`

-   **Type :** `number`
-   **Obligatoire :** Non
-   **Défaut :** `true`
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Il s'agira du nombre d'instances parallèles qui seront utilisées pour exécuter les histoires. Cela sera limité par le `maxInstances` dans votre fichier `wdio.conf`.

> [!IMPORTANT]
> Lors de l'exécution en mode `headless`, n'augmentez pas le nombre à plus de 20 pour éviter l'instabilité due aux restrictions de ressources

#### `--skipStories`

-   **Type :** `string|regex`
-   **Obligatoire :** Non
-   **Défaut :** null
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Cela peut être :

-   une chaîne (`example-button--secondary,example-button--small`)
-   ou une regex (`"/.*button.*/gm"`)

pour ignorer certaines histoires. Utilisez l'`id` de l'histoire qui peut être trouvé dans l'URL de l'histoire. Par exemple, l'`id` dans cette URL `http://localhost:6006/?path=/story/example-page--logged-out` est `example-page--logged-out`

#### `--url`

-   **Type :** `string`
-   **Obligatoire :** Non
-   **Défaut :** `http://127.0.0.1:6006`
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

L'URL où votre instance Storybook est hébergée.

#### `--version`

-   **Type :** `number`
-   **Obligatoire :** Non
-   **Défaut :** 7
-   **Exemple :** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Il s'agit de la version de Storybook, par défaut `7`. Cela est nécessaire pour savoir si le [`clipSelector`](#clipselector) V6 doit être utilisé.

### Tests d'interaction Storybook

Les Tests d'interaction Storybook vous permettent d'interagir avec votre composant en créant des scripts personnalisés avec des commandes WDIO pour mettre un composant dans un certain état. Par exemple, voir l'extrait de code ci-dessous :

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Deux tests sur deux composants différents sont exécutés. Chaque test définit d'abord un état, puis prend une capture d'écran. Vous remarquerez également qu'une nouvelle commande personnalisée a été introduite, qui peut être trouvée [ici](#new-custom-command).

Le fichier de spécification ci-dessus peut être enregistré dans un dossier et ajouté à la ligne de commande avec la commande suivante :

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

L'exécuteur Storybook analysera d'abord automatiquement votre instance Storybook, puis ajoutera vos tests aux histoires qui doivent être comparées. Si vous ne voulez pas que les composants que vous utilisez pour les tests d'interaction soient comparés deux fois, vous pouvez ajouter un filtre pour supprimer les histoires "par défaut" de l'analyse en fournissant le filtre [`--skipStories`](#--skipstories). Cela ressemblerait à ceci :

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Nouvelle commande personnalisée

Une nouvelle commande personnalisée appelée `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` sera ajoutée à l'objet `browser/driver` qui chargera automatiquement le composant et attendra qu'il soit terminé, afin que vous n'ayez pas besoin d'utiliser la méthode `browser.url('url.com')`. Elle peut être utilisée comme ceci

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Les options sont :

#### `additionalSearchParams`

-   **Type :** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Obligatoire :** Non
-   **Défaut :** `new URLSearchParams()`
-   **Exemple :**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

Cela ajoutera des paramètres de recherche supplémentaires à l'URL de Storybook, dans l'exemple ci-dessus, l'URL sera `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.
Consultez la documentation [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) pour plus d'informations.

#### `clipSelector`

-   **Type :** `string`
-   **Obligatoire :** Non
-   **Défaut :** `#storybook-root > :first-child` pour Storybook V7 et `#root > :first-child:not(script):not(style)` pour Storybook V6
-   **Exemple :**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

Il s'agit du sélecteur qui sera utilisé :

-   pour sélectionner l'élément dont on prendra la capture d'écran
-   pour attendre que l'élément soit visible avant qu'une capture d'écran ne soit prise

#### `id`

-   **Type :** `string`
-   **Obligatoire :** oui
-   **Exemple :**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Utilisez l'`id` de l'histoire qui peut être trouvé dans l'URL de l'histoire. Par exemple, l'`id` dans cette URL `http://localhost:6006/?path=/story/example-page--logged-out` est `example-page--logged-out`

#### `timeout`

-   **Type :** `number`
-   **Obligatoire :** Non
-   **Défaut :** 1100 millisecondes
-   **Exemple :**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

Le délai d'attente maximal pour qu'un composant soit visible après le chargement sur la page

#### `url`

-   **Type :** `string`
-   **Obligatoire :** Non
-   **Défaut :** `http://127.0.0.1:6006`
-   **Exemple :**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

L'URL où votre instance Storybook est hébergée.

</details>

## Contribuer

### Mise à jour des packages

Vous pouvez mettre à jour les packages avec un simple outil CLI. Assurez-vous d'avoir installé toutes les dépendances, vous pouvez ensuite exécuter

```sh
pnpm update.packages
```

Cela déclenchera un CLI qui vous posera les questions suivantes

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

### Questions

Veuillez rejoindre notre serveur [Discord](https://discord.webdriver.io) si vous avez des questions ou des problèmes pour contribuer à ce projet. Retrouvez les contributeurs dans le canal `🙏-contributing`.

### Problèmes

Si vous avez des questions, des bugs ou des demandes de fonctionnalités, veuillez créer un ticket. Avant de soumettre un ticket, veuillez rechercher dans les archives des tickets pour réduire les doublons, et lire la [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Si vous ne trouvez pas ce que vous cherchez, vous pouvez soumettre un ticket où vous pouvez soumettre :

-   🐛**Rapport de bug** : Créez un rapport pour nous aider à améliorer
-   📖**Documentation** : Suggérez des améliorations ou signalez une documentation manquante/peu claire.
-   💡**Demande de fonctionnalité** : Suggérez une idée pour ce module.
-   💬**Question** : Posez des questions.

### Flux de développement

Pour créer une PR pour ce projet et commencer à contribuer, suivez ce guide étape par étape :

-   Forkez le projet.
-   Clonez le projet quelque part sur votre ordinateur

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Allez dans le répertoire et configurez le projet

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Exécutez le mode watch qui transpirera automatiquement le code

    ```sh
    $ pnpm watch
    ```

    pour construire le projet, exécutez :

    ```sh
    $ pnpm build
    ```

-   Assurez-vous que vos modifications ne cassent aucun test, exécutez :

    ```sh
    $ pnpm test
    ```

Ce projet utilise [changesets](https://github.com/changesets/changesets) pour créer automatiquement des changelogs et des versions.

### Tests

Plusieurs tests doivent être exécutés pour pouvoir tester le module. Lors de l'ajout d'une PR, tous les tests doivent au moins passer les tests locaux. Chaque PR est automatiquement testée sur Sauce Labs, voir [notre pipeline GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Avant d'approuver une PR, les contributeurs principaux testeront la PR sur des émulateurs/simulateurs / appareils réels.

#### Tests locaux

Tout d'abord, une référence locale doit être créée. Cela peut être fait avec :

```sh
// Avec le protocole webdriver
$ pnpm run test.local.init
```

Cette commande créera un dossier appelé `localBaseline` qui contiendra toutes les images de référence.

Puis exécutez :

```sh
// Avec le protocole webdriver
pnpm run test.local.desktop
```

Cela exécutera tous les tests sur une machine locale sur Chrome.

#### Tests locaux de l'Exécuteur Storybook (Beta)

Tout d'abord, une référence locale doit être créée. Cela peut être fait avec :

```sh
pnpm run test.local.desktop.storybook
```

Cela exécutera les tests Storybook avec Chrome en mode headless contre un repo de démo Storybook situé à https://govuk-react.github.io/govuk-react/.

Pour exécuter les tests avec plus de navigateurs, vous pouvez exécuter

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Assurez-vous d'avoir installé les navigateurs sur lesquels vous souhaitez exécuter sur votre machine locale

#### Tests CI avec Sauce Labs (non nécessaire pour une PR)

La commande ci-dessous est utilisée pour tester la build sur GitHub Actions, elle ne peut être utilisée que là et non pour le développement local.

```
$ pnpm run test.saucelabs
```

Elle testera contre de nombreuses configurations qui peuvent être trouvées [ici](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Toutes les PR sont automatiquement vérifiées sur Sauce Labs.

## Publication

Pour publier une version de l'un des packages listés ci-dessus, procédez comme suit :

-   déclenchez le [pipeline de publication](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   une PR de publication est générée, faites-la examiner et approuver par un autre membre de WebdriverIO
-   fusionnez la PR
-   déclenchez à nouveau le [pipeline de publication](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   une nouvelle version devrait être publiée 🎉

## Crédits

`@wdio/visual-testing` utilise une licence open-source de [LambdaTest](https://www.lambdatest.com/) et [Sauce Labs](https://saucelabs.com/).