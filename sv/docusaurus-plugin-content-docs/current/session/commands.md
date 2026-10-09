---
id: session-commands
title: wdio session-kommandon
description: Varje wdio session-åtgärd och flagga, från open till doctor och skill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

Varje `wdio session`-åtgärd. Globala flaggor gäller för alla. Samma text skrivs ut av `npx wdio session <action> --help`. Resten av avsnittet [WebdriverIO Session](/docs/session) täcker [mål](/docs/session/targets), [ögonblicksbilder](/docs/session/snapshots), [`exec`](/docs/session/exec), [export](/docs/session/export) och [felsökning](/docs/session/debug).

```sh
npx wdio session <action> [arguments] [flags]
```

## Globala flaggor

| Flagga | Beskrivning |
| --- | --- |
| `-s, --session` | Sessionsnamn (env WDIO_SESSION, standard "default") |
| `--json` | Skriv ut ett JSON-objekt (env WDIO_SESSION_JSON=1) |
| `--timeout` | Tidsgräns för begäran i ms (max 60000 utom för wait) |
| `-q, --quiet` | Skriv inte ut något vid framgång förutom begärd data |
| `--color` | Använd --no-color för att inaktivera färger |

Slutkoder: 0 framgång, 1 åtgärden eller din kod misslyckades, 2 användningsfel, 3 saknat beroende eller saknade inloggningsuppgifter, 4 ingen session med det namnet.

## `open`

Starta en session: webbläsare, android, ios, macos, windows, electron, tauri, dioxus eller en wdio-konfigurationsfil.

Startar en daemon i bakgrunden som håller sessionen vid liv tills `close`, eller tills den har varit inaktiv under --idle-timeout (standard 30m). Webbläsare körs headless om du inte anger --headed. Skriver ut sessionsnamnet, målet, artefaktkatalogen där ögonblicksbilder, skärmdumpar och exporter hamnar, och för en webbläsare som öppnats på en URL den interaktiva ögonblicksbilden av sidan.

En session per namn. Att öppna ett namn som redan körs misslyckas; använd den, stäng den eller ange --replace. Ange `-s <name>` endast när du behöver två sessioner samtidigt.

```sh
npx wdio session open <target> [url]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | nej | URL att öppna (webbläsare), appsökväg (skrivbordsappar) eller capability (konfiguration) |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--replace` | Stäng först en körande session med samma namn |
| `--launch-timeout <n>` | Millisekunder att vänta på att sessionen blir redo |
| `--idle-timeout <value>` | Stäng av efter så här lång tid utan begäranden (t.ex. 30m, 0 inaktiverar) |
| `--capabilities <value>` | Extra capabilities som JSON eller en sökväg till en JSON-fil |
| `--hostname <value>` | Fjärrvärd för WebDriver |
| `--port <n>` | Fjärrport för WebDriver |
| `--path <value>` | Fjärrsökväg för WebDriver |
| `--protocol <value>` | Fjärrprotokoll för WebDriver |
| `--log-level <value>` | WebdriverIO-loggnivå som skrivs till daemon.log |
| `--bidi` | Begär WebDriver BiDi (använd --no-bidi för att inaktivera) |
| `--headed` | Visa webbläsarfönstret |
| `--headless` | Kör utan fönster (standard för webbläsare; åsidosätter --headed) |
| `--snapshot` | Skriv ut den interaktiva ögonblicksbilden av den öppnade sidan (använd --no-snapshot för att hoppa över) |
| `--viewport <value>` | Initial viewport, t.ex. 1280x720 |
| `--browser-version <value>` | Webbläsarversion |
| `--binary <value>` | Webbläsarbinär |
| `--arg <value>` | Extra webbläsarargument. Ett värde som börjar med `-` behöver `=`, t.ex. `--arg=--disable-gpu` (kan upprepas) |
| `--profile <value>` | Beständig profilkatalog |
| `--attach <value>` | Anslut till en körande Chrome/Edge (felsökningsport eller URL) |
| `--app <value>` | Appfil eller app-URL i molnet |
| `--package <value>` | Android-apppaket |
| `--activity <value>` | Android-appaktivitet |
| `--bundle-id <value>` | iOS/macOS-bundle-id |
| `--browser <value>` | Mobil webbläsare (chrome, safari) |
| `--device <value>` | Enhetsnamn |
| `--platform-version <value>` | Plattformsversion |
| `--udid <value>` | Enhetens UDID |
| `--reset` | Använd --no-reset för att behålla apptillståndet (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | Initial orientering |
| `--appium-url <value>` | Använd en körande Appium-server |
| `--app-arg <value>` | Argument som skickas till en skrivbordsapp. Ett värde som börjar med `-` behöver `=`, t.ex. `--app-arg=--no-sandbox` (kan upprepas) |
| `--chromedriver <value>` | Electron: Chromedriver-binär |
| `--electron-version <value>` | Electron: åsidosätt versionsidentifiering |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | Molnleverantör |
| `--os <value>` | Moln: skrivbords-OS |
| `--os-version <value>` | Moln: version av skrivbords-OS |
| `--region <value>` | Moln: Sauce Labs-region |
| `--tunnel <value>` | Moln: starta leverantörens tunnel (eller "external") |
| `--tunnel-name <value>` | Moln: tunnelidentifierare |
| `--project <value>` | Moln: projektetikett |
| `--build <value>` | Moln: build-etikett |
| `--name <value>` | Moln: etikett för sessionsnamn |

**Exempel**

```sh
# Öppna headless Chrome på en lokal app
npx wdio session open chrome http://localhost:3000

# Öppna Firefox med ett synligt fönster
npx wdio session open firefox http://localhost:3000 --headed

# Öppna en Android-app via Appium
npx wdio session open android --app ./app.apk

# Öppna en installerad iOS-app
npx wdio session open ios --bundle-id com.example.shop

# Öppna en Electron-app
npx wdio session open electron ./main.js

# Öppna den första capabilityn i en konfiguration
npx wdio session open ./wdio.conf.ts 0

# Öppna Chrome i ett molngrid
npx wdio session open chrome https://example.com --provider browserstack
```

Se även: [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor).

## `close`

Avsluta sessionen och stoppa dess daemon.

På en session som öppnats av `wdio run --debug=agent` får detta det pausade testet att misslyckas; använd `resume` för att låta det fortsätta.

```sh
npx wdio session close
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--all` | Stäng alla sessioner |
| `--clean` | Ta även bort artefaktkatalogen |

**Exempel**

```sh
# Stäng standardsessionen
npx wdio session close

# Stäng alla sessioner och ta bort deras artefakter
npx wdio session close --all --clean
```

Se även: [`open`](#open), [`list`](#list).

## `list`

Lista körande sessioner.

Skriver ut en rad per session: namn, mål, URL och ålder. Tar bort tillstånd som lämnats kvar av sessioner som har dött.

```sh
npx wdio session list
```

**Exempel**

```sh
# Visa alla körande sessioner
npx wdio session list
```

Se även: [`info`](#info), [`status`](#status).

## `info`

Visa sessionsdetaljer.

Skriver ut målet, webbläsaren och versionen, BiDi-stöd, artefaktkatalogen samt aktuell URL, titel, fönsterstorlek och frame (webb) eller kontext och aktivitet (mobil).

```sh
npx wdio session info
```

**Exempel**

```sh
# Visa var sessionen är och vad den kör
npx wdio session info
```

Se även: [`list`](#list), [`get`](#get).

## `restart`

Stäng och öppna igen med samma mål och flaggor.

Behåller den inspelade historiken, så `export` täcker fortfarande stegen från före omstarten.

```sh
npx wdio session restart
```

**Exempel**

```sh
# Börja om med en ny webbläsare
npx wdio session restart
```

Se även: [`open`](#open), [`close`](#close).

## `status`

Avsluta med 0 om sessionen körs, 4 om den inte gör det.

```sh
npx wdio session status
```

**Exempel**

```sh
# Öppna en session endast när ingen körs
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

Se även: [`list`](#list), [`open`](#open).

## `exec`

Kör WebdriverIO-kod från stdin, -e eller en fil.

Körs som en asynkron funktion med `browser`, `$`, `$$`, `expect` och `ref('e3')` i scope. Variabler på toppnivå består mellan anrop. `wdio session` utan en åtgärd kör `exec` när kod skickas via stdin.

Använd alltid `await` på kommandon. `$` returnerar exakt ett element och kastar StrictSelectorError när fler än ett matchar. Föredra en enskild åtgärd (click, fill, …) när en sådan räcker; använd `exec` för loopar, villkor och assertions.

```sh
npx wdio session exec [file]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `file` | nej | Skriptfil (.js, .ts, .mjs) |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `-e, --eval <value>` | Kod att köra |
| `--history` | Spela in koden i historiken (använd --no-history för att hoppa över) |

**Exempel**

```sh
# Kör en enradare
npx wdio session exec -e "await browser.getTitle()"

# Gör en assertion på sidan (enkla citattecken håller skalet borta från $)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# Skicka flera steg via stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# Kör en skriptfil
npx wdio session exec ./scripts/login.ts
```

Se även: [`helpers`](#helpers), [`history`](#history), [`export`](#export).

## `helpers`

Lista projekthjälpare från .wdio/helpers.

Varje fil under .wdio/helpers default-exporterar en funktion som tar emot browser och registrerar anpassade kommandon med addCommand. Hjälpare laddas när sessionen öppnas, och de blir anpassade kommandon i det exporterade testet.

```sh
npx wdio session helpers
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--reload` | Importera hjälparna på nytt |

**Exempel**

```sh
# Lista hjälpare och de kommandon de lägger till
npx wdio session helpers

# Plocka upp ändringar i en hjälpare
npx wdio session helpers --reload
```

Se även: [`exec`](#exec), [`export`](#export).

## `snapshot`

Tillgänglighetsögonblicksbild med refs. Gäller webb, native mobil, native skrivbord.

Skriver ut tillgänglighetsträdet, en nod per rad, t.ex. `button "Add to cart" [ref=e3]`. Skicka en ref till click, fill, get och de andra åtgärderna. Refs förblir giltiga så länge elementet finns; en åtgärd på ett borttaget element misslyckas med REF_STALE.

Varje ögonblicksbild skrivs till artefaktkatalogen. Utdata längre än --max-chars skrivs ut i delar: den första delen, sedan `--offset <line>` för nästa. `find` söker i allt.

Textlayouten och --json-formatet är experimentella och kan ändras i en mindre version. Ref-syntaxen och de åtgärder som tar en ref förblir stabila.

```sh
npx wdio session snapshot
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--depth <n>` | Maximalt djup |
| `--scope <value>` | Ta endast ögonblicksbild under denna ref eller selektor |
| `-i, --interactive` | Endast interaktiva element |
| `--all` | Inkludera dolda element |
| `--boxes` | Lägg till begränsningsrutor |
| `--viewport` | Endast det som finns i viewporten (webb: uppdaterar inte diff-baslinjen) |
| `--selectors` | Avsluta varje ref-rad med dess bästa selektor |
| `--compact` | Utelämna namnlösa noder som saknar innehåll |
| `-u, --urls` | Inkludera länkars href |
| `--file-only` | Skriv endast filen |
| `--max-chars <n>` | Skriv ut upp till så här många tecken åt gången (standard 8000) |
| `--offset <n>` | Skriv ut från denna rad och framåt, för nästa del av en lång ögonblicksbild |

**Exempel**

```sh
# Endast interaktiva element, den vanliga första överblicken
npx wdio session snapshot -i

# Hela sidan med länkmål
npx wdio session snapshot --compact --urls

# Endast en del av sidan
npx wdio session snapshot --scope "#checkout" --depth 4

# Det som syns på skärmen nu
npx wdio session snapshot --viewport -i

# Varje ref med en selektor att använda i ett test
npx wdio session snapshot --selectors -i

# Agera, titta sedan igen
npx wdio session click e3 && npx wdio session snapshot -i
```

Se även: [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot).

## `read`

Läs sidtexten som Markdown. Gäller webb.

Rubriker, stycken, listobjekt, tabellrader och länkar med deras URL, från huvudinnehållet när sidan markerar det (main, article), annars hela sidan; navigering, sidfötter och dold text utelämnas. Kapas vid --max-chars (standard 6000); kapningen anger vilken --offset som läser nästa del. Med --scope rullas avsnittet in i vyn. Använd det för att besvara "vad står det på sidan"; använd snapshot eller find för refs att agera på.

```sh
npx wdio session read
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--scope <value>` | Läs endast under denna ref eller selektor |
| `--max-chars <n>` | Skriv ut upp till så här många tecken (standard 6000) |
| `--offset <n>` | Börja vid detta tecken i texten, för nästa del av en lång sida |

**Exempel**

```sh
# Läs huvudinnehållet
npx wdio session read

# Läs ett avsnitt
npx wdio session read --scope e12
```

Se även: [`find`](#find), [`snapshot`](#snapshot), [`get`](#get).

## `find`

Sök efter text i en ny ögonblicksbild. Gäller webb, native mobil, native skrivbord.

Tar en ny ögonblicksbild och skriver ut varje träff med noden runt den (t.ex. hela listobjektet, så att ett värde bredvid träffen inkluderas), med radnummer och refs, och rullar den första träffen in i vyn. Matchningen ignorerar skiftläge, sedan mellanslag ("SO2" hittar "SO 2"), och letar sedan efter alla ord och efter liknande ord. Text som bara finns i dolda delar av sidan (stängda menyer, flikar, "Visa mer") listas som sådan. Billigare än att läsa en hel ögonblicksbild av en stor sida. -A/-B/-C skriver istället ut vanlig radkontext, som grep.

```sh
npx wdio session find <text>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `text` | ja | Text att söka efter |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--regex` | Behandla texten som ett reguljärt uttryck |
| `--scope <value>` | Sök endast under denna ref eller selektor |
| `-C, --context <n>` | Rader med kontext före och efter istället för den omgivande noden |
| `-A, --after-context <n>` | Rader med kontext efter varje träff |
| `-B, --before-context <n>` | Rader med kontext före varje träff |
| `--offset <n>` | Hoppa över så här många träffar, för nästa träffar när utdata kapas |

**Exempel**

```sh
# Hitta ref för en knapp
npx wdio session find "Add to cart"

# Lista alla länkar
npx wdio session find "^\s*link" --regex --context 0
```

Se även: [`snapshot`](#snapshot), [`wait`](#wait).

## `diff`

Jämför en ny ögonblicksbild med den föregående. Gäller webb, native mobil, native skrivbord.

Skriver ut en unified diff av vad som ändrats sedan den senaste ögonblicksbilden, eller "No changes". Det första anropet sparar en baslinje. Använd det efter en åtgärd för att se vad åtgärden gjorde utan att läsa hela sidan igen. På webben är baslinjen den senaste ögonblicksbilden som togs utan `--viewport`.

```sh
npx wdio session diff
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--baseline <value>` | Ögonblicksbildsfil att jämföra med |
| `--scope <value>` | Ta endast ögonblicksbild inom denna ref eller selektor, som `snapshot --scope` |
| `--interactive` | Endast interaktiva element, som `snapshot -i` |

**Exempel**

```sh
# Se vad ett klick ändrade
npx wdio session click e7 && npx wdio session diff

# Jämför med en sparad ögonblicksbild
npx wdio session diff --baseline before.yml
```

Se även: [`snapshot`](#snapshot), [`find`](#find).

## `screenshot`

Spara en PNG av viewporten, ett element eller hela sidan. Gäller webb, native mobil, native skrivbord.

Skriver ut filsökvägen och bildstorleken. Ta en skärmdump när frågan gäller layout eller utseende; läs text och tillstånd med `snapshot` och `get`.

```sh
npx wdio session screenshot [target]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | nej | Ref eller selektor för elementet som ska fångas |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--full` | Hela sidan (webb) |
| `--path <value>` | Utdatafil |

**Exempel**

```sh
# Fånga viewporten
npx wdio session screenshot

# Fånga ett element
npx wdio session screenshot e5 --path card.png

# Fånga hela sidan
npx wdio session screenshot --full
```

Se även: [`visual`](#visual), [`pdf`](#pdf), [`snapshot`](#snapshot).

## `pdf`

Spara den aktuella sidan som PDF. Gäller webb.

Anropar `browser.savePDF`. En BiDi-session skriver ut med `browsingContext.print`, headed eller headless, i Chrome, Edge och Firefox. En Classic-session använder `printPage`, som äldre Chrome endast stöder i headless-läge.

```sh
npx wdio session pdf [file]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `file` | nej | Utdatafil (måste sluta på .pdf) |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--path <value>` | Utdatafil (måste sluta på .pdf) |

**Exempel**

```sh
# Skriv report.pdf i den aktuella katalogen
npx wdio session pdf report.pdf
```

Se även: [`screenshot`](#screenshot).

## `source`

Spara sidans HTML eller appens XML. Gäller webb, native mobil, native skrivbord.

Skriver filen och skriver ut dess sökväg och storlek. Använd det när en ögonblicksbild döljer det du behöver, till exempel attribut för en selektor.

```sh
npx wdio session source
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--path <value>` | Utdatafil |

**Exempel**

```sh
# Spara HTML:en i den aktuella katalogen
npx wdio session source --path page.html
```

Se även: [`snapshot`](#snapshot), [`get`](#get).

## `get`

Läs text, html, värde, ett attribut, titeln, URL:en, ett antal eller en ruta. Gäller webb.

Skriver ut värdet och sedan WebdriverIO-koden som kördes (`→ …`). Ange -q för att endast skriva ut värdet, t.ex. för att fånga det i en skalvariabel. Läs ett värde innan du skriver en assertion för det.

```sh
npx wdio session get <sub> [target] [name]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | nej | Ref eller selektor (används inte för title och url) |
| `name` | nej | Attributnamn (endast attr) |

**Exempel**

```sh
# Text för en ref
npx wdio session get text e1

# Aktuell URL
npx wdio session get url

# Endast värdet, för en skalvariabel
url=$(npx wdio session get url -q)

# href för en länk
npx wdio session get attr e3 href

# Hur många element som matchar
npx wdio session get count "aria/Remove"
```

Se även: [`is`](#is), [`wait`](#wait), [`exec`](#exec).

## `is`

Kontrollera om ett element är synligt, aktiverat eller markerat. Gäller webb.

Skriver ut true eller false och sedan WebdriverIO-koden som kördes; ange -q för att endast skriva ut värdet. Slutkoden är 0 i båda fallen.

```sh
npx wdio session is <sub> <target>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | visible \| enabled \| checked |
| `target` | ja | Ref eller selektor |

**Exempel**

```sh
# Skriv ut true eller false
npx wdio session is visible e1

# Kontrollera en knapp via dess etikett
npx wdio session is enabled "aria/Place order"
```

Se även: [`get`](#get), [`wait`](#wait).

## `logs`

Skriv ut konsol-, sidfels-, nätverks- och enhetsloggar sedan det senaste anropet. Gäller webb, native mobil.

Varje anrop flyttar fram en läsmarkör, så nästa anrop visar endast nya poster. Kör det efter en åtgärd för att se de fel som åtgärden orsakade.

```sh
npx wdio session logs
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--errors` | Endast fel |
| `--network` | Endast nätverksposter |
| `--since <value>` | Endast poster nyare än denna varaktighet (t.ex. 30s) |
| `--peek` | Flytta inte fram läsmarkören |
| `--source <browser\|driver\|logcat\|syslog\|main>` | Loggkälla |

**Exempel**

```sh
# Fel orsakade av ett klick
npx wdio session click e4 && npx wdio session logs --errors

# Senaste poster, behåll dem till nästa anrop
npx wdio session logs --since 30s --peek
```

Se även: [`requests`](#requests).

## `navigate`

Öppna en URL. Gäller webb.

Accepterar `example.com`, fullständiga URL:er och sökvägar relativa till baseUrl. Lämnar först eventuell frame. Skriver ut den nya URL:en och titeln.

```sh
npx wdio session navigate <url>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `url` | ja | URL (relativa URL:er använder baseUrl) |

**Exempel**

```sh
# Gå till en sida och titta på den
npx wdio session navigate /cart && npx wdio session snapshot -i

# Öppna en annan webbplats
npx wdio session navigate example.com
```

Se även: [`back`](#back), [`reload`](#reload), [`wait`](#wait).

## `back`

Gå tillbaka. Gäller webb.

```sh
npx wdio session back
```

**Exempel**

```sh
# Gå tillbaka en sida
npx wdio session back
```

Se även: [`forward`](#forward), [`navigate`](#navigate).

## `forward`

Gå framåt. Gäller webb.

```sh
npx wdio session forward
```

**Exempel**

```sh
# Gå framåt en sida
npx wdio session forward
```

Se även: [`back`](#back), [`navigate`](#navigate).

## `reload`

Ladda om sidan. Gäller webb.

```sh
npx wdio session reload
```

**Exempel**

```sh
# Ladda om och vänta tills nätverket är tyst
npx wdio session reload && npx wdio session wait --load networkidle
```

Se även: [`navigate`](#navigate), [`wait`](#wait).

## `wait`

Vänta på ett element, en text, en URL, ett laddningstillstånd, ett villkor eller några millisekunder. Gäller webb.

Ange exakt ett av: en ref eller selektor, --text, --url, --load, --fn eller millisekunder. Misslyckas med slutkod 1 efter --limit.

Föredra ett villkor framför en paus, både här och framför `sleep` i en kedja. En paus längre än 30 sekunder nekas.

```sh
npx wdio session wait [target]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | nej | Ref, selektor eller millisekunder |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--text <value>` | Vänta tills sidan innehåller denna text |
| `--url <value>` | Vänta tills URL:en matchar (delsträng, eller * och ** globs) |
| `--load <value>` | domcontentloaded, load eller networkidle |
| `--fn <value>` | Vänta tills detta JavaScript-uttryck är sant |
| `--state <value>` | Med ett mål: visible (standard), hidden, enabled eller disabled |
| `--limit <n>` | Millisekunder att vänta (standard 10000) |

**Exempel**

```sh
# Vänta tills en ref är synlig
npx wdio session wait e1

# Vänta tills en spinner är borta
npx wdio session wait "aria/Loading" --state hidden

# Agera, vänta på resultatet, titta igen
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# Vänta på en URL
npx wdio session wait --url "**/dashboard"

# Vänta tills ingen begäran pågår
npx wdio session wait --load networkidle

# Pausa 500ms
npx wdio session wait 500
```

Se även: [`find`](#find), [`is`](#is), [`get`](#get).

## `click`

Klicka på ett element. Gäller webb, native mobil, native skrivbord.

Skriver ut vad som klickades på och, när klicket navigerade, den nya URL:en. Ta en ny ögonblicksbild innan du använder refs på nästa sida. Ett dolt eller täckt element misslyckas direkt med information om vad som är i vägen. `x,y` klickar på en punkt i viewporten (pixlar från övre vänstra hörnet, som i en skärmdump) för sådant som saknar ref, som en canvas eller karta.

```sh
npx wdio session click <target>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12), WebdriverIO-selektor eller x,y-koordinater i viewporten |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--double` | Dubbelklick |
| `--right` | Högerklick |
| `--new-tab` | Öppna länken i en ny flik och växla till den |

**Exempel**

```sh
# Klicka på en ref från den senaste ögonblicksbilden
npx wdio session click e3

# Klicka via tillgängligt namn
npx wdio session click "aria/Add to cart"

# Klicka, vänta, titta igen
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# Öppna en länk i en ny flik
npx wdio session click e8 --new-tab

# Klicka på en punkt i viewporten, t.ex. på en karta
npx wdio session click 320,480
```

Se även: [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot).

## `tap`

Tryck på ett element (mobil). Gäller native mobil.

```sh
npx wdio session tap <target>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12) eller WebdriverIO-selektor |

**Exempel**

```sh
# Tryck på en ref från den senaste ögonblicksbilden
npx wdio session tap e2
```

Se även: [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe).

## `fill`

Ersätt värdet i ett inmatningsfält. Gäller webb, native mobil, native skrivbord.

Rensar fältet först. För att skriva i det som har fokus, använd `type`; för att skicka tangenter som Enter, använd `press`.

```sh
npx wdio session fill <target> <text..>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12) eller WebdriverIO-selektor |
| `text` | ja | Text (ord efter målet sammanfogas med mellanslag) |

**Exempel**

```sh
# Fyll i ett fält
npx wdio session fill e2 ada@example.com

# Fyll i ett formulär och skicka det
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

Se även: [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check).

## `type`

Skriv i ett element eller i det fokuserade elementet. Gäller webb, native mobil, native skrivbord.

Skickar texten som tangenttryckningar utan att rensa något: `type e2 Ada` skriver i e2, `type Ada` i det som har fokus. För att ersätta ett värde, använd `fill`.

```sh
npx wdio session type <text..>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `text` | ja | Text (ord sammanfogas med mellanslag). Börja med en ref, t.ex. `type e2 Ada`, för att skriva i det elementet istället för det fokuserade |

**Exempel**

```sh
# Skriv i ett fält
npx wdio session type e5 hello

# Skriv i det som har fokus
npx wdio session focus e5 && npx wdio session type "hello"
```

Se även: [`fill`](#fill), [`press`](#press), [`focus`](#focus).

## `press`

Tryck på tangenter, t.ex. Enter, Control+a. Gäller webb, native skrivbord.

Kombinera tangenter med +. Namn är skiftlägesokänsliga; ctrl, cmd, esc, up, down, left och right accepteras som kortformer.

```sh
npx wdio session press <keys>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `keys` | ja | Tangentkombination |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--times <n>` | Tryck så här många gånger (upp till 100), t.ex. för att flytta ett reglage |

**Exempel**

```sh
# Skicka ett formulär
npx wdio session press Enter

# Flytta ett fokuserat reglage fem steg
npx wdio session press ArrowRight --times 5

# Markera allt
npx wdio session press Control+a

# Flytta tillbaka fokus
npx wdio session press Shift+Tab
```

Se även: [`type`](#type), [`fill`](#fill).

## `select`

Välj ett alternativ i en `<select>`. Gäller webb.

```sh
npx wdio session select <target> <value>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12) eller WebdriverIO-selektor |
| `value` | ja | Alternativets text, värde eller index |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--by <text\|value\|index>` | Hur alternativet matchas (standard text) |

**Exempel**

```sh
# Välj via synlig text
npx wdio session select e6 Germany

# Välj via värde
npx wdio session select e6 de --by value
```

Se även: [`fill`](#fill), [`check`](#check).

## `upload`

Ange en fil i ett filinmatningsfält. Gäller webb.

Sökvägen är relativ till din arbetskatalog. Rikta in dig på själva `<input type="file">`, inte på knappen som öppnar filväljaren.

```sh
npx wdio session upload <target> <file>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12) eller WebdriverIO-selektor |
| `file` | ja | Fil att ladda upp |

**Exempel**

```sh
# Bifoga en fil
npx wdio session upload e9 ./fixtures/avatar.png
```

Se även: [`fill`](#fill).

## `hover`

Flytta pekaren över ett element. Gäller webb, native skrivbord.

```sh
npx wdio session hover <target>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12) eller WebdriverIO-selektor |

**Exempel**

```sh
# Öppna en hovringsmeny och titta på den
npx wdio session hover e4 && npx wdio session snapshot -i
```

Se även: [`click`](#click).

## `focus`

Fokusera ett element. Gäller webb.

```sh
npx wdio session focus <target>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12) eller WebdriverIO-selektor |

**Exempel**

```sh
# Fokusera ett fält före `type`
npx wdio session focus e5
```

Se även: [`type`](#type), [`press`](#press).

## `check`

Markera en kryssruta eller alternativknapp. Gäller webb.

Gör ingenting när den redan är markerad, och misslyckas när den inte blir markerad.

```sh
npx wdio session check <target>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12) eller WebdriverIO-selektor |

**Exempel**

```sh
# Godkänn villkoren
npx wdio session check e7
```

Se även: [`uncheck`](#uncheck), [`is`](#is).

## `uncheck`

Avmarkera en kryssruta. Gäller webb.

Gör ingenting när den redan är avmarkerad. En vald alternativknapp kan inte avmarkeras.

```sh
npx wdio session uncheck <target>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12) eller WebdriverIO-selektor |

**Exempel**

```sh
# Avregistrera dig från nyhetsbrevet
npx wdio session uncheck e7
```

Se även: [`check`](#check), [`is`](#is).

## `drag`

Dra ett element till ett annat. Gäller webb, native mobil, native skrivbord.

```sh
npx wdio session drag <from> <to>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `from` | ja | Ref eller selektor att dra |
| `to` | ja | Ref eller selektor att släppa på |

**Exempel**

```sh
# Flytta ett kort till en annan kolumn
npx wdio session drag e3 e9
```

Se även: [`scroll`](#scroll).

## `scroll`

Rulla ett element in i vyn eller rulla sidan. Gäller webb.

Utan mål rullar den ner 600px. Lat-laddat innehåll dyker upp i nästa ögonblicksbild.

```sh
npx wdio session scroll [target]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | nej | Ref, selektor, up, down, top eller bottom |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--px <n>` | Pixlar för up/down (standard 600) |

**Exempel**

```sh
# Rulla in ett element i vyn
npx wdio session scroll e40

# Ladda fler resultat och titta på dem
npx wdio session scroll bottom && npx wdio session snapshot -i

# Rulla två skärmar
npx wdio session scroll down --px 1200
```

Se även: [`swipe`](#swipe), [`snapshot`](#snapshot).

## `swipe`

Svep på skärmen (mobil). Gäller native mobil.

```sh
npx wdio session swipe <direction>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `direction` | ja | up \| down \| left \| right |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--percent <n>` | Svepets längd 0..1 |

**Exempel**

```sh
# Rulla en lista och titta på den
npx wdio session swipe up && npx wdio session snapshot
```

Se även: [`scroll`](#scroll), [`tap`](#tap).

## `long-press`

Långtryck på ett element (mobil). Gäller native mobil.

```sh
npx wdio session long-press <target>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref (e12) eller WebdriverIO-selektor |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--duration <n>` | Millisekunder |

**Exempel**

```sh
# Öppna en snabbmeny
npx wdio session long-press e4 --duration 1500
```

Se även: [`tap`](#tap).

## `tabs`

Lista, öppna, växla eller stäng flikar. Gäller webb.

Utan underkommando listas flikarna med sitt index; den aktuella är markerad. `new` öppnar och växlar till en flik. `switch` och `close` tar ett index eller handle.

```sh
npx wdio session tabs [sub] [arg]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | nej | switch \| new \| close |
| `arg` | nej | Index, handle eller URL |

**Exempel**

```sh
# Lista flikar
npx wdio session tabs

# Öppna en flik
npx wdio session tabs new http://localhost:3000/help

# Gå tillbaka till den första fliken
npx wdio session tabs switch 0

# Stäng den andra fliken
npx wdio session tabs close 1
```

Se även: [`windows`](#windows), [`frame`](#frame).

## `windows`

Lista eller växla fönster. Gäller webb, native skrivbord.

```sh
npx wdio session windows [sub] [arg]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | nej | switch |
| `arg` | nej | Index eller handle |

**Exempel**

```sh
# Lista fönster
npx wdio session windows

# Växla till det andra fönstret
npx wdio session windows switch 1
```

Se även: [`tabs`](#tabs).

## `frame`

Växla in i en iframe, till föräldern eller till toppen. Gäller webb.

Sidans ögonblicksbild visar redan innehållet i dess iframes, med refs som åtgärder använder direkt, så `frame` behövs bara för att arbeta inuti en frame en stund eller för att se en frame som ögonblicksbilden kortade av. Ögonblicksbilder och åtgärder gäller den aktuella framen tills du växlar tillbaka. `navigate` återgår till toppdokumentet.

```sh
npx wdio session frame <target>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | ja | Ref, selektor, parent eller top |

**Exempel**

```sh
# Gå in i en iframe och titta inuti
npx wdio session frame e12 && npx wdio session snapshot -i

# Gå tillbaka till sidan
npx wdio session frame top
```

Se även: [`tabs`](#tabs), [`snapshot`](#snapshot).

## `contexts`

Lista eller växla native-/webview-kontexter. Gäller native mobil.

```sh
npx wdio session contexts [sub] [name]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | nej | switch |
| `name` | nej | Kontextnamn |

**Exempel**

```sh
# Lista NATIVE_APP- och WEBVIEW-kontexter
npx wdio session contexts

# Styr webviewen
npx wdio session contexts switch WEBVIEW_com.example.shop
```

Se även: [`snapshot`](#snapshot).

## `dialog`

Acceptera, avvisa eller rapportera en öppen dialog. Gäller webb, native mobil.

En öppen alert, confirm eller prompt blockerar andra åtgärder, som misslyckas med en uppmaning att köra detta.

```sh
npx wdio session dialog <sub>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | accept \| dismiss \| status |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--text <value>` | Prompttext (endast accept) |

**Exempel**

```sh
# Visa den öppna dialogen
npx wdio session dialog status

# Bekräfta
npx wdio session dialog accept

# Besvara en prompt
npx wdio session dialog accept --text "Ada"
```

Se även: [`click`](#click).

## `app`

Starta, avsluta, installera eller fråga efter en app. Gäller native mobil, native skrivbord.

```sh
npx wdio session app <sub> <id>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | launch \| terminate \| install \| state |
| `id` | ja | App-id, bundle-id eller fil |

**Exempel**

```sh
# Starta om appen
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# Körs den?
npx wdio session app state com.example.shop
```

Se även: [`deeplink`](#deeplink), [`background`](#background).

## `deeplink`

Öppna en djuplänk. Gäller native mobil.

```sh
npx wdio session deeplink <url>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `url` | ja | URL |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--package <value>` | Android-paket eller iOS-bundle-id |

**Exempel**

```sh
# Öppna en produktskärm
npx wdio session deeplink shop://product/42 --package com.example.shop
```

Se även: [`app`](#app).

## `rotate`

Rotera enheten. Gäller native mobil.

```sh
npx wdio session rotate <orientation>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `orientation` | ja | portrait \| landscape |

**Exempel**

```sh
# Vrid enheten på sidan
npx wdio session rotate landscape
```

## `keyboard`

Dölj skärmtangentbordet. Gäller native mobil.

```sh
npx wdio session keyboard <sub>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | hide |

**Exempel**

```sh
# Exponera elementen under tangentbordet
npx wdio session keyboard hide
```

## `background`

Skicka appen till bakgrunden. Gäller native mobil.

```sh
npx wdio session background <seconds>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `seconds` | ja | Sekunder (-1 behåller den där) |

**Exempel**

```sh
# Lägg appen i bakgrunden i 3 sekunder
npx wdio session background 3
```

Se även: [`app`](#app).

## `lock`

Lås enheten. Gäller native mobil.

```sh
npx wdio session lock
```

**Exempel**

```sh
# Lås skärmen
npx wdio session lock
```

Se även: [`unlock`](#unlock).

## `unlock`

Lås upp enheten. Gäller native mobil.

```sh
npx wdio session unlock
```

**Exempel**

```sh
# Lås upp skärmen
npx wdio session unlock
```

Se även: [`lock`](#lock).

## `geolocation`

Ange geopositionen. Gäller webb, native mobil.

```sh
npx wdio session geolocation <lat> <lon>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `lat` | ja | Latitud |
| `lon` | ja | Longitud |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--accuracy <n>` | Noggrannhet i meter |

**Exempel**

```sh
# Låtsas vara i Berlin
npx wdio session geolocation 52.52 13.405
```

Se även: [`emulate`](#emulate).

## `emulate`

Emulera en enhet, viewport, nätverk, cpu, klocka eller ett BiDi-emuleringsområde. Gäller webb.

En emulering kvarstår tills `emulate reset` eller tills sessionen avslutas; att ställa in samma typ igen ersätter den. `emulate device` utan värde listar enhetsnamnen. Nätverksförinställningar och cpu-strypning kräver en Chromium-webbläsare.

```sh
npx wdio session emulate <sub> [value]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | nej | Värde för emuleringen |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--dpr <n>` | Enhetens pixelförhållande (viewport) |
| `--tick <n>` | Flytta fram den emulerade klockan med ms (clock) |

**Exempel**

```sh
# Emulera en telefon
npx wdio session emulate device "iPhone 15"

# Ange en viewport
npx wdio session emulate viewport 375x812 --dpr 3

# Gå offline
npx wdio session emulate network offline

# Mörkt läge
npx wdio session emulate color-scheme dark

# Frys datumet
npx wdio session emulate clock 2030-01-01T00:00:00Z

# Minska rörelse
npx wdio session emulate media prefersReducedMotion=reduce

# Ångra alla emuleringar
npx wdio session emulate reset
```

Se även: [`geolocation`](#geolocation), [`screenshot`](#screenshot).

## `requests`

Lista fångade nätverksbegäranden (BiDi). Gäller webb.

```sh
npx wdio session requests
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--filter <value>` | Delsträng eller glob |
| `--failed` | Endast misslyckade begäranden |
| `--since <value>` | Endast begäranden nyare än denna varaktighet |
| `--limit <n>` | Maximalt antal rader (standard 50) |

**Exempel**

```sh
# Endast API-anrop
npx wdio session requests --filter "**/api/**"

# Begäranden som ett klick förstörde
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

Se även: [`mock`](#mock), [`logs`](#logs).

## `mock`

Mocka svar för ett URL-mönster (BiDi). Gäller webb.

Skriver ut mock-id:t (m1, m2, …). Att mocka samma mönster igen ersätter den tidigare mocken.

```sh
npx wdio session mock <pattern>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `pattern` | ja | URL-mönster |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--status <n>` | Statuskod |
| `--body <value>` | Body som JSON/text eller en filsökväg |
| `--header <value>` | Header k:v (kan upprepas) |
| `--abort` | Avbryt matchande begäranden |
| `--method <value>` | Endast denna metod |
| `--once` | Endast nästa begäran |

**Exempel**

```sh
# Returnera fast JSON
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# Låt nästa begäran misslyckas
npx wdio session mock "**/api/cart" --status 500 --once

# Blockera bilder
npx wdio session mock "**/*.png" --abort
```

Se även: [`unmock`](#unmock), [`requests`](#requests).

## `unmock`

Ta bort mockar. Gäller webb.

```sh
npx wdio session unmock [pattern]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `pattern` | nej | Mönster eller mock-id |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--all` | Ta bort alla mockar |

**Exempel**

```sh
# Ta bort en mock
npx wdio session unmock m1

# Ta bort alla mockar
npx wdio session unmock --all
```

Se även: [`mock`](#mock).

## `cookies`

Hämta, ange eller rensa cookies. Gäller webb.

Utan underkommando skrivs varje cookie ut som name=value. `clear` utan namn tar bort alla cookies.

```sh
npx wdio session cookies [sub] [name] [value]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | nej | get \| set \| clear |
| `name` | nej | Cookienamn |
| `value` | nej | Cookievärde |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--domain <value>` | Cookiedomän (set) |
| `--path <value>` | Cookiesökväg (set) |
| `--http-only` | HttpOnly-cookie (set) |
| `--secure` | Secure-cookie (set) |
| `--same-site <value>` | lax, strict, none eller default (set) |
| `--expiry <n>` | Utgångstid som Unix-tidsstämpel i sekunder (set) |

**Exempel**

```sh
# Lista cookies
npx wdio session cookies

# Värdet för en cookie
npx wdio session cookies get session

# Ange en cookie och ladda om
npx wdio session cookies set session abc && npx wdio session reload

# Ta bort alla cookies
npx wdio session cookies clear
```

Se även: [`storage`](#storage), [`state`](#state).

## `storage`

Hämta, ange eller rensa localStorage (eller sessionStorage). Gäller webb.

Utan underkommando skrivs varje post ut. `clear` utan nyckel tömmer lagringen.

```sh
npx wdio session storage [sub] [key] [value]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | nej | get \| set \| clear |
| `key` | nej | Nyckel |
| `value` | nej | Värde |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--session-storage` | Använd sessionStorage |

**Exempel**

```sh
# Lista localStorage
npx wdio session storage

# Ange en nyckel
npx wdio session storage set token abc

# Töm sessionStorage
npx wdio session storage clear --session-storage
```

Se även: [`cookies`](#cookies), [`state`](#state).

## `state`

Spara eller ladda cookies och lagring. Gäller webb.

`save` skriver cookies, localStorage och sessionStorage för det aktuella ursprunget till en JSON-fil. `load` öppnar det ursprunget och återställer dem, t.ex. för att hoppa över en inloggning.

```sh
npx wdio session state <sub> <file>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | save \| load |
| `file` | ja | Tillståndsfil |

**Exempel**

```sh
# Spara ett inloggat tillstånd
npx wdio session state save .wdio/logged-in.json

# Börja inloggad
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

Se även: [`cookies`](#cookies), [`storage`](#storage).

## `visual`

Visuella ögonblicksbilder via @wdio/visual-service. Gäller webb, native mobil, native skrivbord.

`save` sparar en baslinje under .wdio/visual/baseline, `check` jämför med den och skriver ut avvikelsen, `accept` gör den senaste faktiska bilden till baslinjen, `list` visar taggarna. Kräver @wdio/visual-service i projektet.

```sh
npx wdio session visual <sub> [tag]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | save \| check \| accept \| list |
| `tag` | nej | Bildtagg |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--element <value>` | Endast detta element |
| `--full` | Hela sidan |
| `--tabbable` | Tabbable-sida |
| `--threshold <n>` | Tillåten avvikelse i procent (standard 0) |
| `--all` | accept: alla taggar |

**Exempel**

```sh
# Spara en baslinje
npx wdio session visual save cart

# Jämför med den
npx wdio session visual check cart --threshold 0.5

# Acceptera en avsiktlig ändring
npx wdio session visual accept cart
```

Se även: [`screenshot`](#screenshot).

## `trace`

Spela in varje steg med skärmdumpar och ögonblicksbilder.

`stop` skriver ut trace-katalogen och en utskrift av stegen.

```sh
npx wdio session trace <sub>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | start \| stop |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--screenshots` | Skärmdump efter varje steg (använd --no-screenshots för att hoppa över) |
| `--snapshots` | Ögonblicksbild efter varje steg (använd --no-snapshots för att hoppa över) |

**Exempel**

```sh
# Starta spårning
npx wdio session trace start

# Stoppa och skriv ut utskriften
npx wdio session trace stop
```

Se även: [`record`](#record), [`history`](#history).

## `record`

Spela in en video. Gäller webb, native mobil.

```sh
npx wdio session record <sub>
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `sub` | ja | start \| stop |

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--fps <n>` | Bilder per sekund (standard 5) |
| `--path <value>` | Utdatafil |

**Exempel**

```sh
# Starta inspelning
npx wdio session record start

# Stoppa och spara videon
npx wdio session record stop --path checkout.mp4
```

Se även: [`trace`](#trace), [`screenshot`](#screenshot).

## `history`

Skriv ut de inspelade stegen.

Varje åtgärd som ändrar sidan spelar in WebdriverIO-koden som kördes. `export` gör om denna historik till en spec.

```sh
npx wdio session history
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--clear` | Rensa historiken |

**Exempel**

```sh
# Visa stegen hittills
npx wdio session history

# Börja om inspelningen före de steg du vill behålla
npx wdio session history --clear
```

Se även: [`export`](#export), [`exec`](#exec).

## `export`

Generera en spec från historiken.

Skriver en describe/it-spec med de inspelade stegen. Refs blir stabila selektorer och hjälpare blir anpassade kommandon. Utan --out hamnar filen i artefaktkatalogen. Kör den med `wdio run` för att bekräfta att den går igenom.

```sh
npx wdio session export
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--out <value>` | Utdatafil |
| `--title <value>` | Svitens titel |
| `--page-objects` | Generera page objects |
| `--framework <mocha\|jasmine>` | Ramverk (standard mocha) |

**Exempel**

```sh
# Skriv specen
npx wdio session export --out test/specs/cart.e2e.ts

# Skriv specen och kör den
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Se även: [`history`](#history), [`helpers`](#helpers).

## `resume`

Fortsätt ett test som pausats av wdio run --debug=agent.

`wdio run --debug=agent` pausar ett misslyckat test och exponerar det som sessionen debug-`<worker>`. Inspektera det med valfri åtgärd och återuppta sedan. `close` på den sessionen får istället testet att misslyckas.

```sh
npx wdio session resume
```

**Exempel**

```sh
# Titta på det pausade testet och låt det sedan fortsätta
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

Se även: [`close`](#close), [`list`](#list).

## `doctor`

Kontrollera din miljö.

Skriver ut en rad per kontroll med en åtgärd för varje fel. Avslutar med 1 när en kontroll misslyckas.

```sh
npx wdio session doctor [target]
```

**Argument**

| Namn | Obligatorisk | Beskrivning |
| --- | --- | --- |
| `target` | nej | Kontrollera endast det som detta mål behöver |

**Exempel**

```sh
# Kontrollera allt
npx wdio session doctor

# Kontrollera vad en Android-session behöver
npx wdio session doctor android
```

Se även: [`open`](#open).

## `skill`

Skriv ut agent-skillen.

```sh
npx wdio session skill
```

**Flaggor**

| Flagga | Beskrivning |
| --- | --- |
| `--install <value>` | Skriv den till .agents/skills/wdio-session/SKILL.md (eller denna katalog) |

**Exempel**

```sh
# Skriv ut skillen
npx wdio session skill

# Lägg till den i detta projekt
npx wdio session skill --install .
```