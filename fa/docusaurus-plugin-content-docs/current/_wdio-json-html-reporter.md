---
id: wdio-json-html-reporter
title: گزارشگر JSON HTML Reporter
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---


> wdio-json-html-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter) مراجعه کنید

این یک گزارشگر سفارشی WebDriverIO است که گزارش‌های دقیق JSON را در حین اجرای تست تولید می‌کند و یک سازنده گزارش HTML قابل حمل برای نمایش نتایج تست شما فراهم می‌کند. این گزارشگر زمان‌های اجرا، متادیتای اجرا را ثبت می‌کند و می‌تواند در صورت نیاز اسکرین‌شات تهیه کند. این پکیج از قراردادهای WebDriverIO برای گزارشگرها پیروی می‌کند و به عنوان یک پکیج npm با نام `wdio-json-html-reporter` منتشر شده است.

## فهرست مطالب

- [نمای کلی](#overview)
- [ویژگی‌ها](#features)
- [نصب](#installation)
  - [1. نصب پکیج](#1-install-the-package)
  - [2. تأیید نصب](#2-verify-installation)
  - [3. به‌روزرسانی تنظیمات WebDriverIO](#3-update-webdriverio-configuration)
  - [4. اجرای تست‌های خود](#4-run-your-tests)
- [استفاده از CLI](#cli-usage)
- [گزینه تاریخچه و تولید تاریخچه تجمعی](#history-option-and-aggregated-history-generation)
- [اسکرین‌شات‌ها](#screenshots)

## نمای کلی

WDIO JSON HTML REPORTER دو جزء اصلی را ارائه می‌دهد:

- **JSONReporter**: یک گزارشگر سفارشی که رابط گزارشگر WebDriverIO را توسعه می‌دهد تا رویدادهای تست را جمع‌آوری کند و یک فایل JSON با متادیتا، نتایج تست و (اختیاری) اسکرین‌شات‌ها تولید کند.
- **HTMLReportGenerator**: یک ابزار برای تبدیل چندین فایل گزارش JSON به یک گزارش HTML جامع با نمودارهای تعاملی، فیلترینگ و قابلیت خروجی‌گیری. علاوه بر این، سازنده گزارش اکنون از یک فایل تاریخچه اختیاری پشتیبانی می‌کند تا در صورت موجود بودن، داده‌های تاریخی اجرا را نمایش دهد. هنگامی که هیچ داده تاریخی ارائه نشده باشد، گزارش بخش تاریخی را حذف می‌کند و فقط خطاهای منحصر به فرد را نشان می‌دهد.

این ابزارها به شما کمک می‌کنند بینش واضحی از اجرای تست‌های خود کسب کنید، که برای اشکال‌زدایی و یکپارچه‌سازی مداوم ضروری است.

## ویژگی‌ها

- **گزارش‌دهی JSON**: گزارش دقیق با زمان‌ها، نام‌های مجموعه آزمون، نتایج تست، خطاها و اسکرین‌شات‌های اختیاری.
- **گزارش‌دهی HTML**: گزارش‌های JSON را به یک گزارش HTML قابل حمل با داشبورد، نمودارها، گزارش تست دقیق و قابلیت‌های فیلترینگ تبدیل می‌کند.
- **خروجی به اکسل**: گزارش دقیق تست می‌تواند به یک فایل اکسل صادر شود.
- **پشتیبانی از اسکرین‌شات**: تهیه اسکرین‌شات برای تست‌های ناموفق (یا همه تست‌ها) بر اساس پیکربندی شما.
- **متادیتای اجرا**: اطلاعات مرورگر، زمان‌های شروع/پایان اجرا و مدت زمان کلی را ثبت می‌کند.
- **تاریخچه اجرا (اختیاری)**: برای گنجاندن داده‌های تاریخی اجرا بر اساس مجموعه آزمون، یک فایل تاریخچه JSON ارائه دهید. اگر هیچ داده تاریخی ارائه نشود، گزارش به طور خودکار این بخش را پنهان می‌کند و فقط خطاهای منحصر به فرد را نمایش می‌دهد.
- **تولید تاریخچه تجمعی**: گزارشگر JSON اکنون شامل یک ویژگی تولید تاریخچه تجمعی است. با استفاده از متد استاتیک `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` می‌توانید به طور خودکار همه فایل‌های گزارش JSON (مطابق با الگوی `test-report-*.json`) را در دایرکتوری گزارش خود اسکن کنید، نتایج تست را تجمیع کنید و مقایسه‌های نقص را بر اساس داده‌های تاریخی محاسبه کنید. رکورد تاریخچه تجمعی سپس به فایل تاریخچه شما اضافه می‌شود و می‌تواند توسط سازنده گزارش HTML برای نمایش روندها در طول زمان استفاده شود.

## نصب

برای نصب پکیج `wdio-json-html-reporter`، این مراحل را دنبال کنید:

### 1. نصب پکیج

دستور زیر را برای نصب پکیج به عنوان وابستگی توسعه اجرا کنید:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. تأیید نصب

اطمینان حاصل کنید که پکیج به درستی نصب شده است با اجرای:

```bash
npm list wdio-json-html-reporter
```

اگر به درستی نصب شده باشد، باید خروجی مشابه زیر را ببینید:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. به‌روزرسانی تنظیمات WebDriverIO

فایل `wdio.conf.js` یا `wdio.conf.ts` خود را برای افزودن گزارشگر سفارشی تغییر دهید:

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

### 4. اجرای تست‌های خود

مجموعه تست WebDriverIO خود را اجرا کنید:

```bash
npx wdio run wdio.conf.js
```

## استفاده از CLI

علاوه بر یکپارچه‌سازی با WebDriverIO، می‌توانید سازنده گزارش HTML را مستقیماً از خط فرمان با استفاده از CLI داخلی اجرا کنید.

**استفاده:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

به عنوان مثال، اگر فایل‌های JSON شما در پوشه‌ای به نام `test/reports/json-reports` هستند و می‌خواهید یک گزارش HTML به نام `test/reports/report.html` ایجاد کنید، می‌توانید اجرا کنید:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

اگر همچنین یک فایل تاریخچه دارید (مثلاً `test/reports/history.json`)، آن را به عنوان یک پارامتر چهارم اختیاری اضافه کنید:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**توجه:**  
عملکرد CLI تنها زمانی فعال می‌شود که دستور `generate-html` را به عنوان اولین پارامتر ارسال کنید. هنگام اجرا از طریق WebDriverIO (مثلاً با `wdio run wdio.conf.js`)، منطق CLI نادیده گرفته می‌شود.

## گزینه تاریخچه و تولید تاریخچه تجمعی

سازنده گزارش HTML اکنون از یک **گزینه تاریخچه** پشتیبانی می‌کند. این به شما امکان می‌دهد یک فایل JSON حاوی داده‌های تاریخی اجرا را ارائه دهید که در بخش "تاریخچه اجرا بر اساس مجموعه آزمون" در گزارش ادغام می‌شود. اگر فایل تاریخچه ارائه شده باشد و حاوی داده‌های معتبر باشد، گزارش روندهای تاریخی را همراه با نمودارهای تعاملی و یک آکاردئون برای هر مجموعه آزمون نمایش می‌دهد. اگر هیچ فایل تاریخچه‌ای ارسال نشود یا اگر فایل حاوی هیچ داده مجموعه آزمونی نباشد، گزارش به طور خودکار بخش تاریخی را پنهان می‌کند و فقط نمای کلی خطاهای منحصر به فرد را نمایش می‌دهد.

علاوه بر این، گزارشگر JSON اکنون شامل یک ویژگی **تولید تاریخچه تجمعی** است. با متد استاتیک `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` می‌توانید به طور خودکار همه فایل‌های گزارش JSON (مطابق با الگوی `test-report-*.json`) را در دایرکتوری گزارش خود اسکن کنید، نتایج تست را تجمیع کنید (جمع‌آوری شمارش تست‌ها و ادغام داده‌های مجموعه آزمون) و مقایسه‌های نقص را با مقایسه با آخرین رکورد تجمعی محاسبه کنید. رکورد تاریخچه تازه تولید شده سپس به فایل تاریخچه مشخص شده اضافه می‌شود. این داده‌های تاریخچه تجمعی می‌تواند متعاقباً توسط سازنده گزارش HTML استفاده شود تا بینش‌های تاریخی اجرا را در طول چندین اجرای تست ارائه دهد.

## اسکرین‌شات‌ها

### داشبورد  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### نتایج تست  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### اسکرین‌شات‌ها  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### فیلترها  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### خروجی اکسل  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)