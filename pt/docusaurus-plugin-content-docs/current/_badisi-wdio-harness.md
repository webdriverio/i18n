---
id: badisi-wdio-harness
title: Serviço de Suporte para Testes de Componentes Angular
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @badisi/wdio-harness é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> suporte para testes de componentes Angular.</i><br/>
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

#### Testes de componentes

> Um harness de componente é uma classe que permite que um teste interaja com um componente por meio de uma API suportada. A API de cada harness interage com um componente da mesma forma que um usuário faria. Ao usar a API de harness, um teste se isola contra atualizações nos detalhes internos de um componente, como a alteração de sua estrutura DOM. A ideia para os harnesses de componentes vem do padrão [PageObject](https://martinfowler.com/bliki/PageObject.html) comumente usado para testes de integração.

[Mais informações](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## Instalação

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## Uso

__Métodos__

- `createHarnessEnvironment(rootElement)` - obtém uma instância de HarnessLoader a partir de um elemento fornecido (padrão para body)
- `getHarness(harnessType, element)` - busca uma instância de harness a partir de uma classe ComponentHarness e elemento fornecidos
- `getHarness(harnessType)` - busca uma instância de harness a partir de uma classe ComponentHarness fornecida
- `getHarness(query)` - busca uma instância de harness a partir de um HarnessPredicate fornecido
- `getAllHarnesses(query)` - age como getHarness, mas retorna um array de instâncias de harness
- `waitForAngular()` - aguarda o Angular terminar o bootstrap

__Exemplo__

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

Mais exemplos [aqui][examples].


## Desenvolvimento

Veja a [documentação para desenvolvedores][developer].


## Contribuindo

#### > Quer ajudar?

Quer relatar um bug, contribuir com código ou melhorar a documentação? Excelente!

Mas, por favor, leia primeiro as diretrizes para [contribuir][contributing], e aprenda sobre o processo de submissão, regras de codificação e mais.

#### > Código de Conduta

Por favor, leia e siga o [Código de Conduta][codeofconduct] e me ajude a manter este projeto aberto e inclusivo.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts