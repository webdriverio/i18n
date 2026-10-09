---
id: why-webdriverio
title: ¿Por qué WebdriverIO?
description: Lo que distingue a WebdriverIO de otras herramientas de automatización de pruebas: una API para cada plataforma, estándares web, gobernanza abierta y soporte de primera clase para agentes de programación.
---

WebdriverIO es un framework de automatización de pruebas de código abierto para Node.js. Con un único test runner y una única API puedes automatizar navegadores web, aplicaciones móviles nativas e híbridas, aplicaciones de escritorio y extensiones de editores, y además añadir pruebas visuales, de accesibilidad y de componentes. Está gestionado por su comunidad bajo el paraguas de la [OpenJS Foundation](https://openjsf.org/).

## Un framework para cada plataforma

La mayoría de los equipos entregan más que un sitio web. WebdriverIO te permite probarlo todo con los mismos selectores, aserciones, reporters y configuración de CI:

| Plataforma | Cómo la automatiza WebdriverIO | Empieza aquí |
| --- | --- | --- |
| Navegadores web | WebDriver y WebDriver BiDi en Chrome, Firefox, Safari y Edge | [Navegadores web](/docs/platforms/web) |
| Componentes web | Pruebas de componentes en un navegador real para React, Vue, Svelte, Solid, Preact, Lit y Stencil | [Pruebas de componentes](/docs/component-testing) |
| Aplicaciones móviles | Nativas, híbridas y web móvil en iOS y Android mediante Appium, incluido Flutter | [Aplicaciones móviles](/docs/platforms/mobile) |
| Aplicaciones de escritorio | Aplicaciones Electron, Tauri y Dioxus en macOS, Windows y Linux, y aplicaciones nativas de macOS mediante Appium | [Aplicaciones de escritorio](/docs/platforms/desktop) |
| Editores y extensiones | Extensiones de VS Code y extensiones de navegador | [Extensiones y editores](/docs/platforms/apps-and-extensions) |
| Regresiones visuales | Comparaciones de pantalla, de elementos y de página completa para web y móvil | [Pruebas visuales](/docs/visual-testing) |

La misma prueba puede incluso controlar varias de ellas a la vez, p. ej., una aplicación móvil y un panel web en un mismo escenario, con [multi-remote](/docs/multiremote).

## Basado en estándares web

WebdriverIO automatiza los navegadores mediante [WebDriver](https://w3c.github.io/webdriver/) y [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), los estándares del W3C que todos los fabricantes de navegadores implementan y [prueban](https://wpt.fyi/results/webdriver/tests). Tus pruebas se ejecutan contra las mismas versiones de navegador que tienen tus usuarios, y las interacciones como clics y pulsaciones de teclas las despacha el propio navegador en lugar de emularse con JavaScript. WebDriver BiDi añade simulación de red, eventos de consola y de logs y mucho más en todos los navegadores, no solo en Chromium.

Cuando necesitas capacidades específicas de un navegador, WebdriverIO te da acceso al Chrome DevTools Protocol a través de [Puppeteer](/docs/api/browser/getPuppeteer). Lee más en [Protocolos de automatización](/docs/automationProtocols).

## Impulsado por la comunidad y con gobernanza abierta

WebdriverIO no es un producto de un proveedor de herramientas de pruebas. El proyecto:

- pertenece a la [OpenJS Foundation](https://openjsf.org/), una organización sin ánimo de lucro neutral respecto a proveedores, lo que lo obliga legalmente a servir a los intereses de todos sus usuarios
- sigue un [modelo de gobernanza](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md) público: cualquiera puede contribuir, y los committers y el Comité Directivo Técnico surgen de la comunidad
- no tiene un nivel de pago ni funciones restringidas; todas las funciones son gratuitas y puedes ejecutar tus pruebas en cualquier lugar, localmente o en cualquier proveedor en la nube
- devuelve el patrocinio a las personas que lo construyen a través de un [programa de estipendios para colaboradores](/blog/2024/02/15/new-contributor-stipend-program)
- ofrece soporte comunitario gratuito en [Discord](https://discord.webdriver.io) y [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions)

## Preparado para agentes de programación

La documentación, las herramientas y los artefactos de prueba están diseñados para que los agentes de programación puedan trabajar con WebdriverIO de forma autónoma:

- **Documentación preparada para agentes**: cada página está disponible en Markdown, hay un [`llms.txt`](https://webdriver.io/llms.txt) seleccionado y un servidor MCP de documentación en `https://webdriver.io/mcp`.
- **WebdriverIO MCP**: el servidor [`@wdio/mcp`](/docs/mcp) permite que un agente controle navegadores y aplicaciones móviles para explorar tu interfaz y verificar selectores.
- **Trazas**: el [modo de trazas de DevTools](/docs/devtools/wdio/trace-mode) genera una transcripción en Markdown, capturas de pantalla e instantáneas de accesibilidad para cada prueba fallida.

Consulta [WebdriverIO para agentes de programación](/docs/ai-agents) para la configuración.

## Todo incluido y fácil de extender

- Un [test runner](/docs/testrunner) con soporte para Mocha, Jasmine y Cucumber, ejecución en paralelo, [sharding](/docs/sharding), [reintentos](/docs/retry) y un [modo watch](/docs/watcher)
- [Espera automática](/docs/autowait) para cada interacción y una [biblioteca de aserciones](/docs/assertion) integrada
- [Simulación de red](/docs/mocksandspies), [emulación](/docs/emulation) y [pruebas de snapshots](/docs/snapshot)
- Un [panel de depuración y visor de trazas](/docs/devtools)
- [Más de 70 servicios y reporters](/docs/ecosystem) para nubes, frameworks y CI, además de APIs sencillas para escribir tus propios [comandos](/docs/customcommands), [servicios](/docs/customservices) y [reporters](/docs/customreporter)

## Cuándo elegir otra opción

WebdriverIO es una buena opción cuando pruebas más de una plataforma, quieres ejecutar contra navegadores y dispositivos reales o valoras una herramienta independiente y propiedad de la comunidad. Si solo pruebas una única aplicación web en un único navegador y no necesitas dispositivos móviles, de escritorio ni en la nube, una herramienta solo para navegadores puede resultar más ligera para empezar. Si no estás seguro, [crea un proyecto](/docs/gettingstarted) con `npm init wdio@latest` y pruébalo: la configuración lleva aproximadamente un minuto.

## Próximos pasos

- [Primeros pasos](/docs/gettingstarted) - crea un proyecto y ejecuta tu primera prueba
- [Tipos de configuración](/docs/setuptypes) - test runner o modo independiente
- [WebdriverIO para agentes de programación](/docs/ai-agents) - configura tu agente