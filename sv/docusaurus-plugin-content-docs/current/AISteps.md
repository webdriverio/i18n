---
id: ai-steps
title: AI-steg i tester
description: Skriv teststeg som avsikter med browser.act() och läs typad data med browser.extract() med hjälp av @wdio/ai-service, spela sedan upp dem från en incheckad cache utan modell och granska varje läkning.
---

`@wdio/ai-service` låter ett test beskriva ett steg i stället för att skripta det: `browser.act('Add a blue shirt to the cart')` ber din modell att utföra det, registrerar de WebdriverIO-kommandon den körde och spelar upp dem från en cachefil vid varje senare körning. Modellen anropas bara igen när sidan har ändrats och ett registrerat steg inte längre kan repareras utan den. Använd det för flöden vars markup ändras ofta, eller för att få igång ett test innan du känner till selektorerna. Använd vanliga WebdriverIO-kommandon för allt du redan vet hur du skriptar.

## Konfigurera tjänsten

Installera tjänsten och LangChain-paketet för din modellleverantör:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

Lägg till tjänsten i din konfiguration och ange leverantörens API-nyckel (`ANTHROPIC_API_KEY` här) i miljön:

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

`webSocketUrl: true` öppnar en WebDriver BiDi-session. Tjänsten fungerar även över WebDriver Classic, men BiDi låter den kontrollera vad varje steg gjorde och läsa sidans API-svar. Se sidan [AI Service](/docs/ai-service) för alla alternativ och leverantörer, inklusive lokala modeller via Ollama.

## Skriv ett test

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

- `act` utför steget och gör aldrig några assertions. Kontrollera resultatet med `expect`.
- `extract` läser bara sidan och validerar svaret mot schemat. Det cachas aldrig.
- Hemligheter placeras i platshållare. Modellen ser `{{password}}`, aldrig värdet:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- Anropa `act` på ett element för att hålla modellen inom det, eller på en hållen frame eller flik:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## Registrera en gång, spela upp utan modell

Den första körningen registrerar stegen för varje `act`-anrop i `__act__/<spec file>.json` bredvid spec-filen:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Checka in katalogen `__act__`. Senare körningar spelar upp de registrerade kommandona, så en godkänd körning gör inga modellanrop och kostar inga tokens.

| `cache` | Använd det för |
| --- | --- |
| `auto` (standard) | `write` lokalt, `heal` när `process.env.CI` är satt |
| `write` | registrering och uppdatering av cachefilerna |
| `heal` | CI: reparera misslyckade steg, skriv de reparerade posterna till `<outputDir>/act-cache/` och låt cachefilerna vara orörda |
| `locked` | CI-körningar som inte får anropa en modell: endast uppspelning, misslyckas när ett steg inte kan repareras utan modellen |
| `off` | fråga alltid modellen |

Kör `npx wdio run wdio.conf.ts -s` för att registrera alla `act`-anrop på nytt.

## Granska läkningar

När ett registrerat steg misslyckas försöker tjänsten först med de andra selektorer den registrerade för elementet och sedan med dess roll och tillgängliga namn. Först om det misslyckas fortsätter modellen från det misslyckade steget. Varje uppspelat eller läkt steg måste göra det som det gjorde när det registrerades: skicka samma förfrågningar, navigera till samma sida och ändra samma delar av sidan. En läkning till en liknande men felaktig knapp avvisas.

Körningen avslutas med en sammanfattning:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

Bevismappen innehåller en skärmbild av sidan när steget misslyckades, en efter varje läkningssteg, och en video av läkningen i webbläsare som spelar in en WebDriver BiDi-screencast (i dagsläget Firefox). Granska läkningen och checka sedan in den uppdaterade cachefilen.

## Gör om steg till vanlig kod

När ett flöde är stabilt kan du ersätta dess `act`-anrop med de registrerade kommandona:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Add a blue shirt in size M to the shopping cart
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## Felsökning

| Fel | Åtgärd |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | Ange `model` i tjänstens alternativ eller exportera `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | Installera leverantörspaketet. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Exportera nyckeln i skalet eller som CI-hemlighet där testerna körs. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | Registrera anropet lokalt med `cache: 'write'` och checka in `__act__`-filen. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | Elementet finns kvar men gör något annat: en regression, inte en markup-ändring. Kontrollera appen. |
| `act("…") failed: …` följt av `Evidence: <folder>` | Modellen kunde inte slutföra instruktionen. Mappen innehåller varje ögonblicksbild den tog, konsol- och nätverkshändelserna och de steg som kördes. |

## Nästa steg

- [AI Service](/docs/ai-service): alla alternativ, cacheformatet, stegeffekter och arbetsytan
- [Selektorer](/docs/selectors#role-selector): `role/`-selektorn som registrerade steg använder
- [WebdriverIO för kodagenter](/docs/ai-agents): skriv tester tillsammans med en kodagent