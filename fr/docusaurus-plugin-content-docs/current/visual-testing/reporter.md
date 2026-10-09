---
id: visual-reporter
title: Rapporteur visuel
description: "Générez et parcourez le Rapporteur visuel pour examiner les différences des tests visuels à partir de la sortie JSON de @wdio/visual-service, en local ou en CI."
---

Le Rapporteur visuel (Visual Reporter) est une nouvelle fonctionnalité introduite dans `@wdio/visual-service`, à partir de la version [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Ce rapporteur permet aux utilisateurs de visualiser les rapports de différences JSON générés par le service de tests visuels et de les transformer en un format lisible par l'humain. Il aide les équipes à mieux analyser et gérer les résultats des tests visuels en fournissant une interface graphique pour examiner la sortie.

Pour utiliser cette fonctionnalité, assurez-vous de disposer de la configuration requise pour générer le fichier `output.json` nécessaire. Ce document vous guidera dans la configuration, l'exécution et la compréhension du Rapporteur visuel.

# Prérequis

Avant d'utiliser le Rapporteur visuel, assurez-vous d'avoir configuré le service de tests visuels pour générer des fichiers de rapport JSON :

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Génère le fichier output.json
            },
        ],
    ],
};
```

Pour des instructions de configuration plus détaillées, consultez la [documentation des tests visuels](./) de WebdriverIO ou l'option [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Installation

Pour installer le Rapporteur visuel, ajoutez-le comme dépendance de développement à votre projet avec npm :

```bash
npm install @wdio/visual-reporter --save-dev
```

Cela garantira que les fichiers nécessaires sont disponibles pour générer des rapports à partir de vos tests visuels.

# Utilisation

## Construire le rapport visuel

Une fois que vous avez exécuté vos tests visuels et qu'ils ont généré le fichier `output.json`, vous pouvez construire le rapport visuel en utilisant soit la CLI, soit les invites interactives.

### Utilisation de la CLI

Vous pouvez utiliser la commande CLI pour générer le rapport en exécutant :

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### Options requises :

-   `--jsonOutput` : Le chemin relatif vers le fichier `output.json` généré par le service de tests visuels. Ce chemin est relatif au répertoire depuis lequel vous exécutez la commande.
-   `--reportFolder` : Le répertoire relatif où le rapport généré sera stocké. Ce chemin est également relatif au répertoire depuis lequel vous exécutez la commande.

#### Options facultatives :

-   `--logLevel` : Définissez cette option sur `debug` pour obtenir une journalisation détaillée, particulièrement utile pour le dépannage.

#### Exemple

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Cela générera le rapport dans le dossier spécifié et fournira des informations dans la console. Par exemple :

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Afficher le rapport

:::warning
Ouvrir `path/to/report/index.html` directement dans un navigateur **sans le servir depuis un serveur local** ne fonctionnera **PAS**.
:::

Pour afficher le rapport, vous devez utiliser un serveur simple comme [sirv-cli](https://www.npmjs.com/package/sirv-cli). Vous pouvez démarrer le serveur avec la commande suivante :

```bash
npx sirv-cli /path/to/report --single
```

Cela produira des journaux similaires à l'exemple ci-dessous. Notez que le numéro de port peut varier :

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Vous pouvez maintenant afficher le rapport en ouvrant l'URL fournie dans votre navigateur.

### Utilisation des invites interactives

Vous pouvez également exécuter la commande suivante et répondre aux invites pour générer le rapport :

```bash
npx @wdio/visual-reporter
```

Les invites vous guideront pour fournir les chemins et options requis. À la fin, l'invite interactive vous demandera également si vous souhaitez démarrer un serveur pour afficher le rapport. Si vous choisissez de démarrer le serveur, l'outil lancera un serveur simple et affichera une URL dans les journaux. Vous pouvez ouvrir cette URL dans votre navigateur pour afficher le rapport.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Afficher le rapport

:::warning
Ouvrir `path/to/report/index.html` directement dans un navigateur **sans le servir depuis un serveur local** ne fonctionnera **PAS**.
:::

Si vous avez choisi de **ne pas** démarrer le serveur via l'invite interactive, vous pouvez toujours afficher le rapport en exécutant manuellement la commande suivante :

```bash
npx sirv-cli /path/to/report --single
```

Cela produira des journaux similaires à l'exemple ci-dessous. Notez que le numéro de port peut varier :

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Vous pouvez maintenant afficher le rapport en ouvrant l'URL fournie dans votre navigateur.

# Démo du rapport

Pour voir un exemple de l'apparence du rapport, visitez notre [démo sur GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Comprendre le rapport visuel

Le Rapporteur visuel fournit une vue organisée des résultats de vos tests visuels. Pour chaque exécution de test, vous pourrez :

-   Naviguer facilement entre les cas de test et voir les résultats agrégés.
-   Examiner les métadonnées telles que les noms des tests, les navigateurs utilisés et les résultats des comparaisons.
-   Afficher les images de différences montrant où des différences visuelles ont été détectées.

Cette représentation visuelle simplifie l'analyse des résultats de vos tests, ce qui facilite l'identification et la correction des régressions visuelles.

# Intégrations CI

Nous travaillons à la prise en charge de différents outils de CI comme Jenkins, GitHub Actions, etc. Si vous souhaitez nous aider, contactez-nous sur [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).