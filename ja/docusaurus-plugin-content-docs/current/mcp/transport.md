---
id: transport
title: トランスポート
description: "WebdriverIO MCP サーバーをデフォルトの stdio トランスポートまたは Streamable HTTP で実行し、クライアントに適したモードを選択します。"
---

WebdriverIO MCP サーバーは、**stdio**（デフォルト）と **HTTP** の 2 つのトランスポートモードをサポートしています。

## stdio (デフォルト)

stdio は標準的な MCP トランスポートです。AI クライアントがサーバーを子プロセスとして起動し、stdin/stdout を介して通信します。

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

Claude Desktop、Claude Code、Cursor など、サーバーのライフサイクルを自身で管理するクライアントを使用したローカル環境では stdio を使用してください。

## HTTP (Streamable HTTP)

HTTP モードでは、サーバーはポートで待ち受けるスタンドアロンプロセスとして実行されます。クライアントはサーバーをサブプロセスとして起動するのではなく、HTTP 経由で接続します。次のような場合に使用してください：

- クライアントがサブプロセスベースの MCP をサポートしていない場合（例：llama.cpp の Web UI）
- 1 つのサーバーインスタンスを複数のクライアントで共有したい場合
- サブプロセスの実行が制限されている Codex のセキュアモードで実行している場合
- 複数のクライアントセッションにまたがってサーバーを稼働させ続けたい場合

### HTTP モードでの起動

```bash
npx @wdio/mcp --http --port 3000
```

サーバーは単一のエンドポイントを公開します：`http://localhost:<port>/mcp`

### すべてのオプション

```bash
npx @wdio/mcp --http \
  --port 3000 \
  --allowedHosts "localhost,127.0.0.1,::1" \
  --allowedOrigins "http://localhost:5173,https://myapp.example.com"
```

| フラグ             | デフォルト                  | 説明                                                                            |
| ------------------ | --------------------------- | ------------------------------------------------------------------------------- |
| `--http`           | —                           | HTTP トランスポートモードを有効にします                                         |
| `--port`           | `3000`                      | 待ち受けるポート                                                                |
| `--allowedHosts`   | `localhost,127.0.0.1,::1`   | 許可する `Host` ヘッダー値のカンマ区切りリスト（DNS リバインディング対策）      |
| `--allowedOrigins` | _(なし — ブラウザはブロック)_ | CORS で許可する `Origin` 値のカンマ区切りリスト。`*` を指定するとすべてのオリジンを許可します。 |

### セキュリティ

**`--allowedHosts`** — DNS リバインディング攻撃から保護します。このリストに一致する `Host` ヘッダーを持つリクエストのみが受け入れられます。デフォルト（`localhost,127.0.0.1,::1`）はローカルでの使用には安全です。サーバーをパブリックインターフェースで公開する場合は、ここにホスト名を追加してください。

**`--allowedOrigins`** — どのブラウザオリジンがクロスオリジンリクエスト（CORS）を行えるかを制御します。デフォルトでは、ブラウザオリジンは一切許可されません。これにより、ブラウザ以外のクライアント（CLI ツール、API クライアント）は引き続き許可しつつ、任意の Web サイトからのアクセスをブロックします。すべてのオリジンを許可するには `*` を設定するか、特定のオリジンを列挙してください。

ブラウザ以外のクライアントからのリクエスト（`Origin` ヘッダーなし）は CORS チェックの対象外であり、`--allowedHosts` のみが適用されます。

## ユースケース

### llama.cpp Web UI

llama.cpp の Web UI はブラウザ上で動作し、すべてのリクエストで `Origin` ヘッダーを送信します。UI のオリジンに一致する `--allowedOrigins` を指定してサーバーを起動してください：

```bash
# llama.cpp web UI runs at http://localhost:8080
npx @wdio/mcp --http --port 3000 --allowedOrigins "http://localhost:8080"

# Or allow all local origins
npx @wdio/mcp --http --port 3000 --allowedOrigins "*"
```

llama.cpp の設定で、`http://localhost:3000/mcp` を指す MCP サーバーを追加してください。

---

### Codex セキュアモード

OpenAI Codex は、サブプロセスをサポートしないサンドボックス環境で動作します。Codex がホストマシン上で動作する MCP サーバーにアクセスできるよう、HTTP トランスポートを使用してください：

```bash
# ホスト上で起動
npx @wdio/mcp --http --port 3000
```

Codex の MCP 設定で、サーバー URL を `http://localhost:3000/mcp`（Codex が VM 内で動作している場合はホストの IP）に設定してください。

---

### リクエスト単位のアーキテクチャ

各 HTTP リクエストごとに新しい MCP サーバーインスタンスが作成されます。これは次のことを意味します：

- クライアントは接続が切断された後でも、エラーなく再接続できます。
- 複数のクライアントが同時に接続できます（それぞれが独立した MCP セッションを持ちます）。
- セッション状態（アクティブなブラウザ/アプリ）は、トランスポートの状態ではなくグローバル状態を介して共有されます。

ミューテックスはなく、リクエストは並行して処理されます。MCP プロトコルのステートフルな処理（initialize → ツール呼び出し）はリクエスト単位で処理されます。