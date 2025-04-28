---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

Metoda WebdriverIO `getContexts` jest ulepszoną wersją domyślnej komendy Appium `contexts`
(oraz poprzedniej WebdriverIO `getContexts`). Dostarcza szczegółowych i możliwych do działania informacji
o dostępnych kontekstach w sesji aplikacji mobilnej, rozwiązując ograniczenia domyślnych metod Appium.

### Jak działają Webview i dlaczego ta metoda pomaga
Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją Hybrid Apps](/docs/api/mobile#hybrid-apps). Poniżej znajduje się podsumowanie wyzwań, którymi zajmuje się komenda `getContexts`:

#### Wyzwania na Androidzie
- Pojedynczy webview (np. `WEBVIEW_{packageName}`) może zawierać wiele stron (podobnie jak karty przeglądarki).
- Domyślne metody Appium nie zawierają szczegółów dotyczących tych stron, takich jak `title`, `url` czy widoczność,
  co utrudnia identyfikację właściwej strony i prowadzi do potencjalnej niestabilności.

#### Wyzwania na iOS
- Domyślna metoda Appium zwraca tylko ogólne identyfikatory webview (np. `WEBVIEW_{id}`) bez dodatkowych metadanych.
- To utrudnia określenie, który webview odpowiada docelowemu ekranowi aplikacji.

Ulepszona metoda `getContexts` rozwiązuje te problemy, zwracając szczegółowe obiekty kontekstów, które zawierają:
- **Dla Androida:** `title`, `url`, `packageName`, `webviewPageId` oraz szczegóły układu (`screenX`, `screenY`, `width` i `height`).
- **Dla iOS:** `bundleId`, `title` i `url`.

Te ulepszenia sprawiają, że debugowanie i interakcja z aplikacjami hybrydowymi są bardziej niezawodne.

### Dlaczego używać tej metody?
Domyślnie metoda Appium `contexts` zwraca tylko tablicę ciągów znaków reprezentujących dostępne konteksty:
- **Dla Androida:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **Dla iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

Chociaż jest to wystarczające dla prostych scenariuszy, tym domyślnym odpowiedziom brakuje krytycznych metadanych do testowania aplikacji hybrydowych:
- **Dla Androida:** Brak metadanych specyficznych dla strony utrudnia interakcję z właściwym webview.
- **Dla iOS:** Ogólne identyfikatory webview nie dają wglądu w zawartość lub ekran aplikacji, który reprezentują.

Ulepszona metoda `getContexts` zapewnia:
- Szczegółowe metadane zarówno dla Androida, jak i iOS.
- Opcje filtrowania i dostosowywania zwracanych kontekstów w celu lepszego targetowania i interakcji.

:::info Uwagi i ograniczenia

- Ulepszona metoda `getContexts` działa zarówno na platformach Android, jak i iOS. Jednak zwracane dane mogą się różnić w zależności od platformy i testowanej aplikacji.
- Jeśli nie określisz opcji `returnDetailedContexts`, metoda zachowuje się jak domyślna metoda Appium `contexts`, zwracając prostą tablicę kontekstów.
- Aby użyć "domyślnej" metody Appium `contexts`, użyj `driver.getAppiumContexts()`. Więcej informacji znajdziesz w [dokumentacji Appium Contexts](/docs/api/appium#getappiumcontexts).

#### Webview na Androidzie:
- Metadane takie jak `androidWebviewData` są dostępne tylko wtedy, gdy `returnAndroidDescriptionData` jest ustawione na `true`.
- Używanie metody `getContexts` w przeglądarce Chrome może czasami zwracać niekompletne dane z powodu niedopasowanych wersji przeglądarki/Webview/ChromeDriver. W takich przypadkach mogą być zwracane wartości domyślne lub nieprawidłowy `webviewPageId` (np. `0`).

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
      <td>Opcje metody `getContexts` (opcjonalne)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`boolean`</td>
      <td>Domyślnie zwracamy tylko nazwy kontekstów na podstawie domyślnego API Appium `contexts`. Jeśli chcesz uzyskać wszystkie dane, możesz ustawić tę wartość na `true`. Domyślnie jest `false` (opcjonalne).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Czas w milisekundach oczekiwania między każdą próbą połączenia z webview. Domyślnie to `500` ms (opcjonalne). <br /><strong>TYLKO ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Maksymalny czas w milisekundach oczekiwania na wykrycie strony webview. Domyślnie to `5000` ms (opcjonalne). <br /><strong>TYLKO ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`boolean`</td>
      <td>Domyślnie zwracamy wszystkie webview. Jeśli chcesz filtrować webview według aktualnie otwartej aplikacji Android, możesz ustawić tę wartość na `true`. Domyślnie jest `false` (opcjonalne). <br /><strong>UWAGA:</strong> Pamiętaj, że możesz również NIE znaleźć żadnego Webview na podstawie tego "ograniczenia". <br /><strong>TYLKO ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`boolean`</td>
      <td>Domyślnie zwracamy tylko webview, które są podłączone i widoczne. Jeśli chcesz uzyskać wszystkie webview, możesz ustawić tę wartość na `false` (opcjonalne). Domyślnie jest `true`. <br /><strong>TYLKO ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`boolean`</td>
      <td>Domyślnie brak danych opisu Android Webview (Chrome). Jeśli chcesz uzyskać wszystkie dane, możesz ustawić tę wartość na `true`. Domyślnie jest `false` (opcjonalne). <br />Włączając tę opcję, otrzymasz dodatkowe dane w odpowiedzi, zobacz `description.data.test.js` dla uzyskania większej ilości informacji. <br /><strong>TYLKO ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Przykłady

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```