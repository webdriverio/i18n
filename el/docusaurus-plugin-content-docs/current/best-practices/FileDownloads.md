---
id: file-download
title: Λήψη Αρχείων
---

Κατά την αυτοματοποίηση λήψεων αρχείων σε δοκιμές ιστού, είναι απαραίτητο να τις διαχειρίζεστε με συνέπεια σε διαφορετικούς περιηγητές για να διασφαλίσετε αξιόπιστη εκτέλεση δοκιμών.

Εδώ, παρέχουμε βέλτιστες πρακτικές για λήψεις αρχείων και δείχνουμε πώς να διαμορφώσετε τους καταλόγους λήψης για **Google Chrome**, **Mozilla Firefox** και **Microsoft Edge**.

## Διαδρομές Λήψης

Η **σκληρή κωδικοποίηση** διαδρομών λήψης στα δοκιμαστικά σενάρια μπορεί να οδηγήσει σε προβλήματα συντήρησης και φορητότητας. Χρησιμοποιήστε **σχετικές διαδρομές** για καταλόγους λήψης για να διασφαλίσετε τη φορητότητα και τη συμβατότητα σε διαφορετικά περιβάλλοντα.

```javascript
// 👎
// Hardcoded download path
const downloadPath = '/path/to/downloads';

// 👍
// Relative download path
const downloadPath = path.join(__dirname, 'downloads');
```

## Στρατηγικές Αναμονής

Η αποτυχία εφαρμογής κατάλληλων στρατηγικών αναμονής μπορεί να οδηγήσει σε συνθήκες ανταγωνισμού ή αναξιόπιστες δοκιμές, ειδικά για την ολοκλήρωση λήψης. Εφαρμόστε **ρητές** στρατηγικές αναμονής για να περιμένετε την ολοκλήρωση των λήψεων αρχείων, διασφαλίζοντας τον συγχρονισμό μεταξύ των βημάτων δοκιμής.

```javascript
// 👎
// No explicit wait for download completion
await browser.pause(5000);

// 👍
// Wait for file download completion
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Διαμόρφωση Καταλόγων Λήψης

Για να παρακάμψετε τη συμπεριφορά λήψης αρχείων για **Google Chrome**, **Mozilla Firefox** και **Microsoft Edge**, παρέχετε τον κατάλογο λήψης στις δυνατότητες του WebDriverIO:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

Για ένα παράδειγμα υλοποίησης, ανατρέξτε στο [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Διαμόρφωση Λήψεων Περιηγητή Chromium

Για να αλλάξετε τη διαδρομή λήψης για περιηγητές βασισμένους στο __Chromium__ (όπως Chrome, Edge, Brave, κλπ.) χρησιμοποιώντας τη μέθοδο `getPuppeteer` του WebDriverIO για πρόσβαση στα Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Initiate a CDP Session:
const cdpSession = await page.target().createCDPSession();
// Set the Download Path:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Χειρισμός Πολλαπλών Λήψεων Αρχείων

Όταν αντιμετωπίζετε σενάρια που περιλαμβάνουν πολλαπλές λήψεις αρχείων, είναι απαραίτητο να εφαρμόσετε στρατηγικές για τη διαχείριση και επικύρωση κάθε λήψης αποτελεσματικά. Εξετάστε τις ακόλουθες προσεγγίσεις:

__Διαδοχικός Χειρισμός Λήψης:__ Κατεβάστε αρχεία ένα προς ένα και επαληθεύστε κάθε λήψη πριν ξεκινήσετε την επόμενη για να διασφαλίσετε την ομαλή εκτέλεση και ακριβή επικύρωση.

__Παράλληλος Χειρισμός Λήψης:__ Χρησιμοποιήστε τεχνικές ασύγχρονου προγραμματισμού για να ξεκινήσετε πολλαπλές λήψεις αρχείων ταυτόχρονα, βελτιστοποιώντας το χρόνο εκτέλεσης δοκιμών. Εφαρμόστε ισχυρούς μηχανισμούς επικύρωσης για να επαληθεύσετε όλες τις λήψεις μετά την ολοκλήρωση.

## Θέματα Συμβατότητας Μεταξύ Διαφορετικών Περιηγητών

Ενώ το WebDriverIO παρέχει ένα ενιαίο περιβάλλον για αυτοματισμό περιηγητή, είναι απαραίτητο να λαμβάνονται υπόψη οι διαφορές στη συμπεριφορά και τις δυνατότητες του περιηγητή. Εξετάστε τη δοκιμή της λειτουργικότητας λήψης αρχείων σας σε διαφορετικούς περιηγητές για να διασφαλίσετε τη συμβατότητα και τη συνέπεια.

__Ρυθμίσεις Συγκεκριμένες για κάθε Περιηγητή:__ Προσαρμόστε τις ρυθμίσεις διαδρομής λήψης και τις στρατηγικές αναμονής για να προσαρμοστείτε στις διαφορές στη συμπεριφορά και τις προτιμήσεις του περιηγητή σε Chrome, Firefox, Edge και άλλους υποστηριζόμενους περιηγητές.

__Συμβατότητα Έκδοσης Περιηγητή:__ Ενημερώνετε τακτικά τις εκδόσεις του WebDriverIO και του περιηγητή σας για να αξιοποιήσετε τα τελευταία χαρακτηριστικά και βελτιώσεις, διασφαλίζοντας παράλληλα τη συμβατότητα με την υπάρχουσα σουίτα δοκιμών σας.