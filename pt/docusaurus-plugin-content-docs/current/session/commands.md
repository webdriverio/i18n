---
id: session-commands
title: Comandos do wdio session
description: Todas as ações e flags do wdio session, de open até doctor e skill.
slug: /session-commands
---

<!-- Gerado a partir de packages/wdio-session/src/actions/specs.ts por `pnpm run docs:session-commands`. Não edite manualmente. -->

Todas as ações do `wdio session`. As flags globais se aplicam a todas elas. O mesmo texto é exibido por `npx wdio session <action> --help`. O restante da seção [WebdriverIO Session](/docs/session) aborda [targets](/docs/session/targets), [snapshots](/docs/session/snapshots), [`exec`](/docs/session/exec), [export](/docs/session/export) e [depuração](/docs/session/debug).

```sh
npx wdio session <action> [arguments] [flags]
```

## Flags globais

| Flag | Descrição |
| --- | --- |
| `-s, --session` | Nome da sessão (env WDIO_SESSION, padrão "default") |
| `--json` | Exibe um único objeto JSON (env WDIO_SESSION_JSON=1) |
| `--timeout` | Timeout da requisição em ms (limitado a 60000, exceto para wait) |
| `-q, --quiet` | Não exibe nada em caso de sucesso, exceto os dados solicitados |
| `--color` | Use --no-color para desativar as cores |

Códigos de saída: 0 sucesso, 1 a ação ou o seu código falhou, 2 erro de uso, 3 dependência ou credenciais ausentes, 4 nenhuma sessão com esse nome.

## `open`

Inicia uma sessão: browser, android, ios, macos, windows, electron, tauri, dioxus ou um arquivo de configuração do wdio.

Inicia um daemon em segundo plano que mantém a sessão ativa até `close`, ou até que ela fique ociosa por --idle-timeout (padrão 30m). Os navegadores rodam em modo headless, a menos que você passe --headed. Exibe o nome da sessão, o target, o diretório de artefatos onde ficam snapshots, screenshots e exports e, para um navegador aberto em uma URL, o snapshot interativo dessa página.

Uma sessão por nome. Abrir um nome que já está em execução falha; use-o, feche-o ou passe --replace. Passe `-s <name>` somente quando precisar de duas sessões ao mesmo tempo.

```sh
npx wdio session open <target> [url]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | não | URL a abrir (navegadores), caminho do app (apps desktop) ou capability (config) |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--replace` | Fecha antes uma sessão em execução com o mesmo nome |
| `--launch-timeout <n>` | Milissegundos de espera até a sessão ficar pronta |
| `--idle-timeout <value>` | Encerra após esse tempo sem requisições (ex.: 30m, 0 desativa) |
| `--capabilities <value>` | Capabilities extras como JSON ou caminho para um arquivo JSON |
| `--hostname <value>` | Host remoto do WebDriver |
| `--port <n>` | Porta remota do WebDriver |
| `--path <value>` | Caminho remoto do WebDriver |
| `--protocol <value>` | Protocolo remoto do WebDriver |
| `--log-level <value>` | Nível de log do WebdriverIO gravado em daemon.log |
| `--bidi` | Solicita WebDriver BiDi (use --no-bidi para desativar) |
| `--headed` | Mostra a janela do navegador |
| `--headless` | Executa sem janela (o padrão para navegadores; sobrepõe --headed) |
| `--snapshot` | Exibe o snapshot interativo da página aberta (use --no-snapshot para pular) |
| `--viewport <value>` | Viewport inicial, ex.: 1280x720 |
| `--browser-version <value>` | Versão do navegador |
| `--binary <value>` | Binário do navegador |
| `--arg <value>` | Argumento extra do navegador. Um valor que começa com `-` precisa de `=`, ex.: `--arg=--disable-gpu` (repetível) |
| `--profile <value>` | Diretório de perfil persistente |
| `--attach <value>` | Conecta-se a um Chrome/Edge em execução (porta de depuração ou URL) |
| `--app <value>` | Arquivo do app ou URL do app na nuvem |
| `--package <value>` | Pacote do app Android |
| `--activity <value>` | Activity do app Android |
| `--bundle-id <value>` | Bundle id iOS/macOS |
| `--browser <value>` | Navegador web mobile (chrome, safari) |
| `--device <value>` | Nome do dispositivo |
| `--platform-version <value>` | Versão da plataforma |
| `--udid <value>` | UDID do dispositivo |
| `--reset` | Use --no-reset para manter o estado do app (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | Orientação inicial |
| `--appium-url <value>` | Usa um servidor Appium em execução |
| `--app-arg <value>` | Argumento passado a um app desktop. Um valor que começa com `-` precisa de `=`, ex.: `--app-arg=--no-sandbox` (repetível) |
| `--chromedriver <value>` | Electron: binário do Chromedriver |
| `--electron-version <value>` | Electron: sobrepõe a detecção de versão |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | Provedor de nuvem |
| `--os <value>` | Nuvem: SO desktop |
| `--os-version <value>` | Nuvem: versão do SO desktop |
| `--region <value>` | Nuvem: região do Sauce Labs |
| `--tunnel <value>` | Nuvem: inicia o túnel do provedor (ou "external") |
| `--tunnel-name <value>` | Nuvem: identificador do túnel |
| `--project <value>` | Nuvem: rótulo do projeto |
| `--build <value>` | Nuvem: rótulo do build |
| `--name <value>` | Nuvem: rótulo do nome da sessão |

**Exemplos**

```sh
# Abrir o Chrome headless em um app local
npx wdio session open chrome http://localhost:3000

# Abrir o Firefox com uma janela visível
npx wdio session open firefox http://localhost:3000 --headed

# Abrir um app Android via Appium
npx wdio session open android --app ./app.apk

# Abrir um app iOS instalado
npx wdio session open ios --bundle-id com.example.shop

# Abrir um app Electron
npx wdio session open electron ./main.js

# Abrir a primeira capability de uma config
npx wdio session open ./wdio.conf.ts 0

# Abrir o Chrome em um grid na nuvem
npx wdio session open chrome https://example.com --provider browserstack
```

Veja também: [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor).

## `close`

Encerra a sessão e para o seu daemon.

Em uma sessão aberta por `wdio run --debug=agent`, isso faz o teste pausado falhar; use `resume` para deixá-lo continuar.

```sh
npx wdio session close
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--all` | Fecha todas as sessões |
| `--clean` | Também exclui o diretório de artefatos |

**Exemplos**

```sh
# Fechar a sessão padrão
npx wdio session close

# Fechar todas as sessões e excluir seus artefatos
npx wdio session close --all --clean
```

Veja também: [`open`](#open), [`list`](#list).

## `list`

Lista as sessões em execução.

Exibe uma linha por sessão: nome, target, URL e idade. Remove o estado deixado por sessões que morreram.

```sh
npx wdio session list
```

**Exemplos**

```sh
# Mostrar todas as sessões em execução
npx wdio session list
```

Veja também: [`info`](#info), [`status`](#status).

## `info`

Mostra os detalhes da sessão.

Exibe o target, o navegador e a versão, o suporte a BiDi, o diretório de artefatos e a URL atual, o título, o tamanho da janela e o frame (web) ou o contexto e a activity (mobile).

```sh
npx wdio session info
```

**Exemplos**

```sh
# Mostrar onde a sessão está e o que ela executa
npx wdio session info
```

Veja também: [`list`](#list), [`get`](#get).

## `restart`

Fecha e reabre com o mesmo target e as mesmas flags.

Mantém o histórico gravado, então `export` ainda abrange os passos de antes do reinício.

```sh
npx wdio session restart
```

**Exemplos**

```sh
# Recomeçar com um navegador novo
npx wdio session restart
```

Veja também: [`open`](#open), [`close`](#close).

## `status`

Sai com 0 se a sessão estiver em execução, 4 caso contrário.

```sh
npx wdio session status
```

**Exemplos**

```sh
# Abrir uma sessão somente quando nenhuma estiver em execução
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

Veja também: [`list`](#list), [`open`](#open).

## `exec`

Executa código WebdriverIO a partir do stdin, de -e ou de um arquivo.

Executa como uma função async com `browser`, `$`, `$$`, `expect` e `ref('e3')` no escopo. Variáveis de nível superior persistem entre as chamadas. `wdio session` sem uma ação executa `exec` quando o código é enviado via pipe no stdin.

Sempre use `await` nos comandos. `$` retorna exatamente um elemento e lança StrictSelectorError quando mais de um corresponde. Prefira uma única ação (click, fill, …) quando ela resolver; use `exec` para loops, condições e asserções.

```sh
npx wdio session exec [file]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `file` | não | Arquivo de script (.js, .ts, .mjs) |

**Flags**

| Flag | Descrição |
| --- | --- |
| `-e, --eval <value>` | Código a executar |
| `--history` | Grava o código no histórico (use --no-history para pular) |

**Exemplos**

```sh
# Executar uma linha
npx wdio session exec -e "await browser.getTitle()"

# Fazer uma asserção na página (aspas simples mantêm o shell longe do $)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# Enviar vários passos via pipe no stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# Executar um arquivo de script
npx wdio session exec ./scripts/login.ts
```

Veja também: [`helpers`](#helpers), [`history`](#history), [`export`](#export).

## `helpers`

Lista os helpers do projeto em .wdio/helpers.

Cada arquivo em .wdio/helpers exporta por padrão uma função que recebe o browser e registra comandos customizados com addCommand. Os helpers são carregados quando a sessão abre e se tornam comandos customizados no teste exportado.

```sh
npx wdio session helpers
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--reload` | Reimporta os helpers |

**Exemplos**

```sh
# Listar os helpers e os comandos que eles adicionam
npx wdio session helpers

# Carregar as edições de um helper
npx wdio session helpers --reload
```

Veja também: [`exec`](#exec), [`export`](#export).

## `snapshot`

Snapshot de acessibilidade com refs. Aplica-se a web, mobile nativo, desktop nativo.

Exibe a árvore de acessibilidade, um nó por linha, ex.: `button "Add to cart" [ref=e3]`. Passe uma ref para click, fill, get e as outras ações. As refs continuam válidas enquanto o elemento existir; uma ação em um elemento removido falha com REF_STALE.

Todo snapshot é gravado no diretório de artefatos. Uma saída maior que --max-chars é exibida em partes: a primeira parte e, em seguida, `--offset <line>` para a próxima. `find` pesquisa tudo.

O layout do texto e o formato do --json são experimentais e podem mudar em uma versão minor. A sintaxe das refs e as ações que recebem uma ref permanecem estáveis.

```sh
npx wdio session snapshot
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--depth <n>` | Profundidade máxima |
| `--scope <value>` | Faz snapshot apenas abaixo desta ref ou seletor |
| `-i, --interactive` | Apenas elementos interativos |
| `--all` | Inclui elementos ocultos |
| `--boxes` | Acrescenta as bounding boxes |
| `--viewport` | Apenas o que está no viewport (web: não atualiza a baseline do diff) |
| `--selectors` | Termina cada linha de ref com o seu melhor seletor |
| `--compact` | Remove nós sem nome que não têm conteúdo |
| `-u, --urls` | Inclui os hrefs dos links |
| `--file-only` | Apenas grava o arquivo |
| `--max-chars <n>` | Exibe até essa quantidade de caracteres por vez (padrão 8000) |
| `--offset <n>` | Exibe a partir desta linha, para a próxima parte de um snapshot longo |

**Exemplos**

```sh
# Apenas elementos interativos, a primeira olhada habitual
npx wdio session snapshot -i

# Página inteira com os destinos dos links
npx wdio session snapshot --compact --urls

# Apenas parte da página
npx wdio session snapshot --scope "#checkout" --depth 4

# O que está na tela agora
npx wdio session snapshot --viewport -i

# Cada ref com um seletor para colocar em um teste
npx wdio session snapshot --selectors -i

# Agir e depois olhar de novo
npx wdio session click e3 && npx wdio session snapshot -i
```

Veja também: [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot).

## `read`

Lê o texto da página como Markdown. Aplica-se a web.

Títulos, parágrafos, itens de lista, linhas de tabela e links com sua URL, a partir do conteúdo principal quando a página o marca (main, article), senão da página inteira; navegação, rodapés e texto oculto ficam de fora. Cortado em --max-chars (padrão 6000); o corte informa qual --offset lê a próxima parte. Com --scope, a seção é rolada até ficar visível. Use para responder "o que a página diz"; use snapshot ou find para obter refs sobre as quais agir.

```sh
npx wdio session read
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--scope <value>` | Lê apenas abaixo desta ref ou seletor |
| `--max-chars <n>` | Exibe até essa quantidade de caracteres (padrão 6000) |
| `--offset <n>` | Começa neste caractere do texto, para a próxima parte de uma página longa |

**Exemplos**

```sh
# Ler o conteúdo principal
npx wdio session read

# Ler uma seção
npx wdio session read --scope e12
```

Veja também: [`find`](#find), [`snapshot`](#snapshot), [`get`](#get).

## `find`

Pesquisa texto em um snapshot novo. Aplica-se a web, mobile nativo, desktop nativo.

Tira um novo snapshot e exibe cada correspondência com o nó ao redor (ex.: o item de lista inteiro, para que um valor ao lado da correspondência seja incluído), com números de linha e refs, e rola a primeira correspondência até ficar visível. A correspondência ignora maiúsculas/minúsculas, depois espaços ("SO2" encontra "SO 2"), e então procura todas as palavras e palavras parecidas com elas. Texto que está apenas em partes ocultas da página (menus fechados, abas, "Mostrar mais") é listado como tal. Mais barato do que ler um snapshot inteiro de uma página grande. -A/-B/-C exibem contexto de linhas simples, como o grep.

```sh
npx wdio session find <text>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `text` | sim | Texto a pesquisar |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--regex` | Trata o texto como expressão regular |
| `--scope <value>` | Pesquisa apenas abaixo desta ref ou seletor |
| `-C, --context <n>` | Linhas de contexto antes e depois, em vez do nó ao redor |
| `-A, --after-context <n>` | Linhas de contexto depois de cada correspondência |
| `-B, --before-context <n>` | Linhas de contexto antes de cada correspondência |
| `--offset <n>` | Pula essa quantidade de correspondências, para as próximas quando a saída for cortada |

**Exemplos**

```sh
# Encontrar a ref de um botão
npx wdio session find "Add to cart"

# Listar todos os links
npx wdio session find "^\s*link" --regex --context 0
```

Veja também: [`snapshot`](#snapshot), [`wait`](#wait).

## `diff`

Compara um snapshot novo com o anterior. Aplica-se a web, mobile nativo, desktop nativo.

Exibe um diff unificado do que mudou desde o último snapshot, ou "No changes". A primeira chamada armazena uma baseline. Use após uma ação para ver o que a ação fez sem ler a página inteira de novo. Na web, a baseline é o último snapshot tirado sem `--viewport`.

```sh
npx wdio session diff
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--baseline <value>` | Arquivo de snapshot para comparar |
| `--scope <value>` | Faz snapshot apenas dentro desta ref ou seletor, como `snapshot --scope` |
| `--interactive` | Apenas elementos interativos, como `snapshot -i` |

**Exemplos**

```sh
# Ver o que um clique mudou
npx wdio session click e7 && npx wdio session diff

# Comparar com um snapshot salvo
npx wdio session diff --baseline before.yml
```

Veja também: [`snapshot`](#snapshot), [`find`](#find).

## `screenshot`

Salva um PNG do viewport, de um elemento ou da página inteira. Aplica-se a web, mobile nativo, desktop nativo.

Exibe o caminho do arquivo e o tamanho da imagem. Tire um screenshot quando a questão for sobre layout ou aparência; leia texto e estado com `snapshot` e `get`.

```sh
npx wdio session screenshot [target]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | não | Ref ou seletor do elemento a capturar |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--full` | Página inteira (web) |
| `--path <value>` | Arquivo de saída |

**Exemplos**

```sh
# Capturar o viewport
npx wdio session screenshot

# Capturar um elemento
npx wdio session screenshot e5 --path card.png

# Capturar a página inteira
npx wdio session screenshot --full
```

Veja também: [`visual`](#visual), [`pdf`](#pdf), [`snapshot`](#snapshot).

## `pdf`

Salva a página atual como PDF. Aplica-se a web.

Chama `browser.savePDF`. Uma sessão BiDi imprime com `browsingContext.print`, headed ou headless, no Chrome, Edge e Firefox. Uma sessão Classic usa `printPage`, que versões mais antigas do Chrome só suportam em modo headless.

```sh
npx wdio session pdf [file]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `file` | não | Arquivo de saída (deve terminar em .pdf) |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--path <value>` | Arquivo de saída (deve terminar em .pdf) |

**Exemplos**

```sh
# Gravar report.pdf no diretório atual
npx wdio session pdf report.pdf
```

Veja também: [`screenshot`](#screenshot).

## `source`

Salva o HTML da página ou o XML do app. Aplica-se a web, mobile nativo, desktop nativo.

Grava o arquivo e exibe seu caminho e tamanho. Use quando um snapshot esconde o que você precisa, como atributos para um seletor.

```sh
npx wdio session source
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--path <value>` | Arquivo de saída |

**Exemplos**

```sh
# Salvar o HTML no diretório atual
npx wdio session source --path page.html
```

Veja também: [`snapshot`](#snapshot), [`get`](#get).

## `get`

Lê texto, html, valor, um atributo, o título, a URL, uma contagem ou uma box. Aplica-se a web.

Exibe o valor e, em seguida, o código WebdriverIO executado (`→ …`). Passe -q para exibir apenas o valor, ex.: para capturá-lo em uma variável do shell. Leia um valor antes de escrever uma asserção para ele.

```sh
npx wdio session get <sub> [target] [name]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | não | Ref ou seletor (não usado para title e url) |
| `name` | não | Nome do atributo (apenas attr) |

**Exemplos**

```sh
# Texto de uma ref
npx wdio session get text e1

# URL atual
npx wdio session get url

# Apenas o valor, para uma variável do shell
url=$(npx wdio session get url -q)

# href de um link
npx wdio session get attr e3 href

# Quantos elementos correspondem
npx wdio session get count "aria/Remove"
```

Veja também: [`is`](#is), [`wait`](#wait), [`exec`](#exec).

## `is`

Verifica se um elemento está visível, habilitado ou marcado. Aplica-se a web.

Exibe true ou false e, em seguida, o código WebdriverIO executado; passe -q para exibir apenas o valor. O código de saída é 0 em ambos os casos.

```sh
npx wdio session is <sub> <target>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | visible \| enabled \| checked |
| `target` | sim | Ref ou seletor |

**Exemplos**

```sh
# Exibir true ou false
npx wdio session is visible e1

# Verificar um botão pelo seu rótulo
npx wdio session is enabled "aria/Place order"
```

Veja também: [`get`](#get), [`wait`](#wait).

## `logs`

Exibe os logs de console, erros de página, rede e dispositivo desde a última chamada. Aplica-se a web, mobile nativo.

Cada chamada avança um cursor de leitura, então a próxima chamada mostra apenas entradas novas. Execute após uma ação para ver os erros que essa ação causou.

```sh
npx wdio session logs
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--errors` | Apenas erros |
| `--network` | Apenas entradas de rede |
| `--since <value>` | Apenas entradas mais recentes que essa duração (ex.: 30s) |
| `--peek` | Não avança o cursor de leitura |
| `--source <browser\|driver\|logcat\|syslog\|main>` | Fonte do log |

**Exemplos**

```sh
# Erros causados por um clique
npx wdio session click e4 && npx wdio session logs --errors

# Entradas recentes, mantendo-as para a próxima chamada
npx wdio session logs --since 30s --peek
```

Veja também: [`requests`](#requests).

## `navigate`

Abre uma URL. Aplica-se a web.

Aceita `example.com`, URLs completas e caminhos relativos ao baseUrl. Sai antes de qualquer frame. Exibe a nova URL e o título.

```sh
npx wdio session navigate <url>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `url` | sim | URL (URLs relativas usam o baseUrl) |

**Exemplos**

```sh
# Ir para uma página e olhá-la
npx wdio session navigate /cart && npx wdio session snapshot -i

# Abrir outro site
npx wdio session navigate example.com
```

Veja também: [`back`](#back), [`reload`](#reload), [`wait`](#wait).

## `back`

Volta. Aplica-se a web.

```sh
npx wdio session back
```

**Exemplos**

```sh
# Voltar uma página
npx wdio session back
```

Veja também: [`forward`](#forward), [`navigate`](#navigate).

## `forward`

Avança. Aplica-se a web.

```sh
npx wdio session forward
```

**Exemplos**

```sh
# Avançar uma página
npx wdio session forward
```

Veja também: [`back`](#back), [`navigate`](#navigate).

## `reload`

Recarrega a página. Aplica-se a web.

```sh
npx wdio session reload
```

**Exemplos**

```sh
# Recarregar e esperar até a rede ficar ociosa
npx wdio session reload && npx wdio session wait --load networkidle
```

Veja também: [`navigate`](#navigate), [`wait`](#wait).

## `wait`

Espera por um elemento, texto, uma URL, um estado de carregamento, uma condição ou alguns milissegundos. Aplica-se a web.

Passe exatamente um dos seguintes: uma ref ou seletor, --text, --url, --load, --fn ou milissegundos. Falha com código de saída 1 após --limit.

Prefira uma condição a uma pausa, tanto aqui quanto em vez de `sleep` em uma cadeia. Uma pausa maior que 30 segundos é recusada.

```sh
npx wdio session wait [target]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | não | Ref, seletor ou milissegundos |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--text <value>` | Espera até a página conter este texto |
| `--url <value>` | Espera até a URL corresponder (substring, ou globs * e **) |
| `--load <value>` | domcontentloaded, load ou networkidle |
| `--fn <value>` | Espera até esta expressão JavaScript ser verdadeira |
| `--state <value>` | Com um target: visible (padrão), hidden, enabled ou disabled |
| `--limit <n>` | Milissegundos de espera (padrão 10000) |

**Exemplos**

```sh
# Esperar até uma ref ficar visível
npx wdio session wait e1

# Esperar até um spinner sumir
npx wdio session wait "aria/Loading" --state hidden

# Agir, esperar o resultado, olhar de novo
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# Esperar por uma URL
npx wdio session wait --url "**/dashboard"

# Esperar até não haver nenhuma requisição em andamento
npx wdio session wait --load networkidle

# Pausar 500ms
npx wdio session wait 500
```

Veja também: [`find`](#find), [`is`](#is), [`get`](#get).

## `click`

Clica em um elemento. Aplica-se a web, mobile nativo, desktop nativo.

Exibe o que foi clicado e, quando o clique navegou, a nova URL. Tire um novo snapshot antes de usar refs na próxima página. Um elemento oculto ou coberto falha imediatamente, informando o que está no caminho. `x,y` clica em um ponto do viewport (pixels a partir do canto superior esquerdo, como em um screenshot) para o que não tem ref, como um canvas ou mapa.

```sh
npx wdio session click <target>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12), seletor do WebdriverIO ou coordenadas x,y do viewport |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--double` | Clique duplo |
| `--right` | Clique com o botão direito |
| `--new-tab` | Abre o link em uma nova aba e alterna para ela |

**Exemplos**

```sh
# Clicar em uma ref do snapshot mais recente
npx wdio session click e3

# Clicar pelo nome acessível
npx wdio session click "aria/Add to cart"

# Clicar, esperar, olhar de novo
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# Abrir um link em uma nova aba
npx wdio session click e8 --new-tab

# Clicar em um ponto do viewport, ex.: em um mapa
npx wdio session click 320,480
```

Veja também: [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot).

## `tap`

Toca em um elemento (mobile). Aplica-se a mobile nativo.

```sh
npx wdio session tap <target>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12) ou seletor do WebdriverIO |

**Exemplos**

```sh
# Tocar em uma ref do snapshot mais recente
npx wdio session tap e2
```

Veja também: [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe).

## `fill`

Substitui o valor de um input. Aplica-se a web, mobile nativo, desktop nativo.

Limpa o campo primeiro. Para digitar no que estiver com foco, use `type`; para enviar teclas como Enter, use `press`.

```sh
npx wdio session fill <target> <text..>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12) ou seletor do WebdriverIO |
| `text` | sim | Texto (as palavras após o target são unidas com espaços) |

**Exemplos**

```sh
# Preencher um campo
npx wdio session fill e2 ada@example.com

# Preencher um formulário e enviá-lo
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

Veja também: [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check).

## `type`

Digita em um elemento ou no elemento com foco. Aplica-se a web, mobile nativo, desktop nativo.

Envia o texto como pressionamentos de tecla sem limpar nada: `type e2 Ada` digita em e2, `type Ada` no que estiver com foco. Para substituir um valor, use `fill`.

```sh
npx wdio session type <text..>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `text` | sim | Texto (as palavras são unidas com espaços). Comece com uma ref, ex.: `type e2 Ada`, para digitar nesse elemento em vez do que está com foco |

**Exemplos**

```sh
# Digitar em um campo
npx wdio session type e5 hello

# Digitar no que estiver com foco
npx wdio session focus e5 && npx wdio session type "hello"
```

Veja também: [`fill`](#fill), [`press`](#press), [`focus`](#focus).

## `press`

Pressiona teclas, ex.: Enter, Control+a. Aplica-se a web, desktop nativo.

Combine teclas com +. Os nomes ignoram maiúsculas/minúsculas; ctrl, cmd, esc, up, down, left e right são aceitos como formas abreviadas.

```sh
npx wdio session press <keys>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `keys` | sim | Combinação de teclas |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--times <n>` | Pressiona essa quantidade de vezes (até 100), ex.: para mover um slider |

**Exemplos**

```sh
# Enviar um formulário
npx wdio session press Enter

# Mover um slider com foco cinco passos
npx wdio session press ArrowRight --times 5

# Selecionar tudo
npx wdio session press Control+a

# Mover o foco para trás
npx wdio session press Shift+Tab
```

Veja também: [`type`](#type), [`fill`](#fill).

## `select`

Seleciona uma opção de um `<select>`. Aplica-se a web.

```sh
npx wdio session select <target> <value>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12) ou seletor do WebdriverIO |
| `value` | sim | Texto, valor ou índice da opção |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--by <text\|value\|index>` | Como corresponder a opção (padrão text) |

**Exemplos**

```sh
# Selecionar pelo texto visível
npx wdio session select e6 Germany

# Selecionar pelo valor
npx wdio session select e6 de --by value
```

Veja também: [`fill`](#fill), [`check`](#check).

## `upload`

Define um input de arquivo. Aplica-se a web.

O caminho é relativo ao seu diretório de trabalho. Aponte para o próprio `<input type="file">`, não para o botão que abre o seletor.

```sh
npx wdio session upload <target> <file>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12) ou seletor do WebdriverIO |
| `file` | sim | Arquivo a enviar |

**Exemplos**

```sh
# Anexar um arquivo
npx wdio session upload e9 ./fixtures/avatar.png
```

Veja também: [`fill`](#fill).

## `hover`

Move o ponteiro sobre um elemento. Aplica-se a web, desktop nativo.

```sh
npx wdio session hover <target>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12) ou seletor do WebdriverIO |

**Exemplos**

```sh
# Abrir um menu de hover e olhá-lo
npx wdio session hover e4 && npx wdio session snapshot -i
```

Veja também: [`click`](#click).

## `focus`

Coloca o foco em um elemento. Aplica-se a web.

```sh
npx wdio session focus <target>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12) ou seletor do WebdriverIO |

**Exemplos**

```sh
# Focar um campo antes de `type`
npx wdio session focus e5
```

Veja também: [`type`](#type), [`press`](#press).

## `check`

Marca um checkbox ou radio. Aplica-se a web.

Não faz nada quando já está marcado e falha quando não termina marcado.

```sh
npx wdio session check <target>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12) ou seletor do WebdriverIO |

**Exemplos**

```sh
# Aceitar os termos
npx wdio session check e7
```

Veja também: [`uncheck`](#uncheck), [`is`](#is).

## `uncheck`

Desmarca um checkbox. Aplica-se a web.

Não faz nada quando já está desmarcado. Um radio button selecionado não pode ser desmarcado.

```sh
npx wdio session uncheck <target>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12) ou seletor do WebdriverIO |

**Exemplos**

```sh
# Cancelar a inscrição na newsletter
npx wdio session uncheck e7
```

Veja também: [`check`](#check), [`is`](#is).

## `drag`

Arrasta um elemento sobre outro. Aplica-se a web, mobile nativo, desktop nativo.

```sh
npx wdio session drag <from> <to>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `from` | sim | Ref ou seletor a arrastar |
| `to` | sim | Ref ou seletor onde soltar |

**Exemplos**

```sh
# Mover um card para outra coluna
npx wdio session drag e3 e9
```

Veja também: [`scroll`](#scroll).

## `scroll`

Rola um elemento até ficar visível ou rola a página. Aplica-se a web.

Sem um target, rola 600px para baixo. Conteúdo carregado sob demanda (lazy-loaded) aparece no próximo snapshot.

```sh
npx wdio session scroll [target]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | não | Ref, seletor, up, down, top ou bottom |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--px <n>` | Pixels para up/down (padrão 600) |

**Exemplos**

```sh
# Trazer um elemento para a área visível
npx wdio session scroll e40

# Carregar mais resultados e olhá-los
npx wdio session scroll bottom && npx wdio session snapshot -i

# Rolar duas telas
npx wdio session scroll down --px 1200
```

Veja também: [`swipe`](#swipe), [`snapshot`](#snapshot).

## `swipe`

Desliza na tela (mobile). Aplica-se a mobile nativo.

```sh
npx wdio session swipe <direction>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `direction` | sim | up \| down \| left \| right |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--percent <n>` | Comprimento do swipe 0..1 |

**Exemplos**

```sh
# Rolar uma lista e olhá-la
npx wdio session swipe up && npx wdio session snapshot
```

Veja também: [`scroll`](#scroll), [`tap`](#tap).

## `long-press`

Pressiona longamente um elemento (mobile). Aplica-se a mobile nativo.

```sh
npx wdio session long-press <target>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref (e12) ou seletor do WebdriverIO |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--duration <n>` | Milissegundos |

**Exemplos**

```sh
# Abrir um menu de contexto
npx wdio session long-press e4 --duration 1500
```

Veja também: [`tap`](#tap).

## `tabs`

Lista, abre, alterna ou fecha abas. Aplica-se a web.

Sem um subcomando, lista as abas com seu índice; a atual é marcada. `new` abre uma aba e alterna para ela. `switch` e `close` recebem um índice ou handle.

```sh
npx wdio session tabs [sub] [arg]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | não | switch \| new \| close |
| `arg` | não | Índice, handle ou URL |

**Exemplos**

```sh
# Listar as abas
npx wdio session tabs

# Abrir uma aba
npx wdio session tabs new http://localhost:3000/help

# Voltar para a primeira aba
npx wdio session tabs switch 0

# Fechar a segunda aba
npx wdio session tabs close 1
```

Veja também: [`windows`](#windows), [`frame`](#frame).

## `windows`

Lista ou alterna janelas. Aplica-se a web, desktop nativo.

```sh
npx wdio session windows [sub] [arg]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | não | switch |
| `arg` | não | Índice ou handle |

**Exemplos**

```sh
# Listar as janelas
npx wdio session windows

# Alternar para a segunda janela
npx wdio session windows switch 1
```

Veja também: [`tabs`](#tabs).

## `frame`

Entra em um iframe, vai para o pai ou para o topo. Aplica-se a web.

O snapshot da página já mostra o conteúdo de seus iframes, com refs que as ações usam diretamente, então `frame` só é necessário para trabalhar dentro de um frame por um tempo ou para ver um frame que o snapshot cortou. Snapshots e ações se aplicam ao frame atual até você voltar. `navigate` retorna ao documento de topo.

```sh
npx wdio session frame <target>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | sim | Ref, seletor, parent ou top |

**Exemplos**

```sh
# Entrar em um iframe e olhar dentro dele
npx wdio session frame e12 && npx wdio session snapshot -i

# Voltar para a página
npx wdio session frame top
```

Veja também: [`tabs`](#tabs), [`snapshot`](#snapshot).

## `contexts`

Lista ou alterna contextos nativos/webview. Aplica-se a mobile nativo.

```sh
npx wdio session contexts [sub] [name]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | não | switch |
| `name` | não | Nome do contexto |

**Exemplos**

```sh
# Listar os contextos NATIVE_APP e WEBVIEW
npx wdio session contexts

# Controlar a webview
npx wdio session contexts switch WEBVIEW_com.example.shop
```

Veja também: [`snapshot`](#snapshot).

## `dialog`

Aceita, dispensa ou informa sobre um diálogo aberto. Aplica-se a web, mobile nativo.

Um alert, confirm ou prompt aberto bloqueia outras ações, que falham com uma dica para executar este comando.

```sh
npx wdio session dialog <sub>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | accept \| dismiss \| status |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--text <value>` | Texto do prompt (apenas accept) |

**Exemplos**

```sh
# Mostrar o diálogo aberto
npx wdio session dialog status

# Confirmar
npx wdio session dialog accept

# Responder a um prompt
npx wdio session dialog accept --text "Ada"
```

Veja também: [`click`](#click).

## `app`

Inicia, encerra, instala ou consulta um app. Aplica-se a mobile nativo, desktop nativo.

```sh
npx wdio session app <sub> <id>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | launch \| terminate \| install \| state |
| `id` | sim | Id do app, bundle id ou arquivo |

**Exemplos**

```sh
# Reiniciar o app
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# Ele está em execução?
npx wdio session app state com.example.shop
```

Veja também: [`deeplink`](#deeplink), [`background`](#background).

## `deeplink`

Abre um deep link. Aplica-se a mobile nativo.

```sh
npx wdio session deeplink <url>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `url` | sim | URL |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--package <value>` | Pacote Android ou bundle id iOS |

**Exemplos**

```sh
# Abrir uma tela de produto
npx wdio session deeplink shop://product/42 --package com.example.shop
```

Veja também: [`app`](#app).

## `rotate`

Gira o dispositivo. Aplica-se a mobile nativo.

```sh
npx wdio session rotate <orientation>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `orientation` | sim | portrait \| landscape |

**Exemplos**

```sh
# Colocar o dispositivo na horizontal
npx wdio session rotate landscape
```

## `keyboard`

Oculta o teclado na tela. Aplica-se a mobile nativo.

```sh
npx wdio session keyboard <sub>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | hide |

**Exemplos**

```sh
# Descobrir os elementos sob o teclado
npx wdio session keyboard hide
```

## `background`

Envia o app para segundo plano. Aplica-se a mobile nativo.

```sh
npx wdio session background <seconds>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `seconds` | sim | Segundos (-1 o mantém lá) |

**Exemplos**

```sh
# Colocar o app em segundo plano por 3 segundos
npx wdio session background 3
```

Veja também: [`app`](#app).

## `lock`

Bloqueia o dispositivo. Aplica-se a mobile nativo.

```sh
npx wdio session lock
```

**Exemplos**

```sh
# Bloquear a tela
npx wdio session lock
```

Veja também: [`unlock`](#unlock).

## `unlock`

Desbloqueia o dispositivo. Aplica-se a mobile nativo.

```sh
npx wdio session unlock
```

**Exemplos**

```sh
# Desbloquear a tela
npx wdio session unlock
```

Veja também: [`lock`](#lock).

## `geolocation`

Define a geolocalização. Aplica-se a web, mobile nativo.

```sh
npx wdio session geolocation <lat> <lon>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `lat` | sim | Latitude |
| `lon` | sim | Longitude |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--accuracy <n>` | Precisão em metros |

**Exemplos**

```sh
# Fingir estar em Berlim
npx wdio session geolocation 52.52 13.405
```

Veja também: [`emulate`](#emulate).

## `emulate`

Emula um dispositivo, viewport, rede, cpu, relógio ou um escopo de emulação BiDi. Aplica-se a web.

Uma emulação permanece até `emulate reset` ou até a sessão terminar; definir o mesmo tipo novamente a substitui. `emulate device` sem valor lista os nomes de dispositivos. Presets de rede e throttling de cpu exigem um navegador Chromium.

```sh
npx wdio session emulate <sub> [value]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | não | Valor para a emulação |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--dpr <n>` | Device pixel ratio (viewport) |
| `--tick <n>` | Avança o relógio emulado em ms (clock) |

**Exemplos**

```sh
# Emular um celular
npx wdio session emulate device "iPhone 15"

# Definir um viewport
npx wdio session emulate viewport 375x812 --dpr 3

# Ficar offline
npx wdio session emulate network offline

# Modo escuro
npx wdio session emulate color-scheme dark

# Congelar a data
npx wdio session emulate clock 2030-01-01T00:00:00Z

# Reduzir animações
npx wdio session emulate media prefersReducedMotion=reduce

# Desfazer todas as emulações
npx wdio session emulate reset
```

Veja também: [`geolocation`](#geolocation), [`screenshot`](#screenshot).

## `requests`

Lista as requisições de rede capturadas (BiDi). Aplica-se a web.

```sh
npx wdio session requests
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--filter <value>` | Substring ou glob |
| `--failed` | Apenas requisições com falha |
| `--since <value>` | Apenas requisições mais recentes que essa duração |
| `--limit <n>` | Máximo de linhas (padrão 50) |

**Exemplos**

```sh
# Apenas chamadas de API
npx wdio session requests --filter "**/api/**"

# Requisições que um clique quebrou
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

Veja também: [`mock`](#mock), [`logs`](#logs).

## `mock`

Faz mock de respostas para um padrão de URL (BiDi). Aplica-se a web.

Exibe o id do mock (m1, m2, …). Fazer mock do mesmo padrão novamente substitui o mock anterior.

```sh
npx wdio session mock <pattern>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `pattern` | sim | Padrão de URL |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--status <n>` | Código de status |
| `--body <value>` | Corpo como JSON/texto ou caminho de arquivo |
| `--header <value>` | Header k:v (repetível) |
| `--abort` | Aborta as requisições correspondentes |
| `--method <value>` | Apenas este método |
| `--once` | Apenas a próxima requisição |

**Exemplos**

```sh
# Retornar JSON fixo
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# Fazer a próxima requisição falhar
npx wdio session mock "**/api/cart" --status 500 --once

# Bloquear imagens
npx wdio session mock "**/*.png" --abort
```

Veja também: [`unmock`](#unmock), [`requests`](#requests).

## `unmock`

Remove mocks. Aplica-se a web.

```sh
npx wdio session unmock [pattern]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `pattern` | não | Padrão ou id do mock |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--all` | Remove todos os mocks |

**Exemplos**

```sh
# Remover um mock
npx wdio session unmock m1

# Remover todos os mocks
npx wdio session unmock --all
```

Veja também: [`mock`](#mock).

## `cookies`

Obtém, define ou limpa cookies. Aplica-se a web.

Sem um subcomando, exibe todos os cookies como name=value. `clear` sem um nome exclui todos os cookies.

```sh
npx wdio session cookies [sub] [name] [value]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | não | get \| set \| clear |
| `name` | não | Nome do cookie |
| `value` | não | Valor do cookie |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--domain <value>` | Domínio do cookie (set) |
| `--path <value>` | Caminho do cookie (set) |
| `--http-only` | Cookie HttpOnly (set) |
| `--secure` | Cookie Secure (set) |
| `--same-site <value>` | lax, strict, none ou default (set) |
| `--expiry <n>` | Expiração como timestamp Unix em segundos (set) |

**Exemplos**

```sh
# Listar os cookies
npx wdio session cookies

# Valor de um cookie
npx wdio session cookies get session

# Definir um cookie e recarregar
npx wdio session cookies set session abc && npx wdio session reload

# Excluir todos os cookies
npx wdio session cookies clear
```

Veja também: [`storage`](#storage), [`state`](#state).

## `storage`

Obtém, define ou limpa o localStorage (ou sessionStorage). Aplica-se a web.

Sem um subcomando, exibe todas as entradas. `clear` sem uma chave esvazia o armazenamento.

```sh
npx wdio session storage [sub] [key] [value]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | não | get \| set \| clear |
| `key` | não | Chave |
| `value` | não | Valor |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--session-storage` | Usa o sessionStorage |

**Exemplos**

```sh
# Listar o localStorage
npx wdio session storage

# Definir uma chave
npx wdio session storage set token abc

# Esvaziar o sessionStorage
npx wdio session storage clear --session-storage
```

Veja também: [`cookies`](#cookies), [`state`](#state).

## `state`

Salva ou carrega cookies e storage. Aplica-se a web.

`save` grava os cookies, o localStorage e o sessionStorage da origem atual em um arquivo JSON. `load` abre essa origem e os restaura, ex.: para pular um login.

```sh
npx wdio session state <sub> <file>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | save \| load |
| `file` | sim | Arquivo de estado |

**Exemplos**

```sh
# Salvar um estado logado
npx wdio session state save .wdio/logged-in.json

# Começar já logado
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

Veja também: [`cookies`](#cookies), [`storage`](#storage).

## `visual`

Snapshots visuais através do @wdio/visual-service. Aplica-se a web, mobile nativo, desktop nativo.

`save` armazena uma baseline em .wdio/visual/baseline, `check` compara com ela e exibe a diferença, `accept` transforma a última imagem real na baseline, `list` mostra as tags. Requer @wdio/visual-service no projeto.

```sh
npx wdio session visual <sub> [tag]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | save \| check \| accept \| list |
| `tag` | não | Tag da imagem |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--element <value>` | Apenas este elemento |
| `--full` | Página inteira |
| `--tabbable` | Página tabbable |
| `--threshold <n>` | Diferença permitida em porcentagem (padrão 0) |
| `--all` | accept: todas as tags |

**Exemplos**

```sh
# Armazenar uma baseline
npx wdio session visual save cart

# Comparar com ela
npx wdio session visual check cart --threshold 0.5

# Aceitar uma mudança intencional
npx wdio session visual accept cart
```

Veja também: [`screenshot`](#screenshot).

## `trace`

Grava cada passo com screenshots e snapshots.

`stop` exibe o diretório do trace e uma transcrição dos passos.

```sh
npx wdio session trace <sub>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | start \| stop |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--screenshots` | Screenshot após cada passo (use --no-screenshots para pular) |
| `--snapshots` | Snapshot após cada passo (use --no-snapshots para pular) |

**Exemplos**

```sh
# Iniciar o tracing
npx wdio session trace start

# Parar e exibir a transcrição
npx wdio session trace stop
```

Veja também: [`record`](#record), [`history`](#history).

## `record`

Grava um vídeo. Aplica-se a web, mobile nativo.

```sh
npx wdio session record <sub>
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `sub` | sim | start \| stop |

**Flags**

| Flag | Descrição |
| --- | --- |
| `--fps <n>` | Quadros por segundo (padrão 5) |
| `--path <value>` | Arquivo de saída |

**Exemplos**

```sh
# Iniciar a gravação
npx wdio session record start

# Parar e salvar o vídeo
npx wdio session record stop --path checkout.mp4
```

Veja também: [`trace`](#trace), [`screenshot`](#screenshot).

## `history`

Exibe os passos gravados.

Toda ação que altera a página grava o código WebdriverIO que executou. `export` transforma esse histórico em uma spec.

```sh
npx wdio session history
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--clear` | Limpa o histórico |

**Exemplos**

```sh
# Mostrar os passos até agora
npx wdio session history

# Recomeçar a gravação antes dos passos que você quer manter
npx wdio session history --clear
```

Veja também: [`export`](#export), [`exec`](#exec).

## `export`

Gera uma spec a partir do histórico.

Grava uma spec describe/it com os passos gravados. As refs se tornam seletores estáveis e os helpers se tornam comandos customizados. Sem --out, o arquivo vai para o diretório de artefatos. Execute-a com `wdio run` para confirmar que passa.

```sh
npx wdio session export
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--out <value>` | Arquivo de saída |
| `--title <value>` | Título da suíte |
| `--page-objects` | Gera page objects |
| `--framework <mocha\|jasmine>` | Framework (padrão mocha) |

**Exemplos**

```sh
# Gravar a spec
npx wdio session export --out test/specs/cart.e2e.ts

# Gravar a spec e executá-la
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Veja também: [`history`](#history), [`helpers`](#helpers).

## `resume`

Continua um teste pausado por wdio run --debug=agent.

`wdio run --debug=agent` pausa um teste com falha e o expõe como a sessão debug-`<worker>`. Inspecione-o com qualquer ação e depois retome. `close` nessa sessão faz o teste falhar em vez disso.

```sh
npx wdio session resume
```

**Exemplos**

```sh
# Olhar o teste pausado e depois deixá-lo continuar
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

Veja também: [`close`](#close), [`list`](#list).

## `doctor`

Verifica o seu ambiente.

Exibe uma linha por verificação, com uma correção para cada falha. Sai com 1 quando uma verificação falha.

```sh
npx wdio session doctor [target]
```

**Argumentos**

| Nome | Obrigatório | Descrição |
| --- | --- | --- |
| `target` | não | Verifica apenas o que este target precisa |

**Exemplos**

```sh
# Verificar tudo
npx wdio session doctor

# Verificar o que uma sessão Android precisa
npx wdio session doctor android
```

Veja também: [`open`](#open).

## `skill`

Exibe a skill do agente.

```sh
npx wdio session skill
```

**Flags**

| Flag | Descrição |
| --- | --- |
| `--install <value>` | Grava-a em .agents/skills/wdio-session/SKILL.md (ou neste diretório) |

**Exemplos**

```sh
# Exibir a skill
npx wdio session skill

# Adicioná-la a este projeto
npx wdio session skill --install .
```