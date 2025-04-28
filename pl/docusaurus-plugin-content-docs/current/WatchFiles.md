---
id: watcher
title: Obserwowanie plików testowych
---

Dzięki WDIO testrunner możesz obserwować pliki podczas pracy nad nimi. Automatycznie uruchamiają się ponownie, jeśli zmienisz coś w swojej aplikacji lub w plikach testowych. Dodając flagę `--watch` podczas wywoływania polecenia `wdio`, testrunner będzie czekał na zmiany plików po uruchomieniu wszystkich testów, np.

```sh
wdio wdio.conf.js --watch
```

Domyślnie obserwuje tylko zmiany w plikach `specs`. Jednak ustawiając właściwość `filesToWatch` w pliku `wdio.conf.js`, która zawiera listę ścieżek plików (obsługiwane jest globbing), będzie również obserwować zmiany w tych plikach, aby ponownie uruchomić cały zestaw testów. Jest to przydatne, jeśli chcesz automatycznie ponownie uruchamiać wszystkie testy, gdy zmieniłeś kod aplikacji, np.

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // watch for all JS files in my app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Staraj się uruchamiać testy równolegle jak najczęściej. Testy E2E są z natury wolne. Ponowne uruchamianie testów jest przydatne tylko wtedy, gdy możesz utrzymać krótki czas pojedynczego uruchomienia testu. Aby zaoszczędzić czas, testrunner utrzymuje sesje WebDriver aktywne podczas oczekiwania na zmiany plików. Upewnij się, że Twój backend WebDriver może być zmodyfikowany tak, aby nie zamykał automatycznie sesji, jeśli żadne polecenie nie zostało wykonane przez pewien czas.
:::