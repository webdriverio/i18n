---
id: docker
title: Docker
---

Το Docker είναι μια ισχυρή τεχνολογία containerization που επιτρέπει την ενσωμάτωση της σουίτας δοκιμών σας σε ένα container που συμπεριφέρεται με τον ίδιο τρόπο σε κάθε σύστημα. Αυτό μπορεί να αποφύγει προβλήματα αστάθειας λόγω διαφορετικών εκδόσεων περιηγητή ή πλατφόρμας. Για να εκτελέσετε τις δοκιμές σας μέσα σε ένα container, δημιουργήστε ένα `Dockerfile` στον κατάλογο του έργου σας, π.χ.:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Βεβαιωθείτε ότι δεν συμπεριλαμβάνετε τα `node_modules` στην εικόνα Docker σας και ότι αυτά εγκαθίστανται κατά τη δημιουργία της εικόνας. Για αυτό, προσθέστε ένα αρχείο `.dockerignore` με το ακόλουθο περιεχόμενο:

```
node_modules
```

:::info
Χρησιμοποιούμε εδώ μια εικόνα Docker που περιέχει προεγκατεστημένα το Selenium και το Google Chrome. Υπάρχουν διάφορες εικόνες διαθέσιμες με διαφορετικές ρυθμίσεις περιηγητών και εκδόσεις περιηγητών. Δείτε τις εικόνες που συντηρούνται από το έργο Selenium [στο Docker Hub](https://hub.docker.com/u/selenium).
:::

Καθώς μπορούμε να εκτελέσουμε το Google Chrome μόνο σε λειτουργία headless στο Docker container μας, πρέπει να τροποποιήσουμε το `wdio.conf.js` για να διασφαλίσουμε ότι το κάνουμε αυτό:

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

Όπως αναφέρεται στα [Πρωτόκολλα Αυτοματισμού](/docs/automationProtocols), μπορείτε να εκτελέσετε το WebdriverIO χρησιμοποιώντας το πρωτόκολλο WebDriver ή το πρωτόκολλο WebDriver BiDi. Βεβαιωθείτε ότι η έκδοση του Chrome που είναι εγκατεστημένη στην εικόνα σας ταιριάζει με την έκδοση του [Chromedriver](https://www.npmjs.com/package/chromedriver) που έχετε ορίσει στο `package.json` σας.

Για να δημιουργήσετε το Docker container, μπορείτε να εκτελέσετε:

```sh
docker build -t mytest -f Dockerfile .
```

Στη συνέχεια, για να εκτελέσετε τις δοκιμές, εκτελέστε:

```sh
docker run -it mytest
```

Για περισσότερες πληροφορίες σχετικά με τον τρόπο διαμόρφωσης της εικόνας Docker, ανατρέξτε στα [έγγραφα Docker](https://docs.docker.com/).