---
id: headless-and-xvfb
title: هدلس و Xvfb با تست‌رانر
description: چگونه WebdriverIO از Xvfb برای تست هدلس در لینوکس استفاده می‌کند، گزینه‌های پیکربندی، دستورالعمل‌های CI و عیب‌یابی.
---

این صفحه توضیح می‌دهد چگونه تست‌رانر WebdriverIO از اجرای هدلس در لینوکس با استفاده از Xvfb (فریم‌بافر مجازی X) پشتیبانی می‌کند. این صفحه شامل زمان مفید بودن Xvfb، نحوه پیکربندی آن و رفتار آن در CI و Docker است.

## چه زمانی از Xvfb در مقابل حالت هدلس بومی استفاده کنیم

- در صورت امکان از هدلس بومی (مانند Chrome با `--headless=...`) برای حداقل سربار استفاده کنید.
- از Xvfb در موارد زیر استفاده کنید:
  - تست الکترون یا برنامه‌هایی که به مدیر پنجره یا محیط دسکتاپ نیاز دارند
  - زمانی که به GLX یا رفتارهای وابسته به مدیر پنجره متکی هستید
  - زمانی که ابزارهای شما انتظار سرور نمایش (`DISPLAY`) را دارند
  - وقتی با خطاهای کرومیوم مانند موارد زیر مواجه می‌شوید:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    خطای برخورد دایرکتوری داده‌های کاربر می‌تواند گمراه‌کننده باشد، زیرا اغلب نتیجه فروپاشی مرورگر و راه‌اندازی مجدد فوری است که همان دایرکتوری پروفایل از نمونه قبلی را دوباره استفاده می‌کند. اطمینان از یک نمایش پایدار (مثلاً از طریق Xvfb) اغلب آن را حل می‌کند - اگر نه، باید یک `--user-data-dir` منحصر به فرد برای هر کارگر تعیین کنید.

## پیکربندی

چهار گزینه اجرا کننده، رفتار Xvfb را کنترل می‌کنند:

- `autoXvfb` (بولین، پیش‌فرض: true)
  - کلید اصلی برای استفاده. اگر `false` باشد، اجرا کننده هرگز از Xvfb استفاده نمی‌کند.
  - اگر `true` باشد، اجرا کننده ممکن است در صورت نیاز از Xvfb استفاده کند.

- `xvfbAutoInstall` (بولین، پیش‌فرض: false)
  - فعال‌سازی نصب خودکار `xvfb-run` در صورت عدم وجود
  - در صورت false بودن، اجرا کننده هشدار می‌دهد و بدون نصب ادامه می‌دهد

- `xvfbAutoInstallMode` ('root' | 'sudo'، پیش‌فرض: 'sudo')
  - 'root': فقط اگر به عنوان root اجرا می‌شود نصب کند (بدون sudo)
  - 'sudo': اجازه sudo غیر تعاملی (`sudo -n`) را در صورت عدم وجود root می‌دهد؛ اگر sudo وجود نداشته باشد رد می‌شود

- `xvfbAutoInstallCommand` (رشته | آرایه رشته، اختیاری)
  - دستور سفارشی برای استفاده در نصب به جای تشخیص مدیر بسته داخلی
  - وقتی ارائه شود، این دستور همانطور که هست اجرا می‌شود و منطق نصب داخلی را نادیده می‌گیرد

- `xvfbMaxRetries` (عدد، پیش‌فرض: 3)
  - تعداد تلاش‌های مجدد برای شکست‌های فرآیند xvfb.
  - برای محیط‌های CI ناپایدار که راه‌اندازی Xvfb ممکن است گاهی اوقات با شکست مواجه شود، مفید است.

- `xvfbRetryDelay` (عدد، پیش‌فرض: 1000)
  - تأخیر پایه بین تلاش‌های مجدد بر حسب میلی‌ثانیه برای شکست‌های فرآیند xvfb.
  - از تأخیر پیشرونده استفاده می‌کند: تأخیر × شماره تلاش (مثلاً 1000 میلی‌ثانیه، 2000 میلی‌ثانیه، 3000 میلی‌ثانیه و غیره).

مثال‌ها:

```ts
export const config: WebdriverIO.Config = {
  // استفاده از Xvfb در صورت نیاز
  autoXvfb: true,

  // نصب خودکار بسته‌های Xvfb با استفاده از sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // استفاده از Xvfb در صورت نیاز
  autoXvfb: true,

  // نصب خودکار بسته‌های Xvfb با استفاده از دستور سفارشی و sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // استفاده از Xvfb در صورت نیاز
  autoXvfb: true,

  // نصب خودکار بسته‌های Xvfb با استفاده از sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // پیکربندی رفتار تلاش مجدد برای محیط‌های CI ناپایدار
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## منطق تشخیص

- اجرا کننده Xvfb را در شرایط زیر در نظر می‌گیرد:

  - اجرا در لینوکس
  - هیچ `DISPLAY` تنظیم نشده است (محیط هدلس)، یا پرچم‌های مرورگر هدلس ارسال شده‌اند

- اگر `DISPLAY` تنظیم شده باشد، اجرا کننده به طور پیش‌فرض Xvfb را اجبار نمی‌کند و به سرور X/مدیر پنجره موجود شما احترام می‌گذارد.

نکات:
- `autoXvfb: false` استفاده از Xvfb را کاملاً غیرفعال می‌کند (بدون پوشش با `xvfb-run`).
- `xvfbAutoInstall` فقط بر نصب در صورت عدم وجود `xvfb-run` تأثیر می‌گذارد؛ استفاده را روشن/خاموش نمی‌کند.
- `xvfbAutoInstallMode` روش نصب را کنترل می‌کند: 'root' برای نصب‌های فقط root، 'sudo' برای نصب‌های مبتنی بر sudo (پیش‌فرض: 'sudo').
- نصب‌های بسته داخلی همیشه غیر تعاملی هستند. فقط root مگر اینکه شما حالت 'sudo' را انتخاب کنید.
- مکانیسم تلاش مجدد از تأخیرهای پیشرونده استفاده می‌کند: `xvfbRetryDelay × شماره تلاش` (مثلاً 1000 میلی‌ثانیه، 2000 میلی‌ثانیه، 3000 میلی‌ثانیه و غیره).

## استفاده از DISPLAY موجود در CI

اگر CI شما سرور X/مدیر پنجره خود را راه‌اندازی می‌کند (مثلاً با `Xvfb :99` و یک WM)، یکی از موارد زیر را انجام دهید:

- `autoXvfb: true` را حفظ کنید و اطمینان حاصل کنید که `DISPLAY` صادر شده است؛ اجرا کننده به آن احترام می‌گذارد و از پوشش اجتناب می‌کند.
- یا `autoXvfb: false` را تنظیم کنید تا به صراحت هر رفتار Xvfb از اجرا کننده را غیرفعال کنید.

## دستورالعمل‌های CI و Docker

GitHub Actions (با استفاده از هدلس بومی):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (نمایش مجازی از طریق Xvfb در صورت عدم وجود و انتخاب):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (مثال Ubuntu/Debian – نصب از پیش xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

برای توزیع‌های دیگر، مدیر بسته و نام بسته را متناسب با آن تنظیم کنید (مثلاً `dnf install xorg-x11-server-Xvfb` در Fedora/مبتنی بر RHEL، `zypper install xvfb-run` در openSUSE/SLE).

## پشتیبانی نصب خودکار (xvfbAutoInstall)

وقتی `xvfbAutoInstall` فعال است، WebdriverIO تلاش می‌کند `xvfb` را با استفاده از مدیر بسته سیستم شما نصب کند. مدیران و بسته‌های زیر پشتیبانی می‌شوند:

| مدیر بسته | دستور | توزیع‌ها (مثال‌ها) | نام بسته(ها) |
|-----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt | `apt-get` | Ubuntu، Debian، Pop!_OS، Mint، Elementary، Zorin و غیره | `xvfb` |
| dnf | `dnf` | Fedora، Rocky Linux، AlmaLinux، Nobara، Bazzite و غیره | `xorg-x11-server-Xvfb` |
| yum | `yum` | CentOS، RHEL (قدیمی) | `xorg-x11-server-Xvfb` |
| zypper | `zypper` | openSUSE، SUSE Linux Enterprise | `xvfb-run` |
| pacman | `pacman` | Arch Linux، Manjaro، EndeavourOS، CachyOS و غیره | `xorg-server-xvfb` |
| apk | `apk` | Alpine Linux، PostmarketOS | `xvfb-run` |
| xbps-install | `xbps-install` | Void Linux | `xvfb` |

نکات:
- اگر محیط شما از مدیر بسته متفاوتی استفاده می‌کند، نصب با خطا مواجه می‌شود؛ `xvfb` را به صورت دستی نصب کنید.
- نام‌های بسته مختص به توزیع هستند؛ جدول نام‌های معمول هر خانواده را نشان می‌دهد.

## عیب‌یابی

- "xvfb-run failed to start"
  - اجرا کننده به طور خودکار شکست‌های مرتبط با Xvfb را با پس‌گرد پیشرونده دوباره امتحان می‌کند. اگر شکست‌ها ادامه یابد، `xvfbMaxRetries` و `xvfbRetryDelay` را برای محیط‌های ناپایدار افزایش دهید.

- Xvfb به طور غیرمنتظره در CI پوشش داده شد
  - اگر تنظیمات سفارشی `DISPLAY` / WM دارید، `autoXvfb: false` را تنظیم کنید یا اطمینان حاصل کنید که `DISPLAY` قبل از شروع اجرا کننده صادر شده است.

- `xvfb-run` موجود نیست
  - `xvfbAutoInstall: false` را نگه دارید تا از تغییر محیط جلوگیری شود؛ از طریق تصویر پایه خود نصب کنید یا `xvfbAutoInstall: true` را تنظیم کنید تا انتخاب کنید.

- شکست‌های مکرر راه‌اندازی Xvfb در CI
  - `xvfbMaxRetries` (مثلاً به 5-10) و `xvfbRetryDelay` (مثلاً به 2000 میلی‌ثانیه) را برای رفتار مقاوم‌تر در محیط‌های ناپایدار افزایش دهید.

## پیشرفته

- اجرا کننده فرآیندها را از طریق یک کارخانه ایجاد می‌کند که کارگر نود را با `xvfb-run` پوشش می‌دهد اگر Xvfb مورد نیاز و در دسترس باشد.
- پرچم‌های مرورگر هدلس (Chrome/Edge/Firefox) استفاده از هدلس را نشان می‌دهند و می‌توانند Xvfb را در محیط‌های بدون `DISPLAY` فعال کنند.