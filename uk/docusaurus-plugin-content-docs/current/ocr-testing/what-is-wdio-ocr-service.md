---
id: ocr-testing
title: Тестування OCR
---

Автоматизоване тестування на мобільних нативних додатках та сайтах для комп'ютерів може бути особливо складним, коли маєш справу з елементами, які не мають унікальних ідентифікаторів. Стандартні [селектори WebdriverIO](https://webdriver.io/docs/selectors) не завжди можуть допомогти. Тут на допомогу приходить `@wdio/ocr-service` — потужний сервіс, який використовує OCR ([Оптичне розпізнавання символів](https://en.wikipedia.org/wiki/Optical_character_recognition)) для пошуку, очікування та взаємодії з елементами на екрані на основі їхнього **видимого тексту**.

Наступні користувацькі команди будуть надані та додані до об'єкта `browser/driver`, щоб ви отримали правильний набір інструментів для виконання своєї роботи.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Як це працює

Цей сервіс:

1. створить знімок екрану вашого пристрою. (За потреби ви можете вказати область пошуку — елемент або об'єкт прямокутника, щоб вказати конкретну область. Дивіться документацію для кожної команди.)
1. оптимізує результат для OCR, перетворюючи знімок екрану на чорно-білий з високим контрастом (високий контраст потрібен для запобігання фонового шуму зображення. Це можна налаштувати для кожної команди.)
1. використовує [Оптичне розпізнавання символів](https://en.wikipedia.org/wiki/Optical_character_recognition) з [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) для отримання всього тексту з екрану та виділення всього знайденого тексту на зображенні. Підтримує кілька мов, які можна знайти [тут.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. використовує нечітку логіку з [Fuse.js](https://fusejs.io/) для пошуку рядків, які _приблизно дорівнюють_ заданому шаблону (а не точно). Це означає, наприклад, що пошукове значення `Username` також може знайти текст `Usename` або навпаки.
1. Надає CLI майстер (`npx ocr-service`) для перевірки ваших зображень та отримання тексту через термінал

Приклад кроків 1, 2 та 3 можна побачити на цьому зображенні

![Process steps](/img/ocr/processing-steps.jpg)

Працює з **НУЛЬОВИМИ** системними залежностями (крім тих, які використовує WebdriverIO), але за потреби може також працювати з локальною інсталяцією [Tesseract](https://tesseract-ocr.github.io/tessdoc/), що значно зменшить час виконання! (Також дивіться [Оптимізацію виконання тестів](#test-execution-optimization) про те, як прискорити ваші тести.)

Зацікавились? Почніть використовувати вже сьогодні, дотримуючись інструкцій [Початок роботи](./getting-started).

:::caution Важливо
Існує безліч причин, через які ви можете не отримати якісного результату від Tesseract. Одна з найбільших причин, яка може бути пов'язана з вашим додатком та цим модулем, полягає в тому, що немає належного кольорового розрізнення між текстом, який потрібно знайти, та фоном. Наприклад, білий текст на темному фоні можна _легко_ знайти, але світлий текст на білому фоні або темний текст на темному фоні навряд чи можна виявити.

Див. також [цю сторінку](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) для отримання додаткової інформації від Tesseract.

Також не забудьте прочитати [FAQ](./ocr-faq).
:::