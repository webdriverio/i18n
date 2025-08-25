---
id: headless-and-xvfb
title: Headless & Xvfb з Testrunner
description: Як WebdriverIO використовує Xvfb для тестування без графічного інтерфейсу на Linux, параметри конфігурації, рецепти для CI та усунення несправностей.
---

Ця сторінка пояснює, як тестовий виконавець WebdriverIO підтримує виконання без графічного інтерфейсу на Linux за допомогою Xvfb (X Virtual Framebuffer). Тут описано, коли Xvfb корисний, як його налаштувати та як він поводиться в CI та Docker.

## Коли використовувати Xvfb проти нативного headless

- Використовуйте нативний headless (наприклад, Chrome `--headless=...`), коли це можливо, для мінімальних накладних витрат.
- Використовуйте Xvfb, коли:
  - Тестуєте Electron або додатки, які потребують віконного менеджера або середовища робочого столу
  - Ви покладаєтесь на GLX або поведінку, що залежить від віконного менеджера
  - Ваші інструменти очікують на наявність сервера дисплея (`DISPLAY`)
  - Ви стикаєтесь з помилками Chromium, такими як:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    Помилка зіткнення каталогу даних користувача може вводити в оману, оскільки часто є результатом аварійного завершення браузера та негайного перезапуску, який повторно використовує той самий каталог профілю з попереднього екземпляра. Забезпечення стабільного відображення (наприклад, через Xvfb) часто вирішує цю проблему - якщо ні, вам слід передавати унікальний `--user-data-dir` для кожного робочого процесу.

## Конфігурація

Чотири параметри виконавця контролюють поведінку Xvfb:

- `autoXvfb` (boolean, default: true)
  - Авторитетний перемикач для використання. Якщо `false`, виконавець ніколи не використовує Xvfb.
  - Якщо `true`, виконавець може використовувати Xvfb за потреби.

- `xvfbAutoInstall` (boolean, default: false)
  - Увімкнути автоматичне встановлення `xvfb-run`, якщо його немає
  - Коли false, виконавець попередить і продовжить роботу без встановлення

- `xvfbAutoInstallMode` ('root' | 'sudo', default: 'sudo')
  - 'root': встановлювати лише якщо запущено як root (без sudo)
  - 'sudo': дозволити неінтерактивний sudo (`sudo -n`), якщо не root; пропустити, якщо sudo відсутній

- `xvfbAutoInstallCommand` (string | string[], optional)
  - Користувацька команда для встановлення замість вбудованого визначення менеджера пакетів
  - Коли надано, ця команда виконується як є і замінює вбудовану логіку встановлення

- `xvfbMaxRetries` (number, default: 3)
  - Кількість спроб повтору при збоях процесу xvfb.
  - Корисно для нестабільних середовищ CI, де запуск Xvfb може іноді не вдаватися.

- `xvfbRetryDelay` (number, default: 1000)
  - Базова затримка між повторами в мілісекундах для збоїв процесу xvfb.
  - Використовує прогресивну затримку: затримка × номер спроби (наприклад, 1000мс, 2000мс, 3000мс тощо).

Приклади:

```ts
export const config: WebdriverIO.Config = {
  // Використовувати Xvfb за потреби
  autoXvfb: true,

  // Автоматично встановлювати пакети Xvfb за допомогою sudo
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
  // Використовувати Xvfb за потреби
  autoXvfb: true,

  // Автоматично встановлювати пакети Xvfb за допомогою користувацької команди та sudo
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
  // Використовувати Xvfb за потреби
  autoXvfb: true,

  // Автоматично встановлювати пакети Xvfb за допомогою sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Налаштувати поведінку повторів для нестабільних середовищ CI
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Логіка виявлення

- Виконавець розглядає Xvfb, коли:

  - Запущено на Linux
  - Не встановлено `DISPLAY` (середовище без графічного інтерфейсу) або передані прапорці для безголового браузера

- Якщо `DISPLAY` встановлено, виконавець за замовчуванням не буде примусово використовувати Xvfb і поважатиме ваш наявний X-сервер/віконний менеджер.

Примітки:
- `autoXvfb: false` повністю вимикає використання Xvfb (без обгортання з `xvfb-run`).
- `xvfbAutoInstall` впливає лише на встановлення, якщо `xvfb-run` відсутній; це не вмикає/вимикає використання.
- `xvfbAutoInstallMode` контролює метод встановлення: 'root' для встановлення лише від імені root, 'sudo' для встановлення на основі sudo (за замовчуванням: 'sudo').
- Вбудовані встановлення пакетів завжди неінтерактивні. Тільки root, якщо ви не вибрали режим 'sudo'.
- Механізм повторів використовує прогресивні затримки: `xvfbRetryDelay × номер спроби` (наприклад, 1000мс, 2000мс, 3000мс тощо).

## Використання наявного DISPLAY в CI

Якщо ваш CI налаштовує власний X-сервер/віконний менеджер (наприклад, з `Xvfb :99` та WM), або:

- Залиште `autoXvfb: true` і переконайтеся, що `DISPLAY` експортовано; виконавець поважатиме його та уникатиме обгортання.
- Або встановіть `autoXvfb: false`, щоб явно вимкнути будь-яку поведінку Xvfb з виконавця.

## Рецепти для CI та Docker

GitHub Actions (використовуючи нативний headless):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (віртуальний дисплей через Xvfb, якщо відсутній і вибрано):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (приклад Ubuntu/Debian – попередньо встановлений xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Для інших дистрибутивів відрегулюйте менеджер пакетів і назву пакета відповідно (наприклад, `dnf install xorg-x11-server-Xvfb` на Fedora/RHEL, `zypper install xvfb-run` на openSUSE/SLE).

## Підтримка автоматичного встановлення (xvfbAutoInstall)

Коли увімкнено `xvfbAutoInstall`, WebdriverIO намагається встановити `xvfb` за допомогою вашого системного менеджера пакетів. Підтримуються такі менеджери та пакети:

| Менеджер пакетів | Команда         | Дистрибутиви (приклади)                                    | Назва(и) пакета(ів)            |
|-----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt             | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, тощо.      | `xvfb`                           |
| dnf             | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, тощо.       | `xorg-x11-server-Xvfb`           |
| yum             | `yum`           | CentOS, RHEL (застарілий)                                    | `xorg-x11-server-Xvfb`           |
| zypper          | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman          | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, тощо.             | `xorg-server-xvfb`               |
| apk             | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install    | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

Примітки:
- Якщо ваше середовище використовує інший менеджер пакетів, встановлення не вдасться з помилкою; встановіть `xvfb` вручну.
- Назви пакетів залежать від дистрибутива; таблиця відображає загальні назви для кожної сім'ї.

## Усунення несправностей

- "xvfb-run failed to start"
  - Виконавець автоматично повторює спроби невдач, пов'язаних з Xvfb, з прогресивним відступом. Якщо помилки не зникають, збільште `xvfbMaxRetries` і `xvfbRetryDelay` для нестабільних середовищ.

- Xvfb несподівано обгорнуто в CI
  - Якщо у вас є власне налаштування `DISPLAY` / WM, встановіть `autoXvfb: false` або переконайтеся, що `DISPLAY` експортовано перед запуском виконавця.

- Відсутній `xvfb-run`
  - Залиште `xvfbAutoInstall: false`, щоб уникнути модифікації середовища; встановіть через базовий образ або встановіть `xvfbAutoInstall: true`, щоб обрати встановлення.

- Часті збої запуску Xvfb в CI
  - Збільште `xvfbMaxRetries` (наприклад, до 5-10) і `xvfbRetryDelay` (наприклад, до 2000мс) для більш стійкої поведінки в нестабільних середовищах.

## Розширені налаштування

- Виконавець створює процеси через фабрику, яка обгортає робочий процес node з `xvfb-run`, якщо потрібен Xvfb і він доступний.
- Прапорці безголового браузера (Chrome/Edge/Firefox) сигналізують про використання headless і можуть викликати Xvfb у середовищах без `DISPLAY`.