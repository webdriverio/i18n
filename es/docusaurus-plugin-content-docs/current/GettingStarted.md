---
id: gettingstarted
title: Primeros Pasos
---

Bienvenido a la documentación de WebdriverIO. Te ayudará a comenzar rápidamente. Si encuentras problemas, puedes obtener ayuda y respuestas en nuestro [Servidor de Soporte en Discord](https://discord.webdriver.io) o puedes contactarme en [Twitter](https://twitter.com/webdriverio).

:::info
Esta es la documentación para la última versión (__>=9.x__) de WebdriverIO. Si todavía estás utilizando una versión anterior, ¡visita los [sitios web de documentación antiguos](/versions)!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Canal Oficial de YouTube 🎥

Puedes encontrar más videos sobre WebdriverIO en el [canal oficial de YouTube](https://youtube.com/@webdriverio). ¡Asegúrate de suscribirte!

:::

## Iniciar una Configuración de WebdriverIO

Para agregar una configuración completa de WebdriverIO a un proyecto existente o nuevo utilizando el [Kit de Inicio de WebdriverIO](https://www.npmjs.com/package/create-wdio), ejecuta:

Si estás en el directorio raíz de un proyecto existente, ejecuta:

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

o si quieres crear un nuevo proyecto:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

o si quieres crear un nuevo proyecto:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

o si quieres crear un nuevo proyecto:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

o si quieres crear un nuevo proyecto:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Este único comando descarga la herramienta CLI de WebdriverIO y ejecuta un asistente de configuración que te ayuda a configurar tu suite de pruebas.

<CreateProjectAnimation />

El asistente te hará una serie de preguntas que te guiarán a través de la configuración. Puedes pasar un parámetro `--yes` para elegir una configuración predeterminada que utilizará Mocha con Chrome usando el patrón [Page Object](https://martinfowler.com/bliki/PageObject.html).

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

## Instalar CLI Manualmente

También puedes agregar el paquete CLI a tu proyecto manualmente mediante:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # imprime p.ej. `8.13.10`

# ejecutar el asistente de configuración
npx wdio config
```

## Ejecutar Prueba

Puedes iniciar tu suite de pruebas utilizando el comando `run` y apuntando a la configuración de WebdriverIO que acabas de crear:

```sh
npx wdio run ./wdio.conf.js
```

Si deseas ejecutar archivos de prueba específicos, puedes agregar un parámetro `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

o definir suites en tu archivo de configuración y ejecutar solo los archivos de prueba definidos en una suite:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Ejecutar en un script

Si deseas utilizar WebdriverIO como un motor de automatización en [Modo Independiente](/docs/setuptypes#standalone-mode) dentro de un script Node.JS, también puedes instalar WebdriverIO directamente y usarlo como un paquete, por ejemplo, para generar una captura de pantalla de un sitio web:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Nota:__ todos los comandos de WebdriverIO son asincrónicos y deben manejarse adecuadamente usando [`async/await`](https://javascript.info/async-await).

## Grabar pruebas

WebdriverIO proporciona herramientas para ayudarte a comenzar grabando tus acciones de prueba en pantalla y generando scripts de prueba de WebdriverIO automáticamente. Consulta [Grabar pruebas con Chrome DevTools Recorder](/docs/record) para obtener más información.

## Requisitos del Sistema

Necesitarás tener instalado [Node.js](http://nodejs.org).

- Instala al menos la versión v18.20.0 o superior, ya que esta es la versión LTS activa más antigua
- Solo se admiten oficialmente las versiones que son o serán una versión LTS

Si Node no está instalado actualmente en tu sistema, sugerimos utilizar una herramienta como [NVM](https://github.com/creationix/nvm) o [Volta](https://volta.sh/) para ayudar a gestionar múltiples versiones activas de Node.js. NVM es una opción popular, mientras que Volta también es una buena alternativa.