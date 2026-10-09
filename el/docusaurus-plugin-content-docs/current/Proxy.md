---
id: proxy
title: Ρύθμιση Proxy
description: "Δρομολογήστε αιτήματα μέσω ενός proxy, είτε μεταξύ των δοκιμών σας και του driver είτε μεταξύ του προγράμματος περιήγησης και του διαδικτύου."
---

Μπορείτε να διοχετεύσετε δύο διαφορετικούς τύπους αιτημάτων μέσω ενός proxy:

- σύνδεση μεταξύ του σεναρίου δοκιμών σας και του browser driver (ή του WebDriver endpoint)
- σύνδεση μεταξύ του προγράμματος περιήγησης και του διαδικτύου

## Proxy Μεταξύ Driver Και Δοκιμών

Εάν η εταιρεία σας διαθέτει εταιρικό proxy (π.χ. στο `http://my.corp.proxy.com:9090`) για όλα τα εξερχόμενα αιτήματα, έχετε δύο επιλογές για να ρυθμίσετε το WebdriverIO ώστε να χρησιμοποιεί το proxy:

### Επιλογή 1: Χρήση Μεταβλητών Περιβάλλοντος (Συνιστάται)

Ξεκινώντας από το WebdriverIO v9.12.0, μπορείτε απλώς να ορίσετε τις τυπικές μεταβλητές περιβάλλοντος για proxy:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Optional: bypass proxy for certain hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Στη συνέχεια, εκτελέστε τις δοκιμές σας ως συνήθως. Το WebdriverIO θα χρησιμοποιήσει αυτόματα αυτές τις μεταβλητές περιβάλλοντος για τη ρύθμιση του proxy.

### Επιλογή 2: Χρήση του setGlobalDispatcher του undici

Για πιο προηγμένες ρυθμίσεις proxy ή εάν χρειάζεστε προγραμματιστικό έλεγχο, μπορείτε να χρησιμοποιήσετε τη μέθοδο `setGlobalDispatcher` του undici:

#### Εγκατάσταση του undici

```bash npm2yarn
npm install undici --save-dev
```

#### Προσθήκη του setGlobalDispatcher του undici στο αρχείο ρυθμίσεων

Προσθέστε την ακόλουθη δήλωση require στην αρχή του αρχείου ρυθμίσεών σας.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Περισσότερες πληροφορίες σχετικά με τη ρύθμιση του proxy μπορείτε να βρείτε [εδώ](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Ποια Μέθοδο Πρέπει Να Χρησιμοποιήσω;

- **Χρησιμοποιήστε μεταβλητές περιβάλλοντος** εάν θέλετε μια απλή, τυπική προσέγγιση που λειτουργεί σε διάφορα εργαλεία και δεν απαιτεί αλλαγές στον κώδικα.
- **Χρησιμοποιήστε το setGlobalDispatcher** εάν χρειάζεστε προηγμένες λειτουργίες proxy, όπως προσαρμοσμένη αυθεντικοποίηση, διαφορετικές ρυθμίσεις proxy ανά περιβάλλον, ή θέλετε να ελέγχετε προγραμματιστικά τη συμπεριφορά του proxy.

Και οι δύο μέθοδοι υποστηρίζονται πλήρως και το WebdriverIO θα ελέγξει πρώτα για έναν global dispatcher πριν καταφύγει στις μεταβλητές περιβάλλοντος.

### Sauce Connect Proxy

Εάν χρησιμοποιείτε το [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), εκκινήστε το μέσω:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy Μεταξύ Προγράμματος Περιήγησης Και Διαδικτύου

Για να διοχετεύσετε τη σύνδεση μεταξύ του προγράμματος περιήγησης και του διαδικτύου, μπορείτε να ρυθμίσετε ένα proxy, το οποίο μπορεί να είναι χρήσιμο (για παράδειγμα) για την καταγραφή πληροφοριών δικτύου και άλλων δεδομένων με εργαλεία όπως το [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Οι παράμετροι `proxy` μπορούν να εφαρμοστούν μέσω των τυπικών capabilities με τον ακόλουθο τρόπο:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

Για περισσότερες πληροφορίες, δείτε την [προδιαγραφή WebDriver](https://w3c.github.io/webdriver/#proxy).