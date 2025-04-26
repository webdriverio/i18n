---
id: autocompletion
title: Autocompletado
---

## IntelliJ

El autocompletado funciona de forma inmediata en IDEA y WebStorm.

Si has estado escribiendo código de programación durante un tiempo, probablemente te guste el autocompletado. El autocompletado está disponible de forma inmediata en muchos editores de código.

![Autocompletion](/img/autocompletion/0.png)

Las definiciones de tipo basadas en [JSDoc](http://usejsdoc.org/) se utilizan para documentar el código. Ayuda a ver más detalles adicionales sobre los parámetros y sus tipos.

![Autocompletion](/img/autocompletion/1.png)

Utiliza los atajos estándar <kbd>⇧ + ⌥ + SPACE</kbd> en la plataforma IntelliJ para ver la documentación disponible:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code generalmente tiene soporte de tipos integrado automáticamente y no se necesita ninguna acción.

![Autocompletion](/img/autocompletion/14.png)

Si utilizas JavaScript puro y quieres tener un soporte de tipos adecuado, debes crear un `jsconfig.json` en la raíz de tu proyecto y hacer referencia a los paquetes wdio utilizados, por ejemplo:

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