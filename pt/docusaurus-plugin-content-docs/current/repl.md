---
id: repl
title: Interface REPL
description: "Use o REPL do WebdriverIO para experimentar comandos e depurar testes interativamente a partir da linha de comando ou de dentro de um teste em execução."
---

Com a `v4.5.0`, o WebdriverIO introduziu uma interface [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) que ajuda você não apenas a aprender a API do framework, mas também a depurar e inspecionar seus testes. Ela pode ser usada de várias maneiras.

Primeiro, você pode usá-la como um comando CLI instalando `npm install -g @wdio/cli` e iniciar uma sessão WebDriver a partir da linha de comando, por exemplo:

```sh
wdio repl chrome
```

Isso abriria um navegador Chrome que você pode controlar com a interface REPL. Certifique-se de ter um driver de navegador em execução na porta `4444` para iniciar a sessão. Se você tiver uma conta no [Sauce Labs](https://saucelabs.com) (ou em outro provedor de nuvem), também pode executar o navegador diretamente na nuvem a partir da sua linha de comando via:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Se o driver estiver em execução em uma porta diferente, por exemplo: 9515, ela pode ser passada com o argumento de linha de comando --port ou o alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

O REPL também pode ser executado usando as capabilities do arquivo de configuração do WebdriverIO. O Wdio suporta um objeto de capabilities; ou uma lista ou objeto de capabilities multi-remote.

Se o arquivo de configuração usar um objeto de capabilities, basta passar o caminho para o arquivo de configuração; caso contrário, se for uma capability multi-remote, especifique qual capability usar da lista ou do multi-remote usando o argumento posicional. Observação: para listas, consideramos índice baseado em zero.

### Exemplo

WebdriverIO com array de capabilities:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // opções: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // versão do navegador
        platformName: 'Windows 10' // plataforma do SO
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO com objeto de capabilities [multi-remote](https://webdriver.io/docs/multiremote/):

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

Ou, se você quiser executar testes móveis locais usando o Appium:

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

Isso abriria uma sessão do Chrome/Safari no dispositivo/emulador/simulador conectado. Certifique-se de que o Appium esteja em execução na porta `4444` para iniciar a sessão.

```sh
wdio repl './path/to/your_app.apk'
```

Isso abriria uma sessão do App no dispositivo/emulador/simulador conectado. Certifique-se de que o Appium esteja em execução na porta `4444` para iniciar a sessão.

As capabilities para dispositivos iOS podem ser passadas com argumentos:

* `-v`      - `platformVersion`: versão da plataforma Android/iOS
* `-d`      - `deviceName`: nome do dispositivo móvel
* `-u`      - `udid`: udid para dispositivos reais

Uso:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Nomes de Parâmetros Longos', value: 'long'},
    {label: 'Nomes de Parâmetros Curtos', value: 'short'}
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

### Conectar-se a uma `wdio session`

`wdio repl --session <name>` (alias `-s`) não inicia um navegador. Ele conecta o REPL a uma sessão que o [`wdio session`](/docs/session) já abriu, e desconectar mantém essa sessão em execução. A pausa de uma execução de teste é abordada em [Depurar um teste com uma sessão](/docs/session/debug):

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

No REPL, cada linha é executada como `wdio session exec`. `.exit` imprime `Detached from "default" (still running)`.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Outra forma de usar o REPL é dentro dos seus testes por meio do comando [`debug`](/docs/api/browser/debug). Ele interromperá o navegador quando chamado e permitirá que você entre na aplicação (por exemplo, nas ferramentas de desenvolvedor) ou controle o navegador a partir da linha de comando. Isso é útil quando alguns comandos não disparam uma determinada ação como esperado. Com o REPL, você pode então experimentar os comandos para ver quais funcionam de forma mais confiável.