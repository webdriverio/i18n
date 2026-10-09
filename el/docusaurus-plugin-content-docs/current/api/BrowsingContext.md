---
id: browsingContext
title: Το αντικείμενο BrowsingContext
description: Κρατήστε μια καρτέλα, ένα παράθυρο ή ένα frame ως αντικείμενο και εκτελέστε εντολές σε αυτό απευθείας, χωρίς να αλλάξετε το session σε αυτό.
---

Ένα browsing context είναι μια καρτέλα, ένα παράθυρο ή ένα frame που κρατάτε ως αντικείμενο. Οι εντολές που καλείτε σε αυτό εκτελούνται σε εκείνη την καρτέλα ή το frame, ενώ το session και κάθε άλλο context παραμένουν εκεί που βρίσκονται. Από την v10, με αυτόν τον τρόπο το WebdriverIO χειρίζεται καρτέλες, παράθυρα και frames σε ένα session WebDriver BiDi, και εκεί αντικαθιστά τα `switchWindow()` και `switchFrame()`.

```ts title="test/specs/tabs.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('browsing contexts', () => {
    it('works with two tabs and a frame at the same time', async () => {
        const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
        const docs = await browser.newWindow('https://webdriver.io/docs/api', { type: 'tab' })

        const top = await page.frame({ selector: 'frame[name="frame-top"]' })
        const middle = await top.frame({ selector: 'frame[name="frame-middle"]' })

        await expect(middle.$('#content')).toHaveText('MIDDLE')
        await expect(docs.$('h1')).toBeDisplayed()
        console.log(await page.getTitle(), await docs.getTitle())
    })
})
```

## Λήψη ενός browsing context

| Κλήση | Επιστρέφει |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | Το πρώτο top-level context του session, αφού γίνει πλοήγηση σε αυτό. Το `browser.url()` πλοηγεί πάντα αυτό. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | Μια νέα καρτέλα (`type: 'tab'`) ή παράθυρο, μόλις φορτωθεί η σελίδα του. Το session δεν μεταβαίνει σε αυτό. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Κάθε ανοιχτό top-level context (καρτέλες και παράθυρα, όχι frames), π.χ. μια καρτέλα που άνοιξε η ίδια η σελίδα. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | Ένα frame ενός context, συμπεριλαμβανομένων των cross-origin και των εμφωλευμένων. |

Κρατήστε το αντικείμενο και καλέστε εντολές σε αυτό. Δεν υπάρχει «τρέχουσα» καρτέλα ή frame ανάμεσα στα οποία να γίνεται εναλλαγή, επομένως τα contexts μπορούν επίσης να χρησιμοποιηθούν παράλληλα:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## Sessions WebDriver BiDi και Classic

Τα browsing contexts απαιτούν ένα session WebDriver BiDi, το οποίο είναι η προεπιλογή από την v10 για Chrome, Edge και Firefox. Σε ένα session WebDriver Classic, π.χ. με Appium ή Safari, υπάρχει μόνο το τρέχον context του session. Εκεί:

- Το `browser.url()` επιστρέφει ένα υποκατάστατο για τον browser. Εντολές όπως `$`, `execute` ή `getTitle` εκτελούνται στον browser, τα `url`, `isFrame` και `parent` περιγράφουν την τρέχουσα σελίδα, και το `contextId` είναι `undefined`.
- Τα `frame()`, `navigate()` και `activate()` απορρίπτονται και αναφέρουν την εντολή Classic που πρέπει να χρησιμοποιηθεί στη θέση τους: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) ή [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Ελέγξτε το `browser.isBidi` όταν ο ίδιος κώδικας εκτελείται και στα δύο είδη session.

## Ιδιότητες

| Όνομα | Τύπος | Λεπτομέρειες |
| ---- | ---- | ------- |
| `contextId` | `String` | Το id του browsing context του WebDriver BiDi. `undefined` σε ένα session Classic. |
| `url` | `String` | Το URL στο οποίο πλοηγήθηκε τελευταία φορά το context με `browser.url()`, `navigate()` ή `newWindow()`. Οι πλοηγήσεις που κάνει η ίδια η σελίδα (links, `location`, `history.pushState`) εμφανίζονται μόνο μετά το [`getUrl()`](/docs/api/browsingContext/getUrl). |
| `isFrame` | `Boolean` | `true` για ένα frame, `false` για μια καρτέλα ή ένα παράθυρο. |
| `parent` | `BrowsingContext \| undefined` | Για ένα frame, το context στο οποίο κλήθηκε το `frame()` (ή το ενδιάμεσο frame, για ένα frame εμφωλευμένο βαθύτερα). `undefined` για μια καρτέλα ή ένα παράθυρο. |
| `browser` | `Browser` | Το [αντικείμενο browser](/docs/api/browser) του session. |
| `request` | `Request \| undefined` | Πληροφορίες φόρτωσης της τελευταίας πλοήγησης μέσω `browser.url()` ή `navigate()`: URL, headers, response, redirects και τα requests που έκανε η σελίδα. |
| `sessionId` | `String` | Id του session, το ίδιο με το `browser.sessionId`. |
| `capabilities` | `Object` | Capabilities του session, ίδια με το `browser.capabilities`. |
| `options` | `Object` | Επιλογές του WebdriverIO, ίδιες με το `browser.options`. |
| `isBidi` | `Boolean` | Αν το session χρησιμοποιεί WebDriver BiDi. |
| `isMobile` | `Boolean` | Αν το session αυτοματοποιεί μια κινητή συσκευή. |

## Μέθοδοι

### Εντολές ενός browsing context

Αυτές οι εντολές δρουν στο context στο οποίο καλούνται. Καθεμία έχει τη δική της σελίδα αναφοράς.

| Εντολή | Λεπτομέρειες |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Λήψη ενός frame αυτού του context ως ξεχωριστό browsing context. |
| [`navigate`](/docs/api/browsingContext/navigate) | Πλοήγηση αυτού του context, με τις ίδιες επιλογές με το `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Επαναφόρτωση αυτού του context. Ένα frame επαναφορτώνει μόνο το δικό του document. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Μετακίνηση στο ιστορικό αυτής της καρτέλας ή του παραθύρου. |
| [`activate`](/docs/api/browsingContext/activate) | Φέρνει αυτή την καρτέλα ή το παράθυρο στο προσκήνιο. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Κλείνει αυτή την καρτέλα ή το παράθυρο. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Ανάγνωση του τίτλου ή του URL του document που εμφανίζεται σε αυτό το context. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Απάντηση ή ανάγνωση του user prompt που είναι ανοιχτό σε αυτό το context. |

### Εντολές browser που εκτελούνται σε ένα context

Αυτές είναι οι ομώνυμες [εντολές browser](/docs/api/browser), εφαρμοσμένες σε αυτό το context αντί για το πρώτο context του session. Δέχονται τα ίδια ορίσματα.

| Εντολή | Σε ένα browsing context |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Εύρεση elements στο document αυτού του context. |
| [`execute`](/docs/api/browser/execute) | Εκτέλεση ενός script στο document αυτού του context. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Αποστολή input σε αυτό το context, ακόμη κι όταν είναι καρτέλα στο παρασκήνιο. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Καταγραφή αυτού του context. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Ανάγνωση και αλλαγή των cookies του storage partition αυτού του context. |
| [`setViewport`](/docs/api/browser/setViewport) | Αλλαγή μεγέθους του viewport αυτής της καρτέλας ή του παραθύρου. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Εκτέλεση ενός script πριν από τα scripts της σελίδας, μόνο σε αυτή την καρτέλα ή το παράθυρο. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Mock των requests μόνο αυτής της καρτέλας ή του παραθύρου. Ένα mock τερματίζεται όταν κλείσει η καρτέλα του. |
| [`emulate`](/docs/api/browser/emulate) | Εξομοίωση μιας ιδιότητας συσκευής, π.χ. geolocation ή το ρολόι, μόνο σε αυτή την καρτέλα ή το παράθυρο. |
| [`restore`](/docs/api/browser/restore) | Επαναφορά εξομοιώσεων, το ίδιο με το `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | Το ίδιο με τον browser. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // τα requests του `tab` λαμβάνουν το mocked response, τα requests του `page` φτάνουν στον server
})
```

### Μόνο top-level

Ένα frame μοιράζεται το ιστορικό, το viewport, το δίκτυο και την εξομοίωση της καρτέλας του, επομένως αυτές οι εντολές απορρίπτονται σε ένα frame με `` `<command>` is only available on a top-level browsing context ``. Καλέστε τις στην καρτέλα: `frame.parent` μέχρι το `parent` να είναι `undefined`, ή στο context στο οποίο καλέσατε το `frame()`.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### Μη διαθέσιμες σε ένα browsing context

Οι εντολές session, όπως `deleteSession`, `newWindow` ή `browsingContexts`, υπάρχουν μόνο στο [αντικείμενο browser](/docs/api/browser). Το ίδιο ισχύει και για τις custom εντολές: τα [`addCommand`](/docs/customcommands) και `overwriteCommand` απορρίπτονται σε ένα context, καταχωρίστε τις στο `browser`.

### Events

Τα `on`, `once`, `off`, `emit`, `removeListener` και `removeAllListeners` καταχωρίζουν listeners στον browser, επομένως τα events είναι εκείνα ολόκληρου του session. Για παράδειγμα, ένα event [`dialog`](/docs/api/dialog) ενεργοποιείται για ένα prompt σε οποιαδήποτε καρτέλα ή frame.

## Elements ενός browsing context

Ένα element που λαμβάνετε μέσω ενός context ανήκει σε εκείνο το context. Οι εντολές element όπως `click`, `setValue` ή `getText` εκτελούνται στο document εκείνου του context, ακόμη κι όταν πρόκειται για καρτέλα στο παρασκήνιο ή για frame. Ακολουθούν την προδιαγραφή WebDriver όπως και οι drivers, επομένως επιστρέφουν τα ίδια αποτελέσματα και τα ίδια σφάλματα (π.χ. `element click intercepted`) όπως για ένα element της σελίδας στο προσκήνιο. Τα `getComputedRole` και `getComputedLabel` απορρίπτονται για ένα element ενός context διαφορετικού από το πρώτο context του session.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // εμφανίζει: "BOTTOM"
```

## Αντιμετώπιση προβλημάτων

| Σφάλμα | Αιτία και λύση |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Καλέστε το [`frame()`](/docs/api/browsingContext/frame) στο context που επιστρέφεται από το `browser.url()` ή το `browser.newWindow()`. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Κρατήστε το context που επιστρέφεται από το `browser.url()` ή το `browser.newWindow()`, ή βρείτε ένα με το `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | Το session είναι session Classic (π.χ. Appium ή Safari). Χρησιμοποιήστε την εντολή Classic που αναφέρει το μήνυμα. |
| `` `<command>` is only available on a top-level browsing context `` | Η εντολή κλήθηκε σε ένα frame. Καλέστε την στην καρτέλα του frame, δείτε [Μόνο top-level](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Καταχωρίστε τις custom εντολές στο `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | Η σελίδα που περιείχε το frame πλοηγήθηκε αλλού. Λάβετε ξανά το frame με το `frame()` στη νέα σελίδα. |

## Σχετικά

- [Το αντικείμενο Browser](/docs/api/browser)
- [Μετάβαση στην v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Dialogs](/docs/api/dialog)