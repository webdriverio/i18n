---
id: docker
title: Docker
---

Docker to potężna technologia konteneryzacji, która pozwala na umieszczenie zestawu testów w kontenerze, który zachowuje się tak samo na każdym systemie. Może to pomóc uniknąć niestabilności spowodowanej różnymi wersjami przeglądarek lub platform. Aby uruchomić testy w kontenerze, utwórz plik `Dockerfile` w katalogu projektu, np.:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Zmień przeglądarkę i wersję zgodnie z Twoimi potrzebami
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Upewnij się, że nie dołączasz katalogu `node_modules` do obrazu Dockera i masz zainstalowane te moduły podczas budowania obrazu. W tym celu dodaj plik `.dockerignore` z następującą zawartością:

```
node_modules
```

:::info
Używamy tutaj obrazu Dockera, który zawiera preinstalowane Selenium i Google Chrome. Dostępne są różne obrazy z różnymi konfiguracjami przeglądarek i wersjami przeglądarek. Sprawdź obrazy utrzymywane przez projekt Selenium [na Docker Hub](https://hub.docker.com/u/selenium).
:::

Ponieważ możemy uruchomić Google Chrome tylko w trybie headless w naszym kontenerze Docker, musimy zmodyfikować nasz plik `wdio.conf.js`, aby to zapewnić:

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

Jak wspomniano w [Protokołach Automatyzacji](/docs/automationProtocols), możesz uruchomić WebdriverIO używając protokołu WebDriver lub protokołu WebDriver BiDi. Upewnij się, że wersja Chrome zainstalowana w Twoim obrazie odpowiada wersji [Chromedriver](https://www.npmjs.com/package/chromedriver), którą zdefiniowałeś w swoim pliku `package.json`.

Aby zbudować kontener Docker, możesz uruchomić:

```sh
docker build -t mytest -f Dockerfile .
```

Następnie, aby uruchomić testy, wykonaj:

```sh
docker run -it mytest
```

Aby uzyskać więcej informacji na temat konfiguracji obrazu Docker, sprawdź [dokumentację Dockera](https://docs.docker.com/).