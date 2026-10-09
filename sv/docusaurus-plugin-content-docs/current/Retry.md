---
id: retry
title: Kör om instabila tester
description: "Kör om instabila tester i Mocha, Jasmine eller Cucumber, kör om hela spec-filer och kör ett specifikt test flera gånger för att upptäcka instabilitet."
---

Du kan köra om vissa tester med WebdriverIO-testrunnern som visar sig vara instabila på grund av saker som ett opålitligt nätverk eller race conditions. (Det rekommenderas dock inte att bara öka antalet omkörningar om tester blir instabila!)

## Kör om sviter i Mocha

Sedan version 3 av Mocha kan du köra om hela testsviter (allt inuti ett `describe`-block). Om du använder Mocha bör du föredra denna omkörningsmekanism istället för WebdriverIO-implementationen som bara låter dig köra om vissa testblock (allt inom ett `it`-block). För att använda metoden `this.retries()` måste svitblocket `describe` använda en obunden funktion `function(){}` istället för en arrow-funktion `() => {}`, som beskrivs i [Mocha-dokumentationen](https://mochajs.org/#arrow-functions). Med Mocha kan du också ange ett antal omkörningar för alla specs med hjälp av `mochaOpts.retries` i din `wdio.conf.js`.

Här är ett exempel:

```js
describe('retries', function () {
    // Kör om alla tester i denna svit upp till 4 gånger
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Ange att detta test bara ska köras om upp till 2 gånger
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Kör om enskilda tester i Jasmine eller Mocha

För att köra om ett visst testblock kan du helt enkelt ange antalet omkörningar som sista parameter efter testblockets funktion:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec som körs max 4 gånger (1 faktisk körning + 3 omkörningar)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returnerar antalet omkörningar
        // ...
    }, 3)
})
```

Samma sak fungerar även för hooks:

```js
describe('my flaky app', () => {
    /**
     * hook som körs max 2 gånger (1 faktisk körning + 1 omkörning)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec som körs max 4 gånger (1 faktisk körning + 3 omkörningar)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returnerar antalet omkörningar
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Samma sak fungerar även för hooks:

```js
describe('my flaky app', () => {
    /**
     * hook som körs max 2 gånger (1 faktisk körning + 1 omkörning)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Om du använder Jasmine är den andra parametern reserverad för timeout. För att ange en omkörningsparameter måste du sätta timeouten till dess standardvärde `jasmine.DEFAULT_TIMEOUT_INTERVAL` och sedan ange ditt antal omkörningar.

</TabItem>
</Tabs>

Denna omkörningsmekanism tillåter endast omkörning av enskilda hooks eller testblock. Om ditt test åtföljs av en hook för att sätta upp din applikation körs inte denna hook. [Mocha erbjuder](https://mochajs.org/#retry-tests) inbyggda testomkörningar som ger detta beteende, medan Jasmine inte gör det. Du kan komma åt antalet utförda omkörningar i `afterTest`-hooken.

## Omkörning i Cucumber

### Kör om hela sviter i Cucumber

För cucumber >=6 kan du ange konfigurationsalternativet [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) tillsammans med en valfri parameter `retryTagFilter` för att låta alla eller några av dina misslyckade scenarier få ytterligare omkörningar tills de lyckas. För att denna funktion ska fungera måste du sätta `scenarioLevelReporter` till `true`.

### Kör om stegdefinitioner i Cucumber

För att definiera ett antal omkörningar för vissa stegdefinitioner anger du helt enkelt ett retry-alternativ för den, till exempel:

```js
export default function () {
    /**
     * stegdefinition som körs max 3 gånger (1 faktisk körning + 2 omkörningar)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Omkörningar kan endast definieras i din fil med stegdefinitioner, aldrig i din feature-fil.

## Lägg till omkörningar per spec-fil

Tidigare fanns endast omkörningar på test- och svitnivå, vilka fungerar bra i de flesta fall.

Men i tester som involverar tillstånd (till exempel på en server eller i en databas) kan tillståndet lämnas ogiltigt efter det första testmisslyckandet. Eventuella efterföljande omkörningar kanske inte har någon chans att lyckas, på grund av det ogiltiga tillstånd de skulle börja med.

En ny `browser`-instans skapas för varje spec-fil, vilket gör detta till en idealisk plats att haka in och sätta upp andra tillstånd (server, databaser). Omkörningar på denna nivå innebär att hela uppsättningsprocessen helt enkelt upprepas, precis som om det vore för en ny spec-fil.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * Antalet gånger hela spec-filen ska köras om när den misslyckas som helhet
     */
    specFileRetries: 1,
    /**
     * Fördröjning i sekunder mellan omkörningsförsöken av spec-filen
     */
    specFileRetriesDelay: 0,
    /**
     * Omkörda spec-filer infogas i början av kön och körs om omedelbart
     */
    specFileRetriesDeferred: false
}
```

## Kör ett specifikt test flera gånger

Detta är till för att hjälpa till att förhindra att instabila tester introduceras i en kodbas. Genom att lägga till cli-alternativet `--repeat` körs de angivna specs eller sviterna N gånger. När du använder denna cli-flagga måste även flaggan `--spec` eller `--suite` anges.

När nya tester läggs till i en kodbas, särskilt genom en CI/CD-process, kan testerna passera och bli mergade men senare bli instabila. Denna instabilitet kan komma från ett antal saker som nätverksproblem, serverbelastning, databasstorlek osv. Att använda flaggan `--repeat` i din CI/CD-process kan hjälpa till att fånga dessa instabila tester innan de mergas in i en huvudkodbas.

En strategi är att köra dina tester som vanligt i din CI/CD-process, men om du introducerar ett nytt test kan du sedan köra ytterligare en uppsättning tester med den nya specen angiven i `--spec` tillsammans med `--repeat` så att det nya testet körs x antal gånger. Om testet misslyckas någon av dessa gånger kommer testet inte att mergas, och man behöver undersöka varför det misslyckades.

```sh
# Detta kör specen example.e2e.js 5 gånger
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```