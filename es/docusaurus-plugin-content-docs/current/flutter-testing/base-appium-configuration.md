---
id: base-appium-configuration
title: Configuración base de Appium
description: "Instala el servicio de Appium y el paquete Flutter finder, y configura la base de Appium para probar aplicaciones Flutter con WebdriverIO."
---

WebdriverIO utiliza Appium para ejecutar pruebas en emuladores móviles, simuladores y dispositivos reales. El `@wdio/appium-service` gestiona automáticamente el ciclo de vida del servidor de Appium durante la ejecución de las pruebas.

Para la configuración general de Appium y las opciones de capacidades, consulta la [Documentación del servicio de Appium](https://webdriver.io/docs/appium-service/).

## Instalación de dependencias

Para probar aplicaciones Flutter, instala el servicio de Appium y el paquete Flutter finder:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Instalación del Appium Flutter Driver

Puedes instalar el Appium Flutter Driver (`appium-flutter-driver`) de una de estas dos formas:

#### Opción 1: Como dependencia de desarrollo (recomendado para CI/CD)

Añadir el driver directamente a tus `devDependencies` garantiza que todos los miembros del equipo y los pipelines de CI/CD tengan el driver instalado automáticamente sin necesidad de pasos de configuración adicionales:

```bash
npm install --save-dev appium-flutter-driver
```

> También puedes instalar todos los paquetes necesarios juntos con un solo comando:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Opción 2: Mediante la CLI de Appium (configuración local)

Como alternativa, puedes instalar el driver localmente en tu entorno de Appium utilizando la CLI de Appium:

```bash
npx appium driver install flutter
```

### Descripción general de los paquetes

Estos paquetes proporcionan:
- **`@wdio/appium-service` y `appium`**: Inicia y gestiona el servidor de Appium durante la ejecución de las pruebas.
- **`appium-flutter-driver`**: El driver de Appium responsable de comunicarse con la extensión de pruebas de Flutter.
- **`appium-flutter-finder`**: Biblioteca auxiliar que proporciona estrategias de localización específicas de Flutter (`byValueKey`, `byText`, `byTooltip`).