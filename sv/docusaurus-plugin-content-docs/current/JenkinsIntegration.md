---
id: jenkins
title: Jenkins
description: "Kör WebdriverIO-tester i Jenkins och publicera resultat från JUnit-rapporteraren för att felsöka fel och följa testhistoriken."
---

WebdriverIO erbjuder en tät integration med CI-system som [Jenkins](https://jenkins-ci.org). Med `junit`-rapporteraren kan du enkelt felsöka dina tester samt hålla koll på dina testresultat. Integrationen är ganska enkel.

1. Installera `junit`-testrapporteraren: `$ npm install @wdio/junit-reporter --save-dev`)
1. Uppdatera din konfiguration så att dina XUnit-resultat sparas där Jenkins kan hitta dem,
    (och ange `junit`-rapporteraren):

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
I den här guiden använder vi Jasmine.

När du har skrivit ett par tester kan du skapa ett nytt Jenkins-jobb. Ge det ett namn och en beskrivning:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Se sedan till att det alltid hämtar den senaste versionen av ditt repository:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Nu den viktiga delen:** Skapa ett `build`-steg för att köra skalkommandon. `build`-steget behöver bygga ditt projekt. Eftersom det här demoprojektet endast testar en extern app behöver du inte bygga något. Installera bara node-beroendena och kör kommandot `npm test` (som är ett alias för `node_modules/.bin/wdio test/wdio.conf.js`).

Om du har installerat ett plugin som AnsiColor men loggarna fortfarande inte är färgade, kör testerna med miljövariabeln `FORCE_COLOR=1` (t.ex. `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Efter ditt test vill du att Jenkins ska följa din XUnit-rapport. För att göra det måste du lägga till en post-build-åtgärd som heter _"Publish JUnit test result report"_.

Du kan också installera ett externt XUnit-plugin för att följa dina rapporter. JUnit-pluginet ingår i den grundläggande Jenkins-installationen och räcker gott för tillfället.

Enligt konfigurationsfilen sparas XUnit-rapporterna i projektets rotkatalog. Dessa rapporter är XML-filer. Så allt du behöver göra för att följa rapporterna är att peka Jenkins mot alla XML-filer i din rotkatalog:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

Det var allt! Du har nu konfigurerat Jenkins för att köra dina WebdriverIO-jobb. Ditt jobb kommer nu att ge detaljerade testresultat med historikdiagram, stacktrace-information för misslyckade jobb samt en lista över kommandon med den payload som användes i varje test.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")