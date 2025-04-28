---
id: clock
title: كائن الساعة
---

يمكنك تعديل ساعة نظام المتصفح باستخدام أمر [`emulate`](/docs/emulation). يقوم هذا الأمر بتجاوز الدوال العالمية الأصلية المتعلقة بالوقت مما يسمح بالتحكم بها بشكل متزامن عبر `clock.tick()` أو كائن الساعة الناتج. وهذا يشمل التحكم في:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

تبدأ الساعة عند بداية عصر يونكس (الطابع الزمني 0). هذا يعني أنه عندما تقوم بإنشاء كائن Date جديد في تطبيقك، سيكون له وقت 1 يناير 1970 إذا لم تمرر أي خيارات أخرى إلى أمر `emulate`.

## مثال

عند استدعاء `browser.emulate('clock', { ... })` سيتم على الفور استبدال الدوال العالمية للصفحة الحالية وكذلك جميع الصفحات التالية، على سبيل المثال:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('http://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

يمكنك تعديل وقت النظام عن طريق استدعاء [`setSystemTime`](/docs/api/clock/setSystemTime) أو [`tick`](/docs/api/clock/tick).