---
id: badisi-wdio-harness
title: Wsparcie dla Usługi Testowej Uchwytów Komponentów Angular
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @badisi/wdio-harness to pakiet zewnętrzny, więcej informacji na [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> wsparcie dla uchwytów testowych komponentów Angular.</i><br/>
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

#### Uchwyty testowe komponentów

> Uchwyt komponentu to klasa, która pozwala testowi wchodzić w interakcje z komponentem za pomocą wspieranego API. API każdego uchwytu współdziała z komponentem w taki sam sposób, w jaki zrobiłby to użytkownik. Używając API uchwytu, test izoluje się od aktualizacji wewnętrznych struktur komponentu, takich jak zmiana struktury DOM. Pomysł na uchwyty komponentów pochodzi ze wzorca [PageObject](https://martinfowler.com/bliki/PageObject.html) powszechnie używanego w testach integracyjnych.

[Więcej informacji](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## Instalacja

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## Użycie

__Metody__

- `createHarnessEnvironment(rootElement)` - pobiera instancję HarnessLoader z danego elementu (domyślnie body)
- `getHarness(harnessType, element)` - wyszukuje instancję uchwytu na podstawie danej klasy ComponentHarness i elementu
- `getHarness(harnessType)` - wyszukuje instancję uchwytu na podstawie danej klasy ComponentHarness
- `getHarness(query)` - wyszukuje instancję uchwytu na podstawie danego HarnessPredicate
- `getAllHarnesses(query)` - działa jak getHarness, ale zwraca tablicę instancji uchwytów
- `waitForAngular()` - czeka na zakończenie bootstrapowania Angulara

__Przykład__

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

Więcej przykładów [tutaj][examples].


## Rozwój

Zobacz [dokumentację dla deweloperów][developer].


## Współpraca

#### > Chcesz pomóc?

Chcesz zgłosić błąd, przyczynić się do kodu lub ulepszyć dokumentację? Świetnie!

Ale najpierw przeczytaj [wytyczne dotyczące współpracy][contributing] i dowiedz się więcej o procesie zgłaszania, zasadach kodowania i więcej.

#### > Kodeks Postępowania

Przeczytaj i przestrzegaj [Kodeksu Postępowania][codeofconduct] i pomóż mi utrzymać ten projekt otwartym i inkluzywnym.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts