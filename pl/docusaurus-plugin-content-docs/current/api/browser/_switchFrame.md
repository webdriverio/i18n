---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Przełącza aktywny kontekst na ramkę, np. iframe na stronie. Istnieje kilka sposobów, aby zapytać o ramkę
na stronie:

  - Jeśli podany jest ciąg znaków, przełącza na ramkę o pasującym identyfikatorze kontekstu, adresie URL lub adresie URL, który zawiera ten ciąg
    ```ts
    // przełącz na ramkę, która ma określony URL lub zawiera ciąg znaków w URL
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Uwaga: ta ramka znajduje się w zagnieżdżonym iframe, jednak potrzebujesz tylko podać
    // URL ramki docelowej
    await browser.switchFrame('https://www.w3schools.com')
    // sprawdź tytuł strony
    console.log(await browser.execute(() => [document.title, document.URL]))
    // wynik: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Jeśli masz identyfikator kontekstu ramki, możesz go użyć bezpośrednio
    ```ts
    // przełącz na ramkę, która ma określony identyfikator kontekstu
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Jeśli podany jest element WebdriverIO, który odnosi się do elementu `iframe`, przełączy się na tę ramkę
    ```ts
    // przełącz na element ramki zapytany z bieżącego kontekstu
    await browser.switchFrame($('iframe'))
    ```

  - Jeśli podana jest funkcja, przejdzie przez wszystkie iframe na stronie i wywoła funkcję w kontekście
    obiektu. Funkcja powinna zwrócić wartość logiczną wskazującą, czy ramka powinna zostać wybrana. Funkcja
    zostanie wykonana w przeglądarce i umożliwia dostęp do wszystkich API internetowych, np.:
    ```ts
    // przełącz na pierwszą ramkę, która zawiera element z id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // przełącz na pierwszą ramkę, która zawiera "webdriver" w URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Jeśli podane jest `null`, przełączy się na ramkę najwyższego poziomu
    ```ts
    // najpierw przełącz na ramkę
    await browser.switchFrame($('iframe'))
    // wykonaj więcej automatyzacji w tej ramce, a następnie...

    // przełącz na ramkę najwyższego poziomu
    await browser.switchFrame(null)
    ```

Po przełączeniu na ramkę, wszystkie dalsze polecenia będą wykonywane w kontekście tej ramki,
w tym nawigacja do różnych stron.

##### Użycie

```js
browser.switchFrame(context)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
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

##### Zwraca

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  aktualny identyfikator aktywnego kontekstu