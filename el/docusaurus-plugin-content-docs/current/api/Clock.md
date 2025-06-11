---
id: clock
title: Το Αντικείμενο Clock
---

Μπορείτε να τροποποιήσετε το ρολόι συστήματος του προγράμματος περιήγησης χρησιμοποιώντας την εντολή [`emulate`](/docs/emulation). Αυτή αντικαθιστά τις εγγενείς καθολικές συναρτήσεις που σχετίζονται με το χρόνο, επιτρέποντάς τους να ελέγχονται συγχρονισμένα μέσω του `clock.tick()` ή του αντικειμένου ρολογιού που παράγεται. Αυτό περιλαμβάνει τον έλεγχο:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Το ρολόι ξεκινά από την εποχή του unix (χρονική σήμανση 0). Αυτό σημαίνει ότι όταν δημιουργείτε ένα νέο Date στην εφαρμογή σας, θα έχει ώρα 1 Ιανουαρίου 1970 εάν δεν περάσετε άλλες επιλογές στην εντολή `emulate`.

## Παράδειγμα

Όταν καλείτε `browser.emulate('clock', { ... })` θα αντικαταστήσει αμέσως τις καθολικές συναρτήσεις για την τρέχουσα σελίδα καθώς και όλες τις επόμενες σελίδες, π.χ.:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('http://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Μπορείτε να τροποποιήσετε την ώρα συστήματος καλώντας το [`setSystemTime`](/docs/api/clock/setSystemTime) ή το [`tick`](/docs/api/clock/tick).