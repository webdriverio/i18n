---
id: screencast
title: Screencast da Sessão
description: "Grave sessões do navegador como vídeos .webm com o screencast do DevTools, configure as opções de captura e encontre os arquivos de saída."
---

Grava sessões do navegador como vídeos `.webm`. Os vídeos são exibidos na interface do DevTools junto com as visualizações de snapshot e de mutações do DOM.

Disponível nos três adaptadores - **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** e **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. O modo de captura varia conforme o framework (CDP push sempre que possível, polling caso contrário - veja [Suporte a Navegadores](#browser-support) abaixo).

## Demonstração

![Screencast Demo](/img/devtools/screencast.gif)

## Configuração Inicial

A codificação do screencast requer o **ffmpeg** no `PATH` e o pacote `fluent-ffmpeg`:

```sh
# Instale o ffmpeg - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian

# Instale o fluent-ffmpeg
npm install fluent-ffmpeg
```

## Configuração

```ts
services: [
  [
    'devtools',
    {
      screencast: {
        enabled: true,
        captureFormat: 'jpeg',
        quality: 70,
        maxWidth: 1280,
        maxHeight: 720,
      }
    }
  ]
]
```

## Opções

| Opção | Tipo | Padrão | Descrição |
|---|---|---|---|
| `enabled` | `boolean` | `false` | Ativa a gravação da sessão |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Formato de imagem dos frames. **Somente Chrome/Chromium** - controla o formato que o Chrome envia via CDP. Ignorado no modo polling (Firefox, Safari), em que as capturas de tela são sempre PNG. Não afeta o contêiner do vídeo de saída, que é sempre `.webm` |
| `quality` | `number` | `70` | Qualidade de compressão JPEG de 0 a 100. Aplica-se somente no modo CDP do Chrome/Chromium com `captureFormat: 'jpeg'` |
| `maxWidth` | `number` | `1280` | Largura máxima do frame em pixels. **Somente Chrome/Chromium** - o Chrome redimensiona os frames antes de enviá-los via CDP. Ignorado no modo polling |
| `maxHeight` | `number` | `720` | Altura máxima do frame em pixels. **Somente Chrome/Chromium** - mesmo que acima |
| `pollIntervalMs` | `number` | `200` | Intervalo entre capturas de tela em milissegundos para navegadores que não são Chrome (modo polling). Menor = vídeo mais fluido, porém mais round-trips do WebDriver durante a execução dos testes |

## Suporte a Navegadores

A gravação funciona em todos os principais navegadores usando seleção automática de modo:

| Navegador | Modo | Observações |
|---|---|---|
| Chrome / Chromium / Edge | **CDP push** | O Chrome envia os frames pelo DevTools Protocol. Eficiente - sem impacto no tempo dos comandos de teste |
| Firefox / Safari / outros | **BiDi polling** | Recorre a chamadas de `browser.takeScreenshot()` em intervalos de `pollIntervalMs`. Funciona onde quer que capturas de tela do WebDriver sejam suportadas; adiciona uma pequena sobrecarga proporcional ao intervalo |

Nenhuma alteração de configuração é necessária para alternar entre os modos - o serviço detecta automaticamente as capacidades do navegador e registra no log qual modo está ativo.

## Comportamento

- A gravação começa quando a sessão do navegador é aberta e termina quando ela é fechada.
- Frames em branco iniciais (capturados antes da primeira navegação de URL) são removidos automaticamente, para que os vídeos comecem na primeira ação significativa na página.
- Se `browser.reloadSession()` for chamado durante a execução, o serviço finaliza a gravação atual e inicia uma nova para a nova sessão. Cada sessão produz seu próprio arquivo `.webm`.
- Quando existem várias gravações, a interface do DevTools exibe um menu suspenso **Recording N** para alternar entre elas.

### Onde os arquivos de saída são salvos

O diretório escolhido por cada adaptador é ligeiramente diferente - todos compartilham o mesmo resolvedor em `@wdio/devtools-core`, mas fornecem entradas diferentes:

| Adaptador | Local de saída |
|---|---|
| **WebdriverIO** | `outputDir`, se definido explicitamente em `wdio.conf.ts`; caso contrário, `rootDir` (o diretório que contém a configuração). Evite definir `outputDir` apenas para controlar os caminhos dos vídeos - o WDIO também redireciona os logs dos workers para lá. |
| **Selenium** | Diretório do arquivo de teste que acabou de ser executado, recorrendo a `process.cwd()` como alternativa. |
| **Nightwatch** | Diretório do arquivo de teste, recorrendo ao diretório que contém `nightwatch.conf.*` e, em seguida, a `process.cwd()`. |

Diretórios dentro de `node_modules/` são ignorados no caminho do Selenium/Nightwatch, para que workspaces com symlinks não despejem vídeos em uma pasta de dependência.

## Arquivos de Saída

O modo live transmite os dados capturados para o dashboard via WebSocket e **não grava nenhum arquivo de trace em disco** — para um artefato portátil, use o [modo trace](/docs/devtools/wdio/trace-mode) (`trace.zip`). O único arquivo que o modo live grava é o vídeo do screencast, e somente quando `screencast.enabled: true`. Os nomes dos arquivos são específicos de cada adaptador (o nome do framework aparece no prefixo):

| Adaptador | Vídeo do screencast |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |