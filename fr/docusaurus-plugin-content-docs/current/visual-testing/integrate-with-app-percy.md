---
id: integrate-with-app-percy
title: Pour les applications mobiles
description: "Intégrez vos tests d'applications mobiles WebdriverIO avec BrowserStack App Percy pour les tests visuels, en commençant par définir votre PERCY_TOKEN."
---

## Intégrez vos tests WebdriverIO avec App Percy

Avant l'intégration, vous pouvez explorer le [tutoriel de build d'exemple d'App Percy pour WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Voici un aperçu des étapes pour intégrer votre suite de tests avec BrowserStack App Percy :

### Étape 1 : Créer un nouveau projet d'application sur le tableau de bord Percy

[Connectez-vous](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) à Percy et [créez un nouveau projet de type application](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). Une fois le projet créé, une variable d'environnement `PERCY_TOKEN` vous sera affichée. Percy utilisera le `PERCY_TOKEN` pour savoir vers quelle organisation et quel projet téléverser les captures d'écran. Vous aurez besoin de ce `PERCY_TOKEN` dans les étapes suivantes.

### Étape 2 : Définir le token du projet comme variable d'environnement

Exécutez la commande indiquée pour définir PERCY_TOKEN comme variable d'environnement :

```sh
export PERCY_TOKEN="<your token here>"   // macOS ou Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Étape 3 : Installer les paquets Percy

Installez les composants nécessaires pour mettre en place l'environnement d'intégration de votre suite de tests.
Pour installer les dépendances, exécutez la commande suivante :

```sh
npm install --save-dev @percy/cli
```

### Étape 4 : Installer les dépendances

Installez Percy Appium app

```sh
npm install --save-dev @percy/appium-app
```

### Étape 5 : Mettre à jour le script de test
Assurez-vous d'importer @percy/appium-app dans votre code.

Voici un exemple de test utilisant la fonction percyScreenshot. Utilisez cette fonction chaque fois que vous devez prendre une capture d'écran.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Nous transmettons les arguments requis à la méthode percyScreenshot.

Les arguments de la méthode de capture d'écran sont :

```sh
percyScreenshot(driver, name[, options])
```
### Étape 6 : Exécuter votre script de test

Exécutez vos tests avec `percy app:exec`.

Si vous ne pouvez pas utiliser la commande percy app:exec ou si vous préférez exécuter vos tests via les options d'exécution de votre IDE, vous pouvez utiliser les commandes percy app:exec:start et percy app:exec:stop. Pour en savoir plus, consultez [Exécuter Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Cette commande démarre Percy, crée un nouveau build Percy, prend des snapshots et les téléverse dans votre projet, puis arrête Percy :


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Consultez les pages suivantes pour plus de détails :
- [Intégrer vos tests WebdriverIO avec Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Page des variables d'environnement](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Intégrer avec le SDK BrowserStack](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) si vous utilisez BrowserStack Automate.


| Ressource                                                                                                                                                            | Description                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentation officielle](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Documentation WebdriverIO d'App Percy |
| [Build d'exemple - Tutoriel](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutoriel WebdriverIO d'App Percy      |
| [Vidéo officielle](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Tests visuels avec App Percy         |
| [Blog](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Découvrez App Percy : plateforme de tests visuels automatisés alimentée par l'IA pour les applications natives    |