---
id: ai-steps
title: टेस्ट में AI स्टेप्स
description: @wdio/ai-service के साथ browser.act() से टेस्ट स्टेप्स को इरादे (intent) के रूप में लिखें और browser.extract() से typed डेटा पढ़ें, फिर उन्हें बिना मॉडल के कमिट किए गए cache से replay करें और हर heal की समीक्षा करें।
---

`@wdio/ai-service` से कोई टेस्ट किसी स्टेप को स्क्रिप्ट करने के बजाय उसका वर्णन कर सकता है: `browser.act('Add a blue shirt to the cart')` आपके मॉडल से उसे पूरा करने के लिए कहता है, उसके द्वारा चलाए गए WebdriverIO कमांड रिकॉर्ड करता है, और बाद के हर रन पर उन्हें एक cache फ़ाइल से replay करता है। मॉडल को दोबारा तभी कॉल किया जाता है जब पेज बदल गया हो और रिकॉर्ड किए गए स्टेप को उसके बिना ठीक न किया जा सके। इसका उपयोग उन flows के लिए करें जिनका markup अक्सर बदलता है, या selectors जानने से पहले ही टेस्ट चलाने के लिए। जिन चीज़ों को आप पहले से स्क्रिप्ट करना जानते हैं, उनके लिए सामान्य WebdriverIO कमांड का उपयोग करें।

## सर्विस सेट अप करें

सर्विस और अपने मॉडल प्रोवाइडर का LangChain पैकेज इंस्टॉल करें:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

सर्विस को अपने config में जोड़ें और प्रोवाइडर की API key (यहाँ `ANTHROPIC_API_KEY`) को environment में सेट करें:

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

`webSocketUrl: true` एक WebDriver BiDi सेशन खोलता है। यह सर्विस WebDriver Classic पर भी काम करती है, लेकिन BiDi इसे यह जाँचने देता है कि हर स्टेप ने क्या किया और पेज के API responses पढ़ने देता है। हर विकल्प और प्रोवाइडर, जिसमें Ollama के ज़रिए लोकल मॉडल भी शामिल हैं, के लिए [AI Service](/docs/ai-service) पेज देखें।

## एक टेस्ट लिखें

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

- `act` स्टेप को पूरा करता है और कभी assert नहीं करता। परिणाम को `expect` से जाँचें।
- `extract` केवल पेज को पढ़ता है और उत्तर को schema के विरुद्ध validate करता है। यह कभी cache नहीं होता।
- Secrets placeholders में जाते हैं। मॉडल को `{{password}}` दिखता है, कभी उसका मान नहीं:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- मॉडल को किसी element के अंदर सीमित रखने के लिए उस element पर `act` कॉल करें, या किसी held frame या tab पर:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## एक बार रिकॉर्ड करें, बिना मॉडल के replay करें

पहला रन हर `act` कॉल के स्टेप्स को spec के बगल में `__act__/<spec file>.json` में रिकॉर्ड करता है:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`__act__` डायरेक्टरी को कमिट करें। बाद के रन रिकॉर्ड किए गए कमांड replay करते हैं, इसलिए एक सफल रन कोई मॉडल कॉल नहीं करता और कोई token खर्च नहीं होता।

| `cache` | इसका उपयोग करें |
| --- | --- |
| `auto` (डिफ़ॉल्ट) | लोकल रूप से `write`, जब `process.env.CI` सेट हो तो `heal` |
| `write` | cache फ़ाइलों को रिकॉर्ड और अपडेट करने के लिए |
| `heal` | CI: विफल स्टेप्स को ठीक करें, ठीक की गई entries को `<outputDir>/act-cache/` में लिखें और cache फ़ाइलों को अछूता छोड़ दें |
| `locked` | ऐसे CI रन जिन्हें मॉडल कॉल नहीं करना चाहिए: केवल replay, जब किसी स्टेप को मॉडल के बिना ठीक न किया जा सके तो विफल हो जाएँ |
| `off` | हमेशा मॉडल से पूछें |

हर `act` कॉल को फिर से रिकॉर्ड करने के लिए `npx wdio run wdio.conf.ts -s` चलाएँ।

## Heals की समीक्षा करें

जब कोई रिकॉर्ड किया गया स्टेप विफल होता है, तो सर्विस पहले उस element के लिए रिकॉर्ड किए गए अन्य selectors आज़माती है और फिर उसका role और accessible name। केवल तभी, जब यह विफल हो जाए, मॉडल विफल स्टेप से आगे जारी रखता है। हर replay या heal किए गए स्टेप को वही करना होता है जो उसने रिकॉर्ड होते समय किया था: वही requests भेजना, उसी पेज पर navigate करना और पेज के उन्हीं हिस्सों को बदलना। किसी मिलते-जुलते लेकिन गलत बटन पर किया गया heal अस्वीकार कर दिया जाता है।

रन एक सारांश के साथ समाप्त होता है:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

Evidence फ़ोल्डर में स्टेप विफल होने के समय पेज का एक screenshot, हर healing स्टेप के बाद एक screenshot, और उन ब्राउज़रों में heal का एक वीडियो होता है जो WebDriver BiDi screencast रिकॉर्ड करते हैं (फ़िलहाल Firefox)। Heal की समीक्षा करें, फिर अपडेट की गई cache फ़ाइल को कमिट करें।

## स्टेप्स को सामान्य कोड में बदलें

एक बार कोई flow स्थिर हो जाए, तो उसकी `act` कॉल्स को रिकॉर्ड किए गए कमांड से बदल दें:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Add a blue shirt in size M to the shopping cart
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## समस्या निवारण

| त्रुटि | समाधान |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | सर्विस विकल्पों में `model` सेट करें या `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5` export करें। |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | प्रोवाइडर पैकेज इंस्टॉल करें। |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Key को उस shell या CI secret में export करें जो टेस्ट चलाता है। |
| `act("…") failed: no cached steps for "…" and the cache is locked` | कॉल को लोकल रूप से `cache: 'write'` के साथ रिकॉर्ड करें और `__act__` फ़ाइल को कमिट करें। |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | Element अभी भी मौजूद है लेकिन कुछ और करता है: यह एक regression है, markup बदलाव नहीं। ऐप की जाँच करें। |
| `act("…") failed: …` के बाद `Evidence: <folder>` | मॉडल निर्देश को पूरा नहीं कर सका। फ़ोल्डर में उसके द्वारा लिया गया हर snapshot, console और network events और चलाए गए स्टेप्स होते हैं। |

## अगले कदम

- [AI Service](/docs/ai-service): हर विकल्प, cache फ़ॉर्मेट, step effects और workspace
- [Selectors](/docs/selectors#role-selector): `role/` selector जिसका उपयोग रिकॉर्ड किए गए स्टेप्स करते हैं
- [WebdriverIO for Coding Agents](/docs/ai-agents): किसी coding agent के साथ मिलकर टेस्ट लिखें