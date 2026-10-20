---
id: setting-up-webdriverio
title: Configuración de WebdriverIO en tu entorno
description: "Configura wdio.conf.ts y las capabilities de Appium para iniciar una aplicación Flutter con Appium Flutter Driver en Android e iOS."
---

El archivo `wdio.conf.ts` es el archivo de configuración principal de cualquier proyecto de WebdriverIO. Aquí es donde defines dónde se ejecutan las pruebas, qué frameworks de pruebas utilizar y las `capabilities` necesarias para que Appium inicialice correctamente la aplicación Flutter.

:::warning
El `appium-flutter-driver` funciona de manera diferente a los drivers nativos tradicionales (como `UiAutomator2` o `XCUITest`). Se comunica con la extensión de pruebas de Flutter (`flutter_driver`) a través de un protocolo personalizado. Debido a esto, los comandos estándar de automatización nativa podrían no funcionar de la misma manera o podrían requerir estrictamente el uso de `appium-flutter-finder`.

Para comprender completamente las limitaciones, los comandos compatibles y las extensiones del protocolo, consulta el repositorio oficial de la herramienta: [Appium Flutter Driver en GitHub](https://github.com/appium/appium-flutter-driver).
:::

### Configuración de capabilities (Android e iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... otras configuraciones de wdio.conf.ts (runner, specs, etc.)
    

    services: [
        ['appium', {
            // WebdriverIO gestiona el ciclo de vida del servidor de Appium
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // CONFIGURACIÓN DE ANDROID
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // Establece el uso obligatorio del driver de Flutter
            'appium:deviceName': 'Android_Emulator', // Nombre de tu emulador configurado o dispositivo real
            // OBSERVACIÓN SOBRE LA RUTA (Consulta la nota sobre sistemas operativos más abajo)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // CONFIGURACIÓN DE IOS (Requiere macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Establece el uso obligatorio del driver de Flutter
            'appium:deviceName': 'iPhone Simulator', // Nombre del simulador de iOS o dispositivo real
            'appium:platformVersion': '17.2', // Cambia a la versión del sistema operativo de destino
            // OBSERVACIÓN SOBRE LA RUTA (Consulta la nota sobre sistemas operativos más abajo)
            // Usa .app para el simulador de iOS, o .ipa para dispositivos iOS reales
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... resto de la configuración
};
```

### Observaciones importantes sobre las rutas de archivos (appium:app)

Definir la ruta del binario de la aplicación (`.apk` para Android, `.app` o `.ipa` para iOS) dentro de la propiedad `appium:app` requiere especial atención según el sistema operativo y el entorno de destino:

- **En Windows**: El sistema operativo utiliza barras invertidas (`\`) para las rutas de directorios. Al indicar la ruta a tu archivo `.apk` en Windows, asegúrate de escapar las barras invertidas en tu archivo de configuración (p. ej., `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) o utiliza de forma coherente barras normales (`/`), que Node.js interpreta correctamente.
- **En macOS / Linux**: Se utilizan rutas estándar con barras normales (`/`). Recuerda que las compilaciones de iOS (`.app` para el simulador o `.ipa` para dispositivos reales) solo pueden compilarse en entornos macOS.
- **Simulador de iOS vs. dispositivos reales**: Usa paquetes `.app` al ejecutar en el simulador de iOS y paquetes `.ipa` firmados al ejecutar en dispositivos iOS físicos.
- **Rutas absolutas vs. relativas**: Se recomienda encarecidamente utilizar rutas relativas a partir de la raíz del proyecto (usando `./`) para garantizar la portabilidad entre distintas máquinas de desarrollo y entornos de integración continua (CI).