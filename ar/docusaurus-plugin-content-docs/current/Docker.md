---
id: docker
title: دوكر
---

دوكر هو تقنية حاويات قوية تسمح بتغليف مجموعة اختباراتك في حاوية تتصرف بنفس الطريقة على كل نظام. يمكن أن يساعد ذلك في تجنب عدم الاستقرار الناجم عن اختلاف إصدارات المتصفح أو النظام الأساسي. لتشغيل اختباراتك داخل حاوية، قم بإنشاء ملف `Dockerfile` في دليل مشروعك، على سبيل المثال:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

تأكد من عدم تضمين `node_modules` في صورة Docker الخاصة بك وتثبيت هذه الوحدات عند بناء الصورة. لذلك أضف ملف `.dockerignore` بالمحتوى التالي:

```
node_modules
```

:::info
نحن نستخدم هنا صورة Docker تأتي مع Selenium و Google Chrome مثبتين مسبقًا. هناك العديد من الصور المتاحة بإعدادات متصفح مختلفة وإصدارات متصفح مختلفة. تحقق من الصور التي يحتفظ بها مشروع Selenium [على Docker Hub](https://hub.docker.com/u/selenium).
:::

بما أننا يمكننا فقط تشغيل Google Chrome في وضع بدون واجهة في حاوية Docker، علينا تعديل ملف `wdio.conf.js` لضمان القيام بذلك:

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

كما ذكرنا في [بروتوكولات الأتمتة](/docs/automationProtocols) يمكنك تشغيل WebdriverIO باستخدام بروتوكول WebDriver أو بروتوكول WebDriver BiDi. تأكد من أن إصدار Chrome المثبت على صورتك يتطابق مع إصدار [Chromedriver](https://www.npmjs.com/package/chromedriver) الذي حددته في ملف `package.json` الخاص بك.

لبناء حاوية Docker يمكنك تشغيل:

```sh
docker build -t mytest -f Dockerfile .
```

ثم لتشغيل الاختبارات، نفذ:

```sh
docker run -it mytest
```

لمزيد من المعلومات حول كيفية تكوين صورة Docker، راجع [وثائق Docker](https://docs.docker.com/).