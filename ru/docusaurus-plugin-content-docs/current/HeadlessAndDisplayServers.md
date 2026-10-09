---
id: headless-and-display-servers
title: Headless-режим и дисплейные серверы
description: Запуск браузеров в оконном режиме и десктопных приложений в Linux CI и контейнерах с помощью виртуального дисплея Weston или Xvfb, который запускает testrunner: параметры, рецепты для CI и устранение неполадок.
---

В Linux, когда дисплей недоступен, testrunner запускает на время прогона виртуальный дисплейный сервер: [Weston](https://gitlab.freedesktop.org/wayland/weston) в headless-режиме или, в качестве запасного варианта, [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer). На этой странице описано, когда это происходит, как это настроить и как это работает в CI и Docker. В большинстве случаев достаточно установить Weston или Xvfb в образ или указать `displayServerAutoInstall: true` в конфигурации.

## Когда использовать виртуальный дисплей, а когда нативный headless-режим

Виртуальный дисплей предоставляет браузерам и приложениям экран там, где его нет, например на CI-раннерах и в контейнерах. Оставьте его включённым, если:

- Вы тестируете десктопные приложения, которым нужно настоящее окно.
- Вашим тестам нужен браузер в оконном режиме, например чтобы совпадать с эталонными скриншотами, снятыми в видимом браузере.
- Chrome не запускается с ошибкой `DevToolsActivePort file doesn't exist` или `user data directory is already in use`, как описано в разделе [Устранение неполадок](#troubleshooting).

Для браузерных тестов, которым не нужно видимое окно, нативный headless-режим, например `--headless=new` в Chrome, создаёт меньше накладных расходов. Используйте вместе с ним `displayServerEnabled: false`, иначе testrunner всё равно запустит дисплейный сервер. То же самое сделайте, если все ваши браузеры работают в облачном сервисе или на удалённом гриде, поскольку локально дисплей не нужен.

## Как это работает

Testrunner запускает один дисплейный сервер до хука `onPrepare` любого сервиса и устанавливает его переменные окружения в `process.env`:

| Переменная | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | не задаётся |
| `DISPLAY` | не задаётся | первый свободный дисплей, например `:0` |
| `XDG_RUNTIME_DIR` | приватный каталог в `/tmp` для прогона | без изменений |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

Эти переменные наследуются воркерами, а также драйверами и приложениями, которые сервисы запускают в `onPrepare`. Браузеры и GUI-тулкиты выбирают Wayland или X11 на их основе. При использовании Weston приватный `XDG_RUNTIME_DIR` заменяет на время прогона любое ваше значение.

Дисплейный сервер работает до завершения хуков `onComplete`, поэтому сервисы могут пользоваться им во время своего завершения. Затем testrunner останавливает его и восстанавливает прежние значения. Если процесс завершается раньше, в том числе по Ctrl+C, дисплейный сервер завершается вместе с ним.

Testrunner запускает дисплейный сервер, только если выполнены все условия:

- Он работает в Linux.
- Не задана ни `DISPLAY`, ни `WAYLAND_DISPLAY`.
- `displayServerEnabled` не равно `false`.

Если дисплей уже существует, testrunner использует его и ничего не запускает. Если задана только `WAYLAND_DISPLAY`, например Weston запущен вашим CI, testrunner всё равно устанавливает `XDG_SESSION_TYPE`, `GDK_BACKEND` и `ELECTRON_OZONE_PLATFORM_HINT` в `wayland` на время прогона. Это гарантирует, что браузеры используют правильный дисплей, переопределяя унаследованные значения, например `XDG_SESSION_TYPE=tty` из SSH-сессии, которые направили бы их в X11, где сервера нет. Это происходит даже при `displayServerEnabled: false`, поскольку этот параметр управляет только тем, запускается ли дисплейный сервер.

### Какой дисплейный сервер используется

При значении по умолчанию `displayServer: 'auto'` testrunner сначала пробует Weston, затем Xvfb. Уже установленные серверы пробуются до какой-либо установки, поэтому имеющийся Xvfb будет использован вместо установки Weston. Если Weston не удаётся запустить, testrunner переключается на Xvfb. Если не запускается ни один дисплейный сервер, testrunner выводит предупреждение, и прогон продолжается без него. При `displayServer: 'wayland'` или `displayServer: 'xvfb'` testrunner пробует только указанный сервер.

Поддерживается Weston 10 и новее. В Ubuntu 22.04 и Debian 11 поставляется Weston 9, а в Enterprise Linux 9 с включённым EPEL — Weston 8, поэтому там укажите `displayServer: 'xvfb'`. Weston запускается без Xwayland, поэтому не предоставляет `DISPLAY`. Если вашим тестам или инструментам нужен X11, например `xdotool`, `xclip` или Java-приложению, укажите `displayServer: 'xvfb'`.

### Фокус окна

Все воркеры используют один и тот же дисплей. В WebdriverIO v9 каждый воркер оборачивался в `xvfb-run` и получал собственный дисплей, поэтому его браузер всегда был в фокусе. Теперь браузеры на основе Chromium, такие как Chrome и Edge, могут оказаться без фокуса: в Weston фокус не получает ни одно окно, а в Xvfb фокус есть только у последнего открытого окна. Ввод через WebDriver по-прежнему доходит до страницы, но `document.hasFocus()` возвращает `false`, события `focus` не срабатывают, а стили `:focus` не применяются. Если ваши тесты зависят от фокуса, включите эмуляцию фокуса — экспериментальную команду Chrome DevTools Protocol (CDP), которая сохраняет действие между загрузками страниц:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

Firefox это не затрагивает, поскольку под управлением WebDriver он считает свои страницы находящимися в фокусе.

### Автономные скрипты

Testrunner запускает дисплейный сервер сам. Автономный скрипт, вызывающий `remote()`, может запустить его с помощью `startDisplayDaemonFromConfig` из `@wdio/display-server`. Функция принимает те же параметры `displayServer*`, устанавливает переменные дисплея в `process.env`, чтобы браузер их унаследовал, и восстанавливает их при вызове `stop()`:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// null вне Linux, если дисплей X11 уже существует или если ни один сервер не запустился. При существующем
// дисплее Wayland возвращает дескриптор, чей stop() восстанавливает установленные им переменные сессии.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

Также можно запустить скрипт под `xvfb-run`, как описано в разделе [Использование существующего дисплея](#using-an-existing-display).

## Настройка браузеров

### Браузеры, которые запускает WebdriverIO

Эти браузеры не требуют настройки:

- Chrome и Edge 140 и новее, а также Chrome for Testing 135 и новее учитывают `XDG_SESSION_TYPE=wayland`, которую устанавливает дисплейный сервер.
- Более старые Chrome и Edge игнорируют `XDG_SESSION_TYPE`. Для них WebdriverIO добавляет `--ozone-platform=wayland` в аргументы каждого запускаемого Chrome и Edge, пока Wayland работает без X-сервера, если только аргументы уже не содержат `--ozone-platform` или `--headless`.
- Приложения Electron: Electron 38 и новее учитывают `XDG_SESSION_TYPE`, а Electron с 28 по 37 — `ELECTRON_OZONE_PLATFORM_HINT`, которую дисплейный сервер также устанавливает. Electron 27 и старше полагаются на флаг `--ozone-platform=wayland`, который WebdriverIO добавляет при запуске приложения через Chromedriver.
- Firefox и GTK-приложения, например приложения Tauri, выбирают Wayland на основе `WAYLAND_DISPLAY` и `GDK_BACKEND`. Firefox версий до 120 не тестировался.

### Браузеры, которые WebdriverIO не запускает

Браузеры на гриде или в облачном сервисе не требуют настройки, поскольку работают на дисплее удалённого хоста.

Локальные браузеры, запускаемые чем-то другим, например запущенным вами драйвером, сервером Appium или собственным лаунчером сервиса, не получают флаг `--ozone-platform=wayland` от WebdriverIO. Chrome и Edge 140 и новее, а также Electron 28 и новее в нём не нуждаются, поскольку учитывают переменные сессии, а вот старым Chrome и Edge он нужен. Что делать, зависит от того, когда запускается браузер:

- **Во время прогона**, например из `onPrepare` сервиса, новым браузерам ничего не нужно, поскольку они наследуют дисплей и переменные сессии. Для старых Chrome и Edge выполните одно из двух:
  - укажите `displayServer: 'xvfb'`, чтобы использовать Xvfb, или
  - укажите `displayServer: 'wayland'` и добавьте `--ozone-platform=wayland` в их аргументы, чтобы использовать Weston.
- **До запуска WebdriverIO**, например на предыдущем шаге CI или в другой оболочке, они не могут использовать дисплейный сервер, запускаемый WebdriverIO, поскольку не наследуют его переменные. Запустите дисплей самостоятельно, как описано в разделе [Использование существующего дисплея](#using-an-existing-display), и выполните одно из двух:
  - используйте Xvfb, которому больше ничего не нужно, или
  - используйте Weston, затем экспортируйте `XDG_SESSION_TYPE=wayland` (Chrome и Edge 140 и новее, Electron 38 и новее) или `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron с 28 по 37) и добавьте `--ozone-platform=wayland` в аргументы старых Chrome и Edge.

## Конфигурация

Все параметры перечислены в [справочнике по конфигурации](/docs/configuration#displayserverenabled). Например:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Установить дисплейный сервер, если ни один не установлен
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Всегда использовать Xvfb меньшего размера, установленный пользовательской командой, рассчитанной на контейнер с root
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

Пользовательская команда общая для обоих серверов. При `displayServer: 'auto'` она сначала выполняется для Weston, а затем ещё раз для Xvfb, только если Weston по-прежнему недоступен или не запускается, а Xvfb всё ещё отсутствует. Укажите в `displayServer` сервер, который устанавливает ваша команда, как в этом примере.

Параметры v9 `autoXvfb` и `xvfb*` устарели и будут удалены в v11. Их замены описаны в [руководстве по миграции на v10](/docs/v10-migration#virtual-displays-on-linux).

## CI и Docker

Предустановите дисплейный сервер в образ или укажите `displayServerAutoInstall: true`, чтобы он устанавливался при запуске прогона.

### Предустановка дисплейного сервера

#### Weston

В Ubuntu 24.04 или Debian 12 и новее:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

В RHEL 10 и Oracle Linux 10 самостоятельно включите EPEL и CodeReady Builder, следуя [документации EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/), затем установите `weston`.

Чтобы обернуть testrunner в собственный Weston, как описано в разделе [Использование существующего дисплея](#using-an-existing-display), установите также `xwayland-run`. Он доступен в виде пакета для Debian 13, Ubuntu 24.04, Fedora и openSUSE Tumbleweed. Без него вам придётся запускать Weston в фоне с собственными `XDG_RUNTIME_DIR` и `WAYLAND_DISPLAY` и дожидаться появления его сокета перед запуском WebdriverIO. В качестве альтернативы используйте Xvfb.

#### Xvfb

В Ubuntu или Debian:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

В Ubuntu 22.04 и Debian 11 поставляется слишком старый Weston, поэтому там используйте Xvfb. Если установлен только Xvfb, testrunner использует его без дополнительной настройки.

Для других дистрибутивов используйте имена пакетов из раздела [Поддержка автоматической установки](#automatic-installation-support).

### Использование существующего дисплея

Если ваш CI уже предоставляет дисплей, testrunner использует его и ничего не запускает.

Чтобы использовать Weston, оберните testrunner в `wlheadless-run` из пакета `xwayland-run`. Он предоставляет Weston приватный runtime-каталог и дожидается появления его сокета, а флаги соответствуют тем, с которыми Weston запускает testrunner:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Чтобы использовать Xvfb, оберните testrunner в `xvfb-run`:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## Поддержка автоматической установки

`displayServerAutoInstall` работает с перечисленными ниже менеджерами пакетов. Установка выполняется в неинтерактивном режиме и прерывается по тайм-ауту через 240 секунд. При любом другом менеджере пакетов установите дисплейный сервер самостоятельно.

| Менеджер пакетов | Дистрибутивы | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- В Arch Linux установка выполняет `pacman -Syu`, то есть полное обновление системы, поскольку Arch не поддерживает частичные обновления. На устаревшем образе это может превысить лимит в 240 секунд, поэтому там предустановите дисплейный сервер.
- В Enterprise Linux 10 нет Xvfb, а Weston поставляется только в EPEL, для которого нужен CRB. В CentOS Stream, AlmaLinux и Rocky Linux установка включает оба репозитория и оставляет их включёнными. В RHEL и Oracle Linux настройте их самостоятельно, как описано в разделе [Предустановка дисплейного сервера](#preinstalling-a-display-server).

## Логи

Дисплейный сервер работает в процессе лаунчера, поэтому его сообщения попадают в лог лаунчера: `wdio.log` в вашем `outputDir` или в терминал, если `outputDir` не задан. В логе указано, какой дисплейный сервер запустился и какие переменные он установил. Для получения подробностей повысьте уровень логирования:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## Устранение неполадок

### Chrome завершается с ошибкой `DevToolsActivePort file doesn't exist`

Полное сообщение: `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. Частая причина — Chrome в оконном режиме без дисплея, на котором можно открыть окно. Проверьте в [логе лаунчера](#logs), какой дисплейный сервер запустился. Если ни один, см. раздел [В логе лаунчера отображается `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). Если вашим тестам не нужно видимое окно, используйте вместо этого нативный headless-режим, как описано в разделе [Когда использовать виртуальный дисплей, а когда нативный headless-режим](#when-to-use-a-virtual-display-vs-native-headless).

### Chrome завершается с ошибкой `user data directory is already in use`

Полное сообщение начинается с `session not created: probably user data directory is already in use`. Оно часто вводит в заблуждение: обычно это означает, что браузер упал и перезапустился с каталогом профиля предыдущего экземпляра. Стабильный дисплей часто решает проблему. Если нет, передавайте уникальный `--user-data-dir` для каждого воркера.

### В логе лаунчера отображается `No display server could be started`

Полное сообщение: `No display server could be started; continuing without a virtual display`. Дисплейный сервер не установлен или ни один не запустился. Предшествующие сообщения объясняют причину:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` или `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: ничего не установлено, а автоустановка выключена.
- `wayland failed to start: ...` или `xvfb failed to start: ...`: далее следует вывод ошибок сервера.
- `Failed to install Weston` или `Failed to install Xvfb`: установка завершилась неудачей.
- `wayland still not found after installing` или `xvfb still not found after installing`: установка прошла успешно, но не предоставила этот сервер, например потому, что пользовательская команда `displayServerAutoInstallCommand` устанавливает только другой. Укажите в `displayServer` сервер, который устанавливает ваша команда.

Установите Weston или Xvfb в образ или укажите `displayServerAutoInstall: true`.

### Xvfb завершается с ошибкой `Failed to find a socket to listen on`

Xvfb создаёт свой сокет в `/tmp/.X11-unix`. Если этот каталог существует, он должен быть доступен для записи пользователю, от имени которого выполняются тесты, как при режиме `1777`.

### Chrome или Electron завершается в Weston с ошибкой `Missing X server or $DISPLAY`

Браузер попытался использовать X11 вместо Wayland. Если его запускал не WebdriverIO, см. раздел [Браузеры, которые WebdriverIO не запускает](#browsers-webdriverio-doesnt-launch). В противном случае удалите `--ozone-platform=x11` из его аргументов.

### Тесты, зависящие от фокуса, не проходят в Chrome или Edge

`document.hasFocus()` возвращает `false`, потому что страницы на общем дисплее могут оказаться без фокуса. Включите эмуляцию фокуса, как описано в разделе [Фокус окна](#window-focus).

### Инструмент или приложение X11 завершается в Weston с ошибкой `cannot open display` или `Can't open display`

Weston не предоставляет `DISPLAY`. Укажите `displayServer: 'xvfb'`, чтобы testrunner запускал вместо него Xvfb. Если вы запустили Weston самостоятельно, оберните прогон в `xvfb-run`, поскольку testrunner использует существующий дисплей, а не запускает новый.

## Дальнейшие шаги

- Справочник по [конфигурации](/docs/configuration#displayserverenabled) с описанием всех параметров `displayServer*`.
- [Руководство по миграции на v10](/docs/v10-migration#virtual-displays-on-linux) с заменами параметров v9 `autoXvfb` и `xvfb*`.
- [Docker](/docs/docker) и [GitHub Actions](/docs/githubactions) для запуска набора тестов в CI.
- [Десктопные приложения](/docs/platforms/desktop#linux) для Electron, Tauri и Dioxus в Linux.