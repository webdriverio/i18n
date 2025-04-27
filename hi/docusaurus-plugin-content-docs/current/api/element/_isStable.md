---
id: isStable
title: isStable (स्थिर है)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isStable.ts
---

यह तब true लौटाएगा जब स्थिर हो (एनिमेशन में) या जब अस्थिर हो (एनिमेशन में नहीं)।

__नोट:__ इस कमांड का उपयोग करने के बजाय एनिमेशन को अक्षम करना सबसे अच्छा है।

##### उपयोग

```js
$(selector).isStable()
```

##### उदाहरण

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

##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true अगर एलिमेंट स्थिर है, false अगर अस्थिर है    