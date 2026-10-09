---
id: mobile
title: Polecenia mobilne
---

# Wprowadzenie do niestandardowych i rozszerzonych poleceń mobilnych w WebdriverIO

Testowanie aplikacji mobilnych i mobilnych aplikacji internetowych wiąże się z własnymi wyzwaniami, zwłaszcza w przypadku różnic specyficznych dla platform Android i iOS. Chociaż Appium zapewnia elastyczność w radzeniu sobie z tymi różnicami, często wymaga zagłębiania się w złożoną, zależną od platformy dokumentację ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) i polecenia. Może to sprawić, że pisanie skryptów testowych staje się bardziej czasochłonne, podatne na błędy i trudne w utrzymaniu.

Aby uprościć ten proces, WebdriverIO wprowadza **niestandardowe i rozszerzone polecenia mobilne** dostosowane specjalnie do testowania mobilnych aplikacji internetowych i natywnych. Polecenia te ukrywają zawiłości bazowych API Appium, umożliwiając pisanie zwięzłych, intuicyjnych i niezależnych od platformy skryptów testowych. Koncentrując się na łatwości użycia, staramy się zmniejszyć dodatkowe obciążenie podczas tworzenia skryptów Appium i umożliwić Ci bezproblemową automatyzację aplikacji mobilnych.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Dlaczego niestandardowe polecenia mobilne?

### 1. **Upraszczanie złożonych API**
Niektóre polecenia Appium, takie jak gesty czy interakcje z elementami, wymagają rozwlekłej i zawiłej składni. Na przykład wykonanie akcji długiego naciśnięcia za pomocą natywnego API Appium wymaga ręcznego zbudowania łańcucha `action`:

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

Dzięki niestandardowym poleceniom WebdriverIO tę samą akcję można wykonać za pomocą jednej, wyrazistej linii kodu:

```ts
await $('~Contacts').longPress();
```

To drastycznie zmniejsza ilość powtarzalnego kodu, sprawiając, że Twoje skrypty są czystsze i łatwiejsze do zrozumienia.

### 2. **Abstrakcja międzyplatformowa**
Aplikacje mobilne często wymagają obsługi specyficznej dla platformy. Na przykład przewijanie w aplikacjach natywnych znacząco różni się między [Androidem](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) a [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO niweluje tę różnicę, udostępniając ujednolicone polecenia, takie jak `scrollIntoView()`, które działają bezproblemowo na wszystkich platformach, niezależnie od implementacji bazowej.

```ts
await $('~element').scrollIntoView();
```

Ta abstrakcja zapewnia przenośność Twoich testów i eliminuje potrzebę ciągłego rozgałęziania lub logiki warunkowej uwzględniającej różnice między systemami operacyjnymi.

### 3. **Zwiększona produktywność**
Zmniejszając potrzebę rozumienia i implementowania niskopoziomowych poleceń Appium, polecenia mobilne WebdriverIO pozwalają skupić się na testowaniu funkcjonalności aplikacji zamiast zmagać się z niuansami specyficznymi dla platform. Jest to szczególnie korzystne dla zespołów z ograniczonym doświadczeniem w automatyzacji mobilnej lub tych, które chcą przyspieszyć swój cykl rozwoju.

### 4. **Spójność i łatwość utrzymania**
Niestandardowe polecenia wprowadzają jednolitość do Twoich skryptów testowych. Zamiast różnych implementacji podobnych akcji, Twój zespół może polegać na ustandaryzowanych poleceniach wielokrotnego użytku. Sprawia to nie tylko, że baza kodu jest łatwiejsza w utrzymaniu, ale także obniża próg wejścia dla nowych członków zespołu.

## Dlaczego rozszerzać niektóre polecenia mobilne?

### 1. Zwiększanie elastyczności
Niektóre polecenia mobilne zostały rozszerzone o dodatkowe opcje i parametry, które nie są dostępne w domyślnych API Appium. Na przykład WebdriverIO dodaje logikę ponawiania, limity czasu oraz możliwość filtrowania webview według określonych kryteriów, co daje większą kontrolę nad złożonymi scenariuszami.

```ts
// Przykład: Dostosowanie interwałów ponawiania i limitów czasu dla wykrywania webview
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Ponawiaj co 1 sekundę
  androidWebviewConnectTimeout: 10000,    // Limit czasu po 10 sekundach
});
```

Opcje te pomagają dostosować skrypty automatyzacji do dynamicznego zachowania aplikacji bez dodatkowego powtarzalnego kodu.

### 2. Poprawa użyteczności
Rozszerzone polecenia ukrywają złożoność i powtarzalne wzorce występujące w natywnych API. Pozwalają wykonać więcej akcji przy mniejszej liczbie linii kodu, skracając krzywą uczenia się dla nowych użytkowników i sprawiając, że skrypty są łatwiejsze do czytania i utrzymania.

```ts
// Przykład: Rozszerzone polecenie przełączania kontekstu według tytułu
await driver.switchContext({
  title: 'My Webview Title',
});
```

W porównaniu z domyślnymi metodami Appium, rozszerzone polecenia eliminują potrzebę wykonywania dodatkowych kroków, takich jak ręczne pobieranie dostępnych kontekstów i ich filtrowanie.

### 3. Standaryzacja zachowania
WebdriverIO zapewnia, że rozszerzone polecenia zachowują się spójnie na platformach takich jak Android i iOS. Ta abstrakcja międzyplatformowa minimalizuje potrzebę stosowania logiki warunkowej zależnej od systemu operacyjnego, co prowadzi do łatwiejszych w utrzymaniu skryptów testowych.

```ts
// Przykład: Ujednolicone polecenie przewijania dla obu platform
await $('~element').scrollIntoView();
```

Ta standaryzacja upraszcza bazy kodu, szczególnie w zespołach automatyzujących testy na wielu platformach.

### 4. Zwiększanie niezawodności
Dzięki mechanizmom ponawiania, inteligentnym wartościom domyślnym i szczegółowym komunikatom o błędach, rozszerzone polecenia zmniejszają prawdopodobieństwo niestabilnych testów. Te usprawnienia zapewniają odporność testów na problemy takie jak opóźnienia w inicjalizacji webview czy przejściowe stany aplikacji.

```ts
// Przykład: Rozszerzone przełączanie webview z solidną logiką dopasowywania
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Sprawia to, że wykonywanie testów jest bardziej przewidywalne i mniej podatne na niepowodzenia spowodowane czynnikami środowiskowymi.

### 5. Rozszerzanie możliwości debugowania
Rozszerzone polecenia często zwracają bogatsze metadane, ułatwiając debugowanie złożonych scenariuszy, szczególnie w aplikacjach hybrydowych. Na przykład polecenia takie jak getContext i getContexts mogą zwracać szczegółowe informacje o webview, w tym tytuł, url i status widoczności.

```ts
// Przykład: Pobieranie szczegółowych metadanych do debugowania
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Te metadane pomagają szybciej identyfikować i rozwiązywać problemy, poprawiając ogólne doświadczenie debugowania.


Rozszerzając polecenia mobilne, WebdriverIO nie tylko ułatwia automatyzację, ale także realizuje swoją misję dostarczania programistom narzędzi, które są potężne, niezawodne i intuicyjne w użyciu.

## Aplikacje hybrydowe

Aplikacje hybrydowe łączą treści internetowe z natywną funkcjonalnością i wymagają specjalnej obsługi podczas automatyzacji. Aplikacje te używają webview do renderowania treści internetowych w aplikacji natywnej. WebdriverIO udostępnia rozszerzone metody do efektywnej pracy z aplikacjami hybrydowymi.

### Zrozumienie webview
Webview to komponent przypominający przeglądarkę, osadzony w aplikacji natywnej:

- **Android:** Webview są oparte na Chrome/System Webview i mogą zawierać wiele stron (podobnie jak karty przeglądarki). Te webview wymagają ChromeDriver do automatyzacji interakcji. Appium może automatycznie określić wymaganą wersję ChromeDriver na podstawie wersji System WebView lub Chrome zainstalowanej na urządzeniu i automatycznie ją pobrać, jeśli nie jest jeszcze dostępna. Takie podejście zapewnia bezproblemową kompatybilność i minimalizuje ręczną konfigurację. Zapoznaj się z [dokumentacją Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver), aby dowiedzieć się, jak Appium automatycznie pobiera właściwą wersję ChromeDriver.
- **iOS:** Webview są obsługiwane przez Safari (WebKit) i identyfikowane przez ogólne identyfikatory, takie jak `WEBVIEW_{id}`.

### Wyzwania związane z aplikacjami hybrydowymi
1. Identyfikacja właściwego webview spośród wielu opcji.
2. Pobieranie dodatkowych metadanych, takich jak tytuł, URL lub nazwa pakietu, dla lepszego kontekstu.
3. Obsługa różnic specyficznych dla platform Android i iOS.
4. Niezawodne przełączanie do właściwego kontekstu w aplikacji hybrydowej.

### Kluczowe polecenia dla aplikacji hybrydowych

#### 1. `getContext`
Pobiera bieżący kontekst sesji. Domyślnie działa jak metoda getContext w Appium, ale może dostarczać szczegółowe informacje o kontekście, gdy włączona jest opcja `returnDetailedContext`. Więcej informacji znajdziesz w [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Zwraca szczegółową listę dostępnych kontekstów, ulepszając metodę contexts z Appium. Ułatwia to identyfikację właściwego webview do interakcji bez wywoływania dodatkowych poleceń w celu określenia tytułu, url lub aktywnego `bundleId|packageName`. Więcej informacji znajdziesz w [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Przełącza do określonego webview na podstawie nazwy, tytułu lub url. Zapewnia dodatkową elastyczność, na przykład możliwość używania wyrażeń regularnych do dopasowywania. Więcej informacji znajdziesz w [`switchContext`](/docs/api/mobile/switchContext)

### Kluczowe funkcje dla aplikacji hybrydowych
1. Szczegółowe metadane: Pobieranie kompleksowych szczegółów do debugowania i niezawodnego przełączania kontekstu.
2. Spójność międzyplatformowa: Ujednolicone zachowanie dla Androida i iOS, bezproblemowo obsługujące osobliwości specyficzne dla platform.
3. Niestandardowa logika ponawiania (Android): Dostosowanie interwałów ponawiania i limitów czasu dla wykrywania webview.


:::info Uwagi i ograniczenia
- Android dostarcza dodatkowe metadane, takie jak `packageName` i `webviewPageId`, podczas gdy iOS skupia się na `bundleId`.
- Logikę ponawiania można dostosować dla Androida, ale nie ma ona zastosowania w iOS.
- Istnieje kilka przypadków, w których iOS nie może znaleźć Webview. Appium udostępnia różne dodatkowe capabilities dla `appium-xcuitest-driver`, aby znaleźć Webview. Jeśli uważasz, że Webview nie został znaleziony, możesz spróbować ustawić jedną z następujących capabilities:
    - `appium:includeSafariInWebviews`: Dodaje konteksty internetowe Safari do listy kontekstów dostępnych podczas testu aplikacji natywnej/webview. Jest to przydatne, jeśli test otwiera Safari i musi mieć możliwość interakcji z nim. Domyślnie `false`.
    - `appium:webviewConnectRetries`: Maksymalna liczba ponowień przed zaprzestaniem wykrywania stron webview. Opóźnienie między kolejnymi próbami wynosi 500 ms, domyślnie `10` ponowień.
    - `appium:webviewConnectTimeout`: Maksymalny czas w milisekundach oczekiwania na wykrycie strony webview. Domyślnie `5000` ms.

Zaawansowane przykłady i szczegóły znajdziesz w dokumentacji WebdriverIO Mobile API.
:::


---

Nasz stale rosnący zestaw poleceń odzwierciedla nasze zaangażowanie w to, aby automatyzacja mobilna była dostępna i elegancka. Niezależnie od tego, czy wykonujesz złożone gesty, czy pracujesz z elementami aplikacji natywnych, polecenia te są zgodne z filozofią WebdriverIO polegającą na tworzeniu bezproblemowego doświadczenia automatyzacji. I nie poprzestajemy na tym — jeśli jest funkcja, którą chciałbyś zobaczyć, chętnie przyjmiemy Twoją opinię. Możesz przesłać swoje prośby za pośrednictwem [tego linku](https://github.com/webdriverio/webdriverio/issues/new/choose).