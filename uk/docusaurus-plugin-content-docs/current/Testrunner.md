---
id: testrunner
title: Тестовий раннер
---

WebdriverIO постачається з власним тестовим раннером, щоб допомогти вам почати тестування якомога швидше. Він повинен зробити всю роботу за вас, дозволяє інтегруватися з сторонніми сервісами і допомагає запускати ваші тести максимально ефективно.

Тестовий раннер WebdriverIO окремо упакований в NPM пакет `@wdio/cli`.

Встановіть його таким чином:

```sh npm2yarn
npm install @wdio/cli
```

Щоб переглянути довідку про інтерфейс командного рядка, введіть наступну команду в терміналі:

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

Чудово! Тепер вам потрібно визначити конфігураційний файл, де буде вказана вся інформація про ваші тести, можливості та налаштування. Перейдіть до розділу [Файл конфігурації](/docs/configuration), щоб дізнатися, як повинен виглядати цей файл.

За допомогою помічника конфігурації `wdio` створити файл конфігурації дуже просто. Просто запустіть:

```sh
$ npx wdio config
```

...і запуститься утиліта-помічник.

Вона задасть вам питання і згенерує файл конфігурації менш ніж за хвилину.

![Утиліта конфігурації WDIO](/img/config-utility.gif)

Після налаштування файлу конфігурації ви можете запустити тести, виконавши:

```sh
npx wdio run wdio.conf.js
```

Ви також можете ініціалізувати запуск тесту без команди `run`:

```sh
npx wdio wdio.conf.js
```

Ось і все! Тепер ви можете отримати доступ до екземпляра selenium через глобальну змінну `browser`.

## Команди

### `wdio config`

Команда `config` запускає помічника конфігурації WebdriverIO. Цей помічник задасть вам кілька питань про ваш проект WebdriverIO і створить файл `wdio.conf.js` на основі ваших відповідей.

Приклад:

```sh
wdio config
```

Опції:

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> Це команда за замовчуванням для запуску вашої конфігурації.

Команда `run` ініціалізує ваш файл конфігурації WebdriverIO і запускає ваші тести.

Приклад:

```sh
wdio run ./wdio.conf.js --watch
```

Опції:

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
--tsConfigPath        Custom path for `tsconfig.json` or use wdio config's [tsConfigPath setting](/docs/configurationfile)
```

> Примітка: Автокомпіляцією можна легко керувати за допомогою ENV змінних `tsx`. Дивіться також [документацію TypeScript](/docs/typescript).

### `wdio install`
Команда `install` дозволяє додавати репортери та сервіси до ваших проектів WebdriverIO через CLI.

Приклад:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

Якщо ви хочете встановити пакети за допомогою `yarn`, ви можете передати прапор `--yarn` до команди:

```sh
wdio install service sauce --yarn
```

Ви також можете вказати власний шлях до конфігурації, якщо ваш файл конфігурації WDIO знаходиться не в тій папці, над якою ви працюєте:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Список підтримуваних сервісів

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

#### Список підтримуваних репортерів

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

#### Список підтримуваних фреймворків

```
mocha
jasmine
cucumber
```

### `wdio repl`

Команда repl дозволяє запустити інтерактивний інтерфейс командного рядка для виконання команд WebdriverIO. Вона може використовуватися для тестування або для швидкого запуску сесії WebdriverIO.

Запуск тестів у локальному chrome:

```sh
wdio repl chrome
```

або запуск тестів на Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Ви можете застосувати ті ж аргументи, що і в [команді run](#wdio-run).