---
id: headless-and-display-servers
title: الوضع بدون واجهة وخوادم العرض
description: شغّل المتصفحات بواجهة مرئية وتطبيقات سطح المكتب على أنظمة CI العاملة بلينكس وداخل الحاويات باستخدام شاشة Weston أو Xvfb الافتراضية التي يشغّلها مُشغّل الاختبارات، بما في ذلك خياراتها ووصفات CI واستكشاف الأخطاء وإصلاحها.
---

على نظام لينكس، عند عدم توفر شاشة، يشغّل مُشغّل الاختبارات (testrunner) خادم عرض افتراضيًا طوال مدة التشغيل: [Weston](https://gitlab.freedesktop.org/wayland/weston) في الوضع بدون واجهة (headless)، أو [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer) كخيار احتياطي. تتناول هذه الصفحة متى يحدث ذلك، وكيفية إعداده، وكيف يتصرف في بيئات CI وDocker. في معظم الإعدادات، كل ما تحتاجه هو تثبيت Weston أو Xvfb في صورتك، أو ضبط `displayServerAutoInstall: true` في ملف الإعداد.

## متى تستخدم شاشة افتراضية مقابل الوضع الأصلي بدون واجهة

توفّر الشاشة الافتراضية للمتصفحات والتطبيقات شاشةً حيث لا توجد شاشة، كما هو الحال في مُشغّلات CI وداخل الحاويات. احتفظ بها عندما:

- تختبر تطبيقات سطح المكتب، التي تحتاج إلى نافذة حقيقية.
- تحتاج اختباراتك إلى متصفح بواجهة مرئية، على سبيل المثال لمطابقة لقطات الشاشة المرجعية المأخوذة بمتصفح مرئي.
- يفشل Chrome في البدء مع الخطأ `DevToolsActivePort file doesn't exist` أو `user data directory is already in use`، كما هو موضح في [استكشاف الأخطاء وإصلاحها](#troubleshooting).

بالنسبة لاختبارات المتصفح التي لا تحتاج إلى نافذة مرئية، فإن الوضع الأصلي بدون واجهة، مثل `--headless=new` في Chrome، يستهلك موارد أقل. اضبط `displayServerEnabled: false` معه، وإلا سيظل مُشغّل الاختبارات يشغّل خادم عرض. افعل الشيء نفسه عندما تعمل جميع متصفحاتك على خدمة سحابية أو شبكة (grid) بعيدة، إذ لا يحتاج أي شيء محلي إلى شاشة.

## كيف يعمل

يشغّل مُشغّل الاختبارات خادم عرض واحدًا قبل خطاف `onPrepare` لأي خدمة، ويضبط متغيرات البيئة الخاصة به على `process.env`:

| المتغير | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | غير مضبوط |
| `DISPLAY` | غير مضبوط | أول شاشة متاحة، مثل `:0` |
| `XDG_RUNTIME_DIR` | مجلد خاص تحت `/tmp` لهذا التشغيل | دون تغيير |
| `XDG_SESSION_TYPE`، `GDK_BACKEND`، `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

ترث العمليات العاملة (workers) هذه المتغيرات، وكذلك المشغّلات (drivers) والتطبيقات التي تشغّلها الخدمات في `onPrepare`. تختار المتصفحات ومجموعات أدوات الواجهات الرسومية Wayland أو X11 بناءً عليها. في ظل Weston، يحل `XDG_RUNTIME_DIR` الخاص محل أي قيمة كانت لديك طوال مدة التشغيل.

يظل خادم العرض قيد التشغيل حتى تنتهي خطافات `onComplete`، بحيث يمكن للخدمات الاستمرار في استخدامه أثناء إنهاء عملها. بعد ذلك يوقفه مُشغّل الاختبارات ويستعيد القيم السابقة. إذا انتهت العملية قبل ذلك، بما في ذلك عند الضغط على Ctrl+C، يُنهى خادم العرض معها.

لا يشغّل مُشغّل الاختبارات خادم عرض إلا عند تحقق جميع ما يلي:

- يعمل على نظام لينكس.
- لم يُضبط أي من `DISPLAY` أو `WAYLAND_DISPLAY`.
- قيمة `displayServerEnabled` ليست `false`.

إذا كانت هناك شاشة موجودة بالفعل، يستخدمها مُشغّل الاختبارات ولا يشغّل شيئًا. عند ضبط `WAYLAND_DISPLAY` فقط، على سبيل المثال بواسطة Weston يشغّله نظام CI لديك، يظل مُشغّل الاختبارات يضبط `XDG_SESSION_TYPE` و`GDK_BACKEND` و`ELECTRON_OZONE_PLATFORM_HINT` على `wayland` طوال مدة التشغيل. يضمن ذلك استخدام المتصفحات للشاشة الصحيحة عبر تجاوز القيم الموروثة، مثل `XDG_SESSION_TYPE=tty` القادمة من تسجيل دخول SSH، والتي قد توجّهها إلى X11 حيث لا يوجد خادم. ويفعل ذلك حتى مع `displayServerEnabled: false`، الذي يتحكم فقط في ما إذا كان خادم العرض سيبدأ أم لا.

### أي خادم عرض يُستخدم

مع القيمة الافتراضية `displayServer: 'auto'`، يجرّب مُشغّل الاختبارات Weston أولًا ثم Xvfb ثانيًا. تُجرَّب الخوادم المثبتة قبل تثبيت أي شيء، لذا يُستخدم Xvfb الموجود بدلًا من تثبيت Weston. إذا فشل Weston في البدء، يلجأ مُشغّل الاختبارات إلى Xvfb. إذا لم يبدأ أي خادم عرض، يسجّل مُشغّل الاختبارات تحذيرًا ويستمر التشغيل بدونه. مع `displayServer: 'wayland'` أو `displayServer: 'xvfb'`، لا يجرّب مُشغّل الاختبارات سوى ذلك الخادم.

الإصدار 10 من Weston وما بعده مدعوم. يأتي Ubuntu 22.04 وDebian 11 مع Weston 9، ويحصل Enterprise Linux 9 مع تفعيل EPEL على Weston 8، لذا اضبط `displayServer: 'xvfb'` هناك. يبدأ Weston بدون Xwayland، لذا لا يوفّر `DISPLAY`. إذا كانت اختباراتك أو أدواتك تحتاج إلى X11، مثل `xdotool` أو `xclip` أو تطبيق Java، فاضبط `displayServer: 'xvfb'`.

### تركيز النافذة

تستخدم جميع العمليات العاملة الشاشة نفسها. في WebdriverIO v9، كانت كل عملية عاملة مغلّفة بـ `xvfb-run` وتحصل على شاشة خاصة بها، لذا كان متصفحها يملك التركيز دائمًا. أما الآن فقد تفتقر المتصفحات المبنية على Chromium مثل Chrome وEdge إلى التركيز: في ظل Weston لا تحصل أي نافذة على التركيز، وفي ظل Xvfb لا يملكه سوى أحدث نافذة فُتحت. يظل إدخال WebDriver يصل إلى الصفحة، لكن `document.hasFocus()` تُرجع `false`، ولا تنطلق أحداث `focus`، ولا تُطبَّق أنماط `:focus`. إذا كانت اختباراتك تعتمد على التركيز، ففعّل محاكاة التركيز، وهو أمر تجريبي في بروتوكول Chrome DevTools (CDP) يستمر عبر عمليات تحميل الصفحات:

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

لا يتأثر Firefox، إذ يعامل صفحاته على أنها تملك التركيز في ظل WebDriver.

### السكربتات المستقلة

يشغّل مُشغّل الاختبارات خادم العرض بنفسه. يمكن للسكربت المستقل الذي يستدعي `remote()` تشغيل خادم عرض باستخدام `startDisplayDaemonFromConfig` من `@wdio/display-server`. تقبل هذه الدالة خيارات `displayServer*` نفسها، وتضبط متغيرات الشاشة على `process.env` ليرثها المتصفح، وتستعيدها عند استدعاء `stop()`:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// تُرجع null خارج لينكس، أو عند وجود شاشة X11 بالفعل، أو عندما لا يبدأ أي خادم. مع وجود شاشة
// Wayland، تُرجع مقبضًا تستعيد دالة stop() الخاصة به متغيرات الجلسة التي ضبطها.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

يمكنك أيضًا تشغيل السكربت تحت `xvfb-run`، كما في [استخدام شاشة موجودة](#using-an-existing-display).

## إعداد المتصفح

### المتصفحات التي يشغّلها WebdriverIO

لا تحتاج هذه المتصفحات إلى أي إعداد:

- يتبع Chrome وEdge الإصدار 140 وما بعده، وChrome for Testing الإصدار 135 وما بعده، قيمة `XDG_SESSION_TYPE=wayland` التي يضبطها خادم العرض.
- تتجاهل الإصدارات الأقدم من Chrome وEdge المتغير `XDG_SESSION_TYPE`. ولأجلها، يضيف WebdriverIO الخيار `--ozone-platform=wayland` إلى وسائط كل نسخة من Chrome وEdge يشغّلها بينما يعمل Wayland بدون خادم X، ما لم تكن الوسائط تضبط `--ozone-platform` أو `--headless` بالفعل.
- تطبيقات Electron: يتبع Electron الإصدار 38 وما بعده `XDG_SESSION_TYPE`، ويتبع Electron من 28 إلى 37 `ELECTRON_OZONE_PLATFORM_HINT`، الذي يضبطه خادم العرض أيضًا. يعتمد Electron الإصدار 27 وما قبله على الخيار `--ozone-platform=wayland`، الذي يضيفه WebdriverIO عند تشغيل التطبيق عبر Chromedriver.
- يختار Firefox وتطبيقات GTK، مثل تطبيقات Tauri، Wayland بناءً على `WAYLAND_DISPLAY` و`GDK_BACKEND`. لم يُختبر Firefox قبل الإصدار 120.

### المتصفحات التي لا يشغّلها WebdriverIO

لا تحتاج المتصفحات العاملة على شبكة (grid) أو خدمة سحابية إلى أي إعداد، إذ تعمل على شاشة المضيف البعيد.

أما المتصفحات المحلية التي يشغّلها شيء آخر، مثل مشغّل (driver) شغّلته بنفسك، أو خادم Appium، أو المُطلِق الخاص بخدمة ما، فلا تحصل على الخيار `--ozone-platform=wayland` من WebdriverIO. لا يحتاج إليه Chrome وEdge الإصدار 140 وما بعده، وElectron الإصدار 28 وما بعده، إذ تتبع متغيرات الجلسة، لكن الإصدارات الأقدم من Chrome وEdge تحتاج إليه. ما ينبغي فعله يعتمد على توقيت بدء المتصفح:

- **أثناء التشغيل**، على سبيل المثال من `onPrepare` الخاص بخدمة ما، لا تحتاج المتصفحات الأحدث إلى شيء، إذ ترث الشاشة ومتغيرات الجلسة. أما بالنسبة للإصدارات الأقدم من Chrome وEdge، فإما:
  - اضبط `displayServer: 'xvfb'` لاستخدام Xvfb، أو
  - اضبط `displayServer: 'wayland'` وأضف `--ozone-platform=wayland` إلى وسائطها لاستخدام Weston.
- **قبل WebdriverIO**، على سبيل المثال من خطوة CI سابقة أو من صدفة (shell) أخرى، لا يمكنها استخدام خادم عرض يشغّله WebdriverIO، إذ لا ترث متغيراته. شغّل الشاشة بنفسك، كما في [استخدام شاشة موجودة](#using-an-existing-display)، ثم إما:
  - استخدم Xvfb، الذي لا يحتاج إلى أي شيء آخر، أو
  - استخدم Weston، ثم صدّر `XDG_SESSION_TYPE=wayland` (لـ Chrome وEdge الإصدار 140 وما بعده، وElectron الإصدار 38 وما بعده) أو `ELECTRON_OZONE_PLATFORM_HINT=wayland` (لـ Electron من 28 إلى 37)، وأضف `--ozone-platform=wayland` إلى وسائط الإصدارات الأقدم من Chrome وEdge.

## الإعداد

جميع الخيارات مدرجة في [مرجع الإعداد](/docs/configuration#displayserverenabled). على سبيل المثال:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // ثبّت خادم عرض إذا لم يكن أي خادم مثبتًا
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // استخدم Xvfb دائمًا بحجم أصغر، مثبتًا بأمر مخصص يفترض حاوية تعمل بصلاحيات root
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

الأمر المخصص مشترك بين الخادمين. مع `displayServer: 'auto'`، يُنفَّذ لـ Weston أولًا، ثم يُنفَّذ مرة أخرى لـ Xvfb فقط إذا ظل Weston غير متاح أو فشل في البدء وكان Xvfb لا يزال مفقودًا. اضبط `displayServer` على الخادم الذي يثبّته أمرك، كما يفعل هذا المثال.

الخياران `autoXvfb` و`xvfb*` من الإصدار v9 مُهمَلان وستتم إزالتهما في v11. راجع [دليل الترحيل إلى v10](/docs/v10-migration#virtual-displays-on-linux) لمعرفة بدائلهما.

## CI وDocker

ثبّت خادم عرض مسبقًا في صورتك، أو اضبط `displayServerAutoInstall: true` لتثبيت خادم عند بدء التشغيل.

### التثبيت المسبق لخادم عرض

#### Weston

على Ubuntu 24.04 أو Debian 12 وما بعده:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

على RHEL 10 وOracle Linux 10، فعّل EPEL وCodeReady Builder بنفسك، باتباع [توثيق EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/)، ثم ثبّت `weston`.

لتغليف مُشغّل الاختبارات بنسخة Weston خاصة بك، كما في [استخدام شاشة موجودة](#using-an-existing-display)، ثبّت أيضًا `xwayland-run`. وهو متوفر كحزمة لـ Debian 13 وUbuntu 24.04 وFedora وopenSUSE Tumbleweed. بدونه، ستحتاج إلى تشغيل Weston في الخلفية مع `XDG_RUNTIME_DIR` و`WAYLAND_DISPLAY` خاصين به، وانتظار المقبس (socket) الخاص به قبل تشغيل WebdriverIO. أو بدلًا من ذلك، استخدم Xvfb.

#### Xvfb

على Ubuntu أو Debian:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

يأتي Ubuntu 22.04 وDebian 11 بإصدار قديم جدًا من Weston، لذا استخدم Xvfb هناك. عند تثبيت Xvfb وحده، يستخدمه مُشغّل الاختبارات دون أي إعداد إضافي.

بالنسبة للتوزيعات الأخرى، استخدم أسماء الحزم الواردة في [دعم التثبيت التلقائي](#automatic-installation-support).

### استخدام شاشة موجودة

إذا كان نظام CI لديك يوفّر شاشة بالفعل، يستخدمها مُشغّل الاختبارات ولا يشغّل شيئًا.

لاستخدام Weston، غلّف مُشغّل الاختبارات بـ `wlheadless-run` من حزمة `xwayland-run`. فهو يمنح Weston مجلد تشغيل خاصًا وينتظر المقبس الخاص به، وتتطابق الخيارات مع Weston الذي يشغّله مُشغّل الاختبارات:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

لاستخدام Xvfb، غلّف مُشغّل الاختبارات بـ `xvfb-run`:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## دعم التثبيت التلقائي

يعمل `displayServerAutoInstall` مع مديري الحزم أدناه. تتم عمليات التثبيت بشكل غير تفاعلي وتنتهي مهلتها بعد 240 ثانية. مع أي مدير حزم آخر، ثبّت خادم العرض بنفسك.

| مدير الحزم | التوزيعات | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu، Debian | `weston` | `xvfb` |
| `dnf` | Fedora، CentOS Stream، RHEL، Rocky Linux، AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE، SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux، Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- على Arch Linux، يُنفّذ التثبيت الأمر `pacman -Syu`، وهو ترقية كاملة للنظام، إذ لا يدعم Arch الترقيات الجزئية. على صورة قديمة قد يتجاوز ذلك حد الـ 240 ثانية، لذا ثبّت خادم العرض مسبقًا هناك.
- لا يحتوي Enterprise Linux 10 على Xvfb، ولا يتوفر Weston فيه إلا عبر EPEL الذي يتطلب CRB. على CentOS Stream وAlmaLinux وRocky Linux، يفعّل التثبيت كليهما ويتركهما مفعّلين. على RHEL وOracle Linux، أعدّهما بنفسك، كما في [التثبيت المسبق لخادم عرض](#preinstalling-a-display-server).

## السجلات

يعمل خادم العرض في عملية المُطلِق (launcher)، لذا تظهر رسائله في سجل المُطلِق: `wdio.log` في `outputDir` الخاص بك، أو في الطرفية إذا لم يُضبط `outputDir`. يُظهر السجل خادم العرض الذي بدأ والمتغيرات التي ضبطها. لمزيد من التفاصيل، ارفع مستوى السجل الخاص به:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## استكشاف الأخطاء وإصلاحها

### يفشل Chrome مع الخطأ `DevToolsActivePort file doesn't exist`

الرسالة الكاملة هي `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. من الأسباب الشائعة وجود Chrome بواجهة مرئية دون شاشة يفتح عليها نافذته. تحقق من [سجل المُطلِق](#logs) لمعرفة خادم العرض الذي بدأ. إذا لم يبدأ أي خادم، فراجع [يُظهر سجل المُطلِق الرسالة `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). إذا كانت اختباراتك لا تحتاج إلى نافذة مرئية، فاستخدم الوضع الأصلي بدون واجهة بدلًا من ذلك، كما في [متى تستخدم شاشة افتراضية مقابل الوضع الأصلي بدون واجهة](#when-to-use-a-virtual-display-vs-native-headless).

### يفشل Chrome مع الخطأ `user data directory is already in use`

تبدأ الرسالة الكاملة بـ `session not created: probably user data directory is already in use`. وغالبًا ما تكون مضلِّلة: فهي تعني عادةً أن المتصفح تعطّل وأعاد التشغيل باستخدام مجلد الملف الشخصي للنسخة السابقة. غالبًا ما تحل الشاشة المستقرة هذه المشكلة. وإن لم تُحل، فمرّر `--user-data-dir` فريدًا لكل عملية عاملة.

### يُظهر سجل المُطلِق الرسالة `No display server could be started`

الرسالة الكاملة هي `No display server could be started; continuing without a virtual display`. لا يوجد خادم عرض مثبت، أو لم يبدأ أي خادم. توضح الرسائل السابقة لها السبب:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` أو `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: لا يوجد شيء مثبت والتثبيت التلقائي معطّل.
- `wayland failed to start: ...` أو `xvfb failed to start: ...`: يليها مخرج الأخطاء الخاص بالخادم.
- `Failed to install Weston` أو `Failed to install Xvfb`: فشل التثبيت.
- `wayland still not found after installing` أو `xvfb still not found after installing`: نجح التثبيت لكنه لم يوفّر ذلك الخادم، على سبيل المثال لأن `displayServerAutoInstallCommand` مخصصًا يثبّت الخادم الآخر فقط. اضبط `displayServer` على الخادم الذي يثبّته أمرك.

ثبّت Weston أو Xvfb في صورتك، أو اضبط `displayServerAutoInstall: true`.

### يتوقف Xvfb مع الخطأ `Failed to find a socket to listen on`

ينشئ Xvfb المقبس الخاص به في `/tmp/.X11-unix`. إذا كان هذا المجلد موجودًا، فيجب أن يكون قابلًا للكتابة من قِبل مستخدم الاختبار، كما هو الحال مع الصلاحيات `1777`.

### يفشل Chrome أو Electron في ظل Weston مع الخطأ `Missing X server or $DISPLAY`

حاول المتصفح استخدام X11 بدلًا من Wayland. إذا لم يكن WebdriverIO هو من شغّله، فراجع [المتصفحات التي لا يشغّلها WebdriverIO](#browsers-webdriverio-doesnt-launch). وإلا، فأزل `--ozone-platform=x11` من وسائطه.

### تفشل الاختبارات المعتمدة على التركيز في Chrome أو Edge

تُرجع `document.hasFocus()` القيمة `false` لأن الصفحات على الشاشة المشتركة قد تفتقر إلى التركيز. فعّل محاكاة التركيز، كما في [تركيز النافذة](#window-focus).

### تفشل أداة أو تطبيق X11 في ظل Weston مع الخطأ `cannot open display` أو `Can't open display`

لا يوفّر Weston المتغير `DISPLAY`. اضبط `displayServer: 'xvfb'` ليشغّل مُشغّل الاختبارات Xvfb بدلًا منه. إذا كنت قد شغّلت Weston بنفسك، فغلّف التشغيل بـ `xvfb-run`، إذ يستخدم مُشغّل الاختبارات الشاشة الموجودة بدلًا من تشغيل شاشة جديدة.

## الخطوات التالية

- مرجع [الإعداد](/docs/configuration#displayserverenabled) لكل خيار من خيارات `displayServer*`.
- [دليل الترحيل إلى v10](/docs/v10-migration#virtual-displays-on-linux) لمعرفة بدائل خياري v9 وهما `autoXvfb` و`xvfb*`.
- [Docker](/docs/docker) و[GitHub Actions](/docs/githubactions) لتشغيل مجموعة اختباراتك في CI.
- [تطبيقات سطح المكتب](/docs/platforms/desktop#linux) لـ Electron وTauri وDioxus على لينكس.