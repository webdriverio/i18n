---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

Element jest uznawany za klikalny, gdy spełnione są następujące warunki:

- element istnieje
- element jest wyświetlany
- element nie jest wyłączony
- element znajduje się w obszarze widocznym
- element może zostać przewinięty do obszaru widocznego
- środek elementu nie jest przykryty przez inny element

w przeciwnym razie zwraca false.

:::info

Należy pamiętać, że `isClickable` działa tylko w przeglądarkach internetowych i w mobilnych webview,
nie działa w natywnym kontekście aplikacji mobilnej. Ponadto, w przeciwieństwie do innych poleceń elementów,
WebdriverIO nie będzie czekać na istnienie elementu, aby wykonać to polecenie.

:::

##### Użycie

```js
$(selector).isClickable()
```

##### Przykład

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true jeśli element jest klikalny