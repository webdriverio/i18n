---
id: testlens
title: TestLens
description: "Passez directement d'un test ou d'une commande dans l'interface DevTools à sa ligne source, dans l'onglet Source ou dans VS Code, grâce à TestLens."
---

TestLens offre une navigation intelligente dans le code entre l'interface DevTools et les fichiers sources de vos tests. Cliquez sur n'importe quel test ou commande dans l'interface pour ouvrir son code source à la ligne exacte dans l'onglet **Source** du tableau de bord, puis ouvrez le fichier dans VS Code à partir de là.

**Comment ça marche :**
- **Hiérarchie visuelle des tests** - Visualisez la structure de vos tests (suites, tests, scénarios) dans une arborescence
- **Correspondance avec le code source** - Chaque test est lié à son emplacement exact dans vos fichiers sources
- **Navigation en un clic** - Cliquez sur n'importe quel test ou commande pour afficher sa ligne source dans l'onglet **Source**
- **Lien vers l'éditeur** - Le lien **Open in editor** de l'onglet Source ouvre le fichier à cette ligne dans VS Code (`vscode://file/...`)

Cette connexion fluide entre l'interface et le code accélère le débogage en éliminant la recherche manuelle dans le code lors de l'analyse des échecs de tests.

## Démo

### 🔍︎ TestLens
![TestLens Demo](/img/devtools/testlens.gif)