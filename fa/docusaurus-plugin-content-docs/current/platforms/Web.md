---
id: web
title: مرورگرهای وب
description: تست‌های سرتاسری (end-to-end)، کامپوننت، بصری و دسترس‌پذیری WebdriverIO را در Chrome، Firefox، Microsoft Edge و Safari راه‌اندازی و اجرا کنید.
---

WebdriverIO مرورگرهای دسکتاپ (Chrome، Chromium، Firefox، Microsoft Edge و Safari) را از طریق درایورهای استاندارد مرورگر خودکارسازی می‌کند. به طور پیش‌فرض تلاش می‌کند یک جلسه [WebDriver BiDi](/docs/automationProtocols) باز کند که جانشین دوطرفه پروتکل کلاسیک WebDriver است. BiDi قابلیت‌هایی مانند شبیه‌سازی (mock) شبکه و شبیه‌سازی Web API را فراهم می‌کند. برای غیرفعال کردن آن، `wdio:enforceWebDriverClassic: true` را در capabilities خود تنظیم کنید. نیازی نیست درایورها را خودتان نصب کنید: کافی است یک `browserName` تنظیم کنید تا WebdriverIO درایور متناظر یعنی Chromedriver، Geckodriver یا Edgedriver را دانلود و اجرا کند. همچنین در صورتی که نسخه محلی پیدا نشود، Chrome، Chromium یا Firefox را نصب می‌کند. Microsoft Edge باید از قبل نصب شده باشد و Safaridriver همراه با macOS ارائه می‌شود. همین testrunner می‌تواند با Browser Runner تست‌ها را داخل مرورگر نیز اجرا کند. این شامل تست‌های واحد و کامپوننت برای React، Vue، Svelte، SolidJS، Preact، Lit و Stencil می‌شود.

## شروع سریع

با `npm init wdio@latest .` یک پروژه را به صورت تعاملی ایجاد کنید. ارسال `--yes` گزینه‌های پیش‌فرض را انتخاب می‌کند: Mocha، Chrome و page objectها. برای راه‌اندازی دستی پروژه، testrunner، یک آداپتور فریم‌ورک، یک reporter و `tsx` را برای TypeScript نصب کنید:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

هر capability فرایندهای worker مخصوص به خود را دریافت می‌کند، بنابراین این دستور spec را هم در Chrome و هم در Firefox اجرا می‌کند. مقادیر معتبر دیگر برای `browserName` عبارتند از `chromium`، `msedge` و `safari`. برای اجرا به صورت headless، آرگومان‌های مرورگر مانند `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }` را اضافه کنید. برای Firefox و Edge به [اجرای مرورگر به صورت Headless](/docs/capabilities#run-browser-headless) مراجعه کنید؛ Safari حالت headless ندارد.

## مسیر خود را انتخاب کنید

تست سرتاسری در مرورگرهای مختلف:

- [Capabilities](/docs/capabilities): گزینه‌های مرورگر، حالت headless، کانال‌های مرورگر (Canary، Nightly، Safari Technology Preview) و گزینه‌های درایور `wdio:*`.
- [فایل‌های اجرایی درایور](/docs/driverbinaries): نحوه عملکرد راه‌اندازی خودکار مرورگر و درایور، و نحوه اشاره به فایل‌های اجرایی سفارشی.
- [پروتکل‌های خودکارسازی](/docs/automationProtocols): مقایسه WebDriver و WebDriver BiDi.
- [دستورات WebDriver BiDi](/docs/api/webdriverBidi): دستورات خام پروتکل BiDi که روی شیء `browser` در دسترس هستند.
- [انتخابگرها](/docs/selectors): انتخابگرهای CSS، متن، ARIA، عمیق (shadow DOM) و React.
- [انتظار خودکار](/docs/autowait) و [مهلت‌های زمانی](/docs/timeouts): نحوه انتظار WebdriverIO برای عناصر و مواردی که باید تنظیم شوند.
- [Multi-remote](/docs/multiremote): کنترل چندین مرورگر در یک تست، برای مثال برای برنامه‌های چت یا WebRTC.

قابلیت‌های مرورگر که به WebDriver BiDi نیاز دارند (Chrome، Edge و Firefox؛ نه Safari):

- [Mockها و Spyهای درخواست](/docs/mocksandspies): رهگیری، تغییر یا جایگزینی درخواست‌های شبکه با `browser.mock()`. همچنین به [شیء Mock](/docs/api/mock) مراجعه کنید.
- [شبیه‌سازی](/docs/emulation): شبیه‌سازی موقعیت جغرافیایی، ویژگی‌های رسانه، user agent، وضعیت آفلاین، locale، منطقه زمانی، صفحه نمایش و دستگاه‌ها با `browser.emulate()`.

تست کامپوننت و واحد در یک مرورگر واقعی:

- [تست کامپوننت](/docs/component-testing): نحوه عملکرد [Browser Runner](/docs/runner#browser-runner) مبتنی بر Vite و نحوه راه‌اندازی آن.
- راهنماهای فریم‌ورک: [React](/docs/component-testing/react)، [Vue.js](/docs/component-testing/vue)، [Svelte](/docs/component-testing/svelte)، [SolidJS](/docs/component-testing/solid)، [Preact](/docs/component-testing/preact)، [Lit](/docs/component-testing/lit)، [Stencil](/docs/component-testing/stencil).
- [Mocking](/docs/component-testing/mocking) و [پوشش کد](/docs/component-testing/coverage) برای تست‌های کامپوننت.

تست بصری و دسترس‌پذیری:

- [تست بصری](/docs/visual-testing): مقایسه تصویر صفحه، عنصر و کل صفحه با `@wdio/visual-service`.
- [Snapshot](/docs/snapshot): بررسی‌های snapshot برای DOM و اشیاء.
- [Axe Core](/docs/accessibility-testing/axe-core): اجرای اسکن‌های دسترس‌پذیری Deque axe از درون تست‌های شما.

مقیاس‌پذیری:

- [Selenium Grid](/docs/seleniumgrid)، [سرویس‌های ابری](/docs/cloudservices) و [Docker](/docs/docker): اجرای مرورگرها به صورت راه دور.
- [Sharding](/docs/sharding): تقسیم یک مجموعه تست بین ماشین‌های CI.

یک تست کامپوننت از همان فایل پیکربندی با یک runner متفاوت استفاده می‌کند. برای مثال، برای استفاده از preset مربوط به React:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

Browser Runner به `@wdio/browser-runner` نیاز دارد. preset مربوط به React همچنین به `@vitejs/plugin-react` نیاز دارد و راهنماها استفاده از `@testing-library/react` را برای رندر کردن توصیه می‌کنند. presetها برای `vue`، `svelte`، `solid`، `react`، `preact` و `stencil` وجود دارند. برای موارد دیگر، به جای آن از `viteConfig` استفاده کنید.

## عیب‌یابی

- Chrome در CI با خطای "user data directory is already in use" یا "DevToolsActivePort file doesn't exist" اجرا نمی‌شود: به [Headless و سرورهای نمایش](/docs/headless-and-display-servers#troubleshooting) مراجعه کنید.
- `browser.mock()` یا `browser.emulate()` هیچ تأثیری ندارد: جلسه از WebDriver BiDi استفاده نمی‌کند. مرورگر خود (Safari از BiDi پشتیبانی نمی‌کند)، ارائه‌دهنده ابری خود و `wdio:enforceWebDriverClassic` را بررسی کنید.
- درایورها یا مرورگرها پشت پراکسی دانلود نمی‌شوند: به [میزبان سفارشی دانلود درایور](/docs/capabilities#custom-driver-download-host) و [راه‌اندازی پراکسی](/docs/proxy) مراجعه کنید.
- تست‌های ناپایدار: به [تکرار تست‌های ناپایدار](/docs/retry) و [اشکال‌زدایی](/docs/debugging) مراجعه کنید.

## گام‌های بعدی

- مرجع [پیکربندی](/docs/configuration) برای تمام گزینه‌های `wdio.conf.ts`.
- [راه‌اندازی TypeScript](/docs/typescript) و [فریم‌ورک‌ها](/docs/frameworks) (Mocha، Jasmine، Cucumber).
- [الگوی Page Object](/docs/pageobjects) برای ساختاردهی مجموعه‌های تست بزرگ‌تر.
- [MCP](/docs/mcp) برای اینکه یک عامل هوش مصنوعی بتواند یک جلسه مرورگر را از طریق WebdriverIO کنترل کند.
- سایر پلتفرم‌ها: [برنامه‌های موبایل](/docs/platforms/mobile)، [برنامه‌های دسکتاپ](/docs/platforms/desktop)، [افزونه‌ها و ویرایشگرها](/docs/platforms/apps-and-extensions).