---
id: integrate-with-smartui
title: SmartUI
description: "Προσθέστε οπτικό έλεγχο παλινδρόμησης με τεχνητή νοημοσύνη στα τεστ WebdriverIO με το SmartUI της TestMu AI (πρώην LambdaTest), συμπεριλαμβανομένης της ρύθμισης και των επιλογών."
---

Το [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) της TestMu AI (πρώην LambdaTest) παρέχει οπτικό έλεγχο παλινδρόμησης με τεχνητή νοημοσύνη για τα τεστ WebdriverIO σας. Καταγράφει στιγμιότυπα οθόνης, τα συγκρίνει με τα baselines και επισημαίνει τις οπτικές διαφορές με έξυπνους αλγορίθμους σύγκρισης.

## Ρύθμιση

**Δημιουργία έργου SmartUI**

[Συνδεθείτε](https://accounts.lambdatest.com/register) στην TestMu AI (πρώην LambdaTest) και μεταβείτε στα [SmartUI Projects](https://smartui.lambdatest.com/) για να δημιουργήσετε ένα νέο έργο. Επιλέξτε **Web** ως πλατφόρμα και ρυθμίστε το όνομα του έργου, τους εγκρίνοντες και τις ετικέτες.

**Ρύθμιση διαπιστευτηρίων**

Λάβετε τα `LT_USERNAME` και `LT_ACCESS_KEY` από τον πίνακα ελέγχου της TestMu AI (πρώην LambdaTest) και ορίστε τα ως μεταβλητές περιβάλλοντος:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Εγκατάσταση του SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**Ρύθμιση του WebdriverIO**

Ενημερώστε το `wdio.conf.js` σας:

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## Χρήση

Χρησιμοποιήστε το `browser.execute('smartui.takeScreenshot')` για να καταγράψετε στιγμιότυπα οθόνης:

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**Εκτέλεση τεστ**

```sh
npx wdio wdio.conf.js
```

Δείτε τα αποτελέσματα στο [SmartUI Dashboard](https://smartui.lambdatest.com/).

## Προχωρημένες επιλογές

**Παράβλεψη στοιχείων**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**Επιλογή συγκεκριμένων περιοχών**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Πόροι

| Πόρος                                                                                             | Περιγραφή                                          |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------|
| [Επίσημη τεκμηρίωση](https://www.testmuai.com/support/docs/smart-ui-cypress/)                     | Τεκμηρίωση SmartUI                                 |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Πρόσβαση στα έργα και τα builds SmartUI σας        |
| [Προχωρημένες ρυθμίσεις](https://www.testmuai.com/support/docs/test-settings-options/)            | Ρύθμιση της ευαισθησίας σύγκρισης                  |
| [Επιλογές build](https://www.testmuai.com/support/docs/smart-ui-build-options/)                   | Προχωρημένη διαμόρφωση build                       |