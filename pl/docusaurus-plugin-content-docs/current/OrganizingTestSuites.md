---
id: organizingsuites
title: Organizacja Zestawu Testów
---

Wraz z rozwojem projektów, nieuchronnie dodawanych jest coraz więcej testów integracyjnych. Zwiększa to czas budowania i spowalnia produktywność.

Aby temu zapobiec, powinieneś uruchamiać testy równolegle. WebdriverIO już testuje każdą specyfikację (lub _plik feature_ w Cucumber) równolegle w ramach pojedynczej sesji. Ogólnie staraj się testować tylko jedną funkcję na plik specyfikacji. Staraj się nie mieć zbyt wielu lub zbyt mało testów w jednym pliku. (Nie ma jednak złotej zasady).

Gdy twoje testy zawierają kilka plików specyfikacji, powinieneś zacząć uruchamiać je współbieżnie. W tym celu dostosuj właściwość `maxInstances` w pliku konfiguracyjnym. WebdriverIO pozwala uruchamiać testy z maksymalną współbieżnością — co oznacza, że bez względu na to, ile plików i testów masz, wszystkie mogą działać równolegle. (Podlega to nadal pewnym ograniczeniom, takim jak procesor komputera, ograniczenia współbieżności itp.)

> Załóżmy, że masz 3 różne możliwości (Chrome, Firefox i Safari) i ustawiłeś `maxInstances` na `1`. Runner testów WDIO uruchomi 3 procesy. Dlatego, jeśli masz 10 plików specyfikacji i ustawisz `maxInstances` na `10`, _wszystkie_ pliki specyfikacji będą testowane jednocześnie, a uruchomionych zostanie 30 procesów.

Możesz zdefiniować właściwość `maxInstances` globalnie, aby ustawić atrybut dla wszystkich przeglądarek.

Jeśli uruchamiasz własną siatkę WebDriver, możesz (na przykład) mieć większą pojemność dla jednej przeglądarki niż dla innej. W takim przypadku możesz _ograniczyć_ `maxInstances` w swoim obiekcie zdolności:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## Dziedziczenie z głównego pliku konfiguracyjnego

Jeśli uruchamiasz swoją pakiet testów w wielu środowiskach (np. dev i integracja), pomocne może być używanie wielu plików konfiguracyjnych, aby utrzymać zarządzanie.

Podobnie do [koncepcji obiektów stron](pageobjects), pierwszą rzeczą, której potrzebujesz, jest główny plik konfiguracyjny. Zawiera on wszystkie konfiguracje, które współdzielisz między środowiskami.

Następnie utwórz kolejny plik konfiguracyjny dla każdego środowiska i uzupełnij główną konfigurację o te specyficzne dla środowiska:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## Grupowanie specyfikacji testowych w zestawy

Możesz pogrupować specyfikacje testowe w zestawy i uruchamiać poszczególne zestawy zamiast wszystkich.

Najpierw zdefiniuj swoje zestawy w konfiguracji WDIO:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
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

Lub uruchomić kilka zestawów jednocześnie:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Grupowanie specyfikacji testowych do sekwencyjnego uruchamiania

Jak opisano powyżej, istnieją korzyści z jednoczesnego uruchamiania testów. Są jednak przypadki, w których korzystne byłoby grupowanie testów w celu sekwencyjnego uruchamiania w pojedynczej instancji. Przykłady tego to głównie sytuacje, w których istnieje duży koszt konfiguracji, np. transpilacja kodu lub udostępnianie instancji w chmurze, ale istnieją również zaawansowane modele użytkowania, które korzystają z tej funkcji.

Aby pogrupować testy do uruchomienia w pojedynczej instancji, zdefiniuj je jako tablicę w definicji specyfikacji.

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

Możliwe jest również grupowanie specyfikacji zdefiniowanych w zestawach, więc teraz możesz także definiować zestawy w ten sposób:
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

Za pomocą parametru `--spec` możesz określić, który _zestaw_ (Mocha, Jasmine) lub _cecha_ (Cucumber) powinny być uruchomione. Ścieżka jest rozwiązywana względem bieżącego katalogu roboczego.

Na przykład, aby uruchomić tylko test logowania:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Lub uruchom kilka specyfikacji jednocześnie:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Jeśli wartość `--spec` nie wskazuje na konkretny plik specyfikacji, jest zamiast tego używana do filtrowania nazw plików specyfikacji zdefiniowanych w twojej konfiguracji.

Aby uruchomić wszystkie specyfikacje ze słowem "dialog" w nazwach plików specyfikacji, możesz użyć:

```sh
wdio wdio.conf.js --spec dialog
```

Zauważ, że każdy plik testowy jest uruchamiany w pojedynczym procesie uruchamiania testu. Ponieważ nie skanujemy plików z wyprzedzeniem (zobacz następną sekcję, aby uzyskać informacje o przekazywaniu nazw plików do `wdio`), _nie możesz_ użyć (na przykład) `describe.only` na górze pliku specyfikacji, aby poinstruować Mochę, aby uruchamiała tylko ten zestaw.

Ta funkcja pomoże Ci osiągnąć ten sam cel.

Gdy opcja `--spec` jest podana, nadpisze ona wszystkie wzorce zdefiniowane przez parametr `specs` na poziomie konfiguracji lub zdolności.

## Wykluczanie wybranych testów

W razie potrzeby, jeśli musisz wykluczyć określone pliki specyfikacji z uruchomienia, możesz użyć parametru `--exclude` (Mocha, Jasmine) lub funkcji (Cucumber).

Na przykład, aby wykluczyć test logowania z uruchomienia testu:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Lub wyklucz wiele plików specyfikacji:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Lub wyklucz plik specyfikacji podczas filtrowania za pomocą zestawu:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Jeśli wartość `--exclude` nie wskazuje na konkretny plik specyfikacji, jest zamiast tego używana do filtrowania nazw plików specyfikacji zdefiniowanych w twojej konfiguracji.

Aby wykluczyć wszystkie specyfikacje ze słowem "dialog" w nazwach plików specyfikacji, możesz użyć:

```sh
wdio wdio.conf.js --exclude dialog
```

Gdy opcja `--exclude` jest podana, nadpisze ona wszystkie wzorce zdefiniowane przez parametr `exclude` na poziomie konfiguracji lub zdolności.

## Uruchamianie zestawów i specyfikacji testowych

Uruchom cały zestaw wraz z poszczególnymi specyfikacjami.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Uruchamianie wielu konkretnych specyfikacji testowych

Czasami jest konieczne — w kontekście ciągłej integracji i w innych przypadkach — określenie wielu zestawów specyfikacji do uruchomienia. Narzędzie wiersza poleceń `wdio` WebdriverIO akceptuje wejściowe nazwy plików (z `find`, `grep` lub innych).

Nazwy plików wprowadzane przez potok zastępują listę globów lub nazw plików określonych w liście `spec` konfiguracji.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Uwaga:** Nie spowoduje to_ nadpisania _flagi `--spec` do uruchamiania pojedynczej specyfikacji._

## Uruchamianie konkretnych testów z MochaOpts

Możesz również filtrować, które konkretne `suite|describe` i/lub `it|test` chcesz uruchomić, przekazując argument specyficzny dla mocha: `--mochaOpts.grep` do CLI wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Uwaga:** Mocha filtruje testy po tym, jak runner testów WDIO tworzy instancje, więc możesz zobaczyć kilka instancji uruchamianych, ale faktycznie nie wykonywanych._

## Wykluczanie konkretnych testów z MochaOpts

Możesz również filtrować, które konkretne `suite|describe` i/lub `it|test` chcesz wykluczyć, przekazując argument specyficzny dla mocha: `--mochaOpts.invert` do CLI wdio. `--mochaOpts.invert` działa odwrotnie do `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Uwaga:** Mocha filtruje testy po tym, jak runner testów WDIO tworzy instancje, więc możesz zobaczyć kilka instancji uruchamianych, ale faktycznie nie wykonywanych._

## Zatrzymanie testowania po niepowodzeniu

Za pomocą opcji `bail` możesz powiedzieć WebdriverIO, aby przestało testować po niepowodzeniu dowolnego testu.

Jest to pomocne w przypadku dużych zestawów testów, gdy już wiesz, że twoja kompilacja zostanie przerwana, ale chcesz uniknąć długiego oczekiwania na pełne uruchomienie testów.

Opcja `bail` oczekuje liczby, która określa, ile niepowodzeń testów może wystąpić, zanim WebDriver zatrzyma cały przebieg testów. Domyślnie jest to `0`, co oznacza, że zawsze uruchamia wszystkie znalezione specyfikacje testów.

Więcej informacji na temat konfiguracji bail znajdziesz na [stronie opcji](configuration).
## Hierarchia opcji uruchamiania

Przy deklarowaniu, jakie specyfikacje uruchomić, istnieje pewna hierarchia określająca, który wzorzec będzie miał pierwszeństwo. Obecnie działa to w następujący sposób, od najwyższego priorytetu do najniższego:

> Argument CLI `--spec` > wzorzec `specs` zdolności > wzorzec `specs` konfiguracji
> Argument CLI `--exclude` > wzorzec `exclude` konfiguracji > wzorzec `exclude` zdolności

Jeśli podany jest tylko parametr konfiguracji, zostanie on użyty dla wszystkich zdolności. Jednak jeśli wzorzec jest zdefiniowany na poziomie zdolności, zostanie on użyty zamiast wzorca konfiguracji. Wreszcie, każdy wzorzec specyfikacji zdefiniowany w wierszu poleceń zastąpi wszystkie inne podane wzorce.

### Używanie wzorców specyfikacji zdefiniowanych w zdolnościach

Gdy definiujesz wzorzec specyfikacji na poziomie zdolności, zastąpi on wszystkie wzorce zdefiniowane na poziomie konfiguracji. Jest to przydatne, gdy trzeba rozdzielić testy na podstawie różnicujących zdolności urządzenia. W takich przypadkach bardziej przydatne jest użycie ogólnego wzorca specyfikacji na poziomie konfiguracji i bardziej szczegółowych wzorców na poziomie zdolności.

Na przykład, załóżmy, że masz dwa katalogi, jeden do testów Androida i jeden do testów iOS.

Twój plik konfiguracyjny może definiować wzorzec w następujący sposób dla niespecyficznych testów urządzeń:

```js
{
    specs: ['tests/general/**/*.js']
}
```

ale potem będziesz mieć różne zdolności dla swoich urządzeń Android i iOS, gdzie wzorce mogłyby wyglądać tak:

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

Jeśli potrzebujesz obu tych zdolności w pliku konfiguracyjnym, urządzenie z Androidem będzie uruchamiać tylko testy w przestrzeni nazw "android", a testy iOS będą uruchamiać tylko testy w przestrzeni nazw "ios"!

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
            //config level specs will be used
        }
    ]
}
```