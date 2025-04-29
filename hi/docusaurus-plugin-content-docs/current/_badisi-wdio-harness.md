---
id: badisi-wdio-harness
title: Angular कंपोनेंट टेस्ट हार्नेस के लिए सपोर्ट सर्विस
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---


> @badisi/wdio-harness एक तृतीय-पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> Angular कंपोनेंट टेस्ट हार्नेस के लिए समर्थन।</i><br/>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@badisi/wdio-harness">
        <img src="https://img.shields.io/npm/v/@badisi/wdio-harness.svg?color=blue&logo=npm" alt="npm version" /></a>
    <a href="https://npmcharts.com/compare/@badisi/wdio-harness?minimal=true">
        <img src="https://img.shields.io/npm/dw/@badisi/wdio-harness.svg?color=7986CB&logo=npm" alt="npm donwloads" /></a>
    <a href="https://github.com/badisi/wdio-harness/blob/main/LICENSE">
        <img src="https://img.shields.io/npm/l/@badisi/wdio-harness.svg?color=ff69b4" alt="license" /></a>
</p>

<p align="center">
    <a href="https://github.com/Badisi/wdio-harness/actions/workflows/ci_tests.yml">
        <img src="https://github.com/Badisi/wdio-harness/actions/workflows/ci_tests.yml/badge.svg" alt="build status" /></a>
    <a href="https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md#-submitting-a-pull-request-pr">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" /></a>
</p>

<hr/>

#### कंपोनेंट टेस्ट हार्नेस

> कंपोनेंट हार्नेस एक क्लास है जो किसी टेस्ट को समर्थित API के माध्यम से किसी कंपोनेंट के साथ इंटरैक्ट करने की अनुमति देती है। प्रत्येक हार्नेस का API एक कंपोनेंट के साथ उसी तरह इंटरैक्ट करता है जैसे एक उपयोगकर्ता करेगा। हार्नेस API का उपयोग करके, एक परीक्षण किसी कंपोनेंट के आंतरिक अपडेट से खुद को अलग रखता है, जैसे कि उसकी DOM संरचना को बदलना। कंपोनेंट हार्नेस का विचार [PageObject](https://martinfowler.com/bliki/PageObject.html) पैटर्न से आया है जो आमतौर पर इंटीग्रेशन टेस्टिंग के लिए उपयोग किया जाता है।

[अधिक जानकारी](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## इंस्टालेशन

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## उपयोग

__मेथड्स__

- `createHarnessEnvironment(rootElement)` - दिए गए एलिमेंट से HarnessLoader इंस्टेंस प्राप्त करता है (डिफॉल्ट रूप से बॉडी)
- `getHarness(harnessType, element)` - दिए गए ComponentHarness क्लास और एलिमेंट से हार्नेस इंस्टेंस खोजता है
- `getHarness(harnessType)` - दिए गए ComponentHarness क्लास से हार्नेस इंस्टेंस खोजता है
- `getHarness(query)` - दिए गए HarnessPredicate से हार्नेस इंस्टेंस खोजता है
- `getAllHarnesses(query)` - getHarness की तरह कार्य करता है, लेकिन हार्नेस इंस्टेंस की एक सरणी लौटाता है
- `waitForAngular()` - Angular के बूटस्ट्रैपिंग को पूरा करने तक इंतजार करता है

__उदाहरण__

```ts
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { getHarness } from '@badisi/wdio-harness';

describe('Angular Material Harness', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:4200');
    });

    it('MatDatePicker', async () => {
        const datepicker = await getHarness(MatDatepickerInputHarness.with({ selector: '#demo-datepicker-input' }));

        await datepicker.setValue('9/27/1954');
        expect(await datepicker.getValue()).withContext('Date should be 9/27/1954').toBe('9/27/1954');

        await datepicker.openCalendar();
        const calendar = await datepicker.getCalendar();
        await calendar.next();
        await calendar.selectCell({ text: '20' });
        expect(await datepicker.getValue()).withContext('Date should be 10/20/1954').toBe('10/20/1954');
    });
});
```

अधिक उदाहरण [यहां][examples]।


## डेवलपमेंट

[डेवलपर दस्तावेज़][developer] देखें।


## योगदान

#### > मदद करना चाहते हैं?

क्या आप कोई बग फाइल करना चाहते हैं, कोड में योगदान देना चाहते हैं या दस्तावेज़ीकरण में सुधार करना चाहते हैं? बहुत अच्छा!

लेकिन कृपया पहले [योगदान][contributing] के दिशानिर्देशों को पढ़ें, और सबमिशन प्रक्रिया, कोडिंग नियमों और अधिक के बारे में जानें।

#### > आचार संहिता

कृपया [आचार संहिता][codeofconduct] को पढ़ें और उसका पालन करें और मुझे इस प्रोजेक्ट को खुला और समावेशी रखने में मदद करें।




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts