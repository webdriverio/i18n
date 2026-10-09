---
id: bamboo
title: Bamboo
description: "Запускайте тесты WebdriverIO в Atlassian Bamboo и публикуйте результаты JUnit, чтобы отслеживать успешные, проваленные и исправленные тесты в каждой сборке."
---

WebdriverIO предлагает тесную интеграцию с CI-системами, такими как [Bamboo](https://www.atlassian.com/software/bamboo). С помощью репортера [JUnit](https://webdriver.io/docs/junit-reporter.html) или [Allure](https://webdriver.io/docs/allure-reporter.html) вы можете легко отлаживать свои тесты, а также отслеживать их результаты. Интеграция довольно проста.

1. Установите репортер JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Обновите конфигурацию, чтобы сохранять результаты JUnit там, где Bamboo сможет их найти (и укажите репортер `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
Примечание: *Хорошей практикой всегда считается хранить результаты тестов в отдельной папке, а не в корневой.*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

Отчёты будут похожими для всех фреймворков, и вы можете использовать любой из них: Mocha, Jasmine или Cucumber.

К этому моменту, мы полагаем, у вас уже написаны тесты, результаты генерируются в папке ```./testresults/```, а ваш Bamboo запущен и работает.

## Интеграция тестов в Bamboo

1. Откройте ваш проект в Bamboo
    > Создайте новый план, подключите ваш репозиторий (убедитесь, что он всегда указывает на самую новую версию вашего репозитория) и создайте этапы (stages)

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Я воспользуюсь этапом и заданием по умолчанию. В вашем случае вы можете создать собственные этапы и задания (jobs)

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Откройте ваше тестовое задание и создайте задачи (tasks) для запуска тестов в Bamboo
    >**Задача 1:** Получение исходного кода (Source Code Checkout)

    >**Задача 2:** Запуск тестов ```npm i && npm run test```. Для выполнения указанных команд можно использовать задачу *Script* и *Shell Interpreter* (это сгенерирует результаты тестов и сохранит их в папке ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Задача 3:** Добавьте задачу *jUnit Parser* для разбора сохранённых результатов тестов. Укажите здесь директорию с результатами тестов (можно также использовать шаблоны в стиле Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Примечание: *Убедитесь, что задача разбора результатов находится в разделе *Final*, чтобы она выполнялась всегда, даже если задача с тестами завершилась неудачей*

    >**Задача 4:** (необязательно) Чтобы результаты тестов не смешивались со старыми файлами, вы можете создать задачу для удаления папки ```./testresults/``` после успешного разбора в Bamboo. Можно добавить shell-скрипт, например ```rm -f ./testresults/*.xml```, чтобы удалить результаты, или ```rm -r testresults```, чтобы удалить папку целиком

Когда вся эта *ракетная наука* позади, включите план и запустите его. Итоговый результат будет выглядеть так:

## Успешный тест

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Проваленный тест

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Проваленный и исправленный

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Ура!! Вот и всё. Вы успешно интегрировали свои тесты WebdriverIO в Bamboo.