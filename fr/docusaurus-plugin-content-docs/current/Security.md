---
id: security
title: Sécurité
---

WebdriverIO prend en compte l'aspect sécurité lors de la fourniture de solutions. Voici quelques moyens pour mieux sécuriser vos tests.

## Bonnes pratiques

- Ne codez jamais en dur des données sensibles qui pourraient nuire à votre organisation si elles étaient exposées en texte clair.
- Utilisez un mécanisme (comme un coffre-fort) pour stocker en toute sécurité les clés et mots de passe et les récupérer lors du démarrage de vos tests de bout en bout.
- Vérifiez qu'aucune donnée sensible n'est exposée dans les journaux et par le fournisseur cloud, comme les jetons d'authentification dans les journaux réseau.

:::info

Même pour les données de test, il est essentiel de se demander si, entre de mauvaises mains, une personne malveillante pourrait récupérer des informations ou utiliser ces ressources avec une intention malveillante.

:::

## Masquage des données sensibles

Si vous utilisez des données sensibles pendant votre test, il est essentiel de s'assurer qu'elles ne sont pas visibles par tout le monde, comme dans les journaux. De plus, lors de l'utilisation d'un fournisseur cloud, des clés privées sont souvent impliquées. Ces informations doivent être masquées des journaux, des rapporteurs et d'autres points de contact. Voici quelques solutions de masquage pour exécuter des tests sans exposer ces valeurs.

### WebDriverIO

#### Masquer la valeur textuelle des commandes

Les commandes `addValue` et `setValue` prennent en charge une valeur booléenne de masquage pour masquer dans les journaux, ainsi que les rapporteurs. De plus, d'autres outils, tels que les outils de performance et les outils tiers, recevront également la version masquée, améliorant ainsi la sécurité.

Par exemple, si vous utilisez un utilisateur réel en production et que vous devez saisir un mot de passe que vous souhaitez masquer, c'est désormais possible avec ce qui suit :

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Ce qui précède masquera la valeur textuelle des journaux WDIO comme suit :

Exemple de journaux :
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Les rapporteurs, tels que les rapporteurs Allure, et les outils tiers comme Percy de BrowserStack géreront également la version masquée.
Associé à la version appropriée d'Appium, les journaux Appium seront également exempts de vos données sensibles.

:::info

Limitations :
  - Dans Appium, des plugins supplémentaires pourraient fuiter même si nous demandons de masquer l'information.
  - Les fournisseurs cloud pourraient utiliser un proxy pour la journalisation HTTP, ce qui contourne le mécanisme de masquage mis en place.
  - La commande `getValue` n'est pas prise en charge. De plus, si elle est utilisée sur le même élément, elle peut exposer la valeur destinée à être masquée lors de l'utilisation de `addValue` ou `setValue`.

Version minimale requise :
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Masquage dans les journaux WDIO

En utilisant la configuration `maskingPatterns`, nous pouvons masquer les informations sensibles des journaux WDIO. Cependant, les journaux Appium ne sont pas couverts.

Par exemple, si vous utilisez un fournisseur cloud et utilisez le niveau d'information, vous allez "fuiter" la clé de l'utilisateur comme indiqué ci-dessous :

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Pour contrer cela, nous pouvons passer l'expression régulière `'--key=([^ ]*)'` et maintenant dans les journaux vous verrez 

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Vous pouvez réaliser ce qui précède en fournissant l'expression régulière au champ `maskingPatterns` de la configuration.
  - Pour plusieurs expressions régulières, utilisez une seule chaîne mais avec une valeur séparée par des virgules.
  - Pour plus de détails sur les modèles de masquage, consultez la [section Masking Patterns dans le README du logger WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

Version minimale requise :
 - WDIO v9.15.0

:::

#### Désactiver les journaux WDIO

Une autre façon de bloquer la journalisation des données sensibles est de réduire ou de mettre en silence le niveau de journalisation ou de désactiver le logger.
Cela peut être réalisé comme suit :

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

### Solutions tierces

#### Appium
Appium offre sa propre solution de masquage ; voir [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Leur solution peut être délicate à utiliser. Une façon possible est de passer un jeton dans votre chaîne comme `@mask@` et de l'utiliser comme expression régulière
 - Dans certaines versions d'Appium, les valeurs sont également journalisées avec chaque caractère séparé par des virgules, donc nous devons être prudents.
 - Malheureusement, BrowserStack ne prend pas en charge cette solution, mais elle reste utile localement
 
En utilisant l'exemple `@mask@` mentionné précédemment, nous pouvons utiliser le fichier JSON suivant nommé `appiumMaskLogFilters.json`
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

Puis passez le nom du fichier JSON au champ `logFilters` dans la configuration du service appium :
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

#### BrowserStack

BrowserStack offre également un certain niveau de masquage pour cacher certaines données ; voir [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Malheureusement, la solution est tout ou rien, donc toutes les valeurs textuelles des commandes fournies seront masquées.