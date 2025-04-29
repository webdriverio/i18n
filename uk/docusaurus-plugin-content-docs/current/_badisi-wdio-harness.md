---
id: badisi-wdio-harness
title: Сервіс підтримки тестових стендів для компонентів Angular
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @badisi/wdio-harness це сторонній пакет, для отримання додаткової інформації відвідайте [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> підтримка тестових стендів для компонентів Angular.</i><br/>
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

#### Тестові стенди для компонентів

> Стенд для компонентів - це клас, який дозволяє тесту взаємодіяти з компонентом через підтримуваний API. API кожного стенду взаємодіє з компонентом так само, як це робив би користувач. Використовуючи API стенду, тест захищає себе від оновлень внутрішньої структури компонента, таких як зміна його DOM-структури. Ідея стендів для компонентів походить від патерну [PageObject](https://martinfowler.com/bliki/PageObject.html), який зазвичай використовується для інтеграційного тестування.

[Детальніше](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## Встановлення

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## Використання

__Методи__

- `createHarnessEnvironment(rootElement)` - отримує екземпляр HarnessLoader з заданого елемента (за замовчуванням body)
- `getHarness(harnessType, element)` - шукає екземпляр стенду з заданого класу ComponentHarness та елемента
- `getHarness(harnessType)` - шукає екземпляр стенду з заданого класу ComponentHarness
- `getHarness(query)` - шукає екземпляр стенду з заданого HarnessPredicate
- `getAllHarnesses(query)` - діє як getHarness, але повертає масив екземплярів стендів
- `waitForAngular()` - чекає завершення завантаження Angular

__Приклад__

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

Більше прикладів [тут][examples].


## Розробка

Дивіться [документацію для розробників][developer].


## Внесок

#### > Хочете допомогти?

Бажаєте повідомити про помилку, внести свій код або покращити документацію? Чудово!

Але, будь ласка, спочатку ознайомтеся з настановами щодо [внеску][contributing] та дізнайтеся про процес подання, правила кодування тощо.

#### > Кодекс поведінки

Будь ласка, прочитайте та дотримуйтесь [Кодексу поведінки][codeofconduct] і допоможіть мені зберегти цей проект відкритим та інклюзивним.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts