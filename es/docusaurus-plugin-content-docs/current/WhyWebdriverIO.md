---
id: why-webdriverio
title: ¿Por qué Webdriver.IO?
---

WebdriverIO es un framework de automatización progresivo construido para automatizar aplicaciones web y móviles modernas. Simplifica la interacción con tu aplicación y proporciona un conjunto de plugins que te ayudan a crear una suite de pruebas escalable, robusta y estable.

Está diseñado para ser:

- __Extensible__ - Añadir funciones auxiliares, o conjuntos y combinaciones más complicados de comandos existentes es __simple__ y __realmente útil__
- __Compatible__ - WebdriverIO puede ejecutarse en el [Protocolo WebDriver](https://w3c.github.io/webdriver/) para __pruebas reales entre navegadores__ así como en el [Protocolo Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) para automatización basada en Chromium usando [Puppeteer](https://pptr.dev/).
- __Rico en funcionalidades__ - La gran variedad de plugins incorporados y de la comunidad te permite __integrar fácilmente__ y __extender__ tu configuración para cumplir con tus requisitos.

Puedes usar WebdriverIO para automatizar:

- 🌐 <span>&nbsp;</span> __aplicaciones web modernas__ escritas en React, Vue, Angular, Svelte u otros frameworks frontend
- 📱 <span>&nbsp;</span> __aplicaciones móviles híbridas__ o __nativas__ ejecutándose en un emulador/simulador o en un dispositivo real
- 💻 <span>&nbsp;</span> __aplicaciones nativas de escritorio__ (por ejemplo, escritas con Electron.js)
- 📦 <span>&nbsp;</span> __pruebas unitarias o de componentes__ de componentes web en el navegador

## Basado en estándares web

WebdriverIO aprovecha el poder del protocolo [WebDriver](https://w3c.github.io/webdriver/) y [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) que es desarrollado y soportado por todos los proveedores de navegadores y garantiza una verdadera experiencia de pruebas entre navegadores. Mientras que otras herramientas de automatización requieren que descargues motores de navegador modificados que no son utilizados por usuarios reales o emulan el comportamiento del usuario inyectando JavaScript, WebdriverIO se basa en un estándar común acordado para la automatización que está [debidamente probado](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) y asegura la compatibilidad para las décadas venideras.

Además, WebdriverIO también tiene soporte para protocolos de automatización alternativos y propietarios como [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) para propósitos de depuración e introspección. Esto permite al usuario cambiar sin problemas entre comandos convencionales basados en WebDriver e interacciones potentes con el navegador a través de [Puppeteer](https://pptr.dev/).

Lee más sobre las diferencias de estos estándares de automatización en la sección sobre [Protocolos de Automatización](automationProtocols).

## Verdadero código abierto

En comparación con muchas herramientas de automatización en el ecosistema, WebdriverIO es un proyecto verdaderamente de código abierto que se ejecuta con gobernanza abierta y es propiedad de una entidad sin fines de lucro llamada [OpenJS Foundation](https://openjsf.org/). Esto vincula legalmente al proyecto a crecer y ser dirigido en interés de todos los participantes. El equipo del proyecto valora la apertura y la colaboración y no está impulsado por intereses monetarios.

Esto hace que el proyecto sea independiente en cómo se desarrolla y hacia dónde se supone que debe ir. Nos permite proporcionar soporte gratuito 24/7 en nuestro [canal de la comunidad](https://discord.webdriver.io) mientras construimos una comunidad sostenible que se apoya y aprende mutuamente. Por último, ofrece muchas oportunidades a las personas que contribuyen y se involucran con el proyecto debido a su [gobernanza abierta](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md).