---
id: sumologic-reporter
title: Raportowanie Sumologic
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Reporter WebdriverIO, który wysyła wyniki testów do [Sumologic](https://www.sumologic.com/) do analizy danych

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## Instalacja

Najłatwiejszym sposobem jest utrzymanie `@wdio/sumologic-reporter` jako devDependency w pliku `package.json`, poprzez:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted).

## Konfiguracja

Najpierw musimy utworzyć nowy kolektor, który zbiera wszystkie logi z Twoich testów. Aby to zrobić, kliknij na __Manage__ w pasku nawigacyjnym i przejdź do __Collection__. Tam musisz dodać nowy "Hosted Collector". Nadaj odpowiednią nazwę, np. "test integration logs", opis i kategorię, np. "wdio". Kliknij Zapisz, aby utworzyć kolektor.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

Następnym krokiem jest dodanie źródła. Sensowne jest posiadanie własnego źródła dla każdego środowiska (np. kompilacja gałęzi, integracja). Kliknij na link "Add Source" obok swojego kolektora i dodaj __HTTP Source__. Ponownie nadaj odpowiednią nazwę i opis oraz ustaw "Source Category", która odzwierciedla środowisko. Pozostaw inne opcje w stanie domyślnym i kliknij Zapisz.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

Pojawi się modal z punktem końcowym źródła. Skopiuj ten adres URL i wklej go do swojego pliku wdio.conf.js, aby reporter wiedział, gdzie wysyłać dane.

Poniższy kod pokazuje domyślną konfigurację test runnera wdio. Wystarczy dodać `'sumologic'` jako reporter do tablicy i dodać punkt końcowy źródła:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

Po uruchomieniu pierwszych testów z reporterem powinieneś móc sprawdzić logi testów za pomocą następującego zapytania:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Wkrótce udostępnię kilka przydatnych szablonów dashboardów dla Sumologic.

----

Więcej informacji na temat WebdriverIO znajdziesz na [stronie głównej](https://webdriver.io).