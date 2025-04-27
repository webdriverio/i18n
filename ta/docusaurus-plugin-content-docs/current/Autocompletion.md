---
id: autocompletion
title: தானியங்கி நிறைவு
---

## IntelliJ

IDEA மற்றும் WebStorm இல் தானியங்கி நிறைவு தானாகவே செயல்படுகிறது.

நீங்கள் நிரல் குறியீட்டை சிறிது காலமாக எழுதி வந்திருந்தால், நீங்கள் நிச்சயமாக தானியங்கி நிறைவை விரும்புவீர்கள். பல குறியீடு திருத்திகளில் தானியங்கி நிறைவு அப்படியே கிடைக்கிறது.

![Autocompletion](/img/autocompletion/0.png)

[JSDoc](http://usejsdoc.org/) அடிப்படையிலான வகை விளக்கங்கள் குறியீட்டை ஆவணப்படுத்த பயன்படுகிறது. இது அளவுருக்கள் மற்றும் அவற்றின் வகைகள் பற்றிய கூடுதல் விவரங்களைக் காண உதவுகிறது.

![Autocompletion](/img/autocompletion/1.png)

கிடைக்கக்கூடிய ஆவணங்களைப் பார்க்க IntelliJ Platform இல் நிலையான குறுக்குவழிகளைப் பயன்படுத்தவும் <kbd>⇧ + ⌥ + SPACE</kbd>:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code பொதுவாக வகை ஆதரவை தானாகவே ஒருங்கிணைத்துள்ளது, எனவே எந்த செயலும் தேவையில்லை.

![Autocompletion](/img/autocompletion/14.png)

நீங்கள் வெனிலா JavaScript ஐப் பயன்படுத்தி சரியான வகை ஆதரவைப் பெற விரும்பினால், உங்கள் திட்ட மூலத்தில் `jsconfig.json` ஐ உருவாக்கி, பயன்படுத்தப்படும் wdio பேக்கேஜ்களைக் குறிப்பிட வேண்டும், எ.கா:

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