---
id: isStable
title: isStable（安定性確認）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isStable.ts
---

要素が安定している（アニメーション中でない）か、不安定（アニメーション中）かによって、trueまたはfalseを返します。

__注意:__ このコマンドを使用するよりも、アニメーションを無効にする方が良いでしょう。

##### 使用方法

```js
$(selector).isStable()
```

##### 例

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

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  要素が安定している場合はtrue、不安定な場合はfalse