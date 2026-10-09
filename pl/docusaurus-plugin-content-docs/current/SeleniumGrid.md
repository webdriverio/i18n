---
id: seleniumgrid
title: Selenium Grid
description: "Połącz testy WebdriverIO z istniejącym Selenium Grid, ustawiając protokół, nazwę hosta, port i ścieżkę w swojej konfiguracji."
---

Możesz używać WebdriverIO z istniejącą instancją Selenium Grid. Aby połączyć swoje testy z Selenium Grid, wystarczy zaktualizować opcje w konfiguracji test runnera.

Oto fragment kodu z przykładowego pliku wdio.conf.ts.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Musisz podać odpowiednie wartości dla protokołu, nazwy hosta, portu i ścieżki w zależności od konfiguracji Twojego Selenium Grid.
Jeśli uruchamiasz Selenium Grid na tej samej maszynie co skrypty testowe, oto kilka typowych opcji:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### Uwierzytelnianie podstawowe z chronionym Selenium Grid

Zdecydowanie zaleca się zabezpieczenie Selenium Grid. Jeśli masz chroniony Selenium Grid, który wymaga uwierzytelniania, możesz przekazać nagłówki uwierzytelniające za pomocą opcji. 
Więcej informacji znajdziesz w sekcji [headers](https://webdriver.io/docs/configuration/#headers) w dokumentacji.

### Konfiguracja limitów czasu z dynamicznym Selenium Grid

W przypadku korzystania z dynamicznego Selenium Grid, w którym pody przeglądarek są uruchamiane na żądanie, tworzenie sesji może napotkać zimny start. W takich przypadkach zaleca się zwiększenie limitów czasu tworzenia sesji. Domyślna wartość w opcjach wynosi 120 sekund, ale możesz ją zwiększyć, jeśli Twój grid potrzebuje więcej czasu na utworzenie nowej sesji. 

```ts
connectionRetryTimeout: 180000,
```

### Zaawansowane konfiguracje

W przypadku zaawansowanych konfiguracji zapoznaj się z [plikiem konfiguracyjnym](https://webdriver.io/docs/configurationfile) Testrunnera.

### Operacje na plikach z Selenium Grid

Podczas uruchamiania przypadków testowych ze zdalnym Selenium Grid przeglądarka działa na zdalnej maszynie, dlatego należy zachować szczególną ostrożność w przypadku testów obejmujących przesyłanie i pobieranie plików.

### Pobieranie plików

W przypadku przeglądarek opartych na Chromium możesz zapoznać się z dokumentacją [Download file](https://webdriver.io/docs/api/browser/downloadFile). Jeśli Twoje skrypty testowe muszą odczytać zawartość pobranego pliku, musisz pobrać go ze zdalnego węzła Selenium na maszynę test runnera. Oto przykładowy fragment kodu z przykładowej konfiguracji `wdio.conf.ts` dla przeglądarki Chrome:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### Przesyłanie plików ze zdalnym Selenium Grid

[`element.setFiles()`](/docs/api/element/setFiles) ustawia pole wyboru pliku za pomocą WebDriver BiDi. Przekazywane ścieżki są otwierane przez przeglądarkę, więc muszą istnieć na maszynie, na której działa przeglądarka. WebdriverIO nie przenosi lokalnego pliku na węzeł Selenium.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

Zestaw testów, który używał `browser.uploadFile()` do przesyłania danych na węzeł, musi umieścić plik w miejscu, z którego przeglądarka może go odczytać, a następnie wywołać `setFiles`. Endpoint Selenium [`file`](/docs/api/selenium#file) jest nadal dostępny jako `browser.file()` dla Chromedriver, Edgedriver i Selenium Grid. Nie jest to polecenie WebDriver ani WebDriver BiDi.

### Inne operacje na plikach/gridzie

Istnieje jeszcze kilka innych operacji, które możesz wykonać z Selenium Grid. Instrukcje dla Selenium Standalone powinny działać poprawnie również z Selenium Grid. Dostępne opcje znajdziesz w dokumentacji [Selenium Standalone](https://webdriver.io/docs/api/selenium/).


### Oficjalna dokumentacja Selenium Grid

Więcej informacji o Selenium Grid znajdziesz w oficjalnej [dokumentacji](https://www.selenium.dev/documentation/grid/) Selenium Grid. 

Jeśli chcesz uruchomić Selenium Grid w Dockerze, Docker Compose lub Kubernetes, zapoznaj się z [repozytorium GitHub](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker.