---
id: security
title: Sécurité
description: "Protégez les données de test sensibles en suivant les bonnes pratiques de sécurité et en masquant les mots de passe et les clés dans les journaux et les rapports."
---

WebdriverIO garde à l'esprit l'aspect sécurité lorsqu'il fournit des solutions. Voici quelques moyens de mieux sécuriser vos tests.

## Bonnes pratiques

- Ne codez jamais en dur des données sensibles qui pourraient nuire à votre organisation si elles étaient exposées en clair.
- Utilisez un mécanisme (tel qu'un coffre-fort) pour stocker de manière sécurisée les clés et les mots de passe et les récupérer au démarrage de vos tests de bout en bout.
- Vérifiez qu'aucune donnée sensible n'est exposée dans les journaux ou par le fournisseur cloud, comme les jetons d'authentification dans les journaux réseau.

:::info

Même pour des données de test, il est essentiel de se demander si, entre de mauvaises mains, une personne malveillante pourrait récupérer des informations ou utiliser ces ressources avec une intention malveillante.

:::

## Masquage des données sensibles

Si vous utilisez des données sensibles pendant votre test, il est essentiel de vous assurer qu'elles ne sont pas visibles par tout le monde, par exemple dans les journaux. De plus, lors de l'utilisation d'un fournisseur cloud, des clés privées sont souvent impliquées. Ces informations doivent être masquées dans les journaux, les rapporteurs et les autres points de contact. Voici quelques solutions de masquage permettant d'exécuter des tests sans exposer ces valeurs.

### WebDriverIO

#### Masquer la valeur textuelle des commandes

Les commandes `addValue` et `setValue` prennent en charge une valeur booléenne `mask` pour masquer le texte dans les journaux ainsi que dans les rapporteurs. De plus, d'autres outils, comme les outils de performance et les outils tiers, recevront également la version masquée, ce qui renforce la sécurité.

Par exemple, si vous utilisez un véritable utilisateur de production et devez saisir un mot de passe que vous souhaitez masquer, c'est désormais possible avec ce qui suit :

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Le code ci-dessus masquera la valeur textuelle dans les journaux WDIO comme suit :

Exemple de journaux :
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Les rapporteurs, comme les rapporteurs Allure, et les outils tiers comme Percy de BrowserStack, traiteront également la version masquée.
Associés à la bonne version d'Appium, les journaux Appium seront également exempts de vos données sensibles.

:::info

Limitations :
  - Dans Appium, des plugins supplémentaires pourraient laisser fuiter les informations même si nous demandons leur masquage.
  - Les fournisseurs cloud pourraient utiliser un proxy pour la journalisation HTTP, ce qui contourne le mécanisme de masquage mis en place.
  - La commande `getValue` n'est pas prise en charge. De plus, si elle est utilisée sur le même élément, elle peut exposer la valeur censée être masquée lors de l'utilisation de `addValue` ou `setValue`.

Version minimale requise :
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Masquer dans les journaux WDIO

Grâce à la configuration `maskingPatterns`, nous pouvons masquer les informations sensibles dans les journaux WDIO. Cependant, les journaux Appium ne sont pas couverts.

Par exemple, si vous utilisez un fournisseur cloud avec le niveau info, vous allez très certainement « laisser fuiter » la clé de l'utilisateur comme indiqué ci-dessous :

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Pour contrer cela, nous pouvons passer l'expression régulière `'--key=([^ ]*)'` et vous verrez désormais dans les journaux

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Vous pouvez obtenir ce résultat en fournissant l'expression régulière dans le champ `maskingPatterns` de la configuration.
  - Pour plusieurs expressions régulières, utilisez une seule chaîne de caractères contenant des valeurs séparées par des virgules.
  - Pour plus de détails sur les motifs de masquage, consultez la [section Masking Patterns du README de WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * configurations de test
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

:::warning
Pour les secrets passés via la ligne de commande, le masquage peut échouer car le fichier wdio.conf.ts est analysé plus tard dans le cycle d'exécution. L'utilisation de variables d'environnement dans ces cas est fortement recommandée et beaucoup plus sûre.
:::

#### Désactiver les loggers WDIO

Une autre façon d'empêcher la journalisation de données sensibles est d'abaisser ou de rendre silencieux le niveau de journalisation, ou de désactiver le logger.
Cela peut être réalisé comme suit :

```ts
import logger from '@wdio/logger';

/**
  * Définit le niveau du logger WDIO sur 'silent' avant *d'exécuter une promesse, ce qui aide à masquer les informations sensibles dans les journaux.
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
Appium propose sa propre solution de masquage ; voir [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Leur solution peut être délicate à utiliser. Une approche, si possible, consiste à insérer un jeton dans votre chaîne, comme `@mask@`, et à l'utiliser comme expression régulière
 - Dans certaines versions d'Appium, les valeurs sont également journalisées avec chaque caractère séparé par une virgule, il faut donc être prudent.
 - Malheureusement, BrowserStack ne prend pas en charge cette solution, mais elle reste utile en local

En reprenant l'exemple `@mask@` mentionné précédemment, nous pouvons utiliser le fichier JSON suivant nommé `appiumMaskLogFilters.json`
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

Passez ensuite le nom du fichier JSON au champ `logFilters` dans la configuration du service appium :
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
 - Malheureusement, la solution est du type tout ou rien : toutes les valeurs textuelles des commandes concernées seront donc masquées.