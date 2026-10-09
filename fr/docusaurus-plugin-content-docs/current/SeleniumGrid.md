---
id: seleniumgrid
title: Selenium Grid
description: "Connectez les tests WebdriverIO à une instance Selenium Grid existante en définissant le protocole, le nom d'hôte, le port et le chemin dans votre configuration."
---

Vous pouvez utiliser WebdriverIO avec votre instance Selenium Grid existante. Pour connecter vos tests à Selenium Grid, il vous suffit de mettre à jour les options dans les configurations de votre test runner.

Voici un extrait de code provenant d'un exemple de wdio.conf.ts.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Vous devez fournir les valeurs appropriées pour le protocole, le nom d'hôte, le port et le chemin en fonction de la configuration de votre Selenium Grid.
Si vous exécutez Selenium Grid sur la même machine que vos scripts de test, voici quelques options typiques :

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### Authentification basique avec une Selenium Grid protégée

Il est fortement recommandé de sécuriser votre Selenium Grid. Si vous disposez d'une Selenium Grid protégée qui nécessite une authentification, vous pouvez transmettre des en-têtes d'authentification via les options. 
Veuillez consulter la section [headers](https://webdriver.io/docs/configuration/#headers) de la documentation pour plus d'informations.

### Configuration des délais d'attente avec une Selenium Grid dynamique

Lorsque vous utilisez une Selenium Grid dynamique où les pods de navigateur sont lancés à la demande, la création de session peut subir un démarrage à froid. Dans ce cas, il est conseillé d'augmenter les délais d'attente de création de session. La valeur par défaut dans les options est de 120 secondes, mais vous pouvez l'augmenter si votre grid met plus de temps à créer une nouvelle session. 

```ts
connectionRetryTimeout: 180000,
```

### Configurations avancées

Pour les configurations avancées, veuillez consulter le [fichier de configuration](https://webdriver.io/docs/configurationfile) du Testrunner.

### Opérations sur les fichiers avec Selenium Grid

Lors de l'exécution de cas de test avec une Selenium Grid distante, le navigateur s'exécute sur une machine distante, et vous devez porter une attention particulière aux cas de test impliquant des téléversements et des téléchargements de fichiers.

### Téléchargements de fichiers

Pour les navigateurs basés sur Chromium, vous pouvez consulter la documentation [Download file](https://webdriver.io/docs/api/browser/downloadFile). Si vos scripts de test doivent lire le contenu d'un fichier téléchargé, vous devez le télécharger depuis le nœud Selenium distant vers la machine du test runner. Voici un exemple d'extrait de code provenant de l'exemple de configuration `wdio.conf.ts` pour le navigateur Chrome :

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### Téléversement de fichiers avec une Selenium Grid distante

[`element.setFiles()`](/docs/api/element/setFiles) définit un champ de saisie de fichier via WebDriver BiDi. Les chemins que vous transmettez sont ouverts par le navigateur ; ils doivent donc exister sur la machine qui exécute le navigateur. WebdriverIO ne transfère pas un fichier local vers un nœud Selenium.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

Une suite qui utilisait `browser.uploadFile()` pour envoyer des octets vers le nœud doit placer le fichier à un endroit où le navigateur peut le lire, puis appeler `setFiles`. L'endpoint Selenium [`file`](/docs/api/selenium#file) reste disponible sous la forme `browser.file()` pour Chromedriver, Edgedriver et Selenium Grid. Il ne s'agit pas d'une commande WebDriver ou WebDriver BiDi.

### Autres opérations sur les fichiers/la grid

Il existe quelques autres opérations que vous pouvez effectuer avec Selenium Grid. Les instructions pour Selenium Standalone devraient également fonctionner avec Selenium Grid. Veuillez consulter la documentation [Selenium Standalone](https://webdriver.io/docs/api/selenium/) pour les options disponibles.


### Documentation officielle de Selenium Grid

Pour plus d'informations sur Selenium Grid, vous pouvez consulter la [documentation](https://www.selenium.dev/documentation/grid/) officielle de Selenium Grid. 

Si vous souhaitez exécuter Selenium Grid dans Docker, Docker Compose ou Kubernetes, veuillez consulter le [dépôt GitHub](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker.