---
id: session-commands
title: أوامر wdio session
description: جميع إجراءات وخيارات wdio session، من open وحتى doctor وskill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

هذه جميع إجراءات `wdio session`. تنطبق الخيارات العامة عليها كلها. ويطبع الأمر `npx wdio session <action> --help` النص نفسه. أما بقية قسم [WebdriverIO Session](/docs/session) فتتناول [الأهداف](/docs/session/targets) و[اللقطات](/docs/session/snapshots) و[`exec`](/docs/session/exec) و[التصدير](/docs/session/export) و[تصحيح الأخطاء](/docs/session/debug).

```sh
npx wdio session <action> [arguments] [flags]
```

## الخيارات العامة

| الخيار | الوصف |
| --- | --- |
| `-s, --session` | اسم الجلسة (متغير البيئة WDIO_SESSION، والقيمة الافتراضية "default") |
| `--json` | طباعة كائن JSON واحد (متغير البيئة WDIO_SESSION_JSON=1) |
| `--timeout` | مهلة الطلب بالمللي ثانية (بحد أقصى 60000 باستثناء wait) |
| `-q, --quiet` | عدم طباعة أي شيء عند النجاح باستثناء البيانات المطلوبة |
| `--color` | استخدم --no-color لتعطيل الألوان |

رموز الخروج: 0 نجاح، 1 فشل الإجراء أو فشلت الشيفرة الخاصة بك، 2 خطأ في الاستخدام، 3 تبعية أو بيانات اعتماد مفقودة، 4 لا توجد جلسة بهذا الاسم.

## `open`

بدء جلسة: browser أو android أو ios أو macos أو windows أو electron أو tauri أو dioxus أو ملف إعدادات wdio.

يبدأ عملية خلفية (daemon) تُبقي الجلسة نشطة حتى تنفيذ `close`، أو حتى تبقى خاملة طوال مدة --idle-timeout (الافتراضي 30m). تعمل المتصفحات دون واجهة (headless) ما لم تمرر --headed. يطبع اسم الجلسة والهدف ومجلد المخرجات الذي تُحفظ فيه اللقطات ولقطات الشاشة والتصديرات، وفي حالة متصفح فُتح على عنوان URL يطبع اللقطة التفاعلية لتلك الصفحة.

جلسة واحدة لكل اسم. يفشل فتح اسم قيد التشغيل بالفعل؛ استخدمه أو أغلقه أو مرر --replace. لا تمرر `-s <name>` إلا عندما تحتاج إلى جلستين في الوقت نفسه.

```sh
npx wdio session open <target> [url]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | لا | عنوان URL المراد فتحه (المتصفحات)، أو مسار التطبيق (تطبيقات سطح المكتب)، أو القدرة (capability) (الإعدادات) |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--replace` | إغلاق الجلسة قيد التشغيل التي تحمل الاسم نفسه أولًا |
| `--launch-timeout <n>` | عدد المللي ثواني لانتظار جاهزية الجلسة |
| `--idle-timeout <value>` | الإيقاف بعد هذه المدة دون طلبات (مثل 30m، و0 يعطّل ذلك) |
| `--capabilities <value>` | قدرات إضافية بصيغة JSON أو مسار إلى ملف JSON |
| `--hostname <value>` | مضيف WebDriver البعيد |
| `--port <n>` | منفذ WebDriver البعيد |
| `--path <value>` | مسار WebDriver البعيد |
| `--protocol <value>` | بروتوكول WebDriver البعيد |
| `--log-level <value>` | مستوى سجل WebdriverIO المكتوب في daemon.log |
| `--bidi` | طلب WebDriver BiDi (استخدم --no-bidi للتعطيل) |
| `--headed` | إظهار نافذة المتصفح |
| `--headless` | التشغيل دون نافذة (الافتراضي للمتصفحات؛ يتجاوز --headed) |
| `--snapshot` | طباعة اللقطة التفاعلية للصفحة المفتوحة (استخدم --no-snapshot للتخطي) |
| `--viewport <value>` | منفذ العرض الأولي، مثل 1280x720 |
| `--browser-version <value>` | إصدار المتصفح |
| `--binary <value>` | الملف التنفيذي للمتصفح |
| `--arg <value>` | وسيط إضافي للمتصفح. القيمة التي تبدأ بـ `-` تحتاج إلى `=`، مثل `--arg=--disable-gpu` (قابل للتكرار) |
| `--profile <value>` | مجلد ملف تعريف دائم |
| `--attach <value>` | الاتصال بمتصفح Chrome/Edge قيد التشغيل (منفذ التصحيح أو عنوان URL) |
| `--app <value>` | ملف التطبيق أو عنوان URL لتطبيق سحابي |
| `--package <value>` | حزمة تطبيق Android |
| `--activity <value>` | نشاط تطبيق Android |
| `--bundle-id <value>` | معرّف الحزمة في iOS/macOS |
| `--browser <value>` | متصفح الويب على الهاتف المحمول (chrome، safari) |
| `--device <value>` | اسم الجهاز |
| `--platform-version <value>` | إصدار المنصة |
| `--udid <value>` | معرّف UDID للجهاز |
| `--reset` | استخدم --no-reset للحفاظ على حالة التطبيق (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | الاتجاه الأولي |
| `--appium-url <value>` | استخدام خادم Appium قيد التشغيل |
| `--app-arg <value>` | وسيط يُمرَّر إلى تطبيق سطح المكتب. القيمة التي تبدأ بـ `-` تحتاج إلى `=`، مثل `--app-arg=--no-sandbox` (قابل للتكرار) |
| `--chromedriver <value>` | Electron: الملف التنفيذي لـ Chromedriver |
| `--electron-version <value>` | Electron: تجاوز اكتشاف الإصدار |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | مزود الخدمة السحابية |
| `--os <value>` | السحابة: نظام تشغيل سطح المكتب |
| `--os-version <value>` | السحابة: إصدار نظام تشغيل سطح المكتب |
| `--region <value>` | السحابة: منطقة Sauce Labs |
| `--tunnel <value>` | السحابة: بدء نفق المزود (أو "external") |
| `--tunnel-name <value>` | السحابة: معرّف النفق |
| `--project <value>` | السحابة: تسمية المشروع |
| `--build <value>` | السحابة: تسمية البناء |
| `--name <value>` | السحابة: تسمية اسم الجلسة |

**أمثلة**

```sh
# فتح Chrome دون واجهة على تطبيق محلي
npx wdio session open chrome http://localhost:3000

# فتح Firefox مع نافذة مرئية
npx wdio session open firefox http://localhost:3000 --headed

# فتح تطبيق Android عبر Appium
npx wdio session open android --app ./app.apk

# فتح تطبيق iOS مثبّت
npx wdio session open ios --bundle-id com.example.shop

# فتح تطبيق Electron
npx wdio session open electron ./main.js

# فتح القدرة الأولى في ملف إعدادات
npx wdio session open ./wdio.conf.ts 0

# فتح Chrome في شبكة سحابية
npx wdio session open chrome https://example.com --provider browserstack
```

انظر أيضًا: [`snapshot`](#snapshot)، [`close`](#close)، [`doctor`](#doctor).

## `close`

إنهاء الجلسة وإيقاف العملية الخلفية الخاصة بها.

في جلسة فُتحت بواسطة `wdio run --debug=agent` يؤدي هذا إلى فشل الاختبار المتوقف مؤقتًا؛ استخدم `resume` للسماح له بالمتابعة.

```sh
npx wdio session close
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--all` | إغلاق جميع الجلسات |
| `--clean` | حذف مجلد المخرجات أيضًا |

**أمثلة**

```sh
# إغلاق الجلسة الافتراضية
npx wdio session close

# إغلاق جميع الجلسات وحذف مخرجاتها
npx wdio session close --all --clean
```

انظر أيضًا: [`open`](#open)، [`list`](#list).

## `list`

عرض الجلسات قيد التشغيل.

يطبع سطرًا واحدًا لكل جلسة: الاسم والهدف وعنوان URL والعمر. ويزيل الحالة المتبقية من الجلسات التي توقفت.

```sh
npx wdio session list
```

**أمثلة**

```sh
# عرض جميع الجلسات قيد التشغيل
npx wdio session list
```

انظر أيضًا: [`info`](#info)، [`status`](#status).

## `info`

عرض تفاصيل الجلسة.

يطبع الهدف والمتصفح وإصداره ودعم BiDi ومجلد المخرجات، بالإضافة إلى عنوان URL الحالي والعنوان وحجم النافذة والإطار (الويب) أو السياق والنشاط (الهاتف المحمول).

```sh
npx wdio session info
```

**أمثلة**

```sh
# عرض موقع الجلسة وما تشغّله
npx wdio session info
```

انظر أيضًا: [`list`](#list)، [`get`](#get).

## `restart`

الإغلاق وإعادة الفتح بالهدف والخيارات نفسها.

يحتفظ بالسجل المسجَّل، بحيث يظل `export` يغطي الخطوات السابقة لإعادة التشغيل.

```sh
npx wdio session restart
```

**أمثلة**

```sh
# البدء من جديد بمتصفح جديد
npx wdio session restart
```

انظر أيضًا: [`open`](#open)، [`close`](#close).

## `status`

الخروج بالرمز 0 إذا كانت الجلسة قيد التشغيل، و4 إن لم تكن كذلك.

```sh
npx wdio session status
```

**أمثلة**

```sh
# فتح جلسة فقط عندما لا تكون هناك جلسة قيد التشغيل
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

انظر أيضًا: [`list`](#list)، [`open`](#open).

## `exec`

تشغيل شيفرة WebdriverIO من stdin أو -e أو ملف.

تُشغَّل كدالة غير متزامنة مع إتاحة `browser` و`$` و`$$` و`expect` و`ref('e3')` في نطاقها. تبقى المتغيرات ذات المستوى الأعلى محفوظة بين الاستدعاءات. يشغّل `wdio session` دون إجراء الأمرَ `exec` عندما تُمرَّر الشيفرة عبر stdin.

استخدم `await` دائمًا مع الأوامر. يُرجع `$` عنصرًا واحدًا بالضبط ويرمي StrictSelectorError عند تطابق أكثر من عنصر. فضّل إجراءً واحدًا (click، fill، …) عندما يؤدي المهمة؛ واستخدم `exec` للحلقات والشروط والتأكيدات.

```sh
npx wdio session exec [file]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `file` | لا | ملف السكربت (.js، .ts، .mjs) |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `-e, --eval <value>` | الشيفرة المراد تشغيلها |
| `--history` | تسجيل الشيفرة في السجل (استخدم --no-history للتخطي) |

**أمثلة**

```sh
# تشغيل سطر واحد
npx wdio session exec -e "await browser.getTitle()"

# التأكيد على محتوى الصفحة (علامات الاقتباس المفردة تُبعد الصدفة عن $)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# تمرير عدة خطوات عبر stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# تشغيل ملف سكربت
npx wdio session exec ./scripts/login.ts
```

انظر أيضًا: [`helpers`](#helpers)، [`history`](#history)، [`export`](#export).

## `helpers`

عرض الدوال المساعدة للمشروع من .wdio/helpers.

يصدّر كل ملف ضمن .wdio/helpers افتراضيًا دالة تستقبل المتصفح وتسجّل أوامر مخصصة باستخدام addCommand. تُحمَّل الدوال المساعدة عند فتح الجلسة، وتصبح أوامر مخصصة في الاختبار المُصدَّر.

```sh
npx wdio session helpers
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--reload` | إعادة استيراد الدوال المساعدة |

**أمثلة**

```sh
# عرض الدوال المساعدة والأوامر التي تضيفها
npx wdio session helpers

# تحميل التعديلات على دالة مساعدة
npx wdio session helpers --reload
```

انظر أيضًا: [`exec`](#exec)، [`export`](#export).

## `snapshot`

لقطة إمكانية الوصول مع المراجع (refs). ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

يطبع شجرة إمكانية الوصول، عقدة واحدة في كل سطر، مثل `button "Add to cart" [ref=e3]`. مرّر مرجعًا إلى click وfill وget وبقية الإجراءات. تظل المراجع صالحة ما دام العنصر موجودًا؛ ويفشل الإجراء على عنصر محذوف مع REF_STALE.

تُكتب كل لقطة في مجلد المخرجات. يُطبع الناتج الأطول من --max-chars على أجزاء: الجزء الأول، ثم `--offset <line>` للجزء التالي. يبحث `find` في الناتج كاملًا.

تخطيط النص وبنية --json تجريبيان وقد يتغيران في إصدار ثانوي. أما صيغة المراجع والإجراءات التي تقبل مرجعًا فتبقى مستقرة.

```sh
npx wdio session snapshot
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--depth <n>` | أقصى عمق |
| `--scope <value>` | التقاط ما هو أسفل هذا المرجع أو المحدد فقط |
| `-i, --interactive` | العناصر التفاعلية فقط |
| `--all` | تضمين العناصر المخفية |
| `--boxes` | إلحاق المربعات المحيطة |
| `--viewport` | ما هو ظاهر في منفذ العرض فقط (الويب: لا يحدّث خط الأساس للمقارنة) |
| `--selectors` | إنهاء كل سطر مرجع بأفضل محدد له |
| `--compact` | حذف العقد غير المسماة التي لا تحتوي على محتوى |
| `-u, --urls` | تضمين قيم href للروابط |
| `--file-only` | كتابة الملف فقط |
| `--max-chars <n>` | طباعة ما يصل إلى هذا العدد من الأحرف في كل مرة (الافتراضي 8000) |
| `--offset <n>` | الطباعة بدءًا من هذا السطر، للجزء التالي من لقطة طويلة |

**أمثلة**

```sh
# العناصر التفاعلية فقط، النظرة الأولى المعتادة
npx wdio session snapshot -i

# الصفحة كاملة مع وجهات الروابط
npx wdio session snapshot --compact --urls

# جزء من الصفحة فقط
npx wdio session snapshot --scope "#checkout" --depth 4

# ما يظهر على الشاشة الآن
npx wdio session snapshot --viewport -i

# كل مرجع مع محدد لاستخدامه في اختبار
npx wdio session snapshot --selectors -i

# نفّذ إجراءً، ثم انظر مجددًا
npx wdio session click e3 && npx wdio session snapshot -i
```

انظر أيضًا: [`find`](#find)، [`diff`](#diff)، [`screenshot`](#screenshot).

## `read`

قراءة نص الصفحة بصيغة Markdown. ينطبق على: الويب.

العناوين والفقرات وعناصر القوائم وصفوف الجداول والروابط مع عناوين URL الخاصة بها، من المحتوى الرئيسي عندما تحدده الصفحة (main، article)، وإلا فمن الصفحة كاملة؛ ويُستبعد التنقل والتذييلات والنص المخفي. يُقتطع عند --max-chars (الافتراضي 6000)؛ ويوضّح الاقتطاع قيمة --offset التي تقرأ الجزء التالي. مع --scope، يُمرَّر القسم إلى مجال الرؤية. استخدمه للإجابة عن سؤال "ماذا تقول الصفحة"؛ واستخدم snapshot أو find للحصول على مراجع لتنفيذ إجراءات عليها.

```sh
npx wdio session read
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--scope <value>` | القراءة أسفل هذا المرجع أو المحدد فقط |
| `--max-chars <n>` | طباعة ما يصل إلى هذا العدد من الأحرف (الافتراضي 6000) |
| `--offset <n>` | البدء من هذا الحرف في النص، للجزء التالي من صفحة طويلة |

**أمثلة**

```sh
# قراءة المحتوى الرئيسي
npx wdio session read

# قراءة قسم واحد
npx wdio session read --scope e12
```

انظر أيضًا: [`find`](#find)، [`snapshot`](#snapshot)، [`get`](#get).

## `find`

البحث عن نص في لقطة جديدة. ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

يلتقط لقطة جديدة ويطبع كل تطابق مع العقدة المحيطة به (مثل عنصر القائمة كاملًا، بحيث تُضمَّن القيمة المجاورة للتطابق)، مع أرقام الأسطر والمراجع، ويمرّر التطابق الأول إلى مجال الرؤية. تتجاهل المطابقة حالة الأحرف، ثم المسافات ("SO2" يجد "SO 2")، ثم تبحث عن جميع الكلمات وعن كلمات مشابهة لها. يُشار إلى النص الموجود فقط في الأجزاء المخفية من الصفحة (القوائم المغلقة، علامات التبويب، "Show more") على هذا النحو. أقل تكلفة من قراءة لقطة كاملة لصفحة كبيرة. تطبع -A/-B/-C سياقًا من الأسطر العادية بدلًا من ذلك، مثل grep.

```sh
npx wdio session find <text>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `text` | نعم | النص المراد البحث عنه |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--regex` | معاملة النص كتعبير نمطي |
| `--scope <value>` | البحث أسفل هذا المرجع أو المحدد فقط |
| `-C, --context <n>` | أسطر السياق قبل وبعد بدلًا من العقدة المحيطة |
| `-A, --after-context <n>` | أسطر السياق بعد كل تطابق |
| `-B, --before-context <n>` | أسطر السياق قبل كل تطابق |
| `--offset <n>` | تخطي هذا العدد من التطابقات، للتطابقات التالية عند اقتطاع الناتج |

**أمثلة**

```sh
# إيجاد مرجع زر
npx wdio session find "Add to cart"

# عرض جميع الروابط
npx wdio session find "^\s*link" --regex --context 0
```

انظر أيضًا: [`snapshot`](#snapshot)، [`wait`](#wait).

## `diff`

مقارنة لقطة جديدة باللقطة السابقة. ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

يطبع فرقًا موحدًا (unified diff) لما تغيّر منذ اللقطة الأخيرة، أو "No changes". يخزّن الاستدعاء الأول خط أساس. استخدمه بعد إجراء ما لترى ما فعله الإجراء دون قراءة الصفحة كاملة مرة أخرى. على الويب، يكون خط الأساس هو آخر لقطة التُقطت دون `--viewport`.

```sh
npx wdio session diff
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--baseline <value>` | ملف اللقطة المراد المقارنة به |
| `--scope <value>` | الالتقاط ضمن هذا المرجع أو المحدد فقط، مثل `snapshot --scope` |
| `--interactive` | العناصر التفاعلية فقط، مثل `snapshot -i` |

**أمثلة**

```sh
# معرفة ما غيّرته نقرة
npx wdio session click e7 && npx wdio session diff

# المقارنة بلقطة محفوظة
npx wdio session diff --baseline before.yml
```

انظر أيضًا: [`snapshot`](#snapshot)، [`find`](#find).

## `screenshot`

حفظ صورة PNG لمنفذ العرض أو لعنصر أو للصفحة كاملة. ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

يطبع مسار الملف وحجم الصورة. التقط لقطة شاشة عندما يتعلق السؤال بالتخطيط أو المظهر؛ واقرأ النص والحالة باستخدام `snapshot` و`get`.

```sh
npx wdio session screenshot [target]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | لا | مرجع أو محدد العنصر المراد التقاطه |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--full` | الصفحة كاملة (الويب) |
| `--path <value>` | ملف الإخراج |

**أمثلة**

```sh
# التقاط منفذ العرض
npx wdio session screenshot

# التقاط عنصر واحد
npx wdio session screenshot e5 --path card.png

# التقاط الصفحة كاملة
npx wdio session screenshot --full
```

انظر أيضًا: [`visual`](#visual)، [`pdf`](#pdf)، [`snapshot`](#snapshot).

## `pdf`

حفظ الصفحة الحالية كملف PDF. ينطبق على: الويب.

يستدعي `browser.savePDF`. تطبع جلسة BiDi باستخدام `browsingContext.print`، مع واجهة أو دونها، في Chrome وEdge وFirefox. أما الجلسة الكلاسيكية فتستخدم `printPage`، الذي لا تدعمه إصدارات Chrome الأقدم إلا في وضع headless.

```sh
npx wdio session pdf [file]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `file` | لا | ملف الإخراج (يجب أن ينتهي بـ .pdf) |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--path <value>` | ملف الإخراج (يجب أن ينتهي بـ .pdf) |

**أمثلة**

```sh
# كتابة report.pdf في المجلد الحالي
npx wdio session pdf report.pdf
```

انظر أيضًا: [`screenshot`](#screenshot).

## `source`

حفظ HTML الصفحة أو XML التطبيق. ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

يكتب الملف ويطبع مساره وحجمه. استخدمه عندما تُخفي اللقطة ما تحتاجه، مثل السمات اللازمة لمحدد.

```sh
npx wdio session source
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--path <value>` | ملف الإخراج |

**أمثلة**

```sh
# حفظ HTML في المجلد الحالي
npx wdio session source --path page.html
```

انظر أيضًا: [`snapshot`](#snapshot)، [`get`](#get).

## `get`

قراءة النص أو html أو القيمة أو سمة أو العنوان أو عنوان URL أو عدد أو مربع. ينطبق على: الويب.

يطبع القيمة، ثم شيفرة WebdriverIO التي شغّلها (`→ …`). مرّر -q لطباعة القيمة فقط، مثلًا لالتقاطها في متغير صدفة. اقرأ القيمة قبل أن تكتب تأكيدًا لها.

```sh
npx wdio session get <sub> [target] [name]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | لا | مرجع أو محدد (لا يُستخدم مع title وurl) |
| `name` | لا | اسم السمة (مع attr فقط) |

**أمثلة**

```sh
# نص مرجع
npx wdio session get text e1

# عنوان URL الحالي
npx wdio session get url

# القيمة فقط، لمتغير صدفة
url=$(npx wdio session get url -q)

# قيمة href لرابط
npx wdio session get attr e3 href

# عدد العناصر المطابقة
npx wdio session get count "aria/Remove"
```

انظر أيضًا: [`is`](#is)، [`wait`](#wait)، [`exec`](#exec).

## `is`

التحقق مما إذا كان العنصر مرئيًا أو مفعّلًا أو محددًا. ينطبق على: الويب.

يطبع true أو false، ثم شيفرة WebdriverIO التي شغّلها؛ مرّر -q لطباعة القيمة فقط. رمز الخروج هو 0 في كلتا الحالتين.

```sh
npx wdio session is <sub> <target>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | visible \| enabled \| checked |
| `target` | نعم | مرجع أو محدد |

**أمثلة**

```sh
# طباعة true أو false
npx wdio session is visible e1

# التحقق من زر بواسطة تسميته
npx wdio session is enabled "aria/Place order"
```

انظر أيضًا: [`get`](#get)، [`wait`](#wait).

## `logs`

طباعة سجلات وحدة التحكم وأخطاء الصفحة والشبكة والجهاز منذ الاستدعاء الأخير. ينطبق على: الويب، والهاتف المحمول الأصلي.

يُقدِّم كل استدعاء مؤشر القراءة، بحيث لا يعرض الاستدعاء التالي إلا الإدخالات الجديدة. شغّله بعد إجراء ما لرؤية الأخطاء التي تسبب بها ذلك الإجراء.

```sh
npx wdio session logs
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--errors` | الأخطاء فقط |
| `--network` | إدخالات الشبكة فقط |
| `--since <value>` | الإدخالات الأحدث من هذه المدة فقط (مثل 30s) |
| `--peek` | عدم تقديم مؤشر القراءة |
| `--source <browser\|driver\|logcat\|syslog\|main>` | مصدر السجل |

**أمثلة**

```sh
# الأخطاء الناتجة عن نقرة
npx wdio session click e4 && npx wdio session logs --errors

# الإدخالات الحديثة، مع الاحتفاظ بها للاستدعاء التالي
npx wdio session logs --since 30s --peek
```

انظر أيضًا: [`requests`](#requests).

## `navigate`

فتح عنوان URL. ينطبق على: الويب.

يقبل `example.com` وعناوين URL الكاملة والمسارات النسبية إلى baseUrl. يغادر أي إطار أولًا. يطبع عنوان URL الجديد والعنوان.

```sh
npx wdio session navigate <url>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `url` | نعم | عنوان URL (تستخدم العناوين النسبية baseUrl) |

**أمثلة**

```sh
# الانتقال إلى صفحة والنظر إليها
npx wdio session navigate /cart && npx wdio session snapshot -i

# فتح موقع آخر
npx wdio session navigate example.com
```

انظر أيضًا: [`back`](#back)، [`reload`](#reload)، [`wait`](#wait).

## `back`

الرجوع للخلف. ينطبق على: الويب.

```sh
npx wdio session back
```

**أمثلة**

```sh
# الرجوع صفحة واحدة للخلف
npx wdio session back
```

انظر أيضًا: [`forward`](#forward)، [`navigate`](#navigate).

## `forward`

التقدم للأمام. ينطبق على: الويب.

```sh
npx wdio session forward
```

**أمثلة**

```sh
# التقدم صفحة واحدة للأمام
npx wdio session forward
```

انظر أيضًا: [`back`](#back)، [`navigate`](#navigate).

## `reload`

إعادة تحميل الصفحة. ينطبق على: الويب.

```sh
npx wdio session reload
```

**أمثلة**

```sh
# إعادة التحميل والانتظار حتى تهدأ الشبكة
npx wdio session reload && npx wdio session wait --load networkidle
```

انظر أيضًا: [`navigate`](#navigate)، [`wait`](#wait).

## `wait`

انتظار عنصر أو نص أو عنوان URL أو حالة تحميل أو شرط أو بضع مللي ثوانٍ. ينطبق على: الويب.

مرّر واحدًا فقط مما يلي: مرجع أو محدد، أو --text، أو --url، أو --load، أو --fn، أو عدد المللي ثواني. يفشل برمز الخروج 1 بعد انقضاء --limit.

فضّل الشرط على التوقف المؤقت، سواء هنا أو بدلًا من `sleep` في سلسلة أوامر. يُرفض التوقف المؤقت الذي يزيد على 30 ثانية.

```sh
npx wdio session wait [target]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | لا | مرجع أو محدد أو عدد المللي ثواني |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--text <value>` | الانتظار حتى تحتوي الصفحة على هذا النص |
| `--url <value>` | الانتظار حتى يتطابق عنوان URL (سلسلة فرعية، أو أنماط * و**) |
| `--load <value>` | domcontentloaded أو load أو networkidle |
| `--fn <value>` | الانتظار حتى يصبح تعبير JavaScript هذا صحيحًا |
| `--state <value>` | مع هدف: visible (الافتراضي) أو hidden أو enabled أو disabled |
| `--limit <n>` | عدد المللي ثواني للانتظار (الافتراضي 10000) |

**أمثلة**

```sh
# الانتظار حتى يصبح المرجع مرئيًا
npx wdio session wait e1

# الانتظار حتى يختفي مؤشر التحميل
npx wdio session wait "aria/Loading" --state hidden

# نفّذ إجراءً، وانتظر النتيجة، ثم انظر مجددًا
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# انتظار عنوان URL
npx wdio session wait --url "**/dashboard"

# الانتظار حتى لا يكون هناك أي طلب قيد التنفيذ
npx wdio session wait --load networkidle

# التوقف 500ms
npx wdio session wait 500
```

انظر أيضًا: [`find`](#find)، [`is`](#is)، [`get`](#get).

## `click`

النقر على عنصر. ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

يطبع ما تم النقر عليه، وعنوان URL الجديد عندما تؤدي النقرة إلى الانتقال. التقط لقطة جديدة قبل استخدام المراجع في الصفحة التالية. يفشل النقر على عنصر مخفي أو مغطى فورًا مع بيان ما يعترضه. ينقر `x,y` على نقطة في منفذ العرض (بالبكسل من أعلى اليسار، كما في لقطة الشاشة) لما ليس له مرجع، مثل لوحة رسم (canvas) أو خريطة.

```sh
npx wdio session click <target>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO أو إحداثيات x,y في منفذ العرض |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--double` | نقر مزدوج |
| `--right` | نقر بالزر الأيمن |
| `--new-tab` | فتح الرابط في علامة تبويب جديدة والانتقال إليها |

**أمثلة**

```sh
# النقر على مرجع من أحدث لقطة
npx wdio session click e3

# النقر بواسطة الاسم القابل للوصول
npx wdio session click "aria/Add to cart"

# انقر، وانتظر، ثم انظر مجددًا
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# فتح رابط في علامة تبويب جديدة
npx wdio session click e8 --new-tab

# النقر على نقطة في منفذ العرض، مثلًا على خريطة
npx wdio session click 320,480
```

انظر أيضًا: [`tap`](#tap)، [`fill`](#fill)، [`wait`](#wait)، [`snapshot`](#snapshot).

## `tap`

الضغط على عنصر (الهاتف المحمول). ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session tap <target>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO |

**أمثلة**

```sh
# الضغط على مرجع من أحدث لقطة
npx wdio session tap e2
```

انظر أيضًا: [`click`](#click)، [`long-press`](#long-press)، [`swipe`](#swipe).

## `fill`

استبدال قيمة حقل إدخال. ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

يمسح الحقل أولًا. للكتابة في العنصر الذي يملك التركيز، استخدم `type`؛ ولإرسال مفاتيح مثل Enter، استخدم `press`.

```sh
npx wdio session fill <target> <text..>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO |
| `text` | نعم | النص (تُضم الكلمات التي تلي الهدف بمسافات) |

**أمثلة**

```sh
# ملء حقل
npx wdio session fill e2 ada@example.com

# ملء نموذج وإرساله
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

انظر أيضًا: [`type`](#type)، [`press`](#press)، [`select`](#select)، [`check`](#check).

## `type`

الكتابة في عنصر أو في العنصر الذي يملك التركيز. ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

يرسل النص كضغطات مفاتيح دون مسح أي شيء: `type e2 Ada` يكتب في e2، و`type Ada` يكتب في العنصر الذي يملك التركيز. لاستبدال قيمة، استخدم `fill`.

```sh
npx wdio session type <text..>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `text` | نعم | النص (تُضم الكلمات بمسافات). ابدأ بمرجع، مثل `type e2 Ada`، للكتابة في ذلك العنصر بدلًا من العنصر الذي يملك التركيز |

**أمثلة**

```sh
# الكتابة في حقل
npx wdio session type e5 hello

# الكتابة في العنصر الذي يملك التركيز
npx wdio session focus e5 && npx wdio session type "hello"
```

انظر أيضًا: [`fill`](#fill)، [`press`](#press)، [`focus`](#focus).

## `press`

الضغط على المفاتيح، مثل Enter وControl+a. ينطبق على: الويب، وسطح المكتب الأصلي.

اجمع المفاتيح باستخدام +. لا تتأثر الأسماء بحالة الأحرف؛ وتُقبل ctrl وcmd وesc وup وdown وleft وright كصيغ مختصرة.

```sh
npx wdio session press <keys>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `keys` | نعم | تركيبة المفاتيح |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--times <n>` | الضغط عليها هذا العدد من المرات (حتى 100)، مثلًا لتحريك شريط تمرير |

**أمثلة**

```sh
# إرسال نموذج
npx wdio session press Enter

# تحريك شريط تمرير يملك التركيز خمس خطوات
npx wdio session press ArrowRight --times 5

# تحديد الكل
npx wdio session press Control+a

# نقل التركيز للخلف
npx wdio session press Shift+Tab
```

انظر أيضًا: [`type`](#type)، [`fill`](#fill).

## `select`

اختيار خيار من `<select>`. ينطبق على: الويب.

```sh
npx wdio session select <target> <value>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO |
| `value` | نعم | نص الخيار أو قيمته أو فهرسه |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--by <text\|value\|index>` | طريقة مطابقة الخيار (الافتراضي text) |

**أمثلة**

```sh
# الاختيار بواسطة النص المرئي
npx wdio session select e6 Germany

# الاختيار بواسطة القيمة
npx wdio session select e6 de --by value
```

انظر أيضًا: [`fill`](#fill)، [`check`](#check).

## `upload`

تعيين حقل إدخال ملف. ينطبق على: الويب.

يكون المسار نسبيًا إلى مجلد العمل الخاص بك. استهدف `<input type="file">` نفسه، لا الزر الذي يفتح أداة اختيار الملفات.

```sh
npx wdio session upload <target> <file>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO |
| `file` | نعم | الملف المراد رفعه |

**أمثلة**

```sh
# إرفاق ملف
npx wdio session upload e9 ./fixtures/avatar.png
```

انظر أيضًا: [`fill`](#fill).

## `hover`

تحريك المؤشر فوق عنصر. ينطبق على: الويب، وسطح المكتب الأصلي.

```sh
npx wdio session hover <target>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO |

**أمثلة**

```sh
# فتح قائمة تظهر عند التمرير فوقها والنظر إليها
npx wdio session hover e4 && npx wdio session snapshot -i
```

انظر أيضًا: [`click`](#click).

## `focus`

منح التركيز لعنصر. ينطبق على: الويب.

```sh
npx wdio session focus <target>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO |

**أمثلة**

```sh
# منح التركيز لحقل قبل `type`
npx wdio session focus e5
```

انظر أيضًا: [`type`](#type)، [`press`](#press).

## `check`

تحديد مربع اختيار أو زر راديو. ينطبق على: الويب.

لا يفعل شيئًا عندما يكون محددًا بالفعل، ويفشل عندما لا ينتهي به الأمر محددًا.

```sh
npx wdio session check <target>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO |

**أمثلة**

```sh
# قبول الشروط
npx wdio session check e7
```

انظر أيضًا: [`uncheck`](#uncheck)، [`is`](#is).

## `uncheck`

إلغاء تحديد مربع اختيار. ينطبق على: الويب.

لا يفعل شيئًا عندما يكون غير محدد بالفعل. لا يمكن إلغاء تحديد زر راديو محدد.

```sh
npx wdio session uncheck <target>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO |

**أمثلة**

```sh
# إلغاء الاشتراك في النشرة الإخبارية
npx wdio session uncheck e7
```

انظر أيضًا: [`check`](#check)، [`is`](#is).

## `drag`

سحب عنصر وإفلاته على عنصر آخر. ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

```sh
npx wdio session drag <from> <to>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `from` | نعم | مرجع أو محدد العنصر المراد سحبه |
| `to` | نعم | مرجع أو محدد العنصر المراد الإفلات عليه |

**أمثلة**

```sh
# نقل بطاقة إلى عمود آخر
npx wdio session drag e3 e9
```

انظر أيضًا: [`scroll`](#scroll).

## `scroll`

تمرير عنصر إلى مجال الرؤية أو تمرير الصفحة. ينطبق على: الويب.

دون هدف، يمرّر للأسفل بمقدار 600px. يظهر المحتوى المحمّل بشكل كسول في اللقطة التالية.

```sh
npx wdio session scroll [target]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | لا | مرجع أو محدد أو up أو down أو top أو bottom |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--px <n>` | عدد البكسلات لـ up/down (الافتراضي 600) |

**أمثلة**

```sh
# إظهار عنصر في مجال الرؤية
npx wdio session scroll e40

# تحميل مزيد من النتائج والنظر إليها
npx wdio session scroll bottom && npx wdio session snapshot -i

# التمرير بمقدار شاشتين
npx wdio session scroll down --px 1200
```

انظر أيضًا: [`swipe`](#swipe)، [`snapshot`](#snapshot).

## `swipe`

السحب على الشاشة (الهاتف المحمول). ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session swipe <direction>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `direction` | نعم | up \| down \| left \| right |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--percent <n>` | طول السحب 0..1 |

**أمثلة**

```sh
# تمرير قائمة والنظر إليها
npx wdio session swipe up && npx wdio session snapshot
```

انظر أيضًا: [`scroll`](#scroll)، [`tap`](#tap).

## `long-press`

الضغط المطوّل على عنصر (الهاتف المحمول). ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session long-press <target>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع (e12) أو محدد WebdriverIO |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--duration <n>` | بالمللي ثانية |

**أمثلة**

```sh
# فتح قائمة سياقية
npx wdio session long-press e4 --duration 1500
```

انظر أيضًا: [`tap`](#tap).

## `tabs`

عرض علامات التبويب أو فتحها أو التبديل بينها أو إغلاقها. ينطبق على: الويب.

دون أمر فرعي، يعرض علامات التبويب مع فهارسها؛ مع تمييز العلامة الحالية. يفتح `new` علامة تبويب وينتقل إليها. يقبل `switch` و`close` فهرسًا أو معرّفًا (handle).

```sh
npx wdio session tabs [sub] [arg]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | لا | switch \| new \| close |
| `arg` | لا | الفهرس أو المعرّف أو عنوان URL |

**أمثلة**

```sh
# عرض علامات التبويب
npx wdio session tabs

# فتح علامة تبويب
npx wdio session tabs new http://localhost:3000/help

# العودة إلى علامة التبويب الأولى
npx wdio session tabs switch 0

# إغلاق علامة التبويب الثانية
npx wdio session tabs close 1
```

انظر أيضًا: [`windows`](#windows)، [`frame`](#frame).

## `windows`

عرض النوافذ أو التبديل بينها. ينطبق على: الويب، وسطح المكتب الأصلي.

```sh
npx wdio session windows [sub] [arg]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | لا | switch |
| `arg` | لا | الفهرس أو المعرّف |

**أمثلة**

```sh
# عرض النوافذ
npx wdio session windows

# الانتقال إلى النافذة الثانية
npx wdio session windows switch 1
```

انظر أيضًا: [`tabs`](#tabs).

## `frame`

الانتقال إلى داخل iframe أو إلى الإطار الأب أو إلى المستوى الأعلى. ينطبق على: الويب.

تعرض لقطة الصفحة بالفعل محتوى إطارات iframe الخاصة بها، مع مراجع تستخدمها الإجراءات مباشرة، لذا لا تحتاج إلى `frame` إلا للعمل داخل إطار واحد لفترة أو لرؤية إطار اقتطعته اللقطة. تنطبق اللقطات والإجراءات على الإطار الحالي حتى تعود منه. يعيد `navigate` إلى المستند ذي المستوى الأعلى.

```sh
npx wdio session frame <target>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | نعم | مرجع أو محدد أو parent أو top |

**أمثلة**

```sh
# الدخول إلى iframe والنظر داخله
npx wdio session frame e12 && npx wdio session snapshot -i

# العودة إلى الصفحة
npx wdio session frame top
```

انظر أيضًا: [`tabs`](#tabs)، [`snapshot`](#snapshot).

## `contexts`

عرض السياقات الأصلية/سياقات webview أو التبديل بينها. ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session contexts [sub] [name]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | لا | switch |
| `name` | لا | اسم السياق |

**أمثلة**

```sh
# عرض سياقات NATIVE_APP وWEBVIEW
npx wdio session contexts

# التحكم في webview
npx wdio session contexts switch WEBVIEW_com.example.shop
```

انظر أيضًا: [`snapshot`](#snapshot).

## `dialog`

قبول مربع حوار مفتوح أو رفضه أو الإبلاغ عنه. ينطبق على: الويب، والهاتف المحمول الأصلي.

يحظر مربع alert أو confirm أو prompt المفتوح الإجراءات الأخرى، والتي تفشل مع تلميح لتشغيل هذا الأمر.

```sh
npx wdio session dialog <sub>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | accept \| dismiss \| status |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--text <value>` | نص الإدخال (مع accept فقط) |

**أمثلة**

```sh
# عرض مربع الحوار المفتوح
npx wdio session dialog status

# التأكيد
npx wdio session dialog accept

# الإجابة على مربع إدخال
npx wdio session dialog accept --text "Ada"
```

انظر أيضًا: [`click`](#click).

## `app`

تشغيل تطبيق أو إنهاؤه أو تثبيته أو الاستعلام عنه. ينطبق على: الهاتف المحمول الأصلي، وسطح المكتب الأصلي.

```sh
npx wdio session app <sub> <id>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | launch \| terminate \| install \| state |
| `id` | نعم | معرّف التطبيق أو معرّف الحزمة أو الملف |

**أمثلة**

```sh
# إعادة تشغيل التطبيق
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# هل هو قيد التشغيل؟
npx wdio session app state com.example.shop
```

انظر أيضًا: [`deeplink`](#deeplink)، [`background`](#background).

## `deeplink`

فتح رابط عميق. ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session deeplink <url>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `url` | نعم | عنوان URL |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--package <value>` | حزمة Android أو معرّف حزمة iOS |

**أمثلة**

```sh
# فتح شاشة منتج
npx wdio session deeplink shop://product/42 --package com.example.shop
```

انظر أيضًا: [`app`](#app).

## `rotate`

تدوير الجهاز. ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session rotate <orientation>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `orientation` | نعم | portrait \| landscape |

**أمثلة**

```sh
# تدوير الجهاز أفقيًا
npx wdio session rotate landscape
```

## `keyboard`

إخفاء لوحة المفاتيح على الشاشة. ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session keyboard <sub>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | hide |

**أمثلة**

```sh
# كشف العناصر الموجودة تحت لوحة المفاتيح
npx wdio session keyboard hide
```

## `background`

إرسال التطبيق إلى الخلفية. ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session background <seconds>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `seconds` | نعم | عدد الثواني (القيمة -1 تبقيه هناك) |

**أمثلة**

```sh
# إرسال التطبيق إلى الخلفية لمدة 3 ثوانٍ
npx wdio session background 3
```

انظر أيضًا: [`app`](#app).

## `lock`

قفل الجهاز. ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session lock
```

**أمثلة**

```sh
# قفل الشاشة
npx wdio session lock
```

انظر أيضًا: [`unlock`](#unlock).

## `unlock`

إلغاء قفل الجهاز. ينطبق على: الهاتف المحمول الأصلي.

```sh
npx wdio session unlock
```

**أمثلة**

```sh
# إلغاء قفل الشاشة
npx wdio session unlock
```

انظر أيضًا: [`lock`](#lock).

## `geolocation`

تعيين الموقع الجغرافي. ينطبق على: الويب، والهاتف المحمول الأصلي.

```sh
npx wdio session geolocation <lat> <lon>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `lat` | نعم | خط العرض |
| `lon` | نعم | خط الطول |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--accuracy <n>` | الدقة بالأمتار |

**أمثلة**

```sh
# التظاهر بالوجود في برلين
npx wdio session geolocation 52.52 13.405
```

انظر أيضًا: [`emulate`](#emulate).

## `emulate`

محاكاة جهاز أو منفذ عرض أو شبكة أو معالج أو ساعة أو نطاق محاكاة BiDi. ينطبق على: الويب.

تبقى المحاكاة سارية حتى `emulate reset` أو انتهاء الجلسة؛ ويؤدي تعيين النوع نفسه مرة أخرى إلى استبدالها. يعرض `emulate device` دون قيمة أسماء الأجهزة. تحتاج إعدادات الشبكة المسبقة وتقييد المعالج إلى متصفح مبني على Chromium.

```sh
npx wdio session emulate <sub> [value]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | لا | قيمة المحاكاة |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--dpr <n>` | نسبة بكسل الجهاز (viewport) |
| `--tick <n>` | تقديم الساعة المحاكاة بعدد من المللي ثواني (clock) |

**أمثلة**

```sh
# محاكاة هاتف
npx wdio session emulate device "iPhone 15"

# تعيين منفذ عرض
npx wdio session emulate viewport 375x812 --dpr 3

# قطع الاتصال بالشبكة
npx wdio session emulate network offline

# الوضع الداكن
npx wdio session emulate color-scheme dark

# تثبيت التاريخ
npx wdio session emulate clock 2030-01-01T00:00:00Z

# تقليل الحركة
npx wdio session emulate media prefersReducedMotion=reduce

# التراجع عن جميع عمليات المحاكاة
npx wdio session emulate reset
```

انظر أيضًا: [`geolocation`](#geolocation)، [`screenshot`](#screenshot).

## `requests`

عرض طلبات الشبكة الملتقطة (BiDi). ينطبق على: الويب.

```sh
npx wdio session requests
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--filter <value>` | سلسلة فرعية أو نمط glob |
| `--failed` | الطلبات الفاشلة فقط |
| `--since <value>` | الطلبات الأحدث من هذه المدة فقط |
| `--limit <n>` | الحد الأقصى للأسطر (الافتراضي 50) |

**أمثلة**

```sh
# استدعاءات API فقط
npx wdio session requests --filter "**/api/**"

# الطلبات التي أفسدتها نقرة
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

انظر أيضًا: [`mock`](#mock)، [`logs`](#logs).

## `mock`

محاكاة الاستجابات لنمط عنوان URL (BiDi). ينطبق على: الويب.

يطبع معرّف المحاكاة (m1، m2، …). تؤدي محاكاة النمط نفسه مرة أخرى إلى استبدال المحاكاة السابقة.

```sh
npx wdio session mock <pattern>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `pattern` | نعم | نمط عنوان URL |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--status <n>` | رمز الحالة |
| `--body <value>` | المحتوى بصيغة JSON/نص أو مسار ملف |
| `--header <value>` | ترويسة k:v (قابل للتكرار) |
| `--abort` | إلغاء الطلبات المطابقة |
| `--method <value>` | هذه الطريقة فقط |
| `--once` | الطلب التالي فقط |

**أمثلة**

```sh
# إرجاع JSON ثابت
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# إفشال الطلب التالي
npx wdio session mock "**/api/cart" --status 500 --once

# حظر الصور
npx wdio session mock "**/*.png" --abort
```

انظر أيضًا: [`unmock`](#unmock)، [`requests`](#requests).

## `unmock`

إزالة عمليات المحاكاة. ينطبق على: الويب.

```sh
npx wdio session unmock [pattern]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `pattern` | لا | النمط أو معرّف المحاكاة |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--all` | إزالة جميع عمليات المحاكاة |

**أمثلة**

```sh
# إزالة محاكاة واحدة
npx wdio session unmock m1

# إزالة جميع عمليات المحاكاة
npx wdio session unmock --all
```

انظر أيضًا: [`mock`](#mock).

## `cookies`

الحصول على ملفات تعريف الارتباط أو تعيينها أو مسحها. ينطبق على: الويب.

دون أمر فرعي، يطبع كل ملف تعريف ارتباط بصيغة name=value. يحذف `clear` دون اسم جميع ملفات تعريف الارتباط.

```sh
npx wdio session cookies [sub] [name] [value]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | لا | get \| set \| clear |
| `name` | لا | اسم ملف تعريف الارتباط |
| `value` | لا | قيمة ملف تعريف الارتباط |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--domain <value>` | نطاق ملف تعريف الارتباط (set) |
| `--path <value>` | مسار ملف تعريف الارتباط (set) |
| `--http-only` | ملف تعريف ارتباط HttpOnly (set) |
| `--secure` | ملف تعريف ارتباط Secure (set) |
| `--same-site <value>` | lax أو strict أو none أو default (set) |
| `--expiry <n>` | تاريخ الانتهاء كطابع زمني Unix بالثواني (set) |

**أمثلة**

```sh
# عرض ملفات تعريف الارتباط
npx wdio session cookies

# قيمة ملف تعريف ارتباط واحد
npx wdio session cookies get session

# تعيين ملف تعريف ارتباط وإعادة التحميل
npx wdio session cookies set session abc && npx wdio session reload

# حذف جميع ملفات تعريف الارتباط
npx wdio session cookies clear
```

انظر أيضًا: [`storage`](#storage)، [`state`](#state).

## `storage`

الحصول على localStorage (أو sessionStorage) أو تعيينه أو مسحه. ينطبق على: الويب.

دون أمر فرعي، يطبع كل الإدخالات. يُفرغ `clear` دون مفتاح المخزن.

```sh
npx wdio session storage [sub] [key] [value]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | لا | get \| set \| clear |
| `key` | لا | المفتاح |
| `value` | لا | القيمة |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--session-storage` | استخدام sessionStorage |

**أمثلة**

```sh
# عرض localStorage
npx wdio session storage

# تعيين مفتاح
npx wdio session storage set token abc

# إفراغ sessionStorage
npx wdio session storage clear --session-storage
```

انظر أيضًا: [`cookies`](#cookies)، [`state`](#state).

## `state`

حفظ ملفات تعريف الارتباط والتخزين أو تحميلها. ينطبق على: الويب.

يكتب `save` ملفات تعريف الارتباط وlocalStorage وsessionStorage للأصل الحالي في ملف JSON. ويفتح `load` ذلك الأصل ويستعيدها، مثلًا لتخطي تسجيل الدخول.

```sh
npx wdio session state <sub> <file>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | save \| load |
| `file` | نعم | ملف الحالة |

**أمثلة**

```sh
# حفظ حالة تسجيل الدخول
npx wdio session state save .wdio/logged-in.json

# البدء مع تسجيل الدخول
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

انظر أيضًا: [`cookies`](#cookies)، [`storage`](#storage).

## `visual`

لقطات بصرية عبر @wdio/visual-service. ينطبق على: الويب، والهاتف المحمول الأصلي، وسطح المكتب الأصلي.

يخزّن `save` خط أساس ضمن .wdio/visual/baseline، ويقارن `check` به ويطبع الاختلاف، ويحوّل `accept` آخر صورة فعلية إلى خط الأساس، ويعرض `list` الوسوم. يتطلب وجود @wdio/visual-service في المشروع.

```sh
npx wdio session visual <sub> [tag]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | save \| check \| accept \| list |
| `tag` | لا | وسم الصورة |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--element <value>` | هذا العنصر فقط |
| `--full` | الصفحة كاملة |
| `--tabbable` | الصفحة القابلة للتنقل بمفتاح Tab |
| `--threshold <n>` | نسبة الاختلاف المسموح بها (الافتراضي 0) |
| `--all` | accept: جميع الوسوم |

**أمثلة**

```sh
# تخزين خط أساس
npx wdio session visual save cart

# المقارنة به
npx wdio session visual check cart --threshold 0.5

# قبول تغيير مقصود
npx wdio session visual accept cart
```

انظر أيضًا: [`screenshot`](#screenshot).

## `trace`

تسجيل كل خطوة مع لقطات الشاشة واللقطات.

يطبع `stop` مجلد التتبع ونصًا مكتوبًا للخطوات.

```sh
npx wdio session trace <sub>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | start \| stop |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--screenshots` | لقطة شاشة بعد كل خطوة (استخدم --no-screenshots للتخطي) |
| `--snapshots` | لقطة بعد كل خطوة (استخدم --no-snapshots للتخطي) |

**أمثلة**

```sh
# بدء التتبع
npx wdio session trace start

# الإيقاف وطباعة النص المكتوب
npx wdio session trace stop
```

انظر أيضًا: [`record`](#record)، [`history`](#history).

## `record`

تسجيل فيديو. ينطبق على: الويب، والهاتف المحمول الأصلي.

```sh
npx wdio session record <sub>
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `sub` | نعم | start \| stop |

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--fps <n>` | عدد الإطارات في الثانية (الافتراضي 5) |
| `--path <value>` | ملف الإخراج |

**أمثلة**

```sh
# بدء التسجيل
npx wdio session record start

# الإيقاف وحفظ الفيديو
npx wdio session record stop --path checkout.mp4
```

انظر أيضًا: [`trace`](#trace)، [`screenshot`](#screenshot).

## `history`

طباعة الخطوات المسجّلة.

يسجّل كل إجراء يغيّر الصفحة شيفرة WebdriverIO التي شغّلها. ويحوّل `export` هذا السجل إلى ملف مواصفات (spec).

```sh
npx wdio session history
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--clear` | مسح السجل |

**أمثلة**

```sh
# عرض الخطوات حتى الآن
npx wdio session history

# بدء التسجيل من جديد قبل الخطوات التي تريد الاحتفاظ بها
npx wdio session history --clear
```

انظر أيضًا: [`export`](#export)، [`exec`](#exec).

## `export`

إنشاء ملف مواصفات (spec) من السجل.

يكتب ملف مواصفات بصيغة describe/it يتضمن الخطوات المسجّلة. تتحول المراجع إلى محددات مستقرة وتتحول الدوال المساعدة إلى أوامر مخصصة. دون --out يُحفظ الملف في مجلد المخرجات. شغّله باستخدام `wdio run` للتأكد من نجاحه.

```sh
npx wdio session export
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--out <value>` | ملف الإخراج |
| `--title <value>` | عنوان مجموعة الاختبارات |
| `--page-objects` | إنشاء كائنات الصفحات (page objects) |
| `--framework <mocha\|jasmine>` | إطار العمل (الافتراضي mocha) |

**أمثلة**

```sh
# كتابة ملف المواصفات
npx wdio session export --out test/specs/cart.e2e.ts

# كتابة ملف المواصفات وتشغيله
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

انظر أيضًا: [`history`](#history)، [`helpers`](#helpers).

## `resume`

متابعة اختبار أوقفه wdio run --debug=agent مؤقتًا.

يوقف `wdio run --debug=agent` الاختبار الفاشل مؤقتًا ويتيحه كجلسة debug-`<worker>`. افحصه بأي إجراء، ثم استأنفه. أما `close` على تلك الجلسة فيؤدي إلى فشل الاختبار بدلًا من ذلك.

```sh
npx wdio session resume
```

**أمثلة**

```sh
# النظر إلى الاختبار المتوقف مؤقتًا، ثم السماح له بالمتابعة
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

انظر أيضًا: [`close`](#close)، [`list`](#list).

## `doctor`

فحص بيئتك.

يطبع سطرًا واحدًا لكل فحص مع حل لكل إخفاق. يخرج بالرمز 1 عند فشل أي فحص.

```sh
npx wdio session doctor [target]
```

**الوسائط**

| الاسم | مطلوب | الوصف |
| --- | --- | --- |
| `target` | لا | فحص ما يحتاجه هذا الهدف فقط |

**أمثلة**

```sh
# فحص كل شيء
npx wdio session doctor

# فحص ما تحتاجه جلسة Android
npx wdio session doctor android
```

انظر أيضًا: [`open`](#open).

## `skill`

طباعة مهارة الوكيل (agent skill).

```sh
npx wdio session skill
```

**الخيارات**

| الخيار | الوصف |
| --- | --- |
| `--install <value>` | كتابتها في .agents/skills/wdio-session/SKILL.md (أو في هذا المجلد) |

**أمثلة**

```sh
# طباعة المهارة
npx wdio session skill

# إضافتها إلى هذا المشروع
npx wdio session skill --install .
```