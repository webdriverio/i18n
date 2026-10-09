---
id: ai-steps
title: Βήματα AI στα τεστ
description: Γράψτε βήματα τεστ ως πρόθεση με το browser.act() και διαβάστε τυποποιημένα δεδομένα με το browser.extract() χρησιμοποιώντας το @wdio/ai-service, έπειτα αναπαράγετέ τα από μια δεσμευμένη (committed) cache χωρίς μοντέλο και ελέγξτε κάθε επιδιόρθωση.
---

Το `@wdio/ai-service` επιτρέπει σε ένα τεστ να περιγράψει ένα βήμα αντί να το γράψει ως script: το `browser.act('Add a blue shirt to the cart')` ζητά από το μοντέλο σας να το εκτελέσει, καταγράφει τις εντολές WebdriverIO που εκτέλεσε και τις αναπαράγει από ένα αρχείο cache σε κάθε επόμενη εκτέλεση. Το μοντέλο καλείται ξανά μόνο όταν η σελίδα έχει αλλάξει και ένα καταγεγραμμένο βήμα δεν μπορεί πλέον να επιδιορθωθεί χωρίς αυτό. Χρησιμοποιήστε το για ροές των οποίων το markup αλλάζει συχνά ή για να θέσετε σε λειτουργία ένα τεστ πριν γνωρίζετε τους selectors. Χρησιμοποιήστε απλές εντολές WebdriverIO για οτιδήποτε ήδη ξέρετε πώς να γράψετε ως script.

## Ρύθμιση του service

Εγκαταστήστε το service και το πακέτο LangChain του παρόχου του μοντέλου σας:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

Προσθέστε το service στο config σας και ορίστε το API key του παρόχου (`ANTHROPIC_API_KEY` εδώ) στο περιβάλλον:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        webSocketUrl: true
    }],
    framework: 'mocha',
    services: [['ai', {
        model: 'anthropic:claude-sonnet-5-5'
    }]]
}
```

Το `webSocketUrl: true` ανοίγει μια συνεδρία WebDriver BiDi. Το service λειτουργεί και μέσω WebDriver Classic, αλλά το BiDi του επιτρέπει να ελέγχει τι έκανε κάθε βήμα και να διαβάζει τις αποκρίσεις API της σελίδας. Δείτε τη σελίδα [AI Service](/docs/ai-service) για κάθε επιλογή και πάροχο, συμπεριλαμβανομένων τοπικών μοντέλων μέσω Ollama.

## Γράψτε ένα τεστ

```ts title="test/specs/cart.e2e.ts"
import { browser, expect } from '@wdio/globals'
import { z } from 'zod'

describe('cart', () => {
    it('adds a shirt', async () => {
        await browser.url('https://shop.example/')
        await browser.act('Add a blue shirt in size M to the shopping cart')

        const cart = await browser.extract(
            'the line items in the cart',
            z.array(z.object({ name: z.string(), size: z.string(), qty: z.number() }))
        )
        expect(cart).toContainEqual({ name: 'Blue Shirt', size: 'M', qty: 1 })
    })
})
```

- Το `act` εκτελεί το βήμα και δεν κάνει ποτέ assertions. Ελέγξτε το αποτέλεσμα με το `expect`.
- Το `extract` μόνο διαβάζει τη σελίδα και επικυρώνει την απάντηση έναντι του schema. Δεν αποθηκεύεται ποτέ στην cache.
- Τα μυστικά μπαίνουν σε placeholders. Το μοντέλο βλέπει το `{{password}}`, ποτέ την τιμή:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- Καλέστε το `act` σε ένα στοιχείο για να κρατήσετε το μοντέλο μέσα σε αυτό, ή σε ένα frame ή tab που έχετε κρατήσει:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## Καταγραφή μία φορά, αναπαραγωγή χωρίς μοντέλο

Η πρώτη εκτέλεση καταγράφει τα βήματα κάθε κλήσης `act` στο `__act__/<spec file>.json` δίπλα στο spec:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Κάντε commit τον κατάλογο `__act__`. Οι επόμενες εκτελέσεις αναπαράγουν τις καταγεγραμμένες εντολές, οπότε μια επιτυχής εκτέλεση δεν κάνει καμία κλήση στο μοντέλο και δεν κοστίζει tokens.

| `cache` | Χρησιμοποιήστε το για |
| --- | --- |
| `auto` (προεπιλογή) | `write` τοπικά, `heal` όταν έχει οριστεί το `process.env.CI` |
| `write` | καταγραφή και ενημέρωση των αρχείων cache |
| `heal` | CI: επιδιόρθωση αποτυχημένων βημάτων, εγγραφή των επιδιορθωμένων καταχωρίσεων στο `<outputDir>/act-cache/` χωρίς να αγγίζονται τα αρχεία cache |
| `locked` | εκτελέσεις CI που δεν πρέπει να καλούν μοντέλο: μόνο αναπαραγωγή, αποτυχία όταν ένα βήμα δεν μπορεί να επιδιορθωθεί χωρίς το μοντέλο |
| `off` | πάντα ερώτηση στο μοντέλο |

Εκτελέστε `npx wdio run wdio.conf.ts -s` για να καταγράψετε ξανά κάθε κλήση `act`.

## Έλεγχος επιδιορθώσεων

Όταν ένα καταγεγραμμένο βήμα αποτυγχάνει, το service δοκιμάζει πρώτα τους άλλους selectors που κατέγραψε για το στοιχείο και έπειτα τον ρόλο και το προσβάσιμο όνομά του. Μόνο αν αυτό αποτύχει, το μοντέλο συνεχίζει από το βήμα που απέτυχε. Κάθε βήμα που αναπαράγεται ή επιδιορθώνεται πρέπει να κάνει ό,τι έκανε όταν καταγράφηκε: να στέλνει τα ίδια αιτήματα, να πλοηγείται στην ίδια σελίδα και να αλλάζει τα ίδια μέρη της σελίδας. Μια επιδιόρθωση σε ένα παρόμοιο αλλά λάθος κουμπί απορρίπτεται.

Η εκτέλεση ολοκληρώνεται με μια σύνοψη:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

Ο φάκελος τεκμηρίων περιέχει ένα στιγμιότυπο οθόνης της σελίδας τη στιγμή που απέτυχε το βήμα, ένα μετά από κάθε βήμα επιδιόρθωσης, και ένα βίντεο της επιδιόρθωσης σε browsers που καταγράφουν screencast μέσω WebDriver BiDi (σήμερα ο Firefox). Ελέγξτε την επιδιόρθωση και έπειτα κάντε commit το ενημερωμένο αρχείο cache.

## Μετατροπή βημάτων σε απλό κώδικα

Μόλις μια ροή σταθεροποιηθεί, αντικαταστήστε τις κλήσεις `act` της με τις καταγεγραμμένες εντολές:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Add a blue shirt in size M to the shopping cart
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## Αντιμετώπιση προβλημάτων

| Σφάλμα | Λύση |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | Ορίστε το `model` στις επιλογές του service ή κάντε export `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | Εγκαταστήστε το πακέτο του παρόχου. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Κάντε export το κλειδί στο shell ή στο CI secret που εκτελεί τα τεστ. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | Καταγράψτε την κλήση τοπικά με `cache: 'write'` και κάντε commit το αρχείο `__act__`. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | Το στοιχείο υπάρχει ακόμη αλλά κάνει κάτι άλλο: πρόκειται για regression, όχι για αλλαγή στο markup. Ελέγξτε την εφαρμογή. |
| `act("…") failed: …` ακολουθούμενο από `Evidence: <folder>` | Το μοντέλο δεν μπόρεσε να ολοκληρώσει την οδηγία. Ο φάκελος περιέχει κάθε snapshot που πήρε, τα συμβάντα console και δικτύου και τα βήματα που εκτελέστηκαν. |

## Επόμενα βήματα

- [AI Service](/docs/ai-service): κάθε επιλογή, η μορφή της cache, τα αποτελέσματα των βημάτων και το workspace
- [Selectors](/docs/selectors#role-selector): ο selector `role/` που χρησιμοποιούν τα καταγεγραμμένα βήματα
- [WebdriverIO for Coding Agents](/docs/ai-agents): γράψτε τεστ μαζί με έναν coding agent