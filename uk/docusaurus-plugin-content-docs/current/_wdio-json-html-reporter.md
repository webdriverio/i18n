---
id: wdio-json-html-reporter
title: JSON HTML Reporter Reporter
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter є пакетом стороннього розробника, для отримання додаткової інформації перегляньте [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

Це користувацький репортер WebDriverIO, який генерує детальні JSON-звіти під час виконання тестів та надає портативний генератор HTML-звітів для візуалізації результатів тестування. Він записує часові мітки, метадані виконання та може робити знімки екрана за потреби. Пакет відповідає конвенції WebDriverIO для репортерів і опублікований як npm-пакет під назвою `wdio-json-html-reporter`.

## Зміст

- [Огляд](#overview)
- [Особливості](#features)
- [Встановлення](#installation)
  - [1. Встановіть пакет](#1-install-the-package)
  - [2. Перевірте встановлення](#2-verify-installation)
  - [3. Оновіть конфігурацію WebDriverIO](#3-update-webdriverio-configuration)
  - [4. Запустіть тести](#4-run-your-tests)
- [Використання CLI](#cli-usage)
- [Опція історії та генерація агрегованої історії](#history-option-and-aggregated-history-generation)
- [Знімки екрана](#screenshots)

## Overview

WDIO JSON HTML REPORTER надає два основні компоненти:

- **JSONReporter**: Користувацький репортер, який розширює інтерфейс репортера WebDriverIO для збору тестових подій та генерації JSON-файлу з метаданими, результатами тестів та (опціонально) знімками екрана.
- **HTMLReportGenerator**: Утиліта для перетворення кількох JSON-файлів звітів у комплексний HTML-звіт з інтерактивними діаграмами, фільтрацією та функціями експорту. Крім того, генератор звітів тепер підтримує опціональний файл історії для відображення історичних даних виконання, якщо вони доступні. Коли історичні дані не надаються, звіт опускає історичний розділ і показує лише унікальні помилки.

Ці інструменти допомагають отримати чітке розуміння ваших тестових запусків, що важливо для налагодження та безперервної інтеграції.

## Features

- **JSON-звітність**: Детальний звіт із часовими мітками, назвами набору тестів, результатами тестів, помилками та опціональними знімками екрана.
- **HTML-звітність**: Перетворює JSON-звіти у портативний HTML-звіт з панеллю інструментів, діаграмами, детальним звітом про тестування та можливостями фільтрації.
- **Експорт в Excel**: Детальний звіт тестування можна експортувати у файл Excel.
- **Підтримка знімків екрана**: Зйомка знімків екрана для невдалих тестів (або всіх тестів) на основі вашої конфігурації.
- **Метадані виконання**: Реєструє інформацію про браузер, час початку/закінчення виконання та загальну тривалість.
- **Історія виконання (опціонально)**: Надайте файл історії JSON для включення історичних даних виконання за набором. Якщо історичні дані не надаються, звіт автоматично приховає цей розділ і відображатиме лише унікальні помилки.
- **Генерація агрегованої історії**: JSONReporter тепер включає функцію генерації агрегованої історії. Використовуючи статичний метод `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, ви можете автоматично сканувати всі файли звітів JSON (що відповідають шаблону `test-report-*.json`) у вашому каталозі звітів, агрегувати результати тестів та обчислювати порівняння дефектів на основі історичних даних. Запис агрегованої історії потім додається до вашого файлу історії і може використовуватися генератором HTML-звітів для візуалізації тенденцій з часом.

## Installation

Щоб встановити пакет `wdio-json-html-reporter`, виконайте такі кроки:

### 1. Install the package

Виконайте наступну команду, щоб встановити пакет як залежність розробки:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

Переконайтеся, що пакет встановлено правильно, виконавши:

```bash
npm list wdio-json-html-reporter
```

Якщо встановлено правильно, ви повинні побачити вивід, подібний до:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

Змініть файл `wdio.conf.js` або `wdio.conf.ts`, щоб включити власний репортер:

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

Виконайте свій набір тестів WebDriverIO:

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

Окрім інтеграції з WebDriverIO, ви можете запустити генератор HTML-звітів безпосередньо з командного рядка, використовуючи вбудований CLI.

**Використання:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

Наприклад, якщо у вас є JSON-файли в папці з назвою `test/reports/json-reports` і ви хочете створити HTML-звіт з назвою `test/reports/report.html`, ви можете виконати:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

Якщо у вас також є файл історії (наприклад, `test/reports/history.json`), включіть його як опціональний четвертий параметр:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**Примітка:**  
Функціональність CLI спрацьовує лише коли ви передаєте команду `generate-html` як перший параметр. При запуску через WebDriverIO (наприклад, з `wdio run wdio.conf.js`), логіка CLI обходиться.

## History Option and Aggregated History Generation

Генератор HTML-звітів тепер підтримує **опцію історії**. Це дозволяє надати JSON-файл, який містить історичні дані виконання, які об'єднуються у звіті в розділі "Історичне виконання за набором". Якщо файл історії надається і містить дійсні дані, звіт відображатиме історичні тенденції разом з інтерактивними діаграмами та акордеоном для кожного набору. Якщо файл історії не передається або файл не містить жодних даних про набір, звіт автоматично приховає історичний розділ і відображатиме лише огляд унікальних помилок.

Крім того, JSONReporter тепер включає функцію **генерації агрегованої історії**. За допомогою статичного методу `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` ви можете автоматично сканувати всі файли JSON-звітів (що відповідають шаблону `test-report-*.json`) у вашому каталозі звітів, агрегувати результати тестів (підсумовуючи кількість тестів та об'єднуючи дані набору) та обчислювати порівняння дефектів, порівнюючи з останнім агрегованим записом. Новостворений запис історії потім додається до вказаного файлу історії. Ці агреговані історичні дані можуть згодом використовуватися генератором HTML-звітів для надання історичних даних виконання протягом кількох тестових запусків.

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