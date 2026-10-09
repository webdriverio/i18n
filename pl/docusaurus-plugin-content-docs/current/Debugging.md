---
id: debugging
title: Debugowanie
description: "Debuguj testy WebdriverIO za pomocą browser.debug, punktów przerwania w VS Code lub WebStorm, strategii dla niestabilnych testów oraz profilowania CPU i sterty."
---

Debugowanie jest znacznie trudniejsze, gdy kilka procesów uruchamia dziesiątki testów w wielu przeglądarkach.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Na początek niezwykle pomocne jest ograniczenie równoległości poprzez ustawienie `maxInstances` na `1` i uruchamianie tylko tych specyfikacji i przeglądarek, które wymagają debugowania.

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

W wielu przypadkach możesz użyć [`browser.debug()`](/docs/api/browser/debug), aby wstrzymać test i zbadać przeglądarkę.

Twój interfejs wiersza poleceń przełączy się również w tryb REPL. Ten tryb pozwala eksperymentować z poleceniami i elementami na stronie. W trybie REPL możesz uzyskać dostęp do obiektu `browser`&mdash;lub funkcji `$` i `$$`&mdash;tak samo jak w swoich testach.

Podczas korzystania z `browser.debug()` prawdopodobnie będziesz musiał zwiększyć limit czasu test runnera, aby zapobiec oznaczeniu testu jako nieudanego z powodu zbyt długiego wykonywania. Na przykład:

W `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Zobacz [limity czasu](timeouts), aby uzyskać więcej informacji o tym, jak to zrobić w innych frameworkach.

Aby kontynuować testy po debugowaniu, w powłoce użyj skrótu `^C` lub polecenia `.exit`.

### Wstrzymanie dla agenta kodującego (`--debug=agent`)

`wdio run --debug=agent` zwiększa limit czasu frameworka do 24 godzin i wstrzymuje workera, gdy specyfikacja wywoła `await browser.debug()` lub gdy test zakończy się niepowodzeniem. Uruchomienie wypisuje linię podobną do:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

Zbadaj wstrzymaną przeglądarkę za pomocą [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …), a następnie użyj `wdio session -s debug-0-0 resume`, aby kontynuować. `wdio session -s debug-0-0 close` oznacza wstrzymany test jako nieudany z komunikatem `Session closed from wdio session`. Nazwa sesji to `debug-<cid>` (`debug-0-0` dla pierwszego workera). Pozostała część tego procesu jest opisana w sekcji [WebdriverIO Session](/docs/session).
## Dynamiczna konfiguracja

Zauważ, że `wdio.conf.js` może zawierać kod JavaScript. Ponieważ prawdopodobnie nie chcesz na stałe zmieniać wartości limitu czasu na 1 dzień, często pomocna jest zmiana tych ustawień z wiersza poleceń za pomocą zmiennej środowiskowej.

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

Następnie możesz poprzedzić polecenie `wdio` flagą `debug`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...i debugować swój plik specyfikacji za pomocą DevTools!

## Debugowanie w Visual Studio Code (VSCode)

Jeśli chcesz debugować swoje testy z punktami przerwania w najnowszym VSCode, masz dwie opcje uruchomienia debugera, z których opcja 1 jest najprostsza:
 1. automatyczne dołączanie debugera
 2. dołączanie debugera za pomocą pliku konfiguracyjnego

### VSCode Toggle Auto Attach

Możesz automatycznie dołączyć debuger, wykonując następujące kroki w VSCode:
 - Naciśnij CMD + Shift + P (Linux i macOS) lub CTRL + Shift + P (Windows)
 - Wpisz "attach" w polu wprowadzania
 - Wybierz "Debug: Toggle Auto Attach"
 - Wybierz "Only With Flag"

 To wszystko! Teraz, gdy uruchomisz testy (pamiętaj, że w konfiguracji musi być ustawiona flaga --inspect, jak pokazano wcześniej), debuger uruchomi się automatycznie i zatrzyma na pierwszym napotkanym punkcie przerwania.

### Plik konfiguracyjny VSCode

Możliwe jest uruchomienie wszystkich lub wybranych plików specyfikacji. Konfiguracje debugowania należy dodać do `.vscode/launch.json`; aby debugować wybraną specyfikację, dodaj następującą konfigurację:
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

## Dynamiczny REPL w Atom

Jeśli jesteś hakerem [Atom](https://atom.io/), możesz wypróbować [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) autorstwa [@kurtharriger](https://github.com/kurtharriger), który jest dynamicznym REPL pozwalającym na wykonywanie pojedynczych linii kodu w Atom. Obejrzyj [ten](https://www.youtube.com/watch?v=kdM05ChhLQE) film na YouTube, aby zobaczyć demonstrację.

## Debugowanie w WebStorm / Intellij
Możesz utworzyć konfigurację debugowania node.js w następujący sposób:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Obejrzyj ten [film na YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8), aby uzyskać więcej informacji o tym, jak utworzyć konfigurację.

## Debugowanie niestabilnych testów

Niestabilne testy mogą być naprawdę trudne do debugowania, więc oto kilka wskazówek, jak spróbować odtworzyć lokalnie niestabilny wynik uzyskany w CI.

### Sieć
Aby debugować niestabilność związaną z siecią, użyj polecenia [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Szybkość renderowania
Aby debugować niestabilność związaną z szybkością urządzenia, użyj polecenia [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Spowoduje to wolniejsze renderowanie stron, co w rzeczywistości może być spowodowane wieloma czynnikami, np. uruchamianiem wielu procesów w CI, które mogą spowalniać testy.
```js
await browser.throttleCPU(4)
```

### Szybkość wykonywania testów

Jeśli wydaje się, że Twoje testy nie są tym dotknięte, możliwe, że WebdriverIO jest szybszy niż aktualizacja frameworka frontendowego / przeglądarki. Dzieje się tak w przypadku używania synchronicznych asercji, ponieważ WebdriverIO nie ma już możliwości ponowienia tych asercji. Kilka przykładów kodu, który może z tego powodu zawieść:
```js
expect(elementList.length).toEqual(7) // list might not be populated at the time of the assertion
expect(await elem.getText()).toEqual('this button was clicked 3 times') // text might not be updated yet at the time of assertion resulting in an error ("this button was clicked 2 times" does not match the expected "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // might not be displayed yet
```
Aby rozwiązać ten problem, należy zamiast tego używać asynchronicznych asercji. Powyższe przykłady wyglądałyby tak:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Korzystając z tych asercji, WebdriverIO automatycznie poczeka, aż warunek zostanie spełniony. W przypadku asercji tekstu oznacza to, że element musi istnieć, a tekst musi być równy oczekiwanej wartości.
Więcej na ten temat mówimy w naszym [Przewodniku po najlepszych praktykach](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).

## Profilowanie wydajności

WebdriverIO pozwala przechwytywać profile wydajności testów w celu identyfikacji wąskich gardeł w wykonywaniu testów lub wycieków pamięci. Wykorzystuje to natywne możliwości profilowania Node.js.

### Profilowanie CPU

Aby przechwycić profil CPU, możesz użyć flagi CLI `--cpu-prof` lub ustawić `cpuProf: true` w swojej konfiguracji.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

Spowoduje to wygenerowanie pliku `.cpuprofile` w katalogu `./profiles` (domyślnie) dla każdego procesu workera. Możesz załadować ten plik w **Chrome DevTools > Performance > Load Profile**, aby przeanalizować wykonanie.

### Profilowanie sterty

Aby przechwycić profil sterty, użyj flagi CLI `--heap-prof` lub ustaw `heapProf: true` w swojej konfiguracji.

```bash
npx wdio run wdio.conf.js --heap-prof
```

Generuje to plik `.heapprofile` w katalogu `./profiles` (wykorzystuje próbkujący profiler sterty). Możesz załadować go w **Chrome DevTools > Memory > Load**, aby przeanalizować użycie pamięci.

### Metryki czasowe

Gdy profilowanie jest włączone, WebdriverIO automatycznie rejestruje również metryki czasowe dla faz przygotowania, wykonania i zakończenia testu, pomagając zrozumieć, na co poświęcany jest czas.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```