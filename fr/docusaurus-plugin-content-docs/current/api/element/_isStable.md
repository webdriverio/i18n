---
id: isStable
title: isStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isStable.ts
---

Retournera vrai lorsque stable (sans animation) ou faux lorsque instable (avec animation).

__Remarque :__ il est préférable de désactiver les animations au lieu d'utiliser cette commande.

##### Utilisation

```js
$(selector).isStable()
```

##### Exemples

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

##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** vrai si l'élément est stable, faux s'il est instable