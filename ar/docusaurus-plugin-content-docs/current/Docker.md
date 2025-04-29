---
id: docker
title: دوكر
---

دوكر هو تقنية حاويات قوية تسمح بتغليف مجموعة اختباراتك في حاوية تعمل بنفس الطريقة على كل نظام. يمكن أن يساعد ذلك في تجنب المشكلات بسبب اختلاف إصدارات المتصفح أو المنصة. لتشغيل اختباراتك داخل حاوية، قم بإنشاء ملف `Dockerfile` في دليل مشروعك، على سبيل المثال:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

تأكد من عدم تضمين `node_modules` في صورة دوكر الخاصة بك وقم بتثبيتها عند بناء الصورة. لذلك أضف ملف `.dockerignore` بالمحتوى التالي:

```
node_modules
```

:::info
نحن نستخدم هنا صورة دوكر تأتي مع Selenium و Google Chrome مثبتين مسبقًا. هناك العديد من الصور المتاحة مع إعدادات متصفح مختلفة وإصدارات متصفح. تحقق من الصور التي يديرها مشروع Selenium [على Docker Hub](https://hub.docker.com/u/selenium).
:::

نظرًا لأننا يمكننا تشغيل Google Chrome فقط في وضع بدون رأس في حاوية دوكر، يجب علينا تعديل ملف `wdio.conf.js` للتأكد من القيام بذلك:

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

كما ذكرنا في [بروتوكولات الأتمتة](/docs/automationProtocols) يمكنك تشغيل WebdriverIO باستخدام بروتوكول WebDriver أو بروتوكول WebDriver BiDi. تأكد من أن إصدار Chrome المثبت على صورتك يتطابق مع إصدار [Chromedriver](https://www.npmjs.com/package/chromedriver) الذي حددته في ملف `package.json`.

لبناء حاوية دوكر يمكنك تشغيل:

```sh
docker build -t mytest -f Dockerfile .
```

ثم لتشغيل الاختبارات، قم بتنفيذ:

```sh
docker run -it mytest
```

لمزيد من المعلومات حول كيفية تكوين صورة دوكر، راجع [وثائق دوكر](https://docs.docker.com/).