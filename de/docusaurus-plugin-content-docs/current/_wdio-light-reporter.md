---
id: wdio-light-reporter
title: Light Reporter Reporter
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---


> wdio-light-reporter ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Inspiriert von HTML und Mochawesome Reporter

!Philosophie:

> Dieser Reporter unterstützt keine Cucumber-Berichtserstellung und wurde unter Berücksichtigung des BDD- und Mocha-Frameworks entwickelt.
> Hier wird der `describe()`-Abschnitt als Testszenario und `it()` als Testfall innerhalb der Testszenarien betrachtet.

## FUNKTIONEN

1. Einfache Einrichtung
2. Verbesserte Benutzeroberfläche
3. Screenshot in HTML-Bericht eingebettet
4. addLabel() zum Einfügen von Schrittkontext oder Namen

## Veröffentlichungen
V 0.1.9 - Erste Veröffentlichung
V 0.2.6 - (neueste)
  1. Fügt mehrere Umgebungsläufe hinzu und trennt sie nach Umgebung.
  2. Behebt Fehler
  3. Verbesserte Leistung.

## BEISPIELE

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## Installation

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## Konfiguration

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## Screenshots

Der Reporter hat nicht die Fähigkeit, automatisch für Screenshots zu konfigurieren, aber wenn manuell konfiguriert, lauscht er auf das Ereignis und fügt die Screenshots in den HTML-Bericht ein.
**Um Screenshots in den Bericht aufzunehmen, fügen Sie den folgenden Code im afterTest() Hook in der wdio-Konfigurationsdatei hinzu.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## Ergebnisdateien

Jeder Lauf regeneriert JSON-Berichte für jede Spec-Datei. Um kombinierte JSON- und HTML-Berichte zu generieren, fügen Sie den folgenden Code im **onComplete()** Hook in der wdio-Konfigurationsdatei hinzu

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> Wenn Sie Ihren Test ohne --suite-Option ausführen, wird er als Standard-Suite betrachtet
> Der Reporter funktioniert nicht, wenn Sie mehrere Parameter als Suiten beim Ausführen angeben.
> wdio run `wdio.conf.js --suite firstSuite` - **(FUNKTIONIERT GUT)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(FUNKTIONIERT NICHT)** :(

## Kontext hinzufügen

> Sie können `useLabel()` verwenden, um Kontext zu Schritten hinzuzufügen oder ihn als Schritte einzufügen.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## Updates
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## Lizenz

MIT
**Kostenlos, Ja klar!**