---
id: mobile
title: Εφαρμογές για κινητά
description: Ρυθμίστε και εκτελέστε δοκιμές WebdriverIO για native, hybrid και mobile web εφαρμογές σε emulators Android, simulators iOS, πραγματικές συσκευές και device clouds.
---

Το WebdriverIO αυτοματοποιεί το Android και το iOS μέσω του [Appium](/docs/appium), το οποίο υποστηρίζει το πρωτόκολλο WebDriver. Οι δοκιμές σας χρησιμοποιούν το ίδιο αντικείμενο `browser` (με ψευδώνυμο `driver`), τους ίδιους selectors `$`/`$$` και τους ίδιους matchers `expect` με τις δοκιμές σε browser. Το Appium δρομολογεί κάθε session σε έναν platform driver που επιλέγεται μέσω του `appium:automationName`. Για το Android αυτός είναι ο `UiAutomator2`, με το Espresso ως εναλλακτική που ξεκλειδώνει επιπλέον στρατηγικές selectors. Για το iOS και το iPadOS είναι ο `XCUITest`. Με αυτούς τους drivers μπορείτε να δοκιμάσετε native εφαρμογές και mobile web στο Chrome σε Android ή στο Safari σε iOS. Μπορείτε επίσης να δοκιμάσετε hybrid εφαρμογές, εναλλάσσοντας μεταξύ του native context και των ενσωματωμένων webviews. Τα sessions μπορούν να εκτελούνται σε emulators Android, simulators iOS, πραγματικές συσκευές ή device clouds όπως τα Sauce Labs, BrowserStack, TestingBot και TestMu AI. Το [`@wdio/appium-service`](/docs/appium-service) εκκινεί και τερματίζει έναν τοπικό Appium server για εσάς. Πέρα από το βασικό Appium API, το WebdriverIO προσθέτει cross-platform [εντολές για κινητά](/docs/api/mobile) όπως `tap`, `swipe`, `longPress`, `scrollIntoView` και `switchContext`.

## Γρήγορη εκκίνηση

Προαπαιτούμενα: Android Studio με Android SDK και έναν emulator για Android· Xcode και έναν simulator σε macOS για iOS. Το `npx appium-installer` σας καθοδηγεί στη ρύθμιση του περιβάλλοντος και το `npm init wdio@latest .` δημιουργεί τον σκελετό ενός mobile project (επιλέξτε Android ή iOS). Για χειροκίνητη ρύθμιση:

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

Το `~` είναι ο selector accessibility id: αντιστοιχεί στο `content-description` στο Android και στο `accessibilityIdentifier` στο iOS, και είναι η προτιμώμενη cross-platform στρατηγική. Αντικαταστήστε τα ids του παραδείγματος, τον τίτλο του webview και τη διαδρομή της εφαρμογής με τα δικά σας.

Για άλλους στόχους αλλάζουν μόνο τα capabilities:

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app για simulators, υπογεγραμμένο .ipa για πραγματικές συσκευές
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

Για mobile web σε iOS, χρησιμοποιήστε `platformName: 'iOS'`, `browserName: 'Safari'` και `'appium:automationName': 'XCUITest'`.

## Επιλέξτε τη διαδρομή σας

- [Ρύθμιση Appium](/docs/appium): ποιες πλατφόρμες καλύπτει το Appium (iOS, Android, Tizen, εφαρμογές TV) και πώς να εγκαταστήσετε το toolchain.
- [Appium Service](/docs/appium-service): επιλογές του service (`args`, `command`, `logPath`), το `npx start-appium-inspector` για να ανοίξετε τον Appium Inspector, και ένας beta optimizer για αργούς XPath selectors.
- [Εντολές για κινητά](/docs/api/mobile): cross-platform χειρονομίες και βοηθητικές λειτουργίες. Καλύπτει hybrid εφαρμογές με τα [`getContexts`](/docs/api/mobile/getContexts) και [`switchContext`](/docs/api/mobile/switchContext), καθώς και τα webview capabilities για iOS.
- [Selectors για κινητά](/docs/selectors#mobile-selectors): accessibility id, Android UiAutomator, Espresso data/view matchers και iOS predicate strings και class chains.
- [Εντολές πρωτοκόλλου Appium](/docs/api/appium): τα βασικά endpoints του Appium που είναι διαθέσιμα στο `driver`.
- [Εφαρμογές Flutter](/docs/flutter-testing/introduction): γιατί το Flutter χρειάζεται τον Appium Flutter Driver, και στη συνέχεια [προετοιμάστε την εφαρμογή](/docs/flutter-testing/preparing-flutter-application), [ρυθμίστε το Appium](/docs/flutter-testing/base-appium-configuration), [ρυθμίστε το WebdriverIO](/docs/flutter-testing/setting-up-webdriverio) και [γράψτε δοκιμές](/docs/flutter-testing/writing-tests).
- [Cloud Services](/docs/cloudservices): συνδεθείτε στα Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto ή RobotActions για εκτέλεση σε φιλοξενούμενες πραγματικές συσκευές.
- [Visual Testing](/docs/visual-testing): σύγκριση εικόνων για native εφαρμογές, hybrid εφαρμογές και mobile browsers. Για το Percy σε κινητά, δείτε το [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [Multi-remote](/docs/multiremote): συντονίστε πολλές συσκευές ή browsers σε μία δοκιμή.

Η εξομοίωση του viewport μιας συσκευής σε desktop browser με το [`browser.emulate('device', ...)`](/docs/emulation) δεν αποτελεί δοκιμή σε κινητά. Οι μηχανές των desktop browsers διαφέρουν από αυτές των κινητών, οπότε χρησιμοποιήστε αντί αυτού το Appium με έναν πραγματικό mobile browser.

## Αντιμετώπιση προβλημάτων

- Το session δεν ξεκινά: βεβαιωθείτε ότι ο Appium driver για το `appium:automationName` σας είναι εγκατεστημένος και ότι ο emulator ή ο simulator εκτελείται. Χρησιμοποιήστε `port: 4723`, εκτός αν έχετε αλλάξει τη θύρα του Appium.
- Το iOS δεν βρίσκει ένα webview: δοκιμάστε τα `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` ή `appium:includeSafariInWebviews` (δείτε [Hybrid Apps](/docs/api/mobile#hybrid-apps)).
- Το webview στο Android αργεί να εμφανιστεί: προσαρμόστε τα `androidWebviewConnectionRetryTime` και `androidWebviewConnectTimeout` στα `getContexts`/`switchContext`.
- Τα Flutter widgets δεν εντοπίζονται με native selectors: αυτό είναι αναμενόμενο. Χρησιμοποιήστε τον Flutter driver και τους finders που περιγράφονται στον [οδηγό Flutter](/docs/flutter-testing/introduction).

## Επόμενα βήματα

- Αναφορές [Configuration](/docs/configuration) και [Capabilities](/docs/capabilities).
- [Page Object Pattern](/docs/pageobjects) για κοινή χρήση οθονών μεταξύ των specs Android και iOS.
- [MCP](/docs/mcp) για να επιτρέψετε σε έναν AI agent να χειρίζεται sessions iOS και Android μέσω του Appium.
- Άλλες πλατφόρμες: [Web Browsers](/docs/platforms/web), [Desktop Apps](/docs/platforms/desktop), [Extensions & Editors](/docs/platforms/apps-and-extensions).