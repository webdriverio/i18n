---
id: ai-agents
title: WebdriverIO لوكلاء البرمجة
description: قم بإعداد Cursor أو Claude Code أو Copilot أو أي وكيل برمجة آخر لكتابة اختبارات WebdriverIO وتشغيلها وتصحيحها باستخدام الوثائق القابلة للقراءة آليًا وخادم WebdriverIO MCP وتتبعات DevTools.
---

تُكتب معظم اختبارات WebdriverIO اليوم بالتعاون مع وكيل برمجة. توضح هذه الصفحة كيفية تزويد الوكيل بالأشياء الثلاثة التي يحتاجها لأداء ذلك بشكل جيد: **وثائق محدّثة** (حتى يكتب كود v10 بدلاً من التخمين)، و**طريقة للتحكم في التطبيق قيد الاختبار** (حتى يتمكن من استكشاف واجهة المستخدم والتحقق من المحددات)، و**عمليات تشغيل اختبارات قابلة للتصحيح** (حتى يتمكن من إصلاح الاختبارات الفاشلة بنفسه).

## 1. زوّد وكيلك بالوثائق

كل صفحة في هذا الموقع متاحة بصيغة Markdown نظيفة، بدون تنقل أو نصوص برمجية أو تنسيقات:

| المورد | الرابط | استخدمه من أجل |
| --- | --- | --- |
| فهرس الوثائق | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | خريطة منسّقة لجميع الصفحات مع ملخصات من سطر واحد. ابدأ من هنا. |
| الوثائق الكاملة | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | الوثائق الكاملة في ملف واحد، للوكلاء ذوي نوافذ السياق الكبيرة. |
| أي صفحة مفردة | أضف `.md` إلى الرابط، مثل [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | تحميل الصفحة التي يحتاجها الوكيل بالضبط. |
| التفاوض على المحتوى | اطلب أي رابط `/docs/*` مع `Accept: text/markdown` | الوكلاء والأدوات التي تجلب الروابط كما هي. |

تحتوي كل صفحة من صفحات الوثائق أيضًا على قائمة **Copy page** مع خيارات لنسخ الصفحة بصيغة Markdown أو فتحها مباشرة في ChatGPT أو Claude أو Cursor.

### خادم MCP للوثائق

الوثائق متاحة أيضًا كخادم MCP بعيد على `https://webdriver.io/mcp`. يمنح الوكيل ثلاث أدوات: `search_docs` للعثور على الصفحة المناسبة، و`get_page` لقراءتها بصيغة Markdown، و`list_sections` لتحميل قسم كامل دفعة واحدة. أضفه بجانب خادم WebdriverIO MCP الموضح أدناه:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

بالنسبة لـ Claude Code، شغّل `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`.

## اسمح لوكيلك باستخدام `wdio session`

يُبقي [`wdio session`](/docs/session) جلسة WebdriverIO نشطة بين أوامر الطرفية. يمكن للوكيل فتح متصفح أو هاتف أو تطبيق سطح مكتب، وأخذ لقطة لما يظهر على الشاشة، والتفاعل مع المراجع (refs)، وتصدير الخطوات الناجحة كاختبار. هذه هي الطريقة الافتراضية للتحكم في تطبيق من خلال وكيل برمجة. أما [خادم MCP](/docs/mcp) في القسم التالي فهو البديل عندما يُفترض أن يستدعي الوكيل أدوات بدلاً من الطرفية.

ثبّت المهارة (skill) في المشروع:

```sh
npx wdio session skill --install .
```

يكتب ذلك الملف `.agents/skills/wdio-session/SKILL.md`. يكتب `npm init wdio` الملف نفسه عندما توافق على دعم وكلاء البرمجة، ويضيف قواعد المشروع الموضحة أدناه.

يمكن للوكيل إنشاء المشروع بنفسه. يقبل المعالج علامة (flag) لكل سؤال، ويملأ `--yes` القيم الافتراضية للبقية، بحيث لا ينتظر أي إدخال أبدًا:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

يعرض `npm init wdio@latest -- --help` جميع العلامات وقيمها. راجع [الإجابة على المعالج باستخدام العلامات](/docs/gettingstarted#answer-the-wizard-with-flags). يغطي قسم [WebdriverIO Session](/docs/session) الأهداف واللقطات و`exec` والتصدير والتصحيح. مرجع الأوامر: [أوامر wdio session](/docs/session-commands).

### أضف الوثائق إلى وكيلك

لجعل الوثائق متاحة في كل محادثة، أضف الفهرس إلى وكيلك:

- **Cursor**: أضف `https://webdriver.io/llms.txt` كوثيقة مخصصة في إعدادات Cursor (_Indexing & Docs_)، ثم أشر إليها في المحادثة باستخدام `@` والاسم الذي منحته لها.
- **Claude Code / Codex / وكلاء CLI الآخرون**: أضف الرابط إلى ملف `AGENTS.md` أو `CLAUDE.md` الخاص بمشروعك (راجع [قواعد المشروع](#3-add-project-rules) أدناه). يجلب الوكلاء الصفحات التي يحتاجونها عند الطلب.

## 2. اسمح لوكيلك بالتحكم في المتصفح أو التطبيق

يتيح [خادم WebdriverIO MCP](/docs/mcp) (`@wdio/mcp`) للوكيل فتح المتصفحات (Chrome وFirefox وEdge وSafari)، وتطبيقات الهاتف الأصلية والهجينة (عبر Appium) والأجهزة السحابية، وفحص شجرة إمكانية الوصول، والنقر والكتابة وأخذ لقطات الشاشة. يستخدمه الوكلاء لاستكشاف صفحة قبل كتابة اختبار، وللعثور على محددات متينة، ولإعادة إنتاج فشل ما خطوة بخطوة.

أضفه إلى إعدادات عميل MCP الخاص بك (على سبيل المثال `.mcp.json` أو `.cursor/mcp.json` في مشروعك):

```json title=".mcp.json"
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

بالنسبة لـ Claude Code، سجّله من سطر الأوامر:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

راجع [إعدادات MCP](/docs/mcp/configuration) لخيارات الجلسة، و[مزودو الخدمات السحابية](/docs/mcp/cloud-providers) للتشغيل على BrowserStack أو Sauce Labs أو TestMu AI أو TestingBot.

## 3. أضف قواعد المشروع

يتبع الوكلاء اصطلاحات المشروع بموثوقية أكبر بكثير عندما تكون مكتوبة. أضف قسمًا مثل ما يلي إلى ملف `AGENTS.md` (أو `CLAUDE.md` أو `.cursor/rules`) في مشروع الاختبار الخاص بك، وعدّل المسارات والأوامر:

````md title="AGENTS.md"
## End-to-end tests (WebdriverIO v10)

- Docs: https://webdriver.io/llms.txt - fetch the relevant page as Markdown (append `.md`) before using an API you are not sure about. Do not use APIs from WebdriverIO v8 or older.
- Config: `wdio.conf.ts`. Specs: `test/specs/**/*.e2e.ts`. Page objects: `test/pageobjects/`.
- Run all tests: `npx wdio run wdio.conf.ts`
- Run a single spec: `npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts`
- Tests are async: always `await` commands, e.g. `await $('button').click()`. Never use the removed sync mode.
- Prefer user-facing selectors: accessibility name or text (`$('aria/Submit')`, `$('button=Submit')`), then `data-testid`. Avoid XPath and generated CSS classes.
- Rely on auto-waiting and `expect-webdriverio` matchers (`await expect($('h1')).toHaveText('Welcome')`) instead of `browser.pause()`.
- To explore the app or verify a selector, use the `wdio-mcp` MCP server.
- To drive the app from the shell, follow `.agents/skills/wdio-session/SKILL.md` (`npx wdio session`).
- When a test fails, read the DevTools trace in `test-results/` (see `transcript.md`) before changing code.
````

تعكس القواعد أعلاه التوصيات الواردة في [أفضل الممارسات](/docs/bestpractices) و[المحددات](/docs/selectors) و[الانتظار التلقائي](/docs/autowait).

## 4. اسمح للوكيل بتصحيح الاختبارات الفاشلة

يمكن لخدمة [WebdriverIO DevTools](/docs/devtools) تسجيل **تتبع** (trace) لكل عملية تشغيل: أداة قابلة للنقل تحتوي على نص Markdown مفصّل خطوة بخطوة، ولقطات شاشة، ولقطات لشجرة إمكانية الوصول، وسجلات الشبكة لكل إجراء. يمنح هذا الوكيل المعلومات نفسها التي يحصل عليها الإنسان من مشاهدة الاختبار، دون الحاجة إلى نافذة متصفح.

ثبّت الخدمة وفعّل وضع التتبع:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // تتبع واحد لكل اختبار يسهّل تسليم فشل واحد إلى الوكيل
            traceGranularity: 'test',
            // ملفات عادية بدلاً من ملف zip، حتى يتمكن الوكلاء من قراءتها مباشرة
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

بعد عملية التشغيل، تُكتب التتبعات في `test-results/`. وجّه وكيلك إلى مجلد الاختبار الفاشل واطلب منه قراءة `transcript.md` أولاً. راجع [وضع التتبع](/docs/devtools/wdio/trace-mode) لجميع الخيارات، بما في ذلك مستوى التفصيل والاحتفاظ.

## سير العمل الموصى به

1. اطلب من الوكيل استكشاف الميزة قيد الاختبار باستخدام خادم MCP واقتراح المحددات.
2. دعه يكتب ملف الاختبار وكائن الصفحة وفقًا لقواعد مشروعك، مع جلب صفحات وثائق WebdriverIO حسب الحاجة.
3. اجعله يشغّل ملف الاختبار المفرد باستخدام `--spec` ويكرر المحاولة حتى ينجح.
4. إذا فشل اختبار في CI، أعطِ الوكيل تتبع ذلك الاختبار ودعه يصلح الاختبار أو يبلّغ عن الخطأ.

## الخطوات التالية

- [البدء](/docs/gettingstarted) - أنشئ مشروعًا باستخدام `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - جميع الأدوات التي يوفرها خادم MCP
- [DevTools](/docs/devtools) - الوضع المباشر ووضع التتبع
- [أفضل الممارسات](/docs/bestpractices) - كيف تبدو اختبارات WebdriverIO الجيدة
- [من v9 إلى v10](/docs/v10-migration#migrate-with-a-coding-agent) - مهارة الترحيل لمجموعة اختبارات موجودة