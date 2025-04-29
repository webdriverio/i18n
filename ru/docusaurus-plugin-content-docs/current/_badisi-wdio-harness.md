---
id: badisi-wdio-harness
title: Сервис поддержки для тестовых оболочек компонентов Angular
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @badisi/wdio-harness - это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> поддержка для тестовых оболочек компонентов Angular.</i><br/>
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

#### Тестовые оболочки компонентов

> Оболочка компонента - это класс, который позволяет тесту взаимодействовать с компонентом через поддерживаемый API. API каждой оболочки взаимодействует с компонентом так же, как это делал бы пользователь. Используя API оболочки, тест защищает себя от обновлений внутренних механизмов компонента, таких как изменение его DOM-структуры. Идея оболочек компонентов происходит из шаблона [PageObject](https://martinfowler.com/bliki/PageObject.html), широко используемого для интеграционного тестирования.

[Подробнее](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## Установка

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## Использование

__Методы__

- `createHarnessEnvironment(rootElement)` - получает экземпляр HarnessLoader из заданного элемента (по умолчанию - body)
- `getHarness(harnessType, element)` - ищет экземпляр оболочки из заданного класса ComponentHarness и элемента
- `getHarness(harnessType)` - ищет экземпляр оболочки из заданного класса ComponentHarness
- `getHarness(query)` - ищет экземпляр оболочки из заданного HarnessPredicate
- `getAllHarnesses(query)` - действует как getHarness, но возвращает массив экземпляров оболочки
- `waitForAngular()` - ожидает завершения загрузки Angular

__Пример__

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

Больше примеров [здесь][examples].


## Разработка

См. [документацию для разработчиков][developer].


## Участие в проекте

#### > Хотите помочь?

Хотите сообщить об ошибке, внести код или улучшить документацию? Отлично!

Но, пожалуйста, сначала ознакомьтесь с руководством по [участию в проекте][contributing], узнайте о процессе подачи, правилах кодирования и многом другом.

#### > Кодекс поведения

Пожалуйста, прочитайте и следуйте [Кодексу поведения][codeofconduct] и помогите мне сохранить этот проект открытым и инклюзивным.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts