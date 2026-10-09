---
id: gettingstarted
title: Primeros pasos
description: Crea un proyecto de WebdriverIO con npm init wdio@latest, ejecuta tu primera prueba y encuentra la siguiente guía para tu plataforma.
---

Configura WebdriverIO en un proyecto nuevo o existente con un solo comando y luego ejecuta tu primera prueba. El asistente de configuración te pregunta qué quieres probar (web, móvil, escritorio o extensiones de VS Code), qué framework y reporters usar, e instala todo por ti.

:::info
Esta es la documentación de WebdriverIO __v10__. ¿Sigues en v9? Usa la [documentación de v9](https://v9.webdriver.io) o sigue la [guía de migración a v10](/docs/v10-migration).
:::

:::tip ¿Usas un agente de programación?
Apúntalo a [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) o conecta el servidor MCP de la documentación en `https://webdriver.io/mcp`. Consulta [WebdriverIO para agentes de programación](/docs/ai-agents).
:::

## Iniciar una configuración de WebdriverIO

El [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) añade una configuración completa de WebdriverIO a un proyecto nuevo o existente. En el directorio raíz de un proyecto existente, ejecuta:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

o si quieres crear un proyecto nuevo:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

o si quieres crear un proyecto nuevo:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

o si quieres crear un proyecto nuevo:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

o si quieres crear un proyecto nuevo:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Este único comando descarga la herramienta CLI de WebdriverIO y ejecuta un asistente de configuración que te ayuda a configurar tu suite de pruebas.

<CreateProjectAnimation />

El asistente te hará una serie de preguntas que te guiarán durante la configuración. Puedes pasar el parámetro `--yes` para elegir una configuración predeterminada que usará Mocha con Chrome siguiendo el patrón [Page Object](https://martinfowler.com/bliki/PageObject.html).

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### Responder al asistente con flags

Cada pregunta del asistente tiene un flag de línea de comandos. Un flag responde a su pregunta y el asistente solo pregunta el resto. Junto con `--yes`, el asistente usa los valores predeterminados para el resto y nunca muestra preguntas, que es lo que necesita un agente de programación o un trabajo de CI:

```sh
# Cucumber en JavaScript, con los reporters spec y JUnit
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox y Edge en lugar de Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# Una app de Android con Appium
npm init wdio@latest . -- --yes --mobile-environment android

# Pruebas de componentes de React
npm init wdio@latest . -- --yes --runner component --preset react

# Escribe la configuración, pero instala las dependencias tú mismo
npm init wdio@latest . -- --yes --no-npm-install
```

Con Yarn, pnpm y bun, pasa los flags sin el separador `--`, p. ej. `pnpm create wdio@latest . --yes --framework cucumber`.

Los flags más comunes:

| Flag | Valores |
| --- | --- |
| `--runner` | `e2e` (predeterminado), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (predeterminado), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | TypeScript es el predeterminado cuando el proyecto tiene un `tsconfig.json` |
| `--browsers` | Lista separada por comas de `chrome` (predeterminado), `firefox`, `safari`, `edge` |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (predeterminado), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, con `--runner component` |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, con `--runner desktop` |
| `--reporters`, `--services`, `--plugins` | Nombres cortos separados por comas, p. ej. `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | Escribe la sección de `AGENTS.md` y la skill `wdio-session` (activado por defecto) |
| `--npm-install` / `--no-npm-install` | Instala las dependencias (activado por defecto) |

`npm init wdio@latest -- --help` lista todos los flags, los valores que aceptan y la pregunta que responden. Los flags booleanos admiten el prefijo `--no-`. Los mismos flags funcionan con `npx wdio config`.

El asistente comprueba cada flag con respecto a tu configuración. Un valor desconocido, un flag para una pregunta que no haría o un valor que no ofrecería para tu configuración lo detiene con el código de salida 2 antes de escribir ningún archivo:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## Instalar la CLI manualmente

También puedes añadir el paquete de la CLI a tu proyecto manualmente mediante:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # imprime p. ej. `8.13.10`

# ejecutar el asistente de configuración
npx wdio config
```

## Ejecutar pruebas

Puedes iniciar tu suite de pruebas usando el comando `run` y apuntando a la configuración de WebdriverIO que acabas de crear:

```sh
npx wdio run ./wdio.conf.js
```

Si quieres ejecutar archivos de prueba específicos, puedes añadir el parámetro `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

o definir suites en tu archivo de configuración y ejecutar solo los archivos de prueba definidos en una suite:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Ejecutar en un script

Si quieres usar WebdriverIO como motor de automatización en [modo Standalone](/docs/setuptypes#standalone-mode) dentro de un script de Node.JS, también puedes instalar WebdriverIO directamente y usarlo como paquete, p. ej. para generar una captura de pantalla de un sitio web:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Nota:__ todos los comandos de WebdriverIO son asíncronos y deben manejarse correctamente usando [`async/await`](https://javascript.info/async-await).

## Grabar pruebas

WebdriverIO proporciona herramientas que te ayudan a empezar grabando tus acciones de prueba en pantalla y generando scripts de prueba de WebdriverIO automáticamente. Consulta [Grabar pruebas con Chrome DevTools Recorder](/docs/record) para más información.

## Requisitos del sistema

Necesitarás tener [Node.js](http://nodejs.org) instalado.

- Instala al menos la v22.19.0 o superior, ya que es la versión LTS más antigua compatible
- Solo se admiten oficialmente las versiones que son o serán una versión LTS

Si Node no está instalado actualmente en tu sistema, te sugerimos utilizar una herramienta como [NVM](https://github.com/creationix/nvm) o [Volta](https://volta.sh/) para ayudarte a gestionar varias versiones activas de Node.js. NVM es una opción popular, mientras que Volta también es una buena alternativa.

## Ver la introducción

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

Hay más vídeos en el [canal oficial de YouTube](https://youtube.com/@webdriverio).

## Próximos pasos

- Elige tu plataforma: [Navegadores web](/docs/platforms/web), [Apps móviles](/docs/platforms/mobile), [Apps de escritorio](/docs/platforms/desktop) o [Extensiones y editores](/docs/platforms/apps-and-extensions)
- Aprende a [seleccionar elementos](/docs/selectors) y escribir [aserciones](/docs/assertion)
- Configura el test runner en [`wdio.conf.ts`](/docs/configurationfile)
- Obtén ayuda en [Discord](https://discord.webdriver.io)