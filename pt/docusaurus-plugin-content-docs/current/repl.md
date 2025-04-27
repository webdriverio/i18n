---
id: repl
title: Interface REPL
---

Com `v4.5.0`, o WebdriverIO introduziu uma interface [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) que ajuda você não apenas a aprender a API do framework, mas também a depurar e inspecionar seus testes. Ela pode ser usada de várias maneiras.

Primeiro, você pode usá-la como comando CLI instalando `npm install -g @wdio/cli` e iniciar uma sessão WebDriver a partir da linha de comando, por exemplo:

```sh
wdio repl chrome
```

Isso abriria um navegador Chrome que você pode controlar com a interface REPL. Certifique-se de ter um driver de navegador rodando na porta `4444` para iniciar a sessão. Se você tem uma conta [Sauce Labs](https://saucelabs.com) (ou outro fornecedor de nuvem), você também pode executar o navegador diretamente na sua linha de comando na nuvem via:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Se o driver estiver rodando em uma porta diferente, por exemplo: 9515, isso pode ser passado com o argumento de linha de comando --port ou pelo alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

O Repl também pode ser executado usando as capabilities do arquivo de configuração do webdriverIO. O Wdio suporta objeto de capabilities; ou; lista de capability multirremota ou objeto.

Se o arquivo de configuração usar objeto de capabilities, basta passar o caminho para o arquivo de configuração; caso contrário, se for uma capability multirremota, especifique qual capability usar da lista ou multirremota usando o argumento posicional. Nota: para lista, consideramos índice baseado em zero.

### Exemplo

WebdriverIO com array de capabilities:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO com objeto de capability [multirremota](https://webdriver.io/docs/multiremote/):

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

Ou se você quiser executar testes móveis locais usando Appium:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

Isso abriria uma sessão Chrome/Safari no dispositivo/emulador/simulador conectado. Certifique-se que o Appium está rodando na porta `4444` para iniciar a sessão.

```sh
wdio repl './path/to/your_app.apk'
```

Isso abriria uma sessão de App no dispositivo/emulador/simulador conectado. Certifique-se que o Appium está rodando na porta `4444` para iniciar a sessão.

As capabilities para dispositivos iOS podem ser passadas com argumentos:

* `-v`      - `platformVersion`: versão da plataforma Android/iOS
* `-d`      - `deviceName`: nome do dispositivo móvel
* `-u`      - `udid`: udid para dispositivos reais

Uso:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

Você pode aplicar quaisquer opções (veja `wdio repl --help`) disponíveis para sua sessão REPL.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Outra maneira de usar o REPL é dentro dos seus testes através do comando [`debug`](/docs/api/browser/debug). Isso irá parar o navegador quando chamado, e permite que você acesse o aplicativo (por exemplo, as ferramentas de desenvolvimento) ou controle o navegador a partir da linha de comando. Isso é útil quando alguns comandos não disparam uma determinada ação como esperado. Com o REPL, você pode então testar os comandos para ver quais funcionam de forma mais confiável.