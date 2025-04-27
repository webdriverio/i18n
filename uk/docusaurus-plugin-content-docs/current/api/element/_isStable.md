---
id: isStable
title: isStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isStable.ts
---

Поверне true, коли елемент стабільний (не в анімації) або false, коли нестабільний (в анімації).

__Примітка:__ краще вимкнути анімації замість використання цієї команди.

##### Використання

```js
$(selector).isStable()
```

##### Приклади

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

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true, якщо елемент стабільний, false, якщо нестабільний