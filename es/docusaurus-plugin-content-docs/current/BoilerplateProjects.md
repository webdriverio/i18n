---
id: boilerplates
title: Proyectos Boilerplate
description: "Explora proyectos boilerplate de la comunidad para WebdriverIO con Mocha, Jasmine, Cucumber, Electron y configuraciones móviles para iniciar tu propia suite de pruebas."
---

Con el tiempo, nuestra comunidad ha desarrollado varios proyectos que puedes usar como inspiración para configurar tu propia suite de pruebas.

# Proyectos Boilerplate v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nuestro propio boilerplate para suites de pruebas de Cucumber. Hemos creado más de 150 definiciones de pasos predefinidas para ti, para que puedas empezar a escribir archivos de características en tu proyecto de inmediato.

- Framework:
    - Cucumber
    - WebdriverIO
- Características:
    - Más de 150 pasos predefinidos que cubren casi todo lo que necesitas
    - Integra la funcionalidad multi-remote de WebdriverIO
    - Aplicación de demostración propia

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Proyecto boilerplate para ejecutar pruebas de WebdriverIO con Jasmine utilizando funcionalidades de Babel y el patrón de page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Características
    - Patrón Page Object
    - Integración con Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Proyecto boilerplate para ejecutar pruebas de WebdriverIO en una aplicación Electron mínima.

- Frameworks
    - WebdriverIO
    - Mocha
- Características
    - Mocking de la API de Electron

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Este proyecto boilerplate contiene pruebas móviles con WebdriverIO 9 usando Cucumber, TypeScript y Appium para las plataformas Android e iOS, siguiendo el patrón Page Object Model. Incluye registro completo, generación de informes, gestos móviles, navegación de la aplicación a la web e integración CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Características:
    - Soporte multiplataforma
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Gestos móviles
      - Desplazamiento (scroll)
      - Deslizamiento (swipe)
      - Pulsación larga
      - Ocultar teclado
    - Navegación de la aplicación a la web
      - Cambio de contexto
      - Soporte para WebView
      - Automatización del navegador (Chrome/Safari)
    - Estado limpio de la aplicación
      - Reinicio automático de la aplicación entre escenarios
      - Comportamiento de reinicio configurable (noReset, fullReset)
    - Configuración de dispositivos
      - Gestión centralizada de dispositivos
      - Cambio sencillo de plataforma
    - Ejemplo de estructura de directorios para JavaScript / TypeScript. A continuación se muestra la versión JS; la versión TS tiene la misma estructura.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Genera automáticamente clases Page Object de WebdriverIO y especificaciones de prueba de Mocha a partir de archivos .feature de Gherkin, reduciendo el esfuerzo manual, mejorando la consistencia y acelerando la automatización de QA. Este proyecto no solo produce código compatible con webdriver.io, sino que también potencia todas las funcionalidades de webdriver.io. Hemos creado dos variantes, una para usuarios de JavaScript y otra para usuarios de TypeScript. Pero ambos proyectos funcionan de la misma manera.

***¿Cómo funciona?***
- El proceso sigue una automatización en dos pasos:
- Paso 1: De Gherkin a stepMap (Generar archivos stepMap.json)
  - Generar archivos stepMap.json:
    - Analiza archivos .feature escritos con sintaxis Gherkin.
    - Extrae escenarios y pasos.
    - Produce un archivo .stepMap.json estructurado que contiene:
      - action a realizar (p. ej., click, setText, assertVisible)
      - selectorName para el mapeo lógico
      - selector para el elemento DOM
      - note para valores o aserciones
- Paso 2: De stepMap a código (Generar código de WebdriverIO).
  Utiliza stepMap.json para generar:
  - Generar una clase base page.js con métodos compartidos y la configuración de browser.url().
  - Generar clases Page Object Model (POM) compatibles con WebdriverIO por cada feature dentro de test/pageobjects/.
  - Generar especificaciones de prueba basadas en Mocha.
- Ejemplo de estructura de directorios para JavaScript / TypeScript. A continuación se muestra la versión JS; la versión TS tiene la misma estructura.
```
project-root/
├── features/                   # Archivos .feature de Gherkin (entrada del usuario / archivo fuente)
├── stepMaps/                   # Archivos .stepMap.json generados automáticamente
├── test/
│   ├── pageobjects/            # Clases Page Object Model de pruebas WebdriverIO generadas automáticamente
│   └── specs/                  # Especificaciones de prueba de Mocha generadas automáticamente
├── src/
│   ├── cli.js                  # Lógica principal de la CLI
│   ├── generateStepsMap.js     # Generador de feature a stepMap
│   ├── generateTestsFromMap.js # Generador de stepMap a page/spec
│   ├── utils.js                # Métodos auxiliares
│   └── config.js               # Rutas, selectores de respaldo, alias
│   └── __tests__/              # Pruebas unitarias (Vitest)
├── testgen.js                  # Punto de entrada de la CLI
│── wdio.config.js              # Configuración de WebdriverIO
├── package.json                # Scripts y dependencias
├── selector-aliases.json       # Opcional: selectores definidos por el usuario que sobrescriben el selector principal
```
---
# Proyectos Boilerplate v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 con Cucumber (V8x).
- Características:
    - Uso de Page Objects Model con un enfoque basado en clases al estilo ES6 / ES7 y soporte para TypeScript
    - Ejemplos de la opción multiselector para consultar un elemento con más de un selector a la vez
    - Ejemplos de ejecución en múltiples navegadores y en navegadores headless usando Chrome y Firefox
    - Integración de pruebas en la nube con BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest)
    - Ejemplos de lectura/escritura de datos desde MS-Excel para una gestión sencilla de datos de prueba desde fuentes de datos externas, con ejemplos
    - Soporte de bases de datos para cualquier RDBMS (Oracle, MySql, TeraData, Vertica, etc.), ejecución de cualquier consulta / obtención de conjuntos de resultados, etc., con ejemplos para pruebas E2E
    - Múltiples informes (Spec, Xunit/Junit, Allure, JSON) y alojamiento de los informes Allure y Xunit/Junit en un servidor web.
    - Ejemplos con las aplicaciones de demostración https://search.yahoo.com/  y http://the-internet.herokuapp.com.
    - Archivo `.config` específico para BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest) y Appium (para la reproducción en dispositivos móviles). Para una configuración de Appium con un solo clic en una máquina local para iOS y Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 con Mocha (V10x).
- Características:
    -  Uso de Page Objects Model con un enfoque basado en clases al estilo ES6 / ES7 y soporte para TypeScript
    -  Ejemplos con las aplicaciones de demostración https://search.yahoo.com  y http://the-internet.herokuapp.com
    -  Ejemplos de ejecución en múltiples navegadores y en navegadores headless usando Chrome y Firefox
    -  Integración de pruebas en la nube con BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest)
    -  Múltiples informes (Spec, Xunit/Junit, Allure, JSON) y alojamiento de los informes Allure y Xunit/Junit en un servidor web.
    -  Ejemplos de lectura/escritura de datos desde MS-Excel para una gestión sencilla de datos de prueba desde fuentes de datos externas, con ejemplos
    -  Ejemplos de conexión a cualquier RDBMS (Oracle, MySql, TeraData, Vertica, etc.), ejecución de cualquier consulta / obtención de conjuntos de resultados, etc., con ejemplos para pruebas E2E
    -  Archivo `.config` específico para BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest) y Appium (para la reproducción en dispositivos móviles). Para una configuración de Appium con un solo clic en una máquina local para iOS y Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 con Jasmine (V4x).
- Características:
    -  Uso de Page Objects Model con un enfoque basado en clases al estilo ES6 / ES7 y soporte para TypeScript
    -  Ejemplos con las aplicaciones de demostración https://search.yahoo.com  y http://the-internet.herokuapp.com
    -  Ejemplos de ejecución en múltiples navegadores y en navegadores headless usando Chrome y Firefox
    -  Integración de pruebas en la nube con BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest)
    -  Múltiples informes (Spec, Xunit/Junit, Allure, JSON) y alojamiento de los informes Allure y Xunit/Junit en un servidor web.
    -  Ejemplos de lectura/escritura de datos desde MS-Excel para una gestión sencilla de datos de prueba desde fuentes de datos externas, con ejemplos
    -  Ejemplos de conexión a cualquier RDBMS (Oracle, MySql, TeraData, Vertica, etc.), ejecución de cualquier consulta / obtención de conjuntos de resultados, etc., con ejemplos para pruebas E2E
    -  Archivo `.config` específico para BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest) y Appium (para la reproducción en dispositivos móviles). Para una configuración de Appium con un solo clic en una máquina local para iOS y Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Este proyecto boilerplate contiene pruebas de WebdriverIO 8 con Cucumber y TypeScript, siguiendo el patrón de page objects.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Características:
    - Typescript v5
    - Patrón Page Object
    - Prettier
    - Soporte para múltiples navegadores
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Ejecución paralela en distintos navegadores
    - Appium
    - Integración de pruebas en la nube con BrowserStack y Sauce Labs
    - Servicio de Docker
    - Servicio para compartir datos
    - Archivos de configuración separados para cada servicio
    - Gestión de datos de prueba y lectura por tipo de usuario
    - Informes
      - Dot
      - Spec
      - Informe HTML de Cucumber múltiple con capturas de pantalla de los fallos
    - Pipelines de Gitlab para repositorios de Gitlab
    - Github Actions para repositorios de Github
    - Docker Compose para configurar el Docker Hub
    - Pruebas de accesibilidad usando AXE
    - Pruebas visuales usando Applitools
    - Mecanismo de registro (logs)


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Características
    - Contiene un escenario de prueba de ejemplo en Cucumber
    - Informes HTML de Cucumber integrados con vídeos incrustados en caso de fallos
    - Servicios de Lambdatest y CircleCI integrados
    - Pruebas visuales, de accesibilidad y de API integradas
    - Funcionalidad de correo electrónico integrada
    - Bucket de S3 integrado para el almacenamiento y la recuperación de informes de prueba

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Proyecto de plantilla de [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ayudarte a comenzar con las pruebas de aceptación de tus aplicaciones web usando las últimas versiones de WebdriverIO, Mocha y Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Informes de Serenity BDD

- Características
    - [Patrón Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de pantalla automáticas cuando falla una prueba, incrustadas en los informes
    - Configuración de Integración Continua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Informes de demostración de Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados en GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Proyecto de plantilla de [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ayudarte a comenzar con las pruebas de aceptación de tus aplicaciones web usando las últimas versiones de WebdriverIO, Cucumber y Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Informes de Serenity BDD

- Características
    - [Patrón Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de pantalla automáticas cuando falla una prueba, incrustadas en los informes
    - Configuración de Integración Continua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Informes de demostración de Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados en GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Proyecto boilerplate para ejecutar pruebas de WebdriverIO en Headspin Cloud (https://www.headspin.io/) usando features de Cucumber y el patrón de page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Características
    - Integración en la nube con [Headspin](https://www.headspin.io/)
    - Soporta Page Object Model
    - Contiene escenarios de ejemplo escritos en estilo declarativo de BDD
    - Informes HTML de Cucumber integrados

# Proyectos Boilerplate v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Proyecto boilerplate para ejecutar pruebas de Appium con WebdriverIO para:

- Aplicaciones nativas de iOS/Android
- Aplicaciones híbridas de iOS/Android
- Navegadores Chrome de Android y Safari de iOS

Este boilerplate incluye lo siguiente:

- Framework: Mocha
- Características:
    - Configuraciones para:
        - Aplicaciones de iOS y Android
        - Navegadores de iOS y Android
    - Helpers para:
        - WebView
        - Gestos
        - Alertas nativas
        - Pickers
     - Ejemplos de pruebas para:
        - WebView
        - Inicio de sesión
        - Formularios
        - Deslizamiento (swipe)
        - Navegadores

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Pruebas WEB ATDD con Mocha, WebdriverIO v6 con PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Características
  - Modelo [Page Object](pageobjects)
  - Integración con Sauce Labs mediante [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Informe Allure
  - Captura automática de pantallas para las pruebas fallidas
  - Ejemplo de CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Proyecto boilerplate para ejecutar pruebas E2E con Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Características:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Pruebas de regresión visual](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Patrón Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) y [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Ejemplo de Github Actions
    -   Informe Allure (capturas de pantalla en caso de fallo)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Proyecto boilerplate para ejecutar pruebas de **WebdriverIO v7** para lo siguiente:

[Scripts de WDIO 7 con TypeScript en el framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts de WDIO 7 con TypeScript en el framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Ejecutar scripts de WDIO 7 en Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Registros de red](https://github.com/17thSep/MonitorNetworkLogs/)

Proyecto boilerplate para:

- Capturar registros de red
- Capturar todas las llamadas GET/POST o una API REST específica
- Verificar parámetros de la solicitud
- Verificar parámetros de la respuesta
- Almacenar todas las respuestas en un archivo separado

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Proyecto boilerplate para ejecutar pruebas de Appium para aplicaciones nativas y navegadores móviles usando Cucumber v7 y WDIO v7 con el patrón de page objects.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Características
    - Aplicaciones nativas de Android e iOS
    - Navegador Chrome de Android
    - Navegador Safari de iOS
    - Page Object Model
    - Contiene escenarios de prueba de ejemplo en Cucumber
    - Integrado con múltiples informes HTML de Cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Este es un proyecto de plantilla para mostrarte cómo puedes ejecutar pruebas de WebdriverIO en aplicaciones web usando las últimas versiones de WebdriverIO y el framework Cucumber. Este proyecto pretende servir como imagen base que puedes usar para entender cómo ejecutar pruebas de WebdriverIO en Docker

Este proyecto incluye:

- DockerFile
- Proyecto de Cucumber

Lee más en: [Blog de Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Este es un proyecto de plantilla para mostrarte cómo puedes ejecutar pruebas de electronJS usando WebdriverIO. Este proyecto pretende servir como imagen base que puedes usar para entender cómo ejecutar pruebas de electronJS con WebdriverIO.

Este proyecto incluye:

- Aplicación electronjs de ejemplo
- Scripts de prueba de Cucumber de ejemplo

Lee más en: [Blog de Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Este es un proyecto de plantilla para mostrarte cómo puedes automatizar aplicaciones de Windows usando winappdriver y WebdriverIO. Este proyecto pretende servir como imagen base que puedes usar para entender cómo ejecutar pruebas con winappdriver y WebdriverIO.

Lee más en: [Blog de Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Este es un proyecto de plantilla para mostrarte cómo puedes usar la capacidad multi-remote de WebdriverIO con las últimas versiones de WebdriverIO y el framework Jasmine. Este proyecto pretende servir como imagen base que puedes usar para entender cómo ejecutar pruebas de WebdriverIO en Docker

Este proyecto utiliza:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Proyecto de plantilla para ejecutar pruebas de Appium en dispositivos Roku reales usando Mocha con el patrón de page objects.

- Frameworks
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Informes Allure

- Características
    - Page Object Model
    - Typescript
    - Captura de pantalla en caso de fallo
    - Pruebas de ejemplo usando un canal Roku de muestra

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Proyecto PoC para pruebas E2E multi-remote con Cucumber, así como pruebas de Mocha basadas en datos

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Características:
    - Pruebas E2E basadas en Cucumber
    - Pruebas basadas en datos con Mocha
    - Pruebas solo web: tanto en local como en plataformas en la nube
    - Pruebas solo móviles: emuladores (o dispositivos) locales y en la nube remota
    - Pruebas web + móviles: multi-remote, tanto en local como en plataformas en la nube
    - Múltiples informes integrados, incluido Allure
    - Datos de prueba (JSON / XLSX) gestionados globalmente para escribir los datos (creados sobre la marcha) en un archivo tras la ejecución de las pruebas
    - Flujo de trabajo de Github para ejecutar las pruebas y subir el informe Allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Este es un proyecto boilerplate para mostrar cómo ejecutar WebdriverIO multi-remote usando Appium y el servicio de Chromedriver con la última versión de WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Características
  - Modelo [Page Object](pageobjects)
  - Typescript
  - Pruebas web + móviles: multi-remote
  - Aplicaciones nativas de Android e iOS
  - Appium
  - Chromedriver
  - ESLint
  - Ejemplos de pruebas de inicio de sesión en http://the-internet.herokuapp.com y en la [aplicación de demostración nativa de WebdriverIO](https://github.com/webdriverio/native-demo-app)