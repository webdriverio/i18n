---
id: cloudservices
title: Χρήση Υπηρεσιών Cloud
---

Using on-demand services like Sauce Labs, Browserstack, TestingBot, TestMu AI (Formerly LambdaTest) or Perfecto with WebdriverIO is pretty simple. All you need to do is to set your service's `user` and `key` in your options.

Optionally, you can also parametrize your test by setting cloud-specific capabilities like `build`. If you only want to run cloud services in Travis, you can use the `CI` environment variable to check if you are in Travis and modify the config accordingly.

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

Η μόνη απαίτηση είναι να ορίσετε το `user` και το `key` στις ρυθμίσεις σας (είτε εξάγονται από το `wdio.conf.js` είτε μεταβιβάζονται στο `webdriverio.remote(...)`) στο όνομα χρήστη και το κλειδί πρόσβασης του Sauce Labs.

Μπορείτε επίσης να περάσετε οποιαδήποτε προαιρετική [επιλογή ρύθμισης δοκιμών](https://docs.saucelabs.com/dev/test-configuration-options/) ως κλειδί/τιμή στις δυνατότητες για οποιοδήποτε πρόγραμμα περιήγησης.

### Sauce Connect

Αν θέλετε να εκτελέσετε δοκιμές σε έναν διακομιστή που δεν είναι προσβάσιμος στο Διαδίκτυο (όπως στο `localhost`), τότε πρέπει να χρησιμοποιήσετε το [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Δεν εμπίπτει στο πεδίο εφαρμογής του WebdriverIO η υποστήριξη αυτού, οπότε θα πρέπει να το ξεκινήσετε μόνοι σας.

Εάν χρησιμοποιείτε το WDIO testrunner, κατεβάστε και ρυθμίστε την [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) στο `wdio.conf.js`. Βοηθά στην εκτέλεση του Sauce Connect και έρχεται με πρόσθετες λειτουργίες που ενσωματώνουν καλύτερα τις δοκιμές σας στην υπηρεσία Sauce.

### Με Travis CI

Το Travis CI, ωστόσο, [έχει υποστήριξη](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) για την έναρξη του Sauce Connect πριν από κάθε δοκιμή, οπότε η ακολούθηση των οδηγιών τους για αυτό είναι μια επιλογή.

Αν το κάνετε, πρέπει να ορίσετε την επιλογή ρύθμισης δοκιμών `tunnel-identifier` στις `capabilities` κάθε προγράμματος περιήγησης. Το Travis το ορίζει στην περιβαλλοντική μεταβλητή `TRAVIS_JOB_NUMBER` από προεπιλογή.

Επίσης, αν θέλετε το Sauce Labs να ομαδοποιήσει τις δοκιμές σας ανά αριθμό build, μπορείτε να ορίσετε το `build` στο `TRAVIS_BUILD_NUMBER`.

Τέλος, αν ορίσετε το `name`, αυτό αλλάζει το όνομα αυτής της δοκιμής στο Sauce Labs για αυτό το build. Εάν χρησιμοποιείτε το WDIO testrunner σε συνδυασμό με το [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), το WebdriverIO ορίζει αυτόματα ένα κατάλληλο όνομα για τη δοκιμή.

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

Επειδή εκτελείτε τις δοκιμές σας απομακρυσμένα, μπορεί να είναι απαραίτητο να αυξήσετε ορισμένα χρονικά όρια.

Μπορείτε να αλλάξετε το [χρονικό όριο αδράνειας](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) περνώντας το `idle-timeout` ως επιλογή ρύθμισης δοκιμών. Αυτό ελέγχει πόσο θα περιμένει το Sauce μεταξύ των εντολών πριν κλείσει τη σύνδεση.

## BrowserStack

Το WebdriverIO έχει επίσης ενσωματωμένη τη [Browserstack](https://www.browserstack.com) ενσωμάτωση.

Η μόνη απαίτηση είναι να ορίσετε το `user` και το `key` στις ρυθμίσεις σας (είτε εξάγονται από το `wdio.conf.js` είτε μεταβιβάζονται στο `webdriverio.remote(...)`) στο όνομα χρήστη και το κλειδί πρόσβασης του Browserstack automate.

Μπορείτε επίσης να περάσετε οποιεσδήποτε προαιρετικές [υποστηριζόμενες δυνατότητες](https://www.browserstack.com/automate/capabilities) ως κλειδί/τιμή στις δυνατότητες για οποιοδήποτε πρόγραμμα περιήγησης. Εάν ορίσετε το `browserstack.debug` σε `true`, θα καταγράψει ένα βίντεο της συνεδρίας, που μπορεί να είναι χρήσιμο.

### Τοπικές Δοκιμές

Αν θέλετε να εκτελέσετε δοκιμές σε έναν διακομιστή που δεν είναι προσβάσιμος στο Διαδίκτυο (όπως στο `localhost`), τότε πρέπει να χρησιμοποιήσετε το [Local Testing](https://www.browserstack.com/local-testing#command-line).

Δεν εμπίπτει στο πεδίο εφαρμογής του WebdriverIO η υποστήριξη αυτού, οπότε πρέπει να το ξεκινήσετε μόνοι σας.

Αν χρησιμοποιείτε τοπική δοκιμή, θα πρέπει να ορίσετε το `browserstack.local` σε `true` στις δυνατότητές σας.

Εάν χρησιμοποιείτε το WDIO testrunner, κατεβάστε και ρυθμίστε την [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) στο `wdio.conf.js`. Βοηθά να ξεκινήσει το BrowserStack και έρχεται με πρόσθετες λειτουργίες που ενσωματώνουν καλύτερα τις δοκιμές σας στην υπηρεσία BrowserStack.

### Με Travis CI

Αν θέλετε να προσθέσετε Local Testing στο Travis, πρέπει να το ξεκινήσετε μόνοι σας.

Το ακόλουθο σενάριο θα το κατεβάσει και θα το ξεκινήσει στο παρασκήνιο. Θα πρέπει να το εκτελέσετε στο Travis πριν ξεκινήσετε τις δοκιμές.

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

Η μόνη απαίτηση είναι να ορίσετε το `user` και το `key` στις ρυθμίσεις σας (είτε εξάγονται από το `wdio.conf.js` είτε μεταβιβάζονται στο `webdriverio.remote(...)`) στο όνομα χρήστη και το μυστικό κλειδί του [TestingBot](https://testingbot.com).

Μπορείτε επίσης να περάσετε οποιεσδήποτε προαιρετικές [υποστηριζόμενες δυνατότητες](https://testingbot.com/support/other/test-options) ως κλειδί/τιμή στις δυνατότητες για οποιοδήποτε πρόγραμμα περιήγησης.

### Τοπικές Δοκιμές

Αν θέλετε να εκτελέσετε δοκιμές σε έναν διακομιστή που δεν είναι προσβάσιμος στο Διαδίκτυο (όπως στο `localhost`), τότε πρέπει να χρησιμοποιήσετε το [Local Testing](https://testingbot.com/support/other/tunnel). Το TestingBot παρέχει ένα τούνελ βασισμένο σε Java για να σας επιτρέψει να δοκιμάσετε ιστοσελίδες που δεν είναι προσβάσιμες από το διαδίκτυο.

Η σελίδα υποστήριξης του tunnel περιέχει τις απαραίτητες πληροφορίες για να το θέσετε σε λειτουργία.

Εάν χρησιμοποιείτε το WDIO testrunner, κατεβάστε και ρυθμίστε την [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) στο `wdio.conf.js`. Βοηθά στην εκτέλεση του TestingBot και έρχεται με πρόσθετες λειτουργίες που ενσωματώνουν καλύτερα τις δοκιμές σας στην υπηρεσία TestingBot.

## TestMu AI (Πρώην LambdaTest)

Η ενσωμάτωση [TestMu AI](https://www.testmuai.com/) είναι επίσης ενσωματωμένη.

Η μόνη απαίτηση είναι να ορίσετε το `user` και το `key` στις ρυθμίσεις σας (είτε εξάγονται από το `wdio.conf.js` είτε μεταβιβάζονται στο `webdriverio.remote(...)`) στο όνομα χρήστη του λογαριασμού TestMu AI και το κλειδί πρόσβασης.

Μπορείτε επίσης να περάσετε οποιεσδήποτε προαιρετικές [υποστηριζόμενες δυνατότητες](https://www.testmuai.com/capabilities-generator/) ως κλειδί/τιμή στις δυνατότητες για οποιοδήποτε πρόγραμμα περιήγησης. Εάν ορίσετε το `visual` σε `true`, θα καταγράψει ένα βίντεο της συνεδρίας, που μπορεί να είναι χρήσιμο.

### Tunnel για τοπικές δοκιμές

Αν θέλετε να εκτελέσετε δοκιμές σε έναν διακομιστή που δεν είναι προσβάσιμος στο Διαδίκτυο (όπως στο `localhost`), τότε πρέπει να χρησιμοποιήσετε το [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Δεν εμπίπτει στο πεδίο εφαρμογής του WebdriverIO η υποστήριξη αυτού, οπότε πρέπει να το ξεκινήσετε μόνοι σας.

Αν χρησιμοποιείτε τοπική δοκιμή, θα πρέπει να ορίσετε το `tunnel` σε `true` στις δυνατότητές σας.

Εάν χρησιμοποιείτε το WDIO testrunner, κατεβάστε και ρυθμίστε την [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) στο `wdio.conf.js`. Βοηθά στην εκτέλεση του TestMu AI και έρχεται με πρόσθετες λειτουργίες που ενσωματώνουν καλύτερα τις δοκιμές σας στην υπηρεσία TestMu AI.

### Με Travis CI

Αν θέλετε να προσθέσετε Local Testing στο Travis, πρέπει να το ξεκινήσετε μόνοι σας.

Το ακόλουθο σενάριο θα το κατεβάσει και θα το ξεκινήσει στο παρασκήνιο. Θα πρέπει να το εκτελέσετε στο Travis πριν ξεκινήσετε τις δοκιμές.

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

Όταν χρησιμοποιείτε το wdio με το [`Perfecto`](https://www.perfecto.io), πρέπει να δημιουργήσετε ένα διακριτικό ασφαλείας για κάθε χρήστη και να το προσθέσετε στη δομή δυνατοτήτων (επιπλέον άλλων δυνατοτήτων), ως εξής:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Επιπλέον, πρέπει να προσθέσετε τη ρύθμιση cloud, ως εξής:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```