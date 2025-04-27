---
id: seleniumgrid
title: Selenium Grid
---

Vous pouvez utiliser WebdriverIO avec votre instance Selenium Grid existante. Pour connecter vos tests à Selenium Grid, vous devez simplement mettre à jour les options dans les configurations de votre test runner.

Voici un extrait de code d'un exemple de wdio.conf.ts.

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
Vous devez fournir les valeurs appropriées pour le protocole, le nom d'hôte, le port et le chemin en fonction de votre configuration Selenium Grid.
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

### Authentification de base avec Selenium Grid protégé

Il est fortement recommandé de sécuriser votre Selenium Grid. Si vous avez un Selenium Grid protégé qui nécessite une authentification, vous pouvez transmettre des en-têtes d'authentification via des options.
Veuillez consulter la section [headers](https://webdriver.io/docs/configuration/#headers) dans la documentation pour plus d'informations.

### Configurations de délai d'attente avec Selenium Grid dynamique

Lorsque vous utilisez un Selenium Grid dynamique où les pods de navigateur sont lancés à la demande, la création de session peut faire face à un démarrage à froid. Dans de tels cas, il est conseillé d'augmenter les délais de création de session. La valeur par défaut dans les options est de 120 secondes, mais vous pouvez l'augmenter si votre grid prend plus de temps pour créer une nouvelle session.

```ts
connectionRetryTimeout: 180000,
```

### Configurations avancées

Pour les configurations avancées, veuillez consulter le [fichier de configuration](https://webdriver.io/docs/configurationfile) du Testrunner.

### Opérations sur les fichiers avec Selenium Grid

Lorsque vous exécutez des cas de test avec un Selenium Grid distant, le navigateur s'exécute sur une machine distante, et vous devez prendre des précautions particulières avec les cas de test impliquant des téléchargements et des uploads de fichiers.

### Téléchargements de fichiers

Pour les navigateurs basés sur Chromium, vous pouvez consulter la documentation [Download file](https://webdriver.io/docs/api/browser/downloadFile). Si vos scripts de test doivent lire le contenu d'un fichier téléchargé, vous devez le télécharger depuis le nœud Selenium distant vers la machine du test runner. Voici un exemple d'extrait de code de la configuration `wdio.conf.ts` pour le navigateur Chrome :

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

### Upload de fichier avec Selenium Grid distant

Pour télécharger un fichier vers une application web dans le navigateur distant, vous devez d'abord télécharger le fichier vers la grid distante. Vous pouvez consulter la documentation [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) pour plus de détails.

### Autres opérations fichier/grid

Il existe quelques autres opérations que vous pouvez effectuer avec Selenium Grid. Les instructions pour Selenium Standalone devraient fonctionner correctement avec Selenium Grid également. Veuillez consulter la documentation [Selenium Standalone](https://webdriver.io/docs/api/selenium/) pour les options disponibles.


### Documentation officielle de Selenium Grid

Pour plus d'informations sur Selenium Grid, vous pouvez consulter la [documentation](https://www.selenium.dev/documentation/grid/) officielle de Selenium Grid.

Si vous souhaitez exécuter Selenium Grid dans Docker, Docker compose ou Kubernetes, veuillez consulter le [dépôt GitHub](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker.