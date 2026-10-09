---
id: integrate-with-app-percy
title: Dla aplikacji mobilnych
description: "Zintegruj testy aplikacji mobilnych WebdriverIO z BrowserStack App Percy do testowania wizualnego, zaczynając od ustawienia zmiennej PERCY_TOKEN."
---

## Zintegruj swoje testy WebdriverIO z App Percy

Przed integracją możesz zapoznać się z [samouczkiem przykładowego buildu App Percy dla WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Zintegruj swój zestaw testów z BrowserStack App Percy. Oto przegląd kroków integracji:

### Krok 1: Utwórz nowy projekt aplikacji w panelu Percy

[Zaloguj się](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) do Percy i [utwórz nowy projekt typu aplikacja](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). Po utworzeniu projektu zostanie wyświetlona zmienna środowiskowa `PERCY_TOKEN`. Percy użyje `PERCY_TOKEN`, aby ustalić, do której organizacji i projektu przesłać zrzuty ekranu. Ten `PERCY_TOKEN` będzie potrzebny w kolejnych krokach.

### Krok 2: Ustaw token projektu jako zmienną środowiskową

Uruchom podane polecenie, aby ustawić PERCY_TOKEN jako zmienną środowiskową:

```sh
export PERCY_TOKEN="<your token here>"   // macOS lub Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Krok 3: Zainstaluj pakiety Percy

Zainstaluj komponenty wymagane do przygotowania środowiska integracji dla swojego zestawu testów.
Aby zainstalować zależności, uruchom następujące polecenie:

```sh
npm install --save-dev @percy/cli
```

### Krok 4: Zainstaluj zależności

Zainstaluj aplikację Percy Appium

```sh
npm install --save-dev @percy/appium-app
```

### Krok 5: Zaktualizuj skrypt testowy
Upewnij się, że importujesz @percy/appium-app w swoim kodzie.

Poniżej znajduje się przykładowy test wykorzystujący funkcję percyScreenshot. Używaj tej funkcji wszędzie tam, gdzie musisz wykonać zrzut ekranu.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Przekazujemy wymagane argumenty do metody percyScreenshot.

Argumenty metody wykonującej zrzut ekranu to:

```sh
percyScreenshot(driver, name[, options])
```
### Krok 6: Uruchom skrypt testowy

Uruchom testy za pomocą `percy app:exec`.

Jeśli nie możesz użyć polecenia percy app:exec lub wolisz uruchamiać testy za pomocą opcji uruchamiania w IDE, możesz użyć poleceń percy app:exec:start i percy app:exec:stop. Aby dowiedzieć się więcej, odwiedź [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
To polecenie uruchamia Percy, tworzy nowy build Percy, wykonuje snapshoty i przesyła je do Twojego projektu, a następnie zatrzymuje Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Odwiedź następujące strony, aby uzyskać więcej informacji:
- [Zintegruj swoje testy WebdriverIO z Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Strona zmiennych środowiskowych](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integracja za pomocą BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), jeśli korzystasz z BrowserStack Automate.


| Zasób                                                                                                                                                            | Opis                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Oficjalna dokumentacja](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Dokumentacja App Percy dla WebdriverIO |
| [Przykładowy build - samouczek](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Samouczek App Percy dla WebdriverIO      |
| [Oficjalne wideo](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Testowanie wizualne z App Percy         |
| [Blog](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Poznaj App Percy: oparta na AI platforma do automatycznego testowania wizualnego aplikacji natywnych    |