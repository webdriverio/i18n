---
id: mobile
title: Mobile-Befehle
---

# Einführung in benutzerdefinierte und erweiterte Mobile-Befehle in WebdriverIO

Das Testen von mobilen Apps und mobilen Webanwendungen bringt eigene Herausforderungen mit sich, insbesondere beim Umgang mit plattformspezifischen Unterschieden zwischen Android und iOS. Während Appium die Flexibilität bietet, diese Unterschiede zu handhaben, erfordert es oft, dass Sie tief in komplexe, plattformabhängige Dokumentationen ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) und Befehle eintauchen. Dies kann das Schreiben von Testskripten zeitaufwändiger, fehleranfälliger und schwieriger zu warten machen.

Um den Prozess zu vereinfachen, führt WebdriverIO **benutzerdefinierte und erweiterte Mobile-Befehle** ein, die speziell auf das Testen von mobilen Web- und nativen Apps zugeschnitten sind. Diese Befehle abstrahieren die Feinheiten der zugrunde liegenden Appium-APIs und ermöglichen es Ihnen, prägnante, intuitive und plattformunabhängige Testskripte zu schreiben. Mit dem Fokus auf Benutzerfreundlichkeit möchten wir den zusätzlichen Aufwand bei der Entwicklung von Appium-Skripten reduzieren und Sie in die Lage versetzen, mobile Apps mühelos zu automatisieren.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Warum benutzerdefinierte Mobile-Befehle?

### 1. **Vereinfachung komplexer APIs**
Einige Appium-Befehle, wie Gesten oder Elementinteraktionen, beinhalten eine umfangreiche und komplizierte Syntax. Um beispielsweise eine Long-Press-Aktion mit der nativen Appium-API auszuführen, muss eine `action`-Kette manuell erstellt werden:

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

Mit den benutzerdefinierten Befehlen von WebdriverIO kann dieselbe Aktion mit einer einzigen, ausdrucksstarken Codezeile ausgeführt werden:

```ts
await $('~Contacts').longPress();
```

Dies reduziert Boilerplate-Code drastisch und macht Ihre Skripte übersichtlicher und leichter verständlich.

### 2. **Plattformübergreifende Abstraktion**
Mobile Apps erfordern oft eine plattformspezifische Behandlung. Beispielsweise unterscheidet sich das Scrollen in nativen Apps erheblich zwischen [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) und [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO überbrückt diese Lücke, indem es einheitliche Befehle wie `scrollIntoView()` bereitstellt, die unabhängig von der zugrunde liegenden Implementierung nahtlos plattformübergreifend funktionieren.

```ts
await $('~element').scrollIntoView();
```

Diese Abstraktion stellt sicher, dass Ihre Tests portabel sind und keine ständigen Verzweigungen oder bedingte Logik erfordern, um Betriebssystemunterschiede zu berücksichtigen.

### 3. **Gesteigerte Produktivität**
Indem die Notwendigkeit reduziert wird, Low-Level-Appium-Befehle zu verstehen und zu implementieren, ermöglichen die Mobile-Befehle von WebdriverIO, dass Sie sich auf das Testen der Funktionalität Ihrer App konzentrieren können, anstatt sich mit plattformspezifischen Nuancen herumzuschlagen. Dies ist besonders vorteilhaft für Teams mit begrenzter Erfahrung in der mobilen Automatisierung oder für diejenigen, die ihren Entwicklungszyklus beschleunigen möchten.

### 4. **Konsistenz und Wartbarkeit**
Benutzerdefinierte Befehle bringen Einheitlichkeit in Ihre Testskripte. Anstatt unterschiedliche Implementierungen für ähnliche Aktionen zu haben, kann sich Ihr Team auf standardisierte, wiederverwendbare Befehle verlassen. Dies macht nicht nur die Codebasis wartbarer, sondern senkt auch die Einstiegshürde für neue Teammitglieder.

## Warum bestimmte Mobile-Befehle erweitern?

### 1. Mehr Flexibilität
Bestimmte Mobile-Befehle wurden erweitert, um zusätzliche Optionen und Parameter bereitzustellen, die in den Standard-Appium-APIs nicht verfügbar sind. Beispielsweise fügt WebdriverIO Wiederholungslogik, Timeouts und die Möglichkeit hinzu, Webviews nach bestimmten Kriterien zu filtern, was mehr Kontrolle über komplexe Szenarien ermöglicht.

```ts
// Example: Customizing retry intervals and timeouts for webview detection
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Retry every 1 second
  androidWebviewConnectTimeout: 10000,    // Timeout after 10 seconds
});
```

Diese Optionen helfen dabei, Automatisierungsskripte ohne zusätzlichen Boilerplate-Code an dynamisches App-Verhalten anzupassen.

### 2. Verbesserte Benutzerfreundlichkeit
Erweiterte Befehle abstrahieren Komplexitäten und sich wiederholende Muster, die in den nativen APIs zu finden sind. Sie ermöglichen es Ihnen, mehr Aktionen mit weniger Codezeilen auszuführen, wodurch die Lernkurve für neue Benutzer verkürzt wird und Skripte leichter zu lesen und zu warten sind.

```ts
// Example: Enhanced command for switching context by title
await driver.switchContext({
  title: 'My Webview Title',
});
```

Im Vergleich zu den Standard-Appium-Methoden entfällt bei erweiterten Befehlen die Notwendigkeit zusätzlicher Schritte, wie das manuelle Abrufen verfügbarer Kontexte und deren Filterung.

### 3. Standardisierung des Verhaltens
WebdriverIO stellt sicher, dass sich erweiterte Befehle plattformübergreifend, etwa auf Android und iOS, konsistent verhalten. Diese plattformübergreifende Abstraktion minimiert die Notwendigkeit für bedingte Verzweigungslogik basierend auf dem Betriebssystem, was zu besser wartbaren Testskripten führt.

```ts
// Example: Unified scroll command for both platforms
await $('~element').scrollIntoView();
```

Diese Standardisierung vereinfacht Codebasen, insbesondere für Teams, die Tests auf mehreren Plattformen automatisieren.

### 4. Erhöhte Zuverlässigkeit
Durch die Integration von Wiederholungsmechanismen, intelligenten Standardwerten und detaillierten Fehlermeldungen verringern erweiterte Befehle die Wahrscheinlichkeit von instabilen (flaky) Tests. Diese Verbesserungen stellen sicher, dass Ihre Tests widerstandsfähig gegenüber Problemen wie Verzögerungen bei der Webview-Initialisierung oder vorübergehenden App-Zuständen sind.

```ts
// Example: Enhanced webview switching with robust matching logic
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Dies macht die Testausführung vorhersehbarer und weniger anfällig für Fehler, die durch Umgebungsfaktoren verursacht werden.

### 5. Verbesserte Debugging-Möglichkeiten
Erweiterte Befehle liefern oft umfangreichere Metadaten, was das Debugging komplexer Szenarien erleichtert, insbesondere bei hybriden Apps. Beispielsweise können Befehle wie getContext und getContexts detaillierte Informationen über Webviews zurückgeben, einschließlich Titel, URL und Sichtbarkeitsstatus.

```ts
// Example: Retrieving detailed metadata for debugging
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Diese Metadaten helfen dabei, Probleme schneller zu identifizieren und zu beheben, was das gesamte Debugging-Erlebnis verbessert.


Durch die Erweiterung von Mobile-Befehlen macht WebdriverIO nicht nur die Automatisierung einfacher, sondern folgt auch seiner Mission, Entwicklern Werkzeuge an die Hand zu geben, die leistungsstark, zuverlässig und intuitiv zu bedienen sind.

## Hybride Apps

Hybride Apps kombinieren Webinhalte mit nativer Funktionalität und erfordern bei der Automatisierung eine spezielle Behandlung. Diese Apps verwenden Webviews, um Webinhalte innerhalb einer nativen Anwendung darzustellen. WebdriverIO bietet erweiterte Methoden, um effektiv mit hybriden Apps zu arbeiten.

### Webviews verstehen
Ein Webview ist eine browserähnliche Komponente, die in eine native App eingebettet ist:

- **Android:** Webviews basieren auf Chrome/System Webview und können mehrere Seiten enthalten (ähnlich wie Browser-Tabs). Diese Webviews benötigen ChromeDriver, um Interaktionen zu automatisieren. Appium kann die benötigte ChromeDriver-Version automatisch anhand der Version des auf dem Gerät installierten System WebView oder Chrome bestimmen und sie automatisch herunterladen, falls sie noch nicht verfügbar ist. Dieser Ansatz gewährleistet eine nahtlose Kompatibilität und minimiert den manuellen Einrichtungsaufwand. Lesen Sie die [Appium UIAutomator2-Dokumentation](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver), um zu erfahren, wie Appium automatisch die richtige ChromeDriver-Version herunterlädt.
- **iOS:** Webviews werden von Safari (WebKit) betrieben und durch generische IDs wie `WEBVIEW_{id}` identifiziert.

### Herausforderungen bei hybriden Apps
1. Den richtigen Webview unter mehreren Optionen identifizieren.
2. Zusätzliche Metadaten wie Titel, URL oder Paketname für einen besseren Kontext abrufen.
3. Plattformspezifische Unterschiede zwischen Android und iOS handhaben.
4. Zuverlässig in den richtigen Kontext einer hybriden App wechseln.

### Wichtige Befehle für hybride Apps

#### 1. `getContext`
Ruft den aktuellen Kontext der Sitzung ab. Standardmäßig verhält es sich wie die getContext-Methode von Appium, kann jedoch detaillierte Kontextinformationen liefern, wenn `returnDetailedContext` aktiviert ist. Weitere Informationen finden Sie unter [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Gibt eine detaillierte Liste der verfügbaren Kontexte zurück und verbessert damit die contexts-Methode von Appium. Dies erleichtert die Identifizierung des richtigen Webviews für die Interaktion, ohne zusätzliche Befehle aufrufen zu müssen, um Titel, URL oder aktive `bundleId|packageName` zu ermitteln. Weitere Informationen finden Sie unter [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Wechselt zu einem bestimmten Webview basierend auf Name, Titel oder URL. Bietet zusätzliche Flexibilität, wie beispielsweise die Verwendung von regulären Ausdrücken für den Abgleich. Weitere Informationen finden Sie unter [`switchContext`](/docs/api/mobile/switchContext)

### Wichtige Funktionen für hybride Apps
1. Detaillierte Metadaten: Umfassende Details für das Debugging und zuverlässigen Kontextwechsel abrufen.
2. Plattformübergreifende Konsistenz: Einheitliches Verhalten für Android und iOS, wobei plattformspezifische Eigenheiten nahtlos behandelt werden.
3. Benutzerdefinierte Wiederholungslogik (Android): Wiederholungsintervalle und Timeouts für die Webview-Erkennung anpassen.


:::info Hinweise und Einschränkungen
- Android stellt zusätzliche Metadaten wie `packageName` und `webviewPageId` bereit, während sich iOS auf `bundleId` konzentriert.
- Die Wiederholungslogik ist für Android anpassbar, aber nicht auf iOS anwendbar.
- Es gibt mehrere Fälle, in denen iOS den Webview nicht finden kann. Appium bietet verschiedene zusätzliche Capabilities für den `appium-xcuitest-driver`, um den Webview zu finden. Wenn Sie glauben, dass der Webview nicht gefunden wird, können Sie versuchen, eine der folgenden Capabilities zu setzen:
    - `appium:includeSafariInWebviews`: Fügt Safari-Webkontexte zur Liste der verfügbaren Kontexte während eines Native/Webview-App-Tests hinzu. Dies ist nützlich, wenn der Test Safari öffnet und mit Safari interagieren muss. Standardwert ist `false`.
    - `appium:webviewConnectRetries`: Die maximale Anzahl an Wiederholungsversuchen, bevor die Erkennung von Webview-Seiten aufgegeben wird. Die Verzögerung zwischen den Versuchen beträgt 500 ms, der Standardwert ist `10` Versuche.
    - `appium:webviewConnectTimeout`: Die maximale Zeit in Millisekunden, die auf die Erkennung einer Webview-Seite gewartet wird. Standardwert ist `5000` ms.

Für fortgeschrittene Beispiele und Details siehe die WebdriverIO Mobile API-Dokumentation.
:::


---

Unser wachsendes Befehlsangebot spiegelt unser Engagement wider, mobile Automatisierung zugänglich und elegant zu gestalten. Ob Sie komplexe Gesten ausführen oder mit nativen App-Elementen arbeiten – diese Befehle entsprechen der Philosophie von WebdriverIO, ein nahtloses Automatisierungserlebnis zu schaffen. Und wir hören hier nicht auf – wenn Sie sich eine bestimmte Funktion wünschen, freuen wir uns über Ihr Feedback. Reichen Sie Ihre Anfragen gerne über [diesen Link](https://github.com/webdriverio/webdriverio/issues/new/choose) ein.