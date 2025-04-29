---
id: badisi-wdio-harness
title: Service de support pour les harnais de test de composants Angular
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---


> @badisi/wdio-harness est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> support pour les harnais de test de composants Angular.</i><br/>
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

#### Harnais de test de composants

> Un harnais de composant est une classe qui permet à un test d'interagir avec un composant via une API supportée. L'API de chaque harnais interagit avec un composant de la même manière qu'un utilisateur le ferait. En utilisant l'API du harnais, un test se protège contre les mises à jour des éléments internes d'un composant, comme la modification de sa structure DOM. L'idée des harnais de composants provient du modèle [PageObject](https://martinfowler.com/bliki/PageObject.html) couramment utilisé pour les tests d'intégration.

[Plus d'informations](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## Installation

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## Utilisation

__Méthodes__

- `createHarnessEnvironment(rootElement)` - obtient une instance HarnessLoader à partir d'un élément donné (par défaut le corps)
- `getHarness(harnessType, element)` - recherche une instance de harnais à partir d'une classe ComponentHarness donnée et d'un élément
- `getHarness(harnessType)` - recherche une instance de harnais à partir d'une classe ComponentHarness donnée
- `getHarness(query)` - recherche une instance de harnais à partir d'un HarnessPredicate donné
- `getAllHarnesses(query)` - agit comme getHarness, mais renvoie un tableau d'instances de harnais
- `waitForAngular()` - attend qu'Angular termine son amorçage

__Exemple__

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

Plus d'exemples [ici][examples].


## Développement

Consultez la [documentation pour les développeurs][developer].


## Contribution

#### > Vous voulez aider ?

Vous souhaitez signaler un bug, contribuer au code ou améliorer la documentation ? Excellent !

Mais veuillez d'abord lire les directives pour [contribuer][contributing], et apprendre le processus de soumission, les règles de codage et plus encore.

#### > Code de conduite

Veuillez lire et suivre le [Code de conduite][codeofconduct] et aidez-moi à maintenir ce projet ouvert et inclusif.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts