---
id: gecko
title: Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
Przechwytuje zrzut ekranu całej strony.<br /><br />Komenda Firefoxa. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46).

##### Użycie

```js
browser.fullPageScreenshot()
```


##### Zwraca

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Zakodowane w base64 dane obrazu PNG zawierające zrzut ekranu całej strony.


---

## getMozContext
Pobiera kontekst, który jest aktualnie w użyciu, np. `CHROME` lub `CONTENT`.<br /><br />Komenda Firefoxa. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622).

##### Użycie

```js
browser.getMozContext()
```

##### Przykład


```js
console.log(await browser.getMozContext()); // wyświetla: 'CHROME'
```


##### Zwraca

- **&lt;String&gt;**
            **<code><var>Context</var></code>:** Kontekst przeglądarki, albo `CHROME` albo `CONTENT`


---

## setMozContext
Zmienia kontekst docelowy dla poleceń między chrome a content.<br /><br />Zmiana bieżącego kontekstu ma statyczny wpływ na wszystkie kolejne polecenia. Kontekst `CONTENT` ma normalne uprawnienia dokumentu platformy internetowej, tak jakbyś oceniał dowolny JavaScript. Kontekst `CHROME` uzyskuje podwyższone uprawnienia, które pozwalają manipulować samym interfejsem przeglądarki, z pełnym dostępem do zestawu narzędzi XUL.<br /><br />Komenda Firefoxa. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645).

##### Użycie

```js
browser.setMozContext(context)
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
      <td>string</td>
      <td>Kontekst przeglądarki, albo `CHROME` albo `CONTENT`</td>
    </tr>
  </tbody>
</table>

##### Przykład


```js
console.log(await browser.getMozContext()); // wyświetla: 'CHROME'
browser.setMozContext('CONTENT');
console.log(await browser.getMozContext()); // wyświetla: 'CONTENT'
```



---

## installAddOn
Instaluje nowy dodatek w bieżącej sesji. Ta funkcja zwróci ID, które może być później użyte do odinstalowania dodatku za pomocą `uninstallAddon`.<br /><br />Komenda Firefoxa. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668).

##### Użycie

```js
browser.installAddOn(addon, temporary)
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
      <td><code><var>addon</var></code></td>
      <td>string</td>
      <td>ciąg base64 pliku dodatku</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>temporary Flaga wskazująca, czy rozszerzenie powinno być zainstalowane tymczasowo - zostanie usunięte po ponownym uruchomieniu</td>
    </tr>
  </tbody>
</table>

##### Przykład


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
```


##### Zwraca

- **&lt;String&gt;**
            **<code><var>id</var></code>:** Obietnica, która zostanie rozwiązana do ID dla nowo zainstalowanego dodatku.


---

## uninstallAddOn
Odinstalowuje dodatek z profilu bieżącej sesji przeglądarki.<br /><br />Komenda Firefoxa. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687).

##### Użycie

```js
browser.uninstallAddOn(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>id ID dodatku do odinstalowania.</td>
    </tr>
  </tbody>
</table>

##### Przykład


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
// ...
await browser.uninstallAddOn(id)
```