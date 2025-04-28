---
id: jenkins
title: Jenkins
---

WebdriverIO oferuje ścisłą integrację z systemami CI takimi jak [Jenkins](https://jenkins-ci.org). Dzięki reporterowi `junit` możesz łatwo debugować swoje testy, a także śledzić wyniki testów. Integracja jest bardzo prosta.

1. Zainstaluj reporter testów `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
1. Zaktualizuj swoją konfigurację, aby zapisać wyniki XUnit tam, gdzie Jenkins może je znaleźć,
    (oraz określ reporter `junit`):

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

To od ciebie zależy, który framework wybierzesz. Raporty będą podobne.
W tym poradniku użyjemy Jasmine.

Po napisaniu kilku testów możesz skonfigurować nowe zadanie Jenkinsa. Nadaj mu nazwę i opis:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Następnie upewnij się, że zawsze pobiera najnowszą wersję twojego repozytorium:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Teraz najważniejsza część:** Utwórz krok `build` do wykonywania poleceń powłoki. Krok `build` musi zbudować twój projekt. Ponieważ ten projekt demonstracyjny tylko testuje zewnętrzną aplikację, nie musisz niczego budować. Po prostu zainstaluj zależności node i uruchom polecenie `npm test` (które jest aliasem dla `node_modules/.bin/wdio test/wdio.conf.js`).

Jeśli zainstalowałeś wtyczkę taką jak AnsiColor, ale logi nadal nie są kolorowe, uruchom testy ze zmienną środowiskową `FORCE_COLOR=1` (np. `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Po teście będziesz chciał, aby Jenkins śledził twój raport XUnit. Aby to zrobić, musisz dodać akcję po budowaniu (post-build action) o nazwie _"Publish JUnit test result report"_.

Możesz również zainstalować zewnętrzną wtyczkę XUnit do śledzenia swoich raportów. Wtyczka JUnit jest dostarczana z podstawową instalacją Jenkinsa i jest wystarczająca na ten moment.

Zgodnie z plikiem konfiguracyjnym, raporty XUnit będą zapisywane w katalogu głównym projektu. Te raporty to pliki XML. Więc wszystko, co musisz zrobić, aby śledzić raporty, to wskazać Jenkinsowi wszystkie pliki XML w katalogu głównym:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

To wszystko! Właśnie skonfigurowałeś Jenkinsa do uruchamiania zadań WebdriverIO. Twoje zadanie będzie teraz dostarczać szczegółowe wyniki testów z wykresami historii, informacjami o śledzeniu stosu w przypadku nieudanych zadań oraz listą poleceń z ładunkiem, który został użyty w każdym teście.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")