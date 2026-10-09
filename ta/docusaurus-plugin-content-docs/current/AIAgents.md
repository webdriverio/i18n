---
id: ai-agents
title: கோடிங் ஏஜென்ட்களுக்கான WebdriverIO
description: இயந்திரம் படிக்கக்கூடிய ஆவணங்கள், WebdriverIO MCP சர்வர் மற்றும் DevTools ட்ரேஸ்களைப் பயன்படுத்தி WebdriverIO சோதனைகளை எழுத, இயக்க மற்றும் பிழைத்திருத்த Cursor, Claude Code, Copilot அல்லது வேறு எந்த கோடிங் ஏஜென்டையும் அமைக்கவும்.
---

இன்று பெரும்பாலான WebdriverIO சோதனைகள் ஒரு கோடிங் ஏஜென்டுடன் சேர்ந்து எழுதப்படுகின்றன. ஒரு ஏஜென்ட் இதைச் சிறப்பாகச் செய்யத் தேவையான மூன்று விஷயங்களை எவ்வாறு வழங்குவது என்பதை இந்தப் பக்கம் காட்டுகிறது: **தற்போதைய ஆவணங்கள்** (அது ஊகிப்பதற்குப் பதிலாக v10 குறியீட்டை எழுதுவதற்காக), **சோதனைக்கு உட்பட்ட பயன்பாட்டை இயக்க ஒரு வழி** (அது UI-ஐ ஆராய்ந்து செலக்டர்களைச் சரிபார்ப்பதற்காக), மற்றும் **பிழைத்திருத்தக்கூடிய சோதனை ஓட்டங்கள்** (அது தோல்வியடையும் சோதனைகளைத் தானாகவே சரிசெய்வதற்காக).

## 1. உங்கள் ஏஜென்டுக்கு ஆவணங்களை வழங்குங்கள்

இந்தத் தளத்தின் ஒவ்வொரு பக்கமும் வழிசெலுத்தல், ஸ்கிரிப்டுகள் அல்லது ஸ்டைலிங் இல்லாமல் சுத்தமான Markdown ஆகக் கிடைக்கிறது:

| ஆதாரம் | URL | இதற்குப் பயன்படுத்தவும் |
| --- | --- | --- |
| ஆவண அட்டவணை | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | ஒரு வரி சுருக்கங்களுடன் அனைத்துப் பக்கங்களின் தொகுக்கப்பட்ட வரைபடம். இங்கிருந்து தொடங்குங்கள். |
| முழு ஆவணங்கள் | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | பெரிய கான்டெக்ஸ்ட் விண்டோக்கள் கொண்ட ஏஜென்ட்களுக்காக, முழுமையான ஆவணங்கள் ஒரே கோப்பில். |
| எந்தவொரு தனிப் பக்கமும் | URL-இன் இறுதியில் `.md` சேர்க்கவும், எ.கா. [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | ஏஜென்டுக்குத் தேவையான பக்கத்தை மட்டும் சரியாக ஏற்றுவதற்கு. |
| உள்ளடக்க பேச்சுவார்த்தை (Content negotiation) | எந்த `/docs/*` URL-ஐயும் `Accept: text/markdown` உடன் கோரவும் | URL-களை அப்படியே பெறும் ஏஜென்ட்கள் மற்றும் கருவிகளுக்கு. |

ஒவ்வொரு ஆவணப் பக்கத்திலும் **Copy page** மெனு உள்ளது, அதில் பக்கத்தை Markdown ஆக நகலெடுக்க அல்லது நேரடியாக ChatGPT, Claude அல்லது Cursor-இல் திறக்க விருப்பங்கள் உள்ளன.

### ஆவண MCP சர்வர்

ஆவணங்கள் `https://webdriver.io/mcp` என்ற தொலைநிலை MCP சர்வராகவும் கிடைக்கின்றன. இது ஒரு ஏஜென்டுக்கு மூன்று கருவிகளை வழங்குகிறது: சரியான பக்கத்தைக் கண்டறிய `search_docs`, அதை Markdown ஆகப் படிக்க `get_page`, மற்றும் ஒரு முழுப் பிரிவையும் ஒரே நேரத்தில் ஏற்ற `list_sections`. கீழே விவரிக்கப்பட்டுள்ள WebdriverIO MCP சர்வருடன் சேர்த்து இதைச் சேர்க்கவும்:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Claude Code-க்கு, `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp` ஐ இயக்கவும்.

## உங்கள் ஏஜென்ட் `wdio session` ஐப் பயன்படுத்தட்டும்

[`wdio session`](/docs/session) ஷெல் கட்டளைகளுக்கு இடையே ஒரு WebdriverIO அமர்வை உயிர்ப்புடன் வைத்திருக்கிறது. ஒரு ஏஜென்ட் ஒரு பிரவுசர், ஃபோன் அல்லது டெஸ்க்டாப் பயன்பாட்டைத் திறக்கலாம், திரையில் உள்ளதை ஸ்னாப்ஷாட் எடுக்கலாம், refs மீது செயல்படலாம், மற்றும் வேலை செய்த படிகளை ஒரு சோதனையாக ஏற்றுமதி செய்யலாம். ஒரு கோடிங் ஏஜென்டிலிருந்து பயன்பாட்டை இயக்குவதற்கான இயல்புநிலை வழி இதுவே. ஏஜென்ட் ஷெல்லுக்குப் பதிலாக கருவிகளை அழைக்க வேண்டும் என்றால், அடுத்த பிரிவில் உள்ள [MCP சர்வர்](/docs/mcp) மாற்று வழியாகும்.

திட்டத்தில் ஸ்கில்லை நிறுவவும்:

```sh
npx wdio session skill --install .
```

இது `.agents/skills/wdio-session/SKILL.md` ஐ எழுதுகிறது. நீங்கள் கோடிங் ஏஜென்ட் ஆதரவை ஏற்கும்போது `npm init wdio` அதே கோப்பை எழுதுகிறது, மேலும் கீழே உள்ள திட்ட விதிகளையும் சேர்க்கிறது.

ஒரு ஏஜென்ட் தானே திட்டத்தை உருவாக்க முடியும். வழிகாட்டி (wizard) ஒவ்வொரு கேள்விக்கும் ஒரு கொடியை (flag) ஏற்கிறது, மீதமுள்ளவற்றுக்கு `--yes` இயல்புநிலைகளை நிரப்புகிறது, எனவே அது ஒருபோதும் உள்ளீட்டுக்காகக் காத்திருக்காது:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` ஒவ்வொரு கொடியையும் அதன் மதிப்புகளையும் பட்டியலிடுகிறது. [Answer the wizard with flags](/docs/gettingstarted#answer-the-wizard-with-flags) ஐப் பார்க்கவும். [WebdriverIO Session](/docs/session) பிரிவு இலக்குகள், ஸ்னாப்ஷாட்கள், `exec`, ஏற்றுமதி மற்றும் பிழைத்திருத்தம் ஆகியவற்றை உள்ளடக்குகிறது. கட்டளை குறிப்பு: [wdio session commands](/docs/session-commands).

### உங்கள் ஏஜென்டில் ஆவணங்களைச் சேர்க்கவும்

ஒவ்வொரு உரையாடலிலும் ஆவணங்கள் கிடைக்கும்படி செய்ய, அட்டவணையை உங்கள் ஏஜென்டில் சேர்க்கவும்:

- **Cursor**: Cursor அமைப்புகளில் (_Indexing & Docs_) `https://webdriver.io/llms.txt` ஐ தனிப்பயன் ஆவணமாகச் சேர்த்து, பின்னர் உரையாடலில் `@` மற்றும் நீங்கள் கொடுத்த பெயருடன் அதைக் குறிப்பிடவும்.
- **Claude Code / Codex / பிற CLI ஏஜென்ட்கள்**: உங்கள் திட்டத்தின் `AGENTS.md` அல்லது `CLAUDE.md` இல் இணைப்பைச் சேர்க்கவும் (கீழே உள்ள [திட்ட விதிகள்](#3-add-project-rules) ஐப் பார்க்கவும்). ஏஜென்ட்கள் தங்களுக்குத் தேவையான பக்கங்களைத் தேவைக்கேற்பப் பெறுகின்றன.

## 2. உங்கள் ஏஜென்ட் பிரவுசர் அல்லது பயன்பாட்டை இயக்கட்டும்

[WebdriverIO MCP சர்வர்](/docs/mcp) (`@wdio/mcp`) ஒரு ஏஜென்ட் பிரவுசர்களை (Chrome, Firefox, Edge, Safari), நேட்டிவ் மற்றும் ஹைப்ரிட் மொபைல் பயன்பாடுகளை (Appium வழியாக) மற்றும் கிளவுட் சாதனங்களைத் திறக்கவும், அணுகல்தன்மை மரத்தை (accessibility tree) ஆய்வு செய்யவும், கிளிக் செய்யவும், தட்டச்சு செய்யவும், ஸ்கிரீன்ஷாட்கள் எடுக்கவும் அனுமதிக்கிறது. சோதனையை எழுதுவதற்கு முன் ஒரு பக்கத்தை ஆராயவும், உறுதியான செலக்டர்களைக் கண்டறியவும், ஒரு தோல்வியைப் படிப்படியாக மீண்டும் உருவாக்கவும் ஏஜென்ட்கள் இதைப் பயன்படுத்துகின்றன.

இதை உங்கள் MCP கிளையன்ட் கட்டமைப்பில் சேர்க்கவும் (எடுத்துக்காட்டாக உங்கள் திட்டத்தில் உள்ள `.mcp.json` அல்லது `.cursor/mcp.json`):

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

Claude Code-க்கு, கட்டளை வரியிலிருந்து இதைப் பதிவு செய்யவும்:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

அமர்வு விருப்பங்களுக்கு [MCP கட்டமைப்பு](/docs/mcp/configuration) ஐயும், BrowserStack, Sauce Labs, TestMu AI அல்லது TestingBot இல் இயக்க [Cloud Providers](/docs/mcp/cloud-providers) ஐயும் பார்க்கவும்.

## 3. திட்ட விதிகளைச் சேர்க்கவும்

ஒரு திட்டத்தின் மரபுகள் எழுதி வைக்கப்பட்டிருக்கும்போது ஏஜென்ட்கள் அவற்றை மிகவும் நம்பகமாகப் பின்பற்றுகின்றன. உங்கள் சோதனைத் திட்டத்தின் `AGENTS.md` (அல்லது `CLAUDE.md`, `.cursor/rules`) இல் பின்வருவது போன்ற ஒரு பிரிவைச் சேர்த்து, பாதைகள் மற்றும் கட்டளைகளைச் சரிசெய்யவும்:

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

மேலே உள்ள விதிகள் [Best Practices](/docs/bestpractices), [Selectors](/docs/selectors) மற்றும் [Auto-waiting](/docs/autowait) இல் உள்ள பரிந்துரைகளைப் பிரதிபலிக்கின்றன.

## 4. தோல்வியடையும் சோதனைகளை ஏஜென்ட் பிழைத்திருத்தட்டும்

[WebdriverIO DevTools](/docs/devtools) சேவை ஒவ்வொரு ஓட்டத்தின் **ட்ரேஸை** பதிவு செய்ய முடியும்: ஒவ்வொரு செயலுக்கும் படிப்படியான Markdown டிரான்ஸ்கிரிப்ட், ஸ்கிரீன்ஷாட்கள், அணுகல்தன்மை மர ஸ்னாப்ஷாட்கள் மற்றும் நெட்வொர்க் பதிவுகளைக் கொண்ட ஒரு கையடக்க ஆர்டிஃபேக்ட். சோதனையைப் பார்ப்பதன் மூலம் ஒரு மனிதர் பெறும் அதே தகவலை, பிரவுசர் விண்டோ தேவையில்லாமல் இது ஒரு ஏஜென்டுக்கு வழங்குகிறது.

சேவையை நிறுவி, ட்ரேஸ் பயன்முறையை இயக்கவும்:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // ஒரு சோதனைக்கு ஒரு ட்ரேஸ் இருப்பதால், ஒரு தனித் தோல்வியை ஏஜென்டிடம் ஒப்படைப்பது எளிதாகிறது
            traceGranularity: 'test',
            // zip-க்குப் பதிலாக சாதாரண கோப்புகள், எனவே ஏஜென்ட்கள் அவற்றை நேரடியாகப் படிக்க முடியும்
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

ஒரு ஓட்டத்திற்குப் பிறகு, ட்ரேஸ்கள் `test-results/` இல் எழுதப்படுகின்றன. தோல்வியடைந்த சோதனையின் கோப்புறையை உங்கள் ஏஜென்டுக்குச் சுட்டிக்காட்டி, முதலில் `transcript.md` ஐப் படிக்கச் சொல்லுங்கள். granularity மற்றும் retention உட்பட அனைத்து விருப்பங்களுக்கும் [Trace Mode](/docs/devtools/wdio/trace-mode) ஐப் பார்க்கவும்.

## பரிந்துரைக்கப்பட்ட பணிப்பாய்வு

1. MCP சர்வர் மூலம் சோதனைக்கு உட்பட்ட அம்சத்தை ஆராய்ந்து செலக்டர்களை முன்மொழியுமாறு ஏஜென்டிடம் கேளுங்கள்.
2. தேவைக்கேற்ப WebdriverIO ஆவணப் பக்கங்களைப் பெற்று, உங்கள் திட்ட விதிகளைப் பின்பற்றி ஸ்பெக் மற்றும் பேஜ் ஆப்ஜெக்டை அது எழுதட்டும்.
3. `--spec` உடன் அந்தத் தனி ஸ்பெக்கை இயக்கி, அது தேர்ச்சி பெறும் வரை மீண்டும் மீண்டும் முயற்சிக்கச் செய்யுங்கள்.
4. CI இல் ஒரு சோதனை தோல்வியடைந்தால், அந்தச் சோதனையின் ட்ரேஸை ஏஜென்டிடம் கொடுத்து, அது சோதனையைச் சரிசெய்யட்டும் அல்லது பிழையைப் புகாரளிக்கட்டும்.

## அடுத்த படிகள்

- [Getting Started](/docs/gettingstarted) - `npm init wdio@latest` மூலம் ஒரு திட்டத்தை உருவாக்கவும்
- [WebdriverIO MCP](/docs/mcp) - MCP சர்வர் வழங்கும் அனைத்துக் கருவிகளும்
- [DevTools](/docs/devtools) - நேரடிப் பயன்முறை மற்றும் ட்ரேஸ் பயன்முறை
- [Best Practices](/docs/bestpractices) - நல்ல WebdriverIO சோதனைகள் எப்படி இருக்கும்
- [From v9 to v10](/docs/v10-migration#migrate-with-a-coding-agent) - ஏற்கனவே உள்ள சோதனைத் தொகுப்பிற்கான இடம்பெயர்வு ஸ்கில்