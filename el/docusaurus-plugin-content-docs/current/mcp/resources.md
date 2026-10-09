---
id: resources
title: Πόροι
description: "Διαβάστε την τρέχουσα κατάσταση συνεδρίας, το ιστορικό συνεδριών και τις λεπτομέρειες ρύθμισης παρόχων cloud μέσω των πόρων μόνο για ανάγνωση wdio:// του διακομιστή WebdriverIO MCP."
---

Οι πόροι MCP παρέχουν πρόσβαση μόνο για ανάγνωση στην τρέχουσα κατάσταση της συνεδρίας. Σε αντίθεση με τα εργαλεία, οι πόροι ανακτώνται από το μοντέλο AI κατά βούληση· δεν εκτελούν ενέργειες. Όλοι οι πόροι χρησιμοποιούν το σχήμα URI `wdio://`.

## Πότε να χρησιμοποιείτε πόρους έναντι εργαλείων

- **Πόροι** — περιβαλλοντική κατάσταση που αλλάζει καθώς αλληλεπιδράτε: τρέχοντα στοιχεία, στιγμιότυπο οθόνης, cookies, δέντρο προσβασιμότητας. Διαβάστε τους πριν ενεργήσετε, για να κατανοήσετε τι υπάρχει στην οθόνη.
- **Εργαλεία** — ενέργειες που αλλάζουν την κατάσταση: κλικ, πλοήγηση, ορισμός τιμής.

Προτιμήστε το `wdio://session/current/elements` αντί του `get_screenshot` για τον εντοπισμό στοιχείων· επιστρέφει έτοιμους προς χρήση selectors και κοστίζει πολύ λιγότερα tokens.

## Ιστορικό συνεδριών

### `wdio://sessions`

Ευρετήριο όλων των συνεδριών προγράμματος περιήγησης και εφαρμογών με μεταδεδομένα και πλήθος βημάτων.

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

Αρχείο καταγραφής βημάτων σε JSON για την τρέχουσα ενεργή συνεδρία. Περιέχει όλα τα καταγεγραμμένα βήματα αυτοματοποίησης με ονόματα εργαλείων, παραμέτρους και χρονοσημάνσεις.

---

### `wdio://session/current/code`

Παραγόμενος κώδικας JavaScript για WebdriverIO για την τρέχουσα ενεργή συνεδρία. Δημιουργείται αυτόματα από τα καταγεγραμμένα βήματα. Επικολλήστε τον σε ένα αρχείο δοκιμών WebdriverIO για να αναπαράγετε τη συνεδρία.

---

### `wdio://session/{sessionId}/steps`

Αρχείο καταγραφής βημάτων για μια συγκεκριμένη συνεδρία βάσει ID. Πρότυπο URI — αντικαταστήστε το `{sessionId}` με το ID από το `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

Παραγόμενος κώδικας JavaScript για WebdriverIO για μια συγκεκριμένη συνεδρία βάσει ID. Πρότυπο URI — αντικαταστήστε το `{sessionId}` με το ID από το `wdio://sessions`.

## Τρέχουσα κατάσταση σελίδας (Τρέχουσα συνεδρία)

### `wdio://session/current/elements`

Διαδραστικά στοιχεία στην τρέχουσα σελίδα. Επιστρέφει έτοιμους προς χρήση selectors, κείμενο στοιχείων και πληροφορίες ορατότητας.

**Αυτός είναι ο κύριος πόρος για την κατανόηση του τι υπάρχει στην οθόνη.** Διαβάστε τον πριν κάνετε κλικ ή πληκτρολογήσετε. Είναι πολύ ταχύτερος και φθηνότερος από ένα στιγμιότυπο οθόνης.

Για προηγμένο φιλτράρισμα (μόνο viewport, containers, bounding boxes, σελιδοποίηση), χρησιμοποιήστε αντ' αυτού το εργαλείο `get_elements`.

---

### `wdio://session/current/accessibility`

Δέντρο προσβασιμότητας για την τρέχουσα σελίδα. Από προεπιλογή επιστρέφει όλους τους κόμβους με role, name, selector και χαρακτηριστικά κατάστασης. Μόνο για προγράμματα περιήγησης. Σε κινητές συσκευές, χρησιμοποιήστε το `wdio://session/current/elements`.

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

Για φιλτραρισμένα αποτελέσματα (κατά role, με σελιδοποίηση), χρησιμοποιήστε το εργαλείο `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

Στιγμιότυπο της τρέχουσας σελίδας ή οθόνης ως εικόνα κωδικοποιημένη σε base64. Αλλάζει αυτόματα μέγεθος (μέγιστο 2000px) και συμπιέζεται (μέγιστο 1 MB).

Χρησιμοποιήστε το για οπτική επαλήθευση ή αποσφαλμάτωση της διάταξης. Για τον εντοπισμό στοιχείων, προτιμήστε το `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

Όλα τα cookies για την τρέχουσα συνεδρία προγράμματος περιήγησης.

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

Όλες οι ανοιχτές καρτέλες του προγράμματος περιήγησης στην τρέχουσα συνεδρία. Μόνο για προγράμματα περιήγησης.

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

Χρησιμοποιήστε το πριν από το `switch_tab` για να βρείτε το handle ή τον δείκτη της καρτέλας-στόχου.

---

### `wdio://session/current/contexts`

Διαθέσιμα contexts αυτοματοποίησης (NATIVE_APP, WEBVIEW). Μόνο για κινητές συσκευές.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

Το τρέχον ενεργό context αυτοματοποίησης. Μόνο για κινητές συσκευές.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

Κατάσταση κύκλου ζωής της εφαρμογής για ένα δεδομένο bundle ID. Μόνο για κινητές συσκευές. Πρότυπο URI — αντικαταστήστε το `{bundleId}` με ένα bundle ID του iOS ή ένα όνομα πακέτου του Android.

Επιστρέφει ένα από τα εξής:
- `0` — δεν είναι εγκατεστημένη
- `1` — δεν εκτελείται
- `2` — εκτελείται στο παρασκήνιο (σε αναστολή)
- `3` — εκτελείται στο παρασκήνιο
- `4` — εκτελείται στο προσκήνιο

Για έξοδο με ονομασμένες τιμές, χρησιμοποιήστε αντ' αυτού το εργαλείο `get_app_state`.

---

### `wdio://session/current/geolocation`

Η τρέχουσα παράκαμψη γεωγραφικής θέσης της συσκευής που έχει οριστεί μέσω του `set_geolocation`.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

Αρχεία καταγραφής για την τρέχουσα συνεδρία. Επιστρέφει μηνύματα της κονσόλας του προγράμματος περιήγησης και εξαιρέσεις JavaScript (συνεδρίες Chromium), έξοδο logcat (Android) ή crash/syslog (iOS).

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

Τα ακατέργαστα capabilities που επιστρέφονται από τον διακομιστή WebDriver ή Appium για την τρέχουσα συνεδρία. Χρησιμοποιήστε τα για αποσφαλμάτωση· δείχνουν τις πραγματικές τιμές που αποδέχτηκε ο driver, συμπεριλαμβανομένων των προεπιλογών που εφαρμόζονται από τον πάροχο cloud ή το Appium.

## Πάροχοι cloud

### `wdio://browserstack/local-binary`

URL λήψης ανά πλατφόρμα και οδηγίες ρύθμισης daemon για το εκτελέσιμο BrowserStack Local. Διαβάστε το πριν χρησιμοποιήσετε `tunnel: true` ή `tunnel: "external"` με `provider: "browserstack"`· περιέχει τις ακριβείς εντολές για το λειτουργικό σας σύστημα και την αρχιτεκτονική σας.

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

URL λήψης ανά πλατφόρμα και οδηγίες ρύθμισης daemon για το Sauce Connect Proxy. Διαβάστε το πριν χρησιμοποιήσετε `tunnel: "external"` με `provider: "saucelabs"`· για `tunnel: true` το SDK διαχειρίζεται αυτόματα το Sauce Connect.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

URL λήψης ανά πλατφόρμα και οδηγίες ρύθμισης daemon για το TestMu Tunnel. Απαιτείται μόνο για `tunnel: "external"` με `provider: "testmu"` — για `tunnel: true` το SDK διαχειρίζεται αυτόματα το tunnel μέσω του `@lambdatest/node-tunnel`.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

URL λήψης και οδηγίες ρύθμισης daemon για το TestingBot Tunnel. Το tunnel είναι ένα Java JAR για πολλαπλές πλατφόρμες (απαιτεί Java 11+). Απαιτείται μόνο για `tunnel: "external"` με `provider: "testingbot"` — για `tunnel: true` το SDK διαχειρίζεται αυτόματα το tunnel μέσω του `testingbot-tunnel-launcher`.

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```