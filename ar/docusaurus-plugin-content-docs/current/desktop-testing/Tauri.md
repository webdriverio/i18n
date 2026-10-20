---
id: tauri
title: Tauri
description: "اختبر تطبيقات سطح المكتب المبنية بـ Tauri على Windows وmacOS وLinux باستخدام خدمة Tauri من WebdriverIO، سواء عبر معالج الإعداد أو من خلال إعداد يدوي."
---

[Tauri](https://tauri.app/) هو إطار عمل لبناء تطبيقات سطح مكتب خفيفة وآمنة ومتعددة المنصات باستخدام واجهة خلفية مكتوبة بلغة Rust وعرض الويب (webview) الأصلي لنظام التشغيل. تعمل خدمة Tauri من WebdriverIO على أتمتة اكتشاف تطبيقات Tauri وتشغيلها والتحكم بها على Windows (WebView2) وmacOS (WKWebView) وLinux (WebKitGTK)، بحيث تعمل مجموعة الاختبارات نفسها في كل مكان.

مزايا استخدام WebdriverIO لاختبار تطبيقات Tauri هي:

- 🚗 توفير طبقة WebDriver تلقائيًا — اختر `tauri-driver` أو مشغل CrabNebula أو الإضافة المدمجة داخل التطبيق
- 📦 اكتشاف الملفات الثنائية عبر المنصات المختلفة (مشغل Edge WebView2 مضمَّن على Windows)
- 🧩 إضافة `@wdio/tauri-plugin` اختيارية لتكامل أغنى داخل عرض الويب (`browser.tauri.execute`، والمحاكاة)
- 🔗 اختبار الروابط العميقة (deeplinks) ومعالجات البروتوكولات
- 🪵 تمرير سجلات Rust والواجهة الأمامية إلى مُعِدّ تقارير اختبارات WebdriverIO

## البدء

لبدء مشروع WebdriverIO جديد، شغّل:

```sh
npm create wdio@latest ./
```

عندما يسألك المعالج عن نوع الاختبار الذي ترغب في إجرائه، اختر _"Desktop Testing - of Electron, Tauri, or macOS Applications"_، ثم اختر _Tauri_ عند سؤالك عن إطار العمل. سيسألك المعالج بعد ذلك عن مزود WebDriver الذي تريد استخدامه (`tauri-driver` الرسمي، أو CrabNebula، أو الإضافة المدمجة)، وما إذا كنت ترغب في إضافة `@wdio/tauri-plugin` الاختيارية للحصول على تكامل أغنى.

يقوم المعالج بتثبيت حزم npm تلقائيًا ويطبع أي إضافات Cargo مطلوبة في المخرجات القياسية (stdout) لكي تلصقها في ملف `src-tauri/Cargo.toml` الخاص بك.

## الإعداد اليدوي

إذا كان لديك مشروع WebdriverIO بالفعل، فثبّت الخدمة:

```sh
npm install --save-dev @wdio/tauri-service
# اختياري: تكامل أغنى داخل عرض الويب
npm install --save-dev @wdio/tauri-plugin
```

بالنسبة لإضافة WebDriver المدمجة (موصى بها — تشغّل خادم W3C داخل تطبيقك، دون الحاجة إلى `tauri-driver` خارجي)، أضف حزمة Cargo إلى `src-tauri/Cargo.toml`:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…ثم سجّلها في `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

بعد ذلك أضف الخدمة إلى ملف الإعدادات الخاص بك:

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

هذا كل شيء 🎉

تعرّف على المزيد حول [إعداد خدمة Tauri](/docs/desktop-testing/tauri/configuration)، و[إعداد إضافة Tauri](/docs/desktop-testing/tauri/plugin-setup)، و[الملاحظات الخاصة بكل منصة](/docs/desktop-testing/tauri/platform-support)، و[أنماط الاستخدام الشائعة](/docs/desktop-testing/tauri/usage-examples).