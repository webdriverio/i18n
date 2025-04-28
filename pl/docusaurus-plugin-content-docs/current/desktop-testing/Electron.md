---
id: electron
title: Electron
---

Electron to framework do tworzenia aplikacji desktopowych przy użyciu JavaScript, HTML i CSS. Wbudowując Chromium i Node.js do swojego pliku binarnego, Electron pozwala utrzymywać jedną bazę kodu JavaScript i tworzyć aplikacje wieloplatformowe, które działają na systemach Windows, macOS i Linux — bez konieczności posiadania doświadczenia w tworzeniu aplikacji natywnych.

WebdriverIO udostępnia zintegrowaną usługę, która upraszcza interakcję z aplikacją Electron i sprawia, że testowanie jest bardzo proste. Zalety korzystania z WebdriverIO do testowania aplikacji Electron to:

- 🚗 automatyczna konfiguracja wymaganego Chromedrivera
- 📦 automatyczne wykrywanie ścieżki aplikacji Electron - obsługuje [Electron Forge](https://www.electronforge.io/) i [Electron Builder](https://www.electron.build/)
- 🧩 dostęp do API Electron w twoich testach
- 🕵️ mockowanie API Electron poprzez API podobne do Vitest

Potrzebujesz zaledwie kilku prostych kroków, aby rozpocząć. Obejrzyj ten prosty, krok po kroku, film wprowadzający z kanału [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Lub postępuj zgodnie z przewodnikiem w następnej sekcji.

## Pierwsze kroki

Aby zainicjować nowy projekt WebdriverIO, uruchom:

```sh
npm create wdio@latest ./
```

Kreator instalacji przeprowadzi Cię przez proces. Upewnij się, że wybierzesz _"Desktop Testing - of Electron Applications"_, gdy zapyta Cię, jaki rodzaj testów chcesz wykonywać. Następnie podaj ścieżkę do skompilowanej aplikacji Electron, np. `./dist`, a potem po prostu zachowaj domyślne ustawienia lub zmodyfikuj je według własnych preferencji.

Kreator konfiguracji zainstaluje wszystkie wymagane pakiety i utworzy plik `wdio.conf.js` lub `wdio.conf.ts` z niezbędną konfiguracją do testowania aplikacji. Jeśli zgodzisz się na automatyczne wygenerowanie plików testowych, możesz uruchomić pierwszy test za pomocą `npm run wdio`.

## Ręczna konfiguracja

Jeśli już używasz WebdriverIO w swoim projekcie, możesz pominąć kreator instalacji i po prostu dodać następujące zależności:

```sh
npm install --save-dev wdio-electron-service
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

Dowiedz się więcej o tym, [jak skonfigurować usługę Electron](/docs/desktop-testing/electron/configuration), [jak mockować API Electron](/docs/desktop-testing/electron/mocking) oraz [jak uzyskać dostęp do API Electron](/docs/desktop-testing/electron/api).