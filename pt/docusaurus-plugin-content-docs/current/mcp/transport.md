---
id: transport
title: Transporte
description: "Execute o servidor MCP do WebdriverIO sobre o transporte stdio padrão ou sobre Streamable HTTP, e escolha o modo certo para o seu cliente."
---

O servidor MCP do WebdriverIO suporta dois modos de transporte: **stdio** (padrão) e **HTTP**.

## stdio (padrão)

stdio é o transporte MCP padrão. O cliente de IA inicia o servidor como um processo filho e se comunica por meio de stdin/stdout.

```json
{
  "mcpServers": {
    "webdriverio": {
      "command": "npx",
      "args": ["-y", "@wdio/mcp"]
    }
  }
}
```

Use stdio para configurações locais com Claude Desktop, Claude Code, Cursor e clientes semelhantes que gerenciam o ciclo de vida do servidor por conta própria.

## HTTP (Streamable HTTP)

O modo HTTP executa o servidor como um processo independente que escuta em uma porta. Os clientes se conectam a ele via HTTP em vez de iniciá-lo como um subprocesso. Use este modo quando:

- Seu cliente não suporta MCP baseado em subprocessos (por exemplo, a interface web do llama.cpp)
- Você deseja compartilhar uma única instância do servidor entre vários clientes
- Você está executando no modo seguro do Codex, onde a execução de subprocessos é restrita
- Você deseja manter o servidor em execução entre várias sessões de cliente

### Iniciando no modo HTTP

```bash
npx @wdio/mcp --http --port 3000
```

O servidor expõe um único endpoint: `http://localhost:<port>/mcp`

### Todas as opções

```bash
npx @wdio/mcp --http \
  --port 3000 \
  --allowedHosts "localhost,127.0.0.1,::1" \
  --allowedOrigins "http://localhost:5173,https://myapp.example.com"
```

| Flag               | Padrão                      | Descrição                                                                                     |
| ------------------ | --------------------------- | --------------------------------------------------------------------------------------------- |
| `--http`           | —                           | Habilita o modo de transporte HTTP                                                            |
| `--port`           | `3000`                      | Porta em que o servidor escuta                                                                |
| `--allowedHosts`   | `localhost,127.0.0.1,::1`   | Valores permitidos do cabeçalho `Host`, separados por vírgula (proteção contra DNS rebinding) |
| `--allowedOrigins` | _(nenhum — navegadores bloqueados)_ | Valores de `Origin` permitidos para CORS, separados por vírgula. Use `*` para permitir todas as origens. |

### Segurança

**`--allowedHosts`** — Protege contra ataques de DNS rebinding. Somente requisições com um cabeçalho `Host` correspondente a esta lista são aceitas. O padrão (`localhost,127.0.0.1,::1`) é seguro para uso local. Se você expuser o servidor em uma interface pública, adicione seu hostname aqui.

**`--allowedOrigins`** — Controla quais origens de navegador podem fazer requisições cross-origin (CORS). Por padrão, nenhuma origem de navegador é permitida. Isso bloqueia o acesso de sites arbitrários, enquanto ainda permite clientes que não sejam navegadores (ferramentas de CLI, clientes de API). Defina como `*` para permitir todas as origens ou liste origens específicas.

Requisições de clientes que não são navegadores (sem cabeçalho `Origin`) não estão sujeitas à verificação de CORS; apenas `--allowedHosts` se aplica.

## Casos de uso

### Interface web do llama.cpp

A interface web do llama.cpp é executada no navegador e envia um cabeçalho `Origin` em todas as requisições. Inicie o servidor com `--allowedOrigins` correspondente à origem da interface:

```bash
# A interface web do llama.cpp roda em http://localhost:8080
npx @wdio/mcp --http --port 3000 --allowedOrigins "http://localhost:8080"

# Ou permita todas as origens locais
npx @wdio/mcp --http --port 3000 --allowedOrigins "*"
```

Nas configurações do llama.cpp, adicione um servidor MCP apontando para `http://localhost:3000/mcp`.

---

### Modo seguro do Codex

O OpenAI Codex é executado em um ambiente isolado (sandbox) sem suporte a subprocessos. Use o transporte HTTP para que o Codex possa acessar o servidor MCP em execução na sua máquina host:

```bash
# Inicie no seu host
npx @wdio/mcp --http --port 3000
```

Na configuração MCP do Codex, defina a URL do servidor como `http://localhost:3000/mcp` (ou o IP do seu host, se o Codex for executado em uma VM).

---

### Arquitetura por requisição

Cada requisição HTTP cria uma nova instância do servidor MCP. Isso significa que:

- Os clientes podem se reconectar após perder uma conexão sem erros.
- Vários clientes podem se conectar simultaneamente (cada um recebe uma sessão MCP independente).
- O estado da sessão (o navegador/aplicativo ativo) é compartilhado por meio de estado global, e não do estado do transporte.

Não há mutex; as requisições são tratadas de forma concorrente. O caráter stateful do protocolo MCP (initialize → chamadas de ferramentas) é tratado por requisição.