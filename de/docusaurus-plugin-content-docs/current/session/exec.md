---
id: exec
title: Code in einer Session ausführen
description: Führen Sie WebdriverIO-Code und Assertions mit exec in einer laufenden wdio-Session aus.
---

`exec` führt WebdriverIO-Code in der geöffneten Session aus. Verwenden Sie es, wenn ein Schritt mehr als ein einzelnes `click` oder `fill` ist, sowie für jede Assertion.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Verwenden Sie bei Befehlen immer `await`. `$` gibt ein Element zurück und wirft einen Fehler, wenn es nicht vorhanden ist. `$$` gibt eine Liste zurück. Es gibt keinen Sync-Modus und kein `browser.element`.

Namen, die Sie deklarieren, bleiben im nächsten `exec` verfügbar. Ein `import` auf oberster Ebene wird aus dem Projektverzeichnis geladen.

## Assertions

Schreiben Sie Assertions mit `expect-webdriverio` in `exec`. Installieren Sie es in Ihrem Projekt. Ohne es schlägt `expect(...)` mit einem Installationshinweis fehl.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

Verwenden Sie `visual check <tag>`, wenn es darum geht, wie der Bildschirm aussieht. Dieser Befehl benötigt `@wdio/visual-service`:

```sh
npx wdio session visual check cart
```

`visual accept cart` kopiert das neueste tatsächliche Bild für diesen Tag über die Baseline. Ältere Bilder, die dasselbe Tag-Präfix haben, werden nicht kopiert.

## Wann stattdessen eine Abkürzung verwenden

`click`, `fill`, `type`, `press` und `tap` sind für eine einzelne Interaktion kürzer als `exec` und geben die WebdriverIO-Zeile aus, die sie ausgeführt haben. Bevorzugen Sie diese mit einer Ref aus dem neuesten [Snapshot](/docs/session/snapshots). Verwenden Sie `exec` für Wartevorgänge, Assertions und alles, was mehr als einen Befehl benötigt.

## Nächste Schritte

- [Einen Test exportieren](/docs/session/export) — die Schritte speichern, einschließlich `exec`
- [Befehle](/docs/session-commands) — Flags für `exec` und `visual`