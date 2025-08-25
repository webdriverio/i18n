---
id: headless-and-xvfb
title: Headless & Xvfb με το Testrunner
description: Πώς το WebdriverIO χρησιμοποιεί το Xvfb για δοκιμές χωρίς γραφικό περιβάλλον σε Linux, επιλογές διαμόρφωσης, συνταγές CI και αντιμετώπιση προβλημάτων.
---

Αυτή η σελίδα εξηγεί πώς το testrunner του WebdriverIO υποστηρίζει την εκτέλεση χωρίς γραφικό περιβάλλον στο Linux χρησιμοποιώντας το Xvfb (X Virtual Framebuffer). Καλύπτει πότε το Xvfb είναι χρήσιμο, πώς να το διαμορφώσετε και πώς συμπεριφέρεται σε CI και Docker.

## Πότε να χρησιμοποιείτε το Xvfb έναντι του εγγενούς headless

- Χρησιμοποιήστε εγγενές headless (π.χ., Chrome `--headless=...`) όταν είναι δυνατόν για ελάχιστη επιβάρυνση.
- Χρησιμοποιήστε το Xvfb όταν:
  - Δοκιμάζετε εφαρμογές Electron ή εφαρμογές που απαιτούν διαχειριστή παραθύρων ή περιβάλλον επιφάνειας εργασίας
  - Βασίζεστε σε συμπεριφορές GLX ή εξαρτώμενες από διαχειριστή παραθύρων
  - Τα εργαλεία σας αναμένουν έναν διακομιστή οθόνης (`DISPLAY`)
  - Αντιμετωπίζετε σφάλματα Chromium όπως:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    Το σφάλμα σύγκρουσης καταλόγου δεδομένων χρήστη μπορεί να είναι παραπλανητικό καθώς συχνά είναι το αποτέλεσμα μιας κατάρρευσης του προγράμματος περιήγησης και άμεσης επανεκκίνησης που επαναχρησιμοποιεί τον ίδιο κατάλογο προφίλ από την προηγούμενη εκτέλεση. Η διασφάλιση σταθερής οθόνης (π.χ., μέσω Xvfb) συχνά το επιλύει - αν όχι, θα πρέπει να περάσετε ένα μοναδικό `--user-data-dir` ανά εργάτη.

## Διαμόρφωση

Τέσσερις επιλογές του runner ελέγχουν τη συμπεριφορά του Xvfb:

- `autoXvfb` (boolean, προεπιλογή: true)
  - Καθοριστικός διακόπτης για τη χρήση. Εάν είναι `false`, ο runner δεν χρησιμοποιεί ποτέ το Xvfb.
  - Εάν είναι `true`, ο runner μπορεί να χρησιμοποιήσει το Xvfb όταν χρειάζεται.

- `xvfbAutoInstall` (boolean, προεπιλογή: false)
  - Ενεργοποιεί την αυτόματη εγκατάσταση του `xvfb-run` εάν λείπει
  - Όταν είναι false, ο runner θα προειδοποιήσει και θα συνεχίσει χωρίς εγκατάσταση

- `xvfbAutoInstallMode` ('root' | 'sudo', προεπιλογή: 'sudo')
  - 'root': εγκατάσταση μόνο εάν εκτελείται ως root (χωρίς sudo)
  - 'sudo': επιτρέπει μη διαδραστικό sudo (`sudo -n`) εάν δεν είναι root· παραλείπει εάν λείπει το sudo

- `xvfbAutoInstallCommand` (string | string[], προαιρετικό)
  - Προσαρμοσμένη εντολή για χρήση στην εγκατάσταση αντί της ενσωματωμένης ανίχνευσης διαχειριστή πακέτων
  - Όταν παρέχεται, αυτή η εντολή εκτελείται ως έχει και παρακάμπτει την ενσωματωμένη λογική εγκατάστασης

- `xvfbMaxRetries` (αριθμός, προεπιλογή: 3)
  - Αριθμός προσπαθειών επανάληψης για αποτυχίες διεργασίας xvfb.
  - Χρήσιμο για ασταθή περιβάλλοντα CI όπου η εκκίνηση του Xvfb μπορεί περιστασιακά να αποτύχει.

- `xvfbRetryDelay` (αριθμός, προεπιλογή: 1000)
  - Βασική καθυστέρηση μεταξύ επαναλήψεων σε χιλιοστά δευτερολέπτου για αποτυχίες διεργασίας xvfb.
  - Χρησιμοποιεί προοδευτική καθυστέρηση: καθυστέρηση × αριθμός προσπάθειας (π.χ., 1000ms, 2000ms, 3000ms, κλπ.).

Παραδείγματα:

```ts
export const config: WebdriverIO.Config = {
  // Χρήση Xvfb όταν χρειάζεται
  autoXvfb: true,

  // Αυτόματη εγκατάσταση πακέτων Xvfb χρησιμοποιώντας sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Χρήση Xvfb όταν χρειάζεται
  autoXvfb: true,

  // Αυτόματη εγκατάσταση πακέτων Xvfb χρησιμοποιώντας μια προσαρμοσμένη εντολή και sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Χρήση Xvfb όταν χρειάζεται
  autoXvfb: true,

  // Αυτόματη εγκατάσταση πακέτων Xvfb χρησιμοποιώντας sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Διαμόρφωση συμπεριφοράς επανάληψης για ασταθή περιβάλλοντα CI
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Λογική ανίχνευσης

- Ο runner εξετάζει τη χρήση του Xvfb όταν:

  - Εκτελείται σε Linux
  - Δεν έχει οριστεί `DISPLAY` (περιβάλλον χωρίς γραφικά), ή έχουν περαστεί σημαίες headless προγράμματος περιήγησης

- Αν έχει οριστεί το `DISPLAY`, ο runner δεν θα επιβάλει το Xvfb από προεπιλογή και θα σεβαστεί τον υπάρχοντα διακομιστή X/διαχειριστή παραθύρων.

Σημειώσεις:
- Το `autoXvfb: false` απενεργοποιεί εντελώς τη χρήση του Xvfb (χωρίς περιτύλιξη με `xvfb-run`).
- Το `xvfbAutoInstall` επηρεάζει μόνο την εγκατάσταση εάν λείπει το `xvfb-run`· δεν ενεργοποιεί/απενεργοποιεί τη χρήση.
- Το `xvfbAutoInstallMode` ελέγχει τη μέθοδο εγκατάστασης: 'root' για εγκαταστάσεις μόνο ως root, 'sudo' για εγκαταστάσεις με sudo (προεπιλογή: 'sudo').
- Οι ενσωματωμένες εγκαταστάσεις πακέτων είναι πάντα μη διαδραστικές. Μόνο ως root εκτός αν επιλέξετε τη λειτουργία 'sudo'.
- Ο μηχανισμός επανάληψης χρησιμοποιεί προοδευτικές καθυστερήσεις: `xvfbRetryDelay × αριθμός προσπάθειας` (π.χ., 1000ms, 2000ms, 3000ms, κλπ.).

## Χρήση υπάρχοντος DISPLAY σε CI

Εάν το CI σας ρυθμίζει το δικό του διακομιστή X/διαχειριστή παραθύρων (π.χ., με `Xvfb :99` και ένα WM), είτε:

- Αφήστε το `autoXvfb: true` και βεβαιωθείτε ότι έχει εξαχθεί το `DISPLAY`· ο runner θα το σεβαστεί και θα αποφύγει την περιτύλιξη.
- Είτε ορίστε `autoXvfb: false` για να απενεργοποιήσετε ρητά οποιαδήποτε συμπεριφορά Xvfb από τον runner.

## Συνταγές για CI και Docker

GitHub Actions (χρησιμοποιώντας εγγενές headless):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (εικονική οθόνη μέσω Xvfb εάν λείπει και έχει επιλεγεί):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (παράδειγμα Ubuntu/Debian – προεγκατάσταση xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Για άλλες διανομές, προσαρμόστε τον διαχειριστή πακέτων και το όνομα του πακέτου αναλόγως (π.χ., `dnf install xorg-x11-server-Xvfb` σε Fedora/RHEL-based, `zypper install xvfb-run` σε openSUSE/SLE).

## Υποστήριξη αυτόματης εγκατάστασης (xvfbAutoInstall)

Όταν το `xvfbAutoInstall` είναι ενεργοποιημένο, το WebdriverIO προσπαθεί να εγκαταστήσει το `xvfb` χρησιμοποιώντας τον διαχειριστή πακέτων του συστήματός σας. Υποστηρίζονται οι ακόλουθοι διαχειριστές και πακέτα:

| Διαχειριστής πακέτων | Εντολή          | Διανομές (παραδείγματα)                                     | Όνομα(τα) πακέτου                |
|----------------------|-----------------|--------------------------------------------------------------|-----------------------------------|
| apt                  | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, κλπ.       | `xvfb`                           |
| dnf                  | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, κλπ.        | `xorg-x11-server-Xvfb`           |
| yum                  | `yum`           | CentOS, RHEL (παλαιότερα)                                    | `xorg-x11-server-Xvfb`           |
| zypper               | `zypper`        | openSUSE, SUSE Linux Enterprise                              | `xvfb-run`                       |
| pacman               | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, κλπ.              | `xorg-server-xvfb`               |
| apk                  | `apk`           | Alpine Linux, PostmarketOS                                   | `xvfb-run`                       |
| xbps-install         | `xbps-install`  | Void Linux                                                   | `xvfb`                           |

Σημειώσεις:
- Εάν το περιβάλλον σας χρησιμοποιεί διαφορετικό διαχειριστή πακέτων, η εγκατάσταση θα αποτύχει με σφάλμα· εγκαταστήστε χειροκίνητα το `xvfb`.
- Τα ονόματα πακέτων είναι ειδικά για τη διανομή· ο πίνακας αντικατοπτρίζει τα κοινά ονόματα ανά οικογένεια.

## Αντιμετώπιση προβλημάτων

- "xvfb-run failed to start"
  - Ο runner επαναλαμβάνει αυτόματα τις αποτυχίες που σχετίζονται με το Xvfb με προοδευτική καθυστέρηση. Εάν οι αποτυχίες επιμένουν, αυξήστε το `xvfbMaxRetries` και το `xvfbRetryDelay` για ασταθή περιβάλλοντα.

- Το Xvfb τυλίγεται απροσδόκητα στο CI
  - Εάν έχετε προσαρμοσμένη ρύθμιση `DISPLAY` / WM, ορίστε `autoXvfb: false` ή βεβαιωθείτε ότι το `DISPLAY` έχει εξαχθεί πριν ξεκινήσει ο runner.

- Λείπει το `xvfb-run`
  - Διατηρήστε το `xvfbAutoInstall: false` για να αποφύγετε την τροποποίηση του περιβάλλοντος· εγκαταστήστε μέσω της βασικής εικόνας σας ή ορίστε `xvfbAutoInstall: true` για να συμμετάσχετε.

- Συχνές αποτυχίες εκκίνησης του Xvfb στο CI
  - Αυξήστε το `xvfbMaxRetries` (π.χ., σε 5-10) και το `xvfbRetryDelay` (π.χ., σε 2000ms) για πιο ανθεκτική συμπεριφορά σε ασταθή περιβάλλοντα.

## Προχωρημένα

- Ο runner δημιουργεί διεργασίες μέσω ενός εργοστασίου που τυλίγει τον εργάτη node με `xvfb-run` εάν το Xvfb χρειάζεται και είναι διαθέσιμο.
- Οι σημαίες προγράμματος περιήγησης headless (Chrome/Edge/Firefox) σηματοδοτούν τη χρήση headless και μπορούν να ενεργοποιήσουν το Xvfb σε περιβάλλοντα χωρίς `DISPLAY`.