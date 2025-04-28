---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Pobierz kontekst bieżącej sesji.

Ta metoda rozszerza domyślne polecenie Appium `context`/WebdriverIO `getContext`, oferując opcję
zwrotu szczegółowych informacji o kontekście, co ułatwia pracę z aplikacjami hybrydowymi wykorzystującymi webview.

### Jak działają konteksty
Więcej informacji znajdziesz w [dokumentacji aplikacji hybrydowych](/docs/api/mobile#hybrid-apps). Poniżej wyjaśniono wyzwania związane z poleceniem `getContext`:

#### Dla Androida:
- Webview może zawierać wiele stron (podobnie jak karty przeglądarki), a identyfikacja właściwej strony wymaga dodatkowych metadanych,
  takich jak `title` lub `url`.
- Domyślne metody Appium dostarczają tylko podstawowe nazwy kontekstów (np. `WEBVIEW_{packageName}`) bez szczegółowych informacji
  o stronach wewnątrz webview.

#### Dla iOS:
- Każdy webview jest identyfikowany przez ogólny ciąg znaków `WEBVIEW_{id}`, który nie wskazuje jego zawartości ani ekranu aplikacji,
  do którego należy.

### Dlaczego warto używać tej metody?
- **Domyślne zachowanie**:
  - Zwraca bieżący kontekst jako ciąg znaków (np. `NATIVE_APP` lub `WEBVIEW_{id}`).
- **Szczegółowy kontekst**:
  - Gdy włączona jest opcja `returnDetailedContext`, pobiera metadane takie jak:
    - **Android**: `packageName`, `title`, `url` oraz `webviewPageId`.
    - **iOS**: `bundleId`, `title` oraz `url`.
- **Opcje specyficzne dla Androida**:
  - Interwały ponownych prób i limity czasu można dostosować, aby obsłużyć opóźnienia w inicjalizacji webview.

:::info Uwagi i ograniczenia

- Jeśli opcja `returnDetailedContext` nie jest włączona, metoda działa jak domyślna metoda Appium `getContext`.
- Jeśli chcesz użyć "domyślnej" metody Appium `context`, możesz użyć metody `driver.getAppiumContext()`, zobacz
również polecenie [Appium Contexts](/docs/api/appium#getappiumcontext).
- **Android:** Opcje specyficzne dla Androida (`androidWebviewConnectionRetryTime` i `androidWebviewConnectTimeout`) nie mają wpływu na iOS.
- Wyświetla ostrzeżenia, jeśli znaleziono wiele lub żadnych szczegółowych kontekstów:
  - `We found more than 1 detailed context for the current context '{context}'. We will return the first context.`
  - `We did not get back any detailed context for the current context '{context}'. We will return the current context as a string.`

:::

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`GetContextsOptions`</td>
      <td>Opcje `getContext` (opcjonalne)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`boolean`</td>
      <td>Domyślnie zwracamy tylko nazwę kontekstu bazującą na domyślnym API Appium `context`, które jest tylko ciągiem znaków. Jeśli chcesz otrzymać szczegółowe informacje o kontekście, ustaw tę wartość na `true`. Domyślnie jest `false` (opcjonalne).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Czas w milisekundach oczekiwania między każdą próbą połączenia z widokiem webview. Domyślnie `500` ms (opcjonalne). <br /><strong>TYLKO DLA ANDROIDA</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Maksymalny czas w milisekundach oczekiwania na wykrycie strony widoku webview. Domyślnie `5000` ms (opcjonalne). <br /><strong>TYLKO DLA ANDROIDA</strong></td>
    </tr>
  </tbody>
</table>

##### Przykłady

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```