---
id: waitForStable
title: انتظر حتى يستقر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

انتظر العنصر للمدة المحددة من الميلي ثانية حتى يستقر (لا يتحرك). يُرجع القيمة true إذا كان المحدد
يطابق على الأقل عنصرًا واحدًا مستقرًا في DOM، وإلا فإنه يُطلق
خطأ. إذا كانت علامة reverse صحيحة، فستعيد الأمر بدلاً من ذلك القيمة true
إذا كان المحدد لا يطابق أي عناصر مستقرة.

__ملاحظة:__ من الأفضل تعطيل الرسوم المتحركة بدلاً من استخدام هذا الأمر

##### الاستخدام

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`WaitForOptions`</td>
      <td>خيارات waitForStable (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الوقت بالميلي ثانية (الإعداد الافتراضي يعتمد على قيمة التكوين [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>إذا كانت القيمة true فإنه ينتظر العكس (الافتراضي: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>إذا كانت موجودة فإنها تلغي رسالة الخطأ الافتراضية</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>الفاصل الزمني بين عمليات التحقق (الافتراضي: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```html title="index.html"
<head>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: red;
        }
        #has-animation {
            animation: 3s 0s alternate slidein;
        }
        @keyframes slidein {
            from {
                margin-left: 100%;
                width: 300%;
            }

            to {
                margin-left: 0%;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div #has-animation></div>
    <div #has-no-animation></div>
</body>

```

```js title="waitForStable.js"
it('should detect that element is instable and will wait for the element to become stable', async () => {
    const elem = await $('#has-animation')
    await elem.waitForStable({ timeout: 3000 });
});
it('should detect that element is stable and will not wait', async () => {
    const elem = await $('#has-no-animation')
    await elem.waitForStable();
});
```

##### العوائد

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  القيمة true إذا كان العنصر مستقرًا    