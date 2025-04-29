---
id: sumologic-reporter
title: Sumologic Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> En WebdriverIO-rapportör som skickar testresultat till [Sumologic](https://www.sumologic.com/) för dataanalyser

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## Installation

Det enklaste sättet är att behålla `@wdio/sumologic-reporter` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här](https://webdriver.io/docs/gettingstarted).

## Konfiguration

Först måste vi skapa en ny insamlare som samlar alla loggar från dina tester. För att göra det, klicka på __Manage__ i navigeringsfältet och gå till __Collection__. Där behöver du lägga till en ny "Hosted Collector". Använd ett lämpligt namn, t.ex. "test integration logs", beskrivning och en kategori, t.ex. "wdio". Klicka på Spara för att skapa insamlaren.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

Nästa steg är att lägga till en källa. Det är vettigt att ha en egen källa för var och en av dina miljöer (t.ex. branch build, integration). Klicka på länken "Add Source" bredvid din insamlare och lägg till en __HTTP Source__. Använd återigen ett lämpligt namn och beskrivning och ange en "Source Category" som speglar miljön. Lämna de andra alternativen i standardläge och klicka på spara.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

En modal dyker upp med källans slutpunkt. Kopiera den URL:en och klistra in den i din wdio.conf.js så att rapportören vet vart den ska skicka data.

Följande kod visar standardkonfigurationen för wdio-teströrelse. Lägg bara till `'sumologic'` som rapportör i arrayen och lägg till din källslutpunkt:

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

Efter att ha kört de första testerna med rapportören bör du kunna kolla upp testloggarna med följande förfrågan:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Jag kommer snart att tillhandahålla några användbara instrumentpanelsmallar för Sumologic.

----

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).