---
id: badisi-wdio-harness
title: Servizio di supporto per i test harness dei componenti Angular
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---


> @badisi/wdio-harness è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> supporto per i test harness dei componenti Angular.</i><br/>
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

#### Test harness dei componenti

> Un test harness di componente è una classe che consente a un test di interagire con un componente tramite un'API supportata. L'API di ciascun harness interagisce con un componente nello stesso modo in cui lo farebbe un utente. Utilizzando l'API dell'harness, un test si isola contro gli aggiornamenti delle parti interne di un componente, come la modifica della sua struttura DOM. L'idea dei test harness dei componenti deriva dal pattern [PageObject](https://martinfowler.com/bliki/PageObject.html) comunemente utilizzato per i test di integrazione.

[Maggiori informazioni](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## Installazione

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## Utilizzo

__Metodi__

- `createHarnessEnvironment(rootElement)` - ottiene un'istanza di HarnessLoader da un elemento dato (di default il body)
- `getHarness(harnessType, element)` - cerca un'istanza di harness da una classe ComponentHarness e un elemento dati
- `getHarness(harnessType)` - cerca un'istanza di harness da una classe ComponentHarness data
- `getHarness(query)` - cerca un'istanza di harness da un HarnessPredicate dato
- `getAllHarnesses(query)` - funziona come getHarness, ma restituisce un array di istanze harness
- `waitForAngular()` - attende che Angular finisca il bootstrap

__Esempio__

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

Altri esempi [qui][examples].


## Sviluppo

Vedi la [documentazione per sviluppatori][developer].


## Contribuire

#### > Vuoi Aiutare?

Vuoi segnalare un bug, contribuire con del codice o migliorare la documentazione? Eccellente!

Ma per favore leggi prima le linee guida per [contribuire][contributing], e informati sul processo di invio, le regole di codifica e altro ancora.

#### > Codice di Condotta

Si prega di leggere e seguire il [Codice di Condotta][codeofconduct] e aiutami a mantenere questo progetto aperto e inclusivo.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts