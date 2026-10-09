---
id: ai-agents
title: Το WebdriverIO για Coding Agents
description: Ρυθμίστε το Cursor, το Claude Code, το Copilot ή οποιονδήποτε άλλο coding agent ώστε να γράφει, να εκτελεί και να κάνει debug σε τεστ WebdriverIO, χρησιμοποιώντας την τεκμηρίωση σε μορφή αναγνώσιμη από μηχανές, τον MCP server του WebdriverIO και τα traces του DevTools.
---

Τα περισσότερα τεστ WebdriverIO σήμερα γράφονται μαζί με έναν coding agent. Αυτή η σελίδα δείχνει πώς να δώσετε σε έναν agent τα τρία πράγματα που χρειάζεται για να το κάνει καλά: **επίκαιρη τεκμηρίωση** (ώστε να γράφει κώδικα v10 αντί να μαντεύει), **έναν τρόπο να χειρίζεται την εφαρμογή υπό δοκιμή** (ώστε να εξερευνά το UI και να επαληθεύει selectors) και **εκτελέσεις τεστ που επιδέχονται debugging** (ώστε να διορθώνει μόνος του τα τεστ που αποτυγχάνουν).

## 1. Δώστε στον agent σας την τεκμηρίωση

Κάθε σελίδα αυτού του ιστότοπου είναι διαθέσιμη ως καθαρό Markdown, χωρίς πλοήγηση, scripts ή styling:

| Πόρος | URL | Χρήση |
| --- | --- | --- |
| Ευρετήριο τεκμηρίωσης | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | Ένας επιμελημένος χάρτης όλων των σελίδων με περιλήψεις μίας γραμμής. Ξεκινήστε από εδώ. |
| Πλήρης τεκμηρίωση | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | Ολόκληρη η τεκμηρίωση σε ένα μόνο αρχείο, για agents με μεγάλα context windows. |
| Οποιαδήποτε μεμονωμένη σελίδα | Προσθέστε `.md` στο URL, π.χ. [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | Φόρτωση ακριβώς της σελίδας που χρειάζεται ο agent. |
| Content negotiation | Ζητήστε οποιοδήποτε URL `/docs/*` με `Accept: text/markdown` | Agents και εργαλεία που ανακτούν τα URLs ως έχουν. |

Κάθε σελίδα τεκμηρίωσης διαθέτει επίσης ένα μενού **Copy page** με επιλογές για αντιγραφή της σελίδας ως Markdown ή απευθείας άνοιγμά της στο ChatGPT, το Claude ή το Cursor.

### MCP server τεκμηρίωσης

Η τεκμηρίωση είναι επίσης διαθέσιμη ως απομακρυσμένος MCP server στη διεύθυνση `https://webdriver.io/mcp`. Παρέχει σε έναν agent τρία εργαλεία: το `search_docs` για να βρει τη σωστή σελίδα, το `get_page` για να τη διαβάσει ως Markdown και το `list_sections` για να φορτώσει μια ολόκληρη ενότητα με τη μία. Προσθέστε τον δίπλα στον MCP server του WebdriverIO που περιγράφεται παρακάτω:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Για το Claude Code, εκτελέστε `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`.

## Αφήστε τον agent σας να χρησιμοποιεί το `wdio session`

Το [`wdio session`](/docs/session) διατηρεί ένα session του WebdriverIO ενεργό μεταξύ εντολών του shell. Ένας agent μπορεί να ανοίξει έναν browser, ένα τηλέφωνο ή μια desktop εφαρμογή, να πάρει snapshot όσων εμφανίζονται στην οθόνη, να ενεργήσει πάνω σε refs και να εξαγάγει ως τεστ τα βήματα που λειτούργησαν. Αυτός είναι ο προεπιλεγμένος τρόπος χειρισμού μιας εφαρμογής από έναν coding agent. Ο [MCP server](/docs/mcp) της επόμενης ενότητας είναι η εναλλακτική όταν ο agent πρέπει να καλεί εργαλεία αντί για το shell.

Εγκαταστήστε το skill στο project:

```sh
npx wdio session skill --install .
```

Αυτό γράφει το `.agents/skills/wdio-session/SKILL.md`. Το `npm init wdio` γράφει το ίδιο αρχείο όταν αποδεχτείτε την υποστήριξη coding agent και προσθέτει τους κανόνες project που ακολουθούν παρακάτω.

Ένας agent μπορεί να δημιουργήσει ο ίδιος το project. Ο wizard δέχεται ένα flag για κάθε ερώτηση και το `--yes` συμπληρώνει τις προεπιλογές για τις υπόλοιπες, ώστε να μην περιμένει ποτέ για είσοδο:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

Το `npm init wdio@latest -- --help` εμφανίζει κάθε flag και τις τιμές του. Δείτε [Απάντηση στον wizard με flags](/docs/gettingstarted#answer-the-wizard-with-flags). Η ενότητα [WebdriverIO Session](/docs/session) καλύπτει targets, snapshots, `exec`, εξαγωγή και debugging. Αναφορά εντολών: [εντολές wdio session](/docs/session-commands).

### Προσθέστε την τεκμηρίωση στον agent σας

Για να είναι διαθέσιμη η τεκμηρίωση σε κάθε συνομιλία, προσθέστε το ευρετήριο στον agent σας:

- **Cursor**: προσθέστε το `https://webdriver.io/llms.txt` ως custom doc στις ρυθμίσεις του Cursor (_Indexing & Docs_) και στη συνέχεια αναφερθείτε σε αυτό στη συνομιλία με `@` και το όνομα που του δώσατε.
- **Claude Code / Codex / άλλοι CLI agents**: προσθέστε τον σύνδεσμο στο `AGENTS.md` ή `CLAUDE.md` του project σας (δείτε τους [κανόνες project](#3-add-project-rules) παρακάτω). Οι agents ανακτούν τις σελίδες που χρειάζονται κατ' απαίτηση.

## 2. Αφήστε τον agent σας να χειρίζεται τον browser ή την εφαρμογή

Ο [MCP server του WebdriverIO](/docs/mcp) (`@wdio/mcp`) επιτρέπει σε έναν agent να ανοίγει browsers (Chrome, Firefox, Edge, Safari), native και hybrid mobile εφαρμογές (μέσω Appium) και cloud συσκευές, να επιθεωρεί το accessibility tree, να κάνει κλικ, να πληκτρολογεί και να τραβά screenshots. Οι agents τον χρησιμοποιούν για να εξερευνήσουν μια σελίδα πριν γράψουν ένα τεστ, για να βρουν αξιόπιστους selectors και για να αναπαράγουν μια αποτυχία βήμα προς βήμα.

Προσθέστε τον στη διαμόρφωση του MCP client σας (για παράδειγμα `.mcp.json` ή `.cursor/mcp.json` στο project σας):

```json title=".mcp.json"
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

Για το Claude Code, καταχωρίστε τον από τη γραμμή εντολών:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

Δείτε τη [διαμόρφωση MCP](/docs/mcp/configuration) για τις επιλογές session και τους [Cloud Providers](/docs/mcp/cloud-providers) για εκτέλεση σε BrowserStack, Sauce Labs, TestMu AI ή TestingBot.

## 3. Προσθέστε κανόνες project

Οι agents ακολουθούν τις συμβάσεις ενός project πολύ πιο αξιόπιστα όταν αυτές είναι καταγεγραμμένες. Προσθέστε μια ενότητα όπως η παρακάτω στο `AGENTS.md` (ή `CLAUDE.md`, `.cursor/rules`) του project τεστ σας και προσαρμόστε τις διαδρομές και τις εντολές:

````md title="AGENTS.md"
## End-to-end tests (WebdriverIO v10)

- Docs: https://webdriver.io/llms.txt - fetch the relevant page as Markdown (append `.md`) before using an API you are not sure about. Do not use APIs from WebdriverIO v8 or older.
- Config: `wdio.conf.ts`. Specs: `test/specs/**/*.e2e.ts`. Page objects: `test/pageobjects/`.
- Run all tests: `npx wdio run wdio.conf.ts`
- Run a single spec: `npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts`
- Tests are async: always `await` commands, e.g. `await $('button').click()`. Never use the removed sync mode.
- Prefer user-facing selectors: accessibility name or text (`$('aria/Submit')`, `$('button=Submit')`), then `data-testid`. Avoid XPath and generated CSS classes.
- Rely on auto-waiting and `expect-webdriverio` matchers (`await expect($('h1')).toHaveText('Welcome')`) instead of `browser.pause()`.
- To explore the app or verify a selector, use the `wdio-mcp` MCP server.
- To drive the app from the shell, follow `.agents/skills/wdio-session/SKILL.md` (`npx wdio session`).
- When a test fails, read the DevTools trace in `test-results/` (see `transcript.md`) before changing code.
````

Οι παραπάνω κανόνες αντικατοπτρίζουν τις συστάσεις των ενοτήτων [Βέλτιστες Πρακτικές](/docs/bestpractices), [Selectors](/docs/selectors) και [Auto-waiting](/docs/autowait).

## 4. Αφήστε τον agent να κάνει debug στα τεστ που αποτυγχάνουν

Το service [WebdriverIO DevTools](/docs/devtools) μπορεί να καταγράφει ένα **trace** κάθε εκτέλεσης: ένα φορητό artifact με ένα βήμα προς βήμα transcript σε Markdown, screenshots, snapshots του accessibility tree και network logs για κάθε ενέργεια. Αυτό δίνει σε έναν agent τις ίδιες πληροφορίες που αποκτά ένας άνθρωπος παρακολουθώντας το τεστ, χωρίς να χρειάζεται παράθυρο browser.

Εγκαταστήστε το service και ενεργοποιήστε το trace mode:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // ένα trace ανά τεστ διευκολύνει την παράδοση μίας μεμονωμένης αποτυχίας σε έναν agent
            traceGranularity: 'test',
            // απλά αρχεία αντί για zip, ώστε οι agents να μπορούν να τα διαβάζουν απευθείας
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

Μετά από μια εκτέλεση, τα traces γράφονται στο `test-results/`. Κατευθύνετε τον agent σας στον φάκελο του τεστ που απέτυχε και ζητήστε του να διαβάσει πρώτα το `transcript.md`. Δείτε το [Trace Mode](/docs/devtools/wdio/trace-mode) για όλες τις επιλογές, συμπεριλαμβανομένων του granularity και της διατήρησης.

## Προτεινόμενη ροή εργασίας

1. Ζητήστε από τον agent να εξερευνήσει τη λειτουργία υπό δοκιμή με τον MCP server και να προτείνει selectors.
2. Αφήστε τον να γράψει το spec και το page object ακολουθώντας τους κανόνες του project σας, ανακτώντας σελίδες της τεκμηρίωσης του WebdriverIO όπως χρειάζεται.
3. Βάλτε τον να εκτελέσει το μεμονωμένο spec με `--spec` και να επαναλαμβάνει μέχρι να περάσει.
4. Αν ένα τεστ αποτύχει στο CI, δώστε στον agent το trace αυτού του τεστ και αφήστε τον να διορθώσει το τεστ ή να αναφέρει το bug.

## Επόμενα βήματα

- [Ξεκινώντας](/docs/gettingstarted) - δημιουργήστε ένα project με `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - όλα τα εργαλεία που παρέχει ο MCP server
- [DevTools](/docs/devtools) - live mode και trace mode
- [Βέλτιστες Πρακτικές](/docs/bestpractices) - πώς μοιάζουν τα καλά τεστ WebdriverIO
- [Από το v9 στο v10](/docs/v10-migration#migrate-with-a-coding-agent) - το skill μετάβασης για ένα υπάρχον suite