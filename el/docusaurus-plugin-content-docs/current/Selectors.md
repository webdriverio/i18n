---
id: selectors
title: Επιλογείς
---

The [WebDriver Protocol](https://w3c.github.io/webdriver/) provides several selector strategies to query an element. WebdriverIO simplifies them to keep selecting elements simple. Please note that even though the command to query elements is called `$` and `$$`, they have nothing to do with jQuery or the [Sizzle Selector Engine](https://github.com/jquery/sizzle).

While there are so many different selectors available, only a few of them provide a resilient way to find the right element. For example, given the following button:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

We __do__ and __do not__ recommend the following selectors:

| Selector | Recommended | Notes |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Never | Worst - too generic, no context. |
| `$('.btn.btn-large')` | 🚨 Never | Bad. Coupled to styling. Highly subject to change. |
| `$('#main')` | ⚠️ Sparingly | Better. But still coupled to styling or JS event listeners. |
| `$(() => document.queryElement('button'))` | ⚠️ Sparingly | Effective querying, complex to write. |
| `$('button[name="submission"]')` | ⚠️ Sparingly | Coupled to the `name` attribute which has HTML semantics. |
| `$('button[data-testid="submit"]')` | ✅ Good | Requires additional attribute, not connected to a11y. |
| `$('aria/Submit')` or `$('button=Submit')` | ✅ Always | Best. Resembles how the user interacts with the page. It is recommended to use your frontend's translation files so your tests never fail when the translations are updated |

## CSS Query Selector

If not indicated otherwise, WebdriverIO will query elements using the [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) pattern, e.g.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Link Text

Για να πάρετε ένα στοιχείο anchor με συγκεκριμένο κείμενο σε αυτό, ερωτήστε το κείμενο ξεκινώντας με ένα σύμβολο ίσον (`=`).

Για παράδειγμα:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Μπορείτε να ερωτήσετε αυτό το στοιχείο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Partial Link Text

Για να βρείτε ένα στοιχείο anchor του οποίου το ορατό κείμενο ταιριάζει μερικώς με την τιμή αναζήτησής σας,
ερωτήστε το χρησιμοποιώντας `*=` μπροστά από τη συμβολοσειρά ερωτήματος (π.χ. `*=driver`).

Μπορείτε να ερωτήσετε το στοιχείο από το παραπάνω παράδειγμα καλώντας επίσης:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Σημείωση:__ Δεν μπορείτε να αναμίξετε πολλαπλές στρατηγικές επιλογέα σε έναν επιλογέα. Χρησιμοποιήστε πολλαπλά αλυσιδωτά ερωτήματα στοιχείων για να επιτύχετε τον ίδιο στόχο, π.χ.:

```js
const elem = await $('header h1*=Welcome') // doesn't work!!!
// use instead
const elem = await $('header').$('*=driver')
```

## Element with certain text

Η ίδια τεχνική μπορεί να εφαρμοστεί και σε στοιχεία. Επιπλέον, είναι επίσης δυνατό να γίνει ταίριασμα χωρίς διάκριση πεζών-κεφαλαίων χρησιμοποιώντας `.=` ή `.*=` μέσα στο ερώτημα.

Για παράδειγμα, εδώ είναι ένα ερώτημα για μια επικεφαλίδα επιπέδου 1 με το κείμενο "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Μπορείτε να ερωτήσετε αυτό το στοιχείο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Ή χρησιμοποιώντας ερώτημα μερικού κειμένου:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Το ίδιο λειτουργεί για ονόματα `id` και `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Μπορείτε να ερωτήσετε αυτό το στοιχείο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Σημείωση:__ Δεν μπορείτε να αναμίξετε πολλαπλές στρατηγικές επιλογέα σε έναν επιλογέα. Χρησιμοποιήστε πολλαπλά αλυσιδωτά ερωτήματα στοιχείων για να επιτύχετε τον ίδιο στόχο, π.χ.:

```js
const elem = await $('header h1*=Welcome') // doesn't work!!!
// use instead
const elem = await $('header').$('h1*=Welcome')
```

## Tag Name

Για να ερωτήσετε ένα στοιχείο με συγκεκριμένο όνομα ετικέτας, χρησιμοποιήστε `<tag>` ή `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Μπορείτε να ερωτήσετε αυτό το στοιχείο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name Attribute

Για ερωτήματα στοιχείων με συγκεκριμένο χαρακτηριστικό ονόματος, μπορείτε είτε να χρησιμοποιήσετε έναν κανονικό επιλογέα CSS3 είτε την παρεχόμενη στρατηγική ονόματος από το [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) περνώντας κάτι σαν [name="some-name"] ως παράμετρο επιλογέα:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Σημείωση:__ Αυτή η στρατηγική επιλογέα είναι παρωχημένη και λειτουργεί μόνο σε παλιούς περιηγητές που τρέχουν με το πρωτόκολλο JSONWireProtocol ή χρησιμοποιώντας το Appium.

## xPath

Είναι επίσης δυνατό να ερωτήσετε στοιχεία μέσω συγκεκριμένου [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

Ένας επιλογέας xPath έχει μορφή όπως `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Μπορείτε να ερωτήσετε τη δεύτερη παράγραφο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Μπορείτε να χρησιμοποιήσετε το xPath για να διασχίσετε επίσης προς τα πάνω και προς τα κάτω το δέντρο DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Accessibility Name Selector

Ερωτήστε στοιχεία με το προσβάσιμο όνομά τους. Το προσβάσιμο όνομα είναι αυτό που ανακοινώνεται από έναν αναγνώστη οθόνης όταν αυτό το στοιχείο λαμβάνει την εστίαση. Η τιμή του προσβάσιμου ονόματος μπορεί να είναι τόσο οπτικό περιεχόμενο όσο και κρυφές εναλλακτικές κειμένου.

:::info

Μπορείτε να διαβάσετε περισσότερα για αυτόν τον επιλογέα στην [ανάρτηση του blog μας](/blog/2022/09/05/accessibility-selector)

:::

### Fetch by `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Fetch by `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Fetch by content

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Fetch by title

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Fetch by `alt` property

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Role Attribute

Για ερωτήματα στοιχείων με βάση τους [ρόλους ARIA](https://www.w3.org/TR/html-aria/#docconformance), μπορείτε να καθορίσετε απευθείας το ρόλο του στοιχείου όπως `[role=button]` ως παράμετρο επιλογέα:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID Attribute

Η στρατηγική εντοπισμού "id" δεν υποστηρίζεται στο πρωτόκολλο WebDriver, θα πρέπει να χρησιμοποιήσετε είτε CSS είτε στρατηγικές επιλογέα xPath για να βρείτε στοιχεία χρησιμοποιώντας ID.

Ωστόσο, ορισμένοι οδηγοί (π.χ. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) μπορεί ακόμα να [υποστηρίζουν](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) αυτόν τον επιλογέα.

Οι τρέχουσες υποστηριζόμενες συντάξεις επιλογέα για ID είναι:

```js
//css locator
const button = await $('#someid')
//xpath locator
const button = await $('//*[@id="someid"]')
//id strategy
// Note: works only in Appium or similar frameworks which supports locator strategy "ID"
const button = await $('id=resource-id/iosname')
```

## JS Function

Μπορείτε επίσης να χρησιμοποιήσετε συναρτήσεις JavaScript για να ανακτήσετε στοιχεία χρησιμοποιώντας εγγενή API ιστού. Φυσικά, μπορείτε να το κάνετε αυτό μόνο μέσα σε ένα πλαίσιο ιστού (π.χ., `browser`, ή πλαίσιο ιστού σε κινητό).

Δεδομένης της ακόλουθης δομής HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Μπορείτε να ερωτήσετε το αδελφό στοιχείο του `#elem` ως εξής:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Deep Selectors

:::warning

Ξεκινώντας με την έκδοση `v9` του WebdriverIO δεν υπάρχει ανάγκη για αυτόν τον ειδικό επιλογέα καθώς το WebdriverIO διαπερνά αυτόματα το Shadow DOM για εσάς. Συνιστάται να μεταβείτε από αυτόν τον επιλογέα αφαιρώντας το `>>>` μπροστά από αυτόν.

:::

Πολλές εφαρμογές frontend βασίζονται σε μεγάλο βαθμό σε στοιχεία με [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Είναι τεχνικά αδύνατο να ερωτηθούν στοιχεία μέσα στο shadow DOM χωρίς παρακάμψεις. Τα [`shadow$`](https://webdriver.io/docs/api/element/shadow$) και [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) ήταν τέτοιες παρακάμψεις που είχαν τους [περιορισμούς](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow) τους. Με τον βαθύ επιλογέα μπορείτε πλέον να ερωτήσετε όλα τα στοιχεία μέσα σε οποιοδήποτε shadow DOM χρησιμοποιώντας την κοινή εντολή ερωτήματος.

Δεδομένου ότι έχουμε μια εφαρμογή με την ακόλουθη δομή:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Με αυτόν τον επιλογέα μπορείτε να ερωτήσετε το στοιχείο `<button />` που είναι ένθετο μέσα σε ένα άλλο shadow DOM, π.χ.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Mobile Selectors

Για υβριδικές δοκιμές κινητών, είναι σημαντικό ο διακομιστής αυτοματισμού να βρίσκεται στο σωστό *πλαίσιο* πριν την εκτέλεση εντολών. Για την αυτοματοποίηση χειρονομιών, ο οδηγός ιδανικά θα πρέπει να οριστεί σε εγγενές πλαίσιο. Αλλά για να επιλέξετε στοιχεία από το DOM, ο οδηγός θα πρέπει να οριστεί στο πλαίσιο webview της πλατφόρμας. Μόνο *τότε* μπορούν να χρησιμοποιηθούν οι μέθοδοι που αναφέρθηκαν παραπάνω.

Για εγγενείς δοκιμές κινητών, δεν υπάρχει εναλλαγή μεταξύ πλαισίων, καθώς πρέπει να χρησιμοποιήσετε στρατηγικές κινητών και να χρησιμοποιήσετε απευθείας την υποκείμενη τεχνολογία αυτοματισμού συσκευής. Αυτό είναι ιδιαίτερα χρήσιμο όταν μια δοκιμή χρειάζεται κάποιον λεπτομερή έλεγχο για την εύρεση στοιχείων.

### Android UiAutomator

Το πλαίσιο UI Automator του Android παρέχει πολλούς τρόπους για την εύρεση στοιχείων. Μπορείτε να χρησιμοποιήσετε το [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), συγκεκριμένα την [κλάση UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) για τον εντοπισμό στοιχείων. Στο Appium στέλνετε τον κώδικα Java, ως συμβολοσειρά, στον διακομιστή, ο οποίος τον εκτελεί στο περιβάλλον της εφαρμογής, επιστρέφοντας το στοιχείο ή τα στοιχεία.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher and ViewMatcher (Espresso only)

Η στρατηγική DataMatcher του Android παρέχει έναν τρόπο για την εύρεση στοιχείων με [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

Και παρομοίως [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (Espresso only)

Η στρατηγική ετικέτας προβολής παρέχει έναν βολικό τρόπο για την εύρεση στοιχείων με την [ετικέτα](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) τους.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Κατά την αυτοματοποίηση μιας εφαρμογής iOS, μπορεί να χρησιμοποιηθεί το [πλαίσιο UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) της Apple για την εύρεση στοιχείων.

Αυτό το JavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) έχει μεθόδους για πρόσβαση στην προβολή και σε όλα τα στοιχεία της.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Μπορείτε επίσης να χρησιμοποιήσετε την αναζήτηση κατηγορημάτων μέσα στο iOS UI Automation στο Appium για να βελτιώσετε περαιτέρω την επιλογή στοιχείων. Δείτε [εδώ](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) για λεπτομέρειες.

### iOS XCUITest predicate strings and class chains

Με iOS 10 και άνω (χρησιμοποιώντας τον οδηγό `XCUITest`), μπορείτε να χρησιμοποιήσετε [συμβολοσειρές κατηγορημάτων](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Και [αλυσίδες κλάσεων](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Η στρατηγική εντοπισμού `accessibility id` είναι σχεδιασμένη για την ανάγνωση ενός μοναδικού αναγνωριστικού για ένα στοιχείο UI. Αυτό έχει το πλεονέκτημα ότι δεν αλλάζει κατά τη διάρκεια της τοπικοποίησης ή οποιασδήποτε άλλης διαδικασίας που μπορεί να αλλάξει το κείμενο. Επιπλέον, μπορεί να βοηθήσει στη δημιουργία δοκιμών σε διάφορες πλατφόρμες, εάν τα στοιχεία που είναι λειτουργικά τα ίδια έχουν το ίδιο accessibility id.

- Για το iOS αυτό είναι το `accessibility identifier` που καθορίζεται από την Apple [εδώ](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Για το Android το `accessibility id` αντιστοιχεί στο `content-description` για το στοιχείο, όπως περιγράφεται [εδώ](https://developer.android.com/training/accessibility/accessible-app.html).

Για αμφότερες τις πλατφόρμες, η λήψη ενός στοιχείου (ή πολλαπλών στοιχείων) με το `accessibility id` τους είναι συνήθως η καλύτερη μέθοδος. Είναι επίσης ο προτιμώμενος τρόπος έναντι της παρωχημένης στρατηγικής `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

Η στρατηγική `class name` είναι μια `συμβολοσειρά` που αντιπροσωπεύει ένα στοιχείο UI στην τρέχουσα προβολή.

- Για το iOS είναι το πλήρες όνομα μιας [κλάσης UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), και θα ξεκινά με `UIA-`, όπως `UIATextField` για ένα πεδίο κειμένου. Μια πλήρης αναφορά μπορεί να βρεθεί [εδώ](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Για το Android είναι το πλήρως προσδιορισμένο όνομα μιας [κλάσης UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [class](https://developer.android.com/reference/android/widget/package-summary.html), όπως `android.widget.EditText` για ένα πεδίο κειμένου. Μια πλήρης αναφορά μπορεί να βρεθεί [εδώ](https://developer.android.com/reference/android/widget/package-summary.html).
- Για το Youi.tv είναι το πλήρες όνομα μιας κλάσης Youi.tv, και θα ξεκινά με `CYI-`, όπως `CYIPushButtonView` για ένα στοιχείο κουμπιού ώθησης. Μια πλήρης αναφορά μπορεί να βρεθεί στη [σελίδα GitHub του You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// iOS example
await $('UIATextField').click()
// Android example
await $('android.widget.DatePicker').click()
// Youi.tv example
await $('CYIPushButtonView').click()
```

## Chain Selectors

Εάν θέλετε να είστε πιο συγκεκριμένοι στο ερώτημά σας, μπορείτε να αλυσιδώσετε επιλογείς μέχρι να βρείτε το σωστό στοιχείο. Εάν καλέσετε `element` πριν από την πραγματική εντολή σας, το WebdriverIO ξεκινά το ερώτημα από αυτό το στοιχείο.

Για παράδειγμα, εάν έχετε μια δομή DOM όπως:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

Και θέλετε να προσθέσετε το προϊόν B στο καλάθι, θα ήταν δύσκολο να το κάνετε αυτό χρησιμοποιώντας μόνο τον επιλογέα CSS.

Με την αλυσίδωση επιλογέων, είναι πολύ πιο εύκολο. Απλά περιορίστε το επιθυμητό στοιχείο βήμα προς βήμα:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium Image Selector

Χρησιμοποιώντας τη στρατηγική εντοπισμού `-image`, είναι δυνατό να στείλετε στο Appium ένα αρχείο εικόνας που αντιπροσωπεύει ένα στοιχείο που θέλετε να προσπελάσετε.

Υποστηριζόμενες μορφές αρχείων `jpg,png,gif,bmp,svg`

Πλήρης αναφορά μπορεί να βρεθεί [εδώ](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Σημείωση**: Ο τρόπος με τον οποίο το Appium λειτουργεί με αυτόν τον επιλογέα είναι ότι εσωτερικά θα κάνει ένα (app)screenshot και θα χρησιμοποιήσει τον παρεχόμενο επιλογέα εικόνας για να επαληθεύσει αν το στοιχείο μπορεί να βρεθεί σε αυτό το (app)screenshot.

Να γνωρίζετε ότι το Appium μπορεί να αλλάξει το μέγεθος του ληφθέντος (app)screenshot για να το κάνει να ταιριάζει με το μέγεθος CSS της (app)οθόνης σας (αυτό θα συμβεί σε iPhone αλλά και σε συσκευές Mac με οθόνη Retina επειδή το DPR είναι μεγαλύτερο από 1). Αυτό θα έχει ως αποτέλεσμα να μην βρεθεί αντιστοιχία επειδή ο παρεχόμενος επιλογέας εικόνας μπορεί να έχει ληφθεί από το αρχικό στιγμιότυπο οθόνης.
Μπορείτε να το διορθώσετε ενημερώνοντας τις ρυθμίσεις του Appium Server, δείτε τα [έγγραφα Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) για τις ρυθμίσεις και [αυτό το σχόλιο](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) για μια λεπτομερή εξήγηση.

## React Selectors

Το WebdriverIO παρέχει έναν τρόπο επιλογής στοιχείων React με βάση το όνομα του στοιχείου. Για να το κάνετε αυτό, έχετε την επιλογή δύο εντολών: `react$` και `react$$`.

Αυτές οι εντολές σας επιτρέπουν να επιλέξετε στοιχεία από το [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) και να επιστρέψετε είτε ένα μοναδικό στοιχείο WebdriverIO είτε έναν πίνακα στοιχείων (ανάλογα με το ποια συνάρτηση χρησιμοποιείται).

**Σημείωση**: Οι εντολές `react$` και `react$$` είναι παρόμοιες στη λειτουργικότητα, εκτός από το ότι η `react$$` θα επιστρέψει *όλα* τα αντίστοιχα στιγμιότυπα ως πίνακα στοιχείων WebdriverIO, και η `react$` θα επιστρέψει το πρώτο που βρέθηκε.

#### Basic example

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Στον παραπάνω κώδικα υπάρχει ένα απλό στιγμιότυπο `MyComponent` μέσα στην εφαρμογή, το οποίο η React αποδίδει μέσα σε ένα στοιχείο HTML με `id="root"`.

Με την εντολή `browser.react$`, μπορείτε να επιλέξετε ένα στιγμιότυπο του `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Τώρα που έχετε το στοιχείο WebdriverIO αποθηκευμένο στη μεταβλητή `myCmp`, μπορείτε να εκτελέσετε εντολές στοιχείου εναντίον του.

#### Filtering components

Η βιβλιοθήκη που χρησιμοποιεί εσωτερικά το WebdriverIO επιτρέπει το φιλτράρισμα της επιλογής σας με βάση τις ιδιότητες ή/και την κατάσταση του στοιχείου. Για να το κάνετε αυτό, πρέπει να περάσετε ένα δεύτερο όρισμα για τις ιδιότητες ή/και ένα τρίτο όρισμα για την κατάσταση στην εντολή του περιηγητή.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Εάν θέλετε να επιλέξετε το στιγμιότυπο του `MyComponent` που έχει μια ιδιότητα `name` ως `WebdriverIO`, μπορείτε να εκτελέσετε την εντολή ως εξής:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Εάν θέλατε να φιλτράρετε την επιλογή μας με βάση την κατάσταση, η εντολή `browser` θα έμοιαζε κάπως έτσι:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### Dealing with `React.Fragment`

Όταν χρησιμοποιείτε την εντολή `react$` για να επιλέξετε [fragments](https://reactjs.org/docs/fragments.html) React, το WebdriverIO θα επιστρέψει το πρώτο παιδί αυτού του στοιχείου ως κόμβο του στοιχείου. Εάν χρησιμοποιήσετε `react$$`, θα λάβετε έναν πίνακα που περιέχει όλους τους κόμβους HTML μέσα στα fragments που ταιριάζουν με τον επιλογέα.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Δεδομένου του παραπάνω παραδείγματος, έτσι λειτουργούν οι εντολές:

```js
await browser.react$('MyComponent') // returns the WebdriverIO Element for the first <div />
await browser.react$$('MyComponent') // returns the WebdriverIO Elements for the array [<div />, <div />]
```

**Σημείωση:** Εάν έχετε πολλαπλά στιγμιότυπα του `MyComponent` και χρησιμοποιείτε `react$$` για να επιλέξετε αυτά τα στοιχεία fragment, θα σας επιστραφεί ένας μονοδιάστατος πίνακας όλων των κόμβων. Με άλλα λόγια, εάν έχετε 3 στιγμιότυπα `<MyComponent />`, θα σας επιστραφεί ένας πίνακας με έξι στοιχεία WebdriverIO.

## Custom Selector Strategies


Εάν η εφαρμογή σας απαιτεί έναν συγκεκριμένο τρόπο για την ανάκτηση στοιχείων, μπορείτε να ορίσετε εσείς οι ίδιοι μια προσαρμοσμένη στρατηγική επιλογέα που μπορείτε να χρησιμοποιήσετε με `custom$` και `custom$$`. Για αυτό, καταχωρίστε τη στρατηγική σας μία φορά στην αρχή της δοκιμής, π.χ. σε ένα hook `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

Δεδομένου του ακόλουθου αποσπάσματος HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

Στη συνέχεια, χρησιμοποιήστε το καλώντας:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

**Σημείωση:** αυτό λειτουργεί μόνο σε ένα περιβάλλον web στο οποίο μπορεί να εκτελεστεί η εντολή [`execute`](/docs/api/browser/execute).