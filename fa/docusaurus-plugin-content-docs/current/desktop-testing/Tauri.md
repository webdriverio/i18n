---
id: tauri
title: Tauri
description: "برنامه‌های دسکتاپ Tauri را روی Windows، macOS و Linux با سرویس Tauri در WebdriverIO، با استفاده از ویزارد راه‌اندازی یا پیکربندی دستی، تست کنید."
---

[Tauri](https://tauri.app/) فریم‌ورکی برای ساخت برنامه‌های دسکتاپ چندسکویی سبک و امن با استفاده از یک بک‌اند Rust و webview بومی سیستم‌عامل است. سرویس Tauri در WebdriverIO فرایند شناسایی، اجرا و کنترل برنامه‌های Tauri را روی Windows (WebView2)، macOS (WKWebView) و Linux (WebKitGTK) خودکار می‌کند تا یک مجموعه تست یکسان در همه‌جا کار کند.

مزایای استفاده از WebdriverIO برای تست برنامه‌های Tauri عبارت‌اند از:

- 🚗 فراهم‌سازی خودکار لایه WebDriver — انتخاب میان `tauri-driver`، درایور CrabNebula یا افزونه تعبیه‌شده درون برنامه
- 📦 شناسایی فایل اجرایی به‌صورت چندسکویی (درایور Edge WebView2 در Windows همراه بسته ارائه می‌شود)
- 🧩 افزونه اختیاری `@wdio/tauri-plugin` برای یکپارچگی غنی‌تر درون webview (`browser.tauri.execute`، mock کردن)
- 🔗 تست deeplink و protocol handler
- 🪵 انتقال لاگ‌های Rust و فرانت‌اند به گزارشگر تست WebdriverIO

## شروع به کار

برای ایجاد یک پروژه جدید WebdriverIO، دستور زیر را اجرا کنید:

```sh
npm create wdio@latest ./
```

وقتی ویزارد پرسید چه نوع تستی می‌خواهید انجام دهید، گزینه _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ را انتخاب کنید، سپس در بخش انتخاب فریم‌ورک، _Tauri_ را برگزینید. پس از آن ویزارد می‌پرسد که از کدام ارائه‌دهنده WebDriver می‌خواهید استفاده کنید (`tauri-driver` رسمی، CrabNebula یا افزونه تعبیه‌شده) و اینکه آیا افزونه اختیاری `@wdio/tauri-plugin` را برای یکپارچگی غنی‌تر می‌خواهید یا خیر.

ویزارد بسته‌های npm را به‌طور خودکار نصب می‌کند و هرگونه افزودنی لازم Cargo را در stdout چاپ می‌کند تا آن‌ها را در فایل `src-tauri/Cargo.toml` خود قرار دهید.

## راه‌اندازی دستی

اگر از قبل یک پروژه WebdriverIO دارید، سرویس را نصب کنید:

```sh
npm install --save-dev @wdio/tauri-service
# optional: richer in-webview integration
npm install --save-dev @wdio/tauri-plugin
```

برای افزونه WebDriver تعبیه‌شده (توصیه‌شده — سرور W3C را درون برنامه شما اجرا می‌کند و نیازی به `tauri-driver` خارجی نیست)، crate مربوط به Cargo را به `src-tauri/Cargo.toml` اضافه کنید:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…و آن را در `src-tauri/src/lib.rs` ثبت کنید:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

سپس سرویس را به پیکربندی خود اضافه کنید:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['tauri', {
        appBinaryPath: './src-tauri/target/release/my-tauri-app',
        driverProvider: 'embedded'
    }]]
}
```

همین 🎉

درباره [پیکربندی سرویس Tauri](/docs/desktop-testing/tauri/configuration)، [راه‌اندازی افزونه Tauri](/docs/desktop-testing/tauri/plugin-setup)، [نکات مختص هر پلتفرم](/docs/desktop-testing/tauri/platform-support) و [الگوهای رایج استفاده](/docs/desktop-testing/tauri/usage-examples) بیشتر بیاموزید.