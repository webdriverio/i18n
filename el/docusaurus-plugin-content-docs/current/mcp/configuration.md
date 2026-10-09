---
id: configuration
title: Διαμόρφωση
description: "Διαμορφώστε τον διακομιστή WebdriverIO MCP, συμπεριλαμβανομένων των επιλογών συνεδρίας, προγράμματος περιήγησης, κινητών συσκευών, παρόχων cloud, ανίχνευσης στοιχείων και Appium."
---

Αυτή η σελίδα τεκμηριώνει όλες τις επιλογές διαμόρφωσης για τον διακομιστή WebdriverIO MCP.

## Διαμόρφωση Διακομιστή MCP

Ο διακομιστής MCP διαμορφώνεται μέσω των αρχείων διαμόρφωσης ή εντολών.

### Βασική Διαμόρφωση

Επεξεργαστείτε το αρχείο διαμόρφωσης MCP (π.χ. `./.mcp.json`) και προσθέστε τα εξής:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

## Επιλογές Συνεδρίας

Όλες οι επιλογές συνεδρίας μεταβιβάζονται στο εργαλείο `start_session`. Υπάρχει ένα ενιαίο εργαλείο για συνεδρίες προγράμματος περιήγησης και κινητών συσκευών· η παράμετρος `platform` καθορίζει τον τύπο της συνεδρίας.

### Κοινές Επιλογές

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

Η πλατφόρμα προς αυτοματοποίηση.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

Πού εκτελείται η συνεδρία. Χρησιμοποιήστε το όνομα ενός παρόχου cloud για απομακρυσμένες συσκευές· ο καθένας απαιτεί τις δικές του μεταβλητές περιβάλλοντος. Δείτε τους [Παρόχους Cloud](./cloud-providers) για λεπτομέρειες.

</Option>
## Επιλογές Συνεδρίας Προγράμματος Περιήγησης

Επιλογές για συνεδρίες `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

Πρόγραμμα περιήγησης προς εκκίνηση.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

Έκδοση προγράμματος περιήγησης. Μόνο για παρόχους cloud (προεπιλογή: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

Λειτουργικό σύστημα για συνεδρίες προγράμματος περιήγησης σε παρόχους cloud. Παραδείγματα: `os: "Windows"`, `osVersion: "11"` ή `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

Εκτέλεση του προγράμματος περιήγησης σε λειτουργία headless (χωρίς ορατό παράθυρο). Ορίστε σε `false` για να βλέπετε το πρόγραμμα περιήγησης.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **Εύρος:** `400` - `3840`

Αρχικό πλάτος παραθύρου του προγράμματος περιήγησης σε pixel.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **Εύρος:** `400` - `2160`

Αρχικό ύψος παραθύρου του προγράμματος περιήγησης σε pixel.

</Option>
### `navigationUrl`

<Option type="string" required="No">

URL στο οποίο θα γίνει πλοήγηση αμέσως μετά την εκκίνηση του προγράμματος περιήγησης. Πιο αποδοτικό από την κλήση του `start_session` και στη συνέχεια του `navigate` ξεχωριστά.

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

Σύνδεση σε υπάρχουσα παρουσία του Chrome αντί για εκκίνηση νέας. Χρησιμοποιήστε το μετά το `launch_chrome` για σύνδεση μέσω CDP.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

Διαμόρφωση σύνδεσης απομακρυσμένου εντοπισμού σφαλμάτων του Chrome. Ισχύει μόνο όταν `attach: true`.

</Option>
## Επιλογές Συνεδρίας Κινητών Συσκευών

Επιλογές για συνεδρίες `platform: "ios"` ή `platform: "android"`.

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

Όνομα της συσκευής, του προσομοιωτή ή του εξομοιωτή.

**Παραδείγματα:**
-   Προσομοιωτής iOS: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Εξομοιωτής Android: `"Pixel 7"`, `"Nexus 5X"`
-   Πραγματική συσκευή: Το όνομα της συσκευής όπως εμφανίζεται στο σύστημά σας

</Option>
### `platformVersion`

<Option type="string" required="No">

Έκδοση λειτουργικού συστήματος της συσκευής/προσομοιωτή/εξομοιωτή (π.χ. `"18.0"` για iOS, `"14"` για Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

Πρόγραμμα οδήγησης αυτοματοποίησης. Προεπιλογή είναι το `XCUITest` για iOS και το `UiAutomator2` για Android.

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

Μοναδικό αναγνωριστικό συσκευής (Unique Device Identifier). Απαιτείται για πραγματικές συσκευές iOS (αναγνωριστικό 40 χαρακτήρων).

**Εύρεση UDID:**
-   **iOS:** Συνδέστε τη συσκευή, ανοίξτε το Finder, κάντε κλικ στη συσκευή → Serial Number (κάντε κλικ για να εμφανιστεί το UDID)
-   **Android:** Εκτελέστε `adb devices` στο τερματικό

</Option>
### `appPath`

<Option type="string" required="No">

Διαδρομή προς το αρχείο της εφαρμογής προς εγκατάσταση και εκκίνηση.

**Υποστηριζόμενες μορφές:**
-   Προσομοιωτής iOS: κατάλογος `.app`
-   Πραγματική συσκευή iOS: αρχείο `.ipa`
-   Android: αρχείο `.apk`

Πρέπει είτε να παρέχεται το `appPath`, είτε το `noReset: true` για σύνδεση σε εφαρμογή που ήδη εκτελείται.

</Option>
### `app`

<Option type="string" required="No">

URL εφαρμογής παρόχου cloud (`bs://...` για BrowserStack, `storage:filename=` για Sauce Labs, `lt://...` για TestMu, app_url για TestingBot) ή `customId`. Χρησιμοποιείται αντί του `appPath` για συνεδρίες κινητών συσκευών στο cloud.

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

Activity που αναμένεται κατά την εκκίνηση της εφαρμογής. Αν δεν οριστεί, χρησιμοποιείται η κύρια activity/activity εκκίνησης της εφαρμογής.

**Παράδειγμα:** `"com.example.app.MainActivity"`

</Option>
### Επιλογές Κατάστασης Συνεδρίας

#### `noReset`

<Option type="boolean" required="No">

Διατήρηση της κατάστασης της εφαρμογής μεταξύ συνεδριών. Όταν είναι `true`:
-   Τα δεδομένα της εφαρμογής διατηρούνται (κατάσταση σύνδεσης, προτιμήσεις κ.λπ.)
-   Η συνεδρία θα **αποσυνδεθεί** αντί να κλείσει (η εφαρμογή συνεχίζει να εκτελείται)
-   Μπορεί να χρησιμοποιηθεί χωρίς `appPath` για σύνδεση σε εφαρμογή που ήδη εκτελείται

</Option>
#### `fullReset`

<Option type="boolean" required="No">

Πλήρης επαναφορά της εφαρμογής πριν από τη συνεδρία:
-   iOS: Απεγκαθιστά και επανεγκαθιστά την εφαρμογή
-   Android: Διαγράφει τα δεδομένα και την προσωρινή μνήμη της εφαρμογής

Ορίστε `fullReset: false` μαζί με `noReset: true` για πλήρη διατήρηση της κατάστασης της εφαρμογής.

</Option>
### Χρονικό Όριο Συνεδρίας

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

Πόσο χρόνο (σε δευτερόλεπτα) θα περιμένει το Appium για νέα εντολή πριν τερματίσει τη συνεδρία. Αυξήστε το για μεγαλύτερες συνεδρίες εντοπισμού σφαλμάτων.

</Option>
### Αυτόματος Χειρισμός

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

Αυτόματη παραχώρηση δικαιωμάτων εφαρμογής κατά την εγκατάσταση/εκκίνηση (κάμερα, μικρόφωνο, τοποθεσία κ.λπ.).

:::note Μόνο Android
Αυτή η επιλογή επηρεάζει κυρίως το Android. Τα δικαιώματα του iOS πρέπει να αντιμετωπίζονται διαφορετικά λόγω περιορισμών του συστήματος.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

Αυτόματη αποδοχή ειδοποιήσεων συστήματος (διαλόγων) κατά την αυτοματοποίηση ("Allow notifications?", κ.λπ.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

Απόρριψη ειδοποιήσεων συστήματος αντί για αποδοχή τους. Υπερισχύει του `autoAcceptAlerts` όταν είναι `true`.

</Option>
### Σύνδεση με Διακομιστή Appium

Παρακάμψτε τη σύνδεση με τον διακομιστή Appium ανά συνεδρία χρησιμοποιώντας το `appiumConfig`:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

Σύνδεση με διακομιστή Appium. Προεπιλογή: `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Επιλογές Παρόχων Cloud

### Διαπιστευτήρια

Κάθε πάροχος cloud απαιτεί τις δικές του μεταβλητές περιβάλλοντος:

| Πάροχος      | Μεταβλητή Ονόματος Χρήστη | Μεταβλητή Κλειδιού Πρόσβασης |
| ------------ | ------------------------- | ---------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME`   | `BROWSERSTACK_ACCESS_KEY`    |
| Sauce Labs   | `SAUCE_USERNAME`          | `SAUCE_ACCESS_KEY`           |
| TestMu       | `TESTMU_USERNAME`         | `TESTMU_ACCESS_KEY`          |
| TestingBot   | `TESTINGBOT_KEY`          | `TESTINGBOT_SECRET`          |

Ορίστε τις πριν από την εκκίνηση του διακομιστή MCP.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

Περιοχή κέντρου δεδομένων της Sauce Labs. Αγνοείται για άλλους παρόχους.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

Ενεργοποίηση δρομολόγησης μέσω τοπικού tunnel για συνεδρίες παρόχων cloud (πρόσβαση σε localhost, περιβάλλοντα staging, εσωτερικές υπηρεσίες).

-   `true` — Αυτόματη εκκίνηση του tunnel πριν από τη συνεδρία και διακοπή του κατά το κλείσιμο
-   `"external"` — Το tunnel εκτελείται ήδη εξωτερικά· ορίζει μόνο τις κατάλληλες σημαίες για τον πάροχο

Πριν χρησιμοποιήσετε το `true`, διαβάστε τον πόρο local-binary του παρόχου (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` ή `wdio://testingbot/local-binary`) για οδηγίες εγκατάστασης ειδικές για το λειτουργικό σύστημα και την αρχιτεκτονική σας.

</Option>
### `tunnelName`

<Option type="string" required="No">

Όνομα αναγνωριστικού του tunnel. Απαιτείται όταν `tunnel: "external"` ώστε να αντιστοιχεί στο tunnel που εκτελείται. Όταν `tunnel: true`, δημιουργείται αυτόματα ένα μοναδικό όνομα αν δεν παρέχεται.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

Ετικέτες συνεδρίας παρόχου cloud που εμφανίζονται στον πίνακα ελέγχου του παρόχου. Λειτουργεί με τον ίδιο τρόπο σε BrowserStack, Sauce Labs, TestMu και TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

Ενεργοποίηση καταγραφής trace. Παράγει ένα συμπιεσμένο αρχείο `.trace` συμβατό με το Playwright, το οποίο αποθηκεύεται στο `.trace/` κατά το `close_session`. Δείτε τα traces στο [player.vibium.dev](https://player.vibium.dev).

</Option>
## Επιλογές Ανίχνευσης Στοιχείων

Επιλογές για το εργαλείο `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

Επιστροφή μόνο των στοιχείων που είναι ορατά στην τρέχουσα περιοχή προβολής. Ορίστε σε `true` για μείωση των αποτελεσμάτων σε μεγάλες σελίδες.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

Συμπερίληψη στοιχείων container/διάταξης στα αποτελέσματα:

**Containers Android:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**Containers iOS:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

Συμπερίληψη των συντεταγμένων του πλαισίου οριοθέτησης του στοιχείου (x, y, πλάτος, ύψος) στην απόκριση.

</Option>
### Σελιδοποίηση

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Μέγιστος αριθμός στοιχείων προς επιστροφή.

</Option>
#### `offset`

<Option type="number" default="0" required="No">

Αριθμός στοιχείων που παραλείπονται πριν από την επιστροφή αποτελεσμάτων.

**Παράδειγμα:** Λήψη των στοιχείων 21–40:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Επιλογές Δέντρου Προσβασιμότητας

Επιλογές για το εργαλείο `get_accessibility_tree` (μόνο για πρόγραμμα περιήγησης).

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Μέγιστος αριθμός κόμβων προς επιστροφή.

</Option>
### `offset`

<Option type="number" default="0" required="No">

Αριθμός κόμβων που παραλείπονται για σελιδοποίηση.

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

Φιλτράρισμα σε συγκεκριμένους ρόλους προσβασιμότητας.

**Συνήθεις ρόλοι:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Παράδειγμα:** Λήψη μόνο κουμπιών και συνδέσμων:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Στιγμιότυπο Οθόνης

Το εργαλείο `get_screenshot` δεν δέχεται παραμέτρους. Τα στιγμιότυπα οθόνης επεξεργάζονται αυτόματα:

| Βελτιστοποίηση     | Τιμή     | Περιγραφή                                                     |
| ------------------ | -------- | ------------------------------------------------------------- |
| Μέγιστη διάσταση   | 2000px   | Οι εικόνες μεγαλύτερες από 2000px σμικρύνονται                |
| Μέγιστο μέγεθος    | 1MB      | Οι εικόνες συμπιέζονται ώστε να παραμένουν κάτω από 1MB       |
| Μορφή              | PNG/JPEG | PNG με μέγιστη συμπίεση· JPEG αν χρειάζεται λόγω μεγέθους     |

## Συμπεριφορά Συνεδρίας

### Τύποι Συνεδρίας

| Τύπος     | Περιγραφή                          | Αυτόματη Αποσύνδεση                       |
| --------- | ---------------------------------- | ----------------------------------------- |
| `browser` | Συνεδρία προγράμματος περιήγησης   | Όχι                                       |
| `ios`     | Συνεδρία εφαρμογής iOS             | Ναι (αν `noReset: true` ή χωρίς `appPath`) |
| `android` | Συνεδρία εφαρμογής Android         | Ναι (αν `noReset: true` ή χωρίς `appPath`) |

### Μοντέλο Μίας Συνεδρίας

Ο διακομιστής MCP λειτουργεί με **μοντέλο μίας συνεδρίας**:

-   Μόνο μία συνεδρία προγράμματος περιήγησης Ή εφαρμογής μπορεί να είναι ενεργή κάθε φορά
-   Η εκκίνηση νέας συνεδρίας θα κλείσει/αποσυνδέσει την τρέχουσα συνεδρία
-   Η κατάσταση της συνεδρίας διατηρείται καθολικά σε όλες τις κλήσεις εργαλείων

### Αποσύνδεση έναντι Κλεισίματος

| Ενέργεια            | `detach: false` (Κλείσιμο)                 | `detach: true` (Αποσύνδεση)                                        |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------ |
| Πρόγραμμα περιήγησης | Κλείνει πλήρως το πρόγραμμα περιήγησης     | Διατηρεί το πρόγραμμα περιήγησης σε λειτουργία, αποσυνδέει το WebDriver |
| Εφαρμογή κινητού    | Τερματίζει την εφαρμογή                    | Διατηρεί την εφαρμογή σε λειτουργία στην τρέχουσα κατάσταση         |
| Περίπτωση χρήσης    | Καθαρή αρχή για την επόμενη συνεδρία       | Διατήρηση κατάστασης, χειροκίνητος έλεγχος                         |

## Ζητήματα Απόδοσης

### Αυτοματοποίηση Προγράμματος Περιήγησης

-   Η **λειτουργία headless** είναι ταχύτερη αλλά δεν αποδίδει οπτικά στοιχεία
-   Τα **μικρότερα μεγέθη παραθύρου** μειώνουν τον χρόνο λήψης στιγμιότυπων οθόνης
-   Η **ανίχνευση στοιχείων** είναι βελτιστοποιημένη με μία μόνο εκτέλεση script
-   Η **βελτιστοποίηση στιγμιότυπων οθόνης** διατηρεί τις εικόνες κάτω από 1MB για αποδοτική επεξεργασία

### Αυτοματοποίηση Κινητών Συσκευών

-   Η **ανάλυση του XML page source** χρησιμοποιεί μόνο 2 κλήσεις HTTP (έναντι 600+ για παραδοσιακά ερωτήματα στοιχείων)
-   Οι **επιλογείς Accessibility ID** είναι οι ταχύτεροι και πιο αξιόπιστοι
-   Οι **επιλογείς XPath** είναι οι πιο αργοί· χρησιμοποιήστε τους μόνο ως έσχατη λύση
-   Η **σελιδοποίηση** (`limit` και `offset`) μειώνει τη χρήση tokens σε οθόνες με πολλά στοιχεία

### Συμβουλές για τη Χρήση Tokens

| Ρύθμιση                    | Επίδραση                                                          |
| -------------------------- | ----------------------------------------------------------------- |
| `inViewportOnly: true`     | Φιλτράρει στοιχεία εκτός οθόνης, μειώνοντας το μέγεθος απόκρισης  |
| `includeContainers: false` | Εξαιρεί στοιχεία διάταξης (ViewGroup κ.λπ.)                       |
| `includeBounds: false`     | Παραλείπει τα δεδομένα x/y/πλάτους/ύψους                          |
| `limit` με σελιδοποίηση    | Επεξεργασία στοιχείων σε παρτίδες αντί για όλα μαζί               |

## Ρύθμιση Διακομιστή Appium

Πριν χρησιμοποιήσετε την αυτοματοποίηση κινητών συσκευών, βεβαιωθείτε ότι το Appium είναι σωστά διαμορφωμένο.

### Βασική Ρύθμιση

```sh
# Εγκατάσταση του Appium καθολικά
npm install -g appium

# Εγκατάσταση προγραμμάτων οδήγησης
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Εκκίνηση του διακομιστή
appium
```

### Προσαρμοσμένη Διαμόρφωση Διακομιστή

```sh
# Εκκίνηση με προσαρμοσμένο host και port
appium --address 0.0.0.0 --port 4724

# Εκκίνηση με καταγραφή
appium --log-level debug

# Εκκίνηση με συγκεκριμένη βασική διαδρομή
appium --base-path /wd/hub
```

### Επαλήθευση Εγκατάστασης

```sh
# Έλεγχος εγκατεστημένων προγραμμάτων οδήγησης
appium driver list --installed

# Έλεγχος έκδοσης Appium
appium --version

# Δοκιμή σύνδεσης
curl http://localhost:4723/status
```

## Αντιμετώπιση Προβλημάτων Διαμόρφωσης

### Ο Διακομιστής MCP Δεν Ξεκινά

1. Επαληθεύστε ότι το npm/npx είναι εγκατεστημένο: `npm --version`
2. Δοκιμάστε χειροκίνητη εκτέλεση: `npx @wdio/mcp`
3. Ελέγξτε τα αρχεία καταγραφής του harness σας για σφάλματα

### Προβλήματα Σύνδεσης με το Appium

1. Επαληθεύστε ότι το Appium εκτελείται: `curl http://localhost:4723/status`
2. Ελέγξτε ότι το `appiumConfig` στο `start_session` αντιστοιχεί στις ρυθμίσεις του διακομιστή Appium
3. Βεβαιωθείτε ότι το τείχος προστασίας επιτρέπει συνδέσεις στη θύρα του Appium

### Η Συνεδρία Δεν Ξεκινά

1. **Πρόγραμμα περιήγησης:** Βεβαιωθείτε ότι το επιθυμητό πρόγραμμα περιήγησης είναι εγκατεστημένο
2. **iOS:** Επαληθεύστε ότι το Xcode και οι προσομοιωτές είναι διαθέσιμοι
3. **Android:** Ελέγξτε το `ANDROID_HOME` και ότι ο εξομοιωτής εκτελείται
4. Εξετάστε τα αρχεία καταγραφής του διακομιστή Appium για λεπτομερή μηνύματα σφάλματος

### Λήξη Χρονικού Ορίου Συνεδριών

Αν οι συνεδρίες λήγουν κατά τον εντοπισμό σφαλμάτων:
1. Αυξήστε το `newCommandTimeout` κατά την εκκίνηση της συνεδρίας
2. Χρησιμοποιήστε `noReset: true` για διατήρηση της κατάστασης μεταξύ συνεδριών
3. Χρησιμοποιήστε `detach: true` κατά το κλείσιμο για να συνεχίσει να εκτελείται η εφαρμογή