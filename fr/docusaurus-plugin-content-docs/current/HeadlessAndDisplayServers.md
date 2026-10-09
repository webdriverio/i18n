---
id: headless-and-display-servers
title: Mode headless et serveurs d'affichage
description: Exécutez des navigateurs en mode graphique et des applications de bureau sur une CI Linux et dans des conteneurs grâce à l'affichage virtuel Weston ou Xvfb que lance le testrunner, avec ses options, des recettes pour la CI et le dépannage.
---

Sous Linux, lorsqu'aucun affichage n'est disponible, le testrunner lance un serveur d'affichage virtuel pour l'exécution : [Weston](https://gitlab.freedesktop.org/wayland/weston) en mode headless, ou [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer) en solution de repli. Cette page explique dans quels cas cela se produit, comment le configurer et comment il se comporte en CI et dans Docker. Dans la plupart des configurations, il suffit que Weston ou Xvfb soit installé dans votre image, ou d'ajouter `displayServerAutoInstall: true` à votre configuration.

## Quand utiliser un affichage virtuel plutôt que le mode headless natif

L'affichage virtuel fournit un écran aux navigateurs et aux applications là où il n'y en a pas, par exemple sur les runners de CI et dans les conteneurs. Conservez-le lorsque :

- Vous testez des applications de bureau, qui ont besoin d'une vraie fenêtre.
- Vos tests ont besoin d'un navigateur en mode graphique, par exemple pour correspondre à des captures d'écran de référence prises avec un navigateur visible.
- Chrome ne démarre pas et affiche `DevToolsActivePort file doesn't exist` ou `user data directory is already in use`, comme décrit dans [Dépannage](#troubleshooting).

Pour les tests de navigateur qui n'ont pas besoin de fenêtre visible, le mode headless natif, comme `--headless=new` de Chrome, est moins coûteux. Associez-le à `displayServerEnabled: false`, sinon le testrunner lance quand même un serveur d'affichage. Faites de même lorsque tous vos navigateurs s'exécutent sur un service cloud ou une grille distante, puisque rien en local n'a besoin d'affichage.

## Fonctionnement

Le testrunner lance un serveur d'affichage avant le hook `onPrepare` de tout service et définit son environnement dans `process.env` :

| Variable | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | non définie |
| `DISPLAY` | non définie | le premier affichage libre, par exemple `:0` |
| `XDG_RUNTIME_DIR` | un répertoire privé sous `/tmp` pour l'exécution | inchangée |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

Les workers héritent de ces variables, tout comme les drivers et les applications que les services lancent dans `onPrepare`. Les navigateurs et les toolkits graphiques choisissent Wayland ou X11 à partir de celles-ci. Sous Weston, le `XDG_RUNTIME_DIR` privé remplace toute valeur que vous aviez pour l'exécution.

Le serveur d'affichage reste actif jusqu'à la fin des hooks `onComplete`, afin que les services puissent encore l'utiliser pendant leur arrêt. Le testrunner l'arrête ensuite et restaure les valeurs précédentes. Si le processus se termine plus tôt, y compris via Ctrl+C, le serveur d'affichage est tué avec lui.

Le testrunner ne lance un serveur d'affichage que si toutes ces conditions sont réunies :

- Il s'exécute sous Linux.
- Ni `DISPLAY` ni `WAYLAND_DISPLAY` n'est défini.
- `displayServerEnabled` n'est pas `false`.

Si un affichage existe déjà, le testrunner l'utilise et ne lance rien. Si seul `WAYLAND_DISPLAY` est défini, par exemple par un Weston lancé par votre CI, le testrunner définit tout de même `XDG_SESSION_TYPE`, `GDK_BACKEND` et `ELECTRON_OZONE_PLATFORM_HINT` à `wayland` pour l'exécution. Cela garantit que les navigateurs utilisent le bon affichage en remplaçant les valeurs héritées, comme `XDG_SESSION_TYPE=tty` provenant d'une connexion SSH, qui les enverraient vers X11, où aucun serveur n'existe. Il le fait même avec `displayServerEnabled: false`, qui contrôle uniquement si un serveur d'affichage est lancé.

### Quel serveur d'affichage est utilisé

Avec la valeur par défaut `displayServer: 'auto'`, le testrunner essaie d'abord Weston, puis Xvfb. Les serveurs déjà installés sont essayés avant toute installation, donc un Xvfb existant est utilisé plutôt que d'installer Weston. Si Weston ne parvient pas à démarrer, le testrunner se rabat sur Xvfb. Si aucun serveur d'affichage ne démarre, le testrunner affiche un avertissement et l'exécution continue sans. Avec `displayServer: 'wayland'` ou `displayServer: 'xvfb'`, le testrunner n'essaie que ce serveur.

Weston 10 et les versions ultérieures sont pris en charge. Ubuntu 22.04 et Debian 11 fournissent Weston 9, et Enterprise Linux 9 avec EPEL activé obtient Weston 8 ; définissez donc `displayServer: 'xvfb'` sur ces systèmes. Weston démarre sans Xwayland et ne fournit donc pas de `DISPLAY`. Si vos tests ou outils ont besoin de X11, par exemple `xdotool`, `xclip` ou une application Java, définissez `displayServer: 'xvfb'`.

### Focus des fenêtres

Tous les workers utilisent le même affichage. Dans WebdriverIO v9, chaque worker était encapsulé dans `xvfb-run` et disposait de son propre affichage, si bien que son navigateur avait toujours le focus. Les navigateurs basés sur Chromium, comme Chrome et Edge, peuvent désormais ne pas avoir le focus : sous Weston, aucune fenêtre n'obtient le focus, et sous Xvfb, seule la fenêtre ouverte le plus récemment l'a. Les saisies WebDriver atteignent toujours la page, mais `document.hasFocus()` renvoie `false`, les événements `focus` ne se déclenchent pas et les styles `:focus` ne s'appliquent pas. Si vos tests dépendent du focus, activez l'émulation du focus, une commande expérimentale du Chrome DevTools Protocol (CDP) qui persiste entre les chargements de page :

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

Firefox n'est pas concerné, car sous WebDriver il considère ses pages comme ayant le focus.

### Scripts autonomes

Le testrunner lance lui-même le serveur d'affichage. Un script autonome qui appelle `remote()` peut en lancer un avec `startDisplayDaemonFromConfig` de `@wdio/display-server`. Cette fonction accepte les mêmes options `displayServer*`, définit les variables de l'affichage dans `process.env` afin que le navigateur en hérite, et les restaure lors de `stop()` :

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// null hors de Linux, lorsqu'un affichage X11 existe déjà, ou lorsqu'aucun ne démarre. Avec un
// affichage Wayland existant, renvoie un handle dont stop() restaure les variables de session définies.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

Vous pouvez aussi exécuter le script sous `xvfb-run`, comme dans [Utiliser un affichage existant](#using-an-existing-display).

## Configuration des navigateurs

### Navigateurs lancés par WebdriverIO

Ces navigateurs ne nécessitent aucune configuration :

- Chrome et Edge 140 et versions ultérieures, ainsi que Chrome for Testing 135 et versions ultérieures, suivent le `XDG_SESSION_TYPE=wayland` défini par le serveur d'affichage.
- Les versions plus anciennes de Chrome et Edge ignorent `XDG_SESSION_TYPE`. Pour celles-ci, WebdriverIO ajoute `--ozone-platform=wayland` aux arguments de chaque Chrome et Edge qu'il lance lorsque Wayland est actif sans serveur X, sauf si les arguments définissent déjà `--ozone-platform` ou `--headless`.
- Applications Electron : Electron 38 et versions ultérieures suivent `XDG_SESSION_TYPE`, et Electron 28 à 37 suivent `ELECTRON_OZONE_PLATFORM_HINT`, que le serveur d'affichage définit également. Electron 27 et versions antérieures s'appuient sur le flag `--ozone-platform=wayland`, que WebdriverIO ajoute lorsqu'il lance l'application via Chromedriver.
- Firefox et les applications GTK, comme les applications Tauri, choisissent Wayland à partir de `WAYLAND_DISPLAY` et `GDK_BACKEND`. Firefox antérieur à la version 120 n'est pas testé.

### Navigateurs non lancés par WebdriverIO

Les navigateurs sur une grille ou un service cloud ne nécessitent aucune configuration, puisqu'ils s'exécutent sur l'affichage de l'hôte distant.

Les navigateurs locaux lancés par autre chose, comme un driver que vous avez démarré, un serveur Appium ou le lanceur propre à un service, ne reçoivent pas le flag `--ozone-platform=wayland` de WebdriverIO. Chrome et Edge 140 et versions ultérieures, ainsi qu'Electron 28 et versions ultérieures, n'en ont pas besoin puisqu'ils suivent les variables de session, mais les anciennes versions de Chrome et Edge, si. La marche à suivre dépend du moment où le navigateur démarre :

- **Pendant l'exécution**, par exemple depuis le `onPrepare` d'un service, les navigateurs récents n'ont besoin de rien, puisqu'ils héritent de l'affichage et des variables de session. Pour les anciennes versions de Chrome et Edge, au choix :
  - définissez `displayServer: 'xvfb'` pour utiliser Xvfb, ou
  - définissez `displayServer: 'wayland'` et ajoutez `--ozone-platform=wayland` à leurs arguments pour utiliser Weston.
- **Avant WebdriverIO**, par exemple depuis une étape de CI précédente ou un autre shell, ils ne peuvent pas utiliser un serveur d'affichage lancé par WebdriverIO, puisqu'ils n'héritent pas de ses variables. Lancez l'affichage vous-même, comme dans [Utiliser un affichage existant](#using-an-existing-display), et au choix :
  - utilisez Xvfb, qui ne nécessite rien de plus, ou
  - utilisez Weston, puis exportez `XDG_SESSION_TYPE=wayland` (Chrome et Edge 140 et versions ultérieures, Electron 38 et versions ultérieures) ou `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron 28 à 37), et ajoutez `--ozone-platform=wayland` aux arguments des anciennes versions de Chrome et Edge.

## Configuration

Toutes les options sont répertoriées dans la [référence de configuration](/docs/configuration#displayserverenabled). Par exemple :

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Installer un serveur d'affichage si aucun n'est installé
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Toujours utiliser Xvfb avec une taille réduite, installé par une commande personnalisée qui suppose un conteneur root
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

La commande personnalisée est partagée par les deux serveurs. Avec `displayServer: 'auto'`, elle s'exécute d'abord pour Weston, puis à nouveau pour Xvfb uniquement si Weston n'est toujours pas disponible ou ne parvient pas à démarrer et que Xvfb est toujours absent. Définissez `displayServer` sur le serveur que votre commande installe, comme dans cet exemple.

Les options `autoXvfb` et `xvfb*` de la v9 sont dépréciées et seront supprimées dans la v11. Consultez le [guide de migration v10](/docs/v10-migration#virtual-displays-on-linux) pour leurs remplaçants.

## CI et Docker

Préinstallez un serveur d'affichage dans votre image, ou définissez `displayServerAutoInstall: true` pour en installer un au démarrage de l'exécution.

### Préinstaller un serveur d'affichage

#### Weston

Sur Ubuntu 24.04 ou Debian 12 et versions ultérieures :

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

Sur RHEL 10 et Oracle Linux 10, activez vous-même EPEL et CodeReady Builder en suivant la [documentation EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/), puis installez `weston`.

Pour encapsuler le testrunner dans votre propre Weston, comme dans [Utiliser un affichage existant](#using-an-existing-display), installez également `xwayland-run`. Il est empaqueté pour Debian 13, Ubuntu 24.04, Fedora et openSUSE Tumbleweed. Sans lui, vous devez lancer Weston en arrière-plan avec ses propres `XDG_RUNTIME_DIR` et `WAYLAND_DISPLAY`, et attendre son socket avant de démarrer WebdriverIO. Vous pouvez aussi utiliser Xvfb.

#### Xvfb

Sur Ubuntu ou Debian :

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04 et Debian 11 fournissent un Weston trop ancien ; utilisez donc Xvfb sur ces systèmes. Si seul Xvfb est installé, le testrunner l'utilise sans configuration supplémentaire.

Pour les autres distributions, utilisez les noms de paquets indiqués dans [Prise en charge de l'installation automatique](#automatic-installation-support).

### Utiliser un affichage existant

Si votre CI fournit déjà un affichage, le testrunner l'utilise et ne lance rien.

Pour utiliser Weston, encapsulez le testrunner avec `wlheadless-run` du paquet `xwayland-run`. Il fournit à Weston un répertoire d'exécution privé et attend son socket, et les flags correspondent au Weston que lance le testrunner :

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Pour utiliser Xvfb, encapsulez le testrunner avec `xvfb-run` :

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## Prise en charge de l'installation automatique

`displayServerAutoInstall` fonctionne avec les gestionnaires de paquets ci-dessous. Les installations sont non interactives et expirent au bout de 240 secondes. Avec tout autre gestionnaire de paquets, installez vous-même le serveur d'affichage.

| Gestionnaire de paquets | Distributions | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- Sur Arch Linux, l'installation exécute `pacman -Syu`, une mise à niveau complète du système, car Arch ne prend pas en charge les mises à niveau partielles. Sur une image obsolète, cela peut dépasser la limite de 240 secondes ; préinstallez donc le serveur d'affichage dans ce cas.
- Enterprise Linux 10 ne dispose pas de Xvfb et ne fournit Weston que dans EPEL, qui nécessite CRB. Sur CentOS Stream, AlmaLinux et Rocky Linux, l'installation active les deux et les laisse activés. Sur RHEL et Oracle Linux, configurez-les vous-même, comme dans [Préinstaller un serveur d'affichage](#preinstalling-a-display-server).

## Journaux

Le serveur d'affichage s'exécute dans le processus du launcher, ses messages figurent donc dans le journal du launcher : `wdio.log` dans votre `outputDir`, ou le terminal si `outputDir` n'est pas défini. Le journal indique quel serveur d'affichage a démarré et les variables qu'il a définies. Pour plus de détails, augmentez son niveau de journalisation :

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## Dépannage

### Chrome échoue avec `DevToolsActivePort file doesn't exist`

Le message complet est `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. Une cause fréquente est un Chrome en mode graphique sans affichage sur lequel ouvrir sa fenêtre. Vérifiez dans le [journal du launcher](#logs) quel serveur d'affichage a démarré. Si aucun n'a démarré, consultez [Le journal du launcher affiche `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). Si vos tests n'ont pas besoin de fenêtre visible, utilisez plutôt le mode headless natif, comme dans [Quand utiliser un affichage virtuel plutôt que le mode headless natif](#when-to-use-a-virtual-display-vs-native-headless).

### Chrome échoue avec `user data directory is already in use`

Le message complet commence par `session not created: probably user data directory is already in use`. Il est souvent trompeur : il signifie généralement que le navigateur a planté et a redémarré avec le répertoire de profil de l'instance précédente. Un affichage stable résout souvent le problème. Sinon, passez un `--user-data-dir` unique par worker.

### Le journal du launcher affiche `No display server could be started`

Le message complet est `No display server could be started; continuing without a virtual display`. Aucun serveur d'affichage n'est installé, ou aucun n'a démarré. Les messages qui le précèdent en indiquent la raison :

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` ou `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` : rien n'est installé et l'installation automatique est désactivée.
- `wayland failed to start: ...` ou `xvfb failed to start: ...` : la sortie d'erreur du serveur suit.
- `Failed to install Weston` ou `Failed to install Xvfb` : l'installation a échoué.
- `wayland still not found after installing` ou `xvfb still not found after installing` : l'installation a réussi mais n'a pas fourni ce serveur, par exemple parce qu'une `displayServerAutoInstallCommand` personnalisée n'installe que l'autre. Définissez `displayServer` sur le serveur que votre commande installe.

Installez Weston ou Xvfb dans votre image, ou définissez `displayServerAutoInstall: true`.

### Xvfb se termine avec `Failed to find a socket to listen on`

Xvfb crée son socket dans `/tmp/.X11-unix`. Si ce répertoire existe, il doit être accessible en écriture par l'utilisateur des tests, comme c'est le cas avec le mode `1777`.

### Chrome ou Electron échoue sous Weston avec `Missing X server or $DISPLAY`

Le navigateur a essayé X11 au lieu de Wayland. Si WebdriverIO ne l'a pas lancé, consultez [Navigateurs non lancés par WebdriverIO](#browsers-webdriverio-doesnt-launch). Sinon, retirez `--ozone-platform=x11` de ses arguments.

### Les tests dépendant du focus échouent dans Chrome ou Edge

`document.hasFocus()` renvoie `false` car les pages sur l'affichage partagé peuvent ne pas avoir le focus. Activez l'émulation du focus, comme dans [Focus des fenêtres](#window-focus).

### Un outil ou une application X11 échoue sous Weston avec `cannot open display` ou `Can't open display`

Weston ne fournit pas de `DISPLAY`. Définissez `displayServer: 'xvfb'` pour que le testrunner lance Xvfb à la place. Si vous avez lancé Weston vous-même, encapsulez l'exécution avec `xvfb-run`, puisque le testrunner utilise un affichage existant plutôt que d'en lancer un.

## Étapes suivantes

- Référence de [configuration](/docs/configuration#displayserverenabled) pour chaque option `displayServer*`.
- [Guide de migration v10](/docs/v10-migration#virtual-displays-on-linux) pour les remplaçants des options `autoXvfb` et `xvfb*` de la v9.
- [Docker](/docs/docker) et [GitHub Actions](/docs/githubactions) pour exécuter votre suite en CI.
- [Applications de bureau](/docs/platforms/desktop#linux) pour Electron, Tauri et Dioxus sous Linux.