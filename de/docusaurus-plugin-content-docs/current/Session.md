---
id: session
title: wdio session
description: Steuern Sie einen Browser, eine mobile App oder eine Desktop-App aus der Shell mit kurzen wdio session-Befehlen und exportieren Sie die Schritte anschließend als Test.
---

`wdio session` hält eine WebdriverIO-Session über viele kurze Shell-Befehle hinweg aktiv. Verwenden Sie es, um eine Benutzeroberfläche zu erkunden, eine Änderung zu überprüfen und die erfolgreichen Schritte in einen Test umzuwandeln. Es ist Teil von `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

Die Session heißt `default`. Übergeben Sie `-s <name>` nur, wenn Sie zwei Sessions gleichzeitig benötigen. Die Seite [Targets](/docs/session/targets) steuert eine Expo-Guinea-Pig-App in einem sichtbaren Chrome-Fenster und in einem Electron-Fenster, beide in Desktop-Größe. Android- und iOS-Befehle für dieselbe App finden Sie auf dieser Seite.

## Installation

`wdio session` ist Teil der WebdriverIO CLI. `npx wdio` installiert das Paket [`wdio`](https://www.npmjs.com/package/wdio) ohne Scope und führt diese CLI aus. Sie installieren `@wdio/session` nicht selbst.

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` gibt den Workflow, die Aktionen nach Gruppen, globale Flags und Exit-Codes aus. `<action> --help` gibt die Argumente, Flags, Plattformen, Beispiele und verwandten Aktionen dieser Aktion aus. Derselbe Text steht auf der Seite [Befehle](/docs/session-commands). Der Agent-Skill enthält nur die Kernschleife und verweist Agents für den Rest auf `--help`, damit er nicht veraltet, wenn sich die CLI ändert.

Erstellen Sie ein Projekt mit:

```sh
npm init wdio@latest
```

Bestätigen Sie „Set up coding agent support“, um `.agents/skills/wdio-session/SKILL.md`, einen Abschnitt in `AGENTS.md` und einen `.wdio/session/`-Eintrag in der gitignore zu schreiben. Installieren Sie den Skill später mit:

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` prüft Node.js, den Browser, Appium, SDKs und Cloud-Zugangsdaten. `doctor <target>` prüft nur, was dieses Target benötigt. Der Prozess endet mit Exit-Code 1, wenn eine Prüfung fehlschlägt.

## Eine Seite öffnen und damit interagieren

Öffnen Sie Headless-Chrome (fügen Sie `--headed` hinzu, um das Fenster anzuzeigen). `open` gibt die interaktiven Elemente der Seite aus:

```sh
npx wdio session open chrome http://localhost:3000
```

Ein Element sieht so aus: `button "Add to cart" [ref=e3]`. Verwenden Sie diese Ref. Jede Aktion meldet, was sie auf der Seite verändert hat, mit Refs für neue Elemente, sodass Sie selten einen separaten `snapshot` benötigen:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`, `open edge` und `open safari` nehmen dieselbe URL entgegen. Chrome, Firefox und Edge werden bei der ersten Verwendung heruntergeladen, wenn sie nicht installiert sind. Safari erfordert macOS.

### Android

Android und iOS laufen über Appium 3. `doctor android` meldet einen fehlenden Server oder Treiber zusammen mit dem Installationsbefehl.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Nativer Desktop: `open macos --bundle-id com.example.shop` und `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` und `open dioxus ./my-app` benötigen ihren Treiber im `PATH`. Installieren Sie unter Linux ohne `DISPLAY` oder `WAYLAND_DISPLAY` Xvfb oder weston.

## Beobachtung und Refs

| Befehl | Verwendung |
| --- | --- |
| `snapshot --interactive` | Die Elemente, mit denen Sie interagieren können, jeweils mit einer Ref |
| `snapshot --compact` | Derselbe Baum ohne unbenannte leere Wrapper |
| `snapshot --urls` | Linkadressen bei jedem Link |
| `find "Add to cart"` | Eine Zeile aus einem neuen Snapshot |
| `diff` | Was sich seit dem vorherigen Snapshot geändert hat |
| `screenshot` | Layout. Überspringen Sie ihn, wenn ein Snapshot die Frage beantwortet |
| `pdf` | Ein PDF der aktuellen Seite (`pdf report.pdf`). BiDi-Sessions drucken sowohl im Headed- als auch im Headless-Modus |
| `source` | Das HTML der Seite oder das native XML |

Refs stammen aus dem neuesten Snapshot. Erstellen Sie nach einer Navigation erneut einen Snapshot. Eine alte Ref schlägt mit `REF_STALE` fehl. Eine unbekannte Ref schlägt mit `REF_NOT_FOUND` fehl.

## `exec`

`exec` führt WebdriverIO-Code aus. Verwenden Sie bei Befehlen immer `await`. `$` gibt ein Element zurück und wirft einen Fehler, wenn es fehlt. Es gibt keinen Sync-Modus und kein `browser.element`.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Schreiben Sie Assertions mit `expect-webdriverio` in `exec`. Verwenden Sie `visual check <tag>` (erfordert `@wdio/visual-service`), wenn es darum geht, wie der Bildschirm aussieht.

## Export

`export` schreibt eine Spec aus den aufgezeichneten Schritten. Refs werden durch stabile Selektoren ersetzt.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`, `open edge` und `open safari` nehmen dieselbe URL entgegen. Andere Targets, Snapshots, `exec`, Export und ein pausierter Testlauf werden auf separaten Seiten in diesem Abschnitt behandelt.

## Dieser Abschnitt

| Seite | Verwendung |
| --- | --- |
| [Targets](/docs/session/targets) | Browser, Android, iOS, Desktop, Electron, Tauri, Dioxus und Cloud-Geräte, einschließlich der Demo-App in Chrome, Android und Electron |
| [Snapshots und Refs](/docs/session/snapshots) | Was auf dem Bildschirm zu sehen ist und die Refs, die Sie anklicken |
| [Code ausführen](/docs/session/exec) | `exec`, Assertions und visuelle Prüfungen |
| [Einen Test exportieren](/docs/session/export) | Specs, Page Objects und `.wdio/helpers` |
| [Einen Test debuggen](/docs/session/debug) | `wdio run --debug=agent` und `wdio repl --session` |
| [Befehle](/docs/session-commands) | Jede Aktion und jedes Flag |

## Fehlerbehebung

| Meldung | Vorgehensweise |
| --- | --- |
| `SESSION_EXISTS` | Der Name wird bereits verwendet. Verwenden Sie `-s` mit einem anderen Namen oder `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | Führen Sie `snapshot` erneut aus und verwenden Sie eine Ref aus dieser Ausgabe. |
| `NOT_EDITABLE` | Das `fill`-Ziel ist kein bearbeitbares Feld und enthält kein einzelnes bearbeitbares Feld (auch nicht über `aria-controls`/`aria-owns`/Label). Führen Sie `snapshot --scope <target>` aus und füllen Sie die Ref des Feldes aus. |
| `MISSING_DEPENDENCY` | Installieren Sie das in der Fehlermeldung genannte Paket oder führen Sie `wdio session doctor <target>` aus. |
| `MISSING_APPIUM_DRIVER` | Führen Sie die Zeile `npx appium driver install …` aus der Fehlermeldung aus. |
| `MISSING_CREDENTIALS` | Exportieren Sie die genannten Variablen. Doctor gibt deren Werte niemals aus. |
| `Session closed from wdio session` | Die Debug-Session wurde geschlossen. Verwenden Sie Resume statt Close, wenn der Test fortgesetzt werden soll. |

Exit-Codes: 0 Erfolg, 1 die Aktion ist fehlgeschlagen, 2 falsche Verwendung, 3 eine fehlende Abhängigkeit oder fehlende Zugangsdaten, 4 keine Session mit diesem Namen.

## Nächste Schritte

- [Targets](/docs/session/targets) — einen Browser, eine Android- oder iOS-App oder ein Electron-Fenster öffnen
- [WebdriverIO für Coding Agents](/docs/ai-agents) — Skill, Dokumentation und Projektregeln
- [wdio session-Befehle](/docs/session-commands) — jede Aktion und jedes Flag