---
id: headless-and-display-servers
title: Headless λειτουργία & Διακομιστές Οθόνης
description: Εκτελέστε headed browsers και εφαρμογές επιφάνειας εργασίας σε Linux CI και σε containers με την εικονική οθόνη Weston ή Xvfb που εκκινεί ο testrunner, συμπεριλαμβανομένων των επιλογών της, συνταγών για CI και αντιμετώπισης προβλημάτων.
---

Σε Linux, όταν δεν υπάρχει διαθέσιμη οθόνη, ο testrunner εκκινεί έναν εικονικό διακομιστή οθόνης για την εκτέλεση: τον [Weston](https://gitlab.freedesktop.org/wayland/weston) σε headless λειτουργία ή, εναλλακτικά, τον [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer). Αυτή η σελίδα εξηγεί πότε συμβαίνει αυτό, πώς να το ρυθμίσετε και πώς συμπεριφέρεται σε CI και Docker. Στις περισσότερες περιπτώσεις, το μόνο που χρειάζεστε είναι να έχετε εγκατεστημένο τον Weston ή τον Xvfb στο image σας ή να ορίσετε `displayServerAutoInstall: true` στη ρύθμισή σας.

## Πότε να χρησιμοποιείτε εικονική οθόνη και πότε native headless

Η εικονική οθόνη παρέχει στους browsers και στις εφαρμογές μια οθόνη εκεί όπου δεν υπάρχει, όπως σε CI runners και σε containers. Διατηρήστε τη όταν:

- Ελέγχετε εφαρμογές επιφάνειας εργασίας, οι οποίες χρειάζονται πραγματικό παράθυρο.
- Τα τεστ σας χρειάζονται headed browser, για παράδειγμα για να ταιριάζουν με baselines στιγμιοτύπων οθόνης που λήφθηκαν με ορατό browser.
- Ο Chrome αποτυγχάνει να ξεκινήσει με `DevToolsActivePort file doesn't exist` ή `user data directory is already in use`, όπως περιγράφεται στην [Αντιμετώπιση προβλημάτων](#troubleshooting).

Για τεστ browser που δεν χρειάζονται ορατό παράθυρο, η native headless λειτουργία, όπως το `--headless=new` του Chrome, έχει μικρότερη επιβάρυνση. Ορίστε μαζί της `displayServerEnabled: false`, αλλιώς ο testrunner θα εκκινήσει παρ' όλα αυτά έναν διακομιστή οθόνης. Κάντε το ίδιο όταν όλοι οι browsers σας εκτελούνται σε υπηρεσία cloud ή σε απομακρυσμένο grid, καθώς τίποτα τοπικό δεν χρειάζεται οθόνη.

## Πώς λειτουργεί

Ο testrunner εκκινεί έναν διακομιστή οθόνης πριν από το hook `onPrepare` οποιασδήποτε υπηρεσίας και ορίζει το περιβάλλον του στο `process.env`:

| Μεταβλητή | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | δεν ορίζεται |
| `DISPLAY` | δεν ορίζεται | η πρώτη ελεύθερη οθόνη, όπως `:0` |
| `XDG_RUNTIME_DIR` | ένας ιδιωτικός κατάλογος κάτω από το `/tmp` για την εκτέλεση | αμετάβλητη |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

Οι workers κληρονομούν αυτές τις μεταβλητές, όπως και οι drivers και οι εφαρμογές που εκκινούν οι υπηρεσίες στο `onPrepare`. Οι browsers και τα GUI toolkits επιλέγουν Wayland ή X11 βάσει αυτών. Με τον Weston, το ιδιωτικό `XDG_RUNTIME_DIR` αντικαθιστά οποιαδήποτε τιμή είχατε για την εκτέλεση.

Ο διακομιστής οθόνης συνεχίζει να εκτελείται μέχρι να ολοκληρωθούν τα hooks `onComplete`, ώστε οι υπηρεσίες να μπορούν να τον χρησιμοποιούν ακόμα κατά τον τερματισμό τους. Στη συνέχεια ο testrunner τον σταματά και επαναφέρει τις προηγούμενες τιμές. Αν η διεργασία τερματιστεί νωρίτερα, ακόμα και με Ctrl+C, ο διακομιστής οθόνης τερματίζεται μαζί της.

Ο testrunner εκκινεί διακομιστή οθόνης μόνο όταν ισχύουν όλα τα παρακάτω:

- Εκτελείται σε Linux.
- Δεν έχει οριστεί ούτε το `DISPLAY` ούτε το `WAYLAND_DISPLAY`.
- Το `displayServerEnabled` δεν είναι `false`.

Αν υπάρχει ήδη οθόνη, ο testrunner τη χρησιμοποιεί και δεν εκκινεί τίποτα. Όταν έχει οριστεί μόνο το `WAYLAND_DISPLAY`, για παράδειγμα από έναν Weston που εκκινεί το CI σας, ο testrunner εξακολουθεί να ορίζει τα `XDG_SESSION_TYPE`, `GDK_BACKEND` και `ELECTRON_OZONE_PLATFORM_HINT` σε `wayland` για την εκτέλεση. Αυτό εξασφαλίζει ότι οι browsers χρησιμοποιούν τη σωστή οθόνη, παρακάμπτοντας κληρονομημένες τιμές, όπως το `XDG_SESSION_TYPE=tty` από μια σύνδεση SSH, που θα τους έστελναν στο X11, όπου δεν υπάρχει διακομιστής. Το κάνει αυτό ακόμα και με `displayServerEnabled: false`, το οποίο ελέγχει μόνο αν θα εκκινηθεί διακομιστής οθόνης.

### Ποιος διακομιστής οθόνης χρησιμοποιείται

Με την προεπιλογή `displayServer: 'auto'`, ο testrunner δοκιμάζει πρώτα τον Weston και δεύτερο τον Xvfb. Οι εγκατεστημένοι διακομιστές δοκιμάζονται πριν εγκατασταθεί οτιδήποτε, οπότε ένας υπάρχων Xvfb χρησιμοποιείται αντί να εγκατασταθεί ο Weston. Αν ο Weston αποτύχει να ξεκινήσει, ο testrunner καταφεύγει στον Xvfb. Αν δεν ξεκινήσει κανένας διακομιστής οθόνης, ο testrunner καταγράφει μια προειδοποίηση και η εκτέλεση συνεχίζεται χωρίς αυτόν. Με `displayServer: 'wayland'` ή `displayServer: 'xvfb'`, ο testrunner δοκιμάζει μόνο τον συγκεκριμένο διακομιστή.

Υποστηρίζονται οι εκδόσεις Weston 10 και νεότερες. Τα Ubuntu 22.04 και Debian 11 διαθέτουν Weston 9, ενώ το Enterprise Linux 9 με ενεργοποιημένο EPEL λαμβάνει Weston 8, οπότε ορίστε εκεί `displayServer: 'xvfb'`. Ο Weston ξεκινά χωρίς Xwayland, επομένως δεν παρέχει `DISPLAY`. Αν τα τεστ ή τα εργαλεία σας χρειάζονται X11, για παράδειγμα `xdotool`, `xclip` ή μια εφαρμογή Java, ορίστε `displayServer: 'xvfb'`.

### Εστίαση παραθύρου

Όλοι οι workers χρησιμοποιούν την ίδια οθόνη. Στο WebdriverIO v9, κάθε worker εκτελούνταν μέσα σε `xvfb-run` και είχε τη δική του οθόνη, οπότε ο browser του είχε πάντα την εστίαση. Οι browsers που βασίζονται στο Chromium, όπως ο Chrome και ο Edge, μπορεί πλέον να μην έχουν εστίαση: με τον Weston κανένα παράθυρο δεν λαμβάνει εστίαση, ενώ με τον Xvfb την έχει μόνο το πιο πρόσφατα ανοιγμένο παράθυρο. Η είσοδος WebDriver εξακολουθεί να φτάνει στη σελίδα, αλλά το `document.hasFocus()` επιστρέφει `false`, τα συμβάντα `focus` δεν ενεργοποιούνται και τα στυλ `:focus` δεν εφαρμόζονται. Αν τα τεστ σας εξαρτώνται από την εστίαση, ενεργοποιήστε την εξομοίωση εστίασης, μια πειραματική εντολή του Chrome DevTools Protocol (CDP) που διατηρείται μεταξύ φορτώσεων σελίδας:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

Ο Firefox δεν επηρεάζεται, καθώς υπό WebDriver θεωρεί τις σελίδες του εστιασμένες.

### Αυτόνομα scripts

Ο testrunner εκκινεί μόνος του τον διακομιστή οθόνης. Ένα αυτόνομο script που καλεί το `remote()` μπορεί να εκκινήσει έναν με το `startDisplayDaemonFromConfig` από το `@wdio/display-server`. Δέχεται τις ίδιες επιλογές `displayServer*`, ορίζει τις μεταβλητές της οθόνης στο `process.env` ώστε να τις κληρονομήσει ο browser και τις επαναφέρει στο `stop()`:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// null εκτός Linux, όταν υπάρχει ήδη οθόνη X11 ή όταν δεν ξεκινά καμία. Με υπάρχουσα
// οθόνη Wayland, επιστρέφει ένα handle του οποίου το stop() επαναφέρει τις μεταβλητές συνεδρίας που όρισε.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

Μπορείτε επίσης να εκτελέσετε το script μέσα σε `xvfb-run`, όπως στην ενότητα [Χρήση υπάρχουσας οθόνης](#using-an-existing-display).

## Ρύθμιση browser

### Browsers που εκκινεί το WebdriverIO

Αυτοί οι browsers δεν χρειάζονται καμία ρύθμιση:

- Οι Chrome και Edge 140 και νεότεροι, καθώς και ο Chrome for Testing 135 και νεότερος, ακολουθούν το `XDG_SESSION_TYPE=wayland` που ορίζει ο διακομιστής οθόνης.
- Οι παλαιότεροι Chrome και Edge αγνοούν το `XDG_SESSION_TYPE`. Για αυτούς, το WebdriverIO προσθέτει το `--ozone-platform=wayland` στα args κάθε Chrome και Edge που εκκινεί όσο το Wayland είναι ενεργό χωρίς X server, εκτός αν τα args ορίζουν ήδη `--ozone-platform` ή `--headless`.
- Εφαρμογές Electron: το Electron 38 και νεότερο ακολουθεί το `XDG_SESSION_TYPE`, ενώ τα Electron 28 έως 37 ακολουθούν το `ELECTRON_OZONE_PLATFORM_HINT`, το οποίο ορίζει επίσης ο διακομιστής οθόνης. Το Electron 27 και παλαιότερο βασίζεται στη σημαία `--ozone-platform=wayland`, την οποία προσθέτει το WebdriverIO όταν εκκινεί την εφαρμογή μέσω Chromedriver.
- Ο Firefox και οι εφαρμογές GTK, όπως οι εφαρμογές Tauri, επιλέγουν Wayland βάσει των `WAYLAND_DISPLAY` και `GDK_BACKEND`. Ο Firefox πριν την έκδοση 120 δεν έχει δοκιμαστεί.

### Browsers που δεν εκκινεί το WebdriverIO

Οι browsers σε grid ή υπηρεσία cloud δεν χρειάζονται ρύθμιση, καθώς εκτελούνται στην οθόνη του απομακρυσμένου host.

Οι τοπικοί browsers που εκκινούνται από κάτι άλλο, όπως έναν driver που ξεκινήσατε εσείς, έναν Appium server ή τον δικό launcher μιας υπηρεσίας, δεν λαμβάνουν τη σημαία `--ozone-platform=wayland` του WebdriverIO. Οι Chrome και Edge 140 και νεότεροι, καθώς και το Electron 28 και νεότερο, δεν τη χρειάζονται, καθώς ακολουθούν τις μεταβλητές συνεδρίας, αλλά οι παλαιότεροι Chrome και Edge τη χρειάζονται. Τι πρέπει να κάνετε εξαρτάται από το πότε ξεκινά ο browser:

- **Κατά την εκτέλεση**, για παράδειγμα από το `onPrepare` μιας υπηρεσίας, οι νεότεροι browsers δεν χρειάζονται τίποτα, καθώς κληρονομούν την οθόνη και τις μεταβλητές συνεδρίας. Για παλαιότερους Chrome και Edge, είτε:
  - ορίστε `displayServer: 'xvfb'` για να χρησιμοποιήσετε τον Xvfb, είτε
  - ορίστε `displayServer: 'wayland'` και προσθέστε `--ozone-platform=wayland` στα args τους για να χρησιμοποιήσετε τον Weston.
- **Πριν από το WebdriverIO**, για παράδειγμα από ένα προηγούμενο βήμα CI ή άλλο shell, δεν μπορούν να χρησιμοποιήσουν διακομιστή οθόνης που εκκινεί το WebdriverIO, καθώς δεν κληρονομούν τις μεταβλητές του. Εκκινήστε την οθόνη μόνοι σας, όπως στην ενότητα [Χρήση υπάρχουσας οθόνης](#using-an-existing-display), και είτε:
  - χρησιμοποιήστε τον Xvfb, που δεν χρειάζεται τίποτα περισσότερο, είτε
  - χρησιμοποιήστε τον Weston, και στη συνέχεια κάντε export το `XDG_SESSION_TYPE=wayland` (Chrome και Edge 140 και νεότεροι, Electron 38 και νεότερο) ή το `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron 28 έως 37), και προσθέστε `--ozone-platform=wayland` στα args των παλαιότερων Chrome και Edge.

## Ρύθμιση

Όλες οι επιλογές παρατίθενται στην [αναφορά ρυθμίσεων](/docs/configuration#displayserverenabled). Για παράδειγμα:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Εγκατάσταση διακομιστή οθόνης αν δεν υπάρχει εγκατεστημένος
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Πάντα χρήση Xvfb σε μικρότερο μέγεθος, εγκατεστημένου με προσαρμοσμένη εντολή που προϋποθέτει container με δικαιώματα root
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

Η προσαρμοσμένη εντολή είναι κοινή και για τους δύο διακομιστές. Με `displayServer: 'auto'`, εκτελείται πρώτα για τον Weston, και ξανά για τον Xvfb μόνο αν ο Weston εξακολουθεί να μην είναι διαθέσιμος ή αποτυγχάνει να ξεκινήσει και ο Xvfb εξακολουθεί να λείπει. Ορίστε το `displayServer` στον διακομιστή που εγκαθιστά η εντολή σας, όπως κάνει αυτό το παράδειγμα.

Οι επιλογές `autoXvfb` και `xvfb*` της v9 έχουν καταργηθεί (deprecated) και θα αφαιρεθούν στη v11. Δείτε τον [οδηγό μετάβασης στη v10](/docs/v10-migration#virtual-displays-on-linux) για τις αντικαταστάσεις τους.

## CI και Docker

Προεγκαταστήστε έναν διακομιστή οθόνης στο image σας ή ορίστε `displayServerAutoInstall: true` ώστε να εγκατασταθεί κατά την έναρξη της εκτέλεσης.

### Προεγκατάσταση διακομιστή οθόνης

#### Weston

Σε Ubuntu 24.04 ή Debian 12 και νεότερα:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

Σε RHEL 10 και Oracle Linux 10, ενεργοποιήστε μόνοι σας τα EPEL και CodeReady Builder, ακολουθώντας την [τεκμηρίωση του EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/), και στη συνέχεια εγκαταστήστε το `weston`.

Για να εκτελέσετε τον testrunner μέσα σε δικό σας Weston, όπως στην ενότητα [Χρήση υπάρχουσας οθόνης](#using-an-existing-display), εγκαταστήστε επίσης το `xwayland-run`. Διατίθεται ως πακέτο για Debian 13, Ubuntu 24.04, Fedora και openSUSE Tumbleweed. Χωρίς αυτό, πρέπει να εκκινήσετε τον Weston στο παρασκήνιο με δικά του `XDG_RUNTIME_DIR` και `WAYLAND_DISPLAY`, και να περιμένετε το socket του πριν εκκινήσετε το WebdriverIO. Εναλλακτικά, χρησιμοποιήστε τον Xvfb.

#### Xvfb

Σε Ubuntu ή Debian:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Τα Ubuntu 22.04 και Debian 11 διαθέτουν πολύ παλιό Weston, οπότε χρησιμοποιήστε εκεί τον Xvfb. Όταν είναι εγκατεστημένος μόνο ο Xvfb, ο testrunner τον χρησιμοποιεί χωρίς περαιτέρω ρύθμιση.

Για άλλες διανομές, χρησιμοποιήστε τα ονόματα πακέτων της ενότητας [Υποστήριξη αυτόματης εγκατάστασης](#automatic-installation-support).

### Χρήση υπάρχουσας οθόνης

Αν το CI σας παρέχει ήδη οθόνη, ο testrunner τη χρησιμοποιεί και δεν εκκινεί τίποτα.

Για να χρησιμοποιήσετε τον Weston, εκτελέστε τον testrunner μέσω του `wlheadless-run` από το πακέτο `xwayland-run`. Δίνει στον Weston έναν ιδιωτικό κατάλογο runtime και περιμένει το socket του, ενώ οι σημαίες ταιριάζουν με τον Weston που εκκινεί ο testrunner:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Για να χρησιμοποιήσετε τον Xvfb, εκτελέστε τον testrunner μέσω του `xvfb-run`:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## Υποστήριξη αυτόματης εγκατάστασης

Το `displayServerAutoInstall` λειτουργεί με τους παρακάτω διαχειριστές πακέτων. Οι εγκαταστάσεις είναι μη διαδραστικές και λήγουν μετά από 240 δευτερόλεπτα. Με οποιονδήποτε άλλο διαχειριστή πακέτων, εγκαταστήστε μόνοι σας τον διακομιστή οθόνης.

| Διαχειριστής πακέτων | Διανομές | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- Σε Arch Linux, η εγκατάσταση εκτελεί `pacman -Syu`, μια πλήρη αναβάθμιση συστήματος, καθώς το Arch δεν υποστηρίζει μερικές αναβαθμίσεις. Σε ένα παρωχημένο image αυτό μπορεί να υπερβεί το όριο των 240 δευτερολέπτων, οπότε προεγκαταστήστε εκεί τον διακομιστή οθόνης.
- Το Enterprise Linux 10 δεν διαθέτει Xvfb και παρέχει τον Weston μόνο στο EPEL, το οποίο χρειάζεται το CRB. Σε CentOS Stream, AlmaLinux και Rocky Linux, η εγκατάσταση ενεργοποιεί και τα δύο και τα αφήνει ενεργοποιημένα. Σε RHEL και Oracle Linux, ρυθμίστε τα μόνοι σας, όπως στην ενότητα [Προεγκατάσταση διακομιστή οθόνης](#preinstalling-a-display-server).

## Logs

Ο διακομιστής οθόνης εκτελείται στη διεργασία του launcher, οπότε τα μηνύματά του βρίσκονται στο log του launcher: στο `wdio.log` μέσα στο `outputDir` σας ή στο τερματικό αν δεν έχει οριστεί `outputDir`. Το log δείχνει ποιος διακομιστής οθόνης ξεκίνησε και τις μεταβλητές που όρισε. Για περισσότερες λεπτομέρειες, αυξήστε το επίπεδο καταγραφής του:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## Αντιμετώπιση προβλημάτων

### Ο Chrome αποτυγχάνει με `DevToolsActivePort file doesn't exist`

Το πλήρες μήνυμα είναι `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. Μια συνηθισμένη αιτία είναι ένας headed Chrome χωρίς οθόνη στην οποία να ανοίξει το παράθυρό του. Ελέγξτε το [log του launcher](#logs) για τον διακομιστή οθόνης που ξεκίνησε. Αν δεν ξεκίνησε κανένας, δείτε την ενότητα [Το log του launcher εμφανίζει `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). Αν τα τεστ σας δεν χρειάζονται ορατό παράθυρο, χρησιμοποιήστε αντί αυτού native headless λειτουργία, όπως στην ενότητα [Πότε να χρησιμοποιείτε εικονική οθόνη και πότε native headless](#when-to-use-a-virtual-display-vs-native-headless).

### Ο Chrome αποτυγχάνει με `user data directory is already in use`

Το πλήρες μήνυμα ξεκινά με `session not created: probably user data directory is already in use`. Συχνά είναι παραπλανητικό: συνήθως σημαίνει ότι ο browser κατέρρευσε και επανεκκινήθηκε με τον κατάλογο προφίλ της προηγούμενης παρουσίας. Μια σταθερή οθόνη συχνά το επιλύει. Αν όχι, περάστε ένα μοναδικό `--user-data-dir` ανά worker.

### Το log του launcher εμφανίζει `No display server could be started`

Το πλήρες μήνυμα είναι `No display server could be started; continuing without a virtual display`. Δεν είναι εγκατεστημένος κανένας διακομιστής οθόνης ή δεν ξεκίνησε κανένας. Τα μηνύματα που προηγούνται εξηγούν τον λόγο:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` ή `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: δεν είναι εγκατεστημένο τίποτα και η αυτόματη εγκατάσταση είναι απενεργοποιημένη.
- `wayland failed to start: ...` ή `xvfb failed to start: ...`: ακολουθεί η έξοδος σφάλματος του διακομιστή.
- `Failed to install Weston` ή `Failed to install Xvfb`: η εγκατάσταση απέτυχε.
- `wayland still not found after installing` ή `xvfb still not found after installing`: η εγκατάσταση πέτυχε αλλά δεν παρείχε αυτόν τον διακομιστή, για παράδειγμα επειδή ένα προσαρμοσμένο `displayServerAutoInstallCommand` εγκαθιστά μόνο τον άλλον. Ορίστε το `displayServer` στον διακομιστή που εγκαθιστά η εντολή σας.

Εγκαταστήστε τον Weston ή τον Xvfb στο image σας ή ορίστε `displayServerAutoInstall: true`.

### Ο Xvfb τερματίζει με `Failed to find a socket to listen on`

Ο Xvfb δημιουργεί το socket του στο `/tmp/.X11-unix`. Αν αυτός ο κατάλογος υπάρχει, πρέπει να είναι εγγράψιμος από τον χρήστη των τεστ, όπως είναι με τα δικαιώματα `1777`.

### Ο Chrome ή το Electron αποτυγχάνει υπό Weston με `Missing X server or $DISPLAY`

Ο browser δοκίμασε X11 αντί για Wayland. Αν δεν τον εκκίνησε το WebdriverIO, δείτε την ενότητα [Browsers που δεν εκκινεί το WebdriverIO](#browsers-webdriverio-doesnt-launch). Διαφορετικά, αφαιρέστε το `--ozone-platform=x11` από τα args του.

### Τα τεστ που εξαρτώνται από την εστίαση αποτυγχάνουν σε Chrome ή Edge

Το `document.hasFocus()` επιστρέφει `false` επειδή οι σελίδες στην κοινόχρηστη οθόνη μπορεί να μην έχουν εστίαση. Ενεργοποιήστε την εξομοίωση εστίασης, όπως στην ενότητα [Εστίαση παραθύρου](#window-focus).

### Ένα εργαλείο ή μια εφαρμογή X11 αποτυγχάνει υπό Weston με `cannot open display` ή `Can't open display`

Ο Weston δεν παρέχει `DISPLAY`. Ορίστε `displayServer: 'xvfb'` ώστε ο testrunner να εκκινήσει αντί αυτού τον Xvfb. Αν εκκινήσατε μόνοι σας τον Weston, εκτελέστε την εκτέλεση μέσω `xvfb-run`, καθώς ο testrunner χρησιμοποιεί μια υπάρχουσα οθόνη αντί να εκκινήσει νέα.

## Επόμενα βήματα

- Αναφορά [Ρυθμίσεων](/docs/configuration#displayserverenabled) για κάθε επιλογή `displayServer*`.
- [Οδηγός μετάβασης στη v10](/docs/v10-migration#virtual-displays-on-linux) για τις αντικαταστάσεις των επιλογών `autoXvfb` και `xvfb*` της v9.
- [Docker](/docs/docker) και [GitHub Actions](/docs/githubactions) για να εκτελέσετε τη σουίτα σας σε CI.
- [Εφαρμογές επιφάνειας εργασίας](/docs/platforms/desktop#linux) για Electron, Tauri και Dioxus σε Linux.