---
id: organizingsuites
title: Organizacja zestawu testów
description: "Organizuj rosnący zestaw testów, współdzieląc pliki konfiguracyjne, grupując specyfikacje w zestawy, uruchamiając specyfikacje sekwencyjnie oraz uwzględniając lub wykluczając testy."
---

Wraz z rozwojem projektów nieuchronnie dodawanych jest coraz więcej testów integracyjnych. Wydłuża to czas budowania i obniża produktywność.

Aby temu zapobiec, należy uruchamiać testy równolegle. WebdriverIO już testuje każdą specyfikację (lub _plik funkcji_ w Cucumber) równolegle w ramach jednej sesji. Ogólnie rzecz biorąc, staraj się testować tylko jedną funkcjonalność na plik specyfikacji. Staraj się nie mieć zbyt wielu ani zbyt małej liczby testów w jednym pliku. (Nie ma tu jednak złotej zasady.)

Gdy Twoje testy obejmują kilka plików specyfikacji, powinieneś zacząć uruchamiać je współbieżnie. Aby to zrobić, dostosuj właściwość `maxInstances` w pliku konfiguracyjnym. WebdriverIO pozwala uruchamiać testy z maksymalną współbieżnością — co oznacza, że bez względu na to, ile masz plików i testów, wszystkie mogą być uruchamiane równolegle. (Nadal podlega to pewnym ograniczeniom, takim jak procesor Twojego komputera, ograniczenia współbieżności itp.)

> Załóżmy, że masz 3 różne capabilities (Chrome, Firefox i Safari) i ustawiłeś `maxInstances` na `1`. Test runner WDIO uruchomi 3 procesy. Zatem jeśli masz 10 plików specyfikacji i ustawisz `maxInstances` na `10`, _wszystkie_ pliki specyfikacji zostaną przetestowane jednocześnie i zostanie uruchomionych 30 procesów.

Możesz zdefiniować właściwość `maxInstances` globalnie, aby ustawić ten atrybut dla wszystkich przeglądarek.

Jeśli uruchamiasz własny grid WebDriver, możesz (na przykład) mieć większą przepustowość dla jednej przeglądarki niż dla innej. W takim przypadku możesz _ograniczyć_ `maxInstances` w obiekcie capability:

```js
// wdio.conf.js
export const config = {
    // ...
    // ustaw maxInstance dla wszystkich przeglądarek
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances można nadpisać dla każdej capability. Jeśli więc masz wewnętrzny grid
        // WebDriver z dostępnymi tylko 5 instancjami firefox, możesz upewnić się, że nie więcej niż
        // 5 instancji zostanie uruchomionych jednocześnie.
        browserName: 'chrome'
    }],
    // ...
}
```

## Dziedziczenie z głównego pliku konfiguracyjnego

Jeśli uruchamiasz zestaw testów w wielu środowiskach (np. dev i integracyjnym), pomocne może być użycie wielu plików konfiguracyjnych, aby zachować porządek.

Podobnie jak w przypadku [koncepcji page object](pageobjects), pierwszą rzeczą, której potrzebujesz, jest główny plik konfiguracyjny. Zawiera on wszystkie konfiguracje współdzielone między środowiskami.

Następnie utwórz kolejny plik konfiguracyjny dla każdego środowiska i uzupełnij główną konfigurację o ustawienia specyficzne dla danego środowiska:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// użyj głównego pliku konfiguracyjnego jako domyślnego, ale nadpisz informacje specyficzne dla środowiska
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // więcej capabilities zdefiniowanych tutaj
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

## Grupowanie specyfikacji testów w zestawy

Możesz grupować specyfikacje testów w zestawy (suites) i uruchamiać pojedyncze, konkretne zestawy zamiast wszystkich.

Najpierw zdefiniuj zestawy w konfiguracji WDIO:

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

Teraz, jeśli chcesz uruchomić tylko jeden zestaw, możesz przekazać nazwę zestawu jako argument CLI:

```sh
wdio wdio.conf.js --suite login
```

Lub uruchomić wiele zestawów jednocześnie:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Grupowanie specyfikacji testów do uruchamiania sekwencyjnego

Jak opisano powyżej, uruchamianie testów współbieżnie ma swoje zalety. Istnieją jednak przypadki, w których korzystne byłoby zgrupowanie testów tak, aby były uruchamiane sekwencyjnie w jednej instancji. Przykładami są głównie sytuacje, w których występuje duży koszt przygotowania, np. transpilacja kodu lub przydzielanie instancji w chmurze, ale istnieją również zaawansowane modele użycia, które korzystają z tej możliwości.

Aby zgrupować testy do uruchomienia w jednej instancji, zdefiniuj je jako tablicę w definicji specs.

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
W powyższym przykładzie testy 'test_login.js', 'test_product_order.js' i 'test_checkout.js' zostaną uruchomione sekwencyjnie w jednej instancji, a każdy z testów "test_b*" zostanie uruchomiony współbieżnie w osobnych instancjach.

Możliwe jest również grupowanie specyfikacji zdefiniowanych w zestawach, więc możesz teraz definiować zestawy również w ten sposób:
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
i w tym przypadku wszystkie testy z zestawu "end2end" zostaną uruchomione w jednej instancji.

Podczas sekwencyjnego uruchamiania testów z użyciem wzorca pliki specyfikacji będą uruchamiane w kolejności alfabetycznej

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

W niektórych przypadkach możesz chcieć wykonać tylko jeden test (lub podzbiór testów) ze swoich zestawów.

Za pomocą parametru `--spec` możesz określić, który _zestaw_ (Mocha, Jasmine) lub _funkcja_ (Cucumber) ma zostać uruchomiony. Ścieżka jest rozwiązywana względem bieżącego katalogu roboczego.

Na przykład, aby uruchomić tylko test logowania:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Lub uruchomić wiele specyfikacji jednocześnie:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Jeśli wartość `--spec` nie wskazuje na konkretny plik specyfikacji, jest ona używana do filtrowania nazw plików specyfikacji zdefiniowanych w konfiguracji.

Aby uruchomić wszystkie specyfikacje zawierające słowo „dialog” w nazwach plików, możesz użyć:

```sh
wdio wdio.conf.js --spec dialog
```

Pamiętaj, że każdy plik testowy jest uruchamiany w osobnym procesie test runnera. Ponieważ nie skanujemy plików z wyprzedzeniem (zobacz następną sekcję, aby uzyskać informacje o przekazywaniu nazw plików do `wdio` przez potok), _nie możesz_ użyć (na przykład) `describe.only` na początku pliku specyfikacji, aby poinstruować Mochę, by uruchomiła tylko ten zestaw.

Ta funkcja pomoże Ci osiągnąć ten sam cel.

Gdy podana jest opcja `--spec`, nadpisuje ona wszelkie wzorce zdefiniowane w konfiguracji `specs` lub w `wdio:specs` danej capability.

## Wykluczanie wybranych testów

W razie potrzeby, jeśli musisz wykluczyć określone pliki specyfikacji z uruchomienia, możesz użyć parametru `--exclude` (Mocha, Jasmine) lub funkcji (Cucumber).

Na przykład, aby wykluczyć test logowania z uruchomienia testów:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Lub wykluczyć wiele plików specyfikacji:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Lub wykluczyć plik specyfikacji podczas filtrowania z użyciem zestawu:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Jeśli wartość `--exclude` nie wskazuje na konkretny plik specyfikacji, jest ona używana do filtrowania nazw plików specyfikacji zdefiniowanych w konfiguracji.

Aby wykluczyć wszystkie specyfikacje zawierające słowo „dialog” w nazwach plików, możesz użyć:

```sh
wdio wdio.conf.js --exclude dialog
```

### Wykluczanie całego zestawu

Możesz również wykluczyć cały zestaw po nazwie. Jeśli wartość wykluczenia pasuje do nazwy zestawu zdefiniowanego w konfiguracji i nie wygląda jak ścieżka do pliku, cały zestaw zostanie pominięty:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Spowoduje to uruchomienie tylko zestawu `checkout`, całkowicie pomijając zestaw `login`.

Mieszane wykluczenia (zestawy i wzorce specyfikacji) działają zgodnie z oczekiwaniami:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

W tym przykładzie, jeśli `signup` jest nazwą zdefiniowanego zestawu, ten zestaw zostanie wykluczony. Wzorzec `dialog` odfiltruje wszystkie pliki specyfikacji zawierające "dialog" w nazwie pliku.

:::note
Jeśli określisz zarówno `--suite X`, jak i `--exclude X`, wykluczenie ma pierwszeństwo i zestaw `X` nie zostanie uruchomiony.
:::

Gdy podana jest opcja `--exclude`, nadpisuje ona wszelkie wzorce zdefiniowane w konfiguracji `exclude` lub w `wdio:exclude` danej capability.

## Uruchamianie zestawów i specyfikacji testów

Uruchom cały zestaw wraz z pojedynczymi specyfikacjami.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Uruchamianie wielu konkretnych specyfikacji testów

Czasami konieczne jest&mdash;w kontekście ciągłej integracji i nie tylko&mdash;określenie wielu zestawów specyfikacji do uruchomienia. Narzędzie wiersza poleceń `wdio` w WebdriverIO akceptuje nazwy plików przekazywane przez potok (z `find`, `grep` lub innych).

Nazwy plików przekazane przez potok nadpisują listę globów lub nazw plików określonych w liście `spec` w konfiguracji.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Uwaga:** To_ nie _nadpisze flagi `--spec` służącej do uruchamiania pojedynczej specyfikacji._

## Uruchamianie konkretnych testów z MochaOpts

Możesz także filtrować, które konkretne `suite|describe` i/lub `it|test` chcesz uruchomić, przekazując do CLI wdio argument specyficzny dla mocha: `--mochaOpts.grep`.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Uwaga:** Mocha przefiltruje testy po utworzeniu instancji przez test runner WDIO, więc możesz zobaczyć, że uruchamianych jest kilka instancji, które w rzeczywistości nie są wykonywane._

## Wykluczanie konkretnych testów z MochaOpts

Możesz także filtrować, które konkretne `suite|describe` i/lub `it|test` chcesz wykluczyć, przekazując do CLI wdio argument specyficzny dla mocha: `--mochaOpts.invert`. `--mochaOpts.invert` działa odwrotnie do `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Uwaga:** Mocha przefiltruje testy po utworzeniu instancji przez test runner WDIO, więc możesz zobaczyć, że uruchamianych jest kilka instancji, które w rzeczywistości nie są wykonywane._

## Zatrzymywanie testowania po niepowodzeniu

Za pomocą opcji `bail` możesz nakazać WebdriverIO zatrzymanie testowania po niepowodzeniu dowolnego testu.

Jest to pomocne w przypadku dużych zestawów testów, gdy już wiesz, że Twój build się nie powiedzie, ale chcesz uniknąć długiego oczekiwania na pełne uruchomienie testów.

Opcja `bail` oczekuje liczby, która określa, ile niepowodzeń testów może wystąpić, zanim WebDriver zatrzyma całe uruchomienie testów. Wartość domyślna to `0`, co oznacza, że zawsze uruchamiane są wszystkie specyfikacje testów, jakie można znaleźć.

Zobacz [stronę opcji](configuration), aby uzyskać dodatkowe informacje na temat konfiguracji bail.
## Hierarchia opcji uruchamiania

Przy deklarowaniu, które specyfikacje mają zostać uruchomione, obowiązuje określona hierarchia definiująca, który wzorzec ma pierwszeństwo. Obecnie działa to w następujący sposób, od najwyższego do najniższego priorytetu:

> argument CLI `--spec` > capability `wdio:specs` > konfiguracja `specs`
> argument CLI `--exclude` > konfiguracja `exclude` > capability `wdio:exclude`

Jeśli podany jest tylko parametr konfiguracji, będzie on używany dla wszystkich capabilities. Jeśli jednak wzorzec zostanie zdefiniowany na poziomie capability, zostanie on użyty zamiast wzorca z konfiguracji. Wreszcie, każdy wzorzec specyfikacji zdefiniowany w wierszu poleceń nadpisze wszystkie inne podane wzorce.

### Używanie wzorców specyfikacji zdefiniowanych w capability

Gdy definiujesz wzorzec specyfikacji na poziomie capability, nadpisze on wszelkie wzorce zdefiniowane na poziomie konfiguracji. Jest to przydatne, gdy trzeba rozdzielić testy na podstawie różnych capabilities urządzeń. W takich przypadkach bardziej przydatne jest użycie ogólnego wzorca specyfikacji na poziomie konfiguracji i bardziej szczegółowych wzorców na poziomie capability.

Załóżmy na przykład, że masz dwa katalogi: jeden dla testów Androida i jeden dla testów iOS.

Twój plik konfiguracyjny może definiować wzorzec w ten sposób dla testów niezależnych od urządzenia:

```js
{
    specs: ['tests/general/**/*.js']
}
```

ale następnie będziesz mieć różne capabilities dla urządzeń z Androidem i iOS, gdzie wzorce mogą wyglądać tak:

```json
{
  "platformName": "Android",
  "wdio:specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "wdio:specs": [
    "tests/ios/**/*.js"
  ]
}
```

Jeśli potrzebujesz obu tych capabilities w swoim pliku konfiguracyjnym, urządzenie z Androidem uruchomi tylko testy z przestrzeni nazw "android", a testy iOS uruchomią tylko testy z przestrzeni nazw "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            "wdio:specs": ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            "wdio:specs": ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //zostaną użyte specyfikacje z poziomu konfiguracji
        }
    ]
}
```