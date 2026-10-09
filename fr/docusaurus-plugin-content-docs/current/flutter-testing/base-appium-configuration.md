---
id: base-appium-configuration
title: Configuration de base d'Appium
description: "Installez le service Appium et le package Flutter finder, puis configurez la base d'Appium pour tester des applications Flutter avec WebdriverIO."
---

WebdriverIO utilise Appium pour exécuter des tests sur des émulateurs mobiles, des simulateurs et des appareils réels. Le `@wdio/appium-service` gère automatiquement le cycle de vie du serveur Appium pendant l'exécution des tests.

Pour la configuration générale d'Appium et les options de capacités, consultez la [documentation du service Appium](https://webdriver.io/docs/appium-service/).

## Installation des dépendances

Pour tester des applications Flutter, installez le service Appium et le package Flutter finder :

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Installation de l'Appium Flutter Driver

Vous pouvez installer l'Appium Flutter Driver (`appium-flutter-driver`) de l'une des deux manières suivantes :

#### Option 1 : En tant que dépendance de développement (recommandé pour le CI/CD)

Ajouter le driver directement à vos `devDependencies` garantit que tous les membres de l'équipe et tous les pipelines CI/CD disposent automatiquement du driver installé, sans étapes de configuration supplémentaires :

```bash
npm install --save-dev appium-flutter-driver
```

> Vous pouvez également installer tous les packages requis en une seule commande :
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Option 2 : Via la CLI d'Appium (configuration locale)

Vous pouvez également installer le driver localement dans votre environnement Appium à l'aide de la CLI d'Appium :

```bash
npx appium driver install flutter
```

### Aperçu des packages

Ces packages fournissent :
- **`@wdio/appium-service` & `appium`** : démarre et gère le serveur Appium pendant l'exécution des tests.
- **`appium-flutter-driver`** : le driver Appium chargé de communiquer avec l'extension de test de Flutter.
- **`appium-flutter-finder`** : bibliothèque d'assistance fournissant des stratégies de localisation spécifiques à Flutter (`byValueKey`, `byText`, `byTooltip`).