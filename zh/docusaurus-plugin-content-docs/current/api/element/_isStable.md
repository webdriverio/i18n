---
id: isStable
title: isStable（稳定性检测）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isStable.ts
---

当元素稳定（不在动画中）或不稳定（在动画中）时返回对应的布尔值。

__注意:__ 最好是禁用动画而不是使用此命令。

##### 用法

```js
$(selector).isStable()
```

##### 示例

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
    console.log(await element.isStable()); // 输出: false

    element = await $('#has-no-animation')
    console.log(await element.isStable()); // 输出: true
});
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** 如果元素稳定则为true，不稳定则为false