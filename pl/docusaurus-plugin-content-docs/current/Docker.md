---
id: docker
title: Docker
---

Docker to potężna technologia konteneryzacji, która pozwala na enkapsulację zestawu testów w kontenerze, który zachowuje się tak samo na każdym systemie. Może to zapobiec niestabilności spowodowanej różnymi wersjami przeglądarki lub platformy. Aby uruchomić testy w kontenerze, utwórz plik `Dockerfile` w katalogu projektu, na przykład:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Upewnij się, że nie dołączasz katalogu `node_modules` do obrazu Dockera i masz zainstalowane zależności podczas budowania obrazu. W tym celu dodaj plik `.dockerignore` o następującej treści:

```
node_modules
```

:::info
Używamy tutaj obrazu Docker, który zawiera preinstalowane Selenium i Google Chrome. Dostępnych jest wiele obrazów z różnymi konfiguracjami przeglądarek i wersjami przeglądarek. Sprawdź obrazy utrzymywane przez projekt Selenium [na Docker Hub](https://hub.docker.com/u/selenium).
:::

Ponieważ możemy uruchamiać Google Chrome tylko w trybie bezgłowym (headless) w naszym kontenerze Docker, musimy zmodyfikować nasz plik `wdio.conf.js`, aby to zapewnić:

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

Jak wspomniano w [Protokołach automatyzacji](/docs/automationProtocols), możesz uruchomić WebdriverIO przy użyciu protokołu WebDriver lub protokołu WebDriver BiDi. Upewnij się, że wersja Chrome zainstalowana w obrazie odpowiada wersji [Chromedriver](https://www.npmjs.com/package/chromedriver), którą zdefiniowałeś w swoim pliku `package.json`.

Aby zbudować kontener Docker, możesz uruchomić:

```sh
docker build -t mytest -f Dockerfile .
```

Następnie, aby uruchomić testy, wykonaj:

```sh
docker run -it mytest
```

Aby uzyskać więcej informacji na temat konfiguracji obrazu Docker, sprawdź [dokumentację Dockera](https://docs.docker.com/).