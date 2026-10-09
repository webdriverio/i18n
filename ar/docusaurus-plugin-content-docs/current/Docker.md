---
id: docker
title: Docker
description: "شغّل مجموعة اختبارات WebdriverIO الخاصة بك داخل حاوية Docker مع متصفح مثبت مسبقًا للحصول على نتائج متسقة عبر الأجهزة المختلفة."
---

Docker هي تقنية حاويات قوية تتيح لك تغليف مجموعة اختباراتك داخل حاوية تتصرف بالطريقة نفسها على كل نظام. يمكن لذلك أن يجنّبك عدم استقرار الاختبارات الناتج عن اختلاف إصدارات المتصفح أو المنصة. لتشغيل اختباراتك داخل حاوية، أنشئ ملف `Dockerfile` في مجلد مشروعك، على سبيل المثال:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # غيّر المتصفح والإصدار حسب احتياجاتك
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

تأكد من عدم تضمين مجلد `node_modules` في صورة Docker الخاصة بك، وأن يتم تثبيت الحزم أثناء بناء الصورة. لتحقيق ذلك، أضف ملف `.dockerignore` بالمحتوى التالي:

```
node_modules
```

:::info
نستخدم هنا صورة Docker تأتي مع Selenium وGoogle Chrome مثبتين مسبقًا. تتوفر صور متنوعة بإعدادات متصفحات وإصدارات مختلفة. اطّلع على الصور التي يديرها مشروع Selenium [على Docker Hub](https://hub.docker.com/u/selenium).
:::

بما أنه لا يمكننا تشغيل Google Chrome إلا في الوضع الخفي (headless) داخل حاوية Docker، يجب علينا تعديل ملف `wdio.conf.js` لضمان ذلك:

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

كما ذُكر في [بروتوكولات الأتمتة](/docs/automationProtocols)، يمكنك تشغيل WebdriverIO باستخدام بروتوكول WebDriver أو بروتوكول WebDriver BiDi. تأكد من أن إصدار Chrome المثبت على صورتك يطابق إصدار [Chromedriver](https://www.npmjs.com/package/chromedriver) الذي حددته في ملف `package.json`.

لبناء حاوية Docker، يمكنك تشغيل:

```sh
docker build -t mytest -f Dockerfile .
```

ثم لتشغيل الاختبارات، نفّذ:

```sh
docker run -it mytest
```

لمزيد من المعلومات حول كيفية تكوين صورة Docker، راجع [وثائق Docker](https://docs.docker.com/).