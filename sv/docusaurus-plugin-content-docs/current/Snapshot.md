---
id: snapshot
title: Ögonblicksbilder
description: "Verifiera objekt, DOM-strukturer och kommandoresultat med snapshot- och inline-snapshot-tester, och jämför visuella ögonblicksbilder."
---

Snapshot-tester kan vara mycket användbara för att verifiera en mängd olika aspekter av din komponent eller logik på samma gång. I WebdriverIO kan du ta ögonblicksbilder av godtyckliga objekt samt av en WebElements DOM-struktur eller resultat från WebdriverIO-kommandon.

Precis som andra testramverk tar WebdriverIO en ögonblicksbild av det angivna värdet och jämför den sedan med en referensfil för ögonblicksbilden som lagras bredvid testet. Testet misslyckas om de två ögonblicksbilderna inte stämmer överens: antingen är ändringen oväntad, eller så behöver referensbilden uppdateras till den nya versionen av resultatet.

:::info Stöd för flera plattformar

Dessa snapshot-funktioner är tillgängliga både för end-to-end-tester som körs i Node.js-miljön och för [enhets- och komponenttester](/docs/component-testing) som körs i webbläsaren eller på mobila enheter.

:::

## Använda ögonblicksbilder
För att ta en ögonblicksbild av ett värde kan du använda `toMatchSnapshot()` från [`expect()`](/docs/api/expect-webdriverio)-API:et:

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Första gången testet körs skapar WebdriverIO en snapshot-fil som ser ut så här:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Snapshot-artefakten bör checkas in tillsammans med kodändringarna och granskas som en del av din kodgranskningsprocess. Vid efterföljande testkörningar jämför WebdriverIO det renderade resultatet med den tidigare ögonblicksbilden. Om de stämmer överens godkänns testet. Om de inte stämmer överens har testköraren antingen hittat en bugg i din kod som bör åtgärdas, eller så har implementationen ändrats och ögonblicksbilden behöver uppdateras.

För att uppdatera ögonblicksbilden, skicka med flaggan `-s` (eller `--updateSnapshot`) till `wdio`-kommandot, t.ex.:

```sh
npx wdio run wdio.conf.js -s
```

__Obs:__ om du kör tester med flera webbläsare parallellt skapas och jämförs endast en ögonblicksbild. Om du vill ha en separat ögonblicksbild per capability, [skapa ett ärende](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) och berätta om ditt användningsfall.

## Inline-ögonblicksbilder

På liknande sätt kan du använda `toMatchInlineSnapshot()` för att lagra ögonblicksbilden direkt i testfilen.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Istället för att skapa en snapshot-fil kommer Vitest att ändra testfilen direkt för att uppdatera ögonblicksbilden som en sträng:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Detta gör att du kan se det förväntade resultatet direkt utan att behöva hoppa mellan olika filer.

## Visuella ögonblicksbilder

Att ta en DOM-ögonblicksbild av ett element är kanske inte den bästa idén, särskilt om DOM-strukturen är för stor och innehåller dynamiska elementegenskaper. I dessa fall rekommenderas det att förlita sig på visuella ögonblicksbilder av element.

För att aktivera visuella ögonblicksbilder, lägg till `@wdio/visual-service` i din konfiguration. Du kan följa installationsinstruktionerna i [dokumentationen](/docs/visual-testing#installation) för visuell testning.

Du kan sedan ta en visuell ögonblicksbild via `toMatchElementSnapshot()`, t.ex.:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

En bild lagras sedan i baseline-katalogen. Läs mer under [Visuell testning](/docs/visual-testing).