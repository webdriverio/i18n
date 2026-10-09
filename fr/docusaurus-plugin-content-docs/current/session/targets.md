---
id: targets
title: Cibles de session
description: Ouvrez un navigateur, une application mobile, une application de bureau, une application Electron ou un appareil cloud avec wdio session.
---

`wdio session open` démarre la session. Le premier argument est la cible. Réutilisez la session `default`. Passez `-s <name>` uniquement lorsque vous avez besoin de deux sessions en même temps. Exécutez d'abord `npx wdio session doctor <target>` lorsque la cible nécessite Appium, un pilote de bureau ou des identifiants cloud.

Les lecteurs Chrome, Android et Electron pilotent la même [application de démonstration WebdriverIO](https://github.com/webdriverio/native-demo-app) (l'application cobaye Expo, tag `v2.2.0`). Chrome et Electron utilisent un serveur web Expo local dans une fenêtre de bureau normale. Android installe l'[apk de la version v2.2.0](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). iOS installe l'application pour simulateur v2.2.0 (`org.wdiodemoapp`) et utilise `touchId`. Chaque lecteur saisit la commande, puis la fenêtre affiche le résultat. Mettez en pause, ou passez à la commande précédente ou suivante, pour lire la ligne qui a modifié la fenêtre.

Le parcours commun est le suivant : ouvrir l'application, se connecter en tant que `alice@webdriver.io` / `supersecret`, atteindre le logo du robot (« You found me!!! »), puis terminer le puzzle de 9 pièces. Chrome et Electron définissent également une position et une horloge de nuit dans la vue Weather, ouvrent la WebView intégrée à l'application affichant la page d'accueil de WebdriverIO, et font glisser le carrousel. Le lecteur Android fait défiler l'écran de balayage natif jusqu'à ce robot. `export` écrit une spécification Mocha de la session que vous venez de piloter.

<a id="postcard"></a>

## Navigateurs

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome s'ouvre en mode headless. Ajoutez `--headed` pour afficher la fenêtre. Chrome, Firefox et Edge sont téléchargés lors de la première utilisation s'ils ne sont pas installés. Safari nécessite macOS.

### User agent en mode headless

Chrome et Edge en mode headless s'identifient comme `HeadlessChrome/<version>` dans le user agent. Une fenêtre visible du même navigateur envoie `Chrome/<version>`. De nombreux sites refusent les requêtes contenant le jeton headless : Akamai répond « Access Denied » et Cloudflare affiche « Just a moment... ». Ils décident à partir de la requête, avant l'exécution de tout script de la page. Un agent verrait alors une page de blocage qu'une personne ouvrant le même site n'obtient jamais.

Une session Chrome ou Edge headless envoie donc le user agent qu'enverrait une fenêtre visible du même navigateur. Cela ne modifie que le jeton. Cela ne masque pas l'automatisation :

- `navigator.webdriver` reste `true`.
- Les marqueurs propres à chromedriver sont toujours présents sur la page.
- Les sites qui détectent l'automatisation la voient toujours.

Tant que le user agent est remplacé, Chrome n'envoie aucun client hint de user agent, donc `navigator.userAgentData.brands` est vide. Le remplacement nécessite WebDriver BiDi, donc une session ouverte avec `--no-bidi` conserve le user agent headless.

Pour envoyer un user agent spécifique, passez-le comme argument du navigateur. La session ne touche alors pas au user agent :

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

Si un site affiche toujours une vérification anti-bot, essayez une fenêtre visible avec `--headed`. Si celle-ci est également bloquée, le site n'accepte pas les navigateurs automatisés. Signalez-le au lieu d'essayer de contourner la vérification.

Une fenêtre Chrome en mode headed conserve sa barre d'onglets et sa barre d'adresse, ce qui permet de la distinguer d'une fenêtre Electron. `--viewport 1280x800` correspond à une page de navigateur normale. Sur le web, l'application utilise une barre latérale gauche. Le logo WebdriverIO se trouve en haut de cette barre latérale. Les éléments sont Home, Weather, Web, Login, Forms, Swipe, Drag, Perms et Data. L'écran d'accueil liste le navigateur et le bureau à côté d'iOS et d'Android.

Weather lit `navigator.geolocation` et `Date`. `geolocation 35.6762 139.6503` correspond à Tokyo. Cela s'applique au chargement suivant, donc exécutez `reload` avant `click "aria/Weather"`. Le widget affiche alors Tokyo, 21° et de la pluie. `emulate clock 2026-06-21T23:30:00Z` fait passer la même carte d'un ciel de jour à un ciel de nuit et règle l'horloge sur 11:30 PM. Un second `emulate clock` remplace le premier.

L'onglet WebView charge `https://webdriver.io/` dans l'application. La connexion attend environ 1,5 seconde, puis ouvre une boîte de dialogue dont le texte est `Success` et `You are logged in!`. Le bouton LOGIN reste un contrôle orange de 200×50 pendant que cette attente est affichée à l'écran. `dialog accept` ferme la boîte de dialogue. `swipe` est réservé au mobile. Faites glisser `[data-testid=Carousel]` sur `aria/Next card` deux fois pour faire défiler le carrousel. La version web enregistrée écoute `pointerup` sur `document`, de sorte que le glissement peut commencer sur le carrousel et le pointeur peut être relâché sur `Next card`, qui se trouve en dehors du carrousel. `scroll down --px 560` fait apparaître le robot WebdriverIO. La légende en dessous est « You found me!!! ». Les pièces du puzzle vont de `aria/drag-l2` à `aria/drag-l3`, déposées sur la cible `aria/drop-…` correspondante. L'ordre dans le plateau est `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3`.

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

Répétez `drag` pour `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` et `l3`.

<SessionTarget id="browser" />

`--viewport 1280x720` définit la taille initiale. `--arg` ajoute un argument au navigateur et peut être répété. `--profile <dir>` conserve un profil entre les ouvertures.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android et iOS

Android et iOS fonctionnent via Appium 3. `doctor android` signale un serveur ou un pilote manquant avec la commande d'installation.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS : `open ios --bundle-id com.example.shop`. Un package Android installé utilise `--package` et `--activity`. Le web mobile utilise `--browser chrome` ou `--browser safari` au lieu d'une application. `--appium-url http://127.0.0.1:4723/` se connecte à un serveur déjà en cours d'exécution. Une URL d'application cloud telle que `bs://…` est transmise telle quelle via `--app` et n'est pas traitée comme un fichier local.

<a id="native-boarding-pass"></a>

### Application de démonstration native

Sur un émulateur ou un appareil, la même application cobaye est l'apk v2.2.0 :

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` attend jusqu'à huit minutes. UiAutomator2 installe un serveur et démarre l'instrumentation avant que l'application ne soit utilisable, ce qui est plus lent que le lancement d'un navigateur. La première requête n'est pas relancée : une nouvelle tentative démarrerait une seconde session Appium sur le même appareil pendant que la première est encore en cours d'installation. `tap "~Login"`, `fill`, puis `tap "~button-LOGIN"` effectue la connexion avec les mêmes e-mail et mot de passe. Sur un écran court, le bouton LOGIN se trouve sous la ligne de flottaison, faites donc défiler `~Login-screen` avant ce tap. `dialog accept` ferme l'alerte de succès, et doit être exécuté une fois cette alerte affichée à l'écran. Le texte de l'alerte est `Success` / `You are logged in!`.

Le bouton d'empreinte digitale est `~button-biometric`. Il n'apparaît sur le formulaire de connexion qu'après l'enregistrement d'une empreinte, ce lecteur ne le touche donc pas. `exec -e "await browser.fingerPrint(1)"` répond à l'invite système (`fingerPrint` est réservé à Android ; il n'existe pas de sous-commande `wdio session` pour cela).

`tap "~Webview"` est la WebView intégrée à l'application affichant `https://webdriver.io/`. Sur un émulateur logiciel à un seul CPU, le moteur de rendu de la WebView plante avec `SIGTRAP` dans `libmonochrome` après le libellé LOADING, et la page ne s'affiche jamais. Le lecteur laisse cet onglet de côté.

`tap "~Swipe"` ouvre le carrousel. `swipe left` ne le fait pas défiler : le carrousel est `react-native-reanimated-carousel`, et un balayage UIAutomator revient à la première carte. C'est un `exec` de `mobile: swipeGesture` sur la vue défilante, répété, qui fait apparaître le robot et la légende « You found me!!! ». Un `swipe up` plein écran depuis le bord inférieur ouvre à la place l'interface de capture d'écran d'Android. `drag "~drag-l2" "~drop-l2"` (et les huit autres paires, dans l'ordre du plateau) termine le puzzle. La dernière image montre le robot assemblé et le contrôle pour recommencer.

`-s android` conserve cette session à côté de celle du navigateur. Supprimez `-s android` lorsqu'il s'agit de la seule session. `open` utilise le package et l'activité déjà installés par l'apk, avec `--no-reset` afin qu'une empreinte enregistrée soit conservée. `"~Login"` est le libellé d'accessibilité de l'onglet. `wait` ne s'applique pas à une session native.

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

Répétez `drag` pour `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` et `l3`.

<SessionTarget id="android" />

### Simulateur iOS

Les mêmes écrans se trouvent dans la version pour simulateur v2.2.0, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). Décompressez-la et installez `wdiodemoapp.app` sur un simulateur démarré (`xcrun simctl install booted`). Le bundle id est `org.wdiodemoapp`. Ce binaire est une application pour iPhone Simulator (arm64, iOS 15.1 ou plus récent). Il nécessite macOS et Xcode. Il n'y a pas de lecteur iOS sur cette page.

La connexion, le balayage et le glissement utilisent les mêmes libellés d'accessibilité qu'Android. `swipe left` n'a pas été exécuté sur le simulateur. Sur l'apk Android, il ne fait pas défiler ce carrousel. L'appel biométrique est `browser.touchId(true)`, et non `fingerPrint`. `touchId` nécessite la capability `appium:allowTouchIdEnroll` définie sur `true` (passez-la avec `--capabilities`). Enregistrez Touch ID sur le simulateur avant d'ouvrir le formulaire de connexion, sinon le bouton biométrique reste masqué.

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

Répétez `drag` pour les huit autres pièces, dans le même ordre de plateau qu'Android.

## Applications de bureau

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` nécessite macOS. `windows` nécessite Windows. `--app Root` se connecte au bureau. Une application Windows installée est désignée par son identifiant d'application, par exemple `--app Microsoft.WindowsCalculator`. Un chemin ou un `.exe` est résolu comme un fichier.

<a id="launch-console"></a>

## Electron, Tauri et Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` et `open dioxus ./my-app` nécessitent que leur pilote soit dans le `PATH`, sauf si le package de service démarre lui-même la session. Sous Linux sans `DISPLAY` ni `WAYLAND_DISPLAY`, installez Xvfb ou weston. Electron reste sur le protocole WebDriver classique. Passez `--app-arg` pour transmettre un flag à l'application, y compris `--app-arg=--no-sandbox` lorsque l'environnement l'exige. Une valeur commençant par `-` doit utiliser `=`, car sinon le parser strict la traite comme une option à part entière.

Installez `electron` et `@wdio/electron-service` dans le répertoire que vous ouvrez. `main.js` utilise `import`, le `package.json` de ce répertoire doit donc contenir `"type": "module"` (ou nommez le fichier `main.mjs`). Dimensionnez la fenêtre selon la zone de travail afin qu'un écran plus petit ne place pas la barre de titre hors de l'écran :

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

La commande open ci-dessous ne désactive pas le sandbox du moteur de rendu. Ajoutez `--app-arg=--no-sandbox` uniquement lorsque l'environnement ne peut pas démarrer Electron avec le sandbox, comme certains conteneurs Linux. Le lecteur Electron charge la même URL Expo dans une fenêtre de 1280×800 sans barre d'adresse. Le logo, la barre latérale, la carte météo, la carte de connexion, le carrousel et le puzzle sont identiques à ceux du navigateur. `-s electron` est le nom de session utilisé à côté de la démo du navigateur. Electron reste sur le protocole classique, donc `geolocation` et `emulate clock` passent par Chromedriver au lieu de BiDi. Les commandes sont identiques à celles de Chrome, y compris `reload` avant Weather, à l'exception de la boîte de dialogue de succès. Sous Linux, `dialog accept` accepte l'alerte native et la bulle reste affichée. Cette bulle ne fait pas partie de la page, donc un clic ultérieur ne peut pas l'atteindre. L'enregistrement remplace `window.alert` par une boîte de dialogue intégrée à la page et exécute `click "aria/OK"`. Le bouton LOGIN reste un contrôle orange de 200×50 pendant l'attente. Le carrousel, le défilement et le puzzle utilisent les mêmes commandes que Chrome.

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

Répétez `drag` pour `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` et `l3`.

<SessionTarget id="electron" />

## Appareils cloud

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` vaut `browserstack`, `saucelabs`, `testingbot` ou `testmu`. Exportez le nom d'utilisateur et la clé d'accès du fournisseur. `doctor <provider>` vérifie qu'ils sont définis et n'affiche pas leurs valeurs. `--tunnel` démarre le tunnel du fournisseur lorsque l'application testée se trouve sur votre machine.

## Une configuration WebdriverIO

`open` peut prendre un fichier de configuration et un index de capability au lieu d'un nom de cible :

```sh
npx wdio session open ./wdio.conf.ts 0
```

Une configuration TypeScript est chargée avec `tsx` lorsque votre projet en dispose. `tsx` est facultatif : sans lui, la configuration est chargée via le type stripping de Node ou jiti, et une configuration qui ne parvient pas à se charger signale `MISSING_DEPENDENCY` avec une ligne d'installation.

`--hostname`, `--port`, `--path` et `--protocol` dirigent la session vers un endpoint WebDriver déjà en cours d'exécution. La fermeture de la session n'arrête pas cet endpoint.

## Dépannage

| Message | Que faire |
| --- | --- |
| `MISSING_DEPENDENCY` | Installez le package nommé dans l'erreur. `doctor <target>` affiche la même ligne d'installation. Electron nécessite `@wdio/electron-service` et `electron` dans le répertoire que vous ouvrez. |
| `MISSING_APPIUM_DRIVER` | Exécutez la ligne `npx appium driver install …` indiquée dans l'erreur. |
| `MISSING_BINARY` | Placez le pilote nommé (`tauri-driver` ou `wdio-dioxus-driver`) dans le `PATH`. |
| `MISSING_CREDENTIALS` | Exportez les variables nommées dans l'erreur. |
| `NOT_SUPPORTED` | `macos` est réservé à macOS et `windows` est réservé à Windows. `swipe` est réservé au mobile. Sur Chrome et Electron, faites glisser `[data-testid=Carousel]` sur `aria/Next card`. |
| `No dialog open.` | L'alerte n'est pas ouverte. Sur Android, attendez que l'alerte de succès soit visible avant `dialog accept`. Sur Electron sous Linux, la bulle native peut rester affichée après `acceptAlert` tout en signalant qu'aucune boîte de dialogue n'est ouverte. Le lecteur utilise à la place une boîte de dialogue intégrée à la page et `click "aria/OK"`. |
| `The instrumentation process cannot be initialized` | UiAutomator2 n'a pas commencé à écouter à temps. La session accorde 240 s pour ce lancement, après un maximum de 180 s pour installer le serveur. Sur un émulateur logiciel, un CPU et un skin de 720×1280 permettent à l'apk v2.2.0 d'atteindre l'écran d'accueil. Une image de 1080×2400 avec deux CPU provoque un ANR de `system_server` et le serveur n'écoute jamais. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | Le client a abandonné alors qu'Appium était encore en train de créer la session. Android et iOS attendent 480 s pour cette première requête et ne la renvoient pas. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` est destiné aux sessions de navigateur. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` est l'appel Android. iOS utilise `browser.touchId`. |
| `App not found:` | Passez un chemin d'apk existant, ou utilisez `--package` et `--activity` pour une application déjà installée. |
| `Pass --package <id>.` | `deeplink` nécessite `--package` sur Android. |

## Étapes suivantes

- [Snapshots et refs](/docs/session/snapshots) — lire l'écran après `open`
- [Commandes](/docs/session-commands) — tous les flags de `open`
- [wdio session](/docs/session) — la boucle par défaut