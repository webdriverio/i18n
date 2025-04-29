---
id: junit-reporter
title: Репортер Junit
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Репортер WebdriverIO, який створює XML-звіти формату JUnit, сумісні з [Jenkins](http://jenkins-ci.org/)

## Встановлення

Найпростіший спосіб - зберігти `@wdio/junit-reporter` як devDependency у вашому `package.json`, через:

```sh
npm install @wdio/junit-reporter --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](https://webdriver.io/docs/gettingstarted).

## Результат

Цей репортер створить звіт для кожного запуску, тому ви отримаєте xml-звіт для кожного файлу специфікації. Нижче
наведені приклади виводу XML для різних сценаріїв у файлі специфікації.

### Один блок describe
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
стає
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
        <properties>
          <property name="specId" value="0"/>
          <property name="suiteName" value="a test suite"/>
          <property name="capabilities" value="chrome"/>
          <property name="file" value=".\test\specs\asuite.spec.js"/>
        </properties>
        <testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="11.706"/>
    </testsuite>
</testsuites>
```

### Вкладений блок describe
```javascript
describe('a test suite', () => {
    describe('a nested test suite', function() {
        it('a test case', function () {
          // do something
          // assert something
        });
    });
});
```
стає
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
  </testsuite>
  <testsuite name="a nested test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a nested test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
  </testsuite>
</testsuites>
```

### Кілька блоків describe
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
describe('a second test suite', () => {
    it('a second test case', function () {
      // do something
      // assert something
    });
});
```
стає
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
      <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
    </properties>
  </testsuite>
  <testsuite name="a second test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a second test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_second_test_case" name="a_second_test_suite_a_second_test_case" time="11.706"/>
  </testsuite>
</testsuites>
```

### Невдачі та помилки
Всі невдачі тестових випадків відображаються як помилки тестових випадків JUnit. Невдалий тестовий випадок через помилку або збій перевірки виглядатиме так:

```xml
<testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="0.372">
  <failure message="Error: some error"/>
    <system-err>
        <![CDATA[
Error: some assertion failure
    at UserContext.<anonymous> (C:\repo\webdriver-example\test\specs/a_test_suite.spec.js:22:17)
]]>
  </system-err>
</testcase>
```

## Конфігурація

Наступний код показує конфігурацію запуску тестів wdio за замовчуванням. Просто додайте `'junit'` як репортер
до масиву. Щоб отримати якийсь вивід під час тесту, ви можете запустити [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) і WDIO JUnit Reporter одночасно:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

Підтримуються такі параметри:

### outputDir
Визначте каталог, де мають зберігатися ваші xml-файли.

Тип: `String`<br />
Обов'язково

### outputFileFormat
Визначте xml-файли, створені після виконання тесту.

Тип: `Object`<br />
За замовчуванням: ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> Примітка: `options.capabilities` - це ваш об'єкт можливостей для цього запуску, тому вказання `${options.capabilities}` у рядку поверне [Object object]. Ви повинні вказати, які властивості можливостей ви хочете у своєму імені файлу.

### suiteNameFormat

Дає можливість надати власний регулярний вираз для форматування назви набору тестів (наприклад, у вихідному xml).

Тип: `Regex`,<br />
За замовчуванням: `/[^a-zA-Z0-9@]+/`

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            suiteNameFormat: /[^a-zA-Z0-9@]+/
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

### addFileAttribute

Додає атрибут файлу до кожного тестового випадку. Ця конфігурація в першу чергу призначена для CircleCI. Цей параметр надає більш детальну інформацію, але може не працювати на інших платформах CI.

Тип: `Boolean`,<br />
За замовчуванням: `false`


### packageName

Ви можете розбити пакети за додатковим рівнем, встановивши `'packageName'`. Наприклад, якщо ви хочете перебрати набір тестів з різними встановленими змінними середовища:

Тип: `String`<br />
Приклад:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            packageName: process.env.USER_ROLE // chrome.41 - administrator
        }]
    ]
    // ...
};
```

### errorOptions

Дозволяє встановити різні комбінації сповіщень про помилки всередині xml.<br />
Враховуючи тест Jasmine, такий як `expect(true).toBe(false, 'my custom message')`, ви отримаєте таку помилку тесту:

```
{
    matcherName: 'toBe',
    message: 'Expected true to be false, \'my custom message\'.',
    stack: 'Error: Expected true to be false, \'my custom message\'.\n    at UserContext.it (/home/mcelotti/Workspace/WebstormProjects/forcebeatwio/test/marco/prova1.spec.js:3:22)',
    passed: false,
    expected: [ false, 'my custom message' ],
    actual: true
}
```

Тому ви можете вибрати *який* ключ буде використовуватися *де*, дивіться приклад нижче.

Тип: `Object`,<br />
За замовчуванням: `errorOptions: { error: "message" }`<br />
Приклад:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            errorOptions: {
                error: 'message',
                failure: 'message',
                stacktrace: 'stack'
            }
        }]
    ],
    // ...
};
```

### addWorkerLogs

Необов'язковий параметр, встановіть цей параметр на true, щоб прикріпити журнали консолі з тесту в репортері.

Тип: `Boolean`<br />
За замовчуванням: `false`<br />
Приклад:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            addWorkerLogs: true
        }]
    ],
    // ...
};
```

## Додавання користувацьких властивостей до тестових випадків

Цей плагін надає функцію `addProperty(name, value)`. Ця функція може бути використана для додавання додаткових властивостей тестового випадку junit до поточного кроку тесту. Ці властивості будуть відображатися у результуючому xml як `<property name="${name}" value="${value}" />`.

Типовий випадок використання - додавання посилання на проблему або тестовий випадок.


### Приклад використання

Приклад для mocha:

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## Налаштування Jenkins

Нарешті, вам потрібно повідомити вашому CI-завданню (наприклад, Jenkins), де він може знайти xml-файл. Для цього додайте дію після збірки до вашого завдання, яка виконується після запуску тесту, і вкажіть Jenkins (або вашу бажану CI-систему) на ваші результати тестів XML:

![Point Jenkins to XML files](https://webdriver.io/img/jenkins-postjob.png "Point Jenkins to XML files")

Якщо у вашій CI-системі немає такого кроку після збірки, ймовірно, десь в інтернеті є плагін для цього.

----

Для отримання додаткової інформації про WebdriverIO, дивіться [домашню сторінку](https://webdriver.io).