---
id: wdio-docker-service
title: Usługa Docker
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-service jest pakietem zewnętrznym, więcej informacji można znaleźć na [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

Ta usługa jest przeznaczona do użytku z [WebdriverIO](http://webdriver.io/) i pomaga uruchamiać testy funkcjonalne/integracyjne 
przeciwko/przy użyciu aplikacji kontenerowych. Wykorzystuje popularną usługę [Docker](https://www.docker.com/) (instalowaną osobno) do uruchamiania kontenerów.

## Dlaczego warto jej używać?
Idealnie byłoby, gdyby testy działały w jakimś rodzaju potoku CI/CD, gdzie często nie ma "prawdziwych" przeglądarek i innych zasobów,
od których zależy Twoja aplikacja. Wraz z nadejściem Dockera praktycznie wszystkie niezbędne zależności aplikacji mogą być konteneryzowane.
Dzięki tej usłudze możesz uruchomić kontener aplikacji lub [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) w swoim CI i w całkowitej izolacji
(zakładając, że CI może mieć zainstalowany Docker jako zależność). To samo może dotyczyć lokalnego rozwoju, jeśli Twoja aplikacja musi mieć pewien poziom
izolacji od głównego systemu operacyjnego.

## Jak to działa
Usługa uruchomi istniejący obraz dockera, a gdy będzie gotowy, zainicjuje testy WebdriverIO, które powinny działać względem Twojej aplikacji w kontenerze.

## Instalacja

Uruchom:

```bash
npm install wdio-docker-service --save-dev
```

Instrukcje dotyczące instalacji WebdriverIO można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted).

## Konfiguracja
Domyślnie Google Chrome, Firefox i PhantomJS są dostępne po zainstalowaniu w systemie hosta.
Aby korzystać z usługi, musisz dodać `docker` do tablicy usług:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## Opcje

### dockerOptions
Różne opcje wymagane do uruchomienia kontenera dockera

Typ: `Object`

Domyślnie: `{ 
    options: {
        rm: true
    }
}`

Przykład:

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
Tag nazwy kontenera Dockera. Może być lokalny lub z Docker HUB.

Typ: `String`

Wymagany: `true`

### dockerOptions.healthCheck
Konfiguracja, która sprawdza gotowość Twoich kontenerów przed rozpoczęciem testów. Zwykle byłby to adres URL localhost.
Jeśli healthCheck nie jest skonfigurowany, Webdriver zacznie uruchamiać testy natychmiast po uruchomieniu kontenera Docker, co
może być zbyt wcześnie, biorąc pod uwagę, że uruchomienie usługi sieciowej w kontenerze Docker zajmuje trochę czasu.

Typ: `String|Object`

Opcje dla obiektu:
- *url* - adres URL aplikacji działającej wewnątrz kontenera
- *maxRetries* - liczba prób do momentu niepowodzenia healthcheck. Domyślnie: 10
- *inspectInterval* - interwał między każdą próbą w ms. Domyślnie: 500
- *startDelay* - początkowe opóźnienie przed rozpoczęciem healthcheck w ms. Domyślnie: 0

Przykład 1 (String): `healthCheck: 'http://localhost:4444'`

Przykład 2 (Object):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
Mapa opcji używanych przez polecenie `docker run`. Aby uzyskać więcej informacji na temat polecenia `run`, kliknij [tutaj](https://docs.docker.com/edge/engine/reference/commandline/run/).

Każda opcja jednoliterowa zostanie przekształcona na `-[opcja]` (np. `d: true` -> `-d`). 

Każda opcja składająca się z dwóch lub więcej znaków zostanie
przekształcona na `--[opcja]` (np. `rm: true` -> `--rm`). 

W przypadku opcji, które mogą być używane więcej niż raz 
(np. `-e`,`-add-host`, `--expose`, itp.), należy użyć notacji tablicowej (np. `e: ["NODE_ENV=development", "FOO=bar"]`).

Typ: `Object`

Przykład:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
Wszelkie argumenty, które możesz chcieć przekazać do kontenera. Odpowiada `[ARG...]` w CLI Docker run.

Typ: `String`

### dockerOptions.command
Dowolne polecenie, które możesz chcieć przekazać do kontenera. Odpowiada `[COMMAND]` w CLI Docker run.

Typ: `String`

### onDockerReady
Metoda wywołania zwrotnego, która jest wywoływana, gdy aplikacja Docker jest gotowa. Gotowość jest określana przez możliwość pingowania adresu URL `healthCheck`.

Typ: `Function`

### dockerLogs
Ścieżka do miejsca, w którym powinny być przechowywane logi z kontenera docker

Typ: `String`

## Przypadki testowania / Receptury
Odwiedź naszą [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki), aby uzyskać więcej szczegółów.