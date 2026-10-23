---
id: ai-steps
title: टेस्ट में AI स्टेप्स
description: @wdio/ai-service का उपयोग करके browser.act() के साथ टेस्ट स्टेप्स को इरादे के रूप में लिखें और browser.extract() के साथ टाइप्ड डेटा पढ़ें, फिर उन्हें बिना मॉडल के कमिट किए गए कैश से रीप्ले करें और हर हील की समीक्षा करें।
---

`@wdio/ai-service` की मदद से कोई टेस्ट किसी स्टेप को स्क्रिप्ट करने के बजाय उसका वर्णन कर सकता है: `browser.act('Add a blue shirt to the cart')` आपके मॉडल से उसे पूरा करने के लिए कहता है, उसके द्वारा चलाए गए WebdriverIO कमांड रिकॉर्ड करता है, और बाद के हर रन में उन्हें एक कैश फ़ाइल से रीप्ले करता है। मॉडल को दोबारा केवल तब कॉल किया जाता है जब पेज बदल गया हो और कोई रिकॉर्ड किया गया स्टेप उसके बिना ठीक न किया जा सके। इसका उपयोग उन फ़्लो के लिए करें जिनका मार्कअप अक्सर बदलता है, या सेलेक्टर्स जानने से पहले ही टेस्ट चलाने के लिए। जिन चीज़ों को आप पहले से स्क्रिप्ट करना जानते हैं, उनके लिए सामान्य WebdriverIO कमांड का उपयोग करें।

## सर्विस सेट अप करें

सर्विस और अपने मॉडल प्रोवाइडर का LangChain पैकेज इंस्टॉल करें:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

सर्विस को अपने कॉन्फ़िग में जोड़ें और प्रोवाइडर की API key (यहाँ `ANTHROPIC_API_KEY`) को एनवायरनमेंट में सेट करें:

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

`webSocketUrl: true` एक WebDriver BiDi सेशन खोलता है। सर्विस WebDriver Classic पर भी काम करती है, लेकिन BiDi इसे यह जाँचने देता है कि हर स्टेप ने क्या किया और पेज के API रिस्पॉन्स पढ़ने देता है। हर विकल्प और प्रोवाइडर के लिए, जिसमें Ollama के माध्यम से लोकल मॉडल भी शामिल हैं, [AI Service](/docs/ai-service) पेज देखें।

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

- `act` स्टेप को पूरा करता है और कभी असर्ट नहीं करता। परिणाम को `expect` से जाँचें।
- `extract` केवल पेज को पढ़ता है और उत्तर को स्कीमा के विरुद्ध वैलिडेट करता है। इसे कभी कैश नहीं किया जाता।
- सीक्रेट्स प्लेसहोल्डर्स में जाते हैं। मॉडल `{{password}}` देखता है, कभी उसका मान नहीं:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- मॉडल को किसी एलिमेंट के अंदर सीमित रखने के लिए उस एलिमेंट पर `act` कॉल करें, या किसी होल्ड किए गए फ़्रेम या टैब पर:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## एक बार रिकॉर्ड करें, बिना मॉडल के रीप्ले करें

पहला रन हर `act` कॉल के स्टेप्स को स्पेक के बगल में `__act__/<spec file>.json` में रिकॉर्ड करता है:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`__act__` डायरेक्टरी को कमिट करें। बाद के रन रिकॉर्ड किए गए कमांड रीप्ले करते हैं, इसलिए एक सफल रन कोई मॉडल कॉल नहीं करता और उसमें कोई टोकन खर्च नहीं होता।

| `cache` | इसका उपयोग किसके लिए करें |
| --- | --- |
| `auto` (डिफ़ॉल्ट) | लोकल रूप से `write`, जब `process.env.CI` सेट हो तो `heal` |
| `write` | कैश फ़ाइलों को रिकॉर्ड और अपडेट करना |
| `heal` | CI: विफल स्टेप्स को ठीक करें, ठीक की गई एंट्रीज़ को `<outputDir>/act-cache/` में लिखें और कैश फ़ाइलों को न छेड़ें |
| `locked` | ऐसे CI रन जिन्हें मॉडल कॉल नहीं करना चाहिए: केवल रीप्ले, जब कोई स्टेप मॉडल के बिना ठीक न किया जा सके तो विफल हो जाएँ |
| `off` | हमेशा मॉडल से पूछें |

हर `act` कॉल को फिर से रिकॉर्ड करने के लिए `npx wdio run wdio.conf.ts -s` चलाएँ।

## हील्स की समीक्षा करें

जब कोई रिकॉर्ड किया गया स्टेप विफल होता है, तो सर्विस पहले उस एलिमेंट के लिए रिकॉर्ड किए गए अन्य सेलेक्टर्स आज़माती है और फिर उसकी role और accessible name। केवल तभी जब यह विफल हो, मॉडल विफल स्टेप से आगे जारी रखता है। हर रीप्ले या हील किए गए स्टेप को वही करना होता है जो उसने रिकॉर्ड होते समय किया था: वही रिक्वेस्ट भेजना, उसी पेज पर नेविगेट करना और पेज के उन्हीं हिस्सों को बदलना। किसी मिलते-जुलते लेकिन गलत बटन पर की गई हील अस्वीकार कर दी जाती है।

रन एक सारांश के साथ समाप्त होता है:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

एविडेंस फ़ोल्डर में स्टेप विफल होने के समय पेज का एक स्क्रीनशॉट, हर हीलिंग स्टेप के बाद एक स्क्रीनशॉट, और उन ब्राउज़रों में हील का एक वीडियो होता है जो WebDriver BiDi स्क्रीनकास्ट रिकॉर्ड करते हैं (वर्तमान में Firefox)। हील की समीक्षा करें, फिर अपडेट की गई कैश फ़ाइल को कमिट करें।

## स्टेप्स को सामान्य कोड में बदलें

जब कोई फ़्लो स्थिर हो जाए, तो उसके `act` कॉल्स को रिकॉर्ड किए गए कमांड से बदल दें:

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
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | सर्विस विकल्पों में `model` सेट करें या `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5` एक्सपोर्ट करें। |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | प्रोवाइडर पैकेज इंस्टॉल करें। |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | key को उस शेल या CI सीक्रेट में एक्सपोर्ट करें जो टेस्ट चलाता है। |
| `act("…") failed: no cached steps for "…" and the cache is locked` | `cache: 'write'` के साथ कॉल को लोकल रूप से रिकॉर्ड करें और `__act__` फ़ाइल को कमिट करें। |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | एलिमेंट अभी भी मौजूद है लेकिन कुछ और करता है: यह एक रिग्रेशन है, मार्कअप में बदलाव नहीं। ऐप की जाँच करें। |
| `act("…") failed: …` के बाद `Evidence: <folder>` | मॉडल निर्देश पूरा नहीं कर सका। फ़ोल्डर में उसके द्वारा लिया गया हर स्नैपशॉट, कंसोल और नेटवर्क इवेंट्स और चलाए गए स्टेप्स मौजूद हैं। |

## अगले कदम

- [AI Service](/docs/ai-service): हर विकल्प, कैश फ़ॉर्मेट, स्टेप इफ़ेक्ट्स और वर्कस्पेस
- [Selectors](/docs/selectors#role-selector): रिकॉर्ड किए गए स्टेप्स द्वारा उपयोग किया जाने वाला `role/` सेलेक्टर
- [WebdriverIO for Coding Agents](/docs/ai-agents): किसी कोडिंग एजेंट के साथ मिलकर टेस्ट लिखें