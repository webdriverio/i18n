---
id: ai-agents
title: कोडिंग एजेंट्स के लिए WebdriverIO
description: मशीन-पठनीय डॉक्स, WebdriverIO MCP सर्वर और DevTools ट्रेस का उपयोग करके WebdriverIO टेस्ट लिखने, चलाने और डीबग करने के लिए Cursor, Claude Code, Copilot या किसी अन्य कोडिंग एजेंट को सेट अप करें।
---

आजकल अधिकांश WebdriverIO टेस्ट किसी कोडिंग एजेंट के साथ मिलकर लिखे जाते हैं। यह पेज दिखाता है कि एजेंट को वे तीन चीज़ें कैसे दें जिनकी उसे यह काम अच्छी तरह करने के लिए ज़रूरत है: **वर्तमान डॉक्यूमेंटेशन** (ताकि वह अनुमान लगाने के बजाय v10 कोड लिखे), **टेस्ट किए जा रहे ऐप को चलाने का तरीका** (ताकि वह UI को एक्सप्लोर कर सके और सेलेक्टर्स की पुष्टि कर सके), और **डीबग करने योग्य टेस्ट रन** (ताकि वह विफल टेस्ट को खुद ठीक कर सके)।

## 1. अपने एजेंट को डॉक्यूमेंटेशन दें

इस साइट का हर पेज नेविगेशन, स्क्रिप्ट या स्टाइलिंग के बिना साफ़ Markdown के रूप में उपलब्ध है:

| संसाधन | URL | किसके लिए उपयोग करें |
| --- | --- | --- |
| डॉक्यूमेंटेशन इंडेक्स | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | एक-पंक्ति सारांशों के साथ सभी पेजों का एक व्यवस्थित नक्शा। यहीं से शुरू करें। |
| पूर्ण डॉक्यूमेंटेशन | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | बड़ी कॉन्टेक्स्ट विंडो वाले एजेंट्स के लिए एक ही फ़ाइल में पूरे डॉक्स। |
| कोई भी एकल पेज | URL के अंत में `.md` जोड़ें, जैसे [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | ठीक वही पेज लोड करना जिसकी एजेंट को ज़रूरत है। |
| कंटेंट नेगोशिएशन | किसी भी `/docs/*` URL को `Accept: text/markdown` के साथ रिक्वेस्ट करें | ऐसे एजेंट्स और टूल्स जो URL को जैसे का तैसा फ़ेच करते हैं। |

हर डॉक पेज पर एक **Copy page** मेनू भी है, जिसमें पेज को Markdown के रूप में कॉपी करने या उसे सीधे ChatGPT, Claude या Cursor में खोलने के विकल्प हैं।

### Docs MCP सर्वर

डॉक्यूमेंटेशन `https://webdriver.io/mcp` पर एक रिमोट MCP सर्वर के रूप में भी उपलब्ध है। यह एजेंट को तीन टूल देता है: सही पेज खोजने के लिए `search_docs`, उसे Markdown के रूप में पढ़ने के लिए `get_page`, और पूरे सेक्शन को एक साथ लोड करने के लिए `list_sections`। इसे नीचे बताए गए WebdriverIO MCP सर्वर के साथ जोड़ें:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Claude Code के लिए, `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp` चलाएँ।

## अपने एजेंट को `wdio session` का उपयोग करने दें

[`wdio session`](/docs/session) शेल कमांड्स के बीच एक WebdriverIO सेशन को जीवित रखता है। एक एजेंट ब्राउज़र, फ़ोन या डेस्कटॉप ऐप खोल सकता है, स्क्रीन पर जो है उसका स्नैपशॉट ले सकता है, refs पर एक्शन कर सकता है, और काम करने वाले चरणों को टेस्ट के रूप में एक्सपोर्ट कर सकता है। कोडिंग एजेंट से किसी ऐप को चलाने का यही डिफ़ॉल्ट तरीका है। अगले सेक्शन में बताया गया [MCP सर्वर](/docs/mcp) उस स्थिति के लिए विकल्प है जब एजेंट को शेल के बजाय टूल्स कॉल करने चाहिए।

प्रोजेक्ट में स्किल इंस्टॉल करें:

```sh
npx wdio session skill --install .
```

यह `.agents/skills/wdio-session/SKILL.md` लिखता है। जब आप कोडिंग एजेंट सपोर्ट स्वीकार करते हैं, तो `npm init wdio` भी यही फ़ाइल लिखता है, और नीचे दिए गए प्रोजेक्ट नियम जोड़ता है।

एजेंट प्रोजेक्ट खुद भी बना सकता है। विज़ार्ड हर प्रश्न के लिए एक फ़्लैग लेता है, और `--yes` बाकी के लिए डिफ़ॉल्ट भर देता है, इसलिए यह कभी इनपुट का इंतज़ार नहीं करता:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` हर फ़्लैग और उसके मानों की सूची देता है। देखें [फ़्लैग्स के साथ विज़ार्ड का उत्तर दें](/docs/gettingstarted#answer-the-wizard-with-flags)। [WebdriverIO Session](/docs/session) सेक्शन टार्गेट्स, स्नैपशॉट्स, `exec`, एक्सपोर्ट और डीबगिंग को कवर करता है। कमांड रेफ़रेंस: [wdio session कमांड्स](/docs/session-commands)।

### अपने एजेंट में डॉक्स जोड़ें

हर चैट में डॉक्स उपलब्ध कराने के लिए, इंडेक्स को अपने एजेंट में जोड़ें:

- **Cursor**: Cursor सेटिंग्स (_Indexing & Docs_) में `https://webdriver.io/llms.txt` को कस्टम डॉक के रूप में जोड़ें, फिर चैट में `@` और आपके द्वारा दिए गए नाम से उसका संदर्भ दें।
- **Claude Code / Codex / अन्य CLI एजेंट्स**: लिंक को अपने प्रोजेक्ट की `AGENTS.md` या `CLAUDE.md` में जोड़ें (नीचे [प्रोजेक्ट नियम](#3-add-project-rules) देखें)। एजेंट्स ज़रूरत पड़ने पर आवश्यक पेज फ़ेच करते हैं।

## 2. अपने एजेंट को ब्राउज़र या ऐप चलाने दें

[WebdriverIO MCP सर्वर](/docs/mcp) (`@wdio/mcp`) एजेंट को ब्राउज़र (Chrome, Firefox, Edge, Safari), नेटिव और हाइब्रिड मोबाइल ऐप्स (Appium के माध्यम से) और क्लाउड डिवाइस खोलने, एक्सेसिबिलिटी ट्री का निरीक्षण करने, क्लिक करने, टाइप करने और स्क्रीनशॉट लेने देता है। एजेंट इसका उपयोग टेस्ट लिखने से पहले पेज को एक्सप्लोर करने, मज़बूत सेलेक्टर्स खोजने और किसी विफलता को चरण-दर-चरण पुनः उत्पन्न करने के लिए करते हैं।

इसे अपने MCP क्लाइंट कॉन्फ़िगरेशन में जोड़ें (उदाहरण के लिए आपके प्रोजेक्ट में `.mcp.json` या `.cursor/mcp.json`):

```json title=".mcp.json"
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

Claude Code के लिए, इसे कमांड लाइन से रजिस्टर करें:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

सेशन विकल्पों के लिए [MCP कॉन्फ़िगरेशन](/docs/mcp/configuration) देखें, और BrowserStack, Sauce Labs, TestMu AI या TestingBot पर चलाने के लिए [Cloud Providers](/docs/mcp/cloud-providers) देखें।

## 3. प्रोजेक्ट नियम जोड़ें

जब किसी प्रोजेक्ट की परंपराएँ लिखित होती हैं, तो एजेंट उनका कहीं अधिक विश्वसनीय रूप से पालन करते हैं। अपने टेस्ट प्रोजेक्ट की `AGENTS.md` (या `CLAUDE.md`, `.cursor/rules`) में निम्नलिखित जैसा एक सेक्शन जोड़ें और पाथ व कमांड्स को समायोजित करें:

````md title="AGENTS.md"
## End-to-end tests (WebdriverIO v10)

- Docs: https://webdriver.io/llms.txt - fetch the relevant page as Markdown (append `.md`) before using an API you are not sure about. Do not use APIs from WebdriverIO v8 or older.
- Config: `wdio.conf.ts`. Specs: `test/specs/**/*.e2e.ts`. Page objects: `test/pageobjects/`.
- Run all tests: `npx wdio run wdio.conf.ts`
- Run a single spec: `npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts`
- Tests are async: always `await` commands, e.g. `await $('button').click()`. Never use the removed sync mode.
- Prefer user-facing selectors: accessibility name or text (`$('aria/Submit')`, `$('button=Submit')`), then `data-testid`. Avoid XPath and generated CSS classes.
- Rely on auto-waiting and `expect-webdriverio` matchers (`await expect($('h1')).toHaveText('Welcome')`) instead of `browser.pause()`.
- To explore the app or verify a selector, use the `wdio-mcp` MCP server.
- To drive the app from the shell, follow `.agents/skills/wdio-session/SKILL.md` (`npx wdio session`).
- When a test fails, read the DevTools trace in `test-results/` (see `transcript.md`) before changing code.
````

ऊपर दिए गए नियम [Best Practices](/docs/bestpractices), [Selectors](/docs/selectors) और [Auto-waiting](/docs/autowait) में दी गई सिफ़ारिशों को दर्शाते हैं।

## 4. एजेंट को विफल टेस्ट डीबग करने दें

[WebdriverIO DevTools](/docs/devtools) सर्विस हर रन का एक **ट्रेस** रिकॉर्ड कर सकती है: एक पोर्टेबल आर्टिफ़ैक्ट जिसमें हर एक्शन के लिए चरण-दर-चरण Markdown ट्रांसक्रिप्ट, स्क्रीनशॉट्स, एक्सेसिबिलिटी-ट्री स्नैपशॉट्स और नेटवर्क लॉग्स होते हैं। यह एजेंट को वही जानकारी देता है जो एक इंसान को टेस्ट देखकर मिलती है, वह भी ब्राउज़र विंडो की ज़रूरत के बिना।

सर्विस इंस्टॉल करें और ट्रेस मोड सक्षम करें:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // प्रति टेस्ट एक ट्रेस से किसी एकल विफलता को एजेंट को सौंपना आसान हो जाता है
            traceGranularity: 'test',
            // zip के बजाय सादी फ़ाइलें, ताकि एजेंट उन्हें सीधे पढ़ सकें
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

रन के बाद, ट्रेस `test-results/` में लिखे जाते हैं। अपने एजेंट को विफल टेस्ट के फ़ोल्डर की ओर इंगित करें और उससे पहले `transcript.md` पढ़ने के लिए कहें। ग्रैन्युलैरिटी और रिटेंशन सहित सभी विकल्पों के लिए [Trace Mode](/docs/devtools/wdio/trace-mode) देखें।

## अनुशंसित वर्कफ़्लो

1. एजेंट से MCP सर्वर के साथ टेस्ट किए जा रहे फ़ीचर को एक्सप्लोर करने और सेलेक्टर्स प्रस्तावित करने के लिए कहें।
2. उसे अपने प्रोजेक्ट नियमों का पालन करते हुए, आवश्यकतानुसार WebdriverIO डॉक्स पेज फ़ेच करते हुए, स्पेक और पेज ऑब्जेक्ट लिखने दें।
3. उससे `--spec` के साथ एकल स्पेक चलवाएँ और तब तक दोहराने दें जब तक वह पास न हो जाए।
4. यदि कोई टेस्ट CI में विफल होता है, तो एजेंट को उस टेस्ट का ट्रेस दें और उसे टेस्ट ठीक करने या बग रिपोर्ट करने दें।

## अगले कदम

- [Getting Started](/docs/gettingstarted) - `npm init wdio@latest` के साथ एक प्रोजेक्ट बनाएँ
- [WebdriverIO MCP](/docs/mcp) - MCP सर्वर द्वारा प्रदान किए जाने वाले सभी टूल्स
- [DevTools](/docs/devtools) - लाइव मोड और ट्रेस मोड
- [Best Practices](/docs/bestpractices) - अच्छे WebdriverIO टेस्ट कैसे दिखते हैं
- [From v9 to v10](/docs/v10-migration#migrate-with-a-coding-agent) - किसी मौजूदा सूट के लिए माइग्रेशन स्किल