---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Växlar den aktiva kontexten till en ram, t.ex. en iframe på sidan. Det finns flera sätt att välja en ram
på sidan:

  - Om du använder en sträng växlar den till ramen med matchande kontext-id, url eller url som innehåller den strängen
    ```ts
    // switch to a frame that has a specific url or contains a string in the url
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Note: this frame is located in a nested iframe, however you only need to provide
    // the frame url of your desired frame
    await browser.switchFrame('https://www.w3schools.com')
    // check the title of the page
    console.log(await browser.execute(() => [document.title, document.URL]))
    // outputs: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Om du har kontext-id för ramen kan du använda det direkt
    ```ts
    // switch to a frame that has a certain context id
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Om du anger ett WebdriverIO-element som refererar till ett `iframe`-element kommer den att växla till den ramen
    ```ts
    // switch to a frame element queried from current context
    await browser.switchFrame($('iframe'))
    ```

  - Om du anger en funktion kommer den att loopa genom alla iframes på sidan och anropa funktionen inom kontextobjektet. Funktionen ska returnera en boolesk värde som indikerar om ramen ska väljas. Funktionen
    kommer att köras inom webbläsaren och ger tillgång till alla Web API:er, t.ex.:
    ```ts
    // switch to first frame that contains an element with id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // switch to first frame that contains "webdriver" in the URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Om du anger `null` kommer den att växla till toppnivåramen
    ```ts
    // first switch into a frame
    await browser.switchFrame($('iframe'))
    // do more automation within that frame, then ...

    // switch to the top level frame
    await browser.switchFrame(null)
    ```

När du har växlat till en ram kommer alla efterföljande kommandon att köras i kontexten av den ramen,
inklusive navigering till olika sidor.

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
            **<code><var>returns</var></code>:**  det aktuella aktiva kontext-id