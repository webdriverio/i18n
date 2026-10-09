---
id: electron
title: Electron
description: "Testuj aplikacje Electron za pomocą usługi WebdriverIO Electron, która konfiguruje Chromedriver, wykrywa plik binarny Twojej aplikacji i pozwala mockować API Electrona."
---

Electron to framework do tworzenia aplikacji desktopowych przy użyciu JavaScript, HTML i CSS. Dzięki osadzeniu Chromium i Node.js w swoim pliku binarnym Electron pozwala utrzymywać jedną bazę kodu JavaScript i tworzyć wieloplatformowe aplikacje działające na systemach Windows, macOS i Linux — bez potrzeby posiadania doświadczenia w natywnym programowaniu.

WebdriverIO zapewnia zintegrowaną usługę, która upraszcza interakcję z Twoją aplikacją Electron i sprawia, że jej testowanie jest bardzo proste. Zalety korzystania z WebdriverIO do testowania aplikacji Electron to:

- 🚗 automatyczna konfiguracja wymaganego Chromedrivera
- 📦 automatyczne wykrywanie ścieżki do Twojej aplikacji Electron - obsługuje [Electron Forge](https://www.electronforge.io/) oraz [Electron Builder](https://www.electron.build/)
- 🧩 dostęp do API Electrona w Twoich testach
- 🕵️ mockowanie API Electrona za pomocą API podobnego do Vitest

Wystarczy kilka prostych kroków, aby zacząć. Obejrzyj ten prosty samouczek wideo krok po kroku na kanale [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Lub postępuj zgodnie z przewodnikiem w poniższej sekcji.

## Pierwsze kroki

Aby zainicjować nowy projekt WebdriverIO, uruchom:

```sh
npm create wdio@latest ./
```

Kreator instalacji przeprowadzi Cię przez cały proces. Gdy zostaniesz zapytany, jaki rodzaj testów chcesz przeprowadzać, wybierz _"Desktop Testing - of Electron, Tauri, or macOS Applications"_, a następnie wybierz _Electron_ w pytaniu o framework. Potem podaj ścieżkę do skompilowanej aplikacji Electron, np. `./dist`, a następnie po prostu pozostaw wartości domyślne lub zmodyfikuj je według własnych preferencji.

Kreator konfiguracji zainstaluje wszystkie wymagane pakiety i utworzy plik `wdio.conf.js` lub `wdio.conf.ts` z konfiguracją niezbędną do testowania Twojej aplikacji. Jeśli zgodzisz się na automatyczne wygenerowanie plików testowych, możesz uruchomić swój pierwszy test za pomocą `npm run wdio`.

## Konfiguracja ręczna

Jeśli korzystasz już z WebdriverIO w swoim projekcie, możesz pominąć kreator instalacji i po prostu dodać następujące zależności:

```sh
npm install --save-dev @wdio/electron-service
```

Następnie możesz użyć następującej konfiguracji:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

To wszystko 🎉

Dowiedz się więcej o tym, [jak skonfigurować usługę Electron](/docs/desktop-testing/electron/configuration), [jak mockować API Electrona](/docs/desktop-testing/electron/api-reference) oraz [jak uzyskać dostęp do API Electrona](/docs/desktop-testing/electron/api).