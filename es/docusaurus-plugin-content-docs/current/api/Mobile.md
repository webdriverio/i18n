---
id: mobile
title: Comandos Móviles
---

# Introducción a los comandos móviles personalizados y mejorados en WebdriverIO

Probar aplicaciones móviles y aplicaciones web móviles conlleva sus propios desafíos, especialmente al lidiar con diferencias específicas de cada plataforma entre Android e iOS. Aunque Appium ofrece la flexibilidad para manejar estas diferencias, a menudo requiere que te sumerjas en documentación compleja y dependiente de la plataforma ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) y en comandos igualmente complejos. Esto puede hacer que escribir scripts de prueba sea más laborioso, propenso a errores y difícil de mantener.

Para simplificar el proceso, WebdriverIO introduce **comandos móviles personalizados y mejorados** diseñados específicamente para pruebas de aplicaciones web móviles y aplicaciones nativas. Estos comandos abstraen las complejidades de las APIs subyacentes de Appium, permitiéndote escribir scripts de prueba concisos, intuitivos e independientes de la plataforma. Al centrarnos en la facilidad de uso, buscamos reducir la carga adicional al desarrollar scripts de Appium y permitirte automatizar aplicaciones móviles sin esfuerzo.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## ¿Por qué comandos móviles personalizados?

### 1. **Simplificación de APIs complejas**
Algunos comandos de Appium, como los gestos o las interacciones con elementos, implican una sintaxis extensa y compleja. Por ejemplo, ejecutar una acción de pulsación larga con la API nativa de Appium requiere construir manualmente una cadena de `action`:

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

Con los comandos personalizados de WebdriverIO, la misma acción puede realizarse con una sola línea de código expresiva:

```ts
await $('~Contacts').longPress();
```

Esto reduce drásticamente el código repetitivo, haciendo que tus scripts sean más limpios y fáciles de entender.

### 2. **Abstracción multiplataforma**
Las aplicaciones móviles a menudo requieren un manejo específico para cada plataforma. Por ejemplo, el desplazamiento en aplicaciones nativas difiere significativamente entre [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) e [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO cierra esta brecha proporcionando comandos unificados como `scrollIntoView()` que funcionan sin problemas en todas las plataformas, independientemente de la implementación subyacente.

```ts
await $('~element').scrollIntoView();
```

Esta abstracción garantiza que tus pruebas sean portables y no requieran ramificaciones constantes ni lógica condicional para tener en cuenta las diferencias entre sistemas operativos.

### 3. **Mayor productividad**
Al reducir la necesidad de comprender e implementar comandos de Appium de bajo nivel, los comandos móviles de WebdriverIO te permiten centrarte en probar la funcionalidad de tu aplicación en lugar de lidiar con matices específicos de cada plataforma. Esto es especialmente beneficioso para equipos con experiencia limitada en automatización móvil o para aquellos que buscan acelerar su ciclo de desarrollo.

### 4. **Consistencia y mantenibilidad**
Los comandos personalizados aportan uniformidad a tus scripts de prueba. En lugar de tener implementaciones diferentes para acciones similares, tu equipo puede confiar en comandos estandarizados y reutilizables. Esto no solo hace que la base de código sea más mantenible, sino que también facilita la incorporación de nuevos miembros al equipo.

## ¿Por qué mejorar ciertos comandos móviles?

### 1. Mayor flexibilidad
Ciertos comandos móviles se han mejorado para ofrecer opciones y parámetros adicionales que no están disponibles en las APIs predeterminadas de Appium. Por ejemplo, WebdriverIO añade lógica de reintentos, tiempos de espera y la capacidad de filtrar webviews según criterios específicos, lo que permite un mayor control sobre escenarios complejos.

```ts
// Ejemplo: Personalizar los intervalos de reintento y los tiempos de espera para la detección de webviews
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Reintentar cada 1 segundo
  androidWebviewConnectTimeout: 10000,    // Tiempo de espera de 10 segundos
});
```

Estas opciones ayudan a adaptar los scripts de automatización al comportamiento dinámico de la aplicación sin código repetitivo adicional.

### 2. Mejor usabilidad
Los comandos mejorados abstraen las complejidades y los patrones repetitivos presentes en las APIs nativas. Te permiten realizar más acciones con menos líneas de código, reduciendo la curva de aprendizaje para nuevos usuarios y haciendo que los scripts sean más fáciles de leer y mantener.

```ts
// Ejemplo: Comando mejorado para cambiar de contexto por título
await driver.switchContext({
  title: 'My Webview Title',
});
```

En comparación con los métodos predeterminados de Appium, los comandos mejorados eliminan la necesidad de pasos adicionales, como obtener manualmente los contextos disponibles y filtrarlos.

### 3. Estandarización del comportamiento
WebdriverIO garantiza que los comandos mejorados se comporten de forma consistente en plataformas como Android e iOS. Esta abstracción multiplataforma minimiza la necesidad de lógica condicional basada en el sistema operativo, lo que da lugar a scripts de prueba más mantenibles.

```ts
// Ejemplo: Comando de desplazamiento unificado para ambas plataformas
await $('~element').scrollIntoView();
```

Esta estandarización simplifica las bases de código, especialmente para equipos que automatizan pruebas en múltiples plataformas.

### 4. Mayor fiabilidad
Al incorporar mecanismos de reintento, valores predeterminados inteligentes y mensajes de error detallados, los comandos mejorados reducen la probabilidad de pruebas inestables. Estas mejoras garantizan que tus pruebas sean resistentes a problemas como retrasos en la inicialización de webviews o estados transitorios de la aplicación.

```ts
// Ejemplo: Cambio de webview mejorado con una lógica de coincidencia robusta
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Esto hace que la ejecución de las pruebas sea más predecible y menos propensa a fallos causados por factores del entorno.

### 5. Mejores capacidades de depuración
Los comandos mejorados suelen devolver metadatos más completos, lo que facilita la depuración de escenarios complejos, especialmente en aplicaciones híbridas. Por ejemplo, comandos como getContext y getContexts pueden devolver información detallada sobre los webviews, incluidos el título, la url y el estado de visibilidad.

```ts
// Ejemplo: Obtener metadatos detallados para depuración
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Estos metadatos ayudan a identificar y resolver problemas más rápido, mejorando la experiencia general de depuración.


Al mejorar los comandos móviles, WebdriverIO no solo facilita la automatización, sino que también se alinea con su misión de proporcionar a los desarrolladores herramientas potentes, fiables e intuitivas.

## Aplicaciones híbridas

Las aplicaciones híbridas combinan contenido web con funcionalidad nativa y requieren un manejo especializado durante la automatización. Estas aplicaciones utilizan webviews para mostrar contenido web dentro de una aplicación nativa. WebdriverIO proporciona métodos mejorados para trabajar con aplicaciones híbridas de forma eficaz.

### Comprender los webviews
Un webview es un componente similar a un navegador integrado en una aplicación nativa:

- **Android:** Los webviews se basan en Chrome/System Webview y pueden contener varias páginas (similar a las pestañas del navegador). Estos webviews requieren ChromeDriver para automatizar las interacciones. Appium puede determinar automáticamente la versión de ChromeDriver necesaria en función de la versión de System WebView o Chrome instalada en el dispositivo y descargarla automáticamente si aún no está disponible. Este enfoque garantiza una compatibilidad sin problemas y minimiza la configuración manual. Consulta la [documentación de Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) para saber cómo Appium descarga automáticamente la versión correcta de ChromeDriver.
- **iOS:** Los webviews funcionan con Safari (WebKit) y se identifican mediante IDs genéricos como `WEBVIEW_{id}`.

### Desafíos de las aplicaciones híbridas
1. Identificar el webview correcto entre varias opciones.
2. Obtener metadatos adicionales como el título, la URL o el nombre del paquete para tener un mejor contexto.
3. Manejar las diferencias específicas de cada plataforma entre Android e iOS.
4. Cambiar al contexto correcto en una aplicación híbrida de forma fiable.

### Comandos clave para aplicaciones híbridas

#### 1. `getContext`
Obtiene el contexto actual de la sesión. De forma predeterminada, se comporta como el método getContext de Appium, pero puede proporcionar información detallada del contexto cuando `returnDetailedContext` está habilitado. Para más información, consulta [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Devuelve una lista detallada de los contextos disponibles, mejorando el método contexts de Appium. Esto facilita identificar el webview correcto para la interacción sin necesidad de llamar a comandos adicionales para determinar el título, la url o el `bundleId|packageName` activo. Para más información, consulta [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Cambia a un webview específico según el nombre, el título o la url. Ofrece flexibilidad adicional, como el uso de expresiones regulares para la coincidencia. Para más información, consulta [`switchContext`](/docs/api/mobile/switchContext)

### Características clave para aplicaciones híbridas
1. Metadatos detallados: Obtén información completa para la depuración y un cambio de contexto fiable.
2. Consistencia multiplataforma: Comportamiento unificado para Android e iOS, gestionando sin problemas las particularidades de cada plataforma.
3. Lógica de reintento personalizada (Android): Ajusta los intervalos de reintento y los tiempos de espera para la detección de webviews.


:::info Notas y limitaciones
- Android proporciona metadatos adicionales, como `packageName` y `webviewPageId`, mientras que iOS se centra en `bundleId`.
- La lógica de reintento es personalizable en Android, pero no es aplicable en iOS.
- Hay varios casos en los que iOS no puede encontrar el Webview. Appium proporciona diferentes capacidades adicionales para `appium-xcuitest-driver` para encontrar el Webview. Si crees que no se encuentra el Webview, puedes intentar establecer una de las siguientes capacidades:
    - `appium:includeSafariInWebviews`: Añade los contextos web de Safari a la lista de contextos disponibles durante una prueba de aplicación nativa/webview. Esto es útil si la prueba abre Safari y necesita poder interactuar con él. El valor predeterminado es `false`.
    - `appium:webviewConnectRetries`: El número máximo de reintentos antes de abandonar la detección de páginas de webview. El retraso entre cada reintento es de 500 ms; el valor predeterminado es de `10` reintentos.
    - `appium:webviewConnectTimeout`: El tiempo máximo en milisegundos que se espera para que se detecte una página de webview. El valor predeterminado es `5000` ms.

Para ejemplos avanzados y más detalles, consulta la documentación de la API Mobile de WebdriverIO.
:::


---

Nuestro creciente conjunto de comandos refleja nuestro compromiso de hacer que la automatización móvil sea accesible y elegante. Ya sea que estés realizando gestos complejos o trabajando con elementos de aplicaciones nativas, estos comandos se alinean con la filosofía de WebdriverIO de crear una experiencia de automatización fluida. Y no nos detenemos aquí: si hay alguna funcionalidad que te gustaría ver, agradecemos tus comentarios. No dudes en enviar tus solicitudes a través de [este enlace](https://github.com/webdriverio/webdriverio/issues/new/choose).