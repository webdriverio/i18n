---
id: emulate
title: المحاكاة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

يسمح لك WebdriverIO بمحاكاة واجهات برمجة الويب باستخدام أمر `emulate`. يمكن لواجهات برمجة الويب هذه أن تتصرف تمامًا كما تحددها. النطاقات التالية مدعومة:

- `geolocation`: محاكاة واجهة برمجة تحديد الموقع الجغرافي
- `userAgent`: محاكاة وكيل المستخدم
- `colorScheme`: محاكاة نظام الألوان
- `onLine`: محاكاة حالة الاتصال بالإنترنت
- `device`: محاكاة جهاز محمول أو سطح مكتب محدد
- `clock`: محاكاة ساعة النظام

يعيد أمر `emulate` دالة يمكن استدعاؤها لإعادة تعيين المحاكاة. هذا مفيد
عندما تريد إعادة تعيين المحاكاة بعد اختبار أو مجموعة من الاختبارات.

اقرأ المزيد عن هذا في إرشادات [المحاكاة](/docs/emulation).

:::info

باستثناء نطاق `clock`، لا يمكن تغيير القيمة المحاكاة بدون إعادة تحميل الصفحة.

:::

:::info

تتطلب هذه الميزة دعم WebDriver Bidi للمتصفح. بينما تتوفر إصدارات حديثة من Chrome و Edge
و Firefox لديها مثل هذا الدعم، Safari __لا يدعم__. للحصول على التحديثات تابع [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned).
علاوة على ذلك، إذا كنت تستخدم مزود سحابي لتشغيل المتصفحات، فتأكد من أن المزود الخاص بك يدعم أيضًا WebDriver Bidi.

:::

يمكن أن يحتوي كائن `EmulationOptions` على الخصائص التالية استنادًا إلى النطاق:

| النطاق        | الخيارات                                         |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### الاستخدام

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>ميزة المتصفح التي ترغب في محاكاتها، يمكن أن تكون إما `clock` أو `geolocation` أو `userAgent` أو `colorScheme` أو `onLine`</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>خيار المحاكاة للنطاق المحدد</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### العائد

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   دالة لإعادة تعيين المحاكاة