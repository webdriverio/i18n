---
id: arm64-chromedriver
title: Chromedriver روی ARM64
description: نحوه راه‌اندازی Chromedriver توسط WebdriverIO روی macOS، ویندوز و لینوکس ARM64، و کاری که باید انجام دهید وقتی هیچ درایور Linux ARM64 منطبقی وجود ندارد.
---

WebdriverIO به‌طور خودکار Chromedriver را روی ARM64 راه‌اندازی می‌کند. روی **macOS** (Apple silicon)، Chrome for Testing برای هر نسخه یک Chromedriver بومی `mac-arm64` منتشر می‌کند، بنابراین نیازی به هیچ تنظیمی نیست. روی **Windows 11 on Arm** نیز بدون هیچ پیکربندی‌ای کار می‌کند: Chrome for Testing هیچ Chromedriver از نوع `win-arm64` منتشر نمی‌کند، اما Chromedriver `win64` (x64) آن تحت [شبیه‌سازی x64](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) شفاف ویندوز اجرا می‌شود و هم Chrome ARM64 نصب‌شده و هم مرورگر x64 Chrome for Testing را که WebdriverIO در غیر این صورت دانلود می‌کند، کنترل می‌کند. روی **Linux ARM64**، نسخه‌های Chrome قدیمی‌تر از `153.0.8001.0` نیاز به بررسی دقیق‌تری دارند که در ادامه توضیح داده شده است.

## Linux ARM64

Chrome for Testing از نسخه **`153.0.8001.0`** کروم به بعد، Chromedriver `linux-arm64` را می‌سازد و WebdriverIO مستقیماً از آن استفاده می‌کند. برای یک Chrome یا Chromium قدیمی‌تر، مانند نسخه‌ای که به‌عنوان `goog:chromeOptions.binary` تنظیم شده است، WebdriverIO Chromedriver همراه با یک [انتشار Electron](https://github.com/electron/electron/releases) را دانلود می‌کند که با نسخه اصلی (major) مورد نیاز Chromium مطابقت دارد. این دانلود حتی زمانی که `CHROMEDRIVER_CDNURL` تنظیم شده باشد از GitHub انجام می‌شود، زیرا Chrome for Testing هیچ Chromedriver `linux-arm64` پایین‌تر از `153.0.8001.0` ندارد که یک mirror بتواند ارائه دهد؛ در حالت آفلاین، از Chromium و درایور توزیع خود همان‌طور که [در ادامه](#no-electron-release-ships-a-matching-chromedriver) نشان داده شده استفاده کنید.

Chrome for Testing پیش از `153.0.8001.0` هیچ بیلد مرورگر `linux-arm64` نیز ندارد، بنابراین `browserVersion` را تنها همراه با `goog:chromeOptions.binary` که به یک مرورگر ARM64 اشاره می‌کند، روی نسخه‌ای پایین‌تر از آن تنظیم کنید.

## برنامه‌های Electron

`wdio:electronVersion` روی تمام پلتفرم‌های ARM64، Chromedriver همراه با یک انتشار مشخص Electron را دانلود می‌کند. برای یک برنامه Electron، سرویس Electron این مقدار را از نسخه Electron برنامه تنظیم می‌کند. برای جزئیات بیشتر به [Capabilities](capabilities#wdioelectronversion) مراجعه کنید.

## عیب‌یابی

### هیچ انتشار Electron یک Chromedriver منطبق ارائه نمی‌دهد

چند نسخه اصلی Chromium، مانند 145، هرگز در هیچ انتشار Electron عرضه نشده‌اند. در این حالت WebdriverIO به‌جای نصب یک درایور نامنطبق، با خطا متوقف می‌شود:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

برای رفع آن:

- **از Chrome/Chromium نسخه `153.0.8001.0` یا بالاتر استفاده کنید** تا Chrome for Testing درایور را مستقیماً ارائه دهد.
- **روی Debian، از Chromium و درایور آن استفاده کنید**، که یک جفت arm64 منطبق هستند:
  ```bash
  sudo apt-get install -y chromium chromium-driver
  ```
  ```ts title="wdio.conf.ts"
  export const config: WebdriverIO.Config = {
      // ...
      capabilities: [{
          browserName: 'chrome',
          'goog:chromeOptions': { binary: '/usr/bin/chromium' },
          'wdio:chromedriverOptions': { binary: '/usr/bin/chromedriver' }
      }]
  }
  ```
- **Chromedriver خودتان را بیاورید** با استفاده از `wdio:chromedriverOptions.binary`، که دانلود را به‌طور کامل غیرفعال می‌کند.

## مطالب مرتبط

- [Driver Binaries](driverbinaries): نحوه دانلود و کش کردن درایورهای مرورگر توسط WebdriverIO، از جمله راهکار جایگزین هنگام شکست Chrome for Testing.
- [Capabilities](capabilities#wdioelectronversion): گزینه `wdio:electronVersion`.