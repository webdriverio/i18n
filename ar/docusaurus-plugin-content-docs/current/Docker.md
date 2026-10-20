---
id: docker
title: Docker
description: "شغّل مجموعة اختبارات WebdriverIO الخاصة بك داخل حاوية Docker مع متصفح مثبت مسبقًا للحصول على نتائج متسقة عبر الأجهزة المختلفة."
---

Docker هي تقنية حاويات قوية تتيح لك تغليف مجموعة اختباراتك في حاوية تتصرف بنفس الطريقة على كل نظام. يمكن أن يساعد ذلك في تجنب عدم الاستقرار الناتج عن اختلاف إصدارات المتصفح أو المنصة. لتشغيل اختباراتك داخل حاوية، أنشئ ملف `Dockerfile` في مجلد مشروعك، على سبيل المثال:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # غيّر المتصفح والإصدار وفقًا لاحتياجاتك
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

تأكد من عدم تضمين مجلد `node_modules` في صورة Docker الخاصة بك، وأن يتم تثبيت الحزم أثناء بناء الصورة. لذلك أضف ملف `.dockerignore` بالمحتوى التالي:

```
node_modules
```

:::info
نستخدم هنا صورة Docker تأتي مع Selenium وGoogle Chrome مثبتين مسبقًا. تتوفر صور مختلفة بإعدادات متصفحات وإصدارات متصفحات متنوعة. اطلع على الصور التي يديرها مشروع Selenium [على Docker Hub](https://hub.docker.com/u/selenium).
:::

بما أنه لا يمكننا تشغيل Google Chrome إلا في الوضع بدون واجهة (headless) داخل حاوية Docker، علينا تعديل ملف `wdio.conf.js` لضمان ذلك:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

كما ذُكر في [بروتوكولات الأتمتة](/docs/automationProtocols)، يمكنك تشغيل WebdriverIO باستخدام بروتوكول WebDriver أو بروتوكول WebDriver BiDi. تأكد من أن إصدار Chrome المثبت في صورتك يتطابق مع إصدار [Chromedriver](https://www.npmjs.com/package/chromedriver) الذي حددته في ملف `package.json` الخاص بك.

لبناء حاوية Docker يمكنك تشغيل:

```sh
docker build -t mytest -f Dockerfile .
```

ثم لتشغيل الاختبارات، نفّذ:

```sh
docker run -it mytest
```

لمزيد من المعلومات حول كيفية إعداد صورة Docker، اطلع على [وثائق Docker](https://docs.docker.com/).

## الصور التي يقوم فيها WebdriverIO بتنزيل المتصفح

عندما لا تحتوي الصورة على متصفح، يقوم WebdriverIO بتنزيل Chrome وChromium وFirefox وChromedriver بنفسه. تأتي Chrome وChromium وChromedriver كملفات zip، ويقوم WebdriverIO باستخراجها باستخدام الأمر `unzip` على Linux وmacOS (و`tar.exe` أو PowerShell على Windows). لا تحتوي الصور المصغّرة، مثل `node:24-slim`، وصور Alpine البسيطة على `unzip`، لذا قم بتثبيته في ملف `Dockerfile` الخاص بك:

```Dockerfile
FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/*
```

على Alpine، استخدم `RUN apk add --no-cache unzip`. بدونه، يفشل التنزيل مع الخطأ `Extraction failed: no zip archiver is available`.