---
id: dioxus
title: Dioxus
description: "برنامه‌های دسکتاپ Dioxus را روی Windows، macOS و Linux با سرویس Dioxus در WebdriverIO و با استفاده از ویزارد راه‌اندازی یا پیکربندی دستی تست کنید."
---

[Dioxus](https://dioxuslabs.com/) یک فریم‌ورک Rust برای ساخت برنامه‌های چندسکویی از یک کدبیس واحد است. برنامه‌های دسکتاپ آن در webview بومی سیستم‌عامل (Wry) رندر می‌شوند و سرویس Dioxus در WebdriverIO فرایند یافتن، اجرا و کنترل آن‌ها را روی Windows (WebView2)، macOS (WKWebView) و Linux (WebKitGTK) خودکار می‌کند تا یک مجموعه تست یکسان در همه‌جا کار کند.

مزایای استفاده از WebdriverIO برای تست برنامه‌های Dioxus عبارت‌اند از:

- 🚗 تأمین خودکار لایه WebDriver — درایور توکار درون‌فرایندی (پیشنهادی) روی هیچ پلتفرمی به فایل اجرایی درایور خارجی نیاز ندارد
- 📦 تشخیص فایل اجرایی به‌صورت چندسکویی (درایور Edge WebView2 برای ارائه‌دهنده `external` روی Windows همراه بسته ارائه می‌شود)
- 🧩 `browser.dioxus.execute()`، mock کردن و مدیریت پنجره، که توسط سرویس از طریق crate `wdio-dioxus-bridge` فراهم می‌شوند
- 🔗 تست deeplink و protocol handler
- 🪵 ارسال لاگ‌های Rust و فرانت‌اند به گزارشگر تست WebdriverIO

## شروع به کار

برای ایجاد یک پروژه جدید WebdriverIO، دستور زیر را اجرا کنید:

```sh
npm create wdio@latest ./
```

وقتی ویزارد از شما پرسید چه نوع تستی می‌خواهید انجام دهید، گزینه _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_ را انتخاب کنید، سپس در بخش انتخاب فریم‌ورک، _Dioxus_ را برگزینید. پس از آن ویزارد می‌پرسد از کدام ارائه‌دهنده WebDriver می‌خواهید استفاده کنید (درایور توکار درون‌فرایندی پیشنهادی، یا درایور خارجی که فقط مخصوص Windows است) و مسیر فایل اجرایی debug ساخته‌شده شما چیست.

ویزارد بسته‌های npm را به‌طور خودکار نصب می‌کند و موارد لازم برای افزودن به Cargo را در stdout چاپ می‌کند تا آن‌ها را در `Cargo.toml` خود قرار دهید.

## راه‌اندازی دستی

اگر از قبل یک پروژه WebdriverIO دارید، سرویس را نصب کنید:

```sh
npm install --save-dev @wdio/dioxus-service
```

تست کردن به crate `wdio-dioxus-bridge` نیاز دارد — این crate قابلیت‌های `browser.dioxus.execute()`، mock کردن و ثبت لاگ را فعال می‌کند. آن را به `Cargo.toml` خود اضافه کنید:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…و آن را در پیکربندی دسکتاپ Dioxus خود در `src/main.rs` نصب کنید. محافظ `#[cfg(debug_assertions)]` باعث می‌شود bridge در buildهای release قرار نگیرد:

```rust
fn main() {
    let mut config = dioxus::desktop::Config::new();

    #[cfg(debug_assertions)]
    {
        config = wdio_dioxus_bridge::install(config);
    }

    dioxus::LaunchBuilder::desktop()
        .with_cfg(config)
        .launch(App);
}
```

برنامه را برای تست build کنید (build از نوع debug باعث فعال ماندن bridge می‌شود):

```sh
cargo build
```

سپس سرویس و capabilities را به پیکربندی خود اضافه کنید:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['dioxus', { driverProvider: 'embedded' }]],
    capabilities: [{
        browserName: 'dioxus',
        'dioxus:options': {
            application: './target/debug/my-app'
        }
    }]
}
```

همین 🎉

درباره [پیکربندی سرویس Dioxus](/docs/desktop-testing/dioxus/configuration)، [راه‌اندازی bridge](/docs/desktop-testing/dioxus/plugin-setup)، [نکات مخصوص هر پلتفرم](/docs/desktop-testing/dioxus/platform-support) و [الگوهای رایج استفاده](/docs/desktop-testing/dioxus/usage-examples) بیشتر بیاموزید.