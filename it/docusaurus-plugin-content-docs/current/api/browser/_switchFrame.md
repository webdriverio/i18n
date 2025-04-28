---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Cambia il contesto attivo a un frame, ad esempio un iframe sulla pagina. Ci sono diversi modi per interrogare un frame
sulla pagina:

  - Se viene fornita una stringa, passa al frame con un ID di contesto corrispondente, URL o URL che contiene quella stringa
    ```ts
    // passa a un frame che ha un URL specifico o contiene una stringa nell'URL
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Nota: questo frame si trova in un iframe nidificato, tuttavia è necessario fornire solo
    // l'URL del frame desiderato
    await browser.switchFrame('https://www.w3schools.com')
    // controlla il titolo della pagina
    console.log(await browser.execute(() => [document.title, document.URL]))
    // output: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Se hai l'ID del contesto del frame puoi usarlo direttamente
    ```ts
    // passa a un frame che ha un determinato ID di contesto
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Se viene fornito un elemento WebdriverIO che fa riferimento a un elemento `iframe`, passerà a quel frame
    ```ts
    // passa a un elemento frame interrogato dal contesto corrente
    await browser.switchFrame($('iframe'))
    ```

  - Se viene fornita una funzione, scorrerà tutti gli iframe sulla pagina e chiamerà la funzione all'interno dell'oggetto
    contesto. La funzione dovrebbe restituire un booleano che indica se il frame deve essere selezionato. La funzione
    verrà eseguita all'interno del browser e consente l'accesso a tutte le API Web, ad esempio:
    ```ts
    // passa al primo frame che contiene un elemento con id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // passa al primo frame che contiene "webdriver" nell'URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Se viene fornito `null`, passerà al frame di livello superiore
    ```ts
    // prima passa a un frame
    await browser.switchFrame($('iframe'))
    // esegui altre automazioni all'interno di quel frame, poi...

    // passa al frame di livello superiore
    await browser.switchFrame(null)
    ```

Una volta passato a un frame, tutti i comandi successivi verranno eseguiti nel contesto di quel frame,
inclusa la navigazione verso pagine diverse.

##### Utilizzo

```js
browser.switchFrame(context)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
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

##### Restituisce

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  l'ID del contesto attualmente attivo