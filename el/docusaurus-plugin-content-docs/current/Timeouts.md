---
id: timeouts
title: Χρονικά Όρια
---

Κάθε εντολή στο WebdriverIO είναι μια ασύγχρονη λειτουργία. Ένα αίτημα αποστέλλεται στον διακομιστή Selenium (ή μια υπηρεσία cloud όπως το [Sauce Labs](https://saucelabs.com)), και η απάντησή του περιέχει το αποτέλεσμα μόλις η ενέργεια ολοκληρωθεί ή αποτύχει.

Επομένως, ο χρόνος είναι ένα κρίσιμο συστατικό σε ολόκληρη τη διαδικασία δοκιμών. Όταν μια συγκεκριμένη ενέργεια εξαρτάται από την κατάσταση μιας διαφορετικής ενέργειας, πρέπει να βεβαιωθείτε ότι εκτελούνται με τη σωστή σειρά. Τα χρονικά όρια παίζουν σημαντικό ρόλο όταν αντιμετωπίζετε αυτά τα ζητήματα.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Χρονικά Όρια WebDriver

### Χρονικό Όριο Σεναρίου Συνεδρίας

Μια συνεδρία έχει ένα σχετικό χρονικό όριο σεναρίου συνεδρίας που καθορίζει το χρόνο αναμονής για την εκτέλεση ασύγχρονων σεναρίων. Εκτός αν ορίζεται διαφορετικά, είναι 30 δευτερόλεπτα. Μπορείτε να ορίσετε αυτό το χρονικό όριο ως εξής:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Χρονικό Όριο Φόρτωσης Σελίδας Συνεδρίας

Μια συνεδρία έχει ένα σχετικό χρονικό όριο φόρτωσης σελίδας που καθορίζει το χρόνο αναμονής για την ολοκλήρωση της φόρτωσης της σελίδας. Εκτός αν ορίζεται διαφορετικά, είναι 300.000 χιλιοστά του δευτερολέπτου.

Μπορείτε να ορίσετε αυτό το χρονικό όριο ως εξής:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> Η λέξη-κλειδί `pageLoad` είναι μέρος της επίσημης [προδιαγραφής](https://www.w3.org/TR/webdriver/#set-timeouts) του WebDriver, αλλά ενδέχεται να μην [υποστηρίζεται](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) για το πρόγραμμα περιήγησής σας (το προηγούμενο όνομα είναι `page load`).

### Χρονικό Όριο Σιωπηρής Αναμονής Συνεδρίας

Μια συνεδρία έχει ένα σχετικό χρονικό όριο σιωπηρής αναμονής. Αυτό καθορίζει το χρόνο αναμονής για τη στρατηγική σιωπηρής εύρεσης στοιχείων κατά τον εντοπισμό στοιχείων χρησιμοποιώντας τις εντολές [`findElement`](/docs/api/webdriver#findelement) ή [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) ή [`$$`](/docs/api/browser/$$), αντίστοιχα, όταν εκτελείτε το WebdriverIO με ή χωρίς το WDIO testrunner). Εκτός αν ορίζεται διαφορετικά, είναι 0 χιλιοστά του δευτερολέπτου.

Μπορείτε να ορίσετε αυτό το χρονικό όριο μέσω:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Χρονικά όρια σχετικά με το WebdriverIO

### Χρονικό όριο `WaitFor*`

Το WebdriverIO παρέχει πολλαπλές εντολές για αναμονή στοιχείων ώστε να φτάσουν σε μια συγκεκριμένη κατάσταση (π.χ. ενεργοποιημένα, ορατά, υπάρχοντα). Αυτές οι εντολές δέχονται ένα επιλογέα και έναν αριθμό χρονικού ορίου, που καθορίζει πόσο καιρό πρέπει να περιμένει η εφαρμογή μέχρι το στοιχείο να φτάσει στην κατάσταση αυτή. Η επιλογή `waitforTimeout` σας επιτρέπει να ορίσετε το παγκόσμιο χρονικό όριο για όλες τις εντολές `waitFor*`, ώστε να μην χρειάζεται να ορίζετε το ίδιο χρονικό όριο ξανά και ξανά. _(Σημειώστε το πεζό `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

Στις δοκιμές σας, τώρα μπορείτε να κάνετε αυτό:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// μπορείτε επίσης να παρακάμψετε το προεπιλεγμένο χρονικό όριο αν χρειάζεται
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Χρονικά όρια σχετικά με το πλαίσιο εργασίας

Το πλαίσιο δοκιμών που χρησιμοποιείτε με το WebdriverIO πρέπει να αντιμετωπίσει χρονικά όρια, ειδικά αφού όλα είναι ασύγχρονα. Διασφαλίζει ότι η διαδικασία δοκιμής δεν κολλάει αν κάτι πάει στραβά.

Από προεπιλογή, το χρονικό όριο είναι 10 δευτερόλεπτα, που σημαίνει ότι μια μεμονωμένη δοκιμή δεν πρέπει να διαρκεί περισσότερο από αυτό.

Μια μεμονωμένη δοκιμή στο Mocha μοιάζει με:

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

Στο Cucumber, το χρονικό όριο ισχύει για έναν μεμονωμένο ορισμό βήματος. Ωστόσο, αν θέλετε να αυξήσετε το χρονικό όριο επειδή η δοκιμή σας διαρκεί περισσότερο από την προεπιλεγμένη τιμή, πρέπει να το ορίσετε στις επιλογές του πλαισίου.

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