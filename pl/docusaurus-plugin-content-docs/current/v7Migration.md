---
id: v7-migration
title: Z v6 do v7
description: "Zaktualizuj projekt WebdriverIO z wersji v6 do v7, aktualizując zależności, przekształcając plik konfiguracyjny i aktualizując definicje kroków Cucumber."
---

Ten samouczek jest przeznaczony dla osób, które nadal używają WebdriverIO w wersji `v6` i chcą przeprowadzić migrację do `v7`. Jak wspomniano w naszym [wpisie na blogu o wydaniu](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), zmiany dotyczą głównie wewnętrznych mechanizmów, a aktualizacja powinna być prostym procesem.

:::info

Jeśli używasz WebdriverIO w wersji `v5` lub starszej, najpierw zaktualizuj do `v6`. Zapoznaj się z naszym [przewodnikiem migracji do v6](v6-migration).

:::

Chociaż bardzo chcielibyśmy mieć w pełni zautomatyzowany proces, rzeczywistość wygląda inaczej. Każdy ma inną konfigurację. Każdy krok należy traktować jako wskazówkę, a nie jako instrukcję krok po kroku. Jeśli masz problemy z migracją, nie wahaj się [skontaktować z nami](https://github.com/webdriverio/codemod/discussions/new).

## Konfiguracja

Podobnie jak w przypadku innych migracji, możemy użyć [codemod](https://github.com/webdriverio/codemod) WebdriverIO. W tym samouczku używamy [projektu szablonowego](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) przesłanego przez członka społeczności i w pełni migrujemy go z `v6` do `v7`.

Aby zainstalować codemod, uruchom:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commity:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Aktualizacja zależności WebdriverIO

Biorąc pod uwagę, że wszystkie wersje WebdriverIO są ze sobą ściśle powiązane, najlepiej zawsze aktualizować do konkretnego tagu, np. `latest`. W tym celu kopiujemy wszystkie zależności związane z WebdriverIO z naszego pliku `package.json` i instalujemy je ponownie za pomocą:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Zazwyczaj zależności WebdriverIO są częścią zależności deweloperskich (dev dependencies), jednak w zależności od projektu może to wyglądać inaczej. Po wykonaniu tej czynności Twoje pliki `package.json` i `package-lock.json` powinny zostać zaktualizowane. __Uwaga:__ są to zależności używane przez [przykładowy projekt](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), Twoje mogą się różnić.

#### Commity:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Przekształcenie pliku konfiguracyjnego

Dobrym pierwszym krokiem jest rozpoczęcie od pliku konfiguracyjnego. W WebdriverIO `v7` nie trzeba już ręcznie rejestrować żadnych kompilatorów. W rzeczywistości należy je usunąć. Można to zrobić w pełni automatycznie za pomocą codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Codemod nie obsługuje jeszcze projektów TypeScript. Zobacz [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Pracujemy nad wkrótce wprowadzeniem tej obsługi. Jeśli używasz TypeScript, zaangażuj się!

:::

#### Commity:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Aktualizacja definicji kroków

Jeśli używasz Jasmine lub Mocha, na tym etapie skończyłeś. Ostatnim krokiem jest aktualizacja importów Cucumber.js z `cucumber` na `@cucumber/cucumber`. Można to również zrobić automatycznie za pomocą codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

To wszystko! Żadne dalsze zmiany nie są konieczne 🎉

#### Commity:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Podsumowanie

Mamy nadzieję, że ten samouczek choć trochę przeprowadzi Cię przez proces migracji do WebdriverIO `v7`. Społeczność nieustannie ulepsza codemod, testując go z różnymi zespołami w różnych organizacjach. Nie wahaj się [zgłosić problemu](https://github.com/webdriverio/codemod/issues/new), jeśli masz uwagi, lub [rozpocząć dyskusję](https://github.com/webdriverio/codemod/discussions/new), jeśli napotkasz trudności podczas procesu migracji.