---
id: targets
title: Session-Ziele
description: Öffnen Sie mit wdio session einen Browser, eine mobile App, eine Desktop-App, eine Electron-App oder ein Cloud-Gerät.
---

`wdio session open` startet die Session. Das erste Argument ist das Ziel. Verwenden Sie die `default`-Session wieder. Übergeben Sie `-s <name>` nur, wenn Sie zwei Sessions gleichzeitig benötigen. Führen Sie zuerst `npx wdio session doctor <target>` aus, wenn das Ziel Appium, einen Desktop-Treiber oder Cloud-Zugangsdaten benötigt.

Die Player für Chrome, Android und Electron steuern dieselbe [WebdriverIO-Demo-App](https://github.com/webdriverio/native-demo-app) (das Expo-Versuchskaninchen, Tag `v2.2.0`). Chrome und Electron verwenden einen lokalen Expo-Webserver in einem normalen Desktop-Fenster. Android installiert die [v2.2.0-Release-APK](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). iOS installiert die v2.2.0-Simulator-App (`org.wdiodemoapp`) und verwendet `touchId`. Jeder Player tippt den Befehl ein, danach zeigt das Fenster das Ergebnis. Pausieren Sie oder springen Sie zum vorherigen oder nächsten Befehl, um die Zeile zu lesen, die das Fenster verändert hat.

Der gemeinsame Ablauf ist: App öffnen, als `alice@webdriver.io` / `supersecret` anmelden, das Roboter-Logo erreichen („You found me!!!“) und dann das 9-teilige Puzzle lösen. Chrome und Electron setzen außerdem einen Standort und eine Nachtuhrzeit in der Weather-Ansicht, öffnen die In-App-WebView der WebdriverIO-Startseite und ziehen das Karussell. Der Android-Player scrollt den nativen Swipe-Bildschirm bis zu diesem Roboter. `export` schreibt eine Mocha-Spec der Session, die Sie gerade gesteuert haben.

<a id="postcard"></a>

## Browser

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome öffnet sich headless. Fügen Sie `--headed` hinzu, um das Fenster anzuzeigen. Chrome, Firefox und Edge werden bei der ersten Verwendung heruntergeladen, wenn sie nicht installiert sind. Safari erfordert macOS.

### User-Agent im Headless-Modus

Headless Chrome und Edge geben sich im User-Agent als `HeadlessChrome/<version>` zu erkennen. Ein sichtbares Fenster desselben Browsers sendet `Chrome/<version>`. Viele Websites verweigern Anfragen mit dem Headless-Token: Akamai antwortet mit „Access Denied“ und Cloudflare zeigt „Just a moment...“. Sie entscheiden anhand der Anfrage, bevor irgendein Seitenskript ausgeführt wird. Ein Agent würde dann eine Sperrseite sehen, die eine Person, die dieselbe Website öffnet, nie zu Gesicht bekommt.

Eine headless Chrome- oder Edge-Session sendet daher den User-Agent, den ein sichtbares Fenster desselben Browsers senden würde. Dadurch ändert sich nur das Token. Die Automatisierung wird nicht verborgen:

- `navigator.webdriver` bleibt `true`.
- Die eigenen Markierungen von chromedriver sind weiterhin auf der Seite vorhanden.
- Websites, die auf Automatisierung prüfen, erkennen sie weiterhin.

Solange der User-Agent überschrieben ist, sendet Chrome keine User-Agent Client Hints, daher ist `navigator.userAgentData.brands` leer. Das Überschreiben erfordert WebDriver BiDi, daher behält eine mit `--no-bidi` geöffnete Session den Headless-User-Agent.

Um einen bestimmten User-Agent zu senden, übergeben Sie ihn als Browser-Argument. Die Session lässt den User-Agent dann unverändert:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

Wenn eine Website weiterhin eine Bot-Prüfung anzeigt, versuchen Sie ein sichtbares Fenster mit `--headed`. Wenn auch das blockiert wird, lässt die Website keine automatisierten Browser zu. Melden Sie das, anstatt zu versuchen, die Prüfung zu umgehen.

Ein sichtbares Chrome-Fenster behält seine Tableiste und Adressleiste, woran Sie es von einem Electron-Fenster unterscheiden. `--viewport 1280x800` ist eine normale Browserseite. Im Web verwendet die App eine linke Seitenleiste. Das WebdriverIO-Logo befindet sich oben in dieser Seitenleiste. Die Einträge sind Home, Weather, Web, Login, Forms, Swipe, Drag, Perms und Data. Der Startbildschirm listet Browser und Desktop neben iOS und Android auf.

Weather liest `navigator.geolocation` und `Date`. `geolocation 35.6762 139.6503` ist Tokio. Dies wird beim nächsten Laden wirksam, führen Sie daher `reload` vor `click "aria/Weather"` aus. Das Widget zeigt dann Tokio, 21° und Regen. `emulate clock 2026-06-21T23:30:00Z` schaltet dieselbe Karte von einem Taghimmel auf einen Nachthimmel um und stellt die Uhr auf 23:30 Uhr. Ein zweites `emulate clock` ersetzt das erste.

Der WebView-Tab lädt `https://webdriver.io/` innerhalb der App. Login wartet etwa 1,5 Sekunden und öffnet dann einen Dialog mit dem Text `Success` und `You are logged in!`. Der LOGIN-Button bleibt ein 200×50 großes orangefarbenes Steuerelement, solange diese Wartezeit auf dem Bildschirm angezeigt wird. `dialog accept` schließt den Dialog. `swipe` ist nur für Mobilgeräte verfügbar. Ziehen Sie `[data-testid=Carousel]` zweimal auf `aria/Next card`, um im Karussell weiterzublättern. Der aufgezeichnete Web-Build lauscht auf `pointerup` auf `document`, sodass das Ziehen auf dem Karussell beginnen und der Zeiger auf `Next card` losgelassen werden kann, das außerhalb des Karussells liegt. `scroll down --px 560` bringt den WebdriverIO-Roboter ins Bild. Die Beschriftung darunter lautet „You found me!!!“. Die Puzzleteile sind `aria/drag-l2` bis `aria/drag-l3` und werden auf dem passenden `aria/drop-…`-Ziel abgelegt. Die Reihenfolge in der Ablage ist `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3`.

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

Wiederholen Sie `drag` für `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` und `l3`.

<SessionTarget id="browser" />

`--viewport 1280x720` legt die Anfangsgröße fest. `--arg` fügt ein Browser-Argument hinzu und kann wiederholt werden. `--profile <dir>` behält ein Profil zwischen mehreren Öffnungen bei.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android und iOS

Android und iOS laufen über Appium 3. `doctor android` meldet einen fehlenden Server oder Treiber zusammen mit dem Installationsbefehl.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Ein installiertes Android-Paket verwendet `--package` und `--activity`. Mobiles Web verwendet `--browser chrome` oder `--browser safari` anstelle einer App. `--appium-url http://127.0.0.1:4723/` verbindet sich mit einem bereits laufenden Server. Eine Cloud-App-URL wie `bs://…` wird als `--app` durchgereicht und nicht als lokale Datei behandelt.

<a id="native-boarding-pass"></a>

### Native Demo-App

Auf einem Emulator oder einem Gerät ist dasselbe Versuchskaninchen die v2.2.0-APK:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` wartet bis zu acht Minuten. UiAutomator2 installiert einen Server und startet die Instrumentierung, bevor die App nutzbar ist, und das dauert länger als der Start eines Browsers. Die erste Anfrage wird nicht wiederholt: Eine Wiederholung würde eine zweite Appium-Session auf demselben Gerät starten, während die erste noch installiert wird. `tap "~Login"`, `fill` und dann `tap "~button-LOGIN"` meldet sich mit derselben E-Mail-Adresse und demselben Passwort an. Auf einem kurzen Bildschirm liegt der LOGIN-Button unterhalb des sichtbaren Bereichs, scrollen Sie daher den `~Login-screen` vor diesem Tippen. `dialog accept` schließt die Erfolgsmeldung und muss ausgeführt werden, nachdem diese Meldung auf dem Bildschirm erscheint. Der Text der Meldung lautet `Success` / `You are logged in!`.

Der Fingerabdruck-Button ist `~button-biometric`. Er erscheint im Anmeldeformular erst, nachdem ein Fingerabdruck registriert wurde, daher tippt dieser Player ihn nicht an. `exec -e "await browser.fingerPrint(1)"` beantwortet die Systemabfrage (`fingerPrint` ist nur für Android verfügbar; es gibt keinen `wdio session`-Unterbefehl dafür).

`tap "~Webview"` ist die In-App-WebView von `https://webdriver.io/`. Auf einem Software-Emulator mit einer CPU stürzt der WebView-Renderer nach dem LOADING-Label mit `SIGTRAP` in `libmonochrome` ab, und die Seite wird nie gezeichnet. Der Player lässt diesen Tab aus.

`tap "~Swipe"` öffnet das Karussell. `swipe left` blättert es nicht weiter: Das Karussell ist `react-native-reanimated-carousel`, und ein UIAutomator-Swipe federt zur ersten Karte zurück. Ein wiederholtes `exec` von `mobile: swipeGesture` auf der Scroll-View ist das, was den Roboter und die Beschriftung „You found me!!!“ zum Vorschein bringt. Ein bildschirmfüllendes `swipe up` vom unteren Rand öffnet stattdessen die Screenshot-Oberfläche von Android. `drag "~drag-l2" "~drop-l2"` (und die anderen acht Paare in der Reihenfolge der Ablage) löst das Puzzle. Das letzte Bild zeigt den zusammengesetzten Roboter und das Steuerelement zum Wiederholen.

`-s android` hält diese Session neben der Browser-Session. Lassen Sie `-s android` weg, wenn es die einzige Session ist. `open` verwendet das Paket und die Activity, die bereits durch die APK installiert wurden, mit `--no-reset`, damit ein registrierter Fingerabdruck erhalten bleibt. `"~Login"` ist das Accessibility-Label des Tabs. `wait` gilt nicht für eine native Session.

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

Wiederholen Sie `drag` für `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` und `l3`.

<SessionTarget id="android" />

### iOS-Simulator

Dieselben Bildschirme befinden sich im v2.2.0-Simulator-Build, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). Entpacken Sie es und installieren Sie `wdiodemoapp.app` auf einem gestarteten Simulator (`xcrun simctl install booted`). Die Bundle-ID ist `org.wdiodemoapp`. Diese Binärdatei ist eine iPhone-Simulator-App (arm64, iOS 15.1 oder neuer). Sie benötigt macOS und Xcode. Auf dieser Seite gibt es keinen iOS-Player.

Login, Swipe und Drag verwenden dieselben Accessibility-Labels wie Android. `swipe left` wurde auf dem Simulator nicht ausgeführt. Auf der Android-APK blättert es dieses Karussell nicht weiter. Der biometrische Aufruf ist `browser.touchId(true)`, nicht `fingerPrint`. `touchId` erfordert die Capability `appium:allowTouchIdEnroll` mit dem Wert `true` (übergeben Sie sie mit `--capabilities`). Registrieren Sie Touch ID auf dem Simulator, bevor Sie das Anmeldeformular öffnen, sonst bleibt der biometrische Button verborgen.

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

Wiederholen Sie `drag` für die anderen acht Teile in derselben Ablage-Reihenfolge wie bei Android.

## Desktop-Apps

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` erfordert macOS. `windows` erfordert Windows. `--app Root` verbindet sich mit dem Desktop. Eine installierte Windows-App wird über ihre Anwendungs-ID benannt, zum Beispiel `--app Microsoft.WindowsCalculator`. Ein Pfad oder eine `.exe` wird als Datei aufgelöst.

<a id="launch-console"></a>

## Electron, Tauri und Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` und `open dioxus ./my-app` benötigen ihren Treiber im `PATH`, sofern das Service-Paket die Session nicht selbst startet. Installieren Sie unter Linux ohne `DISPLAY` oder `WAYLAND_DISPLAY` Xvfb oder weston. Electron bleibt beim klassischen WebDriver-Protokoll. Übergeben Sie `--app-arg`, um ein Flag an die App weiterzuleiten, einschließlich `--app-arg=--no-sandbox`, wenn die Umgebung dies erfordert. Ein Wert, der mit `-` beginnt, muss `=` verwenden, da der strikte Parser ihn sonst als eigene Option behandelt.

Installieren Sie `electron` und `@wdio/electron-service` in dem Verzeichnis, das Sie öffnen. `main.js` verwendet `import`, daher benötigt die `package.json` dieses Verzeichnisses `"type": "module"` (oder benennen Sie die Datei `main.mjs`). Passen Sie die Fenstergröße an den Arbeitsbereich an, damit ein kleinerer Bildschirm die Titelleiste nicht außerhalb des sichtbaren Bereichs platziert:

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

Der folgende open-Befehl deaktiviert die Renderer-Sandbox nicht. Fügen Sie `--app-arg=--no-sandbox` nur hinzu, wenn die Umgebung Electron nicht mit der Sandbox starten kann, wie etwa in manchen Linux-Containern. Der Electron-Player lädt dieselbe Expo-URL in einem 1280×800 großen Fenster ohne Adressleiste. Logo, Seitenleiste, Wetterkarte, Anmeldekarte, Karussell und Puzzle entsprechen denen im Browser. `-s electron` ist der Session-Name, der neben der Browser-Demo verwendet wird. Electron bleibt beim klassischen Protokoll, daher laufen `geolocation` und `emulate clock` über Chromedriver statt über BiDi. Die Befehle entsprechen denen von Chrome, einschließlich `reload` vor Weather, mit Ausnahme des Erfolgsdialogs. Unter Linux akzeptiert `dialog accept` die native Meldung, aber die Sprechblase bleibt gezeichnet. Diese Sprechblase ist nicht Teil der Seite, daher kann ein späterer Klick sie nicht erreichen. Die Aufzeichnung ersetzt `window.alert` durch einen seiteninternen Dialog und führt `click "aria/OK"` aus. Der LOGIN-Button bleibt ein 200×50 großes orangefarbenes Steuerelement, während er wartet. Karussell, Scrollen und Puzzle verwenden dieselben Befehle wie Chrome.

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

Wiederholen Sie `drag` für `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` und `l3`.

<SessionTarget id="electron" />

## Cloud-Geräte

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` ist `browserstack`, `saucelabs`, `testingbot` oder `testmu`. Exportieren Sie den Benutzernamen und den Zugriffsschlüssel des Anbieters. `doctor <provider>` prüft, ob sie gesetzt sind, und gibt die Werte nicht aus. `--tunnel` startet den Tunnel des Anbieters, wenn sich die zu testende App auf Ihrem Rechner befindet.

## Eine WebdriverIO-Konfiguration

`open` kann anstelle eines Zielnamens eine Konfigurationsdatei und einen Capability-Index entgegennehmen:

```sh
npx wdio session open ./wdio.conf.ts 0
```

Eine TypeScript-Konfiguration wird mit `tsx` geladen, wenn Ihr Projekt es enthält. `tsx` ist optional: Ohne es wird die Konfiguration über das Type Stripping von Node oder über jiti geladen, und eine Konfiguration, die nicht geladen werden kann, meldet `MISSING_DEPENDENCY` mit einer Installationszeile.

`--hostname`, `--port`, `--path` und `--protocol` richten die Session auf einen bereits laufenden WebDriver-Endpunkt aus. Das Schließen der Session stoppt diesen Endpunkt nicht.

## Fehlerbehebung

| Meldung | Was zu tun ist |
| --- | --- |
| `MISSING_DEPENDENCY` | Installieren Sie das in der Fehlermeldung genannte Paket. `doctor <target>` gibt dieselbe Installationszeile aus. Electron benötigt `@wdio/electron-service` und `electron` in dem Verzeichnis, das Sie öffnen. |
| `MISSING_APPIUM_DRIVER` | Führen Sie die Zeile `npx appium driver install …` aus der Fehlermeldung aus. |
| `MISSING_BINARY` | Legen Sie den genannten Treiber (`tauri-driver` oder `wdio-dioxus-driver`) in den `PATH`. |
| `MISSING_CREDENTIALS` | Exportieren Sie die in der Fehlermeldung genannten Variablen. |
| `NOT_SUPPORTED` | `macos` ist nur unter macOS und `windows` nur unter Windows verfügbar. `swipe` ist nur für Mobilgeräte verfügbar. Ziehen Sie unter Chrome und Electron `[data-testid=Carousel]` auf `aria/Next card`. |
| `No dialog open.` | Die Meldung ist nicht geöffnet. Warten Sie unter Android, bis die Erfolgsmeldung sichtbar ist, bevor Sie `dialog accept` ausführen. Unter Linux-Electron kann die native Sprechblase nach `acceptAlert` gezeichnet bleiben und trotzdem keinen Dialog melden. Der Player verwendet stattdessen einen seiteninternen Dialog und `click "aria/OK"`. |
| `The instrumentation process cannot be initialized` | UiAutomator2 hat nicht rechtzeitig begonnen zu lauschen. Die Session erlaubt 240 s für diesen Start, nach bis zu 180 s für die Installation des Servers. Auf einem Software-Emulator bringt eine CPU mit einem 720×1280-Skin die v2.2.0-APK bis zum Startbildschirm. Ein 1080×2400-Image mit zwei CPUs führt zu einem ANR von `system_server`, und der Server lauscht nie. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | Der Client hat aufgegeben, während Appium die Session noch erstellte. Android und iOS warten 480 s auf diese erste Anfrage und senden sie nicht erneut. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` ist für Browser-Sessions gedacht. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` ist der Android-Aufruf. iOS verwendet `browser.touchId`. |
| `App not found:` | Übergeben Sie einen existierenden APK-Pfad oder verwenden Sie `--package` und `--activity` für eine bereits installierte App. |
| `Pass --package <id>.` | `deeplink` benötigt unter Android `--package`. |

## Nächste Schritte

- [Snapshots und Refs](/docs/session/snapshots) — den Bildschirm nach `open` auslesen
- [Befehle](/docs/session-commands) — alle `open`-Flags
- [wdio session](/docs/session) — die Standardschleife