---
id: webdriver
title: Protokół WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
Komenda New Session tworzy nową sesję WebDriver z węzłem końcowym. Jeśli tworzenie nie powiedzie się, zwracany jest błąd utworzenia sesji.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-new-sessions).

##### Użycie

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>obiekt JSON, zestaw możliwości, które ostatecznie zostały scalony i dopasowane w algorytmie przetwarzania możliwości</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** Obiekt zawierający sessionId i możliwości utworzonej sesji WebDriver.


---

## deleteSession
Komenda Delete Session zamyka wszystkie główne konteksty przeglądania powiązane z bieżącą sesją, kończy połączenie i ostatecznie zamyka bieżącą sesję.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-delete-session).

##### Użycie

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>object</td>
      <td>Obiekt zawierający opcje dla komendy deleteSession, np. `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>



---

## status
Komenda Status zwraca informacje o tym, czy zdalny końcówka jest w stanie, w którym może tworzyć nowe sesje i może dodatkowo zawierać dowolne meta informacje, które są specyficzne dla implementacji.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-status).

##### Użycie

```js
browser.status()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** Obiekt zawierający status sterownika.


---

## getTimeouts
Komenda Get Timeouts pobiera czasy oczekiwania związane z bieżącą sesją.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-timeouts).

##### Użycie

```js
browser.getTimeouts()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** Obiekt zawierający czasy oczekiwania dla `script`, `pageLoad` i `implicit`.


---

## setTimeouts
Komenda Set Timeouts ustawia czasy oczekiwania powiązane z bieżącą sesją. Limity czasowe, które można kontrolować, są wymienione w tabeli limitów czasu sesji poniżej.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-set-timeouts).

##### Użycie

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>liczba całkowita w ms dla niejawnego oczekiwania sesji</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>liczba całkowita w ms dla limitu czasu ładowania strony sesji</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>liczba całkowita w ms dla limitu czasu skryptu sesji</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
Komenda Get Current URL zwraca adres URL obecnego głównego kontekstu przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-current-url).

##### Użycie

```js
browser.getUrl()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>url</var></code>:** adres URL dokumentu aktywnego dokumentu w głównym kontekście przeglądania


---

## navigateTo
Komenda navigateTo (go) służy do spowodowania nawigacji agenta użytkownika w bieżącym głównym kontekście przeglądania do nowej lokalizacji.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [url](/docs/api/browser/url). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>ciąg reprezentujący bezwzględny URL (zaczynający się od http(s)), ewentualnie zawierający fragment (#...), może być również lokalnym schematem (about: itp.)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
Komenda Back powoduje, że przeglądarka wykonuje jeden krok wstecz we wspólnej historii sesji bieżącego głównego kontekstu przeglądania. Jest to równoważne naciśnięciu przycisku wstecz w pasku narzędzi przeglądarki lub wywołaniu `window.history.back`.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-back).

##### Użycie

```js
browser.back()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```




---

## forward
Komenda Forward powoduje, że przeglądarka wykonuje jeden krok do przodu we wspólnej historii sesji bieżącego głównego kontekstu przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-forward).

##### Użycie

```js
browser.forward()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```




---

## refresh
Komenda Refresh powoduje, że przeglądarka ponownie ładuje stronę w bieżącym głównym kontekście przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-refresh).

##### Użycie

```js
browser.refresh()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```




---

## getTitle
Komenda Get Title zwraca tytuł dokumentu bieżącego głównego kontekstu przeglądania, równoważne wywołaniu `document.title`.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-title).

##### Użycie

```js
browser.getTitle()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>title</var></code>:** Zwraca ciąg, który jest taki sam jak `document.title` bieżącego głównego kontekstu przeglądania.


---

## getWindowHandle
Komenda Get Window Handle zwraca uchwyt okna dla bieżącego głównego kontekstu przeglądania. Może być używany jako argument dla Switch To Window.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-window-handle).

##### Użycie

```js
browser.getWindowHandle()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** Zwraca ciąg, który jest uchwytem okna dla bieżącego głównego kontekstu przeglądania.


---

## closeWindow
Komenda Close Window zamyka bieżący główny kontekst przeglądania. Po zakończeniu, jeśli nie ma więcej otwartych głównych kontekstów przeglądania, sama sesja WebDriver jest zamykana.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-close-window).

##### Użycie

```js
browser.closeWindow()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```




---

## switchToWindow
Komenda Switch To Window służy do wyboru bieżącego głównego kontekstu przeglądania dla bieżącej sesji, czyli tego, który będzie używany do przetwarzania poleceń.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [switchWindow](/docs/api/browser/switchWindow). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>ciąg reprezentujący uchwyt okna, powinien być jednym z ciągów zwróconych w wywołaniu getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
Utwórz nowy główny kontekst przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#new-window).

##### Użycie

```js
browser.createWindow(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>Ustaw na 'tab', jeśli nowo utworzone okno dzieli okno na poziomie systemu operacyjnego z bieżącym kontekstem przeglądania, lub 'window' w przeciwnym razie.</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** Nowy obiekt okna zawierający 'handle' z wartością uchwytu i 'type' z wartością typu utworzonego okna


---

## getWindowHandles
Komenda Get Window Handles zwraca listę uchwytów okien dla każdego otwartego głównego kontekstu przeglądania. Kolejność, w jakiej zwracane są uchwyty okien, jest dowolna.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-window-handles).

##### Użycie

```js
browser.getWindowHandles()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### Zwraca

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** Tablica będąca listą uchwytów okien.


---

## printPage
Komenda Print Page renderuje dokument do paginowanego dokumentu PDF. __Uwaga:__ Chrome obecnie obsługuje to tylko w [trybie headless](https://webdriver.io/docs/capabilities/#run-browser-headless), zobacz [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#print-page).

##### Użycie

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>orientacja strony. Domyślnie: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>skala strony. Domyślnie: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>boolean</td>
      <td>tło strony. Domyślnie: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>szerokość strony w cm. Domyślnie: `21.59` ze strony</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>wysokość strony w cm. Domyślnie: `27.94` ze strony</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>margines strony w cm od górnego marginesu. Domyślnie: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>margines strony w cm od dolnego marginesu. Domyślnie: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>margines strony w cm od lewego marginesu. Domyślnie: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>margines strony w cm od prawego marginesu. Domyślnie: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>boolean</td>
      <td>zmniejsz pdf, aby dopasować do strony. Domyślnie: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>object[]</td>
      <td>zakresy stron. Domyślnie `[]`</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** Reprezentacja PDF dokumentu w formacie base64.


---

## switchToFrame
Komenda Switch To Frame służy do wyboru bieżącego głównego kontekstu przeglądania lub kontekstu przeglądania potomnego bieżącego kontekstu przeglądania, który będzie używany jako bieżący kontekst przeglądania dla kolejnych poleceń.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

Ta komenda protokołu jest przestarzała<br />Ta komenda jest przestarzała i zachęcamy wszystkich do używania zamiast niej `switchFrame` do przełączania ramek. Więcej informacji o tej komendzie na https://webdriver.io/docs/api/browser/switchFrame.
:::

##### Użycie

```js
browser.switchToFrame(id)
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
      <td>number, object, null</td>
      <td>jeden z trzech możliwych typów: null: reprezentuje kontekst przeglądania najwyższego poziomu (tzn. nie iframe), Liczba, reprezentująca indeks obiektu window odpowiadającego ramce, obiekt Element otrzymany za pomocą `findElement`.</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
Komenda Switch to Parent Frame ustawia bieżący kontekst przeglądania dla przyszłych poleceń jako rodzica bieżącego kontekstu przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).

##### Użycie

```js
browser.switchToParentFrame()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```




---

## getWindowRect
Komenda Get Window Rect zwraca rozmiar i pozycję na ekranie okna systemu operacyjnego odpowiadającego bieżącemu głównemu kontekstowi przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [getWindowSize](/docs/api/browser/getWindowSize). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.getWindowRect()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Reprezentacja JSON obiektu "okno prostokąt". Ma 4 właściwości: `x`, `y`, `width` i `height`.


---

## setWindowRect
Komenda Set Window Rect zmienia rozmiar i pozycję okna systemu operacyjnego odpowiadającego bieżącemu głównemu kontekstowi przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [setWindowSize](/docs/api/browser/setWindowSize). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.setWindowRect(x, y, width, height)
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
      <td><code><var>x</var></code></td>
      <td>number, null</td>
      <td>atrybut screenX obiektu window</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>atrybut screenY obiektu window</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>szerokość wymiarów zewnętrznych najwyższego kontekstu przeglądania, włącznie z elementami interfejsu przeglądarki itp...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>wysokość wymiarów zewnętrznych najwyższego kontekstu przeglądania, włącznie z elementami interfejsu przeglądarki itp...</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Reprezentacja JSON obiektu "okno prostokąt" opartego na nowym stanie okna.


---

## maximizeWindow
Komenda Maximize Window wywołuje operację "maksymalizacji" specyficzną dla menedżera okien, jeśli istnieje, na oknie zawierającym bieżący główny kontekst przeglądania. Zazwyczaj zwiększa to okno do maksymalnego dostępnego rozmiaru bez przechodzenia na pełny ekran.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-maximize-window).

##### Użycie

```js
browser.maximizeWindow()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Reprezentacja JSON obiektu "okno prostokąt" opartego na nowym stanie okna.


---

## minimizeWindow
Komenda Minimize Window wywołuje operację "minimalizacji" specyficzną dla menedżera okien, jeśli istnieje, na oknie zawierającym bieżący główny kontekst przeglądania. Zazwyczaj ukrywa to okno w zasobniku systemowym.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-minimize-window).

##### Użycie

```js
browser.minimizeWindow()
```


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Reprezentacja JSON obiektu "okno prostokąt" (nowego) bieżącego głównego kontekstu przeglądania.


---

## fullscreenWindow
Komenda Fullscreen Window wywołuje operację "pełny ekran" specyficzną dla menedżera okien, jeśli istnieje, na oknie zawierającym bieżący główny kontekst przeglądania. Zazwyczaj zwiększa to okno do rozmiaru wyświetlacza fizycznego i może ukryć elementy interfejsu przeglądarki, takie jak paski narzędzi.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-fullscreen-window).

##### Użycie

```js
browser.fullscreenWindow()
```


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Reprezentacja JSON obiektu "okno prostokąt" (nowego) bieżącego głównego kontekstu przeglądania.


---

## findElement
Komenda Find Element służy do znalezienia elementu w bieżącym kontekście przeglądania, który może być używany do przyszłych poleceń. Ta komenda zwraca reprezentację JSON elementu, którą można przekazać do komendy $, aby przekształcić referencję na rozszerzony element WebdriverIO.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [$](/docs/api/browser/$). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>ważna strategia lokalizacji elementu</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>rzeczywisty selektor, który będzie używany do znalezienia elementu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### Zwraca

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Reprezentacja JSON obiektu elementu, np. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromShadowRoot
Komenda Find Element From Shadow Root służy do znalezienia elementu w korzeniu cienia elementu, który może być używany do przyszłych poleceń. Ta komenda zwraca reprezentację JSON elementu, którą można przekazać do komendy $, aby przekształcić referencję na rozszerzony element WebdriverIO.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [shadow$](/docs/api/element/shadow$). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu root shadow</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>ważna strategia lokalizacji elementu</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>rzeczywisty selektor, który będzie używany do znalezienia elementu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### Zwraca

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Reprezentacja JSON obiektu elementu shadow, np. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElements
Komenda Find Elements służy do znalezienia elementów w bieżącym kontekście przeglądania, które mogą być używane do przyszłych poleceń. Ta komenda zwraca tablicę reprezentacji JSON elementów, którą można przekazać do komendy $, aby przekształcić referencję na rozszerzony element WebdriverIO (Zobacz findElement).<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [$$](/docs/api/browser/$$). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>ważna strategia lokalizacji elementu</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>rzeczywisty selektor, który będzie używany do znalezienia elementu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### Zwraca

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** (Możliwie pusta) lista JSON reprezentacji obiektu elementu, np. `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## findElementsFromShadowRoot
Komenda Find Elements służy do znalezienia elementów w korzeniu cienia elementu, które mogą być używane do przyszłych poleceń. Ta komenda zwraca tablicę reprezentacji JSON elementów, którą można przekazać do komendy $, aby przekształcić referencję na rozszerzony element WebdriverIO (Zobacz findElement).<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [shadow$$](/docs/api/element/shadow$$). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu root shadow</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>ważna strategia lokalizacji elementu</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>rzeczywisty selektor, który będzie używany do znalezienia elementu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### Zwraca

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** (Możliwie pusta) lista JSON reprezentacji obiektu elementu, np. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromElement
Komenda Find Element From Element służy do znalezienia elementu z elementu webowego w bieżącym kontekście przeglądania, który może być używany do przyszłych poleceń. Ta komenda zwraca reprezentację JSON elementu, którą można przekazać do komendy $, aby przekształcić referencję na rozszerzony element WebdriverIO (Zobacz findElement).<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [$](/docs/api/element/$). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>ważna strategia lokalizacji elementu</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>rzeczywisty selektor, który będzie używany do znalezienia elementu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### Zwraca

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Reprezentacja JSON obiektu elementu, np. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementsFromElement
Komenda Find Elements From Element służy do znalezienia elementów z elementu webowego w bieżącym kontekście przeglądania, które mogą być używane do przyszłych poleceń. Ta komenda zwraca tablicę reprezentacji JSON elementów, którą można przekazać do komendy $, aby przekształcić referencję na rozszerzony element WebdriverIO (Zobacz findElement).<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [$$](/docs/api/element/$$). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>ważna strategia lokalizacji elementu</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>rzeczywisty selektor, który będzie używany do znalezienia elementu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### Zwraca

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** (Możliwie pusta) lista JSON reprezentacji obiektu elementu, np. `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## getElementShadowRoot
Pobierz obiekt shadow root elementu. Obiekt wynikowy może być używany do pobierania elementów w tym shadow root za pomocą np. findElementFromShadowRoots lub findElementsFromShadowRoots.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [shadow$](/docs/api/element/shadow$). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.getElementShadowRoot(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** Reprezentacja JSON elementu shadow root, np. `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## getActiveElement
Get Active Element zwraca aktywny element dokumentu bieżącego kontekstu przeglądania. Ta komenda zwraca reprezentację JSON elementu, którą można przekazać do komendy $, aby przekształcić referencję na rozszerzony element WebdriverIO (Zobacz findElement).<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-active-element).

##### Użycie

```js
browser.getActiveElement()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>element</var></code>:** Reprezentacja JSON obiektu elementu, np. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## isElementSelected
Is Element Selected określa, czy wskazany element jest zaznaczony czy nie. Ta operacja ma sens tylko na elementach wejściowych typu Checkbox i Radio Button lub elementach option.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [isSelected](/docs/api/element/isSelected). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.isElementSelected(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` lub `false` w zależności od stanu zaznaczenia.


---

## isElementDisplayed
Is Element Displayed określa widoczność elementu, którą określa to, co jest postrzegalne przez ludzkie oko. W tym kontekście, wyświetlanie elementu nie odnosi się do właściwości stylów `visibility` lub `display`.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#element-displayedness).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [isDisplayed](/docs/api/element/isDisplayed). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.isElementDisplayed(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` lub `false` w zależności od stanu widoczności.


---

## getElementAttribute
Komenda Get Element Attribute zwróci atrybut elementu webowego.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [getAttribute](/docs/api/element/getAttribute). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nazwa wartości atrybutu do pobrania</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** Nazwany atrybut elementu.


---

## getElementProperty
Komenda Get Element Property zwróci wynik uzyskania właściwości elementu.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [getProperty](/docs/api/element/getProperty). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nazwa właściwości atrybutu do pobrania</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>property</var></code>:** Nazwana właściwość elementu, uzyskana przez wywołanie GetOwnProperty na obiekcie elementu.


---

## getElementCSSValue
Komenda Get Element CSS Value pobiera obliczoną wartość podanej właściwości CSS danego elementu webowego.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [getCSSProperty](/docs/api/element/getCSSProperty). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>nazwa właściwości CSS do pobrania</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** Obliczona wartość parametru odpowiadającego nazwie właściwości z deklaracji stylów elementu (chyba że typ dokumentu to xml, w którym to przypadku wartość zwracana jest po prostu pustym ciągiem).


---

## getElementText
Komenda Get Element Text ma za zadanie zwrócić tekst elementu "tak jak jest renderowany". Renderowany tekst elementu jest również używany do lokalizowania elementów przez ich tekst linku i częściowy tekst linku.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-element-text).

##### Użycie

```js
browser.getElementText(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>text</var></code>:** Widoczny tekst elementu (włącznie z elementami potomnymi), zgodnie z algorytmem zdefiniowanym w Selenium Atoms dla [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).


---

## getElementTagName
Komenda Get Element Tag Name zwraca kwalifikowaną nazwę elementu danego elementu webowego.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [getTagName](/docs/api/element/getTagName). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.getElementTagName(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>text</var></code>:** Atrybut tagName elementu.


---

## getElementRect
Komenda Get Element Rect zwraca wymiary i współrzędne danego elementu webowego.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

Ta komenda protokołu jest osadzona w następujących wygodnych metodach: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). Zalecane jest używanie tych komend zamiast protokołu.

:::


##### Użycie

```js
browser.getElementRect(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** Obiekt JSON reprezentujący pozycję i prostokąt ograniczający elementu.


---

## isElementEnabled
Is Element Enabled określa, czy wskazany element jest włączony czy nie. Ta operacja ma sens tylko na kontrolkach formularzy.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [isEnabled](/docs/api/element/isEnabled). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.isElementEnabled(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** Jeśli element znajduje się w dokumencie xml lub jest wyłączoną kontrolką formularza: `false`, w przeciwnym razie `true`.


---

## elementClick
Komenda Element Click przewija do widoku elementu, jeśli nie jest już interaktywny wskaźnikiem, i klika jego widoczny punkt środkowy. Jeśli punkt środkowy elementu jest przysłonięty przez inny element, zwracany jest błąd przechwyconego kliknięcia elementu. Jeśli element jest poza widocznym obszarem, zwracany jest błąd elementu nieinteraktywnego.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [click](/docs/api/element/click). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.elementClick(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
Komenda Element Clear przewija do widoku edytowalny lub resetowalny element, a następnie próbuje wyczyścić jego wybrane pliki lub zawartość tekstową.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [clearValue](/docs/api/element/clearValue). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.elementClear(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
Komenda Element Send Keys przewija do widoku element kontrolki formularza, a następnie wysyła podane klawisze do elementu. W przypadku, gdy element nie jest interaktywny za pomocą klawiatury, zwracany jest błąd elementu nieinteraktywnego.<br /><br />Stan wejścia klawiatury używany do wprowadzania danych może być czyszczony w trakcie "pisania" przez wysłanie klawisza null, który jest U+E000 (NULL).<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

Ta komenda protokołu jest osadzona w następujących wygodnych metodach: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). Zalecane jest używanie tych komend zamiast protokołu.

:::


##### Użycie

```js
browser.elementSendKeys(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>ciąg do wysłania jako naciśnięcia klawiszy do elementu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
Komenda Get Page Source zwraca serializację ciągową DOM aktywnego dokumentu bieżącego kontekstu przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-page-source).

##### Użycie

```js
browser.getPageSource()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** DOM aktywnego dokumentu bieżącego kontekstu przeglądania


---

## executeScript
Komenda Execute Script wykonuje funkcję JavaScript w kontekście bieżącego kontekstu przeglądania i zwraca wartość zwróconą przez funkcję.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [execute](/docs/api/browser/execute). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>ciąg, treść funkcji Javascript, którą chcesz wykonać</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>tablica wartości JSON, które zostaną zdeserializowane i przekazane jako argumenty do funkcji</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### Zwraca

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Albo wartość zwrócona przez skrypt, spełnienie obietnicy zwróconej przez skrypt, albo błąd, który był powodem odrzucenia obietnicy zwróconej przez skrypt.


---

## executeAsyncScript
Komenda Execute Async Script powoduje wykonanie JavaScriptu jako funkcji anonimowej. W przeciwieństwie do komendy Execute Script, wynik funkcji jest ignorowany. Zamiast tego, dodatkowy argument jest dostarczany jako ostatni argument funkcji. Jest to funkcja, która po wywołaniu zwraca jej pierwszy argument jako odpowiedź.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

Ta komenda protokołu jest osadzona w następującej wygodnej metodzie: [executeAsync](/docs/api/browser/executeAsync). Zalecane jest używanie tej komendy zamiast protokołu.

:::


##### Użycie

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>ciąg, treść funkcji Javascript, którą chcesz wykonać</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>tablica wartości JSON, które zostaną zdeserializowane i przekazane jako argumenty do funkcji</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### Zwraca

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Albo wartość zwrócona przez skrypt, spełnienie obietnicy zwróconej przez skrypt, albo błąd, który był powodem odrzucenia obietnicy zwróconej przez skrypt.


---

## getAllCookies
Komenda Get All Cookies zwraca wszystkie ciasteczka powiązane z adresem aktywnego dokumentu bieżącego kontekstu przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-all-cookies).

##### Użycie

```js
browser.getAllCookies()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### Zwraca

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** Lista zserializowanych ciasteczek. Każde zserializowane ciasteczko ma kilka opcjonalnych pól, które mogą lub nie być zwrócone oprócz `name` i `value`.


---

## addCookie
Komenda Add Cookie dodaje pojedyncze ciasteczko do magazynu ciasteczek powiązanego z adresem aktywnego dokumentu.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).

##### Użycie

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>Obiekt JSON reprezentujący ciasteczko. Musi mieć co najmniej pola name i value, a może mieć więcej, w tym czas wygaśnięcia i tak dalej</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
Komenda Delete All Cookies umożliwia usunięcie wszystkich ciasteczek powiązanych z adresem aktywnego dokumentu.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).

##### Użycie

```js
browser.deleteAllCookies()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```




---

## getNamedCookie
Komenda Get Named Cookie zwraca ciasteczko o żądanej nazwie z powiązanych ciasteczek w magazynie ciasteczek aktywnego dokumentu bieżącego kontekstu przeglądania. Jeśli nie znaleziono ciasteczka, zwracany jest błąd braku takiego ciasteczka.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-named-cookie).

##### Użycie

```js
browser.getNamedCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nazwa ciasteczka do pobrania</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** Zserializowane ciasteczko, z polami name i value. Istnieje kilka opcjonalnych pól, takich jak `path`, `domain` i `expiry-time`, które również mogą być obecne.


---

## deleteCookie
Komenda Delete Cookie umożliwia usunięcie pojedynczego ciasteczka według parametru nazwy lub wszystkich ciasteczek powiązanych z adresem aktywnego dokumentu, jeśli nazwa jest niezdefiniowana.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-delete-cookie).

##### Użycie

```js
browser.deleteCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nazwa ciasteczka do usunięcia</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```




---

## performActions
Komenda Perform Actions służy do wykonywania złożonych akcji użytkownika. Zobacz [specyfikację](https://github.com/jlipps/simple-wd-spec#perform-actions) dla więcej szczegółów.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-perform-actions).

##### Użycie

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>lista obiektów, z których każdy reprezentuje źródło wejściowe i powiązane z nim akcje</td>
    </tr>
  </tbody>
</table>



---

## releaseActions
Komenda Release Actions służy do zwolnienia wszystkich klawiszy i przycisków wskaźnika, które są obecnie wciśnięte. Powoduje to generowanie zdarzeń, jakby stan został zwolniony przez wyraźną serię akcji. Czyści również cały wewnętrzny stan urządzeń wirtualnych.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-release-actions).

##### Użycie

```js
browser.releaseActions()
```



---

## dismissAlert
Komenda Dismiss Alert odrzuca proste okno dialogowe, jeśli jest obecne, w przeciwnym razie błąd. Żądanie odrzucenia monitu alertu użytkownika, który może nie mieć koniecznie przycisku odrzucenia, ma taki sam efekt jak zaakceptowanie go.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-dismiss-alert).

##### Użycie

```js
browser.dismissAlert()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```




---

## acceptAlert
Komenda Accept Alert akceptuje proste okno dialogowe, jeśli jest obecne, w przeciwnym razie błąd.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-accept-alert).

##### Użycie

```js
browser.acceptAlert()
```



---

## getAlertText
Komenda Get Alert Text zwraca wiadomość bieżącego monitu użytkownika. Jeśli nie ma bieżącego monitu użytkownika, zwraca błąd.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-get-alert-text).

##### Użycie

```js
browser.getAlertText()
```

##### Przykład

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** Wiadomość monitu użytkownika.


---

## sendAlertText
Komenda Send Alert Text ustawia pole tekstowe monitu użytkownika window.prompt na podaną wartość.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-send-alert-text).

##### Użycie

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>ciąg do ustawienia w monicie</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
Komenda Take Screenshot wykonuje zrzut ekranu obszaru widocznego głównego kontekstu przeglądania.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-take-screenshot).

##### Użycie

```js
browser.takeScreenshot()
```


##### Zwraca

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Dane obrazu PNG zakodowane w base64, składające się ze zrzutu ekranu początkowego obszaru widocznego.


---

## takeElementScreenshot
Komenda Take Element Screenshot wykonuje zrzut ekranu widocznego obszaru objętego prostokątem ograniczającym elementu.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

##### Użycie

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>boolean</td>
      <td>przewiń do widoku element. Domyślnie: true</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Dane obrazu PNG zakodowane w base64, składające się ze zrzutu ekranu widocznego obszaru prostokąta ograniczającego elementu po przewinięciu go do widoku.


---

## getElementComputedRole
Pobierz obliczoną rolę WAI-ARIA elementu.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#get-computed-role).

##### Użycie

```js
browser.getElementComputedRole(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;string&gt;**
            **<code><var>role</var></code>:** Wynik obliczenia roli WAI-ARIA elementu.


---

## getElementComputedLabel
Pobierz dostępną nazwę elementu.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/webdriver/#get-computed-label).

##### Użycie

```js
browser.getElementComputedLabel(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;string&gt;**
            **<code><var>label</var></code>:** Wynik obliczeń Accessible Name and Description Computation dla Accessible Name elementu.


---

## setPermissions
Symuluje modyfikację przez użytkownika stanu uprawnienia PermissionDescriptor. __Uwaga:__ ta funkcja nie została jeszcze zaimplementowana we wszystkich przeglądarkach.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/permissions/#set-permission-command).

##### Użycie

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>Każda potężna funkcja ma jeden lub więcej aspektów, do których witryny mogą prosić o dostęp. Aby opisać te aspekty, każda funkcja definiuje podtyp PermissionDescriptor jako swój typ deskryptora uprawnień. __Uwaga:__ ta funkcja nie została jeszcze zaimplementowana we wszystkich przeglądarkach.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Określa, czy uprawnienie jest przyznane, odrzucone lub wymagane zapytania.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>boolean</td>
      <td>Czy stosować uprawnienia do wszystkich kontekstów wykonania, czy nie.</td>
    </tr>
  </tbody>
</table>

##### Przykłady


```js
// ustawienie uprawnień midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // może być też "denied" lub "prompt"
);
```


```js
// ustawienie uprawnień schowka
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// teraz możesz odczytać schowek poprzez, np.
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```



---

## generateTestReport
Generuje raport do testowania. Rozszerzenie dla [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __Uwaga:__ ta funkcja nie została jeszcze zaimplementowana we wszystkich przeglądarkach.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/reporting/#automation).

##### Użycie

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>Wiadomość do wyświetlenia w raporcie.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Określa grupę końcową, do której dostarczyć raport.</td>
    </tr>
  </tbody>
</table>



---

## createMockSensor
Tworzy symulowany czujnik do emulacji czujników, takich jak czujnik światła otoczenia. __Uwaga:__ ta funkcja nie została jeszcze zaimplementowana we wszystkich przeglądarkach.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Użycie

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Typ API czujnika do symulacji, np. 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>Liczba zmiennoprzecinkowa reprezentująca częstotliwość w Hz, która jest używana do ustawienia maksymalnej obsługiwanej częstotliwości próbkowania dla powiązanego czujnika symulowanego.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>Liczba zmiennoprzecinkowa reprezentująca częstotliwość w Hz, która jest używana do ustawienia minimalnej obsługiwanej częstotliwości próbkowania dla powiązanego czujnika symulowanego.</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
Pobiera informacje o danym typie symulowanego czujnika. __Uwaga:__ ta funkcja nie została jeszcze zaimplementowana we wszystkich przeglądarkach.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/sensors/#get-mock-sensor-command).

##### Użycie

```js
browser.getMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Typ czujnika symulowanego, z którego pobierać informacje.</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** Wartości odczytu czujnika symulowanego.


---

## updateMockSensor
Aktualizuje typ czujnika symulowanego. __Uwaga:__ ta funkcja nie została jeszcze zaimplementowana we wszystkich przeglądarkach.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).

##### Użycie

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Typ czujnika symulowanego, dla którego zaktualizować informacje.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Typ API czujnika do symulacji, np. 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>Liczba zmiennoprzecinkowa reprezentująca częstotliwość w Hz, która jest używana do ustawienia maksymalnej obsługiwanej częstotliwości próbkowania dla powiązanego czujnika symulowanego.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>Liczba zmiennoprzecinkowa reprezentująca częstotliwość w Hz, która jest używana do ustawienia minimalnej obsługiwanej częstotliwości próbkowania dla powiązanego czujnika symulowanego.</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
Komenda Delete Session zamyka wszystkie główne konteksty przeglądania powiązane z bieżącą sesją, kończy połączenie i ostatecznie zamyka bieżącą sesję. __Uwaga:__ ta funkcja nie została jeszcze zaimplementowana we wszystkich przeglądarkach.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/sensors/#delete-mock-sensor-command).

##### Użycie

```js
browser.deleteMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Typ czujnika symulowanego do usunięcia.</td>
    </tr>
  </tbody>
</table>



---

## setTimeZone
Symuluje zmianę strefy czasowej do celów testowania. __Uwaga:__ ta funkcja nie została jeszcze zaimplementowana we wszystkich przeglądarkach.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Użycie

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>Nazwa strefy czasowej, np. Asia/Tokyo</td>
    </tr>
  </tbody>
</table>



---

## addVirtualAuthenticator
Tworzy programowy [Wirtualny Uwierzytelniacz](https://www.w3.org/TR/webauthn-2/#virtual-authenticators).<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator).

##### Użycie

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Prawidłowe wartości: 'ctap1/u2f', 'ctap2', 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Prawidłowe wartości: 'usb', 'nfc', 'ble' lub 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>boolean</td>
      <td>Prawidłowe wartości: true, false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>boolean</td>
      <td>Prawidłowe wartości: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>boolean</td>
      <td>Prawidłowe wartości: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>boolean</td>
      <td>Prawidłowe wartości: tablica zawierająca identyfikatory rozszerzeń.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string[]</td>
      <td>Prawidłowe wartości: Do 3 wpisów User Verification Method.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** Zwraca ID uwierzytelniacza jako ciąg znaków.


---

## removeVirtualAuthenticator
Usuwa wcześniej utworzony Wirtualny Uwierzytelniacz.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).

##### Użycie

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>identyfikator uwierzytelniacza</td>
    </tr>
  </tbody>
</table>



---

## addCredential
Wprowadza źródło poświadczenia klucza publicznego do istniejącego Wirtualnego Uwierzytelniacza.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).

##### Użycie

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ID uwierzytelniacza</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>ID poświadczenia zakodowane przy użyciu Base64url Encoding.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>Jeśli ustawione na true, tworzone jest poświadczenie wykrywalne po stronie klienta. Jeśli ustawione na false, zamiast tego tworzone jest poświadczenie po stronie serwera.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>ID Relying Party, do którego poświadczenie jest przypisane.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>Pakiet klucza asymetrycznego zawierający pojedynczy klucz prywatny zgodnie z [RFC5958], zakodowany przy użyciu Base64url Encoding.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>Uchwyt użytkownika powiązany z poświadczeniem zakodowanym przy użyciu Base64url Encoding. Ta właściwość może nie być zdefiniowana.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>Początkowa wartość licznika podpisów powiązanego ze źródłem klucza publicznego.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Duży, indywidualny dla poświadczenia blob powiązany ze źródłem klucza publicznego, zakodowany przy użyciu Base64url Encoding. Ta właściwość może nie być zdefiniowana.</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
Zwraca jeden obiekt Credential Parameters dla każdego źródła klucza publicznego przechowywanego w Wirtualnym Uwierzytelniaczu, niezależnie od tego, czy zostały przechowane za pomocą Add Credential czy `navigator.credentials.create()`.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).

##### Użycie

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>identyfikator uwierzytelniacza</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** Zwraca tablicę poświadczeń.


---

## removeAllCredentials
Usuwa wszystkie źródła klucza publicznego przechowywane w Wirtualnym Uwierzytelniaczu.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).

##### Użycie

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>identyfikator uwierzytelniacza</td>
    </tr>
  </tbody>
</table>



---

## removeCredential
Usuwa źródło klucza publicznego przechowywane w Wirtualnym Uwierzytelniaczu.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).

##### Użycie

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>identyfikator uwierzytelniacza</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>identyfikator poświadczenia</td>
    </tr>
  </tbody>
</table>



---

## setUserVerified
Komenda rozszerzenia Set User Verified ustawia właściwość isUserVerified na Wirtualnym Uwierzytelniaczu.<br /><br />Komenda protokołu WebDriver. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).

##### Użycie

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>identyfikator uwierzytelniacza</td>
    </tr>
  </tbody>
</table>

