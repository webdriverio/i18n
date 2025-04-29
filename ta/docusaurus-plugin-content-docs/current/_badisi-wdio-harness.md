---
id: badisi-wdio-harness
title: Angular கூறு சோதனை ஹார்னெஸ்களுக்கான ஆதரவு சேவை
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @badisi/wdio-harness என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness) ஐப் பார்க்கவும்
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> ஆங்குலர் கூறு சோதனை ஹார்னெஸ்களுக்கான ஆதரவு.</i><br/>
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

#### கூறு சோதனை ஹார்னெஸ்கள்

> கூறு ஹார்னெஸ் என்பது ஒரு சோதனை ஆதரிக்கப்படும் API மூலம் ஒரு கூறுடன் தொடர்புகொள்ள அனுமதிக்கும் ஒரு வகுப்பாகும். ஒவ்வொரு ஹார்னெஸின் API-யும் ஒரு பயனர் செய்யும் அதே வழியில் ஒரு கூறுடன் தொடர்புகொள்கிறது. ஹார்னெஸ் API-ஐப் பயன்படுத்துவதன் மூலம், ஒரு சோதனை தன்னை கூறின் உள் அமைப்பில் மேற்கொள்ளப்படும் புதுப்பிப்புகளிலிருந்து தனிமைப்படுத்துகிறது, அதன் DOM கட்டமைப்பை மாற்றுவது போன்றவை. கூறு ஹார்னெஸ்களுக்கான யோசனை, ஒருங்கிணைப்பு சோதனைக்கு பொதுவாக பயன்படுத்தப்படும் [PageObject](https://martinfowler.com/bliki/PageObject.html) முறையிலிருந்து வருகிறது.

[மேலும் தகவல்](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## நிறுவல்

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## பயன்பாடு

__முறைகள்__

- `createHarnessEnvironment(rootElement)` - ஒரு கொடுக்கப்பட்ட உறுப்பிலிருந்து HarnessLoader இன்ஸ்டன்ஸைப் பெறுகிறது (இயல்பாக உடல்)
- `getHarness(harnessType, element)` - கொடுக்கப்பட்ட ComponentHarness வகுப்பு மற்றும் உறுப்பிலிருந்து ஒரு ஹார்னெஸ் இன்ஸ்டன்ஸைத் தேடுகிறது
- `getHarness(harnessType)` - கொடுக்கப்பட்ட ComponentHarness வகுப்பிலிருந்து ஒரு ஹார்னெஸ் இன்ஸ்டன்ஸைத் தேடுகிறது
- `getHarness(query)` - கொடுக்கப்பட்ட HarnessPredicate இலிருந்து ஒரு ஹார்னெஸ் இன்ஸ்டன்ஸைத் தேடுகிறது
- `getAllHarnesses(query)` - getHarness போல் செயல்படுகிறது, ஆனால் ஹார்னெஸ் இன்ஸ்டன்ஸ்களின் அரேயைத் திருப்பித் தருகிறது
- `waitForAngular()` - Angular பூட்ஸ்ட்ராப் முடியும் வரை காத்திருக்கிறது

__உதாரணம்__

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

மேலும் உதாரணங்கள் [இங்கே][examples].


## மேம்பாடு

[டெவலப்பர் ஆவணங்களைப்][developer] பார்க்கவும்.


## பங்களிப்பு

#### > உதவ விரும்புகிறீர்களா?

பிழை தாக்கல் செய்ய, சில நிரல் பங்களிக்க அல்லது ஆவணங்களை மேம்படுத்த விரும்புகிறீர்களா? அருமை!

ஆனால் முதலில் [பங்களிப்பு][contributing] வழிகாட்டுதல்களைப் படித்து, சமர்ப்பிப்பு செயல்முறை, குறியீட்டு விதிகள் மற்றும் பலவற்றைப் பற்றி அறிந்து கொள்ளுங்கள்.

#### > நடத்தை நெறிமுறைகள்

[நடத்தை நெறிமுறைகளைப்][codeofconduct] படித்து பின்பற்றவும், இந்த திட்டத்தை திறந்த மற்றும் உள்ளடக்கியதாக வைத்திருக்க எனக்கு உதவுங்கள்.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts