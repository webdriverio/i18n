---
id: headless-and-xvfb
title: Headless и Xvfb с Testrunner
description: Как WebdriverIO использует Xvfb для безголового тестирования на Linux, параметры конфигурации, рецепты для CI и устранение неполадок.
---

На этой странице объясняется, как тестраннер WebdriverIO поддерживает безголовое выполнение на Linux с использованием Xvfb (X Virtual Framebuffer). Она охватывает случаи, когда Xvfb полезен, как его настроить и как он ведет себя в CI и Docker.

## Когда использовать Xvfb или нативный headless режим

- Используйте нативный headless режим (например, Chrome `--headless=...`), когда это возможно, для минимальных накладных расходов.
- Используйте Xvfb, когда:
  - Тестируете Electron или приложения, которые требуют оконного менеджера или среды рабочего стола
  - Вы полагаетесь на GLX или поведение, зависящее от оконного менеджера
  - Ваши инструменты ожидают наличия сервера дисплея (`DISPLAY`)
  - Вы сталкиваетесь с ошибками Chromium, такими как:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    Ошибка коллизии директории пользовательских данных может вводить в заблуждение, так как часто является результатом сбоя браузера и немедленного перезапуска, который повторно использует ту же директорию профиля от предыдущего экземпляра. Обеспечение стабильного дисплея (например, через Xvfb) часто решает эту проблему - если нет, вы должны передать уникальный `--user-data-dir` для каждого воркера.

## Конфигурация

Четыре опции раннера контролируют поведение Xvfb:

- `autoXvfb` (boolean, по умолчанию: true)
  - Авторитетный переключатель для использования. Если `false`, раннер никогда не использует Xvfb.
  - Если `true`, раннер может использовать Xvfb при необходимости.

- `xvfbAutoInstall` (boolean, по умолчанию: false)
  - Включает автоматическую установку `xvfb-run`, если она отсутствует
  - При значении false, раннер предупредит и продолжит работу без установки

- `xvfbAutoInstallMode` ('root' | 'sudo', по умолчанию: 'sudo')
  - 'root': устанавливать только если запущен от имени root (без sudo)
  - 'sudo': разрешить неинтерактивный sudo (`sudo -n`), если не root; пропустить, если sudo отсутствует

- `xvfbAutoInstallCommand` (string | string[], опционально)
  - Пользовательская команда для установки вместо встроенного определения менеджера пакетов
  - При указании эта команда выполняется как есть и переопределяет встроенную логику установки

- `xvfbMaxRetries` (number, по умолчанию: 3)
  - Количество попыток повторных попыток при сбоях процесса xvfb.
  - Полезно для нестабильных сред CI, где запуск Xvfb может иногда не удаваться.

- `xvfbRetryDelay` (number, по умолчанию: 1000)
  - Базовая задержка между повторными попытками в миллисекундах при сбоях процесса xvfb.
  - Использует прогрессивную задержку: задержка × номер попытки (например, 1000мс, 2000мс, 3000мс и т.д.).

Примеры:

```ts
export const config: WebdriverIO.Config = {
  // Использовать Xvfb при необходимости
  autoXvfb: true,

  // Автоматически устанавливать пакеты Xvfb с использованием sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Использовать Xvfb при необходимости
  autoXvfb: true,

  // Автоматически устанавливать пакеты Xvfb с использованием пользовательской команды и sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Использовать Xvfb при необходимости
  autoXvfb: true,

  // Автоматически устанавливать пакеты Xvfb с использованием sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Настроить поведение повторных попыток для нестабильных сред CI
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Логика обнаружения

- Раннер рассматривает использование Xvfb когда:

  - Запуск на Linux
  - Не установлен `DISPLAY` (безголовая среда), или переданы флаги безголового браузера

- Если `DISPLAY` установлен, раннер по умолчанию не будет принудительно использовать Xvfb и будет уважать ваш существующий X-сервер/оконный менеджер.

Примечания:
- `autoXvfb: false` полностью отключает использование Xvfb (без обертывания с `xvfb-run`).
- `xvfbAutoInstall` влияет только на установку, если `xvfb-run` отсутствует; он не включает/выключает использование.
- `xvfbAutoInstallMode` контролирует метод установки: 'root' для установки только от root, 'sudo' для установки с sudo (по умолчанию: 'sudo').
- Встроенные установки пакетов всегда неинтерактивны. Только root, если вы не выбрали режим 'sudo'.
- Механизм повторных попыток использует прогрессивные задержки: `xvfbRetryDelay × номер попытки` (например, 1000мс, 2000мс, 3000мс и т.д.).

## Использование существующего DISPLAY в CI

Если ваш CI настраивает собственный X-сервер/оконный менеджер (например, с `Xvfb :99` и WM), то либо:

- Оставьте `autoXvfb: true` и убедитесь, что `DISPLAY` экспортирован; раннер будет уважать его и избегать обертывания.
- Или установите `autoXvfb: false`, чтобы явно отключить любое поведение Xvfb со стороны раннера.

## Рецепты для CI и Docker

GitHub Actions (использование нативного headless режима):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (виртуальный дисплей через Xvfb, если отсутствует и включен):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (пример для Ubuntu/Debian – предустановка xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Для других дистрибутивов соответственно скорректируйте менеджер пакетов и имя пакета (например, `dnf install xorg-x11-server-Xvfb` на Fedora/RHEL-based, `zypper install xvfb-run` на openSUSE/SLE).

## Поддержка автоматической установки (xvfbAutoInstall)

Когда `xvfbAutoInstall` включен, WebdriverIO пытается установить `xvfb` с помощью системного менеджера пакетов. Поддерживаются следующие менеджеры и пакеты:

| Менеджер пакетов | Команда         | Дистрибутивы (примеры)                                      | Имя(имена) пакета(ов)           |
|-----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt             | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, и т.д.     | `xvfb`                           |
| dnf             | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, и т.д.      | `xorg-x11-server-Xvfb`           |
| yum             | `yum`           | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper          | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman          | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, и т.д.           | `xorg-server-xvfb`               |
| apk             | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install    | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

Примечания:
- Если ваша среда использует другой менеджер пакетов, установка завершится с ошибкой; установите `xvfb` вручную.
- Имена пакетов зависят от дистрибутива; таблица отражает общие имена для каждого семейства.

## Устранение неполадок

- "xvfb-run не удалось запустить"
  - Раннер автоматически повторяет попытки при сбоях, связанных с Xvfb, с прогрессивной задержкой. Если сбои сохраняются, увеличьте `xvfbMaxRetries` и `xvfbRetryDelay` для нестабильных сред.

- Xvfb неожиданно обернут в CI
  - Если у вас есть пользовательская настройка `DISPLAY` / WM, установите `autoXvfb: false` или убедитесь, что `DISPLAY` экспортирован до запуска раннера.

- Отсутствует `xvfb-run`
  - Оставьте `xvfbAutoInstall: false`, чтобы избежать модификации среды; установите через базовый образ или установите `xvfbAutoInstall: true`, чтобы включить автоустановку.

- Частые сбои запуска Xvfb в CI
  - Увеличьте `xvfbMaxRetries` (например, до 5-10) и `xvfbRetryDelay` (например, до 2000мс) для более устойчивого поведения в нестабильных средах.

## Продвинутые темы

- Раннер создает процессы через фабрику, которая оборачивает узловой воркер с `xvfb-run`, если Xvfb необходим и доступен.
- Флаги безголового браузера (Chrome/Edge/Firefox) сигнализируют об использовании безголового режима и могут вызвать Xvfb в средах без `DISPLAY`.