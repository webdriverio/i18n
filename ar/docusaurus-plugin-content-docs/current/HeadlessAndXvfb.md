---
id: headless-and-xvfb
title: وضع العرض الخفي & Xvfb مع منفذ الاختبار
description: كيف يستخدم WebdriverIO خدمة Xvfb للاختبار بدون شاشة على لينكس، خيارات الإعداد، وصفات CI، واستكشاف الأخطاء وإصلاحها.
---

تشرح هذه الصفحة كيف يدعم منفذ اختبار WebdriverIO التنفيذ بدون شاشة على لينكس باستخدام Xvfb (مخزن إطارات X الافتراضي). وتغطي متى يكون Xvfb مفيدًا، وكيفية تكوينه، وكيف يعمل في CI و Docker.

## متى تستخدم Xvfb مقابل الوضع الخفي الأصلي

- استخدم الوضع الخفي الأصلي (مثل Chrome `--headless=...`) عندما يكون ذلك ممكنًا للحصول على أقل قدر من العبء الإضافي.
- استخدم Xvfb عندما:
  - تختبر Electron أو التطبيقات التي تتطلب مدير نوافذ أو بيئة سطح مكتب
  - تعتمد على GLX أو سلوكيات تعتمد على مدير النوافذ
  - تتوقع أدواتك خادم عرض (`DISPLAY`)
  - تواجه أخطاء Chromium مثل:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    خطأ تصادم دليل بيانات المستخدم يمكن أن يكون مضللًا لأنه غالبًا ما يكون نتيجة لتعطل المتصفح وإعادة تشغيله الفوري الذي يعيد استخدام نفس دليل الملف الشخصي من الحالة السابقة. ضمان عرض مستقر (مثلاً، عبر Xvfb) غالبًا ما يحل المشكلة - إذا لم يكن كذلك، يجب عليك تمرير `--user-data-dir` فريد لكل عامل.

## الإعداد

أربعة خيارات للمشغل تتحكم في سلوك Xvfb:

- `autoXvfb` (منطقي، القيمة الافتراضية: true)
  - مفتاح التبديل الرسمي للاستخدام. إذا كان `false`، فلن يستخدم المشغل أبدًا Xvfb.
  - إذا كان `true`، فقد يستخدم المشغل Xvfb عند الحاجة.

- `xvfbAutoInstall` (منطقي، القيمة الافتراضية: false)
  - تمكين التثبيت التلقائي لـ `xvfb-run` إذا كان مفقودًا
  - عندما يكون false، سيحذر المشغل ويستمر بدون تثبيت

- `xvfbAutoInstallMode` ('root' | 'sudo'، القيمة الافتراضية: 'sudo')
  - 'root': التثبيت فقط إذا كنت تعمل كمستخدم جذر (بدون sudo)
  - 'sudo': السماح بـ sudo غير التفاعلي (`sudo -n`) إذا لم تكن جذرًا؛ تخطي إذا كان sudo مفقودًا

- `xvfbAutoInstallCommand` (سلسلة | مصفوفة سلاسل، اختياري)
  - أمر مخصص للاستخدام في التثبيت بدلاً من الكشف عن مدير الحزم المدمج
  - عند توفيره، يتم تنفيذ هذا الأمر كما هو ويتجاوز منطق التثبيت المدمج

- `xvfbMaxRetries` (رقم، القيمة الافتراضية: 3)
  - عدد محاولات إعادة المحاولة لفشل عملية xvfb.
  - مفيد لبيئات CI غير المستقرة حيث قد يفشل بدء تشغيل Xvfb أحيانًا.

- `xvfbRetryDelay` (رقم، القيمة الافتراضية: 1000)
  - التأخير الأساسي بين إعادة المحاولات بالمللي ثانية لفشل عملية xvfb.
  - يستخدم تأخيرًا تصاعديًا: التأخير × رقم المحاولة (مثل، 1000 مللي ثانية، 2000 مللي ثانية، 3000 مللي ثانية، إلخ.).

أمثلة:

```ts
export const config: WebdriverIO.Config = {
  // Use Xvfb when needed
  autoXvfb: true,

  // Auto-install Xvfb packages using sudo
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
  // Use Xvfb when needed
  autoXvfb: true,

  // Auto-install Xvfb packages using a custom command and sudo
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
  // Use Xvfb when needed
  autoXvfb: true,

  // Auto-install Xvfb packages using sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Configure retry behavior for flaky CI environments
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## منطق الكشف

- ينظر المشغل في استخدام Xvfb عندما:

  - يعمل على لينكس
  - لا توجد `DISPLAY` محددة (بيئة بدون شاشة)، أو يتم تمرير علامات المتصفح بدون شاشة

- إذا تم تعيين `DISPLAY`، فلن يفرض المشغل استخدام Xvfb افتراضيًا وسيحترم خادم X/مدير النافذة الحالي.

ملاحظات:
- `autoXvfb: false` يعطل استخدام Xvfb تمامًا (لا توجد لفة مع `xvfb-run`).
- `xvfbAutoInstall` يؤثر فقط على التثبيت إذا كان `xvfb-run` مفقودًا؛ لا يقوم بتشغيل/إيقاف الاستخدام.
- `xvfbAutoInstallMode` يتحكم في طريقة التثبيت: 'root' للتثبيت للجذر فقط، 'sudo' للتثبيت باستخدام sudo (الافتراضي: 'sudo').
- عمليات تثبيت الحزم المدمجة دائمًا غير تفاعلية. للجذر فقط ما لم تختار وضع 'sudo'.
- آلية إعادة المحاولة تستخدم تأخيرات تصاعدية: `xvfbRetryDelay × رقم المحاولة` (مثل، 1000 مللي ثانية، 2000 مللي ثانية، 3000 مللي ثانية، إلخ.).

## استخدام DISPLAY موجود في CI

إذا كان CI الخاص بك يقوم بإعداد خادم X/مدير نوافذ خاص به (مثل، مع `Xvfb :99` و WM)، فإما:

- اترك `autoXvfb: true` وتأكد من تصدير `DISPLAY`؛ سيحترمه المشغل ويتجنب اللف.
- أو قم بتعيين `autoXvfb: false` لتعطيل أي سلوك Xvfb من المشغل بشكل صريح.

## وصفات CI و Docker

GitHub Actions (باستخدام الوضع الخفي الأصلي):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (عرض افتراضي عبر Xvfb إذا كان مفقودًا وتم اختياره):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (مثال Ubuntu/Debian – تثبيت xvfb مسبقًا):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

بالنسبة للتوزيعات الأخرى، قم بتعديل مدير الحزم واسم الحزمة وفقًا لذلك (مثل، `dnf install xorg-x11-server-Xvfb` على Fedora/RHEL، `zypper install xvfb-run` على openSUSE/SLE).

## دعم التثبيت التلقائي (xvfbAutoInstall)

عندما يتم تمكين `xvfbAutoInstall`، يحاول WebdriverIO تثبيت `xvfb` باستخدام مدير حزم النظام الخاص بك. يتم دعم مديري الحزم والحزم التالية:

| مدير الحزم    | الأمر            | التوزيعات (أمثلة)                                           | اسم الحزمة (الحزم)              |
|-----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt             | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, etc.      | `xvfb`                           |
| dnf             | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, etc.       | `xorg-x11-server-Xvfb`           |
| yum             | `yum`           | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper          | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman          | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, etc.             | `xorg-server-xvfb`               |
| apk             | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install    | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

ملاحظات:
- إذا كانت بيئتك تستخدم مدير حزم مختلف، فسيفشل التثبيت مع خطأ؛ قم بتثبيت `xvfb` يدويًا.
- أسماء الحزم خاصة بالتوزيعة؛ يعكس الجدول الأسماء الشائعة لكل عائلة.

## استكشاف الأخطاء وإصلاحها

- "فشل xvfb-run في البدء"
  - يعيد المشغل تلقائيًا محاولة حالات الفشل المتعلقة بـ Xvfb مع تراجع تدريجي. إذا استمرت حالات الفشل، قم بزيادة `xvfbMaxRetries` و `xvfbRetryDelay` للبيئات غير المستقرة.

- Xvfb تم لفه بشكل غير متوقع في CI
  - إذا كان لديك إعداد مخصص لـ `DISPLAY` / WM، قم بتعيين `autoXvfb: false` أو تأكد من تصدير `DISPLAY` قبل بدء المشغل.

- `xvfb-run` مفقود
  - أبق على `xvfbAutoInstall: false` لتجنب تعديل البيئة؛ قم بالتثبيت عبر الصورة الأساسية الخاصة بك أو قم بتعيين `xvfbAutoInstall: true` للاشتراك.

- حالات فشل متكررة في بدء تشغيل Xvfb في CI
  - قم بزيادة `xvfbMaxRetries` (مثلاً، إلى 5-10) و `xvfbRetryDelay` (مثلاً، إلى 2000 مللي ثانية) للحصول على سلوك أكثر مرونة في البيئات غير المستقرة.

## متقدم

- ينشئ المشغل عمليات عبر مصنع يلف عامل node بـ `xvfb-run` إذا كان Xvfb مطلوبًا ومتاحًا.
- تشير علامات المتصفح بدون شاشة (Chrome/Edge/Firefox) إلى استخدام وضع بدون شاشة ويمكن أن تؤدي إلى تشغيل Xvfb في البيئات بدون `DISPLAY`.