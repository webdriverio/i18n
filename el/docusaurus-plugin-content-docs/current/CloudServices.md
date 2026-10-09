---
id: cloudservices
title: Χρήση Υπηρεσιών Cloud
description: "Εκτελέστε δοκιμές WebdriverIO στα Sauce Labs, BrowserStack, TestingBot, TestMu AI (πρώην LambdaTest), Perfecto και σε άλλους παρόχους cloud."
---

Η χρήση υπηρεσιών κατ' απαίτηση όπως τα Sauce Labs, Browserstack, TestingBot, TestMu AI (πρώην LambdaTest) ή Perfecto με το WebdriverIO είναι αρκετά απλή. Το μόνο που χρειάζεται να κάνετε είναι να ορίσετε τα `user` και `key` της υπηρεσίας σας στις επιλογές σας.

Προαιρετικά, μπορείτε επίσης να παραμετροποιήσετε τη δοκιμή σας ορίζοντας δυνατότητες (capabilities) ειδικές για το cloud, όπως το `build`. Αν θέλετε να εκτελείτε υπηρεσίες cloud μόνο στο Travis, μπορείτε να χρησιμοποιήσετε τη μεταβλητή περιβάλλοντος `CI` για να ελέγξετε αν βρίσκεστε στο Travis και να τροποποιήσετε τη διαμόρφωση ανάλογα.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Μπορείτε να ρυθμίσετε τις δοκιμές σας ώστε να εκτελούνται απομακρυσμένα στο [Sauce Labs](https://saucelabs.com).

Η μόνη απαίτηση είναι να ορίσετε τα `user` και `key` στη διαμόρφωσή σας (είτε εξάγονται από το `wdio.conf.js` είτε περνιούνται στο `webdriverio.remote(...)`) με το όνομα χρήστη και το κλειδί πρόσβασης του Sauce Labs.

Μπορείτε επίσης να περάσετε οποιαδήποτε προαιρετική [επιλογή διαμόρφωσης δοκιμής](https://docs.saucelabs.com/dev/test-configuration-options/) ως ζεύγος κλειδιού/τιμής στις capabilities για οποιονδήποτε browser.

### Sauce Connect

Αν θέλετε να εκτελέσετε δοκιμές σε έναν διακομιστή που δεν είναι προσβάσιμος από το Διαδίκτυο (όπως στο `localhost`), τότε πρέπει να χρησιμοποιήσετε το [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Η υποστήριξη αυτού είναι εκτός του πεδίου του WebdriverIO, επομένως θα πρέπει να το εκκινήσετε μόνοι σας.

Αν χρησιμοποιείτε τον WDIO testrunner, κατεβάστε και διαμορφώστε το [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) στο `wdio.conf.js` σας. Βοηθά στην εκτέλεση του Sauce Connect και διαθέτει επιπλέον λειτουργίες που ενσωματώνουν καλύτερα τις δοκιμές σας στην υπηρεσία Sauce.

### Με Travis CI

Το Travis CI, ωστόσο, [παρέχει υποστήριξη](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) για την εκκίνηση του Sauce Connect πριν από κάθε δοκιμή, οπότε η τήρηση των οδηγιών τους γι' αυτό αποτελεί μια επιλογή.

Αν το κάνετε αυτό, πρέπει να ορίσετε την επιλογή διαμόρφωσης δοκιμής `tunnel-identifier` στις `capabilities` κάθε browser. Το Travis την ορίζει από προεπιλογή στη μεταβλητή περιβάλλοντος `TRAVIS_JOB_NUMBER`.

Επίσης, αν θέλετε το Sauce Labs να ομαδοποιεί τις δοκιμές σας ανά αριθμό build, μπορείτε να ορίσετε το `build` σε `TRAVIS_BUILD_NUMBER`.

Τέλος, αν ορίσετε το `name`, αυτό αλλάζει το όνομα της συγκεκριμένης δοκιμής στο Sauce Labs για αυτό το build. Αν χρησιμοποιείτε τον WDIO testrunner σε συνδυασμό με το [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), το WebdriverIO ορίζει αυτόματα ένα κατάλληλο όνομα για τη δοκιμή.

Παράδειγμα `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Χρονικά όρια

Εφόσον εκτελείτε τις δοκιμές σας απομακρυσμένα, ίσως χρειαστεί να αυξήσετε ορισμένα χρονικά όρια.

Μπορείτε να αλλάξετε το [χρονικό όριο αδράνειας](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) περνώντας το `idle-timeout` ως επιλογή διαμόρφωσης δοκιμής. Αυτό καθορίζει πόσο θα περιμένει το Sauce μεταξύ εντολών πριν κλείσει τη σύνδεση.

## BrowserStack

Το WebdriverIO διαθέτει επίσης ενσωματωμένη υποστήριξη για το [Browserstack](https://www.browserstack.com).

Η μόνη απαίτηση είναι να ορίσετε τα `user` και `key` στη διαμόρφωσή σας (είτε εξάγονται από το `wdio.conf.js` είτε περνιούνται στο `webdriverio.remote(...)`) με το όνομα χρήστη και το κλειδί πρόσβασης του Browserstack automate.

Μπορείτε επίσης να περάσετε οποιεσδήποτε προαιρετικές [υποστηριζόμενες capabilities](https://www.browserstack.com/automate/capabilities) ως ζεύγος κλειδιού/τιμής στις capabilities για οποιονδήποτε browser. Αν ορίσετε το `browserstack.debug` σε `true`, θα καταγραφεί ένα βίντεο οθόνης της συνεδρίας, κάτι που μπορεί να φανεί χρήσιμο.

### Τοπικές Δοκιμές

Αν θέλετε να εκτελέσετε δοκιμές σε έναν διακομιστή που δεν είναι προσβάσιμος από το Διαδίκτυο (όπως στο `localhost`), τότε πρέπει να χρησιμοποιήσετε τις [Τοπικές Δοκιμές](https://www.browserstack.com/local-testing#command-line).

Η υποστήριξη αυτού είναι εκτός του πεδίου του WebdriverIO, επομένως πρέπει να το εκκινήσετε μόνοι σας.

Αν χρησιμοποιείτε τοπική εκτέλεση, θα πρέπει να ορίσετε το `browserstack.local` σε `true` στις capabilities σας.

Αν χρησιμοποιείτε τον WDIO testrunner, κατεβάστε και διαμορφώστε το [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) στο `wdio.conf.js` σας. Βοηθά στην εκτέλεση του BrowserStack και διαθέτει επιπλέον λειτουργίες που ενσωματώνουν καλύτερα τις δοκιμές σας στην υπηρεσία BrowserStack.

### Με Travis CI

Αν θέλετε να προσθέσετε Τοπικές Δοκιμές στο Travis, πρέπει να το εκκινήσετε μόνοι σας.

Το παρακάτω script θα το κατεβάσει και θα το εκκινήσει στο παρασκήνιο. Θα πρέπει να το εκτελέσετε στο Travis πριν ξεκινήσετε τις δοκιμές.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Επίσης, ίσως θέλετε να ορίσετε το `build` στον αριθμό build του Travis.

Παράδειγμα `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

Η μόνη απαίτηση είναι να ορίσετε τα `user` και `key` στη διαμόρφωσή σας (είτε εξάγονται από το `wdio.conf.js` είτε περνιούνται στο `webdriverio.remote(...)`) με το όνομα χρήστη και το μυστικό κλειδί του [TestingBot](https://testingbot.com).

Μπορείτε επίσης να περάσετε οποιεσδήποτε προαιρετικές [υποστηριζόμενες capabilities](https://testingbot.com/support/other/test-options) ως ζεύγος κλειδιού/τιμής στις capabilities για οποιονδήποτε browser.

### Τοπικές Δοκιμές

Αν θέλετε να εκτελέσετε δοκιμές σε έναν διακομιστή που δεν είναι προσβάσιμος από το Διαδίκτυο (όπως στο `localhost`), τότε πρέπει να χρησιμοποιήσετε τις [Τοπικές Δοκιμές](https://testingbot.com/support/other/tunnel). Το TestingBot παρέχει ένα tunnel βασισμένο σε Java που σας επιτρέπει να δοκιμάζετε ιστοσελίδες που δεν είναι προσβάσιμες από το διαδίκτυο.

Η σελίδα υποστήριξης του tunnel τους περιέχει τις απαραίτητες πληροφορίες για να το θέσετε σε λειτουργία.

Αν χρησιμοποιείτε τον WDIO testrunner, κατεβάστε και διαμορφώστε το [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) στο `wdio.conf.js` σας. Βοηθά στην εκτέλεση του TestingBot και διαθέτει επιπλέον λειτουργίες που ενσωματώνουν καλύτερα τις δοκιμές σας στην υπηρεσία TestingBot.

## TestMu AI (πρώην LambdaTest)

Η ενσωμάτωση του [TestMu AI](https://www.testmuai.com/) είναι επίσης ενσωματωμένη.

Η μόνη απαίτηση είναι να ορίσετε τα `user` και `key` στη διαμόρφωσή σας (είτε εξάγονται από το `wdio.conf.js` είτε περνιούνται στο `webdriverio.remote(...)`) με το όνομα χρήστη και το κλειδί πρόσβασης του λογαριασμού σας στο TestMu AI.

Μπορείτε επίσης να περάσετε οποιεσδήποτε προαιρετικές [υποστηριζόμενες capabilities](https://www.testmuai.com/capabilities-generator/) ως ζεύγος κλειδιού/τιμής στις capabilities για οποιονδήποτε browser. Αν ορίσετε το `visual` σε `true`, θα καταγραφεί ένα βίντεο οθόνης της συνεδρίας, κάτι που μπορεί να φανεί χρήσιμο.

### Tunnel για τοπικές δοκιμές

Αν θέλετε να εκτελέσετε δοκιμές σε έναν διακομιστή που δεν είναι προσβάσιμος από το Διαδίκτυο (όπως στο `localhost`), τότε πρέπει να χρησιμοποιήσετε τις [Τοπικές Δοκιμές](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Η υποστήριξη αυτού είναι εκτός του πεδίου του WebdriverIO, επομένως πρέπει να το εκκινήσετε μόνοι σας.

Αν χρησιμοποιείτε τοπική εκτέλεση, θα πρέπει να ορίσετε το `tunnel` σε `true` στις capabilities σας.

Αν χρησιμοποιείτε τον WDIO testrunner, κατεβάστε και διαμορφώστε το [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) στο `wdio.conf.js` σας. Βοηθά στην εκτέλεση του TestMu AI και διαθέτει επιπλέον λειτουργίες που ενσωματώνουν καλύτερα τις δοκιμές σας στην υπηρεσία TestMu AI.

### Με Travis CI

Αν θέλετε να προσθέσετε Τοπικές Δοκιμές στο Travis, πρέπει να το εκκινήσετε μόνοι σας.

Το παρακάτω script θα το κατεβάσει και θα το εκκινήσει στο παρασκήνιο. Θα πρέπει να το εκτελέσετε στο Travis πριν ξεκινήσετε τις δοκιμές.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Επίσης, ίσως θέλετε να ορίσετε το `build` στον αριθμό build του Travis.

Παράδειγμα `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Όταν χρησιμοποιείτε το wdio με το [`Perfecto`](https://www.perfecto.io), πρέπει να δημιουργήσετε ένα security token για κάθε χρήστη και να το προσθέσετε στη δομή των capabilities (επιπλέον των άλλων capabilities), ως εξής:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Επιπλέον, πρέπει να προσθέσετε τη διαμόρφωση cloud, ως εξής:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

Το [RobotActions](https://robotactions.com) παρέχει πραγματικές συσκευές Android και iOS μαζί με κόμβους browser πίσω από ένα ενιαίο endpoint. Η πιστοποίηση γίνεται με ένα API token αντί για ζεύγος `user` και `key`. Στείλτε το token ως bearer header:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

Εναλλακτικά, περάστε το token ως πρόθεμα διαδρομής, το οποίο το grid αφαιρεί πριν προωθήσει το αίτημα:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

Το grid δέχεται επιπλέον διαπιστευτήρια ενσωματωμένα στο URL (`https://user:token@host`) για άλλους WebDriver clients, αλλά αυτή η μορφή δεν μπορεί να χρησιμοποιηθεί από το WebdriverIO: βασίζεται στο fetch, και το Node.js απορρίπτει διαπιστευτήρια ενσωματωμένα στο URL.

Για να εκτελέσετε δοκιμές σε πραγματική συσκευή, περάστε τον browser ως Appium capability μαζί με οποιονδήποτε από τους παραπάνω τρόπους σύνδεσης:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```