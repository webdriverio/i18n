---
id: snapshots
title: Snapshots und Refs
description: Lies die Seite mit wdio session snapshot aus und handle anschließend über die ausgegebenen Refs.
---

Erstelle einen Snapshot, bevor du klickst. Der Snapshot ist die Liste der Elemente, mit denen du interagieren kannst. Jede interaktive Zeile endet mit einem Ref wie `[ref=e3]`.

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

Eine Zeile sieht so aus: `button "Add to cart" [ref=e3]`. Der nächste Befehl verwendet diesen Ref:

```sh
npx wdio session click e3
```

Refs stammen aus dem jeweils neuesten Snapshot. Erstelle nach einer Navigation erneut einen Snapshot. Ein veralteter Ref schlägt mit `REF_STALE` fehl. Ein unbekannter Ref schlägt mit `REF_NOT_FOUND` fehl.

:::caution Experimentell

Das Textlayout eines Snapshots und die Struktur, die `--json` dafür ausgibt, sind experimentell: Ein Minor-Release kann sie ändern, zum Beispiel um eine gemeinsame Snapshot-Engine mit dem [DevTools-Trace](/docs/devtools/wdio/trace-mode) zu nutzen. Die Ref-Syntax (`e3`, `@e3`), die Aktionen, die einen Ref entgegennehmen, und der Code, den sie aufzeichnen, bleiben stabil. Entnimm Refs aus einem Snapshot und parse nicht den Rest seiner Zeilen.

:::

## Was du ausführen solltest

| Befehl | Verwendung |
| --- | --- |
| `snapshot --interactive` | Die Elemente, mit denen du interagieren kannst, jeweils mit einem Ref |
| `find "Add to cart"` | Jeder Treffer mit dem umgebenden Knoten, z. B. einem ganzen Listeneintrag, sodass ein Wert neben dem Treffer mitkommt. `-A`, `-B` und `-C` geben einfachen Zeilenkontext wie grep aus |
| `diff` | Was sich seit dem vorherigen Snapshot geändert hat |
| `screenshot` | Layout. Lass ihn weg, wenn ein Snapshot die Frage beantwortet |
| `source` | Das HTML der Seite oder das native XML |

`snapshot` ohne `--interactive` enthält mehr vom Baum. Verwende bevorzugt `--interactive`, wenn du gleich klicken oder tippen willst.

## Was eine Aktion verändert hat

In einer Web-Session gibt `open` den interaktiven Snapshot der geöffneten Seite aus, und jede Aktion, die die Seite verändern kann (`click`, `fill`, `type`, `press`, `select`, `check`, `navigate`, `frame`, …), meldet, was sich geändert hat:

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

Wenn die Aktion einen Tab geöffnet hat, wird das im Bericht angegeben (`Opened a new tab [1]: https://…`); die Session bleibt auf dem aktuellen Tab, bis du `tabs switch` ausführst. Wenn die Seite statt der eigentlichen Website eine Bot-Prüfung ist (Cloudflare, DataDome, Akamai, …), meldet der Bericht auch das, einmal pro Seite. Die Session versucht nicht, sie zu umgehen; in einem Headless-Browser schlägt sie vor, mit `--headed` erneut zu öffnen.

Auf derselben Seite erhältst du die neuen oder geänderten Zeilen mit ihren Refs, einschließlich nicht interaktiven Textes wie dem Status oben. Nach einer Navigation erhältst du die interaktiven Elemente der neuen Seite oder, bei einer großen Seite, eine einzeilige Zusammenfassung, die auf `find` verweist. Daher brauchst du nach einer Aktion selten einen separaten `snapshot`. Setze `WDIO_SESSION_CHANGES=0`, um den Bericht abzuschalten, und übergib `open --no-snapshot`, um den Snapshot nach `open` zu überspringen.

## Frames

In einer WebDriver-BiDi-Session zeigt der Snapshot den Inhalt der iframes der Seite, auch Cross-Origin-iframes, unterhalb des iframes, in dem er sich befindet:

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

Aktionen auf diesen Refs wechseln in den Frame, führen die Aktion aus und kehren zur Seite zurück, und der ausgegebene Code macht dasselbe. Es werden bis zu fünf iframes angezeigt, jeweils auf 300 Elemente gekürzt; `frame e4` und `snapshot` zeigen einen gekürzten Frame vollständig an. iframes, die kleiner als 100 Quadratpixel sind, wie Tracking-Pixel, werden ausgelassen.

## Shadow DOM und klickbare Elemente ohne Rolle

Mit WebDriver BiDi deckt der Snapshot auch geschlossene Shadow Roots ab, und Elemente, die nur einen Click-Listener haben (ein Icon, das mit `addEventListener` verknüpft ist), erhalten einen Ref. Ein solches Element hat keinen zugänglichen Namen, daher beschreibt der Snapshot es stattdessen:

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

Unter Android, iOS, macOS und Windows stammt der Snapshot aus dem Appium-Page-Source. Zwei Controls mit derselben Accessibility-ID bleiben getrennte Refs, wenn sich ihre übrigen Selektoren unterscheiden. `snapshot --scope e3` beschränkt den Baum auf diesen Ref.

## Wiederholte Controls

Wenn mehrere Controls dieselbe Rolle und denselben Namen haben, etwa der „Add to cart“-Button in jeder Zeile einer Produkttabelle, endet die Ref-Zeile mit `∈ "<text>"`, dem Text der Zeile, Karte oder des Listeneintrags, der dieses Control und kein anderes gleichen Namens enthält:

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

Der Text wird nach 80 Zeichen abgeschnitten. Ein Control, dessen Element eine Seiten-Landmark ist (ein „Sign in“-Link sowohl im Header als auch im Footer), erhält keinen. Das Label eines sichtbaren Formular-Controls wird nicht aufgeführt: Das Control trägt den Namen.

## Native Taps

Web-Sessions verwenden `click`. Mobile und native Desktop-Sessions verwenden `tap` auf demselben Ref:

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## Fehlerbehebung

| Meldung | Was zu tun ist |
| --- | --- |
| `REF_STALE` | Das Element aus dem letzten Snapshot ist nicht mehr vorhanden. Führe `snapshot` aus und verwende einen neuen Ref. |
| `REF_NOT_FOUND` | Diese ID gab es in dieser Session nie. Der Ref in deinem Befehl passt nicht zum neuesten Snapshot. |
| `NO_MATCH` | `find` hat diesen Text nicht gefunden. Erstelle einen Snapshot und lies die Namen, die tatsächlich vorhanden sind. |
| `NOT_EDITABLE` | Das Ziel von `fill` ist kein bearbeitbares Feld und enthält kein einzelnes bearbeitbares Feld (auch nicht hinter `aria-controls`/`aria-owns`/Label). Führe `snapshot --scope <target>` aus und befülle den Ref des Feldes. |

## Nächste Schritte

- [Code ausführen](/docs/session/exec) — Assertions und Schritte, die mehr als ein Befehl sind
- [Befehle](/docs/session-commands) — Flags für `snapshot`, `find`, `diff`, `screenshot` und `source`