---
id: integrate-with-smartui
title: SmartUI
---

Το TestMu AI (Πρώην LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) παρέχει οπτικές δοκιμές παλινδρόμησης με τεχνητή νοημοσύνη για τις δοκιμές WebdriverIO σας. Καταγράφει στιγμιότυπα οθόνης, τα συγκρίνει με βάσεις αναφοράς και επισημαίνει οπτικές διαφορές με έξυπνους αλγόριθμους σύγκρισης.

## Εγκατάσταση

**Δημιουργία έργου SmartUI**

[Συνδεθείτε](https://accounts.lambdatest.com/register) στο TestMu AI (Πρώην LambdaTest) και πλοηγηθείτε στα [SmartUI Projects](https://smartui.lambdatest.com/) για να δημιουργήσετε ένα νέο έργο. Επιλέξτε **Web** ως πλατφόρμα και διαμορφώστε το όνομα του έργου σας, τους εγκριτές και τις ετικέτες.

**Ρύθμιση διαπιστευτηρίων**

Αποκτήστε το `LT_USERNAME` και το `LT_ACCESS_KEY` από τον πίνακα ελέγχου του TestMu AI (Πρώην LambdaTest) και ορίστε τα ως μεταβλητές περιβάλλοντος:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Εγκατάσταση του SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**Διαμόρφωση του WebdriverIO**

Ενημερώστε το αρχείο `wdio.conf.js`:

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

**Εκτέλεση δοκιμών**

```sh
npx wdio wdio.conf.js
```

Δείτε τα αποτελέσματα στον [Πίνακα Ελέγχου SmartUI](https://smartui.lambdatest.com/).

## Προηγμένες Επιλογές

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

| Πόρος                                                                                          | Περιγραφή                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [Επίσημη Τεκμηρίωση](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | Τεκμηρίωση SmartUI                    |
| [Πίνακας Ελέγχου SmartUI](https://smartui.lambdatest.com/)                                              | Πρόσβαση στα έργα και τις κατασκευές SmartUI  |
| [Προηγμένες Ρυθμίσεις](https://www.testmuai.com/support/docs/test-settings-options/)              | Διαμόρφωση ευαισθησίας σύγκρισης         |
| [Επιλογές Κατασκευής](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | Προηγμένη διαμόρφωση κατασκευής             |