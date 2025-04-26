---
id: emulation
title: Emulación
---

Con WebdriverIO puedes emular APIs Web utilizando el comando [`emulate`](/docs/api/browser/emulate) para devolver valores personalizados que te ayudan a emular ciertos comportamientos del navegador. Ten en cuenta que esto requiere que tu aplicación utilice explícitamente estas APIs.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Esta función requiere soporte de WebDriver Bidi para el navegador. Aunque las versiones recientes de Chrome, Edge y Firefox tienen dicho soporte, Safari __no lo tiene__. Para actualizaciones, sigue [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Además, si utilizas un proveedor en la nube para ejecutar navegadores, asegúrate de que tu proveedor también soporte WebDriver Bidi.

Para habilitar WebDriver Bidi para tu prueba, asegúrate de tener configurado `webSocketUrl: true` en tus capacidades.

:::

## Geolocalización

Cambia la geolocalización del navegador a un área específica, por ejemplo:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // muestra: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Esto modificará el funcionamiento de [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) y devolverá la ubicación proporcionada por ti.

## Esquema de Colores

Cambia la configuración predeterminada del esquema de colores del navegador mediante:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // muestra: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // muestra: "#000000"
```

Esto modificará el comportamiento de [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) cuando consultes el esquema de colores mediante `(prefers-color-scheme: dark)`.

## Agente de Usuario

Cambia el agente de usuario del navegador a una cadena diferente mediante:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Esto cambiará el valor de [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Ten en cuenta que los proveedores de navegadores están eliminando progresivamente el Agente de Usuario.

## Propiedad onLine

Cambia el estado de conexión del navegador mediante:

```ts
await browser.emulate('onLine', false)
```

Esto __no__ desactivará el tráfico de red entre el navegador e internet y solo cambiará el valor de retorno de [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Si estás interesado en modificar las capacidades de red del navegador, consulta el comando [`throttleNetwork`](/docs/api/browser/throttleNetwork).

## Reloj

Puedes modificar el reloj del sistema del navegador utilizando el comando [`emulate`](/docs/emulation). Sobrescribe las funciones globales nativas relacionadas con el tiempo permitiendo que sean controladas de forma sincrónica mediante `clock.tick()` o el objeto clock generado. Esto incluye el control de:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

El reloj comienza en la época unix (marca de tiempo 0). Esto significa que cuando instancias un nuevo Date en tu aplicación, tendrá una hora del 1 de enero de 1970 si no pasas otras opciones al comando `emulate`.

##### Ejemplo

Al llamar a `browser.emulate('clock', { ... })` sobrescribirá inmediatamente las funciones globales para la página actual y todas las páginas siguientes, por ejemplo:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// devuelve "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// devuelve "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// devuelve "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// devuelve "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Puedes modificar la hora del sistema llamando a [`setSystemTime`](/docs/api/clock/setSystemTime) o [`tick`](/docs/api/clock/tick).

El objeto `FakeTimerInstallOpts` puede tener las siguientes propiedades:

```ts
interface FakeTimerInstallOpts {
    // Instala temporizadores falsos con la época unix especificada
    // @default: 0
    now?: number | Date | undefined;

    // Un array con nombres de métodos globales y APIs para falsificar. Por defecto, WebdriverIO
    // no reemplaza `nextTick()` y `queueMicrotask()`. Por ejemplo,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` falsificará solo
    // `setTimeout()` y `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // El número máximo de temporizadores que se ejecutarán al llamar a runAll() (predeterminado: 1000)
    loopLimit?: number | undefined;

    // Indica a WebdriverIO que incremente el tiempo simulado automáticamente basado en el cambio
    // del tiempo real del sistema (por ejemplo, el tiempo simulado se incrementará en 20ms por cada
    // 20ms de cambio en el tiempo real del sistema)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevante solo cuando se usa con shouldAdvanceTime: true. Incrementa el tiempo simulado en
    // advanceTimeDelta ms por cada advanceTimeDelta ms de cambio en el tiempo real del sistema
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Indica a FakeTimers que limpie los temporizadores 'nativos' (es decir, no falsos) delegando
    // a sus respectivos manejadores. Estos no se limpian por defecto, lo que puede llevar a un
    // comportamiento inesperado si existían temporizadores antes de instalar FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Dispositivo

El comando `emulate` también admite la emulación de un determinado dispositivo móvil o de escritorio cambiando la ventana gráfica, el factor de escala del dispositivo y el agente de usuario. Esto no debería, de ninguna manera, utilizarse para pruebas móviles, ya que los motores de navegador de escritorio difieren de los móviles. Esto solo debe usarse si tu aplicación ofrece un comportamiento específico para tamaños de ventana más pequeños.

Por ejemplo, para cambiar el agente de usuario y la ventana gráfica a un iPhone 15, simplemente ejecuta:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// prueba tu aplicación ...

// restablece la ventana gráfica original y el agente de usuario
await restore()
```

WebdriverIO mantiene una lista fija de [todos los dispositivos definidos](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).