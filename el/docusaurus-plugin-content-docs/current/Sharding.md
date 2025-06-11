---
id: sharding
title: Κατακερματισμός
---

Από προεπιλογή, το WebdriverIO εκτελεί δοκιμές παράλληλα και επιδιώκει τη βέλτιστη χρήση των πυρήνων CPU στο μηχάνημά σας. Για να επιτύχετε ακόμη μεγαλύτερη παραλληλοποίηση, μπορείτε να κλιμακώσετε περαιτέρω την εκτέλεση δοκιμών WebdriverIO εκτελώντας δοκιμές σε πολλαπλά μηχανήματα ταυτόχρονα. Αυτή τη λειτουργία την ονομάζουμε "κατακερματισμός" (sharding).

## Κατακερματισμός δοκιμών μεταξύ πολλαπλών μηχανημάτων

Για να κατακερματίσετε τη σουίτα δοκιμών, περάστε το `--shard=x/y` στη γραμμή εντολών. Για παράδειγμα, για να χωρίσετε τη σουίτα σε τέσσερα κομμάτια, καθένα από τα οποία εκτελεί το ένα τέταρτο των δοκιμών:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Τώρα, αν εκτελέσετε αυτά τα κομμάτια παράλληλα σε διαφορετικούς υπολογιστές, η σουίτα δοκιμών σας ολοκληρώνεται τέσσερις φορές πιο γρήγορα.

## Παράδειγμα GitHub Actions

Το GitHub Actions υποστηρίζει [κατακερματισμό δοκιμών μεταξύ πολλαπλών εργασιών](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) χρησιμοποιώντας την επιλογή [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). Η επιλογή matrix θα εκτελέσει μια ξεχωριστή εργασία για κάθε πιθανό συνδυασμό των παρεχόμενων επιλογών.

Το ακόλουθο παράδειγμα δείχνει πώς να διαμορφώσετε μια εργασία για να εκτελέσετε τις δοκιμές σας σε τέσσερα μηχανήματα παράλληλα. Μπορείτε να βρείτε την πλήρη ρύθμιση του pipeline στο έργο [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Πρώτα προσθέτουμε μια επιλογή matrix στη διαμόρφωση της εργασίας μας με την επιλογή shard που περιέχει τον αριθμό των κομματιών που θέλουμε να δημιουργήσουμε. Το `shard: [1, 2, 3, 4]` θα δημιουργήσει τέσσερα κομμάτια, καθένα με διαφορετικό αριθμό κομματιού.
-   Στη συνέχεια εκτελούμε τις δοκιμές WebdriverIO με την επιλογή `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Αυτή θα είναι η εντολή δοκιμής για κάθε κομμάτι.
-   Τέλος, ανεβάζουμε την αναφορά καταγραφής wdio στα Artifacts του GitHub Actions. Αυτό θα καταστήσει τα αρχεία καταγραφής διαθέσιμα σε περίπτωση που το κομμάτι αποτύχει.

Το pipeline δοκιμών ορίζεται ως εξής:

```yaml title=.github/workflows/test.yaml
name: Test

on: [push, pull_request]

jobs:
    lint:
        # ...
    unit:
        # ...
    e2e:
        name: 🧪 Test (${{ matrix.shard }}/${{ strategy.job-total }})
        runs-on: ubuntu-latest
        needs: [lint, unit]
        strategy:
            matrix:
                shard: [1, 2, 3, 4]
        steps:
            - uses: actions/checkout@v4
            - uses: ./.github/workflows/actions/setup
            - name: E2E Test
              run: npm run test:features -- --shard ${{ matrix.shard }}/${{ strategy.job-total }}
            - uses: actions/upload-artifact@v1
              if: failure()
              with:
                  name: logs-${{ matrix.shard }}
                  path: logs
```

Αυτό θα εκτελέσει όλα τα κομμάτια παράλληλα, μειώνοντας τον χρόνο εκτέλεσης για τις δοκιμές κατά 4:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Δείτε το commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) από το έργο [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) που εισήγαγε τον κατακερματισμό στο pipeline δοκιμών του, το οποίο βοήθησε στη μείωση του συνολικού χρόνου εκτέλεσης από `2:23 λεπτά` σε `1:30 λεπτά`, μια μείωση της τάξης του __37%__ 🎉.