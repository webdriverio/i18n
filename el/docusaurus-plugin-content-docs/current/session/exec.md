---
id: exec
title: Εκτέλεση κώδικα σε μια συνεδρία
description: Εκτελέστε κώδικα και assertions του WebdriverIO σε μια ενεργή συνεδρία wdio με το exec.
---

Το `exec` εκτελεί κώδικα WebdriverIO στην ανοιχτή συνεδρία. Χρησιμοποιήστε το όταν ένα βήμα είναι κάτι περισσότερο από ένα απλό `click` ή `fill`, καθώς και για κάθε assertion.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Χρησιμοποιείτε πάντα `await` στις εντολές. Το `$` επιστρέφει ένα στοιχείο και προκαλεί σφάλμα όταν αυτό λείπει. Το `$$` επιστρέφει μια λίστα. Δεν υπάρχει σύγχρονη λειτουργία (sync mode) ούτε `browser.element`.

Τα ονόματα που δηλώνετε παραμένουν διαθέσιμα στο επόμενο `exec`. Ένα `import` στο ανώτατο επίπεδο φορτώνεται από τον κατάλογο του έργου.

## Assertions

Τοποθετήστε τα assertions στο `exec` με το `expect-webdriverio`. Εγκαταστήστε το στο έργο σας. Χωρίς αυτό, το `expect(...)` αποτυγχάνει με μια υπόδειξη εγκατάστασης.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

Χρησιμοποιήστε το `visual check <tag>` όταν το ερώτημα είναι πώς φαίνεται η οθόνη. Αυτή η εντολή χρειάζεται το `@wdio/visual-service`:

```sh
npx wdio session visual check cart
```

Το `visual accept cart` αντιγράφει την πιο πρόσφατη πραγματική εικόνα για αυτό το tag πάνω στην εικόνα αναφοράς (baseline). Δεν αντιγράφει παλαιότερες εικόνες που μοιράζονται το ίδιο πρόθεμα tag.

## Πότε να χρησιμοποιήσετε μια συντόμευση

Τα `click`, `fill`, `type`, `press` και `tap` είναι συντομότερα από το `exec` για μία μεμονωμένη αλληλεπίδραση και εμφανίζουν τη γραμμή WebdriverIO που εκτέλεσαν. Προτιμήστε τα με ένα ref από το πιο πρόσφατο [snapshot](/docs/session/snapshots). Χρησιμοποιήστε το `exec` για αναμονές, assertions και οτιδήποτε χρειάζεται περισσότερες από μία εντολές.

## Επόμενα βήματα

- [Εξαγωγή ενός test](/docs/session/export) — αποθηκεύστε τα βήματα, συμπεριλαμβανομένου του `exec`
- [Εντολές](/docs/session-commands) — σημαίες (flags) των `exec` και `visual`