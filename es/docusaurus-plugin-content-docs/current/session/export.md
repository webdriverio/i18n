---
id: export
title: Exportar una sesión como prueba
description: Convierte los pasos que ejecutaste en wdio session en un spec, page objects y comandos personalizados.
---

`export` escribe un spec a partir de los pasos grabados. Las referencias se reemplazan por selectores estables. Para una página web, se usa el primero de los siguientes que coincida exactamente con un elemento: un test id (`data-testid`, `data-test`, `data-qa`), un [selector de rol](/docs/selectors#role-selector) como `role/button[name="Add to cart"]`, un nombre accesible (`aria/Add to cart`), un id, el texto de un botón o enlace, el nombre de un campo de formulario y, por último, una ruta CSS.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` muestra los pasos antes de exportar. `history clear` los descarta.

## Page objects

`--page-objects` escribe un page object junto al spec. Los selectores se agrupan según la ruta en la que se ejecutaron. Un `$('…')` literal en un paso grabado se convierte en un getter. `$$`, las cadenas que casualmente contienen `$('…')` y un `$(selector)` dinámico se quedan como están.

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

El comando se niega a sobrescribir un page object que ya existe en el directorio de salida. Cambia `--out` o elimina primero ese archivo. El archivo spec en sí se vuelve a escribir.

Un `import` al principio de un paso `exec` se eleva al principio del spec, fuera de la función de prueba.

## Helpers

Añade un archivo en `.wdio/helpers/` cuando un paso sea demasiado largo para `exec`. Cada archivo exporta por defecto una función que recibe el navegador y registra comandos con `addCommand`. Las importaciones relativas siguen siendo relativas a ese archivo. Las importaciones de paquetes sin ruta se resuelven desde el proyecto.

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

Los helpers se cargan cuando se abre la sesión y de nuevo con `npx wdio session helpers --reload`. Si `.wdio/helpers` aún no existe, la sesión lo vigila hasta que se cree. Los helpers se convierten en comandos personalizados en la prueba exportada.

## Próximos pasos

- [Ejecutar código](/docs/session/exec) — los pasos que graba `export`
- [Comandos](/docs/session-commands) — flags de `export`, `history` y `helpers`