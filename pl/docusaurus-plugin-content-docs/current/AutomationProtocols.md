---
id: automationProtocols
title: Protokoły Automatyzacji
---

Z WebdriverIO możesz wybierać spośród wielu technologii automatyzacji podczas uruchamiania testów E2E lokalnie lub w chmurze. Domyślnie WebdriverIO będzie próbować uruchomić lokalną sesję automatyzacji używając protokołu [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/).

## Protokół WebDriver Bidi

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) jest protokołem automatyzacji służącym do automatyzacji przeglądarek przy użyciu komunikacji dwukierunkowej. Jest następcą protokołu [WebDriver](https://w3c.github.io/webdriver/) i umożliwia znacznie więcej możliwości introspekcji dla różnych przypadków testowych.

Ten protokół jest obecnie w fazie rozwoju i nowe elementy mogą zostać dodane w przyszłości. Wszyscy dostawcy przeglądarek zobowiązali się do wdrożenia tego standardu internetowego, a wiele [elementów pierwotnych](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned) zostało już zaimplementowanych w przeglądarkach.

## Protokół WebDriver

> [WebDriver](https://w3c.github.io/webdriver/) to interfejs zdalnego sterowania, który umożliwia introspekcję i kontrolę przeglądarek. Zapewnia niezależny od platformy i języka protokół komunikacyjny, dzięki któremu programy uruchamiane poza procesem mogą zdalnie instruować zachowanie przeglądarek internetowych.

Protokół WebDriver został zaprojektowany do automatyzacji przeglądarki z perspektywy użytkownika, co oznacza, że wszystko, co użytkownik może zrobić, możesz zrobić z przeglądarką. Dostarcza zestaw poleceń, które abstrahują typowe interakcje z aplikacją (np. nawigację, klikanie lub odczyt stanu elementu). Ponieważ jest to standard internetowy, jest dobrze wspierany przez wszystkich głównych dostawców przeglądarek, a także używany jako podstawowy protokół automatyzacji mobilnej za pomocą [Appium](http://appium.io).

Aby korzystać z tego protokołu automatyzacji, potrzebujesz serwera proxy, który tłumaczy wszystkie polecenia i wykonuje je w docelowym środowisku (tj. przeglądarce lub aplikacji mobilnej).

W przypadku automatyzacji przeglądarki serwerem proxy jest zazwyczaj sterownik przeglądarki. Sterowniki są dostępne dla wszystkich przeglądarek:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

Do jakiejkolwiek automatyzacji mobilnej będziesz potrzebować instalacji i konfiguracji [Appium](http://appium.io). Pozwoli ci to na automatyzację aplikacji mobilnych (iOS/Android) a nawet desktopowych (macOS/Windows) przy użyciu tej samej konfiguracji WebdriverIO.

Istnieje również wiele usług, które umożliwiają uruchamianie testów automatyzacji w chmurze na dużą skalę. Zamiast konfigurować wszystkie te sterowniki lokalnie, możesz po prostu komunikować się z tymi usługami (np. [Sauce Labs](https://saucelabs.com)) w chmurze i sprawdzać wyniki na ich platformie. Komunikacja między skryptem testowym a środowiskiem automatyzacji będzie wyglądać następująco:

![WebDriver Setup](/img/webdriver.png)