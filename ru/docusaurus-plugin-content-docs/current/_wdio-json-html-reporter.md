---
id: wdio-json-html-reporter
title: JSON HTML Репортер
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter является сторонним пакетом, для получения дополнительной информации, пожалуйста, смотрите [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

Это пользовательский репортер WebDriverIO, который генерирует подробные JSON-отчеты во время выполнения тестов и предоставляет портативный генератор HTML-отчетов для визуализации результатов тестирования. Он записывает временные метки, метаданные выполнения и может делать скриншоты по запросу. Пакет следует соглашениям WebDriverIO для репортеров и опубликован в npm под именем `wdio-json-html-reporter`.

## Содержание

- [Обзор](#overview)
- [Особенности](#features)
- [Установка](#installation)
  - [1. Установка пакета](#1-install-the-package)
  - [2. Проверка установки](#2-verify-installation)
  - [3. Обновление конфигурации WebDriverIO](#3-update-webdriverio-configuration)
  - [4. Запуск тестов](#4-run-your-tests)
- [Использование CLI](#cli-usage)
- [Опция истории и генерация агрегированной истории](#history-option-and-aggregated-history-generation)
- [Скриншоты](#screenshots)

## Overview

WDIO JSON HTML REPORTER предоставляет два основных компонента:

- **JSONReporter**: Пользовательский репортер, который расширяет интерфейс репортера WebDriverIO для сбора событий тестирования и генерации JSON-файла с метаданными, результатами тестов и (опционально) скриншотами.
- **HTMLReportGenerator**: Утилита для преобразования нескольких JSON-файлов отчетов в комплексный HTML-отчет с интерактивными диаграммами, фильтрацией и функцией экспорта. Кроме того, генератор отчетов теперь поддерживает опциональный файл истории для отображения исторических данных выполнения, если они доступны. Когда исторические данные не предоставляются, отчет опускает исторический раздел и показывает только уникальные ошибки.

Эти инструменты помогают получить четкое представление о ваших тестовых прогонах, что важно для отладки и непрерывной интеграции.

## Features

- **JSON-отчетность**: Подробный отчет с временными метками, именами наборов тестов, результатами тестов, ошибками и опциональными скриншотами.
- **HTML-отчетность**: Преобразует JSON-отчеты в портативный HTML-отчет с панелью управления, диаграммами, подробным отчетом о тестах и возможностями фильтрации.
- **Экспорт в Excel**: Подробный отчет о тестах можно экспортировать в файл Excel.
- **Поддержка скриншотов**: Сохранение скриншотов для неудачных тестов (или всех тестов) в зависимости от вашей конфигурации.
- **Метаданные выполнения**: Записывает информацию о браузере, времени начала/окончания выполнения и общей продолжительности.
- **Историческое выполнение (опционально)**: Предоставьте файл истории JSON для включения исторических данных выполнения по набору тестов. Если исторические данные не предоставлены, отчет автоматически скроет этот раздел и отобразит только уникальные ошибки.
- **Генерация агрегированной истории**: JSONReporter теперь включает функцию генерации агрегированной истории. Используя статический метод `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, вы можете автоматически сканировать все файлы отчетов JSON (соответствующие шаблону `test-report-*.json`) в вашем каталоге отчетов, агрегировать результаты тестов и вычислять сравнения дефектов на основе исторических данных. Затем агрегированная запись истории добавляется в ваш файл истории и может использоваться генератором HTML-отчетов для визуализации тенденций во времени.

## Installation

Чтобы установить пакет `wdio-json-html-reporter`, выполните следующие шаги:

### 1. Install the package

Выполните следующую команду для установки пакета как зависимости для разработки:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

Убедитесь, что пакет установлен правильно, выполнив:

```bash
npm list wdio-json-html-reporter
```

Если установка прошла успешно, вы должны увидеть вывод, похожий на:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

Измените файл `wdio.conf.js` или `wdio.conf.ts`, чтобы включить пользовательский репортер:

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. Run Your Tests

Выполните ваш набор тестов WebDriverIO:

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

Помимо интеграции с WebDriverIO, вы можете запустить генератор HTML-отчетов непосредственно из командной строки, используя встроенный CLI.

**Использование:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

Например, если ваши JSON-файлы находятся в папке `test/reports/json-reports`, и вы хотите сгенерировать HTML-отчет с именем `test/reports/report.html`, вы можете выполнить:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

Если у вас также есть файл истории (например, `test/reports/history.json`), включите его как опциональный четвертый параметр:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**Примечание:**  
Функциональность CLI активируется только при передаче команды `generate-html` в качестве первого параметра. При запуске через WebDriverIO (например, с `wdio run wdio.conf.js`), логика CLI обходится.

## History Option and Aggregated History Generation

Генератор HTML-отчетов теперь поддерживает **опцию истории**. Это позволяет предоставить JSON-файл, содержащий исторические данные выполнения, которые объединяются в отчет в разделе "Историческое выполнение по набору тестов". Если файл истории предоставлен и содержит действительные данные, отчет будет отображать исторические тенденции вместе с интерактивными диаграммами и аккордеоном для каждого набора тестов. Если файл истории не передан или если файл не содержит данных о наборе тестов, отчет автоматически скроет исторический раздел и отобразит только обзор уникальных ошибок.

Кроме того, JSONReporter теперь включает функцию **генерации агрегированной истории**. С помощью статического метода `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` вы можете автоматически сканировать все файлы отчетов JSON (соответствующие шаблону `test-report-*.json`) в вашем каталоге отчетов, агрегировать результаты тестов (суммируя количество тестов и объединяя данные набора тестов) и вычислять сравнения дефектов путем сравнения с последней агрегированной записью. Вновь сгенерированная запись истории затем добавляется в указанный файл истории. Эти агрегированные исторические данные впоследствии могут использоваться генератором HTML-отчетов для предоставления исторических сведений о выполнении за несколько тестовых прогонов.

## Screenshots

### Dashboard  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### Test Results  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### Screenshots  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### Filters  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel Export  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)