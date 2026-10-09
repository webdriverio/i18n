---
id: targets
title: Στόχοι συνεδρίας
description: Ανοίξτε έναν browser, μια εφαρμογή κινητού, μια εφαρμογή desktop, μια εφαρμογή Electron ή μια συσκευή στο cloud με το wdio session.
---

Το `wdio session open` ξεκινά τη συνεδρία. Το πρώτο όρισμα είναι ο στόχος. Επαναχρησιμοποιήστε τη συνεδρία `default`. Περάστε `-s <name>` μόνο όταν χρειάζεστε δύο συνεδρίες ταυτόχρονα. Εκτελέστε πρώτα `npx wdio session doctor <target>` όταν ο στόχος χρειάζεται Appium, driver για desktop ή διαπιστευτήρια cloud.

Οι players για Chrome, Android και Electron χειρίζονται την ίδια [εφαρμογή επίδειξης του WebdriverIO](https://github.com/webdriverio/native-demo-app) (το Expo guinea pig, tag `v2.2.0`). Το Chrome και το Electron χρησιμοποιούν έναν τοπικό Expo web server σε ένα κανονικό παράθυρο desktop. Το Android εγκαθιστά το [apk της έκδοσης v2.2.0](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). Το iOS εγκαθιστά την εφαρμογή simulator v2.2.0 (`org.wdiodemoapp`) και χρησιμοποιεί `touchId`. Κάθε player πληκτρολογεί την εντολή και έπειτα το παράθυρο δείχνει το αποτέλεσμα. Κάντε παύση ή μεταβείτε στην προηγούμενη ή την επόμενη εντολή για να διαβάσετε τη γραμμή που άλλαξε το παράθυρο.

Η κοινή διαδρομή είναι: ανοίξτε την εφαρμογή, συνδεθείτε ως `alice@webdriver.io` / `supersecret`, φτάστε στο λογότυπο του ρομπότ («You found me!!!») και έπειτα ολοκληρώστε το παζλ των 9 κομματιών. Το Chrome και το Electron επίσης ορίζουν μια τοποθεσία και ένα νυχτερινό ρολόι στην προβολή Weather, ανοίγουν το ενσωματωμένο WebView της αρχικής σελίδας του WebdriverIO και σέρνουν το carousel. Ο player του Android κάνει κύλιση στη native οθόνη swipe μέχρι εκείνο το ρομπότ. Το `export` γράφει ένα Mocha spec της συνεδρίας που μόλις χειριστήκατε.

<a id="postcard"></a>

## Browsers

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Το Chrome ανοίγει σε headless λειτουργία. Προσθέστε `--headed` για να εμφανιστεί το παράθυρο. Τα Chrome, Firefox και Edge κατεβαίνουν στην πρώτη χρήση όταν δεν είναι εγκατεστημένα. Το Safari απαιτεί macOS.

### User agent σε headless λειτουργία

Τα headless Chrome και Edge αυτοπροσδιορίζονται ως `HeadlessChrome/<version>` στο user agent. Ένα ορατό παράθυρο του ίδιου browser στέλνει `Chrome/<version>`. Πολλοί ιστότοποι απορρίπτουν αιτήματα με το headless token: το Akamai απαντά «Access Denied» και το Cloudflare εμφανίζει «Just a moment...». Αποφασίζουν με βάση το αίτημα, πριν εκτελεστεί οποιοδήποτε script της σελίδας. Ένας agent θα έβλεπε τότε μια σελίδα αποκλεισμού που ένας άνθρωπος που ανοίγει τον ίδιο ιστότοπο δεν βλέπει ποτέ.

Μια headless συνεδρία Chrome ή Edge στέλνει επομένως το user agent που θα έστελνε ένα ορατό παράθυρο του ίδιου browser. Αυτό αλλάζει μόνο το token. Δεν κρύβει τον αυτοματισμό:

- Το `navigator.webdriver` παραμένει `true`.
- Οι δικοί σημάνσεις του chromedriver εξακολουθούν να υπάρχουν στη σελίδα.
- Οι ιστότοποι που ελέγχουν για αυτοματισμό εξακολουθούν να τον εντοπίζουν.

Όσο το user agent είναι παρακαμφθεί, το Chrome δεν στέλνει user agent client hints, οπότε το `navigator.userAgentData.brands` είναι κενό. Η παράκαμψη χρειάζεται WebDriver BiDi, επομένως μια συνεδρία που ανοίγει με `--no-bidi` διατηρεί το headless user agent.

Για να στείλετε ένα συγκεκριμένο user agent, περάστε το ως όρισμα του browser. Η συνεδρία τότε αφήνει το user agent ανέγγιχτο:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

Αν ένας ιστότοπος εξακολουθεί να εμφανίζει έλεγχο για bot, δοκιμάστε ένα ορατό παράθυρο με `--headed`. Αν μπλοκάρεται κι αυτό, ο ιστότοπος δεν επιτρέπει αυτοματοποιημένους browsers. Αναφέρετέ το αντί να προσπαθείτε να παρακάμψετε τον έλεγχο.

Ένα headed παράθυρο Chrome διατηρεί τη γραμμή καρτελών και τη γραμμή διευθύνσεων, κι έτσι το ξεχωρίζετε από ένα παράθυρο Electron. Το `--viewport 1280x800` είναι μια κανονική σελίδα browser. Στο web η εφαρμογή χρησιμοποιεί μια αριστερή πλαϊνή μπάρα. Το λογότυπο του WebdriverIO βρίσκεται στην κορυφή αυτής της πλαϊνής μπάρας. Τα στοιχεία είναι Home, Weather, Web, Login, Forms, Swipe, Drag, Perms και Data. Η αρχική οθόνη απαριθμεί browser και desktop δίπλα σε iOS και Android.

Το Weather διαβάζει το `navigator.geolocation` και το `Date`. Το `geolocation 35.6762 139.6503` είναι το Τόκιο. Εφαρμόζεται στην επόμενη φόρτωση, οπότε εκτελέστε `reload` πριν από το `click "aria/Weather"`. Το widget τότε δείχνει Τόκιο, 21° και βροχή. Το `emulate clock 2026-06-21T23:30:00Z` αλλάζει την ίδια κάρτα από ημερήσιο σε νυχτερινό ουρανό και ρυθμίζει το ρολόι στις 11:30 PM. Ένα δεύτερο `emulate clock` αντικαθιστά το πρώτο.

Η καρτέλα WebView φορτώνει το `https://webdriver.io/` μέσα στην εφαρμογή. Το Login περιμένει περίπου 1,5 δευτερόλεπτο και έπειτα ανοίγει ένα παράθυρο διαλόγου με κείμενο `Success` και `You are logged in!`. Το κουμπί LOGIN παραμένει ένα πορτοκαλί στοιχείο ελέγχου 200×50 όσο αυτή η αναμονή είναι στην οθόνη. Το `dialog accept` κλείνει το παράθυρο διαλόγου. Το `swipe` είναι μόνο για κινητά. Σύρετε το `[data-testid=Carousel]` πάνω στο `aria/Next card` δύο φορές για να αλλάξετε σελίδα στο carousel. Το καταγεγραμμένο web build ακούει για `pointerup` στο `document`, οπότε το σύρσιμο μπορεί να ξεκινήσει στο carousel και ο δείκτης να απελευθερωθεί στο `Next card`, που βρίσκεται έξω από το carousel. Το `scroll down --px 560` φέρνει το ρομπότ του WebdriverIO σε προβολή. Η λεζάντα κάτω από αυτό είναι «You found me!!!». Τα κομμάτια του παζλ είναι από `aria/drag-l2` έως `aria/drag-l3` και αφήνονται στον αντίστοιχο στόχο `aria/drop-…`. Η σειρά στο δίσκο είναι `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3`.

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

Επαναλάβετε το `drag` για τα `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` και `l3`.

<SessionTarget id="browser" />

Το `--viewport 1280x720` ορίζει το αρχικό μέγεθος. Το `--arg` προσθέτει ένα όρισμα browser και μπορεί να επαναληφθεί. Το `--profile <dir>` διατηρεί ένα προφίλ μεταξύ των ανοιγμάτων.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android και iOS

Τα Android και iOS εκτελούνται μέσω του Appium 3. Το `doctor android` αναφέρει έναν server ή driver που λείπει μαζί με την εντολή εγκατάστασης.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Ένα εγκατεστημένο πακέτο Android χρησιμοποιεί `--package` και `--activity`. Το mobile web χρησιμοποιεί `--browser chrome` ή `--browser safari` αντί για εφαρμογή. Το `--appium-url http://127.0.0.1:4723/` συνδέεται σε έναν server που εκτελείται ήδη. Ένα URL εφαρμογής cloud όπως `bs://…` περνιέται ως έχει ως `--app` και δεν αντιμετωπίζεται ως τοπικό αρχείο.

<a id="native-boarding-pass"></a>

### Native εφαρμογή επίδειξης

Σε emulator ή συσκευή το ίδιο guinea pig είναι το apk v2.2.0:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

Το `open` περιμένει έως οκτώ λεπτά. Το UiAutomator2 εγκαθιστά έναν server και ξεκινά το instrumentation πριν η εφαρμογή γίνει χρησιμοποιήσιμη, και αυτό είναι πιο αργό από την εκκίνηση ενός browser. Το πρώτο αίτημα δεν επαναλαμβάνεται: μια επανάληψη ξεκινά μια δεύτερη συνεδρία Appium στην ίδια συσκευή ενώ η πρώτη ακόμη εγκαθίσταται. Τα `tap "~Login"`, `fill` και έπειτα `tap "~button-LOGIN"` κάνουν σύνδεση με το ίδιο email και κωδικό. Σε μικρή οθόνη το κουμπί LOGIN βρίσκεται κάτω από το ορατό τμήμα, οπότε κάντε κύλιση στο `~Login-screen` πριν από αυτό το tap. Το `dialog accept` κλείνει την ειδοποίηση επιτυχίας και πρέπει να εκτελεστεί αφού η ειδοποίηση εμφανιστεί στην οθόνη. Το κείμενο της ειδοποίησης είναι `Success` / `You are logged in!`.

Το κουμπί δακτυλικού αποτυπώματος είναι το `~button-biometric`. Εμφανίζεται στη φόρμα σύνδεσης μόνο αφού καταχωριστεί δακτυλικό αποτύπωμα, γι' αυτό αυτός ο player δεν το πατά. Το `exec -e "await browser.fingerPrint(1)"` απαντά στην προτροπή του συστήματος (το `fingerPrint` είναι μόνο για Android· δεν υπάρχει υποεντολή `wdio session` γι' αυτό).

Το `tap "~Webview"` είναι το ενσωματωμένο WebView του `https://webdriver.io/`. Σε software emulator με μία CPU, ο renderer του WebView τερματίζεται με `SIGTRAP` στο `libmonochrome` μετά την ετικέτα LOADING, και η σελίδα δεν σχεδιάζεται ποτέ. Ο player αφήνει αυτή την καρτέλα ανέγγιχτη.

Το `tap "~Swipe"` ανοίγει το carousel. Το `swipe left` δεν αλλάζει σελίδα: το carousel είναι `react-native-reanimated-carousel`, και ένα swipe του UIAutomator επιστρέφει στην πρώτη κάρτα. Ένα `exec` του `mobile: swipeGesture` στο scroll view, επαναλαμβανόμενο, είναι αυτό που φέρνει στην οθόνη το ρομπότ και τη λεζάντα «You found me!!!». Ένα `swipe up` πλήρους οθόνης από την κάτω άκρη ανοίγει αντίθετα το UI στιγμιότυπου οθόνης του Android. Το `drag "~drag-l2" "~drop-l2"` (και τα άλλα οκτώ ζεύγη, με τη σειρά του δίσκου) ολοκληρώνει το παζλ. Το τελευταίο καρέ είναι το συναρμολογημένο ρομπότ και το στοιχείο ελέγχου επανάληψης.

Το `-s android` κρατά αυτή τη συνεδρία δίπλα σε αυτή του browser. Παραλείψτε το `-s android` όταν είναι η μόνη συνεδρία. Το `open` χρησιμοποιεί το package και το activity που έχουν ήδη εγκατασταθεί από το apk, με `--no-reset` ώστε να διατηρείται ένα καταχωρισμένο δακτυλικό αποτύπωμα. Το `"~Login"` είναι η ετικέτα προσβασιμότητας της καρτέλας. Το `wait` δεν ισχύει για native συνεδρία.

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

Επαναλάβετε το `drag` για τα `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` και `l3`.

<SessionTarget id="android" />

### iOS simulator

Οι ίδιες οθόνες υπάρχουν στο build simulator v2.2.0, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). Αποσυμπιέστε το και εγκαταστήστε το `wdiodemoapp.app` σε έναν simulator που έχει εκκινήσει (`xcrun simctl install booted`). Το bundle id είναι `org.wdiodemoapp`. Αυτό το binary είναι εφαρμογή iPhone Simulator (arm64, iOS 15.1 ή νεότερο). Χρειάζεται macOS και Xcode. Δεν υπάρχει player για iOS σε αυτή τη σελίδα.

Τα Login, swipe και drag χρησιμοποιούν τις ίδιες ετικέτες προσβασιμότητας με το Android. Το `swipe left` δεν εκτελέστηκε στον simulator. Στο apk του Android δεν αλλάζει σελίδα σε αυτό το carousel. Η βιομετρική κλήση είναι `browser.touchId(true)`, όχι `fingerPrint`. Το `touchId` χρειάζεται το capability `appium:allowTouchIdEnroll` ορισμένο σε `true` (περάστε το με `--capabilities`). Καταχωρίστε Touch ID στον simulator πριν ανοίξετε τη φόρμα σύνδεσης, αλλιώς το βιομετρικό κουμπί παραμένει κρυφό.

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

Επαναλάβετε το `drag` για τα άλλα οκτώ κομμάτια, με την ίδια σειρά δίσκου όπως στο Android.

## Εφαρμογές desktop

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

Το `macos` απαιτεί macOS. Το `windows` απαιτεί Windows. Το `--app Root` συνδέεται στην επιφάνεια εργασίας. Μια εγκατεστημένη εφαρμογή Windows ονομάζεται από το application id της, για παράδειγμα `--app Microsoft.WindowsCalculator`. Μια διαδρομή ή ένα `.exe` επιλύεται ως αρχείο.

<a id="launch-console"></a>

## Electron, Tauri και Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

Τα `open tauri ./my-app` και `open dioxus ./my-app` χρειάζονται τον driver τους στο `PATH`, εκτός αν το service package ξεκινά το ίδιο τη συνεδρία. Σε Linux χωρίς `DISPLAY` ή `WAYLAND_DISPLAY`, εγκαταστήστε Xvfb ή weston. Το Electron παραμένει στο κλασικό πρωτόκολλο WebDriver. Περάστε `--app-arg` για να προωθήσετε ένα flag στην εφαρμογή, συμπεριλαμβανομένου του `--app-arg=--no-sandbox` όταν το απαιτεί το περιβάλλον. Μια τιμή που ξεκινά με `-` πρέπει να χρησιμοποιεί `=`, γιατί διαφορετικά ο αυστηρός parser την αντιμετωπίζει ως ξεχωριστή επιλογή.

Εγκαταστήστε τα `electron` και `@wdio/electron-service` στον κατάλογο που ανοίγετε. Το `main.js` χρησιμοποιεί `import`, οπότε το `package.json` αυτού του καταλόγου χρειάζεται `"type": "module"` (ή ονομάστε το αρχείο `main.mjs`). Προσαρμόστε το μέγεθος του παραθύρου στην περιοχή εργασίας ώστε μια μικρότερη οθόνη να μην τοποθετεί τη γραμμή τίτλου εκτός οθόνης:

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

Η παρακάτω εντολή open δεν απενεργοποιεί το sandbox του renderer. Προσθέστε `--app-arg=--no-sandbox` μόνο όταν το περιβάλλον δεν μπορεί να ξεκινήσει το Electron με το sandbox, όπως ορισμένα containers Linux. Ο player του Electron φορτώνει το ίδιο Expo URL σε παράθυρο 1280×800 χωρίς γραμμή διευθύνσεων. Το λογότυπο, η πλαϊνή μπάρα, η κάρτα καιρού, η κάρτα σύνδεσης, το carousel και το παζλ ταιριάζουν με τον browser. Το `-s electron` είναι το όνομα συνεδρίας που χρησιμοποιείται δίπλα στην επίδειξη του browser. Το Electron παραμένει στο κλασικό πρωτόκολλο, οπότε τα `geolocation` και `emulate clock` περνούν μέσω του Chromedriver αντί για BiDi. Οι εντολές ταιριάζουν με το Chrome, συμπεριλαμβανομένου του `reload` πριν από το Weather, εκτός από το παράθυρο διαλόγου επιτυχίας. Σε Linux, το `dialog accept` αποδέχεται τη native ειδοποίηση και το συννεφάκι παραμένει σχεδιασμένο. Αυτό το συννεφάκι δεν είναι μέρος της σελίδας, οπότε ένα μεταγενέστερο κλικ δεν μπορεί να το φτάσει. Η καταγραφή αντικαθιστά το `window.alert` με ένα παράθυρο διαλόγου μέσα στη σελίδα και εκτελεί `click "aria/OK"`. Το κουμπί LOGIN παραμένει ένα πορτοκαλί στοιχείο ελέγχου 200×50 όσο περιμένει. Το carousel, η κύλιση και το παζλ χρησιμοποιούν τις ίδιες εντολές με το Chrome.

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

Επαναλάβετε το `drag` για τα `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` και `l3`.

<SessionTarget id="electron" />

## Συσκευές cloud

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

Το `--provider` είναι `browserstack`, `saucelabs`, `testingbot` ή `testmu`. Κάντε export το username και το access key του provider. Το `doctor <provider>` ελέγχει ότι έχουν οριστεί και δεν εκτυπώνει τις τιμές. Το `--tunnel` ξεκινά το tunnel του provider όταν η υπό δοκιμή εφαρμογή βρίσκεται στο μηχάνημά σας.

## Ένα config του WebdriverIO

Το `open` μπορεί να δεχτεί ένα αρχείο config και έναν δείκτη capability αντί για όνομα στόχου:

```sh
npx wdio session open ./wdio.conf.ts 0
```

Ένα config σε TypeScript φορτώνεται με `tsx` όταν το project σας το διαθέτει. Το `tsx` είναι προαιρετικό: χωρίς αυτό το config φορτώνεται μέσω του type stripping του Node ή του jiti, και ένα config που αποτυγχάνει να φορτωθεί αναφέρει `MISSING_DEPENDENCY` με μια γραμμή εγκατάστασης.

Τα `--hostname`, `--port`, `--path` και `--protocol` κατευθύνουν τη συνεδρία σε ένα WebDriver endpoint που εκτελείται ήδη. Το κλείσιμο της συνεδρίας δεν σταματά αυτό το endpoint.

## Αντιμετώπιση προβλημάτων

| Μήνυμα | Τι να κάνετε |
| --- | --- |
| `MISSING_DEPENDENCY` | Εγκαταστήστε το πακέτο που αναφέρεται στο σφάλμα. Το `doctor <target>` εκτυπώνει την ίδια γραμμή εγκατάστασης. Το Electron χρειάζεται τα `@wdio/electron-service` και `electron` στον κατάλογο που ανοίγετε. |
| `MISSING_APPIUM_DRIVER` | Εκτελέστε τη γραμμή `npx appium driver install …` από το σφάλμα. |
| `MISSING_BINARY` | Τοποθετήστε τον αναφερόμενο driver (`tauri-driver` ή `wdio-dioxus-driver`) στο `PATH`. |
| `MISSING_CREDENTIALS` | Κάντε export τις μεταβλητές που αναφέρονται στο σφάλμα. |
| `NOT_SUPPORTED` | Το `macos` είναι μόνο για macOS και το `windows` μόνο για Windows. Το `swipe` είναι μόνο για κινητά. Σε Chrome και Electron, σύρετε το `[data-testid=Carousel]` πάνω στο `aria/Next card`. |
| `No dialog open.` | Η ειδοποίηση δεν είναι ανοιχτή. Στο Android, περιμένετε μέχρι να είναι ορατή η ειδοποίηση επιτυχίας πριν από το `dialog accept`. Στο Electron σε Linux το native συννεφάκι μπορεί να παραμείνει σχεδιασμένο μετά το `acceptAlert` και να αναφέρει παρ' όλα αυτά ότι δεν υπάρχει παράθυρο διαλόγου. Ο player χρησιμοποιεί αντί γι' αυτό ένα παράθυρο διαλόγου μέσα στη σελίδα και `click "aria/OK"`. |
| `The instrumentation process cannot be initialized` | Το UiAutomator2 δεν άρχισε να ακούει εγκαίρως. Η συνεδρία επιτρέπει 240s για αυτή την εκκίνηση, μετά από έως 180s για την εγκατάσταση του server. Σε software emulator, μία CPU και ένα skin 720×1280 φέρνουν το apk v2.2.0 στην αρχική οθόνη. Ένα image 1080×2400 με δύο CPU προκαλεί ANR στο `system_server` και ο server δεν ακούει ποτέ. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | Ο client εγκατέλειψε ενώ το Appium δημιουργούσε ακόμη τη συνεδρία. Τα Android και iOS περιμένουν 480s για αυτό το πρώτο αίτημα και δεν το ξαναστέλνουν. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | Το `wait` είναι για συνεδρίες browser. |
| `The fingerPrint command is only available for Android.` | Το `browser.fingerPrint` είναι η κλήση για Android. Το iOS χρησιμοποιεί `browser.touchId`. |
| `App not found:` | Περάστε μια διαδρομή apk που υπάρχει ή χρησιμοποιήστε `--package` και `--activity` για μια εφαρμογή που είναι ήδη εγκατεστημένη. |
| `Pass --package <id>.` | Το `deeplink` χρειάζεται `--package` στο Android. |

## Επόμενα βήματα

- [Snapshots και refs](/docs/session/snapshots) — διαβάστε την οθόνη μετά το `open`
- [Εντολές](/docs/session-commands) — κάθε flag του `open`
- [wdio session](/docs/session) — ο προεπιλεγμένος βρόχος