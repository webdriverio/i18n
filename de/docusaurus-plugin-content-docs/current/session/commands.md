---
id: session-commands
title: wdio-Session-Befehle
description: Jede wdio-Session-Aktion und jedes Flag, von open bis doctor und skill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

Alle `wdio session`-Aktionen. Globale Flags gelten für alle Aktionen. Derselbe Text wird von `npx wdio session <action> --help` ausgegeben. Der übrige Abschnitt [WebdriverIO Session](/docs/session) behandelt [Targets](/docs/session/targets), [Snapshots](/docs/session/snapshots), [`exec`](/docs/session/exec), [Export](/docs/session/export) und [Debugging](/docs/session/debug).

```sh
npx wdio session <action> [arguments] [flags]
```

## Globale Flags

| Flag | Beschreibung |
| --- | --- |
| `-s, --session` | Session-Name (env WDIO_SESSION, Standard "default") |
| `--json` | Ein JSON-Objekt ausgeben (env WDIO_SESSION_JSON=1) |
| `--timeout` | Request-Timeout in ms (begrenzt auf 60000, außer bei wait) |
| `-q, --quiet` | Bei Erfolg nichts außer den angeforderten Daten ausgeben |
| `--color` | Mit --no-color Farben deaktivieren |

Exit-Codes: 0 Erfolg, 1 die Aktion oder Ihr Code ist fehlgeschlagen, 2 Verwendungsfehler, 3 fehlende Abhängigkeit oder Zugangsdaten, 4 keine Session mit diesem Namen.

## `open`

Eine Session starten: browser, android, ios, macos, windows, electron, tauri, dioxus oder eine wdio-Konfigurationsdatei.

Startet einen Hintergrund-Daemon, der die Session bis zu `close` am Leben hält oder bis sie für die Dauer von --idle-timeout (Standard 30m) inaktiv war. Browser laufen headless, sofern Sie nicht --headed übergeben. Gibt den Session-Namen, das Target, das Artefaktverzeichnis, in dem Snapshots, Screenshots und Exporte landen, und – für einen mit einer URL geöffneten Browser – den interaktiven Snapshot dieser Seite aus.

Eine Session pro Name. Das Öffnen eines bereits laufenden Namens schlägt fehl; verwenden Sie die Session, schließen Sie sie oder übergeben Sie --replace. Übergeben Sie `-s <name>` nur, wenn Sie zwei Sessions gleichzeitig benötigen.

```sh
npx wdio session open <target> [url]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | nein | Zu öffnende URL (Browser), App-Pfad (Desktop-Apps) oder Capability (Konfiguration) |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--replace` | Zuerst eine laufende Session mit demselben Namen schließen |
| `--launch-timeout <n>` | Millisekunden, die gewartet wird, bis die Session bereit ist |
| `--idle-timeout <value>` | Nach dieser Zeit ohne Requests herunterfahren (z. B. 30m, 0 deaktiviert) |
| `--capabilities <value>` | Zusätzliche Capabilities als JSON oder Pfad zu einer JSON-Datei |
| `--hostname <value>` | Remote-WebDriver-Host |
| `--port <n>` | Remote-WebDriver-Port |
| `--path <value>` | Remote-WebDriver-Pfad |
| `--protocol <value>` | Remote-WebDriver-Protokoll |
| `--log-level <value>` | WebdriverIO-Log-Level, das in daemon.log geschrieben wird |
| `--bidi` | WebDriver BiDi anfordern (mit --no-bidi deaktivieren) |
| `--headed` | Das Browserfenster anzeigen |
| `--headless` | Ohne Fenster ausführen (Standard für Browser; überschreibt --headed) |
| `--snapshot` | Den interaktiven Snapshot der geöffneten Seite ausgeben (mit --no-snapshot überspringen) |
| `--viewport <value>` | Anfänglicher Viewport, z. B. 1280x720 |
| `--browser-version <value>` | Browserversion |
| `--binary <value>` | Browser-Binary |
| `--arg <value>` | Zusätzliches Browser-Argument. Ein Wert, der mit `-` beginnt, benötigt `=`, z. B. `--arg=--disable-gpu` (wiederholbar) |
| `--profile <value>` | Persistentes Profilverzeichnis |
| `--attach <value>` | An ein laufendes Chrome/Edge anhängen (Debugging-Port oder URL) |
| `--app <value>` | App-Datei oder Cloud-App-URL |
| `--package <value>` | Android-App-Package |
| `--activity <value>` | Android-App-Activity |
| `--bundle-id <value>` | iOS/macOS-Bundle-ID |
| `--browser <value>` | Mobiler Webbrowser (chrome, safari) |
| `--device <value>` | Gerätename |
| `--platform-version <value>` | Plattformversion |
| `--udid <value>` | Geräte-UDID |
| `--reset` | Mit --no-reset den App-Zustand beibehalten (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | Anfängliche Ausrichtung |
| `--appium-url <value>` | Einen laufenden Appium-Server verwenden |
| `--app-arg <value>` | An eine Desktop-App übergebenes Argument. Ein Wert, der mit `-` beginnt, benötigt `=`, z. B. `--app-arg=--no-sandbox` (wiederholbar) |
| `--chromedriver <value>` | Electron: Chromedriver-Binary |
| `--electron-version <value>` | Electron: Versionserkennung überschreiben |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | Cloud-Anbieter |
| `--os <value>` | Cloud: Desktop-Betriebssystem |
| `--os-version <value>` | Cloud: Version des Desktop-Betriebssystems |
| `--region <value>` | Cloud: Sauce-Labs-Region |
| `--tunnel <value>` | Cloud: den Tunnel des Anbieters starten (oder "external") |
| `--tunnel-name <value>` | Cloud: Tunnel-Kennung |
| `--project <value>` | Cloud: Projektbezeichnung |
| `--build <value>` | Cloud: Build-Bezeichnung |
| `--name <value>` | Cloud: Bezeichnung des Session-Namens |

**Beispiele**

```sh
# Headless Chrome für eine lokale App öffnen
npx wdio session open chrome http://localhost:3000

# Firefox mit sichtbarem Fenster öffnen
npx wdio session open firefox http://localhost:3000 --headed

# Eine Android-App über Appium öffnen
npx wdio session open android --app ./app.apk

# Eine installierte iOS-App öffnen
npx wdio session open ios --bundle-id com.example.shop

# Eine Electron-App öffnen
npx wdio session open electron ./main.js

# Die erste Capability einer Konfiguration öffnen
npx wdio session open ./wdio.conf.ts 0

# Chrome in einem Cloud-Grid öffnen
npx wdio session open chrome https://example.com --provider browserstack
```

Siehe auch: [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor).

## `close`

Die Session beenden und ihren Daemon stoppen.

Bei einer Session, die von `wdio run --debug=agent` geöffnet wurde, lässt dies den pausierten Test fehlschlagen; verwenden Sie `resume`, um ihn fortfahren zu lassen.

```sh
npx wdio session close
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--all` | Alle Sessions schließen |
| `--clean` | Auch das Artefaktverzeichnis löschen |

**Beispiele**

```sh
# Die Standard-Session schließen
npx wdio session close

# Alle Sessions schließen und ihre Artefakte löschen
npx wdio session close --all --clean
```

Siehe auch: [`open`](#open), [`list`](#list).

## `list`

Laufende Sessions auflisten.

Gibt eine Zeile pro Session aus: Name, Target, URL und Alter. Entfernt Zustand, den abgestürzte Sessions hinterlassen haben.

```sh
npx wdio session list
```

**Beispiele**

```sh
# Alle laufenden Sessions anzeigen
npx wdio session list
```

Siehe auch: [`info`](#info), [`status`](#status).

## `info`

Session-Details anzeigen.

Gibt das Target, Browser und Version, BiDi-Unterstützung, das Artefaktverzeichnis sowie die aktuelle URL, den Titel, die Fenstergröße und den Frame (Web) bzw. Kontext und Activity (Mobile) aus.

```sh
npx wdio session info
```

**Beispiele**

```sh
# Anzeigen, wo die Session steht und was sie ausführt
npx wdio session info
```

Siehe auch: [`list`](#list), [`get`](#get).

## `restart`

Mit demselben Target und denselben Flags schließen und neu öffnen.

Behält den aufgezeichneten Verlauf bei, sodass `export` weiterhin die Schritte von vor dem Neustart abdeckt.

```sh
npx wdio session restart
```

**Beispiele**

```sh
# Mit einem frischen Browser neu beginnen
npx wdio session restart
```

Siehe auch: [`open`](#open), [`close`](#close).

## `status`

Exit 0, wenn die Session läuft, 4, wenn nicht.

```sh
npx wdio session status
```

**Beispiele**

```sh
# Nur dann eine Session öffnen, wenn keine läuft
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

Siehe auch: [`list`](#list), [`open`](#open).

## `exec`

WebdriverIO-Code aus stdin, -e oder einer Datei ausführen.

Läuft als asynchrone Funktion mit `browser`, `$`, `$$`, `expect` und `ref('e3')` im Scope. Top-Level-Variablen bleiben zwischen Aufrufen erhalten. `wdio session` ohne Aktion führt `exec` aus, wenn Code über stdin hineingepipt wird.

Verwenden Sie bei Befehlen immer `await`. `$` gibt genau ein Element zurück und wirft einen StrictSelectorError, wenn mehr als eines passt. Bevorzugen Sie eine einzelne Aktion (click, fill, …), wenn diese die Aufgabe erledigt; verwenden Sie `exec` für Schleifen, Bedingungen und Assertions.

```sh
npx wdio session exec [file]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `file` | nein | Skriptdatei (.js, .ts, .mjs) |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `-e, --eval <value>` | Auszuführender Code |
| `--history` | Den Code im Verlauf aufzeichnen (mit --no-history überspringen) |

**Beispiele**

```sh
# Einen Einzeiler ausführen
npx wdio session exec -e "await browser.getTitle()"

# Eine Assertion auf der Seite (einfache Anführungszeichen halten die Shell von $ fern)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# Mehrere Schritte über stdin pipen
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# Eine Skriptdatei ausführen
npx wdio session exec ./scripts/login.ts
```

Siehe auch: [`helpers`](#helpers), [`history`](#history), [`export`](#export).

## `helpers`

Projekt-Helper aus .wdio/helpers auflisten.

Jede Datei unter .wdio/helpers exportiert standardmäßig eine Funktion, die den Browser erhält und mit addCommand eigene Befehle registriert. Helper werden beim Öffnen der Session geladen und werden im exportierten Test zu Custom Commands.

```sh
npx wdio session helpers
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--reload` | Die Helper neu importieren |

**Beispiele**

```sh
# Helper und die von ihnen hinzugefügten Befehle auflisten
npx wdio session helpers

# Änderungen an einem Helper übernehmen
npx wdio session helpers --reload
```

Siehe auch: [`exec`](#exec), [`export`](#export).

## `snapshot`

Accessibility-Snapshot mit Refs. Gilt für Web, Native Mobile, Native Desktop.

Gibt den Accessibility-Baum aus, ein Knoten pro Zeile, z. B. `button "Add to cart" [ref=e3]`. Übergeben Sie einen Ref an click, fill, get und die anderen Aktionen. Refs bleiben gültig, solange das Element existiert; eine Aktion auf einem entfernten Element schlägt mit REF_STALE fehl.

Jeder Snapshot wird in das Artefaktverzeichnis geschrieben. Ausgaben, die länger als --max-chars sind, werden in Teilen ausgegeben: zuerst der erste Teil, dann `--offset <line>` für den nächsten. `find` durchsucht alles.

Das Textlayout und die Struktur von --json sind experimentell und können sich in einem Minor-Release ändern. Die Ref-Syntax und die Aktionen, die einen Ref annehmen, bleiben stabil.

```sh
npx wdio session snapshot
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--depth <n>` | Maximale Tiefe |
| `--scope <value>` | Nur unterhalb dieses Refs oder Selektors snapshotten |
| `-i, --interactive` | Nur interaktive Elemente |
| `--all` | Versteckte Elemente einschließen |
| `--boxes` | Bounding Boxes anhängen |
| `--viewport` | Nur das, was sich im Viewport befindet (Web: aktualisiert die Diff-Baseline nicht) |
| `--selectors` | Jede Ref-Zeile mit ihrem besten Selektor beenden |
| `--compact` | Unbenannte Knoten ohne Inhalt weglassen |
| `-u, --urls` | Link-hrefs einschließen |
| `--file-only` | Nur die Datei schreiben |
| `--max-chars <n>` | Bis zu so vielen Zeichen auf einmal ausgeben (Standard 8000) |
| `--offset <n>` | Ab dieser Zeile ausgeben, für den nächsten Teil eines langen Snapshots |

**Beispiele**

```sh
# Nur interaktive Elemente, der übliche erste Blick
npx wdio session snapshot -i

# Ganze Seite mit Link-Zielen
npx wdio session snapshot --compact --urls

# Nur ein Teil der Seite
npx wdio session snapshot --scope "#checkout" --depth 4

# Was gerade auf dem Bildschirm ist
npx wdio session snapshot --viewport -i

# Jeder Ref mit einem Selektor für einen Test
npx wdio session snapshot --selectors -i

# Handeln, dann erneut hinsehen
npx wdio session click e3 && npx wdio session snapshot -i
```

Siehe auch: [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot).

## `read`

Den Seitentext als Markdown lesen. Gilt für Web.

Überschriften, Absätze, Listeneinträge, Tabellenzeilen und Links mit ihrer URL, aus dem Hauptinhalt, wenn die Seite ihn auszeichnet (main, article), andernfalls aus der ganzen Seite; Navigation, Footer und versteckter Text werden weggelassen. Abgeschnitten bei --max-chars (Standard 6000); die Kürzung gibt an, mit welchem --offset der nächste Teil gelesen wird. Mit --scope wird der Abschnitt in den sichtbaren Bereich gescrollt. Verwenden Sie es, um zu beantworten „Was steht auf der Seite?“; verwenden Sie snapshot oder find für Refs, mit denen Sie interagieren möchten.

```sh
npx wdio session read
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--scope <value>` | Nur unterhalb dieses Refs oder Selektors lesen |
| `--max-chars <n>` | Bis zu so vielen Zeichen ausgeben (Standard 6000) |
| `--offset <n>` | Bei diesem Zeichen des Textes beginnen, für den nächsten Teil einer langen Seite |

**Beispiele**

```sh
# Den Hauptinhalt lesen
npx wdio session read

# Einen Abschnitt lesen
npx wdio session read --scope e12
```

Siehe auch: [`find`](#find), [`snapshot`](#snapshot), [`get`](#get).

## `find`

Einen frischen Snapshot nach Text durchsuchen. Gilt für Web, Native Mobile, Native Desktop.

Erstellt einen neuen Snapshot und gibt jeden Treffer mit dem umgebenden Knoten aus (z. B. dem ganzen Listeneintrag, sodass ein Wert neben dem Treffer enthalten ist), mit Zeilennummern und Refs, und scrollt den ersten Treffer in den sichtbaren Bereich. Beim Abgleich wird zuerst die Groß-/Kleinschreibung ignoriert, dann Leerzeichen ("SO2" findet "SO 2"), dann wird nach allen Wörtern und nach ähnlichen Wörtern gesucht. Text, der sich nur in versteckten Teilen der Seite befindet (geschlossene Menüs, Tabs, „Mehr anzeigen“), wird als solcher aufgeführt. Günstiger, als einen ganzen Snapshot einer großen Seite zu lesen. -A/-B/-C geben stattdessen einfachen Zeilenkontext aus, wie grep.

```sh
npx wdio session find <text>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `text` | ja | Zu suchender Text |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--regex` | Text als regulären Ausdruck behandeln |
| `--scope <value>` | Nur unterhalb dieses Refs oder Selektors suchen |
| `-C, --context <n>` | Kontextzeilen davor und danach statt des umgebenden Knotens |
| `-A, --after-context <n>` | Kontextzeilen nach jedem Treffer |
| `-B, --before-context <n>` | Kontextzeilen vor jedem Treffer |
| `--offset <n>` | So viele Treffer überspringen, für die nächsten, wenn die Ausgabe abgeschnitten ist |

**Beispiele**

```sh
# Den Ref eines Buttons finden
npx wdio session find "Add to cart"

# Alle Links auflisten
npx wdio session find "^\s*link" --regex --context 0
```

Siehe auch: [`snapshot`](#snapshot), [`wait`](#wait).

## `diff`

Einen frischen Snapshot mit dem vorherigen vergleichen. Gilt für Web, Native Mobile, Native Desktop.

Gibt einen Unified Diff dessen aus, was sich seit dem letzten Snapshot geändert hat, oder "No changes". Der erste Aufruf speichert eine Baseline. Verwenden Sie es nach einer Aktion, um zu sehen, was die Aktion bewirkt hat, ohne die ganze Seite erneut zu lesen. Im Web ist die Baseline der letzte Snapshot, der ohne `--viewport` erstellt wurde.

```sh
npx wdio session diff
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--baseline <value>` | Snapshot-Datei, mit der verglichen wird |
| `--scope <value>` | Nur innerhalb dieses Refs oder Selektors snapshotten, wie `snapshot --scope` |
| `--interactive` | Nur interaktive Elemente, wie `snapshot -i` |

**Beispiele**

```sh
# Sehen, was ein Klick verändert hat
npx wdio session click e7 && npx wdio session diff

# Mit einem gespeicherten Snapshot vergleichen
npx wdio session diff --baseline before.yml
```

Siehe auch: [`snapshot`](#snapshot), [`find`](#find).

## `screenshot`

Ein PNG des Viewports, eines Elements oder der ganzen Seite speichern. Gilt für Web, Native Mobile, Native Desktop.

Gibt den Dateipfad und die Bildgröße aus. Erstellen Sie einen Screenshot, wenn es um Layout oder Aussehen geht; Text und Zustand lesen Sie mit `snapshot` und `get`.

```sh
npx wdio session screenshot [target]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | nein | Ref oder Selektor des zu erfassenden Elements |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--full` | Ganze Seite (Web) |
| `--path <value>` | Ausgabedatei |

**Beispiele**

```sh
# Den Viewport erfassen
npx wdio session screenshot

# Ein Element erfassen
npx wdio session screenshot e5 --path card.png

# Die ganze Seite erfassen
npx wdio session screenshot --full
```

Siehe auch: [`visual`](#visual), [`pdf`](#pdf), [`snapshot`](#snapshot).

## `pdf`

Die aktuelle Seite als PDF speichern. Gilt für Web.

Ruft `browser.savePDF` auf. Eine BiDi-Session druckt mit `browsingContext.print`, headed oder headless, in Chrome, Edge und Firefox. Eine Classic-Session verwendet `printPage`, das ältere Chrome-Versionen nur headless unterstützen.

```sh
npx wdio session pdf [file]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `file` | nein | Ausgabedatei (muss auf .pdf enden) |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--path <value>` | Ausgabedatei (muss auf .pdf enden) |

**Beispiele**

```sh
# report.pdf im aktuellen Verzeichnis schreiben
npx wdio session pdf report.pdf
```

Siehe auch: [`screenshot`](#screenshot).

## `source`

Das HTML der Seite oder das XML der App speichern. Gilt für Web, Native Mobile, Native Desktop.

Schreibt die Datei und gibt ihren Pfad und ihre Größe aus. Verwenden Sie es, wenn ein Snapshot verbirgt, was Sie brauchen, etwa Attribute für einen Selektor.

```sh
npx wdio session source
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--path <value>` | Ausgabedatei |

**Beispiele**

```sh
# Das HTML im aktuellen Verzeichnis speichern
npx wdio session source --path page.html
```

Siehe auch: [`snapshot`](#snapshot), [`get`](#get).

## `get`

Text, HTML, Wert, ein Attribut, den Titel, die URL, eine Anzahl oder eine Box lesen. Gilt für Web.

Gibt den Wert aus, dann den ausgeführten WebdriverIO-Code (`→ …`). Übergeben Sie -q, um nur den Wert auszugeben, z. B. um ihn in einer Shell-Variable zu speichern. Lesen Sie einen Wert, bevor Sie eine Assertion dafür schreiben.

```sh
npx wdio session get <sub> [target] [name]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | nein | Ref oder Selektor (nicht verwendet für title und url) |
| `name` | nein | Attributname (nur attr) |

**Beispiele**

```sh
# Text eines Refs
npx wdio session get text e1

# Aktuelle URL
npx wdio session get url

# Nur der Wert, für eine Shell-Variable
url=$(npx wdio session get url -q)

# href eines Links
npx wdio session get attr e3 href

# Wie viele Elemente passen
npx wdio session get count "aria/Remove"
```

Siehe auch: [`is`](#is), [`wait`](#wait), [`exec`](#exec).

## `is`

Prüfen, ob ein Element sichtbar, aktiviert oder angehakt ist. Gilt für Web.

Gibt true oder false aus, dann den ausgeführten WebdriverIO-Code; übergeben Sie -q, um nur den Wert auszugeben. Der Exit-Code ist in beiden Fällen 0.

```sh
npx wdio session is <sub> <target>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | visible \| enabled \| checked |
| `target` | ja | Ref oder Selektor |

**Beispiele**

```sh
# true oder false ausgeben
npx wdio session is visible e1

# Einen Button anhand seiner Beschriftung prüfen
npx wdio session is enabled "aria/Place order"
```

Siehe auch: [`get`](#get), [`wait`](#wait).

## `logs`

Konsolen-, Seitenfehler-, Netzwerk- und Geräte-Logs seit dem letzten Aufruf ausgeben. Gilt für Web, Native Mobile.

Jeder Aufruf rückt einen Lesecursor vor, sodass der nächste Aufruf nur neue Einträge zeigt. Führen Sie es nach einer Aktion aus, um die Fehler zu sehen, die diese Aktion verursacht hat.

```sh
npx wdio session logs
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--errors` | Nur Fehler |
| `--network` | Nur Netzwerkeinträge |
| `--since <value>` | Nur Einträge, die neuer als diese Dauer sind (z. B. 30s) |
| `--peek` | Den Lesecursor nicht vorrücken |
| `--source <browser\|driver\|logcat\|syslog\|main>` | Log-Quelle |

**Beispiele**

```sh
# Durch einen Klick verursachte Fehler
npx wdio session click e4 && npx wdio session logs --errors

# Aktuelle Einträge, für den nächsten Aufruf behalten
npx wdio session logs --since 30s --peek
```

Siehe auch: [`requests`](#requests).

## `navigate`

Eine URL öffnen. Gilt für Web.

Akzeptiert `example.com`, vollständige URLs und Pfade relativ zu baseUrl. Verlässt zuerst jeden Frame. Gibt die neue URL und den Titel aus.

```sh
npx wdio session navigate <url>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `url` | ja | URL (relative URLs verwenden baseUrl) |

**Beispiele**

```sh
# Zu einer Seite gehen und sie ansehen
npx wdio session navigate /cart && npx wdio session snapshot -i

# Eine andere Website öffnen
npx wdio session navigate example.com
```

Siehe auch: [`back`](#back), [`reload`](#reload), [`wait`](#wait).

## `back`

Zurück navigieren. Gilt für Web.

```sh
npx wdio session back
```

**Beispiele**

```sh
# Eine Seite zurück
npx wdio session back
```

Siehe auch: [`forward`](#forward), [`navigate`](#navigate).

## `forward`

Vorwärts navigieren. Gilt für Web.

```sh
npx wdio session forward
```

**Beispiele**

```sh
# Eine Seite vorwärts
npx wdio session forward
```

Siehe auch: [`back`](#back), [`navigate`](#navigate).

## `reload`

Die Seite neu laden. Gilt für Web.

```sh
npx wdio session reload
```

**Beispiele**

```sh
# Neu laden und warten, bis das Netzwerk ruhig ist
npx wdio session reload && npx wdio session wait --load networkidle
```

Siehe auch: [`navigate`](#navigate), [`wait`](#wait).

## `wait`

Auf ein Element, Text, eine URL, einen Ladezustand, eine Bedingung oder einige Millisekunden warten. Gilt für Web.

Übergeben Sie genau eines von: einem Ref oder Selektor, --text, --url, --load, --fn oder Millisekunden. Schlägt nach --limit mit Exit-Code 1 fehl.

Bevorzugen Sie eine Bedingung gegenüber einer Pause, sowohl hier als auch gegenüber `sleep` in einer Kette. Eine Pause von mehr als 30 Sekunden wird abgelehnt.

```sh
npx wdio session wait [target]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | nein | Ref, Selektor oder Millisekunden |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--text <value>` | Warten, bis die Seite diesen Text enthält |
| `--url <value>` | Warten, bis die URL passt (Teilstring oder * und ** Globs) |
| `--load <value>` | domcontentloaded, load oder networkidle |
| `--fn <value>` | Warten, bis dieser JavaScript-Ausdruck true ist |
| `--state <value>` | Mit einem Target: visible (Standard), hidden, enabled oder disabled |
| `--limit <n>` | Wartezeit in Millisekunden (Standard 10000) |

**Beispiele**

```sh
# Warten, bis ein Ref sichtbar ist
npx wdio session wait e1

# Warten, bis ein Spinner verschwunden ist
npx wdio session wait "aria/Loading" --state hidden

# Handeln, auf das Ergebnis warten, erneut hinsehen
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# Auf eine URL warten
npx wdio session wait --url "**/dashboard"

# Warten, bis kein Request mehr läuft
npx wdio session wait --load networkidle

# 500ms pausieren
npx wdio session wait 500
```

Siehe auch: [`find`](#find), [`is`](#is), [`get`](#get).

## `click`

Ein Element anklicken. Gilt für Web, Native Mobile, Native Desktop.

Gibt aus, was angeklickt wurde, und – wenn der Klick eine Navigation ausgelöst hat – die neue URL. Erstellen Sie einen neuen Snapshot, bevor Sie Refs auf der nächsten Seite verwenden. Ein verstecktes oder verdecktes Element schlägt sofort fehl und nennt, was im Weg ist. `x,y` klickt auf einen Punkt im Viewport (Pixel von oben links, wie in einem Screenshot) für Dinge ohne Ref, etwa ein Canvas oder eine Karte.

```sh
npx wdio session click <target>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12), WebdriverIO-Selektor oder x,y-Viewport-Koordinaten |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--double` | Doppelklick |
| `--right` | Rechtsklick |
| `--new-tab` | Den Link in einem neuen Tab öffnen und dorthin wechseln |

**Beispiele**

```sh
# Einen Ref aus dem letzten Snapshot anklicken
npx wdio session click e3

# Anhand des Accessible Name klicken
npx wdio session click "aria/Add to cart"

# Klicken, warten, erneut hinsehen
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# Einen Link in einem neuen Tab öffnen
npx wdio session click e8 --new-tab

# Auf einen Punkt im Viewport klicken, z. B. auf einer Karte
npx wdio session click 320,480
```

Siehe auch: [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot).

## `tap`

Auf ein Element tippen (Mobile). Gilt für Native Mobile.

```sh
npx wdio session tap <target>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12) oder WebdriverIO-Selektor |

**Beispiele**

```sh
# Auf einen Ref aus dem letzten Snapshot tippen
npx wdio session tap e2
```

Siehe auch: [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe).

## `fill`

Den Wert eines Eingabefelds ersetzen. Gilt für Web, Native Mobile, Native Desktop.

Leert das Feld zuerst. Um in das fokussierte Element zu tippen, verwenden Sie `type`; um Tasten wie Enter zu senden, verwenden Sie `press`.

```sh
npx wdio session fill <target> <text..>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12) oder WebdriverIO-Selektor |
| `text` | ja | Text (Wörter nach dem Target werden mit Leerzeichen verbunden) |

**Beispiele**

```sh
# Ein Feld ausfüllen
npx wdio session fill e2 ada@example.com

# Ein Formular ausfüllen und absenden
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

Siehe auch: [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check).

## `type`

In ein Element oder das fokussierte Element tippen. Gilt für Web, Native Mobile, Native Desktop.

Sendet den Text als Tastendrücke, ohne etwas zu leeren: `type e2 Ada` tippt in e2, `type Ada` in das fokussierte Element. Um einen Wert zu ersetzen, verwenden Sie `fill`.

```sh
npx wdio session type <text..>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `text` | ja | Text (Wörter werden mit Leerzeichen verbunden). Beginnen Sie mit einem Ref, z. B. `type e2 Ada`, um in dieses Element statt in das fokussierte zu tippen |

**Beispiele**

```sh
# In ein Feld tippen
npx wdio session type e5 hello

# In das fokussierte Element tippen
npx wdio session focus e5 && npx wdio session type "hello"
```

Siehe auch: [`fill`](#fill), [`press`](#press), [`focus`](#focus).

## `press`

Tasten drücken, z. B. Enter, Control+a. Gilt für Web, Native Desktop.

Kombinieren Sie Tasten mit +. Bei Namen wird die Groß-/Kleinschreibung ignoriert; ctrl, cmd, esc, up, down, left und right werden als Kurzformen akzeptiert.

```sh
npx wdio session press <keys>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `keys` | ja | Tastenkombination |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--times <n>` | So oft drücken (bis zu 100), z. B. um einen Slider zu bewegen |

**Beispiele**

```sh
# Ein Formular absenden
npx wdio session press Enter

# Einen fokussierten Slider fünf Schritte bewegen
npx wdio session press ArrowRight --times 5

# Alles auswählen
npx wdio session press Control+a

# Fokus zurückbewegen
npx wdio session press Shift+Tab
```

Siehe auch: [`type`](#type), [`fill`](#fill).

## `select`

Eine Option eines `<select>` auswählen. Gilt für Web.

```sh
npx wdio session select <target> <value>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12) oder WebdriverIO-Selektor |
| `value` | ja | Optionstext, -wert oder -index |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--by <text\|value\|index>` | Wie die Option abgeglichen wird (Standard text) |

**Beispiele**

```sh
# Nach sichtbarem Text auswählen
npx wdio session select e6 Germany

# Nach Wert auswählen
npx wdio session select e6 de --by value
```

Siehe auch: [`fill`](#fill), [`check`](#check).

## `upload`

Ein Datei-Eingabefeld setzen. Gilt für Web.

Der Pfad ist relativ zu Ihrem Arbeitsverzeichnis. Zielen Sie auf das `<input type="file">` selbst, nicht auf den Button, der die Dateiauswahl öffnet.

```sh
npx wdio session upload <target> <file>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12) oder WebdriverIO-Selektor |
| `file` | ja | Hochzuladende Datei |

**Beispiele**

```sh
# Eine Datei anhängen
npx wdio session upload e9 ./fixtures/avatar.png
```

Siehe auch: [`fill`](#fill).

## `hover`

Den Zeiger über ein Element bewegen. Gilt für Web, Native Desktop.

```sh
npx wdio session hover <target>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12) oder WebdriverIO-Selektor |

**Beispiele**

```sh
# Ein Hover-Menü öffnen und ansehen
npx wdio session hover e4 && npx wdio session snapshot -i
```

Siehe auch: [`click`](#click).

## `focus`

Ein Element fokussieren. Gilt für Web.

```sh
npx wdio session focus <target>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12) oder WebdriverIO-Selektor |

**Beispiele**

```sh
# Ein Feld vor `type` fokussieren
npx wdio session focus e5
```

Siehe auch: [`type`](#type), [`press`](#press).

## `check`

Eine Checkbox oder einen Radiobutton anhaken. Gilt für Web.

Tut nichts, wenn es bereits angehakt ist, und schlägt fehl, wenn es am Ende nicht angehakt ist.

```sh
npx wdio session check <target>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12) oder WebdriverIO-Selektor |

**Beispiele**

```sh
# Die Bedingungen akzeptieren
npx wdio session check e7
```

Siehe auch: [`uncheck`](#uncheck), [`is`](#is).

## `uncheck`

Den Haken einer Checkbox entfernen. Gilt für Web.

Tut nichts, wenn sie bereits nicht angehakt ist. Bei einem ausgewählten Radiobutton kann die Auswahl nicht aufgehoben werden.

```sh
npx wdio session uncheck <target>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12) oder WebdriverIO-Selektor |

**Beispiele**

```sh
# Den Newsletter abbestellen
npx wdio session uncheck e7
```

Siehe auch: [`check`](#check), [`is`](#is).

## `drag`

Ein Element auf ein anderes ziehen. Gilt für Web, Native Mobile, Native Desktop.

```sh
npx wdio session drag <from> <to>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `from` | ja | Ref oder Selektor des zu ziehenden Elements |
| `to` | ja | Ref oder Selektor des Ablageziels |

**Beispiele**

```sh
# Eine Karte in eine andere Spalte verschieben
npx wdio session drag e3 e9
```

Siehe auch: [`scroll`](#scroll).

## `scroll`

Ein Element in den sichtbaren Bereich oder die Seite scrollen. Gilt für Web.

Ohne Target wird 600px nach unten gescrollt. Lazy geladene Inhalte erscheinen im nächsten Snapshot.

```sh
npx wdio session scroll [target]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | nein | Ref, Selektor, up, down, top oder bottom |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--px <n>` | Pixel für up/down (Standard 600) |

**Beispiele**

```sh
# Ein Element in den sichtbaren Bereich bringen
npx wdio session scroll e40

# Weitere Ergebnisse laden und ansehen
npx wdio session scroll bottom && npx wdio session snapshot -i

# Zwei Bildschirmhöhen scrollen
npx wdio session scroll down --px 1200
```

Siehe auch: [`swipe`](#swipe), [`snapshot`](#snapshot).

## `swipe`

Über den Bildschirm wischen (Mobile). Gilt für Native Mobile.

```sh
npx wdio session swipe <direction>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `direction` | ja | up \| down \| left \| right |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--percent <n>` | Wischlänge 0..1 |

**Beispiele**

```sh
# Eine Liste scrollen und ansehen
npx wdio session swipe up && npx wdio session snapshot
```

Siehe auch: [`scroll`](#scroll), [`tap`](#tap).

## `long-press`

Lange auf ein Element drücken (Mobile). Gilt für Native Mobile.

```sh
npx wdio session long-press <target>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref (e12) oder WebdriverIO-Selektor |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--duration <n>` | Millisekunden |

**Beispiele**

```sh
# Ein Kontextmenü öffnen
npx wdio session long-press e4 --duration 1500
```

Siehe auch: [`tap`](#tap).

## `tabs`

Tabs auflisten, öffnen, wechseln oder schließen. Gilt für Web.

Ohne Unterbefehl werden Tabs mit ihrem Index aufgelistet; der aktuelle ist markiert. `new` öffnet einen Tab und wechselt dorthin. `switch` und `close` nehmen einen Index oder ein Handle entgegen.

```sh
npx wdio session tabs [sub] [arg]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | nein | switch \| new \| close |
| `arg` | nein | Index, Handle oder URL |

**Beispiele**

```sh
# Tabs auflisten
npx wdio session tabs

# Einen Tab öffnen
npx wdio session tabs new http://localhost:3000/help

# Zum ersten Tab zurückkehren
npx wdio session tabs switch 0

# Den zweiten Tab schließen
npx wdio session tabs close 1
```

Siehe auch: [`windows`](#windows), [`frame`](#frame).

## `windows`

Fenster auflisten oder wechseln. Gilt für Web, Native Desktop.

```sh
npx wdio session windows [sub] [arg]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | nein | switch |
| `arg` | nein | Index oder Handle |

**Beispiele**

```sh
# Fenster auflisten
npx wdio session windows

# Zum zweiten Fenster wechseln
npx wdio session windows switch 1
```

Siehe auch: [`tabs`](#tabs).

## `frame`

In ein iframe, zum übergeordneten Frame oder zum obersten Dokument wechseln. Gilt für Web.

Der Seiten-Snapshot zeigt bereits den Inhalt seiner iframes mit Refs, die Aktionen direkt verwenden, sodass `frame` nur nötig ist, um eine Weile innerhalb eines Frames zu arbeiten oder einen Frame zu sehen, den der Snapshot gekürzt hat. Snapshots und Aktionen gelten für den aktuellen Frame, bis Sie zurückwechseln. `navigate` kehrt zum obersten Dokument zurück.

```sh
npx wdio session frame <target>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | ja | Ref, Selektor, parent oder top |

**Beispiele**

```sh
# Ein iframe betreten und hineinsehen
npx wdio session frame e12 && npx wdio session snapshot -i

# Zur Seite zurückkehren
npx wdio session frame top
```

Siehe auch: [`tabs`](#tabs), [`snapshot`](#snapshot).

## `contexts`

Native/Webview-Kontexte auflisten oder wechseln. Gilt für Native Mobile.

```sh
npx wdio session contexts [sub] [name]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | nein | switch |
| `name` | nein | Kontextname |

**Beispiele**

```sh
# NATIVE_APP- und WEBVIEW-Kontexte auflisten
npx wdio session contexts

# Die Webview steuern
npx wdio session contexts switch WEBVIEW_com.example.shop
```

Siehe auch: [`snapshot`](#snapshot).

## `dialog`

Einen offenen Dialog akzeptieren, ablehnen oder melden. Gilt für Web, Native Mobile.

Ein offener alert, confirm oder prompt blockiert andere Aktionen, die dann mit dem Hinweis fehlschlagen, diesen Befehl auszuführen.

```sh
npx wdio session dialog <sub>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | accept \| dismiss \| status |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--text <value>` | Prompt-Text (nur accept) |

**Beispiele**

```sh
# Den offenen Dialog anzeigen
npx wdio session dialog status

# Bestätigen
npx wdio session dialog accept

# Einen Prompt beantworten
npx wdio session dialog accept --text "Ada"
```

Siehe auch: [`click`](#click).

## `app`

Eine App starten, beenden, installieren oder abfragen. Gilt für Native Mobile, Native Desktop.

```sh
npx wdio session app <sub> <id>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | launch \| terminate \| install \| state |
| `id` | ja | App-ID, Bundle-ID oder Datei |

**Beispiele**

```sh
# Die App neu starten
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# Läuft sie?
npx wdio session app state com.example.shop
```

Siehe auch: [`deeplink`](#deeplink), [`background`](#background).

## `deeplink`

Einen Deep Link öffnen. Gilt für Native Mobile.

```sh
npx wdio session deeplink <url>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `url` | ja | URL |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--package <value>` | Android-Package oder iOS-Bundle-ID |

**Beispiele**

```sh
# Einen Produktbildschirm öffnen
npx wdio session deeplink shop://product/42 --package com.example.shop
```

Siehe auch: [`app`](#app).

## `rotate`

Das Gerät drehen. Gilt für Native Mobile.

```sh
npx wdio session rotate <orientation>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `orientation` | ja | portrait \| landscape |

**Beispiele**

```sh
# Das Gerät quer drehen
npx wdio session rotate landscape
```

## `keyboard`

Die Bildschirmtastatur ausblenden. Gilt für Native Mobile.

```sh
npx wdio session keyboard <sub>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | hide |

**Beispiele**

```sh
# Die Elemente unter der Tastatur freilegen
npx wdio session keyboard hide
```

## `background`

Die App in den Hintergrund schicken. Gilt für Native Mobile.

```sh
npx wdio session background <seconds>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `seconds` | ja | Sekunden (-1 belässt sie dort) |

**Beispiele**

```sh
# Die App für 3 Sekunden in den Hintergrund schicken
npx wdio session background 3
```

Siehe auch: [`app`](#app).

## `lock`

Das Gerät sperren. Gilt für Native Mobile.

```sh
npx wdio session lock
```

**Beispiele**

```sh
# Den Bildschirm sperren
npx wdio session lock
```

Siehe auch: [`unlock`](#unlock).

## `unlock`

Das Gerät entsperren. Gilt für Native Mobile.

```sh
npx wdio session unlock
```

**Beispiele**

```sh
# Den Bildschirm entsperren
npx wdio session unlock
```

Siehe auch: [`lock`](#lock).

## `geolocation`

Die Geolocation setzen. Gilt für Web, Native Mobile.

```sh
npx wdio session geolocation <lat> <lon>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `lat` | ja | Breitengrad |
| `lon` | ja | Längengrad |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--accuracy <n>` | Genauigkeit in Metern |

**Beispiele**

```sh
# So tun, als wäre man in Berlin
npx wdio session geolocation 52.52 13.405
```

Siehe auch: [`emulate`](#emulate).

## `emulate`

Ein Gerät, einen Viewport, ein Netzwerk, eine CPU, eine Uhr oder einen BiDi-Emulationsbereich emulieren. Gilt für Web.

Eine Emulation bleibt bis `emulate reset` oder bis zum Ende der Session bestehen; das erneute Setzen derselben Art ersetzt sie. `emulate device` ohne Wert listet die Gerätenamen auf. Netzwerk-Presets und CPU-Drosselung erfordern einen Chromium-Browser.

```sh
npx wdio session emulate <sub> [value]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | nein | Wert für die Emulation |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--dpr <n>` | Device Pixel Ratio (viewport) |
| `--tick <n>` | Die emulierte Uhr um ms vorstellen (clock) |

**Beispiele**

```sh
# Ein Smartphone emulieren
npx wdio session emulate device "iPhone 15"

# Einen Viewport setzen
npx wdio session emulate viewport 375x812 --dpr 3

# Offline gehen
npx wdio session emulate network offline

# Dark Mode
npx wdio session emulate color-scheme dark

# Das Datum einfrieren
npx wdio session emulate clock 2030-01-01T00:00:00Z

# Bewegung reduzieren
npx wdio session emulate media prefersReducedMotion=reduce

# Alle Emulationen rückgängig machen
npx wdio session emulate reset
```

Siehe auch: [`geolocation`](#geolocation), [`screenshot`](#screenshot).

## `requests`

Erfasste Netzwerk-Requests auflisten (BiDi). Gilt für Web.

```sh
npx wdio session requests
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--filter <value>` | Teilstring oder Glob |
| `--failed` | Nur fehlgeschlagene Requests |
| `--since <value>` | Nur Requests, die neuer als diese Dauer sind |
| `--limit <n>` | Maximale Zeilenzahl (Standard 50) |

**Beispiele**

```sh
# Nur API-Aufrufe
npx wdio session requests --filter "**/api/**"

# Requests, die ein Klick kaputt gemacht hat
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

Siehe auch: [`mock`](#mock), [`logs`](#logs).

## `mock`

Antworten für ein URL-Muster mocken (BiDi). Gilt für Web.

Gibt die Mock-ID aus (m1, m2, …). Erneutes Mocken desselben Musters ersetzt den früheren Mock.

```sh
npx wdio session mock <pattern>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `pattern` | ja | URL-Muster |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--status <n>` | Statuscode |
| `--body <value>` | Body als JSON/Text oder Dateipfad |
| `--header <value>` | Header k:v (wiederholbar) |
| `--abort` | Passende Requests abbrechen |
| `--method <value>` | Nur diese Methode |
| `--once` | Nur der nächste Request |

**Beispiele**

```sh
# Festes JSON zurückgeben
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# Den nächsten Request fehlschlagen lassen
npx wdio session mock "**/api/cart" --status 500 --once

# Bilder blockieren
npx wdio session mock "**/*.png" --abort
```

Siehe auch: [`unmock`](#unmock), [`requests`](#requests).

## `unmock`

Mocks entfernen. Gilt für Web.

```sh
npx wdio session unmock [pattern]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `pattern` | nein | Muster oder Mock-ID |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--all` | Alle Mocks entfernen |

**Beispiele**

```sh
# Einen Mock entfernen
npx wdio session unmock m1

# Alle Mocks entfernen
npx wdio session unmock --all
```

Siehe auch: [`mock`](#mock).

## `cookies`

Cookies abrufen, setzen oder löschen. Gilt für Web.

Ohne Unterbefehl wird jedes Cookie als name=value ausgegeben. `clear` ohne Namen löscht alle Cookies.

```sh
npx wdio session cookies [sub] [name] [value]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | nein | get \| set \| clear |
| `name` | nein | Cookie-Name |
| `value` | nein | Cookie-Wert |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--domain <value>` | Cookie-Domain (set) |
| `--path <value>` | Cookie-Pfad (set) |
| `--http-only` | HttpOnly-Cookie (set) |
| `--secure` | Secure-Cookie (set) |
| `--same-site <value>` | lax, strict, none oder default (set) |
| `--expiry <n>` | Ablauf als Unix-Zeitstempel in Sekunden (set) |

**Beispiele**

```sh
# Cookies auflisten
npx wdio session cookies

# Wert eines Cookies
npx wdio session cookies get session

# Ein Cookie setzen und neu laden
npx wdio session cookies set session abc && npx wdio session reload

# Alle Cookies löschen
npx wdio session cookies clear
```

Siehe auch: [`storage`](#storage), [`state`](#state).

## `storage`

localStorage (oder sessionStorage) abrufen, setzen oder löschen. Gilt für Web.

Ohne Unterbefehl wird jeder Eintrag ausgegeben. `clear` ohne Schlüssel leert den Speicher.

```sh
npx wdio session storage [sub] [key] [value]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | nein | get \| set \| clear |
| `key` | nein | Schlüssel |
| `value` | nein | Wert |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--session-storage` | sessionStorage verwenden |

**Beispiele**

```sh
# localStorage auflisten
npx wdio session storage

# Einen Schlüssel setzen
npx wdio session storage set token abc

# sessionStorage leeren
npx wdio session storage clear --session-storage
```

Siehe auch: [`cookies`](#cookies), [`state`](#state).

## `state`

Cookies und Storage speichern oder laden. Gilt für Web.

`save` schreibt Cookies, localStorage und sessionStorage des aktuellen Origins in eine JSON-Datei. `load` öffnet diesen Origin und stellt sie wieder her, z. B. um einen Login zu überspringen.

```sh
npx wdio session state <sub> <file>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | save \| load |
| `file` | ja | State-Datei |

**Beispiele**

```sh
# Einen eingeloggten Zustand speichern
npx wdio session state save .wdio/logged-in.json

# Eingeloggt starten
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

Siehe auch: [`cookies`](#cookies), [`storage`](#storage).

## `visual`

Visuelle Snapshots über @wdio/visual-service. Gilt für Web, Native Mobile, Native Desktop.

`save` speichert eine Baseline unter .wdio/visual/baseline, `check` vergleicht damit und gibt die Abweichung aus, `accept` macht das letzte tatsächliche Bild zur Baseline, `list` zeigt die Tags. Erfordert @wdio/visual-service im Projekt.

```sh
npx wdio session visual <sub> [tag]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | save \| check \| accept \| list |
| `tag` | nein | Bild-Tag |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--element <value>` | Nur dieses Element |
| `--full` | Ganze Seite |
| `--tabbable` | Tabbable-Seite |
| `--threshold <n>` | Erlaubte Abweichung in Prozent (Standard 0) |
| `--all` | accept: alle Tags |

**Beispiele**

```sh
# Eine Baseline speichern
npx wdio session visual save cart

# Damit vergleichen
npx wdio session visual check cart --threshold 0.5

# Eine beabsichtigte Änderung akzeptieren
npx wdio session visual accept cart
```

Siehe auch: [`screenshot`](#screenshot).

## `trace`

Jeden Schritt mit Screenshots und Snapshots aufzeichnen.

`stop` gibt das Trace-Verzeichnis und ein Protokoll der Schritte aus.

```sh
npx wdio session trace <sub>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | start \| stop |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--screenshots` | Screenshot nach jedem Schritt (mit --no-screenshots überspringen) |
| `--snapshots` | Snapshot nach jedem Schritt (mit --no-snapshots überspringen) |

**Beispiele**

```sh
# Tracing starten
npx wdio session trace start

# Stoppen und das Protokoll ausgeben
npx wdio session trace stop
```

Siehe auch: [`record`](#record), [`history`](#history).

## `record`

Ein Video aufnehmen. Gilt für Web, Native Mobile.

```sh
npx wdio session record <sub>
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `sub` | ja | start \| stop |

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--fps <n>` | Bilder pro Sekunde (Standard 5) |
| `--path <value>` | Ausgabedatei |

**Beispiele**

```sh
# Aufnahme starten
npx wdio session record start

# Stoppen und das Video speichern
npx wdio session record stop --path checkout.mp4
```

Siehe auch: [`trace`](#trace), [`screenshot`](#screenshot).

## `history`

Die aufgezeichneten Schritte ausgeben.

Jede Aktion, die die Seite verändert, zeichnet den ausgeführten WebdriverIO-Code auf. `export` macht aus diesem Verlauf eine Spec.

```sh
npx wdio session history
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--clear` | Den Verlauf löschen |

**Beispiele**

```sh
# Die bisherigen Schritte anzeigen
npx wdio session history

# Die Aufzeichnung vor den Schritten, die Sie behalten möchten, neu beginnen
npx wdio session history --clear
```

Siehe auch: [`export`](#export), [`exec`](#exec).

## `export`

Eine Spec aus dem Verlauf generieren.

Schreibt eine describe/it-Spec mit den aufgezeichneten Schritten. Refs werden zu stabilen Selektoren und Helper werden zu Custom Commands. Ohne --out landet die Datei im Artefaktverzeichnis. Führen Sie sie mit `wdio run` aus, um zu bestätigen, dass sie besteht.

```sh
npx wdio session export
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--out <value>` | Ausgabedatei |
| `--title <value>` | Suite-Titel |
| `--page-objects` | Page Objects generieren |
| `--framework <mocha\|jasmine>` | Framework (Standard mocha) |

**Beispiele**

```sh
# Die Spec schreiben
npx wdio session export --out test/specs/cart.e2e.ts

# Die Spec schreiben und ausführen
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Siehe auch: [`history`](#history), [`helpers`](#helpers).

## `resume`

Einen durch wdio run --debug=agent pausierten Test fortsetzen.

`wdio run --debug=agent` pausiert einen fehlschlagenden Test und stellt ihn als Session debug-`<worker>` bereit. Untersuchen Sie ihn mit einer beliebigen Aktion und setzen Sie ihn dann fort. `close` auf dieser Session lässt den Test stattdessen fehlschlagen.

```sh
npx wdio session resume
```

**Beispiele**

```sh
# Den pausierten Test ansehen und ihn dann fortfahren lassen
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

Siehe auch: [`close`](#close), [`list`](#list).

## `doctor`

Ihre Umgebung überprüfen.

Gibt eine Zeile pro Prüfung aus, mit einer Lösung für jeden Fehler. Beendet sich mit 1, wenn eine Prüfung fehlschlägt.

```sh
npx wdio session doctor [target]
```

**Argumente**

| Name | Erforderlich | Beschreibung |
| --- | --- | --- |
| `target` | nein | Nur prüfen, was dieses Target benötigt |

**Beispiele**

```sh
# Alles prüfen
npx wdio session doctor

# Prüfen, was eine Android-Session benötigt
npx wdio session doctor android
```

Siehe auch: [`open`](#open).

## `skill`

Den Agent-Skill ausgeben.

```sh
npx wdio session skill
```

**Flags**

| Flag | Beschreibung |
| --- | --- |
| `--install <value>` | Ihn nach .agents/skills/wdio-session/SKILL.md (oder in dieses Verzeichnis) schreiben |

**Beispiele**

```sh
# Den Skill ausgeben
npx wdio session skill

# Ihn zu diesem Projekt hinzufügen
npx wdio session skill --install .
```