---
id: ai-steps
title: சோதனைகளில் AI படிகள்
description: @wdio/ai-service ஐப் பயன்படுத்தி browser.act() மூலம் சோதனைப் படிகளை நோக்கமாக எழுதுங்கள், browser.extract() மூலம் வகைப்படுத்தப்பட்ட தரவைப் படியுங்கள், பின்னர் commit செய்யப்பட்ட cache இலிருந்து மாடல் இல்லாமல் அவற்றை மீண்டும் இயக்கி, ஒவ்வொரு heal-ஐயும் மதிப்பாய்வு செய்யுங்கள்.
---

`@wdio/ai-service` ஒரு சோதனையில் ஒரு படியை script செய்வதற்குப் பதிலாக அதை விவரிக்க அனுமதிக்கிறது: `browser.act('Add a blue shirt to the cart')` அந்தப் படியைச் செய்யும்படி உங்கள் மாடலைக் கேட்கிறது, அது இயக்கிய WebdriverIO கட்டளைகளைப் பதிவு செய்கிறது, பின்னர் வரும் ஒவ்வொரு இயக்கத்திலும் அவற்றை ஒரு cache கோப்பிலிருந்து மீண்டும் இயக்குகிறது. பக்கம் மாறி, பதிவு செய்யப்பட்ட ஒரு படியை மாடல் இல்லாமல் சரிசெய்ய முடியாதபோது மட்டுமே மாடல் மீண்டும் அழைக்கப்படுகிறது. markup அடிக்கடி மாறும் flow-களுக்கு, அல்லது selector-கள் தெரிவதற்கு முன்பே ஒரு சோதனையை இயங்கச் செய்ய இதைப் பயன்படுத்துங்கள். எப்படி script செய்வது என்று ஏற்கனவே தெரிந்த அனைத்திற்கும் சாதாரண WebdriverIO கட்டளைகளைப் பயன்படுத்துங்கள்.

## சேவையை அமைத்தல்

சேவையையும் உங்கள் மாடல் வழங்குநரின் LangChain தொகுப்பையும் நிறுவுங்கள்:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

சேவையை உங்கள் config-இல் சேர்த்து, வழங்குநரின் API key-ஐ (இங்கே `ANTHROPIC_API_KEY`) environment-இல் அமைக்கவும்:

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

`webSocketUrl: true` ஒரு WebDriver BiDi session-ஐத் திறக்கிறது. இந்தச் சேவை WebDriver Classic மூலமும் செயல்படும், ஆனால் BiDi ஒவ்வொரு படியும் என்ன செய்தது என்பதைச் சரிபார்க்கவும், பக்கத்தின் API பதில்களைப் படிக்கவும் அனுமதிக்கிறது. Ollama மூலம் உள்ளூர் மாடல்கள் உட்பட ஒவ்வொரு விருப்பத்தையும் வழங்குநரையும் அறிய [AI Service](/docs/ai-service) பக்கத்தைப் பாருங்கள்.

## ஒரு சோதனையை எழுதுதல்

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

- `act` படியைச் செய்கிறது, ஒருபோதும் assert செய்வதில்லை. முடிவை `expect` மூலம் சரிபார்க்கவும்.
- `extract` பக்கத்தை மட்டுமே படித்து, பதிலை schema-வுக்கு எதிராகச் சரிபார்க்கிறது. அது ஒருபோதும் cache செய்யப்படுவதில்லை.
- இரகசியங்கள் placeholder-களில் செல்கின்றன. மாடல் `{{password}}` ஐ மட்டுமே பார்க்கிறது, மதிப்பை ஒருபோதும் பார்ப்பதில்லை:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- மாடலை ஒரு element-க்குள் வைத்திருக்க அந்த element-இல் `act` ஐ அழையுங்கள், அல்லது பிடித்து வைத்திருக்கும் frame அல்லது tab-இல் அழையுங்கள்:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## ஒருமுறை பதிவு செய்யுங்கள், மாடல் இல்லாமல் மீண்டும் இயக்குங்கள்

முதல் இயக்கம் ஒவ்வொரு `act` அழைப்பின் படிகளையும் spec-க்கு அருகிலுள்ள `__act__/<spec file>.json` இல் பதிவு செய்கிறது:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`__act__` கோப்பகத்தை commit செய்யுங்கள். பின்னர் வரும் இயக்கங்கள் பதிவு செய்யப்பட்ட கட்டளைகளை மீண்டும் இயக்குகின்றன, எனவே வெற்றிகரமான இயக்கம் எந்த மாடல் அழைப்பையும் செய்வதில்லை, எந்த token-களும் செலவாவதில்லை.

| `cache` | இதற்குப் பயன்படுத்துங்கள் |
| --- | --- |
| `auto` (இயல்புநிலை) | உள்ளூரில் `write`, `process.env.CI` அமைக்கப்பட்டிருக்கும்போது `heal` |
| `write` | cache கோப்புகளைப் பதிவு செய்தல் மற்றும் புதுப்பித்தல் |
| `heal` | CI: தோல்வியடையும் படிகளைச் சரிசெய்து, சரிசெய்யப்பட்ட பதிவுகளை `<outputDir>/act-cache/` இல் எழுதி, cache கோப்புகளைத் தொடாமல் விடுதல் |
| `locked` | மாடலை அழைக்கக்கூடாத CI இயக்கங்கள்: மீண்டும் இயக்க மட்டும், ஒரு படியை மாடல் இல்லாமல் சரிசெய்ய முடியாதபோது தோல்வியடைதல் |
| `off` | எப்போதும் மாடலைக் கேட்டல் |

ஒவ்வொரு `act` அழைப்பையும் மீண்டும் பதிவு செய்ய `npx wdio run wdio.conf.ts -s` ஐ இயக்கவும்.

## Heal-களை மதிப்பாய்வு செய்தல்

பதிவு செய்யப்பட்ட ஒரு படி தோல்வியடையும்போது, சேவை முதலில் அந்த element-க்காகப் பதிவு செய்த மற்ற selector-களையும், பின்னர் அதன் role மற்றும் accessible name-ஐயும் முயற்சிக்கிறது. அதுவும் தோல்வியடைந்தால் மட்டுமே மாடல் தோல்வியடைந்த படியிலிருந்து தொடர்கிறது. மீண்டும் இயக்கப்படும் அல்லது heal செய்யப்படும் ஒவ்வொரு படியும் பதிவு செய்யப்பட்டபோது செய்ததையே செய்ய வேண்டும்: அதே request-களை அனுப்ப வேண்டும், அதே பக்கத்திற்குச் செல்ல வேண்டும், பக்கத்தின் அதே பகுதிகளை மாற்ற வேண்டும். ஒத்த ஆனால் தவறான பொத்தானுக்கு செய்யப்படும் heal நிராகரிக்கப்படுகிறது.

இயக்கம் ஒரு சுருக்கத்துடன் முடிகிறது:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

evidence கோப்புறையில் படி தோல்வியடைந்தபோது பக்கத்தின் screenshot, ஒவ்வொரு healing படிக்குப் பிறகும் ஒரு screenshot, மற்றும் WebDriver BiDi screencast-ஐப் பதிவு செய்யும் browser-களில் (தற்போது Firefox) heal-இன் வீடியோ ஆகியவை உள்ளன. heal-ஐ மதிப்பாய்வு செய்து, பின்னர் புதுப்பிக்கப்பட்ட cache கோப்பை commit செய்யுங்கள்.

## படிகளைச் சாதாரண code ஆக மாற்றுதல்

ஒரு flow நிலையானதும், அதன் `act` அழைப்புகளைப் பதிவு செய்யப்பட்ட கட்டளைகளால் மாற்றுங்கள்:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: M அளவிலான நீல நிறச் சட்டையை shopping cart-இல் சேர்க்கவும்
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## சிக்கல் தீர்த்தல்

| பிழை | தீர்வு |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | சேவை விருப்பங்களில் `model` ஐ அமைக்கவும் அல்லது `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5` ஐ export செய்யவும். |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | வழங்குநர் தொகுப்பை நிறுவவும். |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | சோதனைகளை இயக்கும் shell அல்லது CI secret-இல் key-ஐ export செய்யவும். |
| `act("…") failed: no cached steps for "…" and the cache is locked` | `cache: 'write'` உடன் அழைப்பை உள்ளூரில் பதிவு செய்து, `__act__` கோப்பை commit செய்யவும். |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | element இன்னும் உள்ளது, ஆனால் வேறு ஒன்றைச் செய்கிறது: இது markup மாற்றம் அல்ல, regression. app-ஐச் சரிபார்க்கவும். |
| `act("…") failed: …` தொடர்ந்து `Evidence: <folder>` | மாடலால் அறிவுறுத்தலை முடிக்க முடியவில்லை. அந்தக் கோப்புறையில் அது எடுத்த ஒவ்வொரு snapshot-உம், console மற்றும் network நிகழ்வுகளும், இயங்கிய படிகளும் உள்ளன. |

## அடுத்த படிகள்

- [AI Service](/docs/ai-service): ஒவ்வொரு விருப்பமும், cache வடிவமும், படிகளின் விளைவுகளும், workspace-உம்
- [Selectors](/docs/selectors#role-selector): பதிவு செய்யப்பட்ட படிகள் பயன்படுத்தும் `role/` selector
- [WebdriverIO for Coding Agents](/docs/ai-agents): ஒரு coding agent உடன் சேர்ந்து சோதனைகளை எழுதுங்கள்