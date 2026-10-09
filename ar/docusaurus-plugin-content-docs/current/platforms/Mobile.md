---
id: mobile
title: تطبيقات الهاتف المحمول
description: إعداد وتشغيل اختبارات WebdriverIO للتطبيقات الأصلية والهجينة وتطبيقات الويب على الهاتف المحمول على محاكيات Android وiOS والأجهزة الحقيقية والسحابات الخاصة بالأجهزة.
---

يقوم WebdriverIO بأتمتة Android وiOS من خلال [Appium](/docs/appium)، الذي يتحدث بروتوكول WebDriver. تستخدم اختباراتك نفس كائن `browser` (المعروف أيضًا باسم `driver`)، ومحددات `$`/`$$` ومطابقات `expect` المستخدمة في اختبارات المتصفح. يوجّه Appium كل جلسة إلى مشغّل منصة يتم اختياره عبر `appium:automationName`. بالنسبة لـ Android يكون ذلك `UiAutomator2`، مع Espresso كبديل يتيح استراتيجيات محددات إضافية. أما بالنسبة لـ iOS وiPadOS فهو `XCUITest`. باستخدام هذه المشغّلات يمكنك اختبار التطبيقات الأصلية وتطبيقات الويب على الهاتف المحمول في Chrome على Android أو Safari على iOS. يمكنك أيضًا اختبار التطبيقات الهجينة، مع التبديل بين السياق الأصلي وعروض الويب (webviews) المضمّنة. يمكن تشغيل الجلسات على محاكيات Android ومحاكيات iOS والأجهزة الحقيقية أو سحابات الأجهزة مثل Sauce Labs وBrowserStack وTestingBot وTestMu AI. تقوم خدمة [`@wdio/appium-service`](/docs/appium-service) بتشغيل خادم Appium محلي وإيقافه نيابةً عنك. وفوق واجهة برمجة Appium الأساسية، يضيف WebdriverIO [أوامر الهاتف المحمول](/docs/api/mobile) متعددة المنصات مثل `tap` و`swipe` و`longPress` و`scrollIntoView` و`switchContext`.

## البدء السريع

المتطلبات المسبقة: Android Studio مع Android SDK ومحاكي لـ Android؛ وXcode ومحاكي على macOS لـ iOS. يرشدك الأمر `npx appium-installer` خلال إعداد البيئة، ويقوم الأمر `npm init wdio@latest .` بإنشاء هيكل مشروع للهاتف المحمول (اختر Android أو iOS). للإعداد يدويًا:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/appium-service appium tsx
npx appium driver install uiautomator2   # Android
npx appium driver install xcuitest       # iOS
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
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './path/to/app.apk'
    }],
    services: ['appium'],
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

```ts title="test/specs/app.e2e.ts"
import { expect, driver, $ } from '@wdio/globals'

describe('My app', () => {
    it('should open the contacts screen', async () => {
        await $('~Contacts').click()
        await expect($('~Add contact')).toBeDisplayed()
    })

    it('should interact with a webview', async () => {
        await driver.switchContext({ title: 'My Webview Title' })
        await expect($('h1')).toBeDisplayed()
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

`~` هو محدد معرّف إمكانية الوصول (accessibility id): يرتبط بـ `content-description` على Android و`accessibilityIdentifier` على iOS، وهو الاستراتيجية المفضّلة متعددة المنصات. استبدل المعرّفات الواردة في المثال وعنوان عرض الويب ومسار التطبيق بالقيم الخاصة بك.

الأهداف الأخرى لا تغيّر سوى الإمكانيات (capabilities):

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app للمحاكيات، و.ipa موقّع للأجهزة الحقيقية
}
```

```ts title="Mobile web (Chrome on an Android emulator)"
{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2'
}
```

بالنسبة لتطبيقات الويب على iOS، استخدم `platformName: 'iOS'` و`browserName: 'Safari'` و`'appium:automationName': 'XCUITest'`.

## اختر مسارك

- [إعداد Appium](/docs/appium): المنصات التي يغطيها Appium (iOS وAndroid وTizen وتطبيقات التلفاز) وكيفية تثبيت سلسلة الأدوات.
- [خدمة Appium](/docs/appium-service): خيارات الخدمة (`args` و`command` و`logPath`)، والأمر `npx start-appium-inspector` لفتح Appium Inspector، ومُحسِّن تجريبي لمحددات XPath البطيئة.
- [أوامر الهاتف المحمول](/docs/api/mobile): إيماءات ووظائف مساعدة متعددة المنصات. تغطي التطبيقات الهجينة باستخدام [`getContexts`](/docs/api/mobile/getContexts) و[`switchContext`](/docs/api/mobile/switchContext)، بالإضافة إلى إمكانيات عروض الويب لـ iOS.
- [محددات الهاتف المحمول](/docs/selectors#mobile-selectors): معرّف إمكانية الوصول، وAndroid UiAutomator، ومطابقات data/view في Espresso، وسلاسل predicate وclass chains في iOS.
- [أوامر بروتوكول Appium](/docs/api/appium): نقاط نهاية Appium الأساسية المتاحة على `driver`.
- [تطبيقات Flutter](/docs/flutter-testing/introduction): لماذا يحتاج Flutter إلى Appium Flutter Driver، ثم [تجهيز التطبيق](/docs/flutter-testing/preparing-flutter-application)، و[تكوين Appium](/docs/flutter-testing/base-appium-configuration)، و[إعداد WebdriverIO](/docs/flutter-testing/setting-up-webdriverio)، و[كتابة الاختبارات](/docs/flutter-testing/writing-tests).
- [الخدمات السحابية](/docs/cloudservices): الاتصال بـ Sauce Labs أو BrowserStack أو TestingBot أو TestMu AI أو Perfecto أو RobotActions للتشغيل على أجهزة حقيقية مستضافة.
- [الاختبار المرئي](/docs/visual-testing): مقارنة الصور للتطبيقات الأصلية والتطبيقات الهجينة ومتصفحات الهاتف المحمول. لاستخدام Percy على الهاتف المحمول، راجع [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [التحكم المتعدد عن بُعد](/docs/multiremote): تنسيق عدة أجهزة أو متصفحات في اختبار واحد.

إن محاكاة منفذ عرض جهاز في متصفح سطح المكتب باستخدام [`browser.emulate('device', ...)`](/docs/emulation) ليست اختبارًا للهاتف المحمول. تختلف محركات متصفحات سطح المكتب عن محركات الهاتف المحمول، لذا استخدم Appium مع متصفح هاتف محمول حقيقي بدلًا من ذلك.

## استكشاف الأخطاء وإصلاحها

- الجلسة لا تبدأ: تأكد من تثبيت مشغّل Appium الخاص بـ `appium:automationName` لديك وأن المحاكي قيد التشغيل. استخدم `port: 4723` ما لم تكن قد غيّرت منفذ Appium.
- لا يستطيع iOS العثور على عرض ويب: جرّب `appium:webviewConnectRetries` أو `appium:webviewConnectTimeout` أو `appium:includeSafariInWebviews` (راجع [التطبيقات الهجينة](/docs/api/mobile#hybrid-apps)).
- عرض الويب على Android بطيء في الظهور: اضبط `androidWebviewConnectionRetryTime` و`androidWebviewConnectTimeout` على `getContexts`/`switchContext`.
- لا يتم العثور على عناصر واجهة Flutter باستخدام المحددات الأصلية: هذا متوقع. استخدم مشغّل Flutter والباحثات (finders) الموضحة في [دليل Flutter](/docs/flutter-testing/introduction).

## الخطوات التالية

- مراجع [التكوين](/docs/configuration) و[الإمكانيات](/docs/capabilities).
- [نمط كائن الصفحة](/docs/pageobjects) لمشاركة الشاشات بين مواصفات Android وiOS.
- [MCP](/docs/mcp) للسماح لوكيل ذكاء اصطناعي بقيادة جلسات iOS وAndroid عبر Appium.
- منصات أخرى: [متصفحات الويب](/docs/platforms/web)، [تطبيقات سطح المكتب](/docs/platforms/desktop)، [الإضافات والمحررات](/docs/platforms/apps-and-extensions).