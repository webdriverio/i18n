---
id: badisi-wdio-harness
title: Servicio de soporte para arneses de prueba de componentes Angular
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @badisi/wdio-harness es un paquete de terceros, para más información consulte [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> soporte para arneses de prueba de componentes Angular.</i><br/>
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

#### Arneses de prueba de componentes

> Un arnés de componente es una clase que permite a una prueba interactuar con un componente a través de una API compatible. La API de cada arnés interactúa con un componente de la misma manera que lo haría un usuario. Al usar la API del arnés, una prueba se aísla contra actualizaciones de los elementos internos de un componente, como cambiar su estructura DOM. La idea de los arneses de componentes proviene del patrón [PageObject](https://martinfowler.com/bliki/PageObject.html) comúnmente utilizado para pruebas de integración.

[Más información](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## Instalación

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## Uso

__Métodos__

- `createHarnessEnvironment(rootElement)` - obtiene una instancia de HarnessLoader desde un elemento dado (por defecto es body)
- `getHarness(harnessType, element)` - busca una instancia de arnés desde una clase ComponentHarness dada y un elemento
- `getHarness(harnessType)` - busca una instancia de arnés desde una clase ComponentHarness dada
- `getHarness(query)` - busca una instancia de arnés desde un HarnessPredicate dado
- `getAllHarnesses(query)` - actúa como getHarness, pero devuelve un array de instancias de arnés
- `waitForAngular()` - espera a que Angular termine de inicializarse

__Ejemplo__

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

Más ejemplos [aquí][examples].


## Desarrollo

Consulte la [documentación para desarrolladores][developer].


## Contribución

#### > ¿Quieres ayudar?

¿Quieres reportar un error, contribuir con código o mejorar la documentación? ¡Excelente!

Pero por favor, lee primero las directrices para [contribuir][contributing], y aprende sobre el proceso de envío, las reglas de codificación y más.

#### > Código de Conducta

Por favor, lee y sigue el [Código de Conducta][codeofconduct] y ayúdame a mantener este proyecto abierto e inclusivo.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts