---
id: badisi-wdio-harness
title: خدمة دعم منصات اختبار مكونات Angular
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---


> @badisi/wdio-harness هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> دعم لمنصات اختبار مكونات Angular.</i><br/>
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

#### منصات اختبار المكونات

> منصة اختبار المكونات هي فئة تتيح للاختبار التفاعل مع المكون عبر واجهة برمجة تطبيقات مدعومة. تتفاعل واجهة برمجة التطبيقات الخاصة بكل منصة مع المكون بنفس الطريقة التي يستخدمها المستخدم. من خلال استخدام واجهة برمجة تطبيقات المنصة، يحمي الاختبار نفسه من التحديثات على الأجزاء الداخلية للمكون، مثل تغيير هيكل DOM الخاص به. تأتي فكرة منصات اختبار المكونات من نمط [PageObject](https://martinfowler.com/bliki/PageObject.html) المستخدم بشكل شائع لاختبار التكامل.

[مزيد من المعلومات](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## التثبيت

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## الاستخدام

__الأساليب__

- `createHarnessEnvironment(rootElement)` - يحصل على نسخة HarnessLoader من عنصر معين (افتراضيًا هو body)
- `getHarness(harnessType, element)` - يبحث عن نسخة منصة اختبار من فئة ComponentHarness معينة وعنصر
- `getHarness(harnessType)` - يبحث عن نسخة منصة اختبار من فئة ComponentHarness معينة
- `getHarness(query)` - يبحث عن نسخة منصة اختبار من HarnessPredicate معين
- `getAllHarnesses(query)` - يعمل مثل getHarness، لكنه يعيد مصفوفة من نسخ منصات الاختبار
- `waitForAngular()` - ينتظر حتى ينتهي Angular من التمهيد

__مثال__

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

المزيد من الأمثلة [هنا][examples].


## التطوير

راجع [وثائق المطور][developer].


## المساهمة

#### > هل تريد المساعدة؟

هل تريد الإبلاغ عن خطأ، أو المساهمة ببعض الكود، أو تحسين الوثائق؟ ممتاز!

ولكن يرجى قراءة الإرشادات أولاً حول [المساهمة][contributing]، والتعرف على عملية التقديم، وقواعد الترميز والمزيد.

#### > مدونة قواعد السلوك

يرجى قراءة واتباع [مدونة قواعد السلوك][codeofconduct] ومساعدتي في الحفاظ على هذا المشروع مفتوحًا وشاملًا.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts