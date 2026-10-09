---
id: snapshots
title: Ögonblicksbilder och refs
description: Läs sidan med wdio session snapshot och agera sedan på de refs som skrivs ut.
---

Ta en ögonblicksbild innan du klickar. Ögonblicksbilden är listan över element som du kan agera på. Varje interaktiv rad slutar med en ref, till exempel `[ref=e3]`.

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

En rad ser ut som `button "Add to cart" [ref=e3]`. Nästa kommando använder den ref:en:

```sh
npx wdio session click e3
```

Refs kommer från den senaste ögonblicksbilden. Ta en ny ögonblicksbild efter navigering. En gammal ref misslyckas med `REF_STALE`. En okänd ref misslyckas med `REF_NOT_FOUND`.

:::caution Experimentellt

Textlayouten för en ögonblicksbild, och formen som `--json` skriver ut för den, är experimentella: en mindre version kan ändra dem, till exempel för att dela en och samma motor för ögonblicksbilder med [DevTools trace](/docs/devtools/wdio/trace-mode). Ref-syntaxen (`e3`, `@e3`), de åtgärder som tar en ref och koden de spelar in förblir stabila. Hämta refs från en ögonblicksbild och tolka inte resten av dess rader.

:::

## Vad du ska köra

| Kommando | Använd det för |
| --- | --- |
| `snapshot --interactive` | De element du kan agera på, vart och ett med en ref |
| `find "Add to cart"` | Varje träff med noden runt den, t.ex. ett helt listobjekt, så att ett värde bredvid träffen följer med. `-A`, `-B` och `-C` skriver ut vanlig radkontext som grep |
| `diff` | Vad som har ändrats sedan föregående ögonblicksbild |
| `screenshot` | Layout. Hoppa över det när en ögonblicksbild besvarar frågan |
| `source` | Sidans HTML eller den native XML:en |

`snapshot` utan `--interactive` inkluderar mer av trädet. Föredra `--interactive` när du ska klicka eller skriva.

## Vad en åtgärd ändrade

I en webbsession skriver `open` ut den interaktiva ögonblicksbilden av sidan den öppnade, och varje åtgärd som kan ändra sidan (`click`, `fill`, `type`, `press`, `select`, `check`, `navigate`, `frame`, …) rapporterar vad som ändrades:

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

När åtgärden öppnade en flik säger rapporten det (`Opened a new tab [1]: https://…`); sessionen stannar på den aktuella fliken tills du kör `tabs switch`. När sidan är en botkontroll (Cloudflare, DataDome, Akamai, …) i stället för webbplatsen säger rapporten det också, en gång per sida. Sessionen försöker inte ta sig förbi den; i en headless-webbläsare föreslår den att öppna på nytt med `--headed`.

På samma sida får du de nya eller ändrade raderna med deras refs, inklusive text som inte är interaktiv, som statusen ovan. Efter en navigering får du den nya sidans interaktiva element, eller för en stor sida en sammanfattning på en rad som hänvisar till `find`. Så du behöver sällan en separat `snapshot` efter en åtgärd. Sätt `WDIO_SESSION_CHANGES=0` för att stänga av rapporten, och skicka `open --no-snapshot` för att hoppa över ögonblicksbilden efter `open`.

## Ramar

I en WebDriver BiDi-session visar ögonblicksbilden innehållet i sidans iframes, inklusive cross-origin-iframes, under den iframe de ligger i:

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

Åtgärder på dessa refs går in i ramen, agerar och återvänder till sidan, och den utskrivna koden gör detsamma. Upp till fem iframes visas, var och en avkortad vid 300 element; `frame e4` och `snapshot` visar hela den ram som kortades av. Iframes mindre än 100 kvadratpixlar, som spårningspixlar, utelämnas.

## Shadow DOM och klickbara element utan roll

Med WebDriver BiDi täcker ögonblicksbilden även stängda shadow roots, och element som bara har en klicklyssnare (en ikon kopplad med `addEventListener`) får en ref. Ett sådant element har inget tillgängligt namn, så ögonblicksbilden beskriver det i stället:

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

På Android, iOS, macOS och Windows kommer ögonblicksbilden från Appiums page source. Två kontroller som delar ett accessibility id förblir separata refs när resten av deras selektorer skiljer sig åt. `snapshot --scope e3` begränsar trädet till den ref:en.

## Upprepade kontroller

När flera kontroller delar roll och namn, som knappen "Add to cart" på varje rad i en produkttabell, slutar ref-raden med `∈ "<text>"`, texten i den rad, det kort eller det listobjekt som innehåller den kontrollen och ingen annan med samma namn:

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

Texten kortas av vid 80 tecken. En kontroll vars objekt är ett sidlandmärke (en "Sign in"-länk i både sidhuvudet och sidfoten) får ingen. Etiketten för en synlig formulärkontroll listas inte: kontrollen bär namnet.

## Native tryck

Webbsessioner använder `click`. Mobila och native skrivbordssessioner använder `tap` på samma ref:

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## Felsökning

| Meddelande | Vad du ska göra |
| --- | --- |
| `REF_STALE` | Elementet från den senaste ögonblicksbilden finns inte längre. Kör `snapshot` och använd en ny ref. |
| `REF_NOT_FOUND` | Det id:t har aldrig funnits i den här sessionen. Ref:en i ditt kommando matchar inte den senaste ögonblicksbilden. |
| `NO_MATCH` | `find` hittade inte den texten. Ta en ögonblicksbild och läs de namn som faktiskt finns där. |
| `NOT_EDITABLE` | Målet för `fill` är inte ett redigerbart fält och har inte ett enda redigerbart fält inuti sig (eller bakom `aria-controls`/`aria-owns`/etikett). Kör `snapshot --scope <target>` och fyll i fältets ref. |

## Nästa steg

- [Kör kod](/docs/session/exec) — assertions och steg som är mer än ett kommando
- [Kommandon](/docs/session-commands) — flaggor för `snapshot`, `find`, `diff`, `screenshot` och `source`