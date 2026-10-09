---
id: devtools
title: DevTools
description: "WebdriverIO, Nightwatch.js மற்றும் Selenium WebDriver உடன் செயல்படும் உலாவி அடிப்படையிலான பிழைத்திருத்த UI-இல் சோதனை இயக்கங்களைக் காட்சிப்படுத்தவும், கட்டுப்படுத்தவும், ஆய்வு செய்யவும்."
---

DevTools என்பது உங்கள் சோதனை இயக்கங்களை நிகழ்நேரத்தில் காட்சிப்படுத்தவும், கட்டுப்படுத்தவும், ஆய்வு செய்யவும் உதவும் சக்திவாய்ந்த உலாவி அடிப்படையிலான பிழைத்திருத்த இடைமுகமாகும். இது **WebdriverIO**, **Nightwatch.js** மற்றும் **Selenium WebDriver** (எந்த runner-உடனும்) ஆகியவற்றுடன் செயல்படுகிறது — ஒரே backend, ஒரே UI, ஒரே capture உள்கட்டமைப்பு.

## இது என்ன வழங்குகிறது

- **சோதனைகளைத் தேர்ந்தெடுத்து மீண்டும் இயக்கவும்** - எந்தவொரு test case அல்லது suite-ஐயும் கிளிக் செய்து உடனடியாக மீண்டும் இயக்கவும் ([விவரங்கள்](/docs/devtools/wdio/interactive-test-rerunning))
- **பாதுகாத்து மீண்டும் இயக்கவும் (ஒப்பிடுக)** - தோல்வியடையும் சோதனையின் snapshot-ஐ எடுத்து, அதை மீண்டும் இயக்கி, இரண்டு இயக்கங்களையும் command வாரியாக சீரமைத்து அருகருகே ஒப்பிட்டுப் பார்க்கவும் ([விவரங்கள்](/docs/devtools/wdio/preserve-and-rerun))
- **காட்சி ரீதியாக பிழைத்திருத்தம் செய்யவும்** - ஒவ்வொரு command-க்குப் பிறகும் தானியங்கி screenshot-களுடன் நேரடி உலாவி முன்னோட்டங்களைக் காணவும்
- **இயக்கத்தைக் கண்காணிக்கவும்** - நேர முத்திரைகள் மற்றும் முடிவுகளுடன் விரிவான command பதிவுகளைப் பார்க்கவும்
- **Network & console-ஐக் கண்காணிக்கவும்** - API அழைப்புகள் மற்றும் JavaScript பதிவுகளை ஆய்வு செய்யவும் ([network](/docs/devtools/wdio/network-logs) · [console](/docs/devtools/wdio/console-logs))
- **குறியீட்டிற்குச் செல்லவும்** - TestLens மூலம் சோதனை மூலக் கோப்புகளுக்கு நேரடியாகச் செல்லவும் ([விவரங்கள்](/docs/devtools/wdio/testlens))
- **Session-களைப் பதிவு செய்யவும்** - ஒவ்வொரு session-க்கும் உலாவியின் தொடர்ச்சியான `.webm` வீடியோ ([விவரங்கள்](/docs/devtools/wdio/screencast))
- **Trace mode** - offline replay அல்லது agentic பயன்பாட்டிற்காக எடுத்துச் செல்லக்கூடிய `trace.zip` artifact-ஐ உருவாக்கும் headless capture பாதை ([விவரங்கள்](/docs/devtools/wdio/trace-mode))

## இது எப்படி செயல்படுகிறது

1. உங்கள் சோதனைகளை வழக்கம் போல் தொடங்கவும்
2. DevTools தானாகவே `http://localhost:3000` இல் ஒரு உலாவி சாளரத்தைத் திறக்கிறது
3. UI ஆனது test hierarchy, உலாவி முன்னோட்டம், command timeline மற்றும் பதிவுகளை நிகழ்நேரத்தில் காட்டுகிறது
4. சோதனைகள் முடிந்த பிறகு, எந்தவொரு சோதனையையும் கிளிக் செய்து அதே உலாவி session-இல் தனியாக மீண்டும் இயக்கவும்

## உங்கள் Framework-ஐத் தேர்ந்தெடுக்கவும்

- **[WebDriverIO](/docs/devtools/wdio)** - Mocha, Jasmine அல்லது Cucumber உடன் `@wdio/devtools-service` ஐப் பயன்படுத்தவும்
- **[Nightwatch](/docs/devtools/nightwatch)** - சோதனைக் குறியீட்டில் எந்த மாற்றமும் இல்லாமல் `@wdio/nightwatch-devtools` ஐப் பயன்படுத்தவும்
- **[Selenium](/docs/devtools/selenium)** - Mocha, Jest, Cucumber அல்லது சாதாரண Node scripts உடன் `@wdio/selenium-devtools` ஐப் பயன்படுத்தவும்