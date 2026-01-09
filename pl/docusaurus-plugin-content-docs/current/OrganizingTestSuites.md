---
id: organizingsuites
title: Organizacja Zestawu Testów
---

Wraz z rozwojem projektów, nieuchronnie dodawane jest coraz więcej testów integracyjnych. To zwiększa czas budowania i spowalnia produktywność.

Aby temu zapobiec, powinieneś uruchamiać testy równolegle. WebdriverIO już testuje każdą specyfikację (lub _plik feature w Cucumber) równolegle w ramach pojedynczej sesji. Ogólnie rzecz biorąc, staraj się testować tylko jedną funkcję na plik specyfikacji. Staraj się nie mieć zbyt wielu lub zbyt mało testów w jednym pliku. (Jednak nie ma tu złotej reguły.)

Kiedy twoje testy składają się z kilku plików specyfikacji, powinieneś zacząć uruchamiać testy równocześnie. Aby to zrobić, dostosuj właściwość `maxInstances` w pliku konfiguracyjnym. WebdriverIO pozwala uruchamiać testy z maksymalną współbieżnością - co oznacza, że bez względu na to, ile masz plików i testów, wszystkie mogą być uruchamiane równolegle. (Podlega to jednak pewnym ograniczeniom, takim jak procesor komputera, ograniczenia współbieżności itp.)

> Powiedzmy, że masz 3 różne możliwości (Chrome, Firefox i Safari) i ustawiłeś `maxInstances` na `1`. Test runner WDIO utworzy 3 procesy. Dlatego, jeśli masz 10 plików specyfikacji i ustawisz `maxInstances` na `10`, _wszystkie_ pliki specyfikacji będą testowane jednocześnie i zostanie utworzonych 30 procesów.

Możesz zdefiniować właściwość `maxInstances` globalnie, aby ustawić atrybut dla wszystkich przeglądarek.

Jeśli uruchamiasz własną siatkę WebDriver, możesz (na przykład) mieć więcej możliwości dla jednej przeglądarki niż dla innej. W takim przypadku możesz _ograniczyć_ `maxInstances` w obiekcie capability:

```js
// wdio.conf.js
export const config = {
    // ...
    // ustawienie maxInstance dla wszystkich przeglądarek
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances może zostać nadpisany dla każdej możliwości. Więc jeśli masz wewnętrzną siatkę WebDriver
        // z tylko 5 dostępnymi instancjami firefox, możesz upewnić się, że nie więcej niż
        // 5 instancji zostanie uruchomionych jednocześnie.
        browserName: 'chrome'
    }],
    // ...
}
```

## Dziedziczenie z głównego pliku konfiguracyjnego

Jeśli uruchamiasz swój zestaw testów w wielu środowiskach (np. dev i integration), może to pomóc w używaniu wielu plików konfiguracyjnych, aby utrzymać rzeczy w sposób zarządzalny.

Podobnie jak w przypadku [koncepcji obiektów strony](pageobjects), pierwszą rzeczą, której potrzebujesz, jest główny plik konfiguracyjny. Zawiera wszystkie konfiguracje wspólne dla wszystkich środowisk.

Następnie utwórz inny plik konfiguracyjny dla każdego środowiska i uzupełnij główną konfigurację o konfiguracje specyficzne dla środowiska:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// główny plik konfiguracyjny jako domyślny, ale nadpisz informacje specyficzne dla środowiska
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // więcej możliwości zdefiniowanych tutaj
        // ...
    ],

    // uruchamiaj testy na sauce zamiast lokalnie
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// dodaj dodatkowy reporter
config.reporters.push('allure')
```

## Grupowanie specyfikacji testowych w zestawy

Możesz grupować specyfikacje testowe w zestawy i uruchamiać pojedyncze określone zestawy zamiast wszystkich.

Najpierw zdefiniuj swoje zestawy w konfiguracji WDIO:

```js
// wdio.conf.js
export const config = {
    // definiowanie wszystkich testów
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // definiowanie konkretnych zestawów
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

Teraz, jeśli chcesz uruchomić tylko jeden zestaw, możesz przekazać nazwę zestawu jako argument CLI:

```sh
wdio wdio.conf.js --suite login
```

Lub uruchomić wiele zestawów jednocześnie:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Grupowanie specyfikacji testowych do uruchomienia sekwencyjnego

Jak opisano powyżej, istnieją korzyści z uruchamiania testów równolegle. Jednak istnieją przypadki, w których korzystne byłoby grupowanie testów razem, aby uruchamiać je sekwencyjnie w jednej instancji. Przykłady tego to głównie przypadki, w których istnieje duży koszt konfiguracji, np. transpilacja kodu lub tworzenie instancji w chmurze, ale istnieją również zaawansowane modele użycia, które korzystają z tej możliwości.

Aby zgrupować testy do uruchomienia w jednej instancji, zdefiniuj je jako tablicę w definicji specyfikacji.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
W powyższym przykładzie testy "test_login.js", "test_product_order.js" i "test_checkout.js" będą uruchamiane sekwencyjnie w jednej instancji, a każdy z testów "test_b*" będzie uruchamiany równolegle w indywidualnych instancjach.

Możliwe jest również grupowanie specyfikacji zdefiniowanych w zestawach, więc możesz teraz również definiować zestawy w ten sposób:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
i w tym przypadku wszystkie testy z zestawu "end2end" będą uruchamiane w jednej instancji.

Podczas uruchamiania testów sekwencyjnie przy użyciu wzorca, pliki specyfikacji będą uruchamiane w porządku alfabetycznym

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

To uruchomi pliki pasujące do powyższego wzorca w następującej kolejności:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Uruchamianie wybranych testów

W niektórych przypadkach możesz chcieć wykonać tylko jeden test (lub podzbiór testów) z Twoich zestawów.

Za pomocą parametru `--spec` możesz określić, który _zestaw_ (Mocha, Jasmine) lub _feature_ (Cucumber) powinien zostać uruchomiony. Ścieżka jest rozwiązywana względem Twojego bieżącego katalogu roboczego.

Na przykład, aby uruchomić tylko test logowania:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Lub uruchom wiele specyfikacji jednocześnie:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Jeśli wartość `--spec` nie wskazuje na konkretny plik specyfikacji, jest ona zamiast tego używana do filtrowania nazw plików specyfikacji zdefiniowanych w Twojej konfiguracji.

Aby uruchomić wszystkie specyfikacje ze słowem "dialog" w nazwach plików specyfikacji, możesz użyć:

```sh
wdio wdio.conf.js --spec dialog
```

Zauważ, że każdy plik testowy jest uruchamiany w jednym procesie test runnera. Ponieważ nie skanujemy plików z wyprzedzeniem (zobacz następną sekcję, aby uzyskać informacje na temat przekazywania nazw plików do `wdio`), _nie możesz_ użyć (na przykład) `describe.only` na początku pliku specyfikacji, aby poinstruować Mochę, aby uruchomiła tylko tę grupę testów.

Ta funkcja pomoże Ci osiągnąć ten sam cel.

Gdy opcja `--spec` jest podana, zastąpi ona wszystkie wzorce zdefiniowane przez parametr `specs` na poziomie konfiguracji lub możliwości.

## Wykluczanie wybranych testów

W razie potrzeby, jeśli musisz wykluczyć określone pliki specyfikacji z uruchomienia, możesz użyć parametru `--exclude` (Mocha, Jasmine) lub funkcji (Cucumber).

Na przykład, aby wykluczyć test logowania z uruchomienia testów:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Lub wyklucz wiele plików specyfikacji:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Lub wyklucz plik specyfikacji podczas filtrowania przy użyciu zestawu:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Jeśli wartość `--exclude` nie wskazuje na konkretny plik specyfikacji, jest ona zamiast tego używana do filtrowania nazw plików specyfikacji zdefiniowanych w Twojej konfiguracji.

Aby wykluczyć wszystkie specyfikacje ze słowem "dialog" w nazwach plików specyfikacji, możesz użyć:

```sh
wdio wdio.conf.js --exclude dialog
```

### Wykluczanie całego zestawu

Możesz również wykluczyć cały zestaw według nazwy. Jeśli wartość wykluczenia pasuje do nazwy zestawu zdefiniowanej w konfiguracji i nie wygląda jak ścieżka pliku, cały zestaw zostanie pominięty:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

To spowoduje uruchomienie tylko zestawu `checkout`, pomijając zestaw `login` całkowicie.

Mieszane wykluczenia (zestawy i wzorce specyfikacji) działają zgodnie z oczekiwaniami:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

W tym przykładzie, jeśli `signup` jest zdefiniowaną nazwą zestawu, ten zestaw zostanie wykluczony. Wzorzec `dialog` odfiltruje wszystkie pliki specyfikacji zawierające "dialog" w nazwie pliku.

:::note
Jeśli określisz zarówno `--suite X` jak i `--exclude X`, wykluczenie ma pierwszeństwo i zestaw `X` nie zostanie uruchomiony.
:::

Gdy opcja `--exclude` jest podana, zastąpi ona wszystkie wzorce zdefiniowane przez parametr `exclude` na poziomie konfiguracji lub możliwości.

## Uruchamianie zestawów i specyfikacji testowych

Uruchom cały zestaw wraz z indywidualnymi specyfikacjami.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Uruchamianie wielu, określonych specyfikacji testowych

Czasami konieczne jest - w kontekście ciągłej integracji i nie tylko - określenie wielu zestawów specyfikacji do uruchomienia. Narzędzie wiersza poleceń `wdio` WebdriverIO akceptuje nazwy plików przekazywane przez potok (z `find`, `grep` lub innych).

Nazwy plików przekazywane przez potok zastępują listę globów lub nazw plików określonych w liście `spec` konfiguracji.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Uwaga:** To _nie_ nadpisze flagi `--spec` do uruchomienia pojedynczej specyfikacji._

## Uruchamianie określonych testów z MochaOpts

Możesz również filtrować, które konkretne `suite|describe` i/lub `it|test` chcesz uruchomić, przekazując argument specyficzny dla mocha: `--mochaOpts.grep` do CLI wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Uwaga:** Mocha będzie filtrować testy po tym, jak test runner WDIO utworzy instancje, więc możesz zobaczyć kilka instancji, które są tworzone, ale nie są faktycznie wykonywane._

## Wykluczanie określonych testów z MochaOpts

Możesz również filtrować, które konkretne `suite|describe` i/lub `it|test` chcesz wykluczyć, przekazując argument specyficzny dla mocha: `--mochaOpts.invert` do CLI wdio. `--mochaOpts.invert` wykonuje działanie przeciwne do `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Uwaga:** Mocha będzie filtrować testy po tym, jak test runner WDIO utworzy instancje, więc możesz zobaczyć kilka instancji, które są tworzone, ale nie są faktycznie wykonywane._

## Zatrzymanie testowania po niepowodzeniu

Za pomocą opcji `bail` możesz powiedzieć WebdriverIO, aby przestało testować po niepowodzeniu jakiegokolwiek testu.

Jest to pomocne w przypadku dużych zestawów testów, gdy już wiesz, że twoja kompilacja zakończy się niepowodzeniem, ale chcesz uniknąć długiego oczekiwania na pełne uruchomienie testów.

Opcja `bail` oczekuje liczby, która określa, ile niepowodzeń testów może wystąpić, zanim WebDriver zatrzyma cały proces testowania. Domyślna wartość to `0`, co oznacza, że zawsze uruchamia wszystkie specyfikacje testów, które może znaleźć.

Proszę zobaczyć [Strona opcji](configuration) w celu uzyskania dodatkowych informacji o konfiguracji bail.
## Hierarchia opcji uruchamiania

Podczas deklarowania, jakie specyfikacje uruchamiać, istnieje pewna hierarchia określająca, który wzorzec będzie miał pierwszeństwo. Obecnie działa to w następujący sposób, od najwyższego priorytetu do najniższego:

> Argument CLI `--spec` > wzorzec `specs` możliwości > wzorzec `specs` konfiguracji
> Argument CLI `--exclude` > wzorzec `exclude` konfiguracji > wzorzec `exclude` możliwości

Jeśli podany jest tylko parametr konfiguracyjny, będzie on używany dla wszystkich możliwości. Jednak definiując wzorzec na poziomie możliwości, będzie on używany zamiast wzorca konfiguracji. Ostatecznie, każdy wzorzec specyfikacji zdefiniowany w wierszu poleceń zastąpi wszystkie inne podane wzorce.

### Używanie wzorców specyfikacji zdefiniowanych w możliwościach

Gdy definiujesz wzorzec specyfikacji na poziomie możliwości, zastąpi on wszelkie wzorce zdefiniowane na poziomie konfiguracji. Jest to przydatne, gdy trzeba oddzielić testy na podstawie różnych możliwości urządzeń. W takich przypadkach bardziej przydatne jest użycie ogólnego wzorca specyfikacji na poziomie konfiguracji i bardziej konkretnych wzorców na poziomie możliwości.

Na przykład, powiedzmy, że masz dwa katalogi, jeden do testów Androida, a drugi do testów iOS.

Twój plik konfiguracyjny może definiować wzorzec w następujący sposób, dla testów niespecyficznych dla urządzenia:

```js
{
    specs: ['tests/general/**/*.js']
}
```

ale potem będziesz miał różne możliwości dla urządzeń Android i iOS, gdzie wzorce mogą wyglądać tak:

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

Jeśli potrzebujesz obu tych możliwości w pliku konfiguracyjnym, to urządzenie Android będzie uruchamiało tylko testy z przestrzeni nazw "android", a testy iOS będą uruchamiały tylko testy z przestrzeni nazw "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //zostaną użyte specyfikacje na poziomie konfiguracji
        }
    ]
}
```