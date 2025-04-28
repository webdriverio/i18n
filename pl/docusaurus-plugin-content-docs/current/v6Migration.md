---
id: v6-migration
title: Z v5 do v6
---

Ten tutorial jest dla osób, które nadal używają `v5` WebdriverIO i chcą migrować do `v6` lub do najnowszej wersji WebdriverIO. Jak wspomniano w naszym [poście na blogu dotyczącym wydania](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), zmiany dla tej aktualizacji wersji można podsumować następująco:

- skonsolidowaliśmy parametry dla niektórych poleceń (np. `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) i przenieśliśmy wszystkie opcjonalne parametry do pojedynczego obiektu, np.

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- konfiguracje dla usług zostały przeniesione do listy usług, np.

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- niektóre opcje usług zostały przemianowane w celu uproszczenia
- przemianowaliśmy polecenie `launchApp` na `launchChromeApp` dla sesji Chrome WebDriver

:::info

Jeśli używasz WebdriverIO `v4` lub niższej, najpierw zaktualizuj do `v5`.

:::

Chociaż chcielibyśmy mieć w pełni zautomatyzowany proces, rzeczywistość wygląda inaczej. Każdy ma inną konfigurację. Każdy krok powinien być traktowany jako wskazówka, a nie jako instrukcja krok po kroku. Jeśli masz problemy z migracją, nie wahaj się [skontaktować z nami](https://github.com/webdriverio/codemod/discussions/new).

## Konfiguracja

Podobnie jak w przypadku innych migracji, możemy użyć WebdriverIO [codemod](https://github.com/webdriverio/codemod). Aby zainstalować codemod, uruchom:

```sh
npm install jscodeshift @wdio/codemod
```

## Aktualizacja zależności WebdriverIO

Biorąc pod uwagę, że wszystkie wersje WebdriverIO są ze sobą ściśle powiązane, najlepiej jest zawsze aktualizować do konkretnego tagu, np. `6.12.0`. Jeśli zdecydujesz się na aktualizację z `v5` bezpośrednio do `v7`, możesz pominąć tag i zainstalować najnowsze wersje wszystkich pakietów. Aby to zrobić, kopiujemy wszystkie zależności związane z WebdriverIO z naszego `package.json` i reinstalujemy je za pomocą:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Zazwyczaj zależności WebdriverIO są częścią dev dependencies, choć w zależności od projektu może to się różnić. Po tym Twój `package.json` i `package-lock.json` powinny zostać zaktualizowane. __Uwaga:__ to przykładowe zależności, Twoje mogą się różnić. Upewnij się, że znajdziesz najnowszą wersję v6, wywołując, np.:

```sh
npm show webdriverio versions
```

Staraj się zainstalować najnowszą dostępną wersję 6 dla wszystkich podstawowych pakietów WebdriverIO. W przypadku pakietów społecznościowych może to się różnić w zależności od pakietu. Tutaj zalecamy sprawdzenie dziennika zmian (changelog) w poszukiwaniu informacji, które wersje są nadal kompatybilne z v6.

## Transformacja pliku konfiguracyjnego

Dobrym pierwszym krokiem jest rozpoczęcie od pliku konfiguracyjnego. Wszystkie zmiany niekompatybilne można rozwiązać za pomocą codemod w pełni automatycznie:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Codemod nie obsługuje jeszcze projektów TypeScript. Zobacz [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Pracujemy nad implementacją wsparcia dla niego wkrótce. Jeśli używasz TypeScript, prosimy o zaangażowanie się!

:::

## Aktualizacja plików spec i obiektów strony

Aby zaktualizować wszystkie zmiany poleceń, uruchom codemod na wszystkich plikach e2e zawierających polecenia WebdriverIO, np.:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

To wszystko! Nie są potrzebne więcej zmian 🎉

## Podsumowanie

Mamy nadzieję, że ten tutorial przeprowadził Cię trochę przez proces migracji do WebdriverIO `v6`. Zdecydowanie zalecamy kontynuowanie aktualizacji do najnowszej wersji, biorąc pod uwagę, że aktualizacja do `v7` jest trywialna ze względu na prawie brak zmian niekompatybilnych. Sprawdź przewodnik migracji [aby zaktualizować do v7](v7-migration).

Społeczność nadal ulepsza codemod, testując go z różnymi zespołami w różnych organizacjach. Nie wahaj się [zgłosić problemu](https://github.com/webdriverio/codemod/issues/new), jeśli masz jakieś opinie lub [rozpocząć dyskusję](https://github.com/webdriverio/codemod/discussions/new), jeśli masz trudności podczas procesu migracji.