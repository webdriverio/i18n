---
id: ai-agents
title: WebdriverIO para Agentes de Programação
description: Configure o Cursor, Claude Code, Copilot ou qualquer outro agente de programação para escrever, executar e depurar testes WebdriverIO usando a documentação legível por máquina, o servidor MCP do WebdriverIO e os traces do DevTools.
---

A maioria dos testes WebdriverIO hoje é escrita em conjunto com um agente de programação. Esta página mostra como fornecer a um agente as três coisas de que ele precisa para fazer isso bem: **documentação atualizada** (para que ele escreva código v10 em vez de adivinhar), **uma forma de controlar o aplicativo em teste** (para que ele possa explorar a interface e verificar seletores) e **execuções de teste depuráveis** (para que ele possa corrigir testes com falha por conta própria).

## 1. Forneça a documentação ao seu agente

Todas as páginas deste site estão disponíveis como Markdown limpo, sem navegação, scripts ou estilos:

| Recurso | URL | Use para |
| --- | --- | --- |
| Índice da documentação | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | Um mapa selecionado de todas as páginas com resumos de uma linha. Comece por aqui. |
| Documentação completa | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | A documentação completa em um único arquivo, para agentes com janelas de contexto grandes. |
| Qualquer página individual | Adicione `.md` ao final da URL, por exemplo [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | Carregar exatamente a página de que o agente precisa. |
| Negociação de conteúdo | Requisite qualquer URL `/docs/*` com `Accept: text/markdown` | Agentes e ferramentas que buscam URLs como estão. |

Cada página da documentação também possui um menu **Copy page** com opções para copiar a página como Markdown ou abri-la diretamente no ChatGPT, Claude ou Cursor.

### Servidor MCP da documentação

A documentação também está disponível como um servidor MCP remoto em `https://webdriver.io/mcp`. Ele oferece ao agente três ferramentas: `search_docs` para encontrar a página certa, `get_page` para lê-la como Markdown e `list_sections` para carregar uma seção inteira de uma vez. Adicione-o ao lado do servidor MCP do WebdriverIO descrito abaixo:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Para o Claude Code, execute `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`.

## Deixe seu agente usar o `wdio session`

O [`wdio session`](/docs/session) mantém uma sessão WebdriverIO ativa entre comandos do shell. Um agente pode abrir um navegador, celular ou aplicativo desktop, capturar um snapshot do que está na tela, agir sobre refs e exportar os passos que funcionaram como um teste. Essa é a forma padrão de controlar um aplicativo a partir de um agente de programação. O [servidor MCP](/docs/mcp) na próxima seção é a alternativa quando o agente deve chamar ferramentas em vez do shell.

Instale a skill no projeto:

```sh
npx wdio session skill --install .
```

Isso cria o arquivo `.agents/skills/wdio-session/SKILL.md`. O `npm init wdio` cria o mesmo arquivo quando você aceita o suporte a agentes de programação e adiciona as regras de projeto abaixo.

Um agente pode criar o projeto sozinho. O assistente aceita uma flag para cada pergunta, e `--yes` preenche os valores padrão para o restante, de modo que ele nunca espera por entrada:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` lista todas as flags e seus valores. Veja [Responda ao assistente com flags](/docs/gettingstarted#answer-the-wizard-with-flags). A seção [WebdriverIO Session](/docs/session) aborda targets, snapshots, `exec`, exportação e depuração. Referência de comandos: [comandos do wdio session](/docs/session-commands).

### Adicione a documentação ao seu agente

Para disponibilizar a documentação em todos os chats, adicione o índice ao seu agente:

- **Cursor**: adicione `https://webdriver.io/llms.txt` como uma documentação personalizada nas configurações do Cursor (_Indexing & Docs_) e, em seguida, referencie-a no chat com `@` e o nome que você deu a ela.
- **Claude Code / Codex / outros agentes de CLI**: adicione o link ao `AGENTS.md` ou `CLAUDE.md` do seu projeto (veja as [regras de projeto](#3-add-project-rules) abaixo). Os agentes buscam as páginas de que precisam sob demanda.

## 2. Deixe seu agente controlar o navegador ou aplicativo

O [servidor MCP do WebdriverIO](/docs/mcp) (`@wdio/mcp`) permite que um agente abra navegadores (Chrome, Firefox, Edge, Safari), aplicativos móveis nativos e híbridos (via Appium) e dispositivos na nuvem, inspecione a árvore de acessibilidade, clique, digite e tire capturas de tela. Os agentes o usam para explorar uma página antes de escrever um teste, encontrar seletores robustos e reproduzir uma falha passo a passo.

Adicione-o à configuração do seu cliente MCP (por exemplo, `.mcp.json` ou `.cursor/mcp.json` no seu projeto):

```json title=".mcp.json"
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

Para o Claude Code, registre-o pela linha de comando:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

Veja a [configuração do MCP](/docs/mcp/configuration) para opções de sessão e [Provedores de Nuvem](/docs/mcp/cloud-providers) para executar no BrowserStack, Sauce Labs, TestMu AI ou TestingBot.

## 3. Adicione regras de projeto

Os agentes seguem as convenções de um projeto de forma muito mais confiável quando elas estão escritas. Adicione uma seção como a seguinte ao `AGENTS.md` (ou `CLAUDE.md`, `.cursor/rules`) do seu projeto de testes e ajuste os caminhos e comandos:

````md title="AGENTS.md"
## End-to-end tests (WebdriverIO v10)

- Docs: https://webdriver.io/llms.txt - fetch the relevant page as Markdown (append `.md`) before using an API you are not sure about. Do not use APIs from WebdriverIO v8 or older.
- Config: `wdio.conf.ts`. Specs: `test/specs/**/*.e2e.ts`. Page objects: `test/pageobjects/`.
- Run all tests: `npx wdio run wdio.conf.ts`
- Run a single spec: `npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts`
- Tests are async: always `await` commands, e.g. `await $('button').click()`. Never use the removed sync mode.
- Prefer user-facing selectors: accessibility name or text (`$('aria/Submit')`, `$('button=Submit')`), then `data-testid`. Avoid XPath and generated CSS classes.
- Rely on auto-waiting and `expect-webdriverio` matchers (`await expect($('h1')).toHaveText('Welcome')`) instead of `browser.pause()`.
- To explore the app or verify a selector, use the `wdio-mcp` MCP server.
- To drive the app from the shell, follow `.agents/skills/wdio-session/SKILL.md` (`npx wdio session`).
- When a test fails, read the DevTools trace in `test-results/` (see `transcript.md`) before changing code.
````

As regras acima refletem as recomendações em [Boas Práticas](/docs/bestpractices), [Seletores](/docs/selectors) e [Espera Automática](/docs/autowait).

## 4. Deixe o agente depurar testes com falha

O serviço [WebdriverIO DevTools](/docs/devtools) pode gravar um **trace** de cada execução: um artefato portátil com uma transcrição passo a passo em Markdown, capturas de tela, snapshots da árvore de acessibilidade e logs de rede para cada ação. Isso fornece ao agente as mesmas informações que um humano obtém ao assistir ao teste, sem precisar de uma janela de navegador.

Instale o serviço e ative o modo trace:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // um trace por teste facilita entregar uma única falha a um agente
            traceGranularity: 'test',
            // arquivos simples em vez de um zip, para que os agentes possam lê-los diretamente
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

Após uma execução, os traces são gravados em `test-results/`. Aponte seu agente para a pasta do teste com falha e peça que ele leia primeiro o `transcript.md`. Veja [Modo Trace](/docs/devtools/wdio/trace-mode) para todas as opções, incluindo granularidade e retenção.

## Fluxo de trabalho recomendado

1. Peça ao agente para explorar a funcionalidade em teste com o servidor MCP e propor seletores.
2. Deixe-o escrever a spec e o page object seguindo as regras do seu projeto, buscando páginas da documentação do WebdriverIO conforme necessário.
3. Faça com que ele execute a spec individual com `--spec` e itere até que ela passe.
4. Se um teste falhar no CI, entregue ao agente o trace desse teste e deixe-o corrigir o teste ou relatar o bug.

## Próximos passos

- [Primeiros Passos](/docs/gettingstarted) - crie um projeto com `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - todas as ferramentas que o servidor MCP oferece
- [DevTools](/docs/devtools) - modo ao vivo e modo trace
- [Boas Práticas](/docs/bestpractices) - como são bons testes WebdriverIO
- [Da v9 para a v10](/docs/v10-migration#migrate-with-a-coding-agent) - a skill de migração para uma suíte existente