---
id: gettingstarted
title: شروع به کار
description: با دستور npm init wdio@latest یک پروژه WebdriverIO بسازید، اولین تست خود را اجرا کنید و راهنمای بعدی را برای پلتفرم خود پیدا کنید.
---

WebdriverIO را با یک دستور در یک پروژه موجود یا جدید راه‌اندازی کنید، سپس اولین تست خود را اجرا کنید. ویزارد پیکربندی از شما می‌پرسد که چه چیزی را می‌خواهید تست کنید (وب، موبایل، دسکتاپ یا افزونه‌های VS Code)، از کدام فریم‌ورک و گزارش‌دهنده‌ها استفاده کنید، و همه چیز را برای شما نصب می‌کند.

:::info
این مستندات مربوط به WebdriverIO __v10__ است. هنوز از v9 استفاده می‌کنید؟ از [مستندات v9](https://v9.webdriver.io) استفاده کنید یا [راهنمای مهاجرت به v10](/docs/v10-migration) را دنبال کنید.
:::

:::tip از یک ایجنت کدنویسی استفاده می‌کنید؟
آن را به [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) ارجاع دهید یا سرور MCP مستندات را در `https://webdriver.io/mcp` متصل کنید. به [WebdriverIO برای ایجنت‌های کدنویسی](/docs/ai-agents) مراجعه کنید.
:::

## راه‌اندازی WebdriverIO

[جعبه‌ابزار شروع WebdriverIO](https://www.npmjs.com/package/create-wdio) یک راه‌اندازی کامل WebdriverIO را به یک پروژه موجود یا جدید اضافه می‌کند. در دایرکتوری ریشه یک پروژه موجود، دستور زیر را اجرا کنید:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

یا اگر می‌خواهید یک پروژه جدید بسازید:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

یا اگر می‌خواهید یک پروژه جدید بسازید:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

یا اگر می‌خواهید یک پروژه جدید بسازید:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

یا اگر می‌خواهید یک پروژه جدید بسازید:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

این دستور واحد، ابزار CLI مربوط به WebdriverIO را دانلود کرده و یک ویزارد پیکربندی اجرا می‌کند که به شما در پیکربندی مجموعه تست‌هایتان کمک می‌کند.

<CreateProjectAnimation />

ویزارد مجموعه‌ای از سؤالات را مطرح می‌کند که شما را در فرآیند راه‌اندازی راهنمایی می‌کند. می‌توانید پارامتر `--yes` را ارسال کنید تا یک راه‌اندازی پیش‌فرض انتخاب شود که از Mocha با Chrome و الگوی [Page Object](https://martinfowler.com/bliki/PageObject.html) استفاده می‌کند.

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### پاسخ به ویزارد با فلگ‌ها

هر سؤال در ویزارد یک فلگ خط فرمان دارد. یک فلگ به سؤال مربوط به خود پاسخ می‌دهد و ویزارد فقط بقیه سؤالات را می‌پرسد. همراه با `--yes`، ویزارد برای بقیه موارد از مقادیر پیش‌فرض استفاده می‌کند و هرگز سؤالی نمی‌پرسد، که دقیقاً همان چیزی است که یک ایجنت کدنویسی یا یک job در CI نیاز دارد:

```sh
# Cucumber به زبان JavaScript، با گزارش‌دهنده‌های spec و JUnit
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox و Edge به جای Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# یک اپلیکیشن Android با Appium
npm init wdio@latest . -- --yes --mobile-environment android

# تست‌های کامپوننت React
npm init wdio@latest . -- --yes --runner component --preset react

# پیکربندی را بنویس، اما وابستگی‌ها را خودتان نصب کنید
npm init wdio@latest . -- --yes --no-npm-install
```

با Yarn، pnpm و bun، فلگ‌ها را بدون جداکننده `--` ارسال کنید، برای مثال `pnpm create wdio@latest . --yes --framework cucumber`.

رایج‌ترین فلگ‌ها:

| فلگ | مقادیر |
| --- | --- |
| `--runner` | `e2e` (پیش‌فرض)، `component`، `desktop`، `vscode`، `roku` |
| `--framework` | `mocha` (پیش‌فرض)، `jasmine`، `cucumber`، `serenity-mocha`، `serenity-jasmine`، `serenity-cucumber` |
| `--typescript` / `--no-typescript` | وقتی پروژه یک فایل `tsconfig.json` داشته باشد، TypeScript پیش‌فرض است |
| `--browsers` | فهرستی جداشده با کاما از `chrome` (پیش‌فرض)، `firefox`، `safari`، `edge` |
| `--mobile-environment` | `android`، `ios` |
| `--backend` | `local` (پیش‌فرض)، `saucelabs`، `browserstack`، `experitest`، `grid`، `other` |
| `--preset` | `lit`، `vue`، `svelte`، `solid`، `stencil`، `react`، `preact`، `other`، همراه با `--runner component` |
| `--desktop-framework` | `electron`، `tauri`، `dioxus`، `macos`، همراه با `--runner desktop` |
| `--reporters`، `--services`، `--plugins` | نام‌های کوتاه جداشده با کاما، برای مثال `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | بخش `AGENTS.md` و مهارت `wdio-session` را می‌نویسد (به‌طور پیش‌فرض فعال) |
| `--npm-install` / `--no-npm-install` | وابستگی‌ها را نصب می‌کند (به‌طور پیش‌فرض فعال) |

دستور `npm init wdio@latest -- --help` همه فلگ‌ها، مقادیری که می‌پذیرند و سؤالی که به آن پاسخ می‌دهند را فهرست می‌کند. فلگ‌های بولی پیشوند `--no-` می‌پذیرند. همین فلگ‌ها با `npx wdio config` نیز کار می‌کنند.

ویزارد هر فلگ را با راه‌اندازی شما بررسی می‌کند. یک مقدار ناشناخته، فلگی برای سؤالی که ویزارد آن را نمی‌پرسد، یا مقداری که برای راه‌اندازی شما ارائه نمی‌شود، ویزارد را پیش از نوشتن هر فایلی با کد خروج 2 متوقف می‌کند:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## نصب دستی CLI

همچنین می‌توانید پکیج CLI را به‌صورت دستی از طریق دستور زیر به پروژه خود اضافه کنید:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # برای مثال `8.13.10` را چاپ می‌کند

# اجرای ویزارد پیکربندی
npx wdio config
```

## اجرای تست

می‌توانید مجموعه تست‌های خود را با استفاده از دستور `run` و با اشاره به فایل پیکربندی WebdriverIO که به‌تازگی ایجاد کرده‌اید، اجرا کنید:

```sh
npx wdio run ./wdio.conf.js
```

اگر می‌خواهید فایل‌های تست خاصی را اجرا کنید، می‌توانید پارامتر `--spec` را اضافه کنید:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

یا suiteها را در فایل پیکربندی خود تعریف کنید و فقط فایل‌های تست تعریف‌شده در یک suite را اجرا کنید:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## اجرا در یک اسکریپت

اگر می‌خواهید از WebdriverIO به‌عنوان یک موتور اتوماسیون در [حالت مستقل](/docs/setuptypes#standalone-mode) در یک اسکریپت Node.JS استفاده کنید، می‌توانید WebdriverIO را مستقیماً نصب کرده و از آن به‌عنوان یک پکیج استفاده کنید، برای مثال برای گرفتن اسکرین‌شات از یک وب‌سایت:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__نکته:__ همه دستورات WebdriverIO ناهمگام (asynchronous) هستند و باید با استفاده از [`async/await`](https://javascript.info/async-await) به‌درستی مدیریت شوند.

## ضبط تست‌ها

WebdriverIO ابزارهایی را ارائه می‌دهد که با ضبط اقدامات تست شما روی صفحه و تولید خودکار اسکریپت‌های تست WebdriverIO، به شما در شروع کار کمک می‌کنند. برای اطلاعات بیشتر به [ضبط تست‌ها با Chrome DevTools Recorder](/docs/record) مراجعه کنید.

## نیازمندی‌های سیستم

باید [Node.js](http://nodejs.org) را نصب داشته باشید.

- حداقل نسخه v22.19.0 یا بالاتر را نصب کنید، زیرا این قدیمی‌ترین نسخه LTS پشتیبانی‌شده است
- فقط نسخه‌هایی که LTS هستند یا در آینده LTS خواهند شد، به‌طور رسمی پشتیبانی می‌شوند

اگر Node در حال حاضر روی سیستم شما نصب نیست، پیشنهاد می‌کنیم از ابزاری مانند [NVM](https://github.com/creationix/nvm) یا [Volta](https://volta.sh/) برای کمک به مدیریت چندین نسخه فعال Node.js استفاده کنید. NVM یک انتخاب محبوب است، در حالی که Volta نیز جایگزین خوبی است.

## تماشای ویدیوی معرفی

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

ویدیوهای بیشتر در [کانال رسمی YouTube](https://youtube.com/@webdriverio) موجود است.

## گام‌های بعدی

- پلتفرم خود را انتخاب کنید: [مرورگرهای وب](/docs/platforms/web)، [اپلیکیشن‌های موبایل](/docs/platforms/mobile)، [اپلیکیشن‌های دسکتاپ](/docs/platforms/desktop) یا [افزونه‌ها و ویرایشگرها](/docs/platforms/apps-and-extensions)
- یاد بگیرید چگونه [عناصر را انتخاب کنید](/docs/selectors) و [assertionها](/docs/assertion) را بنویسید
- اجراکننده تست را در [`wdio.conf.ts`](/docs/configurationfile) پیکربندی کنید
- در [Discord](https://discord.webdriver.io) کمک بگیرید