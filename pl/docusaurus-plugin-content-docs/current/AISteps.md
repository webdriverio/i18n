---
id: ai-steps
title: Kroki AI w testach
description: Opisuj kroki testów jako intencję za pomocą browser.act() i odczytuj typowane dane za pomocą browser.extract() przy użyciu @wdio/ai-service, a następnie odtwarzaj je z zatwierdzonej w repozytorium pamięci podręcznej bez modelu i przeglądaj każdą naprawę.
---

`@wdio/ai-service` pozwala testowi opisać krok zamiast go skryptować: `browser.act('Add a blue shirt to the cart')` prosi Twój model o jego wykonanie, zapisuje uruchomione komendy WebdriverIO i odtwarza je z pliku pamięci podręcznej przy każdym kolejnym uruchomieniu. Model jest wywoływany ponownie tylko wtedy, gdy strona się zmieniła, a zapisanego kroku nie da się już naprawić bez niego. Używaj go dla przepływów, których znaczniki często się zmieniają, lub aby uruchomić test, zanim poznasz selektory. Do wszystkiego, co już potrafisz zaskryptować, używaj zwykłych komend WebdriverIO.

## Konfiguracja usługi

Zainstaluj usługę oraz pakiet LangChain dostawcy Twojego modelu:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

Dodaj usługę do konfiguracji i ustaw klucz API dostawcy (tutaj `ANTHROPIC_API_KEY`) w zmiennych środowiskowych:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        webSocketUrl: true
    }],
    framework: 'mocha',
    services: [['ai', {
        model: 'anthropic:claude-sonnet-5-5'
    }]]
}
```

`webSocketUrl: true` otwiera sesję WebDriver BiDi. Usługa działa również przez WebDriver Classic, ale BiDi pozwala jej sprawdzić, co zrobił każdy krok, i odczytać odpowiedzi API strony. Na stronie [AI Service](/docs/ai-service) znajdziesz wszystkie opcje i dostawców, w tym modele lokalne przez Ollama.

## Napisz test

```ts title="test/specs/cart.e2e.ts"
import { browser, expect } from '@wdio/globals'
import { z } from 'zod'

describe('cart', () => {
    it('adds a shirt', async () => {
        await browser.url('https://shop.example/')
        await browser.act('Add a blue shirt in size M to the shopping cart')

        const cart = await browser.extract(
            'the line items in the cart',
            z.array(z.object({ name: z.string(), size: z.string(), qty: z.number() }))
        )
        expect(cart).toContainEqual({ name: 'Blue Shirt', size: 'M', qty: 1 })
    })
})
```

- `act` wykonuje krok i nigdy niczego nie asertuje. Sprawdzaj wynik za pomocą `expect`.
- `extract` tylko odczytuje stronę i waliduje odpowiedź względem schematu. Nigdy nie jest buforowany.
- Sekrety umieszczaj w symbolach zastępczych. Model widzi `{{password}}`, nigdy wartość:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- Wywołaj `act` na elemencie, aby ograniczyć model do jego wnętrza, albo na przechwyconej ramce lub karcie:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## Nagraj raz, odtwarzaj bez modelu

Pierwsze uruchomienie zapisuje kroki każdego wywołania `act` w pliku `__act__/<spec file>.json` obok pliku specyfikacji:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Zatwierdź katalog `__act__` w repozytorium. Kolejne uruchomienia odtwarzają zapisane komendy, więc udane uruchomienie nie wykonuje żadnych wywołań modelu i nie kosztuje żadnych tokenów.

| `cache` | Zastosowanie |
| --- | --- |
| `auto` (domyślnie) | `write` lokalnie, `heal` gdy ustawiono `process.env.CI` |
| `write` | nagrywanie i aktualizowanie plików pamięci podręcznej |
| `heal` | CI: naprawia nieudane kroki, zapisuje naprawione wpisy do `<outputDir>/act-cache/` i nie modyfikuje plików pamięci podręcznej |
| `locked` | uruchomienia CI, które nie mogą wywoływać modelu: tylko odtwarzanie, błąd, gdy kroku nie da się naprawić bez modelu |
| `off` | zawsze pytaj model |

Uruchom `npx wdio run wdio.conf.ts -s`, aby ponownie nagrać każde wywołanie `act`.

## Przeglądaj naprawy

Gdy zapisany krok się nie powiedzie, usługa najpierw próbuje innych selektorów, które zapisała dla elementu, a następnie jego roli i nazwy dostępnej. Dopiero jeśli to zawiedzie, model kontynuuje od nieudanego kroku. Każdy odtworzony lub naprawiony krok musi robić to samo, co w momencie nagrania: wysyłać te same żądania, nawigować do tej samej strony i zmieniać te same części strony. Naprawa wskazująca na podobny, ale niewłaściwy przycisk zostaje odrzucona.

Uruchomienie kończy się podsumowaniem:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

Folder z dowodami zawiera zrzut ekranu strony w momencie niepowodzenia kroku, zrzut po każdym kroku naprawy oraz nagranie wideo naprawy w przeglądarkach, które nagrywają screencast WebDriver BiDi (obecnie Firefox). Przejrzyj naprawę, a następnie zatwierdź zaktualizowany plik pamięci podręcznej.

## Zamień kroki na zwykły kod

Gdy przepływ jest już stabilny, zastąp jego wywołania `act` zapisanymi komendami:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Dodaj niebieską koszulę w rozmiarze M do koszyka
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## Rozwiązywanie problemów

| Błąd | Rozwiązanie |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | Ustaw `model` w opcjach usługi lub wyeksportuj `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | Zainstaluj pakiet dostawcy. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Wyeksportuj klucz w powłoce lub w sekrecie CI, który uruchamia testy. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | Nagraj wywołanie lokalnie z `cache: 'write'` i zatwierdź plik `__act__`. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | Element nadal istnieje, ale robi coś innego: to regresja, a nie zmiana znaczników. Sprawdź aplikację. |
| `act("…") failed: …`, a po nim `Evidence: <folder>` | Model nie zdołał wykonać instrukcji. Folder zawiera wszystkie wykonane przez niego zrzuty, zdarzenia konsoli i sieci oraz kroki, które zostały uruchomione. |

## Kolejne kroki

- [AI Service](/docs/ai-service): wszystkie opcje, format pamięci podręcznej, efekty kroków i przestrzeń robocza
- [Selektory](/docs/selectors#role-selector): selektor `role/` używany przez zapisane kroki
- [WebdriverIO dla agentów programistycznych](/docs/ai-agents): pisz testy razem z agentem programistycznym