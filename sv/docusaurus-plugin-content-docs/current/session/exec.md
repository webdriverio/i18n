---
id: exec
title: Kör kod i en session
description: Kör WebdriverIO-kod och assertions i en aktiv wdio-session med exec.
---

`exec` kör WebdriverIO-kod i den öppna sessionen. Använd det när ett steg är mer än ett enskilt `click` eller `fill`, och för varje assertion.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Använd alltid `await` med kommandon. `$` returnerar ett element och kastar ett fel när det saknas. `$$` returnerar en lista. Det finns inget synkront läge och inget `browser.element`.

Namn som du deklarerar förblir tillgängliga i nästa `exec`. En `import` på toppnivå laddas från projektkatalogen.

## Assertions

Lägg assertions i `exec` med `expect-webdriverio`. Installera det i ditt projekt. Utan det misslyckas `expect(...)` med en installationsanvisning.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

Använd `visual check <tag>` när frågan gäller hur skärmen ser ut. Det kommandot kräver `@wdio/visual-service`:

```sh
npx wdio session visual check cart
```

`visual accept cart` kopierar den senaste faktiska bilden för den taggen över baslinjen. Den kopierar inte äldre bilder som delar taggprefixet.

## När du ska använda en genväg i stället

`click`, `fill`, `type`, `press` och `tap` är kortare än `exec` för en enskild interaktion, och de skriver ut den WebdriverIO-rad de körde. Använd hellre dessa med en ref från den senaste [snapshoten](/docs/session/snapshots). Använd `exec` för väntan, assertions och allt som kräver mer än ett kommando.

## Nästa steg

- [Exportera ett test](/docs/session/export) — spara stegen, inklusive `exec`
- [Kommandon](/docs/session-commands) — flaggor för `exec` och `visual`