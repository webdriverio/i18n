---
id: headless-and-xvfb
title: Headless & Xvfb avec le Testrunner
description: Comment WebdriverIO utilise Xvfb pour les tests sans interface graphique sur Linux, les options de configuration, les recettes CI et le dépannage.
---

Cette page explique comment le testrunner WebdriverIO prend en charge l'exécution sans interface graphique sur Linux en utilisant Xvfb (X Virtual Framebuffer). Elle couvre quand Xvfb est utile, comment le configurer et comment il se comporte en CI et Docker.

## Quand utiliser Xvfb par rapport au mode headless natif

- Utilisez le mode headless natif (par exemple, Chrome `--headless=...`) lorsque c'est possible pour une surcharge minimale.
- Utilisez Xvfb quand :
  - Vous testez Electron ou des applications qui nécessitent un gestionnaire de fenêtres ou un environnement de bureau
  - Vous dépendez de GLX ou de comportements dépendants du gestionnaire de fenêtres
  - Vos outils s'attendent à un serveur d'affichage (`DISPLAY`)
  - Vous rencontrez des erreurs Chromium comme :
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    L'erreur de collision de répertoire de données utilisateur peut être trompeuse car elle résulte souvent d'un plantage du navigateur et d'un redémarrage immédiat qui réutilise le même répertoire de profil de l'instance précédente. Assurer un affichage stable (par exemple, via Xvfb) résout souvent ce problème - sinon, vous devriez passer un `--user-data-dir` unique par worker.

## Configuration

Quatre options du runner contrôlent le comportement de Xvfb :

- `autoXvfb` (booléen, par défaut : true)
  - Active/désactive l'utilisation. Si `false`, le runner n'utilise jamais Xvfb.
  - Si `true`, le runner peut utiliser Xvfb lorsque nécessaire.

- `xvfbAutoInstall` (booléen, par défaut : false)
  - Active l'installation automatique de `xvfb-run` s'il est manquant
  - Si false, le runner avertira et continuera sans installation

- `xvfbAutoInstallMode` ('root' | 'sudo', par défaut : 'sudo')
  - 'root' : installation uniquement si exécuté en tant que root (pas de sudo)
  - 'sudo' : permet sudo non interactif (`sudo -n`) si pas root ; ignore si sudo est manquant

- `xvfbAutoInstallCommand` (string | string[], optionnel)
  - Commande personnalisée à utiliser pour l'installation au lieu de la détection automatique du gestionnaire de paquets
  - Lorsqu'elle est fournie, cette commande est exécutée telle quelle et remplace la logique d'installation intégrée

- `xvfbMaxRetries` (nombre, par défaut : 3)
  - Nombre de tentatives de réessai pour les échecs du processus xvfb.
  - Utile pour les environnements CI instables où le démarrage de Xvfb peut échouer occasionnellement.

- `xvfbRetryDelay` (nombre, par défaut : 1000)
  - Délai de base entre les tentatives en millisecondes pour les échecs du processus xvfb.
  - Utilise un délai progressif : délai × numéro de tentative (par exemple, 1000ms, 2000ms, 3000ms, etc.).

Exemples :

```ts
export const config: WebdriverIO.Config = {
  // Utiliser Xvfb lorsque nécessaire
  autoXvfb: true,

  // Auto-installer les paquets Xvfb en utilisant sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Utiliser Xvfb lorsque nécessaire
  autoXvfb: true,

  // Auto-installer les paquets Xvfb avec une commande personnalisée et sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Utiliser Xvfb lorsque nécessaire
  autoXvfb: true,

  // Auto-installer les paquets Xvfb en utilisant sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Configurer le comportement de réessai pour les environnements CI instables
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Logique de détection

- Le runner envisage Xvfb quand :

  - Il s'exécute sur Linux
  - Aucun `DISPLAY` n'est défini (environnement headless), ou des flags de navigateur headless sont passés

- Si `DISPLAY` est défini, le runner ne forcera pas Xvfb par défaut et respectera votre serveur X/gestionnaire de fenêtres existant.

Notes :
- `autoXvfb: false` désactive complètement l'utilisation de Xvfb (pas d'encapsulation avec `xvfb-run`).
- `xvfbAutoInstall` n'affecte que l'installation si `xvfb-run` est manquant ; il n'active/désactive pas l'utilisation.
- `xvfbAutoInstallMode` contrôle la méthode d'installation : 'root' pour les installations root uniquement, 'sudo' pour les installations basées sur sudo (par défaut : 'sudo').
- Les installations de paquets intégrées sont toujours non interactives. Root uniquement à moins que vous optiez pour le mode 'sudo'.
- Le mécanisme de réessai utilise des délais progressifs : `xvfbRetryDelay × numéro de tentative` (par exemple, 1000ms, 2000ms, 3000ms, etc.).

## Utilisation d'un DISPLAY existant en CI

Si votre CI configure son propre serveur X/gestionnaire de fenêtres (par exemple, avec `Xvfb :99` et un WM), soit :

- Laissez `autoXvfb: true` et assurez-vous que `DISPLAY` est exporté ; le runner le respectera et évitera l'encapsulation.
- Ou définissez `autoXvfb: false` pour désactiver explicitement tout comportement Xvfb du runner.

## Recettes CI et Docker

GitHub Actions (utilisant le mode headless natif) :

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (affichage virtuel via Xvfb si manquant et option activée) :

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (exemple Ubuntu/Debian – préinstallation de xvfb) :

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Pour d'autres distributions, ajustez le gestionnaire de paquets et le nom du paquet en conséquence (par exemple, `dnf install xorg-x11-server-Xvfb` sur Fedora/RHEL, `zypper install xvfb-run` sur openSUSE/SLE).

## Support d'installation automatique (xvfbAutoInstall)

Lorsque `xvfbAutoInstall` est activé, WebdriverIO tente d'installer `xvfb` en utilisant le gestionnaire de paquets de votre système. Les gestionnaires et paquets suivants sont pris en charge :

| Gestionnaire de paquets | Commande       | Distributions (exemples)                                   | Nom(s) du paquet                |
|-------------------------|----------------|-------------------------------------------------------------|----------------------------------|
| apt                     | `apt-get`      | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, etc.      | `xvfb`                           |
| dnf                     | `dnf`          | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, etc.       | `xorg-x11-server-Xvfb`           |
| yum                     | `yum`          | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper                  | `zypper`       | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman                  | `pacman`       | Arch Linux, Manjaro, EndeavourOS, CachyOS, etc.             | `xorg-server-xvfb`               |
| apk                     | `apk`          | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install           | `xbps-install` | Void Linux                                                  | `xvfb`                           |

Notes :
- Si votre environnement utilise un gestionnaire de paquets différent, l'installation échouera avec une erreur ; installez `xvfb` manuellement.
- Les noms des paquets sont spécifiques à la distribution ; le tableau reflète les noms communs par famille.

## Dépannage

- "xvfb-run n'a pas pu démarrer"
  - Le runner réessaie automatiquement les échecs liés à Xvfb avec un retard progressif. Si les échecs persistent, augmentez `xvfbMaxRetries` et `xvfbRetryDelay` pour les environnements instables.

- Xvfb encapsulé de manière inattendue en CI
  - Si vous avez une configuration personnalisée `DISPLAY` / WM, définissez `autoXvfb: false` ou assurez-vous que `DISPLAY` est exporté avant le démarrage du runner.

- `xvfb-run` manquant
  - Gardez `xvfbAutoInstall: false` pour éviter de modifier l'environnement ; installez via votre image de base ou définissez `xvfbAutoInstall: true` pour l'activer.

- Échecs fréquents de démarrage de Xvfb en CI
  - Augmentez `xvfbMaxRetries` (par exemple, à 5-10) et `xvfbRetryDelay` (par exemple, à 2000ms) pour un comportement plus robuste dans des environnements instables.

## Avancé

- Le runner crée des processus via une factory qui encapsule le worker node avec `xvfb-run` si Xvfb est nécessaire et disponible.
- Les flags de navigateur headless (Chrome/Edge/Firefox) signalent l'utilisation headless et peuvent déclencher Xvfb dans des environnements sans `DISPLAY`.