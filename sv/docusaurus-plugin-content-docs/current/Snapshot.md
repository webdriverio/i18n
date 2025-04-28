---
id: snapshot
title: Snapshot
---

Snapshotstester kan vara mycket användbara för att bekräfta ett brett spektrum av aspekter av din komponent eller logik samtidigt. I WebdriverIO kan du ta snapshots av valfritt objekt samt en WebElement DOM-struktur eller WebdriverIO-kommandoresultat.

Liknande andra testramverk kommer WebdriverIO att ta en snapshot av det givna värdet och sedan jämföra det med en referens-snapshot-fil som lagras tillsammans med testet. Testet kommer att misslyckas om de två snapshotsen inte matchar: antingen är förändringen oväntad, eller så behöver referenssnapshoten uppdateras till den nya versionen av resultatet.

:::info Stöd för flera plattformar

Dessa snapshot-funktioner är tillgängliga för att köra end-to-end-tester i Node.js-miljön samt för att köra [enhets- och komponenttester](/docs/component-testing) i webbläsaren eller på mobila enheter.

:::

## Använd Snapshots
För att ta en snapshot av ett värde kan du använda `toMatchSnapshot()` från [`expect()`](/docs/api/expect-webdriverio) API:t:

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Första gången detta test körs skapar WebdriverIO en snapshot-fil som ser ut så här:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Snapshot-artefakten bör committas tillsammans med kodändringar och granskas som en del av din kodgranskningsprocess. Vid efterföljande testkörningar kommer WebdriverIO att jämföra den renderade utdata med föregående snapshot. Om de matchar kommer testet att godkännas. Om de inte matchar har testrunner antingen hittat en bugg i din kod som bör åtgärdas, eller så har implementeringen ändrats och snapshot behöver uppdateras.

För att uppdatera snapshot, skicka med flaggan `-s` (eller `--updateSnapshot`) till `wdio`-kommandot, t.ex.:

```sh
npx wdio run wdio.conf.js -s
```

__Obs:__ om du kör tester med flera webbläsare parallellt skapas och jämförs endast en snapshot. Om du vill ha en separat snapshot per kapacitet, vänligen [skapa ett ärende](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) och berätta om ditt användningsfall.

## Inline Snapshots

På liknande sätt kan du använda `toMatchInlineSnapshot()` för att lagra snapshot inline i testfilen.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Istället för att skapa en snapshot-fil kommer Vitest att modifiera testfilen direkt för att uppdatera snapshot som en sträng:

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

Detta låter dig se den förväntade utdata direkt utan att behöva hoppa mellan olika filer.

## Visuella Snapshots

Att ta en DOM-snapshot av ett element kanske inte är den bästa idén, särskilt om DOM-strukturen är för stor och innehåller dynamiska elementegenskaper. I dessa fall rekommenderas det att förlita sig på visuella snapshots för element.

För att aktivera visuella snapshots, lägg till `@wdio/visual-service` till din uppsättning. Du kan följa uppsättningsinstruktionerna i [dokumentationen](/docs/visual-testing#installation) för Visuell Testning.

Du kan sedan ta en visuell snapshot via `toMatchElementSnapshot()`, t.ex.:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

En bild lagras sedan i baseline-katalogen. Kolla in [Visuell Testning](/docs/visual-testing) för mer information.