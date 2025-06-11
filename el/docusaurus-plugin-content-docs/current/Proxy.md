---
id: proxy
title: Ρύθμιση Διακομιστή Μεσολάβησης
---

Μπορείτε να διοχετεύσετε δύο διαφορετικούς τύπους αιτημάτων μέσω ενός διακομιστή μεσολάβησης:

- σύνδεση μεταξύ του δοκιμαστικού σας σεναρίου και του προγράμματος οδήγησης του περιηγητή (ή του τελικού σημείου WebDriver)
- σύνδεση μεταξύ του περιηγητή και του διαδικτύου

## Διακομιστής Μεσολάβησης Μεταξύ Οδηγού Και Δοκιμής

Εάν η εταιρεία σας διαθέτει εταιρικό διακομιστή μεσολάβησης (π.χ. στο `http://my.corp.proxy.com:9090`) για όλα τα εξερχόμενα αιτήματα, ακολουθήστε τα παρακάτω βήματα για να εγκαταστήσετε και να διαμορφώσετε το [undici](https://github.com/nodejs/undici).

### Εγκατάσταση undici

```bash npm2yarn
npm install undici --save-dev
```

### Προσθήκη undici setGlobalDispatcher στο αρχείο διαμόρφωσής σας

Προσθέστε την ακόλουθη δήλωση require στην αρχή του αρχείου διαμόρφωσής σας.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Πρόσθετες πληροφορίες σχετικά με τη διαμόρφωση του διακομιστή μεσολάβησης μπορούν να βρεθούν [εδώ](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Εάν χρησιμοποιείτε το [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), ξεκινήστε το μέσω:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Διακομιστής Μεσολάβησης Μεταξύ Περιηγητή Και Διαδικτύου

Για να διοχετεύσετε τη σύνδεση μεταξύ του περιηγητή και του διαδικτύου, μπορείτε να ρυθμίσετε έναν διακομιστή μεσολάβησης που μπορεί να είναι χρήσιμος (για παράδειγμα) για τη συλλογή πληροφοριών δικτύου και άλλων δεδομένων με εργαλεία όπως το [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Οι παράμετροι `proxy` μπορούν να εφαρμοστούν μέσω των τυπικών δυνατοτήτων με τον ακόλουθο τρόπο:

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