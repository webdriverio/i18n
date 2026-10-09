---
id: session-commands
title: Εντολές wdio session
description: Κάθε ενέργεια και σημαία του wdio session, από το open έως το doctor και το skill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

Αυτή η σελίδα περιγράφει κάθε ενέργεια του `wdio session`. Οι καθολικές σημαίες ισχύουν για όλες. Το ίδιο κείμενο εμφανίζεται με την εντολή `npx wdio session <action> --help`. Η υπόλοιπη ενότητα [WebdriverIO Session](/docs/session) καλύπτει τους [στόχους](/docs/session/targets), τα [στιγμιότυπα](/docs/session/snapshots), το [`exec`](/docs/session/exec), την [εξαγωγή](/docs/session/export) και την [αποσφαλμάτωση](/docs/session/debug).

```sh
npx wdio session <action> [arguments] [flags]
```

## Καθολικές σημαίες

| Σημαία | Περιγραφή |
| --- | --- |
| `-s, --session` | Όνομα συνεδρίας (env WDIO_SESSION, προεπιλογή "default") |
| `--json` | Εκτυπώνει ένα αντικείμενο JSON (env WDIO_SESSION_JSON=1) |
| `--timeout` | Χρονικό όριο αιτήματος σε ms (έως 60000, εκτός από το wait) |
| `-q, --quiet` | Σε επιτυχία εκτυπώνει μόνο τα ζητούμενα δεδομένα |
| `--color` | Χρησιμοποιήστε --no-color για να απενεργοποιήσετε τα χρώματα |

Κωδικοί εξόδου:

- 0: επιτυχία
- 1: απέτυχε η ενέργεια ή ο κώδικάς σας
- 2: σφάλμα χρήσης
- 3: λείπει εξάρτηση ή διαπιστευτήρια
- 4: δεν υπάρχει συνεδρία με αυτό το όνομα

## `open`

Ξεκινά μια συνεδρία. Ο στόχος μπορεί να είναι browser, android, ios, macos, windows, electron, tauri, dioxus ή ένα αρχείο ρυθμίσεων wdio.

Η εντολή ξεκινά έναν daemon στο παρασκήνιο. Ο daemon κρατά τη συνεδρία ενεργή μέχρι το `close` ή μέχρι να μείνει αδρανής για χρόνο ίσο με --idle-timeout (προεπιλογή 30m). Οι browsers εκτελούνται headless, εκτός αν δώσετε --headed.

Η εντολή εκτυπώνει:

- το όνομα της συνεδρίας
- τον στόχο
- τον κατάλογο artifacts, όπου αποθηκεύονται τα στιγμιότυπα, τα screenshots και οι εξαγωγές
- το διαδραστικό στιγμιότυπο της σελίδας, όταν ανοίγετε browser σε ένα URL

Επιτρέπεται μία συνεδρία ανά όνομα. Αν ανοίξετε ένα όνομα που ήδη εκτελείται, η εντολή αποτυγχάνει. Χρησιμοποιήστε τη συνεδρία, κλείστε την ή δώστε --replace. Δώστε `-s <name>` μόνο όταν χρειάζεστε δύο συνεδρίες ταυτόχρονα.

```sh
npx wdio session open <target> [url]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | όχι | URL προς άνοιγμα (browsers), διαδρομή εφαρμογής (εφαρμογές desktop) ή capability (config) |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--replace` | Κλείνει πρώτα μια ενεργή συνεδρία με το ίδιο όνομα |
| `--launch-timeout <n>` | Χιλιοστά του δευτερολέπτου αναμονής μέχρι η συνεδρία να είναι έτοιμη |
| `--idle-timeout <value>` | Τερματισμός μετά από τόσο χρόνο χωρίς αιτήματα (π.χ. 30m· το 0 το απενεργοποιεί) |
| `--capabilities <value>` | Επιπλέον capabilities ως JSON ή διαδρομή προς αρχείο JSON |
| `--hostname <value>` | Απομακρυσμένος host WebDriver |
| `--port <n>` | Απομακρυσμένη θύρα WebDriver |
| `--path <value>` | Απομακρυσμένη διαδρομή WebDriver |
| `--protocol <value>` | Απομακρυσμένο πρωτόκολλο WebDriver |
| `--log-level <value>` | Επίπεδο καταγραφής του WebdriverIO που γράφεται στο daemon.log |
| `--bidi` | Ζητά WebDriver BiDi (με --no-bidi απενεργοποιείται) |
| `--headed` | Εμφανίζει το παράθυρο του browser |
| `--headless` | Εκτέλεση χωρίς παράθυρο (η προεπιλογή για browsers· υπερισχύει του --headed) |
| `--snapshot` | Εκτυπώνει το διαδραστικό στιγμιότυπο της σελίδας που άνοιξε (με --no-snapshot παραλείπεται) |
| `--viewport <value>` | Αρχικό viewport, π.χ. 1280x720 |
| `--browser-version <value>` | Έκδοση browser |
| `--binary <value>` | Εκτελέσιμο του browser |
| `--arg <value>` | Επιπλέον όρισμα για τον browser. Μια τιμή που ξεκινά με `-` χρειάζεται `=`, π.χ. `--arg=--disable-gpu` (επαναλαμβανόμενη) |
| `--profile <value>` | Κατάλογος μόνιμου προφίλ |
| `--attach <value>` | Σύνδεση σε Chrome/Edge που ήδη εκτελείται (θύρα αποσφαλμάτωσης ή URL) |
| `--app <value>` | Αρχείο εφαρμογής ή URL εφαρμογής στο cloud |
| `--package <value>` | Package εφαρμογής Android |
| `--activity <value>` | Activity εφαρμογής Android |
| `--bundle-id <value>` | Bundle id iOS/macOS |
| `--browser <value>` | Browser κινητού (chrome, safari) |
| `--device <value>` | Όνομα συσκευής |
| `--platform-version <value>` | Έκδοση πλατφόρμας |
| `--udid <value>` | UDID συσκευής |
| `--reset` | Με --no-reset διατηρείται η κατάσταση της εφαρμογής (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | Αρχικός προσανατολισμός |
| `--appium-url <value>` | Χρήση ενός Appium server που ήδη εκτελείται |
| `--app-arg <value>` | Όρισμα για εφαρμογή desktop. Μια τιμή που ξεκινά με `-` χρειάζεται `=`, π.χ. `--app-arg=--no-sandbox` (επαναλαμβανόμενη) |
| `--chromedriver <value>` | Electron: εκτελέσιμο Chromedriver |
| `--electron-version <value>` | Electron: παράκαμψη της ανίχνευσης έκδοσης |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | Πάροχος cloud |
| `--os <value>` | Cloud: λειτουργικό σύστημα desktop |
| `--os-version <value>` | Cloud: έκδοση λειτουργικού συστήματος desktop |
| `--region <value>` | Cloud: περιοχή Sauce Labs |
| `--tunnel <value>` | Cloud: εκκίνηση του tunnel του παρόχου (ή "external") |
| `--tunnel-name <value>` | Cloud: αναγνωριστικό tunnel |
| `--project <value>` | Cloud: ετικέτα έργου |
| `--build <value>` | Cloud: ετικέτα build |
| `--name <value>` | Cloud: ετικέτα ονόματος συνεδρίας |

**Παραδείγματα**

```sh
# Άνοιγμα headless Chrome σε μια τοπική εφαρμογή
npx wdio session open chrome http://localhost:3000

# Άνοιγμα Firefox με ορατό παράθυρο
npx wdio session open firefox http://localhost:3000 --headed

# Άνοιγμα εφαρμογής Android μέσω Appium
npx wdio session open android --app ./app.apk

# Άνοιγμα εγκατεστημένης εφαρμογής iOS
npx wdio session open ios --bundle-id com.example.shop

# Άνοιγμα εφαρμογής Electron
npx wdio session open electron ./main.js

# Άνοιγμα της πρώτης capability ενός config
npx wdio session open ./wdio.conf.ts 0

# Άνοιγμα Chrome σε cloud grid
npx wdio session open chrome https://example.com --provider browserstack
```

Δείτε επίσης: [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor).

## `close`

Τερματίζει τη συνεδρία και σταματά τον daemon της.

Σε μια συνεδρία που άνοιξε με `wdio run --debug=agent`, η εντολή κάνει το τεστ σε παύση να αποτύχει. Για να συνεχίσει το τεστ, χρησιμοποιήστε το `resume`.

```sh
npx wdio session close
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--all` | Κλείνει όλες τις συνεδρίες |
| `--clean` | Διαγράφει επίσης τον κατάλογο artifacts |

**Παραδείγματα**

```sh
# Κλείσιμο της προεπιλεγμένης συνεδρίας
npx wdio session close

# Κλείσιμο όλων των συνεδριών και διαγραφή των artifacts τους
npx wdio session close --all --clean
```

Δείτε επίσης: [`open`](#open), [`list`](#list).

## `list`

Εμφανίζει τις ενεργές συνεδρίες.

Εκτυπώνει μία γραμμή ανά συνεδρία με το όνομα, τον στόχο, το URL και την ηλικία της. Αφαιρεί επίσης την κατάσταση που άφησαν πίσω τους συνεδρίες που τερματίστηκαν απροσδόκητα.

```sh
npx wdio session list
```

**Παραδείγματα**

```sh
# Εμφάνιση όλων των ενεργών συνεδριών
npx wdio session list
```

Δείτε επίσης: [`info`](#info), [`status`](#status).

## `info`

Εμφανίζει τις λεπτομέρειες της συνεδρίας.

Εκτυπώνει:

- τον στόχο, τον browser και την έκδοσή του
- την υποστήριξη BiDi
- τον κατάλογο artifacts
- για web: το τρέχον URL, τον τίτλο, το μέγεθος παραθύρου και το frame
- για mobile: το context και το activity

```sh
npx wdio session info
```

**Παραδείγματα**

```sh
# Εμφάνιση του πού βρίσκεται η συνεδρία και τι εκτελεί
npx wdio session info
```

Δείτε επίσης: [`list`](#list), [`get`](#get).

## `restart`

Κλείνει και ανοίγει ξανά τη συνεδρία με τον ίδιο στόχο και τις ίδιες σημαίες.

Το καταγεγραμμένο ιστορικό διατηρείται, οπότε το `export` καλύπτει και τα βήματα πριν από την επανεκκίνηση.

```sh
npx wdio session restart
```

**Παραδείγματα**

```sh
# Ξεκίνημα από την αρχή με νέο browser
npx wdio session restart
```

Δείτε επίσης: [`open`](#open), [`close`](#close).

## `status`

Τερματίζει με κωδικό 0 αν η συνεδρία εκτελείται και με 4 αν δεν εκτελείται.

```sh
npx wdio session status
```

**Παραδείγματα**

```sh
# Άνοιγμα συνεδρίας μόνο όταν δεν εκτελείται καμία
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

Δείτε επίσης: [`list`](#list), [`open`](#open).

## `exec`

Εκτελεί κώδικα WebdriverIO από το stdin, από το -e ή από ένα αρχείο.

Ο κώδικας εκτελείται ως async συνάρτηση. Στο scope υπάρχουν τα `browser`, `$`, `$$`, `expect` και `ref('e3')`. Οι μεταβλητές ανώτατου επιπέδου διατηρούνται μεταξύ των κλήσεων. Αν δώσετε κώδικα μέσω stdin στο `wdio session` χωρίς ενέργεια, εκτελείται το `exec`.

Χρησιμοποιείτε πάντα `await` στις εντολές. Το `$` επιστρέφει ακριβώς ένα στοιχείο. Αν ταιριάζουν περισσότερα από ένα, πετά StrictSelectorError.

Όταν αρκεί μία ενέργεια (click, fill, …), προτιμήστε την. Χρησιμοποιήστε το `exec` για βρόχους, συνθήκες και assertions.

```sh
npx wdio session exec [file]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `file` | όχι | Αρχείο script (.js, .ts, .mjs) |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `-e, --eval <value>` | Κώδικας προς εκτέλεση |
| `--history` | Καταγράφει τον κώδικα στο ιστορικό (με --no-history παραλείπεται) |

**Παραδείγματα**

```sh
# Εκτέλεση μιας εντολής μίας γραμμής
npx wdio session exec -e "await browser.getTitle()"

# Assertion στη σελίδα (τα μονά εισαγωγικά κρατούν το shell μακριά από το $)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# Πολλά βήματα μέσω stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# Εκτέλεση αρχείου script
npx wdio session exec ./scripts/login.ts
```

Δείτε επίσης: [`helpers`](#helpers), [`history`](#history), [`export`](#export).

## `helpers`

Εμφανίζει τους helpers του έργου από το .wdio/helpers.

Κάθε αρχείο στο .wdio/helpers κάνει default-export μια συνάρτηση. Η συνάρτηση δέχεται τον browser και καταχωρεί προσαρμοσμένες εντολές με το addCommand. Οι helpers φορτώνονται όταν ανοίγει η συνεδρία. Στο τεστ που εξάγεται γίνονται προσαρμοσμένες εντολές.

```sh
npx wdio session helpers
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--reload` | Εισάγει ξανά τους helpers |

**Παραδείγματα**

```sh
# Εμφάνιση των helpers και των εντολών που προσθέτουν
npx wdio session helpers

# Φόρτωση των αλλαγών σε έναν helper
npx wdio session helpers --reload
```

Δείτε επίσης: [`exec`](#exec), [`export`](#export).

## `snapshot`

Στιγμιότυπο προσβασιμότητας με refs. Ισχύει για web, εγγενές mobile και εγγενές desktop.

Εκτυπώνει το δέντρο προσβασιμότητας, έναν κόμβο ανά γραμμή, π.χ. `button "Add to cart" [ref=e3]`. Μπορείτε να δώσετε ένα ref στα click, fill, get και στις άλλες ενέργειες. Τα refs παραμένουν έγκυρα όσο υπάρχει το στοιχείο. Μια ενέργεια σε στοιχείο που έχει αφαιρεθεί αποτυγχάνει με REF_STALE.

Κάθε στιγμιότυπο γράφεται στον κατάλογο artifacts. Αν η έξοδος ξεπερνά το --max-chars, εκτυπώνεται σε μέρη: πρώτα το πρώτο μέρος και μετά η ένδειξη `--offset <line>` για το επόμενο. Το `find` ψάχνει σε όλο το στιγμιότυπο.

Η μορφή του κειμένου και η δομή του --json είναι πειραματικές και μπορεί να αλλάξουν σε minor έκδοση. Η σύνταξη των refs και οι ενέργειες που δέχονται ref παραμένουν σταθερές.

```sh
npx wdio session snapshot
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--depth <n>` | Μέγιστο βάθος |
| `--scope <value>` | Στιγμιότυπο μόνο κάτω από αυτό το ref ή selector |
| `-i, --interactive` | Μόνο διαδραστικά στοιχεία |
| `--all` | Συμπεριλαμβάνει κρυφά στοιχεία |
| `--boxes` | Προσθέτει τα πλαίσια οριοθέτησης |
| `--viewport` | Μόνο ό,τι βρίσκεται στο viewport (web: δεν ενημερώνει τη βάση σύγκρισης του diff) |
| `--selectors` | Κάθε γραμμή ref τελειώνει με τον καλύτερο selector της |
| `--compact` | Παραλείπει τους ανώνυμους κόμβους χωρίς περιεχόμενο |
| `-u, --urls` | Συμπεριλαμβάνει τα href των συνδέσμων |
| `--file-only` | Γράφει μόνο το αρχείο |
| `--max-chars <n>` | Εκτυπώνει έως τόσους χαρακτήρες κάθε φορά (προεπιλογή 8000) |
| `--offset <n>` | Εκτυπώνει από αυτή τη γραμμή και μετά, για το επόμενο μέρος ενός μεγάλου στιγμιότυπου |

**Παραδείγματα**

```sh
# Μόνο διαδραστικά στοιχεία, η συνηθισμένη πρώτη ματιά
npx wdio session snapshot -i

# Ολόκληρη η σελίδα με τους προορισμούς των συνδέσμων
npx wdio session snapshot --compact --urls

# Μόνο μέρος της σελίδας
npx wdio session snapshot --scope "#checkout" --depth 4

# Τι υπάρχει τώρα στην οθόνη
npx wdio session snapshot --viewport -i

# Κάθε ref με έναν selector για χρήση σε τεστ
npx wdio session snapshot --selectors -i

# Ενέργεια και μετά νέα ματιά
npx wdio session click e3 && npx wdio session snapshot -i
```

Δείτε επίσης: [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot).

## `read`

Διαβάζει το κείμενο της σελίδας ως Markdown. Ισχύει για web.

Περιλαμβάνει επικεφαλίδες, παραγράφους, στοιχεία λίστας, γραμμές πινάκων και συνδέσμους με το URL τους. Αν η σελίδα σημειώνει το κύριο περιεχόμενο (main, article), διαβάζει μόνο αυτό· αλλιώς διαβάζει ολόκληρη τη σελίδα. Η πλοήγηση, τα υποσέλιδα και το κρυφό κείμενο παραλείπονται.

Το κείμενο κόβεται στο --max-chars (προεπιλογή 6000). Στο σημείο της αποκοπής αναφέρεται ποιο --offset διαβάζει το επόμενο μέρος. Με το --scope, η ενότητα κυλίεται ώστε να είναι ορατή.

Χρησιμοποιήστε το για να μάθετε «τι λέει η σελίδα». Για refs πάνω στα οποία θα ενεργήσετε, χρησιμοποιήστε το snapshot ή το find.

```sh
npx wdio session read
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--scope <value>` | Ανάγνωση μόνο κάτω από αυτό το ref ή selector |
| `--max-chars <n>` | Εκτυπώνει έως τόσους χαρακτήρες (προεπιλογή 6000) |
| `--offset <n>` | Ξεκινά από αυτόν τον χαρακτήρα του κειμένου, για το επόμενο μέρος μιας μεγάλης σελίδας |

**Παραδείγματα**

```sh
# Ανάγνωση του κύριου περιεχομένου
npx wdio session read

# Ανάγνωση μίας ενότητας
npx wdio session read --scope e12
```

Δείτε επίσης: [`find`](#find), [`snapshot`](#snapshot), [`get`](#get).

## `find`

Αναζητά κείμενο σε ένα νέο στιγμιότυπο. Ισχύει για web, εγγενές mobile και εγγενές desktop.

Η εντολή:

- Παίρνει νέο στιγμιότυπο.
- Εκτυπώνει κάθε αποτέλεσμα μαζί με τον κόμβο γύρω του, με αριθμούς γραμμών και refs. Για παράδειγμα, εμφανίζεται ολόκληρο το στοιχείο λίστας, ώστε να περιλαμβάνεται και μια τιμή δίπλα στο αποτέλεσμα.
- Κυλίει τη σελίδα ώστε να είναι ορατό το πρώτο αποτέλεσμα.

Η αντιστοίχιση γίνεται σε στάδια: πρώτα αγνοούνται τα πεζά/κεφαλαία, μετά τα κενά ("SO2" βρίσκει "SO 2"), και τέλος αναζητούνται όλες οι λέξεις και παρόμοιές τους. Κείμενο που υπάρχει μόνο σε κρυφά μέρη της σελίδας (κλειστά μενού, καρτέλες, "Show more") αναφέρεται ως κρυφό.

Είναι φθηνότερο από την ανάγνωση ολόκληρου του στιγμιότυπου μιας μεγάλης σελίδας. Με τα -A/-B/-C εκτυπώνονται απλές γραμμές περιβάλλοντος, όπως στο grep.

```sh
npx wdio session find <text>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `text` | ναι | Κείμενο προς αναζήτηση |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--regex` | Το κείμενο αντιμετωπίζεται ως κανονική έκφραση |
| `--scope <value>` | Αναζήτηση μόνο κάτω από αυτό το ref ή selector |
| `-C, --context <n>` | Γραμμές περιβάλλοντος πριν και μετά, αντί για τον γύρω κόμβο |
| `-A, --after-context <n>` | Γραμμές περιβάλλοντος μετά από κάθε αποτέλεσμα |
| `-B, --before-context <n>` | Γραμμές περιβάλλοντος πριν από κάθε αποτέλεσμα |
| `--offset <n>` | Παραλείπει τόσα αποτελέσματα, για τα επόμενα όταν η έξοδος έχει κοπεί |

**Παραδείγματα**

```sh
# Εύρεση του ref ενός κουμπιού
npx wdio session find "Add to cart"

# Εμφάνιση όλων των συνδέσμων
npx wdio session find "^\s*link" --regex --context 0
```

Δείτε επίσης: [`snapshot`](#snapshot), [`wait`](#wait).

## `diff`

Συγκρίνει ένα νέο στιγμιότυπο με το προηγούμενο. Ισχύει για web, εγγενές mobile και εγγενές desktop.

Εκτυπώνει ένα unified diff με όσα άλλαξαν από το τελευταίο στιγμιότυπο ή "No changes". Η πρώτη κλήση αποθηκεύει μια βάση σύγκρισης.

Χρησιμοποιήστε το μετά από μια ενέργεια, για να δείτε τι έκανε χωρίς να ξαναδιαβάσετε όλη τη σελίδα. Στο web, βάση σύγκρισης είναι το τελευταίο στιγμιότυπο που λήφθηκε χωρίς `--viewport`.

```sh
npx wdio session diff
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--baseline <value>` | Αρχείο στιγμιότυπου για σύγκριση |
| `--scope <value>` | Στιγμιότυπο μόνο μέσα σε αυτό το ref ή selector, όπως το `snapshot --scope` |
| `--interactive` | Μόνο διαδραστικά στοιχεία, όπως το `snapshot -i` |

**Παραδείγματα**

```sh
# Τι άλλαξε μετά από ένα click
npx wdio session click e7 && npx wdio session diff

# Σύγκριση με αποθηκευμένο στιγμιότυπο
npx wdio session diff --baseline before.yml
```

Δείτε επίσης: [`snapshot`](#snapshot), [`find`](#find).

## `screenshot`

Αποθηκεύει ένα PNG του viewport, ενός στοιχείου ή ολόκληρης της σελίδας. Ισχύει για web, εγγενές mobile και εγγενές desktop.

Εκτυπώνει τη διαδρομή του αρχείου και το μέγεθος της εικόνας. Πάρτε screenshot όταν σας ενδιαφέρει η διάταξη ή η εμφάνιση. Για κείμενο και κατάσταση, χρησιμοποιήστε τα `snapshot` και `get`.

```sh
npx wdio session screenshot [target]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | όχι | Ref ή selector του στοιχείου προς καταγραφή |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--full` | Ολόκληρη η σελίδα (web) |
| `--path <value>` | Αρχείο εξόδου |

**Παραδείγματα**

```sh
# Καταγραφή του viewport
npx wdio session screenshot

# Καταγραφή ενός στοιχείου
npx wdio session screenshot e5 --path card.png

# Καταγραφή ολόκληρης της σελίδας
npx wdio session screenshot --full
```

Δείτε επίσης: [`visual`](#visual), [`pdf`](#pdf), [`snapshot`](#snapshot).

## `pdf`

Αποθηκεύει την τρέχουσα σελίδα ως PDF. Ισχύει για web.

Καλεί το `browser.savePDF`. Η συμπεριφορά εξαρτάται από τον τύπο της συνεδρίας:

- **BiDi:** εκτυπώνει με το `browsingContext.print`, σε headed ή headless λειτουργία, σε Chrome, Edge και Firefox.
- **Classic:** χρησιμοποιεί το `printPage`. Οι παλαιότερες εκδόσεις του Chrome το υποστηρίζουν μόνο σε headless.

```sh
npx wdio session pdf [file]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `file` | όχι | Αρχείο εξόδου (πρέπει να τελειώνει σε .pdf) |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--path <value>` | Αρχείο εξόδου (πρέπει να τελειώνει σε .pdf) |

**Παραδείγματα**

```sh
# Εγγραφή του report.pdf στον τρέχοντα κατάλογο
npx wdio session pdf report.pdf
```

Δείτε επίσης: [`screenshot`](#screenshot).

## `source`

Αποθηκεύει το HTML της σελίδας ή το XML της εφαρμογής. Ισχύει για web, εγγενές mobile και εγγενές desktop.

Γράφει το αρχείο και εκτυπώνει τη διαδρομή και το μέγεθός του. Χρησιμοποιήστε το όταν ένα στιγμιότυπο κρύβει αυτό που χρειάζεστε, όπως τα attributes για έναν selector.

```sh
npx wdio session source
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--path <value>` | Αρχείο εξόδου |

**Παραδείγματα**

```sh
# Αποθήκευση του HTML στον τρέχοντα κατάλογο
npx wdio session source --path page.html
```

Δείτε επίσης: [`snapshot`](#snapshot), [`get`](#get).

## `get`

Διαβάζει text, html, value, ένα attribute, τον τίτλο, το URL, ένα πλήθος ή ένα πλαίσιο. Ισχύει για web.

Εκτυπώνει την τιμή και μετά τον κώδικα WebdriverIO που εκτέλεσε (`→ …`). Με το -q εκτυπώνεται μόνο η τιμή, π.χ. για να την αποθηκεύσετε σε μια μεταβλητή του shell. Διαβάστε μια τιμή πριν γράψετε assertion γι' αυτήν.

```sh
npx wdio session get <sub> [target] [name]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | όχι | Ref ή selector (δεν χρησιμοποιείται για title και url) |
| `name` | όχι | Όνομα attribute (μόνο για attr) |

**Παραδείγματα**

```sh
# Κείμενο ενός ref
npx wdio session get text e1

# Τρέχον URL
npx wdio session get url

# Μόνο η τιμή, για μεταβλητή του shell
url=$(npx wdio session get url -q)

# Το href ενός συνδέσμου
npx wdio session get attr e3 href

# Πόσα στοιχεία ταιριάζουν
npx wdio session get count "aria/Remove"
```

Δείτε επίσης: [`is`](#is), [`wait`](#wait), [`exec`](#exec).

## `is`

Ελέγχει αν ένα στοιχείο είναι ορατό, ενεργό ή επιλεγμένο. Ισχύει για web.

Εκτυπώνει true ή false και μετά τον κώδικα WebdriverIO που εκτέλεσε. Με το -q εκτυπώνεται μόνο η τιμή. Ο κωδικός εξόδου είναι 0 και στις δύο περιπτώσεις.

```sh
npx wdio session is <sub> <target>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | visible \| enabled \| checked |
| `target` | ναι | Ref ή selector |

**Παραδείγματα**

```sh
# Εκτύπωση true ή false
npx wdio session is visible e1

# Έλεγχος ενός κουμπιού με βάση την ετικέτα του
npx wdio session is enabled "aria/Place order"
```

Δείτε επίσης: [`get`](#get), [`wait`](#wait).

## `logs`

Εκτυπώνει τα logs από την τελευταία κλήση: console, σφάλματα σελίδας, δίκτυο και συσκευή. Ισχύει για web και εγγενές mobile.

Κάθε κλήση μετακινεί έναν δείκτη ανάγνωσης, οπότε η επόμενη κλήση δείχνει μόνο τις νέες εγγραφές. Εκτελέστε το μετά από μια ενέργεια, για να δείτε τα σφάλματα που προκάλεσε.

```sh
npx wdio session logs
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--errors` | Μόνο σφάλματα |
| `--network` | Μόνο εγγραφές δικτύου |
| `--since <value>` | Μόνο εγγραφές νεότερες από αυτή τη διάρκεια (π.χ. 30s) |
| `--peek` | Δεν μετακινεί τον δείκτη ανάγνωσης |
| `--source <browser\|driver\|logcat\|syslog\|main>` | Πηγή των logs |

**Παραδείγματα**

```sh
# Σφάλματα που προκάλεσε ένα click
npx wdio session click e4 && npx wdio session logs --errors

# Πρόσφατες εγγραφές, που κρατιούνται για την επόμενη κλήση
npx wdio session logs --since 30s --peek
```

Δείτε επίσης: [`requests`](#requests).

## `navigate`

Ανοίγει ένα URL. Ισχύει για web.

Δέχεται τιμές όπως `example.com`, πλήρη URLs και διαδρομές σχετικές με το baseUrl. Πρώτα βγαίνει από οποιοδήποτε frame. Εκτυπώνει το νέο URL και τον τίτλο.

```sh
npx wdio session navigate <url>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `url` | ναι | URL (τα σχετικά URLs χρησιμοποιούν το baseUrl) |

**Παραδείγματα**

```sh
# Μετάβαση σε μια σελίδα και ματιά σε αυτήν
npx wdio session navigate /cart && npx wdio session snapshot -i

# Άνοιγμα άλλου ιστότοπου
npx wdio session navigate example.com
```

Δείτε επίσης: [`back`](#back), [`reload`](#reload), [`wait`](#wait).

## `back`

Πηγαίνει πίσω. Ισχύει για web.

```sh
npx wdio session back
```

**Παραδείγματα**

```sh
# Μία σελίδα πίσω
npx wdio session back
```

Δείτε επίσης: [`forward`](#forward), [`navigate`](#navigate).

## `forward`

Πηγαίνει μπροστά. Ισχύει για web.

```sh
npx wdio session forward
```

**Παραδείγματα**

```sh
# Μία σελίδα μπροστά
npx wdio session forward
```

Δείτε επίσης: [`back`](#back), [`navigate`](#navigate).

## `reload`

Επαναφορτώνει τη σελίδα. Ισχύει για web.

```sh
npx wdio session reload
```

**Παραδείγματα**

```sh
# Επαναφόρτωση και αναμονή μέχρι να ηρεμήσει το δίκτυο
npx wdio session reload && npx wdio session wait --load networkidle
```

Δείτε επίσης: [`navigate`](#navigate), [`wait`](#wait).

## `wait`

Περιμένει ένα στοιχείο, κείμενο, ένα URL, μια κατάσταση φόρτωσης, μια συνθήκη ή μερικά χιλιοστά του δευτερολέπτου. Ισχύει για web.

Δώστε ακριβώς ένα από τα εξής: ένα ref ή selector, --text, --url, --load, --fn ή χιλιοστά του δευτερολέπτου. Αν περάσει το --limit, η εντολή αποτυγχάνει με κωδικό εξόδου 1.

Προτιμήστε μια συνθήκη αντί για παύση, τόσο εδώ όσο και αντί για `sleep` σε μια αλυσίδα εντολών. Παύσεις μεγαλύτερες από 30 δευτερόλεπτα απορρίπτονται.

```sh
npx wdio session wait [target]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | όχι | Ref, selector ή χιλιοστά του δευτερολέπτου |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--text <value>` | Αναμονή μέχρι η σελίδα να περιέχει αυτό το κείμενο |
| `--url <value>` | Αναμονή μέχρι να ταιριάξει το URL (υποσυμβολοσειρά ή globs με * και **) |
| `--load <value>` | domcontentloaded, load ή networkidle |
| `--fn <value>` | Αναμονή μέχρι αυτή η έκφραση JavaScript να γίνει αληθής |
| `--state <value>` | Μαζί με στόχο: visible (προεπιλογή), hidden, enabled ή disabled |
| `--limit <n>` | Χιλιοστά του δευτερολέπτου αναμονής (προεπιλογή 10000) |

**Παραδείγματα**

```sh
# Αναμονή μέχρι να γίνει ορατό ένα ref
npx wdio session wait e1

# Αναμονή μέχρι να εξαφανιστεί ένα spinner
npx wdio session wait "aria/Loading" --state hidden

# Ενέργεια, αναμονή για το αποτέλεσμα, νέα ματιά
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# Αναμονή για ένα URL
npx wdio session wait --url "**/dashboard"

# Αναμονή μέχρι να μην εκκρεμεί κανένα αίτημα
npx wdio session wait --load networkidle

# Παύση 500ms
npx wdio session wait 500
```

Δείτε επίσης: [`find`](#find), [`is`](#is), [`get`](#get).

## `click`

Κάνει κλικ σε ένα στοιχείο. Ισχύει για web, εγγενές mobile και εγγενές desktop.

Εκτυπώνει πού έγινε το κλικ. Αν το κλικ οδήγησε σε πλοήγηση, εκτυπώνει και το νέο URL. Πάρτε νέο στιγμιότυπο πριν χρησιμοποιήσετε refs στην επόμενη σελίδα.

Αν το στοιχείο είναι κρυφό ή καλύπτεται, η εντολή αποτυγχάνει αμέσως και αναφέρει τι εμποδίζει. Με `x,y` γίνεται κλικ σε ένα σημείο του viewport (pixels από πάνω αριστερά, όπως σε ένα screenshot). Αυτό χρησιμεύει για ό,τι δεν έχει ref, όπως ένα canvas ή ένας χάρτης.

```sh
npx wdio session click <target>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12), selector του WebdriverIO ή συντεταγμένες viewport x,y |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--double` | Διπλό κλικ |
| `--right` | Δεξί κλικ |
| `--new-tab` | Ανοίγει τον σύνδεσμο σε νέα καρτέλα και μεταβαίνει σε αυτήν |

**Παραδείγματα**

```sh
# Κλικ σε ένα ref από το τελευταίο στιγμιότυπο
npx wdio session click e3

# Κλικ με βάση το προσβάσιμο όνομα
npx wdio session click "aria/Add to cart"

# Κλικ, αναμονή, νέα ματιά
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# Άνοιγμα συνδέσμου σε νέα καρτέλα
npx wdio session click e8 --new-tab

# Κλικ σε ένα σημείο του viewport, π.χ. πάνω σε χάρτη
npx wdio session click 320,480
```

Δείτε επίσης: [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot).

## `tap`

Πατά ένα στοιχείο (mobile). Ισχύει για εγγενές mobile.

```sh
npx wdio session tap <target>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12) ή selector του WebdriverIO |

**Παραδείγματα**

```sh
# Πάτημα σε ένα ref από το τελευταίο στιγμιότυπο
npx wdio session tap e2
```

Δείτε επίσης: [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe).

## `fill`

Αντικαθιστά την τιμή ενός πεδίου εισαγωγής. Ισχύει για web, εγγενές mobile και εγγενές desktop.

Πρώτα καθαρίζει το πεδίο. Για πληκτρολόγηση στο στοιχείο που έχει την εστίαση, χρησιμοποιήστε το `type`. Για πλήκτρα όπως το Enter, χρησιμοποιήστε το `press`.

```sh
npx wdio session fill <target> <text..>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12) ή selector του WebdriverIO |
| `text` | ναι | Κείμενο (οι λέξεις μετά τον στόχο ενώνονται με κενά) |

**Παραδείγματα**

```sh
# Συμπλήρωση ενός πεδίου
npx wdio session fill e2 ada@example.com

# Συμπλήρωση και υποβολή μιας φόρμας
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

Δείτε επίσης: [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check).

## `type`

Πληκτρολογεί σε ένα στοιχείο ή στο στοιχείο που έχει την εστίαση. Ισχύει για web, εγγενές mobile και εγγενές desktop.

Στέλνει το κείμενο ως πατήματα πλήκτρων, χωρίς να καθαρίσει τίποτα. Το `type e2 Ada` πληκτρολογεί στο e2, ενώ το `type Ada` στο στοιχείο που έχει την εστίαση. Για αντικατάσταση μιας τιμής, χρησιμοποιήστε το `fill`.

```sh
npx wdio session type <text..>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `text` | ναι | Κείμενο (οι λέξεις ενώνονται με κενά). Αν ξεκινά με ref, π.χ. `type e2 Ada`, πληκτρολογεί σε εκείνο το στοιχείο αντί για αυτό που έχει την εστίαση |

**Παραδείγματα**

```sh
# Πληκτρολόγηση σε ένα πεδίο
npx wdio session type e5 hello

# Πληκτρολόγηση στο στοιχείο που έχει την εστίαση
npx wdio session focus e5 && npx wdio session type "hello"
```

Δείτε επίσης: [`fill`](#fill), [`press`](#press), [`focus`](#focus).

## `press`

Πατά πλήκτρα, π.χ. Enter ή Control+a. Ισχύει για web και εγγενές desktop.

Συνδυάστε πλήκτρα με +. Τα ονόματα δεν κάνουν διάκριση πεζών/κεφαλαίων. Γίνονται δεκτές οι σύντομες μορφές ctrl, cmd, esc, up, down, left και right.

```sh
npx wdio session press <keys>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `keys` | ναι | Συνδυασμός πλήκτρων |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--times <n>` | Πατά το πλήκτρο τόσες φορές (έως 100), π.χ. για να μετακινήσετε ένα slider |

**Παραδείγματα**

```sh
# Υποβολή φόρμας
npx wdio session press Enter

# Μετακίνηση ενός εστιασμένου slider κατά πέντε βήματα
npx wdio session press ArrowRight --times 5

# Επιλογή όλων
npx wdio session press Control+a

# Μετακίνηση της εστίασης προς τα πίσω
npx wdio session press Shift+Tab
```

Δείτε επίσης: [`type`](#type), [`fill`](#fill).

## `select`

Επιλέγει μια επιλογή ενός `<select>`. Ισχύει για web.

```sh
npx wdio session select <target> <value>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12) ή selector του WebdriverIO |
| `value` | ναι | Κείμενο, τιμή ή δείκτης της επιλογής |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--by <text\|value\|index>` | Τρόπος αντιστοίχισης της επιλογής (προεπιλογή text) |

**Παραδείγματα**

```sh
# Επιλογή με βάση το ορατό κείμενο
npx wdio session select e6 Germany

# Επιλογή με βάση την τιμή
npx wdio session select e6 de --by value
```

Δείτε επίσης: [`fill`](#fill), [`check`](#check).

## `upload`

Ορίζει ένα αρχείο σε πεδίο εισαγωγής αρχείου. Ισχύει για web.

Η διαδρομή είναι σχετική με τον κατάλογο εργασίας σας. Στοχεύστε το ίδιο το `<input type="file">`, όχι το κουμπί που ανοίγει τον επιλογέα αρχείων.

```sh
npx wdio session upload <target> <file>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12) ή selector του WebdriverIO |
| `file` | ναι | Αρχείο προς μεταφόρτωση |

**Παραδείγματα**

```sh
# Επισύναψη αρχείου
npx wdio session upload e9 ./fixtures/avatar.png
```

Δείτε επίσης: [`fill`](#fill).

## `hover`

Μετακινεί τον δείκτη πάνω από ένα στοιχείο. Ισχύει για web και εγγενές desktop.

```sh
npx wdio session hover <target>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12) ή selector του WebdriverIO |

**Παραδείγματα**

```sh
# Άνοιγμα ενός μενού hover και ματιά σε αυτό
npx wdio session hover e4 && npx wdio session snapshot -i
```

Δείτε επίσης: [`click`](#click).

## `focus`

Εστιάζει σε ένα στοιχείο. Ισχύει για web.

```sh
npx wdio session focus <target>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12) ή selector του WebdriverIO |

**Παραδείγματα**

```sh
# Εστίαση σε ένα πεδίο πριν από το `type`
npx wdio session focus e5
```

Δείτε επίσης: [`type`](#type), [`press`](#press).

## `check`

Επιλέγει ένα checkbox ή radio. Ισχύει για web.

Δεν κάνει τίποτα αν το στοιχείο είναι ήδη επιλεγμένο. Αποτυγχάνει αν το στοιχείο δεν καταλήξει επιλεγμένο.

```sh
npx wdio session check <target>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12) ή selector του WebdriverIO |

**Παραδείγματα**

```sh
# Αποδοχή των όρων
npx wdio session check e7
```

Δείτε επίσης: [`uncheck`](#uncheck), [`is`](#is).

## `uncheck`

Αποεπιλέγει ένα checkbox. Ισχύει για web.

Δεν κάνει τίποτα αν το στοιχείο είναι ήδη αποεπιλεγμένο. Ένα επιλεγμένο radio button δεν μπορεί να αποεπιλεγεί.

```sh
npx wdio session uncheck <target>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12) ή selector του WebdriverIO |

**Παραδείγματα**

```sh
# Απεγγραφή από το newsletter
npx wdio session uncheck e7
```

Δείτε επίσης: [`check`](#check), [`is`](#is).

## `drag`

Σύρει ένα στοιχείο πάνω σε ένα άλλο. Ισχύει για web, εγγενές mobile και εγγενές desktop.

```sh
npx wdio session drag <from> <to>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `from` | ναι | Ref ή selector του στοιχείου που σύρεται |
| `to` | ναι | Ref ή selector του σημείου απόθεσης |

**Παραδείγματα**

```sh
# Μετακίνηση μιας κάρτας σε άλλη στήλη
npx wdio session drag e3 e9
```

Δείτε επίσης: [`scroll`](#scroll).

## `scroll`

Κυλίει τη σελίδα ή φέρνει ένα στοιχείο σε ορατό σημείο. Ισχύει για web.

Χωρίς στόχο, κυλίει προς τα κάτω κατά 600px. Το περιεχόμενο που φορτώνεται καθυστερημένα (lazy-loaded) εμφανίζεται στο επόμενο στιγμιότυπο.

```sh
npx wdio session scroll [target]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | όχι | Ref, selector, up, down, top ή bottom |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--px <n>` | Pixels για up/down (προεπιλογή 600) |

**Παραδείγματα**

```sh
# Εμφάνιση ενός στοιχείου
npx wdio session scroll e40

# Φόρτωση περισσότερων αποτελεσμάτων και ματιά σε αυτά
npx wdio session scroll bottom && npx wdio session snapshot -i

# Κύλιση κατά δύο οθόνες
npx wdio session scroll down --px 1200
```

Δείτε επίσης: [`swipe`](#swipe), [`snapshot`](#snapshot).

## `swipe`

Σύρει το δάχτυλο στην οθόνη (mobile). Ισχύει για εγγενές mobile.

```sh
npx wdio session swipe <direction>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `direction` | ναι | up \| down \| left \| right |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--percent <n>` | Μήκος της κίνησης, 0..1 |

**Παραδείγματα**

```sh
# Κύλιση μιας λίστας και ματιά σε αυτήν
npx wdio session swipe up && npx wdio session snapshot
```

Δείτε επίσης: [`scroll`](#scroll), [`tap`](#tap).

## `long-press`

Παρατεταμένο πάτημα σε ένα στοιχείο (mobile). Ισχύει για εγγενές mobile.

```sh
npx wdio session long-press <target>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref (e12) ή selector του WebdriverIO |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--duration <n>` | Χιλιοστά του δευτερολέπτου |

**Παραδείγματα**

```sh
# Άνοιγμα μενού περιβάλλοντος
npx wdio session long-press e4 --duration 1500
```

Δείτε επίσης: [`tap`](#tap).

## `tabs`

Εμφανίζει, ανοίγει, εναλλάσσει ή κλείνει καρτέλες. Ισχύει για web.

Χωρίς υποεντολή, εμφανίζει τις καρτέλες με τον δείκτη τους και σημειώνει την τρέχουσα. Το `new` ανοίγει μια καρτέλα και μεταβαίνει σε αυτήν. Τα `switch` και `close` δέχονται δείκτη ή handle.

```sh
npx wdio session tabs [sub] [arg]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | όχι | switch \| new \| close |
| `arg` | όχι | Δείκτης, handle ή URL |

**Παραδείγματα**

```sh
# Εμφάνιση καρτελών
npx wdio session tabs

# Άνοιγμα καρτέλας
npx wdio session tabs new http://localhost:3000/help

# Επιστροφή στην πρώτη καρτέλα
npx wdio session tabs switch 0

# Κλείσιμο της δεύτερης καρτέλας
npx wdio session tabs close 1
```

Δείτε επίσης: [`windows`](#windows), [`frame`](#frame).

## `windows`

Εμφανίζει ή εναλλάσσει παράθυρα. Ισχύει για web και εγγενές desktop.

```sh
npx wdio session windows [sub] [arg]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | όχι | switch |
| `arg` | όχι | Δείκτης ή handle |

**Παραδείγματα**

```sh
# Εμφάνιση παραθύρων
npx wdio session windows

# Μετάβαση στο δεύτερο παράθυρο
npx wdio session windows switch 1
```

Δείτε επίσης: [`tabs`](#tabs).

## `frame`

Μεταβαίνει σε ένα iframe, στο γονικό ή στο ανώτατο έγγραφο. Ισχύει για web.

Το στιγμιότυπο της σελίδας δείχνει ήδη το περιεχόμενο των iframes της, με refs που οι ενέργειες χρησιμοποιούν απευθείας. Επομένως το `frame` χρειάζεται μόνο σε δύο περιπτώσεις:

- όταν θέλετε να δουλέψετε για λίγο μέσα σε ένα frame
- όταν θέλετε να δείτε ένα frame που το στιγμιότυπο έκοψε

Τα στιγμιότυπα και οι ενέργειες εφαρμόζονται στο τρέχον frame μέχρι να επιστρέψετε. Το `navigate` επιστρέφει στο ανώτατο έγγραφο.

```sh
npx wdio session frame <target>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | ναι | Ref, selector, parent ή top |

**Παραδείγματα**

```sh
# Είσοδος σε iframe και ματιά στο εσωτερικό του
npx wdio session frame e12 && npx wdio session snapshot -i

# Επιστροφή στη σελίδα
npx wdio session frame top
```

Δείτε επίσης: [`tabs`](#tabs), [`snapshot`](#snapshot).

## `contexts`

Εμφανίζει ή εναλλάσσει contexts native/webview. Ισχύει για εγγενές mobile.

```sh
npx wdio session contexts [sub] [name]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | όχι | switch |
| `name` | όχι | Όνομα context |

**Παραδείγματα**

```sh
# Εμφάνιση των contexts NATIVE_APP και WEBVIEW
npx wdio session contexts

# Έλεγχος του webview
npx wdio session contexts switch WEBVIEW_com.example.shop
```

Δείτε επίσης: [`snapshot`](#snapshot).

## `dialog`

Αποδέχεται, απορρίπτει ή αναφέρει ένα ανοιχτό παράθυρο διαλόγου. Ισχύει για web και εγγενές mobile.

Ένα ανοιχτό alert, confirm ή prompt μπλοκάρει τις άλλες ενέργειες. Αυτές αποτυγχάνουν με υπόδειξη να εκτελέσετε αυτή την εντολή.

```sh
npx wdio session dialog <sub>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | accept \| dismiss \| status |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--text <value>` | Κείμενο για το prompt (μόνο με accept) |

**Παραδείγματα**

```sh
# Εμφάνιση του ανοιχτού παραθύρου διαλόγου
npx wdio session dialog status

# Επιβεβαίωση
npx wdio session dialog accept

# Απάντηση σε prompt
npx wdio session dialog accept --text "Ada"
```

Δείτε επίσης: [`click`](#click).

## `app`

Εκκινεί, τερματίζει, εγκαθιστά ή ελέγχει την κατάσταση μιας εφαρμογής. Ισχύει για εγγενές mobile και εγγενές desktop.

```sh
npx wdio session app <sub> <id>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | launch \| terminate \| install \| state |
| `id` | ναι | App id, bundle id ή αρχείο |

**Παραδείγματα**

```sh
# Επανεκκίνηση της εφαρμογής
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# Εκτελείται;
npx wdio session app state com.example.shop
```

Δείτε επίσης: [`deeplink`](#deeplink), [`background`](#background).

## `deeplink`

Ανοίγει ένα deep link. Ισχύει για εγγενές mobile.

```sh
npx wdio session deeplink <url>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `url` | ναι | URL |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--package <value>` | Package Android ή bundle id iOS |

**Παραδείγματα**

```sh
# Άνοιγμα οθόνης προϊόντος
npx wdio session deeplink shop://product/42 --package com.example.shop
```

Δείτε επίσης: [`app`](#app).

## `rotate`

Περιστρέφει τη συσκευή. Ισχύει για εγγενές mobile.

```sh
npx wdio session rotate <orientation>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `orientation` | ναι | portrait \| landscape |

**Παραδείγματα**

```sh
# Περιστροφή της συσκευής στο πλάι
npx wdio session rotate landscape
```

## `keyboard`

Κρύβει το πληκτρολόγιο της οθόνης. Ισχύει για εγγενές mobile.

```sh
npx wdio session keyboard <sub>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | hide |

**Παραδείγματα**

```sh
# Αποκάλυψη των στοιχείων κάτω από το πληκτρολόγιο
npx wdio session keyboard hide
```

## `background`

Στέλνει την εφαρμογή στο παρασκήνιο. Ισχύει για εγγενές mobile.

```sh
npx wdio session background <seconds>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `seconds` | ναι | Δευτερόλεπτα (με -1 παραμένει στο παρασκήνιο) |

**Παραδείγματα**

```sh
# Η εφαρμογή στο παρασκήνιο για 3 δευτερόλεπτα
npx wdio session background 3
```

Δείτε επίσης: [`app`](#app).

## `lock`

Κλειδώνει τη συσκευή. Ισχύει για εγγενές mobile.

```sh
npx wdio session lock
```

**Παραδείγματα**

```sh
# Κλείδωμα της οθόνης
npx wdio session lock
```

Δείτε επίσης: [`unlock`](#unlock).

## `unlock`

Ξεκλειδώνει τη συσκευή. Ισχύει για εγγενές mobile.

```sh
npx wdio session unlock
```

**Παραδείγματα**

```sh
# Ξεκλείδωμα της οθόνης
npx wdio session unlock
```

Δείτε επίσης: [`lock`](#lock).

## `geolocation`

Ορίζει τη γεωγραφική θέση. Ισχύει για web και εγγενές mobile.

```sh
npx wdio session geolocation <lat> <lon>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `lat` | ναι | Γεωγραφικό πλάτος |
| `lon` | ναι | Γεωγραφικό μήκος |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--accuracy <n>` | Ακρίβεια σε μέτρα |

**Παραδείγματα**

```sh
# Προσποίηση ότι βρίσκεστε στο Βερολίνο
npx wdio session geolocation 52.52 13.405
```

Δείτε επίσης: [`emulate`](#emulate).

## `emulate`

Προσομοιώνει συσκευή, viewport, δίκτυο, cpu, ρολόι ή ένα πεδίο προσομοίωσης BiDi. Ισχύει για web.

Μια προσομοίωση παραμένει μέχρι το `emulate reset` ή μέχρι να τελειώσει η συνεδρία. Αν ορίσετε ξανά το ίδιο είδος, η νέα τιμή αντικαθιστά την προηγούμενη. Το `emulate device` χωρίς τιμή εμφανίζει τα ονόματα των συσκευών. Τα presets δικτύου και ο περιορισμός cpu απαιτούν browser Chromium.

```sh
npx wdio session emulate <sub> [value]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | όχι | Τιμή για την προσομοίωση |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--dpr <n>` | Αναλογία pixel συσκευής (viewport) |
| `--tick <n>` | Προωθεί το προσομοιωμένο ρολόι κατά ms (clock) |

**Παραδείγματα**

```sh
# Προσομοίωση κινητού τηλεφώνου
npx wdio session emulate device "iPhone 15"

# Ορισμός viewport
npx wdio session emulate viewport 375x812 --dpr 3

# Εκτός σύνδεσης
npx wdio session emulate network offline

# Σκοτεινή λειτουργία
npx wdio session emulate color-scheme dark

# Πάγωμα της ημερομηνίας
npx wdio session emulate clock 2030-01-01T00:00:00Z

# Μείωση της κίνησης
npx wdio session emulate media prefersReducedMotion=reduce

# Αναίρεση όλων των προσομοιώσεων
npx wdio session emulate reset
```

Δείτε επίσης: [`geolocation`](#geolocation), [`screenshot`](#screenshot).

## `requests`

Εμφανίζει τα αιτήματα δικτύου που καταγράφηκαν (BiDi). Ισχύει για web.

```sh
npx wdio session requests
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--filter <value>` | Υποσυμβολοσειρά ή glob |
| `--failed` | Μόνο αιτήματα που απέτυχαν |
| `--since <value>` | Μόνο αιτήματα νεότερα από αυτή τη διάρκεια |
| `--limit <n>` | Μέγιστος αριθμός γραμμών (προεπιλογή 50) |

**Παραδείγματα**

```sh
# Μόνο κλήσεις API
npx wdio session requests --filter "**/api/**"

# Αιτήματα που χάλασε ένα click
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

Δείτε επίσης: [`mock`](#mock), [`logs`](#logs).

## `mock`

Δημιουργεί mock αποκρίσεις για ένα μοτίβο URL (BiDi). Ισχύει για web.

Εκτυπώνει το id του mock (m1, m2, …). Ένα νέο mock για το ίδιο μοτίβο αντικαθιστά το προηγούμενο.

```sh
npx wdio session mock <pattern>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `pattern` | ναι | Μοτίβο URL |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--status <n>` | Κωδικός κατάστασης |
| `--body <value>` | Σώμα ως JSON/κείμενο ή διαδρομή αρχείου |
| `--header <value>` | Κεφαλίδα k:v (επαναλαμβανόμενη) |
| `--abort` | Ακυρώνει τα αιτήματα που ταιριάζουν |
| `--method <value>` | Μόνο αυτή η μέθοδος |
| `--once` | Μόνο το επόμενο αίτημα |

**Παραδείγματα**

```sh
# Επιστροφή σταθερού JSON
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# Αποτυχία του επόμενου αιτήματος
npx wdio session mock "**/api/cart" --status 500 --once

# Αποκλεισμός εικόνων
npx wdio session mock "**/*.png" --abort
```

Δείτε επίσης: [`unmock`](#unmock), [`requests`](#requests).

## `unmock`

Αφαιρεί mocks. Ισχύει για web.

```sh
npx wdio session unmock [pattern]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `pattern` | όχι | Μοτίβο ή id του mock |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--all` | Αφαιρεί όλα τα mocks |

**Παραδείγματα**

```sh
# Αφαίρεση ενός mock
npx wdio session unmock m1

# Αφαίρεση όλων των mocks
npx wdio session unmock --all
```

Δείτε επίσης: [`mock`](#mock).

## `cookies`

Διαβάζει, ορίζει ή διαγράφει cookies. Ισχύει για web.

Χωρίς υποεντολή, εκτυπώνει κάθε cookie ως name=value. Το `clear` χωρίς όνομα διαγράφει όλα τα cookies.

```sh
npx wdio session cookies [sub] [name] [value]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | όχι | get \| set \| clear |
| `name` | όχι | Όνομα cookie |
| `value` | όχι | Τιμή cookie |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--domain <value>` | Domain του cookie (set) |
| `--path <value>` | Διαδρομή του cookie (set) |
| `--http-only` | Cookie HttpOnly (set) |
| `--secure` | Cookie Secure (set) |
| `--same-site <value>` | lax, strict, none ή default (set) |
| `--expiry <n>` | Λήξη ως Unix timestamp σε δευτερόλεπτα (set) |

**Παραδείγματα**

```sh
# Εμφάνιση cookies
npx wdio session cookies

# Τιμή ενός cookie
npx wdio session cookies get session

# Ορισμός cookie και επαναφόρτωση
npx wdio session cookies set session abc && npx wdio session reload

# Διαγραφή όλων των cookies
npx wdio session cookies clear
```

Δείτε επίσης: [`storage`](#storage), [`state`](#state).

## `storage`

Διαβάζει, ορίζει ή καθαρίζει το localStorage (ή το sessionStorage). Ισχύει για web.

Χωρίς υποεντολή, εκτυπώνει όλες τις εγγραφές. Το `clear` χωρίς κλειδί αδειάζει τον χώρο αποθήκευσης.

```sh
npx wdio session storage [sub] [key] [value]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | όχι | get \| set \| clear |
| `key` | όχι | Κλειδί |
| `value` | όχι | Τιμή |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--session-storage` | Χρήση του sessionStorage |

**Παραδείγματα**

```sh
# Εμφάνιση του localStorage
npx wdio session storage

# Ορισμός κλειδιού
npx wdio session storage set token abc

# Άδειασμα του sessionStorage
npx wdio session storage clear --session-storage
```

Δείτε επίσης: [`cookies`](#cookies), [`state`](#state).

## `state`

Αποθηκεύει ή φορτώνει cookies και storage. Ισχύει για web.

- **`save`:** γράφει σε αρχείο JSON τα cookies, το localStorage και το sessionStorage του τρέχοντος origin.
- **`load`:** ανοίγει εκείνο το origin και τα επαναφέρει, π.χ. για να παρακάμψετε τη σύνδεση.

```sh
npx wdio session state <sub> <file>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | save \| load |
| `file` | ναι | Αρχείο κατάστασης |

**Παραδείγματα**

```sh
# Αποθήκευση κατάστασης με συνδεδεμένο χρήστη
npx wdio session state save .wdio/logged-in.json

# Εκκίνηση ως συνδεδεμένος χρήστης
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

Δείτε επίσης: [`cookies`](#cookies), [`storage`](#storage).

## `visual`

Οπτικά στιγμιότυπα μέσω του @wdio/visual-service. Ισχύει για web, εγγενές mobile και εγγενές desktop.

- **`save`:** αποθηκεύει μια εικόνα αναφοράς στο .wdio/visual/baseline.
- **`check`:** συγκρίνει με την εικόνα αναφοράς και εκτυπώνει την απόκλιση.
- **`accept`:** κάνει την τελευταία πραγματική εικόνα νέα εικόνα αναφοράς.
- **`list`:** εμφανίζει τα tags.

Απαιτεί το @wdio/visual-service στο έργο.

```sh
npx wdio session visual <sub> [tag]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | save \| check \| accept \| list |
| `tag` | όχι | Tag της εικόνας |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--element <value>` | Μόνο αυτό το στοιχείο |
| `--full` | Ολόκληρη η σελίδα |
| `--tabbable` | Σελίδα με τα στοιχεία που δέχονται εστίαση με Tab |
| `--threshold <n>` | Επιτρεπόμενη απόκλιση σε ποσοστό (προεπιλογή 0) |
| `--all` | accept: όλα τα tags |

**Παραδείγματα**

```sh
# Αποθήκευση εικόνας αναφοράς
npx wdio session visual save cart

# Σύγκριση με αυτήν
npx wdio session visual check cart --threshold 0.5

# Αποδοχή μιας σκόπιμης αλλαγής
npx wdio session visual accept cart
```

Δείτε επίσης: [`screenshot`](#screenshot).

## `trace`

Καταγράφει κάθε βήμα με screenshots και στιγμιότυπα.

Το `stop` εκτυπώνει τον κατάλογο του trace και ένα αντίγραφο των βημάτων.

```sh
npx wdio session trace <sub>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | start \| stop |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--screenshots` | Screenshot μετά από κάθε βήμα (με --no-screenshots παραλείπεται) |
| `--snapshots` | Στιγμιότυπο μετά από κάθε βήμα (με --no-snapshots παραλείπεται) |

**Παραδείγματα**

```sh
# Έναρξη tracing
npx wdio session trace start

# Διακοπή και εκτύπωση του αντιγράφου
npx wdio session trace stop
```

Δείτε επίσης: [`record`](#record), [`history`](#history).

## `record`

Καταγράφει βίντεο. Ισχύει για web και εγγενές mobile.

```sh
npx wdio session record <sub>
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `sub` | ναι | start \| stop |

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--fps <n>` | Καρέ ανά δευτερόλεπτο (προεπιλογή 5) |
| `--path <value>` | Αρχείο εξόδου |

**Παραδείγματα**

```sh
# Έναρξη εγγραφής
npx wdio session record start

# Διακοπή και αποθήκευση του βίντεο
npx wdio session record stop --path checkout.mp4
```

Δείτε επίσης: [`trace`](#trace), [`screenshot`](#screenshot).

## `history`

Εκτυπώνει τα καταγεγραμμένα βήματα.

Κάθε ενέργεια που αλλάζει τη σελίδα καταγράφει τον κώδικα WebdriverIO που εκτέλεσε. Το `export` μετατρέπει αυτό το ιστορικό σε spec.

```sh
npx wdio session history
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--clear` | Καθαρίζει το ιστορικό |

**Παραδείγματα**

```sh
# Εμφάνιση των βημάτων μέχρι τώρα
npx wdio session history

# Νέα καταγραφή, πριν από τα βήματα που θέλετε να κρατήσετε
npx wdio session history --clear
```

Δείτε επίσης: [`export`](#export), [`exec`](#exec).

## `export`

Δημιουργεί ένα spec από το ιστορικό.

Γράφει ένα spec describe/it με τα καταγεγραμμένα βήματα. Τα refs γίνονται σταθεροί selectors και οι helpers γίνονται προσαρμοσμένες εντολές. Χωρίς το --out, το αρχείο αποθηκεύεται στον κατάλογο artifacts. Εκτελέστε το με `wdio run` για να επιβεβαιώσετε ότι περνά.

```sh
npx wdio session export
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--out <value>` | Αρχείο εξόδου |
| `--title <value>` | Τίτλος της σουίτας |
| `--page-objects` | Δημιουργεί page objects |
| `--framework <mocha\|jasmine>` | Framework (προεπιλογή mocha) |

**Παραδείγματα**

```sh
# Εγγραφή του spec
npx wdio session export --out test/specs/cart.e2e.ts

# Εγγραφή του spec και εκτέλεσή του
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Δείτε επίσης: [`history`](#history), [`helpers`](#helpers).

## `resume`

Συνεχίζει ένα τεστ που βρίσκεται σε παύση από το wdio run --debug=agent.

Το `wdio run --debug=agent` θέτει σε παύση ένα τεστ που αποτυγχάνει και το εκθέτει ως συνεδρία debug-`<worker>`. Εξετάστε το με οποιαδήποτε ενέργεια και μετά συνεχίστε το. Αν εκτελέσετε `close` σε αυτή τη συνεδρία, το τεστ αποτυγχάνει.

```sh
npx wdio session resume
```

**Παραδείγματα**

```sh
# Ματιά στο τεστ σε παύση και μετά συνέχιση
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

Δείτε επίσης: [`close`](#close), [`list`](#list).

## `doctor`

Ελέγχει το περιβάλλον σας.

Εκτυπώνει μία γραμμή ανά έλεγχο, με λύση για κάθε αποτυχία. Αν αποτύχει κάποιος έλεγχος, τερματίζει με κωδικό 1.

```sh
npx wdio session doctor [target]
```

**Ορίσματα**

| Όνομα | Απαιτείται | Περιγραφή |
| --- | --- | --- |
| `target` | όχι | Ελέγχει μόνο ό,τι χρειάζεται αυτός ο στόχος |

**Παραδείγματα**

```sh
# Έλεγχος όλων
npx wdio session doctor

# Έλεγχος όσων χρειάζεται μια συνεδρία Android
npx wdio session doctor android
```

Δείτε επίσης: [`open`](#open).

## `skill`

Εκτυπώνει το agent skill.

```sh
npx wdio session skill
```

**Σημαίες**

| Σημαία | Περιγραφή |
| --- | --- |
| `--install <value>` | Το γράφει στο .agents/skills/wdio-session/SKILL.md (ή σε αυτόν τον κατάλογο) |

**Παραδείγματα**

```sh
# Εκτύπωση του skill
npx wdio session skill

# Προσθήκη του στο τρέχον έργο
npx wdio session skill --install .
```