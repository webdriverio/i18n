---
id: snapshot
title: Snapshot
---

Testy snapshot mogą być bardzo przydatne do sprawdzania wielu aspektów twojego komponentu lub logiki jednocześnie. W WebdriverIO możesz tworzyć snapshoty dowolnego obiektu, a także struktury DOM elementu WebElement lub wyników poleceń WebdriverIO.

Podobnie jak w innych frameworkach testowych, WebdriverIO wykonuje snapshot danej wartości, a następnie porównuje go z referencyjnym plikiem snapshota przechowywanym razem z testem. Test nie powiedzie się, jeśli dwa snapshoty nie pasują do siebie: albo zmiana jest nieoczekiwana, albo referencyjny snapshot musi zostać zaktualizowany do nowej wersji wyniku.

:::info Wsparcie wieloplatformowe

Te funkcje snapshot są dostępne zarówno dla testów end-to-end uruchamianych w środowisku Node.js, jak i dla [testów jednostkowych i komponentowych](/docs/component-testing) w przeglądarce lub na urządzeniach mobilnych.

:::

## Korzystanie ze snapshotów
Aby utworzyć snapshot wartości, możesz użyć `toMatchSnapshot()` z API [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Podczas pierwszego uruchomienia tego testu, WebdriverIO tworzy plik snapshota, który wygląda tak:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Artefakt snapshota powinien być przesłany wraz ze zmianami kodu i sprawdzony jako część procesu przeglądu kodu. Podczas kolejnych uruchomień testów, WebdriverIO porówna wygenerowany wynik z poprzednim snapshotem. Jeśli pasują, test zakończy się sukcesem. Jeśli nie pasują, albo test runner znalazł błąd w twoim kodzie, który należy naprawić, albo implementacja się zmieniła i snapshot wymaga aktualizacji.

Aby zaktualizować snapshot, przekaż flagę `-s` (lub `--updateSnapshot`) do polecenia `wdio`, np.:

```sh
npx wdio run wdio.conf.js -s
```

__Uwaga:__ jeśli uruchamiasz testy z wieloma przeglądarkami równolegle, tylko jeden snapshot jest tworzony i porównywany. Jeśli chcesz mieć osobny snapshot dla każdej konfiguracji, [zgłoś problem](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) i poinformuj nas o swoim przypadku użycia.

## Snapshoty wbudowane

Podobnie możesz użyć `toMatchInlineSnapshot()` do przechowywania snapshota bezpośrednio w pliku testowym.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Zamiast tworzyć plik snapshota, Vitest zmodyfikuje bezpośrednio plik testowy, aby zaktualizować snapshot jako ciąg znaków:

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

Pozwala to zobaczyć oczekiwany wynik bezpośrednio bez konieczności przełączania się między różnymi plikami.

## Snapshoty wizualne

Wykonywanie snapshotu DOM elementu może nie być najlepszym pomysłem, szczególnie jeśli struktura DOM jest zbyt duża i zawiera dynamiczne właściwości elementów. W takich przypadkach zaleca się korzystanie ze snapshotów wizualnych dla elementów.

Aby włączyć snapshoty wizualne, dodaj `@wdio/visual-service` do swojego setupu. Możesz postępować zgodnie z instrukcjami konfiguracji w [dokumentacji](/docs/visual-testing#installation) dla testów wizualnych.

Następnie możesz wykonać snapshot wizualny za pomocą `toMatchElementSnapshot()`, np.:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Obraz jest wtedy przechowywany w katalogu bazowym. Sprawdź [Visual Testing](/docs/visual-testing), aby uzyskać więcej informacji.