---
id: wdio-roku-service
title: Service Roku
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---


> wdio-roku-service est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
Ce service remplace de nombreuses parties de WebdriverIO pour permettre leur utilisation avec les applications Roku et fournit un accès à l'[API ECP de Roku](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) pour contrôler le Roku pendant les tests.

## Prérequis

### Roku
Un canal de test/channel.zip et un appareil Roku (avec le mode développeur activé) sur le même réseau que votre Mac.

### WebdriverIO
Ce n'est pas un produit autonome - il est utilisé comme plugin de framework de test WebdriverIO (ou Service, dans leur terminologie). Avant de l'utiliser, vous devriez passer par la configuration de WDIO en exécutant `npm init wdio@latest`.

Lors de la configuration, pour éviter de naviguer dans toutes les questions/options, vous pouvez simplement choisir les sélections suivantes pendant la phase d'initialisation :
- Roku Testing (REMARQUE : Utilisez ceci si votre dépôt sera uniquement utilisé pour les tests Roku car il deviendra le service par défaut et le seul installé. Sinon, utilisez E2E Testing pour pouvoir installer plusieurs services.)
- On my local machine (E2E uniquement)
- Web (E2E uniquement)
- Chrome (E2E uniquement)
- Mocha
- Typescript [les modules fonctionnent pour TS et JS, alors choisissez celui que vous préférez]
- autogenerate some test files (Y)
-- default location
- page objects (Y)
-- default location
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Configuration Typescript
Si vous souhaitez utiliser Typescript pour rédiger des tests, vous devrez vous assurer que les options suivantes sont définies dans le fichier tsconfig.json généré par Webdriverio.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
Vous pouvez ensuite utiliser le service en l'important dans vos tests comme détaillé ci-dessous.

### Configuration WDIO
Actuellement, les tests ne sont pris en charge que pour un seul appareil Roku. Les mises à jour de configuration suivantes sont requises :
* `maxInstances` et `maxInstancesPerCapability` doivent être à 1. Les tests sur plusieurs appareils automatiquement ne sont pas pris en charge et entraîneront des commandes dupliquées envoyées au Roku. Il ne devrait y avoir qu'une seule capacité.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // ou si vous voulez le mode headless :
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* Il est recommandé d'augmenter `waitforInterval` et `waitforTimeout`, car chaque intervalle implique le téléchargement du xml depuis le Roku. Pour tirer le meilleur parti de la fonction `browser.debug()`, vous pouvez également choisir d'étendre votre délai d'attente du testrunner mocha à 5+ minutes pour le développement.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //optionnel:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

Vous êtes prêt à écrire votre premier test !

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

Il est également recommandé d'utiliser la fonction `browser.debug()` dans wdio pour arrêter votre test à des fins de débogage et de création de tests :

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // le test s'arrête, un REPL devient disponible pour les commandes

```
Si chrome n'est pas en mode headless, vous pouvez voir la dernière fois que `openRokuXML()` a été appelé (probablement via un `waitForX` ou `expect`). En utilisant le REPL dans votre terminal, vous pouvez utiliser toutes les commandes `$` valides, et quelques commandes personnalisées ajoutées (`browser.openRokuXML()` et `browser.saveScreenshot('path/to/ss.jpg')`) -- la classe `controller` n'est pas attachée à l'objet `browser`, donc vous ne pouvez pas les utiliser actuellement. Heureusement, vous êtes probablement assis à côté du Roku et avez une télécommande que vous pouvez utiliser pour naviguer et occasionnellement appeler `browser.openRokuXML()` pour voir ce qui est arrivé à l'état de la page ! Et n'oubliez pas que XML fonctionne nativement avec le xpath dans le navigateur chrome lui-même, vous pouvez donc évaluer/développer vos sélecteurs directement dans la console chrome pendant le débogage.

### .env
Consultez le fichier `.env.example`. Copiez-le et renommez-le en `.env` dans votre projet WebdriverIO qui utilise ce service. Vous voudrez probablement l'ajouter à votre .gitignore également.

* `ROKU_IP` doit être l'IP de votre Roku. Les commandes utiliseront cette IP pour communiquer avec lui. Ceci est requis.
* `ROKU_USER` et `ROKU_PW` : Les identifiants de connexion sont nécessaires pour installer une archive, ainsi que pour prendre des captures d'écran.
* `ROKU_APP_PATH` doit être le chemin absolu du fichier zip du canal Roku.
* `ROKU_CHANNEL_ID` doit être l'ID du canal de votre Roku (c'est généralement "dev").
* `DEBUG=wdio-roku-service` activera les messages de débogage. Supprimez le '#' au début de la ligne si vous les souhaitez.

## Fonctions modifiées
### Browser
* `waitUntil` récupérera le xml du Roku à chaque itération pour vérifier les changements.
* `saveScreenshot` téléchargera une capture d'écran de l'écran actuel du Roku. Notamment, ces captures d'écran sont au format .jpg, plutôt que le .png que WebdriverIO utilise habituellement.
* `openRokuXML` récupérera le xml du Roku si vous devez le faire manuellement plutôt qu'avec des attentes.

### Elements
* Toutes les attentes sont prises en charge de la même manière que pour Browser. `waitForClickable` est mappé à `waitForDisplayed`, et `waitForStable` est mappé à `waitForExist`.
* `click`, `doubleClick`, et `moveTo` ne sont pas pris en charge. Vous devez naviguer manuellement dans l'application.
* `isFocused` vérifiera qu'un attribut `focused` sur l'élément est vrai.
* `isDisplayed` vérifiera un attribut `bounds` sur l'élément, et que `visible` n'est pas défini à false. Si `withinViewport` est défini, les limites seront comparées à la taille de l'écran du Roku.
* `getSize` et `getLocation` prennent les valeurs de l'attribut `bounds`, retournant 0 pour la taille et -Infinity pour la position s'il n'est pas présent.

D'autres fonctions n'ont pas été modifiées, mais beaucoup fonctionnent toujours comme prévu.

### Matchers
La plupart des matchers ont été mis à jour pour récupérer le xml pendant l'attente. Certains ont des fonctionnalités légèrement différentes.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight`, et `toHaveAttribute` fonctionnent comme prévu, avec les modifications apportées à Element prises en compte.
* `toHaveElementProperty` est mappé à `toHaveAttribute`.
* `toHaveElementClass` vérifie l'attribut `name` de l'élément.
* `toHaveId` est mappé à `toHaveElementClass`.
* `toHaveText` vérifie l'attribut `text` de l'élément.
* `toHaveChildren` vérifie l'attribut `children` de l'élément.
* `toHaveHTML` traitera le xml comme s'il s'agissait de HTML, bien que ce ne soit probablement pas très utile.

Les suivants ne sont pas actuellement pris en charge :
* `toBeSelected` - Pourrait être pris en charge prochainement après avoir déterminé à quoi ressemble le xml pour les boutons sélectionnés, s'il y a une différence.
* `toBeChecked` - Pourrait être pris en charge prochainement après avoir déterminé à quoi ressemble le xml pour les cases à cocher cochées, s'il y a une différence.
* `toHaveComputedLabel` - Si vous avez un équivalent de ceci sur vos éléments Roku, vérifiez l'attribut avec `toHaveAttribute`.
* `toHaveComputedRole` - Si vous avez un équivalent de ceci sur vos éléments Roku, vérifiez l'attribut avec `toHaveAttribute`.
* `toHaveHref` - Si vous avez des URLs sur vos éléments Roku, vérifiez l'attribut avec `toHaveAttribute`.
* `toHaveStyle` - Les éléments xml n'ont pas de styles.
* `toHaveClipboardText` - Ceci n'est pas connu.
* `toHaveTitle` - Le titre sera le nom de fichier temporaire généré aléatoirement du xml.
* `toHaveUrl` - L'URL sera le chemin vers le fichier xml sur votre ordinateur.

## Utilisation
### Installation du canal

Cela nécessite que votre canal ait un ID assigné.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Installation d'archive

Il est recommandé de stocker le chemin dans le .env, surtout si vous avez plusieurs développeurs qui pourraient avoir des emplacements et/ou des noms de fichiers différents.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Canal préinstallé

Si vous avez déjà installé le canal vous-même avant de tester, vous pouvez simplement le lancer.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Ferme le canal s'il est déjà ouvert. Si le canal prend en charge la reprise instantanée, cela le mettra simplement en arrière-plan
    await exitChannel();
    // Utiliser l'ID de canal 'dev' lancera l'application sideloaded.
    await launchChannel('dev');
}
```

### Tests
`wdio-roku-service/controller` offre la possibilité d'envoyer des pressions de boutons au Roku. `keySequence` est le principal, envoyant plusieurs pressions de boutons en séquence.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Naviguer dans l'application
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Récupérer l'interface utilisateur actuelle de l'application depuis le Roku et la charger dans le navigateur
await browser.openRokuXML();
// Ou, utilisez des attentes, qui chargeront répétitivement le XML jusqu'à ce qu'il expire ou que la condition soit remplie
await browser.waitUntil(condition);
await element.waitForDisplayed();
// utilisez les matchers WDIO sur le XML roku comme s'il s'agissait d'une page web
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` a également des fonctions pour maintenir ou relâcher des boutons ainsi que pour taper du texte dans un clavier.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` fournit des fonctionnalités liées au canal. `inputChannel` vous permet d'envoyer des informations arbitraires à votre application.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Autres fonctions
`wdio-roku-service/info` fournit des fonctionnalités diverses, comme obtenir l'icône de l'application ou les nœuds orphelins.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` est l'interface directe avec l'ECP si vous avez besoin de faire quelque chose de très spécifique.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## Problèmes courants
* Les éléments Roku ont leur texte dans un attribut 'text', pas entre leurs balises. Lors de la création de sélecteurs, faire `$('element=Text')` ne fonctionnera pas pour presque tous les éléments. À la place, vous devrez faire `$('element[text=Text]')`.

## Feuille de route des fonctionnalités
* Une PR sera soumise prochainement qui permettra à ce service d'être installé pendant le questionnaire `npm init wdio@latest`.
* Évaluation en cours de la communication Socket avec le Roku afin que davantage de fonctionnalités puissent être outillées, comme un moyen de réveiller un Roku en veille.
* Fonctionnalité(s) de proxy réseau qui permettent de s'appuyer sur l'activité réseau.

## Utilisation des rapports Allure avec des captures d'écran et des fichiers XML attachés

Par défaut, Allure Reporting n'a pas de configuration en place pour générer des captures d'écran de l'application ou une copie du code XML représentatif de l'état actuel de l'application Roku à n'importe quel point de l'exécution du test. La documentation qui suit explique comment résoudre ce problème afin qu'une capture d'écran de l'état actuel de l'application soit générée et attachée au rapport Allure chaque fois qu'un test `it` termine son exécution. Cela permet également d'obtenir un instantané source du XML représentatif de l'état actuel de l'application Roku chaque fois qu'un test `it` échoue.

Pour la documentation complète sur Allure Reporter, veuillez consulter la documentation @wdio/allure-reporter https://webdriver.io/docs/allure-reporter/

### Dépendance Utils.js
Ajoutez le code suivant à un fichier appelé `Utils.js`. Ce fichier peut résider dans votre dossier `/helpers` ou similaire.
```js
/**
 * Renvoie une représentation sous forme de chaîne du timestamp 'maintenant' en millisecondes pour l'époque.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Renvoie une représentation sous forme de chaîne du timestamp 'maintenant' suivant le modèle : {AAAA}-{MM}-{JJ}_{heure en 24H}-{Minute}-{Seconde}-{Millisecondes}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * Un objet contenant les représentations sous forme de chaîne des extensions de fichier possibles utilisées à des fins de reporting.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * Un objet contenant les représentations sous forme de chaîne des types MIME possibles utilisés à des fins de reporting.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * Une fonction pour générer un nom de fichier avec un préfixe possible, un horodatage et l'une des extensions possibles fournies.
 * @param {string} fileExtension Utilisez l'une des valeurs de l'objet FILE_EXTENSIONS défini précédemment.
 * @param {string} [fileNamePrefix] Un préfixe à ajouter au début du nom de fichier s'il est fourni. Par défaut, une chaîne vide.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### Code wdio.conf.js
Ajoutez les déclarations d'importation suivantes dans le fichier `wdio.conf.js` :
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Remplacez <Utils.js file path> par le chemin relatif réel vers le fichier Utils.js

```

Définissez le hook `afterTest` suivant dans le fichier `wdio.conf.js`. Si vous avez déjà du code fonctionnel dans ce hook, ajoutez le code fourni ci-dessous.
```js
afterTest: async function (test, context, result) {
        // Logique de sauvegarde et d'attachement de capture d'écran indépendamment du résultat du test.
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // Logique d'attachement XML en cas d'échec du test.
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### Comportement attendu
Avec ce code en place dans la configuration du projet, on s'attend à ce que chaque fois qu'un test `it` est exécuté, indépendamment du résultat du test, une capture d'écran soit prise à la fin de l'exécution et attachée à sa section pertinente dans le rapport Allure. Dans le cas spécifique où le test échoue, un instantané source de l'état de l'application au format XML sera également attaché à la section du test dans le rapport Allure.

### Notes
* Les rapports Allure prennent en charge les captures d'écran au format `.png` par défaut. Les substitutions de méthode dans ce service prennent en charge l'image au format `.jpg` à la place.
* Les pièces jointes XML peuvent être parcourues dans le rapport Allure lui-même ou ouvertes dans un onglet séparé dans un navigateur.