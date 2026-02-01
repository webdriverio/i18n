---
id: boilerplates
title: Proyectos de Plantilla
---

Con el tiempo, nuestra comunidad ha desarrollado varios proyectos que puedes usar como inspiración para configurar tu propia suite de pruebas.

# Proyectos de Plantilla v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nuestra propia plantilla para suites de pruebas con Cucumber. Creamos más de 150 definiciones de pasos predefinidas para ti, para que puedas comenzar a escribir archivos de características en tu proyecto de inmediato.

- Framework:
    - Cucumber
    - WebdriverIO
- Características:
    - Más de 150 pasos predefinidos que cubren casi todo lo que necesitas
    - Integra la funcionalidad Multiremote de WebdriverIO
    - Propia aplicación de demostración

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Proyecto de plantilla para ejecutar pruebas de WebdriverIO con Jasmine usando características de Babel y el patrón de objetos de página.

- Frameworks
    - WebdriverIO
    - Jasmine
- Características
    - Patrón de Objeto de Página
    - Integración con Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Proyecto de plantilla para ejecutar pruebas de WebdriverIO en una aplicación Electron mínima.

- Frameworks
    - WebdriverIO
    - Mocha
- Características
    - Simulación de API de Electron
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Este proyecto de plantilla tiene pruebas móviles de WebdriverIO 9 con Cucumber, TypeScript y Appium para plataformas Android e iOS, siguiendo el patrón de Modelo de Objeto de Página. Cuenta con registro completo, informes, gestos móviles, navegación de aplicación a web e integración de CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Características:
    - Soporte multiplataforma
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Gestos Móviles
      - Desplazamiento
      - Deslizamiento
      - Pulsación larga
      - Ocultar teclado
    - Navegación de Aplicación a Web
      - Cambio de contexto
      - Soporte WebView
      - Automatización de navegador (Chrome/Safari)
    - Estado Fresco de Aplicación
      - Restablecimiento automático de la aplicación entre escenarios
      - Comportamiento de restablecimiento configurable (noReset, fullReset)
    - Configuración del Dispositivo
      - Gestión centralizada de dispositivos
      - Fácil cambio de plataforma
    - Ejemplo de Estructura de Directorios para JavaScript / TypeScript. A continuación se muestra la versión JS, la versión TS tiene la misma estructura.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Genera automáticamente clases de Objeto de Página de WebdriverIO y especificaciones de prueba de Mocha a partir de archivos .feature de Gherkin, reduciendo el esfuerzo manual, mejorando la consistencia y acelerando la automatización de QA. Este proyecto no solo produce código compatible con webdriver.io, sino que también mejora todas las funcionalidades de webdriver.io. Hemos creado dos variantes, una para usuarios de JavaScript y otra para usuarios de TypeScript. Pero ambos proyectos funcionan de la misma manera.

***¿Cómo Funciona?***
- El proceso sigue una automatización de dos pasos:
- Paso 1: Gherkin a stepMap (Generar Archivos stepMap.json)
  - Generar Archivos stepMap.json:
    - Analiza archivos .feature escritos en sintaxis Gherkin.
    - Extrae escenarios y pasos.
    - Produce un archivo .stepMap.json estructurado que contiene:
      - acción a realizar (por ejemplo, click, setText, assertVisible)
      - selectorName para mapeo lógico
      - selector para el elemento DOM
      - note para valores o afirmaciones
- Paso 2: stepMap a Código (Generar Código WebdriverIO).
  Usa stepMap.json para generar:
  - Generar una clase base page.js con métodos compartidos y configuración de browser.url().
  - Generar clases de Modelo de Objeto de Página (POM) compatibles con WebdriverIO por característica dentro de test/pageobjects/.
  - Generar especificaciones de prueba basadas en Mocha.
- Ejemplo de Estructura de Directorios para JavaScript / TypeScript. A continuación se muestra la versión JS, la versión TS tiene la misma estructura.
```
project-root/
├── features/                   # Archivos .feature de Gherkin (entrada de usuario / archivo fuente)
├── stepMaps/                   # Archivos .stepMap.json generados automáticamente
├── test/                 
│   ├── pageobjects/            # Clases de Modelo de Objeto de Página de pruebas WebdriverIO generadas automáticamente
│   └── specs/                  # Especificaciones de prueba Mocha generadas automáticamente
├── src/
│   ├── cli.js                  # Lógica principal de CLI
│   ├── generateStepsMap.js     # Generador de característica a stepMap
│   ├── generateTestsFromMap.js # Generador de stepMap a página/spec
│   ├── utils.js                # Métodos auxiliares
│   └── config.js               # Rutas, selectores de respaldo, alias
│   └── __tests__/              # Pruebas unitarias (Vitest)
├── testgen.js                  # Punto de entrada CLI
│── wdio.config.js              # Configuración de WebdriverIO
├── package.json                # Scripts y dependencias
├── selector-aliases.json       # Anulaciones de selector definidas por el usuario opcionales que sustituyen al selector principal
```
---
# Proyectos de Plantilla v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 con Cucumber (V8x).
- Características:
    - Modelo de Objetos de Página utilizado con enfoque de clase basado en ES6/ES7 y soporte de TypeScript
    - Ejemplos de opción de selector múltiple para consultar elementos con más de un selector a la vez
    - Ejemplos de ejecución de navegador múltiple y sin cabeza usando - Chrome y Firefox
    - Integración de pruebas en la nube con BrowserStack, Sauce Labs, LambdaTest
    - Ejemplos de lectura/escritura de datos desde MS-Excel para una fácil gestión de datos de prueba desde fuentes de datos externas con ejemplos
    - Soporte de base de datos para cualquier RDBMS (Oracle, MySql, TeraData, Vertica, etc.), ejecutando cualquier consulta / obteniendo conjunto de resultados, etc. con ejemplos para pruebas E2E
    - Múltiples informes (Spec, Xunit/Junit, Allure, JSON) y alojamiento de informes Allure y Xunit/Junit en WebServer.
    - Ejemplos con aplicación de demostración https://search.yahoo.com/ y http://the-internet.herokuapp.com.
    - Archivo `.config` específico para BrowserStack, Sauce Labs, LambdaTest y Appium (para reproducción en dispositivo móvil). Para una configuración de Appium con un clic en máquina local para iOS y Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 con Mocha (V10x).
- Características:
    - Modelo de Objetos de Página utilizado con enfoque de clase basado en ES6/ES7 y soporte de TypeScript
    - Ejemplos con aplicación de demostración https://search.yahoo.com y http://the-internet.herokuapp.com
    - Ejemplos de ejecución de navegador múltiple y sin cabeza usando - Chrome y Firefox
    - Integración de pruebas en la nube con BrowserStack, Sauce Labs, LambdaTest
    - Múltiples informes (Spec, Xunit/Junit, Allure, JSON) y alojamiento de informes Allure y Xunit/Junit en WebServer.
    - Ejemplos de lectura/escritura de datos desde MS-Excel para una fácil gestión de datos de prueba desde fuentes de datos externas con ejemplos
    - Ejemplos de conexión a BD a cualquier RDBMS (Oracle, MySql, TeraData, Vertica, etc.), cualquier ejecución de consulta / obtención de conjunto de resultados, etc. con ejemplos para pruebas E2E
    - Archivo `.config` específico para BrowserStack, Sauce Labs, LambdaTest y Appium (para reproducción en dispositivo móvil). Para una configuración de Appium con un clic en máquina local para iOS y Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 con Jasmine (V4x).
- Características:
    - Modelo de Objetos de Página utilizado con enfoque de clase basado en ES6/ES7 y soporte de TypeScript
    - Ejemplos con aplicación de demostración https://search.yahoo.com y http://the-internet.herokuapp.com
    - Ejemplos de ejecución de navegador múltiple y sin cabeza usando - Chrome y Firefox
    - Integración de pruebas en la nube con BrowserStack, Sauce Labs, LambdaTest
    - Múltiples informes (Spec, Xunit/Junit, Allure, JSON) y alojamiento de informes Allure y Xunit/Junit en WebServer.
    - Ejemplos de lectura/escritura de datos desde MS-Excel para una fácil gestión de datos de prueba desde fuentes de datos externas con ejemplos
    - Ejemplos de conexión a BD a cualquier RDBMS (Oracle, MySql, TeraData, Vertica, etc.), cualquier ejecución de consulta / obtención de conjunto de resultados, etc. con ejemplos para pruebas E2E
    - Archivo `.config` específico para BrowserStack, Sauce Labs, LambdaTest y Appium (para reproducción en dispositivo móvil). Para una configuración de Appium con un clic en máquina local para iOS y Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Este proyecto de plantilla tiene pruebas de WebdriverIO 8 con cucumber y typescript, seguido del patrón de objetos de página.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Características:
    - Typescript v5
    - Patrón de Objeto de Página
    - Prettier
    - Soporte multi navegador
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Ejecución paralela en múltiples navegadores
    - Appium
    - Integración de pruebas en la nube con BrowserStack y Sauce Labs
    - Servicio Docker
    - Servicio para compartir datos
    - Archivos de configuración separados para cada servicio
    - Gestión de datos de prueba y lectura por tipo de usuario
    - Informes
      - Dot
      - Spec
      - Informes html de cucumber múltiples con capturas de pantalla de fallos
    - Pipelines de Gitlab para repositorio Gitlab
    - Acciones de Github para repositorio Github
    - Docker compose para configurar el hub de docker
    - Pruebas de accesibilidad usando AXE
    - Pruebas visuales usando Applitools
    - Mecanismo de registro


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Características
    - Contiene escenario de prueba de muestra en cucumber
    - Informes html cucumber integrados con videos incrustados en fallos
    - Servicios integrados de Lambdatest y CircleCI
    - Pruebas visuales, de accesibilidad y de API integradas
    - Funcionalidad de correo electrónico integrada
    - Bucket s3 integrado para almacenamiento y recuperación de informes de pruebas

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Proyecto plantilla de [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ayudarte a comenzar con las pruebas de aceptación de tus aplicaciones web utilizando los últimos WebdriverIO, Mocha y Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Informes Serenity BDD

- Características
    - [Patrón Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de pantalla automáticas en caso de fallo de prueba, integradas en informes
    - Configuración de Integración Continua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Informes demo Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados en GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Proyecto plantilla de [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ayudarte a comenzar con las pruebas de aceptación de tus aplicaciones web utilizando los últimos WebdriverIO, Cucumber y Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Informes Serenity BDD

- Características
    - [Patrón Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de pantalla automáticas en caso de fallo de prueba, integradas en informes
    - Configuración de Integración Continua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Informes demo Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados en GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Proyecto de plantilla para ejecutar pruebas de WebdriverIO en la nube de Headspin (https://www.headspin.io/) usando características de Cucumber y el patrón de objetos de página.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Características
    - Integración en la nube con [Headspin](https://www.headspin.io/)
    - Soporta el Modelo de Objeto de Página
    - Contiene Escenarios de muestra escritos en estilo Declarativo de BDD
    - Informes html de cucumber integrados

# Proyectos de Plantilla v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Proyecto de plantilla para ejecutar pruebas de Appium con WebdriverIO para:

- Aplicaciones nativas de iOS/Android
- Aplicaciones híbridas de iOS/Android
- Navegador Android Chrome y iOS Safari

Esta plantilla incluye lo siguiente:

- Framework: Mocha
- Características:
    - Configuraciones para:
        - Aplicación iOS y Android
        - Navegadores iOS y Android
    - Ayudantes para:
        - WebView
        - Gestos
        - Alertas nativas
        - Selectores
     - Ejemplos de pruebas para:
        - WebView
        - Inicio de sesión
        - Formularios
        - Deslizamiento
        - Navegadores

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Pruebas web ATDD con Mocha, WebdriverIO v6 con PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Características
  - Modelo de [Objeto de Página](pageobjects)
  - Integración con Sauce Labs con [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Informe Allure
  - Captura automática de capturas de pantalla para pruebas fallidas
  - Ejemplo de CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Proyecto de plantilla para ejecutar pruebas E2E con Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Características:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Pruebas de regresión visual](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Patrón de Objeto de Página
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) y [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Ejemplo de Github Actions
    -   Informe Allure (capturas de pantalla en caso de fallo)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Proyecto de plantilla para ejecutar pruebas de **WebdriverIO v7** para lo siguiente:

[Scripts WDIO 7 con TypeScript en Framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 con TypeScript en Framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Ejecutar script WDIO 7 en Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Registros de red](https://github.com/17thSep/MonitorNetworkLogs/)

Proyecto de plantilla para:

- Capturar Registros de Red
- Capturar todas las llamadas GET/POST o una API REST específica
- Afirmar parámetros de Solicitud
- Afirmar parámetros de Respuesta
- Almacenar todas las respuestas en un archivo separado

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Proyecto de plantilla para ejecutar pruebas de appium para aplicaciones nativas y navegadores móviles usando cucumber v7 y wdio v7 con patrón de objeto de página.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Características
    - Aplicaciones nativas de Android e iOS
    - Navegador Chrome de Android
    - Navegador Safari de iOS
    - Modelo de Objeto de Página
    - Contiene escenarios de prueba de muestra en cucumber
    - Integrado con múltiples informes html de cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Este es un proyecto de plantilla para ayudarte a mostrar cómo puedes ejecutar pruebas de webdriverio desde aplicaciones Web utilizando el último WebdriverIO y el marco Cucumber. Este proyecto pretende actuar como una imagen base que puedes usar para entender cómo ejecutar pruebas de WebdriverIO en docker

Este proyecto incluye:

- DockerFile
- Proyecto cucumber

Lee más en: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Este es un proyecto de plantilla para ayudarte a mostrar cómo puedes ejecutar pruebas de electronJS usando WebdriverIO. Este proyecto pretende actuar como una imagen base que puedes usar para entender cómo ejecutar pruebas de WebdriverIO electronJS.

Este proyecto incluye:

- Aplicación electronjs de muestra
- Scripts de prueba cucumber de muestra

Lee más en: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Este es un proyecto de plantilla para ayudarte a mostrar cómo puedes automatizar aplicaciones de windows usando winappdriver y WebdriverIO. Este proyecto pretende actuar como una imagen base que puedes usar para entender cómo ejecutar pruebas de windappdriver y WebdriverIO.

Lee más en: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Este es un proyecto de plantilla para ayudarte a mostrar cómo puedes ejecutar la capacidad multiremota de webdriverio con el último WebdriverIO y el marco Jasmine. Este proyecto pretende actuar como una imagen base que puedes usar para entender cómo ejecutar pruebas de WebdriverIO en docker

Este proyecto utiliza:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Proyecto de plantilla para ejecutar pruebas de appium en dispositivos Roku reales utilizando mocha con patrón de objeto de página.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Informes Allure

- Características
    - Modelo de Objeto de Página
    - Typescript
    - Captura de pantalla en caso de fallo
    - Pruebas de ejemplo usando un canal Roku de muestra

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Proyecto PoC para pruebas Cucumber Multiremote E2E así como pruebas Mocha basadas en datos

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Características:
    - Pruebas E2E basadas en Cucumber
    - Pruebas basadas en datos con Mocha
    - Pruebas solo web - en plataformas locales y en la nube
    - Pruebas solo móviles - emuladores locales y remotos en la nube (o dispositivos)
    - Pruebas Web + Móvil - Multiremote - plataformas locales y en la nube
    - Múltiples Informes integrados incluyendo Allure
    - Datos de prueba (JSON / XLSX) manejados globalmente para escribir los datos (creados sobre la marcha) a un archivo después de la ejecución de la prueba
    - Flujo de trabajo Github para ejecutar la prueba y cargar el informe allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Este es un proyecto de plantilla para ayudar a mostrar cómo ejecutar webdriverio multi-remote usando appium y el servicio chromedriver con el último WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Características
  - Modelo de [Objeto de Página](pageobjects)
  - Typescript
  - Pruebas Web + Móvil - Multiremote
  - Aplicaciones nativas de Android e iOS
  - Appium
  - Chromedriver
  - ESLint
  - Ejemplos de pruebas para inicio de sesión en http://the-internet.herokuapp.com y [aplicación de demostración nativa de WebdriverIO](https://github.com/webdriverio/native-demo-app)