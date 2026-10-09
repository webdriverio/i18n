---
id: web
title: متصفحات الويب
description: إعداد وتشغيل اختبارات WebdriverIO الشاملة (end-to-end) واختبارات المكونات والاختبارات المرئية واختبارات إمكانية الوصول في Chrome وFirefox وMicrosoft Edge وSafari.
---

يقوم WebdriverIO بأتمتة متصفحات سطح المكتب (Chrome وChromium وFirefox وMicrosoft Edge وSafari) من خلال برامج تشغيل المتصفحات القياسية. بشكل افتراضي، يحاول فتح جلسة [WebDriver BiDi](/docs/automationProtocols)، وهو الخلف ثنائي الاتجاه لبروتوكول WebDriver الكلاسيكي. يدعم BiDi ميزات مثل محاكاة الشبكة (network mocking) ومحاكاة واجهات Web API. اضبط `wdio:enforceWebDriverClassic: true` في الإمكانيات (capabilities) الخاصة بك لإلغاء الاشتراك في ذلك. لا تحتاج إلى تثبيت برامج التشغيل بنفسك: فقط حدد `browserName` وسيقوم WebdriverIO بتنزيل وتشغيل Chromedriver أو Geckodriver أو Edgedriver المطابق. كما يقوم بتثبيت Chrome أو Chromium أو Firefox عندما لا يتم العثور على تثبيت محلي. يجب أن يكون Microsoft Edge مثبتًا مسبقًا، ويأتي Safaridriver مضمنًا مع نظام macOS. يمكن لنفس مشغل الاختبارات (testrunner) أيضًا تشغيل الاختبارات داخل المتصفح باستخدام Browser Runner. ويغطي ذلك اختبارات الوحدات والمكونات لـ React وVue وSvelte وSolidJS وPreact وLit وStencil.

## البدء السريع

أنشئ هيكل مشروع بشكل تفاعلي باستخدام `npm init wdio@latest .`. يؤدي تمرير `--yes` إلى اختيار الإعدادات الافتراضية: Mocha وChrome وكائنات الصفحات (page objects). لإعداد مشروع يدويًا، قم بتثبيت مشغل الاختبارات ومحوّل إطار العمل (framework adapter) ومُعِد التقارير (reporter) و`tsx` لدعم TypeScript:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

تحصل كل إمكانية (capability) على عمليات عاملة (worker processes) خاصة بها، لذا يتم تشغيل ملف الاختبار في كل من Chrome وFirefox. القيم الصالحة الأخرى لـ `browserName` هي `chromium` و`msedge` و`safari`. للتشغيل في الوضع بدون واجهة (headless)، أضف وسائط المتصفح مثل `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`. راجع [تشغيل المتصفح بدون واجهة](/docs/capabilities#run-browser-headless) لمتصفحي Firefox وEdge؛ أما Safari فلا يدعم الوضع بدون واجهة.

## اختر مسارك

الاختبار الشامل (end-to-end) عبر المتصفحات:

- [الإمكانيات (Capabilities)](/docs/capabilities): خيارات المتصفح، والوضع بدون واجهة، وقنوات المتصفح (Canary وNightly وSafari Technology Preview) وخيارات برامج التشغيل `wdio:*`.
- [الملفات الثنائية لبرامج التشغيل](/docs/driverbinaries): كيف يعمل الإعداد التلقائي للمتصفح وبرنامج التشغيل، وكيفية الإشارة إلى ملفات ثنائية مخصصة.
- [بروتوكولات الأتمتة](/docs/automationProtocols): WebDriver مقابل WebDriver BiDi.
- [أوامر WebDriver BiDi](/docs/api/webdriverBidi): أوامر بروتوكول BiDi الخام المتاحة على كائن `browser`.
- [المحددات (Selectors)](/docs/selectors): محددات CSS والنص وARIA والعميقة (shadow DOM) وReact.
- [الانتظار التلقائي](/docs/autowait) و[المهلات الزمنية](/docs/timeouts): كيف ينتظر WebdriverIO العناصر وما الذي يمكن ضبطه.
- [التحكم المتعدد عن بُعد (Multi-remote)](/docs/multiremote): التحكم في عدة متصفحات ضمن اختبار واحد، على سبيل المثال لتطبيقات الدردشة أو WebRTC.

إمكانيات المتصفح التي تتطلب WebDriver BiDi (Chrome وEdge وFirefox؛ وليس Safari):

- [محاكاة الطلبات والتجسس عليها](/docs/mocksandspies): اعتراض طلبات الشبكة أو تعديلها أو استبدالها باستخدام `browser.mock()`. راجع أيضًا [كائن Mock](/docs/api/mock).
- [المحاكاة (Emulation)](/docs/emulation): محاكاة الموقع الجغرافي وميزات الوسائط ووكيل المستخدم (user agent) وحالة عدم الاتصال واللغة المحلية والمنطقة الزمنية والشاشة والأجهزة باستخدام `browser.emulate()`.

اختبار المكونات والوحدات في متصفح حقيقي:

- [اختبار المكونات](/docs/component-testing): كيف يعمل [Browser Runner](/docs/runner#browser-runner) المعتمد على Vite وكيفية إعداده.
- أدلة أطر العمل: [React](/docs/component-testing/react)، [Vue.js](/docs/component-testing/vue)، [Svelte](/docs/component-testing/svelte)، [SolidJS](/docs/component-testing/solid)، [Preact](/docs/component-testing/preact)، [Lit](/docs/component-testing/lit)، [Stencil](/docs/component-testing/stencil).
- [المحاكاة (Mocking)](/docs/component-testing/mocking) و[التغطية (Coverage)](/docs/component-testing/coverage) لاختبارات المكونات.

الاختبار المرئي واختبار إمكانية الوصول:

- [الاختبار المرئي](/docs/visual-testing): مقارنة صور الشاشة والعناصر والصفحة الكاملة باستخدام `@wdio/visual-service`.
- [اللقطات (Snapshot)](/docs/snapshot): تأكيدات لقطات DOM والكائنات.
- [Axe Core](/docs/accessibility-testing/axe-core): تشغيل فحوصات إمكانية الوصول Deque axe من اختباراتك.

التوسع:

- [Selenium Grid](/docs/seleniumgrid) و[الخدمات السحابية](/docs/cloudservices) و[Docker](/docs/docker): تشغيل المتصفحات عن بُعد.
- [التجزئة (Sharding)](/docs/sharding): تقسيم مجموعة الاختبارات عبر أجهزة CI.

يستخدم اختبار المكونات نفس ملف الإعدادات مع مشغل مختلف. على سبيل المثال، لاستخدام الإعداد المسبق لـ React:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

يتطلب Browser Runner الحزمة `@wdio/browser-runner`. ويحتاج الإعداد المسبق لـ React أيضًا إلى `@vitejs/plugin-react`، وتوصي الأدلة باستخدام `@testing-library/react` للعرض. توجد إعدادات مسبقة لـ `vue` و`svelte` و`solid` و`react` و`preact` و`stencil`. لأي شيء آخر، استخدم `viteConfig` بدلاً من ذلك.

## استكشاف الأخطاء وإصلاحها

- يفشل Chrome في البدء في بيئة CI مع رسالة "user data directory is already in use" أو "DevToolsActivePort file doesn't exist": راجع [الوضع بدون واجهة وخوادم العرض](/docs/headless-and-display-servers#troubleshooting).
- لا يكون لـ `browser.mock()` أو `browser.emulate()` أي تأثير: الجلسة لا تستخدم WebDriver BiDi. تحقق من متصفحك (Safari لا يدعم BiDi)، ومن مزود الخدمة السحابية، ومن `wdio:enforceWebDriverClassic`.
- لا يمكن تنزيل برامج التشغيل أو المتصفحات خلف خادم وكيل (proxy): راجع [مضيف تنزيل برامج التشغيل المخصص](/docs/capabilities#custom-driver-download-host) و[إعداد الوكيل](/docs/proxy).
- الاختبارات غير المستقرة (Flaky): راجع [إعادة محاولة الاختبارات غير المستقرة](/docs/retry) و[تصحيح الأخطاء](/docs/debugging).

## الخطوات التالية

- مرجع [الإعدادات](/docs/configuration) لكل خيار من خيارات `wdio.conf.ts`.
- [إعداد TypeScript](/docs/typescript) و[أطر العمل](/docs/frameworks) (Mocha وJasmine وCucumber).
- [نمط كائن الصفحة](/docs/pageobjects) لهيكلة مجموعات الاختبارات الأكبر.
- [MCP](/docs/mcp) للسماح لوكيل ذكاء اصطناعي بقيادة جلسة متصفح عبر WebdriverIO.
- منصات أخرى: [تطبيقات الهاتف المحمول](/docs/platforms/mobile)، [تطبيقات سطح المكتب](/docs/platforms/desktop)، [الإضافات والمحررات](/docs/platforms/apps-and-extensions).