---
id: export
title: Exportera en session som ett test
description: Gör om stegen du körde i wdio session till en spec, page objects och anpassade kommandon.
---

`export` skriver en spec utifrån de inspelade stegen. Referenser ersätts med stabila selektorer. För en webbsida används den första av följande som matchar exakt ett element: ett test-id (`data-testid`, `data-test`, `data-qa`), en [rollselektor](/docs/selectors#role-selector) som `role/button[name="Add to cart"]`, ett tillgängligt namn (`aria/Add to cart`), ett id, texten på en knapp eller länk, namnet på ett formulärfält och slutligen en CSS-sökväg.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` skriver ut stegen innan du exporterar. `history clear` tar bort dem.

## Page objects

`--page-objects` skriver ett page object bredvid specen. Selektorer grupperas efter den sökväg de kördes på. En litteral `$('…')` i ett inspelat steg blir en getter. `$$`, strängar som råkar innehålla `$('…')` och en dynamisk `$(selector)` lämnas som de är.

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

Kommandot vägrar att skriva över ett page object som redan finns i utdatakatalogen. Flytta `--out` eller ta bort den filen först. Själva spec-filen skrivs om.

En `import` högst upp i ett `exec`-steg lyfts upp till toppen av specen, utanför testfunktionen.

## Hjälpfunktioner

Lägg till en fil under `.wdio/helpers/` när ett steg är för långt för `exec`. Varje fil exporterar som standard en funktion som tar emot webbläsaren och registrerar kommandon med `addCommand`. Relativa importer förblir relativa till den filen. Rena paketimporter löses från projektet.

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

Hjälpfunktioner laddas när sessionen öppnas och på nytt med `npx wdio session helpers --reload`. Om `.wdio/helpers` inte finns ännu bevakar sessionen när den skapas. Hjälpfunktioner blir anpassade kommandon i det exporterade testet.

## Nästa steg

- [Kör kod](/docs/session/exec) — stegen som `export` spelar in
- [Kommandon](/docs/session-commands) — flaggor för `export`, `history` och `helpers`