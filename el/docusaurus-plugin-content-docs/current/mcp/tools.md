---
id: tools
title: Εργαλεία
---

Τα ακόλουθα εργαλεία είναι διαθέσιμα μέσω του διακομιστή WebdriverIO MCP. Αυτά τα εργαλεία επιτρέπουν στους βοηθούς AI να αυτοματοποιούν προγράμματα περιήγησης και εφαρμογές για κινητά.

## Session Management

### `start_browser`

Ξεκινάει μια συνεδρία περιηγητή Chrome.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `headless` | boolean | No | `false` | Εκτέλεση του Chrome σε λειτουργία headless |
| `windowWidth` | number | No | `1920` | Πλάτος παραθύρου περιηγητή (400-3840) |
| `windowHeight` | number | No | `1080` | Ύψος παραθύρου περιηγητή (400-2160) |
| `navigationUrl` | string | No | - | URL για πλοήγηση μετά την εκκίνηση του περιηγητή |

#### Example

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### Support

- Desktop Browsers

---

### `start_app_session`

Ξεκινάει μια συνεδρία εφαρμογής για κινητά σε iOS ή Android μέσω Appium.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `platform` | string | Yes | - | Πλατφόρμα για αυτοματοποίηση: `iOS` ή `Android` |
| `deviceName` | string | Yes | - | Όνομα της συσκευής ή του προσομοιωτή/εξομοιωτή |
| `appPath` | string | No* | - | Διαδρομή προς το αρχείο εφαρμογής (.app, .ipa, ή .apk) |
| `platformVersion` | string | No | - | Έκδοση λειτουργικού συστήματος (π.χ., `17.0`, `14`) |
| `automationName` | string | No | Auto | `XCUITest` (iOS), `UiAutomator2` ή `Espresso` (Android) |
| `udid` | string | No | - | Μοναδικό αναγνωριστικό συσκευής (απαιτείται για πραγματικές συσκευές iOS) |
| `noReset` | boolean | No | `false` | Διατήρηση της κατάστασης της εφαρμογής μεταξύ συνεδριών |
| `fullReset` | boolean | No | `true` | Απεγκατάσταση και επανεγκατάσταση της εφαρμογής πριν από τη συνεδρία |
| `autoGrantPermissions` | boolean | No | `true` | Αυτόματη χορήγηση δικαιωμάτων εφαρμογής |
| `autoAcceptAlerts` | boolean | No | `true` | Αυτόματη αποδοχή ειδοποιήσεων συστήματος |
| `autoDismissAlerts` | boolean | No | `false` | Απόρριψη (αντί για αποδοχή) ειδοποιήσεων |
| `appWaitActivity` | string | No | - | Δραστηριότητα αναμονής κατά την εκκίνηση (μόνο για Android) |
| `newCommandTimeout` | number | No | `60` | Δευτερόλεπτα πριν λήξει η συνεδρία λόγω αδράνειας |
| `appiumHost` | string | No | `127.0.0.1` | Όνομα διακομιστή Appium |
| `appiumPort` | number | No | `4723` | Θύρα διακομιστή Appium |
| `appiumPath` | string | No | `/` | Διαδρομή διακομιστή Appium |

*Είτε πρέπει να παρέχεται το `appPath`, είτε `noReset: true` για σύνδεση σε μια ήδη εκτελούμενη εφαρμογή.

#### Example

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### Support

- iOS Simulators
- iOS Real Devices
- Android Emulators
- Android Real Devices

---

### `close_session`

Κλείνει την τρέχουσα συνεδρία περιηγητή ή εφαρμογής.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `detach` | boolean | No | `false` | Αποσύνδεση από τη συνεδρία αντί για κλείσιμο (κρατάει τον περιηγητή/εφαρμογή σε λειτουργία) |

#### Notes

Συνεδρίες με `noReset: true` ή χωρίς `appPath` αποσυνδέονται αυτόματα κατά το κλείσιμο για τη διατήρηση της κατάστασης.

#### Support

- Desktop Browsers
- Mobile Apps

---

## Navigation

### `navigate`

Πλοηγείται σε μια διεύθυνση URL.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `url` | string | Yes | Η διεύθυνση URL για πλοήγηση |

#### Example

```
Navigate to https://webdriver.io
```

#### Support

- Desktop Browsers

---

## Element Interaction

### `click_element`

Κάνει κλικ σε ένα στοιχείο που προσδιορίζεται από έναν επιλογέα.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Yes | - | Επιλογέας CSS, XPath ή επιλογέας για κινητά |
| `scrollToView` | boolean | No | `true` | Κύλιση του στοιχείου σε ορατή θέση πριν το κλικ |
| `timeout` | number | No | `3000` | Μέγιστος χρόνος αναμονής για το στοιχείο (ms) |

#### Notes

- Υποστηρίζει επιλογείς κειμένου WebdriverIO: `button=Exact text` ή `a*=Contains text`
- Χρησιμοποιεί κεντρική στοίχιση για τη θέση κύλισης

#### Example

```
Click the element with selector "#submit-button"
```

#### Support

- Desktop Browsers
- Mobile Native Apps

---

### `set_value`

Πληκτρολογεί κείμενο σε ένα πεδίο εισαγωγής.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Yes | - | Επιλογέας για το στοιχείο εισαγωγής |
| `value` | string | Yes | - | Κείμενο για πληκτρολόγηση |
| `scrollToView` | boolean | No | `true` | Κύλιση του στοιχείου σε ορατή θέση πριν την πληκτρολόγηση |
| `timeout` | number | No | `3000` | Μέγιστος χρόνος αναμονής για το στοιχείο (ms) |

#### Notes

Καθαρίζει την υπάρχουσα τιμή πριν πληκτρολογήσει νέο κείμενο.

#### Example

```
Set the value "john@example.com" in the element with selector "#email"
```

#### Support

- Desktop Browsers
- Mobile Native Apps

---

## Page Analysis

### `get_visible_elements`

Παίρνει ορατά και διαδραστικά στοιχεία στην τρέχουσα σελίδα ή οθόνη. Αυτό είναι το κύριο εργαλείο για την ανακάλυψη των διαθέσιμων στοιχείων για αλληλεπίδραση.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `elementType` | string | No | `interactable` | Τύπος στοιχείων: `interactable` (κουμπιά/σύνδεσμοι/πεδία), `visual` (εικόνες/SVGs), ή `all` |
| `inViewportOnly` | boolean | No | `true` | Επιστροφή μόνο των στοιχείων που είναι ορατά στο viewport |
| `includeContainers` | boolean | No | `false` | Συμπερίληψη περιεκτών διάταξης (ViewGroup, ScrollView, κλπ.) |
| `includeBounds` | boolean | No | `false` | Συμπερίληψη συντεταγμένων στοιχείου (x, y, πλάτος, ύψος) |
| `limit` | number | No | `0` | Μέγιστος αριθμός στοιχείων προς επιστροφή (0 = απεριόριστα) |
| `offset` | number | No | `0` | Αριθμός στοιχείων προς παράλειψη (για σελιδοποίηση) |

#### Returns

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Τα στοιχεία ιστού περιλαμβάνουν:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**Τα στοιχεία κινητών περιλαμβάνουν:** Πολλαπλές στρατηγικές εντοπισμού (accessibility ID, resource ID, XPath, UiAutomator/predicates), τύπο στοιχείου, κείμενο και προαιρετικά όρια

#### Notes

- **Web**: Χρησιμοποιεί βελτιστοποιημένο σενάριο περιηγητή για γρήγορο εντοπισμό στοιχείων
- **Mobile**: Χρησιμοποιεί αποδοτική ανάλυση XML πηγής σελίδας (2 HTTP κλήσεις αντί για 600+ για ερωτήματα στοιχείων)
- Χρησιμοποιήστε σελιδοποίηση (`limit` και `offset`) για μεγάλες σελίδες για να μειώσετε τη χρήση tokens

#### Example

```
Get all visible elements on the page with their coordinates
```

#### Support

- Desktop Browsers
- Mobile Apps

---

### `get_accessibility`

Λαμβάνει το δέντρο προσβασιμότητας της τρέχουσας σελίδας με σημασιολογικές πληροφορίες σχετικά με ρόλους, ονόματα και καταστάσεις.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `limit` | number | No | `100` | Μέγιστος αριθμός κόμβων προς επιστροφή (0 = απεριόριστοι) |
| `offset` | number | No | `0` | Αριθμός κόμβων προς παράλειψη (για σελιδοποίηση) |
| `roles` | string[] | No | All | Φιλτράρισμα σε συγκεκριμένους ρόλους (π.χ., `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | No | `true` | Επιστροφή μόνο κόμβων με όνομα/ετικέτα |

#### Returns

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### Notes

- Μόνο για περιηγητές. Για εφαρμογές κινητών, χρησιμοποιήστε το `get_visible_elements`
- Χρήσιμο όταν το `get_visible_elements` δεν επιστρέφει τα αναμενόμενα στοιχεία
- Το `namedOnly: true` φιλτράρει ανώνυμους περιέκτες και μειώνει τον θόρυβο

#### Support

- Desktop Browsers

---

## Screenshots

### `take_screenshot`

Λαμβάνει ένα στιγμιότυπο οθόνης του τρέχοντος viewport.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `outputPath` | string | No | Διαδρομή για αποθήκευση του αρχείου στιγμιότυπου. Αν παραλειφθεί, επιστρέφει δεδομένα base64 |

#### Returns

Δεδομένα εικόνας κωδικοποιημένα σε base64 (PNG ή JPEG) με πληροφορίες μεγέθους.

#### Notes

Τα στιγμιότυπα οθόνης βελτιστοποιούνται αυτόματα:
- Μέγιστη διάσταση: 2000px (κλιμακώνεται προς τα κάτω αν είναι μεγαλύτερη)
- Μέγιστο μέγεθος αρχείου: 1MB
- Μορφή: PNG με μέγιστη συμπίεση, ή JPEG αν χρειάζεται για το όριο μεγέθους

#### Support

- Desktop Browsers
- Mobile Apps

---

## Scrolling

### `scroll`

Κυλάει τη σελίδα προς τα πάνω ή κάτω κατά ένα συγκεκριμένο αριθμό εικονοστοιχείων.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Yes | - | Κατεύθυνση κύλισης: `up` ή `down` |
| `pixels` | number | No | `500` | Αριθμός εικονοστοιχείων για κύλιση |

#### Notes

Μόνο για περιηγητές. Για κύλιση σε κινητά, χρησιμοποιήστε το εργαλείο `swipe`.

#### Support

- Desktop Browsers

---

## Cookie Management

### `get_cookies`

Λαμβάνει cookies από την τρέχουσα συνεδρία.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `name` | string | No | Συγκεκριμένο όνομα cookie για ανάκτηση (παραλείψτε για όλα τα cookies) |

#### Returns

Αντικείμενα cookie με ιδιότητες name, value, domain, path, expiry, secure και httpOnly.

#### Support

- Desktop Browsers

---

### `set_cookie`

Ορίζει ένα cookie στην τρέχουσα συνεδρία.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `name` | string | Yes | - | Όνομα cookie |
| `value` | string | Yes | - | Τιμή cookie |
| `domain` | string | No | Current | Τομέας cookie |
| `path` | string | No | `/` | Διαδρομή cookie |
| `expiry` | number | No | - | Λήξη ως χρονοσφραγίδα Unix (δευτερόλεπτα) |
| `secure` | boolean | No | - | Σημαία ασφαλείας |
| `httpOnly` | boolean | No | - | Σημαία HttpOnly |
| `sameSite` | string | No | - | Χαρακτηριστικό SameSite: `strict`, `lax`, ή `none` |

#### Support

- Desktop Browsers

---

### `delete_cookies`

Διαγράφει cookies από την τρέχουσα συνεδρία.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `name` | string | No | Συγκεκριμένο όνομα cookie για διαγραφή (παραλείψτε για διαγραφή όλων) |

#### Support

- Desktop Browsers

---

## Touch Gestures (Mobile)

### `tap_element`

Πατάει σε ένα στοιχείο ή σε συντεταγμένες οθόνης.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `selector` | string | No* | Επιλογέας για το στοιχείο προς πάτημα |
| `x` | number | No* | Συντεταγμένη X για πάτημα |
| `y` | number | No* | Συντεταγμένη Y για πάτημα |

*Είτε το `selector` είτε και τα `x` και `y` απαιτούνται.

#### Support

- Mobile Apps

---

### `swipe`

Εκτελεί μια κίνηση σάρωσης προς την καθορισμένη κατεύθυνση.

#### Parameters

| Parameter | Type | Mandatory | Default | Description |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Yes | - | Κατεύθυνση σάρωσης: `up`, `down`, `left`, `right` |
| `duration` | number | No | `500` | Διάρκεια σάρωσης σε χιλιοστά δευτερολέπτου (100-5000) |
| `percent` | number | No | 0.5/0.95 | Ποσοστό της οθόνης για σάρωση (0-1) |

#### Notes

- Προεπιλεγμένο ποσοστό: 0.5 για κάθετες σαρώσεις, 0.95 για οριζόντιες
- Η κατεύθυνση υποδεικνύει την κίνηση περιεχομένου: "swipe up" κυλάει το περιεχόμενο προς τα πάνω

#### Example

```
Swipe up to scroll down the screen
```

#### Support

- Mobile Apps

---

### `drag_and_drop`

Σύρει ένα στοιχείο σε ένα άλλο στοιχείο ή συντεταγμένες.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | Yes | Επιλογέας στοιχείου προέλευσης για σύρσιμο |
| `targetSelector` | string | No* | Επιλογέας στοιχείου προορισμού για απόθεση |
| `x` | number | No* | Μετατόπιση X προορισμού (αν δεν υπάρχει targetSelector) |
| `y` | number | No* | Μετατόπιση Y προορισμού (αν δεν υπάρχει targetSelector) |
| `duration` | number | No | Default | Διάρκεια σύρσιμου σε χιλιοστά δευτερολέπτου (100-5000) |

*Είτε το `targetSelector` είτε και τα `x` και `y` απαιτούνται.

#### Support

- Mobile Apps

---

## App Lifecycle (Mobile)

### `get_app_state`

Λαμβάνει την τρέχουσα κατάσταση μιας εφαρμογής.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `bundleId` | string | Yes | Αναγνωριστικό εφαρμογής (bundle ID για iOS, package name για Android) |

#### Returns

Κατάσταση εφαρμογής: `not installed`, `not running`, `running in background (suspended)`, `running in background`, ή `running in foreground`.

#### Support

- Mobile Apps

---

## Context Switching (Hybrid Apps)

### `get_contexts`

Παραθέτει όλα τα διαθέσιμα πλαίσια (native και webviews).

#### Parameters

Κανένα

#### Returns

Πίνακας ονομάτων πλαισίων (π.χ., `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### Support

- Mobile Hybrid Apps

---

### `get_current_context`

Λαμβάνει το τρέχον ενεργό πλαίσιο.

#### Parameters

Κανένα

#### Returns

Όνομα τρέχοντος πλαισίου (π.χ., `NATIVE_APP` ή `WEBVIEW_*`).

#### Support

- Mobile Hybrid Apps

---

### `switch_context`

Εναλλάσσεται μεταξύ native και webview πλαισίων.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `context` | string | Yes | Όνομα πλαισίου ή δείκτης (με βάση το 1) από το `get_contexts` |

#### Example

```
Switch to the WEBVIEW_com.example.app context
```

#### Support

- Mobile Hybrid Apps

---

## Device Control (Mobile)

### `rotate_device`

Περιστρέφει τη συσκευή σε συγκεκριμένο προσανατολισμό.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `orientation` | string | Yes | `PORTRAIT` ή `LANDSCAPE` |

#### Support

- Mobile Apps

---

### `hide_keyboard`

Κρύβει το πληκτρολόγιο οθόνης.

#### Parameters

Κανένα

#### Support

- Mobile Apps

---

### `get_geolocation`

Λαμβάνει τις τρέχουσες συντεταγμένες GPS.

#### Parameters

Κανένα

#### Returns

Αντικείμενο με `latitude`, `longitude` και `altitude`.

#### Support

- Mobile Apps

---

### `set_geolocation`

Ορίζει τις συντεταγμένες GPS της συσκευής.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `latitude` | number | Yes | Συντεταγμένη γεωγραφικού πλάτους (-90 έως 90) |
| `longitude` | number | Yes | Συντεταγμένη γεωγραφικού μήκους (-180 έως 180) |
| `altitude` | number | No | Υψόμετρο σε μέτρα |

#### Example

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### Support

- Mobile Apps

---

## Script Execution

### `execute_script`

Εκτελεί JavaScript στον περιηγητή ή εντολές για κινητά μέσω Appium.

#### Parameters

| Parameter | Type | Mandatory | Description |
|-----------|------|-----------|-------------|
| `script` | string | Yes | Κώδικας JavaScript (περιηγητής) ή εντολή για κινητά (π.χ., `mobile: pressKey`) |
| `args` | array | No | Ορίσματα για το σενάριο |

#### Browser Examples

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### Mobile (Appium) Examples

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### Common Android Key Codes

| Key | Code |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### More Mobile Commands

For a complete list of available Appium mobile commands, see:
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### Support

- Desktop Browsers
- Mobile Apps (via Appium mobile commands)