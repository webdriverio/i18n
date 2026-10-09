---
id: jenkins
title: Jenkins
description: "Uruchamiaj testy WebdriverIO w Jenkinsie i publikuj wyniki reportera JUnit, aby debugować błędy i śledzić historię testów."
---

WebdriverIO oferuje ścisłą integrację z systemami CI, takimi jak [Jenkins](https://jenkins-ci.org). Dzięki reporterowi `junit` możesz łatwo debugować swoje testy, a także śledzić ich wyniki. Integracja jest dość prosta.

1. Zainstaluj reporter testów `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
1. Zaktualizuj swoją konfigurację, aby zapisywać wyniki XUnit w miejscu, w którym Jenkins może je znaleźć,
    (i określ reporter `junit`):

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

Wybór frameworka zależy od Ciebie. Raporty będą podobne.
W tym samouczku użyjemy Jasmine.

Po napisaniu kilku testów możesz skonfigurować nowe zadanie w Jenkinsie. Nadaj mu nazwę i opis:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Następnie upewnij się, że zawsze pobiera najnowszą wersję Twojego repozytorium:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Teraz najważniejsza część:** Utwórz krok `build` do wykonywania poleceń powłoki. Krok `build` musi zbudować Twój projekt. Ponieważ ten projekt demonstracyjny testuje jedynie zewnętrzną aplikację, nie musisz niczego budować. Wystarczy zainstalować zależności node i uruchomić polecenie `npm test` (które jest aliasem dla `node_modules/.bin/wdio test/wdio.conf.js`).

Jeśli zainstalowałeś wtyczkę taką jak AnsiColor, ale logi nadal nie są kolorowe, uruchom testy ze zmienną środowiskową `FORCE_COLOR=1` (np. `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Po wykonaniu testów będziesz chciał, aby Jenkins śledził Twój raport XUnit. W tym celu musisz dodać akcję po kompilacji (post-build action) o nazwie _"Publish JUnit test result report"_.

Możesz także zainstalować zewnętrzną wtyczkę XUnit do śledzenia raportów. Wtyczka JUnit jest dostarczana z podstawową instalacją Jenkinsa i na razie w zupełności wystarczy.

Zgodnie z plikiem konfiguracyjnym raporty XUnit będą zapisywane w katalogu głównym projektu. Raporty te są plikami XML. Aby więc śledzić raporty, wystarczy wskazać Jenkinsowi wszystkie pliki XML w katalogu głównym:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

To wszystko! Skonfigurowałeś Jenkinsa do uruchamiania zadań WebdriverIO. Twoje zadanie będzie teraz dostarczać szczegółowe wyniki testów z wykresami historii, informacjami o stosie wywołań (stacktrace) dla nieudanych zadań oraz listą poleceń wraz z danymi (payload), które zostały użyte w każdym teście.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")