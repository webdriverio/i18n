---
id: docker
title: Docker
description: "Εκτελέστε τη σουίτα δοκιμών WebdriverIO μέσα σε ένα Docker container με προεγκατεστημένο πρόγραμμα περιήγησης για συνεπή αποτελέσματα σε όλα τα μηχανήματα."
---

Το Docker είναι μια ισχυρή τεχνολογία containerization που σας επιτρέπει να ενσωματώσετε τη σουίτα δοκιμών σας σε ένα container που συμπεριφέρεται με τον ίδιο τρόπο σε κάθε σύστημα. Έτσι μπορούν να αποφευχθούν ασταθή αποτελέσματα (flakiness) που οφείλονται σε διαφορετικές εκδόσεις προγράμματος περιήγησης ή πλατφόρμας. Για να εκτελέσετε τις δοκιμές σας μέσα σε ένα container, δημιουργήστε ένα `Dockerfile` στον κατάλογο του έργου σας, π.χ.:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Αλλάξτε το πρόγραμμα περιήγησης και την έκδοση ανάλογα με τις ανάγκες σας
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Βεβαιωθείτε ότι δεν συμπεριλαμβάνετε τα `node_modules` σας στο Docker image και ότι αυτά εγκαθίστανται κατά τη δημιουργία του image. Για αυτόν τον σκοπό, προσθέστε ένα αρχείο `.dockerignore` με το ακόλουθο περιεχόμενο:

```
node_modules
```

:::info
Εδώ χρησιμοποιούμε ένα Docker image που έρχεται με προεγκατεστημένα το Selenium και το Google Chrome. Υπάρχουν διάφορα διαθέσιμα images με διαφορετικές ρυθμίσεις και εκδόσεις προγραμμάτων περιήγησης. Δείτε τα images που συντηρούνται από το έργο Selenium [στο Docker Hub](https://hub.docker.com/u/selenium).
:::

Καθώς μπορούμε να εκτελέσουμε το Google Chrome μόνο σε headless λειτουργία μέσα στο Docker container μας, πρέπει να τροποποιήσουμε το `wdio.conf.js` ώστε να διασφαλίσουμε ότι συμβαίνει αυτό:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

Όπως αναφέρεται στα [Πρωτόκολλα Αυτοματοποίησης](/docs/automationProtocols), μπορείτε να εκτελέσετε το WebdriverIO χρησιμοποιώντας το πρωτόκολλο WebDriver ή το πρωτόκολλο WebDriver BiDi. Βεβαιωθείτε ότι η έκδοση του Chrome που είναι εγκατεστημένη στο image σας αντιστοιχεί στην έκδοση του [Chromedriver](https://www.npmjs.com/package/chromedriver) που έχετε ορίσει στο `package.json` σας.

Για να δημιουργήσετε το Docker container, μπορείτε να εκτελέσετε:

```sh
docker build -t mytest -f Dockerfile .
```

Στη συνέχεια, για να εκτελέσετε τις δοκιμές, εκτελέστε:

```sh
docker run -it mytest
```

Για περισσότερες πληροφορίες σχετικά με τη διαμόρφωση του Docker image, ανατρέξτε στην [τεκμηρίωση του Docker](https://docs.docker.com/).