---
id: retry
title: Ponawianie Niestabilnych Testów
---

Za pomocą testera WebdriverIO możesz ponownie uruchomić niektóre testy, które okazały się niestabilne z powodu niestabilnej sieci lub warunków wyścigu. (Jednak nie zaleca się po prostu zwiększania liczby ponownych uruchomień, jeśli testy stają się niestabilne!)

## Ponowne uruchamianie zestawów testów w Mocha

Od wersji 3 Mocha, możesz ponownie uruchamiać całe zestawy testów (wszystko wewnątrz bloku `describe`). Jeśli używasz Mocha, powinieneś preferować ten mechanizm ponownych prób zamiast implementacji WebdriverIO, która pozwala tylko na ponowne uruchomienie określonych bloków testowych (wszystko w bloku `it`). Aby użyć metody `this.retries()`, blok zestawu `describe` musi używać niezwiązanej funkcji `function(){}` zamiast funkcji strzałkowej `() => {}`, jak opisano w [dokumentacji Mocha](https://mochajs.org/#arrow-functions). Używając Mocha, możesz również ustawić liczbę ponownych prób dla wszystkich testów za pomocą `mochaOpts.retries` w pliku `wdio.conf.js`.

Oto przykład:

```js
describe('retries', function () {
    // Ponów wszystkie testy w tym zestawie do 4 razy
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Określ, że ten test ma być ponawiany maksymalnie 2 razy
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Ponowne uruchamianie pojedynczych testów w Jasmine lub Mocha

Aby ponownie uruchomić określony blok testowy, możesz po prostu zastosować liczbę ponownych uruchomień jako ostatni parametr po funkcji bloku testowego:

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

To samo działa również dla hooków:

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

To samo działa również dla hooków:

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

Jeśli używasz Jasmine, drugi parametr jest zarezerwowany dla limitu czasu. Aby zastosować parametr ponownych prób, musisz ustawić limit czasu na jego domyślną wartość `jasmine.DEFAULT_TIMEOUT_INTERVAL`, a następnie zastosować liczbę ponownych prób.

</TabItem>
</Tabs>

Ten mechanizm ponownych prób pozwala tylko na ponowne uruchomienie pojedynczych hooków lub bloków testowych. Jeśli twój test jest połączony z hookiem do skonfigurowania aplikacji, ten hook nie jest uruchamiany. [Mocha oferuje](https://mochajs.org/#retry-tests) natywne ponowne próby testów, które zapewniają takie zachowanie, podczas gdy Jasmine nie. Możesz uzyskać dostęp do liczby wykonanych ponownych prób w hooku `afterTest`.

## Ponowne uruchamianie w Cucumber

### Ponowne uruchamianie pełnych zestawów w Cucumber

Dla cucumber >=6 możesz dostarczyć opcję konfiguracji [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) wraz z opcjonalnym parametrem `retryTagFilter`, aby wszystkie lub niektóre z twoich nieudanych scenariuszy otrzymały dodatkowe próby aż do sukcesu. Aby ta funkcja działała, musisz ustawić `scenarioLevelReporter` na `true`.

### Ponowne uruchamianie definicji kroków w Cucumber

Aby zdefiniować wskaźnik ponownych uruchomień dla określonych definicji kroków, po prostu zastosuj opcję retry, na przykład:

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

Ponowne uruchomienia można definiować tylko w pliku definicji kroków, nigdy w pliku funkcji.

## Dodawanie ponownych prób na poziomie pliku specyfikacji

Wcześniej dostępne były tylko ponowne próby na poziomie testu i zestawu, co jest wystarczające w większości przypadków.

Ale w przypadku testów, które obejmują stan (na przykład na serwerze lub w bazie danych), stan może pozostać nieprawidłowy po pierwszym niepowodzeniu testu. Wszelkie późniejsze próby mogą nie mieć szans na powodzenie z powodu nieprawidłowego stanu, od którego zaczynają.

Nowa instancja `browser` jest tworzona dla każdego pliku specyfikacji, co czyni to idealnym miejscem do podpięcia i konfiguracji innych stanów (serwer, bazy danych). Ponowne próby na tym poziomie oznaczają, że cały proces konfiguracji zostanie po prostu powtórzony, tak jakby było to dla nowego pliku specyfikacji.

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

## Uruchom określony test wielokrotnie

Ma to na celu zapobieganie wprowadzaniu niestabilnych testów do bazy kodu. Dodając opcję cli `--repeat`, określone testy lub zestawy będą uruchamiane N razy. Podczas używania tej flagi cli, flaga `--spec` lub `--suite` musi być również określona.

Podczas dodawania nowych testów do bazy kodu, szczególnie poprzez proces CI/CD, testy mogą przejść i zostać scalone, ale później stać się niestabilne. Ta niestabilność może wynikać z różnych rzeczy, takich jak problemy z siecią, obciążenie serwera, rozmiar bazy danych itp. Używanie flagi `--repeat` w procesie CD/CD może pomóc wyłapać te niestabilne testy, zanim zostaną scalone z główną bazą kodu.

Jedną ze strategii, którą można zastosować, jest uruchamianie testów jak zwykle w procesie CI/CD, ale jeśli wprowadzasz nowy test, możesz uruchomić kolejny zestaw testów z nową specyfikacją określoną w `--spec` wraz z `--repeat`, aby ten nowy test został uruchomiony x razy. Jeśli test nie powiedzie się w którymkolwiek z tych uruchomień, nie zostanie scalony i będzie trzeba sprawdzić, dlaczego się nie powiódł.

```sh
# To uruchomi test example.e2e.js 5 razy
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```