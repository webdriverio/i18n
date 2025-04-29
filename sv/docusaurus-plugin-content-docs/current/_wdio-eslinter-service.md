---
id: wdio-eslinter-service
title: Auto-upptäckt av saknade importer med eslint-tjänsten
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service är ett paket från tredje part, för mer information se [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

Har du någonsin kört dina e2e-tester, bara för att upptäcka 10, 15 eller 30 minuter senare att det fanns en saknad/felstavad import, som inte visade sig förrän mitt i testkörningen? När detta händer rapporterar testverktyget dessa tester som trasiga.

eslint är ett utmärkt verktyg för att upptäcka olika fel före körning, och denna tjänst kör eslint-verktyget innan WebdriverIO-tester körs, som ett automatiserat steg istället för ett manuellt.

Det är oftast bättre att misslyckas snabbare så att vi kan åtgärda problem tidigare snarare än senare.

Den rekommenderade konfigurationen är att använda unresolved-runnern för att bara kontrollera saknade importer, men om så önskas kan du också konfigurera tjänsten att köra eslinter i ditt projekt med npm- eller yarn-runner, eller genom att skicka in en flagga som anger att systemet ska använda din .eslintrc-konfiguration också.

## Installation

Installera wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### Snabbstart - Kontrollera endast saknade eller olösta importer

Som standard kontrollerar denna minimala konfiguration, "unresolved"-runnern, efter olösta require-importer och kastar ett fel om olösta importer hittas. Tjänsten stoppar sedan körningen. Du kan anpassa .eslintrc.js för att utföra fler kontroller med "npm"- eller "yarn"-runners om så önskas. Se [eslint](https://www.npmjs.com/package/eslint) för mer information.

Om du inte har en `.eslintrc.js`-konfiguration i ditt projekt kan wdio-eslinter-service konfigureras för att använda en standardkonfiguration som bara kontrollerar saknade importer innan testerna körs. Detta är praktiskt så att du upptäcker felaktiga importer tidigare snarare än senare. För att konfigurera detta, lägg till följande eslinter-konfiguration i din services-array (förutsatt att du redan använder chromedriver-tjänsten; annars, utelämna den delen):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

Nu är det bara att börja köra testerna, och om det finns en saknad eller felaktig import kommer WebdriverIO att logga det och omedelbart avsluta testkörningen:

```
$ npx wdio
```


#### Valfritt - om du använder module-alias

Om du använder [module-alias](https://www.npmjs.com/package/module-alias)-modulen, som låter dig konfigurera alias för att ersätta relativa sökvägar, måste du skicka in det i eslinter-konfigurationen med hjälp av eslint-import-resolver-custom-alias-pluginet. Nedan är ett exempel:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

Installera pluginet i ditt projekt:

```
$ npm i eslint-import-resolver-custom-alias
```

Kör testerna och verifiera att systemet kommer att hitta felaktiga importer som använder modulalias:

```
$ npx wdio
```

#### Experimentellt - Använd tillsammans med en befintlig eslintrc-konfiguration i ditt projekt

För att även låta eslinter-tjänsten använda en befintlig eslintrc-konfiguration i ditt projekt, ställ in `includeProjectEslintrc` till true i wdio.conf.js-konfigurationens services-array.

Jag har upplevt problem med konflikter mellan plugins. Om din projekts eslint-konfiguration också letar efter olösta importer, kan detta kanske inte fungera och kan kräva justeringar i din .eslintrc.js. Detta rekommenderas inte för närvarande.


### Avancerade alternativ - Använda npm- och yarn-runners

Npm- och yarn-runners hjälper dig att få ytterligare kontroll över att köra en befintlig eslinter-konfiguration i ditt projekt. Med denna konfiguration kan du definiera extra kommandon att köra i run-scripts-sektionen i din package.json:

I din `package.json`, lägg till denna post i dina run scripts:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**OBS: Att lägga till eslint i package.json krävs för att tjänsten ska fungera när du använder npm- eller yarn-runners.**

Om du inte redan har eslint installerat och konfigurerat behöver du installera och konfigurera det i ditt projekt, samt eventuella plugins du använder, såsom eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

Om du använder eslint-import-resolver-custom-alias plugin för att mappa modulalias till deras verkliga sökvägar, måste du installera det också:

```
$ npm i eslint-import-resolver-custom-alias
```

Du behöver också skapa en `.eslintrc.js`-fil, om du inte redan har en av eslintrc-konfigurationsfilerna i ditt projekt. Här är en grundläggande konfiguration för att bara söka efter olösta importer, och du kan utöka denna konfiguration för att validera andra kodkvalitetskontroller innan du kör tester:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

Slutligen, lägg till `eslinter`-tjänsten i services-arrayen i `wdio.conf.js`:

```javascript
    services: ['eslinter']
```

Kör `npm run eslint` för att verifiera och kontrollera efter fel.

Om du använder `yarn` kan du konfigurera `runnerType`-tjänstalternativet:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

Om du redan har ett linter-skript som du vill återanvända (istället för `eslint`), kan du konfigurera `scriptName`-tjänstalternativet:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## Använda i WebdriverIO

Starta WebdriverIOs testverktyg som vanligt. eslint kommer att kontrollera koden. Om fel hittas, avbryts körningen omedelbart.

```bash
$ npx wdio
```


**Exempel:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```