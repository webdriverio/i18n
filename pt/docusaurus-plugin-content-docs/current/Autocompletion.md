---
id: autocompletion
title: Autocompleção
---

## IntelliJ

A autocompleção funciona imediatamente no IDEA e WebStorm.

Se você tem escrito código de programa por algum tempo, provavelmente gosta de autocompleção. A autocompleção está disponível de imediato em muitos editores de código.

![Autocompletion](/img/autocompletion/0.png)

Definições de tipo baseadas em [JSDoc](http://usejsdoc.org/) são usadas para documentar código. Isso ajuda a ver mais detalhes adicionais sobre parâmetros e seus tipos.

![Autocompletion](/img/autocompletion/1.png)

Use atalhos padrão <kbd>⇧ + ⌥ + SPACE</kbd> na plataforma IntelliJ para ver a documentação disponível:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

O Visual Studio Code geralmente tem suporte a tipos automaticamente integrado e não é necessária nenhuma ação.

![Autocompletion](/img/autocompletion/14.png)

Se você usa JavaScript puro e quer ter suporte adequado de tipos, deve criar um `jsconfig.json` na raiz do seu projeto e fazer referência aos pacotes wdio usados, por exemplo:

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