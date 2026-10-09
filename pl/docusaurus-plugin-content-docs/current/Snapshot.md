---
id: snapshot
title: Snapshot
description: "Weryfikuj obiekty, struktury DOM i wyniki poleceń za pomocą testów snapshot i inline snapshot oraz porównuj wizualne snapshoty."
---

Testy snapshot mogą być bardzo przydatne do jednoczesnego weryfikowania wielu aspektów Twojego komponentu lub logiki. W WebdriverIO możesz tworzyć snapshoty dowolnego obiektu, a także struktury DOM elementu WebElement lub wyników poleceń WebdriverIO.

Podobnie jak inne frameworki testowe, WebdriverIO utworzy snapshot podanej wartości, a następnie porówna go z referencyjnym plikiem snapshot przechowywanym obok testu. Test zakończy się niepowodzeniem, jeśli oba snapshoty nie będą zgodne: albo zmiana jest nieoczekiwana, albo referencyjny snapshot musi zostać zaktualizowany do nowej wersji wyniku.

:::info Wsparcie wieloplatformowe

Te funkcje snapshot są dostępne zarówno podczas uruchamiania testów end-to-end w środowisku Node.js, jak i podczas uruchamiania testów [jednostkowych i komponentowych](/docs/component-testing) w przeglądarce lub na urządzeniach mobilnych.

:::

## Używanie snapshotów
Aby utworzyć snapshot wartości, możesz użyć `toMatchSnapshot()` z API [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Przy pierwszym uruchomieniu tego testu WebdriverIO tworzy plik snapshot, który wygląda następująco:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Artefakt snapshot powinien zostać zatwierdzony (commit) wraz ze zmianami w kodzie i przejrzany w ramach procesu code review. Podczas kolejnych uruchomień testów WebdriverIO porówna wyrenderowany wynik z poprzednim snapshotem. Jeśli są zgodne, test zakończy się powodzeniem. Jeśli nie są zgodne, oznacza to, że test runner znalazł błąd w Twoim kodzie, który należy naprawić, albo implementacja uległa zmianie i snapshot musi zostać zaktualizowany.

Aby zaktualizować snapshot, przekaż flagę `-s` (lub `--updateSnapshot`) do polecenia `wdio`, np.:

```sh
npx wdio run wdio.conf.js -s
```

__Uwaga:__ jeśli uruchamiasz testy równolegle w wielu przeglądarkach, tworzony jest tylko jeden snapshot, z którym wykonywane jest porównanie. Jeśli chcesz mieć osobny snapshot dla każdej capability, [zgłoś issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) i opisz nam swój przypadek użycia.

## Snapshoty inline

Podobnie możesz użyć `toMatchInlineSnapshot()`, aby przechowywać snapshot bezpośrednio w pliku testowym.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Zamiast tworzyć plik snapshot, Vitest zmodyfikuje bezpośrednio plik testowy, aby zaktualizować snapshot w postaci ciągu znaków:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Pozwala to zobaczyć oczekiwany wynik bezpośrednio, bez przeskakiwania między różnymi plikami.

## Snapshoty wizualne

Tworzenie snapshotu DOM elementu może nie być najlepszym pomysłem, zwłaszcza jeśli struktura DOM jest zbyt duża i zawiera dynamiczne właściwości elementów. W takich przypadkach zaleca się korzystanie ze snapshotów wizualnych dla elementów.

Aby włączyć snapshoty wizualne, dodaj `@wdio/visual-service` do swojej konfiguracji. Możesz postępować zgodnie z instrukcjami konfiguracji w [dokumentacji](/docs/visual-testing#installation) dotyczącej testowania wizualnego.

Następnie możesz utworzyć snapshot wizualny za pomocą `toMatchElementSnapshot()`, np.:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Obraz zostanie wtedy zapisany w katalogu bazowym (baseline). Więcej informacji znajdziesz w sekcji [Testowanie wizualne](/docs/visual-testing).