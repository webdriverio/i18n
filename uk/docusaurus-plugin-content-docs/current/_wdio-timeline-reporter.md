---
id: wdio-timeline-reporter
title: Репортер Часової Шкали
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter - це пакет від сторонніх розробників, більше інформації див. на [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> Універсальний репортер WebdriverIO для візуалізації результатів ваших тестів, тому що "Бачити - значить вірити"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## Чому

Тому що ми витрачаємо багато часу на налагодження тестів, які не пройшли, перемикаючись між виводом терміналу та переглядом знімків екрана помилок тощо. Цей репортер збирає всю типову інформацію, яка вам знадобиться, в один звіт. Запускайте тести та отримуйте гарну часову шкалу подій, на яку ви можете оглянутися, щоб додатково переконатися, що все в порядку.

#### Особливості включають:

- Відмінно працює з фреймворками Mocha та Jasmine. Також працює з Cucumber, але кожен крок буде відображатися як тест
- Наочний підсумок результатів тестування.
- Деталі кожного запуску тесту, включаючи всі знімки екрана, зроблені під час виконання тесту.
- Фільтрація результатів тестування. Чудово для фокусування на тестах, що не пройшли
- Трасування стеку помилок, доданий до тесту.
- Можливість додавати додаткову інформацію до тесту під час виконання.
- Не потрібна пост-обробка. Після завершення процесу тестування wdio буде створено статичний html-файл звіту.
- Сервіс часової шкали для керування зняттям скріншотів, включаючи зміну розміру зображень.

Приклад html-звіту можна знайти [тут](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут](http://webdriver.io/guide/getstarted/install.html).

## Встановлення

**ДЛЯ ВЕРСІЇ, СУМІСНОЇ З WEBDRIVERIO V4, ДИВ. [ТУТ](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

Залежність буде додано до вашого `package.json`

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### Використання

Додайте `timeline` до масиву репортерів у вашому конфігураційному файлі wdio.

Також імпортуйте та додайте `TimelineService` з wdio-timeline-reporter.

Сервіс є обов'язковим для об'єднання звітів та створення html, оскільки репортери тепер ініціалізуються на кожен екземпляр запуску в webdriverio 5. [Дивіться відкриту дискусію на webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineService також може керувати зняттям скріншотів під час виконання тестів. У вас є можливість зменшити розмір та якість зображень та вбудувати зображення в звіт як base64. Це налаштовується за допомогою [опцій репортера.](#reporter-options)

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

### Опції репортера

Якщо ви бажаєте перевизначити стандартну конфігурацію репортера, додайте об'єкт reporterOptions до масиву timeline в розділі reporters, як показано нижче.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| індекс | опис                                                                                                                                                                                                   |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.    | Каталог, де будуть створені html-файл та скріншоти. Обов'язкова опція                                                                                                                                 |
| 2.    | Назва файлу звіту html. Значення за замовчуванням - `timeline-report.html`                                                                                                                              |
| 3.    | Вбудовувати зображення як base64 в html-файл. Значення за замовчуванням - `false`                                                                                                                       |
| 4.    | Об'єкт опцій для маніпуляцій із зображеннями                                                                                                                                                           |
| 5.    | Встановити якість JPEG. Актуально лише якщо опція `resize` має значення `true`. Чим менше значення, тим менший розмір і якість зображення. Значення за замовчуванням - `70`. Максимальне значення - `100` |
| 6.    | Змінити розмір зображення. Значення за замовчуванням - `false`                                                                                                                                         |
| 7.    | значення для зменшення загальної кількості пікселів. Актуально лише якщо опція `resize` має значення true. За замовчуванням `1` Допустимі значення `1 - 5`                                             |
| 8.    | як часто робити скріншоти. Підтримувані значення: `on:error`, `before:click`, `none`. За замовчуванням `none`. `before:click` - чудовий варіант для створення часової шкали знімків екрана програми під час тестування. |

### Додавання додаткової інформації до контексту тесту

Можна додати додаткову інформацію до тесту, використовуючи статичний метод `addContext`. Це може бути корисно для додавання важливої інформації, яка могла б допомогти у налагодженні тестів, що не пройшли, наприклад, користувач, створений під час тестового запуску з динамічним ім'ям користувача.

#### Основне використання

Статичний метод `TimelineReporter.addContext` приймає або рядковий параметр, або об'єкт з двома властивостями `title` і `value`, наприклад

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

значенням також може бути посилання

##### Приклад Mocha

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // об'єкт як параметр
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // значення як тег якоря
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // рядковий параметр
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## Подяка

Хотів би виразити вдячність авторам та підтримувачам [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter). Ознайомлення з їхнім рішенням для v5 допомогло прискорити мою роботу