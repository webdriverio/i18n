---
id: autocompletion
title: Autocompletar
description: "Obtenha autocompletar e documentação de API em linha para comandos do WebdriverIO no IntelliJ, WebStorm e Visual Studio Code."
---

## IntelliJ

O autocompletar funciona imediatamente no IDEA e no WebStorm.

Se você escreve código de programação há algum tempo, provavelmente gosta do autocompletar. O autocompletar está disponível por padrão em muitos editores de código.

![Autocompletion](/img/autocompletion/0.png)

Definições de tipo baseadas em [JSDoc](http://usejsdoc.org/) são usadas para documentar o código. Elas ajudam a ver mais detalhes adicionais sobre os parâmetros e seus tipos.

![Autocompletion](/img/autocompletion/1.png)

Use os atalhos padrão <kbd>⇧ + ⌥ + SPACE</kbd> na plataforma IntelliJ para ver a documentação disponível:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

O Visual Studio Code geralmente tem o suporte a tipos integrado automaticamente e nenhuma ação é necessária.

![Autocompletion](/img/autocompletion/14.png)

Se você usa JavaScript puro e deseja ter um suporte adequado a tipos, é necessário criar um `jsconfig.json` na raiz do seu projeto e referenciar os pacotes wdio utilizados, por exemplo:

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