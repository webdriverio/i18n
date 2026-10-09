---
id: v6-migration
title: Z v5 do v6
description: "Zaktualizuj projekt WebdriverIO z v5 do v6, aktualizując zależności, przekształcając plik konfiguracyjny oraz aktualizując pliki specyfikacji i obiekty stron."
---

Ten samouczek jest przeznaczony dla osób, które nadal używają WebdriverIO w wersji `v5` i chcą przejść na `v6` lub na najnowszą wersję WebdriverIO. Jak wspomnieliśmy w naszym [wpisie na blogu o wydaniu](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), zmiany związane z tą aktualizacją wersji można podsumować następująco:

- ujednoliciliśmy parametry niektórych poleceń (np. `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) i przenieśliśmy wszystkie parametry opcjonalne do jednego obiektu, np.

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

- konfiguracje usług zostały przeniesione do listy usług, np.

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

- nazwy niektórych opcji usług zostały zmienione w celu uproszczenia
- zmieniliśmy nazwę polecenia `launchApp` na `launchChromeApp` dla sesji Chrome WebDriver

:::info

Jeśli używasz WebdriverIO w wersji `v4` lub starszej, najpierw zaktualizuj do `v5`.

:::

Chociaż bardzo chcielibyśmy, aby ten proces był w pełni zautomatyzowany, rzeczywistość wygląda inaczej. Każdy ma inną konfigurację. Każdy krok należy traktować raczej jako wskazówkę niż instrukcję krok po kroku. Jeśli masz problemy z migracją, nie wahaj się [skontaktować z nami](https://github.com/webdriverio/codemod/discussions/new).

## Setup

Podobnie jak w przypadku innych migracji, możemy użyć [codemod](https://github.com/webdriverio/codemod) WebdriverIO. Aby zainstalować codemod, uruchom:

```sh
npm install jscodeshift @wdio/codemod
```

## Upgrade WebdriverIO Dependencies

Ponieważ wszystkie wersje WebdriverIO są ze sobą ściśle powiązane, najlepiej zawsze aktualizować do konkretnego tagu, np. `6.12.0`. Jeśli zdecydujesz się zaktualizować z `v5` bezpośrednio do `v7`, możesz pominąć tag i zainstalować najnowsze wersje wszystkich pakietów. W tym celu kopiujemy wszystkie zależności związane z WebdriverIO z naszego pliku `package.json` i instalujemy je ponownie za pomocą:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Zazwyczaj zależności WebdriverIO należą do zależności deweloperskich (dev dependencies), jednak w zależności od projektu może to wyglądać inaczej. Po wykonaniu tego kroku Twoje pliki `package.json` i `package-lock.json` powinny zostać zaktualizowane. __Uwaga:__ są to przykładowe zależności, Twoje mogą się różnić. Upewnij się, że znajdziesz najnowszą wersję v6, wywołując np.:

```sh
npm show webdriverio versions
```

Spróbuj zainstalować najnowszą dostępną wersję 6 dla wszystkich podstawowych pakietów WebdriverIO. W przypadku pakietów społecznościowych może się to różnić w zależności od pakietu. Zalecamy tutaj sprawdzenie dziennika zmian (changelog) pod kątem informacji, która wersja jest nadal kompatybilna z v6.

## Transform Config File

Dobrym pierwszym krokiem jest rozpoczęcie od pliku konfiguracyjnego. Wszystkie zmiany powodujące niezgodność (breaking changes) można rozwiązać w pełni automatycznie za pomocą codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Codemod nie obsługuje jeszcze projektów TypeScript. Zobacz [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Pracujemy nad tym, aby wkrótce dodać tę obsługę. Jeśli używasz TypeScript, zaangażuj się!

:::

## Update Spec Files and Page Objects

Aby zaktualizować wszystkie zmiany poleceń, uruchom codemod na wszystkich plikach e2e zawierających polecenia WebdriverIO, np.:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

To wszystko! Żadne dalsze zmiany nie są potrzebne 🎉

## Conclusion

Mamy nadzieję, że ten samouczek choć trochę przeprowadzi Cię przez proces migracji do WebdriverIO `v6`. Zdecydowanie zalecamy kontynuowanie aktualizacji do najnowszej wersji, ponieważ aktualizacja do `v7` jest banalna dzięki niemal całkowitemu brakowi zmian powodujących niezgodność. Zapoznaj się z przewodnikiem migracji, aby [zaktualizować do v7](v7-migration).

Społeczność nieustannie ulepsza codemod, testując go z różnymi zespołami w różnych organizacjach. Nie wahaj się [zgłosić problemu](https://github.com/webdriverio/codemod/issues/new), jeśli masz uwagi, lub [rozpocząć dyskusję](https://github.com/webdriverio/codemod/discussions/new), jeśli napotkasz trudności podczas procesu migracji.