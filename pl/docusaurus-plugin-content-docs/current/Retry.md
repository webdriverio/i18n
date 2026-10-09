---
id: retry
title: Ponawianie niestabilnych testów
description: "Ponawiaj niestabilne testy w Mocha, Jasmine lub Cucumber, uruchamiaj ponownie całe pliki specyfikacji i uruchamiaj konkretny test wielokrotnie, aby wykryć niestabilność."
---

Za pomocą testrunnera WebdriverIO możesz ponownie uruchamiać określone testy, które okazują się niestabilne z powodu takich czynników jak zawodna sieć czy wyścigi (race conditions). (Nie zaleca się jednak po prostu zwiększania liczby ponownych uruchomień, jeśli testy stają się niestabilne!)

## Ponowne uruchamianie zestawów testów w Mocha

Od wersji 3 Mocha możesz ponownie uruchamiać całe zestawy testów (wszystko wewnątrz bloku `describe`). Jeśli używasz Mocha, powinieneś preferować ten mechanizm ponawiania zamiast implementacji WebdriverIO, która pozwala jedynie na ponowne uruchamianie określonych bloków testowych (wszystkiego wewnątrz bloku `it`). Aby użyć metody `this.retries()`, blok zestawu `describe` musi używać niepowiązanej funkcji `function(){}` zamiast funkcji strzałkowej `() => {}`, jak opisano w [dokumentacji Mocha](https://mochajs.org/#arrow-functions). Korzystając z Mocha, możesz również ustawić liczbę ponowień dla wszystkich specyfikacji za pomocą `mochaOpts.retries` w pliku `wdio.conf.js`.

Oto przykład:

```js
describe('retries', function () {
    // Ponów wszystkie testy w tym zestawie maksymalnie 4 razy
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

Aby ponownie uruchomić określony blok testowy, wystarczy podać liczbę ponownych uruchomień jako ostatni parametr po funkcji bloku testowego:

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
     * specyfikacja uruchamiana maksymalnie 4 razy (1 właściwe uruchomienie + 3 ponowne)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // zwraca liczbę ponowień
        // ...
    }, 3)
})
```

To samo działa również dla hooków:

```js
describe('my flaky app', () => {
    /**
     * hook uruchamiany maksymalnie 2 razy (1 właściwe uruchomienie + 1 ponowne)
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
     * specyfikacja uruchamiana maksymalnie 4 razy (1 właściwe uruchomienie + 3 ponowne)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // zwraca liczbę ponowień
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

To samo działa również dla hooków:

```js
describe('my flaky app', () => {
    /**
     * hook uruchamiany maksymalnie 2 razy (1 właściwe uruchomienie + 1 ponowne)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Jeśli używasz Jasmine, drugi parametr jest zarezerwowany dla limitu czasu (timeout). Aby zastosować parametr ponowień, musisz ustawić limit czasu na jego wartość domyślną `jasmine.DEFAULT_TIMEOUT_INTERVAL`, a następnie podać liczbę ponowień.

</TabItem>
</Tabs>

Ten mechanizm ponawiania pozwala jedynie na ponawianie pojedynczych hooków lub bloków testowych. Jeśli Twojemu testowi towarzyszy hook konfigurujący aplikację, ten hook nie zostanie uruchomiony. [Mocha oferuje](https://mochajs.org/#retry-tests) natywne ponawianie testów, które zapewnia takie zachowanie, natomiast Jasmine nie. Liczbę wykonanych ponowień możesz odczytać w hooku `afterTest`.

## Ponowne uruchamianie w Cucumber

### Ponowne uruchamianie pełnych zestawów w Cucumber

W przypadku cucumber >=6 możesz podać opcję konfiguracyjną [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) wraz z opcjonalnym parametrem `retryTagFilter`, aby wszystkie lub niektóre z nieudanych scenariuszy były dodatkowo ponawiane aż do skutku. Aby ta funkcja działała, musisz ustawić `scenarioLevelReporter` na `true`.

### Ponowne uruchamianie definicji kroków w Cucumber

Aby zdefiniować liczbę ponownych uruchomień dla określonych definicji kroków, wystarczy zastosować do nich opcję ponawiania, na przykład:

```js
export default function () {
    /**
     * definicja kroku uruchamiana maksymalnie 3 razy (1 właściwe uruchomienie + 2 ponowne)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Ponowne uruchomienia można definiować wyłącznie w pliku definicji kroków, nigdy w pliku feature.

## Dodawanie ponowień dla poszczególnych plików specyfikacji

Wcześniej dostępne były jedynie ponowienia na poziomie testu i zestawu, które w większości przypadków są wystarczające.

Jednak w testach, które wiążą się ze stanem (na przykład na serwerze lub w bazie danych), stan może pozostać nieprawidłowy po pierwszym niepowodzeniu testu. Kolejne ponowienia mogą nie mieć szans na powodzenie z powodu nieprawidłowego stanu, od którego by się rozpoczynały.

Dla każdego pliku specyfikacji tworzona jest nowa instancja `browser`, co czyni to miejsce idealnym do podpięcia się i skonfigurowania wszelkich innych stanów (serwer, bazy danych). Ponowienia na tym poziomie oznaczają, że cały proces konfiguracji zostanie po prostu powtórzony, tak jakby dotyczył nowego pliku specyfikacji.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * Liczba ponowień całego pliku specyfikacji, gdy zakończy się on niepowodzeniem jako całość
     */
    specFileRetries: 1,
    /**
     * Opóźnienie w sekundach między kolejnymi próbami ponowienia pliku specyfikacji
     */
    specFileRetriesDelay: 0,
    /**
     * Ponawiane pliki specyfikacji są wstawiane na początek kolejki i ponawiane natychmiast
     */
    specFileRetriesDeferred: false
}
```

## Wielokrotne uruchamianie konkretnego testu

Ma to pomóc w zapobieganiu wprowadzania niestabilnych testów do bazy kodu. Dodanie opcji CLI `--repeat` spowoduje uruchomienie wskazanych specyfikacji lub zestawów N razy. Przy użyciu tej flagi CLI należy również podać flagę `--spec` lub `--suite`.

Podczas dodawania nowych testów do bazy kodu, zwłaszcza poprzez proces CI/CD, testy mogą przejść i zostać scalone, ale później stać się niestabilne. Ta niestabilność może wynikać z wielu czynników, takich jak problemy z siecią, obciążenie serwera, rozmiar bazy danych itp. Użycie flagi `--repeat` w procesie CI/CD może pomóc wychwycić takie niestabilne testy, zanim zostaną scalone z główną bazą kodu.

Jedną ze strategii jest uruchamianie testów w zwykły sposób w procesie CI/CD, a w przypadku wprowadzania nowego testu uruchomienie dodatkowego zestawu testów z nową specyfikacją wskazaną w `--spec` wraz z `--repeat`, tak aby nowy test został uruchomiony x razy. Jeśli test zakończy się niepowodzeniem w którymkolwiek z tych uruchomień, nie zostanie scalony i trzeba będzie zbadać, dlaczego się nie powiódł.

```sh
# To uruchomi specyfikację example.e2e.js 5 razy
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```