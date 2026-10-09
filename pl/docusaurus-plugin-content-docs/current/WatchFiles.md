---
id: watcher
title: Obserwowanie plików testowych
description: "Automatycznie uruchamiaj ponownie testy, gdy zmienią się pliki specyfikacji lub aplikacji, uruchamiając testrunner WDIO z flagą --watch i opcją filesToWatch."
---

Za pomocą testrunnera WDIO możesz obserwować pliki podczas pracy nad nimi. Testy są automatycznie uruchamiane ponownie, jeśli zmienisz coś w swojej aplikacji lub w plikach testowych. Dodając flagę `--watch` podczas wywoływania polecenia `wdio`, testrunner po wykonaniu wszystkich testów będzie czekał na zmiany w plikach, np.

```sh
wdio wdio.conf.js --watch
```

Domyślnie obserwuje on tylko zmiany w plikach `specs`. Jednak ustawiając w pliku `wdio.conf.js` właściwość `filesToWatch`, zawierającą listę ścieżek do plików (obsługiwane są wzorce glob), będzie on również obserwował zmiany tych plików, aby ponownie uruchomić cały zestaw testów. Jest to przydatne, jeśli chcesz automatycznie uruchamiać ponownie wszystkie testy po zmianie kodu aplikacji, np.

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // obserwuj wszystkie pliki JS w mojej aplikacji
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Staraj się w miarę możliwości uruchamiać testy równolegle. Testy E2E są ze swojej natury powolne. Ponowne uruchamianie testów ma sens tylko wtedy, gdy czas wykonania pojedynczego testu jest krótki. Aby zaoszczędzić czas, testrunner utrzymuje sesje WebDriver aktywne podczas oczekiwania na zmiany w plikach. Upewnij się, że twój backend WebDriver można skonfigurować tak, aby nie zamykał automatycznie sesji, jeśli przez pewien czas nie zostało wykonane żadne polecenie.
:::