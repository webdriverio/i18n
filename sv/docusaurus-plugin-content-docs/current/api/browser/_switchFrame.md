---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Växlar den aktiva kontexten till en ram, t.ex. en iframe på sidan. Det finns flera sätt att söka efter en ram 
på sidan:

  - Om du anger en sträng växlar den till ramen med matchande kontext-id, url eller url som innehåller den strängen
    ```ts
    // växla till en ram som har en specifik url eller innehåller en sträng i url:en
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Obs: denna ram finns i en nästlad iframe, men du behöver bara ange
    // ram-url:en för din önskade ram
    await browser.switchFrame('https://www.w3schools.com')
    // kontrollera sidans titel
    console.log(await browser.execute(() => [document.title, document.URL]))
    // ger utdata: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Om du har kontext-id för ramen kan du använda det direkt
    ```ts
    // växla till en ram som har ett visst kontext-id
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Om du anger ett WebdriverIO-element som refererar till ett `iframe`-element kommer den att växla till den ramen
    ```ts
    // växla till ett ramelement som hämtats från nuvarande kontext
    await browser.switchFrame($('iframe'))
    ```

  - Om du anger en funktion kommer den att loopa genom alla iframe på sidan och anropa funktionen inom kontext-
    objektet. Funktionen ska returnera en boolean som indikerar om ramen ska väljas. Funktionen
    kommer att köras i webbläsaren och ger tillgång till alla Web API:er, t.ex.:
    ```ts
    // växla till första ramen som innehåller ett element med id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // växla till första ramen som innehåller "webdriver" i URL:en
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Om du anger `null` kommer den att växla till ramens toppnivå
    ```ts
    // först växla till en ram
    await browser.switchFrame($('iframe'))
    // gör mer automatisering inom den ramen, sedan ...

    // växla till ramen på toppnivå
    await browser.switchFrame(null)
    ```

När du har växlat till en ram kommer alla efterföljande kommandon att köras i den ramens kontext,
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
            **<code><var>returns</var></code>:**  det nuvarande aktiva kontext-id:t