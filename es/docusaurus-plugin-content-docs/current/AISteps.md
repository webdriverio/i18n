---
id: ai-steps
title: Pasos de IA en las pruebas
description: Escribe pasos de prueba como intenciones con browser.act() y lee datos tipados con browser.extract() usando @wdio/ai-service; después, reprodúcelos desde una caché versionada sin modelo y revisa cada reparación.
---

`@wdio/ai-service` permite que una prueba describa un paso en lugar de programarlo: `browser.act('Add a blue shirt to the cart')` le pide a tu modelo que lo realice, registra los comandos de WebdriverIO que ejecutó y los reproduce desde un archivo de caché en cada ejecución posterior. Solo se vuelve a llamar al modelo cuando la página cambió y un paso registrado ya no puede repararse sin él. Úsalo para flujos cuyo marcado cambia con frecuencia, o para tener una prueba funcionando antes de conocer los selectores. Usa comandos normales de WebdriverIO para todo lo que ya sabes programar.

## Configurar el servicio

Instala el servicio y el paquete de LangChain del proveedor de tu modelo:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

Añade el servicio a tu configuración y define la clave de API del proveedor (aquí `ANTHROPIC_API_KEY`) en el entorno:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        webSocketUrl: true
    }],
    framework: 'mocha',
    services: [['ai', {
        model: 'anthropic:claude-sonnet-5-5'
    }]]
}
```

`webSocketUrl: true` abre una sesión de WebDriver BiDi. El servicio también funciona con WebDriver Classic, pero BiDi le permite comprobar qué hizo cada paso y leer las respuestas de la API de la página. Consulta la página [AI Service](/docs/ai-service) para ver todas las opciones y proveedores, incluidos los modelos locales mediante Ollama.

## Escribir una prueba

```ts title="test/specs/cart.e2e.ts"
import { browser, expect } from '@wdio/globals'
import { z } from 'zod'

describe('cart', () => {
    it('adds a shirt', async () => {
        await browser.url('https://shop.example/')
        await browser.act('Add a blue shirt in size M to the shopping cart')

        const cart = await browser.extract(
            'the line items in the cart',
            z.array(z.object({ name: z.string(), size: z.string(), qty: z.number() }))
        )
        expect(cart).toContainEqual({ name: 'Blue Shirt', size: 'M', qty: 1 })
    })
})
```

- `act` realiza el paso y nunca hace aserciones. Comprueba el resultado con `expect`.
- `extract` solo lee la página y valida la respuesta contra el esquema. Nunca se almacena en caché.
- Los secretos van en marcadores de posición. El modelo ve `{{password}}`, nunca el valor:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- Llama a `act` sobre un elemento para mantener al modelo dentro de él, o sobre un frame o pestaña que tengas seleccionados:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## Grabar una vez, reproducir sin modelo

La primera ejecución graba los pasos de cada llamada a `act` en `__act__/<spec file>.json`, junto al archivo de especificación:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Haz commit del directorio `__act__`. Las ejecuciones posteriores reproducen los comandos grabados, por lo que una ejecución exitosa no hace llamadas al modelo ni consume tokens.

| `cache` | Úsalo para |
| --- | --- |
| `auto` (predeterminado) | `write` en local, `heal` cuando `process.env.CI` está definido |
| `write` | grabar y actualizar los archivos de caché |
| `heal` | CI: reparar los pasos que fallan, escribir las entradas reparadas en `<outputDir>/act-cache/` y no modificar los archivos de caché |
| `locked` | ejecuciones de CI que no deben llamar a un modelo: solo reproducir, fallar cuando un paso no puede repararse sin el modelo |
| `off` | preguntar siempre al modelo |

Ejecuta `npx wdio run wdio.conf.ts -s` para volver a grabar todas las llamadas a `act`.

## Revisar las reparaciones

Cuando un paso grabado falla, el servicio primero prueba los otros selectores que grabó para el elemento y después su rol y nombre accesible. Solo si eso falla, el modelo continúa a partir del paso que falló. Cada paso reproducido o reparado tiene que hacer lo mismo que hacía cuando se grabó: enviar las mismas peticiones, navegar a la misma página y cambiar las mismas partes de la página. Se rechaza una reparación sobre un botón parecido pero incorrecto.

La ejecución termina con un resumen:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

La carpeta de evidencias contiene una captura de pantalla de la página en el momento en que falló el paso, una después de cada paso de reparación y un vídeo de la reparación en los navegadores que graban un screencast de WebDriver BiDi (actualmente Firefox). Revisa la reparación y luego haz commit del archivo de caché actualizado.

## Convertir los pasos en código normal

Una vez que un flujo sea estable, sustituye sus llamadas a `act` por los comandos grabados:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Añadir una camisa azul en talla M al carrito de compras
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## Solución de problemas

| Error | Solución |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | Define `model` en las opciones del servicio o exporta `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | Instala el paquete del proveedor. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Exporta la clave en la shell o en el secreto de CI que ejecuta las pruebas. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | Graba la llamada en local con `cache: 'write'` y haz commit del archivo `__act__`. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | El elemento sigue ahí, pero hace otra cosa: es una regresión, no un cambio de marcado. Revisa la aplicación. |
| `act("…") failed: …` seguido de `Evidence: <folder>` | El modelo no pudo completar la instrucción. La carpeta contiene todas las instantáneas que tomó, los eventos de consola y de red, y los pasos que se ejecutaron. |

## Próximos pasos

- [AI Service](/docs/ai-service): todas las opciones, el formato de la caché, los efectos de los pasos y el espacio de trabajo
- [Selectores](/docs/selectors#role-selector): el selector `role/` que usan los pasos grabados
- [WebdriverIO para agentes de programación](/docs/ai-agents): escribe pruebas junto con un agente de programación