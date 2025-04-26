---
id: automationProtocols
title: Protocolos de Automatización
---

Con WebdriverIO, puedes elegir entre múltiples tecnologías de automatización al ejecutar tus pruebas E2E localmente o en la nube. Por defecto, WebdriverIO intentará iniciar una sesión de automatización local utilizando el protocolo [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/).

## Protocolo WebDriver Bidi

El [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) es un protocolo de automatización para automatizar navegadores utilizando comunicación bidireccional. Es el sucesor del protocolo [WebDriver](https://w3c.github.io/webdriver/) y permite muchas más capacidades de introspección para varios casos de uso de pruebas.

Este protocolo está actualmente en desarrollo y podrían añadirse nuevas primitivas en el futuro. Todos los proveedores de navegadores se han comprometido a implementar este estándar web y ya se han incorporado muchas [primitivas](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned) en los navegadores.

## Protocolo WebDriver

> [WebDriver](https://w3c.github.io/webdriver/) es una interfaz de control remoto que permite la introspección y control de agentes de usuario. Proporciona un protocolo de comunicación neutral en cuanto a plataforma y lenguaje como una forma para que programas externos instruyan remotamente el comportamiento de los navegadores web.

El protocolo WebDriver fue diseñado para automatizar un navegador desde la perspectiva del usuario, lo que significa que todo lo que un usuario puede hacer, tú puedes hacerlo con el navegador. Proporciona un conjunto de comandos que abstraen las interacciones comunes con una aplicación (por ejemplo, navegar, hacer clic o leer el estado de un elemento). Como es un estándar web, está bien soportado por todos los principales proveedores de navegadores y también se utiliza como protocolo subyacente para la automatización móvil usando [Appium](http://appium.io).

Para usar este protocolo de automatización, necesitas un servidor proxy que traduzca todos los comandos y los ejecute en el entorno objetivo (es decir, el navegador o la aplicación móvil).

Para la automatización del navegador, el servidor proxy suele ser el controlador del navegador. Hay controladores disponibles para todos los navegadores:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

Para cualquier tipo de automatización móvil, necesitarás instalar y configurar [Appium](http://appium.io). Te permitirá automatizar aplicaciones móviles (iOS/Android) o incluso de escritorio (macOS/Windows) utilizando la misma configuración de WebdriverIO.

También hay muchos servicios que te permiten ejecutar tus pruebas de automatización en la nube a gran escala. En lugar de tener que configurar todos estos controladores localmente, puedes simplemente comunicarte con estos servicios (por ejemplo, [Sauce Labs](https://saucelabs.com)) en la nube e inspeccionar los resultados en su plataforma. La comunicación entre el script de prueba y el entorno de automatización se verá de la siguiente manera:

![WebDriver Setup](/img/webdriver.png)