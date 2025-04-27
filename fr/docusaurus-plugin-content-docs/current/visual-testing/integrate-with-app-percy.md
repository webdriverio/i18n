---
id: integrate-with-app-percy
title: Pour Application Mobile
---

## Integrate your WebdriverIO tests with App Percy

Before integration, you can explore [App Percy's sample build tutorial for WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Intégrez votre suite de tests avec BrowserStack App Percy et voici un aperçu des étapes d'intégration :

### Step 1: Create new app project on percy dashboard

[Inscrivez-vous](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) à Percy et [créez un nouveau projet de type application](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). Après avoir créé le projet, vous verrez une variable d'environnement `PERCY_TOKEN`. Percy utilisera le `PERCY_TOKEN` pour savoir à quelle organisation et à quel projet télécharger les captures d'écran. Vous aurez besoin de ce `PERCY_TOKEN` dans les prochaines étapes.

### Step 2: Set the project token as an environment variable

Exécutez la commande suivante pour définir PERCY_TOKEN comme variable d'environnement :

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Step 3: Install Percy packages

Installez les composants nécessaires pour établir l'environnement d'intégration pour votre suite de tests.
Pour installer les dépendances, exécutez la commande suivante :

```sh
npm install --save-dev @percy/cli
```

### Step 4: Install dependencies

Installez Percy Appium app

```sh
npm install --save-dev @percy/appium-app
```

### Step 5: Update test script
Assurez-vous d'importer @percy/appium-app dans votre code.

Voici un exemple de test utilisant la fonction percyScreenshot. Utilisez cette fonction partout où vous devez prendre une capture d'écran.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Nous passons les arguments requis à la méthode percyScreenshot.

Les arguments de la méthode de capture d'écran sont :

```sh
percyScreenshot(driver, name[, options])
```
### Step 6: Run your test script

Exécutez vos tests en utilisant `percy app:exec`.

Si vous ne pouvez pas utiliser la commande percy app:exec ou préférez exécuter vos tests à l'aide des options d'exécution de l'IDE, vous pouvez utiliser les commandes percy app:exec:start et percy app:exec:stop. Pour en savoir plus, visitez [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Cette commande démarre Percy, crée une nouvelle build Percy, prend des captures d'écran et les télécharge vers votre projet, puis arrête Percy :


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Visit the following pages for more details:
- [Integrate your WebdriverIO tests with Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Environment variable page](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integrate using BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) si vous utilisez BrowserStack Automate.


| Resource                                                                                                                                                            | Description                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Official docs](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Documentation WebdriverIO d'App Percy |
| [Sample build - Tutorial](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutoriel WebdriverIO d'App Percy      |
| [Official video](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Tests visuels avec App Percy         |
| [Blog](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Découvrez App Percy : plateforme de tests visuels automatisés alimentée par l'IA pour les applications natives    |