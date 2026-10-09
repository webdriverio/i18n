---
id: arm64-chromedriver
title: Chromedriver σε ARM64
description: Πώς το WebdriverIO ρυθμίζει το Chromedriver σε ARM64 macOS, Windows και Linux, και τι να κάνετε όταν δεν υπάρχει αντίστοιχος οδηγός για Linux ARM64.
---

Το WebdriverIO ρυθμίζει αυτόματα το Chromedriver σε ARM64. Στο **macOS** (Apple silicon), το Chrome for Testing δημοσιεύει ένα εγγενές Chromedriver `mac-arm64` για κάθε έκδοση, οπότε δεν χρειάζεται καμία ρύθμιση. Στα **Windows 11 on Arm** λειτουργεί επίσης χωρίς καμία διαμόρφωση: το Chrome for Testing δεν δημοσιεύει Chromedriver `win-arm64`, αλλά το Chromedriver `win64` (x64) εκτελείται μέσω της διαφανούς [εξομοίωσης x64](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) των Windows και χειρίζεται τόσο ένα εγκατεστημένο ARM64 Chrome όσο και τον x64 browser του Chrome for Testing που κατεβάζει διαφορετικά το WebdriverIO. Στο **Linux ARM64**, οι εκδόσεις του Chrome παλαιότερες από την `153.0.8001.0` χρειάζονται πιο προσεκτική εξέταση, όπως περιγράφεται παρακάτω.

## Linux ARM64

Το Chrome for Testing δημιουργεί Chromedriver `linux-arm64` από την έκδοση **`153.0.8001.0`** του Chrome και μετά, και το WebdriverIO το χρησιμοποιεί απευθείας. Για παλαιότερο Chrome ή Chromium, όπως ένα που ορίζεται ως `goog:chromeOptions.binary`, κατεβάζει το Chromedriver που συνοδεύει μια [έκδοση του Electron](https://github.com/electron/electron/releases) η οποία αντιστοιχεί στην απαιτούμενη κύρια έκδοση του Chromium. Αυτή η λήψη γίνεται από το GitHub ακόμη και όταν έχει οριστεί το `CHROMEDRIVER_CDNURL`, επειδή το Chrome for Testing δεν διαθέτει Chromedriver `linux-arm64` κάτω από την `153.0.8001.0` ώστε να το εξυπηρετήσει κάποιος mirror· χωρίς σύνδεση στο διαδίκτυο, χρησιμοποιήστε το Chromium και τον οδηγό της διανομής σας όπως φαίνεται [παρακάτω](#no-electron-release-ships-a-matching-chromedriver).

Το Chrome for Testing δεν διαθέτει ούτε builds browser `linux-arm64` πριν από την `153.0.8001.0`, οπότε ορίστε `browserVersion` κάτω από αυτήν μόνο σε συνδυασμό με το `goog:chromeOptions.binary` να δείχνει σε έναν ARM64 browser.

## Εφαρμογές Electron

Το `wdio:electronVersion` κατεβάζει το Chromedriver που συνοδεύει μια συγκεκριμένη έκδοση του Electron, σε κάθε πλατφόρμα ARM64. Για μια εφαρμογή Electron, η υπηρεσία Electron το ορίζει με βάση την έκδοση Electron της εφαρμογής. Δείτε τις [Capabilities](capabilities#wdioelectronversion) για λεπτομέρειες.

## Αντιμετώπιση προβλημάτων

### Καμία έκδοση του Electron δεν περιλαμβάνει αντίστοιχο Chromedriver

Μερικές κύριες εκδόσεις του Chromium, όπως η 145, δεν κυκλοφόρησαν ποτέ σε κάποια έκδοση του Electron. Σε αυτή την περίπτωση, το WebdriverIO αποτυγχάνει αντί να εγκαταστήσει έναν μη αντίστοιχο οδηγό:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

Για να το επιλύσετε:

- **Χρησιμοποιήστε Chrome/Chromium `153.0.8001.0` ή νεότερο** ώστε το Chrome for Testing να παρέχει τον οδηγό απευθείας.
- **Στο Debian, χρησιμοποιήστε το Chromium και τον οδηγό του**, ένα αντίστοιχο ζεύγος arm64:
  ```bash
  sudo apt-get install -y chromium chromium-driver
  ```
  ```ts title="wdio.conf.ts"
  export const config: WebdriverIO.Config = {
      // ...
      capabilities: [{
          browserName: 'chrome',
          'goog:chromeOptions': { binary: '/usr/bin/chromium' },
          'wdio:chromedriverOptions': { binary: '/usr/bin/chromedriver' }
      }]
  }
  ```
- **Χρησιμοποιήστε το δικό σας Chromedriver** με το `wdio:chromedriverOptions.binary`, το οποίο απενεργοποιεί πλήρως τη λήψη.

## Σχετικά

- [Driver Binaries](driverbinaries): πώς το WebdriverIO κατεβάζει και αποθηκεύει προσωρινά τους οδηγούς browser, συμπεριλαμβανομένης της εναλλακτικής λύσης όταν το Chrome for Testing αποτυγχάνει.
- [Capabilities](capabilities#wdioelectronversion): η επιλογή `wdio:electronVersion`.