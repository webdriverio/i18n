---
id: autocompletion
title: Autouzupełnianie
description: "Uzyskaj autouzupełnianie i wbudowaną dokumentację API dla poleceń WebdriverIO w IntelliJ, WebStorm i Visual Studio Code."
---

## IntelliJ

Autouzupełnianie działa od razu w IDEA i WebStorm.

Jeśli piszesz kod od jakiegoś czasu, prawdopodobnie lubisz autouzupełnianie. Autouzupełnianie jest dostępne od razu w wielu edytorach kodu.

![Autocompletion](/img/autocompletion/0.png)

Do dokumentowania kodu używane są definicje typów oparte na [JSDoc](http://usejsdoc.org/). Pomaga to zobaczyć więcej dodatkowych szczegółów na temat parametrów i ich typów.

![Autocompletion](/img/autocompletion/1.png)

Użyj standardowych skrótów <kbd>⇧ + ⌥ + SPACE</kbd> na platformie IntelliJ, aby zobaczyć dostępną dokumentację:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code zazwyczaj ma automatycznie zintegrowaną obsługę typów i nie są wymagane żadne działania.

![Autocompletion](/img/autocompletion/14.png)

Jeśli używasz czystego JavaScriptu i chcesz mieć prawidłową obsługę typów, musisz utworzyć plik `jsconfig.json` w katalogu głównym projektu i odwołać się do używanych pakietów wdio, np.:

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