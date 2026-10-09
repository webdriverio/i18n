---
id: record
title: Καταγραφή Δοκιμών
description: "Καταγράψτε ροές χρηστών με το Chrome DevTools Recorder και εξαγάγετέ τες ως δοκιμές WebdriverIO."
---

Το Chrome DevTools διαθέτει ένα πάνελ _Recorder_ που επιτρέπει στους χρήστες να καταγράφουν και να αναπαράγουν αυτοματοποιημένα βήματα μέσα στον Chrome. Αυτά τα βήματα μπορούν να [εξαχθούν σε δοκιμές WebdriverIO με μια επέκταση](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), κάνοντας τη συγγραφή δοκιμών πολύ εύκολη.

## Τι είναι το Chrome DevTools Recorder

Το [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) είναι ένα εργαλείο που σας επιτρέπει να καταγράφετε και να αναπαράγετε ενέργειες δοκιμών απευθείας στον browser και επίσης να τις εξάγετε ως JSON (ή να τις εξάγετε σε δοκιμή e2e), καθώς και να μετράτε την απόδοση των δοκιμών.

Το εργαλείο είναι απλό στη χρήση και, επειδή είναι ενσωματωμένο στον browser, έχουμε την ευκολία να μην αλλάζουμε περιβάλλον ούτε να ασχολούμαστε με κάποιο εργαλείο τρίτων.

## Πώς να Καταγράψετε μια Δοκιμή με το Chrome DevTools Recorder

Αν έχετε την πιο πρόσφατη έκδοση του Chrome, θα έχετε ήδη εγκατεστημένο και διαθέσιμο το Recorder. Απλώς ανοίξτε οποιονδήποτε ιστότοπο, κάντε δεξί κλικ και επιλέξτε _"Inspect"_. Μέσα στο DevTools μπορείτε να ανοίξετε το Recorder πατώντας `CMD/Control` + `Shift` + `p` και πληκτρολογώντας _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Για να ξεκινήσετε την καταγραφή μιας διαδρομής χρήστη, κάντε κλικ στο _"Start new recording"_, δώστε ένα όνομα στη δοκιμή σας και στη συνέχεια χρησιμοποιήστε τον browser για να καταγράψετε τη δοκιμή σας:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Στο επόμενο βήμα, κάντε κλικ στο _"Replay"_ για να ελέγξετε αν η καταγραφή ήταν επιτυχής και κάνει αυτό που θέλατε. Αν όλα είναι εντάξει, κάντε κλικ στο εικονίδιο [εξαγωγής](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) και επιλέξτε _"Export as a WebdriverIO Test Script"_:

Η επιλογή _"Export as a WebdriverIO Test Script"_ είναι διαθέσιμη μόνο αν εγκαταστήσετε την επέκταση [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).


![Chrome DevTools Recorder](/img/recorder/export.gif)

Αυτό ήταν!

## Εξαγωγή Καταγραφής

Αν εξαγάγατε τη ροή ως σενάριο δοκιμής WebdriverIO, θα πρέπει να γίνει λήψη ενός σεναρίου που μπορείτε να αντιγράψετε και να επικολλήσετε στη σουίτα δοκιμών σας. Για παράδειγμα, η παραπάνω καταγραφή έχει ως εξής:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

Βεβαιωθείτε ότι θα επανεξετάσετε ορισμένους από τους locators και θα τους αντικαταστήσετε με πιο ανθεκτικούς [τύπους selectors](/docs/selectors), αν είναι απαραίτητο. Μπορείτε επίσης να εξαγάγετε τη ροή ως αρχείο JSON και να χρησιμοποιήσετε το πακέτο [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) για να τη μετατρέψετε σε πραγματικό σενάριο δοκιμής.

## Επόμενα Βήματα

Μπορείτε να χρησιμοποιήσετε αυτή τη ροή για να δημιουργείτε εύκολα δοκιμές για τις εφαρμογές σας. Το Chrome DevTools Recorder διαθέτει διάφορες επιπλέον λειτουργίες, π.χ.:

- [Προσομοίωση αργού δικτύου](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) ή
- [Μέτρηση της απόδοσης των δοκιμών σας](https://developer.chrome.com/docs/devtools/recorder/#measure)

Φροντίστε να ρίξετε μια ματιά στην [τεκμηρίωσή τους](https://developer.chrome.com/docs/devtools/recorder).