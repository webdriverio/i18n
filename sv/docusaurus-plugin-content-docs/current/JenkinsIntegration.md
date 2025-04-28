---
id: jenkins
title: Jenkins
---

WebdriverIO erbjuder en nära integration med CI-system som [Jenkins](https://jenkins-ci.org). Med `junit`-rapportören kan du enkelt felsöka dina tester samt hålla koll på dina testresultat. Integrationen är ganska enkel.

1. Installera `junit` testrapportören: `$ npm install @wdio/junit-reporter --save-dev`)
1. Uppdatera din konfiguration för att spara dina XUnit-resultat där Jenkins kan hitta dem,
    (och specificera `junit`-rapportören):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

Det är upp till dig vilket ramverk du väljer. Rapporterna kommer att vara likartade.
För denna handledning kommer vi att använda Jasmine.

Efter att du har skrivit några tester kan du konfigurera ett nytt Jenkins-jobb. Ge det ett namn och en beskrivning:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Se sedan till att det alltid hämtar den senaste versionen av ditt repository:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Nu kommer den viktiga delen:** Skapa ett `build`-steg för att köra skalkommandon. `Build`-steget behöver bygga ditt projekt. Eftersom detta demoprojekt endast testar en extern app behöver du inte bygga något. Installera bara node-beroendena och kör kommandot `npm test` (vilket är ett alias för `node_modules/.bin/wdio test/wdio.conf.js`).

Om du har installerat ett plugin som AnsiColor, men loggarna fortfarande inte är färgade, kör testerna med miljövariabeln `FORCE_COLOR=1` (t.ex. `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Efter ditt test vill du att Jenkins ska spåra din XUnit-rapport. För att göra det måste du lägga till en åtgärd efter byggandet som kallas _"Publish JUnit test result report"_.

Du kan också installera ett externt XUnit-plugin för att spåra dina rapporter. JUnit-pluginet kommer med den grundläggande Jenkins-installationen och är tillräckligt för nu.

Enligt konfigurationsfilen kommer XUnit-rapporterna att sparas i projektets rotkatalog. Dessa rapporter är XML-filer. Så allt du behöver göra för att spåra rapporterna är att peka Jenkins till alla XML-filer i din rotkatalog:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

Det är allt! Du har nu konfigurerat Jenkins för att köra dina WebdriverIO-jobb. Ditt jobb kommer nu att ge detaljerade testresultat med historikdiagram, stacktrace-information om misslyckade jobb och en lista över kommandon med nyttolast som användes i varje test.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")