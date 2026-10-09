---
id: timeouts
title: Χρονικά όρια
description: "Διαμορφώστε τα χρονικά όρια συνεδρίας WebDriver, τα χρονικά όρια waitfor του WebdriverIO και τα χρονικά όρια του πλαισίου δοκιμών, ώστε οι δοκιμές σας να παραμένουν αξιόπιστες."
---

Κάθε εντολή στο WebdriverIO είναι μια ασύγχρονη λειτουργία. Ένα αίτημα αποστέλλεται στον διακομιστή Selenium (ή σε μια υπηρεσία cloud όπως το [Sauce Labs](https://saucelabs.com)) και η απόκρισή του περιέχει το αποτέλεσμα μόλις η ενέργεια ολοκληρωθεί ή αποτύχει.

Επομένως, ο χρόνος είναι ένα κρίσιμο στοιχείο σε όλη τη διαδικασία των δοκιμών. Όταν μια συγκεκριμένη ενέργεια εξαρτάται από την κατάσταση μιας άλλης ενέργειας, πρέπει να βεβαιωθείτε ότι εκτελούνται με τη σωστή σειρά. Τα χρονικά όρια παίζουν σημαντικό ρόλο στην αντιμετώπιση τέτοιων ζητημάτων.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Χρονικά όρια WebDriver

### Χρονικό όριο σεναρίων συνεδρίας

Μια συνεδρία έχει ένα συσχετισμένο χρονικό όριο σεναρίων συνεδρίας, το οποίο καθορίζει τον χρόνο αναμονής για την εκτέλεση ασύγχρονων σεναρίων. Εκτός αν ορίζεται διαφορετικά, είναι 30 δευτερόλεπτα. Μπορείτε να ορίσετε αυτό το χρονικό όριο ως εξής:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Χρονικό όριο φόρτωσης σελίδας συνεδρίας

Μια συνεδρία έχει ένα συσχετισμένο χρονικό όριο φόρτωσης σελίδας, το οποίο καθορίζει τον χρόνο αναμονής για την ολοκλήρωση της φόρτωσης της σελίδας. Εκτός αν ορίζεται διαφορετικά, είναι 300.000 χιλιοστά του δευτερολέπτου.

Μπορείτε να ορίσετε αυτό το χρονικό όριο ως εξής:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> Το `pageLoad` είναι το όνομα των [χρονικών ορίων](https://www.w3.org/TR/webdriver/#set-timeouts) του WebDriver. Το WebdriverIO v10 δέχεται μόνο αυτό το κλειδί.

### Χρονικό όριο έμμεσης αναμονής συνεδρίας

Μια συνεδρία έχει ένα συσχετισμένο χρονικό όριο έμμεσης αναμονής (implicit wait). Αυτό καθορίζει τον χρόνο αναμονής για τη στρατηγική έμμεσου εντοπισμού στοιχείων κατά τον εντοπισμό στοιχείων με τις εντολές [`findElement`](/docs/api/webdriver#findelement) ή [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) ή [`$$`](/docs/api/browser/$$), αντίστοιχα, όταν εκτελείτε το WebdriverIO με ή χωρίς τον WDIO testrunner). Εκτός αν ορίζεται διαφορετικά, είναι 0 χιλιοστά του δευτερολέπτου.

Μπορείτε να ορίσετε αυτό το χρονικό όριο μέσω:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Χρονικά όρια σχετικά με το WebdriverIO

### Χρονικό όριο `WaitFor*`

Το WebdriverIO παρέχει πολλές εντολές για αναμονή μέχρι τα στοιχεία να φτάσουν σε μια συγκεκριμένη κατάσταση (π.χ. ενεργοποιημένα, ορατά, υπαρκτά). Αυτές οι εντολές δέχονται ένα όρισμα επιλογέα (selector) και έναν αριθμό χρονικού ορίου, ο οποίος καθορίζει πόσο χρόνο πρέπει να περιμένει η εκτέλεση μέχρι το στοιχείο να φτάσει σε αυτή την κατάσταση. Η επιλογή `waitforTimeout` σας επιτρέπει να ορίσετε το καθολικό χρονικό όριο για όλες τις εντολές `waitFor*`, ώστε να μη χρειάζεται να ορίζετε το ίδιο χρονικό όριο ξανά και ξανά. _(Προσέξτε το πεζό `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

Στις δοκιμές σας, μπορείτε πλέον να κάνετε το εξής:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Χρονικά όρια σχετικά με το πλαίσιο δοκιμών

Το πλαίσιο δοκιμών (framework) που χρησιμοποιείτε με το WebdriverIO πρέπει να διαχειρίζεται χρονικά όρια, ειδικά επειδή όλα είναι ασύγχρονα. Διασφαλίζει ότι η διαδικασία δοκιμών δεν κολλάει αν κάτι πάει στραβά.

Από προεπιλογή, το χρονικό όριο είναι 10 δευτερόλεπτα, που σημαίνει ότι μια μεμονωμένη δοκιμή δεν πρέπει να διαρκεί περισσότερο από αυτό.

Μια μεμονωμένη δοκιμή στο Mocha μοιάζει κάπως έτσι:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

Στο Cucumber, το χρονικό όριο ισχύει για έναν μεμονωμένο ορισμό βήματος (step definition). Ωστόσο, αν θέλετε να αυξήσετε το χρονικό όριο επειδή η δοκιμή σας διαρκεί περισσότερο από την προεπιλεγμένη τιμή, πρέπει να το ορίσετε στις επιλογές του πλαισίου.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>