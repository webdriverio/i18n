---
id: isStable
title: isStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isStable.ts
---

எலிமென்ட் நிலையானதாக (அனிமேஷனில் இல்லாத போது) அல்லது நிலையற்றதாக (அனிமேஷனில் இருக்கும் போது) இருக்கும்போது பூலியன் மதிப்பைத் திருப்பித் தரும்.

__குறிப்பு:__ இந்த கட்டளையைப் பயன்படுத்துவதற்குப் பதிலாக அனிமேஷன்களை முடக்குவதே சிறந்தது.

##### பயன்பாடு

```js
$(selector).isStable()
```

##### எடுத்துக்காட்டுகள்

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

##### திரும்பப் பெறுவது

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  எலிமென்ட் நிலையாக இருந்தால் true, நிலையற்றதாக இருந்தால் false