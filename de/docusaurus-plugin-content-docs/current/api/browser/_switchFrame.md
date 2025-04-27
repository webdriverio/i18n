---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Wechselt den aktiven Kontext zu einem Frame, z.B. einem Iframe auf der Seite. Es gibt mehrere Möglichkeiten, einen Frame
auf der Seite abzufragen:

  - Wenn eine Zeichenfolge übergeben wird, wechselt der Befehl zu dem Frame mit einer passenden Kontext-ID, URL oder URL, die diese Zeichenfolge enthält
    ```ts
    // wechsle zu einem Frame, der eine bestimmte URL hat oder einen String in der URL enthält
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Hinweis: dieser Frame befindet sich in einem verschachtelten Iframe, aber Sie müssen nur
    // die Frame-URL Ihres gewünschten Frames angeben
    await browser.switchFrame('https://www.w3schools.com')
    // prüfe den Titel der Seite
    console.log(await browser.execute(() => [document.title, document.URL]))
    // Ausgabe: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Wenn Sie die Kontext-ID des Frames haben, können Sie diese direkt verwenden
    ```ts
    // wechsle zu einem Frame mit einer bestimmten Kontext-ID
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Wenn ein WebdriverIO-Element übergeben wird, das auf ein `iframe`-Element verweist, wird zu diesem Frame gewechselt
    ```ts
    // wechsle zu einem Frame-Element, das aus dem aktuellen Kontext abgefragt wurde
    await browser.switchFrame($('iframe'))
    ```

  - Wenn eine Funktion übergeben wird, werden alle Iframes auf der Seite durchlaufen und die Funktion innerhalb des Kontextobjekts
    aufgerufen. Die Funktion sollte einen booleschen Wert zurückgeben, der angibt, ob der Frame ausgewählt werden soll. Die Funktion
    wird im Browser ausgeführt und ermöglicht den Zugriff auf alle Web-APIs, z.B.:
    ```ts
    // wechsle zum ersten Frame, der ein Element mit id "#frameContent" enthält
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // wechsle zum ersten Frame, der "webdriver" in der URL enthält
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Wenn `null` übergeben wird, wird zum obersten Frame gewechselt
    ```ts
    // zuerst in einen Frame wechseln
    await browser.switchFrame($('iframe'))
    // weitere Automatisierung innerhalb dieses Frames durchführen, dann ...

    // zum obersten Frame wechseln
    await browser.switchFrame(null)
    ```

Sobald Sie zu einem Frame gewechselt haben, werden alle weiteren Befehle im Kontext dieses Frames ausgeführt,
einschließlich der Navigation zu verschiedenen Seiten.

##### Usage

```js
browser.switchFrame(context)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>context</var></code></td>
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  die aktuelle aktive Kontext-ID