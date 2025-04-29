---
id: badisi-wdio-harness
title: Support för Angular-komponenttestselar Service
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @badisi/wdio-harness är ett tredjepartspaket, för mer information se [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> support för Angular-komponenttestselar.</i><br/>
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

#### Komponenttestselar

> En komponenttestsele är en klass som låter ett test interagera med en komponent via ett stött API. Varje seles API interagerar med en komponent på samma sätt som en användare skulle. Genom att använda sele-API:et isolerar ett test sig mot uppdateringar av en komponents interna delar, som att ändra dess DOM-struktur. Idén för komponentselar kommer från [PageObject](https://martinfowler.com/bliki/PageObject.html)-mönstret som vanligtvis används för integrationstest.

[Mer info](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## Installation

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## Användning

__Metoder__

- `createHarnessEnvironment(rootElement)` - får en HarnessLoader-instans från ett givet element (standardvärde är body)
- `getHarness(harnessType, element)` - söker efter en sele-instans från en given ComponentHarness-klass och element
- `getHarness(harnessType)` - söker efter en sele-instans från en given ComponentHarness-klass
- `getHarness(query)` - söker efter en sele-instans från ett givet HarnessPredicate
- `getAllHarnesses(query)` - fungerar som getHarness, men returnerar en array av sele-instanser
- `waitForAngular()` - väntar på att Angular ska avsluta bootstrapping

__Exempel__

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

Fler exempel [här][examples].


## Utveckling

Se [utvecklardokumentationen][developer].


## Bidra

#### > Vill du hjälpa till?

Vill du rapportera en bugg, bidra med kod eller förbättra dokumentationen? Utmärkt!

Men läs först igenom riktlinjerna för [bidrag][contributing], och lär dig om inskickningsprocessen, kodregler och mer.

#### > Uppförandekod

Läs och följ [uppförandekoden][codeofconduct] och hjälp mig att hålla detta projekt öppet och inkluderande.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts