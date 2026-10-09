---
id: export
title: Eine Session als Test exportieren
description: Verwandeln Sie die Schritte, die Sie in wdio session ausgeführt haben, in eine Spec, Page Objects und benutzerdefinierte Befehle.
---

`export` schreibt eine Spec aus den aufgezeichneten Schritten. Refs werden durch stabile Selektoren ersetzt. Bei einer Webseite wird der erste der folgenden Selektoren verwendet, der genau auf ein Element zutrifft: eine Test-ID (`data-testid`, `data-test`, `data-qa`), ein [Rollen-Selektor](/docs/selectors#role-selector) wie `role/button[name="Add to cart"]`, ein zugänglicher Name (`aria/Add to cart`), eine ID, der Text eines Buttons oder Links, ein Formularfeldname und schließlich ein CSS-Pfad.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` gibt die Schritte aus, bevor Sie exportieren. `history clear` verwirft sie.

## Page Objects

`--page-objects` schreibt ein Page Object neben die Spec. Selektoren werden nach dem Pfad gruppiert, auf dem sie ausgeführt wurden. Ein literales `$('…')` in einem aufgezeichneten Schritt wird zu einem Getter. `$$`, Strings, die zufällig `$('…')` enthalten, und ein dynamisches `$(selector)` bleiben unverändert.

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

Der Befehl weigert sich, ein Page Object zu überschreiben, das bereits im Ausgabeverzeichnis vorhanden ist. Ändern Sie `--out` oder entfernen Sie diese Datei zuerst. Die Spec-Datei selbst wird erneut geschrieben.

Ein `import` am Anfang eines `exec`-Schritts wird an den Anfang der Spec verschoben, außerhalb der Testfunktion.

## Helpers

Fügen Sie eine Datei unter `.wdio/helpers/` hinzu, wenn ein Schritt für `exec` zu lang ist. Jede Datei exportiert standardmäßig eine Funktion, die den Browser erhält und mit `addCommand` Befehle registriert. Relative Importe bleiben relativ zu dieser Datei. Reine Paket-Importe werden vom Projekt aus aufgelöst.

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

Helpers werden geladen, wenn die Session geöffnet wird, und erneut mit `npx wdio session helpers --reload`. Wenn `.wdio/helpers` noch nicht existiert, überwacht die Session, ob es angelegt wird. Helpers werden im exportierten Test zu benutzerdefinierten Befehlen.

## Nächste Schritte

- [Code ausführen](/docs/session/exec) — die Schritte, die `export` aufzeichnet
- [Befehle](/docs/session-commands) — Flags für `export`, `history` und `helpers`