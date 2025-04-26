---
id: protocols
title: Comandos de Protocolo
---

WebdriverIO es un framework de automatización que se basa en varios protocolos de automatización para controlar un agente remoto, por ejemplo, para un navegador, dispositivo móvil o televisión. Según el dispositivo remoto, entran en juego diferentes protocolos. Estos comandos se asignan al Objeto [Browser](/docs/api/browser) o [Element](/docs/api/element) dependiendo de la información de sesión proporcionada por el servidor remoto (por ejemplo, el controlador del navegador).

Internamente, WebdriverIO utiliza comandos de protocolo para casi todas las interacciones con el agente remoto. Sin embargo, los comandos adicionales asignados al Objeto [Browser](/docs/api/browser) o [Element](/docs/api/element) simplifican el uso de WebdriverIO, por ejemplo, obtener el texto de un elemento usando comandos de protocolo se vería así:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Usando los comandos convenientes del Objeto [Browser](/docs/api/browser) o [Element](/docs/api/element), esto se puede reducir a:

```js
$('#lst-ib').getText()
```

La siguiente sección explica cada protocolo individual.

## Protocolo WebDriver

El protocolo [WebDriver](https://w3c.github.io/webdriver/#elements) es un estándar web para automatizar navegadores. A diferencia de otras herramientas E2E, garantiza que la automatización se pueda realizar en navegadores reales que utilizan tus usuarios, por ejemplo, Firefox, Safari y Chrome y navegadores basados en Chromium como Edge, y no solo en motores de navegador, por ejemplo, WebKit, que son muy diferentes.

La ventaja de usar el protocolo WebDriver en lugar de protocolos de depuración como [Chrome DevTools](https://w3c.github.io/webdriver/#elements) es que tienes un conjunto específico de comandos que permiten interactuar con el navegador de la misma manera en todos los navegadores, lo que reduce la probabilidad de inestabilidad. Además, este protocolo ofrece capacidades para una escalabilidad masiva mediante el uso de proveedores en la nube como [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) y [otros](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## Protocolo WebDriver Bidi

El protocolo [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) es la segunda generación del protocolo y actualmente está siendo desarrollado por la mayoría de los proveedores de navegadores. En comparación con su predecesor, el protocolo admite una comunicación bidireccional (de ahí "Bidi") entre el framework y el dispositivo remoto. Además, introduce primitivas adicionales para una mejor introspección del navegador para automatizar mejor las aplicaciones web modernas en el navegador.

Dado que este protocolo está actualmente en desarrollo, se agregarán más funciones con el tiempo y serán compatibles con los navegadores. Si utilizas los comandos convenientes de WebdriverIO, nada cambiará para ti. WebdriverIO hará uso de estas nuevas capacidades de protocolo tan pronto como estén disponibles y sean compatibles con el navegador.

## Appium

El proyecto [Appium](https://appium.io/) proporciona capacidades para automatizar dispositivos móviles, de escritorio y todo tipo de dispositivos IoT. Mientras que WebDriver se centra en los navegadores y la web, la visión de Appium es utilizar el mismo enfoque pero para cualquier dispositivo arbitrario. Además de los comandos que define WebDriver, tiene comandos especiales que a menudo son específicos del dispositivo remoto que se está automatizando. Para escenarios de pruebas móviles, esto es ideal cuando deseas escribir y ejecutar las mismas pruebas tanto para aplicaciones Android como iOS.

Según la [documentación](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) de Appium, fue diseñado para satisfacer las necesidades de automatización móvil de acuerdo con una filosofía descrita por los siguientes cuatro principios:

- No deberías tener que recompilar tu aplicación o modificarla de ninguna manera para automatizarla.
- No deberías estar limitado a un lenguaje o framework específico para escribir y ejecutar tus pruebas.
- Un framework de automatización móvil no debería reinventar la rueda cuando se trata de APIs de automatización.
- Un framework de automatización móvil debería ser de código abierto, tanto en espíritu y práctica como en nombre.

## Chromium

El protocolo Chromium ofrece un superconjunto de comandos sobre el protocolo WebDriver que solo es compatible cuando se ejecutan sesiones automatizadas a través de [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) o [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

El protocolo Firefox ofrece un superconjunto de comandos sobre el protocolo WebDriver que solo es compatible cuando se ejecutan sesiones automatizadas a través de [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

El protocolo [Sauce Labs](https://saucelabs.com/) ofrece un superconjunto de comandos sobre el protocolo WebDriver que solo es compatible cuando se ejecutan sesiones automatizadas utilizando la nube de Sauce Labs.

## Selenium Standalone

El protocolo [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) ofrece un superconjunto de comandos sobre el protocolo WebDriver que solo es compatible cuando se ejecutan sesiones automatizadas utilizando Selenium Grid.

## Protocolo JSON Wire

El [Protocolo JSON Wire](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) es el predecesor del protocolo WebDriver y está __obsoleto__ hoy en día. Aunque algunos comandos aún pueden ser compatibles en ciertos entornos, no se recomienda utilizar ninguno de sus comandos.

## Protocolo Mobile JSON Wire

El [Protocolo Mobile JSON Wire](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) es un superconjunto de comandos móviles sobre el Protocolo JSON Wire. Dado que este último está obsoleto, el Protocolo Mobile JSON Wire también está __obsoleto__. Appium aún puede admitir algunos de sus comandos, pero no se recomienda utilizarlos.