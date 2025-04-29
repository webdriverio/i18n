---
id: badisi-wdio-harness
title: سرویس پشتیبانی از تست هارنس‌های کامپوننت Angular
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---


> @badisi/wdio-harness یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا مراجعه کنید به [GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> پشتیبانی از هارنس‌های تست کامپوننت Angular.</i><br/>
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

#### هارنس‌های تست کامپوننت

> یک هارنس کامپوننت، کلاسی است که به یک تست اجازه می‌دهد با یک کامپوننت از طریق یک API پشتیبانی شده تعامل داشته باشد. هر API هارنس به همان روشی که یک کاربر با کامپوننت تعامل می‌کند، با آن ارتباط برقرار می‌کند. با استفاده از API هارنس، یک تست خود را در برابر به‌روزرسانی‌های داخلی یک کامپوننت، مانند تغییر ساختار DOM آن، محافظت می‌کند. ایده هارنس‌های کامپوننت از الگوی [PageObject](https://martinfowler.com/bliki/PageObject.html) که معمولاً برای تست ادغام استفاده می‌شود، گرفته شده است.

[اطلاعات بیشتر](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## نصب

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## نحوه استفاده

__متدها__

- `createHarnessEnvironment(rootElement)` - یک نمونه HarnessLoader از یک المان داده شده دریافت می‌کند (به طور پیش‌فرض body)
- `getHarness(harnessType, element)` - یک نمونه هارنس را از کلاس ComponentHarness و المان داده شده جستجو می‌کند
- `getHarness(harnessType)` - یک نمونه هارنس را از کلاس ComponentHarness داده شده جستجو می‌کند
- `getHarness(query)` - یک نمونه هارنس را از HarnessPredicate داده شده جستجو می‌کند
- `getAllHarnesses(query)` - مشابه getHarness عمل می‌کند، اما آرایه‌ای از نمونه‌های هارنس را برمی‌گرداند
- `waitForAngular()` - منتظر می‌ماند تا Angular راه‌اندازی خود را به پایان برساند

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

مثال‌های بیشتر [اینجا][examples].


## توسعه

مستندات توسعه‌دهنده را [اینجا][developer] ببینید.


## مشارکت

#### > می‌خواهید کمک کنید؟

می‌خواهید یک باگ را گزارش کنید، کدی را مشارکت دهید یا مستندات را بهبود ببخشید؟ عالیه!

اما لطفاً ابتدا راهنمای [مشارکت][contributing] را مطالعه کنید، و در مورد فرآیند ارسال، قوانین کدنویسی و موارد بیشتر اطلاعات کسب کنید.

#### > آیین نامه رفتاری

لطفاً [آیین نامه رفتاری][codeofconduct] را مطالعه کرده و از آن پیروی کنید تا به من کمک کنید این پروژه را باز و فراگیر نگه دارم.




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts