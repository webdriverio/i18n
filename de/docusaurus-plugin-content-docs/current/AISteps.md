---
id: ai-steps
title: KI-Schritte in Tests
description: Schreibe Testschritte als Absicht mit browser.act() und lies typisierte Daten mit browser.extract() über @wdio/ai-service aus, spiele sie anschließend ohne Modell aus einem committeten Cache ab und prüfe jede Reparatur.
---

Mit `@wdio/ai-service` kann ein Test einen Schritt beschreiben, statt ihn zu skripten: `browser.act('Add a blue shirt to the cart')` bittet dein Modell, den Schritt auszuführen, zeichnet die ausgeführten WebdriverIO-Befehle auf und spielt sie bei jedem weiteren Lauf aus einer Cache-Datei ab. Das Modell wird erst wieder aufgerufen, wenn sich die Seite geändert hat und ein aufgezeichneter Schritt ohne das Modell nicht mehr repariert werden kann. Verwende es für Abläufe, deren Markup sich häufig ändert, oder um einen Test zum Laufen zu bringen, bevor du die Selektoren kennst. Verwende einfache WebdriverIO-Befehle für alles, was du bereits zu skripten weißt.

## Den Service einrichten

Installiere den Service und das LangChain-Paket deines Modellanbieters:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

Füge den Service zu deiner Konfiguration hinzu und setze den API-Schlüssel des Anbieters (hier `ANTHROPIC_API_KEY`) in der Umgebung:

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

`webSocketUrl: true` öffnet eine WebDriver-BiDi-Session. Der Service funktioniert auch über WebDriver Classic, aber mit BiDi kann er prüfen, was jeder Schritt bewirkt hat, und die API-Antworten der Seite lesen. Auf der Seite [AI Service](/docs/ai-service) findest du alle Optionen und Anbieter, einschließlich lokaler Modelle über Ollama.

## Einen Test schreiben

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

- `act` führt den Schritt aus und macht niemals Assertions. Prüfe das Ergebnis mit `expect`.
- `extract` liest die Seite nur aus und validiert die Antwort gegen das Schema. Es wird nie gecacht.
- Geheimnisse kommen in Platzhalter. Das Modell sieht `{{password}}`, niemals den Wert:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- Rufe `act` auf einem Element auf, um das Modell innerhalb dieses Elements zu halten, oder auf einem gehaltenen Frame oder Tab:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## Einmal aufzeichnen, ohne Modell abspielen

Der erste Lauf zeichnet die Schritte jedes `act`-Aufrufs in `__act__/<spec file>.json` neben der Spec auf:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Committe das Verzeichnis `__act__`. Spätere Läufe spielen die aufgezeichneten Befehle ab, sodass ein erfolgreicher Lauf keine Modellaufrufe macht und keine Tokens kostet.

| `cache` | Verwende es für |
| --- | --- |
| `auto` (Standard) | lokal `write`, `heal`, wenn `process.env.CI` gesetzt ist |
| `write` | das Aufzeichnen und Aktualisieren der Cache-Dateien |
| `heal` | CI: fehlschlagende Schritte reparieren, die reparierten Einträge nach `<outputDir>/act-cache/` schreiben und die Cache-Dateien unverändert lassen |
| `locked` | CI-Läufe, die kein Modell aufrufen dürfen: nur abspielen, fehlschlagen, wenn ein Schritt ohne das Modell nicht repariert werden kann |
| `off` | immer das Modell fragen |

Führe `npx wdio run wdio.conf.ts -s` aus, um jeden `act`-Aufruf erneut aufzuzeichnen.

## Reparaturen prüfen

Wenn ein aufgezeichneter Schritt fehlschlägt, versucht der Service zunächst die anderen Selektoren, die er für das Element aufgezeichnet hat, und dann dessen Rolle und zugänglichen Namen. Nur wenn das fehlschlägt, setzt das Modell ab dem fehlschlagenden Schritt fort. Jeder abgespielte oder reparierte Schritt muss dasselbe tun wie bei der Aufzeichnung: dieselben Requests senden, zur selben Seite navigieren und dieselben Teile der Seite verändern. Eine Reparatur auf einen ähnlichen, aber falschen Button wird abgelehnt.

Der Lauf endet mit einer Zusammenfassung:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

Der Evidence-Ordner enthält einen Screenshot der Seite zum Zeitpunkt des Fehlschlags, einen nach jedem Reparaturschritt und ein Video der Reparatur in Browsern, die einen WebDriver-BiDi-Screencast aufzeichnen (derzeit Firefox). Prüfe die Reparatur und committe dann die aktualisierte Cache-Datei.

## Schritte in einfachen Code umwandeln

Sobald ein Ablauf stabil ist, ersetze seine `act`-Aufrufe durch die aufgezeichneten Befehle:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Add a blue shirt in size M to the shopping cart
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## Fehlerbehebung

| Fehler | Lösung |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | Setze `model` in den Service-Optionen oder exportiere `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | Installiere das Anbieterpaket. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Exportiere den Schlüssel in der Shell oder im CI-Secret, mit dem die Tests ausgeführt werden. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | Zeichne den Aufruf lokal mit `cache: 'write'` auf und committe die `__act__`-Datei. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | Das Element ist noch vorhanden, macht aber etwas anderes: eine Regression, keine Markup-Änderung. Überprüfe die App. |
| `act("…") failed: …` gefolgt von `Evidence: <folder>` | Das Modell konnte die Anweisung nicht abschließen. Der Ordner enthält jeden erstellten Snapshot, die Konsolen- und Netzwerkereignisse sowie die ausgeführten Schritte. |

## Nächste Schritte

- [AI Service](/docs/ai-service): alle Optionen, das Cache-Format, Schritteffekte und der Workspace
- [Selektoren](/docs/selectors#role-selector): der `role/`-Selektor, den aufgezeichnete Schritte verwenden
- [WebdriverIO für Coding Agents](/docs/ai-agents): Tests gemeinsam mit einem Coding Agent schreiben