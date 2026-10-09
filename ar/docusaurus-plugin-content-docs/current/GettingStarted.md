---
id: gettingstarted
title: البدء
description: أنشئ مشروع WebdriverIO باستخدام npm init wdio@latest، وشغّل اختبارك الأول، واعثر على الدليل التالي المناسب لمنصتك.
---

أعدّ WebdriverIO في مشروع موجود أو جديد بأمر واحد، ثم شغّل اختبارك الأول. يسألك معالج الإعداد عمّا تريد اختباره (الويب، أو الهاتف المحمول، أو سطح المكتب، أو إضافات VS Code)، وعن إطار العمل والمُبلِّغات (reporters) التي تريد استخدامها، ثم يثبّت كل شيء نيابةً عنك.

:::info
هذه هي وثائق WebdriverIO __v10__. هل ما زلت تستخدم v9؟ استخدم [وثائق v9](https://v9.webdriver.io) أو اتبع [دليل الترحيل إلى v10](/docs/v10-migration).
:::

:::tip هل تستخدم وكيل برمجة؟
وجّهه إلى [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) أو اربطه بخادم MCP الخاص بالوثائق على `https://webdriver.io/mcp`. راجع [WebdriverIO لوكلاء البرمجة](/docs/ai-agents).
:::

## بدء إعداد WebdriverIO

تضيف [مجموعة أدوات WebdriverIO للبدء](https://www.npmjs.com/package/create-wdio) إعدادًا كاملًا لـ WebdriverIO إلى مشروع موجود أو جديد. في المجلد الجذر لمشروع موجود، شغّل:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

أو إذا كنت تريد إنشاء مشروع جديد:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

أو إذا كنت تريد إنشاء مشروع جديد:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

أو إذا كنت تريد إنشاء مشروع جديد:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

أو إذا كنت تريد إنشاء مشروع جديد:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

يقوم هذا الأمر الواحد بتنزيل أداة سطر أوامر WebdriverIO (CLI) وتشغيل معالج إعداد يساعدك على تهيئة مجموعة اختباراتك.

<CreateProjectAnimation />

سيطرح المعالج مجموعة من الأسئلة التي ترشدك خلال عملية الإعداد. يمكنك تمرير المعامل `--yes` لاختيار إعداد افتراضي يستخدم Mocha مع Chrome باستخدام نمط [Page Object](https://martinfowler.com/bliki/PageObject.html).

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### الإجابة على أسئلة المعالج باستخدام الخيارات (flags)

لكل سؤال في المعالج خيار مقابل في سطر الأوامر. يجيب الخيار عن سؤاله، ولا يسأل المعالج إلا عن الباقي. وعند استخدامه مع `--yes`، يستخدم المعالج القيم الافتراضية للباقي ولا يطرح أي سؤال، وهذا ما يحتاجه وكيل البرمجة أو مهمة CI:

```sh
# Cucumber بلغة JavaScript، مع مُبلِّغَي spec و JUnit
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox و Edge بدلًا من Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# تطبيق Android باستخدام Appium
npm init wdio@latest . -- --yes --mobile-environment android

# اختبارات مكونات React
npm init wdio@latest . -- --yes --runner component --preset react

# كتابة ملف الإعداد، مع تثبيت الاعتماديات بنفسك
npm init wdio@latest . -- --yes --no-npm-install
```

مع Yarn و pnpm و bun، مرّر الخيارات دون الفاصل `--`، على سبيل المثال `pnpm create wdio@latest . --yes --framework cucumber`.

الخيارات الأكثر شيوعًا:

| الخيار | القيم |
| --- | --- |
| `--runner` | `e2e` (افتراضي)، `component`، `desktop`، `vscode`، `roku` |
| `--framework` | `mocha` (افتراضي)، `jasmine`، `cucumber`، `serenity-mocha`، `serenity-jasmine`، `serenity-cucumber` |
| `--typescript` / `--no-typescript` | TypeScript هو الافتراضي عندما يحتوي المشروع على ملف `tsconfig.json` |
| `--browsers` | قائمة مفصولة بفواصل من `chrome` (افتراضي)، `firefox`، `safari`، `edge` |
| `--mobile-environment` | `android`، `ios` |
| `--backend` | `local` (افتراضي)، `saucelabs`، `browserstack`، `experitest`، `grid`، `other` |
| `--preset` | `lit`، `vue`، `svelte`، `solid`، `stencil`، `react`، `preact`، `other`، مع `--runner component` |
| `--desktop-framework` | `electron`، `tauri`، `dioxus`، `macos`، مع `--runner desktop` |
| `--reporters`، `--services`، `--plugins` | أسماء مختصرة مفصولة بفواصل، على سبيل المثال `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | كتابة قسم `AGENTS.md` ومهارة `wdio-session` (مفعّل افتراضيًا) |
| `--npm-install` / `--no-npm-install` | تثبيت الاعتماديات (مفعّل افتراضيًا) |

يعرض الأمر `npm init wdio@latest -- --help` جميع الخيارات، والقيم التي يقبلها كل منها، والسؤال الذي يجيب عنه. تقبل الخيارات المنطقية (Boolean) البادئة `--no-`. وتعمل الخيارات نفسها مع `npx wdio config`.

يتحقق المعالج من كل خيار مقابل إعدادك. فإذا كانت هناك قيمة غير معروفة، أو خيار لسؤال لن يطرحه، أو قيمة لن يعرضها لإعدادك، فإنه يتوقف برمز الخروج 2 قبل أن يكتب أي ملف:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## تثبيت CLI يدويًا

يمكنك أيضًا إضافة حزمة CLI إلى مشروعك يدويًا عبر:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # يطبع على سبيل المثال `8.13.10`

# تشغيل معالج الإعداد
npx wdio config
```

## تشغيل الاختبار

يمكنك بدء مجموعة اختباراتك باستخدام الأمر `run` والإشارة إلى ملف إعداد WebdriverIO الذي أنشأته للتو:

```sh
npx wdio run ./wdio.conf.js
```

إذا كنت ترغب في تشغيل ملفات اختبار محددة، يمكنك إضافة المعامل `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

أو تعريف مجموعات (suites) في ملف الإعداد الخاص بك وتشغيل ملفات الاختبار المعرّفة في مجموعة معيّنة فقط:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## التشغيل داخل سكربت

إذا كنت ترغب في استخدام WebdriverIO كمحرك أتمتة في [الوضع المستقل](/docs/setuptypes#standalone-mode) داخل سكربت Node.JS، يمكنك أيضًا تثبيت WebdriverIO مباشرةً واستخدامه كحزمة، على سبيل المثال لالتقاط لقطة شاشة لموقع ويب:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__ملاحظة:__ جميع أوامر WebdriverIO غير متزامنة ويجب التعامل معها بشكل صحيح باستخدام [`async/await`](https://javascript.info/async-await).

## تسجيل الاختبارات

يوفر WebdriverIO أدوات تساعدك على البدء من خلال تسجيل إجراءات الاختبار التي تقوم بها على الشاشة وإنشاء سكربتات اختبار WebdriverIO تلقائيًا. راجع [تسجيل الاختبارات باستخدام Chrome DevTools Recorder](/docs/record) لمزيد من المعلومات.

## متطلبات النظام

ستحتاج إلى تثبيت [Node.js](http://nodejs.org).

- ثبّت الإصدار v22.19.0 على الأقل أو أعلى، إذ إنه أقدم إصدار LTS مدعوم
- الإصدارات المدعومة رسميًا هي فقط الإصدارات التي تُعدّ أو ستصبح إصدارات LTS

إذا لم يكن Node مثبتًا حاليًا على نظامك، نقترح استخدام أداة مثل [NVM](https://github.com/creationix/nvm) أو [Volta](https://volta.sh/) للمساعدة في إدارة عدة إصدارات نشطة من Node.js. يُعدّ NVM خيارًا شائعًا، بينما يُعدّ Volta بديلًا جيدًا أيضًا.

## شاهد المقدمة

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

تتوفر المزيد من الفيديوهات على [قناة YouTube الرسمية](https://youtube.com/@webdriverio).

## الخطوات التالية

- اختر منصتك: [متصفحات الويب](/docs/platforms/web)، أو [تطبيقات الهاتف المحمول](/docs/platforms/mobile)، أو [تطبيقات سطح المكتب](/docs/platforms/desktop)، أو [الإضافات والمحررات](/docs/platforms/apps-and-extensions)
- تعلّم كيفية [تحديد العناصر](/docs/selectors) وكتابة [التأكيدات](/docs/assertion)
- اضبط مشغّل الاختبارات في [`wdio.conf.ts`](/docs/configurationfile)
- احصل على المساعدة على [Discord](https://discord.webdriver.io)