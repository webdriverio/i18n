---
id: watcher
title: Bevaka Testfiler
---

Med WDIO testrunner kan du bevaka filer medan du arbetar med dem. De körs automatiskt om på nytt om du ändrar något antingen i din app eller i dina testfiler. Genom att lägga till flaggan `--watch` när du anropar kommandot `wdio` kommer testrunner att vänta på filändringar efter att den har kört alla tester, t.ex.

```sh
wdio wdio.conf.js --watch
```

Som standard övervakar den endast ändringar i dina `specs`-filer. Genom att ställa in egenskapen `filesToWatch` i din `wdio.conf.js` som innehåller en lista med filsökvägar (globbing stöds) kommer den också att bevaka dessa filer för att köra hela testsviten på nytt när de ändras. Detta är användbart om du vill att alla dina tester ska köras automatiskt om du har ändrat din applikationskod, t.ex.

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // watch for all JS files in my app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Försök att köra tester parallellt så mycket som möjligt. E2E-tester är av naturen långsamma. Att köra om tester är bara användbart om du kan hålla den enskilda testkörningens tid kort. För att spara tid behåller testrunner WebDriver-sessioner aktiva medan den väntar på filändringar. Se till att din WebDriver-backend kan modifieras så att den inte automatiskt stänger sessionen om inget kommando har utförts efter en viss tid.
:::