---
id: docker
title: Docker
description: "Uruchamiaj swój zestaw testów WebdriverIO w kontenerze Docker z preinstalowaną przeglądarką, aby uzyskać spójne wyniki na różnych maszynach."
---

Docker to potężna technologia konteneryzacji, która pozwala zamknąć zestaw testów w kontenerze działającym tak samo na każdym systemie. Może to zapobiec niestabilności testów wynikającej z różnych wersji przeglądarek lub platform. Aby uruchomić testy w kontenerze, utwórz plik `Dockerfile` w katalogu projektu, np.:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Upewnij się, że nie dołączasz katalogu `node_modules` do obrazu Docker, a zależności są instalowane podczas budowania obrazu. W tym celu dodaj plik `.dockerignore` o następującej zawartości:

```
node_modules
```

:::info
Używamy tutaj obrazu Docker, który zawiera preinstalowane Selenium i Google Chrome. Dostępne są różne obrazy z odmiennymi konfiguracjami i wersjami przeglądarek. Sprawdź obrazy utrzymywane przez projekt Selenium [na Docker Hub](https://hub.docker.com/u/selenium).
:::

Ponieważ w naszym kontenerze Docker możemy uruchomić Google Chrome tylko w trybie headless, musimy zmodyfikować plik `wdio.conf.js`, aby to zapewnić:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

Jak wspomniano w sekcji [Protokoły automatyzacji](/docs/automationProtocols), możesz uruchamiać WebdriverIO przy użyciu protokołu WebDriver lub protokołu WebDriver BiDi. Upewnij się, że wersja Chrome zainstalowana w obrazie odpowiada wersji [Chromedriver](https://www.npmjs.com/package/chromedriver) zdefiniowanej w pliku `package.json`.

Aby zbudować kontener Docker, możesz uruchomić:

```sh
docker build -t mytest -f Dockerfile .
```

Następnie, aby uruchomić testy, wykonaj:

```sh
docker run -it mytest
```

Więcej informacji na temat konfiguracji obrazu Docker znajdziesz w [dokumentacji Dockera](https://docs.docker.com/).