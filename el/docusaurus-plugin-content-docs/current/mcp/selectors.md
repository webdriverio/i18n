---
id: selectors
title: Επιλογείς
description: "Επιλέξτε επιλογείς για τον εντοπισμό στοιχείων σε ιστοσελίδες και εφαρμογές κινητών κατά την αυτοματοποίηση με τον διακομιστή MCP του WebdriverIO."
---

Ο διακομιστής MCP του WebdriverIO υποστηρίζει πολλαπλές στρατηγικές επιλογέων για τον εντοπισμό στοιχείων σε ιστοσελίδες και εφαρμογές κινητών.

:::info

Για πλήρη τεκμηρίωση των επιλογέων, συμπεριλαμβανομένων όλων των στρατηγικών επιλογέων του WebdriverIO, ανατρέξτε στον κύριο οδηγό [Επιλογείς](/docs/selectors). Αυτή η σελίδα εστιάζει στους επιλογείς που χρησιμοποιούνται συνήθως με τον διακομιστή MCP.

:::

## Επιλογείς Web

Για την αυτοματοποίηση του προγράμματος περιήγησης, ο διακομιστής MCP υποστηρίζει όλους τους τυπικούς επιλογείς του WebdriverIO. Οι πιο συχνά χρησιμοποιούμενοι περιλαμβάνουν:

| Επιλογέας | Παράδειγμα                     | Περιγραφή                         |
| --------- | ------------------------------ | --------------------------------- |
| CSS       | `#login-button`, `.submit-btn` | Τυπικοί επιλογείς CSS             |
| XPath     | `//button[@id='submit']`       | Εκφράσεις XPath                   |
| Text      | `button=Submit`, `a*=Click`    | Επιλογείς κειμένου του WebdriverIO |
| ARIA      | `aria/Submit Button`           | Επιλογείς ονόματος προσβασιμότητας |
| Test ID   | `[data-testid="submit"]`       | Συνιστάται για δοκιμές            |

Για λεπτομερή παραδείγματα και βέλτιστες πρακτικές, ανατρέξτε στην τεκμηρίωση [Επιλογείς](/docs/selectors).

## Επιλογείς Κινητών

Οι επιλογείς κινητών λειτουργούν τόσο σε πλατφόρμες iOS όσο και σε Android μέσω του Appium.

### Accessibility ID (Συνιστάται)

Τα Accessibility IDs είναι ο **πιο αξιόπιστος επιλογέας μεταξύ πλατφορμών**. Λειτουργούν τόσο σε iOS όσο και σε Android και παραμένουν σταθερά κατά τις ενημερώσεις της εφαρμογής.

```text
# Σύνταξη
~accessibilityId

# Παραδείγματα
~loginButton
~submitForm
~usernameField
```

:::tip Βέλτιστη Πρακτική
Προτιμάτε πάντα τα accessibility IDs όταν είναι διαθέσιμα. Παρέχουν:
- Συμβατότητα μεταξύ πλατφορμών (iOS + Android)
- Σταθερότητα κατά τις αλλαγές του UI
- Καλύτερη συντηρησιμότητα των δοκιμών
- Βελτιωμένη προσβασιμότητα της εφαρμογής σας
:::

### Επιλογείς Android

#### UiAutomator

Οι επιλογείς UiAutomator είναι ισχυροί και γρήγοροι για Android.

```text
# Με βάση το κείμενο
android=new UiSelector().text("Login")

# Με βάση μέρος του κειμένου
android=new UiSelector().textContains("Log")

# Με βάση το Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Με βάση το όνομα κλάσης
android=new UiSelector().className("android.widget.Button")

# Με βάση την περιγραφή (Προσβασιμότητα)
android=new UiSelector().description("Login button")

# Συνδυασμένες συνθήκες
android=new UiSelector().className("android.widget.Button").text("Login")

# Κοντέινερ με δυνατότητα κύλισης
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Τα Resource IDs παρέχουν σταθερή αναγνώριση στοιχείων στο Android.

```text
# Πλήρες Resource ID
id=com.example.app:id/login_button

# Μερικό ID (το πακέτο της εφαρμογής συνάγεται αυτόματα)
id=login_button
```

#### XPath (Android)

Το XPath λειτουργεί στο Android αλλά είναι πιο αργό από το UiAutomator.

```text
# Με βάση την κλάση και το κείμενο
//android.widget.Button[@text='Login']

# Με βάση το Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Με βάση το Content Description
//android.widget.ImageButton[@content-desc='Menu']

# Ιεραρχικά
//android.widget.LinearLayout/android.widget.Button[1]
```

### Επιλογείς iOS

#### Predicate String

Τα iOS Predicate Strings είναι γρήγορα και ισχυρά για την αυτοματοποίηση iOS.

```text
# Με βάση την ετικέτα
-ios predicate string:label == "Login"

# Με βάση μέρος της ετικέτας
-ios predicate string:label CONTAINS "Log"

# Με βάση το όνομα
-ios predicate string:name == "loginButton"

# Με βάση τον τύπο
-ios predicate string:type == "XCUIElementTypeButton"

# Με βάση την τιμή
-ios predicate string:value == "ON"

# Συνδυασμένες συνθήκες
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Ορατότητα
-ios predicate string:label == "Login" AND visible == 1

# Χωρίς διάκριση πεζών-κεφαλαίων
-ios predicate string:label ==[c] "login"
```

**Τελεστές Predicate:**

| Τελεστής     | Περιγραφή                   |
| ------------ | --------------------------- |
| `==`         | Ίσο                         |
| `!=`         | Διάφορο                     |
| `CONTAINS`   | Περιέχει υποσυμβολοσειρά    |
| `BEGINSWITH` | Ξεκινά με                   |
| `ENDSWITH`   | Τελειώνει με                |
| `LIKE`       | Αντιστοίχιση με μπαλαντέρ   |
| `MATCHES`    | Αντιστοίχιση με regex       |
| `AND`        | Λογικό AND                  |
| `OR`         | Λογικό OR                   |

#### Class Chain

Τα iOS Class Chains παρέχουν ιεραρχικό εντοπισμό στοιχείων με καλή απόδοση.

```text
# Άμεσο θυγατρικό στοιχείο
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Οποιοδήποτε απόγονο στοιχείο
-ios class chain:**/XCUIElementTypeButton

# Με βάση τον δείκτη
-ios class chain:**/XCUIElementTypeCell[3]

# Σε συνδυασμό με Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Ιεραρχικά
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Τελευταίο στοιχείο
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

Το XPath λειτουργεί στο iOS αλλά είναι πιο αργό από τα predicate strings.

```text
# Με βάση τον τύπο και την ετικέτα
//XCUIElementTypeButton[@label='Login']

# Με βάση το όνομα
//XCUIElementTypeTextField[@name='username']

# Με βάση την τιμή
//XCUIElementTypeSwitch[@value='1']

# Ιεραρχικά
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## Στρατηγική Επιλογέων μεταξύ Πλατφορμών

Όταν γράφετε δοκιμές που πρέπει να λειτουργούν τόσο σε iOS όσο και σε Android, χρησιμοποιήστε την ακόλουθη σειρά προτεραιότητας:

### 1. Accessibility ID (Καλύτερο)

```text
# Λειτουργεί και στις δύο πλατφόρμες
~loginButton
```

### 2. Ειδικοί ανά Πλατφόρμα με Λογική Συνθηκών

Όταν τα accessibility IDs δεν είναι διαθέσιμα, χρησιμοποιήστε επιλογείς ειδικούς για κάθε πλατφόρμα:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (Έσχατη Λύση)

Το XPath λειτουργεί και στις δύο πλατφόρμες αλλά με διαφορετικούς τύπους στοιχείων:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## Αναφορά Τύπων Στοιχείων

### Τύποι Στοιχείων Android

| Τύπος                         | Περιγραφή            |
| ----------------------------- | -------------------- |
| `android.widget.Button`       | Κουμπί               |
| `android.widget.EditText`     | Πεδίο εισαγωγής κειμένου |
| `android.widget.TextView`     | Ετικέτα κειμένου     |
| `android.widget.ImageView`    | Εικόνα               |
| `android.widget.ImageButton`  | Κουμπί εικόνας       |
| `android.widget.CheckBox`     | Πλαίσιο ελέγχου      |
| `android.widget.RadioButton`  | Κουμπί επιλογής      |
| `android.widget.Switch`       | Διακόπτης εναλλαγής  |
| `android.widget.Spinner`      | Αναπτυσσόμενο μενού  |
| `android.widget.ListView`     | Προβολή λίστας       |
| `android.widget.RecyclerView` | Recycler view        |
| `android.widget.ScrollView`   | Κοντέινερ κύλισης    |

### Τύποι Στοιχείων iOS

| Τύπος                            | Περιγραφή              |
| -------------------------------- | ---------------------- |
| `XCUIElementTypeButton`          | Κουμπί                 |
| `XCUIElementTypeTextField`       | Πεδίο εισαγωγής κειμένου |
| `XCUIElementTypeSecureTextField` | Πεδίο εισαγωγής κωδικού |
| `XCUIElementTypeStaticText`      | Ετικέτα κειμένου       |
| `XCUIElementTypeImage`           | Εικόνα                 |
| `XCUIElementTypeSwitch`          | Διακόπτης εναλλαγής    |
| `XCUIElementTypeSlider`          | Ολισθητής              |
| `XCUIElementTypePicker`          | Τροχός επιλογής        |
| `XCUIElementTypeTable`           | Προβολή πίνακα         |
| `XCUIElementTypeCell`            | Κελί πίνακα            |
| `XCUIElementTypeCollectionView`  | Προβολή συλλογής       |
| `XCUIElementTypeScrollView`      | Προβολή κύλισης        |

## Βέλτιστες Πρακτικές

### Να κάνετε

- **Χρησιμοποιείτε accessibility IDs** για σταθερούς επιλογείς μεταξύ πλατφορμών
- **Προσθέτετε χαρακτηριστικά data-testid** στα στοιχεία web για δοκιμές
- **Χρησιμοποιείτε resource IDs** στο Android όταν τα accessibility IDs δεν είναι διαθέσιμα
- **Προτιμάτε τα predicate strings** έναντι του XPath στο iOS
- **Διατηρείτε τους επιλογείς απλούς** και συγκεκριμένους

### Να μην κάνετε

- **Αποφεύγετε τις μακροσκελείς εκφράσεις XPath** - είναι αργές και εύθραυστες
- **Μην βασίζεστε σε δείκτες** για δυναμικές λίστες
- **Αποφεύγετε επιλογείς βασισμένους σε κείμενο** για εφαρμογές με τοπικοποίηση
- **Μην χρησιμοποιείτε απόλυτο XPath** (που ξεκινά από τη ρίζα)

### Παραδείγματα Καλών και Κακών Επιλογέων

```text
# Καλό - Σταθερό accessibility ID
~loginButton

# Κακό - Εύθραυστο XPath με δείκτες
//div[3]/form/button[2]

# Καλό - Συγκεκριμένο CSS με test ID
[data-testid="submit-button"]

# Κακό - Κλάση που μπορεί να αλλάξει
.btn-primary-lg-v2

# Καλό - UiAutomator με resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Κακό - Κείμενο που μπορεί να τοπικοποιηθεί
android=new UiSelector().text("Submit")
```

## Αποσφαλμάτωση Επιλογέων

### Web (Chrome DevTools)

1. Ανοίξτε τα Chrome DevTools (F12)
2. Χρησιμοποιήστε τον πίνακα Elements για να επιθεωρήσετε στοιχεία
3. Κάντε δεξί κλικ σε ένα στοιχείο → Copy → Copy selector
4. Δοκιμάστε επιλογείς στην Console: `document.querySelector('your-selector')`

### Κινητά (Appium Inspector)

1. Εκκινήστε το Appium Inspector
2. Συνδεθείτε στην ενεργή σας συνεδρία
3. Κάντε κλικ σε στοιχεία για να δείτε όλα τα διαθέσιμα χαρακτηριστικά
4. Χρησιμοποιήστε τη λειτουργία "Search for element" για να δοκιμάσετε επιλογείς

### Χρήση του `get_elements`

Το εργαλείο `get_elements` του διακομιστή MCP επιστρέφει πολλαπλές στρατηγικές επιλογέων για κάθε στοιχείο:

```text
Ask: "Get all visible elements on the screen"
```

Αυτό επιστρέφει στοιχεία με προ-δημιουργημένους επιλογείς που μπορείτε να χρησιμοποιήσετε απευθείας.

#### Προηγμένες Επιλογές

Για περισσότερο έλεγχο στον εντοπισμό στοιχείων:

```text
# Λήψη μόνο εικόνων και οπτικών στοιχείων
Get visible elements with elementType "visual"

# Λήψη στοιχείων με τις συντεταγμένες τους για αποσφαλμάτωση διάταξης
Get visible elements with includeBounds enabled

# Λήψη των επόμενων 20 στοιχείων (σελιδοποίηση)
Get visible elements with limit 20 and offset 20

# Συμπερίληψη κοντέινερ διάταξης για αποσφαλμάτωση
Get visible elements with includeContainers enabled
```

Το εργαλείο επιστρέφει μια σελιδοποιημένη απόκριση:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Χρήση του `get_accessibility` (Μόνο για Πρόγραμμα Περιήγησης)

Για την αυτοματοποίηση του προγράμματος περιήγησης, το εργαλείο `get_accessibility` παρέχει σημασιολογικές πληροφορίες για τα στοιχεία της σελίδας:

```text
# Λήψη όλων των κόμβων προσβασιμότητας με όνομα
Get accessibility tree

# Φιλτράρισμα μόνο σε κουμπιά και συνδέσμους
Get accessibility tree filtered to button and link roles

# Λήψη της επόμενης σελίδας αποτελεσμάτων
Get accessibility tree with limit 50 and offset 50
```

Αυτό είναι χρήσιμο όταν το `get_elements` δεν επιστρέφει τα αναμενόμενα στοιχεία, καθώς υποβάλλει ερωτήματα στο εγγενές API προσβασιμότητας του προγράμματος περιήγησης.