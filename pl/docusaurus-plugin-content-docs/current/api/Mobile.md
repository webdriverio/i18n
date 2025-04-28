---
id: mobile
title: Komendy Mobilne
---

# Wprowadzenie do niestandardowych i rozszerzonych Komend Mobilnych w WebdriverIO

Testowanie aplikacji mobilnych i mobilnych aplikacji webowych wiąże się z własnymi wyzwaniami, szczególnie gdy mamy do czynienia z różnicami między platformami Android i iOS. Chociaż Appium zapewnia elastyczność w obsłudze tych różnic, często wymaga zagłębienia się w złożoną, zależną od platformy dokumentację ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) i komendy. Może to sprawić, że pisanie skryptów testowych jest bardziej czasochłonne, podatne na błędy i trudne w utrzymaniu.

Aby uprościć ten proces, WebdriverIO wprowadza **niestandardowe i rozszerzone komendy mobilne** dostosowane specjalnie do testowania mobilnych aplikacji webowych i natywnych. Te komendy abstrahują zawiłości podstawowych API Appium, umożliwiając pisanie zwięzłych, intuicyjnych i niezależnych od platformy skryptów testowych. Skupiając się na łatwości użytkowania, dążymy do zmniejszenia dodatkowego obciążenia podczas tworzenia skryptów Appium i umożliwienia łatwej automatyzacji aplikacji mobilnych.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Dlaczego niestandardowe komendy mobilne?

### 1. **Uproszczenie złożonych API**
Niektóre komendy Appium, takie jak gesty czy interakcje z elementami, wymagają rozbudowanej i złożonej składni. Na przykład, wykonanie akcji długiego naciśnięcia za pomocą natywnego API Appium wymaga ręcznego skonstruowania łańcucha `action`:

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

Dzięki niestandardowym komendom WebdriverIO, tę samą akcję można wykonać za pomocą jednej, wyrazistej linii kodu:

```ts
await $('~Contacts').longPress();
```

To drastycznie redukuje kod szablonowy, czyniąc skrypty czystszymi i łatwiejszymi do zrozumienia.

### 2. **Abstrakcja między platformami**
Aplikacje mobilne często wymagają obsługi specyficznej dla platformy. Na przykład, przewijanie w natywnych aplikacjach znacznie różni się między [Androidem](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) a [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO niweluje tę różnicę, dostarczając ujednolicone komendy, takie jak `scrollIntoView()`, które działają płynnie na wszystkich platformach, niezależnie od podstawowej implementacji.

```ts
await $('~element').scrollIntoView();
```

Ta abstrakcja zapewnia, że Twoje testy są przenośne i nie wymagają ciągłego rozgałęziania lub logiki warunkowej, aby uwzględnić różnice między systemami operacyjnymi.

### 3. **Zwiększona produktywność**
Dzięki zmniejszeniu potrzeby zrozumienia i implementacji niskopoziomowych komend Appium, komendy mobilne WebdriverIO pozwalają skupić się na testowaniu funkcjonalności aplikacji, zamiast zmagania się z niuansami specyficznymi dla platformy. Jest to szczególnie korzystne dla zespołów z ograniczonym doświadczeniem w automatyzacji mobilnej lub tych, którzy chcą przyspieszyć cykl rozwoju.

### 4. **Spójność i łatwość utrzymania**
Niestandardowe komendy wprowadzają jednolitość do skryptów testowych. Zamiast mieć różne implementacje dla podobnych akcji, Twój zespół może polegać na standardowych, wielokrotnie używanych komendach. To nie tylko sprawia, że kod jest łatwiejszy w utrzymaniu, ale także obniża barierę wejścia dla nowych członków zespołu.

## Dlaczego rozszerzać niektóre komendy mobilne?

### 1. Dodawanie elastyczności
Niektóre komendy mobilne są rozszerzone, aby zapewnić dodatkowe opcje i parametry, które nie są dostępne w domyślnych API Appium. Na przykład, WebdriverIO dodaje logikę ponawiania, limity czasu i możliwość filtrowania webview według określonych kryteriów, zapewniając większą kontrolę nad złożonymi scenariuszami.

```ts
// Przykład: Dostosowywanie interwałów ponowień i limitów czasu dla wykrywania webview
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Ponowienie co 1 sekundę
  androidWebviewConnectTimeout: 10000,    // Limit czasu po 10 sekundach
});
```

Te opcje pomagają dostosować skrypty automatyzacji do dynamicznego zachowania aplikacji bez dodatkowego kodu szablonowego.

### 2. Poprawa użyteczności
Rozszerzone komendy abstrahują złożoności i powtarzalne wzorce obecne w natywnych API. Pozwalają na wykonywanie większej liczby działań za pomocą mniejszej liczby linii kodu, zmniejszając krzywą uczenia się dla nowych użytkowników i ułatwiając czytanie i utrzymanie skryptów.

```ts
// Przykład: Rozszerzona komenda do przełączania kontekstu według tytułu
await driver.switchContext({
  title: 'My Webview Title',
});
```

W porównaniu do domyślnych metod Appium, rozszerzone komendy eliminują potrzebę dodatkowych kroków, takich jak ręczne pobieranie dostępnych kontekstów i ich filtrowanie.

### 3. Standaryzacja zachowania
WebdriverIO zapewnia, że rozszerzone komendy zachowują się spójnie na platformach takich jak Android i iOS. Ta abstrakcja między platformami minimalizuje potrzebę warunkowego rozgałęziania logiki w zależności od systemu operacyjnego, prowadząc do łatwiejszych w utrzymaniu skryptów testowych.

```ts
// Przykład: Ujednolicona komenda przewijania dla obu platform
await $('~element').scrollIntoView();
```

Ta standaryzacja upraszcza kod, szczególnie dla zespołów automatyzujących testy na wielu platformach.

### 4. Zwiększenie niezawodności
Poprzez włączenie mechanizmów ponawiania, inteligentnych wartości domyślnych i szczegółowych komunikatów o błędach, rozszerzone komendy zmniejszają prawdopodobieństwo niestabilnych testów. Te ulepszenia zapewniają, że Twoje testy są odporne na problemy, takie jak opóźnienia w inicjalizacji webview lub przejściowe stany aplikacji.

```ts
// Przykład: Rozszerzone przełączanie webview z solidną logiką dopasowania
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

To sprawia, że wykonanie testów jest bardziej przewidywalne i mniej podatne na błędy spowodowane czynnikami środowiskowymi.

### 5. Rozszerzenie możliwości debugowania
Rozszerzone komendy często zwracają bogatsze metadane, umożliwiając łatwiejsze debugowanie złożonych scenariuszy, szczególnie w aplikacjach hybrydowych. Na przykład, komendy takie jak getContext i getContexts mogą zwracać szczegółowe informacje o webview, w tym tytuł, adres URL i status widoczności.

```ts
// Przykład: Pobieranie szczegółowych metadanych do debugowania
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Te metadane pomagają szybciej identyfikować i rozwiązywać problemy, poprawiając ogólne doświadczenie debugowania.


Poprzez rozszerzanie komend mobilnych, WebdriverIO nie tylko ułatwia automatyzację, ale także realizuje swoją misję dostarczania deweloperom narzędzi, które są potężne, niezawodne i intuicyjne w użyciu.

---

## Aplikacje hybrydowe

Aplikacje hybrydowe łączą treści webowe z funkcjonalnością natywną i wymagają specjalistycznej obsługi podczas automatyzacji. Te aplikacje używają webview do renderowania treści webowych w natywnej aplikacji. WebdriverIO zapewnia rozszerzone metody efektywnej pracy z aplikacjami hybrydowymi.

### Zrozumienie Webview
Webview to komponent podobny do przeglądarki, osadzony w natywnej aplikacji:

- **Android:** Webview są oparte na Chrome/System Webview i mogą zawierać wiele stron (podobnie do kart przeglądarki). Te webview wymagają ChromeDrivera do automatyzacji interakcji. Appium może automatycznie określić wymaganą wersję ChromeDrivera na podstawie wersji System WebView lub Chrome zainstalowanej na urządzeniu i pobrać ją automatycznie, jeśli nie jest jeszcze dostępna. To podejście zapewnia płynną kompatybilność i minimalizuje ręczną konfigurację. Zapoznaj się z [dokumentacją Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver), aby dowiedzieć się, jak Appium automatycznie pobiera odpowiednią wersję ChromeDrivera.
- **iOS:** Webview są napędzane przez Safari (WebKit) i identyfikowane przez ogólne identyfikatory, takie jak `WEBVIEW_{id}`.

### Wyzwania z aplikacjami hybrydowymi
1. Identyfikacja odpowiedniego webview spośród wielu opcji.
2. Pobieranie dodatkowych metadanych, takich jak tytuł, URL lub nazwa pakietu, dla lepszego kontekstu.
3. Obsługa różnic specyficznych dla platformy między Androidem a iOS.
4. Niezawodne przełączanie do właściwego kontekstu w aplikacji hybrydowej.

### Kluczowe komendy dla aplikacji hybrydowych

#### 1. `getContext`
Pobiera aktualny kontekst sesji. Domyślnie zachowuje się jak metoda getContext Appium, ale może dostarczać szczegółowych informacji o kontekście, gdy włączona jest opcja `returnDetailedContext`. Więcej informacji znajdziesz w [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Zwraca szczegółową listę dostępnych kontekstów, ulepszając metodę contexts Appium. Ułatwia to identyfikację odpowiedniego webview do interakcji bez konieczności wywoływania dodatkowych poleceń w celu określenia tytułu, adresu URL lub aktywnego `bundleId|packageName`. Więcej informacji znajdziesz w [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Przełącza na określony webview na podstawie nazwy, tytułu lub adresu URL. Zapewnia dodatkową elastyczność, taką jak używanie wyrażeń regularnych do dopasowywania. Więcej informacji znajdziesz w [`switchContext`](/docs/api/mobile/switchContext)

### Kluczowe funkcje dla aplikacji hybrydowych
1. Szczegółowe metadane: Pobieranie kompleksowych informacji do debugowania i niezawodnego przełączania kontekstu.
2. Spójność między platformami: Ujednolicone zachowanie dla Android i iOS, płynnie obsługujące szczególne cechy platform.
3. Niestandardowa logika ponawiania (Android): Dostosowanie interwałów ponawiania i limitów czasu dla wykrywania webview.


:::info Uwagi i ograniczenia
- Android dostarcza dodatkowe metadane, takie jak `packageName` i `webviewPageId`, podczas gdy iOS koncentruje się na `bundleId`.
- Logika ponawiania jest konfigurowalna dla Androida, ale nie ma zastosowania do iOS.
- Istnieje kilka przypadków, w których iOS nie może znaleźć Webview. Appium zapewnia różne dodatkowe możliwości dla `appium-xcuitest-driver` do znalezienia Webview. Jeśli uważasz, że Webview nie został znaleziony, możesz spróbować ustawić jedną z następujących możliwości:
    - `appium:includeSafariInWebviews`: Dodaje konteksty webowe Safari do listy kontekstów dostępnych podczas testu aplikacji natywnej/webview. Jest to przydatne, jeśli test otwiera Safari i wymaga możliwości interakcji z nim. Domyślnie `false`.
    - `appium:webviewConnectRetries`: Maksymalna liczba prób przed rezygnacją z wykrywania stron webview. Opóźnienie między kolejnymi próbami wynosi 500 ms, domyślnie `10` prób.
    - `appium:webviewConnectTimeout`: Maksymalny czas w milisekundach oczekiwania na wykrycie strony webview. Domyślnie `5000` ms.

Aby uzyskać zaawansowane przykłady i szczegóły, zobacz dokumentację WebdriverIO Mobile API.
:::


---

Nasz rosnący zestaw komend odzwierciedla nasze zaangażowanie w uczynienie automatyzacji mobilnej dostępną i elegancką. Niezależnie od tego, czy wykonujesz skomplikowane gesty, czy pracujesz z natywnymi elementami aplikacji, te komendy są zgodne z filozofią WebdriverIO tworzenia płynnego doświadczenia automatyzacji. I nie zatrzymujemy się tutaj - jeśli jest funkcja, którą chciałbyś zobaczyć, chętnie przyjmiemy Twoje sugestie. Śmiało przesyłaj swoje prośby za pomocą [tego linku](https://github.com/webdriverio/webdriverio/issues/new/choose).