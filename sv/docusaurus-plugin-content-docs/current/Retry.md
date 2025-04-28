---
id: retry
title: Upprepa Opålitliga Tester
---

Du kan köra om vissa tester med WebdriverIO testrunner som visar sig vara instabila på grund av saker som opålitliga nätverk eller race conditions. (Det rekommenderas dock inte att helt enkelt öka antalet omkörningar om tester blir instabila!)

## Köra om test-sviter i Mocha

Sedan version 3 av Mocha kan du köra om hela test-sviter (allt inom ett `describe`-block). Om du använder Mocha bör du föredra denna omkörningsmekanism istället för WebdriverIO-implementeringen som bara låter dig köra om vissa testblock (allt inom ett `it`-block). För att använda metoden `this.retries()` måste svitblocket `describe` använda en obunden funktion `function(){}` istället för en pilfunction `() => {}`, som beskrivs i [Mocha-dokumentationen](https://mochajs.org/#arrow-functions). Med Mocha kan du också ställa in antal omkörningar för alla specs genom att använda `mochaOpts.retries` i din `wdio.conf.js`.

Här är ett exempel:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Köra om enskilda tester i Jasmine eller Mocha

För att köra om ett visst testblock kan du helt enkelt lägga till antalet omkörningar som sista parameter efter testblockfunktionen:

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
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

Samma fungerar för hooks också:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
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
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Samma fungerar för hooks också:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Om du använder Jasmine är den andra parametern reserverad för timeout. För att använda en omkörsparameter måste du ställa in timeout till dess standardvärde `jasmine.DEFAULT_TIMEOUT_INTERVAL` och sedan lägga till ditt antal omkörningar.

</TabItem>
</Tabs>

Denna omkörningsmekanism tillåter endast omkörning av enskilda hooks eller testblock. Om ditt test åtföljs av en hook för att ställa in din applikation, körs inte denna hook. [Mocha erbjuder](https://mochajs.org/#retry-tests) inbyggda testomkörningar som ger detta beteende medan Jasmine inte gör det. Du kan komma åt antalet utförda omkörningar i `afterTest`-hooken.

## Omkörning i Cucumber

### Köra om hela sviter i Cucumber

För cucumber >=6 kan du använda konfigurationsalternativet [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) tillsammans med en valfri parameter `retryTagFilter` för att få alla eller vissa av dina misslyckade scenarier att få ytterligare försök tills de lyckas. För att denna funktion ska fungera måste du ställa in `scenarioLevelReporter` till `true`.

### Köra om Step Definitions i Cucumber

För att definiera en omkörsfrekvens för en viss stepdefinition, lägg bara till ett retry-alternativ till den, som:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Omkörningar kan endast definieras i din step definitions-fil, aldrig i din feature-fil.

## Lägg till omkörningar på per-specfil-basis

Tidigare var endast test- och svit-nivå-omkörningar tillgängliga, vilket är bra i de flesta fall.

Men i tester som involverar tillstånd (som på en server eller i en databas) kan tillståndet lämnas ogiltigt efter det första testmisslyckandet. Alla efterföljande omkörningar kan ha ingen chans att lyckas, på grund av det ogiltiga tillstånd de skulle börja med.

En ny `browser`-instans skapas för varje specfil, vilket gör detta till en idealisk plats att koppla in och ställa in andra tillstånd (server, databaser). Omkörningar på denna nivå innebär att hela inställningsprocessen helt enkelt upprepas, precis som om det vore för en ny specfil.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## Kör ett specifikt test flera gånger

Detta är för att hjälpa till att förhindra att opålitliga tester införs i en kodbas. Genom att lägga till CLI-alternativet `--repeat` kommer det att köra de angivna specs eller sviter N gånger. När du använder denna CLI-flagga måste även `--spec` eller `--suite`-flaggan specificeras.

När du lägger till nya tester i en kodbas, särskilt genom en CI/CD-process, kan testerna passera och slås samman men senare bli opålitliga. Denna opålitlighet kan komma från en rad olika saker som nätverksproblem, serverbelastning, databasstorlek, etc. Att använda `--repeat`-flaggan i din CD/CD-process kan hjälpa till att fånga dessa opålitliga tester innan de slås samman till en huvudkodbas.

En strategi att använda är att köra dina tester som vanligt i din CI/CD-process, men om du introducerar ett nytt test kan du sedan köra en annan uppsättning tester med det nya specet specificerat i `--spec` tillsammans med `--repeat` så att det kör det nya testet x antal gånger. Om testet misslyckas någon av dessa gånger kommer testet inte att slås samman och man måste undersöka varför det misslyckades.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```