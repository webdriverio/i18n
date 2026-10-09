---
id: web
title: वेब ब्राउज़र
description: Chrome, Firefox, Microsoft Edge और Safari में WebdriverIO एंड-टू-एंड, कंपोनेंट, विज़ुअल और एक्सेसिबिलिटी टेस्ट सेट अप करें और चलाएं।
---

WebdriverIO मानक ब्राउज़र ड्राइवरों के माध्यम से डेस्कटॉप ब्राउज़रों (Chrome, Chromium, Firefox, Microsoft Edge और Safari) को स्वचालित करता है। डिफ़ॉल्ट रूप से यह एक [WebDriver BiDi](/docs/automationProtocols) सेशन खोलने का प्रयास करता है, जो क्लासिक WebDriver प्रोटोकॉल का द्वि-दिशात्मक उत्तराधिकारी है। BiDi नेटवर्क मॉकिंग और Web API एमुलेशन जैसी सुविधाओं को संचालित करता है। इससे बाहर निकलने के लिए अपनी capabilities में `wdio:enforceWebDriverClassic: true` सेट करें। आपको ड्राइवर स्वयं इंस्टॉल करने की आवश्यकता नहीं है: बस एक `browserName` सेट करें और WebdriverIO संबंधित Chromedriver, Geckodriver या Edgedriver को डाउनलोड करके शुरू कर देता है। यदि कोई स्थानीय इंस्टॉलेशन नहीं मिलता है, तो यह Chrome, Chromium या Firefox भी इंस्टॉल कर देता है। Microsoft Edge पहले से इंस्टॉल होना चाहिए, और Safaridriver macOS के साथ आता है। वही testrunner Browser Runner के साथ ब्राउज़र के अंदर भी टेस्ट चला सकता है। इसमें React, Vue, Svelte, SolidJS, Preact, Lit और Stencil के लिए यूनिट और कंपोनेंट टेस्ट शामिल हैं।

## त्वरित शुरुआत

`npm init wdio@latest .` के साथ इंटरैक्टिव रूप से एक प्रोजेक्ट तैयार करें। `--yes` पास करने पर डिफ़ॉल्ट विकल्प चुने जाते हैं: Mocha, Chrome और पेज ऑब्जेक्ट्स। किसी प्रोजेक्ट को मैन्युअल रूप से सेट अप करने के लिए, testrunner, एक फ्रेमवर्क एडैप्टर, एक रिपोर्टर और TypeScript के लिए `tsx` इंस्टॉल करें:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

प्रत्येक capability को अपनी स्वयं की वर्कर प्रोसेस मिलती हैं, इसलिए यह spec को Chrome और Firefox दोनों में चलाता है। अन्य मान्य `browserName` मान `chromium`, `msedge` और `safari` हैं। हेडलेस चलाने के लिए, `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }` जैसे ब्राउज़र आर्गुमेंट जोड़ें। Firefox और Edge के लिए [Run Browser Headless](/docs/capabilities#run-browser-headless) देखें; Safari में कोई हेडलेस मोड नहीं है।

## अपना मार्ग चुनें

विभिन्न ब्राउज़रों में एंड-टू-एंड टेस्टिंग:

- [Capabilities](/docs/capabilities): ब्राउज़र विकल्प, हेडलेस मोड, ब्राउज़र चैनल (Canary, Nightly, Safari Technology Preview) और `wdio:*` ड्राइवर विकल्प।
- [Driver Binaries](/docs/driverbinaries): स्वचालित ब्राउज़र और ड्राइवर सेटअप कैसे काम करता है, और कस्टम बाइनरी की ओर कैसे इंगित करें।
- [Automation Protocols](/docs/automationProtocols): WebDriver बनाम WebDriver BiDi।
- [WebDriver BiDi commands](/docs/api/webdriverBidi): `browser` ऑब्जेक्ट पर उपलब्ध रॉ BiDi प्रोटोकॉल कमांड।
- [Selectors](/docs/selectors): CSS, टेक्स्ट, ARIA, डीप (shadow DOM) और React सेलेक्टर।
- [Auto-waiting](/docs/autowait) और [Timeouts](/docs/timeouts): WebdriverIO एलिमेंट्स की प्रतीक्षा कैसे करता है और क्या ट्यून करना है।
- [Multi-remote](/docs/multiremote): एक टेस्ट में कई ब्राउज़रों को नियंत्रित करें, उदाहरण के लिए चैट या WebRTC ऐप्स के लिए।

ब्राउज़र क्षमताएं जिन्हें WebDriver BiDi की आवश्यकता होती है (Chrome, Edge और Firefox; Safari नहीं):

- [Request Mocks and Spies](/docs/mocksandspies): `browser.mock()` के साथ नेटवर्क अनुरोधों को इंटरसेप्ट, संशोधित या स्टब करें। [Mock object](/docs/api/mock) भी देखें।
- [Emulation](/docs/emulation): `browser.emulate()` के साथ जियोलोकेशन, मीडिया फीचर्स, यूज़र एजेंट, ऑफ़लाइन स्थिति, लोकेल, टाइमज़ोन, स्क्रीन और डिवाइस का एमुलेशन करें।

वास्तविक ब्राउज़र में कंपोनेंट और यूनिट टेस्टिंग:

- [Component Testing](/docs/component-testing): Vite-आधारित [Browser Runner](/docs/runner#browser-runner) कैसे काम करता है और इसे कैसे सेट अप करें।
- फ्रेमवर्क गाइड: [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil)।
- कंपोनेंट टेस्ट के लिए [Mocking](/docs/component-testing/mocking) और [Coverage](/docs/component-testing/coverage)।

विज़ुअल और एक्सेसिबिलिटी टेस्टिंग:

- [Visual Testing](/docs/visual-testing): `@wdio/visual-service` के साथ स्क्रीन, एलिमेंट और फुल-पेज इमेज तुलना।
- [Snapshot](/docs/snapshot): DOM और ऑब्जेक्ट स्नैपशॉट एसर्शन।
- [Axe Core](/docs/accessibility-testing/axe-core): अपने टेस्ट से Deque axe एक्सेसिबिलिटी स्कैन चलाएं।

स्केलिंग:

- [Selenium Grid](/docs/seleniumgrid), [Cloud Services](/docs/cloudservices) और [Docker](/docs/docker): ब्राउज़रों को रिमोट रूप से चलाएं।
- [Sharding](/docs/sharding): एक सूट को कई CI मशीनों में विभाजित करें।

एक कंपोनेंट टेस्ट एक अलग runner के साथ उसी कॉन्फ़िग फ़ाइल का उपयोग करता है। उदाहरण के लिए, React प्रीसेट का उपयोग करने के लिए:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

Browser Runner के लिए `@wdio/browser-runner` आवश्यक है। React प्रीसेट को `@vitejs/plugin-react` की भी आवश्यकता होती है, और गाइड रेंडरिंग के लिए `@testing-library/react` की अनुशंसा करती हैं। `vue`, `svelte`, `solid`, `react`, `preact` और `stencil` के लिए प्रीसेट मौजूद हैं। किसी अन्य चीज़ के लिए, इसके बजाय `viteConfig` का उपयोग करें।

## समस्या निवारण

- CI में Chrome "user data directory is already in use" या "DevToolsActivePort file doesn't exist" के साथ शुरू होने में विफल रहता है: [Headless & Display Servers](/docs/headless-and-display-servers#troubleshooting) देखें।
- `browser.mock()` या `browser.emulate()` का कोई प्रभाव नहीं होता: सेशन WebDriver BiDi का उपयोग नहीं कर रहा है। अपने ब्राउज़र (Safari में BiDi सपोर्ट नहीं है), अपने क्लाउड वेंडर, और `wdio:enforceWebDriverClassic` की जांच करें।
- प्रॉक्सी के पीछे ड्राइवर या ब्राउज़र डाउनलोड नहीं हो पाते: [Custom Driver Download Host](/docs/capabilities#custom-driver-download-host) और [Proxy Setup](/docs/proxy) देखें।
- अस्थिर (flaky) टेस्ट: [Retry Flaky Tests](/docs/retry) और [Debugging](/docs/debugging) देखें।

## अगले कदम

- प्रत्येक `wdio.conf.ts` विकल्प के लिए [Configuration](/docs/configuration) संदर्भ।
- [TypeScript Setup](/docs/typescript) और [Frameworks](/docs/frameworks) (Mocha, Jasmine, Cucumber)।
- बड़े सूट को संरचित करने के लिए [Page Object Pattern](/docs/pageobjects)।
- [MCP](/docs/mcp) ताकि एक AI एजेंट WebdriverIO के माध्यम से ब्राउज़र सेशन चला सके।
- अन्य प्लेटफ़ॉर्म: [Mobile Apps](/docs/platforms/mobile), [Desktop Apps](/docs/platforms/desktop), [Extensions & Editors](/docs/platforms/apps-and-extensions)।