---
id: mobile
title: Comandos Móviles
---

# Introducción a los comandos móviles personalizados y mejorados en WebdriverIO

Probar aplicaciones móviles y aplicaciones web móviles conlleva sus propios desafíos, especialmente cuando se trata de diferencias específicas de plataforma entre Android e iOS. Si bien Appium proporciona la flexibilidad para manejar estas diferencias, a menudo requiere que profundices en documentación compleja y dependiente de la plataforma ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) y comandos. Esto puede hacer que escribir scripts de prueba sea más lento, propenso a errores y difícil de mantener.

Para simplificar el proceso, WebdriverIO introduce **comandos móviles personalizados y mejorados** diseñados específicamente para pruebas de web móvil y aplicaciones nativas. Estos comandos abstraen las complejidades de las APIs subyacentes de Appium, permitiéndote escribir scripts de prueba concisos, intuitivos e independientes de la plataforma. Al centrarnos en la facilidad de uso, buscamos reducir la carga adicional durante el desarrollo de scripts de Appium y permitirte automatizar aplicaciones móviles sin esfuerzo.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## ¿Por qué comandos móviles personalizados?

### 1. **Simplificando APIs complejas**
Algunos comandos de Appium, como gestos o interacciones con elementos, implican una sintaxis verbosa y compleja. Por ejemplo, ejecutar una acción de pulsación larga con la API nativa de Appium requiere construir manualmente una cadena de `action`:

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

Con los comandos personalizados de WebdriverIO, la misma acción se puede realizar con una sola línea de código expresiva:

```ts
await $('~Contacts').longPress();
```

Esto reduce drásticamente el código repetitivo, haciendo que tus scripts sean más limpios y fáciles de entender.

### 2. **Abstracción multiplataforma**
Las aplicaciones móviles a menudo requieren un manejo específico de la plataforma. Por ejemplo, el desplazamiento en aplicaciones nativas difiere significativamente entre [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) e [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO cierra esta brecha proporcionando comandos unificados como `scrollIntoView()` que funcionan sin problemas en todas las plataformas, independientemente de la implementación subyacente.

```ts
await $('~element').scrollIntoView();
```

Esta abstracción asegura que tus pruebas sean portables y no requieran ramificaciones constantes o lógica condicional para tener en cuenta las diferencias del sistema operativo.

### 3. **Mayor productividad**
Al reducir la necesidad de entender e implementar comandos de Appium de bajo nivel, los comandos móviles de WebdriverIO te permiten centrarte en probar la funcionalidad de tu aplicación en lugar de luchar con matices específicos de la plataforma. Esto es especialmente beneficioso para equipos con experiencia limitada en automatización móvil o aquellos que buscan acelerar su ciclo de desarrollo.

### 4. **Consistencia y mantenibilidad**
Los comandos personalizados aportan uniformidad a tus scripts de prueba. En lugar de tener implementaciones variables para acciones similares, tu equipo puede confiar en comandos estandarizados y reutilizables. Esto no solo hace que la base de código sea más mantenible, sino que también reduce la barrera para incorporar nuevos miembros al equipo.

## ¿Por qué mejorar ciertos comandos móviles?

### 1. Añadir flexibilidad
Ciertos comandos móviles se mejoran para proporcionar opciones y parámetros adicionales que no están disponibles en las APIs predeterminadas de Appium. Por ejemplo, WebdriverIO agrega lógica de reintento, tiempos de espera y la capacidad de filtrar webviews según criterios específicos, permitiendo un mayor control sobre escenarios complejos.

```ts
// Ejemplo: Personalización de intervalos de reintento y tiempos de espera para la detección de webview
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Reintentar cada 1 segundo
  androidWebviewConnectTimeout: 10000,    // Tiempo de espera después de 10 segundos
});
```

Estas opciones ayudan a adaptar los scripts de automatización al comportamiento dinámico de la aplicación sin código repetitivo adicional.

### 2. Mejorando la usabilidad
Los comandos mejorados abstraen las complejidades y patrones repetitivos que se encuentran en las APIs nativas. Te permiten realizar más acciones con menos líneas de código, reduciendo la curva de aprendizaje para nuevos usuarios y haciendo que los scripts sean más fáciles de leer y mantener.

```ts
// Ejemplo: Comando mejorado para cambiar de contexto por título
await driver.switchContext({
  title: 'My Webview Title',
});
```

En comparación con los métodos predeterminados de Appium, los comandos mejorados eliminan la necesidad de pasos adicionales como recuperar manualmente los contextos disponibles y filtrarlos.

### 3. Estandarizando el comportamiento
WebdriverIO asegura que los comandos mejorados se comporten de manera consistente en plataformas como Android e iOS. Esta abstracción multiplataforma minimiza la necesidad de lógica de ramificación condicional basada en el sistema operativo, lo que lleva a scripts de prueba más mantenibles.

```ts
// Ejemplo: Comando de desplazamiento unificado para ambas plataformas
await $('~element').scrollIntoView();
```

Esta estandarización simplifica las bases de código, especialmente para equipos que automatizan pruebas en múltiples plataformas.

### 4. Aumentando la fiabilidad
Al incorporar mecanismos de reintento, valores predeterminados inteligentes y mensajes de error detallados, los comandos mejorados reducen la probabilidad de pruebas inestables. Estas mejoras aseguran que tus pruebas sean resistentes a problemas como retrasos en la inicialización de webview o estados transitorios de la aplicación.

```ts
// Ejemplo: Cambio de webview mejorado con lógica de coincidencia robusta
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Esto hace que la ejecución de pruebas sea más predecible y menos propensa a fallos causados por factores ambientales.

### 5. Mejorando las capacidades de depuración
Los comandos mejorados a menudo devuelven metadatos más ricos, lo que facilita la depuración de escenarios complejos, particularmente en aplicaciones híbridas. Por ejemplo, comandos como getContext y getContexts pueden devolver información detallada sobre webviews, incluidos título, url y estado de visibilidad.

```ts
// Ejemplo: Recuperación de metadatos detallados para depuración
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Estos metadatos ayudan a identificar y resolver problemas más rápidamente, mejorando la experiencia general de depuración.


Al mejorar los comandos móviles, WebdriverIO no solo facilita la automatización, sino que también se alinea con su misión de proporcionar a los desarrolladores herramientas que son potentes, confiables e intuitivas de usar.

---

## Aplicaciones híbridas

Las aplicaciones híbridas combinan contenido web con funcionalidad nativa y requieren un manejo especializado durante la automatización. Estas aplicaciones utilizan webviews para renderizar contenido web dentro de una aplicación nativa. WebdriverIO proporciona métodos mejorados para trabajar eficazmente con aplicaciones híbridas.

### Entendiendo los Webviews
Un webview es un componente similar a un navegador incrustado en una aplicación nativa:

- **Android:** Los webviews se basan en Chrome/System Webview y pueden contener múltiples páginas (similares a las pestañas del navegador). Estos webviews requieren ChromeDriver para automatizar interacciones. Appium puede determinar automáticamente la versión requerida de ChromeDriver basándose en la versión del System WebView o Chrome instalado en el dispositivo y descargarlo automáticamente si aún no está disponible. Este enfoque garantiza una compatibilidad perfecta y minimiza la configuración manual. Consulta la [documentación de Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) para aprender cómo Appium descarga automáticamente la versión correcta de ChromeDriver.
- **iOS:** Los webviews funcionan con Safari (WebKit) y se identifican con IDs genéricos como `WEBVIEW_{id}`.

### Desafíos con aplicaciones híbridas
1. Identificar el webview correcto entre múltiples opciones.
2. Recuperar metadatos adicionales como el título, URL o nombre del paquete para un mejor contexto.
3. Manejar diferencias específicas de la plataforma entre Android e iOS.
4. Cambiar de manera confiable al contexto correcto en una aplicación híbrida.

### Comandos clave para aplicaciones híbridas

#### 1. `getContext`
Recupera el contexto actual de la sesión. Por defecto, se comporta como el método getContext de Appium, pero puede proporcionar información detallada del contexto cuando `returnDetailedContext` está habilitado. Para más información, consulta [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Devuelve una lista detallada de contextos disponibles, mejorando el método contexts de Appium. Esto facilita la identificación del webview correcto para la interacción sin necesidad de llamar a comandos adicionales para determinar el título, url o `bundleId|packageName` activo. Para más información, consulta [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Cambia a un webview específico basado en nombre, título o url. Proporciona flexibilidad adicional, como el uso de expresiones regulares para coincidencias. Para más información, consulta [`switchContext`](/docs/api/mobile/switchContext)

### Características clave para aplicaciones híbridas
1. Metadatos detallados: Recupera detalles completos para depuración y cambio de contexto confiable.
2. Consistencia multiplataforma: Comportamiento unificado para Android e iOS, manejando peculiaridades específicas de la plataforma sin problemas.
3. Lógica de reintento personalizada (Android): Ajusta intervalos de reintento y tiempos de espera para la detección de webview.


:::info Notas y limitaciones
- Android proporciona metadatos adicionales, como `packageName` y `webviewPageId`, mientras que iOS se centra en `bundleId`.
- La lógica de reintento es personalizable para Android pero no aplicable a iOS.
- Hay varios casos en los que iOS no puede encontrar el Webview. Appium proporciona diferentes capacidades adicionales para el `appium-xcuitest-driver` para encontrar el Webview. Si crees que el Webview no se encuentra, puedes intentar establecer una de las siguientes capacidades:
    - `appium:includeSafariInWebviews`: Agrega contextos web de Safari a la lista de contextos disponibles durante una prueba de aplicación nativa/webview. Esto es útil si la prueba abre Safari y necesita poder interactuar con él. El valor predeterminado es `false`.
    - `appium:webviewConnectRetries`: El número máximo de reintentos antes de rendirse en la detección de páginas de vista web. El retraso entre cada reintento es de 500ms, el valor predeterminado es `10` reintentos.
    - `appium:webviewConnectTimeout`: La cantidad máxima de tiempo en milisegundos para esperar a que se detecte una página de vista web. El valor predeterminado es `5000` ms.

Para ejemplos avanzados y detalles, consulta la documentación de la API móvil de WebdriverIO.
:::


---

Nuestro creciente conjunto de comandos refleja nuestro compromiso de hacer que la automatización móvil sea accesible y elegante. Ya sea que estés realizando gestos intrincados o trabajando con elementos de aplicaciones nativas, estos comandos se alinean con la filosofía de WebdriverIO de crear una experiencia de automatización sin problemas. Y no nos detenemos aquí: si hay una función que te gustaría ver, agradecemos tus comentarios. No dudes en enviar tus solicitudes a través de [este enlace](https://github.com/webdriverio/webdriverio/issues/new/choose).