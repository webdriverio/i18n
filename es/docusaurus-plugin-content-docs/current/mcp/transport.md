---
id: transport
title: Transporte
description: "Ejecuta el servidor MCP de WebdriverIO mediante el transporte stdio predeterminado o mediante Streamable HTTP, y elige el modo adecuado para tu cliente."
---

El servidor MCP de WebdriverIO admite dos modos de transporte: **stdio** (predeterminado) y **HTTP**.

## stdio (predeterminado)

stdio es el transporte MCP estándar. El cliente de IA inicia el servidor como un proceso hijo y se comunica a través de stdin/stdout.

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

Usa stdio para configuraciones locales con Claude Desktop, Claude Code, Cursor y clientes similares que gestionan por sí mismos el ciclo de vida del servidor.

## HTTP (Streamable HTTP)

El modo HTTP ejecuta el servidor como un proceso independiente que escucha en un puerto. Los clientes se conectan a él mediante HTTP en lugar de iniciarlo como un subproceso. Úsalo cuando:

- Tu cliente no admite MCP basado en subprocesos (p. ej., la interfaz web de llama.cpp)
- Quieres compartir una única instancia del servidor entre varios clientes
- Estás ejecutando en el modo seguro de Codex, donde la ejecución de subprocesos está restringida
- Quieres mantener el servidor en ejecución a lo largo de varias sesiones de cliente

### Iniciar en modo HTTP

```bash
npx @wdio/mcp --http --port 3000
```

El servidor expone un único endpoint: `http://localhost:<port>/mcp`

### Opciones completas

```bash
npx @wdio/mcp --http \
  --port 3000 \
  --allowedHosts "localhost,127.0.0.1,::1" \
  --allowedOrigins "http://localhost:5173,https://myapp.example.com"
```

| Flag               | Predeterminado                  | Descripción                                                                                       |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------- |
| `--http`           | —                               | Habilita el modo de transporte HTTP                                                               |
| `--port`           | `3000`                          | Puerto en el que escuchar                                                                         |
| `--allowedHosts`   | `localhost,127.0.0.1,::1`       | Valores permitidos del encabezado `Host`, separados por comas (protección contra DNS rebinding)   |
| `--allowedOrigins` | _(ninguno — navegadores bloqueados)_ | Valores `Origin` permitidos para CORS, separados por comas. Usa `*` para permitir todos los orígenes. |

### Seguridad

**`--allowedHosts`** — Protege contra ataques de DNS rebinding. Solo se aceptan solicitudes con un encabezado `Host` que coincida con esta lista. El valor predeterminado (`localhost,127.0.0.1,::1`) es seguro para uso local. Si expones el servidor en una interfaz pública, añade aquí tu nombre de host.

**`--allowedOrigins`** — Controla qué orígenes de navegador pueden realizar solicitudes de origen cruzado (CORS). De forma predeterminada, no se permite ningún origen de navegador. Esto bloquea el acceso desde sitios web arbitrarios, sin dejar de permitir clientes que no son navegadores (herramientas CLI, clientes de API). Establécelo en `*` para permitir todos los orígenes, o enumera orígenes específicos.

Las solicitudes de clientes que no son navegadores (sin encabezado `Origin`) no están sujetas a la comprobación de CORS; solo se aplica `--allowedHosts`.

## Casos de uso

### Interfaz web de llama.cpp

La interfaz web de llama.cpp se ejecuta en el navegador y envía un encabezado `Origin` en cada solicitud. Inicia el servidor con `--allowedOrigins` coincidiendo con el origen de la interfaz:

```bash
# La interfaz web de llama.cpp se ejecuta en http://localhost:8080
npx @wdio/mcp --http --port 3000 --allowedOrigins "http://localhost:8080"

# O permite todos los orígenes locales
npx @wdio/mcp --http --port 3000 --allowedOrigins "*"
```

En la configuración de llama.cpp, añade un servidor MCP que apunte a `http://localhost:3000/mcp`.

---

### Modo seguro de Codex

OpenAI Codex se ejecuta en un entorno aislado (sandbox) sin soporte para subprocesos. Usa el transporte HTTP para que Codex pueda acceder al servidor MCP que se ejecuta en tu máquina anfitriona:

```bash
# Iniciar en tu máquina anfitriona
npx @wdio/mcp --http --port 3000
```

En tu configuración MCP de Codex, establece la URL del servidor en `http://localhost:3000/mcp` (o la IP de tu máquina anfitriona si Codex se ejecuta en una VM).

---

### Arquitectura por solicitud

Cada solicitud HTTP crea una nueva instancia del servidor MCP. Esto significa que:

- Los clientes pueden volver a conectarse tras perder una conexión sin errores.
- Varios clientes pueden conectarse simultáneamente (cada uno obtiene una sesión MCP independiente).
- El estado de la sesión (el navegador/aplicación activo) se comparte mediante el estado global, no mediante el estado del transporte.

No hay mutex; las solicitudes se gestionan de forma concurrente. El carácter con estado del protocolo MCP (initialize → llamadas a herramientas) se gestiona por solicitud.