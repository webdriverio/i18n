---
id: visual-reporter
title: Rapporteur Visuel
---

Le Rapporteur Visuel est une nouvelle fonctionnalité introduite dans le `@wdio/visual-service`, à partir de la version [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Ce rapporteur permet aux utilisateurs de visualiser les rapports de différences JSON générés par le service de Tests Visuels et de les transformer en un format lisible par l'homme. Il aide les équipes à mieux analyser et gérer les résultats des tests visuels en fournissant une interface graphique pour examiner les résultats.

Pour utiliser cette fonctionnalité, assurez-vous d'avoir la configuration requise pour générer le fichier `output.json` nécessaire. Ce document vous guidera à travers la configuration, l'exécution et la compréhension du Rapporteur Visuel.

# Prérequis

Avant d'utiliser le Rapporteur Visuel, assurez-vous d'avoir configuré le service de Tests Visuels pour générer des fichiers de rapport JSON :

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

Pour des instructions de configuration plus détaillées, consultez la [Documentation des Tests Visuels](./) de WebdriverIO ou [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Installation

Pour installer le Rapporteur Visuel, ajoutez-le comme dépendance de développement à votre projet en utilisant npm :

```bash
npm install @wdio/visual-reporter --save-dev
```

Cela garantira que les fichiers nécessaires sont disponibles pour générer des rapports à partir de vos tests visuels.

# Utilisation

## Construction du Rapport Visuel

Une fois que vous avez exécuté vos tests visuels et qu'ils ont généré le fichier `output.json`, vous pouvez construire le rapport visuel en utilisant soit la CLI, soit des invites interactives.

### Utilisation de la CLI

Vous pouvez utiliser la commande CLI pour générer le rapport en exécutant :

```bash
npx wdio-visual-reporter --jsonOutput=<chemin-vers-output.json> --reportFolder=<chemin-pour-stocker-rapport> --logLevel=debug
```

#### Options requises :

-   `--jsonOutput` : Le chemin relatif vers le fichier `output.json` généré par le service de Tests Visuels. Ce chemin est relatif au répertoire à partir duquel vous exécutez la commande.
-   `--reportFolder` : Le répertoire relatif où le rapport généré sera stocké. Ce chemin est également relatif au répertoire à partir duquel vous exécutez la commande.

#### Options facultatives :

-   `--logLevel` : Définissez-le sur `debug` pour obtenir des journaux détaillés, particulièrement utiles pour le dépannage.

#### Exemple

```bash
npx wdio-visual-reporter --jsonOutput=/chemin/vers/output.json --reportFolder=/chemin/vers/rapport --logLevel=debug
```

Cela générera le rapport dans le dossier spécifié et fournira des retours dans la console. Par exemple :

```bash
✔ Build output copied successfully to "/chemin/vers/rapport".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Visualisation du Rapport

:::warning
Ouvrir `chemin/vers/rapport/index.html` directement dans un navigateur **sans le servir depuis un serveur local** ne fonctionnera **PAS**.
:::

Pour visualiser le rapport, vous devez utiliser un serveur simple comme [sirv-cli](https://www.npmjs.com/package/sirv-cli). Vous pouvez démarrer le serveur avec la commande suivante :

```bash
npx sirv-cli /chemin/vers/rapport --single
```

Cela produira des journaux similaires à l'exemple ci-dessous. Notez que le numéro de port peut varier :

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Vous pouvez maintenant visualiser le rapport en ouvrant l'URL fournie dans votre navigateur.

### Utilisation des Invites Interactives

Alternativement, vous pouvez exécuter la commande suivante et répondre aux invites pour générer le rapport :

```bash
npx @wdio/visual-reporter
```

Les invites vous guideront pour fournir les chemins et options nécessaires. À la fin, l'invite interactive vous demandera également si vous souhaitez démarrer un serveur pour visualiser le rapport. Si vous choisissez de démarrer le serveur, l'outil lancera un serveur simple et affichera une URL dans les journaux. Vous pouvez ouvrir cette URL dans votre navigateur pour visualiser le rapport.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Visualisation du Rapport

:::warning
Ouvrir `chemin/vers/rapport/index.html` directement dans un navigateur **sans le servir depuis un serveur local** ne fonctionnera **PAS**.
:::

Si vous avez choisi de **ne pas** démarrer le serveur via l'invite interactive, vous pouvez toujours visualiser le rapport en exécutant manuellement la commande suivante :

```bash
npx sirv-cli /chemin/vers/rapport --single
```

Cela produira des journaux similaires à l'exemple ci-dessous. Notez que le numéro de port peut varier :

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Vous pouvez maintenant visualiser le rapport en ouvrant l'URL fournie dans votre navigateur.

# Démo du Rapport

Pour voir un exemple de l'apparence du rapport, visitez notre [démo GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Comprendre le Rapport Visuel

Le Rapporteur Visuel fournit une vue organisée de vos résultats de tests visuels. Pour chaque exécution de test, vous pourrez :

-   Naviguer facilement entre les cas de test et voir les résultats agrégés.
-   Examiner les métadonnées telles que les noms de test, les navigateurs utilisés et les résultats de comparaison.
-   Voir les images de différence montrant où les différences visuelles ont été détectées.

Cette représentation visuelle simplifie l'analyse de vos résultats de test, facilitant l'identification et la résolution des régressions visuelles.

# Intégrations CI

Nous travaillons à la prise en charge de différents outils CI comme Jenkins, GitHub Actions, etc. Si vous souhaitez nous aider, veuillez nous contacter sur [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).