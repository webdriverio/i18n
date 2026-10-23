---
id: electron
title: الکترون
description: "اپلیکیشن‌های الکترون را با سرویس WebdriverIO Electron تست کنید؛ سرویسی که Chromedriver را راه‌اندازی می‌کند، فایل اجرایی اپلیکیشن شما را شناسایی می‌کند و به شما امکان شبیه‌سازی (mock) APIهای الکترون را می‌دهد."
---

الکترون (Electron) فریمورکی برای ساخت اپلیکیشن‌های دسکتاپ با استفاده از JavaScript، HTML و CSS است. الکترون با جاسازی Chromium و Node.js در فایل اجرایی خود، به شما امکان می‌دهد تنها یک کدبیس JavaScript را نگهداری کنید و اپلیکیشن‌های چندسکویی بسازید که روی Windows، macOS و Linux کار می‌کنند — بدون اینکه به تجربه‌ی توسعه‌ی نیتیو نیاز داشته باشید.

WebdriverIO یک سرویس یکپارچه ارائه می‌دهد که تعامل با اپلیکیشن الکترون شما را ساده‌تر کرده و تست آن را بسیار آسان می‌کند. مزایای استفاده از WebdriverIO برای تست اپلیکیشن‌های الکترون عبارت‌اند از:

- 🚗 راه‌اندازی خودکار Chromedriver موردنیاز
- 📦 تشخیص خودکار مسیر اپلیکیشن الکترون شما - با پشتیبانی از [Electron Forge](https://www.electronforge.io/) و [Electron Builder](https://www.electron.build/)
- 🧩 دسترسی به APIهای الکترون در تست‌های شما
- 🕵️ شبیه‌سازی (mock) APIهای الکترون از طریق یک API مشابه Vitest

برای شروع تنها به چند مرحله‌ی ساده نیاز دارید. این ویدیوی آموزشی ساده و گام‌به‌گام شروع کار را از کانال [یوتیوب WebdriverIO](https://www.youtube.com/@webdriverio) تماشا کنید:

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

یا راهنمای بخش بعدی را دنبال کنید.

## شروع کار

برای ایجاد یک پروژه‌ی جدید WebdriverIO، دستور زیر را اجرا کنید:

```sh
npm create wdio@latest ./
```

یک ویزارد نصب شما را در طول فرایند راهنمایی خواهد کرد. وقتی از شما پرسیده شد چه نوع تستی می‌خواهید انجام دهید، گزینه‌ی _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ را انتخاب کنید، سپس در پرسش مربوط به فریمورک، _Electron_ را برگزینید. پس از آن مسیر اپلیکیشن الکترون کامپایل‌شده‌ی خود را وارد کنید، برای مثال `./dist`، سپس تنظیمات پیش‌فرض را نگه دارید یا بر اساس ترجیح خود آن‌ها را تغییر دهید.

ویزارد پیکربندی تمام پکیج‌های موردنیاز را نصب کرده و یک فایل `wdio.conf.js` یا `wdio.conf.ts` با پیکربندی لازم برای تست اپلیکیشن شما ایجاد می‌کند. اگر با تولید خودکار چند فایل تست موافقت کنید، می‌توانید اولین تست خود را از طریق `npm run wdio` اجرا کنید.

## راه‌اندازی دستی

اگر در حال حاضر از WebdriverIO در پروژه‌ی خود استفاده می‌کنید، می‌توانید از ویزارد نصب صرف‌نظر کرده و فقط وابستگی‌های زیر را اضافه کنید:

```sh
npm install --save-dev @wdio/electron-service
```

سپس می‌توانید از پیکربندی زیر استفاده کنید:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

همین! 🎉

درباره‌ی [نحوه‌ی پیکربندی سرویس الکترون](/docs/desktop-testing/electron/configuration)، [نحوه‌ی شبیه‌سازی APIهای الکترون](/docs/desktop-testing/electron/api-reference) و [نحوه‌ی دسترسی به APIهای الکترون](/docs/desktop-testing/electron/api) بیشتر بیاموزید.