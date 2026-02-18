---
id: console-logs
title: கன்சோல் பதிவுகள்
---

சோதனை செயலாக்கத்தின் போது அனைத்து உலாவி கன்சோல் வெளியீடுகளையும் கைப்பற்றி ஆய்வு செய்யுங்கள். DevTools உங்கள் பயன்பாட்டிலிருந்து கன்சோல் செய்திகளை (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) மற்றும் உங்கள் `wdio.conf.ts`-இல் கட்டமைக்கப்பட்ட `logLevel` அடிப்படையில் WebDriverIO கட்டமைப்பு பதிவுகளை பதிவு செய்கிறது.

**அம்சங்கள்:**
- சோதனை செயலாக்கத்தின் போது நிகழ்நேர கன்சோல் செய்தி பிடிப்பு
- உலாவி கன்சோல் பதிவுகள் (log, warn, error, info, debug)
- கட்டமைக்கப்பட்ட `logLevel` (trace, debug, info, warn, error, silent) மூலம் வடிகட்டப்பட்ட WebDriverIO கட்டமைப்பு பதிவுகள்
- ஒவ்வொரு செய்தியும் எப்போது பதிவு செய்யப்பட்டது என்பதைக் காட்டும் நேர முத்திரைகள்
- சந்தர்ப்பத்திற்காக சோதனை படிகளுடன் மற்றும் உலாவி திரைப்பிடிப்புகளுடன் காட்டப்படும் கன்சோல் பதிவுகள்

**கட்டமைப்பு:**
```js
// wdio.conf.ts
export const config = {
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controls which framework logs are captured
    // ...
};
```

இது JavaScript பிழைகளை பிழைத்திருத்த, பயன்பாட்டு நடத்தையைக் கண்காணிக்க, மற்றும் சோதனை செயலாக்கத்தின் போது WebDriverIO-இன் உள்ளக செயல்பாடுகளைக் காண எளிதாக்குகிறது.

## டெமோ

### >_ கன்சோல் பதிவுகள்
![Console Logs](./demo/console-logs.gif)