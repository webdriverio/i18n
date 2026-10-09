---
id: snapshot
title: Snapshot
description: "Überprüfen Sie Objekte, DOM-Strukturen und Befehlsergebnisse mit Snapshot- und Inline-Snapshot-Tests und vergleichen Sie visuelle Snapshots."
---

Snapshot-Tests können sehr nützlich sein, um eine Vielzahl von Aspekten Ihrer Komponente oder Logik gleichzeitig zu überprüfen. In WebdriverIO können Sie Snapshots von beliebigen Objekten sowie von der DOM-Struktur eines WebElements oder von Ergebnissen von WebdriverIO-Befehlen erstellen.

Ähnlich wie andere Test-Frameworks erstellt WebdriverIO einen Snapshot des angegebenen Wertes und vergleicht ihn dann mit einer Referenz-Snapshot-Datei, die neben dem Test gespeichert ist. Der Test schlägt fehl, wenn die beiden Snapshots nicht übereinstimmen: Entweder ist die Änderung unerwartet, oder der Referenz-Snapshot muss auf die neue Version des Ergebnisses aktualisiert werden.

:::info Plattformübergreifende Unterstützung

Diese Snapshot-Funktionen stehen sowohl für die Ausführung von End-to-End-Tests in der Node.js-Umgebung als auch für die Ausführung von [Unit- und Komponenten](/docs/component-testing)-Tests im Browser oder auf mobilen Geräten zur Verfügung.

:::

## Snapshots verwenden
Um einen Snapshot eines Wertes zu erstellen, können Sie `toMatchSnapshot()` aus der [`expect()`](/docs/api/expect-webdriverio)-API verwenden:

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Beim ersten Ausführen dieses Tests erstellt WebdriverIO eine Snapshot-Datei, die wie folgt aussieht:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Das Snapshot-Artefakt sollte zusammen mit den Codeänderungen committet und im Rahmen Ihres Code-Review-Prozesses überprüft werden. Bei nachfolgenden Testläufen vergleicht WebdriverIO die gerenderte Ausgabe mit dem vorherigen Snapshot. Wenn sie übereinstimmen, besteht der Test. Wenn sie nicht übereinstimmen, hat entweder der Test-Runner einen Fehler in Ihrem Code gefunden, der behoben werden sollte, oder die Implementierung hat sich geändert und der Snapshot muss aktualisiert werden.

Um den Snapshot zu aktualisieren, übergeben Sie dem `wdio`-Befehl das Flag `-s` (oder `--updateSnapshot`), z. B.:

```sh
npx wdio run wdio.conf.js -s
```

__Hinweis:__ Wenn Sie Tests mit mehreren Browsern parallel ausführen, wird nur ein Snapshot erstellt und für den Vergleich verwendet. Wenn Sie einen separaten Snapshot pro Capability wünschen, [erstellen Sie bitte ein Issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) und teilen Sie uns Ihren Anwendungsfall mit.

## Inline-Snapshots

Ebenso können Sie `toMatchInlineSnapshot()` verwenden, um den Snapshot inline in der Testdatei zu speichern.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Anstatt eine Snapshot-Datei zu erstellen, ändert Vitest die Testdatei direkt, um den Snapshot als String zu aktualisieren:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Dadurch können Sie die erwartete Ausgabe direkt sehen, ohne zwischen verschiedenen Dateien wechseln zu müssen.

## Visuelle Snapshots

Einen DOM-Snapshot eines Elements zu erstellen, ist möglicherweise nicht die beste Idee, insbesondere wenn die DOM-Struktur zu groß ist und dynamische Elementeigenschaften enthält. In diesen Fällen wird empfohlen, sich auf visuelle Snapshots für Elemente zu verlassen.

Um visuelle Snapshots zu aktivieren, fügen Sie den `@wdio/visual-service` zu Ihrem Setup hinzu. Sie können den Einrichtungsanweisungen in der [Dokumentation](/docs/visual-testing#installation) für Visual Testing folgen.

Anschließend können Sie einen visuellen Snapshot über `toMatchElementSnapshot()` erstellen, z. B.:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Ein Bild wird dann im Baseline-Verzeichnis gespeichert. Weitere Informationen finden Sie unter [Visual Testing](/docs/visual-testing).