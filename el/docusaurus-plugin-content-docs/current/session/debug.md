---
id: debug
title: Αποσφαλμάτωση ενός test με session
description: Παύστε μια αποτυχημένη εκτέλεση του WebdriverIO και επιθεωρήστε την με το wdio session, και στη συνέχεια συνεχίστε ή κλείστε την.
---

Το `wdio run --debug=agent` παύει τον worker στο `await browser.debug()` και μετά από ένα αποτυχημένο test, και αυξάνει το timeout του framework στις 24 ώρες. Η παύση καλύπτει τόσο τα tests του Mocha όσο και τα steps του Cucumber. Η εκτέλεση εμφανίζει το όνομα του session (`debug-0-0` για τον πρώτο worker):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

Το `close` σε αυτό το session κάνει το test που βρίσκεται σε παύση να αποτύχει με το μήνυμα `Session closed from wdio session`. Χρησιμοποιήστε το resume όταν το test πρέπει να συνεχίσει. Χρησιμοποιήστε το close όταν θέλετε η εκτέλεση να αποτύχει στο σημείο της παύσης.

Το `browser.debug()` χωρίς το `--debug=agent` εξακολουθεί να ανοίγει το [REPL](/docs/repl) μέσα στο test. Το `--debug=agent` είναι ο τρόπος που επιτρέπει σε μια άλλη διεργασία, συμπεριλαμβανομένου ενός coding agent, να χειρίζεται τον worker που βρίσκεται σε παύση με το `wdio session`.

## Σύνδεση ενός REPL

Το `wdio repl --session <name>` συνδέεται σε ένα session που είναι ήδη ανοιχτό και το αφήνει να εκτελείται όταν βγείτε:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Κάθε γραμμή του REPL εκτελείται ως `wdio session exec`. Το `.exit` εμφανίζει `Detached from "default" (still running)`.

## Doctor

Το `npx wdio session doctor` ελέγχει το Node.js, τον browser, το Appium, τα SDKs και τα cloud credentials πριν ανοίξετε ένα session. Το `doctor <target>` ελέγχει μόνο ό,τι χρειάζεται το συγκεκριμένο target. Η διεργασία τερματίζει με κωδικό 1 όταν αποτύχει κάποιος έλεγχος. Ένα session που βρίσκεται ακόμη σε διαδικασία εκκίνησης παραμένει ως έχει. Ένα session του οποίου η διεργασία δεν υπάρχει πλέον αφαιρείται.

## Αντιμετώπιση προβλημάτων

| Μήνυμα | Τι να κάνετε |
| --- | --- |
| `Session closed from wdio session` | Κλείσατε το debug session. Χρησιμοποιήστε το `resume` όταν το test πρέπει να συνεχίσει. |
| Δεν υπάρχει session `debug-0-0` | Η εκτέλεση δεν έχει μπει ακόμη σε παύση ή χρησιμοποίησε διαφορετικό worker id. Το `wdio session list` εμφανίζει τα ονόματα. |
| Η παύση δεν συμβαίνει ποτέ | Η εντολή πρέπει να είναι `wdio run --debug=agent`. Ένα επιτυχημένο test δεν μπαίνει σε παύση εκτός αν καλεί το `browser.debug()`. |

## Επόμενα βήματα

- [Αποσφαλμάτωση](/docs/debugging) — `browser.debug()`, breakpoints και flaky tests
- [REPL](/docs/repl) — το διαδραστικό shell
- [wdio session](/docs/session) — ανοίξτε ένα session που δεν είναι συνδεδεμένο με κάποια εκτέλεση tests