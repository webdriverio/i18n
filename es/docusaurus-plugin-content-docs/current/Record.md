---
id: record
title: Grabar pruebas
description: "Graba flujos de usuario con el Grabador de Chrome DevTools y expórtalos como pruebas de WebdriverIO."
---

Chrome DevTools tiene un panel _Recorder_ (Grabador) que permite a los usuarios grabar y reproducir pasos automatizados dentro de Chrome. Estos pasos pueden [exportarse a pruebas de WebdriverIO con una extensión](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), lo que hace que escribir pruebas sea muy fácil.

## Qué es Chrome DevTools Recorder

El [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) es una herramienta que te permite grabar y reproducir acciones de prueba directamente en el navegador y también exportarlas como JSON (o exportarlas como pruebas e2e), así como medir el rendimiento de las pruebas.

La herramienta es sencilla y, como está integrada en el navegador, tenemos la comodidad de no tener que cambiar de contexto ni lidiar con ninguna herramienta de terceros.

## Cómo grabar una prueba con Chrome DevTools Recorder

Si tienes la versión más reciente de Chrome, ya tendrás el Recorder instalado y disponible. Simplemente abre cualquier sitio web, haz clic derecho y selecciona _"Inspeccionar"_. Dentro de DevTools puedes abrir el Recorder presionando `CMD/Control` + `Shift` + `p` e introduciendo _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Para empezar a grabar un recorrido de usuario, haz clic en _"Start new recording"_, ponle un nombre a tu prueba y luego usa el navegador para grabarla:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

A continuación, haz clic en _"Replay"_ para comprobar si la grabación fue exitosa y hace lo que querías. Si todo está bien, haz clic en el icono de [exportar](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) y selecciona _"Export as a WebdriverIO Test Script"_:

La opción _"Export as a WebdriverIO Test Script"_ solo está disponible si instalas la extensión [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).


![Chrome DevTools Recorder](/img/recorder/export.gif)

¡Eso es todo!

## Exportar grabación

Si exportaste el flujo como script de prueba de WebdriverIO, se descargará un script que puedes copiar y pegar en tu suite de pruebas. Por ejemplo, la grabación anterior se ve así:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

Asegúrate de revisar algunos de los localizadores y reemplazarlos por [tipos de selectores](/docs/selectors) más robustos si es necesario. También puedes exportar el flujo como archivo JSON y usar el paquete [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) para transformarlo en un script de prueba real.

## Próximos pasos

Puedes usar este flujo para crear fácilmente pruebas para tus aplicaciones. El Chrome DevTools Recorder tiene varias funciones adicionales, por ejemplo:

- [Simular una red lenta](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) o
- [Medir el rendimiento de tus pruebas](https://developer.chrome.com/docs/devtools/recorder/#measure)

Asegúrate de consultar su [documentación](https://developer.chrome.com/docs/devtools/recorder).