---
id: debugging
title: Debugowanie
---

Debugowanie jest znacznie trudniejsze, gdy kilka procesów uruchamia dziesiątki testów w wielu przeglądarkach.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Na początek, bardzo pomocne jest ograniczenie równoległości poprzez ustawienie `maxInstances` na `1` i kierowanie tylko na te specyfikacje i przeglądarki, które wymagają debugowania.

W `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Polecenie Debug

W wielu przypadkach możesz użyć [`browser.debug()`](/docs/api/browser/debug) aby wstrzymać test i przeprowadzić inspekcję przeglądarki.

Twój interfejs wiersza poleceń przełączy się również w tryb REPL. Ten tryb pozwala eksperymentować z poleceniami i elementami na stronie. W trybie REPL możesz korzystać z obiektu `browser` lub funkcji `$` i `$$`, tak samo jak w testach.

Podczas korzystania z `browser.debug()` prawdopodobnie będziesz musiał zwiększyć limit czasu wykonania testu, aby uniknąć niepowodzenia testu z powodu zbyt długiego czasu wykonania. Na przykład:

W `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Zobacz [timeouts](timeouts), aby uzyskać więcej informacji na temat jak to zrobić przy użyciu innych frameworków.

Aby kontynuować testy po debugowaniu, w powłoce użyj skrótu `^C` lub polecenia `.exit`.
## Dynamiczna konfiguracja

Zauważ, że `wdio.conf.js` może zawierać kod JavaScript. Ponieważ prawdopodobnie nie chcesz na stałe zmieniać wartości limitu czasu na 1 dzień, często przydatne jest zmiana tych ustawień z wiersza poleceń za pomocą zmiennej środowiskowej.

Korzystając z tej techniki, możesz dynamicznie zmieniać konfigurację:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Następnie możesz dodać prefiks `debug` do polecenia `wdio`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...i debugować swój plik specyfikacji za pomocą DevTools!

## Debugowanie w Visual Studio Code (VSCode)

Jeśli chcesz debugować swoje testy z punktami przerwania w najnowszej wersji VSCode, masz dwie opcje uruchomienia debuggera, z czego opcja 1 jest najłatwiejszą metodą:
 1. automatyczne dołączanie debuggera
 2. dołączanie debuggera za pomocą pliku konfiguracyjnego

### VSCode Toggle Auto Attach

Możesz automatycznie dołączyć debugger, wykonując następujące kroki w VSCode:
 - Naciśnij CMD + Shift + P (Linux i MacOS) lub CTRL + Shift + P (Windows)
 - Wpisz "attach" w pole wprowadzania
 - Wybierz "Debug: Toggle Auto Attach"
 - Wybierz "Only With Flag"

 To wszystko! Teraz, gdy uruchomisz swoje testy (pamiętaj, że będziesz potrzebować flagi --inspect ustawionej w konfiguracji, jak pokazano wcześniej), automatycznie uruchomi się debugger i zatrzyma na pierwszym napotkanym punkcie przerwania.

### Plik konfiguracyjny VSCode

Możliwe jest uruchomienie wszystkich lub wybranych plików specyfikacji. Konfiguracja(e) debugowania musi być dodana do `.vscode/launch.json`. Aby debugować wybraną specyfikację, dodaj następującą konfigurację:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Aby uruchomić wszystkie pliki specyfikacji, usuń `"--spec", "${file}"` z `"args"`

Przykład: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Dodatkowe informacje: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Dynamiczny REPL z Atomem

Jeśli jesteś hakerem [Atom](https://atom.io/), możesz wypróbować [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) autorstwa [@kurtharriger](https://github.com/kurtharriger), który jest dynamicznym REPL-em pozwalającym na wykonanie pojedynczych linii kodu w Atomie. Obejrzyj [ten](https://www.youtube.com/watch?v=kdM05ChhLQE) film na YouTube, aby zobaczyć demonstrację.

## Debugowanie w WebStorm / Intellij
Możesz utworzyć konfigurację debugowania node.js w następujący sposób:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Obejrzyj ten [film na YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8), aby uzyskać więcej informacji o tym, jak stworzyć konfigurację.

## Debugowanie testów niestabilnych

Niestabilne testy mogą być naprawdę trudne do debugowania, dlatego oto kilka wskazówek, jak możesz spróbować odtworzyć lokalnie niestabilny wynik, który otrzymałeś w swoim CI.

### Sieć
Aby debugować niestabilność związaną z siecią, użyj polecenia [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Szybkość renderowania
Aby debugować niestabilność związaną z szybkością urządzenia, użyj polecenia [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Spowoduje to wolniejsze renderowanie stron, co może być spowodowane wieloma czynnikami, takimi jak uruchamianie wielu procesów w CI, które mogą spowalniać testy.
```js
await browser.throttleCPU(4)
```

### Szybkość wykonywania testów

Jeśli Twoje testy nie wydają się być dotknięte problemami, możliwe, że WebdriverIO jest szybsze niż aktualizacja z frameworka frontendowego / przeglądarki. Dzieje się tak, gdy używa się synchronicznych asercji, ponieważ WebdriverIO nie ma możliwości ponownego sprawdzenia tych asercji. Oto kilka przykładów kodu, który może się psuć z tego powodu:
```js
expect(elementList.length).toEqual(7) // lista może nie być jeszcze wypełniona w momencie asercji
expect(await elem.getText()).toEqual('this button was clicked 3 times') // tekst może nie być jeszcze zaktualizowany w momencie asercji, co skutkuje błędem ("this button was clicked 2 times" nie pasuje do oczekiwanego "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // może jeszcze nie być wyświetlony
```
Aby rozwiązać ten problem, należy używać asynchronicznych asercji. Powyższe przykłady wyglądałyby tak:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Używając tych asercji, WebdriverIO automatycznie poczeka, aż warunek zostanie spełniony. Podczas sprawdzania tekstu oznacza to, że element musi istnieć, a tekst musi być równy oczekiwanej wartości.
Więcej informacji na ten temat znajduje się w naszym [Przewodniku najlepszych praktyk](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).