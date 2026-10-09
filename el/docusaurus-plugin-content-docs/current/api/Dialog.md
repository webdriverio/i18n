---
id: dialog
title: Το αντικείμενο Dialog
---

Τα αντικείμενα Dialog αποστέλλονται από το [`browser`](/docs/api/browser) μέσω του συμβάντος `browser.on('dialog')`.

Ένα παράδειγμα χρήσης του αντικειμένου Dialog:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // εμφανίζει: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Τα dialogs απορρίπτονται αυτόματα, εκτός εάν υπάρχει τουλάχιστον ένας listener `browser.on('dialog')` ή `browser.once('dialog')`. Όταν υπάρχει listener, πρέπει είτε να κάνει [`dialog.accept()`](/docs/api/dialog/accept) είτε [`dialog.dismiss()`](/docs/api/dialog/dismiss) στο dialog - διαφορετικά η σελίδα θα παγώσει περιμένοντας το dialog και ενέργειες όπως το click δεν θα ολοκληρωθούν ποτέ.

:::

:::info Εγγενή dialogs σε κινητές συσκευές

Τα συμβάντα dialog του browser δεν εκπέμπονται για τα εγγενή dialogs αδειών του iOS/Android. Χειριστείτε τα με τις [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) και [`browser.dismissDialog`](/docs/api/mobile/dismissDialog) αντί αυτού.

:::