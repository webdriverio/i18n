---
id: transport
title: Transport
description: "Exécutez le serveur MCP WebdriverIO via le transport stdio par défaut ou via Streamable HTTP, et choisissez le mode adapté à votre client."
---

Le serveur MCP WebdriverIO prend en charge deux modes de transport : **stdio** (par défaut) et **HTTP**.

## stdio (par défaut)

stdio est le transport MCP standard. Le client IA lance le serveur en tant que processus enfant et communique via stdin/stdout.

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

Utilisez stdio pour les configurations locales avec Claude Desktop, Claude Code, Cursor et des clients similaires qui gèrent eux-mêmes le cycle de vie du serveur.

## HTTP (Streamable HTTP)

Le mode HTTP exécute le serveur en tant que processus autonome qui écoute sur un port. Les clients s'y connectent via HTTP au lieu de le lancer en tant que sous-processus. Utilisez ce mode lorsque :

- Votre client ne prend pas en charge le MCP basé sur des sous-processus (par ex. l'interface web de llama.cpp)
- Vous souhaitez partager une seule instance de serveur entre plusieurs clients
- Vous travaillez en mode sécurisé de Codex, où l'exécution de sous-processus est restreinte
- Vous souhaitez que le serveur reste actif sur plusieurs sessions client

### Démarrage en mode HTTP

```bash
npx @wdio/mcp --http --port 3000
```

Le serveur expose un seul endpoint : `http://localhost:<port>/mcp`

### Options complètes

```bash
npx @wdio/mcp --http \
  --port 3000 \
  --allowedHosts "localhost,127.0.0.1,::1" \
  --allowedOrigins "http://localhost:5173,https://myapp.example.com"
```

| Option             | Valeur par défaut                    | Description                                                                                         |
| ------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `--http`           | —                                    | Active le mode de transport HTTP                                                                    |
| `--port`           | `3000`                               | Port d'écoute                                                                                       |
| `--allowedHosts`   | `localhost,127.0.0.1,::1`            | Valeurs d'en-tête `Host` autorisées, séparées par des virgules (protection contre le DNS rebinding) |
| `--allowedOrigins` | _(aucune — navigateurs bloqués)_     | Valeurs `Origin` autorisées pour CORS, séparées par des virgules. Utilisez `*` pour autoriser toutes les origines. |

### Sécurité

**`--allowedHosts`** — Protège contre les attaques par DNS rebinding. Seules les requêtes dont l'en-tête `Host` correspond à cette liste sont acceptées. La valeur par défaut (`localhost,127.0.0.1,::1`) est sûre pour un usage local. Si vous exposez le serveur sur une interface publique, ajoutez-y votre nom d'hôte.

**`--allowedOrigins`** — Contrôle quelles origines de navigateur peuvent effectuer des requêtes cross-origin (CORS). Par défaut, aucune origine de navigateur n'est autorisée. Cela bloque l'accès depuis des sites web arbitraires tout en permettant aux clients non-navigateurs (outils CLI, clients API) de se connecter. Définissez `*` pour autoriser toutes les origines, ou listez des origines spécifiques.

Les requêtes provenant de clients non-navigateurs (sans en-tête `Origin`) ne sont pas soumises à la vérification CORS ; seul `--allowedHosts` s'applique.

## Cas d'utilisation

### Interface web de llama.cpp

L'interface web de llama.cpp s'exécute dans le navigateur et envoie un en-tête `Origin` à chaque requête. Démarrez le serveur avec `--allowedOrigins` correspondant à l'origine de l'interface :

```bash
# llama.cpp web UI runs at http://localhost:8080
npx @wdio/mcp --http --port 3000 --allowedOrigins "http://localhost:8080"

# Or allow all local origins
npx @wdio/mcp --http --port 3000 --allowedOrigins "*"
```

Dans les paramètres de llama.cpp, ajoutez un serveur MCP pointant vers `http://localhost:3000/mcp`.

---

### Mode sécurisé de Codex

OpenAI Codex s'exécute dans un environnement isolé (sandbox) sans prise en charge des sous-processus. Utilisez le transport HTTP pour que Codex puisse atteindre le serveur MCP exécuté sur votre machine hôte :

```bash
# Démarrer sur votre hôte
npx @wdio/mcp --http --port 3000
```

Dans votre configuration MCP de Codex, définissez l'URL du serveur sur `http://localhost:3000/mcp` (ou l'IP de votre hôte si Codex s'exécute dans une VM).

---

### Architecture par requête

Chaque requête HTTP crée une nouvelle instance du serveur MCP. Cela signifie que :

- Les clients peuvent se reconnecter après une perte de connexion sans erreur.
- Plusieurs clients peuvent se connecter simultanément (chacun obtient une session MCP indépendante).
- L'état de session (le navigateur/l'application actif) est partagé via un état global, et non via l'état du transport.

Il n'y a pas de mutex ; les requêtes sont traitées de manière concurrente. La gestion d'état du protocole MCP (initialize → appels d'outils) est assurée par requête.