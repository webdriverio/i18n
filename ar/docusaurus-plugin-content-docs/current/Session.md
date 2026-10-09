---
id: session
title: wdio session
description: تحكّم في متصفح أو تطبيق جوال أو تطبيق سطح مكتب من سطر الأوامر باستخدام أوامر wdio session القصيرة، ثم صدّر الخطوات كاختبار.
---

يُبقي `wdio session` جلسة WebdriverIO واحدة نشطة عبر العديد من أوامر سطر الأوامر القصيرة. استخدمه لاستكشاف واجهة مستخدم، والتحقق من تغيير ما، وتحويل الخطوات التي نجحت إلى اختبار. وهو جزء من `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

اسم الجلسة هو `default`. مرّر `-s <name>` فقط عندما تحتاج إلى جلستين في الوقت نفسه. تتحكم صفحة [الأهداف](/docs/session/targets) في تطبيق Expo تجريبي واحد في نافذة Chrome مرئية وفي نافذة Electron، وكلاهما بحجم سطح المكتب. وتوجد أوامر Android وiOS للتطبيق نفسه في تلك الصفحة.

## التثبيت

يُعد `wdio session` جزءًا من واجهة سطر أوامر WebdriverIO. يقوم `npx wdio` بتثبيت الحزمة غير المقيّدة بنطاق [`wdio`](https://www.npmjs.com/package/wdio) وتشغيل واجهة سطر الأوامر تلك. لا تحتاج إلى تثبيت `@wdio/session` بنفسك.

```sh
npx wdio session --help
npx wdio session click --help
```

يطبع `--help` سير العمل، والإجراءات مصنفة حسب المجموعة، والخيارات العامة، ورموز الخروج. ويطبع `<action> --help` معاملات ذلك الإجراء وخياراته والمنصات المدعومة والأمثلة والإجراءات ذات الصلة. والنص نفسه موجود في صفحة [الأوامر](/docs/session-commands). تحتفظ مهارة الوكيل بالحلقة الأساسية فقط وتوجّه الوكلاء إلى `--help` لبقية التفاصيل، لذا لا تصبح قديمة عندما تتغير واجهة سطر الأوامر.

أنشئ هيكل مشروع باستخدام:

```sh
npm init wdio@latest
```

وافق على "Set up coding agent support" لكتابة `.agents/skills/wdio-session/SKILL.md`، وقسم في `AGENTS.md`، وإدخال `.wdio/session/` في ملف gitignore. ثبّت المهارة لاحقًا باستخدام:

```sh
npx wdio session skill --install .
```

يتحقق `npx wdio session doctor` من Node.js والمتصفح وAppium وحزم SDK وبيانات اعتماد الخدمات السحابية. ويتحقق `doctor <target>` فقط مما يحتاجه ذلك الهدف. تنتهي العملية برمز الخروج 1 عند فشل أي فحص.

## افتح صفحة وتفاعل معها

افتح Chrome بدون واجهة (أضف `--headed` لإظهار النافذة). يطبع `open` العناصر التفاعلية في الصفحة:

```sh
npx wdio session open chrome http://localhost:3000
```

يبدو العنصر بالشكل `button "Add to cart" [ref=e3]`. استخدم ذلك المرجع (ref). يُبلغ كل إجراء بما غيّره في الصفحة، مع مراجع للعناصر الجديدة، لذا نادرًا ما تحتاج إلى `snapshot` منفصل:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

تقبل `open firefox` و`open edge` و`open safari` عنوان URL نفسه. يتم تنزيل Chrome وFirefox وEdge عند الاستخدام الأول إذا لم تكن مثبتة. يتطلب Safari نظام macOS.

### Android

يعمل Android وiOS عبر Appium 3. يُبلغ `doctor android` عن الخادم أو برنامج التشغيل المفقود مع أمر التثبيت.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

لنظام iOS: `open ios --bundle-id com.example.shop`. ولسطح المكتب الأصلي: `open macos --bundle-id com.example.shop` و`open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

يحتاج `open tauri ./my-app` و`open dioxus ./my-app` إلى وجود برنامج التشغيل الخاص بهما في `PATH`. على Linux بدون `DISPLAY` أو `WAYLAND_DISPLAY`، ثبّت Xvfb أو weston.

## المراقبة والمراجع

| الأمر | استخدمه من أجل |
| --- | --- |
| `snapshot --interactive` | العناصر التي يمكنك التفاعل معها، ولكل منها مرجع |
| `snapshot --compact` | الشجرة نفسها مع إزالة الأغلفة الفارغة غير المسماة |
| `snapshot --urls` | عناوين الروابط على كل رابط |
| `find "Add to cart"` | سطر من لقطة جديدة |
| `diff` | ما تغيّر منذ اللقطة السابقة |
| `screenshot` | التخطيط. تجاوزه عندما تجيب اللقطة عن السؤال |
| `pdf` | ملف PDF للصفحة الحالية (`pdf report.pdf`). تطبع جلسات BiDi في الوضعين المرئي وبدون واجهة |
| `source` | HTML الصفحة أو XML الأصلي |

تأتي المراجع من أحدث لقطة. بعد التنقل، التقط لقطة مرة أخرى. يفشل المرجع القديم مع `REF_STALE`. ويفشل المرجع غير المعروف مع `REF_NOT_FOUND`.

## `exec`

يُشغّل `exec` شيفرة WebdriverIO. استخدم `await` دائمًا مع الأوامر. يُرجع `$` عنصرًا واحدًا ويرمي خطأً عندما يكون مفقودًا. لا يوجد وضع متزامن ولا يوجد `browser.element`.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

ضع التأكيدات في `exec` باستخدام `expect-webdriverio`. استخدم `visual check <tag>` (يحتاج إلى `@wdio/visual-service`) عندما يكون السؤال عن شكل الشاشة.

## التصدير

يكتب `export` ملف مواصفات (spec) من الخطوات المسجلة. يتم استبدال المراجع بمحددات ثابتة.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

تقبل `open firefox` و`open edge` و`open safari` عنوان URL نفسه. أما الأهداف الأخرى واللقطات و`exec` والتصدير وتشغيل اختبار متوقف مؤقتًا فلها صفحات منفصلة في هذا القسم.

## هذا القسم

| الصفحة | استخدمها من أجل |
| --- | --- |
| [الأهداف](/docs/session/targets) | المتصفحات وAndroid وiOS وسطح المكتب وElectron وTauri وDioxus والأجهزة السحابية، بما في ذلك التطبيق التجريبي في Chrome وAndroid وElectron |
| [اللقطات والمراجع](/docs/session/snapshots) | ما يظهر على الشاشة، والمراجع التي تنقر عليها |
| [تشغيل الشيفرة](/docs/session/exec) | `exec` والتأكيدات والفحوصات المرئية |
| [تصدير اختبار](/docs/session/export) | ملفات المواصفات وكائنات الصفحات و`.wdio/helpers` |
| [تصحيح أخطاء اختبار](/docs/session/debug) | `wdio run --debug=agent` و`wdio repl --session` |
| [الأوامر](/docs/session-commands) | كل إجراء وخيار |

## استكشاف الأخطاء وإصلاحها

| الرسالة | ما يجب فعله |
| --- | --- |
| `SESSION_EXISTS` | الاسم قيد التشغيل بالفعل. استخدم `-s` مع اسم آخر، أو `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | شغّل `snapshot` مرة أخرى واستخدم مرجعًا من ذلك المخرج. |
| `NOT_EDITABLE` | هدف `fill` ليس حقلًا قابلًا للتحرير ولا يحتوي على حقل واحد قابل للتحرير بداخله (أو خلف `aria-controls`/`aria-owns`/label). شغّل `snapshot --scope <target>` واملأ مرجع الحقل. |
| `MISSING_DEPENDENCY` | ثبّت الحزمة المذكورة في الخطأ، أو شغّل `wdio session doctor <target>`. |
| `MISSING_APPIUM_DRIVER` | شغّل سطر `npx appium driver install …` الوارد في الخطأ. |
| `MISSING_CREDENTIALS` | صدّر المتغيرات المذكورة. لا يطبع doctor قيمها أبدًا. |
| `Session closed from wdio session` | تم إغلاق جلسة التصحيح. استأنف بدلًا من الإغلاق عندما يجب أن يستمر الاختبار. |

رموز الخروج: 0 نجاح، 1 فشل الإجراء، 2 خطأ في الاستخدام، 3 تبعية أو بيانات اعتماد مفقودة، 4 لا توجد جلسة بهذا الاسم.

## الخطوات التالية

- [الأهداف](/docs/session/targets) — افتح متصفحًا، أو تطبيق Android أو iOS، أو نافذة Electron
- [WebdriverIO لوكلاء البرمجة](/docs/ai-agents) — المهارة والوثائق وقواعد المشروع
- [أوامر wdio session](/docs/session-commands) — كل إجراء وخيار