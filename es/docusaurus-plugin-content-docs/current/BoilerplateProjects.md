---
id: boilerplates
title: Proyectos de Plantilla
---

Con el tiempo, nuestra comunidad ha desarrollado varios proyectos que puedes usar como inspiración para configurar tu propio conjunto de pruebas.

# Proyectos de Plantilla v8

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nuestra propia plantilla para conjuntos de pruebas de Cucumber. Hemos creado más de 150 definiciones de pasos predefinidos para ti, para que puedas comenzar a escribir archivos de características en tu proyecto de inmediato.

- Framework:
    - Cucumber
    - WebdriverIO
- Características:
    - Más de 150 pasos predefinidos que cubren casi todo lo que necesitas
    - Integra la funcionalidad Multiremote de WebdriverIO
    - Aplicación de demostración propia

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Proyecto de plantilla para ejecutar pruebas de WebdriverIO con Jasmine utilizando características de Babel y el patrón de objetos de página.

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

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Este proyecto de plantilla tiene pruebas de WebdriverIO 8 con cucumber y typescript, siguiendo el patrón de objetos de página.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Características:
    - Typescript v5
    - Patrón de Objeto de Página
    - Prettier
    - Soporte para múltiples navegadores
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Ejecución paralela en múltiples navegadores
    - Appium
    - Integración con pruebas en la nube con BrowserStack y Sauce Labs
    - Servicio Docker
    - Servicio para compartir datos
    - Archivos de configuración separados para cada servicio
    - Gestión de datos de prueba y lectura por tipo de usuario
    - Informes
      - Dot
      - Spec
      - Múltiples informes HTML de cucumber con capturas de pantalla de fallos
    - Pipelines de Gitlab para repositorios Gitlab
    - Acciones de Github para repositorios Github
    - Docker compose para configurar el hub de docker
    - Pruebas de accesibilidad usando AXE
    - Pruebas visuales usando Applitools
    - Mecanismo de registro

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 con Cucumber (V8x).
- Características:
    - Modelo de Objetos de Página utiliza enfoque de clase basado en ES6/ES7 y soporte para TypeScript
    - Ejemplos de opción de selector múltiple para consultar elementos con más de un selector a la vez
    - Ejemplos de ejecución de navegador múltiple y sin interfaz usando Chrome y Firefox
    - Integración con pruebas en la nube con BrowserStack, Sauce Labs, LambdaTest
    - Ejemplos de lectura/escritura de datos desde MS-Excel para facilitar la gestión de datos de prueba desde fuentes externas con ejemplos
    - Soporte de base de datos para cualquier RDBMS (Oracle, MySql, TeraData, Vertica, etc.), ejecutando cualquier consulta / obteniendo conjunto de resultados, etc. con ejemplos para pruebas E2E
    - Múltiples informes (Spec, Xunit/Junit, Allure, JSON) y alojamiento de informes Allure y Xunit/Junit en WebServer.
    - Ejemplos con aplicaciones de demostración https://search.yahoo.com/ y http://the-internet.herokuapp.com.
    - Archivos `.config` específicos para BrowserStack, Sauce Labs, LambdaTest y Appium (para reproducción en dispositivos móviles). Para una configuración de Appium con un solo clic en máquina local para iOS y Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 con Mocha (V10x).
- Características:
    - Modelo de Objetos de Página utiliza enfoque de clase basado en ES6/ES7 y soporte para TypeScript
    - Ejemplos con aplicaciones de demostración https://search.yahoo.com y http://the-internet.herokuapp.com
    - Ejemplos de ejecución de navegador múltiple y sin interfaz usando Chrome y Firefox
    - Integración con pruebas en la nube con BrowserStack, Sauce Labs, LambdaTest
    - Múltiples informes (Spec, Xunit/Junit, Allure, JSON) y alojamiento de informes Allure y Xunit/Junit en WebServer.
    - Ejemplos de lectura/escritura de datos desde MS-Excel para facilitar la gestión de datos de prueba desde fuentes externas con ejemplos
    - Ejemplos de conexión a DB para cualquier RDBMS (Oracle, MySql, TeraData, Vertica, etc.), cualquier ejecución de consulta / obtención de conjunto de resultados, etc. con ejemplos para pruebas E2E
    - Archivos `.config` específicos para BrowserStack, Sauce Labs, LambdaTest y Appium (para reproducción en dispositivos móviles). Para una configuración de Appium con un solo clic en máquina local para iOS y Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 con Jasmine (V4x).
- Características:
    - Modelo de Objetos de Página utiliza enfoque de clase basado en ES6/ES7 y soporte para TypeScript
    - Ejemplos con aplicaciones de demostración https://search.yahoo.com y http://the-internet.herokuapp.com
    - Ejemplos de ejecución de navegador múltiple y sin interfaz usando Chrome y Firefox
    - Integración con pruebas en la nube con BrowserStack, Sauce Labs, LambdaTest
    - Múltiples informes (Spec, Xunit/Junit, Allure, JSON) y alojamiento de informes Allure y Xunit/Junit en WebServer.
    - Ejemplos de lectura/escritura de datos desde MS-Excel para facilitar la gestión de datos de prueba desde fuentes externas con ejemplos
    - Ejemplos de conexión a DB para cualquier RDBMS (Oracle, MySql, TeraData, Vertica, etc.), cualquier ejecución de consulta / obtención de conjunto de resultados, etc. con ejemplos para pruebas E2E
    - Archivos `.config` específicos para BrowserStack, Sauce Labs, LambdaTest y Appium (para reproducción en dispositivos móviles). Para una configuración de Appium con un solo clic en máquina local para iOS y Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Características
    - Contiene escenarios de prueba de ejemplo en cucumber
    - Informes HTML de cucumber integrados con videos incrustados en caso de fallos
    - Servicios integrados de Lambdatest y CircleCI
    - Pruebas visuales, de accesibilidad y de API integradas
    - Funcionalidad de correo electrónico integrada
    - Bucket s3 integrado para almacenamiento y recuperación de informes de prueba

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Proyecto de plantilla [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ayudarte a comenzar con pruebas de aceptación de tus aplicaciones web utilizando los últimos WebdriverIO, Mocha y Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Informes Serenity BDD

- Características
    - [Patrón Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de pantalla automáticas en caso de fallo, incrustadas en informes
    - Configuración de Integración Continua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Informes de demostración Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados en GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Proyecto de plantilla [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ayudarte a comenzar con pruebas de aceptación de tus aplicaciones web utilizando los últimos WebdriverIO, Cucumber y Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Informes Serenity BDD

- Características
    - [Patrón Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de pantalla automáticas en caso de fallo, incrustadas en informes
    - Configuración de Integración Continua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Informes de demostración Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados en GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Proyecto de plantilla para ejecutar pruebas de WebdriverIO en Headspin Cloud (https://www.headspin.io/) utilizando características de Cucumber y el patrón de objetos de página.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Características
    - Integración en la nube con [Headspin](https://www.headspin.io/)
    - Soporta el Modelo de Objeto de Página
    - Contiene escenarios de muestra escritos en estilo declarativo de BDD
    - Informes HTML de cucumber integrados

# Proyectos de Plantilla v7

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Proyecto de plantilla para ejecutar pruebas de Appium con WebdriverIO para:

- Aplicaciones nativas de iOS/Android
- Aplicaciones híbridas de iOS/Android
- Navegadores Android Chrome e iOS Safari

Esta plantilla incluye lo siguiente:

- Framework: Mocha
- Características:
    - Configuraciones para:
        - Aplicaciones de iOS y Android
        - Navegadores de iOS y Android
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
  - Integración con Sauce Labs mediante [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
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

Proyecto de plantilla para ejecutar pruebas de **WebdriverIO v7** para lo