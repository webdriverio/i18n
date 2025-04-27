---
id: axe-core
title: ஆக்ஸ் கோர்
---

நீங்கள் [டெக்யூ நிறுவனத்தின் ஆக்ஸ்](https://www.deque.com/axe/) என்ற ஓப்பன்-சோர்ஸ் அணுகல்தன்மை கருவிகளைப் பயன்படுத்தி உங்கள் WebdriverIO சோதனை தொகுப்பில் அணுகல்தன்மை சோதனைகளைச் சேர்க்கலாம். அமைப்பு மிக எளிதானது, நீங்கள் செய்ய வேண்டியதெல்லாம் WebdriverIO Axe அடாப்டரை பின்வருமாறு நிறுவுவது மட்டுமே:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axe அடாப்டரை [standalone அல்லது testrunner](/docs/setuptypes) முறையில் [browser object](/docs/api/browser) மூலம் இறக்குமதி செய்து துவக்குவதன் மூலம் எளிதாகப் பயன்படுத்தலாம், எ.கா:

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

Axe WebdriverIO அடாப்டர் பற்றிய மேலும் ஆவணங்களை [GitHub இல்](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage) காணலாம்.