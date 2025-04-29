---
id: badisi-wdio-harness
title: Unterstützung für Angular-Komponententest-Harnesses Service
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---


> @badisi/wdio-harness ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> Unterstützung für Angular-Komponententest-Harnesses.</i><br/>
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

#### Komponententest-Harnesses

> Ein Komponenten-Harness ist eine Klasse, die einem Test ermöglicht, über eine unterstützte API mit einer Komponente zu interagieren. Die API jedes Harness interagiert mit einer Komponente auf die gleiche Weise wie ein Benutzer. Durch die Verwendung der Harness-API schützt sich ein Test vor Updates an den internen Abläufen einer Komponente, wie zum Beispiel Änderungen an ihrer DOM-Struktur. Die Idee für Komponenten-Harnesses stammt aus dem [PageObject](https://martinfowler.com/bliki/PageObject.html)-Muster, das häufig für Integrationstests verwendet wird.

[Mehr Informationen](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## Installation

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## Verwendung

__Methoden__

- `createHarnessEnvironment(rootElement)` - erhält eine HarnessLoader-Instanz von einem gegebenen Element (standardmäßig body)
- `getHarness(harnessType, element)` - sucht nach einer Harness-Instanz von einer gegebenen ComponentHarness-Klasse und Element
- `getHarness(harnessType)` - sucht nach einer Harness-Instanz von einer gegebenen ComponentHarness-Klasse
- `getHarness(query)` - sucht nach einer Harness-Instanz von einem gegebenen HarnessPredicate
- `getAllHarnesses(query)` - verhält sich wie getHarness, gibt aber ein Array von Harness-Instanzen zurück
- `waitForAngular()` - wartet darauf, dass Angular das Bootstrapping abschließt

__Beispiel__

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

Weitere Beispiele [hier][examples].


## Entwicklung

Siehe die [Entwicklerdokumentation][developer].


## Mitwirken

#### > Möchten Sie helfen?

Möchten Sie einen Fehler melden, Code beitragen oder die Dokumentation verbessern? Ausgezeichnet!

Bitte lesen Sie jedoch zuerst die Richtlinien zum [Mitwirken][contributing] und informieren Sie sich über den Einreichungsprozess, Kodierungsregeln und mehr.

#### > Verhaltenskodex

Bitte lesen und befolgen Sie den [Verhaltenskodex][codeofconduct] und helfen Sie mir, dieses Projekt offen und inklusiv zu halten.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts