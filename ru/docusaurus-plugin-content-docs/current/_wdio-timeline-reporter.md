---
id: wdio-timeline-reporter
title: Timeline Reporter
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter - это сторонний пакет, для получения дополнительной информации смотрите [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> Универсальный WebdriverIO репортер для агрегированной визуализации результатов ваших тестов, потому что "Лучше один раз увидеть"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## Почему

Потому что мы тратим много времени на отладку неудачных тестов, переключаясь между выводом терминала и просмотром скриншотов ошибок и т.д. Этот репортер объединяет всю типичную информацию, которая вам потребуется, в один отчет. Запускайте тесты и получайте удобную временную шкалу событий, к которой можно вернуться, чтобы дополнительно проверить, что всё выглядит нормально.

#### Возможности включают:

- Отлично работает с фреймворками Mocha и Jasmine. Также работает с Cucumber, но каждый шаг будет отображаться как тест
- Наглядная сводка результатов тестирования.
- Подробности каждого тестового запуска, включая все скриншоты, сделанные во время выполнения теста.
- Фильтрация результатов тестов. Отлично подходит для фокусировки на неудачных тестах
- К тесту прилагается трассировка стека ошибок.
- Возможность добавления дополнительной информации к тесту во время выполнения.
- Постобработка не требуется. По завершении процесса тестирования wdio будет сгенерирован статический html-файл отчета.
- Сервис Timeline для управления снимками экрана, включая изменение размера изображений.

Пример html-отчета можно найти [здесь](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

Инструкции по установке `WebdriverIO` можно найти [здесь](http://webdriver.io/guide/getstarted/install.html).

## Установка

**ДЛЯ ВЕРСИИ, СОВМЕСТИМОЙ С WEBDRIVERIO V4, СМОТРИТЕ [ЗДЕСЬ](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

Зависимость будет добавлена в ваш `package.json`

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### Использование

Добавьте `timeline` в массив reporters в вашем конфигурационном файле wdio.

Также импортируйте и добавьте `TimelineService` из wdio-timeline-reporter.

Сервис является обязательным для объединения отчетов и создания html, так как репортеры теперь инициализируются для каждого экземпляра запуска в webdriverio 5. [См. открытое обсуждение по webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineService также может управлять снимками экрана во время выполнения тестов. У вас есть возможность уменьшить размер и качество изображений и встроить изображения в отчет как base64. Эти параметры настраиваются с помощью [опций репортера.](#reporter-options)

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### Опции репортера

Если вы хотите переопределить конфигурацию репортера по умолчанию, добавьте объект reporterOptions в массив timeline в разделе reporters, как показано ниже.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| индекс | описание                                                                                                                                                                                                 |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.    | Директория, где будут созданы html-файл и скриншоты. Обязательная опция                                                                                                                                  |
| 2.    | Имя html-файла отчета. Значение по умолчанию - `timeline-report.html`                                                                                                                                     |
| 3.    | Встраивать изображения как base64 в html-файл. Значение по умолчанию - `false`                                                                                                                            |
| 4.    | Опции объекта для манипуляции изображениями                                                                                                                                                               |
| 5.    | Установить качество JPEG. Актуально только если опция `resize` - `true`. Чем меньше значение, тем меньше размер и качество изображения. Значение по умолчанию - `70`. Максимально допустимое значение - `100` |
| 6.    | Изменять размер изображения. Значение по умолчанию - `false`                                                                                                                                               |
| 7.    | Значение для уменьшения общего количества пикселей. Актуально только если опция `resize` - true. По умолчанию `1`. Допустимые значения `1 - 5`                                                             |
| 8.    | Как часто делать скриншоты. Поддерживаемые значения: `on:error`, `before:click`, `none`. По умолчанию `none`. `before:click` - отличный вариант для создания временной шкалы скриншотов тестируемого приложения. |

### Добавление дополнительной информации в контекст теста

Можно добавить дополнительную информацию к тесту, используя статический метод `addContext`. Это может быть полезно для добавления важной информации, которая может помочь в отладке неудачных тестов, например, пользователя, созданного во время выполнения теста с динамическим именем пользователя

#### Базовое использование

Статический метод `TimelineReporter.addContext` принимает либо строковый параметр, либо объект с двумя свойствами `title` и `value`, например

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

value также может быть ссылкой

##### Пример Mocha

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // объект в качестве параметра
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // значение как тег якоря
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // строковый параметр
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## Благодарности

Хотелось бы выразить благодарность авторам и сопровождающим [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter). Изучение их решения для v5 помогло ускорить мою работу