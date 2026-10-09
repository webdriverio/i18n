---
id: writing-tests
title: Escribir pruebas
description: "Escribe pruebas de WebdriverIO para aplicaciones Flutter cambiando al contexto de Flutter e interactuando con los widgets a través de la extensión flutter_driver."
---

Esta sección cubre la estructura práctica para crear escenarios de pruebas automatizadas y cómo interactuar directamente con el árbol de componentes interno de Flutter usando WebdriverIO.

### ¿Por qué es necesario cambiar de contexto?

Al iniciar una sesión de automatización con Appium, el driver comienza la ejecución mapeando el contexto nativo del sistema operativo, conocido como `NATIVE_APP`. Este contexto solo puede ver la capa nativa que envuelve la aplicación (como la barra de estado del sistema o los diálogos nativos de Android/iOS).

Dado que Flutter renderiza su interfaz de usuario dentro de un Canvas aislado, los elementos internos son invisibles dentro del contexto `NATIVE_APP`. Para enviar comandos directamente a la extensión de pruebas de Flutter (`flutter_driver`), debemos cambiar explícitamente el foco de la automatización al contexto `FLUTTER`. Sin este cambio, cualquier intento de localizar un Widget resultará en un error de elemento no encontrado.

:::tip Buena práctica: cambia siempre de contexto en `beforeEach`
Se recomienda como buena práctica incluir `await driver.switchContext('FLUTTER')` en un hook `beforeEach` en cada archivo de pruebas. Esto garantiza que cada prueba comience su ejecución en el contexto `FLUTTER`, evitando inestabilidad o filtración de estado si una prueba anterior cambió a `NATIVE_APP` (por ejemplo, para gestionar diálogos de permisos del sistema operativo) o si una sesión restablece el contexto activo.
:::

### ¿Por qué es necesario `appium-flutter-finder`?

Los selectores tradicionales de WebdriverIO, como `$('~selector')` o `$('#id')`, están diseñados para localizar elementos usando estrategias pensadas para interfaces web o nativas móviles (como resource IDs o XPath).

Flutter gestiona sus propios elementos internos y utiliza métodos de búsqueda propios (como `byValueKey`, `byText`, `byType`). La biblioteca `appium-flutter-finder` es necesaria porque actúa como traductor: expone estas estrategias de localización específicas de Flutter en un formato serializado (Base64/JSON) que el `appium-flutter-driver` puede interpretar y ejecutar dentro de la máquina virtual (VM) de Dart.

### Ejemplos prácticos de pruebas

Documentamos escenarios comunes que usan `appium-flutter-finder` para localizar widgets, combinados con comandos directos de la extensión ejecutados mediante `driver.execute('flutter:<command>')`.

:::info Comandos y finders de la extensión Flutter Driver
El `appium-flutter-driver` proporciona comandos especializados para interactuar con aplicaciones Flutter, entre ellos:
- `flutter:waitFor`: espera a que un widget se vuelva visible.
- `flutter:waitForAbsent`: espera a que un widget desaparezca.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: gestiona el desplazamiento dentro de vistas desplazables.
- `flutter:setTextEntryEmulation`: configura el comportamiento de la entrada de texto.

Para ver la lista completa de comandos disponibles, parámetros y tipos de retorno, consulta la [documentación de comandos de Appium Flutter Driver](https://github.com/appium/appium-flutter-driver#commands), el [código fuente del Finder para Node.js](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) y [appium-flutter-finder en npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### Ejemplo A — Interacción simple (flujo del contador)

```typescript
// counter.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Counter Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The counter should be successfully incremented by clicking the button.', async () => {
        const incrementButton = find.byTooltip('Increment');
        const counterText = find.byValueKey('counter_text');

        const initialValue = await driver.getElementText(counterText);
        expect(initialValue).toBe('0');

        await driver.elementClick(incrementButton);

        const finalValue = await driver.getElementText(counterText);
        expect(finalValue).toBe('1');
    });
});
```

### Ejemplo B — Navegación estable (evitando timeouts)

```typescript
// redirects.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Redirects Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should be able to navigate between the Redirect Example views and back to the first view.', async () => {
        const buttonGoToRedirectExampleTwoView = find.byValueKey('redirect_example_two_button');
        await driver.elementClick(buttonGoToRedirectExampleTwoView);

        const redirectExampleTwoBody = find.byValueKey('redirect_example_two_body');
        await driver.execute('flutter:waitFor', redirectExampleTwoBody);
        const textRedirectExampleTwoBody = await driver.getElementText(redirectExampleTwoBody);
        expect(textRedirectExampleTwoBody).toBe('This is the Redirect Example Two View');

        const buttonGoBackToRedirectExampleView = find.byValueKey('redirect_example_two_back_button');
        await driver.elementClick(buttonGoBackToRedirectExampleView);

        const redirectExampleBody = find.byValueKey('redirect_example_body');
        await driver.execute('flutter:waitFor', redirectExampleBody);
        const textRedirectExampleBody = await driver.getElementText(redirectExampleBody);
        expect(textRedirectExampleBody).toBe('This is the Redirect Example View');
    });
});
```

### Ejemplo C — Cambio de contextos (diálogos y permisos nativos del sistema operativo)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. En el contexto FLUTTER: hacer clic en el widget que activa un diálogo de permisos o alerta a nivel del sistema operativo
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. Cambiar al contexto NATIVE_APP para interactuar con el diálogo del sistema operativo
        await driver.switchContext('NATIVE_APP');

        // Localizar y hacer clic en el botón nativo usando selectores estándar de WebdriverIO
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Volver al contexto FLUTTER para seguir verificando los widgets de Flutter
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## Flujo de compilación y ejecución

Para asegurarte de que tus cambios recientes en el código Dart y en las Keys sean visibles para las pruebas, sigue siempre estos pasos:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

Puedes ver los ejemplos de código en el repositorio: https://github.com/webdriverio/appium-boilerplate