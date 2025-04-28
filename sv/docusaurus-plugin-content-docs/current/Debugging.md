---
id: debugging
title: Felsökning
---

Felsökning är betydligt svårare när flera processer startar dussintals tester i flera webbläsare.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Till att börja med är det extremt hjälpsamt att begränsa parallellismen genom att ställa in `maxInstances` till `1`, och endast rikta in sig på de specifikationer och webbläsare som behöver felsökas.

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

Ditt kommandoradsgränssnitt kommer också att växla till REPL-läge. Detta läge låter dig experimentera med kommandon och element på sidan. I REPL-läge kan du komma åt `browser`-objektet&mdash;eller `$` och `$$` funktionerna&mdash;precis som du kan i dina tester.

När du använder `browser.debug()` behöver du sannolikt öka timeout-värdet för testköringen för att förhindra att testkörnaren misslyckas med testet för att det tar för lång tid. Till exempel:

I `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Se [timeouts](timeouts) för mer information om hur du gör detta med andra ramverk.

För att fortsätta med testerna efter felsökning, använd `^C`-genvägen eller kommandot `.exit` i skalet.
## Dynamisk konfiguration

Observera att `wdio.conf.js` kan innehålla Javascript. Eftersom du förmodligen inte vill permanent ändra ditt timeout-värde till 1 dag, kan det ofta vara hjälpsamt att ändra dessa inställningar från kommandoraden med hjälp av en miljövariabel.

Med denna teknik kan du dynamiskt ändra konfigurationen:

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

Du kan sedan prefixera `wdio`-kommandot med `debug`-flaggan:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...och felsöka din specifikationsfil med DevTools!

## Felsökning med Visual Studio Code (VSCode)

Om du vill felsöka dina tester med brytpunkter i senaste VSCode har du två alternativ för att starta felsökaren, där alternativ 1 är den enklaste metoden:
 1. automatiskt koppla felsökaren
 2. koppla felsökaren med hjälp av en konfigurationsfil

### VSCode Toggle Auto Attach

Du kan automatiskt koppla felsökaren genom att följa dessa steg i VSCode:
 - Tryck CMD + Shift + P (Linux och Macos) eller CTRL + Shift + P (Windows)
 - Skriv "attach" i inmatningsfältet
 - Välj "Debug: Toggle Auto Attach"
 - Välj "Only With Flag"

 Det är allt! Nu när du kör dina tester (kom ihåg att du behöver ha --inspect-flaggan inställd i din konfiguration som visats tidigare) kommer den automatiskt att starta felsökaren och stanna vid den första brytpunkten den når.

### VSCode konfigurationsfil

Det är möjligt att köra alla eller utvalda specifikationsfiler. Felsökningskonfiguration(er) måste läggas till i `.vscode/launch.json`, för att felsöka vald specifikation lägg till följande konfiguration:
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

För att köra alla specifikationsfiler, ta bort `"--spec", "${file}"` från `"args"`

Exempel: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Ytterligare information: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Dynamisk Repl med Atom

Om du är en [Atom](https://atom.io/)-hackare kan du prova [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) av [@kurtharriger](https://github.com/kurtharriger) som är en dynamisk repl som låter dig exekvera enskilda kodlinjer i Atom. Titta på [den här](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTube-videon för att se en demo.

## Felsökning med WebStorm / Intellij
Du kan skapa en node.js-felsökningskonfiguration så här:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Titta på den här [YouTube-videon](https://www.youtube.com/watch?v=Qcqnmle6Wu8) för mer information om hur du skapar en konfiguration.

## Felsökning av instabila tester

Instabila tester kan vara väldigt svåra att felsöka så här är några tips på hur du kan försöka få det instabila resultat du fick i din CI, reproducerat lokalt.

### Nätverk
För att felsöka nätverksrelaterad instabilitet, använd kommandot [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Renderingshastighet
För att felsöka enhetshastighetrelaterad instabilitet, använd kommandot [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Detta kommer att få dina sidor att renderas långsammare, vilket kan orsakas av många saker som att köra flera processer i din CI som kan sakta ner dina tester.
```js
await browser.throttleCPU(4)
```

### Testexekveringshastighet

Om dina tester inte verkar påverkas är det möjligt att WebdriverIO är snabbare än uppdateringen från frontend-ramverket/webbläsaren. Detta händer när man använder synkrona påståenden eftersom WebdriverIO inte har möjlighet att göra fler försök med dessa påståenden. Några exempel på kod som kan brytas på grund av detta:
```js
expect(elementList.length).toEqual(7) // listan kanske inte är ifylld vid tidpunkten för påståendet
expect(await elem.getText()).toEqual('this button was clicked 3 times') // texten kanske inte uppdaterats än vid tidpunkten för påståendet vilket resulterar i ett fel ("this button was clicked 2 times" matchar inte det förväntade "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // kanske inte visas än
```
För att lösa detta problem bör asynkrona påståenden användas istället. Ovanstående exempel skulle se ut så här:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Med dessa påståenden kommer WebdriverIO automatiskt att vänta tills villkoret matchar. När man hävdar text innebär det att elementet måste existera och texten måste vara lika med det förväntade värdet.
Vi pratar mer om detta i vår [Best Practices Guide](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).