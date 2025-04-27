---
id: testrunner
title: Тестраннер
---

WebdriverIO постачається з власним тестраннером, щоб допомогти вам почати тестування якомога швидше. Він призначений для виконання всієї роботи за вас, дозволяє інтегруватися з сторонніми сервісами та допомагає запускати тести максимально ефективно.

Тестраннер WebdriverIO поставляється окремо в NPM пакеті `@wdio/cli`.

Встановіть його таким чином:

```sh npm2yarn
npm install @wdio/cli
```

Щоб побачити довідку з інтерфейсу командного рядка, введіть наступну команду в терміналі:

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

Чудово! Тепер вам потрібно визначити конфігураційний файл, де буде вказана вся інформація про ваші тести, можливості та налаштування. Перейдіть до розділу [Конфігураційний файл](/docs/configuration), щоб побачити, як повинен виглядати цей файл.

За допомогою помічника конфігурації `wdio` дуже легко створити конфігураційний файл. Просто запустіть:

```sh
$ npx wdio config
```

...і запуститься допоміжна утиліта.

Вона задасть вам питання і згенерує конфігураційний файл менш ніж за хвилину.

![Утиліта конфігурації WDIO](/img/config-utility.gif)

Після налаштування конфігураційного файлу ви можете запустити тести, виконавши:

```sh
npx wdio run wdio.conf.js
```

Ви також можете ініціалізувати запуск тестів без команди `run`:

```sh
npx wdio wdio.conf.js
```

Ось і все! Тепер ви можете отримати доступ до екземпляра selenium через глобальну змінну `browser`.

## Команди

### `wdio config`

Команда `config` запускає помічник конфігурації WebdriverIO. Цей помічник задасть вам кілька запитань про ваш проект WebdriverIO і створить файл `wdio.conf.js` на основі ваших відповідей.

Приклад:

```sh
wdio config
```

Опції:

```
--help            виводить меню довідки WebdriverIO                            [boolean]
--npm             Чи встановлювати пакети за допомогою NPM замість yarn        [boolean]
```

### `wdio run`

> Це команда за замовчуванням для запуску вашої конфігурації.

Команда `run` ініціалізує ваш конфігураційний файл WebdriverIO і запускає тести.

Приклад:

```sh
wdio run ./wdio.conf.js --watch
```

Опції:

```
--help                виводить меню довідки WebdriverIO                [boolean]
--version             виводить версію WebdriverIO                      [boolean]
--hostname, -h        адреса хоста драйвера автоматизації               [string]
--port, -p            порт драйвера автоматизації                       [number]
--user, -u            ім'я користувача при використанні хмарного сервісу як бекенду автоматизації
                                                                        [string]
--key, -k             відповідний ключ доступу до користувача           [string]
--watch               спостерігати за змінами в специфікаціях          [boolean]
--logLevel, -l        рівень деталізації журналювання
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                зупинити тестраннер після певної кількості невдалих тестів
                                                                       [number]
--baseUrl             скоротити виклики команд URL, встановивши базовий URL
                                                                       [string]
--waitforTimeout, -w  таймаут для всіх команд waitForXXX               [number]
--framework, -f       визначає фреймворк (Mocha, Jasmine або Cucumber) для
                      запуску специфікацій                             [string]
--reporters, -r       репортери для виведення результатів до stdout      [array]
--suite               перевизначає атрибут specs і запускає визначений
                      набір                                             [array]
--spec                запустити певний файл специфікації або шаблони - перевизначає specs
                      з stdin                                           [array]
--exclude             виключити файл(и) специфікації з запуску - перевизначає specs
                      з stdin                                           [array]
--repeat              Повторити певні специфікації та/або набори N разів [number]
--mochaOpts           Опції Mocha
--jasmineOpts         Опції Jasmine
--cucumberOpts        Опції Cucumber
```

> Примітка: Автокомпіляція може легко керуватися за допомогою ENV змінних `tsx`. Дивіться також [документацію TypeScript](/docs/typescript).

### `wdio install`
Команда `install` дозволяє додавати репортери та сервіси до ваших проектів WebdriverIO через CLI.

Приклад:

```sh
wdio install service sauce # встановлює @wdio/sauce-service
wdio install reporter dot # встановлює @wdio/dot-reporter
wdio install framework mocha # встановлює @wdio/mocha-framework
```

Якщо ви хочете встановити пакети за допомогою `yarn`, ви можете передати прапор `--yarn` до команди:

```sh
wdio install service sauce --yarn
```

Ви також можете передати власний шлях до конфігурації, якщо ваш файл конфігурації WDIO не знаходиться в тій же папці, над якою ви працюєте:

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

Команда repl дозволяє запустити інтерактивний інтерфейс командного рядка для запуску команд WebdriverIO. Вона може використовуватися для тестування або для швидкого запуску сесії WebdriverIO.

Запустити тести в локальному chrome:

```sh
wdio repl chrome
```

або запустити тести на Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Ви можете застосувати ті ж аргументи, що і в [команді run](#wdio-run).