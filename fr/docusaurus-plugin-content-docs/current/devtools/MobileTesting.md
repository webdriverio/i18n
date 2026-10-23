---
id: mobile
title: Tests mobiles
description: "Capturez les sessions Appium (navigateur mobile, applications natives et hybrides) en mode live et en mode trace de DevTools, et exécutez les exemples mobiles propres à chaque adaptateur."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

DevTools capture les sessions Appium aussi bien en mode live qu'en [Trace Mode](/docs/devtools/wdio/trace-mode). Ce qui est capturé dépend d'une seule question — **cette session dispose-t-elle d'un document web à cet instant ?** — car chaque extraction du DOM, chaque script de page et chaque lecture du viewport est un aller-retour qui ne peut qu'échouer en l'absence de document.

## Trois types de session

| Session | Dispose d'un document | Ce qui est capturé |
|---|---|---|
| **Navigateur mobile** (Chrome sur Android, Safari sur iOS) | toujours | voyage dans le temps du DOM, console et replay comme sur desktop ; réseau à partir de l'enregistrement propre à la page, puisque Appium ne fournit pas BiDi (voir [Network Logs](/docs/devtools/wdio/network-logs#without-webdriver-bidi)) |
| **Application native** | jamais | commandes, captures d'écran et données des éléments issues de l'arbre XML de la plateforme ; pas de DOM |
| **Application hybride** | uniquement dans un contexte webview | les parties natives comme une application, les parties webview comme une page |

Le critère discriminant est le **nom du navigateur dans les capabilities**, et non l'appareil : un navigateur mobile en indique un, une application native n'en indique aucun. Un appareil n'est d'ailleurs pas requis — une session Mac2, WinAppDriver ou tvOS n'a pas de document et est traitée de la même manière.

## Applications hybrides et contexte actif

Une application hybride est le cas que les capabilities seules ne peuvent pas trancher, car la réponse change au cours de l'exécution. Appium signale soit `NATIVE_APP`, soit un contexte webview, et **tout ce qui n'est pas `NATIVE_APP` est considéré comme une webview** — le préfixe `WEBVIEW_` n'est qu'une convention, et un driver nommant sa webview différemment verrait sinon la capture de son DOM ignorée.

Suivre le contexte ne coûte aucun aller-retour supplémentaire : la commande de changement de contexte porte sa destination dans ses propres arguments, et un changement ayant échoué est ignoré.

## Prise en charge par les adaptateurs

Les quatre adaptateurs détectent une session native et y ignorent la capture côté page. Ils diffèrent sur les applications hybrides :

| Fonctionnalité | WebdriverIO | Selenium | Nightwatch | Python |
|---|---|---|---|---|
| Session native détectée, capture côté page ignorée | ✅ | ✅ | ✅ | ✅ |
| Suit une application hybride dans sa webview | ✅ | ⚠️ ¹ | ⚠️ ¹ | ⚠️ ¹ |
| Réseau des applications natives via appium-interceptor (`appium:intercept`) | ✅ | ✅ | ✅ | ✅ |

¹ Répond uniquement à partir des capabilities de démarrage, de sorte que la partie webview d'une session hybride est capturée comme si elle était toujours native — pas de DOM pour ces actions.

L'**appareil lui-même** ne nécessite aucune prise en charge de la part de l'adaptateur : il est déduit des capabilities de la session par l'exportateur de trace partagé lors de l'écriture dans l'archive, et par le dashboard pour une session live dont l'adaptateur n'en a envoyé aucun. Chaque adaptateur bénéficie donc du cadre d'appareil.

## Dans le dashboard

Une capture de téléphone est encadrée comme l'appareil : une colonne d'appareil sur toute la hauteur, avec la liste des actions et le dock à côté, **aussi bien** en mode live que dans le [trace player](/docs/devtools/trace-player). Le `context-options` de la trace enregistre la plateforme, le modèle et la version de l'OS, relus à l'ouverture afin que le player étiquette les cadres sans avoir à deviner.

Sur une session native, l'onglet A11y et les données des éléments proviennent de l'arbre XML de la plateforme plutôt que du DOM, de sorte que les locators se lisent sous la forme `android=new UiSelector()…` ou `-ios predicate string:…` plutôt qu'en CSS ou XPath sur du HTML.

## Réseau des applications natives

Une application native n'a pas de document et Appium ne fournit pas d'événements réseau BiDi, donc par défaut l'onglet Network d'une session native est vide. Chaque adaptateur peut à la place lire le trafic de l'application depuis le plugin [appium-interceptor](https://github.com/AppiumTestDistribution/appium-interceptor-plugin), qui fait passer l'appareil par son propre proxy. Installez le plugin et démarrez Appium avec :

```sh
appium plugin install --source=npm appium-interceptor
appium --use-plugins=appium-interceptor
```

Demandez ensuite le proxy avec `appium:intercept: true` dans les capabilities de la session (il est également lu à l'intérieur de `appium:options`) :

<Tabs groupId="devtools-mobile-network">
<TabItem value="wdio" label="WebdriverIO" default>

```ts
capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': '/path/to/app.apk',
    'appium:intercept': true
}]
```

</TabItem>
<TabItem value="selenium" label="Selenium (Node.js)">

```js
const driver = await new Builder()
  .usingServer('http://127.0.0.1:4723')
  .withCapabilities({
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': '/path/to/app.apk',
    'appium:intercept': true
  })
  .build()
```

</TabItem>
<TabItem value="nightwatch" label="Nightwatch">

```js
desiredCapabilities: {
  browserName: null,
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:app': '/path/to/app.apk',
  'appium:intercept': true
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from appium.options.android import UiAutomator2Options

options = UiAutomator2Options()
options.app = "/path/to/app.apk"
options.set_capability("appium:intercept", True)
```

</TabItem>
</Tabs>

L'adaptateur démarre un listener pour chaque session, y compris pour une session qui la remplace en cours d'exécution, en mode live comme en mode trace. Il lit ce que le proxy a enregistré au plus toutes les 2 secondes entre les commandes, car chaque lecture renvoie l'historique complet, et systématiquement à la fin de chaque test (avant l'écriture de la tranche de trace de ce test) ainsi qu'à la fin de la session. Chaque requête affiche sa méthode, son URL, son statut, ses en-têtes et ses corps. Le plugin n'enregistre aucune information de timing : une requête est donc placée au moment où elle a été lue pour la première fois et n'affiche aucune durée, et les requêtes effectuées par l'application avant le démarrage du listener (son trafic de lancement) ne sont pas listées. Sans le plugin, l'adaptateur journalise un avertissement et la session s'exécute normalement.

Cela s'applique uniquement aux sessions natives ; une session de navigateur mobile capture déjà son réseau via la page. Le plugin prend en charge Android. Pour le trafic HTTPS, l'application doit faire confiance au certificat que le plugin installe sur l'appareil, ce qu'une build de release ne fait généralement pas (voir la configuration de sécurité réseau d'Android).

## Ce qu'une trace mobile ne contient pas

Les snapshots par action sont émis depuis le hook de commande, et Appium sérialise une sonde derrière la commande qu'elle observe. Lorsqu'une session dispose d'un document à sonder, ce snapshot est donc ignoré.

En pratique : **les actions webview d'une application hybride ne contiennent ni données d'éléments par action, ni arbre d'accessibilité, ni capture d'écran de stabilisation.** Les sessions natives, les navigateurs mobiles et toutes les sessions desktop ne sont pas concernés. Les lignes de commande et leurs captures d'écran, la console et l'archive elle-même sont toujours capturées. Le réseau d'un navigateur mobile provient du buffer Resource Timing de la page et de son patch de `fetch` / `XMLHttpRequest` plutôt que de BiDi, et une session native n'a aucune capture réseau à moins d'activer le plugin appium-interceptor (voir [Réseau des applications natives](#native-app-network)), car le driver n'en expose aucune.

Ces absences sont voulues. Il ne s'agit pas d'un échec de capture, et c'est la principale chose à savoir avant de déboguer une trace hybride.

## Exécuter un exemple

Le dépôt contient un exemple mobile par adaptateur, et les quatre pilotent le même
flux, de sorte qu'une différence entre deux dashboards est une différence dans l'adaptateur
et non dans le test.

Les exemples se trouvent dans le [dépôt devtools](https://github.com/webdriverio/devtools),
et non dans les packages des adaptateurs : installer un adaptateur dans votre propre projet
ne vous donne donc pas ces scripts. Clonez et compilez ce dépôt une fois :

```sh
git clone https://github.com/webdriverio/devtools.git
cd devtools
pnpm install
pnpm build
```

L'exemple Python utilise le `python3` présent dans votre `PATH` : installez-y donc d'abord l'adaptateur et
le client Appium (un environnement virtuel les tient à l'écart de votre
Python système) :

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -e packages/selenium-devtools-py
pip install -r examples/selenium-py/requirements-mobile.txt
```

Ensuite, avec Appium et un appareil prêts (voir [Prérequis](#prerequisites)), exécutez
n'importe lequel d'entre eux depuis la racine de ce checkout :

```sh
pnpm demo:wdio:mobile
pnpm demo:selenium:mobile
pnpm demo:nightwatch:mobile
pnpm demo:python:mobile
```

Ils pilotent l'**application Horloge**, fournie avec chaque image système Android — il n'y a
donc aucun `.apk` à fournir, rien à téléverser et aucun identifiant. Le flux
reste sur l'écran de configuration du minuteur : ouvrir l'onglet Minuteurs, effacer la saisie jusqu'à
zéro, saisir une durée sur le pavé numérique, la relire, puis la corriger avec la touche d'effacement.

Ils ne **démarrent** délibérément jamais de minuteur. Un minuteur en cours survit à la session
et remplace l'écran de configuration par sa carte, de sorte qu'une spec qui en démarre un n'est
réexécutable que si elle le termine aussi — une exécution interrompue casserait toutes les exécutions
suivantes. Ne pas en démarrer élimine cette catégorie d'échecs, et le pavé numérique
exerce tout de même ce pour quoi un exemple existe : une vraie saisie, un vrai changement d'état, capturés.

Ils évitent aussi les puces de préréglage de l'Horloge, qui ressemblent à des contrôles fixes mais n'en
sont pas : ce sont des suggestions de durées récemment utilisées, si bien qu'une Horloge fraîchement réinitialisée
ne propose que le pavé numérique et qu'un flux basé sur les préréglages échoue sur tout appareil sans
historique de minuteurs — y compris en CI. Deux dispositions de l'Horloge existent pour une même version de l'application, et
le pavé numérique est commun aux deux.

`DEVTOOLS_MODE=trace` fait passer n'importe lequel d'entre eux en mode trace, `DEVTOOLS_MOBILE=web`
pilote le navigateur de l'appareil au lieu d'une application — Chrome sur Android, Safari sur
iOS — et `APPIUM_APP` en pointe un vers une vraie application. [`examples/MOBILE.md`](https://github.com/webdriverio/devtools/blob/main/examples/MOBILE.md)
dans le dépôt est le guide d'installation complet.

## iOS

```sh
DEVTOOLS_MOBILE_PLATFORM=ios pnpm demo:wdio:mobile
```

**Les quatre adaptateurs.** Chacun contient un répertoire de specs `android/` et un `ios/`,
et le runner choisit entre les deux, donc la commande ci-dessus fonctionne aussi avec
`demo:selenium:mobile`, `demo:nightwatch:mobile` et `demo:python:mobile`.
La capture elle-même n'a jamais été spécifique à une plateforme — ce dont chaque adaptateur avait besoin, c'était d'une
spec, pas d'un travail sur l'adaptateur.

iOS pilote **Réglages**, et non Horloge, car Horloge n'est pas du tout installée sur le
simulateur : `xcrun simctl listapps` liste Réglages, Calendrier, Rappels,
Plans et Safari, mais pas Horloge. Réglages est présente sur chaque simulateur et chaque appareil,
ce qui est précisément la propriété qui fait d'Horloge le choix pour Android. Le flux
navigue dans Général puis revient, en vérifiant le titre de la barre de navigation dans chaque sens —
la même structure que le flux Android, avec l'application que la plateforme fournit réellement.

Android et iOS sont des **specs distinctes**, et non une seule spec avec une branche, car elles
ne partagent aucun sélecteur : les locators iOS sont des accessibility ids et des labels plutôt que
des resource-ids.

`DEVTOOLS_MOBILE=web` fonctionne ici aussi, et demande moins que sur Android : il
ouvre **Safari**, que le driver XCUITest pilote lui-même — aucun Chromedriver à
faire correspondre et rien à ajouter à la commande `appium`.

**Le simulateur piloté est résolu en udid, jamais en simple nom.** Nommer
un simulateur qui n'existe pas n'échoue pas — le driver XCUITest le *crée* et
le démarre, à chaque exécution, à côté du simulateur déjà en cours, laissant un nouveau
simulateur derrière lui à chaque fois. Les exemples utilisent donc par défaut le simulateur
déjà démarré, et un `IOS_DEVICE_NAME` ne correspondant à aucun d'entre eux est refusé avec
la liste des simulateurs démarrés plutôt que transmis tel quel.

Il s'agit d'une politique **locale**. `xcrun simctl` énumère les simulateurs locaux et rien
d'autre, donc `IOS_UDID` désigne directement un appareil et n'est vérifié par rapport à rien — un
appareil réel n'a aucune entrée à faire correspondre — et face à un Appium distant ou cloud
(`APPIUM_HOST` défini à autre chose que localhost), un nom d'appareil est transmis directement,
puisque c'est en le nommant qu'un tel service le sélectionne.

En plus des prérequis Android, dont iOS n'utilise aucun, vous avez besoin de Xcode (les
Command Line Tools ne fournissent aucun simulateur), d'un runtime de simulateur
(`xcodebuild -downloadPlatform iOS`, un téléchargement séparé d'environ 8 Go), d'un
simulateur démarré, et de `appium driver install xcuitest` — dont la première exécution compile également
WebDriverAgent. Appium charge les drivers au **démarrage**, donc un serveur qui
était déjà en cours d'exécution lorsque vous avez installé le driver signalera qu'il ne trouve pas
XCUITest tant que vous ne l'aurez pas redémarré.

## Prérequis

L'exécution sur un émulateur Android local nécessite, en plus de [Getting Started](/docs/devtools/getting-started) :

1. **Java JDK** et l'**Android SDK** — avec `ANDROID_HOME` pointant vers le SDK dans lequel le `sdkmanager` de votre `PATH` installe réellement, ce qui n'est pas toujours `~/Library/Android/sdk`.
2. **Un AVD et un émulateur en cours d'exécution**, ou un appareil physique avec le débogage USB activé.
3. **Appium avec le driver UiAutomator2** (`appium driver install uiautomator2`), ou le driver XCUITest pour iOS — voir [iOS](#ios) ci-dessus.
4. **Un Chromedriver correspondant**, pour un navigateur mobile ou une application hybride. Une webview est pilotée par Chromedriver, et le téléchargement automatique d'Appium n'a souvent aucune build correspondant au Chrome de l'image système — dans un sens comme dans l'autre. Cela se manifeste par `No Chromedriver found that can automate Chrome '<version>'` lors de l'entrée dans une webview, ce qui ressemble à un échec de capture mais constitue en réalité une lacune de l'environnement. Démarrez Appium avec `--default-capabilities '{"appium:chromedriverExecutableDir": "<path>"}'` ainsi que `--allow-insecure=uiautomator2:chromedriver_autodownload`. **Une exécution d'application native n'a besoin de rien de tout cela.**
5. **Le protocole WebDriver classique** pour WebdriverIO — le shim BiDi d'Appium pour UiAutomator2 n'implémente pas toutes les commandes BiDi, donc définissez `'wdio:enforceWebDriverClassic': true` dans le bloc de capabilities.