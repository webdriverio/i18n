---
id: dioxus
title: Dioxus
description: "اختبر تطبيقات Dioxus لسطح المكتب على أنظمة Windows وmacOS وLinux باستخدام خدمة WebdriverIO الخاصة بـ Dioxus، عبر معالج الإعداد أو من خلال التهيئة اليدوية."
---

[Dioxus](https://dioxuslabs.com/) هو إطار عمل بلغة Rust لبناء تطبيقات متعددة المنصات من قاعدة شيفرة واحدة. تُعرض تطبيقاته المكتبية داخل عارض الويب الأصلي لنظام التشغيل (Wry)، وتتولى خدمة Dioxus في WebdriverIO أتمتة اكتشاف هذه التطبيقات وتشغيلها والتحكم بها على Windows (WebView2) وmacOS (WKWebView) وLinux (WebKitGTK)، بحيث تعمل مجموعة الاختبارات نفسها على جميع المنصات.

مزايا استخدام WebdriverIO لاختبار تطبيقات Dioxus هي:

- 🚗 توفير طبقة WebDriver تلقائيًا — لا يحتاج برنامج التشغيل المدمج داخل العملية (وهو الخيار الموصى به) إلى أي ملف تنفيذي خارجي لبرنامج التشغيل على أي منصة
- 📦 اكتشاف الملفات التنفيذية عبر المنصات (يأتي برنامج تشغيل Edge WebView2 مضمّنًا على Windows لمزوّد `external`)
- 🧩 `browser.dioxus.execute()` والمحاكاة (mocking) وإدارة النوافذ، وتوفرها الخدمة عبر حزمة `wdio-dioxus-bridge`
- 🔗 اختبار الروابط العميقة (deeplink) ومعالجات البروتوكولات
- 🪵 تمرير سجلات Rust والواجهة الأمامية إلى أداة تقارير اختبارات WebdriverIO

## البدء

لإنشاء مشروع WebdriverIO جديد، شغّل:

```sh
npm create wdio@latest ./
```

عندما يسألك المعالج عن نوع الاختبار الذي ترغب في إجرائه، اختر _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_، ثم اختر _Dioxus_ عند سؤالك عن إطار العمل. سيسألك المعالج بعد ذلك عن مزوّد WebDriver الذي تريد استخدامه (برنامج التشغيل المدمج داخل العملية الموصى به، أو برنامج التشغيل الخارجي الخاص بـ Windows فقط) وعن مسار الملف التنفيذي لنسخة التصحيح (debug) التي قمت ببنائها.

يثبّت المعالج حزم npm تلقائيًا ويطبع إضافات Cargo المطلوبة على المخرجات القياسية (stdout) لتقوم بلصقها في ملف `Cargo.toml` الخاص بك.

## الإعداد اليدوي

إذا كان لديك مشروع WebdriverIO بالفعل، فثبّت الخدمة:

```sh
npm install --save-dev @wdio/dioxus-service
```

يتطلب الاختبار حزمة `wdio-dioxus-bridge` — فهي تتيح استخدام `browser.dioxus.execute()` والمحاكاة والتقاط السجلات. أضفها إلى ملف `Cargo.toml`:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…ثم ثبّتها في إعدادات Dioxus لسطح المكتب في `src/main.rs`. يضمن الشرط `#[cfg(debug_assertions)]` استبعاد الجسر من نسخ الإصدار (release):

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

ابنِ التطبيق للاختبار (تُبقي نسخة التصحيح الجسرَ مفعّلًا):

```sh
cargo build
```

ثم أضف الخدمة والقدرات (capabilities) إلى ملف الإعدادات:

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

هذا كل شيء 🎉

تعرّف على المزيد حول [تهيئة خدمة Dioxus](/docs/desktop-testing/dioxus/configuration)، و[إعداد الجسر](/docs/desktop-testing/dioxus/plugin-setup)، و[الملاحظات الخاصة بكل منصة](/docs/desktop-testing/dioxus/platform-support)، و[أنماط الاستخدام الشائعة](/docs/desktop-testing/dioxus/usage-examples).