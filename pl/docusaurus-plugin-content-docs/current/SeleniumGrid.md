---
id: seleniumgrid
title: Selenium Grid
---

Możesz używać WebdriverIO z istniejącą instancją Selenium Grid. Aby połączyć swoje testy z Selenium Grid, wystarczy zaktualizować opcje w konfiguracjach test runnera.

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
Musisz podać odpowiednie wartości dla protokołu, nazwy hosta, portu i ścieżki w oparciu o konfigurację Selenium Grid.
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

### Podstawowa autentykacja z zabezpieczoną Selenium Grid

Zdecydowanie zaleca się zabezpieczenie Selenium Grid. Jeśli masz zabezpieczoną Selenium Grid, która wymaga uwierzytelnienia, możesz przekazać nagłówki uwierzytelniania za pomocą opcji. 
Zapoznaj się z sekcją [headers](https://webdriver.io/docs/configuration/#headers) w dokumentacji, aby uzyskać więcej informacji.

### Konfiguracje timeoutu z dynamiczną Selenium Grid

Podczas korzystania z dynamicznej Selenium Grid, gdzie pody przeglądarek są uruchamiane na żądanie, tworzenie sesji może napotkać na zimny start. W takich przypadkach zaleca się zwiększenie limitów czasu tworzenia sesji. Domyślna wartość w opcjach to 120 sekund, ale możesz ją zwiększyć, jeśli twoja siatka potrzebuje więcej czasu na utworzenie nowej sesji.

```ts
connectionRetryTimeout: 180000,
```

### Zaawansowane konfiguracje

Aby uzyskać zaawansowane konfiguracje, zapoznaj się z [plikiem konfiguracyjnym](https://webdriver.io/docs/configurationfile) Testrunner.

### Operacje na plikach z Selenium Grid

Podczas uruchamiania przypadków testowych ze zdalną Selenium Grid, przeglądarka działa na zdalnej maszynie, i musisz zwrócić szczególną uwagę na przypadki testowe obejmujące przesyłanie i pobieranie plików.

### Pobieranie plików

W przypadku przeglądarek opartych na Chromium możesz zapoznać się z dokumentacją [Download file](https://webdriver.io/docs/api/browser/downloadFile). Jeśli twoje skrypty testowe muszą odczytać zawartość pobranego pliku, musisz pobrać go ze zdalnego węzła Selenium do maszyny test runnera. Oto przykładowy fragment kodu z próbki konfiguracji `wdio.conf.ts` dla przeglądarki Chrome:

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

### Przesyłanie plików ze zdalną Selenium Grid

Aby przesłać plik do aplikacji internetowej w zdalnej przeglądarce, musisz najpierw przesłać plik do zdalnej siatki. Możesz zapoznać się z dokumentacją [uploadFile](https://webdriver.io/docs/api/browser/uploadFile), aby uzyskać szczegółowe informacje.

### Inne operacje na plikach/gridzie

Istnieje kilka innych operacji, które możesz wykonać z Selenium Grid. Instrukcje dla Selenium Standalone powinny działać dobrze również z Selenium Grid. Zapoznaj się z dokumentacją [Selenium Standalone](https://webdriver.io/docs/api/selenium/), aby poznać dostępne opcje.

### Oficjalna dokumentacja Selenium Grid

Aby uzyskać więcej informacji na temat Selenium Grid, możesz zapoznać się z oficjalną [dokumentacją](https://www.selenium.dev/documentation/grid/) Selenium Grid.

Jeśli chcesz uruchomić Selenium Grid w Dockerze, Docker compose lub Kubernetes, zapoznaj się z [repozytorium GitHub](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker.