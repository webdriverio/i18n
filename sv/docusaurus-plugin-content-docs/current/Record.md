---
id: record
title: Spela in tester
---

Chrome DevTools har en _Recorder_-panel som gör det möjligt för användare att spela in och spela upp automatiserade steg i Chrome. Dessa steg kan [exporteras till WebdriverIO-tester med en extension](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) vilket gör det mycket enkelt att skriva tester.

## Vad är Chrome DevTools Recorder

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) är ett verktyg som låter dig spela in och spela upp testaktiviteter direkt i webbläsaren och även exportera dem som JSON (eller exportera dem som e2e-test), samt mäta testprestanda.

Verktyget är okomplicerat, och eftersom det är integrerat i webbläsaren har vi fördelen av att inte behöva byta kontext eller hantera något tredjepartsverktyg.

## Hur man spelar in ett test med Chrome DevTools Recorder

Om du har den senaste versionen av Chrome har du redan Recorder installerad och tillgänglig. Öppna bara valfri webbplats, högerklicka och välj _"Inspect"_. I DevTools kan du öppna Recorder genom att trycka på `CMD/Control` + `Shift` + `p` och ange _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

För att börja spela in en användarresa, klicka på _"Start new recording"_, ge ditt test ett namn och använd sedan webbläsaren för att spela in ditt test:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

Nästa steg, klicka på _"Replay"_ för att kontrollera om inspelningen var framgångsrik och gör det du ville göra. Om allt är ok, klicka på [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension)-ikonen och välj _"Export as a WebdriverIO Test Script"_:

Alternativet _"Export as a WebdriverIO Test Script"_ är endast tillgängligt om du installerar [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) extensionen.

![Chrome DevTools Recorder](/img/recorder/export.gif)

Det är allt!

## Exportera inspelning

Om du exporterade flödet som ett WebdriverIO-testskript bör det ladda ner ett skript som du kan kopiera och klistra in i din testsvit. Till exempel ser inspelningen ovan ut så här:

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

Se till att kontrollera några av lokalisatorerna och vid behov ersätta dem med mer robusta [selectortyper](/docs/selectors). Du kan också exportera flödet som JSON-fil och använda paketet [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) för att omvandla det till ett faktiskt testskript.

## Nästa steg

Du kan använda detta flöde för att enkelt skapa tester för dina applikationer. Chrome DevTools Recorder har flera ytterligare funktioner, t.ex:

- [Simulera långsamt nätverk](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) eller
- [Mät prestanda för dina tester](https://developer.chrome.com/docs/devtools/recorder/#measure)

Se till att kolla in deras [dokumentation](https://developer.chrome.com/docs/devtools/recorder).