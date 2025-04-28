---
id: isStable
title: isStable (پایدار بودن)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isStable.ts
---

مقدار true را زمانی که عنصر پایدار است (بدون انیمیشن) یا false را زمانی که عنصر ناپایدار است (در حال انیمیشن) برمی‌گرداند.

__توجه:__ بهتر است به جای استفاده از این دستور، انیمیشن‌ها را غیرفعال کنید.

##### استفاده

```js
$(selector).isStable()
```

##### مثال‌ها

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

```js title="isStable.js"
it('should detect if an element is stable', async () => {
    let element = await $('#has-animation');
    console.log(await element.isStable()); // outputs: false

    element = await $('#has-no-animation')
    console.log(await element.isStable()); // outputs: true
});
```

##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** true اگر عنصر پایدار باشد، false اگر ناپایدار باشد