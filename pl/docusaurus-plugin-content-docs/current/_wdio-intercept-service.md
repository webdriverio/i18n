---
id: wdio-intercept-service
title: Usługa Przechwytywania
custom_edit_url: https://github.com/webdriverio-community/wdio-intercept-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-intercept-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/webdriverio-community/wdio-intercept-service) | [npm](https://www.npmjs.com/package/wdio-intercept-service)

🕸 Przechwytywanie i weryfikacja wywołań HTTP ajax w [webdriver.io](http://webdriver.io/)

[![Tests](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml) [![Join the chat on Discord](https://img.shields.io/discord/1097401827202445382?logo=discord&logoColor=FFFFFF&color=5865F2)](https://discord.webdriver.io/)

To jest wtyczka dla [webdriver.io](http://webdriver.io/). Jeśli jeszcze jej nie znasz, sprawdź, jest całkiem fajna.

Chociaż selenium i webdriver są używane do testów e2e, a zwłaszcza testów UI, możesz chcieć ocenić żądania HTTP wykonane przez kod klienta (np. gdy nie masz natychmiastowej informacji zwrotnej z UI, jak w przypadku metryk lub śledzenia wywołań). Dzięki wdio-intercept-service możesz przechwytywać wywołania HTTP ajax zainicjowane przez działanie użytkownika (np. naciśnięcie przycisku itp.) i później sprawdzać założenia dotyczące żądania oraz odpowiedzi.

Jest jednak jeden haczyk: nie możesz przechwytywać wywołań HTTP, które są inicjowane podczas ładowania strony (jak w większości SPA), ponieważ wymaga to pewnych prac przygotowawczych, które można wykonać dopiero po załadowaniu strony (ze względu na ograniczenia w selenium). **To oznacza, że możesz przechwytywać tylko żądania zainicjowane wewnątrz testu.** Jeśli to ci odpowiada, ta wtyczka może być dla ciebie, więc czytaj dalej.

## Wymagania wstępne

* webdriver.io **v5.x** lub nowszy.

**Uwaga! Jeśli nadal używasz webdriver.io v4, korzystaj z gałęzi v2.x tej wtyczki!**

## Instalacja

```shell
npm install wdio-intercept-service -D
```

## Użycie

### Użycie z WebDriver CLI

Powinno być tak proste, jak dodanie wdio-intercept-service do twojego pliku `wdio.conf.js`:

```javascript
exports.config = {
  // ...
  services: ['intercept']
  // ...
};
```

i wszystko gotowe.

### Użycie z WebDriver Standalone

Podczas korzystania z WebdriverIO Standalone, funkcje `before` i `beforeTest` / `beforeScenario` muszą być wywołane ręcznie.

```javascript
import { remote } from 'webdriverio';
import WebdriverAjax from 'wdio-intercept-service'

const WDIO_OPTIONS = {
  port: 9515,
  path: '/',
  capabilities: {
    browserName: 'chrome'
  },
}

let browser;
const interceptServiceLauncher = WebdriverAjax();

beforeAll(async () => {
  browser = await remote(WDIO_OPTIONS)
  interceptServiceLauncher.before(null, null, browser)
})

beforeEach(async () => {
  interceptServiceLauncher.beforeTest()
})

afterAll(async () => {
  await client.deleteSession()
});

describe('', async () => {
  ... // See example usage
});
```

Po inicjalizacji, kilka powiązanych funkcji jest dodawanych do łańcucha poleceń twojej przeglądarki (patrz [API](#api)).

## Szybki start

Przykład użycia:

```javascript
browser.url('http://foo.bar');
browser.setupInterceptor(); // capture ajax calls
browser.expectRequest('GET', '/api/foo', 200); // expect GET request to /api/foo with 200 statusCode
browser.expectRequest('POST', '/api/foo', 400); // expect POST request to /api/foo with 400 statusCode
browser.expectRequest('GET', /\/api\/foo/, 200); // can validate a URL with regex, too
browser.click('#button'); // button that initiates ajax request
browser.pause(1000); // maybe wait a bit until request is finished
browser.assertRequests(); // validate the requests
```

Uzyskaj szczegóły o żądaniach:

```javascript
browser.url('http://foo.bar')
browser.setupInterceptor();
browser.click('#button')
browser.pause(1000);

var request = browser.getRequest(0);
assert.equal(request.method, 'GET');
assert.equal(request.response.headers['content-length'], '42');
```

## Obsługiwane przeglądarki

Powinno działać z nowszymi wersjami wszystkich przeglądarek. Zgłoś problem, jeśli nie działa z twoją.

## API

Sprawdź plik deklaracji TypeScript, aby poznać pełną składnię niestandardowych poleceń dodanych do obiektu przeglądarki WebdriverIO. Ogólnie rzecz biorąc, każda metoda, która przyjmuje obiekt "options" jako parametr, może być wywołana bez tego parametru w celu uzyskania domyślnego zachowania. Te "opcjonalne opcje" są oznaczone jako `?: = {}`, a domyślne wartości są opisane dla każdej metody.

### Opis opcji

Ta biblioteka oferuje niewielką możliwość konfiguracji podczas wydawania poleceń. Opcje konfiguracji używane przez wiele metod są opisane tutaj (patrz definicja każdej metody, aby określić konkretne wsparcie).

* `orderBy` (`'START' | 'END'`): Ta opcja kontroluje kolejność żądań przechwyconych przez interceptor, zwracanych do testu. Dla zachowania zgodności z istniejącymi wersjami tej biblioteki, domyślne sortowanie to `'END'`, co odpowiada momentowi zakończenia żądania. Jeśli ustawisz opcję `orderBy` na `'START'`, żądania będą sortowane według czasu ich rozpoczęcia.
* `includePending` (`boolean`): Ta opcja kontroluje, czy niezakończone jeszcze żądania będą zwracane. Dla zachowania zgodności z istniejącymi wersjami tej biblioteki, domyślna wartość to `false` i tylko zakończone żądania są zwracane.

### browser.setupInterceptor()

Przechwytuje wywołania ajax w przeglądarce. Zawsze musisz wywołać funkcję konfiguracji, aby później ocenić żądania.

### browser.disableInterceptor()

Zapobiega dalszemu przechwytywaniu wywołań ajax w przeglądarce. Wszystkie przechwycone informacje o żądaniach są usuwane. Większość użytkowników nie będzie musiała wyłączać interceptora, ale jeśli test jest szczególnie długi lub przekracza pojemność pamięci sesji, wyłączenie interceptora może być pomocne.

### `browser.excludeUrls(urlRegexes: (string | RegExp)[])`

Wyklucza rejestrowanie żądań z określonych adresów URL. Przyjmuje tablicę ciągów znaków lub wyrażeń regularnych. Przed zapisaniem do pamięci, 
testuje adres URL żądania względem każdego ciągu lub wyrażenia regularnego. Jeśli pasuje, żądanie nie jest zapisywane w pamięci. Podobnie jak disableInterceptor, może to być pomocne, 
jeśli pojawią się problemy z przekroczeniem pojemności pamięci sesji.

### browser.expectRequest(method: string, url: string, statusCode: number)

Tworzy oczekiwania dotyczące żądań ajax, które zostaną zainicjowane podczas testu. Może (i powinno) być łączone w łańcuch. Kolejność oczekiwań powinna odpowiadać kolejności wykonywanych żądań.

* `method` (`String`): metoda http, której się oczekuje. Może być wszystkim co `xhr.open()` akceptuje jako pierwszy argument.
* `url` (`String`|`RegExp`): dokładny URL, który jest wywoływany w żądaniu jako ciąg znaków lub RegExp do dopasowania
* `statusCode` (`Number`): oczekiwany kod statusu odpowiedzi

### browser.getExpectations()

Metoda pomocnicza. Zwraca wszystkie oczekiwania, które utworzyłeś do tego momentu

### browser.resetExpectations()

Metoda pomocnicza. Resetuje wszystkie oczekiwania, które utworzyłeś do tego momentu

### `browser.assertRequests({ orderBy?: 'START' | 'END' }?: = {})`

Wywołaj tę metodę, gdy wszystkie oczekiwane żądania ajax są zakończone. Porównuje oczekiwania z faktycznie wykonanymi żądaniami i potwierdza następujące:

- Liczbę wykonanych żądań
- Kolejność żądań
- Metoda, URL i kod statusu powinny pasować do każdego wykonanego żądania
- Obiekt opcji domyślnie ma wartość `{ orderBy: 'END' }`, czyli kiedy żądania zostały zakończone, aby zachować zgodność z zachowaniem wersji 4.1.10 i wcześniejszych. Gdy opcja `orderBy` jest ustawiona na `'START'`, żądania będą uporządkowane według momentu, w którym zostały zainicjowane przez stronę.

### `browser.assertExpectedRequestsOnly({ inOrder?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Podobny do `browser.assertRequests`, ale sprawdza tylko żądania określone w dyrektywach `expectRequest`, bez konieczności mapowania wszystkich żądań sieciowych, które mogą się wokół tego zdarzyć. Jeśli opcja `inOrder` jest ustawiona na `true` (domyślnie), oczekuje się, że żądania zostaną znalezione w tej samej kolejności, w jakiej zostały skonfigurowane za pomocą `expectRequest`.

### `browser.getRequest(index: number, { includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Aby dokonać bardziej skomplikowanych asercji dotyczących konkretnego żądania, możesz uzyskać szczegóły dla konkretnego żądania. Musisz podać indeks żądania (zaczynając od 0), do którego chcesz uzyskać dostęp, w kolejności zakończenia żądań (domyślnie) lub ich zainicjowania (przekazując opcję `orderBy: 'START'`).

* `index` (`number`): numer żądania, do którego chcesz uzyskać dostęp
* `options` (`object`): Opcje konfiguracji
* `options.includePending` (`boolean`): Czy niezakończone jeszcze żądania powinny być zwracane. Domyślnie wartość to false, aby odpowiadać zachowaniu biblioteki w wersji 4.1.10 i wcześniejszych.
* `options.orderBy` (`'START' | 'END'`): Jak powinny być uporządkowane żądania. Domyślnie jest to `'END'`, aby odpowiadać zachowaniu biblioteki w wersji 4.1.10 i wcześniejszych. Jeśli ustawiono `'START'`, żądania będą uporządkowane według czasu zainicjowania, a nie czasu zakończenia żądania. (Ponieważ oczekujące żądanie nie zostało jeszcze zakończone, przy sortowaniu według `'END'` wszystkie oczekujące żądania pojawią się po wszystkich zakończonych żądaniach.)

**Zwraca** obiekt `request`:

* `request.url`: żądany URL
* `request.method`: użyta metoda HTTP
* `request.body`: dane ładunku/treści użyte w żądaniu
* `request.headers`: nagłówki http żądania jako obiekt JS
* `request.pending`: flaga logiczna określająca, czy to żądanie jest zakończone (tj. ma właściwość `response`), czy w trakcie.
* `request.response`: obiekt JS, który jest obecny tylko wtedy, gdy żądanie jest zakończone (tj. `request.pending === false`), zawierający dane o odpowiedzi.
* `request.response?.headers`: nagłówki http odpowiedzi jako obiekt JS
* `request.response?.body`: treść odpowiedzi (będzie parsowana jako JSON, jeśli to możliwe)
* `request.response?.statusCode`: kod statusu odpowiedzi

**Uwaga dotycząca `request.body`:** wdio-intercept-service spróbuje sparsować treść żądania w następujący sposób:

* string: Po prostu zwróci ciąg znaków (`'value'`)
* JSON: Sparsuje obiekt JSON za pomocą `JSON.parse()` (`({ key: value })`)
* FormData: Wyświetli FormData w formacie `{ key: [value1, value2, ...] }`
* ArrayBuffer: Spróbuje przekonwertować bufor na ciąg znaków (eksperymentalne)
* Wszystko inne: Użyje surowego `JSON.stringify()` na twoich danych. Powodzenia!

**Dla API `fetch` obsługujemy tylko dane typu string i JSON!**

### `browser.getRequests({ includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Pobiera wszystkie przechwycone żądania jako tablicę, obsługując te same opcjonalne ustawienia co `getRequest`.

**Zwraca** tablicę obiektów `request`.

### browser.hasPendingRequests()

Metoda narzędziowa, która sprawdza, czy jakiekolwiek żądania HTTP są nadal w toku. Może być używana przez testy, aby upewnić się, że wszystkie żądania zostały zakończone w rozsądnym czasie, lub aby sprawdzić, czy wywołanie `getRequests()` lub `assertRequests()` będzie zawierać wszystkie żądane żądania HTTP.

**Zwraca** wartość logiczną

## Wsparcie dla TypeScript

Ta wtyczka dostarcza własne typy TS. Wystarczy, że wskażesz swój tsconfig na rozszerzenia typów, jak wspomniano [tutaj](https://webdriver.io/docs/typescript.html#framework-types):

```
"compilerOptions": {
    // ..
    "types": ["node", "webdriverio", "wdio-intercept-service"]
},
```

## Uruchamianie testów

Do uruchomienia testów lokalnie wymagane są najnowsze wersje Chrome i Firefox. Może być konieczna aktualizacja zależności `chromedriver` i `geckodriver`, aby dopasować je do wersji zainstalowanych w twoim systemie.

```shell
npm test
```

## Współpraca

Jestem otwarty na każdy wkład. Wystarczy otworzyć issue lub bezpośrednio złożyć PR.  
Należy pamiętać, że ta biblioteka przechwytująca jest napisana tak, aby działała ze starszymi przeglądarkami, takimi jak Internet Explorer. Dlatego dowolny kod użyty w `lib/interceptor.js` musi być co najmniej możliwy do sparsowania przez środowisko JavaScript Internet Explorera.

## Licencja

MIT