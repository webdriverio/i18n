---
id: targets
title: Цели сессии
description: Откройте браузер, мобильное приложение, десктопное приложение, приложение Electron или облачное устройство с помощью wdio session.
---

`wdio session open` запускает сессию. Первый аргумент — это цель. Используйте повторно сессию `default`. Передавайте `-s <name>` только тогда, когда вам нужны две сессии одновременно. Сначала выполните `npx wdio session doctor <target>`, если цели требуется Appium, десктопный драйвер или облачные учётные данные.

Плееры Chrome, Android и Electron управляют одним и тем же [демо-приложением WebdriverIO](https://github.com/webdriverio/native-demo-app) (подопытное приложение на Expo, тег `v2.2.0`). Chrome и Electron используют локальный веб-сервер Expo в обычном десктопном окне. Android устанавливает [релизный apk v2.2.0](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). iOS устанавливает приложение для симулятора v2.2.0 (`org.wdiodemoapp`) и использует `touchId`. Каждый плеер вводит команду, после чего окно показывает результат. Поставьте на паузу или перейдите к предыдущей или следующей команде, чтобы прочитать строку, которая изменила окно.

Общий сценарий таков: открыть приложение, войти как `alice@webdriver.io` / `supersecret`, добраться до логотипа-робота («You found me!!!»), а затем собрать пазл из 9 частей. Chrome и Electron также задают местоположение и ночное время на экране Weather, открывают встроенный WebView с главной страницей WebdriverIO и перетаскивают карусель. Плеер Android прокручивает нативный экран свайпа до этого робота. `export` записывает спецификацию Mocha для той сессии, которой вы только что управляли.

<a id="postcard"></a>

## Браузеры

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome открывается в headless-режиме. Добавьте `--headed`, чтобы показать окно. Chrome, Firefox и Edge загружаются при первом использовании, если они не установлены. Safari требует macOS.

### User agent в headless-режиме

Headless Chrome и Edge представляются в user agent как `HeadlessChrome/<version>`. Видимое окно того же браузера отправляет `Chrome/<version>`. Многие сайты отклоняют запросы с headless-токеном: Akamai отвечает «Access Denied», а Cloudflare показывает «Just a moment...». Они принимают решение на основе запроса, ещё до запуска каких-либо скриптов страницы. В результате агент увидел бы страницу блокировки, которую человек, открывающий тот же сайт, никогда не получает.

Поэтому сессия headless Chrome или Edge отправляет тот user agent, который отправило бы видимое окно того же браузера. Это меняет только токен. Автоматизация при этом не скрывается:

- `navigator.webdriver` остаётся `true`.
- Собственные маркеры chromedriver по-прежнему присутствуют на странице.
- Сайты, проверяющие наличие автоматизации, всё равно её видят.

Пока user agent переопределён, Chrome не отправляет клиентские подсказки user agent (client hints), поэтому `navigator.userAgentData.brands` пуст. Переопределение требует WebDriver BiDi, поэтому сессия, открытая с `--no-bidi`, сохраняет headless user agent.

Чтобы отправить конкретный user agent, передайте его как аргумент браузера. Тогда сессия не будет трогать user agent:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

Если сайт всё равно показывает проверку на бота, попробуйте видимое окно с `--headed`. Если и оно заблокировано, значит, сайт не пускает автоматизированные браузеры. Сообщите об этом, вместо того чтобы пытаться обойти проверку.

Видимое окно Chrome сохраняет полосу вкладок и адресную строку — по ним его можно отличить от окна Electron. `--viewport 1280x800` — это обычная страница браузера. В вебе приложение использует левую боковую панель. Логотип WebdriverIO находится в верхней части этой панели. Пункты: Home, Weather, Web, Login, Forms, Swipe, Drag, Perms и Data. На главном экране браузер и десктоп перечислены рядом с iOS и Android.

Weather считывает `navigator.geolocation` и `Date`. `geolocation 35.6762 139.6503` — это Токио. Значение применяется при следующей загрузке, поэтому выполните `reload` перед `click "aria/Weather"`. Затем виджет показывает Токио, 21° и дождь. `emulate clock 2026-06-21T23:30:00Z` переключает ту же карточку с дневного неба на ночное и выставляет часы на 11:30 PM. Повторный `emulate clock` заменяет первый.

Вкладка WebView загружает `https://webdriver.io/` внутри приложения. Login ждёт около 1,5 секунды, а затем открывает диалог с текстом `Success` и `You are logged in!`. Пока это ожидание отображается на экране, кнопка LOGIN остаётся оранжевым элементом управления размером 200×50. `dialog accept` закрывает диалог. `swipe` доступен только на мобильных устройствах. Перетащите `[data-testid=Carousel]` на `aria/Next card` дважды, чтобы пролистать карусель. Записанная веб-сборка слушает `pointerup` на `document`, поэтому перетаскивание может начаться на карусели, а указатель может быть отпущен на `Next card`, который находится за пределами карусели. `scroll down --px 560` прокручивает до робота WebdriverIO. Подпись под ним — «You found me!!!». Части пазла — от `aria/drag-l2` до `aria/drag-l3`, их нужно бросать на соответствующую цель `aria/drop-…`. Порядок в лотке: `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3`.

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

Повторите `drag` для `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` и `l3`.

<SessionTarget id="browser" />

`--viewport 1280x720` задаёт начальный размер. `--arg` добавляет аргумент браузера и может повторяться. `--profile <dir>` сохраняет профиль между открытиями.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android и iOS

Android и iOS работают через Appium 3. `doctor android` сообщает об отсутствующем сервере или драйвере и выводит команду установки.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Для установленного Android-пакета используются `--package` и `--activity`. Для мобильного веба вместо приложения используется `--browser chrome` или `--browser safari`. `--appium-url http://127.0.0.1:4723/` подключается к уже запущенному серверу. Облачный URL приложения, например `bs://…`, передаётся как `--app` и не рассматривается как локальный файл.

<a id="native-boarding-pass"></a>

### Нативное демо-приложение

На эмуляторе или устройстве то же подопытное приложение — это apk v2.2.0:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` ждёт до восьми минут. UiAutomator2 устанавливает сервер и запускает инструментирование, прежде чем приложением можно будет пользоваться, и это медленнее, чем запуск браузера. Первый запрос не повторяется: повтор запустил бы вторую сессию Appium на том же устройстве, пока первая ещё устанавливается. `tap "~Login"`, `fill`, затем `tap "~button-LOGIN"` выполняют вход с теми же email и паролем. На коротком экране кнопка LOGIN находится ниже видимой области, поэтому перед этим нажатием прокрутите `~Login-screen`. `dialog accept` закрывает уведомление об успехе, и выполнять его нужно после того, как это уведомление появится на экране. Текст уведомления — `Success` / `You are logged in!`.

Кнопка отпечатка пальца — `~button-biometric`. Она появляется на форме входа только после регистрации отпечатка, поэтому этот плеер её не нажимает. `exec -e "await browser.fingerPrint(1)"` отвечает на системный запрос (`fingerPrint` доступен только на Android; подкоманды `wdio session` для него нет).

`tap "~Webview"` — это встроенный WebView с `https://webdriver.io/`. На программном эмуляторе с одним CPU рендерер WebView падает с `SIGTRAP` в `libmonochrome` после надписи LOADING, и страница так и не отрисовывается. Плеер не трогает эту вкладку.

`tap "~Swipe"` открывает карусель. `swipe left` её не листает: карусель — это `react-native-reanimated-carousel`, и свайп UIAutomator пружинит обратно к первой карточке. Робота и подпись «You found me!!!» показывает повторяемый `exec` с `mobile: swipeGesture` на scroll view. Полноэкранный `swipe up` от нижнего края вместо этого открывает интерфейс скриншотов Android. `drag "~drag-l2" "~drop-l2"` (и остальные восемь пар в порядке лотка) завершает пазл. Последний кадр — собранный робот и кнопка повтора.

`-s android` сохраняет эту сессию рядом с браузерной. Уберите `-s android`, если это единственная сессия. `open` использует пакет и activity, уже установленные из apk, с `--no-reset`, чтобы зарегистрированный отпечаток сохранился. `"~Login"` — это accessibility-метка вкладки. `wait` не применяется к нативной сессии.

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

Повторите `drag` для `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` и `l3`.

<SessionTarget id="android" />

### Симулятор iOS

Те же экраны есть в сборке для симулятора v2.2.0, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). Распакуйте её и установите `wdiodemoapp.app` на запущенный симулятор (`xcrun simctl install booted`). Bundle id — `org.wdiodemoapp`. Этот бинарный файл — приложение для iPhone Simulator (arm64, iOS 15.1 или новее). Для него нужны macOS и Xcode. Плеера iOS на этой странице нет.

Вход, свайп и перетаскивание используют те же accessibility-метки, что и на Android. `swipe left` на симуляторе не запускался. В apk для Android он эту карусель не листает. Биометрический вызов — `browser.touchId(true)`, а не `fingerPrint`. Для `touchId` нужна capability `appium:allowTouchIdEnroll` со значением `true` (передайте её через `--capabilities`). Зарегистрируйте Touch ID на симуляторе до открытия формы входа, иначе биометрическая кнопка останется скрытой.

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

Повторите `drag` для остальных восьми частей в том же порядке лотка, что и на Android.

## Десктопные приложения

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` требует macOS. `windows` требует Windows. `--app Root` подключается к рабочему столу. Установленное приложение Windows указывается по его application id, например `--app Microsoft.WindowsCalculator`. Путь или `.exe` разрешается как файл.

<a id="launch-console"></a>

## Electron, Tauri и Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` и `open dioxus ./my-app` требуют наличия своего драйвера в `PATH`, если только сервисный пакет не запускает сессию сам. В Linux без `DISPLAY` или `WAYLAND_DISPLAY` установите Xvfb или weston. Electron остаётся на классическом протоколе WebDriver. Передайте `--app-arg`, чтобы переслать флаг приложению, включая `--app-arg=--no-sandbox`, когда этого требует окружение. Значение, начинающееся с `-`, должно передаваться через `=`, поскольку иначе строгий парсер воспринимает его как отдельную опцию.

Установите `electron` и `@wdio/electron-service` в открываемый каталог. `main.js` использует `import`, поэтому в `package.json` этого каталога нужно указать `"type": "module"` (или назвать файл `main.mjs`). Задайте размер окна по рабочей области, чтобы на дисплее меньшего размера заголовок окна не оказался за пределами экрана:

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

Приведённая ниже команда открытия не отключает песочницу рендерера. Добавляйте `--app-arg=--no-sandbox` только тогда, когда окружение не может запустить Electron с песочницей, например в некоторых Linux-контейнерах. Плеер Electron загружает тот же URL Expo в окне 1280×800 без адресной строки. Логотип, боковая панель, карточка погоды, карточка входа, карусель и пазл совпадают с браузерными. `-s electron` — это имя сессии, используемое рядом с браузерным демо. Electron остаётся на классическом протоколе, поэтому `geolocation` и `emulate clock` проходят через Chromedriver, а не через BiDi. Команды совпадают с Chrome, включая `reload` перед Weather, за исключением диалога успеха. В Linux `dialog accept` принимает нативное уведомление, но его всплывающее окно остаётся отрисованным. Это окно не является частью страницы, поэтому последующий клик не может до него дотянуться. В записи `window.alert` заменён внутристраничным диалогом и выполняется `click "aria/OK"`. Пока идёт ожидание, кнопка LOGIN остаётся оранжевым элементом управления размером 200×50. Карусель, прокрутка и пазл используют те же команды, что и в Chrome.

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

Повторите `drag` для `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` и `l3`.

<SessionTarget id="electron" />

## Облачные устройства

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` может быть `browserstack`, `saucelabs`, `testingbot` или `testmu`. Экспортируйте имя пользователя и ключ доступа провайдера. `doctor <provider>` проверяет, что они заданы, и не выводит их значения. `--tunnel` запускает туннель провайдера, когда тестируемое приложение находится на вашей машине.

## Конфигурация WebdriverIO

Вместо имени цели `open` может принимать файл конфигурации и индекс capability:

```sh
npx wdio session open ./wdio.conf.ts 0
```

Конфигурация на TypeScript загружается через `tsx`, если он есть в вашем проекте. `tsx` необязателен: без него конфигурация загружается через удаление типов в Node (type stripping) или jiti, а конфигурация, которую не удалось загрузить, сообщает `MISSING_DEPENDENCY` со строкой установки.

`--hostname`, `--port`, `--path` и `--protocol` направляют сессию на уже запущенную конечную точку WebDriver. Закрытие сессии не останавливает эту конечную точку.

## Устранение неполадок

| Сообщение | Что делать |
| --- | --- |
| `MISSING_DEPENDENCY` | Установите пакет, указанный в ошибке. `doctor <target>` выводит ту же строку установки. Electron требует `@wdio/electron-service` и `electron` в открываемом каталоге. |
| `MISSING_APPIUM_DRIVER` | Выполните строку `npx appium driver install …` из ошибки. |
| `MISSING_BINARY` | Поместите указанный драйвер (`tauri-driver` или `wdio-dioxus-driver`) в `PATH`. |
| `MISSING_CREDENTIALS` | Экспортируйте переменные, указанные в ошибке. |
| `NOT_SUPPORTED` | `macos` работает только в macOS, а `windows` — только в Windows. `swipe` доступен только на мобильных устройствах. В Chrome и Electron перетаскивайте `[data-testid=Carousel]` на `aria/Next card`. |
| `No dialog open.` | Уведомление не открыто. На Android дождитесь появления уведомления об успехе перед `dialog accept`. В Electron на Linux нативное всплывающее окно может оставаться отрисованным после `acceptAlert` и при этом сообщать об отсутствии диалога. Вместо этого плеер использует внутристраничный диалог и `click "aria/OK"`. |
| `The instrumentation process cannot be initialized` | UiAutomator2 не начал слушать вовремя. Сессия отводит на этот запуск 240 с после до 180 с на установку сервера. На программном эмуляторе один CPU и скин 720×1280 позволяют apk v2.2.0 дойти до главного экрана. Образ 1080×2400 с двумя CPU вызывает ANR в `system_server`, и сервер так и не начинает слушать. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | Клиент сдался, пока Appium ещё создавал сессию. Android и iOS ждут первый запрос 480 с и не отправляют его повторно. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` предназначен для браузерных сессий. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` — вызов для Android. В iOS используется `browser.touchId`. |
| `App not found:` | Передайте существующий путь к apk или используйте `--package` и `--activity` для уже установленного приложения. |
| `Pass --package <id>.` | На Android `deeplink` требует `--package`. |

## Дальнейшие шаги

- [Снимки и ссылки](/docs/session/snapshots) — чтение экрана после `open`
- [Команды](/docs/session-commands) — все флаги `open`
- [wdio session](/docs/session) — основной цикл