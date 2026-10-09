---
id: cloud-providers
title: Πάροχοι Cloud
description: "Εκτελέστε συνεδρίες προγράμματος περιήγησης και κινητών συσκευών του WebdriverIO MCP σε cloud device farms, συμπεριλαμβανομένων διαπιστευτηρίων, μεταφορτώσεων εφαρμογών, tunnels και αναφορών."
---

Ο διακομιστής WebdriverIO MCP διαθέτει εγγενή υποστήριξη για την εκτέλεση συνεδριών αυτοματοποίησης προγραμμάτων περιήγησης και κινητών συσκευών σε cloud device farms. Δεν απαιτούνται τοπικοί drivers, emulators ή simulators. Υποστηρίζονται τέσσερις πάροχοι:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (προγράμματα περιήγησης) και [App Automate](https://www.browserstack.com/app-automate) (εφαρμογές κινητών)
- **Sauce Labs** — [Sauce Labs](https://saucelabs.com) cloud πραγματικών συσκευών και εικονικά προγράμματα περιήγησης
- **TestMu (πρώην LambdaTest)** — [TestMu](https://www.lambdatest.com) cloud πραγματικών συσκευών και προγραμμάτων περιήγησης
- **TestingBot** — [TestingBot](https://testingbot.com) cloud πραγματικών συσκευών και browser grid

Και οι τέσσερις πάροχοι ακολουθούν την ίδια ροή εργασίας: ορίστε τα διαπιστευτήρια, προαιρετικά μεταφορτώστε μια εφαρμογή κινητού και, στη συνέχεια, καλέστε το `start_session` με το όνομα του παρόχου. Οι ετικέτες αναφορών, η διαμόρφωση του tunnel και ο κύκλος ζωής της εφαρμογής κινητού είναι πανομοιότυπα σε όλους τους παρόχους.

## Προαπαιτούμενα

Ορίστε τα διαπιστευτήριά σας ως μεταβλητές περιβάλλοντος πριν εκκινήσετε τον διακομιστή MCP:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| Πάροχος      | Μεταβλητή Username      | Μεταβλητή Access Key      | Πού θα το βρείτε                                                   |
| ------------ | ----------------------- | ------------------------- | ------------------------------------------------------------------ |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` | [Ρυθμίσεις λογαριασμού](https://www.browserstack.com/accounts/settings) |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        | [Ρυθμίσεις χρήστη](https://app.saucelabs.com/user-settings)        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       | [Ρυθμίσεις λογαριασμού](https://accounts.lambdatest.com/detail/profile) |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       | [Ρυθμίσεις λογαριασμού](https://testingbot.com/membership)         |

## Αυτοματοποίηση Προγράμματος Περιήγησης

Εκτελέστε μια συνεδρία προγράμματος περιήγησης σε οποιονδήποτε πάροχο cloud ορίζοντας το `provider` στο `start_session`:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

Όλοι οι πάροχοι υποστηρίζουν για το `browser` τις τιμές: `"chrome"`, `"firefox"`, `"edge"`, `"safari"`. Αν παραλείψετε τα `os` / `osVersion`, ο πάροχος χρησιμοποιεί λογικές προεπιλογές (συνήθως την πιο πρόσφατη έκδοση Linux για συνεδρίες προγράμματος περιήγησης).

### Περιοχές Sauce Labs

Η Sauce Labs υποστηρίζει πολλαπλές περιοχές κέντρων δεδομένων. Ορίστε την παράμετρο `region` στο `start_session`:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

Υποστηριζόμενες τιμές: `"us-west-1"`, `"eu-central-1"` (προεπιλογή), `"apac-southeast-1"`.

## Αυτοματοποίηση Εφαρμογών Κινητών

Η ροή εργασίας για κινητά έχει τρία βήματα, πανομοιότυπα σε όλους τους παρόχους:

### Βήμα 1: Μεταφορτώστε την εφαρμογή σας

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

Καθένα επιστρέφει μια αναφορά εφαρμογής που θα χρησιμοποιήσετε στο `start_session`:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

Μπορείτε προαιρετικά να ορίσετε ένα `customId` για σταθερές αναφορές μεταξύ μεταφορτώσεων:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

Για τη Sauce Labs, προσθέστε το `region` ώστε να αντιστοιχεί στην περιοχή αποθήκευσής σας (προεπιλογή `"eu-central-1"`).

### Βήμα 2: Εμφανίστε τις διαθέσιμες εφαρμογές

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

Προαιρετικές παράμετροι για όλους τους παρόχους:
- `sortBy`: `"app_name"` ή `"uploaded_at"` (προεπιλογή)
- `limit`: μέγιστος αριθμός αποτελεσμάτων (προεπιλογή 20)

Το BrowserStack υποστηρίζει επίσης το `organizationWide: true` για την εμφάνιση όλων των μεταφορτώσεων του οργανισμού. Η Sauce Labs δέχεται το `region`.

### Βήμα 3: Εκκινήστε τη συνεδρία

Χρησιμοποιήστε την αναφορά εφαρμογής από το `upload_app` ή ένα `customId`:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## Τοπικό Tunnel

Και οι τρεις πάροχοι υποστηρίζουν ένα τοπικό tunnel, ώστε οι συνεδρίες cloud να μπορούν να έχουν πρόσβαση σε διακομιστές στο μηχάνημά σας (localhost, περιβάλλοντα staging, εσωτερικές υπηρεσίες).

Ο διακομιστής MCP χρησιμοποιεί μια **ενιαία παράμετρο `tunnel`** που λειτουργεί πανομοιότυπα σε όλους τους παρόχους:

### Αυτόματα διαχειριζόμενο tunnel (προτείνεται)

Ο διακομιστής MCP εκκινεί και τερματίζει το tunnel αυτόματα:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

Πριν από την πρώτη σας συνεδρία με `tunnel: true`, ο διακομιστής MCP αναλαμβάνει τη λήψη και την εκκίνηση του εκτελέσιμου αρχείου του tunnel. Αν θέλετε να επαληθεύσετε τη ρύθμιση χειροκίνητα, διαβάστε τον πόρο local-binary του παρόχου:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

Το tunnel τερματίζεται αυτόματα όταν κλείσετε τη συνεδρία.

### Εξωτερικό tunnel

Αν εκτελείτε ήδη το tunnel σε ξεχωριστή διεργασία:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

Η τιμή `"external"` ενημερώνει τον διακομιστή MCP ότι ένα tunnel εκτελείται ήδη· ορίζει τις κατάλληλες σημαίες capabilities, αλλά δεν εκκινεί ούτε τερματίζει καμία διεργασία. Ορίστε το `tunnelName` ώστε να αντιστοιχεί στο tunnel που εκτελείται.

### Χειροκίνητη ρύθμιση tunnel

Αν προτιμάτε να εκτελείτε το tunnel χειροκίνητα, διαβάστε τις οδηγίες ρύθμισης από τον πόρο MCP για τον πάροχο και την πλατφόρμα σας. Για παράδειγμα:

```text
// Διαβάστε τις οδηγίες ρύθμισης (από τον AI client σας)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

Κάθε πόρος επιστρέφει το URL λήψης, εντολές ανά πλατφόρμα και οδηγίες για την εκτέλεση ως daemon.

## Αναφορές

Επισημάνετε τις συνεδρίες με ετικέτες project, build και session για τον πίνακα ελέγχου του παρόχου. Αυτό λειτουργεί πανομοιότυπα και στους τρεις παρόχους:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

Οι συνεδρίες εμφανίζονται στον πίνακα ελέγχου του παρόχου κάτω από το καθορισμένο project και build:
- BrowserStack: [Πίνακας ελέγχου Automate](https://automate.browserstack.com)
- Sauce Labs: [Αποτελέσματα δοκιμών](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Πίνακας ελέγχου αυτοματοποίησης](https://automation.lambdatest.com)
- TestingBot: [Αποτελέσματα δοκιμών](https://testingbot.com/members)

## Σημειώσεις ανά Πάροχο

### BrowserStack

- Συνεδρίες προγράμματος περιήγησης: το `os` δέχεται `"Windows"` ή `"OS X"`. Εκδόσεις Windows: `"10"`, `"11"`. Εκδόσεις macOS: `"Ventura"`, `"Sonoma"`, `"Sequoia"`.
- API διαχείρισης εφαρμογών: το `organizationWide: true` στο `list_apps` εμφανίζει όλες τις μεταφορτώσεις της ομάδας.

### Sauce Labs

- **Οι περιοχές έχουν σημασία.** Η προεπιλεγμένη περιοχή είναι η `eu-central-1`. Αν ο λογαριασμός σας βρίσκεται σε διαφορετική περιοχή, ορίστε το `region` στα `start_session`, `list_apps` και `upload_app` ώστε να αντιστοιχεί.
- Οι συνεδρίες κινητών υποστηρίζουν το `automationName` (`"XCUITest"` ή `"UiAutomator2"`)· οι προεπιλογές είναι λογικές ανά πλατφόρμα.
- Το tunnel Sauce Connect διαχειρίζεται αυτόματα μέσω του πακέτου npm `saucelabs`. Δεν απαιτείται εξωτερικό εκτελέσιμο αρχείο για το `tunnel: true`.

### TestMu

- Το όνομα του παρόχου είναι `"testmu"` στα `start_session`, `list_apps` και `upload_app`.
- Οι συνεδρίες προγράμματος περιήγησης συνδέονται στο `hub.lambdatest.com`· οι συνεδρίες κινητών συνδέονται στο `mobile-hub.lambdatest.com`· αυτό γίνεται αυτόματα.
- Το tunnel διαχειρίζεται αυτόματα μέσω του πακέτου npm `@lambdatest/node-tunnel`.
- Η διαχείριση εφαρμογών κινητών ανακτά τόσο εφαρμογές Android όσο και iOS μέσω ξεχωριστών κλήσεων API και στη συνέχεια συγχωνεύει τα αποτελέσματα.

### TestingBot

- Το όνομα του παρόχου είναι `"testingbot"` στα `start_session`, `list_apps` και `upload_app`.
- Οι συνεδρίες προγράμματος περιήγησης και κινητών συνδέονται και οι δύο στο `hub.testingbot.com` στη θύρα 443 (γίνεται αυτόματα).
- Τα διαπιστευτήρια χρησιμοποιούν τα `TESTINGBOT_KEY` και `TESTINGBOT_SECRET` (όχι ζεύγος username/access-key όπως οι άλλοι πάροχοι).
- Το tunnel διαχειρίζεται αυτόματα μέσω του πακέτου npm `testingbot-tunnel-launcher` (απαιτεί Java 11+).
- Δεν υπάρχει παράμετρος περιοχής — το hub της TestingBot είναι παγκόσμιο.
- Υποστηρίζεται η λειτουργία προγράμματος περιήγησης/emulator για κινητά: ορίστε `platform: "android"` ή `"ios"` με ένα όνομα `browser` (π.χ. `"chrome"`) αντί για `app`.