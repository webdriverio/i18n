---
id: organizingsuites
title: Organizacja Zestawów Testowych
---

Wraz z rozwojem projektów, nieuchronnie dodawanych jest coraz więcej testów integracyjnych. To zwiększa czas budowania i spowalnia produktywność.

Aby temu zapobiec, powinieneś uruchamiać testy równolegle. WebdriverIO już testuje każdą specyfikację (lub _plik feature_ w Cucumber) równolegle w ramach pojedynczej sesji. Ogólnie staraj się testować tylko jedną funkcjonalność na plik specyfikacji. Staraj się nie mieć zbyt wielu lub zbyt mało testów w jednym pliku. (Jednak nie ma tu złotej reguły).

Gdy twoje testy mają kilka plików specyfikacji, powinieneś zacząć uruchamiać je jednocześnie. W tym celu dostosuj właściwość `maxInstances` w pliku konfiguracyjnym. WebdriverIO pozwala na uruchamianie testów z maksymalną współbieżnością - co oznacza, że bez względu na to, ile masz plików i testów, wszystkie mogą działać równolegle. (Nadal podlega to pewnym ograniczeniom, takim jak CPU komputera, ograniczenia współbieżności itp.)

> Załóżmy, że masz 3 różne możliwości (Chrome, Firefox i Safari) i ustawiłeś `maxInstances` na `1`. Test runner WDIO uruchomi 3 procesy. Dlatego, jeśli masz 10 plików specyfikacji i ustawisz `maxInstances` na `10`, _wszystkie_ pliki specyfikacji będą testowane jednocześnie, a uruchomionych zostanie 30 procesów.

Możesz zdefiniować właściwość `maxInstances` globalnie, aby ustawić atrybut dla wszystkich przeglądarek.

Jeśli prowadzisz własną sieć WebDriver, możesz (na przykład) mieć większą pojemność dla jednej przeglądarki niż dla innej. W takim przypadku możesz _ograniczyć_ `maxInstances` w obiekcie capability:

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
        // maxInstances może zostać nadpisany dla każdej capability. Więc jeśli masz wewnętrzną sieć WebDriver
        // z tylko 5 dostępnymi instancjami firefox, możesz upewnić się, że nie więcej niż
        // 5 instancji zostanie uruchomionych jednocześnie.
        browserName: 'chrome'
    }],
    // ...
}
```

## Dziedziczenie z głównego pliku konfiguracyjnego

Jeśli uruchamiasz swój zestaw testów w wielu środowiskach (np. dev i integration), pomocne może być korzystanie z wielu plików konfiguracyjnych, aby zachować łatwość zarządzania.

Podobnie jak w [koncepcji obiektów stron](pageobjects), pierwszą rzeczą, której potrzebujesz, jest główny plik konfiguracyjny. Zawiera on wszystkie konfiguracje, które są wspólne dla wszystkich środowisk.

Następnie utwórz inny plik konfiguracyjny dla każdego środowiska i uzupełnij główną konfigurację o specyficzne dla środowiska:

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

    // uruchom testy na sauce zamiast lokalnie
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// dodaj dodatkowy reporter
config.reporters.push('allure')
```

## Grupowanie specyfikacji testowych w zestawy

Możesz grupować specyfikacje testowe w zestawy i uruchamiać pojedyncze specyficzne zestawy zamiast wszystkich.

Najpierw zdefiniuj swoje zestawy w konfiguracji WDIO:

```js
// wdio.conf.js
export const config = {
    // zdefiniuj wszystkie testy
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // zdefiniuj konkretne zestawy
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

Teraz, jeśli chcesz uruchomić tylko pojedynczy zestaw, możesz przekazać nazwę zestawu jako argument CLI:

```sh
wdio wdio.conf.js --suite login
```

Lub uruchomić wiele zestawów jednocześnie:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Grupowanie specyfikacji testowych do uruchamiania sekwencyjnie

Jak opisano powyżej, istnieją korzyści z równoległego uruchamiania testów. Jednak istnieją przypadki, w których korzystne byłoby grupowanie testów w celu sekwencyjnego uruchamiania w pojedynczej instancji. Przykłady tego to głównie sytuacje, gdy istnieje duży koszt konfiguracji, np. transpilacja kodu lub przygotowanie instancji w chmurze, ale istnieją również zaawansowane modele użycia, które korzystają z tej funkcji.

Aby zgrupować testy do uruchomienia w pojedynczej instancji, zdefiniuj je jako tablicę w definicji specs.

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
W powyższym przykładzie testy 'test_login.js', 'test_product_order.js' i 'test_checkout.js' będą uruchamiane sekwencyjnie w pojedynczej instancji, a każdy z testów "test_b*" będzie uruchamiany jednocześnie w indywidualnych instancjach.

Możliwe jest również grupowanie specyfikacji zdefiniowanych w zestawach, więc teraz możesz również definiować zestawy w następujący sposób:
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
i w tym przypadku wszystkie testy z zestawu "end2end" byłyby uruchamiane w pojedynczej instancji.

Podczas sekwencyjnego uruchamiania testów za pomocą wzorca, pliki specyfikacji będą uruchamiane w kolejności alfabetycznej

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Spowoduje to uruchomienie plików pasujących do powyższego wzorca w następującej kolejności:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Uruchamianie wybranych testów

W niektórych przypadkach możesz chcieć wykonać tylko pojedynczy test (lub podzbiór testów) z twoich zestawów.

Za pomocą parametru `--spec` możesz określić, który _suite_ (Mocha, Jasmine) lub _feature_ (Cucumber) powinien zostać uruchomiony. Ścieżka jest rozwiązywana względem twojego bieżącego katalogu roboczego.

Na przykład, aby uruchomić tylko twój test logowania:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Lub uruchom wiele specyfikacji jednocześnie:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Jeśli wartość `--spec` nie wskazuje na konkretny plik specyfikacji, jest ona używana do filtrowania nazw plików specyfikacji zdefiniowanych w Twojej konfiguracji.

Aby uruchomić wszystkie specyfikacje ze słowem "dialog" w nazwach plików specyfikacji, możesz użyć:

```sh
wdio wdio.conf.js --spec dialog
```

Pamiętaj, że każdy plik testowy działa w pojedynczym procesie test runnera. Ponieważ nie skanujemy plików z wyprzedzeniem (zobacz następną sekcję, aby uzyskać informacje o przekierowaniu nazw plików do `wdio`), _nie możesz_ używać (na przykład) `describe.only` na górze pliku specyfikacji, aby poinstruować Mochę, aby uruchomiła tylko ten zestaw.

Ta funkcja pomoże ci osiągnąć ten sam cel.

Gdy podana jest opcja `--spec`, zastąpi ona wszystkie wzorce zdefiniowane przez parametr `specs` na poziomie konfiguracji lub możliwości.

## Wykluczanie wybranych testów

W razie potrzeby, jeśli musisz wykluczyć określone pliki specyfikacji z uruchomienia, możesz użyć parametru `--exclude` (Mocha, Jasmine) lub funkcji (Cucumber).

Na przykład, aby wykluczyć test logowania z uruchomienia testu:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Lub wykluczyć wiele plików specyfikacji:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Lub wykluczyć plik specyfikacji podczas filtrowania za pomocą zestawu:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Jeśli wartość `--exclude` nie wskazuje na konkretny plik specyfikacji, jest używana do filtrowania nazw plików specyfikacji zdefiniowanych w Twojej konfiguracji.

Aby wykluczyć wszystkie specyfikacje ze słowem "dialog" w nazwach plików specyfikacji, możesz użyć:

```sh
wdio wdio.conf.js --exclude dialog
```

Gdy podana jest opcja `--exclude`, zastąpi ona wszystkie wzorce zdefiniowane przez parametr `exclude` na poziomie konfiguracji lub możliwości.

## Uruchamianie zestawów i specyfikacji testowych

Uruchom cały zestaw wraz z poszczególnymi specyfikacjami.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Uruchamianie wielu, konkretnych specyfikacji testowych

Czasami konieczne jest&mdash;w kontekście ciągłej integracji i w innych przypadkach&mdash;określenie wielu zestawów specyfikacji do uruchomienia. Narzędzie wiersza poleceń WebdriverIO `wdio` akceptuje nazwy plików przekazywane przez potok (z `find`, `grep` lub innych).

Nazwy plików przekazywane przez potok zastępują listę globów lub nazw plików określonych w liście `spec` konfiguracji.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Uwaga:** Nie spowoduje to_ zastąpienia _flagi `--spec` do uruchamiania pojedynczej specyfikacji._

## Uruchamianie konkretnych testów za pomocą MochaOpts

Możesz również filtrować, który konkretny `suite|describe` i/lub `it|test` chcesz uruchomić, przekazując argument specyficzny dla mocha: `--mochaOpts.grep` do CLI wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Uwaga:** Mocha będzie filtrować testy po tym, jak test runner WDIO utworzy instancje, więc możesz zobaczyć kilka uruchomionych instancji, ale nie faktycznie wykonanych._

## Wykluczanie konkretnych testów za pomocą MochaOpts

Możesz również filtrować, który konkretny `suite|describe` i/lub `it|test` chcesz wykluczyć, przekazując argument specyficzny dla mocha: `--mochaOpts.invert` do CLI wdio. `--mochaOpts.invert` działa odwrotnie do `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Uwaga:** Mocha będzie filtrować testy po tym, jak test runner WDIO utworzy instancje, więc możesz zobaczyć kilka uruchomionych instancji, ale nie faktycznie wykonanych._

## Zatrzymanie testowania po niepowodzeniu

Za pomocą opcji `bail` możesz powiedzieć WebdriverIO, aby przestało testować po niepowodzeniu dowolnego testu.

Jest to pomocne w przypadku dużych zestawów testowych, gdy już wiesz, że twoja kompilacja się nie powiedzie, ale chcesz uniknąć długiego oczekiwania na pełne uruchomienie testów.

Opcja `bail` oczekuje liczby, która określa, ile niepowodzeń testów może wystąpić, zanim WebDriver zatrzyma cały proces testowania. Domyślnie jest to `0`, co oznacza, że zawsze uruchamia wszystkie specyfikacje testów, które może znaleźć.

Więcej informacji o konfiguracji bail znajdziesz na [stronie Opcji](configuration).
## Hierarchia opcji uruchamiania

Podczas deklarowania, jakie specyfikacje uruchomić, istnieje pewna hierarchia określająca, który wzorzec będzie miał pierwszeństwo. Obecnie działa to następująco, od najwyższego priorytetu do najniższego:

> Argument CLI `--spec` > wzorzec `specs` w capabilities > wzorzec `specs` w konfiguracji
> Argument CLI `--exclude` > wzorzec `exclude` w konfiguracji > wzorzec `exclude` w capabilities

Jeśli podany jest tylko parametr konfiguracji, będzie on używany dla wszystkich capabilities. Jednak jeśli zdefiniujesz wzorzec na poziomie capability, zostanie on użyty zamiast wzorca konfiguracji. Wreszcie, każdy wzorzec specyfikacji zdefiniowany w wierszu poleceń zastąpi wszystkie inne podane wzorce.

### Korzystanie z wzorców specyfikacji zdefiniowanych w capability

Gdy zdefiniujesz wzorzec specyfikacji na poziomie capability, zastąpi on wszystkie wzorce zdefiniowane na poziomie konfiguracji. Jest to przydatne, gdy trzeba oddzielić testy na podstawie różnych możliwości urządzenia. W takich przypadkach bardziej przydatne jest używanie ogólnego wzorca specyfikacji na poziomie konfiguracji i bardziej szczegółowych wzorców na poziomie capability.

Na przykład, powiedzmy, że masz dwa katalogi, jeden na testy Androida, a drugi na testy iOS.

Twój plik konfiguracyjny może definiować wzorzec w następujący sposób, dla testów niespecyficznych dla urządzenia:

```js
{
    specs: ['tests/general/**/*.js']
}
```

ale potem będziesz miał różne capabilities dla swoich urządzeń Android i iOS, gdzie wzorce mogłyby wyglądać tak:

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

Jeśli wymagasz obu tych capabilities w swoim pliku konfiguracyjnym, to urządzenie Android będzie uruchamiać tylko testy w przestrzeni nazw "android", a testy iOS będą uruchamiać tylko testy w przestrzeni nazw "ios"!

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
            //zostaną użyte specyfikacje z poziomu konfiguracji
        }
    ]
}
```