---
id: transport
title: Transport
description: "Uruchom serwer MCP WebdriverIO przy użyciu domyślnego transportu stdio lub przez Streamable HTTP i wybierz odpowiedni tryb dla swojego klienta."
---

Serwer MCP WebdriverIO obsługuje dwa tryby transportu: **stdio** (domyślny) oraz **HTTP**.

## stdio (domyślny)

stdio to standardowy transport MCP. Klient AI uruchamia serwer jako proces potomny i komunikuje się z nim przez stdin/stdout.

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

Używaj stdio w lokalnych konfiguracjach z Claude Desktop, Claude Code, Cursor i podobnymi klientami, które samodzielnie zarządzają cyklem życia serwera.

## HTTP (Streamable HTTP)

Tryb HTTP uruchamia serwer jako samodzielny proces nasłuchujący na porcie. Klienci łączą się z nim przez HTTP, zamiast uruchamiać go jako podproces. Używaj tego trybu, gdy:

- Twój klient nie obsługuje MCP opartego na podprocesach (np. interfejs webowy llama.cpp)
- Chcesz współdzielić jedną instancję serwera między wieloma klientami
- Pracujesz w trybie bezpiecznym Codex, w którym uruchamianie podprocesów jest ograniczone
- Chcesz, aby serwer działał nieprzerwanie przez wiele sesji klienta

### Uruchamianie w trybie HTTP

```bash
npx @wdio/mcp --http --port 3000
```

Serwer udostępnia jeden endpoint: `http://localhost:<port>/mcp`

### Pełne opcje

```bash
npx @wdio/mcp --http \
  --port 3000 \
  --allowedHosts "localhost,127.0.0.1,::1" \
  --allowedOrigins "http://localhost:5173,https://myapp.example.com"
```

| Flaga              | Domyślnie                   | Opis                                                                                          |
| ------------------ | --------------------------- | --------------------------------------------------------------------------------------------- |
| `--http`           | —                           | Włącza tryb transportu HTTP                                                                   |
| `--port`           | `3000`                      | Port, na którym serwer nasłuchuje                                                             |
| `--allowedHosts`   | `localhost,127.0.0.1,::1`   | Rozdzielone przecinkami dozwolone wartości nagłówka `Host` (ochrona przed DNS rebinding)      |
| `--allowedOrigins` | _(brak — przeglądarki zablokowane)_ | Rozdzielone przecinkami dozwolone wartości `Origin` dla CORS. Użyj `*`, aby zezwolić na wszystkie originy. |

### Bezpieczeństwo

**`--allowedHosts`** — Chroni przed atakami DNS rebinding. Akceptowane są tylko żądania z nagłówkiem `Host` pasującym do tej listy. Wartość domyślna (`localhost,127.0.0.1,::1`) jest bezpieczna do użytku lokalnego. Jeśli udostępniasz serwer na publicznym interfejsie, dodaj tutaj swoją nazwę hosta.

**`--allowedOrigins`** — Określa, które originy przeglądarki mogą wykonywać żądania cross-origin (CORS). Domyślnie żadne originy przeglądarki nie są dozwolone. Blokuje to dostęp z dowolnych stron internetowych, jednocześnie pozwalając na korzystanie z klientów innych niż przeglądarki (narzędzia CLI, klienty API). Ustaw `*`, aby zezwolić na wszystkie originy, lub wymień konkretne originy.

Żądania od klientów innych niż przeglądarki (bez nagłówka `Origin`) nie podlegają sprawdzaniu CORS; obowiązuje jedynie `--allowedHosts`.

## Przypadki użycia

### Interfejs webowy llama.cpp

Interfejs webowy llama.cpp działa w przeglądarce i wysyła nagłówek `Origin` przy każdym żądaniu. Uruchom serwer z `--allowedOrigins` odpowiadającym originowi interfejsu:

```bash
# llama.cpp web UI runs at http://localhost:8080
npx @wdio/mcp --http --port 3000 --allowedOrigins "http://localhost:8080"

# Or allow all local origins
npx @wdio/mcp --http --port 3000 --allowedOrigins "*"
```

W ustawieniach llama.cpp dodaj serwer MCP wskazujący na `http://localhost:3000/mcp`.

---

### Tryb bezpieczny Codex

OpenAI Codex działa w środowisku sandbox bez obsługi podprocesów. Użyj transportu HTTP, aby Codex mógł połączyć się z serwerem MCP działającym na Twojej maszynie hosta:

```bash
# Start on your host
npx @wdio/mcp --http --port 3000
```

W konfiguracji MCP Codex ustaw adres URL serwera na `http://localhost:3000/mcp` (lub adres IP hosta, jeśli Codex działa w maszynie wirtualnej).

---

### Architektura per żądanie

Każde żądanie HTTP tworzy nową instancję serwera MCP. Oznacza to, że:

- Klienci mogą ponownie połączyć się po zerwaniu połączenia bez błędów.
- Wielu klientów może łączyć się jednocześnie (każdy otrzymuje niezależną sesję MCP).
- Stan sesji (aktywna przeglądarka/aplikacja) jest współdzielony przez stan globalny, a nie stan transportu.

Nie ma mutexu; żądania są obsługiwane współbieżnie. Stanowość protokołu MCP (initialize → wywołania narzędzi) jest obsługiwana w ramach każdego żądania.