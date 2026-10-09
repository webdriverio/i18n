---
id: session
title: wdio session
description: Styr en webbläsare, mobilapp eller skrivbordsapp från skalet med korta wdio session-kommandon och exportera sedan stegen som ett test.
---

`wdio session` håller en WebdriverIO-session vid liv över många korta skalkommandon. Använd det för att utforska ett gränssnitt, kontrollera en ändring och omvandla de steg som fungerade till ett test. Det är en del av `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

Sessionen heter `default`. Ange `-s <name>` endast när du behöver två sessioner samtidigt. Sidan [targets](/docs/session/targets) styr en Expo-testapp i ett synligt Chrome-fönster och i ett Electron-fönster, båda i skrivbordsstorlek. Android- och iOS-kommandon för samma app finns på den sidan.

## Installation

`wdio session` är en del av WebdriverIO CLI. `npx wdio` installerar det oscopade paketet [`wdio`](https://www.npmjs.com/package/wdio) och kör det CLI:t. Du installerar inte `@wdio/session` själv.

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` skriver ut arbetsflödet, åtgärderna grupperade, globala flaggor och avslutningskoder. `<action> --help` skriver ut åtgärdens argument, flaggor, plattformar, exempel och relaterade åtgärder. Samma text finns på sidan [commands](/docs/session-commands). Agentfärdigheten innehåller bara kärnloopen och hänvisar agenter till `--help` för resten, så att den inte blir inaktuell när CLI:t ändras.

Skapa ett projekt med:

```sh
npm init wdio@latest
```

Acceptera "Set up coding agent support" för att skriva `.agents/skills/wdio-session/SKILL.md`, ett avsnitt i `AGENTS.md` och en `.wdio/session/`-post i gitignore. Installera färdigheten senare med:

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` kontrollerar Node.js, webbläsaren, Appium, SDK:er och molnautentiseringsuppgifter. `doctor <target>` kontrollerar endast det som det målet behöver. Processen avslutas med 1 när en kontroll misslyckas.

## Öppna en sida och interagera med den

Öppna headless Chrome (lägg till `--headed` för att visa fönstret). `open` skriver ut sidans interaktiva element:

```sh
npx wdio session open chrome http://localhost:3000
```

Ett element ser ut som `button "Add to cart" [ref=e3]`. Använd den ref:en. Varje åtgärd rapporterar vad den ändrade på sidan, med refs för nya element, så du behöver sällan en separat `snapshot`:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`, `open edge` och `open safari` tar samma URL. Chrome, Firefox och Edge laddas ned vid första användningen om de inte är installerade. Safari kräver macOS.

### Android

Android och iOS körs via Appium 3. `doctor android` rapporterar en saknad server eller drivrutin tillsammans med installationskommandot.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Inbyggt skrivbord: `open macos --bundle-id com.example.shop` och `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` och `open dioxus ./my-app` kräver att deras drivrutin finns i `PATH`. På Linux utan `DISPLAY` eller `WAYLAND_DISPLAY`, installera Xvfb eller weston.

## Observation och refs

| Kommando | Använd det för |
| --- | --- |
| `snapshot --interactive` | Elementen du kan interagera med, var och en med en ref |
| `snapshot --compact` | Samma träd med namnlösa tomma omslutande element borttagna |
| `snapshot --urls` | Länkadresser på varje länk |
| `find "Add to cart"` | En rad från en ny ögonblicksbild |
| `diff` | Vad som ändrats sedan föregående ögonblicksbild |
| `screenshot` | Layout. Hoppa över det när en ögonblicksbild besvarar frågan |
| `pdf` | En PDF av den aktuella sidan (`pdf report.pdf`). BiDi-sessioner skriver ut både med och utan synligt fönster |
| `source` | Sidans HTML eller den inbyggda XML:en |

Refs kommer från den senaste ögonblicksbilden. Ta en ny ögonblicksbild efter navigering. En gammal ref misslyckas med `REF_STALE`. En okänd ref misslyckas med `REF_NOT_FOUND`.

## `exec`

`exec` kör WebdriverIO-kod. Använd alltid `await` för kommandon. `$` returnerar ett element och kastar ett fel när det saknas. Det finns inget synkront läge och ingen `browser.element`.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Lägg assertions i `exec` med `expect-webdriverio`. Använd `visual check <tag>` (kräver `@wdio/visual-service`) när frågan gäller hur skärmen ser ut.

## Export

`export` skriver en spec utifrån de inspelade stegen. Refs ersätts med stabila selektorer.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`, `open edge` och `open safari` tar samma URL. Andra mål, ögonblicksbilder, `exec`, export och en pausad testkörning beskrivs på separata sidor i detta avsnitt.

## Detta avsnitt

| Sida | Använd den för |
| --- | --- |
| [Targets](/docs/session/targets) | Webbläsare, Android, iOS, skrivbord, Electron, Tauri, Dioxus och molnenheter, inklusive demoappen i Chrome, Android och Electron |
| [Snapshots and refs](/docs/session/snapshots) | Vad som visas på skärmen och de refs du klickar på |
| [Run code](/docs/session/exec) | `exec`, assertions och visuella kontroller |
| [Export a test](/docs/session/export) | Specs, page objects och `.wdio/helpers` |
| [Debug a test](/docs/session/debug) | `wdio run --debug=agent` och `wdio repl --session` |
| [Commands](/docs/session-commands) | Alla åtgärder och flaggor |

## Felsökning

| Meddelande | Vad du ska göra |
| --- | --- |
| `SESSION_EXISTS` | Namnet körs redan. Använd `-s` med ett annat namn, eller `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | Kör `snapshot` igen och använd en ref från den utdatan. |
| `NOT_EDITABLE` | Målet för `fill` är inte ett redigerbart fält och innehåller inget enskilt redigerbart fält (eller bakom `aria-controls`/`aria-owns`/etikett). Kör `snapshot --scope <target>` och fyll i fältets ref. |
| `MISSING_DEPENDENCY` | Installera paketet som nämns i felet, eller kör `wdio session doctor <target>`. |
| `MISSING_APPIUM_DRIVER` | Kör raden `npx appium driver install …` från felet. |
| `MISSING_CREDENTIALS` | Exportera de namngivna variablerna. Doctor skriver aldrig ut deras värden. |
| `Session closed from wdio session` | Felsökningssessionen stängdes. Återuppta i stället för att stänga när testet ska fortsätta. |

Avslutningskoder: 0 lyckat, 1 åtgärden misslyckades, 2 felaktig användning, 3 ett saknat beroende eller saknade autentiseringsuppgifter, 4 ingen session med det namnet.

## Nästa steg

- [Targets](/docs/session/targets) — öppna en webbläsare, en Android- eller iOS-app eller ett Electron-fönster
- [WebdriverIO for Coding Agents](/docs/ai-agents) — färdighet, dokumentation och projektregler
- [wdio session commands](/docs/session-commands) — alla åtgärder och flaggor