---
id: debugging
title: Felsökning
description: "Felsök WebdriverIO-tester med browser.debug, brytpunkter i VS Code eller WebStorm, strategier för instabila tester samt CPU- och heap-profilering."
---

Felsökning blir betydligt svårare när flera processer startar dussintals tester i flera webbläsare.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Till att börja med är det mycket hjälpsamt att begränsa parallelliteten genom att sätta `maxInstances` till `1` och endast rikta in sig på de specs och webbläsare som behöver felsökas.

I `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Debug-kommandot

I många fall kan du använda [`browser.debug()`](/docs/api/browser/debug) för att pausa ditt test och inspektera webbläsaren.

Ditt kommandoradsgränssnitt växlar också till REPL-läge. Detta läge låter dig experimentera med kommandon och element på sidan. I REPL-läge kan du komma åt `browser`-objektet&mdash;eller funktionerna `$` och `$$`&mdash;precis som i dina tester.

När du använder `browser.debug()` behöver du troligen öka timeouten för testkörningsverktyget för att förhindra att det underkänner testet för att det tar för lång tid. Till exempel:

I `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Se [timeouts](timeouts) för mer information om hur du gör detta med andra ramverk.

För att fortsätta med testerna efter felsökningen, använd kortkommandot `^C` eller kommandot `.exit` i skalet.

### Pausa för en kodagent (`--debug=agent`)

`wdio run --debug=agent` höjer ramverkets timeout till 24 timmar och pausar workern när en spec anropar `await browser.debug()` eller när ett test misslyckas. Körningen skriver ut en rad som:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

Inspektera den pausade webbläsaren med [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …) och kör sedan `wdio session -s debug-0-0 resume` för att fortsätta. `wdio session -s debug-0-0 close` underkänner det pausade testet med `Session closed from wdio session`. Sessionsnamnet är `debug-<cid>` (`debug-0-0` för den första workern). Resten av det arbetsflödet finns i avsnittet [WebdriverIO Session](/docs/session).
## Dynamisk konfiguration

Observera att `wdio.conf.js` kan innehålla Javascript. Eftersom du troligen inte vill ändra ditt timeout-värde till 1 dag permanent kan det ofta vara hjälpsamt att ändra dessa inställningar från kommandoraden med hjälp av en miljövariabel.

Med denna teknik kan du ändra konfigurationen dynamiskt:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Du kan sedan inleda `wdio`-kommandot med `debug`-flaggan:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...och felsöka din spec-fil med DevTools!

## Felsökning med Visual Studio Code (VSCode)

Om du vill felsöka dina tester med brytpunkter i senaste VSCode har du två alternativ för att starta felsökaren, där alternativ 1 är den enklaste metoden:
 1. koppla felsökaren automatiskt
 2. koppla felsökaren med hjälp av en konfigurationsfil

### VSCode Toggle Auto Attach

Du kan koppla felsökaren automatiskt genom att följa dessa steg i VSCode:
 - Tryck CMD + Shift + P (Linux och Macos) eller CTRL + Shift + P (Windows)
 - Skriv "attach" i inmatningsfältet
 - Välj "Debug: Toggle Auto Attach"
 - Välj "Only With Flag"

 Det var allt! Nu när du kör dina tester (kom ihåg att du behöver ha flaggan --inspect inställd i din konfiguration som visats tidigare) startar felsökaren automatiskt och stannar vid den första brytpunkten den når.

### VSCode-konfigurationsfil

Det är möjligt att köra alla eller utvalda spec-filer. Felsökningskonfigurationer måste läggas till i `.vscode/launch.json`. För att felsöka en vald spec, lägg till följande konfiguration:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

För att köra alla spec-filer, ta bort `"--spec", "${file}"` från `"args"`

Exempel: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Ytterligare information: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Dynamisk REPL med Atom

Om du är en [Atom](https://atom.io/)-hackare kan du prova [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) av [@kurtharriger](https://github.com/kurtharriger), som är en dynamisk REPL som låter dig köra enskilda kodrader i Atom. Titta på [den här](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTube-videon för att se en demo.

## Felsökning med WebStorm / Intellij
Du kan skapa en node.js-felsökningskonfiguration så här:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Titta på denna [YouTube-video](https://www.youtube.com/watch?v=Qcqnmle6Wu8) för mer information om hur man skapar en konfiguration.

## Felsökning av instabila tester

Instabila tester kan vara riktigt svåra att felsöka, så här är några tips på hur du kan försöka återskapa det instabila resultatet du fick i din CI lokalt.

### Nätverk
För att felsöka nätverksrelaterad instabilitet, använd kommandot [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Renderingshastighet
För att felsöka instabilitet relaterad till enhetens hastighet, använd kommandot [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Detta gör att dina sidor renderas långsammare, vilket kan orsakas av många saker, som att flera processer körs i din CI och potentiellt saktar ner dina tester.
```js
await browser.throttleCPU(4)
```

### Hastighet för testkörning

Om dina tester inte verkar påverkas är det möjligt att WebdriverIO är snabbare än uppdateringen från frontend-ramverket / webbläsaren. Detta händer när synkrona assertions används, eftersom WebdriverIO då inte längre har någon möjlighet att försöka igen med dessa assertions. Några exempel på kod som kan gå sönder på grund av detta:
```js
expect(elementList.length).toEqual(7) // listan kanske inte är fylld vid tidpunkten för assertionen
expect(await elem.getText()).toEqual('this button was clicked 3 times') // texten kanske inte har uppdaterats ännu vid tidpunkten för assertionen, vilket resulterar i ett fel ("this button was clicked 2 times" matchar inte det förväntade "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // kanske inte visas ännu
```
För att lösa detta problem bör asynkrona assertions användas istället. Exemplen ovan skulle se ut så här:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Med dessa assertions väntar WebdriverIO automatiskt tills villkoret uppfylls. När text kontrolleras innebär detta att elementet måste existera och att texten måste vara lika med det förväntade värdet.
Vi pratar mer om detta i vår [guide för bästa praxis](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).

## Prestandaprofilering

WebdriverIO låter dig samla in prestandaprofiler av dina tester för att identifiera flaskhalsar i testkörningen eller minnesläckor. Detta använder Node.js inbyggda profileringsfunktioner.

### CPU-profilering

För att samla in en CPU-profil kan du använda CLI-flaggan `--cpu-prof` eller sätta `cpuProf: true` i din konfiguration.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

Detta genererar en `.cpuprofile`-fil i katalogen `./profiles` (standard) för varje worker-process. Du kan läsa in denna fil i **Chrome DevTools > Performance > Load Profile** för att analysera körningen.

### Heap-profilering

För att samla in en heap-profil, använd CLI-flaggan `--heap-prof` eller sätt `heapProf: true` i din konfiguration.

```bash
npx wdio run wdio.conf.js --heap-prof
```

Detta genererar en `.heapprofile`-fil i katalogen `./profiles` (använder en samplande heap-profilerare). Du kan läsa in den i **Chrome DevTools > Memory > Load** för att analysera minnesanvändningen.

### Tidsmått

När profilering är aktiverad loggar WebdriverIO också automatiskt tidsmått för uppsättnings-, körnings- och nedmonteringsfaserna i ditt test, vilket hjälper dig att förstå var tiden spenderas.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```