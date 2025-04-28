---
id: testrunner
title: Testrunner
---

WebdriverIO levereras med sin egen testrunner för att hjälpa dig att börja testa så snabbt som möjligt. Den är tänkt att göra allt arbete åt dig, möjliggör integration med tjänster från tredje part och hjälper dig att köra dina tester så effektivt som möjligt.

WebdriverIOs testrunner är separat paketerad i NPM-paketet `@wdio/cli`.

Installera det så här:

```sh npm2yarn
npm install @wdio/cli
```

För att se hjälpen för kommandoradsgränssnittet, skriv följande kommando i din terminal:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

Toppen! Nu behöver du definiera en konfigurationsfil där all information om dina tester, kapaciteter och inställningar anges. Gå över till avsnittet [Configuration File](/docs/configuration) för att se hur den filen ska se ut.

Med `wdio`-konfigurationshjälparen är det superenkelt att generera din konfigurationsfil. Kör bara:

```sh
$ npx wdio config
```

...och det startar hjälpverktyget.

Det kommer att ställa frågor och generera en konfigurationsfil åt dig på mindre än en minut.

![WDIO configuration utility](/img/config-utility.gif)

När du har ställt in din konfigurationsfil kan du starta dina tester genom att köra:

```sh
npx wdio run wdio.conf.js
```

Du kan också initiera din testkörning utan `run`-kommandot:

```sh
npx wdio wdio.conf.js
```

Det är allt! Nu kan du komma åt seleniuminstan via den globala variabeln `browser`.

## Kommandon

### `wdio config`

Kommandot `config` kör WebdriverIOs konfigurationshjälpare. Denna hjälpare kommer att ställa några frågor om ditt WebdriverIO-projekt och skapa en `wdio.conf.js`-fil baserat på dina svar.

Exempel:

```sh
wdio config
```

Alternativ:

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> Detta är standardkommandot för att köra din konfiguration.

Kommandot `run` initierar din WebdriverIO-konfigurationsfil och kör dina tester.

Exempel:

```sh
wdio run ./wdio.conf.js --watch
```

Alternativ:

```
--help                prints WebdriverIO help menu                   [boolean]
--version             prints WebdriverIO version                     [boolean]
--hostname, -h        automation driver host address                  [string]
--port, -p            automation driver port                          [number]
--user, -u            username if using a cloud service as automation backend
                                                                        [string]
--key, -k             corresponding access key to the user            [string]
--watch               watch specs for changes                        [boolean]
--logLevel, -l        level of logging verbosity
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                stop test runner after specific amount of tests have
                        failed                                          [number]
--baseUrl             shorten url command calls by setting a base url [string]
--waitforTimeout, -w  timeout for all waitForXXX commands             [number]
--framework, -f       defines the framework (Mocha, Jasmine or Cucumber) to
                        run the specs                                   [string]
--reporters, -r       reporters to print out the results on stdout      [array]
--suite               overwrites the specs attribute and runs the defined
                        suite                                            [array]
--spec                run a certain spec file or wildcards - overrides specs piped
                        from stdin                                       [array]
--exclude             exclude spec file(s) from a run - overrides specs piped
                        from stdin                                       [array]
--repeat              Repeat specific specs and/or suites N times        [number]
--mochaOpts           Mocha options
--jasmineOpts         Jasmine options
--cucumberOpts        Cucumber options
```

> Obs: Autokompilering kan enkelt kontrolleras med `tsx` ENV-variabler. Se även [TypeScript-dokumentationen](/docs/typescript).

### `wdio install`
Kommandot `install` låter dig lägga till rapportörer och tjänster till dina WebdriverIO-projekt via CLI.

Exempel:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

Om du vill installera paketen med `yarn` istället kan du skicka flaggan `--yarn` till kommandot:

```sh
wdio install service sauce --yarn
```

Du kan också skicka en anpassad konfigurationssökväg om din WDIO-konfigurationsfil inte finns i samma mapp som du arbetar i:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Lista över stödda tjänster

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### Lista över stödda rapportörer

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### Lista över stödda ramverk

```
mocha
jasmine
cucumber
```

### `wdio repl`

Kommandot repl låter dig starta ett interaktivt kommandoradsgränssnitt för att köra WebdriverIO-kommandon. Det kan användas för teständamål eller för att snabbt starta en WebdriverIO-session.

Kör tester i lokal Chrome:

```sh
wdio repl chrome
```

eller kör tester på Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Du kan använda samma argument som du kan i [run-kommandot](#wdio-run).