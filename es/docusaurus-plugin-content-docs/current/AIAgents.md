---
id: ai-agents
title: WebdriverIO para agentes de programación
description: Configura Cursor, Claude Code, Copilot o cualquier otro agente de programación para escribir, ejecutar y depurar pruebas de WebdriverIO usando la documentación legible por máquinas, el servidor MCP de WebdriverIO y las trazas de DevTools.
---

Hoy en día, la mayoría de las pruebas de WebdriverIO se escriben junto con un agente de programación. Esta página muestra cómo darle a un agente las tres cosas que necesita para hacerlo bien: **documentación actualizada** (para que escriba código de v10 en lugar de adivinar), **una forma de controlar la aplicación bajo prueba** (para que pueda explorar la interfaz y verificar selectores) y **ejecuciones de pruebas depurables** (para que pueda corregir por sí mismo las pruebas que fallan).

## 1. Dale la documentación a tu agente

Cada página de este sitio está disponible como Markdown limpio, sin navegación, scripts ni estilos:

| Recurso | URL | Úsalo para |
| --- | --- | --- |
| Índice de la documentación | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | Un mapa seleccionado de todas las páginas con resúmenes de una línea. Empieza aquí. |
| Documentación completa | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | La documentación completa en un solo archivo, para agentes con ventanas de contexto grandes. |
| Cualquier página individual | Añade `.md` a la URL, p. ej. [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | Cargar exactamente la página que necesita el agente. |
| Negociación de contenido | Solicita cualquier URL `/docs/*` con `Accept: text/markdown` | Agentes y herramientas que obtienen las URL tal cual. |

Cada página de la documentación también tiene un menú **Copy page** con opciones para copiar la página como Markdown o abrirla directamente en ChatGPT, Claude o Cursor.

### Servidor MCP de la documentación

La documentación también está disponible como servidor MCP remoto en `https://webdriver.io/mcp`. Proporciona al agente tres herramientas: `search_docs` para encontrar la página adecuada, `get_page` para leerla como Markdown y `list_sections` para cargar una sección completa de una sola vez. Añádelo junto al servidor MCP de WebdriverIO que se describe más abajo:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Para Claude Code, ejecuta `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`.

## Deja que tu agente use `wdio session`

[`wdio session`](/docs/session) mantiene viva una sesión de WebdriverIO entre comandos de shell. Un agente puede abrir un navegador, un teléfono o una aplicación de escritorio, tomar una instantánea de lo que hay en pantalla, actuar sobre referencias y exportar como prueba los pasos que funcionaron. Esa es la forma predeterminada de controlar una aplicación desde un agente de programación. El [servidor MCP](/docs/mcp) de la siguiente sección es la alternativa cuando el agente debe llamar a herramientas en lugar de usar la shell.

Instala el skill en el proyecto:

```sh
npx wdio session skill --install .
```

Esto escribe `.agents/skills/wdio-session/SKILL.md`. `npm init wdio` escribe el mismo archivo cuando aceptas el soporte para agentes de programación, y añade las reglas de proyecto que se muestran más abajo.

Un agente puede crear el proyecto por sí mismo. El asistente acepta un flag para cada pregunta, y `--yes` rellena los valores predeterminados para el resto, de modo que nunca espera una entrada:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` enumera todos los flags y sus valores. Consulta [Responder al asistente con flags](/docs/gettingstarted#answer-the-wizard-with-flags). La sección [WebdriverIO Session](/docs/session) cubre los destinos, las instantáneas, `exec`, la exportación y la depuración. Referencia de comandos: [comandos de wdio session](/docs/session-commands).

### Añade la documentación a tu agente

Para que la documentación esté disponible en cada chat, añade el índice a tu agente:

- **Cursor**: añade `https://webdriver.io/llms.txt` como documentación personalizada en la configuración de Cursor (_Indexing & Docs_) y luego haz referencia a ella en el chat con `@` y el nombre que le hayas dado.
- **Claude Code / Codex / otros agentes de CLI**: añade el enlace al `AGENTS.md` o `CLAUDE.md` de tu proyecto (consulta las [reglas del proyecto](#3-add-project-rules) más abajo). Los agentes obtienen las páginas que necesitan bajo demanda.

## 2. Deja que tu agente controle el navegador o la aplicación

El [servidor MCP de WebdriverIO](/docs/mcp) (`@wdio/mcp`) permite a un agente abrir navegadores (Chrome, Firefox, Edge, Safari), aplicaciones móviles nativas e híbridas (mediante Appium) y dispositivos en la nube, inspeccionar el árbol de accesibilidad, hacer clic, escribir y tomar capturas de pantalla. Los agentes lo usan para explorar una página antes de escribir una prueba, encontrar selectores robustos y reproducir un fallo paso a paso.

Añádelo a la configuración de tu cliente MCP (por ejemplo, `.mcp.json` o `.cursor/mcp.json` en tu proyecto):

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

Para Claude Code, regístralo desde la línea de comandos:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

Consulta la [configuración de MCP](/docs/mcp/configuration) para ver las opciones de sesión, y [Proveedores en la nube](/docs/mcp/cloud-providers) para ejecutar en BrowserStack, Sauce Labs, TestMu AI o TestingBot.

## 3. Añade reglas de proyecto

Los agentes siguen las convenciones de un proyecto de forma mucho más fiable cuando están escritas. Añade una sección como la siguiente al `AGENTS.md` (o `CLAUDE.md`, `.cursor/rules`) de tu proyecto de pruebas y ajusta las rutas y los comandos:

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

Las reglas anteriores reflejan las recomendaciones de [Buenas prácticas](/docs/bestpractices), [Selectores](/docs/selectors) y [Espera automática](/docs/autowait).

## 4. Deja que el agente depure las pruebas que fallan

El servicio [WebdriverIO DevTools](/docs/devtools) puede grabar una **traza** de cada ejecución: un artefacto portable con una transcripción en Markdown paso a paso, capturas de pantalla, instantáneas del árbol de accesibilidad y registros de red para cada acción. Esto le da a un agente la misma información que obtiene una persona al observar la prueba, sin necesidad de una ventana de navegador.

Instala el servicio y activa el modo de traza:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // una traza por prueba facilita entregar un único fallo a un agente
            traceGranularity: 'test',
            // archivos simples en lugar de un zip, para que los agentes puedan leerlos directamente
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

Después de una ejecución, las trazas se escriben en `test-results/`. Indica a tu agente la carpeta de la prueba que falla y pídele que lea primero `transcript.md`. Consulta [Modo de traza](/docs/devtools/wdio/trace-mode) para ver todas las opciones, incluidas la granularidad y la retención.

## Flujo de trabajo recomendado

1. Pide al agente que explore la funcionalidad bajo prueba con el servidor MCP y que proponga selectores.
2. Deja que escriba la spec y el page object siguiendo las reglas de tu proyecto, consultando las páginas de la documentación de WebdriverIO según sea necesario.
3. Haz que ejecute la spec individual con `--spec` e itere hasta que pase.
4. Si una prueba falla en CI, dale al agente la traza de esa prueba y deja que corrija la prueba o informe del error.

## Próximos pasos

- [Primeros pasos](/docs/gettingstarted) - crea un proyecto con `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - todas las herramientas que proporciona el servidor MCP
- [DevTools](/docs/devtools) - modo en vivo y modo de traza
- [Buenas prácticas](/docs/bestpractices) - cómo son las buenas pruebas de WebdriverIO
- [De v9 a v10](/docs/v10-migration#migrate-with-a-coding-agent) - el skill de migración para una suite existente