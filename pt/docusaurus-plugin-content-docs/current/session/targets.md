---
id: targets
title: Alvos de sessão
description: Abra um navegador, um app mobile, um app desktop, um app Electron ou um dispositivo na nuvem com wdio session.
---

`wdio session open` inicia a sessão. O primeiro argumento é o alvo. Reutilize a sessão `default`. Passe `-s <name>` apenas quando precisar de duas sessões ao mesmo tempo. Execute `npx wdio session doctor <target>` primeiro quando o alvo precisar do Appium, de um driver desktop ou de credenciais de nuvem.

Os players de Chrome, Android e Electron controlam o mesmo [app de demonstração do WebdriverIO](https://github.com/webdriverio/native-demo-app) (a cobaia Expo, tag `v2.2.0`). Chrome e Electron usam um servidor web Expo local em uma janela desktop normal. O Android instala o [apk da versão v2.2.0](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). O iOS instala o app de simulador v2.2.0 (`org.wdiodemoapp`) e usa `touchId`. Cada player digita o comando e, em seguida, a janela mostra o resultado. Pause, ou avance para o comando anterior ou seguinte, para ler a linha que alterou a janela.

O caminho compartilhado é: abrir o app, fazer login como `alice@webdriver.io` / `supersecret`, chegar ao logo do robô ("You found me!!!") e então completar o quebra-cabeça de 9 peças. Chrome e Electron também definem uma localização e um relógio noturno na tela Weather, abrem a WebView interna do app com a página inicial do WebdriverIO e arrastam o carrossel. O player do Android rola a tela nativa de swipe até esse robô. `export` gera uma spec Mocha da sessão que você acabou de controlar.

<a id="postcard"></a>

## Navegadores

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

O Chrome abre em modo headless. Adicione `--headed` para mostrar a janela. Chrome, Firefox e Edge são baixados no primeiro uso quando não estão instalados. O Safari requer macOS.

### User agent no modo headless

Chrome e Edge em modo headless se identificam como `HeadlessChrome/<version>` no user agent. Uma janela visível do mesmo navegador envia `Chrome/<version>`. Muitos sites recusam requisições com o token headless: a Akamai responde "Access Denied" e a Cloudflare mostra "Just a moment...". Eles decidem a partir da requisição, antes que qualquer script da página seja executado. Um agente veria então uma página de bloqueio que uma pessoa abrindo o mesmo site nunca vê.

Por isso, uma sessão headless do Chrome ou do Edge envia o user agent que uma janela visível do mesmo navegador enviaria. Isso altera apenas o token. Não esconde a automação:

- `navigator.webdriver` continua `true`.
- Os marcadores próprios do chromedriver continuam na página.
- Sites que verificam automação ainda a detectam.

Enquanto o user agent é sobrescrito, o Chrome não envia user agent client hints, então `navigator.userAgentData.brands` fica vazio. A sobrescrita precisa do WebDriver BiDi, portanto uma sessão aberta com `--no-bidi` mantém o user agent headless.

Para enviar um user agent específico, passe-o como argumento do navegador. A sessão então não mexe no user agent:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

Se um site ainda mostrar uma verificação anti-bot, tente uma janela visível com `--headed`. Se isso também for bloqueado, o site não permite navegadores automatizados. Relate isso em vez de tentar burlar a verificação.

Uma janela headed do Chrome mantém a barra de abas e a barra de endereços, e é assim que você a diferencia de uma janela do Electron. `--viewport 1280x800` é uma página normal do navegador. Na web, o app usa uma barra lateral à esquerda. O logo do WebdriverIO fica no topo dessa barra lateral. Os itens são Home, Weather, Web, Login, Forms, Swipe, Drag, Perms e Data. A tela inicial lista navegador e desktop ao lado de iOS e Android.

A tela Weather lê `navigator.geolocation` e `Date`. `geolocation 35.6762 139.6503` é Tóquio. Isso se aplica no próximo carregamento, então execute `reload` antes de `click "aria/Weather"`. O widget então mostra Tóquio, 21° e chuva. `emulate clock 2026-06-21T23:30:00Z` muda o mesmo cartão de um céu diurno para um céu noturno e ajusta o relógio para 11:30 PM. Um segundo `emulate clock` substitui o primeiro.

A aba WebView carrega `https://webdriver.io/` dentro do app. O login espera cerca de 1,5 segundo e então abre um diálogo cujo texto é `Success` e `You are logged in!`. O botão LOGIN continua sendo um controle laranja de 200×50 enquanto essa espera está na tela. `dialog accept` fecha o diálogo. `swipe` é exclusivo de mobile. Arraste `[data-testid=Carousel]` até `aria/Next card` duas vezes para paginar o carrossel. A build web gravada escuta `pointerup` no `document`, então o arrasto pode começar no carrossel e o ponteiro pode ser solto em `Next card`, que fica fora do carrossel. `scroll down --px 560` traz o robô do WebdriverIO para a área visível. A legenda abaixo dele é "You found me!!!". As peças do quebra-cabeça vão de `aria/drag-l2` a `aria/drag-l3`, soltas no alvo `aria/drop-…` correspondente. A ordem na bandeja é `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3`.

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

Repita `drag` para `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` e `l3`.

<SessionTarget id="browser" />

`--viewport 1280x720` define o tamanho inicial. `--arg` adiciona um argumento do navegador e pode ser repetido. `--profile <dir>` mantém um perfil entre aberturas.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android e iOS

Android e iOS rodam através do Appium 3. `doctor android` informa um servidor ou driver ausente junto com o comando de instalação.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Um pacote Android já instalado usa `--package` e `--activity`. A web mobile usa `--browser chrome` ou `--browser safari` em vez de um app. `--appium-url http://127.0.0.1:4723/` se conecta a um servidor que já está em execução. Uma URL de app na nuvem como `bs://…` é repassada como `--app` e não é tratada como arquivo local.

<a id="native-boarding-pass"></a>

### App de demonstração nativo

Em um emulador ou dispositivo, a mesma cobaia é o apk v2.2.0:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` espera até oito minutos. O UiAutomator2 instala um servidor e inicia a instrumentação antes que o app possa ser usado, e isso é mais lento que iniciar um navegador. A primeira requisição não é repetida: uma nova tentativa iniciaria uma segunda sessão do Appium no mesmo dispositivo enquanto a primeira ainda está instalando. `tap "~Login"`, `fill` e então `tap "~button-LOGIN"` faz login com o mesmo e-mail e senha. Em uma tela curta, o botão LOGIN fica abaixo da dobra, então role a `~Login-screen` antes desse toque. `dialog accept` fecha o alerta de sucesso e precisa ser executado depois que esse alerta estiver na tela. O texto do alerta é `Success` / `You are logged in!`.

O botão de impressão digital é `~button-biometric`. Ele só aparece no formulário de login depois que uma impressão digital é cadastrada, por isso este player não o toca. `exec -e "await browser.fingerPrint(1)"` responde ao prompt do sistema (`fingerPrint` é exclusivo do Android; não existe subcomando `wdio session` para isso).

`tap "~Webview"` é a WebView interna do app com `https://webdriver.io/`. Em um emulador por software com uma CPU, o renderizador da WebView morre com `SIGTRAP` em `libmonochrome` após o rótulo LOADING, e a página nunca é desenhada. O player não mexe nessa aba.

`tap "~Swipe"` abre o carrossel. `swipe left` não o pagina: o carrossel é `react-native-reanimated-carousel`, e um swipe do UIAutomator volta para o primeiro cartão. Um `exec` de `mobile: swipeGesture` na scroll view, repetido, é o que faz aparecer o robô e a legenda "You found me!!!". Um `swipe up` em tela cheia a partir da borda inferior abre, em vez disso, a interface de captura de tela do Android. `drag "~drag-l2" "~drop-l2"` (e os outros oito pares, na ordem da bandeja) completa o quebra-cabeça. O último quadro é o robô montado e o controle de tentar novamente.

`-s android` mantém esta sessão ao lado da sessão do navegador. Remova `-s android` quando ela for a única sessão. `open` usa o pacote e a activity já instalados pelo apk, com `--no-reset` para que uma impressão digital cadastrada seja mantida. `"~Login"` é o rótulo de acessibilidade da aba. `wait` não se aplica a uma sessão nativa.

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

Repita `drag` para `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` e `l3`.

<SessionTarget id="android" />

### Simulador iOS

As mesmas telas estão na build de simulador v2.2.0, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). Descompacte-a e instale `wdiodemoapp.app` em um simulador iniciado (`xcrun simctl install booted`). O bundle id é `org.wdiodemoapp`. Esse binário é um app para iPhone Simulator (arm64, iOS 15.1 ou mais recente). Ele requer macOS e Xcode. Não há player de iOS nesta página.

Login, swipe e drag usam os mesmos rótulos de acessibilidade do Android. `swipe left` não foi executado no simulador. No apk Android, ele não pagina este carrossel. A chamada biométrica é `browser.touchId(true)`, não `fingerPrint`. `touchId` precisa da capability `appium:allowTouchIdEnroll` definida como `true` (passe-a com `--capabilities`). Cadastre o Touch ID no simulador antes de abrir o formulário de login, ou o botão biométrico continuará oculto.

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

Repita `drag` para as outras oito peças, na mesma ordem da bandeja do Android.

## Apps desktop

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` requer macOS. `windows` requer Windows. `--app Root` se conecta à área de trabalho. Um app Windows instalado é identificado pelo seu application id, por exemplo `--app Microsoft.WindowsCalculator`. Um caminho ou um `.exe` é resolvido como arquivo.

<a id="launch-console"></a>

## Electron, Tauri e Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` e `open dioxus ./my-app` precisam do respectivo driver no `PATH`, a menos que o pacote de serviço inicie a sessão por conta própria. No Linux sem `DISPLAY` ou `WAYLAND_DISPLAY`, instale Xvfb ou weston. O Electron continua no protocolo WebDriver clássico. Passe `--app-arg` para repassar uma flag ao app, incluindo `--app-arg=--no-sandbox` quando o ambiente exigir. Um valor que começa com `-` precisa usar `=`, pois caso contrário o parser estrito o trata como uma opção própria.

Instale `electron` e `@wdio/electron-service` no diretório que você abrir. `main.js` usa `import`, então o `package.json` desse diretório precisa de `"type": "module"` (ou nomeie o arquivo como `main.mjs`). Dimensione a janela de acordo com a área de trabalho para que uma tela menor não posicione a barra de título fora da tela:

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

O comando open abaixo não desativa o sandbox do renderizador. Adicione `--app-arg=--no-sandbox` apenas quando o ambiente não conseguir iniciar o Electron com o sandbox, como em alguns contêineres Linux. O player do Electron carrega a mesma URL Expo em uma janela de 1280×800 sem barra de endereços. O logo, a barra lateral, o cartão de clima, o cartão de login, o carrossel e o quebra-cabeça são iguais aos do navegador. `-s electron` é o nome de sessão usado ao lado da demonstração do navegador. O Electron continua no protocolo clássico, então `geolocation` e `emulate clock` passam pelo Chromedriver em vez do BiDi. Os comandos são iguais aos do Chrome, incluindo `reload` antes de Weather, exceto o diálogo de sucesso. No Linux, `dialog accept` aceita o alerta nativo e o balão continua desenhado na tela. Esse balão não faz parte da página, então um clique posterior não consegue alcançá-lo. A gravação substitui `window.alert` por um diálogo dentro da página e executa `click "aria/OK"`. O botão LOGIN continua sendo um controle laranja de 200×50 enquanto espera. O carrossel, a rolagem e o quebra-cabeça usam os mesmos comandos do Chrome.

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

Repita `drag` para `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` e `l3`.

<SessionTarget id="electron" />

## Dispositivos na nuvem

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` pode ser `browserstack`, `saucelabs`, `testingbot` ou `testmu`. Exporte o nome de usuário e a chave de acesso do provedor. `doctor <provider>` verifica se eles estão definidos e não imprime os valores. `--tunnel` inicia o túnel do provedor quando o app em teste está na sua máquina.

## Uma configuração do WebdriverIO

`open` pode receber um arquivo de configuração e um índice de capability em vez do nome de um alvo:

```sh
npx wdio session open ./wdio.conf.ts 0
```

Uma configuração em TypeScript é carregada com `tsx` quando seu projeto o possui. `tsx` é opcional: sem ele, a configuração é carregada via type stripping do Node ou jiti, e uma configuração que falha ao carregar informa `MISSING_DEPENDENCY` com uma linha de instalação.

`--hostname`, `--port`, `--path` e `--protocol` apontam a sessão para um endpoint WebDriver que já está em execução. Fechar a sessão não encerra esse endpoint.

## Solução de problemas

| Mensagem | O que fazer |
| --- | --- |
| `MISSING_DEPENDENCY` | Instale o pacote indicado no erro. `doctor <target>` imprime a mesma linha de instalação. O Electron precisa de `@wdio/electron-service` e `electron` no diretório que você abrir. |
| `MISSING_APPIUM_DRIVER` | Execute a linha `npx appium driver install …` do erro. |
| `MISSING_BINARY` | Coloque o driver indicado (`tauri-driver` ou `wdio-dioxus-driver`) no `PATH`. |
| `MISSING_CREDENTIALS` | Exporte as variáveis indicadas no erro. |
| `NOT_SUPPORTED` | `macos` é exclusivo do macOS e `windows` é exclusivo do Windows. `swipe` é exclusivo de mobile. No Chrome e no Electron, arraste `[data-testid=Carousel]` até `aria/Next card`. |
| `No dialog open.` | O alerta não está aberto. No Android, espere até que o alerta de sucesso esteja visível antes de `dialog accept`. No Electron no Linux, o balão nativo pode continuar desenhado após `acceptAlert` e ainda assim informar que não há diálogo. O player usa um diálogo dentro da página e `click "aria/OK"` em vez disso. |
| `The instrumentation process cannot be initialized` | O UiAutomator2 não começou a escutar a tempo. A sessão permite 240s para essa inicialização, após até 180s para instalar o servidor. Em um emulador por software, uma CPU e uma skin de 720×1280 levam o apk v2.2.0 até a tela inicial. Uma imagem de 1080×2400 com duas CPUs causa ANR no `system_server` e o servidor nunca começa a escutar. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | O cliente desistiu enquanto o Appium ainda estava criando a sessão. Android e iOS esperam 480s por essa primeira requisição e não a enviam novamente. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` é para sessões de navegador. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` é a chamada do Android. O iOS usa `browser.touchId`. |
| `App not found:` | Passe um caminho de apk que exista, ou use `--package` e `--activity` para um app que já esteja instalado. |
| `Pass --package <id>.` | `deeplink` precisa de `--package` no Android. |

## Próximos passos

- [Snapshots e refs](/docs/session/snapshots) — leia a tela após `open`
- [Comandos](/docs/session-commands) — todas as flags de `open`
- [wdio session](/docs/session) — o ciclo padrão