---
id: watcher
title: Bevaka testfiler
---

Med WDIO-testkörnaren kan du bevaka filer medan du arbetar med dem. De körs automatiskt om på nytt om du ändrar något i din app eller i dina testfiler. Genom att lägga till flaggan `--watch` när du anropar kommandot `wdio` kommer testkörnaren att vänta på filändringar efter att den har kört alla tester, t.ex.

```sh
wdio wdio.conf.js --watch
```

Som standard bevakar den endast ändringar i dina `specs`-filer. Genom att ställa in en `filesToWatch`-egenskap i din `wdio.conf.js` som innehåller en lista med filsökvägar (globbing stöds) kommer den även att bevaka ändringar i dessa filer för att köra om hela testsviten. Detta är användbart om du vill att alla dina tester automatiskt ska köras om när du har ändrat din applikationskod, t.ex.

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
Försök att köra tester parallellt så mycket som möjligt. E2E-tester är av naturen långsamma. Omkörning av tester är bara användbart om du kan hålla den individuella testkörningens tid kort. För att spara tid håller testkörnaren WebDriver-sessioner aktiva medan den väntar på filändringar. Se till att din WebDriver-backend kan modifieras så att den inte automatiskt stänger sessionen om inget kommando har utförts efter en viss tid.
:::