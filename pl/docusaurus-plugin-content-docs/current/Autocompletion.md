---
id: autocompletion
title: Autouzupełnianie
---

## IntelliJ

Autouzupełnianie działa bez dodatkowej konfiguracji w IDEA i WebStorm.

Jeśli piszesz kod programistyczny od jakiegoś czasu, prawdopodobnie lubisz autouzupełnianie. Autouzupełnianie jest dostępne bez dodatkowej konfiguracji w wielu edytorach kodu.

![Autocompletion](/img/autocompletion/0.png)

Definicje typów oparte na [JSDoc](http://usejsdoc.org/) są używane do dokumentowania kodu. Pomaga to zobaczyć więcej dodatkowych szczegółów o parametrach i ich typach.

![Autocompletion](/img/autocompletion/1.png)

Użyj standardowych skrótów <kbd>⇧ + ⌥ + SPACE</kbd> na platformie IntelliJ, aby zobaczyć dostępną dokumentację:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code zazwyczaj ma automatycznie zintegrowaną obsługę typów i nie wymaga dodatkowych działań.

![Autocompletion](/img/autocompletion/14.png)

Jeśli używasz czystego JavaScript i chcesz mieć odpowiednią obsługę typów, musisz utworzyć plik `jsconfig.json` w głównym katalogu projektu i odwołać się do używanych pakietów wdio, np.:

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