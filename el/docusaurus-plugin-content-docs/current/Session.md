---
id: session
title: wdio session
description: Χειριστείτε έναν browser, μια εφαρμογή κινητού ή μια εφαρμογή desktop από το shell με σύντομες εντολές wdio session και, στη συνέχεια, εξαγάγετε τα βήματα ως test.
---

Το `wdio session` διατηρεί ενεργό ένα WebdriverIO session σε πολλές σύντομες εντολές shell. Χρησιμοποιήστε το για να εξερευνήσετε ένα UI, να ελέγξετε μια αλλαγή και να μετατρέψετε τα βήματα που λειτούργησαν σε test. Αποτελεί μέρος του `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

Το session ονομάζεται `default`. Περάστε `-s <name>` μόνο όταν χρειάζεστε δύο sessions ταυτόχρονα. Η σελίδα [targets](/docs/session/targets) χειρίζεται ένα Expo guinea pig σε ένα headed παράθυρο Chrome και σε ένα παράθυρο Electron, και τα δύο σε μέγεθος desktop. Οι εντολές Android και iOS για την ίδια εφαρμογή βρίσκονται σε εκείνη τη σελίδα.

## Εγκατάσταση

Το `wdio session` αποτελεί μέρος του WebdriverIO CLI. Το `npx wdio` εγκαθιστά το unscoped πακέτο [`wdio`](https://www.npmjs.com/package/wdio) και εκτελεί αυτό το CLI. Δεν χρειάζεται να εγκαταστήσετε μόνοι σας το `@wdio/session`.

```sh
npx wdio session --help
npx wdio session click --help
```

Το `--help` εμφανίζει τη ροή εργασίας, τις ενέργειες ανά ομάδα, τα global flags και τους κωδικούς εξόδου. Το `<action> --help` εμφανίζει τα ορίσματα, τα flags, τις πλατφόρμες, τα παραδείγματα και τις σχετικές ενέργειες εκείνης της ενέργειας. Το ίδιο κείμενο βρίσκεται στη σελίδα [commands](/docs/session-commands). Το agent skill διατηρεί μόνο τον βασικό βρόχο και παραπέμπει τους agents στο `--help` για τα υπόλοιπα, ώστε να μην παρωχηθεί όταν αλλάζει το CLI.

Δημιουργήστε τον σκελετό ενός project με:

```sh
npm init wdio@latest
```

Αποδεχτείτε το "Set up coding agent support" για να γραφτούν το `.agents/skills/wdio-session/SKILL.md`, μια ενότητα στο `AGENTS.md` και μια καταχώριση gitignore για το `.wdio/session/`. Εγκαταστήστε το skill αργότερα με:

```sh
npx wdio session skill --install .
```

Το `npx wdio session doctor` ελέγχει το Node.js, τον browser, το Appium, τα SDKs και τα cloud credentials. Το `doctor <target>` ελέγχει μόνο ό,τι χρειάζεται το συγκεκριμένο target. Η διεργασία τερματίζει με 1 όταν αποτύχει κάποιος έλεγχος.

## Άνοιγμα μιας σελίδας και ενέργειες σε αυτή

Ανοίξτε headless Chrome (προσθέστε `--headed` για να εμφανιστεί το παράθυρο). Το `open` εμφανίζει τα interactive στοιχεία της σελίδας:

```sh
npx wdio session open chrome http://localhost:3000
```

Ένα στοιχείο μοιάζει με `button "Add to cart" [ref=e3]`. Χρησιμοποιήστε αυτό το ref. Κάθε ενέργεια αναφέρει τι άλλαξε στη σελίδα, με refs για τα νέα στοιχεία, οπότε σπάνια χρειάζεστε ξεχωριστό `snapshot`:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

Τα `open firefox`, `open edge` και `open safari` δέχονται το ίδιο URL. Οι Chrome, Firefox και Edge κατεβαίνουν κατά την πρώτη χρήση όταν δεν είναι εγκατεστημένοι. Το Safari απαιτεί macOS.

### Android

Τα Android και iOS εκτελούνται μέσω Appium 3. Το `doctor android` αναφέρει έναν server ή driver που λείπει μαζί με την εντολή εγκατάστασης.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Native desktop: `open macos --bundle-id com.example.shop` και `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

Τα `open tauri ./my-app` και `open dioxus ./my-app` χρειάζονται τον driver τους στο `PATH`. Σε Linux χωρίς `DISPLAY` ή `WAYLAND_DISPLAY`, εγκαταστήστε Xvfb ή weston.

## Παρατήρηση και refs

| Εντολή | Χρησιμοποιήστε τη για |
| --- | --- |
| `snapshot --interactive` | Τα στοιχεία στα οποία μπορείτε να εκτελέσετε ενέργειες, το καθένα με ένα ref |
| `snapshot --compact` | Το ίδιο δέντρο χωρίς τα ανώνυμα κενά wrappers |
| `snapshot --urls` | Τις διευθύνσεις των links σε κάθε link |
| `find "Add to cart"` | Μια γραμμή από ένα νέο snapshot |
| `diff` | Τι άλλαξε από το προηγούμενο snapshot |
| `screenshot` | Τη διάταξη. Παραλείψτε το όταν ένα snapshot απαντά στην ερώτηση |
| `pdf` | Ένα PDF της τρέχουσας σελίδας (`pdf report.pdf`). Τα BiDi sessions εκτυπώνουν σε headed και headless |
| `source` | Το HTML της σελίδας ή το native XML |

Τα refs προέρχονται από το πιο πρόσφατο snapshot. Μετά από πλοήγηση, πάρτε ξανά snapshot. Ένα παλιό ref αποτυγχάνει με `REF_STALE`. Ένα άγνωστο ref αποτυγχάνει με `REF_NOT_FOUND`.

## `exec`

Το `exec` εκτελεί κώδικα WebdriverIO. Χρησιμοποιείτε πάντα `await` στις εντολές. Το `$` επιστρέφει ένα στοιχείο και προκαλεί σφάλμα όταν αυτό λείπει. Δεν υπάρχει sync mode ούτε `browser.element`.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Βάλτε assertions στο `exec` με το `expect-webdriverio`. Χρησιμοποιήστε το `visual check <tag>` (χρειάζεται το `@wdio/visual-service`) όταν το ζητούμενο είναι πώς φαίνεται η οθόνη.

## Εξαγωγή

Το `export` γράφει ένα spec από τα καταγεγραμμένα βήματα. Τα refs αντικαθίστανται με σταθερούς selectors.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

Τα `open firefox`, `open edge` και `open safari` δέχονται το ίδιο URL. Τα υπόλοιπα targets, τα snapshots, το `exec`, η εξαγωγή και η παυμένη εκτέλεση test βρίσκονται σε ξεχωριστές σελίδες αυτής της ενότητας.

## Αυτή η ενότητα

| Σελίδα | Χρησιμοποιήστε τη για |
| --- | --- |
| [Targets](/docs/session/targets) | Browsers, Android, iOS, desktop, Electron, Tauri, Dioxus και cloud devices, συμπεριλαμβανομένης της demo εφαρμογής σε Chrome, Android και Electron |
| [Snapshots και refs](/docs/session/snapshots) | Τι υπάρχει στην οθόνη και τα refs στα οποία κάνετε click |
| [Εκτέλεση κώδικα](/docs/session/exec) | `exec`, assertions και visual checks |
| [Εξαγωγή ενός test](/docs/session/export) | Specs, page objects και `.wdio/helpers` |
| [Debug ενός test](/docs/session/debug) | `wdio run --debug=agent` και `wdio repl --session` |
| [Εντολές](/docs/session-commands) | Κάθε ενέργεια και flag |

## Αντιμετώπιση προβλημάτων

| Μήνυμα | Τι να κάνετε |
| --- | --- |
| `SESSION_EXISTS` | Το όνομα εκτελείται ήδη. Χρησιμοποιήστε `-s` με άλλο όνομα ή `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | Εκτελέστε ξανά `snapshot` και χρησιμοποιήστε ένα ref από εκείνη την έξοδο. |
| `NOT_EDITABLE` | Το target του `fill` δεν είναι επεξεργάσιμο πεδίο και δεν περιέχει ένα μοναδικό επεξεργάσιμο πεδίο (ή πίσω από `aria-controls`/`aria-owns`/label). Εκτελέστε `snapshot --scope <target>` και κάντε fill στο ref του πεδίου. |
| `MISSING_DEPENDENCY` | Εγκαταστήστε το πακέτο που αναφέρεται στο σφάλμα ή εκτελέστε `wdio session doctor <target>`. |
| `MISSING_APPIUM_DRIVER` | Εκτελέστε τη γραμμή `npx appium driver install …` από το σφάλμα. |
| `MISSING_CREDENTIALS` | Κάντε export τις μεταβλητές που αναφέρονται. Το doctor δεν εμφανίζει ποτέ τις τιμές τους. |
| `Session closed from wdio session` | Το debug session έκλεισε. Κάντε resume αντί για close όταν το test πρέπει να συνεχιστεί. |

Κωδικοί εξόδου: 0 επιτυχία, 1 η ενέργεια απέτυχε, 2 λάθος χρήση, 3 λείπει dependency ή credentials, 4 δεν υπάρχει session με αυτό το όνομα.

## Επόμενα βήματα

- [Targets](/docs/session/targets) — ανοίξτε έναν browser, μια εφαρμογή Android ή iOS, ή ένα παράθυρο Electron
- [WebdriverIO για Coding Agents](/docs/ai-agents) — skill, τεκμηρίωση και κανόνες project
- [Εντολές wdio session](/docs/session-commands) — κάθε ενέργεια και flag