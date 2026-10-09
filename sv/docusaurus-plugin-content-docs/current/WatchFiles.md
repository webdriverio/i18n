---
id: watcher
title: Bevaka testfiler
description: "Kör om tester automatiskt när spec- eller applikationsfiler ändras genom att köra WDIO-testrunnern med flaggan --watch och filesToWatch."
---

Med WDIO-testrunnern kan du bevaka filer medan du arbetar med dem. Testerna körs automatiskt om när du ändrar något i din app eller i dina testfiler. Genom att lägga till flaggan `--watch` när du anropar kommandot `wdio` väntar testrunnern på filändringar efter att den har kört alla tester, t.ex.

```sh
wdio wdio.conf.js --watch
```

Som standard bevakas endast ändringar i dina `specs`-filer. Genom att ange egenskapen `filesToWatch` i din `wdio.conf.js`, som innehåller en lista med filsökvägar (globbing stöds), bevakas även dessa filer för ändringar så att hela sviten körs om. Detta är användbart om du vill köra om alla dina tester automatiskt när du har ändrat din applikationskod, t.ex.

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // bevaka alla JS-filer i min app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Försök att köra tester parallellt så mycket som möjligt. E2E-tester är till sin natur långsamma. Att köra om tester är bara användbart om du kan hålla körtiden för de enskilda testerna kort. För att spara tid håller testrunnern WebDriver-sessioner vid liv medan den väntar på filändringar. Se till att din WebDriver-backend kan konfigureras så att den inte automatiskt stänger sessionen om inget kommando har körts under en viss tid.
:::