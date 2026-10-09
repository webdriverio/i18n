---
id: electron
title: Electron
description: "Тестируйте приложения Electron с помощью сервиса WebdriverIO Electron, который настраивает Chromedriver, обнаруживает бинарный файл вашего приложения и позволяет мокировать API Electron."
---

Electron — это фреймворк для создания десктопных приложений с использованием JavaScript, HTML и CSS. Благодаря встраиванию Chromium и Node.js в свой бинарный файл, Electron позволяет поддерживать единую кодовую базу на JavaScript и создавать кроссплатформенные приложения, работающие в Windows, macOS и Linux, — опыт нативной разработки не требуется.

WebdriverIO предоставляет интегрированный сервис, который упрощает взаимодействие с вашим приложением Electron и делает его тестирование очень простым. Преимущества использования WebdriverIO для тестирования приложений Electron:

- 🚗 автоматическая настройка необходимого Chromedriver
- 📦 автоматическое определение пути к вашему приложению Electron — поддерживаются [Electron Forge](https://www.electronforge.io/) и [Electron Builder](https://www.electron.build/)
- 🧩 доступ к API Electron в ваших тестах
- 🕵️ мокирование API Electron с помощью API, похожего на Vitest

Чтобы начать, вам нужно выполнить всего несколько простых шагов. Посмотрите это простое пошаговое видеоруководство по началу работы на YouTube-канале [WebdriverIO](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Или следуйте руководству в следующем разделе.

## Начало работы

Чтобы создать новый проект WebdriverIO, выполните:

```sh
npm create wdio@latest ./
```

Мастер установки проведёт вас через весь процесс. Когда вас спросят, какой тип тестирования вы хотите выполнять, выберите _"Desktop Testing - of Electron, Tauri, or macOS Applications"_, а затем выберите _Electron_ при запросе фреймворка. После этого укажите путь к скомпилированному приложению Electron, например `./dist`, а затем просто оставьте значения по умолчанию или измените их по своему усмотрению.

Мастер конфигурации установит все необходимые пакеты и создаст файл `wdio.conf.js` или `wdio.conf.ts` с необходимой конфигурацией для тестирования вашего приложения. Если вы согласитесь на автоматическую генерацию тестовых файлов, вы сможете запустить свой первый тест с помощью `npm run wdio`.

## Ручная настройка

Если вы уже используете WebdriverIO в своём проекте, вы можете пропустить мастер установки и просто добавить следующие зависимости:

```sh
npm install --save-dev @wdio/electron-service
```

Затем вы можете использовать следующую конфигурацию:

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

Вот и всё 🎉

Узнайте больше о том, [как настроить сервис Electron](/docs/desktop-testing/electron/configuration), [как мокировать API Electron](/docs/desktop-testing/electron/api-reference) и [как получить доступ к API Electron](/docs/desktop-testing/electron/api).