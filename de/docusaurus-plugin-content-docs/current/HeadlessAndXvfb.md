---
id: headless-and-xvfb
title: Headless & Xvfb mit dem Testrunner
description: Wie WebdriverIO Xvfb für Headless-Tests unter Linux verwendet, Konfigurationsoptionen, CI-Rezepte und Fehlerbehebung.
---

Diese Seite erklärt, wie der WebdriverIO-Testrunner die Ausführung im Headless-Modus unter Linux mithilfe von Xvfb (X Virtual Framebuffer) unterstützt. Es wird erläutert, wann Xvfb nützlich ist, wie man es konfiguriert und wie es sich in CI und Docker verhält.

## Wann Xvfb vs. nativen Headless-Modus verwenden

- Verwenden Sie den nativen Headless-Modus (z.B. Chrome `--headless=...`), wenn möglich, für minimalen Overhead.
- Verwenden Sie Xvfb, wenn:
  - Sie Electron oder Apps testen, die einen Fenstermanager oder eine Desktop-Umgebung benötigen
  - Sie auf GLX oder fenstermanager-abhängige Verhaltensweisen angewiesen sind
  - Ihre Tools einen Display-Server (`DISPLAY`) erwarten
  - Sie auf Chromium-Fehler stoßen wie:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    Der Fehler bei der Kollision des Benutzerdatenverzeichnisses kann irreführend sein, da er oft das Ergebnis eines Browser-Absturzes und sofortigen Neustarts ist, der dasselbe Profilverzeichnis der vorherigen Instanz wiederverwendet. Die Sicherstellung eines stabilen Displays (z.B. über Xvfb) löst das Problem oft - wenn nicht, sollten Sie pro Worker ein eindeutiges `--user-data-dir` übergeben.

## Konfiguration

Vier Runner-Optionen steuern das Xvfb-Verhalten:

- `autoXvfb` (boolean, Standard: true)
  - Maßgeblicher Schalter für die Verwendung. Wenn `false`, verwendet der Runner niemals Xvfb.
  - Wenn `true`, kann der Runner Xvfb bei Bedarf verwenden.

- `xvfbAutoInstall` (boolean, Standard: false)
  - Aktiviert die automatische Installation von `xvfb-run`, falls es fehlt
  - Wenn false, wird der Runner warnen und ohne Installation fortfahren

- `xvfbAutoInstallMode` ('root' | 'sudo', Standard: 'sudo')
  - 'root': nur installieren, wenn als Root ausgeführt (kein sudo)
  - 'sudo': erlaubt nicht-interaktives sudo (`sudo -n`), wenn nicht Root; überspringen, wenn sudo fehlt

- `xvfbAutoInstallCommand` (string | string[], optional)
  - Benutzerdefinierter Befehl für die Installation anstelle der eingebauten Paketmanager-Erkennung
  - Wenn angegeben, wird dieser Befehl unverändert ausgeführt und überschreibt die eingebaute Installationslogik

- `xvfbMaxRetries` (number, Standard: 3)
  - Anzahl der Wiederholungsversuche bei Xvfb-Prozessfehlern.
  - Nützlich für instabile CI-Umgebungen, in denen der Xvfb-Start gelegentlich fehlschlagen kann.

- `xvfbRetryDelay` (number, Standard: 1000)
  - Basisverzögerung zwischen Wiederholungen in Millisekunden bei Xvfb-Prozessfehlern.
  - Verwendet progressive Verzögerung: Verzögerung × Versuchsnummer (z.B. 1000ms, 2000ms, 3000ms usw.).

Beispiele:

```ts
export const config: WebdriverIO.Config = {
  // Xvfb bei Bedarf verwenden
  autoXvfb: true,

  // Xvfb-Pakete automatisch mit sudo installieren
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
  // Xvfb bei Bedarf verwenden
  autoXvfb: true,

  // Xvfb-Pakete mit einem benutzerdefinierten Befehl und sudo automatisch installieren
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
  // Xvfb bei Bedarf verwenden
  autoXvfb: true,

  // Xvfb-Pakete automatisch mit sudo installieren
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Wiederholungsverhalten für instabile CI-Umgebungen konfigurieren
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Erkennungslogik

- Der Runner berücksichtigt Xvfb, wenn:

  - Er unter Linux läuft
  - Kein `DISPLAY` gesetzt ist (Headless-Umgebung) oder Headless-Browser-Flags übergeben werden

- Wenn `DISPLAY` gesetzt ist, wird der Runner standardmäßig nicht Xvfb erzwingen und Ihren bestehenden X-Server/Window-Manager respektieren.

Hinweise:
- `autoXvfb: false` deaktiviert die Xvfb-Nutzung vollständig (kein Wrapping mit `xvfb-run`).
- `xvfbAutoInstall` beeinflusst nur die Installation, wenn `xvfb-run` fehlt; es schaltet die Nutzung nicht ein/aus.
- `xvfbAutoInstallMode` steuert die Installationsmethode: 'root' für Root-only Installationen, 'sudo' für sudo-basierte Installationen (Standard: 'sudo').
- Eingebaute Paketinstallationen sind immer nicht-interaktiv. Nur Root, es sei denn, Sie entscheiden sich für den 'sudo'-Modus.
- Der Wiederholungsmechanismus verwendet progressive Verzögerungen: `xvfbRetryDelay × Versuchsnummer` (z.B. 1000ms, 2000ms, 3000ms usw.).

## Verwendung eines vorhandenen DISPLAY in CI

Wenn Ihre CI ihren eigenen X-Server/Window-Manager einrichtet (z.B. mit `Xvfb :99` und einem WM), können Sie entweder:

- `autoXvfb: true` belassen und sicherstellen, dass `DISPLAY` exportiert wird; der Runner wird es respektieren und kein Wrapping vornehmen.
- Oder `autoXvfb: false` setzen, um explizit jedes Xvfb-Verhalten des Runners zu deaktivieren.

## CI- und Docker-Rezepte

GitHub Actions (mit nativem Headless-Modus):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (virtuelles Display über Xvfb, falls fehlend und aktiviert):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (Ubuntu/Debian-Beispiel – Xvfb vorinstallieren):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Für andere Distributionen passen Sie den Paketmanager und den Paketnamen entsprechend an (z.B. `dnf install xorg-x11-server-Xvfb` auf Fedora/RHEL-basierten Systemen, `zypper install xvfb-run` auf openSUSE/SLE).

## Automatische Installationsunterstützung (xvfbAutoInstall)

Wenn `xvfbAutoInstall` aktiviert ist, versucht WebdriverIO, `xvfb` mit Ihrem System-Paketmanager zu installieren. Die folgenden Manager und Pakete werden unterstützt:

| Paketmanager   | Befehl          | Distributionen (Beispiele)                                 | Paketname(n)                    |
|----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt            | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, usw.      | `xvfb`                           |
| dnf            | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, usw.       | `xorg-x11-server-Xvfb`           |
| yum            | `yum`           | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper         | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman         | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, usw.             | `xorg-server-xvfb`               |
| apk            | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install   | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

Hinweise:
- Wenn Ihre Umgebung einen anderen Paketmanager verwendet, wird die Installation mit einem Fehler fehlschlagen; installieren Sie `xvfb` manuell.
- Paketnamen sind distro-spezifisch; die Tabelle spiegelt die üblichen Namen pro Familie wider.

## Fehlerbehebung

- "xvfb-run failed to start"
  - Der Runner wiederholt Xvfb-bezogene Fehler automatisch mit progressivem Backoff. Wenn Fehler weiterhin auftreten, erhöhen Sie `xvfbMaxRetries` und `xvfbRetryDelay` für instabile Umgebungen.

- Xvfb wird unerwartet in CI gewrappt
  - Wenn Sie ein benutzerdefiniertes `DISPLAY` / WM-Setup haben, setzen Sie `autoXvfb: false` oder stellen Sie sicher, dass `DISPLAY` exportiert wird, bevor der Runner startet.

- Fehlendes `xvfb-run`
  - Behalten Sie `xvfbAutoInstall: false` bei, um Änderungen an der Umgebung zu vermeiden; installieren Sie über Ihr Basis-Image oder setzen Sie `xvfbAutoInstall: true`, um die Option zu aktivieren.

- Häufige Xvfb-Startfehler in CI
  - Erhöhen Sie `xvfbMaxRetries` (z.B. auf 5-10) und `xvfbRetryDelay` (z.B. auf 2000ms) für ein robusteres Verhalten in instabilen Umgebungen.

## Fortgeschritten

- Der Runner erstellt Prozesse über eine Factory, die den Node-Worker mit `xvfb-run` umhüllt, wenn Xvfb benötigt wird und verfügbar ist.
- Headless-Browser-Flags (Chrome/Edge/Firefox) signalisieren die Headless-Nutzung und können Xvfb in Umgebungen ohne `DISPLAY` auslösen.