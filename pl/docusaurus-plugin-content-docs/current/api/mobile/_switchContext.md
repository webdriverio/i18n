---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Przełącz na określony kontekst używając podanej nazwy `name`, `title` lub `url` Webview.

Ta metoda rozszerza domyślne polecenie Appium `context`, oferując większą elastyczność i precyzję
przy przełączaniu między kontekstami natywnymi i webview w hybrydowych aplikacjach mobilnych.

### Jak działają konteksty
Aby zapoznać się z przeglądem aplikacji hybrydowych i webview, zobacz [dokumentację Hybrid Apps](/docs/api/mobile#hybrid-apps).
Poniżej znajduje się podsumowanie, jak polecenie `switchContext` rozwiązuje typowe wyzwania:

#### Wyzwania z Androidem
- Webview często zawierają wiele stron (podobnie jak karty przeglądarki). Identyfikacja właściwej strony wymaga dodatkowych
  metadanych, takich jak `title` lub `url`, które nie są domyślnie dostarczane przez metody Appium.
- Domyślne metody Appium zwracają tylko podstawowe nazwy kontekstu (np. `WEBVIEW_{packageName}`) bez szczegółów dotyczących
  zawartości lub stron w webview.
- Przełączanie kontekstów na Androidzie obejmuje dwa kroki, które są automatycznie obsługiwane przez tę metodę:
  1. Przełączenie na kontekst Webview za pomocą `WEBVIEW_{packageName}`.
  2. Wybór odpowiedniej strony w Webview za pomocą metody `switchToWindow`.

#### Wyzwania z iOS
- Webview są identyfikowane przez ogólne identyfikatory (np. `WEBVIEW_{id}`), które nie dostarczają informacji o zawartości
  lub ekranie aplikacji, do którego się odnoszą.
- Określenie poprawnego webview do interakcji często wymaga prób i błędów.

Metoda `switchContext` upraszcza ten proces, pobierając szczegółowe metadane (np. `title`, `url` i widoczność)
w celu zapewnienia dokładnego i niezawodnego przełączania kontekstu.

### Dlaczego warto używać tej metody?
- **Uproszczone przełączanie**: Jeśli znasz `title` lub `url` pożądanego webview, ta metoda eliminuje potrzebę
  dodatkowych wywołań `getContexts` lub łączenia wielu metod, takich jak `switchContext({id})` i `getTitle()`.
- **Automatyczne dopasowanie kontekstu**: Znajduje najlepsze dopasowanie kontekstu na podstawie:
  - Identyfikatorów specyficznych dla platformy (`bundleId` dla iOS, `packageName` dla Androida).
  - Dokładnych lub częściowych dopasowań dla `title` lub `url` (obsługuje zarówno ciągi znaków, jak i wyrażenia regularne).
  - Specyficznych dla Androida sprawdzeń, aby upewnić się, że webview są dołączone i widoczne.
- **Precyzyjna kontrola**: Niestandardowe interwały powtórzeń i limity czasu (tylko dla Androida) pozwalają obsłużyć opóźnienia w inicjalizacji webview.
- **Dostęp do domyślnej metody Appium**: W razie potrzeby możesz użyć domyślnego polecenia Appium `switchContext` za pomocą `driver.switchAppiumContext()`.

:::info Uwagi i ograniczenia

- Jeśli `title` lub `url` pożądanego webview jest znany, ta metoda może automatycznie zlokalizować i przełączyć się na pasujący kontekst bez dodatkowych wywołań `getContexts`.
- Opcje specyficzne dla Androida, takie jak `androidWebviewConnectionRetryTime` i `androidWebviewConnectTimeout`, nie mają zastosowania do iOS.
- Rejestruje przyczyny niepowodzeń dopasowania kontekstu, aby pomóc w debugowaniu.
- Przy użyciu obiektu jako danych wejściowych, wymagane jest `title` lub `url`.

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>Nazwa kontekstu, na który należy się przełączyć. Można dostarczyć obiekt z większą liczbą opcji kontekstu.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>Opcje polecenia switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>Tytuł strony, na którą należy się przełączyć. To będzie zawartość znacznika title na stronie webview. Możesz użyć ciągu znaków, który musi być w pełni zgodny, lub wyrażenia regularnego.<br /><strong>WAŻNE:</strong> Gdy używasz opcji, to albo właściwość `title`, albo `url` jest wymagana.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>Adres URL strony, na którą należy się przełączyć. To będzie `url` strony webview. Możesz użyć ciągu znaków, który musi być w pełni zgodny, lub wyrażenia regularnego.<br /><strong>WAŻNE:</strong> Gdy używasz opcji, to albo właściwość `title`, albo `url` jest wymagana.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Czas w milisekundach oczekiwania między każdą próbą połączenia z webview. Domyślnie `500` ms (opcjonalnie). <br /><strong>TYLKO DLA ANDROIDA</strong> i będzie używany tylko wtedy, gdy podano `title` lub `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Maksymalny czas w milisekundach oczekiwania na wykrycie strony webview. Domyślnie `5000` ms (opcjonalnie). <br /><strong>TYLKO DLA ANDROIDA</strong> i będzie używany tylko wtedy, gdy podano `title` lub `url`.</td>
    </tr>
  </tbody>
</table>

##### Przykłady

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```