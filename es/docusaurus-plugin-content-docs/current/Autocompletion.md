---
id: autocompletion
title: Autocompletado
description: "Obtén autocompletado y documentación de la API en línea para los comandos de WebdriverIO en IntelliJ, WebStorm y Visual Studio Code."
---

## IntelliJ

El autocompletado funciona de forma predeterminada en IDEA y WebStorm.

Si llevas un tiempo escribiendo código, probablemente te guste el autocompletado. El autocompletado está disponible de forma predeterminada en muchos editores de código.

![Autocompletion](/img/autocompletion/0.png)

Las definiciones de tipos basadas en [JSDoc](http://usejsdoc.org/) se utilizan para documentar el código. Ayudan a ver más detalles adicionales sobre los parámetros y sus tipos.

![Autocompletion](/img/autocompletion/1.png)

Utiliza los atajos estándar <kbd>⇧ + ⌥ + SPACE</kbd> en la plataforma IntelliJ para ver la documentación disponible:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code normalmente tiene el soporte de tipos integrado automáticamente y no es necesario realizar ninguna acción.

![Autocompletion](/img/autocompletion/14.png)

Si utilizas JavaScript puro y quieres tener un soporte de tipos adecuado, tienes que crear un `jsconfig.json` en la raíz de tu proyecto y hacer referencia a los paquetes de wdio utilizados, por ejemplo:

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```