---
id: snapshot
title: Ögonblicksbild
---

Ögonblicksbildstester kan vara mycket användbara för att kontrollera flera aspekter av din komponent eller logik samtidigt. I WebdriverIO kan du ta ögonblicksbilder av godtyckliga objekt samt av WebElement DOM-struktur eller WebdriverIO-kommandon.

På samma sätt som i andra testramverk tar WebdriverIO en ögonblicksbild av det givna värdet och jämför det sedan med en referens-ögonblicksbild som lagras tillsammans med testet. Testet kommer att misslyckas om de två ögonblicksbilderna inte matchar: antingen är förändringen oväntad, eller så behöver referens-ögonblicksbilden uppdateras till den nya versionen av resultatet.

:::info Stöd för olika plattformar

Dessa ögonblicksbildsfunktioner finns tillgängliga för att köra end-to-end-tester i Node.js-miljön samt för att köra [enhets- och komponenttester](/docs/component-testing) i webbläsaren eller på mobila enheter.

:::

## Använda ögonblicksbilder
För att ta en ögonblicksbild av ett värde kan du använda `toMatchSnapshot()` från [`expect()`](/docs/api/expect-webdriverio) API:

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Första gången testet körs skapar WebdriverIO en ögonblicksbildsfil som ser ut så här:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Ögonblicksbildsartefakten bör checkas in tillsammans med kodändringar och granskas som en del av din kodgranskningsprocess. Vid efterföljande testkörningar kommer WebdriverIO att jämföra den renderade utdata med den tidigare ögonblicksbilden. Om de matchar kommer testet att lyckas. Om de inte matchar har testutföraren antingen hittat ett fel i din kod som bör åtgärdas, eller så har implementeringen ändrats och ögonblicksbilden behöver uppdateras.

För att uppdatera ögonblicksbilden, skicka med `-s` flaggan (eller `--updateSnapshot`) till `wdio`-kommandot, t.ex.:

```sh
npx wdio run wdio.conf.js -s
```

__Observera:__ om du kör tester med flera webbläsare parallellt skapas och jämförs endast en ögonblicksbild. Om du vill ha en separat ögonblicksbild per capability, vänligen [skapa ett ärende](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) och berätta om ditt användningsfall.

## Inline-ögonblicksbilder

På liknande sätt kan du använda `toMatchInlineSnapshot()` för att lagra ögonblicksbilden inline i testfilen.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Istället för att skapa en ögonblicksbildsfil kommer Vitest att modifiera testfilen direkt för att uppdatera ögonblicksbilden som en sträng:

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

Detta gör att du kan se förväntad utdata direkt utan att behöva hoppa mellan olika filer.

## Visuella ögonblicksbilder

Att ta en DOM-ögonblicksbild av ett element kanske inte är den bästa idén, särskilt om DOM-strukturen är för stor och innehåller dynamiska elementegenskaper. I dessa fall rekommenderas att förlita sig på visuella ögonblicksbilder för element.

För att aktivera visuella ögonblicksbilder, lägg till `@wdio/visual-service` i din konfiguration. Du kan följa installationsanvisningarna i [dokumentationen](/docs/visual-testing#installation) för visuell testning.

Du kan sedan ta en visuell ögonblicksbild via `toMatchElementSnapshot()`, t.ex.:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

En bild lagras då i baseline-katalogen. Kolla in [Visuell testning](/docs/visual-testing) för mer information.