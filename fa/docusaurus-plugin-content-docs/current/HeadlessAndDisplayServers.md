---
id: headless-and-display-servers
title: حالت Headless و سرورهای نمایش
description: اجرای مرورگرهای headed و برنامه‌های دسکتاپ روی CI لینوکس و در کانتینرها با نمایشگر مجازی Weston یا Xvfb که testrunner راه‌اندازی می‌کند، به همراه گزینه‌ها، دستورالعمل‌های CI و عیب‌یابی.
---

در لینوکس، وقتی هیچ نمایشگری در دسترس نباشد، testrunner یک سرور نمایش مجازی برای اجرا راه‌اندازی می‌کند: [Weston](https://gitlab.freedesktop.org/wayland/weston) در حالت headless، یا [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer) به‌عنوان جایگزین. این صفحه توضیح می‌دهد این اتفاق چه زمانی رخ می‌دهد، چگونه آن را پیکربندی کنید و در CI و Docker چگونه رفتار می‌کند. در بیشتر پیکربندی‌ها، تنها چیزی که نیاز دارید نصب بودن Weston یا Xvfb در image شما، یا `displayServerAutoInstall: true` در پیکربندی‌تان است.

## چه زمانی از نمایشگر مجازی و چه زمانی از headless بومی استفاده کنیم

نمایشگر مجازی به مرورگرها و برنامه‌ها صفحه‌نمایشی می‌دهد در جایی که هیچ صفحه‌نمایشی وجود ندارد، مانند runnerهای CI و کانتینرها. آن را نگه دارید وقتی:

- برنامه‌های دسکتاپ را تست می‌کنید که به یک پنجرهٔ واقعی نیاز دارند.
- تست‌های شما به یک مرورگر headed نیاز دارند، برای مثال برای تطبیق با تصاویر مرجع (screenshot baselines) که با یک مرورگر قابل‌مشاهده گرفته شده‌اند.
- Chrome با خطای `DevToolsActivePort file doesn't exist` یا `user data directory is already in use` اجرا نمی‌شود، همان‌طور که در [عیب‌یابی](#troubleshooting) توضیح داده شده است.

برای تست‌های مرورگری که به پنجرهٔ قابل‌مشاهده نیاز ندارند، حالت headless بومی، مانند `--headless=new` در Chrome، سربار کمتری دارد. همراه با آن `displayServerEnabled: false` را تنظیم کنید، وگرنه testrunner همچنان یک سرور نمایش راه‌اندازی می‌کند. همین کار را زمانی انجام دهید که همهٔ مرورگرهای شما روی یک سرویس ابری یا یک grid راه دور اجرا می‌شوند، چون هیچ چیز محلی به نمایشگر نیاز ندارد.

## نحوهٔ کار

testrunner پیش از هوک `onPrepare` هر سرویسی، یک سرور نمایش راه‌اندازی می‌کند و متغیرهای محیطی آن را روی `process.env` تنظیم می‌کند:

| متغیر | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | تنظیم نمی‌شود |
| `DISPLAY` | تنظیم نمی‌شود | اولین نمایشگر آزاد، مانند `:0` |
| `XDG_RUNTIME_DIR` | یک دایرکتوری خصوصی زیر `/tmp` برای اجرا | بدون تغییر |
| `XDG_SESSION_TYPE`، `GDK_BACKEND`، `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

workerها این متغیرها را به ارث می‌برند، و همین‌طور درایورها و برنامه‌هایی که سرویس‌ها در `onPrepare` راه‌اندازی می‌کنند. مرورگرها و toolkitهای رابط گرافیکی بر اساس این متغیرها Wayland یا X11 را انتخاب می‌کنند. تحت Weston، `XDG_RUNTIME_DIR` خصوصی جایگزین هر مقداری می‌شود که برای اجرا داشتید.

سرور نمایش تا پایان هوک‌های `onComplete` در حال اجرا می‌ماند، بنابراین سرویس‌ها هنگام پاک‌سازی همچنان می‌توانند از آن استفاده کنند. سپس testrunner آن را متوقف می‌کند و مقادیر قبلی را بازمی‌گرداند. اگر فرایند زودتر خاتمه یابد، از جمله با Ctrl+C، سرور نمایش نیز همراه با آن متوقف می‌شود.

testrunner فقط زمانی سرور نمایش راه‌اندازی می‌کند که همهٔ این شرایط برقرار باشند:

- روی لینوکس اجرا شود.
- نه `DISPLAY` و نه `WAYLAND_DISPLAY` تنظیم شده باشند.
- `displayServerEnabled` برابر `false` نباشد.

اگر نمایشگری از قبل وجود داشته باشد، testrunner از آن استفاده می‌کند و چیزی راه‌اندازی نمی‌کند. وقتی فقط `WAYLAND_DISPLAY` تنظیم شده باشد، برای مثال توسط Westonی که CI شما راه‌اندازی می‌کند، testrunner همچنان `XDG_SESSION_TYPE`، `GDK_BACKEND` و `ELECTRON_OZONE_PLATFORM_HINT` را برای اجرا روی `wayland` تنظیم می‌کند. این کار با بازنویسی مقادیر به‌ارث‌رسیده، مانند `XDG_SESSION_TYPE=tty` از یک ورود SSH، که مرورگرها را به سمت X11 (جایی که سروری وجود ندارد) می‌فرستند، تضمین می‌کند که مرورگرها از نمایشگر درست استفاده کنند. این کار حتی با `displayServerEnabled: false` نیز انجام می‌شود، چون این گزینه فقط کنترل می‌کند که آیا سرور نمایش راه‌اندازی شود یا نه.

### کدام سرور نمایش استفاده می‌شود

با مقدار پیش‌فرض `displayServer: 'auto'`، testrunner ابتدا Weston و سپس Xvfb را امتحان می‌کند. سرورهای نصب‌شده پیش از نصب هر چیزی امتحان می‌شوند، بنابراین به‌جای نصب Weston از Xvfb موجود استفاده می‌شود. اگر Weston راه‌اندازی نشود، testrunner به Xvfb روی می‌آورد. اگر هیچ سرور نمایشی راه‌اندازی نشود، testrunner یک هشدار ثبت می‌کند و اجرا بدون آن ادامه می‌یابد. با `displayServer: 'wayland'` یا `displayServer: 'xvfb'`، testrunner فقط همان سرور را امتحان می‌کند.

Weston نسخهٔ 10 و بالاتر پشتیبانی می‌شود. Ubuntu 22.04 و Debian 11 همراه با Weston 9 عرضه می‌شوند و Enterprise Linux 9 با EPEL فعال، Weston 8 دریافت می‌کند، بنابراین در آن‌ها `displayServer: 'xvfb'` را تنظیم کنید. Weston بدون Xwayland راه‌اندازی می‌شود، بنابراین هیچ `DISPLAY`ی فراهم نمی‌کند. اگر تست‌ها یا ابزارهای شما به X11 نیاز دارند، برای مثال `xdotool`، `xclip` یا یک برنامهٔ Java، `displayServer: 'xvfb'` را تنظیم کنید.

### فوکوس پنجره

همهٔ workerها از یک نمایشگر مشترک استفاده می‌کنند. در WebdriverIO v9، هر worker درون `xvfb-run` قرار می‌گرفت و نمایشگر مخصوص خود را داشت، بنابراین مرورگرش همیشه فوکوس داشت. اکنون مرورگرهای مبتنی بر Chromium مانند Chrome و Edge ممکن است فوکوس نداشته باشند: تحت Weston هیچ پنجره‌ای فوکوس نمی‌گیرد، و تحت Xvfb فقط آخرین پنجرهٔ باز شده فوکوس دارد. ورودی WebDriver همچنان به صفحه می‌رسد، اما `document.hasFocus()` مقدار `false` برمی‌گرداند، رویدادهای `focus` اجرا نمی‌شوند و استایل‌های `:focus` اعمال نمی‌شوند. اگر تست‌های شما به فوکوس وابسته‌اند، شبیه‌سازی فوکوس را فعال کنید؛ این یک فرمان آزمایشی Chrome DevTools Protocol (CDP) است که در بارگذاری‌های صفحه پایدار می‌ماند:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

Firefox تحت تأثیر قرار نمی‌گیرد، چون تحت WebDriver صفحات خود را فوکوس‌شده در نظر می‌گیرد.

### اسکریپت‌های مستقل

testrunner خودش سرور نمایش را راه‌اندازی می‌کند. یک اسکریپت مستقل که `remote()` را فراخوانی می‌کند می‌تواند با `startDisplayDaemonFromConfig` از `@wdio/display-server` یک سرور نمایش راه‌اندازی کند. این تابع همان گزینه‌های `displayServer*` را می‌پذیرد، متغیرهای نمایشگر را روی `process.env` تنظیم می‌کند تا مرورگر آن‌ها را به ارث ببرد، و در `stop()` آن‌ها را بازمی‌گرداند:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// خارج از لینوکس، زمانی که یک نمایشگر X11 از قبل وجود دارد، یا زمانی که هیچ‌کدام راه‌اندازی نمی‌شود، null برمی‌گرداند. با یک نمایشگر
// Wayland موجود، یک handle برمی‌گرداند که stop() آن متغیرهای session تنظیم‌شده را بازمی‌گرداند.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

همچنین می‌توانید اسکریپت را تحت `xvfb-run` اجرا کنید، همان‌طور که در [استفاده از یک نمایشگر موجود](#using-an-existing-display) آمده است.

## راه‌اندازی مرورگر

### مرورگرهایی که WebdriverIO اجرا می‌کند

این مرورگرها به هیچ پیکربندی نیاز ندارند:

- Chrome و Edge نسخهٔ 140 و بالاتر، و Chrome for Testing نسخهٔ 135 و بالاتر، از `XDG_SESSION_TYPE=wayland` که سرور نمایش تنظیم می‌کند پیروی می‌کنند.
- نسخه‌های قدیمی‌تر Chrome و Edge، `XDG_SESSION_TYPE` را نادیده می‌گیرند. برای آن‌ها، WebdriverIO هنگامی که Wayland بدون سرور X فعال است، `--ozone-platform=wayland` را به آرگومان‌های هر Chrome و Edgeی که اجرا می‌کند اضافه می‌کند، مگر اینکه آرگومان‌ها از قبل `--ozone-platform` یا `--headless` را تنظیم کرده باشند.
- برنامه‌های Electron: Electron نسخهٔ 38 و بالاتر از `XDG_SESSION_TYPE` پیروی می‌کنند، و Electron نسخهٔ 28 تا 37 از `ELECTRON_OZONE_PLATFORM_HINT` پیروی می‌کنند که سرور نمایش آن را نیز تنظیم می‌کند. Electron نسخهٔ 27 و قدیمی‌تر به فلگ `--ozone-platform=wayland` متکی هستند که WebdriverIO هنگام اجرای برنامه از طریق Chromedriver اضافه می‌کند.
- Firefox و برنامه‌های GTK، مانند برنامه‌های Tauri، Wayland را از روی `WAYLAND_DISPLAY` و `GDK_BACKEND` انتخاب می‌کنند. Firefox پیش از نسخهٔ 120 تست نشده است.

### مرورگرهایی که WebdriverIO اجرا نمی‌کند

مرورگرهای روی یک grid یا سرویس ابری به هیچ پیکربندی نیاز ندارند، چون روی نمایشگر میزبان راه دور اجرا می‌شوند.

مرورگرهای محلی که چیز دیگری آن‌ها را اجرا می‌کند، مانند درایوری که خودتان راه‌اندازی کرده‌اید، یک سرور Appium یا launcher اختصاصی یک سرویس، فلگ `--ozone-platform=wayland` مربوط به WebdriverIO را دریافت نمی‌کنند. Chrome و Edge نسخهٔ 140 و بالاتر، و Electron نسخهٔ 28 و بالاتر، به آن نیازی ندارند، چون از متغیرهای session پیروی می‌کنند، اما نسخه‌های قدیمی‌تر Chrome و Edge به آن نیاز دارند. اینکه چه کاری انجام دهید بستگی دارد به اینکه مرورگر چه زمانی راه‌اندازی می‌شود:

- **در طول اجرا**، برای مثال از `onPrepare` یک سرویس، مرورگرهای جدیدتر به چیزی نیاز ندارند، چون نمایشگر و متغیرهای session را به ارث می‌برند. برای نسخه‌های قدیمی‌تر Chrome و Edge، یکی از این کارها را انجام دهید:
  - `displayServer: 'xvfb'` را برای استفاده از Xvfb تنظیم کنید، یا
  - `displayServer: 'wayland'` را تنظیم کنید و `--ozone-platform=wayland` را به آرگومان‌های آن‌ها اضافه کنید تا از Weston استفاده کنند.
- **پیش از WebdriverIO**، برای مثال از یک مرحلهٔ قبلی CI یا یک shell دیگر، این مرورگرها نمی‌توانند از سرور نمایشی که WebdriverIO راه‌اندازی می‌کند استفاده کنند، چون متغیرهای آن را به ارث نمی‌برند. نمایشگر را خودتان راه‌اندازی کنید، همان‌طور که در [استفاده از یک نمایشگر موجود](#using-an-existing-display) آمده است، و یکی از این کارها را انجام دهید:
  - از Xvfb استفاده کنید که به چیز دیگری نیاز ندارد، یا
  - از Weston استفاده کنید، سپس `XDG_SESSION_TYPE=wayland` (برای Chrome و Edge نسخهٔ 140 و بالاتر، Electron نسخهٔ 38 و بالاتر) یا `ELECTRON_OZONE_PLATFORM_HINT=wayland` (برای Electron نسخهٔ 28 تا 37) را export کنید، و `--ozone-platform=wayland` را به آرگومان‌های نسخه‌های قدیمی‌تر Chrome و Edge اضافه کنید.

## پیکربندی

همهٔ گزینه‌ها در [مرجع پیکربندی](/docs/configuration#displayserverenabled) فهرست شده‌اند. برای مثال:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // اگر هیچ سرور نمایشی نصب نیست، یکی نصب کن
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // همیشه از Xvfb با اندازهٔ کوچک‌تر استفاده کن، که با یک فرمان سفارشی نصب می‌شود و فرض می‌کند کانتینر با دسترسی root اجرا می‌شود
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

فرمان سفارشی بین هر دو سرور مشترک است. با `displayServer: 'auto'`، ابتدا برای Weston اجرا می‌شود، و فقط در صورتی دوباره برای Xvfb اجرا می‌شود که Weston همچنان در دسترس نباشد یا راه‌اندازی نشود و Xvfb نیز همچنان موجود نباشد. همان‌طور که این مثال انجام می‌دهد، `displayServer` را روی سروری تنظیم کنید که فرمان شما نصب می‌کند.

گزینه‌های `autoXvfb` و `xvfb*` از v9 منسوخ شده‌اند و در v11 حذف خواهند شد. برای جایگزین‌های آن‌ها به [راهنمای مهاجرت به v10](/docs/v10-migration#virtual-displays-on-linux) مراجعه کنید.

## CI و Docker

یک سرور نمایش را از پیش در image خود نصب کنید، یا `displayServerAutoInstall: true` را تنظیم کنید تا هنگام شروع اجرا یکی نصب شود.

### نصب از پیش یک سرور نمایش

#### Weston

روی Ubuntu 24.04 یا Debian 12 و بالاتر:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

روی RHEL 10 و Oracle Linux 10، مطابق [مستندات EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/) خودتان EPEL و CodeReady Builder را فعال کنید، سپس `weston` را نصب کنید.

برای قرار دادن testrunner درون یک Weston اختصاصی، همان‌طور که در [استفاده از یک نمایشگر موجود](#using-an-existing-display) آمده است، `xwayland-run` را نیز نصب کنید. این بسته برای Debian 13، Ubuntu 24.04، Fedora و openSUSE Tumbleweed موجود است. بدون آن، باید Weston را در پس‌زمینه با `XDG_RUNTIME_DIR` و `WAYLAND_DISPLAY` مخصوص خودش راه‌اندازی کنید و پیش از اجرای WebdriverIO منتظر socket آن بمانید. به‌عنوان جایگزین، از Xvfb استفاده کنید.

#### Xvfb

روی Ubuntu یا Debian:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04 و Debian 11 نسخه‌ای از Weston را عرضه می‌کنند که بیش از حد قدیمی است، بنابراین در آن‌ها از Xvfb استفاده کنید. وقتی فقط Xvfb نصب باشد، testrunner بدون پیکربندی بیشتر از آن استفاده می‌کند.

برای توزیع‌های دیگر، از نام بسته‌ها در [پشتیبانی از نصب خودکار](#automatic-installation-support) استفاده کنید.

### استفاده از یک نمایشگر موجود

اگر CI شما از قبل یک نمایشگر فراهم می‌کند، testrunner از آن استفاده می‌کند و چیزی راه‌اندازی نمی‌کند.

برای استفاده از Weston، testrunner را با `wlheadless-run` از بستهٔ `xwayland-run` اجرا کنید. این ابزار به Weston یک دایرکتوری runtime خصوصی می‌دهد و منتظر socket آن می‌ماند، و فلگ‌ها با Westonی که testrunner راه‌اندازی می‌کند مطابقت دارند:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

برای استفاده از Xvfb، testrunner را با `xvfb-run` اجرا کنید:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## پشتیبانی از نصب خودکار

`displayServerAutoInstall` با مدیران بستهٔ زیر کار می‌کند. نصب‌ها غیرتعاملی هستند و پس از 240 ثانیه منقضی می‌شوند. با هر مدیر بستهٔ دیگری، سرور نمایش را خودتان نصب کنید.

| مدیر بسته | توزیع‌ها | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu، Debian | `weston` | `xvfb` |
| `dnf` | Fedora، CentOS Stream، RHEL، Rocky Linux، AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE، SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux، Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- روی Arch Linux، نصب فرمان `pacman -Syu` را اجرا می‌کند که یک ارتقای کامل سیستم است، چون Arch از ارتقای جزئی پشتیبانی نمی‌کند. روی یک image قدیمی، این کار ممکن است از محدودیت 240 ثانیه فراتر رود، بنابراین در آنجا سرور نمایش را از پیش نصب کنید.
- Enterprise Linux 10 هیچ Xvfbی ندارد و Weston را فقط در EPEL عرضه می‌کند که به CRB نیاز دارد. روی CentOS Stream، AlmaLinux و Rocky Linux، نصب هر دو را فعال می‌کند و فعال باقی می‌گذارد. روی RHEL و Oracle Linux، آن‌ها را خودتان راه‌اندازی کنید، همان‌طور که در [نصب از پیش یک سرور نمایش](#preinstalling-a-display-server) آمده است.

## لاگ‌ها

سرور نمایش در فرایند launcher اجرا می‌شود، بنابراین پیام‌های آن در لاگ launcher قرار دارند: `wdio.log` در `outputDir` شما، یا ترمینال اگر `outputDir` تنظیم نشده باشد. لاگ نشان می‌دهد کدام سرور نمایش راه‌اندازی شد و چه متغیرهایی تنظیم کرد. برای جزئیات بیشتر، سطح لاگ آن را افزایش دهید:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## عیب‌یابی

### Chrome با خطای `DevToolsActivePort file doesn't exist` اجرا نمی‌شود

پیام کامل `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)` است. یک علت رایج، Chrome در حالت headed بدون نمایشگری برای باز کردن پنجره‌اش است. [لاگ launcher](#logs) را برای سرور نمایشی که راه‌اندازی شده بررسی کنید. اگر هیچ‌کدام راه‌اندازی نشده، به [لاگ launcher پیام `No display server could be started` را نشان می‌دهد](#the-launcher-log-shows-no-display-server-could-be-started) مراجعه کنید. اگر تست‌های شما به پنجرهٔ قابل‌مشاهده نیاز ندارند، به‌جای آن از حالت headless بومی استفاده کنید، همان‌طور که در [چه زمانی از نمایشگر مجازی و چه زمانی از headless بومی استفاده کنیم](#when-to-use-a-virtual-display-vs-native-headless) آمده است.

### Chrome با خطای `user data directory is already in use` اجرا نمی‌شود

پیام کامل با `session not created: probably user data directory is already in use` شروع می‌شود. این پیام اغلب گمراه‌کننده است: معمولاً به این معناست که مرورگر از کار افتاده و با دایرکتوری پروفایل نمونهٔ قبلی دوباره راه‌اندازی شده است. یک نمایشگر پایدار اغلب این مشکل را برطرف می‌کند. در غیر این صورت، یک `--user-data-dir` یکتا برای هر worker ارسال کنید.

### لاگ launcher پیام `No display server could be started` را نشان می‌دهد

پیام کامل `No display server could be started; continuing without a virtual display` است. هیچ سرور نمایشی نصب نیست، یا هیچ‌کدام راه‌اندازی نشده است. پیام‌های پیش از آن دلیل را بیان می‌کنند:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` یا `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: هیچ چیز نصب نیست و نصب خودکار خاموش است.
- `wayland failed to start: ...` یا `xvfb failed to start: ...`: خروجی خطای سرور پس از آن می‌آید.
- `Failed to install Weston` یا `Failed to install Xvfb`: نصب ناموفق بود.
- `wayland still not found after installing` یا `xvfb still not found after installing`: نصب موفق بود اما آن سرور را فراهم نکرد، برای مثال چون یک `displayServerAutoInstallCommand` سفارشی فقط سرور دیگر را نصب می‌کند. `displayServer` را روی سروری تنظیم کنید که فرمان شما نصب می‌کند.

Weston یا Xvfb را در image خود نصب کنید، یا `displayServerAutoInstall: true` را تنظیم کنید.

### Xvfb با خطای `Failed to find a socket to listen on` خارج می‌شود

Xvfb سوکت خود را در `/tmp/.X11-unix` ایجاد می‌کند. اگر این دایرکتوری وجود دارد، باید برای کاربر تست قابل نوشتن باشد، همان‌طور که حالت `1777` این امکان را می‌دهد.

### Chrome یا Electron تحت Weston با خطای `Missing X server or $DISPLAY` اجرا نمی‌شود

مرورگر به‌جای Wayland تلاش کرده از X11 استفاده کند. اگر WebdriverIO آن را اجرا نکرده، به [مرورگرهایی که WebdriverIO اجرا نمی‌کند](#browsers-webdriverio-doesnt-launch) مراجعه کنید. در غیر این صورت، `--ozone-platform=x11` را از آرگومان‌های آن حذف کنید.

### تست‌های وابسته به فوکوس در Chrome یا Edge ناموفق هستند

`document.hasFocus()` مقدار `false` برمی‌گرداند، چون صفحات روی نمایشگر مشترک ممکن است فوکوس نداشته باشند. شبیه‌سازی فوکوس را فعال کنید، همان‌طور که در [فوکوس پنجره](#window-focus) آمده است.

### یک ابزار یا برنامهٔ X11 تحت Weston با خطای `cannot open display` یا `Can't open display` اجرا نمی‌شود

Weston هیچ `DISPLAY`ی فراهم نمی‌کند. `displayServer: 'xvfb'` را تنظیم کنید تا testrunner به‌جای آن Xvfb را راه‌اندازی کند. اگر Weston را خودتان راه‌اندازی کرده‌اید، اجرا را با `xvfb-run` انجام دهید، چون testrunner به‌جای راه‌اندازی نمایشگر جدید از نمایشگر موجود استفاده می‌کند.

## گام‌های بعدی

- مرجع [پیکربندی](/docs/configuration#displayserverenabled) برای همهٔ گزینه‌های `displayServer*`.
- [راهنمای مهاجرت به v10](/docs/v10-migration#virtual-displays-on-linux) برای جایگزین‌های گزینه‌های `autoXvfb` و `xvfb*` از v9.
- [Docker](/docs/docker) و [GitHub Actions](/docs/githubactions) برای اجرای مجموعه تست‌های شما در CI.
- [برنامه‌های دسکتاپ](/docs/platforms/desktop#linux) برای Electron، Tauri و Dioxus روی لینوکس.