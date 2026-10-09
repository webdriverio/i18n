---
id: autocompletion
title: தானியங்கு நிறைவு
description: "IntelliJ, WebStorm மற்றும் Visual Studio Code இல் WebdriverIO கட்டளைகளுக்கான தானியங்கு நிறைவு மற்றும் இன்லைன் API ஆவணங்களைப் பெறுங்கள்."
---

## IntelliJ

IDEA மற்றும் WebStorm இல் தானியங்கு நிறைவு எந்த அமைப்பும் இல்லாமல் நேரடியாகச் செயல்படுகிறது.

நீங்கள் சில காலமாக நிரல் குறியீடு எழுதி வருகிறீர்கள் என்றால், உங்களுக்குத் தானியங்கு நிறைவு பிடித்திருக்கலாம். பல குறியீடு எடிட்டர்களில் தானியங்கு நிறைவு நேரடியாகவே கிடைக்கிறது.

![Autocompletion](/img/autocompletion/0.png)

குறியீட்டை ஆவணப்படுத்த [JSDoc](http://usejsdoc.org/) அடிப்படையிலான வகை வரையறைகள் பயன்படுத்தப்படுகின்றன. இது அளவுருக்கள் மற்றும் அவற்றின் வகைகள் பற்றிய கூடுதல் விவரங்களைக் காண உதவுகிறது.

![Autocompletion](/img/autocompletion/1.png)

கிடைக்கக்கூடிய ஆவணங்களைக் காண IntelliJ Platform இல் நிலையான குறுக்குவிசைகளான <kbd>⇧ + ⌥ + SPACE</kbd> ஐப் பயன்படுத்தவும்:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code இல் பொதுவாக வகை ஆதரவு தானாகவே ஒருங்கிணைக்கப்பட்டிருக்கும், எனவே எந்த நடவடிக்கையும் தேவையில்லை.

![Autocompletion](/img/autocompletion/14.png)

நீங்கள் vanilla JavaScript பயன்படுத்தி, சரியான வகை ஆதரவைப் பெற விரும்பினால், உங்கள் திட்டத்தின் ரூட் கோப்பகத்தில் ஒரு `jsconfig.json` ஐ உருவாக்கி, பயன்படுத்தப்படும் wdio தொகுப்புகளைக் குறிப்பிட வேண்டும், எ.கா.:

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