---
id: headless-and-display-servers
title: Headless & Display-Server
description: Führe Browser mit sichtbarem Fenster und Desktop-Apps in Linux-CI und in Containern mit dem virtuellen Weston- oder Xvfb-Display aus, das der Testrunner startet, einschließlich Optionen, CI-Rezepten und Fehlerbehebung.
---

Wenn unter Linux kein Display verfügbar ist, startet der Testrunner für den Lauf einen virtuellen Display-Server: [Weston](https://gitlab.freedesktop.org/wayland/weston) im Headless-Modus oder als Fallback [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer). Diese Seite beschreibt, wann das passiert, wie du es konfigurierst und wie es sich in CI und Docker verhält. In den meisten Setups musst du lediglich Weston oder Xvfb in deinem Image installieren oder `displayServerAutoInstall: true` in deiner Konfiguration setzen.

## Wann ein virtuelles Display und wann nativer Headless-Modus

Das virtuelle Display stellt Browsern und Apps einen Bildschirm bereit, wo es keinen gibt, etwa auf CI-Runnern und in Containern. Behalte es bei, wenn:

- Du Desktop-Apps testest, die ein echtes Fenster benötigen.
- Deine Tests einen Browser mit sichtbarem Fenster benötigen, zum Beispiel um Screenshot-Baselines zu entsprechen, die mit einem sichtbaren Browser aufgenommen wurden.
- Chrome nicht mit `DevToolsActivePort file doesn't exist` oder `user data directory is already in use` startet, wie unter [Fehlerbehebung](#troubleshooting) beschrieben.

Für Browsertests, die kein sichtbares Fenster benötigen, hat der native Headless-Modus, wie Chromes `--headless=new`, weniger Overhead. Setze dabei `displayServerEnabled: false`, sonst startet der Testrunner trotzdem einen Display-Server. Gehe genauso vor, wenn alle deine Browser auf einem Cloud-Dienst oder einem Remote-Grid laufen, da lokal nichts ein Display benötigt.

## Funktionsweise

Der Testrunner startet einen Display-Server vor dem `onPrepare`-Hook eines jeden Service und setzt dessen Umgebung in `process.env`:

| Variable | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | nicht gesetzt |
| `DISPLAY` | nicht gesetzt | das erste freie Display, z. B. `:0` |
| `XDG_RUNTIME_DIR` | ein privates Verzeichnis unter `/tmp` für den Lauf | unverändert |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

Worker erben diese Variablen, ebenso Treiber und Apps, die Services in `onPrepare` starten. Browser und GUI-Toolkits wählen anhand dieser Variablen Wayland oder X11. Unter Weston ersetzt das private `XDG_RUNTIME_DIR` für den Lauf jeden Wert, den du gesetzt hattest.

Der Display-Server läuft weiter, bis die `onComplete`-Hooks abgeschlossen sind, sodass Services ihn beim Herunterfahren noch nutzen können. Danach beendet der Testrunner ihn und stellt die vorherigen Werte wieder her. Wenn der Prozess früher endet, auch bei Strg+C, wird der Display-Server mit beendet.

Der Testrunner startet einen Display-Server nur, wenn alle folgenden Bedingungen erfüllt sind:

- Er läuft unter Linux.
- Weder `DISPLAY` noch `WAYLAND_DISPLAY` ist gesetzt.
- `displayServerEnabled` ist nicht `false`.

Wenn bereits ein Display existiert, verwendet der Testrunner dieses und startet nichts. Ist nur `WAYLAND_DISPLAY` gesetzt, zum Beispiel durch ein Weston, das deine CI startet, setzt der Testrunner für den Lauf trotzdem `XDG_SESSION_TYPE`, `GDK_BACKEND` und `ELECTRON_OZONE_PLATFORM_HINT` auf `wayland`. Damit wird sichergestellt, dass Browser das richtige Display verwenden, indem geerbte Werte überschrieben werden, etwa `XDG_SESSION_TYPE=tty` aus einem SSH-Login, die sie zu X11 schicken würden, wo kein Server läuft. Das geschieht sogar mit `displayServerEnabled: false`, da diese Option nur steuert, ob ein Display-Server gestartet wird.

### Welcher Display-Server verwendet wird

Mit dem Standardwert `displayServer: 'auto'` versucht der Testrunner zuerst Weston und dann Xvfb. Installierte Server werden ausprobiert, bevor etwas installiert wird, sodass ein vorhandenes Xvfb verwendet wird, anstatt Weston zu installieren. Wenn Weston nicht startet, greift der Testrunner auf Xvfb zurück. Wenn kein Display-Server startet, protokolliert der Testrunner eine Warnung und der Lauf wird ohne fortgesetzt. Mit `displayServer: 'wayland'` oder `displayServer: 'xvfb'` versucht der Testrunner nur diesen Server.

Weston 10 und neuer werden unterstützt. Ubuntu 22.04 und Debian 11 liefern Weston 9 aus, und Enterprise Linux 9 mit aktiviertem EPEL erhält Weston 8, setze dort also `displayServer: 'xvfb'`. Weston startet ohne Xwayland und stellt daher kein `DISPLAY` bereit. Wenn deine Tests oder Tools X11 benötigen, zum Beispiel `xdotool`, `xclip` oder eine Java-App, setze `displayServer: 'xvfb'`.

### Fensterfokus

Alle Worker verwenden dasselbe Display. In WebdriverIO v9 wurde jeder Worker in `xvfb-run` gekapselt und erhielt ein eigenes Display, sodass sein Browser immer den Fokus hatte. Chromium-basierte Browser wie Chrome und Edge können jetzt ohne Fokus sein: Unter Weston erhält kein Fenster den Fokus, und unter Xvfb hat ihn nur das zuletzt geöffnete Fenster. WebDriver-Eingaben erreichen die Seite weiterhin, aber `document.hasFocus()` gibt `false` zurück, `focus`-Events werden nicht ausgelöst und `:focus`-Styles werden nicht angewendet. Wenn deine Tests vom Fokus abhängen, aktiviere die Fokus-Emulation, einen experimentellen Befehl des Chrome DevTools Protocol (CDP), der über Seitenladevorgänge hinweg bestehen bleibt:

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

Firefox ist nicht betroffen, da er seine Seiten unter WebDriver als fokussiert behandelt.

### Eigenständige Skripte

Der Testrunner startet den Display-Server selbst. Ein eigenständiges Skript, das `remote()` aufruft, kann einen mit `startDisplayDaemonFromConfig` aus `@wdio/display-server` starten. Die Funktion akzeptiert dieselben `displayServer*`-Optionen, setzt die Variablen des Displays in `process.env`, sodass der Browser sie erbt, und stellt sie bei `stop()` wieder her:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// null außerhalb von Linux, wenn bereits ein X11-Display existiert oder wenn keines startet. Bei einem
// vorhandenen Wayland-Display wird ein Handle zurückgegeben, dessen stop() die gesetzten Session-Variablen wiederherstellt.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

Du kannst das Skript auch unter `xvfb-run` ausführen, wie unter [Ein vorhandenes Display verwenden](#using-an-existing-display) beschrieben.

## Browser-Einrichtung

### Browser, die WebdriverIO startet

Diese Browser benötigen keine Konfiguration:

- Chrome und Edge ab 140 sowie Chrome for Testing ab 135 folgen dem `XDG_SESSION_TYPE=wayland`, das der Display-Server setzt.
- Ältere Versionen von Chrome und Edge ignorieren `XDG_SESSION_TYPE`. Für sie fügt WebdriverIO `--ozone-platform=wayland` zu den Args jedes Chrome und Edge hinzu, den es startet, während Wayland ohne X-Server läuft, es sei denn, die Args setzen bereits `--ozone-platform` oder `--headless`.
- Electron-Apps: Electron ab 38 folgt `XDG_SESSION_TYPE`, und Electron 28 bis 37 folgt `ELECTRON_OZONE_PLATFORM_HINT`, das der Display-Server ebenfalls setzt. Electron 27 und älter verlassen sich auf das Flag `--ozone-platform=wayland`, das WebdriverIO hinzufügt, wenn es die App über Chromedriver startet.
- Firefox und GTK-Apps, wie Tauri-Apps, wählen Wayland anhand von `WAYLAND_DISPLAY` und `GDK_BACKEND`. Firefox vor Version 120 ist ungetestet.

### Browser, die WebdriverIO nicht startet

Browser auf einem Grid oder Cloud-Dienst benötigen keine Konfiguration, da sie auf dem Display des Remote-Hosts laufen.

Lokale Browser, die von etwas anderem gestartet werden, etwa von einem selbst gestarteten Treiber, einem Appium-Server oder dem eigenen Launcher eines Service, erhalten das Flag `--ozone-platform=wayland` von WebdriverIO nicht. Chrome und Edge ab 140 sowie Electron ab 28 benötigen es nicht, da sie den Session-Variablen folgen, ältere Versionen von Chrome und Edge jedoch schon. Was zu tun ist, hängt davon ab, wann der Browser startet:

- **Während des Laufs**, zum Beispiel aus dem `onPrepare` eines Service, benötigen neuere Browser nichts, da sie das Display und die Session-Variablen erben. Für ältere Versionen von Chrome und Edge entweder:
  - setze `displayServer: 'xvfb'`, um Xvfb zu verwenden, oder
  - setze `displayServer: 'wayland'` und füge `--ozone-platform=wayland` zu ihren Args hinzu, um Weston zu verwenden.
- **Vor WebdriverIO**, zum Beispiel aus einem früheren CI-Schritt oder einer anderen Shell, können sie keinen Display-Server verwenden, den WebdriverIO startet, da sie dessen Variablen nicht erben. Starte das Display selbst, wie unter [Ein vorhandenes Display verwenden](#using-an-existing-display) beschrieben, und entweder:
  - verwende Xvfb, das nichts weiter benötigt, oder
  - verwende Weston, exportiere dann `XDG_SESSION_TYPE=wayland` (Chrome und Edge ab 140, Electron ab 38) oder `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron 28 bis 37) und füge `--ozone-platform=wayland` zu den Args älterer Versionen von Chrome und Edge hinzu.

## Konfiguration

Alle Optionen sind in der [Konfigurationsreferenz](/docs/configuration#displayserverenabled) aufgeführt. Zum Beispiel:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Einen Display-Server installieren, falls keiner installiert ist
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Immer Xvfb in kleinerer Größe verwenden, installiert durch einen benutzerdefinierten Befehl, der einen Root-Container voraussetzt
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

Der benutzerdefinierte Befehl wird von beiden Servern gemeinsam verwendet. Mit `displayServer: 'auto'` wird er zuerst für Weston ausgeführt und erneut für Xvfb nur dann, wenn Weston immer noch nicht verfügbar ist oder nicht startet und Xvfb noch fehlt. Setze `displayServer` auf den Server, den dein Befehl installiert, wie in diesem Beispiel.

Die v9-Optionen `autoXvfb` und `xvfb*` sind veraltet und werden in v11 entfernt. Ihre Ersatzoptionen findest du im [v10-Migrationsleitfaden](/docs/v10-migration#virtual-displays-on-linux).

## CI und Docker

Installiere einen Display-Server vorab in deinem Image oder setze `displayServerAutoInstall: true`, um beim Start des Laufs einen zu installieren.

### Einen Display-Server vorinstallieren

#### Weston

Unter Ubuntu 24.04 oder Debian 12 und neuer:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

Unter RHEL 10 und Oracle Linux 10 aktiviere EPEL und CodeReady Builder selbst gemäß der [EPEL-Dokumentation](https://docs.fedoraproject.org/en-US/epel/getting-started/) und installiere dann `weston`.

Um den Testrunner in ein eigenes Weston zu kapseln, wie unter [Ein vorhandenes Display verwenden](#using-an-existing-display) beschrieben, installiere zusätzlich `xwayland-run`. Es ist für Debian 13, Ubuntu 24.04, Fedora und openSUSE Tumbleweed paketiert. Ohne es musst du Weston im Hintergrund mit eigenem `XDG_RUNTIME_DIR` und `WAYLAND_DISPLAY` starten und auf seinen Socket warten, bevor du WebdriverIO startest. Alternativ kannst du Xvfb verwenden.

#### Xvfb

Unter Ubuntu oder Debian:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04 und Debian 11 liefern ein zu altes Weston aus, verwende dort also Xvfb. Ist nur Xvfb installiert, verwendet der Testrunner es ohne weitere Konfiguration.

Für andere Distributionen verwende die Paketnamen unter [Unterstützung für automatische Installation](#automatic-installation-support).

### Ein vorhandenes Display verwenden

Wenn deine CI bereits ein Display bereitstellt, verwendet der Testrunner dieses und startet nichts.

Um Weston zu verwenden, kapsle den Testrunner mit `wlheadless-run` aus dem Paket `xwayland-run`. Es gibt Weston ein privates Runtime-Verzeichnis und wartet auf dessen Socket, und die Flags entsprechen dem Weston, das der Testrunner startet:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Um Xvfb zu verwenden, kapsle den Testrunner mit `xvfb-run`:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## Unterstützung für automatische Installation

`displayServerAutoInstall` funktioniert mit den unten aufgeführten Paketmanagern. Installationen sind nicht interaktiv und brechen nach 240 Sekunden ab. Bei jedem anderen Paketmanager installiere den Display-Server selbst.

| Paketmanager | Distributionen | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- Unter Arch Linux führt die Installation `pacman -Syu` aus, ein vollständiges System-Upgrade, da Arch keine Teil-Upgrades unterstützt. Bei einem veralteten Image kann dies das 240-Sekunden-Limit überschreiten, installiere den Display-Server dort also vorab.
- Enterprise Linux 10 hat kein Xvfb und liefert Weston nur in EPEL aus, das CRB benötigt. Unter CentOS Stream, AlmaLinux und Rocky Linux aktiviert die Installation beide und lässt sie aktiviert. Unter RHEL und Oracle Linux richte sie selbst ein, wie unter [Einen Display-Server vorinstallieren](#preinstalling-a-display-server) beschrieben.

## Logs

Der Display-Server läuft im Launcher-Prozess, daher stehen seine Meldungen im Launcher-Log: `wdio.log` in deinem `outputDir` oder im Terminal, wenn `outputDir` nicht gesetzt ist. Das Log zeigt, welcher Display-Server gestartet wurde und welche Variablen er gesetzt hat. Für mehr Details erhöhe sein Log-Level:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## Fehlerbehebung

### Chrome schlägt fehl mit `DevToolsActivePort file doesn't exist`

Die vollständige Meldung lautet `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. Eine häufige Ursache ist ein Chrome mit sichtbarem Fenster ohne Display, auf dem es sein Fenster öffnen kann. Prüfe im [Launcher-Log](#logs), welcher Display-Server gestartet wurde. Wenn keiner gestartet wurde, siehe [Das Launcher-Log zeigt `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). Wenn deine Tests kein sichtbares Fenster benötigen, verwende stattdessen den nativen Headless-Modus, wie unter [Wann ein virtuelles Display und wann nativer Headless-Modus](#when-to-use-a-virtual-display-vs-native-headless) beschrieben.

### Chrome schlägt fehl mit `user data directory is already in use`

Die vollständige Meldung beginnt mit `session not created: probably user data directory is already in use`. Sie ist oft irreführend: Meist bedeutet sie, dass der Browser abgestürzt ist und mit dem Profilverzeichnis der vorherigen Instanz neu gestartet wurde. Ein stabiles Display behebt das Problem häufig. Falls nicht, übergib pro Worker ein eindeutiges `--user-data-dir`.

### Das Launcher-Log zeigt `No display server could be started`

Die vollständige Meldung lautet `No display server could be started; continuing without a virtual display`. Es ist kein Display-Server installiert oder keiner wurde gestartet. Die vorangehenden Meldungen nennen den Grund:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` oder `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: Es ist nichts installiert und die automatische Installation ist deaktiviert.
- `wayland failed to start: ...` oder `xvfb failed to start: ...`: Es folgt die Fehlerausgabe des Servers.
- `Failed to install Weston` oder `Failed to install Xvfb`: Die Installation ist fehlgeschlagen.
- `wayland still not found after installing` oder `xvfb still not found after installing`: Die Installation war erfolgreich, hat aber diesen Server nicht bereitgestellt, zum Beispiel weil ein benutzerdefinierter `displayServerAutoInstallCommand` nur den anderen installiert. Setze `displayServer` auf den Server, den dein Befehl installiert.

Installiere Weston oder Xvfb in deinem Image oder setze `displayServerAutoInstall: true`.

### Xvfb beendet sich mit `Failed to find a socket to listen on`

Xvfb erstellt seinen Socket in `/tmp/.X11-unix`. Wenn dieses Verzeichnis existiert, muss es für den Testbenutzer beschreibbar sein, wie es bei Modus `1777` der Fall ist.

### Chrome oder Electron schlägt unter Weston fehl mit `Missing X server or $DISPLAY`

Der Browser hat X11 statt Wayland versucht. Wenn WebdriverIO ihn nicht gestartet hat, siehe [Browser, die WebdriverIO nicht startet](#browsers-webdriverio-doesnt-launch). Andernfalls entferne `--ozone-platform=x11` aus seinen Args.

### Fokusabhängige Tests schlagen in Chrome oder Edge fehl

`document.hasFocus()` gibt `false` zurück, weil Seiten auf dem gemeinsam genutzten Display ohne Fokus sein können. Aktiviere die Fokus-Emulation, wie unter [Fensterfokus](#window-focus) beschrieben.

### Ein X11-Tool oder eine X11-App schlägt unter Weston fehl mit `cannot open display` oder `Can't open display`

Weston stellt kein `DISPLAY` bereit. Setze `displayServer: 'xvfb'`, damit der Testrunner stattdessen Xvfb startet. Wenn du Weston selbst gestartet hast, kapsle den Lauf mit `xvfb-run`, da der Testrunner ein vorhandenes Display verwendet, anstatt eines zu starten.

## Nächste Schritte

- [Konfigurationsreferenz](/docs/configuration#displayserverenabled) für jede `displayServer*`-Option.
- [v10-Migrationsleitfaden](/docs/v10-migration#virtual-displays-on-linux) für die Ersatzoptionen der v9-Optionen `autoXvfb` und `xvfb*`.
- [Docker](/docs/docker) und [GitHub Actions](/docs/githubactions), um deine Suite in CI auszuführen.
- [Desktop-Apps](/docs/platforms/desktop#linux) für Electron, Tauri und Dioxus unter Linux.